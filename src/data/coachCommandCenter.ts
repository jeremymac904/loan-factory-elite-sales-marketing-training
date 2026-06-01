// Sample data for the Coach Command Center. This renders a real, useful
// coaching dashboard for approved Loan Factory users today. Activity here is
// manually entered by coaches — automated tracking can be connected later (see
// docs/COACHING_ACTIVITY_TRACKING.md). When the coaching Supabase tables in the
// 20260528..._coach_command_center migration are populated, pages can read live
// rows instead of this sample set.

export type CoachingStatus = "active" | "needs_nudge" | "stuck" | "inactive";
export type RelationshipType =
  | "team_leader"
  | "corporate_coach"
  | "paid_coaching";

export const statusMeta: Record<
  CoachingStatus,
  { label: string; class: string }
> = {
  active: { label: "Active", class: "bg-green-100 text-green-800" },
  needs_nudge: { label: "Needs nudge", class: "bg-yellow-100 text-yellow-800" },
  stuck: { label: "Stuck", class: "bg-lf-orangeSoft text-lf-orangeDark" },
  inactive: { label: "Inactive", class: "bg-lf-mist text-lf-slate" },
};

export type AssignedPerson = {
  id: string;
  name: string;
  email: string;
  role: string;
  program: string;
  tier: "lo_mastery" | "alliance" | "none";
  coach: string;
  relationship: RelationshipType;
  lastActivity: string;
  nextTask: string;
  nextCall: string;
  recentActivity: string;
  resourceAssignment: string;
  scorecardStatus: "submitted" | "missing" | "not_required";
  noteCount: number;
  status: CoachingStatus;
};

export const assignedPeople: AssignedPerson[] = [
  { id: "p1", name: "Sample LO — Maria L.", email: "maria.l@loanfactory.com", role: "loan_officer", program: "LO Mastery ($249)", tier: "lo_mastery", coach: "Edward Arvizo", relationship: "paid_coaching", lastActivity: "Today", nextTask: "Review weekly scorecard", nextCall: "Tue 10:00 AM", recentActivity: "Submitted scorecard + 18 conversations", resourceAssignment: "High Trust Intake script", scorecardStatus: "submitted", noteCount: 4, status: "active" },
  { id: "p2", name: "Sample LO — Devin R.", email: "devin.r@loanfactory.com", role: "loan_officer", program: "LO Mastery ($249)", tier: "lo_mastery", coach: "Edward Arvizo", relationship: "paid_coaching", lastActivity: "2 days ago", nextTask: "Power Hour check-in", nextCall: "Thu 1:30 PM", recentActivity: "Missed weekly scorecard", resourceAssignment: "Follow-up tracker reset", scorecardStatus: "missing", noteCount: 2, status: "needs_nudge" },
  { id: "p3", name: "Sample LO — Priya S.", email: "priya.s@loanfactory.com", role: "coaching_member_level_2", program: "Loan Factory Alliance ($449)", tier: "alliance", coach: "Edward Arvizo", relationship: "paid_coaching", lastActivity: "Today", nextTask: "Mastermind prep", nextCall: "Wed 8:30 AM", recentActivity: "Submitted Alliance scorecard", resourceAssignment: "Market objection roleplay", scorecardStatus: "submitted", noteCount: 6, status: "active" },
  { id: "p4", name: "Sample LO — Tomas G.", email: "tomas.g@loanfactory.com", role: "coaching_member_level_2", program: "Loan Factory Alliance ($449)", tier: "alliance", coach: "Edward Arvizo", relationship: "paid_coaching", lastActivity: "6 days ago", nextTask: "Re-engage — missed 2 sessions", nextCall: "Not scheduled", recentActivity: "No activity since last nudge", resourceAssignment: "Breakfast Club reset", scorecardStatus: "missing", noteCount: 3, status: "stuck" },
  { id: "p5", name: "Sample LO — Jordan M.", email: "jordan.m@loanfactory.com", role: "loan_officer", program: "New LO onboarding", tier: "none", coach: "Kevin Truong", relationship: "corporate_coach", lastActivity: "Yesterday", nextTask: "First File Survival clip", nextCall: "Fri 9:00 AM", recentActivity: "Completed onboarding clip", resourceAssignment: "First File Survival clip", scorecardStatus: "not_required", noteCount: 1, status: "active" },
  { id: "p6", name: "Sample LO — Alyssa W.", email: "alyssa.w@loanfactory.com", role: "loan_officer", program: "New LO onboarding", tier: "none", coach: "Kevin Truong", relationship: "corporate_coach", lastActivity: "9 days ago", nextTask: "Welcome call + 101 Foundation", nextCall: "Needs scheduling", recentActivity: "No welcome call completed", resourceAssignment: "101 Foundation intro", scorecardStatus: "not_required", noteCount: 0, status: "inactive" },
  { id: "p7", name: "Sample LO — Brian K.", email: "brian.k@loanfactory.com", role: "loan_officer", program: "Legends Team", tier: "none", coach: "Jeremy McDonald", relationship: "team_leader", lastActivity: "Today", nextTask: "Realtor outreach plan", nextCall: "Mon 3:00 PM", recentActivity: "Logged partner outreach", resourceAssignment: "301 partner playbook", scorecardStatus: "submitted", noteCount: 2, status: "active" },
  { id: "p8", name: "Sample LO — Nina P.", email: "nina.p@loanfactory.com", role: "loan_officer", program: "Legends Team", tier: "none", coach: "Jeremy McDonald", relationship: "team_leader", lastActivity: "3 days ago", nextTask: "Confirm pipeline review", nextCall: "Needs scheduling", recentActivity: "Pipeline follow-up overdue", resourceAssignment: "501 weekly review", scorecardStatus: "missing", noteCount: 1, status: "needs_nudge" },
];

