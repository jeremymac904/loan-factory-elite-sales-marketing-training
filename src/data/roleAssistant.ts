// Universal Right-Side AI Assistant — action registry, per-role action lists,
// grounded draft templates, and a getAssistantConfig(role, pageContext) helper.
//
// This powers RoleAssistantPanel.tsx, the ONE collapsible right-side assistant
// mounted globally in src/app/layout.tsx for every approved/preview role. It is
// DRAFT-ONLY: every action produces an editable text draft plus copy /
// save-as-local-draft. Nothing is ever sent. Email / calendar / chat actions are
// explicitly flagged so the panel can show "Draft only — nothing is sent.
// Integration required before this can actually send."
//
// The richer CoachAssistantPanel keeps owning /coach-command-center routes (it is
// roster-aware). This universal assistant suppresses itself there to avoid double
// panels — see RoleAssistantPanel.tsx.
//
// Naming is source-grounded and deliberate: LO Mastery ($249), Loan Factory
// Alliance ($449), Sales and Marketing 101-601 (free internal training, never
// "Elite"), AI Advantage, FaceGram. Never "Apex Advisor". "View as role" (never
// "personate"). Thuan (never "Tuan").

// ---------------------------------------------------------------------------
// Action registry
// ---------------------------------------------------------------------------

export type RoleAssistantActionId =
  | "create_note"
  | "summarize_progress"
  | "draft_follow_up"
  | "draft_gmail_message"
  | "draft_google_chat_message"
  | "draft_google_calendar_event"
  | "create_coaching_agenda"
  | "create_action_items"
  | "assign_resource_draft"
  | "create_training_recommendation"
  | "create_scorecard_reminder"
  | "create_support_escalation_draft"
  | "create_lo_development_task_draft"
  | "create_facegram_post_draft"
  | "create_ai_advantage_prompt_draft";

export type RoleAssistantAction = {
  id: RoleAssistantActionId;
  label: string;
  description: string;
  // Email / calendar / chat actions require an external integration that is not
  // wired here. The panel surfaces the integration notice for these.
  needsIntegration?: boolean;
};

// Canonical metadata for every assistant action. Per-role lists below reference
// these by id so labels/descriptions stay consistent across roles.
export const roleAssistantActionRegistry: Record<
  RoleAssistantActionId,
  RoleAssistantAction
> = {
  create_note: {
    id: "create_note",
    label: "Create note",
    description:
      "Draft a structured internal note with context, observations, and next steps.",
  },
  summarize_progress: {
    id: "summarize_progress",
    label: "Summarize progress",
    description:
      "Summarize current progress and signals for this role and page into a sharable recap.",
  },
  draft_follow_up: {
    id: "draft_follow_up",
    label: "Draft follow-up message",
    description:
      "Write a concise follow-up tied to a specific commitment or next step.",
  },
  draft_gmail_message: {
    id: "draft_gmail_message",
    label: "Draft Gmail message",
    description: "Create a Gmail-style draft only; Gmail is not connected here.",
    needsIntegration: true,
  },
  draft_google_chat_message: {
    id: "draft_google_chat_message",
    label: "Draft Google Chat message",
    description: "Create a Google Chat draft only; nothing is posted.",
    needsIntegration: true,
  },
  draft_google_calendar_event: {
    id: "draft_google_calendar_event",
    label: "Draft Google Calendar event",
    description:
      "Create draft event details only; no calendar event is created.",
    needsIntegration: true,
  },
  create_coaching_agenda: {
    id: "create_coaching_agenda",
    label: "Create coaching agenda",
    description: "Prepare a focused agenda for the next coaching or team call.",
  },
  create_action_items: {
    id: "create_action_items",
    label: "Create action items",
    description:
      "Turn the current context into owners, due dates, and verification steps.",
  },
  assign_resource_draft: {
    id: "assign_resource_draft",
    label: "Assign resource draft",
    description:
      "Draft a resource assignment with a required takeaway and a field application.",
  },
  create_training_recommendation: {
    id: "create_training_recommendation",
    label: "Create training recommendation",
    description:
      "Recommend Sales and Marketing 101-601, AI Advantage, scripts, or clips for this person.",
  },
  create_scorecard_reminder: {
    id: "create_scorecard_reminder",
    label: "Create scorecard reminder",
    description:
      "Draft a weekly execution scorecard reminder before the next review.",
  },
  create_support_escalation_draft: {
    id: "create_support_escalation_draft",
    label: "Create support escalation draft",
    description:
      "Draft a Loan Officer Support escalation with the issue, impact, and requested resolution.",
  },
  create_lo_development_task_draft: {
    id: "create_lo_development_task_draft",
    label: "Create LO Development task draft",
    description:
      "Draft an LO Development task with owner, outcome, and due date for the roadmap.",
  },
  create_facegram_post_draft: {
    id: "create_facegram_post_draft",
    label: "Create FaceGram post draft",
    description:
      "Draft an internal FaceGram recognition or announcement post for the team group.",
  },
  create_ai_advantage_prompt_draft: {
    id: "create_ai_advantage_prompt_draft",
    label: "Create AI Advantage prompt draft",
    description:
      "Draft an approved-style AI Advantage prompt the LO can reuse. Internal, no borrower claims.",
  },
};

