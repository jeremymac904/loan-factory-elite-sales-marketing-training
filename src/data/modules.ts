import { ModuleStatus, SkillLevel } from "@/lib/utils";

export type ModuleSummary = {
  level: string;
  slug: string;
  href: string;
  title: string;
  theme: string;
  corePromise: string;
  audience: string;
  status: ModuleStatus;
  levels: SkillLevel[];
  doThisToday: string[];
  outcomes: string[];
  agenda?: { time: string; topic: string }[];
  trainingVideo?: {
    title: string;
    youtubeUrl: string;
    embedUrl: string;
    description: string;
  };
  topics: string[];
  assignment: string[];
  trackerMetrics: string[];
  coachNotes: string[];
  teamLeaderNotes: string[];
  complianceWatchOuts: string[];
  behaviorChange?: string;
};

export const modules: ModuleSummary[] = [
  {
    level: "101",
    slug: "101-foundation",
    href: "/101-foundation/",
    title: "101 Foundation: Build Your Daily Sales Rhythm",
    theme: "Mortgage sales foundation",
    corePromise:
      "By Friday, you have a simple daily plan that creates more real conversations.",
    audience:
      "Brand new loan officer or experienced LO who feels scattered and wants a simple weekly system.",
    status: "full",
    levels: ["Beginner"],
    doThisToday: [
      "Send five follow up texts to leads or past clients.",
      "Practice the 30 second broker value prop out loud twice.",
      "Log every real conversation you had today.",
    ],
    outcomes: [
      "Explain the Loan Factory broker model in plain English.",
      "Run a daily standard of 5 to 8 real conversations.",
      "Send a clean, compliant first text after a new lead.",
      "Use an AI prompt to draft a follow-up text in under a minute, then edit it.",
      "Track conversations, partner touches, and past client touches every day.",
    ],
    agenda: [
      { time: "0 to 3", topic: "Welcome. The 101 promise. Why this matters." },
      {
        time: "3 to 10",
        topic:
          "Sales math. Conversations to applications to closings. Work backward from your income goal.",
      },
      {
        time: "10 to 18",
        topic:
          "The Loan Factory broker value proposition in plain English.",
      },
      { time: "18 to 25", topic: "The daily activity standard." },
      { time: "25 to 32", topic: "The weekly operating rhythm." },
      {
        time: "32 to 40",
        topic: "First follow-up scripts and a live AI draft example.",
      },
      {
        time: "40 to 45",
        topic: "Weekly assignment, tracker, accountability partner.",
      },
    ],
    trainingVideo: {
      title: "Sales and Marketing 101 Training Video",
      youtubeUrl: "https://youtu.be/fdqe2poMc98",
      embedUrl: "https://www.youtube.com/embed/fdqe2poMc98",
      description:
        "Watch this training first, then use the scripts, prompts, roleplays, and tracker resources below to complete the 101 Foundation lesson.",
    },
    topics: [
      "Broker model positioning in plain English",
      "Why Loan Factory wins versus banks and retail lenders, without bashing competitors",
      "The first borrower conversation",
      "The first referral partner conversation",
      "Confidence without fake hype",
      "Scripts for the first call",
      "Daily activity tracking basics",
    ],
    assignment: [
      "Log 25 or more real conversations across the week.",
      "Update one professional channel (Google Business Profile or LinkedIn) with current photo, NMLS ID, brokerage, and contact link.",
      "Send three personalized past client texts. Not a blast. One sentence about them.",
      "Use the first-text AI prompt at least three times this week, then edit each draft.",
      "Submit one short note on what slowed you down most this week.",
    ],
    trackerMetrics: [
      "Conversations per day",
      "Past client touches per week",
      "Partner touches per week",
      "Content ideas captured for later use",
      "Friday review attended yes or no",
    ],
    coachNotes: [
      "Reinforce simple. Do not let a new LO jump to advanced tactics in week one.",
      "Watch for fake hype language and clean it up early.",
      "Celebrate completed reps publicly, even small ones. Behavior change beats theory.",
    ],
    teamLeaderNotes: [
      "Run a 15 minute Friday review with each LO on your team.",
      "Pair every new LO with an accountability partner inside the team.",
      "Pull the tracker every Monday. Flag anyone under 15 conversations in week one.",
    ],
    complianceWatchOuts: [
      "No rates, no payments, no specific fees in any 101 outbound message.",
      "NMLS ID must appear on every borrower facing message.",
      "Past client outreach about specific rate or payment terms requires Reg Z disclosures.",
    ],
    behaviorChange:
      "By Friday, the LO is running a daily activity standard and has at least 25 logged conversations.",
  },
  {
    level: "201",
    slug: "201-borrower-conversion",
    href: "/201-borrower-conversion/",
    title: "201 Borrower Conversion: Win the First Call",
    theme: "Borrower conversion and consultation structure",
    corePromise:
      "You turn more first conversations into clear next steps and completed applications.",
    audience: "Any LO with at least 30 days of LO experience.",
    status: "full",
    levels: ["Intermediate"],
    doThisToday: [
      "Run one first call using the High Trust Intake.",
      "Ask better questions, not more questions. Target 15 to 16 quality questions.",
      "Set a dated next step before you end the call.",
    ],
    outcomes: [
      "Run a structured first call that builds trust in 15 minutes.",
      "Hit a 43:57 talk to listen ratio.",
      "Redirect rate and fee questions without teaser talk.",
      "Always end the call with a dated next step.",
      "Use an AI pre-call brief before important first calls.",
    ],
    topics: [
      "The borrower journey",
      "High trust discovery questions",
      "Pain point questions",
      "Talk to listen ratio (target 43:57)",
      "Explaining options as paths, not specific rates",
      "Moving from conversation to application",
      "Follow up the same day",
    ],
    assignment: [
      "Record three real first calls with borrower consent.",
      "Self score each call using the first call rubric (open, questions, talk ratio, plan summary, next step).",
      "Submit one written call recap.",
      "Use the AI pre-call brief prompt before every recorded practice call.",
    ],
    trackerMetrics: [
      "Pre qual to app conversion rate",
      "First call talk to listen ratio (estimated)",
      "Average questions asked per first call",
      "Recorded calls submitted this week",
    ],
    coachNotes: [
      "Coach to talk to listen ratio and question quality, not the exact script.",
      "Pull two first calls per LO per week and score together.",
      "Per Gong 2025, winners ask 15 to 16 questions. Losers ask about 20. Coach for quality, not volume.",
    ],
    teamLeaderNotes: [
      "Build a weekly first call review block on the team calendar.",
      "Identify the bottom 20% on talk ratio and pair them with peer coaches.",
    ],
    complianceWatchOuts: [
      "No teaser rates in any borrower facing artifact.",
      "Avoid promises about closing dates or guarantees.",
      "Reg Z triggering terms list reviewed before any printed or posted material.",
    ],
    behaviorChange:
      "LO talk to listen ratio moves toward the 43:57 golden ratio. Question quality improves week over week.",
  },
  {
    level: "301",
    slug: "301-referral-partner-growth",
    href: "/301-referral-partner-growth/",
    title: "301 Referral Partner Growth: Build Stronger Realtor Relationships",
    theme: "Referral partner growth",
    corePromise: "You build a repeatable plan for new Realtor and referral partner conversations.",
    audience: "Any LO with a stable borrower process.",
    status: "full",
    levels: ["Intermediate", "Advanced", "Compliance Review"],
    doThisToday: [
      "Pick five priority Realtors from your market.",
      "Send three personalized outreaches with one specific detail in each.",
      "Book one 15 minute conversation this week.",
    ],
    outcomes: [
      "Build a list of 25 priority partners with public research.",
      "Send personalized outreach in waves of 5 per week.",
      "Run a clean first partner meeting.",
      "Make a confident listing agent call on every offer.",
      "Stay clear of RESPA Section 8 risk.",
    ],
    topics: [
      "Realtor partner psychology",
      "What Realtors actually care about (speed, communication, closing certainty)",
      "CPA, financial advisor, builder, divorce attorney opportunities",
      "The first outreach message",
      "The follow up sequence",
      "The partner value offer",
      "Partner meeting structure",
      "Co marketing inside RESPA",
    ],
    assignment: [
      "Build a list of 25 potential referral partners with public research notes.",
      "Send 10 personalized partner outreaches this week.",
      "Book at least one new partner conversation.",
      "Make at least one listing agent call on an active file.",
    ],
    trackerMetrics: [
      "New partner outreaches this week",
      "Partner meetings booked",
      "Partner meetings held",
      "Active deals sourced from named partners",
    ],
    coachNotes: [
      "Watch for desperate language. No begging.",
      "Never bash competitors. Lead with what we do, not what they do not do.",
      "Push the LO to pick five priority partners, not a list of fifty.",
    ],
    teamLeaderNotes: [
      "Review partner pipeline weekly.",
      "Verify each LO has five named priority partners.",
      "Approve any co marketing artifact before the LO sends it.",
    ],
    complianceWatchOuts: [
      "RESPA Section 8 applies. No things of value in exchange for referrals.",
      "Co marketing only with documented pro rata share, both parties paying.",
      "No gift cards, paid subscriptions, or paid event tickets tied to referrals.",
      "Any new MSA structure requires corporate approval.",
    ],
    behaviorChange:
      "LO has 5 named priority partners and at least one active deal sourced from one of them.",
  },
  {
    level: "401",
    slug: "401-content-and-marketing",
    href: "/401-content-and-marketing/",
    title: "401 Content and Marketing: Be Easier to Find and Trust",
    theme: "Content and authority marketing",
    corePromise:
      "You build a local presence that helps borrowers and Realtors understand what you do.",
    audience: "Any LO ready to be visible.",
    status: "full",
    levels: ["Intermediate", "Advanced", "Compliance Review"],
    doThisToday: [
      "Record one 60 second video on your phone using the hook then example then CTA structure.",
      "Publish one Google Business Profile post about a local market detail.",
      "Run the compliance safe content decision tree before you publish anything.",
    ],
    outcomes: [
      "Pick one content pillar that matches your market.",
      "Master five hook patterns for short form video.",
      "Build a fully optimized Google Business Profile.",
      "Publish at a sustainable weekly cadence.",
      "Pass the compliance safe content decision tree before every post.",
    ],
    topics: [
      "Personal brand and one content pillar",
      "Short form video hooks (5 patterns)",
      "60 second video template",
      "Compliant social posts",
      "Google Business Profile build and weekly post",
      "Monthly email newsletter",
      "Repurposing one topic across six channels",
      "Compliance safe content decision tree",
    ],
    assignment: [
      "Post three short videos this week.",
      "Complete your Google Business Profile build checklist.",
      "Draft and schedule your monthly newsletter.",
      "Run every piece through the compliance safe content decision tree before publishing.",
    ],
    trackerMetrics: [
      "Short videos posted per week",
      "Google Business Profile posts per week",
      "Reviews requested and received this month",
      "Newsletter sent yes or no",
      "Pieces flagged in compliance review",
    ],
    coachNotes: [
      "Do not let LOs publish anything that mentions a specific rate, payment, down payment dollar amount, or fee dollar amount without disclosures.",
      "Coach to one pillar, not three. Focus beats variety in the first 30 days.",
    ],
    teamLeaderNotes: [
      "Review each new LO's first three posts before publish for the first 30 days.",
      "Track GBP completeness percentage across the team.",
    ],
    complianceWatchOuts: [
      "Reg Z triggering terms (specific down payment, payment period, specific payment, specific finance charge) trigger full disclosures.",
      "NMLS ID must appear on every social profile and every post that promotes credit.",
      "Equal Housing logo where required.",
      "No superlatives like best rate or guaranteed approval.",
      "No unverified comparisons to named competitors.",
    ],
    behaviorChange:
      "LO has a real digital footprint a borrower or Realtor can find on day one of a search.",
  },
  {
    level: "501",
    slug: "501-pipeline-and-sales-systems",
    href: "/501-pipeline-and-sales-systems/",
    title: "501 Pipeline and Follow-Up: Stay in Control",
    theme: "Follow up, pipeline, and database discipline",
    corePromise: "You stop losing opportunities because follow-up got messy.",
    audience: "Producer or experienced LO.",
    status: "summary",
    levels: ["Intermediate", "Advanced"],
    doThisToday: [
      "Review every active file in your pipeline.",
      "Assign each file a status and a dated next step.",
      "Send one proactive status update to a borrower or Realtor on an active file.",
    ],
    outcomes: [
      "Run a 15 minute Friday production review every week.",
      "Hold every active file at one of four statuses with a dated next step.",
      "Segment past clients and run a real touch routine.",
      "Use AI prompts to draft personal past-client and follow-up messages, then edit them.",
      "Build a more consistent past-client follow-up routine.",
    ],
    topics: [
      "Pipeline stages (hot, warm, watch, dead)",
      "Speed to lead",
      "Pre approval follow up",
      "Realtor weekly proactive status updates",
      "Past client touch plan by tenure",
      "Weekly pipeline review (15 minutes)",
      "AI-assisted follow up",
      "Pipeline and tracker discipline",
    ],
    assignment: [
      "Clean your pipeline. Every file has a status and a dated next step.",
      "Segment your past client list by tenure (0 to 12 months, 1 to 3 years, 3+ years).",
      "Send 20 personalized past client touches this week.",
      "Run one full Friday pipeline review with your team leader or coach.",
    ],
    trackerMetrics: [
      "Pipeline hygiene score",
      "Past client touches per week",
      "Refi or repeat conversations started",
      "Pre approval to app to close conversion percentages",
      "Active files without a dated next step",
    ],
    coachNotes: [
      "Audit two pipelines per coach session.",
      "Coach the LO out of silence. Weekly status updates protect the deal.",
    ],
    teamLeaderNotes: [
      "Use the 501 weekly review as the team meeting structure.",
      "Pull the team pipeline hygiene score every Friday.",
    ],
    complianceWatchOuts: [
      "Past client outreach about specific rate or payment terms is a Reg Z advertisement and requires disclosures.",
      "No claims about guaranteed savings or guaranteed approvals.",
    ],
    behaviorChange:
      "LO has a cleaner pipeline, fewer missing next steps, and a steadier past-client touch plan.",
  },
  {
    level: "601",
    slug: "601-elite-execution",
    href: "/601-elite-execution/",
    title: "601 Execution System: Build Your Niche Plan",
    theme: "Execution system",
    corePromise:
      "You leave with a written 12-week plan and a simple set of AI prompts you can actually use.",
    audience: "Producer, team leader, or corporate coach.",
    status: "summary",
    levels: ["Advanced", "Team Leader", "Coach"],
    doThisToday: [
      "Pick one niche and commit to it for the next 90 days.",
      "Draft your 12 week plan in one page. No more.",
      "Choose one AI prompt routine to build first and document what goes in and what should come out.",
    ],
    outcomes: [
      "Pick one niche and write a 12 week plan.",
      "Use AI prompts across prep, follow-up, content, roleplay, and weekly review.",
      "Build a one page weekly scorecard.",
      "Submit a partner roster of five named priority partners.",
      "Earn the Loan Factory Sales and Marketing 101-601 completion badge.",
    ],
    topics: [
      "Niche strategy (self employed, VA, first time buyer, investor, divorce, builder)",
      "90 day campaign plan tied to niche",
      "Weekly sales, marketing, partner, pipeline rhythm",
      "Scorecard review",
      "AI prompt routine",
      "Team leader accountability",
      "Next 90 day plan",
      "Certification requirements",
    ],
    assignment: [
      "Submit your 12 week niche plan.",
      "Submit your AI prompt checklist with at least six useful prompts.",
      "Build your one page weekly scorecard.",
      "Submit your partner roster (five named priority partners).",
      "Submit two final recorded first calls scored above rubric threshold.",
    ],
    trackerMetrics: [
      "12 week plan submitted",
      "AI prompt routine logged",
      "Scorecard built",
      "Niche pre quals started",
      "Niche referral partner meetings held",
    ],
    coachNotes: [
      "Push the LO to pick one niche, not three.",
      "Push the LO toward a written plan, not another idea list.",
    ],
    teamLeaderNotes: [
      "Review niche plans with the team and identify shared assets.",
      "Promote certified LOs into peer coach roles.",
    ],
    complianceWatchOuts: [
      "All niche marketing reviewed before publish.",
      "Co marketing inside RESPA. Pro rata only.",
    ],
    behaviorChange:
      "LO operates with a written plan and a measurable weekly scorecard.",
  },
];

export function findModule(slug: string): ModuleSummary | undefined {
  return modules.find((m) => m.slug === slug);
}
