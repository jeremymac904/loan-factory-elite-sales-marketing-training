import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { getSupabasePublicConfig, hasSupabasePublicConfig } from "./config";

export function createBrowserSupabaseClient() {
  const config = getSupabasePublicConfig();

  if (!hasSupabasePublicConfig(config)) {
    return null;
  }

  return createBrowserClient(config.supabaseUrl, config.supabaseAnonKey);
}

export function createBrowserOAuthSupabaseClient() {
  const config = getSupabasePublicConfig();

  if (!hasSupabasePublicConfig(config)) {
    return null;
  }

  return createClient(config.supabaseUrl, config.supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      flowType: "pkce",
      persistSession: true,
      storageKey: "lf-lo-dev-oauth",
    },
  });
}