export function getRoleAssistantAction(
  id: RoleAssistantActionId,
): RoleAssistantAction {
  return roleAssistantActionRegistry[id];
}

// ---------------------------------------------------------------------------
// Per-role action lists
// ---------------------------------------------------------------------------
// Each operational role gets a role-appropriate subset. Members and loan
// officers get a self-directed subset (no escalation/task authoring); coaches,
// leads, support, marketing, and admins get the broader operational set. Roles
// not listed fall back to a sensible universal default.

const ADMIN_ACTIONS: RoleAssistantActionId[] = [
  "create_note",
  "summarize_progress",
  "draft_follow_up",
  "draft_gmail_message",
  "draft_google_chat_message",
  "draft_google_calendar_event",
  "create_action_items",
  "create_lo_development_task_draft",
  "create_support_escalation_draft",
  "create_facegram_post_draft",
  "create_ai_advantage_prompt_draft",
];

const LO_DEVELOPMENT_ACTIONS: RoleAssistantActionId[] = [
  "create_note",
  "summarize_progress",
  "draft_follow_up",
  "draft_gmail_message",
  "draft_google_chat_message",
  "draft_google_calendar_event",
  "create_action_items",
  "create_lo_development_task_draft",
  "create_training_recommendation",
  "assign_resource_draft",
  "create_facegram_post_draft",
  "create_ai_advantage_prompt_draft",
];

const TRAINING_ACADEMY_ACTIONS: RoleAssistantActionId[] = [
  "create_note",
  "summarize_progress",
  "draft_follow_up",
  "draft_gmail_message",
  "create_training_recommendation",
  "assign_resource_draft",
  "create_action_items",
  "create_facegram_post_draft",
  "create_ai_advantage_prompt_draft",
];

const SUPPORT_ACTIONS: RoleAssistantActionId[] = [
  "create_note",
  "summarize_progress",
  "draft_follow_up",
  "draft_gmail_message",
  "draft_google_chat_message",
  "create_support_escalation_draft",
  "create_action_items",
];

const MARKETING_ACTIONS: RoleAssistantActionId[] = [
  "create_note",
  "summarize_progress",
  "draft_follow_up",
  "draft_gmail_message",
  "draft_google_chat_message",
  "create_facegram_post_draft",
  "create_ai_advantage_prompt_draft",
  "create_action_items",
];

const COACH_ACTIONS: RoleAssistantActionId[] = [
  "create_note",
  "summarize_progress",
  "draft_follow_up",
  "draft_gmail_message",
  "draft_google_chat_message",
  "draft_google_calendar_event",
  "create_coaching_agenda",
  "create_action_items",
  "assign_resource_draft",
  "create_training_recommendation",
  "create_scorecard_reminder",
  "create_facegram_post_draft",
  "create_ai_advantage_prompt_draft",
];

const TEAM_LEADER_ACTIONS: RoleAssistantActionId[] = [
  "create_note",
  "summarize_progress",
  "draft_follow_up",
  "draft_gmail_message",
  "draft_google_chat_message",
  "draft_google_calendar_event",
  "create_coaching_agenda",
  "create_action_items",
  "create_scorecard_reminder",
  "create_facegram_post_draft",
  "create_ai_advantage_prompt_draft",
];

const MEMBER_ACTIONS: RoleAssistantActionId[] = [
  "create_note",
  "summarize_progress",
  "draft_follow_up",
  "create_scorecard_reminder",
  "create_action_items",
  "create_training_recommendation",
  "create_ai_advantage_prompt_draft",
];

