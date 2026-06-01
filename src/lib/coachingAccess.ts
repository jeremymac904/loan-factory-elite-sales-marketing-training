import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { getRoleLabel } from "@/lib/supabase/auth";
import { isAdminRole } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";
import { getViewAsState } from "@/lib/viewAs";

// Roles that get full coaching access to BOTH tiers for support / training /
// admin purposes (not paying members, but they need to see everything).
const FULL_COACHING_STAFF_ROLES = [
  "lo_development_lead",
  "lo_development_member",
  "lo_development",
  "training_academy",
  "corporate_coach",
  "team_leader",
];

export type CoachingTier = "none" | "lo_mastery" | "alliance" | "staff";

export type CoachingAccess = {
  // Auth state from the real session.
  status: "not-configured" | "signed-out" | "pending" | "approved";
  previewEnabled: boolean;
  // The role the page is rendering AS (View-As aware so admins can record each
  // tier). Equals the real role unless an admin has an active View-As.
  effectiveRole: string | null;
  effectiveRoleLabel: string;
  // Display label when an admin is previewing another role (else null).
  viewingAsLabel: string | null;
  realIsAdmin: boolean;
  // Computed entitlement.
  tier: CoachingTier;
  canLoMastery: boolean; // may open $249 LO Mastery content
  canAlliance: boolean; // may open $449 Alliance content
  isUpgradePreview: boolean; // lo_mastery member viewing Alliance -> show locks
  isMember: boolean; // has a paid coaching tier
  isStaff: boolean; // full staff/coach/admin access to both tiers
};

const TIER_RANK: Record<CoachingTier, number> = {
  none: 0,
  lo_mastery: 1,
  alliance: 2,
  staff: 3,
};

function higherTier(a: CoachingTier, b: CoachingTier): CoachingTier {
  return TIER_RANK[a] >= TIER_RANK[b] ? a : b;
}

function tierFromRole(role: string | null | undefined): CoachingTier {
  if (!role) return "none";
  if (isAdminRole(role)) return "staff";
  if (FULL_COACHING_STAFF_ROLES.includes(role)) return "staff";
  if (role === "coaching_member_level_2") return "alliance";
  if (role === "coaching_member_level_1") return "lo_mastery";
  return "none";
}

// Secondary signal: an explicit coaching_tier value on the profile, for members
// assigned a tier by field rather than by role.
function tierFromField(value: string | null | undefined): CoachingTier {
  if (!value) return "none";
  const v = value.toLowerCase();
  if (v.includes("alliance") || v.includes("level_2") || v.includes("449")) {
    return "alliance";
  }
  if (
    v.includes("mastery") ||
    v.includes("level_1") ||
    v.includes("249") ||
    v.includes("lo_mastery")
  ) {
    return "lo_mastery";
  }
  return "none";
}

export async function getCoachingAccess(): Promise<CoachingAccess> {
  const session = await getBetaUserSession();
  const previewEnabled = await isBetaPreviewEnabled();
  const viewAs = await getViewAsState();

  const realRole =
    session.status === "approved" ? session.profile.role : null;
  const realIsAdmin = previewEnabled || isAdminRole(realRole);

  // View-As is only honored for admins / internal preview (the cookie is itself
  // admin-only + httpOnly, but we gate again as defense in depth). When active,
  // the page renders AS the viewed role so each tier can be recorded.
  const honorViewAs = Boolean(viewAs?.role) && (realIsAdmin || previewEnabled);
  const effectiveRole = honorViewAs
    ? (viewAs?.role ?? null)
    : realRole;
  const viewingAsLabel = honorViewAs ? (viewAs?.role ?? null) : null;

  let tier: CoachingTier = tierFromRole(effectiveRole);

  // Internal preview with no specific View-As role = full staff view.
  if (previewEnabled && !honorViewAs) {
    tier = "staff";
  }

  // Real (non-View-As) members may carry their tier on the profile field.
  if (!honorViewAs && session.status === "approved") {
    tier = higherTier(tier, tierFromField(session.profile.coaching_tier));
  }

  const isStaff = tier === "staff";
  const canAlliance = tier === "staff" || tier === "alliance";
  const canLoMastery = canAlliance || tier === "lo_mastery";

  return {
    status: session.status,
    previewEnabled,
    effectiveRole,
    effectiveRoleLabel: previewEnabled && !honorViewAs
      ? "Internal Review"
      : getRoleLabel(effectiveRole),
    viewingAsLabel,
    realIsAdmin,
    tier,
    canLoMastery,
    canAlliance,
    isUpgradePreview: tier === "lo_mastery",
    isMember: tier === "lo_mastery" || tier === "alliance",
    isStaff,
  };
}
