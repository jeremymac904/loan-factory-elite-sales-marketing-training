import { getRoleLabel } from "@/lib/supabase/auth";
import type { BetaUserSession } from "@/lib/supabase/session";

export type ProtectedAccessStatus =
  | "not-configured"
  | "signed-out"
  | "pending"
  | "access-denied"
  | "approved";

export type ProtectedAccessDecision = {
  status: ProtectedAccessStatus;
  roleLabel: string | null;
  email: string | null;
  canAccess: boolean;
};

export function resolveProtectedAccess(
  session: BetaUserSession,
  canAccess: boolean,
): ProtectedAccessDecision {
  if (session.status === "not-configured") {
    return {
      status: "not-configured",
      roleLabel: null,
      email: null,
      canAccess: false,
    };
  }

  if (session.status === "signed-out") {
    return {
      status: "signed-out",
      roleLabel: null,
      email: null,
      canAccess: false,
    };
  }

  if (session.status === "pending") {
    return {
      status: "pending",
      roleLabel: getRoleLabel(session.profile?.role),
      email: session.user.email ?? null,
      canAccess: false,
    };
  }

  const roleLabel = getRoleLabel(session.profile.role);

  return {
    status: canAccess ? "approved" : "access-denied",
    roleLabel,
    email: session.profile.email ?? session.user.email ?? null,
    canAccess,
  };
}
