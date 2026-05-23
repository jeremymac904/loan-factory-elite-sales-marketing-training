export type PlatformStatus =
  | "Live foundation"
  | "Experience preview"
  | "Planned"
  | "Requires source content"
  | "Requires sandbox wiring"
  | "Requires human review";

export type PlatformModule = {
  id: string;
  title: string;
  shortTitle: string;
  href: string;
  status: PlatformStatus;
  summary: string;
  whoFor: string[];
  tools: string[];
  resources: string[];
  currentStatus: string;
  nextAction: string;
  connections: string[];
};

export type NavGroup = {
  label: string;
  href: string;
  items?: { label: string; href: string }[];
};

export const platformModules: PlatformModule[] = [
  {
    id: "apex-advisor",
    title: "Coaching",
    shortTitle: "Coaching",
    href: "/apex-advisor/",
    status: "Live foundation",
    summary:
      "The paid coaching platform for Loan Factory loan officers who want a stronger daily rhythm, accountability, resources, and scorecards through LO Mastery and Loan Factory Alliance.",
    whoFor: ["Producing LOs", "Coaching members", "Team leaders"],
    tools: [
      "Biweekly group coaching",
      "Power Hour Smile and Dial",
      "Member resource area",
      "Greatness Tracker",
      "Deal Flow Tracker",
      "Referral Partner Tracker",
      "Advisor Scorecard",
    ],
    resources: [
      "Past training recordings",
      "Scripts",
      "Documents and PDF handouts",
      "Favorite YouTube channel library",
      "Leaderboards",
    ],
    currentStatus:
      "Core coaching pages exist and are positioned as paid coaching, not the 101 to 601 training series.",
    nextAction:
      "Review coaching copy with Jeremy and marketing before any public or recruiting use.",
    connections: [
      "Coaching members can use Sales & Marketing training as a resource.",
      "AI Assistants can help prepare draft coaching materials.",
      "Wins and examples can be shared inside FaceGram.",
    ],
  },
  {
    id: "elite-sales-marketing",
    title: "Sales & Marketing",
    shortTitle: "Sales & Marketing",
    href: "/sales-training/",
    status: "Live foundation",
    summary:
      "The six-part 101 to 601 Sales & Marketing training series for conversations, conversion, referral partners, content, pipeline, and execution.",
    whoFor: ["New LOs", "Experienced LOs", "Team leaders", "Coaches"],
    tools: [
      "101 to 601 curriculum",
      "Scripts",
      "Roleplays",
      "Prompt library",
      "Weekly tracker",
    ],
    resources: [
      "101 Foundation",
      "201 Borrower Conversion",
      "301 Referral Partner Growth",
      "401 Content and Marketing",
      "501 Pipeline and Sales Systems",
      "601 Elite Execution",
    ],
    currentStatus:
      "Existing training routes remain live and are now surfaced as a parent module.",
    nextAction:
      "Add route aliases under /sales-training/[level] after Jeremy confirms the final URL pattern.",
    connections: [
      "Separate from paid coaching.",
      "Feeds the Training Library.",
      "Gives AI Assistants approved source material.",
    ],
  },
  {
    id: "ai-training",
    title: "AI Advantage",
    shortTitle: "AI Advantage",
    href: "/ai-training/",
    status: "Experience preview",
    summary:
      "A practical training path for using AI safely inside Loan Factory workflows, with Gemini Gem AI Twin guidance, prompt practice, and review habits.",
    whoFor: ["LOs", "Team leaders", "Coaches"],
    tools: [
      "AI usage playbook",
      "Prompt practice",
      "Draft review checklist",
      "Assistant selection guide",
    ],
    resources: [
      "Prompt Library",
      "AI Coaching Assistant walkthrough",
      "Content QA workflow",
    ],
    currentStatus:
      "Training page is organized around prompt practice, Gemini setup, NotebookLM, and content QA.",
    nextAction:
      "Confirm approved AI provider posture before any live assistant integration.",
    connections: [
      "Teaches how to use the AI Assistant Hub.",
      "Supports FaceGram content drafting.",
      "Routes risky content to Audience Quality Panel review.",
    ],
  },
  {
    id: "one-plus-one-five",
    title: "1+1+1=5",
    shortTitle: "1+1+1=5",
    href: "/one-plus-one-five/",
    status: "Requires source content",
    summary:
      "The team growth playbook for multiplying effort through partner strategy, recruiting support, co-branded content planning, and team cadence.",
    whoFor: ["Team leaders", "Producing LOs", "LO Development"],
    tools: [
      "Campaign kits",
      "Recruiting kits",
      "Referral partner plays",
      "Team growth scorecard concepts",
    ],
    resources: [
      "Content kit planning",
      "Recruiting review queue",
      "Team Leader OS",
    ],
    currentStatus:
      "The page organizes growth plays that need source content and Victoria review before broader use.",
    nextAction:
      "Jeremy and Andre confirm source materials and Victoria review gates before content depth is added.",
    connections: [
      "Connects to Team Leader OS.",
      "Uses LO Support Assistant and Marketing Support Assistant drafts.",
      "Can promote approved internal examples from FaceGram.",
    ],
  },
  {
    id: "training-library",
    title: "Training Library",
    shortTitle: "Training Library",
    href: "/training-library/",
    status: "Live foundation",
    summary:
      "The searchable home for scripts, roleplays, audio training, recordings, prompts, handouts, trackers, and approved internal resources.",
    whoFor: ["All LOs", "Team leaders", "Coaches", "Marketing reviewers"],
    tools: [
      "Resource catalog",
      "Audio training links",
      "Script library",
      "Roleplay library",
      "Tracker templates",
    ],
    resources: [
      "Audio Training",
      "Scripts",
      "Roleplays",
      "Prompts",
      "Recordings",
      "Tracker",
    ],
    currentStatus:
      "Existing resource routes are live; this sprint adds a unified library front door.",
    nextAction:
      "Move large media delivery to Drive or another approved asset system before production hardening.",
    connections: [
      "Stores approved resources from every module.",
      "Receives promoted FaceGram posts after review.",
      "Feeds AI Assistant source material.",
    ],
  },
  {
    id: "creator-network",
    title: "FaceGram",
    shortTitle: "FaceGram",
    href: "/facegram/",
    status: "Experience preview",
    summary:
      "An employee-only internal community feed where LOs, AEs, approved vendors, coaches, and internal teams share ideas, questions, examples, wins, and feedback.",
    whoFor: [
      "Loan Factory employees",
      "LOs",
      "AEs",
      "Approved vendors",
      "Team leaders",
      "Coaches",
      "Marketing reviewers",
    ],
    tools: [
      "Internal feed",
      "Daily posts",
      "Questions and feedback requests",
      "Groups by state",
      "Groups by language",
      "New loan officer groups",
      "Topic groups",
    ],
    resources: [
      "FaceGram plan",
      "Access model",
      "Moderation rules",
      "Audience Quality Panel",
    ],
    currentStatus:
      "Internal community experience is visible with feed, groups, trends, and AI Assistant entry point.",
    nextAction:
      "Confirm internal rollout scope and moderation ownership before backend work.",
    connections: [
      "Promotes top internal examples into the Training Library.",
      "Uses Marketing Support Assistant and Audience Quality Panel for draft review.",
      "Supports coaching and peer learning across teams.",
    ],
  },
  {
    id: "ai-assistants",
    title: "AI Assistants",
    shortTitle: "AI Assistants",
    href: "/ai-assistants/",
    status: "Experience preview",
    summary:
      "The internal assistant hub for sales coaching, marketing, scenario structuring, TERA workflow guidance, and content review drafts.",
    whoFor: ["LOs", "Team leaders", "Coaches", "Admins", "Marketing reviewers"],
    tools: [
      "Assistant catalog",
      "Draft review labels",
      "Guardrail summaries",
      "Audience Quality Panel handoff",
    ],
    resources: [
      "AI Assistant Hub plan",
      "Prompt library",
      "Compliance notes",
      "Content QA workflow",
    ],
    currentStatus:
      "Local assistant interface is available with assistant switching, chat messages, source previews, attachments, and voice fallback.",
    nextAction:
      "Confirm provider governance, source grounding, and review queues before live model wiring.",
    connections: [
      "Supports every module.",
      "Routes content to human review.",
      "Uses Audience Quality Panel as a QA layer later.",
    ],
  },
  {
    id: "audience-quality-panel",
    title: "Audience Quality Panel",
    shortTitle: "Audience Quality Panel",
    href: "/audience-quality-panel/",
    status: "Experience preview",
    summary:
      "An internal QA concept for scoring draft content through simulated Borrower, Referral Partner, Compliance/Risk, Marketing Performance, and LO Peer panels.",
    whoFor: ["LOs", "Marketing reviewers", "Team leaders", "Coaches"],
    tools: [
      "Five-panel review model",
      "0 to 100 scoring",
      "Risk flag display",
      "Rewrite recommendation model",
      "Approval status labels",
    ],
    resources: [
      "Audience Quality Panel plan",
      "AI panel scoring rubric",
      "Market response personas",
      "Content QA workflow",
    ],
    currentStatus:
      "Audience review model is visible for content quality, audience reaction, and human review preparation.",
    nextAction:
      "Confirm panel routing, review visibility, and human approval gates before implementation.",
    connections: [
      "Can review FaceGram drafts.",
      "Can pre-check Marketing Support Assistant outputs.",
      "Can support Victoria and compliance reviewers without replacing them.",
    ],
  },
  {
    id: "calendar",
    title: "Calendar",
    shortTitle: "Calendar",
    href: "/calendar/",
    status: "Planned",
    summary:
      "A unified view of training sessions, coaching blocks, LO Mastery events, Power Hour, Breakfast Club, review windows, and launch milestones.",
    whoFor: ["LOs", "Team leaders", "Coaches", "LO Development"],
    tools: [
      "Event type map",
      "Schedule views",
      "Review cadence reminders",
      "Coaching event links",
    ],
    resources: ["Coaching Calendar", "Training Path", "Team Leader Guide"],
    currentStatus:
      "Calendar page organizes coaching and training cadence for planning.",
    nextAction:
      "Confirm canonical calendar source and sandbox test policy before any calendar integration.",
    connections: [
      "Surfaces coaching events.",
      "Supports Friday tracker review.",
      "Connects team leader cadences to training modules.",
    ],
  },
  {
    id: "trackers",
    title: "Trackers",
    shortTitle: "Trackers",
    href: "/trackers/",
    status: "Live foundation",
    summary:
      "A tracker hub for weekly activity, pipeline, production rhythm, recruiting support, training completion, and coaching follow-up.",
    whoFor: ["LOs", "Team leaders", "Coaches", "Leadership"],
    tools: [
      "Weekly activity tracker",
      "Pipeline tracker concept",
      "Training completion tracker concept",
      "Recruiting tracker concept",
    ],
    resources: ["Weekly Tracker", "Team Leader Guide", "Coach Guide"],
    currentStatus:
      "Weekly tracker exists and additional tracker categories are organized for source-field review.",
    nextAction:
      "Confirm tracker fields and data source before adding persistence or imports.",
    connections: [
      "Feeds Team Leader OS.",
      "Supports Coach Hub review.",
      "Gives AI Assistants safe structured context later.",
    ],
  },
  {
    id: "resources",
    title: "Resources",
    shortTitle: "Resources",
    href: "/resources/",
    status: "Live foundation",
    summary:
      "A quick-access hub for recommended channels, compliance notes, recordings, support contacts, and LO Development feedback.",
    whoFor: ["All platform users"],
    tools: [
      "Recommended channels",
      "Compliance notes",
      "Recordings",
      "Support contacts",
      "Anonymous feedback",
    ],
    resources: [
      "Recommended Channels",
      "Compliance Notes",
      "Recordings",
      "LO Development Support Team",
      "Anonymous Complaints and Suggestions",
    ],
    currentStatus:
      "Resources are organized around the support paths LOs need most often.",
    nextAction:
      "Confirm the preferred anonymous feedback channel before wiring anything beyond the local form.",
    connections: [
      "Supports all modules.",
      "Links brand and compliance references.",
      "Keeps non-curriculum resources discoverable.",
    ],
  },
  {
    id: "support-routing",
    title: "Support Routing",
    shortTitle: "Support Routing",
    href: "/support-routing/",
    status: "Requires human review",
    summary:
      "A simple contact guide for LO Development, coaching, marketing review, platform suggestions, and anonymous feedback.",
    whoFor: ["LOs", "LO Development", "Team leaders", "Coaches", "Admins"],
    tools: [
      "LO Development contacts",
      "Corporate coach contacts",
      "Marketing review contacts",
      "Suggestion and feedback paths",
    ],
    resources: ["LO Development Support Team", "Corporate Coaches", "Marketing Review"],
    currentStatus:
      "Support routing points users toward the right internal owner or resource.",
    nextAction:
      "Andre and LO Development confirm final ownership for any future submitted feedback flow.",
    connections: [
      "Routes sensitive assistant outputs to people.",
      "Connects LOs to training and coaching paths.",
      "Keeps TERA and production issues directed to the proper human owner.",
    ],
  },
];

