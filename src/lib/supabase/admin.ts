import { createClient } from "@supabase/supabase-js";
import { getSupabasePublicConfig, hasSupabasePublicConfig } from "./config";

export function hasSupabaseAdminConfig(): boolean {
  const config = getSupabasePublicConfig();
  return hasSupabasePublicConfig(config) && Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function createSupabaseAdminClient() {
  const config = getSupabasePublicConfig();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!hasSupabasePublicConfig(config) || !serviceRoleKey) {
    return null;
  }

  return createClient(config.supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
