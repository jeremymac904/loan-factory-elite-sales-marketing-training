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
  status: CoachingStatus;
};

export const assignedPeople: AssignedPerson[] = [
  { id: "p1", name: "Sample LO — Maria L.", email: "maria.l@loanfactory.com", role: "loan_officer", program: "LO Mastery ($249)", tier: "lo_mastery", coach: "Edward Arvizo", relationship: "paid_coaching", lastActivity: "Today", nextTask: "Review weekly scorecard", status: "active" },
  { id: "p2", name: "Sample LO — Devin R.", email: "devin.r@loanfactory.com", role: "loan_officer", program: "LO Mastery ($249)", tier: "lo_mastery", coach: "Edward Arvizo", relationship: "paid_coaching", lastActivity: "2 days ago", nextTask: "Power Hour check-in", status: "needs_nudge" },
  { id: "p3", name: "Sample LO — Priya S.", email: "priya.s@loanfactory.com", role: "coaching_member_level_2", program: "Loan Factory Alliance ($449)", tier: "alliance", coach: "Edward Arvizo", relationship: "paid_coaching", lastActivity: "Today", nextTask: "Mastermind prep", status: "active" },
  { id: "p4", name: "Sample LO — Tomas G.", email: "tomas.g@loanfactory.com", role: "coaching_member_level_2", program: "Loan Factory Alliance ($449)", tier: "alliance", coach: "Edward Arvizo", relationship: "paid_coaching", lastActivity: "6 days ago", nextTask: "Re-engage — missed 2 sessions", status: "stuck" },
  { id: "p5", name: "Sample LO — Jordan M.", email: "jordan.m@loanfactory.com", role: "loan_officer", program: "New LO onboarding", tier: "none", coach: "Kevin Truong", relationship: "corporate_coach", lastActivity: "Yesterday", nextTask: "First File Survival clip", status: "active" },
  { id: "p6", name: "Sample LO — Alyssa W.", email: "alyssa.w@loanfactory.com", role: "loan_officer", program: "New LO onboarding", tier: "none", coach: "Kevin Truong", relationship: "corporate_coach", lastActivity: "9 days ago", nextTask: "Welcome call + 101 Foundation", status: "inactive" },
  { id: "p7", name: "Sample LO — Brian K.", email: "brian.k@loanfactory.com", role: "loan_officer", program: "Legends Team", tier: "none", coach: "Jeremy McDonald", relationship: "team_leader", lastActivity: "Today", nextTask: "Realtor outreach plan", status: "active" },
  { id: "p8", name: "Sample LO — Nina P.", email: "nina.p@loanfactory.com", role: "loan_officer", program: "Legends Team", tier: "none", coach: "Jeremy McDonald", relationship: "team_leader", lastActivity: "3 days ago", nextTask: "Confirm pipeline review", status: "needs_nudge" },
];

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

export const todaysActions: { label: string; detail: string; href?: string }[] = [
  { label: "Follow up with LOs needing a nudge", detail: "2 assigned LOs are at Needs nudge or Stuck.", href: "/coach-command-center/team/" },
  { label: "Review submitted scorecards", detail: "Check weekly execution + commitments.", href: "/coach-command-center/scorecards/" },
  { label: "Check missing activity", detail: "Spot LOs with no logged activity this week.", href: "/coach-command-center/activity/" },
  { label: "Send a coaching nudge", detail: "Draft a check-in to a stuck LO.", href: "/coach-command-center/messages/" },
  { label: "Schedule a training or Power Hour", detail: "Add a coaching or team session.", href: "/coach-command-center/calendar/" },
  { label: "Recognize a win on FaceGram", detail: "Celebrate progress in the team group.", href: "/facegram/" },
];

export const activitySnapshot: { label: string; value: string; note?: string }[] = [
  { label: "Conversations logged", value: "—", note: "Manual entry" },
  { label: "Realtor touches", value: "—", note: "Manual entry" },
  { label: "Past client touches", value: "—", note: "Manual entry" },
  { label: "Applications", value: "—", note: "Manual entry" },
  { label: "Prequals", value: "—", note: "Manual entry" },
  { label: "Training completed", value: "—", note: "Manual entry" },
  { label: "Scorecards submitted", value: "—", note: "Manual entry" },
  { label: "FaceGram participation", value: "—", note: "Manual entry" },
];

