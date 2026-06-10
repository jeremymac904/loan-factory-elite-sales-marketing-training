export type CardItem = {
  title: string;
  body: string;
  href?: string;
  meta?: string;
};

export type ProgramKey = "mastery" | "alliance";

export type RoutePage = {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  cards: CardItem[];
  sidebarTitle?: string;
  sidebarItems?: string[];
};

export type ProgramWeek = {
  week: number;
  theme: string;
  number: string;
  phase: string;
  actions: string[];
  win: string;
};

export type DownloadResource = {
  title: string;
  description: string;
  category: "Curriculum" | "Scripts" | "Trackers" | "Playbooks" | "Coach Tools";
  audience: "Member" | "Coach" | "Manager" | "All";
  programs?: Array<ProgramKey | "shared">;
  pdf?: string;
  docx?: string;
};

export type ScriptResource = {
  title: string;
  category: string;
  programs?: Array<ProgramKey | "shared">;
  useWhen: string;
  goal: string;
  script: string[];
  practicePrompt?: string;
  coachNote?: string;
};

export type PlaybookResource = {
  title: string;
  category: string;
  programs: Array<ProgramKey | "shared">;
  purpose: string;
  steps: string[];
  practicePrompt: string;
  resourceTitle?: string;
};

export type TrackerDefinition = {
  slug: string;
  title: string;
  description: string;
  columns: string[];
  rows: string[][];
  programs?: Array<ProgramKey | "shared">;
};

export type ScorecardMetric = {
  metric: string;
  goal: number;
  values: [number, number, number, number, number];
};

export type CommunityPost = {
  author: string;
  role: string;
  category: string;
  title: string;
  body: string;
  comments: string[];
  pinned?: boolean;
};

export const driveFolderUrl =
  "https://drive.google.com/drive/folders/1U-gNdeD9of90kkwsuzzzcqYH2rmVrR0j?usp=drive_link";

export const programs = [
  {
    name: "LO Mastery",
    href: "/lo-mastery-coaching/",
    price: "$249",
    rhythm: "Biweekly group coaching with daily execution support.",
    bestFor:
      "Loan officers who need structure, follow-up rhythm, scripts, trackers, and weekly accountability.",
    includes: [
      "Weekly execution plan",
      "Daily time blocking",
      "Theme days",
      "Script books",
      "Scorecards",
      "Trackers",
      "Member resources",
      "Community",
    ],
  },
  {
    name: "Loan Factory Alliance",
    href: "/loan-factory-alliance/",
    price: "$449",
    rhythm: "Advanced coaching rhythm with tighter accountability.",
    bestFor:
      "Loan officers ready for deeper review, stronger weekly planning, partner development, and business operating systems.",
    includes: [
      "Everything in LO Mastery",
      "Weekly coaching",
      "Advanced planning",
      "Partner strategy",
      "Priority review",
      "Leadership rhythm",
      "Execution scorecards",
      "Community",
    ],
  },
];

export const platformFeatures: CardItem[] = [
  {
    title: "Weekly coaching",
    body: "Clear calls, practical coaching notes, and one next step for the week.",
    href: "/member-area/calendar/",
  },
  {
    title: "Daily execution",
    body: "Time blocks, theme days, and simple habits that make the week visible.",
    href: "/member-area/trackers/",
  },
  {
    title: "Scorecards",
    body: "A lightweight view of activity, follow-up, partner work, and consistency.",
    href: "/member-area/scorecards/",
  },
  {
    title: "Trackers",
    body: "Pipeline, Realtor relationships, follow-up, and daily action in one place.",
    href: "/member-area/trackers/",
  },
  {
    title: "Script books",
    body: "Plain-language scripts for first calls, follow-up, buyer conversations, and partner outreach.",
    href: "/member-area/resources/",
  },
  {
    title: "Community",
    body: "A focused member area for wins, questions, coaching prompts, and accountability.",
    href: "/member-area/community/",
  },
];

export const memberNav: CardItem[] = [
  {
    title: "Dashboard",
    body: "Today focus, current week, next action, coach note, and weekly goal.",
    href: "/member-area/",
  },
  {
    title: "Scorecard",
    body: "Program-specific weekly accountability scorecard.",
    href: "/member-area/scorecards/",
  },
  {
    title: "Trackers",
    body: "Daily execution, deal flow, Realtor relationships, and follow-up trackers.",
    href: "/member-area/trackers/",
  },
  {
    title: "Scripts",
    body: "Realtor, buyer, follow-up, objection, past client, and referral scripts.",
    href: "/member-area/scripts/",
  },
  {
    title: "Playbooks",
    body: "Time blocking, theme days, Realtor growth, buyer consult, and follow-up systems.",
    href: "/member-area/playbooks/",
  },
  {
    title: "Classroom",
    body: "Program lessons, assignments, resources, and progress.",
    href: "/member-area/classroom/",
  },
  {
    title: "Community",
    body: "Member discussion, wins, questions, and coaching prompts.",
    href: "/member-area/community/",
  },
  {
    title: "Calendar",
    body: "Coaching calls, office hours, review sessions, and weekly planning.",
    href: "/member-area/calendar/",
  },
  {
    title: "Resources",
    body: "Program-filtered Drive downloads and source folder links.",
    href: "/member-area/resources/",
  },
  {
    title: "Profile",
    body: "Member profile, program view, goals, and review settings.",
    href: "/member-area/profile/",
  },
];

export const masteryWeeks: ProgramWeek[] = [
  {
    week: 1,
    theme: "Foundation & Commitment",
    number: "Time blocks honored",
    phase: "Foundation",
    actions: [
      "Set the 12-week goal and the daily number.",
      "Place the non-negotiable work block on the calendar.",
      "Complete the onboarding business plan.",
    ],
    win: "Goal set, plan written, calendar blocked.",
  },
  {
    week: 2,
    theme: "Own Your Time",
    number: "Daily blocks completed",
    phase: "Foundation",
    actions: [
      "Run the theme day every weekday.",
      "Protect the income-producing block before noon.",
      "Remove one recurring distraction from the morning.",
    ],
    win: "Five protected blocks completed.",
  },
  {
    week: 3,
    theme: "Own Your Database",
    number: "Database contacts loaded",
    phase: "Activity",
    actions: [
      "Load 100+ contacts into the CRM.",
      "Tag the top 25 relationship contacts.",
      "Make daily sphere calls using the check-in script.",
    ],
    win: "Database built and first calls made.",
  },
  {
    week: 4,
    theme: "Conversations That Convert",
    number: "Real conversations had",
    phase: "Activity",
    actions: [
      "Use FORD to open real conversations.",
      "Capture one useful detail after every conversation.",
      "Complete the first coach review checkpoint.",
    ],
    win: "Conversation target hit and plan adjusted.",
  },
  {
    week: 5,
    theme: "The Buyer Consultation",
    number: "Pre-approval appointments held",
    phase: "Conversion",
    actions: [
      "Run discovery before quoting or advising.",
      "Ask for payment, cash-to-close, timeline, and ownership goals.",
      "Set a clean next step after each consult.",
    ],
    win: "Consults held using the full framework.",
  },
  {
    week: 6,
    theme: "Objection Mastery",
    number: "Role-plays completed",
    phase: "Conversion",
    actions: [
      "Drill three objections per day.",
      "Use acknowledge, curiosity, reframe, move forward.",
      "Log objections heard in live conversations.",
    ],
    win: "Weakest objections drilled to reflex.",
  },
  {
    week: 7,
    theme: "Realtor Partner Outreach",
    number: "New agent contacts made",
    phase: "Partners",
    actions: [
      "Build a 25-agent target list.",
      "Make value-first daily agent contacts.",
      "Book at least one short meeting.",
    ],
    win: "Target list active and meeting booked.",
  },
  {
    week: 8,
    theme: "Winning the Realtor Relationship",
    number: "Agent meetings held",
    phase: "Partners",
    actions: [
      "Run discovery on the agent's business.",
      "Set one concrete next step after each meeting.",
      "Complete the second coach review checkpoint.",
    ],
    win: "Partnership next steps created.",
  },
  {
    week: 9,
    theme: "Pipeline Discipline & the Tuesday Call",
    number: "Tuesday status calls made",
    phase: "Systems",
    actions: [
      "Call every active file every Tuesday.",
      "Review every opportunity and stuck point.",
      "Communicate what is needed next.",
    ],
    win: "Pipeline reviewed and active files updated.",
  },
  {
    week: 10,
    theme: "Follow-Up That Closes",
    number: "Follow-up touches completed",
    phase: "Systems",
    actions: [
      "Work pre-approved and looking buyers.",
      "Re-engage quiet leads with value.",
      "Put every open opportunity on a next-action date.",
    ],
    win: "No warm opportunity left without a next step.",
  },
  {
    week: 11,
    theme: "Reviews, Referrals & Reputation",
    number: "Referrals and reviews requested",
    phase: "Growth",
    actions: [
      "Ask happy clients for reviews.",
      "Ask past clients and partners for introductions.",
      "Document a repeatable review request habit.",
    ],
    win: "Reputation activity becomes part of the weekly rhythm.",
  },
  {
    week: 12,
    theme: "The Next 12 Weeks",
    number: "Next plan completed",
    phase: "Growth",
    actions: [
      "Review the full 12-week cycle.",
      "Choose the next weekly number.",
      "Set the next cycle's schedule and accountability rhythm.",
    ],
    win: "Next 12-week plan ready.",
  },
];

