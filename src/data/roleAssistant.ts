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