const LOAN_OFFICER_ACTIONS: RoleAssistantActionId[] = [
  "create_note",
  "summarize_progress",
  "draft_follow_up",
  "create_action_items",
  "create_training_recommendation",
  "create_ai_advantage_prompt_draft",
];

const DEFAULT_ACTIONS: RoleAssistantActionId[] = [
  "create_note",
  "summarize_progress",
  "draft_follow_up",
  "create_action_items",
  "create_ai_advantage_prompt_draft",
];

// Maps the effective role key (view-as aware) to its action list. Keys match
// roleLabels in src/lib/supabase/auth.ts.
const roleActionMap: Record<string, RoleAssistantActionId[]> = {
  master_admin: ADMIN_ACTIONS,
  admin: ADMIN_ACTIONS,
  lo_development_lead: LO_DEVELOPMENT_ACTIONS,
  lo_development_member: LO_DEVELOPMENT_ACTIONS,
  lo_development: LO_DEVELOPMENT_ACTIONS,
  training_academy: TRAINING_ACADEMY_ACTIONS,
  loan_officer_support: SUPPORT_ACTIONS,
  support_staff: SUPPORT_ACTIONS,
  marketing: MARKETING_ACTIONS,
  corporate_coach: COACH_ACTIONS,
  corporate_coach_supervisor: COACH_ACTIONS,
  lo_mastery_coach: COACH_ACTIONS,
  loan_factory_alliance_coach: COACH_ACTIONS,
  coaching_director: COACH_ACTIONS,
  team_leader: TEAM_LEADER_ACTIONS,
  coaching_member_level_1: MEMBER_ACTIONS,
  coaching_member_level_2: MEMBER_ACTIONS,
  loan_officer: LOAN_OFFICER_ACTIONS,
};

export function getRoleAssistantActionIds(
  role: string | null | undefined,
): RoleAssistantActionId[] {
  if (!role) return DEFAULT_ACTIONS;
  return roleActionMap[role] ?? DEFAULT_ACTIONS;
}

// ---------------------------------------------------------------------------
// Page context
// ---------------------------------------------------------------------------
// Derives a short, human-readable area label from the current pathname so drafts
// can be grounded to where the user actually is.

export function pageContextLabel(pathname: string | null | undefined): string {
  const path = (pathname ?? "/").toLowerCase();
  const map: { prefix: string; label: string }[] = [
    { prefix: "/coach-command-center", label: "Coach Command Center" },
    { prefix: "/lo-development", label: "LO Development" },
    { prefix: "/training-academy", label: "Training Academy" },
    { prefix: "/loan-officer-support", label: "Loan Officer Support" },
    { prefix: "/marketing", label: "Marketing" },
    { prefix: "/member-area/lo-mastery", label: "LO Mastery member area" },
    { prefix: "/member-area/alliance", label: "Loan Factory Alliance member area" },
    { prefix: "/member-area", label: "Member area" },
    { prefix: "/team-leader-guide", label: "Team Leader Guide" },
    { prefix: "/normal-lo", label: "Loan Officer workspace" },
    { prefix: "/facegram", label: "FaceGram" },
    { prefix: "/ai-training", label: "AI Advantage" },
    { prefix: "/scripts", label: "Scripts library" },
    { prefix: "/prompts", label: "Prompt library" },
    { prefix: "/roleplays", label: "Roleplay scenarios" },
    { prefix: "/training-library", label: "Training library" },
    { prefix: "/market-mentor", label: "Market Mentor Studio" },
    { prefix: "/admin", label: "Admin Console" },
    { prefix: "/profile", label: "Profile" },
  ];
  for (const entry of map) {
    if (path.startsWith(entry.prefix)) return entry.label;
  }
  return "LO Development Platform";
}

// ---------------------------------------------------------------------------
// Assistant config (role + page)
// ---------------------------------------------------------------------------

export type AssistantConfig = {
  role: string;
  roleLabel: string;
  pageContext: string;
  actions: RoleAssistantAction[];
};

export function getAssistantConfig(
  role: string | null | undefined,
  roleLabel: string,
  pathname: string | null | undefined,
): AssistantConfig {
  const ids = getRoleAssistantActionIds(role);
  return {
    role: role ?? "",
    roleLabel,
    pageContext: pageContextLabel(pathname),
    actions: ids.map(getRoleAssistantAction),
  };
}

// ---------------------------------------------------------------------------
// Draft templates (token-filled, grounded, draft-only)
// ---------------------------------------------------------------------------

