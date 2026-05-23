import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSafeNextPath } from "@/lib/supabase/auth";
import {
  getAuthCallbackUrl,
  getSiteUrl,
  getSupabasePublicConfig,
  hasSupabasePublicConfig,
} from "@/lib/supabase/config";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type CookieToSet = {
  name: string;
  value: string;
  options: CookieOptions;
};

function getCookieOptions(request: NextRequest): CookieOptions {
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const secure =
    forwardedProto === "https" || request.nextUrl.protocol === "https:";

  return {
    path: "/",
    sameSite: "none",
    secure,
  };
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

export async function GET(request: NextRequest) {
  const config = getSupabasePublicConfig();
  const cookiesToSet: CookieToSet[] = [];
  const headersToSet: Record<string, string> = {};
  const next = getSafeNextPath(request.nextUrl.searchParams.get("next"));

  if (!hasSupabasePublicConfig(config)) {
    return redirectWithCookies(
      request,
      "/login/?error=supabase-not-configured&stage=oauth-start-config",
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

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${getAuthCallbackUrl()}?next=${encodeURIComponent(next)}`,
      queryParams: {
        prompt: "select_account",
      },
    },
  });

  if (error || !data.url) {
    console.error("Supabase OAuth start failed", {
      hasProviderUrl: Boolean(data.url),
      message: error?.message ?? "Missing provider URL",
      name: error?.name,
      status: error?.status,
      stage: "oauth-start",
    });

    return redirectWithCookies(
      request,
      "/login/?error=oauth-start&stage=oauth-start",
      cookiesToSet,
      headersToSet,
    );
  }

  return responseWithCookies(
    NextResponse.redirect(data.url),
    cookiesToSet,
    headersToSet,
  );
}