export const allianceWeeks: ProgramWeek[] = [
  {
    week: 1,
    theme: "Enterprise Audit & 12-Week Plan",
    number: "Plan and scorecard built",
    phase: "Diagnose",
    actions: [
      "Audit business sources, time, systems, and bottlenecks.",
      "Build the advanced weekly scorecard.",
      "Name the bottleneck that creates the most drag.",
    ],
    win: "Audit complete and growth plan focused.",
  },
  {
    week: 2,
    theme: "Production Systems & Workflows",
    number: "Workflows documented",
    phase: "Systems",
    actions: [
      "Document lead to consult workflow.",
      "Document application to close workflow.",
      "Standardize client communication cadence.",
    ],
    win: "Three core workflows written clearly.",
  },
  {
    week: 3,
    theme: "The Numbers That Run the Business",
    number: "Conversion ratios mapped",
    phase: "Systems",
    actions: [
      "Map touches to conversations to consults to applications.",
      "Find the weakest ratio.",
      "Set the weekly dashboard view.",
    ],
    win: "Business managed by ratios, not vibes.",
  },
  {
    week: 4,
    theme: "Database Reactivation Campaign",
    number: "Reactivation touches",
    phase: "Demand",
    actions: [
      "Segment past clients, partners, sphere, and dormant leads.",
      "Launch a personal multi-touch campaign.",
      "Complete the first review checkpoint.",
    ],
    win: "Priority segment worked with tracked responses.",
  },
  {
    week: 5,
    theme: "Marketing & Content Engine",
    number: "Content pieces shipped",
    phase: "Demand",
    actions: [
      "Define weekly cadence and repeatable formats.",
      "Batch one week of content.",
      "Tie content to database and partner strategy.",
    ],
    win: "Content rhythm defined and shipping.",
  },
  {
    week: 6,
    theme: "Assisted Marketing & Follow-Up",
    number: "Workflows live",
    phase: "Leverage",
    actions: [
      "Use tools to draft content and follow-up.",
      "Keep human review on client-facing work.",
      "Document the repeatable workflow.",
    ],
    win: "Two leverage workflows running with review.",
  },
  {
    week: 7,
    theme: "Advanced Agent Strategy",
    number: "Strategic agent touches",
    phase: "Partners",
    actions: [
      "Tier agent relationships by fit and opportunity.",
      "Build value plans for top agents.",
      "Work A-tier touches with intention.",
    ],
    win: "Top partner strategy is specific.",
  },
  {
    week: 8,
    theme: "Agent Mastermind & Co-Marketing",
    number: "Partner assets launched",
    phase: "Partners",
    actions: [
      "Plan a recurring agent touchpoint.",
      "Launch one co-marketing asset.",
      "Complete the second review checkpoint.",
    ],
    win: "Agent event or asset scheduled and launched.",
  },
  {
    week: 9,
    theme: "Building Leverage",
    number: "Role and SOP defined",
    phase: "People",
    actions: [
      "Separate only-me tasks from delegable work.",
      "Define the next support role.",
      "Tie role responsibilities to documented SOPs.",
    ],
    win: "Next leverage role is clear.",
  },
  {
    week: 10,
    theme: "Leading & Coaching Your People",
    number: "Standards and 1:1s set",
    phase: "People",
    actions: [
      "Set clear standards for the people you lead.",
      "Run a weekly one-on-one rhythm.",
      "Practice accountability with warmth and directness.",
    ],
    win: "Leadership rhythm installed.",
  },
  {
    week: 11,
    theme: "Production Growth Roadmap",
    number: "Roadmap built",
    phase: "Scale",
    actions: [
      "Build the next 12-month roadmap.",
      "Select the highest-leverage systems to improve.",
      "Assign owners and review points.",
    ],
    win: "Growth roadmap visible.",
  },
  {
    week: 12,
    theme: "Growth Plan & Recommitment",
    number: "Growth plan completed",
    phase: "Scale",
    actions: [
      "Review the full cycle.",
      "Recommit to the next growth sprint.",
      "Set the operating rhythm for the next cycle.",
    ],
    win: "Next cycle ready with owners and numbers.",
  },
];

export const coachingRails = [
  "Theme days give each weekday a job.",
  "Daily time blocks protect income-producing activity before the day gets loud.",
  "One tracked number per week keeps coaching grounded in reality.",
  "Scripts make hard conversations repeatable.",
  "Coach review turns activity into learning and next steps.",
];

export const themeDays = [
  {
    day: "Monday",
    mastery: "Database & past clients",
    alliance: "Database reactivation plus systems and SOPs",
  },
  {
    day: "Tuesday",
    mastery: "Pipeline & client care",
    alliance: "Pipeline experience plus content batching",
  },
  {
    day: "Wednesday",
    mastery: "Realtor partners",
    alliance: "A-tier agent strategy plus tool workflows",
  },
  {
    day: "Thursday",
    mastery: "Lead conversion & follow-up",
    alliance: "Conversion plus partner production",
  },
  {
    day: "Friday",
    mastery: "Reviews, referrals & plan",
    alliance: "Numbers, roadmap and people review",
  },
];

export const scorecardMetrics: ScorecardMetric[] = [
  { metric: "Real conversations", goal: 20, values: [4, 3, 5, 3, 4] },
  { metric: "Realtor conversations", goal: 10, values: [2, 1, 3, 2, 1] },
  { metric: "Past client touches", goal: 25, values: [5, 6, 4, 5, 3] },
  { metric: "Referrals requested", goal: 5, values: [1, 0, 1, 1, 1] },
  { metric: "Applications taken", goal: 3, values: [1, 0, 1, 0, 1] },
  { metric: "Pre approvals issued", goal: 2, values: [0, 1, 0, 0, 1] },
  { metric: "Contracts received", goal: 1, values: [0, 0, 1, 0, 0] },
  { metric: "Closings", goal: 1, values: [0, 0, 0, 0, 1] },
];

