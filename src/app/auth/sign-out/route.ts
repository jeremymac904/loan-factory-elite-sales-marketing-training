import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { appSessionCookieName } from "@/lib/supabase/app-session";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function signOut() {
  const supabase = await createServerSupabaseClient();
  const cookieStore = await cookies();
  cookieStore.set(appSessionCookieName, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "none",
    secure: true,
  });
  await supabase?.auth.signOut();
  redirect("/");
}

export async function GET() {
  await signOut();
}

export async function POST() {
  await signOut();
}
