import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { getRoleLabel, isAdminRole } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";
import { getViewAsState } from "@/lib/viewAs";

// Roles that may open the Coach Command Center at all.
const COACH_ROLES = [
  "master_admin",
  "admin",
  "lo_development_lead",
  "lo_development_member",
  "training_academy",
  "corporate_coach",
  "corporate_coach_supervisor",
  "lo_mastery_coach",
  "loan_factory_alliance_coach",
  "coaching_director",
  "team_leader",
];

// Roles that see ALL coaches, team leaders, assignments and members.
const SEE_ALL_ROLES = [
  "master_admin",
  "admin",
  "lo_development_lead",
  "corporate_coach_supervisor",
  "lo_mastery_coach",
  "loan_factory_alliance_coach",
  "coaching_director",
];

// Pure check for navigation gating (real role; no View-As). Used to decide
// whether to surface the Coach Command Center link in shared chrome.
export function roleCanCoach(role: string | null | undefined): boolean {
  return (
    isAdminRole(role) ||
    (typeof role === "string" && COACH_ROLES.includes(role))
  );
}

export type CoachScope =
  | "all"
  | "corporate_coach"
  | "lo_development"
  | "team_leader"
  | "none";

export type CoachAccess = {
  status: "not-configured" | "signed-out" | "pending" | "approved";
  previewEnabled: boolean;
  // Role the page renders AS (View-As aware so admins can record each view).
  effectiveRole: string | null;
  effectiveRoleLabel: string;
  viewingAsLabel: string | null;
  realIsAdmin: boolean;
  // Entitlement.
  isCoach: boolean; // may open the command center
  seesAll: boolean; // org-wide view (admin / LO Development lead)
  scope: CoachScope; // which relationship set this role manages
};

export async function getCoachAccess(): Promise<CoachAccess> {
  const session = await getBetaUserSession();
  const previewEnabled = await isBetaPreviewEnabled();
  const viewAs = await getViewAsState();

  const realRole = session.status === "approved" ? session.profile.role : null;
  const realIsAdmin = previewEnabled || isAdminRole(realRole);

  const honorViewAs = Boolean(viewAs?.role) && (realIsAdmin || previewEnabled);
  const effectiveRole = honorViewAs ? (viewAs?.role ?? null) : realRole;
  const viewingAsLabel = honorViewAs ? (viewAs?.role ?? null) : null;

  const roleForGate = effectiveRole ?? "";
  const isCoach =
    (previewEnabled && !honorViewAs) ||
    isAdminRole(roleForGate) ||
    COACH_ROLES.includes(roleForGate);

  const seesAll =
    (previewEnabled && !honorViewAs) ||
    isAdminRole(roleForGate) ||
    SEE_ALL_ROLES.includes(roleForGate);

  let scope: CoachScope = "none";
  if (seesAll) scope = "all";
  else if (roleForGate === "corporate_coach") scope = "corporate_coach";
  else if (roleForGate === "corporate_coach_supervisor") scope = "all";
  else if (roleForGate === "lo_mastery_coach") scope = "all";
  else if (roleForGate === "loan_factory_alliance_coach") scope = "all";
  else if (roleForGate === "coaching_director") scope = "all";
  else if (roleForGate === "team_leader") scope = "team_leader";
  else if (
    roleForGate === "lo_development_member" ||
    roleForGate === "training_academy"
  ) {
    scope = "lo_development";
  }

  return {
    status: session.status,
    previewEnabled,
    effectiveRole,
    effectiveRoleLabel: previewEnabled && !honorViewAs
      ? "Internal Review"
      : getRoleLabel(effectiveRole),
    viewingAsLabel,
    realIsAdmin,
    isCoach,
    seesAll,
    scope,
  };
}
