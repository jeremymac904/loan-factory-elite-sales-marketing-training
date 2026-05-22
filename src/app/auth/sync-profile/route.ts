import { NextResponse, type NextRequest } from "next/server";
import {
  DEFAULT_COOKIE_OPTIONS,
  createChunks,
  createServerClient,
  isChunkLike,
  stringToBase64URL,
  type CookieOptions,
} from "@supabase/ssr";
import type { PostgrestError, Session, User } from "@supabase/supabase-js";
import { getSafeNextPath } from "@/lib/supabase/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  getSupabasePublicConfig,
  hasSupabasePublicConfig,
  isLoanFactoryEmail,
} from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

type ApprovedUserRow = {
  email: string;
  role: string;
  full_name: string | null;
  department: string | null;
  title: string | null;
  active: boolean;
};

type SyncProfileRequestBody = {
  accessToken?: string | null;
  next?: string | null;
  refreshToken?: string | null;
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

function jsonWithCookies(
  body: Record<string, unknown>,
  status: number,
  cookiesToSet: CookieToSet[] = [],
) {
  const response = NextResponse.json(body, { status });

  if (cookiesToSet.length > 0) {
    response.headers.set(
      "Cache-Control",
      "private, no-cache, no-store, must-revalidate, max-age=0",
    );
    response.headers.set("Expires", "0");
    response.headers.set("Pragma", "no-cache");
  }

  cookiesToSet.forEach(({ name, value, options }) => {
    response.cookies.set(name, value, options);
  });

  return response;
}

function pending(
  reason: string,
  status = 200,
  cookiesToSet: CookieToSet[] = [],
) {
  return jsonWithCookies(
    {
      reason,
      redirectTo: `/access-pending/?reason=${encodeURIComponent(reason)}`,
    },
    status,
    cookiesToSet,
  );
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

function getSupabaseAuthCookieName(supabaseUrl: string) {
  return `sb-${new URL(supabaseUrl).hostname.split(".")[0]}-auth-token`;
}

function queueSessionCookies(
  request: NextRequest,
  cookiesToSet: CookieToSet[],
  supabaseUrl: string,
  session: Session,
) {
  const cookieName = getSupabaseAuthCookieName(supabaseUrl);
  const existingCookieNames = request.cookies
    .getAll()
    .map((cookie) => cookie.name);
  const staleCookieNames = new Set(
    existingCookieNames.filter((name) => isChunkLike(name, cookieName)),
  );
  const encodedSession = `base64-${stringToBase64URL(JSON.stringify(session))}`;
  const sessionChunks = createChunks(cookieName, encodedSession);
  const baseOptions: CookieOptions = {
    ...DEFAULT_COOKIE_OPTIONS,
    secure: request.nextUrl.protocol === "https:",
  };

  sessionChunks.forEach(({ name }) => {
    staleCookieNames.delete(name);
  });

  staleCookieNames.forEach((name) => {
    cookiesToSet.push({
      name,
      value: "",
      options: { ...baseOptions, maxAge: 0 },
    });
  });

  sessionChunks.forEach(({ name, value }) => {
    cookiesToSet.push({
      name,
      value,
      options: {
        ...baseOptions,
        maxAge: DEFAULT_COOKIE_OPTIONS.maxAge,
      },
    });
  });
}

export async function POST(request: NextRequest) {
  const config = getSupabasePublicConfig();

  if (!hasSupabasePublicConfig(config)) {
    return pending("setup", 503);
  }

  const cookiesToSet: CookieToSet[] = [];
  const supabase = createServerClient(config.supabaseUrl, config.supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(nextCookiesToSet) {
        cookiesToSet.push(...nextCookiesToSet);
      },
    },
  });

  let next = "/";

  let accessToken: string | null = null;
  let refreshToken: string | null = null;

  try {
    const body = (await request.json()) as SyncProfileRequestBody;
    next = getSafeNextPath(body.next ?? null);
    accessToken = typeof body.accessToken === "string" ? body.accessToken : null;
    refreshToken =
      typeof body.refreshToken === "string" ? body.refreshToken : null;
  } catch {
    next = "/";
  }

  if (accessToken && refreshToken) {
    const { data: sessionData, error: sessionError } =
      await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

    if (sessionError) {
      console.error("Supabase server session sync failed", {
        message: sessionError.message,
        name: sessionError.name,
        status: sessionError.status,
      });
      return pending("session-sync", 401, cookiesToSet);
    }

    if (sessionData.session) {
      queueSessionCookies(
        request,
        cookiesToSet,
        config.supabaseUrl,
        sessionData.session,
      );
    }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const email = user?.email?.toLowerCase().trim();

  if (!user || !email) {
    return pending("missing-user", 401, cookiesToSet);
  }

  if (!isLoanFactoryEmail(email)) {
    await supabase.auth.signOut();
    return pending("domain", 403, cookiesToSet);
  }

  const admin = createSupabaseAdminClient();

  if (!admin) {
    return pending("setup", 503, cookiesToSet);
  }

  const { data: approvedUser, error: approvalError } = await admin
    .from("approved_users")
    .select("email,role,full_name,department,title,active")
    .eq("email", email)
    .eq("active", true)
    .maybeSingle<ApprovedUserRow>();

  if (approvalError) {
    logSupabaseSyncError("Supabase approved user lookup failed", approvalError);
    return pending("approval-sync", 500, cookiesToSet);
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
    return pending("profile-sync", 500, cookiesToSet);
  }

  if (!approvedUser) {
    return pending("pending", 200, cookiesToSet);
  }

  return jsonWithCookies(
    {
      status: "approved",
      role: approvedUser.role,
      redirectTo: next,
    },
    200,
    cookiesToSet,
  );
}