export const allianceScorecardMetrics: ScorecardMetric[] = [
  { metric: "Real conversations", goal: 25, values: [5, 4, 6, 4, 5] },
  { metric: "Realtor conversations", goal: 15, values: [3, 2, 4, 3, 2] },
  { metric: "Past client touches", goal: 35, values: [7, 8, 6, 7, 6] },
  { metric: "Referrals requested", goal: 8, values: [1, 2, 1, 2, 1] },
  { metric: "Applications taken", goal: 4, values: [1, 1, 0, 1, 1] },
  { metric: "Pre approvals issued", goal: 3, values: [1, 0, 1, 0, 1] },
  { metric: "Contracts received", goal: 2, values: [0, 1, 0, 1, 0] },
  { metric: "Closings", goal: 1, values: [0, 0, 0, 0, 1] },
];

export const trackerDefinitions: TrackerDefinition[] = [
  {
    slug: "daily-execution",
    title: "Daily Execution Tracker",
    description:
      "The working daily list for calls, follow-up, appointments, script reps, and the one priority that must not slip.",
    columns: ["Day", "Theme", "Power block", "Call list", "Follow-up", "Script reps", "Done"],
    programs: ['mastery', 'alliance'],
    rows: [
      ["Monday", "Database", "8:30-10:30", "Top 25 SOI", "Past clients", "Database check-in", "yes"],
      ["Tuesday", "Pipeline", "8:30-10:30", "Active files", "Tuesday updates", "Status call", "yes"],
      ["Wednesday", "Realtors", "8:30-10:30", "Agent targets", "Coffee invites", "First call", "no"],
      ["Thursday", "Follow-up", "8:30-10:30", "Warm leads", "Quiet leads", "Objections", "no"],
      ["Friday", "Plan", "8:30-10:00", "Reviews", "Referrals", "Review ask", "yes"],
    ],
  },
  {
    slug: "realtor-relationships",
    title: "Realtor Relationship Tracker",
    description:
      "Track partner tier, last useful touch, next promised value, and the next meeting action.",
    columns: ["Agent", "Tier", "Last touch", "Next value", "Meeting", "Next action", "Status"],
    programs: ['mastery', 'alliance'],
    rows: [
      ["M. Rivera", "A", "Tuesday update example", "Buyer seminar outline", "Friday", "Send agenda", "active"],
      ["K. Nguyen", "B", "Coffee invite", "Loan Factory IQ demo", "Open", "Book 15 minutes", "needs touch"],
      ["A. Patel", "A", "Offer strategy call", "Co-marketing idea", "Wednesday", "Draft post angle", "active"],
      ["J. Smith", "C", "Market check-in", "Open house script", "Open", "Follow up next week", "watch"],
    ],
  },
  {
    slug: "deal-flow",
    title: "Deal Flow Tracker",
    description:
      "A pipeline view that forces every borrower and partner opportunity to have a next action date.",
    columns: ["Opportunity", "Stage", "Owner", "Next action", "Due", "Stuck point", "Priority"],
    programs: ['mastery', 'alliance'],
    rows: [
      ["Garcia purchase", "Pre-approved", "Jeremy", "Check home search", "Today", "Waiting on house", "High"],
      ["Davis refi question", "Discovery", "Jeremy", "Review current goals", "Tomorrow", "Needs docs", "Medium"],
      ["Lee buyer", "Consult booked", "Jeremy", "Prep buyer questions", "Wednesday", "Payment range", "High"],
      ["Agent seminar lead", "Partner", "Jeremy", "Confirm agenda", "Friday", "Agent invite list", "Medium"],
    ],
  },
  {
    slug: "follow-up",
    title: "Follow Up Tracker",
    description:
      "A working queue for quiet leads, pre-approved buyers, past clients, and partner promises that need a next action.",
    columns: ["Contact", "Type", "Last touch", "Next message", "Due", "Owner", "Status"],
    programs: ['mastery', 'alliance'],
    rows: [
      ["A. Johnson", "Pre-approved buyer", "Home search check-in", "Offer support note", "Today", "Jeremy", "queued"],
      ["M. Rivera", "Realtor partner", "Coffee meeting", "Send buyer seminar outline", "Tomorrow", "Jeremy", "active"],
      ["D. Chen", "Past client", "Quarterly call", "Ask for introduction", "Friday", "Jeremy", "needs touch"],
      ["Quiet lead list", "Warm leads", "No response", "Value-first re-engagement", "Thursday", "Jeremy", "batch"],
    ],
  },
  {
    slug: "theme-day-planner",
    title: "Theme Day Planner",
    description:
      "Plan each weekday around one revenue theme and one concrete action list.",
    columns: ["Day", "Theme", "Primary list", "Prepared night before", "Number to track", "Recovery plan", "Done"],
    programs: ['mastery'],
    rows: [
      ["Monday", "Database", "Top 25 plus past clients", "yes", "Calls completed", "Move leftover calls to Thursday", "yes"],
      ["Tuesday", "Pipeline", "All active files", "yes", "Status calls", "Finish before lunch", "yes"],
      ["Wednesday", "Realtors", "A/B agent targets", "no", "New contacts", "Book from CRM list", "no"],
      ["Thursday", "Follow-up", "Warm leads and quiet leads", "yes", "Touches", "Use 45-minute second block", "no"],
      ["Friday", "Plan", "Reviews and next week", "no", "Scorecard complete", "Complete after coaching", "yes"],
    ],
  },
  {
    slug: "daily-time-blocker",
    title: "Daily Time Blocker",
    description:
      "Protect the Power Block first, then put appointments, admin, and review work where they belong.",
    columns: ["Block", "Time", "Purpose", "Rules", "Current focus", "Status"],
    programs: ['mastery'],
    rows: [
      ["Win the morning", "8:00-8:30", "Plan and prep", "No inbox first", "Build call list", "done"],
      ["Power block", "8:30-10:30", "Income-producing activity", "Phone on, email off", "Calls and meetings", "active"],
      ["Appointment block", "10:30-12:00", "Consults and partners", "Discovery first", "Buyer consults", "queued"],
      ["Admin block", "1:00-3:00", "Files and follow-up", "Batch reactive work", "Docs and updates", "queued"],
      ["Review block", "4:30-5:00", "Scorecard and tomorrow", "Log the number", "Tomorrow prep", "queued"],
    ],
  },
  {
    slug: "greatness-tracker",
    title: "Greatness Tracker",
    description:
      "A simple accountability view for commitment, mindset, action, and follow-through.",
    columns: ["Area", "Question", "Today", "Evidence", "Next step"],
    programs: ['mastery', 'alliance'],
    rows: [
      ["Commitment", "Did I protect the work I said mattered?", "yes", "Power block completed", "Repeat tomorrow"],
      ["Mindset", "Did I stay curious when I hit resistance?", "yes", "Used question before advice", "Write the best line"],
      ["Action", "Did I make the important calls?", "partial", "18 touches", "Finish 7 more before 5"],
      ["Follow-through", "Did every open item get a next step?", "no", "Two files missing date", "Assign dates now"],
    ],
  },
  {
    slug: "conversion-ratio",
    title: "Conversion Ratio Tracker",
    description:
      "Run the business by ratios: touches to conversations to consults to applications to contracts.",
    columns: ["Stage", "Volume", "Goal", "Ratio", "Owner", "Next step"],
    programs: ['alliance'],
    rows: [
      ["Touches to conversations", "320", "20%", "16%", "Jeremy", "Audit call list quality"],
      ["Conversations to consults", "52", "60%", "55%", "Jeremy", "Tighten discovery opener"],
      ["Consults to applications", "29", "70%", "62%", "Jeremy", "Strengthen payment goal ask"],
      ["Applications to contracts", "18", "65%", "55%", "Jeremy", "Faster condition resolution"],
    ],
  },
  {
    slug: "partner-tier",
    title: "Partner Tier Tracker",
    description:
      "Tier agent relationships by fit and opportunity, then run A-tier touches with intention.",
    columns: ["Agent", "Tier", "Volume", "Buyer quality", "Co-build willing", "Next A-tier action"],
    programs: ['alliance'],
    rows: [
      ["M. Rivera", "A", "9 deals YTD", "Strong", "Yes", "Plan co-marketing asset"],
      ["A. Patel", "A", "7 deals YTD", "Strong", "Yes", "Schedule lunch and learn"],
      ["K. Nguyen", "B", "4 deals YTD", "Mixed", "Possibly", "Send market update"],
      ["J. Smith", "C", "2 deals YTD", "Watch", "No", "Hold quarterly update only"],
    ],
  },
  {
    slug: "content-rhythm",
    title: "Content Rhythm Tracker",
    description:
      "Plan, batch, and ship weekly content with a tracked cadence and a clear review point.",
    columns: ["Week", "Format", "Topic", "Drafted", "Posted", "Reviewed"],
    programs: ['alliance'],
    rows: [
      ["Week 1", "Short video", "First-time buyer myth", "yes", "yes", "Coach reviewed"],
      ["Week 2", "Market update", "Local rate snapshot", "yes", "yes", "Coach reviewed"],
      ["Week 3", "Partner spotlight", "Realtor story", "drafted", "no", "Pending"],
      ["Week 4", "Buyer education", "Pre-approval explained", "no", "no", "Next batch"],
    ],
  },
];

