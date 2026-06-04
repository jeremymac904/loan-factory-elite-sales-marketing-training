export type CoachingFormAudience =
  | "member"
  | "alliance"
  | "coach"
  | "manager"
  | "admin";

export type CoachingFormFieldType =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "select";

export type CoachingFormField = {
  key: string;
  label: string;
  type: CoachingFormFieldType;
  hint?: string;
  placeholder?: string;
  rows?: number;
  options?: string[];
};

export type CoachingFormTemplate = {
  id: string;
  title: string;
  description: string;
  whoFor: string;
  audience: CoachingFormAudience[];
  section: "member" | "growth" | "coach";
  sourceFolder: "01_Thuan_Slide_Deck" | "02_Complete_Coaching_Program";
  sourceFileName?: string;
  storageKey: string;
  openHref?: string;
  fields: CoachingFormField[];
};

export const coachingLiveTools = [
  {
    title: "Weekly scorecard",
    description:
      "Open the live scorecard to submit weekly activity, commitments, and follow-up decisions.",
    href: "/member-area/scorecards/",
    audience: "member",
  },
  {
    title: "Coach notes",
    description:
      "Open the live note workflow for wins, blockers, action items, and follow-up dates.",
    href: "/coach-command-center/coaching-notes/",
    audience: "coach",
  },
  {
    title: "Weekly call prep",
    description:
      "Draft the next coaching call and the calendar details before you lock the time.",
    href: "/coach-command-center/calendar/",
    audience: "coach",
  },
] as const;

