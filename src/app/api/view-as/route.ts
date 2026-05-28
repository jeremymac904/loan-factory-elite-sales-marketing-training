import { NextResponse, type NextRequest } from "next/server";
import { isAdminRole } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";
import {
  VIEW_AS_COOKIE,
  encodeViewAsValue,
  type ViewAsState,
} from "@/lib/viewAs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ViewAsBody = {
  role?: string;
  email?: string;
  name?: string;
  clear?: boolean;
};

export async function POST(request: NextRequest) {
  const session = await getBetaUserSession();

  if (
    session.status !== "approved" ||
    !(session.profile.role === "master_admin" || isAdminRole(session.profile.role))
  ) {
    return NextResponse.json(
      { error: "Only admins can use View-As mode." },
      { status: 403 },
    );
  }

  let body: ViewAsBody;
  try {
    body = (await request.json()) as ViewAsBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true });

  if (body.clear || !body.role) {
    response.cookies.set(VIEW_AS_COOKIE, "", { maxAge: 0, path: "/" });
    return response;
  }

  const state: ViewAsState = {
    role: body.role,
    email: body.email,
    name: body.name,
  };

  response.cookies.set(VIEW_AS_COOKIE, encodeViewAsValue(state), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(VIEW_AS_COOKIE, "", { maxAge: 0, path: "/" });
  return response;
}