export const scriptLibrary: ScriptResource[] = [
  {
    title: "Realtor First Call Script",
    category: "Realtor",
    programs: ['mastery', 'alliance'],
    useWhen: "First contact with an agent.",
    goal: "Earn a meeting, not diagnose their business on the first call.",
    script: [
      "Hi [Agent], this is [Your Name] with Loan Factory. I will be quick.",
      "I am not calling to ask for business today. I am reaching out because I am trying to learn more about what local agents are seeing in the market and where financing is helping or hurting deals right now.",
      "How has business been for you this year?",
      "Are you working mostly with buyers, sellers, or a mix?",
      "What are you seeing most in your market right now?",
      "That is helpful. I appreciate you sharing that.",
      "The reason I ask is because I work with buyers and agents every day, and I am always looking for ways to make financing smoother, faster, and less frustrating for everyone involved.",
      "Would you be open to grabbing coffee for 15 minutes this week so I can learn more about your business and see if there are any ways I can be a useful resource?",
      "If they say yes: Perfect. What does your schedule look like later this week?",
      "If they say no or not now: No problem at all. I appreciate you taking the call. I will send over my contact info, and if you ever have a tough financing question or a buyer who needs a second look, I am happy to help.",
    ],
    practicePrompt:
      "Record one practice rep where you ask three discovery questions before mentioning Loan Factory.",
    coachNote:
      "The first call is about curiosity, trust, and earning the meeting. Do not assume the agent has a problem before they tell you what is going on.",
  },
  {
    title: "Database Quarterly Check-In",
    category: "Database",
    programs: ['mastery', 'alliance'],
    useWhen: "Touching sphere of influence and past relationship contacts.",
    goal: "Strengthen the relationship and open the door to referrals.",
    script: [
      "Hey [Name], it is [Your Name] at Loan Factory. How are you?",
      "I was just calling to check in. You are one of my favorite people, and I reach out to my favorite people every quarter to catch up and see if there is anything I can do for you.",
      "I am also looking to help more people like you. If you ever hear of anyone looking to buy, refinance, or invest, I would love the chance to take great care of them.",
      "Anything I can do for you or your family right now?",
    ],
    practicePrompt:
      "Write the first ten people you will call and the relationship detail you can lead with for each one.",
    coachNote: "Use FORD. Make it about them before making any ask.",
  },
  {
    title: "Buyer Rate Question",
    category: "Buyer",
    programs: ['mastery', 'alliance'],
    useWhen: "A borrower asks for rates before you know the file.",
    goal: "Turn a price question into a useful consultation.",
    script: [
      "Great question. The honest answer is your rate depends on credit, down payment, property type, and your goals.",
      "At Loan Factory I am not limited to one lender's pricing. I can shop multiple lenders and build a real answer around your situation.",
      "Let us grab 20 minutes so I can understand your payment goal, cash-to-close goal, timeline, and what you are trying to accomplish.",
      "I have [time] or [time]. Which is better?",
    ],
    practicePrompt:
      "Role-play the first two minutes of the call without quoting a number until you have asked discovery questions.",
    coachNote: "Discovery first. Do not win a call with a teaser number.",
  },
  {
    title: "Quiet Lead Re-Engagement",
    category: "Follow-Up",
    programs: ['mastery', 'alliance'],
    useWhen: "A warm lead has gone quiet.",
    goal: "Restart the conversation without sounding pushy.",
    script: [
      "Hey [Name], no agenda. I was thinking about your home plans and wanted to check in.",
      "Where are you at with everything right now?",
      "If timing changed, no problem. If you still want clarity on numbers or next steps, I am happy to help.",
    ],
    practicePrompt:
      "Rewrite the message for one pre-approved buyer, one past client, and one agent lead.",
    coachNote: "A useful touch beats a pressure touch.",
  },
  {
    title: "Tuesday Status Call",
    category: "Client Care",
    programs: ['mastery', 'alliance'],
    useWhen: "Every active file, every Tuesday.",
    goal: "Keep clients and partners out of the dark.",
    script: [
      "Hey [Name], it is [Your Name] with your Tuesday update.",
      "Here is where we are right now: [status].",
      "Here is what I need next: [item or nothing needed].",
      "Here is whether we are tracking on time: [on track or risk].",
      "Any questions for me today?",
    ],
    practicePrompt:
      "Choose one active file and write the status, next need, timing risk, and question before calling.",
    coachNote: "No news is still news. Predictable communication builds trust.",
  },
  {
    title: "Objection Reframe Script",
    category: "Objection",
    programs: ['mastery', 'alliance'],
    useWhen: "A borrower, agent, or partner pushes back before you understand the real concern.",
    goal: "Stay calm, get curious, reframe the issue, and move to a next step.",
    script: [
      "I hear you. That makes sense.",
      "Can I ask what is driving that concern?",
      "If we could solve that piece, would the rest of the plan still make sense?",
      "Here is how I would think about it based on what you told me: [reframe].",
      "The clean next step is [next action]. Does that work?",
    ],
    practicePrompt:
      "Practice the same objection three times: once too fast, once calm, once with the curiosity question first.",
    coachNote: "Do not argue. Name the concern and slow the conversation down.",
  },
  {
    title: "Past Client Referral Ask",
    category: "Referral",
    programs: ['mastery', 'alliance'],
    useWhen: "A past client had a good experience and the relationship is warm.",
    goal: "Ask plainly for an introduction without making it awkward.",
    script: [
      "I really appreciate you trusting me when we worked together.",
      "I am working to help more people who value clear communication and a smooth process.",
      "If someone in your world talks about buying, refinancing, or needing a second opinion, would you feel comfortable introducing us?",
      "No pressure. I just want to make sure I take care of anyone you send my way the right way.",
    ],
    practicePrompt:
      "Write three names you can ask this week and the reason each person would feel natural to contact.",
    coachNote: "Make the ask after connection, not as a cold transaction.",
  },
  {
    title: "Database Reactivation Script",
    category: "Reactivation",
    programs: ['alliance'],
    useWhen: "Alliance members are reactivating dormant leads, database segments, or past client lists.",
    goal: "Restart useful conversations from an organized campaign without sounding automated.",
    script: [
      "Hey [Name], I was cleaning up my notes and saw we had talked about home financing before.",
      "I am not sure if buying, refinancing, or investing is still on your radar, but I wanted to check in personally.",
      "Has anything changed with your plans this year?",
      "If it would help, I can take a fresh look and give you a clear next step.",
    ],
    practicePrompt:
      "Pick one dormant database segment and write the first personal line for five people before sending.",
    coachNote: "Alliance reactivation should feel personal even when it is systemized.",
  },
  {
    title: "Tier-A Agent Value Plan Script",
    category: "Partner Strategy",
    programs: ['alliance'],
    useWhen: "Alliance members are designing the value plan they will deliver to their top agent partners.",
    goal: "Translate tier status into a written value plan the partner can actually feel.",
    script: [
      "Hey [Agent], I want to share how I am thinking about our partnership this quarter.",
      "You are a tier-A partner for me, which means I am building the work around the way you run your business.",
      "Here is what I will commit to: [co-marketing asset], [monthly market snapshot], [buyer education support].",
      "Here is what helps me most from you: [shared listing alerts], [early access on tough files], [one referral ask a month].",
      "Does this match how you want to work? What would you add?",
    ],
    practicePrompt:
      "Pick one tier-A agent and write the three commitments plus the three asks before sending.",
    coachNote: "A value plan is a partnership contract. Make the asks explicit so the relationship is two-sided.",
  },
  {
    title: "Leverage Role Definition Script",
    category: "Leadership",
    programs: ['alliance'],
    useWhen: "Alliance members are defining the next support role they will hire or contract.",
    goal: "Separate only-me work from delegable work and turn it into a real role description.",
    script: [
      "I am sitting down to design the next support role for my business.",
      "Here is what I want this person to own in the first 30 days: [specific deliverable].",
      "Here is what I am keeping for myself: [relationship work, partner strategy, deal review].",
      "Here is how I will measure success: [one number, one quality standard, one weekly check-in].",
      "Who do you know that would be a strong fit for this kind of role?",
    ],
    practicePrompt:
      "Write a 30-day outcome, a 60-day outcome, and a list of only-me work before posting the role.",
    coachNote: "If you cannot name the only-me work, you are not ready to delegate. Start there.",
  },
  {
    title: "Pre-Approval Confidence Builder",
    category: "Buyer",
    programs: ['mastery'],
    useWhen: "An LO Mastery member is walking a nervous first-time buyer through pre-approval.",
    goal: "Make the borrower feel certain about the next step without overpromising numbers.",
    script: [
      "Here is what we know after pulling credit: [factual summary].",
      "Here is the price range that fits your payment goal and your cash-to-close goal.",
      "Here is what I need from you to move us to a clear pre-approval: [list].",
      "Here is what I will handle on my end this week: [list].",
      "If anything changes with your job, income, or debt, tell me before you make the change, not after.",
    ],
    practicePrompt:
      "Pick one active pre-approval and rewrite the four-part message in your own voice.",
    coachNote: "Confidence comes from clarity. The borrower should know the next step before they hang up.",
  },
  {
    title: "Tuesday Status Call Discipline Script",
    category: "Client Care",
    programs: ['mastery'],
    useWhen: "An LO Mastery member is calling every active file every Tuesday.",
    goal: "Make the Tuesday call short, predictable, and useful for the client.",
    script: [
      "Hey [Name], it is [Your Name] with your Tuesday update.",
      "Here is where the file sits today: [one sentence].",
      "Here is what I need from you this week: [one item or nothing].",
      "Here is what I am doing on my end: [one item].",
      "Any questions before I let you go?",
    ],
    practicePrompt:
      "Build a one-line template you can reuse for every Tuesday call and stick it next to your desk.",
    coachNote: "Predictable communication beats fancy communication. The Tuesday call is a habit, not an event.",
  },
];