// ---------------------------------------------------------------------------
// Coverage visibility (Finding #12)
// ---------------------------------------------------------------------------
// Coverage / overview-of-all-coaches surfaces are restricted to master_admin,
// LO Development lead, and the coaching-leadership roles (Corporate Coach
// Supervisor, Coaching Director, LO Mastery / Loan Factory Alliance coaches).
// Normal corporate coaches and team leaders only ever see THEIR own roster.
// Access is ROLE-BASED: those roles resolve to `seesAll` / scope 'all' in
// coachAccess.ts (SEE_ALL_ROLES). The secondary label check below is a
// belt-and-suspenders allowance keyed on the Corporate Coach Supervisor ROLE
// LABEL — never a person's name. Edward Arvizo is the Corporate Coach
// Supervisor persona, but his access is granted by his seeded ROLE, not by
// matching his name. See docs/role-model/role-aliases.md + role-matrix.md.
export const CORPORATE_COACH_SUPERVISOR_LABEL = "Corporate Coach Supervisor";

// Retained for backward compatibility / sample display labeling only. NOT used
// for any access or permission decision (the name check was removed from
// canSeeCoverage in favor of the role-label check below).
export const COACH_COVERAGE_LEAD_NAME = "Edward Arvizo";

export const coverageVisibilityRule =
  "Coaching coverage (the overview of ALL coaches and every roster) is visible " +
  "only to master_admin, LO Development, and the coaching-leadership roles " +
  "(Corporate Coach Supervisor, Coaching Director, LO Mastery / Loan Factory " +
  "Alliance coaches). Corporate coaches and team leaders see only the people " +
  "assigned to them. Access is role-based, not name-based.";

/**
 * Whether the current view may see org-wide coaching coverage (Finding #12).
 * Access is ROLE-BASED. `seesAll` already covers master_admin / admin / LO
 * Development lead and every coaching-leadership role via SEE_ALL_ROLES in
 * coachAccess.ts. The optional second argument is the effective ROLE LABEL
 * (from getRoleLabel, e.g. "Corporate Coach Supervisor") — never a person's
 * name — and is matched against the supervisor role label as belt-and-braces.
 */
export function canSeeCoverage(
  seesAll: boolean,
  effectiveRoleLabel?: string | null,
): boolean {
  if (seesAll) return true;
  return (effectiveRoleLabel ?? "").trim() === CORPORATE_COACH_SUPERVISOR_LABEL;
}

// ---------------------------------------------------------------------------
// Corporate Coach Supervisor oversight (Mission 2)
// ---------------------------------------------------------------------------
// Edward Arvizo is the Corporate Coach Supervisor — the oversight role above
// the corporate coaches, LO Mastery coaches, Loan Factory Alliance coaches, and
// team leaders. The supervisor view surfaces coverage across every coach and
// roster, plus scorecard trends, member progress, training completion, and
// follow-up activity. Sample/placeholder values are clearly labeled — they are
// NOT live metrics. When the coaching Supabase tables are populated these can
// be replaced with live reads.
export const CORPORATE_COACH_SUPERVISOR_NAME = "Edward Arvizo";
export const CORPORATE_COACH_SUPERVISOR_ROLE = "corporate_coach_supervisor";

export type CoverageCoachType =
  | "corporate_coach"
  | "lo_mastery_coach"
  | "loan_factory_alliance_coach"
  | "team_leader";

export const coverageCoachTypeLabels: Record<CoverageCoachType, string> = {
  corporate_coach: "Corporate Coach",
  lo_mastery_coach: "LO Mastery Coach",
  loan_factory_alliance_coach: "Loan Factory Alliance Coach",
  team_leader: "Team Leader",
};

export type CoachCoverageRow = {
  id: string;
  coachName: string;
  coachType: CoverageCoachType;
  // Roster the coach owns (subset of assignedPeople by coach name).
  assignedCount: number;
  needsAttention: number;
  scorecardsSubmitted: number;
  scorecardsMissing: number;
  // Coaching coverage / cadence signal (sample).
  coverageStatus: "on_track" | "watch" | "at_risk";
  // Scorecard trend across this coach's roster (sample).
  scorecardTrend: "up" | "flat" | "down";
  // Average accountability/training completion across roster (sample, labeled).
  avgAccountability: string;
  trainingCompletion: string;
  followUpActivity: string;
  lastReview: string;
};

