/**
 * Single source of truth for the global top navigation.
 *
 * The nav is EFFECTIVE-ROLE AWARE. SiteHeader resolves the effective role via
 * getEffectiveAccess() (admin "View as role" is honored — viewing-as a Loan
 * Officer renders the Loan Officer nav, never staff links) and asks
 * getNavForRole(effectiveRole) for the list to render.
 *
 * Labels follow the hard naming rules for the LO Development Platform:
 * - "Sales & Marketing" is the FREE internal 101-601 training (never mixed
 *   with paid coaching, never called "Elite").
 * - "AI Advantage" is the AI training track.
 * - Admin / coach tooling is intentionally NOT in this global nav — those
 *   live in the role-aware account dropdown rendered by HeaderAuthStatus.
 *
 * Keep these lists short and clean. Every entry must point at a real route.
 *
 * Role keys mirror @/lib/supabase/auth roleLabels. This module does NOT redefine
 * role/access logic — it only maps an already-resolved role string to a link
 * list. Honoring an effective role here can only RESTRICT the nav, never grant
 * extra access.
 */
export type PrimaryNavItem = {
  label: string;
  href: string;
};

// ---------------------------------------------------------------------------
// Shared link atoms (single definition so labels/hrefs stay consistent across
// every role variant).
// ---------------------------------------------------------------------------
const NAV = {
  // Loan-Officer-facing dashboard.
  loDashboard: { label: "Dashboard", href: "/normal-lo/" },
  // Staff/operational/coach dashboard hub.
  staffDashboard: { label: "Dashboard", href: "/dashboard/" },

  // LO-facing training surfaces (NOT the /training-academy staff dashboard).
  trainingLibrary: { label: "Training", href: "/training-library/" },

  // Staff surfaces — intentionally restricted to the roles that own them.
  loDevStaff: { label: "LO Dev", href: "/lo-development/" },
  trainingAcademyStaff: { label: "Training", href: "/training-academy/" },
  coachingOps: { label: "Coaching", href: "/coaching/" },
  marketingOps: { label: "Marketing", href: "/marketing/" },

  // Shared, broadly-available surfaces.
  salesMarketing: { label: "Sales & Marketing", href: "/sales-training/" },
  aiAdvantage: { label: "AI Advantage", href: "/ai-training/" },
  faceGram: { label: "FaceGram", href: "/facegram/" },
  resources: { label: "Resources", href: "/resources/" },

  // Support: LO-facing request guidance vs. the staff support queue.
  loSupport: { label: "Support", href: "/support-routing/" },
  staffSupport: { label: "Support", href: "/loan-officer-support/" },
} satisfies Record<string, PrimaryNavItem>;

// ---------------------------------------------------------------------------
// Role variant lists.
// ---------------------------------------------------------------------------

// Regular Loan Officer (and any non-staff / unknown role). NO staff surfaces:
// no /lo-development, no /training-academy, no coaching ops, no marketing ops.
const loanOfficerNav: PrimaryNavItem[] = [
  NAV.loDashboard,
  NAV.trainingLibrary,
  NAV.salesMarketing,
  NAV.aiAdvantage,
  NAV.faceGram,
  NAV.loSupport,
  NAV.resources,
];

// LOGGED-OUT informational nav. This is an internal Loan Factory subdomain that
// must explain the platform to a first-time visitor BEFORE sign-in. It points
// at the PUBLIC overview pages only (Coaching overview is restored here), and
// "Dashboard" is replaced by a "Sign In" affordance rendered separately in the
// header. No protected dashboard links.
const loggedOutNav: PrimaryNavItem[] = [
  NAV.trainingLibrary, // "Training" overview
  NAV.salesMarketing, // free 101-601 overview
  NAV.aiAdvantage, // AI Advantage overview
  NAV.coachingOps, // "Coaching" overview — restored for logged-out visitors
  NAV.faceGram, // FaceGram overview
  NAV.loSupport, // Support overview
  NAV.resources, // Resources overview
];

// Paid coaching members (LO Mastery / Loan Factory Alliance). LO-facing surfaces
// PLUS a Coaching entry into their member experience. Still NOT staff — no LO Dev
// or Training Academy staff dashboards.
const coachingMemberNav: PrimaryNavItem[] = [
  NAV.loDashboard,
  NAV.coachingOps,
  NAV.trainingLibrary,
  NAV.salesMarketing,
  NAV.aiAdvantage,
  NAV.faceGram,
  NAV.loSupport,
  NAV.resources,
];

