import { NextResponse, type NextRequest } from "next/server";
import {
  DEFAULT_COOKIE_OPTIONS,
  createChunks,
  createServerClient,
  isChunkLike,
  stringToBase64URL,
  type CookieOptions,
} from "@supabase/ssr";
import {
  type PostgrestError,
  type Session,
  type User,
} from "@supabase/supabase-js";
import { getSafeNextPath } from "@/lib/supabase/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  getSupabasePublicConfig,
  hasSupabasePublicConfig,
  isLoanFactoryEmail,
} from "@/lib/supabase/config";
import { getUserFromAccessToken } from "@/lib/supabase/token-validation";

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
  expiresAt?: number | null;
  expiresIn?: number | null;
  next?: string | null;
  refreshToken?: string | null;
};

type CookieToSet = {
  name: string;
  value: string;
  options: CookieOptions;
};

type SafeSyncDebug = {
  callbackStage?: string;
  syncProfileAttempted: boolean;
  syncProfileReceivedSession: boolean;
  syncProfileSucceeded: boolean;
  syncProfileCookieWriteAttempted: boolean;
  syncProfileCookieCount: number;
  profileEmail: string | null;
  profileRole: string | null;
  profileStatus: string | null;
  lastErrorCode: string | null;
  lastErrorMessage: string | null;
};

function getCookieOptions(request: NextRequest): CookieOptions {
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const secure =
    forwardedProto === "https" || request.nextUrl.protocol === "https:";

  return {
    ...DEFAULT_COOKIE_OPTIONS,
    secure,
  };
}

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
  debug: Partial<SafeSyncDebug> = {},
) {
  return jsonWithCookies(
    {
      reason,
      redirectTo: `/access-pending/?reason=${encodeURIComponent(reason)}`,
      debug: {
        callbackStage: `sync-profile-${reason}`,
        syncProfileAttempted: true,
        syncProfileReceivedSession: false,
        syncProfileSucceeded: false,
        syncProfileCookieWriteAttempted: cookiesToSet.length > 0,
        syncProfileCookieCount: cookiesToSet.length,
        profileEmail: null,
        profileRole: null,
        profileStatus: null,
        lastErrorCode: reason,
        lastErrorMessage: `sync-profile stopped at ${reason}`,
        ...debug,
      },
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
  const baseOptions = getCookieOptions(request);

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
  let syncedUser: User | null = null;
  const supabase = createServerClient(config.supabaseUrl, config.supabaseAnonKey, {
    cookieOptions: getCookieOptions(request),
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
  let expiresAt: number | null = null;
  let expiresIn: number | null = null;
  let refreshToken: string | null = null;
  let receivedSession = false;

  try {
    const body = (await request.json()) as SyncProfileRequestBody;
    next = getSafeNextPath(body.next ?? null);
    accessToken = typeof body.accessToken === "string" ? body.accessToken : null;
    expiresAt = typeof body.expiresAt === "number" ? body.expiresAt : null;
    expiresIn = typeof body.expiresIn === "number" ? body.expiresIn : null;
    refreshToken =
      typeof body.refreshToken === "string" ? body.refreshToken : null;
    receivedSession = Boolean(accessToken && refreshToken);
  } catch {
    next = "/";
  }

  if (accessToken && refreshToken) {
    const { user: validatedUser, error: validationError, method } =
      await getUserFromAccessToken(accessToken);

    if (validationError || !validatedUser) {
      console.error("Supabase browser token validation failed", {
        message: validationError?.message ?? "Missing validated user",
        status: validationError?.status,
      });
      return pending("session-validate", 401, cookiesToSet, {
        syncProfileReceivedSession: receivedSession,
        lastErrorMessage:
          validationError?.message ?? "Supabase browser token validation failed.",
      });
    }

    console.info("Supabase browser token validation succeeded", { method });

    const sessionExpiresIn = expiresIn ?? 3600;
    const sessionExpiresAt =
      expiresAt ?? Math.floor(Date.now() / 1000) + sessionExpiresIn;
    const validatedSession: Session = {
      access_token: accessToken,
      expires_at: sessionExpiresAt,
      expires_in: sessionExpiresIn,
      refresh_token: refreshToken,
      token_type: "bearer",
      user: validatedUser,
    };

    syncedUser = validatedUser;
    queueSessionCookies(
      request,
      cookiesToSet,
      config.supabaseUrl,
      validatedSession,
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const activeUser = syncedUser ?? user;
  const email = activeUser?.email?.toLowerCase().trim();

  if (!activeUser || !email) {
    return pending("missing-user", 401, cookiesToSet, {
      syncProfileReceivedSession: receivedSession,
      syncProfileCookieWriteAttempted: cookiesToSet.length > 0,
      syncProfileCookieCount: cookiesToSet.length,
    });
  }

  if (!isLoanFactoryEmail(email)) {
    await supabase.auth.signOut();
    return pending("domain", 403, cookiesToSet, {
      syncProfileReceivedSession: receivedSession,
      profileEmail: email,
      lastErrorMessage: "Signed-in email is not a Loan Factory email.",
    });
  }

  const admin = createSupabaseAdminClient();

  if (!admin) {
    return pending("setup", 503, cookiesToSet, {
      syncProfileReceivedSession: receivedSession,
      profileEmail: email,
    });
  }

  const { data: approvedUser, error: approvalError } = await admin
    .from("approved_users")
    .select("email,role,full_name,department,title,active")
    .eq("email", email)
    .eq("active", true)
    .maybeSingle<ApprovedUserRow>();

  if (approvalError) {
    logSupabaseSyncError("Supabase approved user lookup failed", approvalError);
    return pending("approval-sync", 500, cookiesToSet, {
      syncProfileReceivedSession: receivedSession,
      profileEmail: email,
      lastErrorMessage: "Approved user lookup failed.",
    });
  }

  const profileStatus = approvedUser ? "approved" : "pending";

  const { error: profileError } = await admin.from("profiles").upsert(
    {
      id: activeUser.id,
      email,
      full_name:
        approvedUser?.full_name ??
        getMetadataValue(activeUser, ["full_name", "name"]),
      role: approvedUser?.role ?? null,
      department: approvedUser?.department ?? null,
      title: approvedUser?.title ?? null,
      avatar_url: getMetadataValue(activeUser, ["avatar_url", "picture"]),
      status: profileStatus,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "email" },
  );

  if (profileError) {
    logSupabaseSyncError("Supabase profile upsert failed", profileError);
    return pending("profile-sync", 500, cookiesToSet, {
      syncProfileReceivedSession: receivedSession,
      profileEmail: email,
      profileRole: approvedUser?.role ?? null,
      profileStatus,
      lastErrorMessage: "Profile upsert failed.",
    });
  }

  if (!approvedUser) {
    return pending("pending", 200, cookiesToSet, {
      syncProfileReceivedSession: receivedSession,
      profileEmail: email,
      profileStatus,
      lastErrorMessage: "User is not active in approved_users.",
    });
  }

  return jsonWithCookies(
    {
      status: "approved",
      role: approvedUser.role,
      redirectTo: next,
      debug: {
        callbackStage: "sync-profile-approved",
        syncProfileAttempted: true,
        syncProfileReceivedSession: receivedSession,
        syncProfileSucceeded: true,
        syncProfileCookieWriteAttempted: cookiesToSet.length > 0,
        syncProfileCookieCount: cookiesToSet.length,
        profileEmail: email,
        profileRole: approvedUser.role,
        profileStatus,
        lastErrorCode: null,
        lastErrorMessage: null,
      },
    },
    200,
    cookiesToSet,
  );
}