// Derive each coach's roster counts from the shared sample roster so the
// supervisor numbers stay consistent with the per-coach views.
function rosterStatsForCoach(coachName: string): {
  assignedCount: number;
  needsAttention: number;
  scorecardsSubmitted: number;
  scorecardsMissing: number;
} {
  const roster = assignedPeople.filter((p) => p.coach === coachName);
  return {
    assignedCount: roster.length,
    needsAttention: roster.filter((p) => p.status !== "active").length,
    scorecardsSubmitted: roster.filter((p) => p.scorecardStatus === "submitted")
      .length,
    scorecardsMissing: roster.filter((p) => p.scorecardStatus === "missing")
      .length,
  };
}

// Sample supervisor coverage rows. Coach names match the roster sample data so
// assigned/scorecard counts are real derivations; cadence, trend, training, and
// follow-up signals are clearly-labeled sample placeholders.
export const coachCoverage: CoachCoverageRow[] = [
  {
    id: "cov-edward-mastery",
    coachName: "Edward Arvizo",
    coachType: "lo_mastery_coach",
    ...rosterStatsForCoach("Edward Arvizo"),
    coverageStatus: "watch",
    scorecardTrend: "up",
    avgAccountability: "78 (sample)",
    trainingCompletion: "64% of assigned (sample)",
    followUpActivity: "5 follow-ups this week (sample)",
    lastReview: "This week",
  },
  {
    id: "cov-kevin-corporate",
    coachName: "Kevin Truong",
    coachType: "corporate_coach",
    ...rosterStatsForCoach("Kevin Truong"),
    coverageStatus: "at_risk",
    scorecardTrend: "flat",
    avgAccountability: "n/a — onboarding (sample)",
    trainingCompletion: "50% of onboarding clips (sample)",
    followUpActivity: "1 welcome call overdue (sample)",
    lastReview: "Needs review",
  },
  {
    id: "cov-jeremy-team",
    coachName: "Jeremy McDonald",
    coachType: "team_leader",
    ...rosterStatsForCoach("Jeremy McDonald"),
    coverageStatus: "on_track",
    scorecardTrend: "up",
    avgAccountability: "81 (sample)",
    trainingCompletion: "72% of assigned (sample)",
    followUpActivity: "3 pipeline follow-ups (sample)",
    lastReview: "This week",
  },
];

export const coverageStatusMeta: Record<
  CoachCoverageRow["coverageStatus"],
  { label: string; class: string }
> = {
  on_track: { label: "On track", class: "bg-green-100 text-green-800" },
  watch: { label: "Watch", class: "bg-yellow-100 text-yellow-800" },
  at_risk: { label: "At risk", class: "bg-lf-orangeSoft text-lf-orangeDark" },
};

export const trendMeta: Record<
  CoachCoverageRow["scorecardTrend"],
  { label: string; symbol: string }
> = {
  up: { label: "Up", symbol: "▲" },
  flat: { label: "Flat", symbol: "▬" },
  down: { label: "Down", symbol: "▼" },
};

export type SupervisorCoverageSummary = {
  coaches: number;
  corporateCoaches: number;
  loMasteryCoaches: number;
  allianceCoaches: number;
  teamLeaders: number;
  assignedLOs: number;
  needsAttention: number;
  scorecardsSubmitted: number;
  scorecardsMissing: number;
  coverageAtRisk: number;
};

/**
 * Org-wide oversight rollup for the Corporate Coach Supervisor. Derived from
 * the shared sample roster + coverage rows so the supervisor totals stay
 * consistent with the per-coach views.
 */
export function buildSupervisorCoverageSummary(): SupervisorCoverageSummary {
  const byType = (t: CoverageCoachType) =>
    coachCoverage.filter((c) => c.coachType === t).length;
  return {
    coaches: coachCoverage.length,
    corporateCoaches: byType("corporate_coach"),
    loMasteryCoaches: byType("lo_mastery_coach"),
    allianceCoaches: byType("loan_factory_alliance_coach"),
    teamLeaders: byType("team_leader"),
    assignedLOs: assignedPeople.length,
    needsAttention: assignedPeople.filter((p) => p.status !== "active").length,
    scorecardsSubmitted: assignedPeople.filter(
      (p) => p.scorecardStatus === "submitted",
    ).length,
    scorecardsMissing: assignedPeople.filter(
      (p) => p.scorecardStatus === "missing",
    ).length,
    coverageAtRisk: coachCoverage.filter((c) => c.coverageStatus === "at_risk")
      .length,
  };
}

export function peopleForScope(
  scope: "all" | "corporate_coach" | "lo_development" | "team_leader" | "none",
): AssignedPerson[] {
  if (scope === "all") return assignedPeople;
  if (scope === "team_leader")
    return assignedPeople.filter((p) => p.relationship === "team_leader");
  if (scope === "corporate_coach")
    return assignedPeople.filter((p) => p.relationship === "corporate_coach");
  if (scope === "lo_development")
    return assignedPeople.filter(
      (p) =>
        p.relationship === "corporate_coach" ||
        p.relationship === "paid_coaching",
    );
  return [];
}

export type ActivitySnapshotMetric = {
  key: string;
  label: string;
  value: string;
  note: string;
  href?: string;
};

