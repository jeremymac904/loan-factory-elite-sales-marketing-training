/**
 * New LO Aptitude & Personality Quiz.
 *
 * For newer Loan Factory LOs in the first 0-180 days. Measures readiness
 * across 11 development categories and outputs a development-stage profile
 * plus a personality lean.
 *
 * NOT a clinical, employment, licensing, or underwriting assessment. Coaching
 * and development only.
 */

import type { ProfileId } from "./coachingProfiles";
import type { NewLoReadinessId } from "./coachingProfiles";

export type AptitudeCategoryId =
  | "sales-readiness"
  | "learning-speed"
  | "script-comfort"
  | "phone-comfort"
  | "partner-mindset"
  | "process-discipline"
  | "tech-comfort"
  | "ai-readiness"
  | "marketing-confidence"
  | "compliance-awareness"
  | "accountability";

export type AptitudeCategory = {
  id: AptitudeCategoryId;
  label: string;
  /** Short coaching description. */
  description: string;
};

export const aptitudeCategories: AptitudeCategory[] = [
  { id: "sales-readiness", label: "Sales readiness", description: "Comfort being in a sales role, not just an order-taker." },
  { id: "learning-speed", label: "Learning speed", description: "How quickly you can take a script from training to live use." },
  { id: "script-comfort", label: "Script comfort", description: "How natural scripts feel in your own voice." },
  { id: "phone-comfort", label: "Phone comfort", description: "How comfortable you are picking up the phone cold." },
  { id: "partner-mindset", label: "Referral partner mindset", description: "How you think about Realtors and CPAs as long-term partners." },
  { id: "process-discipline", label: "Process discipline", description: "How well you follow the loan process and CRM cadence." },
  { id: "tech-comfort", label: "Tech comfort", description: "How comfortable you are with new tools and platforms." },
  { id: "ai-readiness", label: "AI readiness", description: "How open you are to using AI to do your job better." },
  { id: "marketing-confidence", label: "Marketing confidence", description: "How comfortable you are being visible online." },
  { id: "compliance-awareness", label: "Compliance awareness", description: "How carefully you handle disclosures and language." },
  { id: "accountability", label: "Accountability", description: "How well you stay on plan without daily reminders." },
];

/**
 * Each answer maps to a readiness score (0-3) for the relevant category, and
 * a light personality lean toward a coaching profile. Readiness drives the
 * development stage profile; personality lean is a tiebreaker for tone in the
 * report.
 */
export type AptitudeOption = {
  id: string;
  label: string;
  /** 0 = needs the most coaching, 3 = ready to run. */
  readiness: 0 | 1 | 2 | 3;
  /** Optional personality lean (any one profile). Many answers leave this empty. */
  personalityLean?: ProfileId;
};

export type AptitudeQuestion = {
  id: string;
  category: AptitudeCategoryId;
  prompt: string;
  options: AptitudeOption[];
};

