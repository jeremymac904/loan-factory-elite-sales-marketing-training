import { createBrowserClient } from "@supabase/ssr";
import { getSupabasePublicConfig, hasSupabasePublicConfig } from "./config";

export function createBrowserSupabaseClient() {
  const config = getSupabasePublicConfig();

  if (!hasSupabasePublicConfig(config)) {
    return null;
  }

  return createBrowserClient(config.supabaseUrl, config.supabaseAnonKey, {
    auth: {
      detectSessionInUrl: false,
    },
  });
}