export function computeActivitySnapshot(
  people: AssignedPerson[],
): ActivitySnapshotMetric[] {
  const submitted = people.filter((p) => p.scorecardStatus === "submitted");
  const missing = people.filter((p) => p.scorecardStatus === "missing");
  const needAttention = people.filter((p) => p.status !== "active");
  const nextCalls = people.filter(
    (p) => !["Not scheduled", "Needs scheduling"].includes(p.nextCall),
  );

  return [
    {
      key: "assigned",
      label: "Assigned LOs",
      value: people.length.toString(),
      note: "Current role-scoped roster.",
      href: "/coach-command-center/team/",
    },
    {
      key: "attention",
      label: "Need attention",
      value: needAttention.length.toString(),
      note: "Needs nudge, stuck, or inactive.",
      href: "/coach-command-center/team/",
    },
    {
      key: "submitted",
      label: "Scorecards submitted",
      value: submitted.length.toString(),
      note: "LO-submitted and ready for coach review.",
      href: "/coach-command-center/scorecards/",
    },
    {
      key: "missing",
      label: "Scorecards missing",
      value: missing.length.toString(),
      note: "Needs a reminder before the next call.",
      href: "/coach-command-center/scorecards/",
    },
    {
      key: "calls",
      label: "Next calls",
      value: nextCalls.length.toString(),
      note: "Draft calendar workflow only.",
      href: "/coach-command-center/calendar/",
    },
    {
      key: "resources",
      label: "Resource assignments",
      value: people.filter((p) => p.resourceAssignment).length.toString(),
      note: "Manual coaching task tracking.",
      href: "/coach-command-center/training-plan/",
    },
  ];
}

export const todaysActions: { label: string; detail: string; href?: string }[] = [
  { label: "Follow up with LOs needing a nudge", detail: "2 assigned LOs are at Needs nudge or Stuck.", href: "/coach-command-center/team/" },
  { label: "Review submitted scorecards", detail: "Check weekly execution + commitments.", href: "/coach-command-center/scorecards/" },
  { label: "Check missing activity", detail: "Spot LOs with no logged activity this week.", href: "/coach-command-center/activity/" },
  { label: "Send a coaching nudge", detail: "Draft a check-in to a stuck LO.", href: "/coach-command-center/messages/" },
  { label: "Schedule a training or Power Hour", detail: "Add a coaching or team session.", href: "/coach-command-center/calendar/" },
  { label: "Recognize a win on FaceGram", detail: "Celebrate progress in the team group.", href: "/facegram/" },
];

export const activitySnapshot: { label: string; value: string; note?: string }[] = [
  { label: "Assigned LOs", value: "8", note: "Current sample view" },
  { label: "Need attention", value: "4", note: "Needs nudge, stuck, or inactive" },
  { label: "Follow-ups due", value: "3", note: "Manual coaching tasks" },
  { label: "Submitted scorecards", value: "4", note: "LO submitted, coach reviews" },
  { label: "Missing scorecards", value: "3", note: "Due this week" },
  { label: "Open coach notes", value: "19", note: "Manual entry" },
  { label: "Next calls", value: "5", note: "Draft calendar workflow" },
  { label: "Resource assignments", value: "8", note: "Manual coaching tasks" },
];

export const messageTemplates: { title: string; body: string }[] = [
  { title: "Coach follow-up draft", body: "Hey [Name] — following up on your commitment from our last coaching call: [commitment]. What happened, what blocked you, and what is the next smallest action you can complete today?" },
  { title: "Member encouragement draft", body: "[Name], I saw [specific win]. That is the exact weekly rhythm we are building. Keep stacking the activity and bring one takeaway to the next call." },
  { title: "Missed scorecard reminder draft", body: "Hey [Name] — your weekly scorecard is still missing. Please submit the activity lines before [date] so our next coaching call can focus on decisions, not reconstruction." },
  { title: "Training assignment draft", body: "[Name], before our next call, complete [resource]. Bring one takeaway, one question, and one place you applied it in the field." },
  { title: "Meeting recap draft", body: "[Name], recap from today's call:\n- Win:\n- Blocker:\n- Commitment:\n- Resource assigned:\n- Next follow-up:\nReply with anything I missed." },
  { title: "Next action message draft", body: "[Name], your next action is [specific action] by [date]. Keep it narrow. I will follow up on this before our next session." },
];

export const emailTemplates: { title: string; subject: string; body: string }[] = [
  { title: "Weekly coaching recap", subject: "Your week + next week's focus", body: "Hi [Name],\n\nGreat work this week. Recap:\n- Conversations: \n- Realtor touches: \n- Applications: \n\nNext week's focus:\n1. \n2. \n3. \n\nLet's review on our next call.\n\n— [Coach]" },
  { title: "First-call follow-up coaching", subject: "Your first-call structure", body: "Hi [Name],\n\nNice work on your first calls. One thing to tighten: the next-step ask. Try this: \"Based on what you shared, the next step is ____. Can we lock that in?\"\n\nReview the 201 lesson and send me one recording from this week.\n\n— [Coach]" },
  { title: "Re-engagement", subject: "Checking in", body: "Hi [Name],\n\nHaven't seen activity logged this week — totally fine, life happens. Let's get one small win on the board. What's the single easiest next step for you tomorrow?\n\n— [Coach]" },
];

