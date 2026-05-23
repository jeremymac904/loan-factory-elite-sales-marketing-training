/**
 * Coaching Personality Quiz — for existing Loan Factory LOs and team members.
 *
 * NOT a clinical, employment, licensing, or underwriting assessment. This is
 * a coaching and development tool only. Output is a coaching profile and a
 * set of recommended training and team-leader actions.
 */

import type { ProfileId } from "./coachingProfiles";

export type QuizCategoryId =
  | "communication"
  | "motivation"
  | "learning"
  | "follow-through"
  | "sales-comfort"
  | "referral-partner"
  | "coaching-preference"
  | "content-marketing"
  | "ai-adoption"
  | "accountability";

export type QuizCategory = {
  id: QuizCategoryId;
  label: string;
  description: string;
};

export const personalityQuizCategories: QuizCategory[] = [
  { id: "communication", label: "Communication style", description: "How you naturally talk with borrowers and partners." },
  { id: "motivation", label: "Motivation style", description: "What actually moves you to act this week." },
  { id: "learning", label: "Learning style", description: "How you pick up a new script or system." },
  { id: "follow-through", label: "Follow-through pattern", description: "How you handle next steps after the call." },
  { id: "sales-comfort", label: "Sales comfort", description: "How you feel about closing language and the ask." },
  { id: "referral-partner", label: "Referral partner approach", description: "How you build and maintain referral relationships." },
  { id: "coaching-preference", label: "Coaching preference", description: "How you like to receive coaching feedback." },
  { id: "content-marketing", label: "Content & marketing confidence", description: "How you feel about being visible online." },
  { id: "ai-adoption", label: "AI adoption readiness", description: "How you feel about using AI in your daily workflow." },
  { id: "accountability", label: "Accountability needs", description: "How much structure you need to stay on plan." },
];

export type QuizOption = {
  /** Stable id within a question. */
  id: string;
  /** Visible label for the answer choice. */
  label: string;
  /**
   * Weights toward each coaching profile. Sum across all 4 keys typically equals
   * 4 (we use a 0-3 scale so we never punish an honest answer).
   */
  weights: Record<ProfileId, number>;
};

export type QuizQuestion = {
  id: string;
  category: QuizCategoryId;
  prompt: string;
  options: QuizOption[];
};

/**
 * Helper: build a 4-option question where each option leans heavily into one
 * profile but never zeroes the others out. This keeps the report honest when
 * an LO is a blend.
 */
const weights = (lead: ProfileId): Record<ProfileId, number> => {
  const base: Record<ProfileId, number> = {
    driver: 0,
    influencer: 0,
    steady: 0,
    conscientious: 0,
  };
  base[lead] = 3;
  // Light cross-weights so blended answers still register
  const blendMap: Record<ProfileId, ProfileId[]> = {
    driver: ["influencer", "conscientious"],
    influencer: ["driver", "steady"],
    steady: ["influencer", "conscientious"],
    conscientious: ["steady", "driver"],
  };
  for (const id of blendMap[lead]) base[id] = 1;
  return base;
};

