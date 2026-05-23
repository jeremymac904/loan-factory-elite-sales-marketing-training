import {
  DEFAULT_COOKIE_OPTIONS,
  combineChunks,
  createChunks,
  createServerClient,
  isChunkLike,
  stringFromBase64URL,
  stringToBase64URL,
  type CookieOptions,
} from "@supabase/ssr";
import type { PostgrestError, Session, User } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { getSafeNextPath } from "@/lib/supabase/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  getSiteUrl,
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

type ManualExchangeResult =
  | {
      data: { session: Session; user: User };
      error: null;
      stage: null;
    }
  | {
      data: null;
      error: {
        message: string;
        name: string;
        status?: number;
      };
      stage: "callback-missing-verifier" | "callback-token-exchange";
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

function responseWithCookies(
  response: NextResponse,
  cookiesToSet: CookieToSet[],
  headersToSet: Record<string, string>,
) {
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

function redirectWithCookies(
  request: NextRequest,
  path: string,
  cookiesToSet: CookieToSet[],
  headersToSet: Record<string, string>,
) {
  return responseWithCookies(
    NextResponse.redirect(new URL(path, getSiteUrl())),
    cookiesToSet,
    headersToSet,
  );
}

function pendingPath(reason: string) {
  return `/access-pending/?reason=${encodeURIComponent(reason)}`;
}

function browserCallbackPath(code: string, next: string) {
  const searchParams = new URLSearchParams({
    code,
    next,
    stage: "callback-missing-verifier",
  });

  return `/auth/browser-callback/?${searchParams.toString()}`;
}

function getSupabaseAuthCookieName(supabaseUrl: string) {
  return `sb-${new URL(supabaseUrl).hostname.split(".")[0]}-auth-token`;
}

function getCookieOptions(request: NextRequest): CookieOptions {
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const secure =
    forwardedProto === "https" || request.nextUrl.protocol === "https:";

  return {
    ...DEFAULT_COOKIE_OPTIONS,
    secure,
  };
}

function parseStorageValue(value: string) {
  const decoded = value.startsWith("base64-")
    ? stringFromBase64URL(value.substring("base64-".length))
    : value;

  try {
    return JSON.parse(decoded) as string;
  } catch {
    return null;
  }
}

async function readCodeVerifier(request: NextRequest, supabaseUrl: string) {
  const cookieName = `${getSupabaseAuthCookieName(supabaseUrl)}-code-verifier`;
  const cookieValue = await combineChunks(cookieName, async (chunkName) => {
    return request.cookies.get(chunkName)?.value ?? null;
  });

  if (!cookieValue || typeof cookieValue !== "string") {
    return null;
  }

  const storageValue = parseStorageValue(cookieValue);

  if (!storageValue) {
    return null;
  }

  const [codeVerifier] = storageValue.split("/");
  return codeVerifier || null;
}

function queueCookieRemoval(
  cookiesToSet: CookieToSet[],
  request: NextRequest,
  cookieName: string,
) {
  const baseOptions = getCookieOptions(request);

  request.cookies
    .getAll()
    .filter((cookie) => isChunkLike(cookie.name, cookieName))
    .forEach((cookie) => {
      cookiesToSet.push({
        name: cookie.name,
        value: "",
        options: { ...baseOptions, maxAge: 0 },
      });
    });
}

function queueSessionCookies(
  cookiesToSet: CookieToSet[],
  request: NextRequest,
  supabaseUrl: string,
  session: Session,
) {
  const cookieName = getSupabaseAuthCookieName(supabaseUrl);
  const staleCookieNames = new Set(
    request.cookies
      .getAll()
      .filter((cookie) => isChunkLike(cookie.name, cookieName))
      .map((cookie) => cookie.name),
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

  queueCookieRemoval(cookiesToSet, request, `${cookieName}-code-verifier`);
}

async function exchangeCodeWithTokenEndpoint(
  request: NextRequest,
  code: string,
  config: { supabaseUrl: string; supabaseAnonKey: string },
): Promise<ManualExchangeResult> {
  const codeVerifier = await readCodeVerifier(request, config.supabaseUrl);

  if (!codeVerifier) {
    return {
      data: null,
      error: {
        message: "PKCE code verifier cookie was not present on callback.",
        name: "AuthPKCECodeVerifierMissingError",
        status: 400,
      },
      stage: "callback-missing-verifier",
    };
  }

  const response = await fetch(
    `${config.supabaseUrl}/auth/v1/token?grant_type=pkce`,
    {
      method: "POST",
      headers: {
        apikey: config.supabaseAnonKey,
        Authorization: `Bearer ${config.supabaseAnonKey}`,
        "Content-Type": "application/json",
        "X-Client-Info": "loan-factory-auth-callback",
      },
      body: JSON.stringify({
        auth_code: code,
        code_verifier: codeVerifier,
      }),
      cache: "no-store",
    },
  );

  const bodyText = await response.text();
  let body: Record<string, unknown> | null = null;

  try {
    body = bodyText ? (JSON.parse(bodyText) as Record<string, unknown>) : null;
  } catch {
    body = null;
  }

  if (!response.ok) {
    return {
      data: null,
      error: {
        message:
          typeof body?.msg === "string"
            ? body.msg
            : typeof body?.message === "string"
              ? body.message
              : "Supabase token endpoint rejected the auth code.",
        name: "AuthPKCEGrantCodeExchangeError",
        status: response.status,
      },
      stage: "callback-token-exchange",
    };
  }

  const session = body as Session | null;

  if (!session?.access_token || !session.refresh_token || !session.user) {
    return {
      data: null,
      error: {
        message: "Supabase token endpoint returned an incomplete session.",
        name: "AuthInvalidTokenResponseError",
        status: response.status,
      },
      stage: "callback-token-exchange",
    };
  }

  return {
    data: {
      session,
      user: session.user,
    },
    error: null,
    stage: null,
  };
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
  const code = request.nextUrl.searchParams.get("code");
  const next = getSafeNextPath(request.nextUrl.searchParams.get("next"));
  const config = getSupabasePublicConfig();
  const cookiesToSet: CookieToSet[] = [];
  const headersToSet: Record<string, string> = {};

  if (!code) {
    return redirectWithCookies(
      request,
      "/login/?error=missing-code&stage=callback-missing-code",
      cookiesToSet,
      headersToSet,
    );
  }

  if (!hasSupabasePublicConfig(config)) {
    return redirectWithCookies(
      request,
      "/login/?error=supabase-not-configured&stage=callback-config",
      cookiesToSet,
      headersToSet,
    );
  }

  const supabase = createServerClient(config.supabaseUrl, config.supabaseAnonKey, {
    cookieOptions: getCookieOptions(request),
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
  let signedInUser = data.user;

  if (error || !signedInUser || !data.session) {
    const manualExchange = await exchangeCodeWithTokenEndpoint(
      request,
      code,
      config,
    );

    if (manualExchange.error || !manualExchange.data) {
      console.error("Supabase OAuth callback exchange failed", {
        hasCode: Boolean(code),
        hasUser: Boolean(signedInUser),
        manualStage: manualExchange.stage,
        message:
          manualExchange.error?.message ??
          error?.message ??
          "Missing user after code exchange",
        name: manualExchange.error?.name ?? error?.name,
        status: manualExchange.error?.status ?? error?.status,
        stage: "callback-exchange",
      });

      if (manualExchange.stage === "callback-missing-verifier") {
        return redirectWithCookies(
          request,
          browserCallbackPath(code, next),
          cookiesToSet,
          headersToSet,
        );
      }

      return redirectWithCookies(
        request,
        `/login/?error=auth-callback&stage=${manualExchange.stage ?? "callback-exchange"}`,
        cookiesToSet,
        headersToSet,
      );
    }

    queueSessionCookies(
      cookiesToSet,
      request,
      config.supabaseUrl,
      manualExchange.data.session,
    );
    signedInUser = manualExchange.data.user;
  }

  const profileSync = await syncApprovedProfile(signedInUser);

  if (profileSync.status !== "approved") {
    if (profileSync.reason === "domain") {
      await supabase.auth.signOut();
    }

    return redirectWithCookies(
      request,
      pendingPath(profileSync.reason),
      cookiesToSet,
      headersToSet,
    );
  }

  return redirectWithCookies(request, next, cookiesToSet, headersToSet);
}