export const communicationWorkflows: {
  title: string;
  useCase: string;
  templateTitle: string;
}[] = [
  { title: "Coach follow-up", useCase: "After a 1:1 or missed commitment.", templateTitle: "Coach follow-up draft" },
  { title: "Member encouragement", useCase: "Reinforce a real win without over-coaching.", templateTitle: "Member encouragement draft" },
  { title: "Missed scorecard reminder", useCase: "Ask the LO to submit before review.", templateTitle: "Missed scorecard reminder draft" },
  { title: "Training assignment", useCase: "Assign one resource and one takeaway.", templateTitle: "Training assignment draft" },
  { title: "Meeting recap", useCase: "Summarize commitments after a call.", templateTitle: "Meeting recap draft" },
  { title: "Next action message", useCase: "Keep accountability specific and dated.", templateTitle: "Next action message draft" },
];

export const noteTypes = [
  "1:1 coaching",
  "Scorecard review",
  "Re-engagement",
  "Training assignment",
  "Meeting recap",
  "Private coach context",
];

export const noteTemplates: {
  title: string;
  type: string;
  tags: string;
  body: string;
}[] = [
  {
    title: "Scorecard review",
    type: "Scorecard review",
    tags: "scorecard, commitments, follow-up",
    body:
      "Scorecard review:\n- Trend:\n- Conversation activity:\n- Realtor activity:\n- Past client touches:\n- Pipeline follow-up:\n- Commitment for next week:",
  },
  {
    title: "Re-engagement",
    type: "Re-engagement",
    tags: "re-engage, missed-scorecard, follow-up",
    body:
      "Re-engagement note:\n- Last activity:\n- Missed item:\n- Likely blocker:\n- Reset commitment:\n- Follow-up date:",
  },
  {
    title: "Training assignment",
    type: "Training assignment",
    tags: "resource, practice, accountability",
    body:
      "Assigned resource:\n- Resource:\n- Why this resource:\n- Required takeaway:\n- Field application:\n- Verification:",
  },
  {
    title: "Meeting recap",
    type: "Meeting recap",
    tags: "recap, action-items, next-call",
    body:
      "Meeting recap:\n- Win:\n- Blocker:\n- Coach decision:\n- Action items:\n- Next call prep:",
  },
];

export function shortName(name: string): string {
  return name.replace(/^Sample LO — /, "");
}

export const calendarEventTypes: {
  type: string;
  title: string;
  description: string;
  defaultDuration: string;
  inviteDetail: string;
}[] = [
  { type: "one_on_one", title: "One-on-one coaching session", description: "Individual coaching with an assigned LO.", defaultDuration: "30 min", inviteDetail: "Loan Factory 1:1 Coaching — agenda: wins, blockers, next-week commitments." },
  { type: "group_call", title: "Group coaching call", description: "Live group coaching for your cohort.", defaultDuration: "60 min", inviteDetail: "Loan Factory Group Coaching — bring one win and one blocker." },
  { type: "team_training", title: "Team training", description: "Skills training for your team.", defaultDuration: "45 min", inviteDetail: "Loan Factory Team Training — topic + practice reps." },
  { type: "power_hour", title: "Power Hour", description: "Daily focus block for prospecting + follow-up.", defaultDuration: "60 min", inviteDetail: "Loan Factory Power Hour — prospecting, follow-up, coaching prep." },
  { type: "breakfast_club", title: "Breakfast Club (Alliance)", description: "Daily morning live for Alliance members.", defaultDuration: "30 min", inviteDetail: "Loan Factory Alliance Breakfast Club — wins, blockers, focus." },
  { type: "mastermind", title: "Mastermind meeting (Alliance)", description: "Biweekly mastermind for advanced producers.", defaultDuration: "90 min", inviteDetail: "Loan Factory Alliance Mastermind — personal wins, top blocker, ask for the room." },
  { type: "follow_up", title: "Follow-up reminder", description: "Reminder to follow up with an LO.", defaultDuration: "15 min", inviteDetail: "Follow up with [Name] on their committed next step." },
];

export const loMasteryScorecardFields: string[] = [
  "Real conversations",
  "Realtor conversations",
  "Past client touches",
  "Applications",
  "Prequals",
  "Referrals requested",
  "Follow-ups completed",
  "Coaching resources completed",
  "Practice recordings reviewed",
  "Approved AI prompts used",
  "Wins",
  "Stuck points",
  "Next week commitment",
];

export const allianceScorecardFields: string[] = [
  ...loMasteryScorecardFields,
  "Market activity",
  "Campaign activity",
  "Leadership activity",
  "Mastermind participation",
  "Advanced certification progress",
];

export type ScorecardField = {
  key: string;
  label: string;
  type: "number" | "text" | "longtext";
  hint?: string;
};

export type ScorecardSection = {
  title: string;
  description: string;
  fields: ScorecardField[];
};

