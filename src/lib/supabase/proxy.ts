import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabasePublicConfig, hasSupabasePublicConfig } from "./config";

export async function updateSession(request: NextRequest) {
  const config = getSupabasePublicConfig();

  if (!hasSupabasePublicConfig(config)) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    config.supabaseUrl,
    config.supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          supabaseResponse = NextResponse.next({ request });

          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });

          Object.entries(headers).forEach(([key, value]) => {
            supabaseResponse.headers.set(key, value);
          });
        },
      },
    },
  );

  await supabase.auth.getClaims();

  return supabaseResponse;
}