export const coachingFormTemplates: CoachingFormTemplate[] = [
  {
    id: "daily-time-blocker",
    title: "Daily time blocker",
    description:
      "Protect a focused block for conversations, follow-up, and the work that moves the week.",
    whoFor: "Members and coaches.",
    audience: ["member", "coach", "manager", "admin"],
    section: "member",
    sourceFolder: "02_Complete_Coaching_Program",
    storageKey: "coaching-form-daily-time-blocker",
    fields: [
      { key: "date", label: "Date", type: "date" },
      {
        key: "topPriority",
        label: "Top priority",
        type: "textarea",
        rows: 3,
        placeholder: "What matters most today?",
      },
      {
        key: "callBlock",
        label: "Call block",
        type: "text",
        placeholder: "9:00 AM - 11:00 AM",
      },
      {
        key: "followUpBlock",
        label: "Follow-up block",
        type: "text",
        placeholder: "1:00 PM - 2:00 PM",
      },
      {
        key: "adminBlock",
        label: "Admin block",
        type: "text",
        placeholder: "3:30 PM - 4:00 PM",
      },
    ],
  },
  {
    id: "theme-days-planner",
    title: "Theme days planner",
    description:
      "Set a clean focus for each day so the week stays narrow and repeatable.",
    whoFor: "Members and coaches.",
    audience: ["member", "coach", "manager", "admin"],
    section: "member",
    sourceFolder: "02_Complete_Coaching_Program",
    storageKey: "coaching-form-theme-days-planner",
    fields: [
      { key: "weekOf", label: "Week of", type: "date" },
      { key: "monday", label: "Monday theme", type: "text" },
      { key: "tuesday", label: "Tuesday theme", type: "text" },
      { key: "wednesday", label: "Wednesday theme", type: "text" },
      { key: "thursday", label: "Thursday theme", type: "text" },
      { key: "friday", label: "Friday theme", type: "text" },
    ],
  },
  {
    id: "greatness-tracker",
    title: "Greatness tracker",
    description:
      "Track consistency, wins, and the smallest actions that move the week forward.",
    whoFor: "Members and coaches.",
    audience: ["member", "coach", "manager", "admin"],
    section: "member",
    sourceFolder: "02_Complete_Coaching_Program",
    storageKey: "coaching-form-greatness-tracker",
    fields: [
      { key: "weekEnding", label: "Week ending", type: "date" },
      {
        key: "consistencyScore",
        label: "Consistency score",
        type: "number",
        hint: "1 to 10",
      },
      {
        key: "wins",
        label: "Wins",
        type: "textarea",
        rows: 3,
        placeholder: "What moved forward?",
      },
      {
        key: "improvement",
        label: "One improvement",
        type: "textarea",
        rows: 2,
      },
      {
        key: "nextFocus",
        label: "Next focus",
        type: "text",
        placeholder: "What will you tighten next week?",
      },
    ],
  },
  {
    id: "weekly-action-plan",
    title: "Weekly action plan",
    description:
      "Three priorities, daily actions, and the follow-through that keeps the week moving.",
    whoFor: "Members and coaches.",
    audience: ["member", "coach", "manager", "admin"],
    section: "member",
    sourceFolder: "02_Complete_Coaching_Program",
    storageKey: "coaching-form-weekly-action-plan",
    fields: [
      { key: "weekOf", label: "Week of", type: "date" },
      {
        key: "priorityOne",
        label: "Priority one",
        type: "textarea",
        rows: 2,
      },
      {
        key: "priorityTwo",
        label: "Priority two",
        type: "textarea",
        rows: 2,
      },
      {
        key: "priorityThree",
        label: "Priority three",
        type: "textarea",
        rows: 2,
      },
      {
        key: "dailyActions",
        label: "Daily actions",
        type: "textarea",
        rows: 3,
        placeholder: "What gets touched each day?",
      },
    ],
  },
  {
    id: "goal-setting-worksheet",
    title: "Goal setting worksheet",
    description:
      "A simple worksheet for 90-day goals, the reason behind them, and the support needed.",
    whoFor: "Members, coaches, managers, and admin.",
    audience: ["member", "coach", "manager", "admin"],
    section: "growth",
    sourceFolder: "02_Complete_Coaching_Program",
    storageKey: "coaching-form-goal-setting-worksheet",
    fields: [
      { key: "goal", label: "90-day goal", type: "textarea", rows: 2 },
      {
        key: "whyItMatters",
        label: "Why it matters",
        type: "textarea",
        rows: 2,
      },
      {
        key: "supportNeeded",
        label: "Support needed",
        type: "textarea",
        rows: 2,
      },
      {
        key: "weeklyCommitment",
        label: "Weekly commitment",
        type: "textarea",
        rows: 2,
      },
    ],
  },
  {
    id: "program-roadmap",
    title: "Program roadmap",
    description:
      "Keep the current program week, focus, and checkpoint visible in one place.",
    whoFor: "Members, coaches, managers, and admin.",
    audience: ["member", "coach", "manager", "admin"],
    section: "growth",
    sourceFolder: "02_Complete_Coaching_Program",
    storageKey: "coaching-form-program-roadmap",
    fields: [
      { key: "currentWeek", label: "Current week", type: "text" },
      {
        key: "weeklyFocus",
        label: "Weekly focus",
        type: "textarea",
        rows: 2,
      },
      {
        key: "milestone",
        label: "Milestone",
        type: "textarea",
        rows: 2,
      },
      {
        key: "nextCheckpoint",
        label: "Next checkpoint",
        type: "date",
      },
    ],
  },
  {
    id: "business-plan-roadmap",
    title: "Business plan roadmap",
    description:
      "Plan the next 12 weeks of growth, focus, and accountability.",
    whoFor: "Alliance members, coaches, managers, and admin.",
    audience: ["alliance", "coach", "manager", "admin"],
    section: "growth",
    sourceFolder: "02_Complete_Coaching_Program",
    storageKey: "coaching-form-business-plan-roadmap",
    fields: [
      { key: "weekOf", label: "Week of", type: "date" },
      {
        key: "businessGoal",
        label: "Business goal",
        type: "textarea",
        rows: 2,
      },
      {
        key: "leadGenFocus",
        label: "Lead generation focus",
        type: "textarea",
        rows: 2,
      },
      {
        key: "partnerGrowth",
        label: "Partner growth focus",
        type: "textarea",
        rows: 2,
      },
    ],
  },
  {
    id: "realtor-growth-system",
    title: "Realtor growth system",
    description:
      "Plan partner outreach, follow-up, and the meetings that move the relationship forward.",
    whoFor: "Alliance members, coaches, managers, and admin.",
    audience: ["alliance", "coach", "manager", "admin"],
    section: "growth",
    sourceFolder: "02_Complete_Coaching_Program",
    storageKey: "coaching-form-realtor-growth-system",
    fields: [
      {
        key: "topPartners",
        label: "Top partners",
        type: "textarea",
        rows: 2,
        placeholder: "List the people you want to grow with.",
      },
      {
        key: "newOutreach",
        label: "New outreach",
        type: "textarea",
        rows: 2,
      },
      {
        key: "meetingsBooked",
        label: "Meetings booked",
        type: "number",
      },
      {
        key: "followUpPlan",
        label: "Follow-up plan",
        type: "textarea",
        rows: 2,
      },
    ],
  },
  {
    id: "production-tracker",
    title: "Production tracker",
    description:
      "Track the inputs and outputs that keep production moving.",
    whoFor: "Alliance members, coaches, managers, and admin.",
    audience: ["alliance", "coach", "manager", "admin"],
    section: "growth",
    sourceFolder: "02_Complete_Coaching_Program",
    storageKey: "coaching-form-production-tracker",
    fields: [
      { key: "conversations", label: "Conversations", type: "number" },
      { key: "realtorTouches", label: "Realtor touches", type: "number" },
      { key: "pastClientTouches", label: "Past-client touches", type: "number" },
      { key: "pipelineFollowUp", label: "Pipeline follow-up", type: "number" },
      { key: "applications", label: "Applications", type: "number" },
      { key: "closings", label: "Closings", type: "number" },
    ],
  },
  {
    id: "member-accountability-tracker",
    title: "Member accountability tracker",
    description:
      "Track commitments, due dates, and the next coaching follow-up for each member.",
    whoFor: "Coaches, managers, and admin.",
    audience: ["coach", "manager", "admin"],
    section: "coach",
    sourceFolder: "02_Complete_Coaching_Program",
    sourceFileName: "Coaching_Session_Notes_Form_Spec.md",
    storageKey: "coaching-form-member-accountability-tracker",
    fields: [
      { key: "member", label: "Member", type: "text" },
      { key: "commitment", label: "Commitment", type: "textarea", rows: 2 },
      { key: "dueDate", label: "Due date", type: "date" },
      {
        key: "followUp",
        label: "Follow-up",
        type: "textarea",
        rows: 2,
      },
      { key: "status", label: "Status", type: "text" },
    ],
  },
  {
    id: "coach-review-worksheet",
    title: "Coach review worksheet",
    description:
      "A structured review sheet for scorecard trends, blockers, and the next coaching decision.",
    whoFor: "Coaches, managers, and admin.",
    audience: ["coach", "manager", "admin"],
    section: "coach",
    sourceFolder: "02_Complete_Coaching_Program",
    sourceFileName: "Team_Leader_Monthly_Scorecard_Form_Spec.md",
    storageKey: "coaching-form-coach-review-worksheet",
    fields: [
      { key: "member", label: "Member", type: "text" },
      { key: "trend", label: "Scorecard trend", type: "text" },
      { key: "win", label: "Win", type: "textarea", rows: 2 },
      { key: "stuckPoint", label: "Stuck point", type: "textarea", rows: 2 },
      {
        key: "nextAction",
        label: "Next action",
        type: "textarea",
        rows: 2,
      },
    ],
  },
];

export function getCoachingFormsForAudience(audience: {
  canLoMastery: boolean;
  canAlliance: boolean;
  isStaff: boolean;
}) {
  return coachingFormTemplates.filter((form) => {
    if (audience.isStaff) return true;
    if (form.audience.includes("alliance") && audience.canAlliance) return true;
    if (form.audience.includes("member") && audience.canLoMastery) return true;
    return false;
  });
}