const baseScorecardSections: ScorecardSection[] = [
  {
    title: "Conversation activity",
    description: "The LO submits their weekly activity. The coach reviews trends.",
    fields: [
      { key: "real_conversations", label: "Real conversations", type: "number" },
      { key: "realtor_conversations", label: "Realtor conversations", type: "number" },
      { key: "past_client_touches", label: "Past client touches", type: "number" },
      { key: "referrals_requested", label: "Referrals requested", type: "number" },
    ],
  },
  {
    title: "Pipeline follow-up",
    description: "Follow-up activity and loan opportunity movement.",
    fields: [
      { key: "applications", label: "Applications", type: "number" },
      { key: "prequals", label: "Prequals", type: "number" },
      { key: "followups_completed", label: "Follow-ups completed", type: "number" },
      { key: "pipeline_notes", label: "Pipeline follow-up notes", type: "longtext" },
    ],
  },
  {
    title: "Coaching commitments",
    description: "Wins, stuck points, resources, and next-week commitment.",
    fields: [
      { key: "resources_completed", label: "Coaching resources completed", type: "text" },
      { key: "wins", label: "Wins", type: "longtext" },
      { key: "stuck_points", label: "Stuck points", type: "longtext" },
      { key: "next_week_commitment", label: "Next week commitment", type: "longtext" },
    ],
  },
];

const allianceOnlySection: ScorecardSection = {
  title: "Alliance activity",
  description: "Additional execution signals for Loan Factory Alliance ($449).",
  fields: [
    { key: "market_activity", label: "Market activity", type: "text" },
    { key: "campaign_activity", label: "Campaign activity", type: "text" },
    { key: "leadership_activity", label: "Leadership activity", type: "text" },
    { key: "mastermind_participation", label: "Mastermind participation", type: "text" },
    { key: "advanced_certification_progress", label: "Advanced certification progress", type: "text" },
  ],
};

export function scorecardSectionsForTier(
  tier: "lo_mastery" | "alliance",
): ScorecardSection[] {
  return tier === "alliance"
    ? [...baseScorecardSections, allianceOnlySection]
    : baseScorecardSections;
}

export type MemberProgress = {
  id: string;
  name: string;
  tier: "LO Mastery ($249)" | "Loan Factory Alliance ($449)";
  coachingAttendance: string;
  weeklyCommitments: string;
  activityTracker: string;
  certification: string;
  accountabilityScore: string;
  coachNotes: string;
  resourceCompletion: string;
  nextAction: string;
  status: CoachingStatus;
};

export const memberProgress: MemberProgress[] = [
  { id: "p1", name: "Sample LO — Maria L.", tier: "LO Mastery ($249)", coachingAttendance: "3 of 4 calls", weeklyCommitments: "4 of 5 complete", activityTracker: "Current", certification: "Core certification in progress", accountabilityScore: "82", coachNotes: "Needs tighter Realtor ask", resourceCompletion: "2 of 3 resources", nextAction: "Review submitted scorecard", status: "active" },
  { id: "p2", name: "Sample LO — Devin R.", tier: "LO Mastery ($249)", coachingAttendance: "2 of 4 calls", weeklyCommitments: "2 of 5 complete", activityTracker: "Missing this week", certification: "Not started", accountabilityScore: "61", coachNotes: "Power Hour check-in due", resourceCompletion: "1 of 3 resources", nextAction: "Submit weekly scorecard", status: "needs_nudge" },
  { id: "p3", name: "Sample LO — Priya S.", tier: "Loan Factory Alliance ($449)", coachingAttendance: "5 of 5 calls", weeklyCommitments: "5 of 5 complete", activityTracker: "Current", certification: "Advanced certification in progress", accountabilityScore: "91", coachNotes: "Bring market objection to Mastermind", resourceCompletion: "4 of 5 resources", nextAction: "Mastermind prep", status: "active" },
  { id: "p4", name: "Sample LO — Tomas G.", tier: "Loan Factory Alliance ($449)", coachingAttendance: "1 of 5 calls", weeklyCommitments: "1 of 5 complete", activityTracker: "Stale", certification: "Advanced certification paused", accountabilityScore: "44", coachNotes: "Missed two sessions", resourceCompletion: "1 of 5 resources", nextAction: "Re-engagement call", status: "stuck" },
];

export type ScorecardReview = {
  id: string;
  memberId: string;
  memberName: string;
  tier: "LO Mastery ($249)" | "Loan Factory Alliance ($449)" | "Team leader coaching";
  status: "submitted" | "missing";
  weekOf: string;
  trend: "up" | "flat" | "down" | "unknown";
  conversations: number | null;
  realtorActivity: number | null;
  pastClientTouches: number | null;
  pipelineFollowUp: string;
  commitments: string;
  coachFollowUp: string;
  conversationActivity: string;
};

