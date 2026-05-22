import { SkillLevel } from "@/lib/utils";

export type LearnerPath = {
  id: "beginner" | "intermediate" | "advanced";
  slug: string;
  title: string;
  tagline: string;
  goal: string;
  audience: string;
  level: SkillLevel;
  focus: string[];
  modules: { level: string; href: string; title: string }[];
  resources: { label: string; href: string }[];
  firstWeek: string[];
};

export const paths: LearnerPath[] = [
  {
    id: "beginner",
    slug: "beginner",
    title: "Start Here: New or Overwhelmed LO",
    tagline: "Start Here",
    goal: "Get your first simple weekly operating rhythm working.",
    audience:
      "New, overwhelmed, or non tech savvy loan officers who need one clear thing to do at a time.",
    level: "Beginner",
    focus: [
      "Confidently introduce yourself in 30 seconds.",
      "Run five real conversations a day.",
      "Send a clean first text to every new lead.",
      "Use one simple AI prompt to draft a follow up.",
      "Log conversations every day in a basic tracker.",
    ],
    modules: [
      {
        level: "101",
        href: "/101-foundation/",
        title: "101 Foundation. The Loan Factory Operating System.",
      },
    ],
    resources: [
      { label: "Broker value prop intro", href: "/scripts/#broker-value-prop-30s" },
      { label: "First text after a lead", href: "/scripts/#borrower-first-text" },
      { label: "First AI prompt (follow up email)", href: "/prompts/#follow-up-email" },
      { label: "Beginner roleplays", href: "/roleplays/" },
      { label: "Weekly tracker", href: "/tracker/" },
      { label: "Where to find your first 25 conversations", href: "/101-foundation/#first-conversations" },
      { label: "Beginner recommended channels", href: "/recommended-channels/#beginner" },
    ],
    firstWeek: [
      "Day 1. Update your LinkedIn or Google Business Profile photo, NMLS ID, brokerage, and contact link.",
      "Day 2. Practice the 30 second broker value prop out loud ten times.",
      "Day 3. Send three personalized past client texts. Not a blast.",
      "Day 4. Make a list of 25 people to start conversations with this week.",
      "Day 5. Run five real conversations. Log every one in the tracker.",
      "Friday. Sit down for the 15 minute production review with your team leader or coach.",
    ],
  },
  {
    id: "intermediate",
    slug: "intermediate",
    title: "Build Consistency: Working LO Growth Path",
    tagline: "Build Consistency",
    goal: "Turn inconsistent activity into repeatable production.",
    audience:
      "Working loan officers who understand the business but want better conversion, partner growth, content, and pipeline discipline.",
    level: "Intermediate",
    focus: [
      "Speed to lead.",
      "Better first calls with a 43 to 57 talk to listen ratio.",
      "Realtor outreach and follow up.",
      "Weekly content that builds local authority.",
      "Past client touches that lead to retention.",
      "Friday pipeline review.",
    ],
    modules: [
      {
        level: "201",
        href: "/201-borrower-conversion/",
        title: "201 Borrower Conversion.",
      },
      {
        level: "301",
        href: "/301-referral-partner-growth/",
        title: "301 Referral Partner Growth.",
      },
      {
        level: "401",
        href: "/401-content-and-marketing/",
        title: "401 Content and Marketing.",
      },
      {
        level: "501",
        href: "/501-pipeline-and-sales-systems/",
        title: "501 Pipeline and Sales Systems.",
      },
    ],
    resources: [
      { label: "Scripts (borrower, Realtor, partner, past client)", href: "/scripts/" },
      { label: "Roleplays", href: "/roleplays/" },
      { label: "Weekly tracker", href: "/tracker/" },
      { label: "AI Prompt Library", href: "/prompts/" },
      { label: "Intermediate recommended channels", href: "/recommended-channels/#intermediate" },
    ],
    firstWeek: [
      "Day 1. Record one borrower first call with consent and self score against the rubric.",
      "Day 2. Send five personalized Realtor outreaches with one specific detail each.",
      "Day 3. Record one 60 second video. Run it through the compliance decision tree before posting.",
      "Day 4. Run pipeline triage. Every active file gets a status and a dated next step.",
      "Day 5. Send 20 personalized past client touches across the week.",
      "Friday. 15 minute pipeline review. One specific change for next week.",
    ],
  },
  {
    id: "advanced",
    slug: "advanced",
    title: "Elite Execution: Advanced LO and Team Leader Path",
    tagline: "Elite Execution",
    goal: "Build a scalable sales, marketing, AI, and team operating system.",
    audience:
      "Strong producers, team leaders, coaches, and AI power users comfortable with prompt design, automations, and workflow building.",
    level: "Advanced",
    focus: [
      "Niche playbooks and 12 week campaign planning.",
      "Team leverage and accountability.",
      "AI workflow stack across prep, follow up, content, roleplay, and weekly review.",
      "Advanced content strategy and local authority.",
      "Referral partner campaigns by niche.",
      "Scorecards, coaching system, and certification.",
    ],
    modules: [
      {
        level: "501",
        href: "/501-pipeline-and-sales-systems/",
        title: "501 Pipeline and Sales Systems.",
      },
      {
        level: "601",
        href: "/601-elite-execution/",
        title: "601 Elite Execution.",
      },
    ],
    resources: [
      { label: "AI Prompt Library", href: "/prompts/" },
      { label: "Niche plan prompt", href: "/prompts/#niche-plan" },
      { label: "Pipeline review prompt", href: "/prompts/#pipeline-review" },
      { label: "Weekly summary prompt", href: "/prompts/#weekly-summary" },
      { label: "Coach Guide", href: "/coach-guide/" },
      { label: "Team Leader Guide", href: "/team-leader-guide/" },
      { label: "AI Coaching Assistant", href: "/ai-coaching-assistant/" },
      { label: "Advanced recommended channels", href: "/recommended-channels/#advanced" },
    ],
    firstWeek: [
      "Day 1. Pick one niche. Write the one sentence buyer persona.",
      "Day 2. Draft a one page 12 week plan with content cadence, partner targets, and benchmarks.",
      "Day 3. Pick one AI workflow to build first. Define inputs, outputs, and the LO review step.",
      "Day 4. Build your one page scorecard. Activity, conversion, retention, execution.",
      "Day 5. Run your team's Friday review using the 501 structure.",
      "Weekend. Pressure test the plan with a peer or coach. Cut what does not earn its place.",
    ],
  },
];

export function getPath(id: LearnerPath["id"]): LearnerPath {
  const p = paths.find((x) => x.id === id);
  if (!p) {
    throw new Error(`Unknown path id: ${id}`);
  }
  return p;
}
