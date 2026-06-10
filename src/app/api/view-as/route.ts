import { NextResponse, type NextRequest } from "next/server";
import { getRoleLabel } from "@/lib/supabase/auth";
import { resolveAdminAccess } from "@/lib/supabase/adminAccess";
import {
  VIEW_AS_COOKIE,
  encodeViewAsValue,
  type ViewAsState,
} from "@/lib/viewAs";
import { allowedViewAsRoleValues } from "@/data/adminViewAsRoles";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ViewAsBody = {
  role?: string;
  email?: string;
  name?: string;
  clear?: boolean;
};

export async function POST(request: NextRequest) {
  const access = await resolveAdminAccess();

  if (!access.allowed) {
    const resolvedLabel = access.resolvedRole
      ? getRoleLabel(access.resolvedRole)
      : "no resolved role";
    return NextResponse.json(
      {
        error: `View as role requires Master Admin or Admin access. Your current resolved role is: ${resolvedLabel}.`,
        reason: access.reason,
      },
      { status: 403 },
    );
  }

  let body: ViewAsBody;
  try {
    body = (await request.json()) as ViewAsBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const response = NextResponse.json({
    ok: true,
    resolvedVia: access.reason,
  });

  if (body.clear || !body.role) {
    response.cookies.set(VIEW_AS_COOKIE, "", { maxAge: 0, path: "/" });
    return response;
  }

  // View As only simulates the four business experiences. Reject internal /
  // database role variants so no orphaned preview permissions exist.
  if (!allowedViewAsRoleValues.has(body.role)) {
    return NextResponse.json(
      { error: "View as role supports Master Admin, Coach, LO Mastery Member, and Loan Factory Alliance Member only." },
      { status: 400 },
    );
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
