import { createClient, type User } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "./admin";
import {
  getSupabasePublicConfig,
  hasSupabasePublicConfig,
} from "./config";

export type AccessTokenUserResult =
  | { user: User; error: null; method: "auth-user" | "verified-claims" }
  | { user: null; error: { message: string; status?: number }; method: null };

function getSafeMessage(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function createTokenClient(config: { supabaseUrl: string; supabaseAnonKey: string }) {
  return createClient(config.supabaseUrl, config.supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}

export async function getUserFromAccessToken(
  accessToken: string,
): Promise<AccessTokenUserResult> {
  const config = getSupabasePublicConfig();

  if (!hasSupabasePublicConfig(config)) {
    return {
      user: null,
      error: { message: "Supabase public configuration is missing." },
      method: null,
    };
  }

  const directResponse = await fetch(`${config.supabaseUrl}/auth/v1/user`, {
    cache: "no-store",
    headers: {
      apikey: config.supabaseAnonKey,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (directResponse.ok) {
    return {
      user: (await directResponse.json()) as User,
      error: null,
      method: "auth-user",
    };
  }

  let directMessage = "Supabase Auth user validation failed.";

  try {
    const body = (await directResponse.json()) as {
      message?: unknown;
      msg?: unknown;
    };
    directMessage = getSafeMessage(body.message ?? body.msg, directMessage);
  } catch {
    // Keep the generic safe message when Supabase returns non-JSON.
  }

  const tokenClient = createTokenClient(config);
  const { data: claimsData, error: claimsError } =
    await tokenClient.auth.getClaims(accessToken);
  const subject = claimsData?.claims?.sub;

  if (claimsError || typeof subject !== "string" || !subject.trim()) {
    return {
      user: null,
      error: {
        message: getSafeMessage(claimsError?.message, directMessage),
        status: directResponse.status,
      },
      method: null,
    };
  }

  const admin = createSupabaseAdminClient();

  if (!admin) {
    return {
      user: null,
      error: { message: "Supabase admin configuration is missing." },
      method: null,
    };
  }

  const {
    data: { user },
    error: adminError,
  } = await admin.auth.admin.getUserById(subject);

  if (adminError || !user) {
    return {
      user: null,
      error: {
        message: getSafeMessage(
          adminError?.message,
          "Supabase admin user lookup failed.",
        ),
      },
      method: null,
    };
  }

  return { user, error: null, method: "verified-claims" };
}