export const playbookLibrary: PlaybookResource[] = [
  {
    title: "Daily Time Blocking Playbook",
    category: "Execution",
    programs: ['mastery', 'alliance'],
    purpose: "Protect income-producing work before reactive work takes over the day.",
    steps: [
      "Plan tomorrow before the day ends.",
      "Block the Power Block first.",
      "Batch admin and file work outside the call block.",
      "Review what slipped before leaving the office.",
    ],
    practicePrompt: "Build tomorrow's calendar and name the one block that cannot move.",
    resourceTitle: "Daily Time Blockers",
  },
  {
    title: "Theme Days Playbook",
    category: "Execution",
    programs: ['mastery', 'alliance'],
    purpose: "Give every weekday a clear job so the member is not deciding from scratch every morning.",
    steps: [
      "Monday: database and past clients.",
      "Tuesday: pipeline and client care.",
      "Wednesday: Realtor partner development.",
      "Thursday: lead conversion and follow-up.",
      "Friday: reviews, referrals, scorecard, and next week.",
    ],
    practicePrompt: "Write the list you will work on each theme day this week.",
    resourceTitle: "Theme Days Playbook",
  },
  {
    title: "Realtor Growth Playbook",
    category: "Partners",
    programs: ['mastery', 'alliance'],
    purpose: "Turn agent outreach into useful relationship building instead of pitching.",
    steps: [
      "Build a focused list of agents.",
      "Open with market curiosity.",
      "Earn a 15-minute meeting.",
      "Bring one useful idea to the meeting.",
      "Set a real next action before leaving.",
    ],
    practicePrompt: "Choose five agents and write the first discovery question for each one.",
    resourceTitle: "Realtor Growth System",
  },
  {
    title: "Buyer Consultation Playbook",
    category: "Conversion",
    programs: ['mastery', 'alliance'],
    purpose: "Use discovery before advice so the member does not become a rate quote machine.",
    steps: [
      "Ask payment goal, cash-to-close goal, timeline, and ownership goal.",
      "Clarify tradeoffs before recommending a structure.",
      "Set one clear next step.",
      "Document the borrower goal and follow-up date.",
    ],
    practicePrompt: "Write five buyer discovery questions before your next consult.",
  },
  {
    title: "Follow-Up System Playbook",
    category: "Follow-Up",
    programs: ['mastery', 'alliance'],
    purpose: "Keep every warm lead, buyer, partner, and past client on a visible next action.",
    steps: [
      "Separate warm leads, pre-approved buyers, past clients, and partner promises.",
      "Assign a next message and due date.",
      "Work follow-up before reactive work.",
      "Review the queue every Friday.",
    ],
    practicePrompt: "Find five contacts without a next action and assign one before the day ends.",
    resourceTitle: "Follow Up System",
  },
  {
    title: "Database Reactivation Playbook",
    category: "Alliance",
    programs: ['alliance'],
    purpose: "Reactivate dormant value from past clients, sphere, partners, and older opportunities.",
    steps: [
      "Segment the database.",
      "Choose one segment for the week.",
      "Write a personal first line.",
      "Track responses and next actions.",
      "Bring campaign results to coach review.",
    ],
    practicePrompt: "Pick one database segment and write the message angle before opening email or CRM.",
    resourceTitle: "Follow Up System",
  },
  {
    title: "Advanced Pipeline Inspection Playbook",
    category: "Alliance",
    programs: ['alliance'],
    purpose: "Run the pipeline by ratios, not by vibes, and turn stuck stages into next actions.",
    steps: [
      "Pull every active file into the conversion ratio tracker.",
      "Identify the weakest handoff in the funnel.",
      "Pick one system fix for the weakest handoff.",
      "Document the new workflow before the next review.",
      "Bring the ratio change to coach review next week.",
    ],
    practicePrompt: "Map the current touches to contracts ratio before the next coaching call.",
  },
  {
    title: "Partner Tier Review Playbook",
    category: "Alliance",
    programs: ['alliance'],
    purpose: "Re-tier Realtor partners each quarter and focus A-tier touches with intention.",
    steps: [
      "Pull every active agent relationship into the partner tier tracker.",
      "Score by volume, buyer quality, response speed, and co-build willingness.",
      "Confirm the A-tier list with the manager if needed.",
      "Write the value plan for each A-tier partner.",
      "Schedule the next quarterly review point.",
    ],
    practicePrompt: "Pick three A-tier partners and write the value plan you will deliver this month.",
  },
  {
    title: "First-Time Buyer Walkthrough Playbook",
    category: "Mastery",
    programs: ['mastery'],
    purpose: "Take a nervous first-time borrower from first call to a confident pre-approval.",
    steps: [
      "Open with what they are trying to accomplish, not with rates.",
      "Use the four-goal framework: payment, cash-to-close, timeline, ownership.",
      "Set the price range based on their real numbers.",
      "Send the pre-approval checklist the same day.",
      "Schedule the Tuesday status call before you hang up.",
    ],
    practicePrompt: "Walk one first-time buyer through the full framework before your next live call.",
  },
];