const INTEGRATION_NOTICE =
  "Draft only — nothing is sent. Integration required before this can actually send.";

export type DraftInput = {
  actionId: RoleAssistantActionId;
  roleLabel: string;
  pageContext: string;
};

// Produces an editable, grounded draft for the given action. The user edits this
// in the panel before copying or saving it locally. Nothing is sent or posted.
export function buildRoleAssistantDraft(input: DraftInput): string {
  const { actionId, roleLabel, pageContext } = input;
  const header = [
    `Role context: ${roleLabel}`,
    `Page context: ${pageContext}`,
  ].join("\n");

  switch (actionId) {
    case "create_note":
      return `${header}\n\nNote draft:\nTitle: [short title]\nTags: [tags]\nContext:\n- What happened:\n- Observation:\n- Decision / next step:\nFollow-up: [owner] by [date]`;

    case "summarize_progress":
      return `${header}\n\nProgress summary:\n- Focus this week:\n- What moved forward:\n- Signals to watch:\n- Blockers:\n- Highest-leverage next action:\n\nKeep this internal. Do not mix free Sales and Marketing 101-601 completion in with paid LO Mastery ($249) / Loan Factory Alliance ($449) coaching progress.`;

    case "draft_follow_up":
      return `${header}\n\nFollow-up message draft:\n\nHi [Name],\n\nFollowing up on [commitment / next step]. Where did it land, what got in the way, and what is the next smallest action you can complete by [date]?\n\n— ${roleLabel}\n\nDraft only. Review and edit before you use it.`;

    case "draft_gmail_message":
      return `${INTEGRATION_NOTICE}\n\nGmail draft\nTo: [recipient]\nSubject: [subject]\n\nHi [Name],\n\n[Body — recap, ask, or next step grounded in ${pageContext}.]\n\n— ${roleLabel}`;

    case "draft_google_chat_message":
      return `${INTEGRATION_NOTICE}\n\nGoogle Chat draft\nSpace: [team / coaching space]\n\n[Short, direct message. One ask, one next step. Context: ${pageContext}.]`;

    case "draft_google_calendar_event":
      return `${INTEGRATION_NOTICE}\n\nGoogle Calendar event draft\nTitle: [event title]\nAttendees: [emails]\nDuration: [e.g. 30 min]\nAgenda:\n- [item 1]\n- [item 2]\n- [item 3]\nContext: ${pageContext}`;

    case "create_coaching_agenda":
      return `${header}\n\nCoaching call agenda draft:\n1. Wins and activity signal.\n2. Scorecard review or missing-scorecard reset.\n3. Top blocker.\n4. Assigned resource and required takeaway.\n5. Next-week commitment.\n6. Follow-up date.`;

    case "create_action_items":
      return `${header}\n\nAction items draft:\n1. Owner: [name]; Action: [specific action]; Due: [date]; Verification: [how it is checked].\n2. Owner: ${roleLabel}; Action: [follow-up]; Due: [date]; Verification: note updated.\n3. Resource: [resource]; Completion proof: [takeaway / field application].`;

    case "assign_resource_draft":
      return `${header}\n\nResource assignment draft:\n[Name], before [date], complete [resource].\n- Why this resource: [reason]\n- Required takeaway: [one thing to bring back]\n- Field application: [where to use it this week]\n- Verification: [how we confirm it]`;

    case "create_training_recommendation":
      return `${header}\n\nTraining recommendation draft:\n[Name], based on where you are, the next step is:\n- Lesson: [Sales and Marketing 101 / 201 / 301 / 401 / 501 / 601] (free internal training)\n- AI Advantage: [relevant AI Advantage resource]\n- Script or clip: [scripts library / LO Development clip]\nBring one takeaway and one place you applied it.`;

    case "create_scorecard_reminder":
      return `${header}\n\nWeekly scorecard reminder draft:\n[Name], your weekly execution scorecard is due before [date]. Please submit conversations, Realtor activity, past-client touches, applications, follow-ups, wins, and stuck points so the next review focuses on decisions, not reconstruction.`;

    case "create_support_escalation_draft":
      return `${header}\n\nLoan Officer Support escalation draft:\n- Submitted by: ${roleLabel}\n- Person / loan affected: [name / loan number]\n- Issue: [what is happening]\n- Impact / urgency: [why it matters and by when]\n- Steps already taken: [what was tried]\n- Requested resolution: [what good looks like]\nDraft only — route through the correct support channel.`;

    case "create_lo_development_task_draft":
      return `${header}\n\nLO Development task draft:\n- Task: [outcome-oriented title]\n- Owner: [name]\n- Why it matters: [link to roadmap / member impact]\n- Definition of done: [observable result]\n- Due: [date]\n- Notes: grounded in ${pageContext}.`;

    case "create_facegram_post_draft":
      return `${header}\n\nFaceGram post draft (internal audience only):\nBig shoutout to [Name] for [specific win] this week — that is the rhythm we are building. 👏\n[Optional: tag the resource or next step the team can copy.]\nDraft only. Review before posting.`;

    case "create_ai_advantage_prompt_draft":
      return `${header}\n\nAI Advantage prompt draft (internal, no borrower claims):\n"[Describe the task, e.g. 'Summarize this LO\\'s last two weeks of activity and suggest the single highest-leverage next action.']"\nGuardrails: internal use, no guarantees, no borrower-facing claims. Edit before reuse.`;

    default:
      return `${header}\n\n[Draft content — edit before you use it.]`;
  }
}