export const personalityQuizQuestions: QuizQuestion[] = [
  /* communication */
  {
    id: "comm-1",
    category: "communication",
    prompt: "On a first borrower call, you naturally:",
    options: [
      { id: "a", label: "Cut to the goal and what they qualify for.", weights: weights("driver") },
      { id: "b", label: "Build rapport and get them excited about the move.", weights: weights("influencer") },
      { id: "c", label: "Ask about their situation and let them tell the story.", weights: weights("steady") },
      { id: "d", label: "Walk them through the numbers and the process step by step.", weights: weights("conscientious") },
    ],
  },
  {
    id: "comm-2",
    category: "communication",
    prompt: "Your written follow-up to a borrower usually:",
    options: [
      { id: "a", label: "One paragraph — what to do next, by when.", weights: weights("driver") },
      { id: "b", label: "Warm tone, story, plus what to do next.", weights: weights("influencer") },
      { id: "c", label: "Personal note plus a short list of next steps.", weights: weights("steady") },
      { id: "d", label: "A clean checklist with documents and links.", weights: weights("conscientious") },
    ],
  },
  /* motivation */
  {
    id: "mot-1",
    category: "motivation",
    prompt: "You feel most fired up when:",
    options: [
      { id: "a", label: "You hit a number and people see it.", weights: weights("driver") },
      { id: "b", label: "You get public recognition and the team is winning.", weights: weights("influencer") },
      { id: "c", label: "A long-term partner sends you a thank-you.", weights: weights("steady") },
      { id: "d", label: "You finish a hard file cleanly with zero rework.", weights: weights("conscientious") },
    ],
  },
  {
    id: "mot-2",
    category: "motivation",
    prompt: "A leaderboard with your name on it makes you feel:",
    options: [
      { id: "a", label: "Sharper. I want to win it.", weights: weights("driver") },
      { id: "b", label: "Excited. I want to celebrate with the team.", weights: weights("influencer") },
      { id: "c", label: "Mixed. I want progress, not pressure.", weights: weights("steady") },
      { id: "d", label: "Neutral. I care more about my own benchmarks.", weights: weights("conscientious") },
    ],
  },
  /* learning */
  {
    id: "learn-1",
    category: "learning",
    prompt: "When learning a new script, you prefer to:",
    options: [
      { id: "a", label: "Try it live and iterate.", weights: weights("driver") },
      { id: "b", label: "Talk it out with a coach and roleplay it.", weights: weights("influencer") },
      { id: "c", label: "Read it, sit with it, then practice quietly.", weights: weights("steady") },
      { id: "d", label: "Study the structure and rewrite it in my own words.", weights: weights("conscientious") },
    ],
  },
  /* follow-through */
  {
    id: "follow-1",
    category: "follow-through",
    prompt: "After a strong first call with a Realtor, you typically:",
    options: [
      { id: "a", label: "Send a quick text and schedule the next touch fast.", weights: weights("driver") },
      { id: "b", label: "Send a personal note and add them to your content rhythm.", weights: weights("influencer") },
      { id: "c", label: "Send a warm follow-up and slot them into your long-term cadence.", weights: weights("steady") },
      { id: "d", label: "Log the call notes in CRM and set a structured cadence.", weights: weights("conscientious") },
    ],
  },
  {
    id: "follow-2",
    category: "follow-through",
    prompt: "Your CRM is most often:",
    options: [
      { id: "a", label: "Working enough to hit my number.", weights: weights("driver") },
      { id: "b", label: "Behind — I rely on memory and energy more than the tool.", weights: weights("influencer") },
      { id: "c", label: "Steady and updated when I sit down for the week.", weights: weights("steady") },
      { id: "d", label: "Clean and structured, with tasks and notes.", weights: weights("conscientious") },
    ],
  },
  /* sales-comfort */
  {
    id: "sales-1",
    category: "sales-comfort",
    prompt: "Asking a borrower for the application:",
    options: [
      { id: "a", label: "Feels natural — I ask early.", weights: weights("driver") },
      { id: "b", label: "Feels natural once the relationship clicks.", weights: weights("influencer") },
      { id: "c", label: "Feels harder — I want them ready first.", weights: weights("steady") },
      { id: "d", label: "Feels fine once the numbers line up.", weights: weights("conscientious") },
    ],
  },
  {
    id: "sales-2",
    category: "sales-comfort",
    prompt: "Talking price and rate locks:",
    options: [
      { id: "a", label: "Direct. I tell them what to do.", weights: weights("driver") },
      { id: "b", label: "Conversational. I tie it to their goals.", weights: weights("influencer") },
      { id: "c", label: "Careful. I want to be fair and clear.", weights: weights("steady") },
      { id: "d", label: "Precise. I walk them through the numbers.", weights: weights("conscientious") },
    ],
  },
  /* referral-partner */
  {
    id: "ref-1",
    category: "referral-partner",
    prompt: "Your favorite kind of referral partner is:",
    options: [
      { id: "a", label: "A producer who decides fast.", weights: weights("driver") },
      { id: "b", label: "A relationship partner who wants to do events together.", weights: weights("influencer") },
      { id: "c", label: "A long-term partner who values trust over volume.", weights: weights("steady") },
      { id: "d", label: "A detailed partner who values cleanliness on files.", weights: weights("conscientious") },
    ],
  },
  {
    id: "ref-2",
    category: "referral-partner",
    prompt: "When a Realtor stops sending deals, you:",
    options: [
      { id: "a", label: "Call and ask what changed.", weights: weights("driver") },
      { id: "b", label: "Reach out warmly and invite them to coffee.", weights: weights("influencer") },
      { id: "c", label: "Stay patient and keep showing up.", weights: weights("steady") },
      { id: "d", label: "Review the file history first, then reach out.", weights: weights("conscientious") },
    ],
  },
  /* coaching-preference */
  {
    id: "coach-1",
    category: "coaching-preference",
    prompt: "The best coaching feedback for you sounds like:",
    options: [
      { id: "a", label: "'Here's the number. Hit it. Here is what to change.'", weights: weights("driver") },
      { id: "b", label: "'Great energy on that call. Here is one tweak.'", weights: weights("influencer") },
      { id: "c", label: "'I noticed you struggled here. Let's slow down and work on it.'", weights: weights("steady") },
      { id: "d", label: "'Here is the data on your conversion rate. Here is the gap.'", weights: weights("conscientious") },
    ],
  },
  /* content-marketing */
  {
    id: "content-1",
    category: "content-marketing",
    prompt: "Recording short-form video for FaceGram or Instagram feels:",
    options: [
      { id: "a", label: "Useful. I want it to drive leads.", weights: weights("driver") },
      { id: "b", label: "Fun. I am comfortable on camera.", weights: weights("influencer") },
      { id: "c", label: "Out of my comfort zone, but I'll do it if it helps.", weights: weights("steady") },
      { id: "d", label: "Better when I script and review before posting.", weights: weights("conscientious") },
    ],
  },
  {
    id: "content-2",
    category: "content-marketing",
    prompt: "Writing a blog or partner email is:",
    options: [
      { id: "a", label: "A waste of time unless it converts.", weights: weights("driver") },
      { id: "b", label: "Fine, but I'd rather talk it out and have AI clean it up.", weights: weights("influencer") },
      { id: "c", label: "Comfortable, if it feels personal.", weights: weights("steady") },
      { id: "d", label: "Comfortable when I have an outline.", weights: weights("conscientious") },
    ],
  },
  /* ai-adoption */
  {
    id: "ai-1",
    category: "ai-adoption",
    prompt: "When a new AI tool drops, you:",
    options: [
      { id: "a", label: "Try it now and figure it out fast.", weights: weights("driver") },
      { id: "b", label: "Ask a peer to walk through it with me.", weights: weights("influencer") },
      { id: "c", label: "Wait for a teammate to vet it.", weights: weights("steady") },
      { id: "d", label: "Read the docs first, then try it.", weights: weights("conscientious") },
    ],
  },
  {
    id: "ai-2",
    category: "ai-adoption",
    prompt: "Using AI to draft a borrower email is:",
    options: [
      { id: "a", label: "Fine — I edit fast and send.", weights: weights("driver") },
      { id: "b", label: "Great — I rewrite it in my voice.", weights: weights("influencer") },
      { id: "c", label: "Useful, but I always rewrite the personal lines.", weights: weights("steady") },
      { id: "d", label: "Only after I verify every fact and disclosure.", weights: weights("conscientious") },
    ],
  },
  /* accountability */
  {
    id: "acc-1",
    category: "accountability",
    prompt: "Your weekly plan tends to be:",
    options: [
      { id: "a", label: "A short list of targets in my head.", weights: weights("driver") },
      { id: "b", label: "Energy-driven — I follow the day.", weights: weights("influencer") },
      { id: "c", label: "Stable — same rhythm most weeks.", weights: weights("steady") },
      { id: "d", label: "A written plan with time blocks.", weights: weights("conscientious") },
    ],
  },
  {
    id: "acc-2",
    category: "accountability",
    prompt: "If your team leader sets a non-negotiable activity number, you:",
    options: [
      { id: "a", label: "Hit it and try to lead the board.", weights: weights("driver") },
      { id: "b", label: "Hit it and want to know how peers are doing.", weights: weights("influencer") },
      { id: "c", label: "Hit it once I trust the reason behind it.", weights: weights("steady") },
      { id: "d", label: "Hit it and track the data to see if it works.", weights: weights("conscientious") },
    ],
  },
];

export const personalityQuiz = {
  id: "coaching-personality" as const,
  /** Working name shown in UI. */
  name: "Coaching Personality Quiz",
  /** One-line description for landing copy. */
  tagline:
    "Find your coaching profile so we can match the right training, scripts, and team-leader support.",
  /** Time estimate shown to the LO. */
  timeEstimate: "About 5 minutes.",
  categories: personalityQuizCategories,
  questions: personalityQuizQuestions,
};

export type PersonalityQuiz = typeof personalityQuiz;