export const downloadResources: DownloadResource[] = [
  {
    title: "LO Mastery 12-Week Curriculum",
    description: "The foundational weekly program map, actions, coaching notes, and asset index.",
    category: "Curriculum",
    audience: "Member",
    programs: ['mastery'],
    pdf: "https://drive.google.com/file/d/1aqhM_KfgJn00ll78z5HpWxeT_0bX85xm/view?usp=drivesdk",
    docx: "https://docs.google.com/document/d/1sqJSCvbsrjSDa7LhFFPvoE2HwbQ0VZQl/edit?usp=drivesdk&ouid=110305764628203153224&rtpof=true&sd=true",
  },
  {
    title: "Loan Factory Alliance 12-Week Curriculum",
    description: "Advanced weekly program map for systems, partners, leadership, and leverage.",
    category: "Curriculum",
    audience: "Member",
    programs: ['alliance'],
    pdf: "https://drive.google.com/file/d/1Q-70umaSW3fgaAM9Bt_dYV0IPhyfTcyQ/view?usp=drivesdk",
    docx: "https://docs.google.com/document/d/1OKREYevozajWHfZ_aInHiZQa84_l_gdM/edit?usp=drivesdk&ouid=110305764628203153224&rtpof=true&sd=true",
  },
  {
    title: "Script Book",
    description: "Realtor, borrower, follow-up, database, objection, and client-care scripts.",
    category: "Scripts",
    audience: "All",
    programs: ['mastery', 'alliance'],
    pdf: "https://drive.google.com/file/d/1zA44f6JzhyA4RqpM-cZf46ojA08dLwTJ/view?usp=drivesdk",
    docx: "https://docs.google.com/document/d/1DPMFVz1DF9wQbJVrDolk_eJF3NPF_OtS/edit?usp=drivesdk&ouid=110305764628203153224&rtpof=true&sd=true",
  },
  {
    title: "Weekly Scorecard",
    description: "One-page weekly scorecard for leading activity, reflection, and coach review.",
    category: "Trackers",
    audience: "All",
    programs: ['mastery', 'alliance'],
    pdf: "https://drive.google.com/file/d/1UQLx7O4idAeQxYF045beP9Twgq2XsB67/view?usp=drivesdk",
    docx: "https://docs.google.com/document/d/1c8xYdMBClpgNaBLE0bXb1cJDulFgupDz/edit?usp=drivesdk&ouid=110305764628203153224&rtpof=true&sd=true",
  },
  {
    title: "Member Accountability Tracker",
    description: "12-week coach-and-member shared view for commitments, weekly numbers, and on-track status.",
    category: "Trackers",
    audience: "All",
    programs: ['mastery', 'alliance'],
    pdf: "https://drive.google.com/file/d/1KJaUPWQ8dFwa193wWH5r-_Vtk36VTfoP/view?usp=drivesdk",
    docx: "https://docs.google.com/document/d/1Yjz7W8CUfCmGW3r46AFIfqnrYj3jlIQp/edit?usp=drivesdk&ouid=110305764628203153224&rtpof=true&sd=true",
  },
  {
    title: "Daily Time Blockers",
    description: "Daily planning templates for protected Power Blocks, appointments, admin, and review.",
    category: "Trackers",
    audience: "Member",
    programs: ['mastery', 'alliance'],
    pdf: "https://drive.google.com/file/d/1PxpN74w-IK3frRR2ympGC5K3mJOXbrbd/view?usp=drivesdk",
    docx: "https://docs.google.com/document/d/1Q-_uYd4I9PtpQWERJMIG5lpmPy77KAMA/edit?usp=drivesdk&ouid=110305764628203153224&rtpof=true&sd=true",
  },
  {
    title: "Greatness Tracker",
    description: "Daily accountability tracker for commitment, mindset, action, and follow-through.",
    category: "Trackers",
    audience: "Member",
    programs: ['mastery', 'alliance'],
    pdf: "https://drive.google.com/file/d/1r4w7CMj99uh6tnD8Zl7kp-yzSfqvjbFD/view?usp=drivesdk",
    docx: "https://docs.google.com/document/d/16it2AjTKgxtnL0gnzuJMR1IHYC5uqsKZ/edit?usp=drivesdk&ouid=110305764628203153224&rtpof=true&sd=true",
  },
  {
    title: "Theme Days Playbook",
    description: "The weekday operating rhythm for database, pipeline, partners, follow-up, and planning.",
    category: "Playbooks",
    audience: "All",
    programs: ['mastery', 'alliance'],
    pdf: "https://drive.google.com/file/d/1RnHBUW58Q83jyvOFYhnRC-gbsVY2_6Um/view?usp=drivesdk",
    docx: "https://docs.google.com/document/d/1DTQcRuNnEVLivNDeZyGfbvEXB6SVHlf9/edit?usp=drivesdk&ouid=110305764628203153224&rtpof=true&sd=true",
  },
  {
    title: "Follow Up System",
    description: "Follow-up rhythm for pre-approved buyers, quiet leads, past clients, and next-action discipline.",
    category: "Playbooks",
    audience: "All",
    programs: ['mastery', 'alliance'],
    pdf: "https://drive.google.com/file/d/1XK_2bg8PvpJYP8PJNVwnOYwH1sVuKF8A/view?usp=drivesdk",
    docx: "https://docs.google.com/document/d/1NaGl_kTosVKENRqwrr7EOzRY_IHLJRYh/edit?usp=drivesdk&ouid=110305764628203153224&rtpof=true&sd=true",
  },
  {
    title: "Realtor Growth System",
    description: "Partner development system for agent outreach, useful value, meetings, and relationship follow-through.",
    category: "Playbooks",
    audience: "All",
    programs: ['mastery', 'alliance'],
    pdf: "https://drive.google.com/file/d/1PxMVznSC2VDg6VA6NIXoo9mIMvsu8soc/view?usp=drivesdk",
    docx: "https://docs.google.com/document/d/1OgJ1Kiz98YdRhixf3OSnBTXXxpNi9NFb/edit?usp=drivesdk&ouid=110305764628203153224&rtpof=true&sd=true",
  },
  {
    title: "Coach Playbook",
    description: "Coach-facing operating guide for member review, coaching rhythm, feedback, and accountability.",
    category: "Coach Tools",
    audience: "Coach",
    programs: ['mastery', 'alliance'],
    pdf: "https://drive.google.com/file/d/1EGRpITWSboNDXo4_-tj1DePOJSjsVeY3/view?usp=drivesdk",
    docx: "https://docs.google.com/document/d/1QVBbH2uXqqK1bNvcLHF03OgWcBEF1IIz/edit?usp=drivesdk&ouid=110305764628203153224&rtpof=true&sd=true",
  },
  {
    title: "Coach Review Worksheet",
    description: "Call-prep and review worksheet for checkpoints, member obstacles, and next actions.",
    category: "Coach Tools",
    audience: "Coach",
    programs: ['mastery', 'alliance'],
    pdf: "https://drive.google.com/file/d/1xEP6u29mBwLeX1vDV_1mWpwL3Xhp1AuK/view?usp=drivesdk",
    docx: "https://docs.google.com/document/d/13J6yiS0eVakTnlrockFwHFZU9KUcBoTb/edit?usp=drivesdk&ouid=110305764628203153224&rtpof=true&sd=true",
  },
  {
    title: "Complete Paid Coaching Program",
    description: "Full program reference packet for leaders, coaches, and review stakeholders.",
    category: "Playbooks",
    audience: "All",
    programs: ['mastery', 'alliance'],
    pdf: "https://drive.google.com/file/d/1Jm9dQPGPUAI5Q_e_EvE114ugXqzq7CLI/view?usp=drivesdk",
    docx: "https://docs.google.com/document/d/1CodlNMOr5ps6DrKYSPWd76lMbBipiTcR/edit?usp=drivesdk&ouid=110305764628203153224&rtpof=true&sd=true",
  },
];

