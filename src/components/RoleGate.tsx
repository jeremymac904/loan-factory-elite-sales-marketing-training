import { ReactNode } from "react";
import { GatedSurface } from "@/lib/roles";
import { canAccessGate, getRoleLabel } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";
import AccessNotice from "@/components/AccessNotice";
import { resolveProtectedAccess } from "@/lib/supabase/protectedAccess";
import { getEffectiveAccess } from "@/lib/supabase/effectiveAccess";

type Props = {
  gate: GatedSurface;
  children: ReactNode;
};

export default function RoleGate({ gate, children }: Props) {
  return <RoleGateContent gate={gate}>{children}</RoleGateContent>;
}

async function RoleGateContent({ gate, children }: Props) {
  const session = await getBetaUserSession();
  const effective = await getEffectiveAccess();

  // Gate on the EFFECTIVE role. When an admin is viewing-as another role, that
  // previewed role (and ITS access lists) decides — the admin short-circuit is
  // dropped so a master_admin previewing Loan Officer is correctly denied staff
  // surfaces. Beta preview (no view-as) still opens surfaces for UI review.
  // permissions are passed as null during a view-as so the previewed role is
  // gated strictly by its role lists, not the real admin's permission row.
  const allowed = effective.isViewingAs
    ? canAccessGate(gate, effective.effectiveProfile, null)
    : effective.previewEnabled ||
      (session.status === "approved" &&
        canAccessGate(gate, session.profile, session.permissions));

  const access = resolveProtectedAccess(session, allowed);

  // A previewing admin who is allowed renders the content; a previewing admin
  // who is NOT allowed (e.g. viewing as Loan Officer on a staff gate) must see
  // the access notice, so the preview-bypass only applies when NOT viewing-as.
  if (allowed) {
    return <>{children}</>;
  }

  // When an admin is viewing-as a role that lacks this surface, the underlying
  // session is still "approved", so present an explicit access-denied notice
  // labeled with the EFFECTIVE (previewed) role rather than the admin's.
  const noticeStatus = effective.isViewingAs ? "access-denied" : access.status;
  const noticeRoleLabel = effective.isViewingAs
    ? getRoleLabel(effective.effectiveRole)
    : access.roleLabel;

  return (
    <AccessNotice
      surfaceLabel={gateToLabel(gate)}
      status={noticeStatus}
      roleLabel={noticeRoleLabel}
    >
      {noticeStatus === "not-configured" &&
        "Sign-in setup is not ready in this environment yet."}
      {noticeStatus === "signed-out" &&
        "Sign in with an approved Loan Factory Google account to continue."}
      {noticeStatus === "pending" &&
        "Your account is signed in, but access has not been approved yet."}
      {noticeStatus === "access-denied" &&
        "Your current role does not include this surface yet. Ask Jeremy or the coaching admin team to review access."}
    </AccessNotice>
  );
}

function gateToLabel(gate: GatedSurface): string {
  switch (gate) {
    case "admin":
      return "Admin";
    case "coach-center":
      return "Coach Command Center";
    case "dashboard":
      return "Dashboard";
    case "lo-development":
      return "Coaching Manager";
    case "loan-officer-support":
      return "Loan Officer Support";
    case "member-area":
      return "Member Area";
    case "normal-lo":
      return "Loan Officer";
    case "resources":
      return "Resources";
    case "support":
      return "Support";
    case "training-academy":
      return "Coach Support";
    case "marketing":
      return "Marketing";
    case "support-routing":
      return "Support Routing";
    case "coach-guide":
      return "Coach Guide";
    case "team-leader-guide":
      return "Team Leader Guide";
    case "clip-library":
      return "Clip Library";
    default:
      return "Restricted area";
  }
}