export const messageTemplates: { title: string; body: string }[] = [
  { title: "Coaching nudge", body: "Hey [Name] — noticed it's been a few days since your last check-in. What's one thing blocking your next conversation? Reply here and let's knock it out together." },
  { title: "Weekly check-in", body: "[Name], quick weekly check-in: how many real conversations and Realtor touches did you get this week? Anything you're stuck on for next week?" },
  { title: "Win recognition", body: "[Name] — saw your win this week. That's exactly the rhythm we're building. Keep stacking. Want to share it with the group?" },
  { title: "Stuck-point reset", body: "[Name], let's reset. Pick one activity for tomorrow's Power Hour and commit to it here. I'll check in." },
];

export const emailTemplates: { title: string; subject: string; body: string }[] = [
  { title: "Weekly coaching recap", subject: "Your week + next week's focus", body: "Hi [Name],\n\nGreat work this week. Recap:\n- Conversations: \n- Realtor touches: \n- Applications: \n\nNext week's focus:\n1. \n2. \n3. \n\nLet's review on our next call.\n\n— [Coach]" },
  { title: "First-call follow-up coaching", subject: "Your first-call structure", body: "Hi [Name],\n\nNice work on your first calls. One thing to tighten: the next-step ask. Try this: \"Based on what you shared, the next step is ____. Can we lock that in?\"\n\nReview the 201 lesson and send me one recording from this week.\n\n— [Coach]" },
  { title: "Re-engagement", subject: "Checking in", body: "Hi [Name],\n\nHaven't seen activity logged this week — totally fine, life happens. Let's get one small win on the board. What's the single easiest next step for you tomorrow?\n\n— [Coach]" },
];

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
  "Training completed",
  "Videos watched",
  "AI prompts used",
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

export type MemberProgress = {
  id: string;
  name: string;
  tier: string;
  onboarding: string;
  path: string;
  lastScorecard: string;
  certification: string;
  trainingProgress: string;
  aiTwin: string;
  nextAction: string;
  status: CoachingStatus;
};

export const memberProgress: MemberProgress[] = [
  { id: "p1", name: "Sample LO — Maria L.", tier: "LO Mastery", onboarding: "Complete", path: "101 → 301", lastScorecard: "This week", certification: "CMA — in progress", trainingProgress: "60%", aiTwin: "Set up", nextAction: "Review scorecard", status: "active" },
  { id: "p3", name: "Sample LO — Priya S.", tier: "Alliance", onboarding: "Complete", path: "501 → 601", lastScorecard: "This week", certification: "Advanced — in progress", trainingProgress: "85%", aiTwin: "Active", nextAction: "Mastermind prep", status: "active" },
  { id: "p4", name: "Sample LO — Tomas G.", tier: "Alliance", onboarding: "Complete", path: "401", lastScorecard: "2 weeks ago", certification: "Advanced — paused", trainingProgress: "40%", aiTwin: "Set up", nextAction: "Re-engage", status: "stuck" },
  { id: "p6", name: "Sample LO — Alyssa W.", tier: "New LO", onboarding: "Not started", path: "Pre-101", lastScorecard: "None", certification: "—", trainingProgress: "0%", aiTwin: "Not set up", nextAction: "Welcome call", status: "inactive" },
];

export const trainingAssignables: { category: string; title: string; href: string }[] = [
  { category: "Lesson", title: "101 Foundation", href: "/101-foundation/" },
  { category: "Lesson", title: "201 Borrower Conversion", href: "/201-borrower-conversion/" },
  { category: "Lesson", title: "301 Referral Partner Growth", href: "/301-referral-partner-growth/" },
  { category: "AI Advantage", title: "AI Advantage video library", href: "/ai-training/video-library/" },
  { category: "Clips", title: "LO Development clip library", href: "/training-library/clips/" },
  { category: "Scripts", title: "Scripts library", href: "/scripts/" },
  { category: "Prompts", title: "Prompt library", href: "/prompts/" },
  { category: "Roleplay", title: "Roleplay scenarios", href: "/roleplays/" },
  { category: "Scorecard", title: "Weekly execution scorecard", href: "/coach-command-center/scorecards/" },
  { category: "Market Mentor", title: "Market Mentor Studio exercise", href: "/market-mentor/" },
];

export const coachAiPrompts: { title: string; prompt: string }[] = [
  { title: "Summarize this LO's activity", prompt: "Summarize [Name]'s coaching activity over the last 2 weeks: conversations, Realtor touches, applications, training completed, wins, and stuck points. Then suggest the single highest-leverage next action." },
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
