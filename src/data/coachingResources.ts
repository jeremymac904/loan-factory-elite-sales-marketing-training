export type CoachingResourceAudience = "lo_mastery" | "alliance" | "coach";

export type CoachingResourceItem = {
  id: string;
  title: string;
  description: string;
  whoFor: string;
  openHref: string;
  sourceFolder: "01_Thuan_Slide_Deck" | "02_Complete_Coaching_Program";
  sourceFileName?: string;
  tags: string[];
};

export type CoachingResourceCategory = {
  id:
    | "lo-mastery"
    | "alliance"
    | "coach-tools"
    | "scripts"
    | "trackers"
    | "business-planning"
    | "realtor-growth"
    | "presentation-materials";
  title: string;
  description: string;
  whoFor: string;
  openHref: string;
  accessTier: CoachingResourceAudience;
  sourceFolder: "01_Thuan_Slide_Deck" | "02_Complete_Coaching_Program";
  items: CoachingResourceItem[];
};

export const coachingResourceCategories: CoachingResourceCategory[] = [
  {
    id: "lo-mastery",
    title: "LO Mastery",
    description:
      "The foundational paid coaching pack for the $249 program: weekly rhythm, member tools, and the core coaching path.",
    whoFor: "LO Mastery members, coaches, and coaching managers.",
    openHref: "/lo-mastery-coaching/",
    accessTier: "lo_mastery",
    sourceFolder: "02_Complete_Coaching_Program",
    items: [
      {
        id: "lo-mastery-overview",
        title: "LO Mastery overview",
        description:
          "A clean program overview for the paid coaching landing page and member dashboards.",
        whoFor: "LO Mastery members and approved coaches.",
        openHref: "/lo-mastery-coaching/",
        sourceFolder: "02_Complete_Coaching_Program",
        sourceFileName: "Loan_Factory_Coaching_Member_Welcome_Guide.pdf",
        tags: ["overview", "member"],
      },
      {
        id: "lo-mastery-dashboard",
        title: "LO Mastery member dashboard",
        description:
          "The native member view for the $249 tier with scorecards, trackers, resources, and weekly action items.",
        whoFor: "LO Mastery members.",
        openHref: "/member-area/lo-mastery/",
        sourceFolder: "02_Complete_Coaching_Program",
        tags: ["dashboard", "member"],
      },
      {
        id: "weekly-scorecard",
        title: "Weekly scorecard",
        description:
          "The native scorecard used to submit weekly activity, commitments, and follow-up decisions.",
        whoFor: "LO Mastery members and coaching review.",
        openHref: "/member-area/scorecards/",
        sourceFolder: "02_Complete_Coaching_Program",
        sourceFileName: "LO_Weekly_Activity_Tracker_Form_Spec.md",
        tags: ["scorecard", "tracker"],
      },
      {
        id: "daily-time-blocker",
        title: "Daily time blocker",
        description:
          "Protect a focused block for conversations, follow-up, and the work that drives the week. Lives in the Today page.",
        whoFor: "LO Mastery members and coaches.",
        openHref: "/member-area/today/",
        sourceFolder: "02_Complete_Coaching_Program",
        tags: ["tracker", "planning"],
      },
      {
        id: "greatness-tracker",
        title: "Greatness tracker",
        description:
          "A simple native tracker for consistency, wins, and the smallest actions that move the week forward.",
        whoFor: "LO Mastery members and coaches.",
        openHref: "/member-area/resources/?tab=tools",
        sourceFolder: "02_Complete_Coaching_Program",
        tags: ["tracker", "accountability"],
      },
    ],
  },
  {
    id: "alliance",
    title: "Loan Factory Alliance",
    description:
      "The advanced paid coaching pack for the $449 program: deeper accountability, stronger planning, and growth systems.",
    whoFor: "Loan Factory Alliance members, coaches, and coaching managers.",
    openHref: "/loan-factory-alliance/",
    accessTier: "alliance",
    sourceFolder: "02_Complete_Coaching_Program",
    items: [
      {
        id: "alliance-overview",
        title: "Loan Factory Alliance overview",
        description:
          "A clean overview of the advanced paid coaching program and the higher-accountability rhythm.",
        whoFor: "Alliance members and approved coaches.",
        openHref: "/loan-factory-alliance/",
        sourceFolder: "02_Complete_Coaching_Program",
        tags: ["overview", "member"],
      },
      {
        id: "alliance-dashboard",
        title: "Alliance member dashboard",
        description:
          "The native member view for the $449 tier with advanced weekly action items, resources, and progress.",
        whoFor: "Alliance members.",
        openHref: "/member-area/alliance/",
        sourceFolder: "02_Complete_Coaching_Program",
        tags: ["dashboard", "member"],
      },
      {
        id: "business-plan-roadmap",
        title: "Business plan roadmap",
        description:
          "A simple roadmap for the next 12 weeks of growth, focus, and accountability.",
        whoFor: "Alliance members and coaching managers.",
        openHref: "/member-area/resources/?tab=tools",
        sourceFolder: "02_Complete_Coaching_Program",
        tags: ["planning", "roadmap"],
      },
      {
        id: "realtor-growth-system",
        title: "Realtor growth system",
        description:
          "Native planning for partner growth, outreach cadence, follow-up, and next meetings.",
        whoFor: "Alliance members and coaching managers.",
        openHref: "/member-area/resources/?tab=tools",
        sourceFolder: "02_Complete_Coaching_Program",
        tags: ["growth", "partners"],
      },
      {
        id: "production-tracker",
        title: "Production tracker",
        description:
          "A native tracker for conversations, pipeline movement, and the actions that feed production.",
        whoFor: "Alliance members and coaches.",
        openHref: "/member-area/resources/?tab=tools",
        sourceFolder: "02_Complete_Coaching_Program",
        tags: ["tracker", "production"],
      },
    ],
  },
  {
    id: "coach-tools",
    title: "Coach Tools",
    description:
      "Coach-only documents, review tools, and playbook material for running the weekly coaching rhythm.",
    whoFor: "Coaches, coaching managers, and admin.",
    openHref: "/coach-command-center/",
    accessTier: "coach",
    sourceFolder: "02_Complete_Coaching_Program",
    items: [
      {
        id: "coach-playbook",
        title: "Coach playbook",
        description:
          "The coaching operating guide for call structure, review rhythm, and follow-up standards.",
        whoFor: "Coaches and coaching managers.",
        openHref: "/coach-command-center/",
        sourceFolder: "02_Complete_Coaching_Program",
        sourceFileName: "Loan_Factory_Coach_Playbook.pdf",
        tags: ["playbook", "coach"],
      },
      {
        id: "coach-notes",
        title: "Coach notes",
        description:
          "The native note workflow used to capture wins, blockers, actions, and follow-up dates.",
        whoFor: "Coaches and coaching managers.",
        openHref: "/coach-command-center/coaching-notes/",
        sourceFolder: "02_Complete_Coaching_Program",
        sourceFileName: "Coaching_Session_Notes_Form_Spec.md",
        tags: ["notes", "workflow"],
      },
      {
        id: "coach-review-worksheet",
        title: "Coach review worksheet",
        description:
          "A structured review sheet for member progress, scorecard trends, blockers, and next actions.",
        whoFor: "Coaches, coaching managers, and admin.",
        openHref: "/member-area/resources/?tab=tools",
        sourceFolder: "02_Complete_Coaching_Program",
        tags: ["review", "worksheet"],
      },
      {
        id: "member-accountability-tracker",
        title: "Member accountability tracker",
        description:
          "Track commitments, due dates, follow-ups, and who owns the next step for each member.",
        whoFor: "Coaches and coaching managers.",
        openHref: "/member-area/resources/?tab=tools",
        sourceFolder: "02_Complete_Coaching_Program",
        tags: ["accountability", "tracker"],
      },
      {
        id: "call-schedule",
        title: "Weekly call prep",
        description:
          "Draft call structure and meeting preparation for the week ahead.",
        whoFor: "Coaches and coaching managers.",
        openHref: "/coach-command-center/calendar/",
        sourceFolder: "02_Complete_Coaching_Program",
        tags: ["calendar", "prep"],
      },
    ],
  },
  {
    id: "scripts",
    title: "Scripts",
    description:
      "Coaching-first scripts for member accountability, follow-up, and the weekly rhythm.",
    whoFor: "Members, coaches, coaching managers, and admin.",
    openHref: "/member-area/resources/?tab=scripts",
    accessTier: "lo_mastery",
    sourceFolder: "02_Complete_Coaching_Program",
    items: [
      {
        id: "script-library",
        title: "Script library",
        description:
          "A coaching-only script library for weekly rhythm, accountability, and next-step conversations.",
        whoFor: "Members and coaches.",
        openHref: "/member-area/resources/?tab=scripts",
        sourceFolder: "02_Complete_Coaching_Program",
        tags: ["scripts", "library"],
      },
      {
        id: "scorecard-reminder",
        title: "Weekly scorecard reminder",
        description:
          "A clean reminder to submit the weekly scorecard before the next coaching review.",
        whoFor: "LO Mastery and Alliance members.",
        openHref: "/member-area/resources/?tab=scripts",
        sourceFolder: "02_Complete_Coaching_Program",
        tags: ["scorecard", "follow-up"],
      },
      {
        id: "coach-follow-up",
        title: "Coach follow-up script",
        description:
          "A short follow-up prompt for coaching calls, action items, and the next check-in.",
        whoFor: "Coaches and coaching managers.",
        openHref: "/member-area/resources/?tab=scripts",
        sourceFolder: "02_Complete_Coaching_Program",
        tags: ["follow-up", "coach"],
      },
      {
        id: "accountability-check-in",
        title: "Accountability check-in",
        description:
          "A simple prompt for keeping the week narrow, honest, and focused on one next action.",
        whoFor: "Members and coaches.",
        openHref: "/member-area/resources/?tab=scripts",
        sourceFolder: "02_Complete_Coaching_Program",
        tags: ["accountability", "check-in"],
      },
    ],
  },
  {
    id: "trackers",
    title: "Trackers",
    description:
      "Native tracker and form tools for planning, weekly rhythm, scorecards, and accountability.",
    whoFor: "Members, coaches, coaching managers, and admin.",
    openHref: "/member-area/resources/?tab=tools",
    accessTier: "lo_mastery",
    sourceFolder: "02_Complete_Coaching_Program",
    items: [
      {
        id: "trackers-center",
        title: "Trackers and forms center",
        description:
          "The native draft-only workspace for the coaching forms and trackers.",
        whoFor: "Members and coaches.",
        openHref: "/member-area/resources/?tab=tools",
        sourceFolder: "02_Complete_Coaching_Program",
        tags: ["forms", "tracker"],
      },
      {
        id: "theme-days-planner",
        title: "Theme days planner",
        description:
          "Plan the focus for each day so the week stays narrow, repeatable, and easy to execute.",
        whoFor: "Members and coaches.",
        openHref: "/member-area/resources/?tab=tools",
        sourceFolder: "02_Complete_Coaching_Program",
        tags: ["planner", "focus"],
      },
      {
        id: "weekly-action-plan",
        title: "Weekly action plan",
        description:
          "Three priorities, daily actions, and the follow-through that keeps the week moving.",
        whoFor: "Members and coaches.",
        openHref: "/member-area/resources/?tab=tools",
        sourceFolder: "02_Complete_Coaching_Program",
        tags: ["plan", "weekly"],
      },
      {
        id: "goal-setting-worksheet",
        title: "Goal setting worksheet",
        description:
          "A simple worksheet for 90-day goals, weekly commitments, and support needed.",
        whoFor: "Members and coaches.",
        openHref: "/member-area/resources/?tab=tools",
        sourceFolder: "02_Complete_Coaching_Program",
        tags: ["goal", "worksheet"],
      },
      {
        id: "program-roadmap",
        title: "Program roadmap",
        description:
          "The week-by-week roadmap for the current program focus and expected outcomes.",
        whoFor: "Members, coaches, and coaching managers.",
        openHref: "/member-area/resources/?tab=tools",
        sourceFolder: "02_Complete_Coaching_Program",
        tags: ["roadmap", "program"],
      },
    ],
  },
  {
    id: "business-planning",
    title: "Business Planning",
    description:
      "The interactive business planner — income goal, transaction goal, conversion assumptions, and your monthly and weekly activity breakdown.",
    whoFor: "Alliance members, coaches, coaching managers, and admin.",
    openHref: "/member-area/resources/?tab=planning",
    accessTier: "alliance",
    sourceFolder: "02_Complete_Coaching_Program",
    items: [
      {
        id: "business-plan-roadmap",
        title: "Business plan roadmap",
        description:
          "Set your income goal and the planner works backward to the weekly numbers that get you there.",
        whoFor: "Alliance members and coaches.",
        openHref: "/member-area/resources/?tab=planning",
        sourceFolder: "02_Complete_Coaching_Program",
        tags: ["roadmap", "business"],
      },
      {
        id: "quarterly-business-review",
        title: "Quarterly business review",
        description:
          "A structured look at progress, patterns, and what to adjust next.",
        whoFor: "Alliance members, coaches, and coaching managers.",
        openHref: "/member-area/resources/?tab=planning",
        sourceFolder: "02_Complete_Coaching_Program",
        tags: ["review", "quarterly"],
      },
      {
        id: "program-plan",
        title: "Program plan",
        description:
          "A clean summary of the current program week, focus, and next checkpoint.",
        whoFor: "Alliance members and coaches.",
        openHref: "/member-area/resources/?tab=planning",
        sourceFolder: "02_Complete_Coaching_Program",
        tags: ["program", "plan"],
      },
    ],
  },
  {
    id: "realtor-growth",
    title: "Realtor Growth",
    description:
      "Scripts, planning, and follow-up tools for growing Realtor relationships the coaching way.",
    whoFor: "Alliance members, coaches, coaching managers, and admin.",
    openHref: "/member-area/resources/?tab=tools",
    accessTier: "alliance",
    sourceFolder: "02_Complete_Coaching_Program",
    items: [
      {
        id: "realtor-growth-system",
        title: "Realtor growth system",
        description:
          "Plan the outreach cadence, follow-up rhythm, and meeting goals that drive partner growth.",
        whoFor: "Alliance members and coaches.",
        openHref: "/member-area/resources/?tab=tools",
        sourceFolder: "02_Complete_Coaching_Program",
        tags: ["realtor", "growth"],
      },
      {
        id: "realtor-outreach-scripts",
        title: "Realtor outreach scripts",
        description:
          "Simple outreach language for starting conversations and setting the next meeting.",
        whoFor: "Alliance members and coaches.",
        openHref: "/member-area/resources/?tab=scripts",
        sourceFolder: "02_Complete_Coaching_Program",
        tags: ["scripts", "realtor"],
      },
      {
        id: "partner-follow-up",
        title: "Partner follow-up plan",
        description:
          "Keep partner conversations moving with a clean follow-up plan and a next action.",
        whoFor: "Alliance members, coaches, and coaching managers.",
        openHref: "/member-area/resources/?tab=tools",
        sourceFolder: "02_Complete_Coaching_Program",
        tags: ["follow-up", "partners"],
      },
    ],
  },
  {
    id: "presentation-materials",
    title: "Presentation Materials",
    description:
      "Launch, alignment, and coaching presentation materials sourced from the final coaching package.",
    whoFor: "Coaches, coaching managers, and admin.",
    openHref: "/coach-command-center/resources/",
    accessTier: "coach",
    sourceFolder: "01_Thuan_Slide_Deck",
    items: [
      {
        id: "slide-deck",
        title: "Thuan slide deck",
        description:
          "The source presentation deck used to align the paid coaching platform launch.",
        whoFor: "Coaching managers and admin.",
        openHref: "/coach-command-center/resources/",
        sourceFolder: "01_Thuan_Slide_Deck",
        sourceFileName: "Thuan_Slide_Deck",
        tags: ["presentation", "launch"],
      },
      {
        id: "executive-memo",
        title: "Executive memo",
        description:
          "A concise executive summary of the coaching platform and the launch direction.",
        whoFor: "Coaching managers and admin.",
        openHref: "/coach-command-center/resources/",
        sourceFolder: "02_Complete_Coaching_Program",
        sourceFileName: "Loan_Factory_Coaching_Platform_Executive_Memo.pdf",
        tags: ["memo", "executive"],
      },
      {
        id: "pilot-launch-packet",
        title: "Pilot launch packet",
        description:
          "The launch packet that keeps the paid coaching rollout structured and simple.",
        whoFor: "Coaches, coaching managers, and admin.",
        openHref: "/coach-command-center/resources/",
        sourceFolder: "02_Complete_Coaching_Program",
        sourceFileName: "Loan_Factory_Coaching_Platform_Pilot_Launch_Packet.pdf",
        tags: ["launch", "packet"],
      },
    ],
  },
];