// ---------------------------------------------------------------------------
// First-login Command Center chat — role-aware GUIDED answers (honest mode)
// ---------------------------------------------------------------------------
// Powers the ChatGPT-style command box on dashboards + the "Ask" tab of the
// right-side assistant. This is a GUIDED assistant, not a live LLM: answers are
// structured local templates grounded in real platform routes. It never calls
// an external/paid AI provider and never sends anything. The architecture is
// provider-ready: answerPlatformQuestion() is the single seam a future server
// action can replace, returning the same GuidedAnswer shape.

export type GuidedAnswerLink = { label: string; href: string };

export type GuidedAnswer = {
  // The matched intent key (or "fallback").
  intent: string;
  // Short, friendly, role-aware answer body (plain text, may include newlines).
  body: string;
  // Concrete in-app destinations the user can click.
  links: GuidedAnswerLink[];
};

export type StarterPrompt = {
  id: string;
  label: string;
};

// The ten suggested starter prompts (shown as clickable chips). Order is the
// "where do I start" → deeper-help flow Jeremy specified.
export const commandCenterStarterPrompts: StarterPrompt[] = [
  { id: "start", label: "Where should I start?" },
  { id: "next_action", label: "Show me my next action." },
  { id: "coaching", label: "How do I use the coaching dashboard?" },
  { id: "scorecard", label: "How do I submit my weekly scorecard?" },
  { id: "sales_training", label: "Where are the Sales and Marketing trainings?" },
  { id: "ai_advantage", label: "Where are the AI Advantage videos?" },
  { id: "lo_dev_videos", label: "Where are the LO Development videos?" },
  { id: "support", label: "How do I find LO Support resources?" },
  { id: "facegram", label: "How do I use FaceGram?" },
  { id: "walkthroughs", label: "How do I find video walkthroughs?" },
  { id: "ask_help", label: "How do I ask for help?" },
];

// Common destinations reused across answers (keeps links consistent + real).
const LINKS = {
  coaching: { label: "Coaching overview", href: "/coaching/" },
  coachCenter: { label: "Coach Command Center", href: "/coach-command-center/" },
  loMastery: { label: "LO Mastery member area", href: "/member-area/lo-mastery/" },
  alliance: { label: "Loan Factory Alliance member area", href: "/member-area/alliance/" },
  scorecard: { label: "Submit weekly scorecard", href: "/member-area/scorecards/" },
  coachScorecards: { label: "Review LO scorecards", href: "/coach-command-center/scorecards/" },
  salesTraining: { label: "Sales and Marketing 101-601", href: "/sales-training/" },
  trainingLibrary: { label: "Training Library", href: "/training-library/" },
  aiAdvantage: { label: "AI Advantage", href: "/ai-training/" },
  aiVideos: { label: "AI Advantage video library", href: "/ai-training/video-library/" },
  loDevVideos: { label: "LO Development video library", href: "/training-library/lo-development-videos/" },
  resources: { label: "Resource Library", href: "/resources/" },
  support: { label: "Loan Officer Support", href: "/loan-officer-support/" },
  supportRouting: { label: "Support routing", href: "/support-routing/" },
  facegram: { label: "FaceGram", href: "/facegram/" },
  admin: { label: "Admin Console", href: "/admin/" },
  viewAs: { label: "View as role", href: "/admin/view-as/" },
  platformStatus: { label: "Platform status", href: "/admin/platform-status/" },
  loDev: { label: "LO Development", href: "/lo-development/" },
  trainingAcademy: { label: "Training Academy", href: "/training-academy/" },
  marketing: { label: "Marketing", href: "/marketing/" },
  contentSkills: { label: "Content Skills", href: "/content-skills/" },
  departmentRouting: { label: "Department routing", href: "/department-routing/" },
  feedback: { label: "Send Feedback (bottom-right button)", href: "/resources/" },
} as const;

