import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { PostgrestError, User } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { getSafeNextPath } from "@/lib/supabase/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  getSupabasePublicConfig,
  hasSupabasePublicConfig,
  isLoanFactoryEmail,
} from "@/lib/supabase/config";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type ApprovedUserRow = {
  email: string;
  role: string;
  full_name: string | null;
  department: string | null;
  title: string | null;
  active: boolean;
};

type CookieToSet = {
  name: string;
  value: string;
  options: CookieOptions;
};

function logSupabaseSyncError(context: string, error: PostgrestError | null) {
  if (!error) return;

  console.error(context, {
    code: error.code,
    message: error.message,
    details: error.details,
    hint: error.hint,
  });
}

function getMetadataValue(
  user: User,
  keys: Array<"full_name" | "name" | "avatar_url" | "picture">,
) {
  const metadata = user.user_metadata ?? {};

  for (const key of keys) {
    const value = metadata[key];

    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }

  return null;
}

function getRedirectBase(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";

  if (process.env.NODE_ENV !== "development" && forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  return requestUrl.origin;
}

function buildRedirectResponse(
  request: NextRequest,
  redirectTo: string,
  cookiesToSet: CookieToSet[],
  headersToSet: Record<string, string>,
) {
  const response = NextResponse.redirect(
    new URL(redirectTo, getRedirectBase(request)),
  );

  cookiesToSet.forEach(({ name, value, options }) => {
    response.cookies.set(name, value, options);
  });

  Object.entries(headersToSet).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  response.headers.set(
    "Cache-Control",
    "private, no-cache, no-store, must-revalidate, max-age=0",
  );
  response.headers.set("Expires", "0");
  response.headers.set("Pragma", "no-cache");

  return response;
}

function pendingPath(reason: string) {
  return `/access-pending/?reason=${encodeURIComponent(reason)}`;
}

async function syncApprovedProfile(user: User) {
  const email = user.email?.toLowerCase().trim();

  if (!email) {
    return { status: "pending" as const, reason: "missing-user" };
  }

  if (!isLoanFactoryEmail(email)) {
    return { status: "pending" as const, reason: "domain" };
  }

  const admin = createSupabaseAdminClient();

  if (!admin) {
    return { status: "pending" as const, reason: "setup" };
  }

  const { data: approvedUser, error: approvalError } = await admin
    .from("approved_users")
    .select("email,role,full_name,department,title,active")
    .eq("email", email)
    .eq("active", true)
    .maybeSingle<ApprovedUserRow>();

  if (approvalError) {
    logSupabaseSyncError("Supabase approved user lookup failed", approvalError);
    return { status: "pending" as const, reason: "approval-sync" };
  }

  const profileStatus = approvedUser ? "approved" : "pending";
  const { error: profileError } = await admin.from("profiles").upsert(
    {
      id: user.id,
      email,
      full_name:
        approvedUser?.full_name ?? getMetadataValue(user, ["full_name", "name"]),
      role: approvedUser?.role ?? null,
      department: approvedUser?.department ?? null,
      title: approvedUser?.title ?? null,
      avatar_url: getMetadataValue(user, ["avatar_url", "picture"]),
      status: profileStatus,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "email" },
  );

  if (profileError) {
    logSupabaseSyncError("Supabase profile upsert failed", profileError);
    return { status: "pending" as const, reason: "profile-sync" };
  }

  if (!approvedUser) {
    return { status: "pending" as const, reason: "pending" };
  }

  return { status: "approved" as const, role: approvedUser.role };
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = getSafeNextPath(requestUrl.searchParams.get("next"));
  const config = getSupabasePublicConfig();
  const cookiesToSet: CookieToSet[] = [];
  const headersToSet: Record<string, string> = {};

  if (!code) {
    return buildRedirectResponse(
      request,
      "/login/?error=missing-code",
      cookiesToSet,
      headersToSet,
    );
  }

  if (!hasSupabasePublicConfig(config)) {
    return buildRedirectResponse(
      request,
      "/login/?error=supabase-not-configured",
      cookiesToSet,
      headersToSet,
    );
  }

  const supabase = createServerClient(config.supabaseUrl, config.supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(nextCookiesToSet, headers) {
        cookiesToSet.push(...nextCookiesToSet);

        Object.entries(headers).forEach(([key, value]) => {
          headersToSet[key] = value;
        });
      },
    },
  });

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    console.error("Supabase server auth code exchange failed", {
      message: error?.message ?? "Missing user after code exchange",
      name: error?.name,
      status: error?.status,
    });

    return buildRedirectResponse(
      request,
      "/login/?error=auth-callback",
      cookiesToSet,
      headersToSet,
    );
  }

  const profileSync = await syncApprovedProfile(data.user);

  if (profileSync.status !== "approved") {
    if (profileSync.reason === "domain") {
      await supabase.auth.signOut();
    }

    return buildRedirectResponse(
      request,
      pendingPath(profileSync.reason),
      cookiesToSet,
      headersToSet,
    );
  }

  return buildRedirectResponse(request, next, cookiesToSet, headersToSet);
}