export function getCoachingResourceCategory(
  id: CoachingResourceCategory["id"],
): CoachingResourceCategory | null {
  return coachingResourceCategories.find((category) => category.id === id) ?? null;
}

export function canViewCoachingResourceCategory(
  category: CoachingResourceCategory,
  access: {
    canLoMastery: boolean;
    canAlliance: boolean;
    isStaff: boolean;
  },
): boolean {
  if (access.isStaff) return true;
  if (category.accessTier === "coach") return false;
  if (category.accessTier === "alliance") return access.canAlliance;
  return access.canLoMastery;
}

export function buildResourcePackMarkdown(
  category: CoachingResourceCategory,
): string {
  const lines = [
    `# ${category.title} Pack`,
    "",
    category.description,
    "",
    `Who it's for: ${category.whoFor}`,
    `Source folder: ${category.sourceFolder}`,
    "",
    "## Included items",
    ...category.items.map((item) => {
      const fileLabel = item.sourceFileName ? `Source file: ${item.sourceFileName}` : "Source file: native platform tool";
      return [
        `- ${item.title}`,
        `  - ${item.description}`,
        `  - ${fileLabel}`,
        `  - Open: ${item.openHref}`,
      ].join("\n");
    }),
    "",
    "This pack is generated from the paid coaching platform catalog. It is a readable manifest, not the original Drive file bundle.",
    "",
  ];

  return lines.join("\n");
}