export const platformNav: NavGroup[] = [
  { label: "Home", href: "/" },
  {
    label: "Coaching",
    href: "/apex-advisor/",
    items: [
      { label: "Overview", href: "/apex-advisor/" },
      { label: "Sales & Marketing Track", href: "/apex-advisor-track/" },
      { label: "Alliance Membership", href: "/apex-advisor-pro/" },
      { label: "Certifications", href: "/apex-certifications/" },
      { label: "Coaching Calendar", href: "/apex-calendar/" },
      { label: "Member Area", href: "/apex-member-area/" },
    ],
  },
  {
    label: "Sales & Marketing",
    href: "/sales-training/",
    items: [
      { label: "Training Overview", href: "/sales-training/" },
      { label: "101 Foundation", href: "/101-foundation/" },
      { label: "201 Borrower Conversion", href: "/201-borrower-conversion/" },
      {
        label: "301 Referral Partner Growth",
        href: "/301-referral-partner-growth/",
      },
      {
        label: "401 Content and Marketing",
        href: "/401-content-and-marketing/",
      },
      {
        label: "501 Pipeline and Sales Systems",
        href: "/501-pipeline-and-sales-systems/",
      },
      { label: "601 Elite Execution", href: "/601-elite-execution/" },
    ],
  },
  { label: "AI Training", href: "/ai-training/" },
  { label: "1+1+1=5", href: "/one-plus-one-five/" },
  {
    label: "Training Library",
    href: "/training-library/",
    items: [
      { label: "Library Overview", href: "/training-library/" },
      { label: "Audio Training", href: "/audio-training/" },
      { label: "Scripts", href: "/scripts/" },
      { label: "Roleplays", href: "/roleplays/" },
      { label: "Prompts", href: "/prompts/" },
      { label: "Recordings", href: "/recordings/" },
      { label: "Tracker", href: "/tracker/" },
    ],
  },
  {
    label: "FaceGram",
    href: "/facegram/",
    items: [
      { label: "FaceGram", href: "/facegram/" },
      { label: "Audience Quality Panel", href: "/audience-quality-panel/" },
    ],
  },
  { label: "AI Assistants", href: "/ai-assistants/" },
  { label: "Calendar", href: "/calendar/" },
  { label: "Trackers", href: "/trackers/" },
  { label: "Resources", href: "/resources/" },
  { label: "Support Routing", href: "/support-routing/" },
];

export const aiAssistants = [
  "LO Support Assistant",
  "Marketing Support Assistant",
  "LO Development Helper",
].map((name) => ({
  name,
  label: "Draft only. Review before external use.",
}));

export const audiencePanels = [
  "Borrower / Consumer Panel",
  "Referral Partner Panel",
  "Compliance/Risk Panel",
  "Marketing Performance Panel",
  "LO Peer Panel",
].map((name) => ({
  name,
  output: [
    "Score 0-100",
    "Audience reaction",
    "What works",
    "What does not work",
    "Risk flags",
    "Rewrite recommendation",
    "Approval status",
  ],
}));

export function getPlatformModule(id: string): PlatformModule {
  const platformModule = platformModules.find((item) => item.id === id);
  if (!platformModule) {
    throw new Error(`Missing platform module: ${id}`);
  }

  return platformModule;
}
