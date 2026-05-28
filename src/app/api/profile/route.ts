import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getBetaUserSession } from "@/lib/supabase/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ProfileUpdateBody = {
  full_name?: string | null;
  phone?: string | null;
  secondary_phone?: string | null;
  title?: string | null;
  department?: string | null;
  team_brand?: string | null;
  profile_url?: string | null;
  bio?: string | null;
  nmls?: string | null;
  states_licensed?: string[] | null;
  preferred_language?: string | null;
  timezone?: string | null;
  avatar_url?: string | null;
};

const allowedKeys: Array<keyof ProfileUpdateBody> = [
  "full_name",
  "phone",
  "secondary_phone",
  "title",
  "department",
  "team_brand",
  "profile_url",
  "bio",
  "nmls",
  "states_licensed",
  "preferred_language",
  "timezone",
  "avatar_url",
];

export async function POST(request: NextRequest) {
  const session = await getBetaUserSession();

  if (session.status !== "approved") {
    return NextResponse.json(
      { error: "Not authorized. Sign in with an approved Loan Factory account." },
      { status: 401 },
    );
  }

  let body: ProfileUpdateBody;
  try {
    body = (await request.json()) as ProfileUpdateBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const update: Record<string, unknown> = {};
  for (const key of allowedKeys) {
    if (key in body) {
      update[key] = body[key];
    }
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  update.updated_at = new Date().toISOString();

  const admin = createSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json(
      { error: "Supabase service not configured" },
      { status: 503 },
    );
  }

  const { data, error } = await admin
    .from("profiles")
    .update(update)
    .eq("id", session.user.id)
    .select()
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { error: "Profile update failed", details: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ profile: data });
}