export const aptitudeQuestions: AptitudeQuestion[] = [
  /* sales-readiness */
  {
    id: "sr-1",
    category: "sales-readiness",
    prompt: "When someone asks 'what do you do?' you say:",
    options: [
      { id: "a", label: "I'm a loan officer — I help people get into homes.", readiness: 3, personalityLean: "influencer" },
      { id: "b", label: "I work at Loan Factory in mortgages.", readiness: 2, personalityLean: "steady" },
      { id: "c", label: "I'm in mortgages, but I'm still figuring it out.", readiness: 1, personalityLean: "conscientious" },
      { id: "d", label: "I haven't really practiced answering that.", readiness: 0 },
    ],
  },
  {
    id: "sr-2",
    category: "sales-readiness",
    prompt: "The word 'sales' makes you feel:",
    options: [
      { id: "a", label: "Comfortable — I like helping people decide.", readiness: 3, personalityLean: "driver" },
      { id: "b", label: "Comfortable, if it's framed as service.", readiness: 2, personalityLean: "steady" },
      { id: "c", label: "Mixed — I want to be helpful but not pushy.", readiness: 1, personalityLean: "conscientious" },
      { id: "d", label: "A little uneasy.", readiness: 0 },
    ],
  },
  /* learning-speed */
  {
    id: "ls-1",
    category: "learning-speed",
    prompt: "Given a new script today, you could use it live:",
    options: [
      { id: "a", label: "Today — I'd just try it.", readiness: 3, personalityLean: "driver" },
      { id: "b", label: "This week, after a quick roleplay.", readiness: 2, personalityLean: "influencer" },
      { id: "c", label: "Next week, after I rewrite it in my voice.", readiness: 1, personalityLean: "steady" },
      { id: "d", label: "A few weeks, after I study it.", readiness: 0, personalityLean: "conscientious" },
    ],
  },
  /* script-comfort */
  {
    id: "sc-1",
    category: "script-comfort",
    prompt: "Reading a script word-for-word on a live call sounds:",
    options: [
      { id: "a", label: "Fine — I can make it feel natural fast.", readiness: 3, personalityLean: "influencer" },
      { id: "b", label: "Okay for the first few times.", readiness: 2 },
      { id: "c", label: "Awkward — I need to internalize it first.", readiness: 1, personalityLean: "steady" },
      { id: "d", label: "Hard — I'd rather not.", readiness: 0 },
    ],
  },
  /* phone-comfort */
  {
    id: "pc-1",
    category: "phone-comfort",
    prompt: "Picking up the phone to a stranger feels:",
    options: [
      { id: "a", label: "Easy — I prefer the phone to email.", readiness: 3, personalityLean: "driver" },
      { id: "b", label: "Fine once I have a reason to call.", readiness: 2, personalityLean: "influencer" },
      { id: "c", label: "Manageable, but I prep first.", readiness: 1, personalityLean: "conscientious" },
      { id: "d", label: "Heavy — I push it later in the day.", readiness: 0 },
    ],
  },
  {
    id: "pc-2",
    category: "phone-comfort",
    prompt: "Daily outbound calls in your first 30 days:",
    options: [
      { id: "a", label: "Bring it on. I want a number.", readiness: 3, personalityLean: "driver" },
      { id: "b", label: "Doable, with a coach checking in.", readiness: 2, personalityLean: "influencer" },
      { id: "c", label: "Hard, but I'll do it if it's clear.", readiness: 1, personalityLean: "steady" },
      { id: "d", label: "Stressful — I'd want to ease in.", readiness: 0 },
    ],
  },
  /* partner-mindset */
  {
    id: "pm-1",
    category: "partner-mindset",
    prompt: "When you think about Realtors you:",
    options: [
      { id: "a", label: "Want a few strong long-term partners.", readiness: 3, personalityLean: "steady" },
      { id: "b", label: "Want to network broadly and see what sticks.", readiness: 2, personalityLean: "influencer" },
      { id: "c", label: "Feel uncertain about how to start.", readiness: 1 },
      { id: "d", label: "Hope referrals will come organically.", readiness: 0 },
    ],
  },
  /* process-discipline */
  {
    id: "pd-1",
    category: "process-discipline",
    prompt: "Following a daily CRM cadence sounds:",
    options: [
      { id: "a", label: "Natural — I love a clean system.", readiness: 3, personalityLean: "conscientious" },
      { id: "b", label: "Doable, with a checklist.", readiness: 2, personalityLean: "steady" },
      { id: "c", label: "Boring, but I'll do it.", readiness: 1, personalityLean: "driver" },
      { id: "d", label: "Hard — I want to do the work, not the admin.", readiness: 0, personalityLean: "influencer" },
    ],
  },
  /* tech-comfort */
  {
    id: "tc-1",
    category: "tech-comfort",
    prompt: "A new platform (LOS, CRM, AI tool) lands. You:",
    options: [
      { id: "a", label: "Open it now and click around.", readiness: 3, personalityLean: "driver" },
      { id: "b", label: "Watch a 5-minute video and try it.", readiness: 2, personalityLean: "influencer" },
      { id: "c", label: "Wait for the team rollout.", readiness: 1, personalityLean: "steady" },
      { id: "d", label: "Read the docs end to end first.", readiness: 0, personalityLean: "conscientious" },
    ],
  },
  /* ai-readiness */
  {
    id: "ai-1",
    category: "ai-readiness",
    prompt: "AI in your daily work feels:",
    options: [
      { id: "a", label: "Like an unfair advantage — I'm using it daily.", readiness: 3, personalityLean: "driver" },
      { id: "b", label: "Useful for drafting, scripts, and content.", readiness: 2, personalityLean: "influencer" },
      { id: "c", label: "Promising, but I want guardrails first.", readiness: 1, personalityLean: "conscientious" },
      { id: "d", label: "Unfamiliar — I have not tried it yet.", readiness: 0 },
    ],
  },
  /* marketing-confidence */
  {
    id: "mc-1",
    category: "marketing-confidence",
    prompt: "Posting a short video of yourself talking about loans:",
    options: [
      { id: "a", label: "I already do this or want to start.", readiness: 3, personalityLean: "influencer" },
      { id: "b", label: "Doable with practice.", readiness: 2 },
      { id: "c", label: "Out of comfort zone, but I see the value.", readiness: 1, personalityLean: "steady" },
      { id: "d", label: "I'd rather not be on camera.", readiness: 0, personalityLean: "conscientious" },
    ],
  },
  /* compliance-awareness */
  {
    id: "ca-1",
    category: "compliance-awareness",
    prompt: "When you write a marketing post about rates, you:",
    options: [
      { id: "a", label: "Run it through compliance before posting.", readiness: 3, personalityLean: "conscientious" },
      { id: "b", label: "Stick to approved language.", readiness: 2, personalityLean: "steady" },
      { id: "c", label: "Wing it and tweak if asked.", readiness: 1, personalityLean: "influencer" },
      { id: "d", label: "Have not had to think about it yet.", readiness: 0 },
    ],
  },
  {
    id: "ca-2",
    category: "compliance-awareness",
    prompt: "If a borrower asks for advice that feels outside your lane, you:",
    options: [
      { id: "a", label: "Tell them I'll loop the right person and follow up.", readiness: 3, personalityLean: "conscientious" },
      { id: "b", label: "Answer at a high level and confirm with a teammate.", readiness: 2, personalityLean: "steady" },
      { id: "c", label: "Give it my best guess to keep momentum.", readiness: 1, personalityLean: "driver" },
      { id: "d", label: "Avoid answering and hope it does not come back.", readiness: 0 },
    ],
  },
  /* accountability */
  {
    id: "acc-1",
    category: "accountability",
    prompt: "Without a daily check-in, you usually:",
    options: [
      { id: "a", label: "Still hit my number.", readiness: 3, personalityLean: "driver" },
      { id: "b", label: "Drift a little but recover.", readiness: 2, personalityLean: "influencer" },
      { id: "c", label: "Stay steady on what I already know.", readiness: 1, personalityLean: "steady" },
      { id: "d", label: "Lose my plan halfway through the week.", readiness: 0 },
    ],
  },
  {
    id: "acc-2",
    category: "accountability",
    prompt: "Your favorite kind of coach is:",
    options: [
      { id: "a", label: "A score-keeper who pushes me to hit numbers.", readiness: 3, personalityLean: "driver" },
      { id: "b", label: "A motivator who celebrates wins out loud.", readiness: 2, personalityLean: "influencer" },
      { id: "c", label: "A steady mentor I can trust.", readiness: 1, personalityLean: "steady" },
      { id: "d", label: "A teacher who explains the why behind the work.", readiness: 1, personalityLean: "conscientious" },
    ],
  },
];

/**
 * Readiness banding used by the scoring engine. Numbers are the average
 * readiness score (0-3) across all answered questions.
 */
export const aptitudeReadinessBands: {
  min: number;
  max: number;
  profileId: NewLoReadinessId;
}[] = [
  { min: 0, max: 0.99, profileId: "foundation-builder" },
  { min: 1, max: 1.74, profileId: "coachable-climber" },
  { min: 1.75, max: 2.34, profileId: "confident-starter" },
  { min: 2.35, max: 3, profileId: "ready-producer" },
];

export const newLoAptitudeQuiz = {
  id: "new-lo-aptitude" as const,
  name: "New LO Aptitude & Personality Quiz",
  tagline:
    "Get a development stage, a 30-day focus, first scripts to practice, and your team leader notes.",
  timeEstimate: "About 6 minutes.",
  categories: aptitudeCategories,
  questions: aptitudeQuestions,
  readinessBands: aptitudeReadinessBands,
};

export type NewLoAptitudeQuiz = typeof newLoAptitudeQuiz;