export const communityPosts: CommunityPost[] = [
  {
    author: "Jeremy McDonald",
    role: "Coach",
    category: "Pinned",
    title: "This week's focus: protect the Power Block",
    body:
      "Before coaching, complete the weekly scorecard and bring one place where your schedule broke. We are not guessing this week. We are looking at the calendar, the calls, and the next action.",
    comments: ["Bring the number and the obstacle.", "Post one adjustment that protects tomorrow morning."],
    pinned: true,
  },
  {
    author: "Jeremy McDonald",
    role: "Coach",
    category: "Pinned",
    title: "Realtor first call: open with curiosity, not pitch",
    body:
      "The first call is about trust. Ask three discovery questions before mentioning Loan Factory, agents, or rates. Bring the value plan to the meeting, not the call.\n\nYouTube link: https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    comments: ["I used this opener and booked two coffees.", "Open with the question, then stay quiet long enough to hear the answer."],
    pinned: true,
  },
  {
    author: "Maria R.",
    role: "LO Mastery",
    category: "Wins",
    title: "Booked two agent coffees using the softer first call",
    body:
      "The discovery version felt better. I asked what agents were seeing instead of pitching, and the conversation opened up.",
    comments: ["Drop the line that worked best.", "Good example of earning the meeting first."],
  },
  {
    author: "Andre L.",
    role: "Alliance",
    category: "Questions",
    title: "How are you tiering agents this week?",
    body:
      "I have ten active Realtor relationships but only three feel like A-tier. What criteria are you using besides production?",
    comments: ["Fit, response speed, buyer quality, and willingness to co-build.", "Bring this into the Wednesday partner thread."],
  },
  {
    author: "Leslie P.",
    role: "Coach",
    category: "Scripts",
    title: "Buyer consultation reminder",
    body:
      "Payment, cash-to-close, timeline, and ownership goal must come before advice. If you skip discovery, the call becomes rate shopping.",
    comments: ["Use the consultation planner before the call.", "Record one practice rep this week."],
  },
  {
    author: "Sam T.",
    role: "LO Mastery",
    category: "Wins",
    title: "Cleared the Tuesday backlog before lunch",
    body:
      "I batched every active file into one sitting, called each one, and wrote the next action on the tracker. The week got lighter after that.",
    comments: ["Tuesday rhythm is the difference. Glad it clicked."],
  },
];

export const leaderboardRows: { name: string; metric: string; detail: string }[] = [
  { name: "Maria R.", metric: "5 blocks · 22 conversations", detail: "100% scorecard complete" },
  { name: "Andre L.", metric: "14 partner touches", detail: "3 meetings · 2 systems improved" },
  { name: "Sam T.", metric: "48 calls · 6 consults", detail: "Scorecard complete" },
  { name: "Leslie P.", metric: "Coach responses · 8 notes", detail: "4 reviews ready" },
];

export const calendarItems = [
  {
    day: "Monday",
    title: "LO Mastery planning block",
    time: "8:30 AM",
    focus: "Database list, weekly number, Power Block setup.",
  },
  {
    day: "Tuesday",
    title: "Pipeline status rhythm",
    time: "10:00 AM",
    focus: "Every active file gets a clear update.",
  },
  {
    day: "Wednesday",
    title: "Partner growth lab",
    time: "1:00 PM",
    focus: "Agent outreach, meeting prep, relationship tracker review.",
  },
  {
    day: "Thursday",
    title: "Follow-up and conversion review",
    time: "11:00 AM",
    focus: "Warm leads, quiet leads, objection practice.",
  },
  {
    day: "Friday",
    title: "Scorecard and next week plan",
    time: "3:00 PM",
    focus: "Scorecard, reflection, next week's number.",
  },
];

export const memberProgressRows = [
  {
    member: "Maria R.",
    program: "LO Mastery",
    week: "Week 7",
    focus: "Realtor outreach",
    scorecard: "Complete",
    nextAction: "Book two coffee meetings",
    status: "On pace",
  },
  {
    member: "Andre L.",
    program: "Loan Factory Alliance",
    week: "Week 3",
    focus: "Conversion ratios",
    scorecard: "Ready for review",
    nextAction: "Map weakest funnel ratio",
    status: "Needs review",
  },
  {
    member: "Sam T.",
    program: "LO Mastery",
    week: "Week 4",
    focus: "Real conversations",
    scorecard: "Partial",
    nextAction: "Clarify what counts as a conversation",
    status: "Watch",
  },
  {
    member: "Nina K.",
    program: "Loan Factory Alliance",
    week: "Week 8",
    focus: "Co-marketing asset",
    scorecard: "Complete",
    nextAction: "Launch agent lunch invite",
    status: "On pace",
  },
];

export const coachNotes = [
  {
    member: "Maria R.",
    date: "June 3",
    note: "Good schedule discipline. Needs more direct meeting asks after agent discovery.",
    nextAction: "Use the Realtor first call script twice daily through Friday.",
  },
  {
    member: "Andre L.",
    date: "June 2",
    note: "Knows the business well but is still carrying too many tasks personally.",
    nextAction: "Document lead-to-consult SOP before next review.",
  },
  {
    member: "Sam T.",
    date: "June 1",
    note: "Counting activity accurately now. Confidence drops at objections.",
    nextAction: "Record three objection role-play reps.",
  },
];

export const managerCoachRows = [
  {
    coach: "Jeremy McDonald",
    members: 18,
    reviewsDue: 5,
    scorecardsReady: 11,
    supportNeed: "Prioritize new member onboarding rhythm.",
  },
  {
    coach: "Leslie P.",
    members: 14,
    reviewsDue: 3,
    scorecardsReady: 9,
    supportNeed: "Needs updated script practice queue.",
  },
  {
    coach: "Andre L.",
    members: 12,
    reviewsDue: 4,
    scorecardsReady: 8,
    supportNeed: "Review Alliance partner strategy examples.",
  },
];

export const programStatusRows = [
  {
    program: "LO Mastery",
    members: 44,
    weeklyFocus: "Theme days, Power Blocks, scorecard completion.",
    health: "Strong adoption",
    watch: "New members need faster schedule setup.",
  },
  {
    program: "Loan Factory Alliance",
    members: 27,
    weeklyFocus: "Conversion ratios, agent strategy, documented workflows.",
    health: "Healthy activity",
    watch: "Partner strategy requires coach review consistency.",
  },
];

export const adminUserRows = [
  {
    name: "Jeremy McDonald",
    access: "Full platform review",
    program: "All programs",
    status: "Active",
  },
  {
    name: "Coach Review User",
    access: "Coach command center",
    program: "Assigned members",
    status: "Active",
  },
  {
    name: "LO Mastery Review User",
    access: "Member area",
    program: "LO Mastery",
    status: "Active",
  },
  {
    name: "Alliance Review User",
    access: "Member area",
    program: "Loan Factory Alliance",
    status: "Active",
  },
];

