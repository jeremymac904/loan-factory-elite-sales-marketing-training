import type { ProfileRow } from "@/lib/supabase/auth";
import { isAdminRole } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";
import { getViewAsState } from "@/lib/viewAs";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";

// One shared "effective role" resolver. View-as is settable ONLY by admins
// (the /api/view-as route enforces resolveAdminAccess), and applying the
// previewed role can only RESTRICT what is shown — never grant extra access —
// so honoring it in gates/nav/assistant is safe and matches Jeremy's rule:
// "When View as role is active, every page must use the effective role, not the
// real admin role." Real admin rights are preserved separately via realIsAdmin
// for the preview banner + exit controls only.

export type EffectiveAccess = {
  status: "not-configured" | "signed-out" | "pending" | "approved";
  // The signed-in profile role (real identity).
  realRole: string | null;
  // True when the real signed-in user is an admin (or beta preview) — used ONLY
  // for safe preview/exit controls, never to bypass effective-role gating.
  realIsAdmin: boolean;
  // The role the platform should RENDER AS: the previewed role when an admin is
  // viewing-as, otherwise the real role.
  effectiveRole: string | null;
  isViewingAs: boolean;
  previewEnabled: boolean;
  // A synthetic, approved profile carrying the effective role, so existing
  // role-gating helpers (canAccessGate) can be reused against the previewed role
  // without a separate code path. Null when there is no usable role.
  effectiveProfile: ProfileRow | null;
};

function syntheticProfile(role: string): ProfileRow {
  // Minimal approved profile carrying only the effective role. canAccessGate
  // reads status + role (+ optional permissions, which we pass as null during a
  // preview so a previewed non-admin role is gated strictly by its role lists).
  return {
    id: "view-as-effective",
    email: "view-as@loanfactory.local",
    full_name: null,
    role,
    department: null,
    title: null,
    avatar_url: null,
    status: "approved",
  } as ProfileRow;
}

export async function getEffectiveAccess(): Promise<EffectiveAccess> {
  const [session, viewAs, previewEnabled] = await Promise.all([
    getBetaUserSession(),
    getViewAsState(),
    isBetaPreviewEnabled(),
  ]);

  const realRole =
    session.status === "approved" ? session.profile.role : null;
  const realIsAdmin = previewEnabled || isAdminRole(realRole);

  // Only an admin (or beta preview) may honor a view-as cookie. This is a
  // defense-in-depth check on top of the admin-only /api/view-as setter.
  const honorViewAs = Boolean(viewAs?.role) && realIsAdmin;
  const effectiveRole = honorViewAs ? (viewAs?.role ?? null) : realRole;

  const effectiveProfile =
    honorViewAs && effectiveRole
      ? syntheticProfile(effectiveRole)
      : session.status === "approved"
        ? session.profile
        : null;

  return {
    status: session.status,
    realRole,
    realIsAdmin,
    effectiveRole,
    isViewingAs: honorViewAs,
    previewEnabled,
    effectiveProfile,
  };
}

// Roles that may see the universal AI assistant. HARD RULE: regular loan_officer
// is NOT included. Paid coaching members + all operational/coach roles are.
// (vendor_partner_future and support_staff are intentionally excluded — only the
// roles Jeremy enumerated, plus the coaching_director leadership role and the
// legacy lo_development alias to avoid a regression.)
const ASSISTANT_ROLES = new Set<string>([
  "master_admin",
  "admin",
  "lo_development_lead",
  "lo_development_member",
  "lo_development",
  "training_academy",
  "loan_officer_support",
  "marketing",
  "corporate_coach",
  "corporate_coach_supervisor",
  "lo_mastery_coach",
  "loan_factory_alliance_coach",
  "coaching_director",
  "team_leader",
  "coaching_member_level_1",
  "coaching_member_level_2",
]);

// Whether a given role is allowed the AI assistant. loan_officer → false.
export function roleHasAssistant(role: string | null | undefined): boolean {
  return Boolean(role && ASSISTANT_ROLES.has(role));
}