// Buckets group roles so each guided answer can be tailored without a 16-branch
// switch per intent.
type RoleBucket =
  | "admin"
  | "lo_development"
  | "coach"
  | "lo_mastery_member"
  | "alliance_member"
  | "training_academy"
  | "support"
  | "marketing"
  | "loan_officer";

function roleBucket(role: string | null | undefined): RoleBucket {
  switch (role) {
    case "master_admin":
    case "admin":
      return "admin";
    case "lo_development_lead":
    case "lo_development_member":
    case "lo_development":
      return "lo_development";
    case "corporate_coach":
    case "corporate_coach_supervisor":
    case "lo_mastery_coach":
    case "loan_factory_alliance_coach":
    case "coaching_director":
    case "team_leader":
      return "coach";
    case "coaching_member_level_1":
      return "lo_mastery_member";
    case "coaching_member_level_2":
      return "alliance_member";
    case "training_academy":
      return "training_academy";
    case "loan_officer_support":
    case "support_staff":
      return "support";
    case "marketing":
      return "marketing";
    case "loan_officer":
    default:
      return "loan_officer";
  }
}

// Per-bucket "where should I start" answer + the single highest-value link.
function startAnswer(bucket: RoleBucket): GuidedAnswer {
  const base = (body: string, links: GuidedAnswerLink[]): GuidedAnswer => ({
    intent: "start",
    body,
    links,
  });
  switch (bucket) {
    case "admin":
      return base(
        "Start in the Admin Console. From there you can manage users and access, open any role with View as role to record walkthroughs, and check Platform status. Use the dropdowns to reach People & Access, Coaching, Training & Content, and Ops & Review.",
        [LINKS.admin, LINKS.viewAs, LINKS.platformStatus],
      );
    case "lo_development":
      return base(
        "Start on the LO Development dashboard. Your job is operations: routing, support coverage, training rollout, and coaching enablement. Use Department routing to see who owns what, and the Training Library to push resources.",
        [LINKS.loDev, LINKS.departmentRouting, LINKS.trainingLibrary],
      );
    case "coach":
      return base(
        "Start in the Coach Command Center. Open My People to see your roster, review submitted scorecards, and check who needs a nudge. The right-side coach assistant drafts notes, agendas, and follow-ups for the LO you select.",
        [LINKS.coachCenter, LINKS.coachScorecards, LINKS.coaching],
      );
    case "lo_mastery_member":
      return base(
        "Start in your LO Mastery member area ($249 tier). Your weekly rhythm is: join Power Hour, work the training, and submit your weekly scorecard so your coach can review it before your next session.",
        [LINKS.loMastery, LINKS.scorecard, LINKS.coaching],
      );
    case "alliance_member":
      return base(
        "Start in your Loan Factory Alliance member area ($449 tier). You get the advanced coaching track, mastermind, and the same weekly accountability — submit your scorecard each week and bring it to coaching.",
        [LINKS.alliance, LINKS.scorecard, LINKS.coaching],
      );
    case "training_academy":
      return base(
        "Start in Training Academy. You own curriculum and content production — the Sales and Marketing 101-601 path, the Training Library, and Content Skills are your core surfaces.",
        [LINKS.trainingAcademy, LINKS.salesTraining, LINKS.contentSkills],
      );
    case "support":
      return base(
        "Start in Loan Officer Support. Use Support routing to triage requests to the right lane, and keep the Resource Library handy for the answers LOs ask for most.",
        [LINKS.support, LINKS.supportRouting, LINKS.resources],
      );
    case "marketing":
      return base(
        "Start on the Marketing dashboard. Your core flow is content review and marketing enablement — Content Skills, the Resource Library, and the AI Advantage tools support your drafts.",
        [LINKS.marketing, LINKS.contentSkills, LINKS.aiAdvantage],
      );
    case "loan_officer":
    default:
      return base(
        "Start with Sales and Marketing 101-601 — that is your free internal training path. Then explore AI Advantage, keep the Resource Library handy, and use FaceGram to stay connected with the team. If you get stuck, reach Loan Officer Support.",
        [LINKS.salesTraining, LINKS.aiAdvantage, LINKS.support],
      );
  }
}

