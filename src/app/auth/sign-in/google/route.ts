import { NextResponse, type NextRequest } from "next/server";
import { getSafeNextPath } from "@/lib/supabase/auth";
import { getAuthCallbackUrl } from "@/lib/supabase/config";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const next = getSafeNextPath(requestUrl.searchParams.get("next"));
  const origin = requestUrl.origin;
  const callbackUrl = new URL(getAuthCallbackUrl(), origin);

  if (next !== "/") {
    callbackUrl.searchParams.set("next", next);
  }

  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return NextResponse.redirect(
      new URL("/login/?error=supabase-not-configured", origin),
    );
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: callbackUrl.toString(),
      queryParams: {
        prompt: "select_account",
      },
    },
  });

  if (error || !data.url) {
    console.error("Supabase Google OAuth start failed", {
      message: error?.message,
      name: error?.name,
      status: error?.status,
    });
    return NextResponse.redirect(new URL("/login/?error=oauth-start", origin));
  }

  return NextResponse.redirect(data.url);
}