export const scorecardReviews: ScorecardReview[] = [
  { id: "s1", memberId: "p1", memberName: "Sample LO — Maria L.", tier: "LO Mastery ($249)", status: "submitted", weekOf: "This week", trend: "up", conversations: 18, realtorActivity: 7, pastClientTouches: 12, pipelineFollowUp: "9 active follow-ups completed", commitments: "Book 2 Realtor coffee chats", coachFollowUp: "Review ask language", conversationActivity: "More conversations, stronger close ask" },
  { id: "s2", memberId: "p2", memberName: "Sample LO — Devin R.", tier: "LO Mastery ($249)", status: "missing", weekOf: "This week", trend: "unknown", conversations: null, realtorActivity: null, pastClientTouches: null, pipelineFollowUp: "Unknown until submitted", commitments: "Submit scorecard before Power Hour", coachFollowUp: "Send reminder draft", conversationActivity: "Missing activity detail" },
  { id: "s3", memberId: "p3", memberName: "Sample LO — Priya S.", tier: "Loan Factory Alliance ($449)", status: "submitted", weekOf: "This week", trend: "flat", conversations: 24, realtorActivity: 11, pastClientTouches: 16, pipelineFollowUp: "14 follow-ups completed", commitments: "Bring objection script to Mastermind", coachFollowUp: "Assign market objection roleplay", conversationActivity: "Consistent volume, needs sharper market framing" },
  { id: "s4", memberId: "p4", memberName: "Sample LO — Tomas G.", tier: "Loan Factory Alliance ($449)", status: "missing", weekOf: "This week", trend: "down", conversations: null, realtorActivity: null, pastClientTouches: null, pipelineFollowUp: "No pipeline update", commitments: "Restart Breakfast Club attendance", coachFollowUp: "Create re-engagement follow-up", conversationActivity: "No current submission" },
  { id: "s5", memberId: "p7", memberName: "Sample LO — Brian K.", tier: "Team leader coaching", status: "submitted", weekOf: "This week", trend: "up", conversations: 15, realtorActivity: 6, pastClientTouches: 9, pipelineFollowUp: "6 hot-lead follow-ups", commitments: "Complete 301 partner plan", coachFollowUp: "Review partner targeting", conversationActivity: "Good partner activity momentum" },
  { id: "s6", memberId: "p8", memberName: "Sample LO — Nina P.", tier: "Team leader coaching", status: "missing", weekOf: "This week", trend: "unknown", conversations: null, realtorActivity: null, pastClientTouches: null, pipelineFollowUp: "Missing pipeline review", commitments: "Confirm pipeline review time", coachFollowUp: "Draft next action message", conversationActivity: "Needs current activity detail" },
];

export type CoachAssistantActionId =
  | "create_coaching_note"
  | "summarize_member_progress"
  | "draft_follow_up"
  | "create_action_items"
  | "draft_meeting_agenda"
  | "draft_calendar_event"
  | "draft_gmail_message"
  | "draft_google_chat_message"
  | "prepare_next_coaching_call";

export const coachAssistantActions: {
  id: CoachAssistantActionId;
  label: string;
  description: string;
  needsIntegration?: boolean;
}[] = [
  { id: "create_coaching_note", label: "Create coaching note", description: "Draft a structured coaching note with note type, tags, action items, and follow-up date." },
  { id: "summarize_member_progress", label: "Summarize member progress", description: "Summarize paid coaching progress without mixing in free 101-601 course completion." },
  { id: "draft_follow_up", label: "Draft follow up", description: "Write a concise coaching follow-up tied to a specific commitment." },
  { id: "create_action_items", label: "Create action items", description: "Turn the coaching conversation into owners, due dates, and verification steps." },
  { id: "draft_meeting_agenda", label: "Draft meeting agenda", description: "Prepare a focused agenda for the next coaching call." },
  { id: "draft_calendar_event", label: "Draft calendar event", description: "Create draft event details only; no calendar event is created.", needsIntegration: true },
  { id: "draft_gmail_message", label: "Draft Gmail message", description: "Create a Gmail-style draft only; Gmail is not connected here.", needsIntegration: true },
  { id: "draft_google_chat_message", label: "Draft Google Chat message", description: "Create a Google Chat draft only; nothing is posted.", needsIntegration: true },
  { id: "prepare_next_coaching_call", label: "Prepare next coaching call", description: "Build the next-call prep list from scorecard, activity, notes, and commitments." },
];

export function coachProfileFromLabel(label: string): { name: string } {
  return { name: label || "Coach" };
}

export function buildCoachAssistantDraft(
  actionId: CoachAssistantActionId,
  coach: { name: string },
  person: AssignedPerson,
): string {
  const name = shortName(person.name);
  const common = [
    `Coach: ${coach.name}`,
    `Member: ${name}`,
    `Program: ${person.program}`,
    `Status: ${statusMeta[person.status].label}`,
    `Next task: ${person.nextTask}`,
    `Scorecard: ${person.scorecardStatus.replace("_", " ")}`,
  ].join("\n");

  switch (actionId) {
    case "create_coaching_note":
      return `${common}\n\nCoaching note draft:\nType: [1:1 coaching / scorecard review / re-engagement]\nTags: [tags]\nNote:\n- Win:\n- Blocker:\n- Coach observation:\nAction items:\n- [owner] [action] by [date]\nNext follow-up: [date]`;
    case "summarize_member_progress":
      return `${common}\n\nPaid coaching progress summary:\n- Coaching attendance:\n- Weekly commitments:\n- Activity tracker:\n- Certification progress:\n- Accountability score:\n- Coach notes:\n- Resource completion:\n- Next action:\n\nDo not include Sales and Marketing 101 through 601 as paid coaching progress.`;
    case "draft_follow_up":
      return `${name}, following up on your commitment: [commitment]. What happened, what blocked you, and what is the next smallest action you can complete by [date]?`;
    case "create_action_items":
      return `${common}\n\nAction items:\n1. Owner: ${name}; Action: [specific action]; Due: [date]; Verification: [how coach checks].\n2. Owner: ${coach.name}; Action: [coach follow-up]; Due: [date]; Verification: note updated.\n3. Resource: [resource]; Completion proof: [takeaway / field application].`;
    case "draft_meeting_agenda":
      return `${common}\n\n30-minute coaching agenda:\n1. Wins and activity signal.\n2. Scorecard review or missing scorecard reset.\n3. Top blocker.\n4. Assigned resource.\n5. Next-week commitment.\n6. Follow-up date.`;
    case "draft_calendar_event":
      return `Calendar event draft only\nTitle: Coaching call with ${name}\nAttendees: ${person.email}\nDuration: 30 min\nAgenda:\n${common}\n\nIntegration required before this can create a real Google Calendar event or Meet link.`;
    case "draft_gmail_message":
      return `Subject: Coaching follow-up\n\nHi ${name},\n\nRecap from our coaching work:\n- Win:\n- Blocker:\n- Commitment:\n- Resource assigned: ${person.resourceAssignment}\n- Next follow-up:\n\nDraft only. Approval is required before sending.\n\n${coach.name}`;
    case "draft_google_chat_message":
      return `${name}, quick coaching check-in: your next task is "${person.nextTask}". What is the one action you can complete today, and what is blocking it? Draft only — Google Chat is not connected.`;
    case "prepare_next_coaching_call":
      return `${common}\n\nNext coaching call prep:\n- Review scorecard status: ${person.scorecardStatus.replace("_", " ")}\n- Recent activity: ${person.recentActivity}\n- Assigned resource: ${person.resourceAssignment}\n- Coaching notes count: ${person.noteCount}\n- Ask: [one focused coaching question]\n- Close with commitment and follow-up date.`;
  }
}

