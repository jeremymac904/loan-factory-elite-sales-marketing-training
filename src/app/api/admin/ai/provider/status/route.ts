import { NextResponse } from "next/server";
import { isAdminRole } from "@/lib/supabase/auth";
import { getPublicAiSandboxStatus } from "@/lib/ai/config";
import { getBetaUserSession } from "@/lib/supabase/session";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const session = await getBetaUserSession();

  const accessAllowed =
    session.status === "approved" &&
    session.profile.role === "master_admin" &&
    (session.permissions?.can_access_admin || isAdminRole(session.profile.role));

  if (!accessAllowed) {
    return NextResponse.json(
      {
        accessAllowed: false,
        message: "AI provider diagnostics are available to master admin only.",
      },
      { status: 403, headers: { "Cache-Control": "no-store" } },
    );
  }

  const status = getPublicAiSandboxStatus();

  return NextResponse.json(
    {
      accessAllowed: true,
      ...status,
    },
    {
      headers: { "Cache-Control": "no-store" },
    },
  );
}
