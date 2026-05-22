import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabasePublicConfig, hasSupabasePublicConfig } from "./config";

export async function createServerSupabaseClient() {
  const config = getSupabasePublicConfig();

  if (!hasSupabasePublicConfig(config)) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(config.supabaseUrl, config.supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot write cookies; the proxy refreshes sessions.
        }
      },
    },
  });
}