// Intent matchers run in order; first hit wins. Keyword-based (honest guided
// mode — no model inference). Each returns a role-aware GuidedAnswer.
type IntentMatcher = {
  intent: string;
  test: (q: string) => boolean;
  answer: (bucket: RoleBucket) => GuidedAnswer;
};

const matchers: IntentMatcher[] = [
  {
    intent: "start",
    test: (q) => /where.*start|get start|begin|first|new here|onboard/.test(q),
    answer: (b) => startAnswer(b),
  },
  {
    intent: "next_action",
    test: (q) => /next action|what.*do (now|next)|what should i do/.test(q),
    answer: (b) => {
      const start = startAnswer(b);
      return {
        intent: "next_action",
        body:
          "Your next action lives on your dashboard under “Next actions,” right under the hero. Open the first card there. If you want, I can point you to the most common next step for your role:",
        links: start.links,
      };
    },
  },
  {
    intent: "coaching",
    test: (q) => /coach|coaching dashboard|command center/.test(q),
    answer: (b) =>
      b === "coach"
        ? {
            intent: "coaching",
            body:
              "The Coach Command Center is your hub: My People (roster), Activity, Scorecards (review what LOs submit), Member Progress, Coaching Notes, Training Plan, Messages, Email Center, and Calendar — all draft-only for comms. The right-side coach assistant drafts notes and agendas for a selected LO.",
            links: [LINKS.coachCenter, LINKS.coachScorecards, LINKS.coaching],
          }
        : b === "lo_mastery_member"
          ? {
              intent: "coaching",
              body:
                "Your coaching lives in the LO Mastery member area ($249). Join Power Hour and biweekly group coaching, work your track, and submit your weekly scorecard so your coach can review it.",
              links: [LINKS.loMastery, LINKS.scorecard, LINKS.coaching],
            }
          : b === "alliance_member"
            ? {
                intent: "coaching",
                body:
                  "Your coaching lives in the Loan Factory Alliance member area ($449): advanced coaching, mastermind, and weekly accountability. Submit your scorecard each week and bring it to your session.",
                links: [LINKS.alliance, LINKS.scorecard, LINKS.coaching],
              }
            : {
                intent: "coaching",
                body:
                  "Coaching at Loan Factory has two paid tiers: LO Mastery ($249) and Loan Factory Alliance ($449). The Coaching overview explains both. Note: paid coaching is separate from the free Sales and Marketing 101-601 training.",
                links: [LINKS.coaching, LINKS.loMastery, LINKS.alliance],
              },
  },
  {
    intent: "scorecard",
    test: (q) => /scorecard/.test(q),
    answer: (b) =>
      b === "coach"
        ? {
            intent: "scorecard",
            body:
              "Coaches review scorecards — they do not fill them out. Open Scorecards in the Coach Command Center to see submitted vs missing, trends, and follow-up actions. LOs submit their own each week.",
            links: [LINKS.coachScorecards, LINKS.coachCenter],
          }
        : {
            intent: "scorecard",
            body:
              "Submit your weekly scorecard from your member area — track real conversations, Realtor activity, past-client touches, pipeline and follow-up work, and your coaching commitments. Save a draft anytime; submit before your next coaching session.",
            links: [LINKS.scorecard, b === "alliance_member" ? LINKS.alliance : LINKS.loMastery],
          },
  },
  {
    intent: "sales_training",
    test: (q) => /sales|marketing train|101|201|301|401|501|601|curriculum|course/.test(q),
    answer: () => ({
      intent: "sales_training",
      body:
        "Sales and Marketing 101 through 601 is your free internal training path (it is not paid coaching). Start at 101 and work up. The Training Library holds the supporting handouts, clips, and the marketing asset guides.",
      links: [LINKS.salesTraining, LINKS.trainingLibrary],
    }),
  },
  {
    intent: "ai_advantage",
    test: (q) => /ai advantage|ai video|ai train|gemini|ai twin/.test(q),
    answer: () => ({
      intent: "ai_advantage",
      body:
        "AI Advantage is your AI playbook. The lessons live on the AI Advantage page, and the full set of micro-lessons is in the AI Advantage video library. Use it to speed up content, follow-up, and day-to-day work — internal use, no borrower claims.",
      links: [LINKS.aiAdvantage, LINKS.aiVideos],
    }),
  },
  {
    intent: "walkthroughs",
    test: (q) => /walkthrough|video|how-to|tutorial|clip|recording/.test(q),
    answer: () => ({
      intent: "walkthroughs",
      body:
        "Video walkthroughs live in two places: the AI Advantage video library (AI micro-lessons) and the LO Development video library (platform + process clips, grouped by category). The Training Library ties them together.",
      links: [LINKS.loDevVideos, LINKS.aiVideos, LINKS.trainingLibrary],
    }),
  },
  {
    intent: "support",
    test: (q) => /support|resource|help desk|ticket|escalat|stuck/.test(q),
    answer: (b) =>
      b === "support"
        ? {
            intent: "support",
            body:
              "You run support. Use Support routing to triage each request to the right lane and escalate when needed; the Resource Library has the answers LOs ask for most.",
            links: [LINKS.supportRouting, LINKS.support, LINKS.resources],
          }
        : {
            intent: "support",
            body:
              "For help, start with the Resource Library, then reach Loan Officer Support — they triage your request to the right lane and escalate lender issues when needed.",
            links: [LINKS.support, LINKS.resources, LINKS.supportRouting],
          },
  },
  {
    intent: "facegram",
    test: (q) => /facegram|social|community|feed|post/.test(q),
    answer: () => ({
      intent: "facegram",
      body:
        "FaceGram is the internal Loan Factory community — share wins, ask the group questions, and keep up with team activity. It is internal-audience only; the right-side assistant can draft a FaceGram post for you.",
      links: [LINKS.facegram],
    }),
  },
  {
    intent: "resources",
    test: (q) => /resource|library|handout|script|where.*find/.test(q),
    answer: () => ({
      intent: "resources",
      body:
        "The Resource Library is your hub for recommended channels, compliance notes, recordings, clips, and support contacts. The Training Library holds the structured training assets.",
      links: [LINKS.resources, LINKS.trainingLibrary],
    }),
  },
  {
    intent: "admin",
    test: (q) => /admin|manage user|platform control|view as|status/.test(q),
    answer: (b) =>
      b === "admin"
        ? {
            intent: "admin",
            body:
              "Admin controls live in the Admin Console: People & Access, Coaching, Training & Content, and Ops & Review. Use View as role to preview any role (the orange banner shows you are previewing), and Platform status for integration health.",
            links: [LINKS.admin, LINKS.viewAs, LINKS.platformStatus],
          }
        : {
            intent: "admin",
            body:
              "Admin tools are limited to Master Admin and Admin roles. If you need a permission or access change, reach Loan Officer Support or LO Development.",
            links: [LINKS.support, LINKS.loDev],
          },
  },
  {
    intent: "ask_help",
    test: (q) => /ask.*help|contact|reach|who do i|talk to|question/.test(q),
    answer: () => ({
      intent: "ask_help",
      body:
        "Two fast ways to get help: (1) the Send Feedback button at the bottom-right of any page, and (2) Loan Officer Support, which routes your request to the right lane. For anything urgent, Support routing shows the escalation path.",
      links: [LINKS.support, LINKS.resources, LINKS.supportRouting],
    }),
  },
];

// The single seam a future AI provider can replace. Today it returns a grounded,
// role-aware guided answer from local templates — NO external/paid AI call, NO
// sending. Same return shape a server action would use later.
export function answerPlatformQuestion(
  question: string,
  role: string | null | undefined,
): GuidedAnswer {
  const q = (question ?? "").toLowerCase().trim();
  const bucket = roleBucket(role);

  if (q) {
    for (const m of matchers) {
      if (m.test(q)) return m.answer(bucket);
    }
  }

  // Fallback: friendly nudge toward the starter prompts + the role's best start.
  const start = startAnswer(bucket);
  return {
    intent: "fallback",
    body:
      "I can help you find your way around the LO Development Platform. Try one of the suggested prompts below, or ask about coaching, training, scorecards, AI Advantage, resources, FaceGram, or support. Here is a good place to start for your role:",
    links: start.links,
  };
}

// Resolves a starter prompt id to its question text (so chips and free text use
// the same answer path).
export function starterPromptText(id: string): string {
  return (
    commandCenterStarterPrompts.find((p) => p.id === id)?.label ?? id
  );
}