export const memberPages: Record<string, RoutePage> = {
  "lo-mastery": {
    eyebrow: "Member area",
    title: "LO Mastery",
    description:
      "A structured member view for daily execution, weekly coaching, scripts, scorecards, and habit consistency.",
    primaryHref: "/member-area/trackers/",
    primaryLabel: "Open trackers",
    secondaryHref: "/member-area/resources/",
    secondaryLabel: "Open resources",
    cards: [],
    sidebarTitle: "LO Mastery focus",
    sidebarItems: ["Daily time blocking", "Follow-up habit", "Script practice", "Weekly accountability"],
  },
  alliance: {
    eyebrow: "Member area",
    title: "Loan Factory Alliance",
    description:
      "Advanced coaching for members who need sharper planning, partner strategy, and consistent accountability.",
    primaryHref: "/member-area/scorecards/",
    primaryLabel: "Open scorecards",
    secondaryHref: "/member-area/community/",
    secondaryLabel: "Open community",
    cards: [],
    sidebarTitle: "Alliance focus",
    sidebarItems: ["Advanced weekly planning", "Partner strategy", "Pipeline inspection", "Priority accountability"],
  },
  resources: {
    eyebrow: "Member area",
    title: "Resources",
    description: "Script books, playbooks, trackers, worksheets, and coaching references.",
    cards: [],
  },
  scorecards: {
    eyebrow: "Member area",
    title: "LO Mastery Scorecard",
    description: "Weekly LO Mastery accountability form for activity, partner work, pipeline review, and consistency.",
    cards: [],
  },
  "alliance-scorecard": {
    eyebrow: "Member area",
    title: "Alliance Scorecard",
    description: "Advanced Alliance accountability form for partner strategy, systems, pipeline review, and weekly commitments.",
    cards: [],
  },
  trackers: {
    eyebrow: "Member area",
    title: "LO Mastery Trackers",
    description: "Working tools for daily habits, Realtor relationships, deal flow, theme days, time blocks, and greatness tracking.",
    cards: [],
  },
  "alliance-trackers": {
    eyebrow: "Member area",
    title: "Alliance Trackers",
    description: "Advanced working tools for partner strategy, database reactivation, content rhythm, production systems, and follow-up.",
    cards: [],
  },
  scripts: {
    eyebrow: "Member area",
    title: "LO Mastery Scripts",
    description: "Scenario-based scripts with copy buttons, usage notes, and practice prompts.",
    cards: [],
  },
  "alliance-scripts": {
    eyebrow: "Member area",
    title: "Alliance Scripts",
    description: "Advanced scripts for partner strategy, database reactivation, follow-up, and business development.",
    cards: [],
  },
  playbooks: {
    eyebrow: "Member area",
    title: "LO Mastery Playbooks",
    description: "Execution playbooks for time blocking, theme days, Realtor growth, buyer consults, and follow-up.",
    cards: [],
  },
  "alliance-playbooks": {
    eyebrow: "Member area",
    title: "Alliance Playbooks",
    description: "Advanced playbooks for systems, database reactivation, partner strategy, and weekly business planning.",
    cards: [],
  },
  community: {
    eyebrow: "Member area",
    title: "Community",
    description: "A focused member space for coaching prompts, questions, wins, scripts, and accountability conversation.",
    cards: [],
  },
  classroom: {
    eyebrow: "Member area",
    title: "LO Mastery Classroom",
    description: "LO Mastery lessons, practice prompts, assignments, and resource links.",
    cards: [],
  },
  "alliance-classroom": {
    eyebrow: "Member area",
    title: "Alliance Classroom",
    description: "Alliance lessons, assignments, advanced planning prompts, and resource links.",
    cards: [],
  },
  "alliance-resources": {
    eyebrow: "Member area",
    title: "Alliance Resources",
    description: "Alliance and shared Drive resources filtered for the advanced program.",
    cards: [],
  },
  calendar: {
    eyebrow: "Member area",
    title: "LO Mastery Calendar",
    description: "LO Mastery coaching calls, planning windows, review sessions, and key member rhythm dates.",
    cards: [],
  },
  "alliance-calendar": {
    eyebrow: "Member area",
    title: "Alliance Calendar",
    description: "Alliance coaching calls, planning windows, review sessions, and advanced business rhythm dates.",
    cards: [],
  },
  profile: {
    eyebrow: "Member area",
    title: "LO Mastery Profile",
    description: "LO Mastery member goals, program path, current focus, and review settings.",
    cards: [],
  },
  "alliance-profile": {
    eyebrow: "Member area",
    title: "Alliance Profile",
    description: "Alliance member goals, program path, current focus, and advanced coaching alignment.",
    cards: [],
  },
};

export const coachCommandPages: Record<string, RoutePage> = {
  members: {
    eyebrow: "Coach command center",
    title: "Members",
    description: "Coach-facing view of member progress, current focus, scorecard completion, and next coaching actions.",
    cards: [],
  },
  scorecards: {
    eyebrow: "Coach command center",
    title: "Scorecards",
    description: "Review member scorecards before coaching so the conversation starts with facts and action.",
    cards: [],
  },
  trackers: {
    eyebrow: "Coach command center",
    title: "Trackers",
    description: "Review daily execution, pipeline movement, partner touches, and follow-up activity.",
    cards: [],
  },
  notes: {
    eyebrow: "Coach command center",
    title: "Notes",
    description: "Coach notes for weekly calls, follow-up items, member obstacles, and next-step accountability.",
    cards: [],
  },
  community: {
    eyebrow: "Coach command center",
    title: "Community",
    description: "Coach-facing view of community prompts, unanswered questions, and member wins.",
    cards: [],
  },
};

export const managerPages: Record<string, RoutePage> = {
  coaches: {
    eyebrow: "Manager dashboard",
    title: "Coaches",
    description: "Manager view for coach assignments, review rhythm, member load, and follow-up visibility.",
    cards: [],
  },
  members: {
    eyebrow: "Manager dashboard",
    title: "Members",
    description: "Program-level view of members, active program, scorecard rhythm, and coaching engagement.",
    cards: [],
  },
  "program-status": {
    eyebrow: "Manager dashboard",
    title: "Program Status",
    description: "Executive-friendly program view for what is working, what needs attention, and what should be reviewed next.",
    cards: [],
  },
  reporting: {
    eyebrow: "Manager dashboard",
    title: "Reporting",
    description: "Simple reporting surface for coaching activity, scorecard completion, and member execution indicators.",
    cards: [],
  },
};

export const adminPages: Record<string, RoutePage> = {
  users: {
    eyebrow: "Admin",
    title: "Users",
    description: "Admin page for members, coaches, managers, and access visibility.",
    cards: [],
  },
  roles: {
    eyebrow: "Admin",
    title: "Roles",
    description: "Role model for platform review access, coaching operations, and member views.",
    cards: [],
  },
  programs: {
    eyebrow: "Admin",
    title: "Programs",
    description: "Admin page for LO Mastery and Loan Factory Alliance configuration review.",
    cards: [],
  },
  resources: {
    eyebrow: "Admin",
    title: "Resources",
    description: "Admin view for organizing script books, trackers, scorecards, PDFs, and lesson assets.",
    cards: [],
  },
  settings: {
    eyebrow: "Admin",
    title: "Settings",
    description: "Admin settings review page for local environment, program labels, and visible platform language.",
    cards: [],
  },
};

export function getRoutePage(
  pages: Record<string, RoutePage>,
  section: string,
) {
  return pages[section] ?? null;
}