// Coach / coaching-leadership roles. Staff-style nav centered on Coaching.
const coachNav: PrimaryNavItem[] = [
  NAV.staffDashboard,
  NAV.coachingOps,
  NAV.trainingAcademyStaff,
  NAV.salesMarketing,
  NAV.aiAdvantage,
  NAV.faceGram,
  NAV.staffSupport,
  NAV.resources,
];

// LO Development staff + admins. Full operational nav including LO Dev.
const loDevStaffNav: PrimaryNavItem[] = [
  NAV.staffDashboard,
  NAV.loDevStaff,
  NAV.trainingAcademyStaff,
  NAV.coachingOps,
  NAV.salesMarketing,
  NAV.aiAdvantage,
  NAV.faceGram,
  NAV.staffSupport,
  NAV.resources,
];

// Training Academy staff.
const trainingAcademyNav: PrimaryNavItem[] = [
  NAV.staffDashboard,
  NAV.trainingAcademyStaff,
  NAV.coachingOps,
  NAV.salesMarketing,
  NAV.aiAdvantage,
  NAV.faceGram,
  NAV.staffSupport,
  NAV.resources,
];

// Marketing staff.
const marketingNav: PrimaryNavItem[] = [
  NAV.staffDashboard,
  NAV.marketingOps,
  NAV.trainingAcademyStaff,
  NAV.salesMarketing,
  NAV.aiAdvantage,
  NAV.faceGram,
  NAV.staffSupport,
  NAV.resources,
];

// Loan Officer Support staff.
const supportStaffNav: PrimaryNavItem[] = [
  NAV.staffDashboard,
  NAV.trainingAcademyStaff,
  NAV.salesMarketing,
  NAV.aiAdvantage,
  NAV.faceGram,
  NAV.staffSupport,
  NAV.resources,
];

/**
 * Backward-compatible staff default. Kept exported because callers historically
 * imported `primaryNav` directly; it now represents the full LO Development /
 * admin operational nav (the richest variant).
 */
export const primaryNav: PrimaryNavItem[] = loDevStaffNav;

// Role → nav list. Anything not listed (including loan_officer, null, unknown,
// support_staff, vendor_partner_future) falls through to the Loan Officer nav.
const NAV_BY_ROLE: Record<string, PrimaryNavItem[]> = {
  // Admin / LO Development staff.
  master_admin: loDevStaffNav,
  admin: loDevStaffNav,
  lo_development_lead: loDevStaffNav,
  lo_development_member: loDevStaffNav,
  lo_development: loDevStaffNav, // legacy alias

  // Training Academy staff.
  training_academy: trainingAcademyNav,

  // Marketing staff.
  marketing: marketingNav,

  // Loan Officer Support staff.
  loan_officer_support: supportStaffNav,

  // Coach + coaching-leadership roles.
  corporate_coach: coachNav,
  corporate_coach_supervisor: coachNav,
  lo_mastery_coach: coachNav,
  loan_factory_alliance_coach: coachNav,
  coaching_director: coachNav,
  team_leader: coachNav,

  // Paid coaching members.
  coaching_member_level_1: coachingMemberNav, // LO Mastery Member ($249)
  coaching_member_level_2: coachingMemberNav, // Loan Factory Alliance Member ($449)

  // Regular Loan Officer (explicit for clarity).
  loan_officer: loanOfficerNav,
};

/**
 * Resolve the top-nav list for an effective role.
 *
 * Pass the EFFECTIVE role from getEffectiveAccess() (so an admin viewing-as a
 * Loan Officer gets the Loan Officer nav). Unknown / null roles get the safe
 * Loan Officer (non-staff) list — never staff links.
 */
export function getNavForRole(
  role: string | null | undefined,
): PrimaryNavItem[] {
  if (!role) return loanOfficerNav;
  return NAV_BY_ROLE[role] ?? loanOfficerNav;
}

/**
 * Top-nav for a fully signed-OUT visitor: the public informational site nav
 * (includes Coaching overview, omits protected dashboards). SiteHeader uses this
 * when there is no approved session so a first-time visitor sees the marketing/
 * informational layer instead of a Loan-Officer app nav pointing at gated pages.
 */
export function getLoggedOutNav(): PrimaryNavItem[] {
  return loggedOutNav;
}
