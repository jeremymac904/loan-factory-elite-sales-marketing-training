/**
 * Single source of truth for the global top navigation.
 *
 * The nav is EFFECTIVE-ROLE AWARE. SiteHeader resolves the effective role via
 * getEffectiveAccess() (admin "View as role" is honored — viewing-as a
 * coaching member renders the member nav, never staff links) and asks
 * getNavForRole(effectiveRole) for the list to render.
 *
 * Keep these lists short and clean. Every entry must point at a real route.
 * The live build is now paid coaching-first, so legacy LO Development /
 * training / AI / support surfaces stay out of the visible nav.
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
  home: { label: "Home", href: "/" },
  loMastery: { label: "LO Mastery", href: "/lo-mastery-coaching/" },
  alliance: { label: "Loan Factory Alliance", href: "/loan-factory-alliance/" },
  myProgram: { label: "My Program", href: "/member-area/" },
  myScorecard: { label: "My Scorecard", href: "/member-area/scorecards/" },
  myTracker: { label: "My Tracker", href: "/member-area/trackers/" },
  coaching: { label: "Coach Command Center", href: "/coach-command-center/" },
  members: { label: "Members", href: "/coach-command-center/team/" },
  scorecards: { label: "Scorecards", href: "/coach-command-center/scorecards/" },
  notes: { label: "Notes", href: "/coach-command-center/coaching-notes/" },
  managerDashboard: { label: "Manager Dashboard", href: "/dashboard/" },
  coaches: { label: "Coaches", href: "/dashboard/#coaches" },
  programStatus: { label: "Program Status", href: "/dashboard/#program-status" },
  resources: { label: "Resources", href: "/resources/" },
  admin: { label: "Admin", href: "/admin/" },
  apply: { label: "Apply", href: "/apply/" },
} satisfies Record<string, PrimaryNavItem>;

const loggedOutNav: PrimaryNavItem[] = [
  NAV.home,
  NAV.loMastery,
  NAV.alliance,
  NAV.apply,
];

// Members navigate with the left sidebar inside the member area — the header
// stays minimal to avoid duplicate navigation.
const memberNav: PrimaryNavItem[] = [
  NAV.home,
  NAV.myProgram,
];

const coachNav: PrimaryNavItem[] = [
  NAV.home,
  NAV.coaching,
  NAV.members,
  NAV.scorecards,
  NAV.notes,
  NAV.resources,
];

const managerNav: PrimaryNavItem[] = [
  NAV.home,
  NAV.managerDashboard,
  NAV.coaching,
  NAV.members,
  NAV.coaches,
  NAV.programStatus,
  NAV.resources,
];

const adminNav: PrimaryNavItem[] = [
  NAV.home,
  NAV.admin,
  NAV.managerDashboard,
  NAV.coaching,
  NAV.members,
  NAV.coaches,
  NAV.programStatus,
  NAV.resources,
];

export const primaryNav: PrimaryNavItem[] = memberNav;

const NAV_BY_ROLE: Record<string, PrimaryNavItem[]> = {
  master_admin: adminNav,
  admin: adminNav,
  lo_development_lead: managerNav,
  lo_development_member: coachNav,
  lo_development: coachNav,
  training_academy: coachNav,
  loan_officer_support: coachNav,
  marketing: memberNav,
  corporate_coach: coachNav,
  corporate_coach_supervisor: coachNav,
  lo_mastery_coach: coachNav,
  loan_factory_alliance_coach: coachNav,
  coaching_director: managerNav,
  team_leader: coachNav,
  coaching_member_level_1: memberNav,
  coaching_member_level_2: memberNav,
  loan_officer: loggedOutNav,
  support_staff: memberNav,
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
  if (!role) return loggedOutNav;
  return NAV_BY_ROLE[role] ?? loggedOutNav;
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
