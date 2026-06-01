import { ReactNode } from "react";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { GatedSurface } from "@/lib/roles";
import { canAccessGate } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";
import AccessNotice from "@/components/AccessNotice";
import { resolveProtectedAccess } from "@/lib/supabase/protectedAccess";

type Props = {
  gate: GatedSurface;
  children: ReactNode;
};

export default function RoleGate({ gate, children }: Props) {
  return <RoleGateContent gate={gate}>{children}</RoleGateContent>;
}

async function RoleGateContent({ gate, children }: Props) {
  const session = await getBetaUserSession();
  const previewEnabled = await isBetaPreviewEnabled();
  const allowed =
    previewEnabled ||
    (session.status === "approved" &&
      canAccessGate(gate, session.profile, session.permissions));
  const access = resolveProtectedAccess(session, allowed);

  if (access.status === "approved" || previewEnabled) {
    return <>{children}</>;
  }

  return (
    <AccessNotice
      surfaceLabel={gateToLabel(gate)}
      status={access.status}
      roleLabel={access.roleLabel}
    >
      {access.status === "not-configured" &&
        "Sign-in setup is not ready in this environment yet."}
      {access.status === "signed-out" &&
        "Sign in with an approved Loan Factory Google account to continue."}
      {access.status === "pending" &&
        "Your account is signed in, but access has not been approved yet."}
      {access.status === "access-denied" &&
        "Your current role does not include this surface yet. Ask Jeremy or LO Development to review access."}
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
      return "LO Development";
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
      return "Training Academy";
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
