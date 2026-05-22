import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function signOut() {
  const supabase = await createServerSupabaseClient();
  await supabase?.auth.signOut();
  redirect("/");
}

export async function GET() {
  await signOut();
}

export async function POST() {
  await signOut();
}