export const trainingAssignables: {
  category: string;
  title: string;
  href: string;
  free?: boolean;
}[] = [
  { category: "Lesson", title: "101 Foundation", href: "/101-foundation/", free: true },
  { category: "Lesson", title: "201 Borrower Conversion", href: "/201-borrower-conversion/", free: true },
  { category: "Lesson", title: "301 Referral Partner Growth", href: "/301-referral-partner-growth/", free: true },
  { category: "Lesson", title: "401 Content and Marketing", href: "/401-content-and-marketing/", free: true },
  { category: "Lesson", title: "501 Pipeline and Follow-Up", href: "/501-pipeline-and-sales-systems/", free: true },
  { category: "Lesson", title: "601 Execution System", href: "/601-elite-execution/", free: true },
  { category: "AI Advantage", title: "AI Advantage video library", href: "/ai-training/video-library/" },
  { category: "Clips", title: "LO Development clip library", href: "/training-library/clips/" },
  { category: "Scripts", title: "Scripts library", href: "/scripts/" },
  { category: "Prompts", title: "Prompt library", href: "/prompts/" },
  { category: "Roleplay", title: "Roleplay scenarios", href: "/roleplays/" },
  { category: "Scorecard", title: "Weekly execution scorecard", href: "/coach-command-center/scorecards/" },
  { category: "Market Mentor", title: "Market Mentor Studio exercise", href: "/market-mentor/" },
];

export const coachAiPrompts: { title: string; prompt: string }[] = [
  { title: "Summarize this LO's activity", prompt: "Summarize [Name]'s coaching activity over the last 2 weeks: conversations, Realtor touches, applications, coaching resources completed, wins, and stuck points. Then suggest the single highest-leverage next action." },
  { title: "Draft a coaching nudge", prompt: "Write a short, encouraging coaching nudge to [Name] who has not logged activity in 5 days. Keep it warm, specific, and end with one concrete next step. Internal, no borrower claims." },
  { title: "Weekly check-in email", prompt: "Draft a weekly check-in email to [Name] recapping last week and setting three focus items for next week. Tone: supportive coach. Drafts only — never auto-send." },
  { title: "Prepare for a one-on-one", prompt: "Build a 1:1 coaching agenda for [Name]: review wins, address the top blocker, set next-week commitments, and assign one training resource." },
  { title: "Summarize team activity", prompt: "Summarize my team's coaching activity this week, flag who needs a nudge or is stuck, and recommend where I should focus my coaching time." },
  { title: "FaceGram recognition post", prompt: "Write an internal FaceGram recognition post celebrating [Name]'s win this week. Keep it specific and team-building. Internal audience only." },
  { title: "Power Hour reminder", prompt: "Write a short Power Hour reminder for my cohort with one prospecting focus and one follow-up focus for today." },
  { title: "Mastermind discussion prompt", prompt: "Create a mastermind discussion prompt for advanced Alliance producers on overcoming a current market objection." },
];

export const faceGramQuickActions: {
  title: string;
  description: string;
  suggestedPost: string;
}[] = [
  { title: "Recognize a win", description: "Celebrate an LO's win in the team or coaching group.", suggestedPost: "Big shoutout to [Name] for [win] this week — that's the rhythm we're building. 👏" },
  { title: "Ask a group question", description: "Spark discussion in your coaching group.", suggestedPost: "Coaches + LOs: what's one objection you heard this week and how did you handle it?" },
  { title: "Post a training reminder", description: "Remind the group about a session or lesson.", suggestedPost: "Reminder: Power Hour today. Bring one prospecting goal and one follow-up you've been avoiding." },
  { title: "Share a clip / resource", description: "Drop a training clip or script into the group.", suggestedPost: "New to the library: [resource]. Watch it before our next call and bring one takeaway." },
];
