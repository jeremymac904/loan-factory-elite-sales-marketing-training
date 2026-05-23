/**
 * Coaching profiles for the Loan Factory LO Development Platform.
 *
 * These are working coaching/development archetypes inspired by general
 * DISC-style communication concepts and Loan Factory's existing
 * personality-workshop framing. They are NOT a clinical, employment,
 * licensing, or underwriting assessment. They are used to help coaches
 * and team leaders adapt their coaching, training, and support to each
 * loan officer.
 */

export type ProfileId = "driver" | "influencer" | "steady" | "conscientious";

export type CoachingProfile = {
  id: ProfileId;
  /** Short, plain-English label used in headlines and reports. */
  shortName: string;
  /** Full coaching profile name. */
  name: string;
  /** Short one-line tag. */
  tagline: string;
  /** Color tied to LF palette only (orange or grayscale). */
  accent: "orange" | "charcoal" | "slate" | "navy";
  /** Plain English summary, 2-3 sentences. */
  summary: string;
  /** How this LO tends to communicate. */
  communicationStyle: string;
  /** How they tend to be motivated. */
  motivationStyle: string;
  /** How they tend to learn best. */
  learningStyle: string;
  /** Top strengths in the LO role. */
  strengths: string[];
  /** Common blind spots when uncoached. */
  blindSpots: string[];
  /** Concrete coaching recommendations for the LO themselves. */
  coachingRecommendations: string[];
  /** What kind of training path tends to land for this profile. */
  bestTrainingPath: string;
  /** How a coach or team leader should communicate with this profile. */
  bestCommunicationStyle: string;
  /** Suggested scripts/resources inside the platform. */
  suggestedResources: { label: string; href: string }[];
  /** Notes specifically for a team leader / coach reviewing this profile. */
  teamLeaderNotes: string[];
};

export const coachingProfiles: Record<ProfileId, CoachingProfile> = {
  driver: {
    id: "driver",
    shortName: "Driver",
    name: "The Driver LO",
    tagline: "Direct, decisive, results-oriented.",
    accent: "orange",
    summary:
      "You move fast, you decide fast, and you measure yourself in outcomes. You want clear targets, short conversations, and a clean shot at the goal.",
    communicationStyle:
      "Short, direct, results-first. You skip small talk and want to get to the point quickly.",
    motivationStyle:
      "You are motivated by results, leaderboards, comparison, and clear targets.",
    learningStyle:
      "You learn by doing. You want the script, the call, the deal, and the feedback loop, not a long intro lecture.",
    strengths: [
      "Decisiveness on price, structure, and next step.",
      "Comfortable making the ask on the call.",
      "Strong at hitting a daily activity number.",
      "Clean follow-up cadence when accountability is clear.",
    ],
    blindSpots: [
      "Can come across as transactional with borrowers and partners.",
      "Can underuse discovery and skip listening.",
      "Can resist long content or training sessions.",
      "Can churn on the team if direction feels unclear or weak.",
    ],
    coachingRecommendations: [
      "Slow down discovery on the first borrower call by one or two questions.",
      "Use a written follow-up cadence so urgency does not burn out partners.",
      "Pair short content blasts with one-to-one referral partner work.",
      "Set a daily activity target and review it weekly with a coach.",
    ],
    bestTrainingPath:
      "Sales & Marketing 201 (Borrower Conversion) followed by 501 (Pipeline and Sales Systems), then targeted referral partner roleplays.",
    bestCommunicationStyle:
      "Lead with the result. Give the LO the goal, the constraint, and the deadline. Avoid long preambles and explanations.",
    suggestedResources: [
      { label: "Borrower Conversion (201)", href: "/201-borrower-conversion/" },
      { label: "Pipeline and Sales Systems (501)", href: "/501-pipeline-and-sales-systems/" },
      { label: "Sales Roleplays", href: "/roleplays/" },
      { label: "Scripts Library", href: "/scripts/" },
    ],
    teamLeaderNotes: [
      "Default to short, direct check-ins. No long preambles.",
      "Hold a weekly results review with a clear activity number.",
      "Pair them with a Steady or Conscientious teammate on long-tail follow-up.",
      "Be alert to burn-out signals — Drivers grind quietly.",
    ],
  },
  influencer: {
    id: "influencer",
    shortName: "Influencer",
    name: "The Influencer LO",
    tagline: "Relational, persuasive, energy-driven.",
    accent: "orange",
    summary:
      "You build relationships fast, you tell stories well, and you naturally turn conversations into opportunities. Your edge is people, voice, and energy.",
    communicationStyle:
      "Warm, conversational, story-driven. You build rapport quickly on the phone and on video.",
    motivationStyle:
      "You are motivated by recognition, wins, audience response, and being part of a strong team.",
    learningStyle:
      "You learn by talking it out, riding along on calls, and getting fast feedback from a coach.",
    strengths: [
      "Strong borrower rapport on the first call.",
      "Comfortable on video, content, and live events.",
      "Easy to introduce to a new referral partner.",
      "Resilient through hard markets when team energy is strong.",
    ],
    blindSpots: [
      "Can over-promise on the call and create operational pressure.",
      "Can drop follow-up tasks when energy moves to a new lead.",
      "Can resist process or CRM discipline.",
      "Can lean on charm instead of structure when pipeline gets noisy.",
    ],
    coachingRecommendations: [
      "Use a written checklist after every borrower call to lock in next steps.",
      "Run a daily 10 minute CRM clean-up before opening new conversations.",
      "Practice the 'one more clarifying question' habit before quoting.",
      "Use AI Twin and content tools to scale your voice, not replace your follow-up.",
    ],
    bestTrainingPath:
      "Sales & Marketing 401 (Content & Marketing) followed by 301 (Referral Partner Growth), then pipeline discipline coaching.",
    bestCommunicationStyle:
      "Lead with relationship and recognition. Be specific about wins, and pair encouragement with one concrete next step.",
    suggestedResources: [
      { label: "Content & Marketing (401)", href: "/401-content-and-marketing/" },
      { label: "Referral Partner Growth (301)", href: "/301-referral-partner-growth/" },
      { label: "FaceGram Creator Network", href: "/creator-network/" },
      { label: "AI Assistants", href: "/ai-assistants/" },
    ],
    teamLeaderNotes: [
      "Keep them visible — public recognition lands and lifts the floor.",
      "Pair them with a Conscientious teammate or ops partner for follow-through.",
      "Coach the gap between 'commitment made on the call' and 'CRM next step'.",
      "Use them to onboard new LOs — they raise team energy fast.",
    ],
  },
  steady: {
    id: "steady",
    shortName: "Steady",
    name: "The Steady LO",
    tagline: "Patient, loyal, relationship-anchored.",
    accent: "charcoal",
    summary:
      "You build long-term trust, you protect your relationships, and you finish what you start. Your edge is reliability and depth, not noise.",
    communicationStyle:
      "Calm, patient, and listener-first. You take time to understand the situation before offering a path.",
    motivationStyle:
      "You are motivated by stable relationships, long-term partners, and helping people through hard situations.",
    learningStyle:
      "You learn best with a clear path, time to practice, and a coach who is patient with the rep cycle.",
    strengths: [
      "Strong long-term referral partner relationships.",
      "High borrower trust on complicated files.",
      "Reliable follow-through on commitments.",
      "Calm operator during stressful underwriting cycles.",
    ],
    blindSpots: [
      "Can avoid uncomfortable price or structure conversations.",
      "Can under-prospect when the pipeline already feels 'safe'.",
      "Can resist a sudden change in process or platform.",
      "Can over-personalize a bad outcome.",
    ],
    coachingRecommendations: [
      "Set a weekly outbound activity number and protect it like a calendar block.",
      "Practice price and structure language until it feels neutral, not personal.",
      "Lean on 101 and 201 scripts so the ask is not improvised.",
      "Use AI tools to handle drafting and free up time for partner conversations.",
    ],
    bestTrainingPath:
      "Sales & Marketing 101 (Foundation) and 201 (Borrower Conversion) with extra roleplay reps, then 301 (Referral Partner Growth).",
    bestCommunicationStyle:
      "Lead with patience and continuity. Explain the why behind the change, give time to adjust, and reassure on relationships.",
    suggestedResources: [
      { label: "Foundation (101)", href: "/101-foundation/" },
      { label: "Borrower Conversion (201)", href: "/201-borrower-conversion/" },
      { label: "Roleplays", href: "/roleplays/" },
      { label: "Coach Guide", href: "/coach-guide/" },
    ],
    teamLeaderNotes: [
      "Avoid abrupt priority changes — telegraph them early.",
      "Use one-to-one coaching conversations, not public callouts.",
      "Protect their existing partner relationships during any role or pod change.",
      "Hold a clear weekly minimum on outbound prospecting.",
    ],
  },
  conscientious: {
    id: "conscientious",
    shortName: "Conscientious",
    name: "The Conscientious LO",
    tagline: "Analytical, accurate, process-strong.",
    accent: "slate",
    summary:
      "You go deep on detail, you follow process, and you build files other people trust. Your edge is precision, structure, and risk awareness.",
    communicationStyle:
      "Precise, structured, fact-driven. You like written follow-ups and clear documentation.",
    motivationStyle:
      "You are motivated by mastery, accuracy, recognition for expertise, and well-defined process.",
    learningStyle:
      "You learn from documentation, structured curriculum, and being able to review your own work.",
    strengths: [
      "Clean files and accurate disclosures.",
      "Strong technical answers on complex loan types.",
      "Reliable compliance posture.",
      "Naturally builds repeatable systems.",
    ],
    blindSpots: [
      "Can over-analyze instead of picking up the phone.",
      "Can deliver the answer with too much detail for the borrower or partner.",
      "Can resist content or marketing that feels 'less serious'.",
      "Can avoid live coaching feedback in front of others.",
    ],
    coachingRecommendations: [
      "Set a daily call block before the email and analysis block.",
      "Use a 'borrower-language' check on every quote before it goes out.",
      "Build a one-page content rhythm that fits your tone — written, accurate, calm.",
      "Use AI Twin to practice live calls in a low-risk environment.",
    ],
    bestTrainingPath:
      "Sales & Marketing 201 (Borrower Conversion) and 301 (Referral Partner Growth) with live roleplay, then 401 (Content & Marketing).",
    bestCommunicationStyle:
      "Lead with facts, written materials, and time to prepare. Avoid surprise public feedback.",
    suggestedResources: [
      { label: "Borrower Conversion (201)", href: "/201-borrower-conversion/" },
      { label: "Referral Partner Growth (301)", href: "/301-referral-partner-growth/" },
      { label: "AI Training Library", href: "/training-library/" },
      { label: "Compliance Notes", href: "/compliance/" },
    ],
    teamLeaderNotes: [
      "Send the agenda before the meeting.",
      "Give credit for accuracy, not just volume.",
      "Use 1:1 coaching reps instead of group cold calls when introducing a new script.",
      "Pair with a Driver or Influencer for outbound prospecting blocks.",
    ],
  },
};

/** Lookup helper kept narrow to keep imports cheap on the report pages. */
export function getProfile(id: ProfileId): CoachingProfile {
  return coachingProfiles[id];
}

export const profileOrder: ProfileId[] = [
  "driver",
  "influencer",
  "steady",
  "conscientious",
];

/* ---------- New LO readiness profiles (different layer) ---------- */

export type NewLoReadinessId =
  | "foundation-builder"
  | "coachable-climber"
  | "confident-starter"
  | "ready-producer";

export type NewLoReadinessProfile = {
  id: NewLoReadinessId;
  name: string;
  tagline: string;
  developmentStage: string;
  summary: string;
  thirtyDayFocus: string[];
  firstScripts: string[];
  aiTrainingRecommendations: string[];
  supportRouting: string[];
  teamLeaderNotes: string[];
};

export const newLoReadinessProfiles: Record<NewLoReadinessId, NewLoReadinessProfile> = {
  "foundation-builder": {
    id: "foundation-builder",
    name: "Foundation Builder",
    tagline: "Brand new. Strong attitude. Needs the basics in reps.",
    developmentStage: "Stage 1 — Onboarding",
    summary:
      "You are new to the LO role. The right first move is to build the fundamentals on repeat — language, process, partner work — before chasing volume.",
    thirtyDayFocus: [
      "Complete the Foundation (101) module end to end.",
      "Practice three borrower discovery roleplays per week with a coach.",
      "Shadow two referral partner conversations with a senior LO.",
      "Set up CRM, calendar, and compliance check basics.",
    ],
    firstScripts: [
      "Borrower intro and discovery (101).",
      "Pre-approval handoff to a Realtor (201).",
      "Quick check-in voicemail script (101).",
    ],
    aiTrainingRecommendations: [
      "AI Advantage — Start here path.",
      "Use AI Twin for low-pressure roleplay reps.",
      "Use AI Assistants only for drafting practice, not live borrower work yet.",
    ],
    supportRouting: [
      "Pair with a corporate coach for weekly 1:1s.",
      "Loop the team leader for partner introductions.",
      "Use the Support Routing page for any compliance or pricing question.",
    ],
    teamLeaderNotes: [
      "Protect the rep cycle — do not push volume in the first 30 days.",
      "Celebrate small completions to build momentum.",
      "Use written checklists, not memory.",
    ],
  },
  "coachable-climber": {
    id: "coachable-climber",
    name: "Coachable Climber",
    tagline: "Some experience, very open to coaching, building rhythm.",
    developmentStage: "Stage 2 — Building Rhythm",
    summary:
      "You have some loans under your belt, you are open to coaching, and you are ready to lock in a rhythm. The next 30 days are about consistency and partner work.",
    thirtyDayFocus: [
      "Lock a weekly outbound activity number (calls + partner touches).",
      "Run one full roleplay per week with a coach.",
      "Add at least one new referral partner conversation per week.",
      "Move from script reading to script speaking.",
    ],
    firstScripts: [
      "Borrower follow-up after pre-approval (201).",
      "Referral partner intro call (301).",
      "Realtor objection: 'I already have a lender' (301).",
    ],
    aiTrainingRecommendations: [
      "AI Advantage — partner outreach drafting.",
      "Use AI Assistants to prep call agendas.",
      "Start a short weekly content rhythm using prompts.",
    ],
    supportRouting: [
      "Weekly 1:1 with team leader.",
      "Monthly review with a corporate coach.",
      "Use FaceGram to share wins and ask questions.",
    ],
    teamLeaderNotes: [
      "Reinforce the activity number — protect it on the calendar.",
      "Catch the next-level scripts as soon as the basics land.",
      "Watch for plateau signals at 60-90 days and recoach.",
    ],
  },
  "confident-starter": {
    id: "confident-starter",
    name: "Confident Starter",
    tagline: "Comfortable on the phone, needs structure and process discipline.",
    developmentStage: "Stage 2 — Building Rhythm",
    summary:
      "You are comfortable on the phone and you can build rapport, but consistency, follow-through, and compliance discipline are the next unlock.",
    thirtyDayFocus: [
      "Build a written follow-up cadence inside the CRM.",
      "Run a daily 10-minute pipeline cleanup block.",
      "Practice neutral price and structure language in roleplays.",
      "Add one compliance-aware reading per week.",
    ],
    firstScripts: [
      "Borrower discovery (201).",
      "Referral partner relationship reset (301).",
      "Pricing conversation in plain language (201).",
    ],
    aiTrainingRecommendations: [
      "AI Advantage — content rhythm + AI Twin practice.",
      "Use AI Assistants to summarize calls after the fact.",
      "Run weekly AI prompts to draft partner follow-up.",
    ],
    supportRouting: [
      "Weekly 1:1 with team leader.",
      "Open coaching channel for live deal questions.",
      "Loop compliance early — not after the fact.",
    ],
    teamLeaderNotes: [
      "Reinforce process and CRM discipline.",
      "Use specific, behavior-level feedback.",
      "Pair with a Conscientious teammate for deal review reps.",
    ],
  },
  "ready-producer": {
    id: "ready-producer",
    name: "Ready Producer",
    tagline: "Ready to produce, needs systems + partner depth.",
    developmentStage: "Stage 3 — Scaling",
    summary:
      "You have the fundamentals and the comfort. The unlock is depth on referral partners, repeatable systems, and consistent content presence.",
    thirtyDayFocus: [
      "Define your top 5 referral partner targets and a weekly cadence.",
      "Set a personal pipeline review block on Friday.",
      "Publish one piece of content per week.",
      "Run one referral partner roleplay per week.",
    ],
    firstScripts: [
      "Referral partner discovery (301).",
      "Listing agent call (301).",
      "Realtor scorecard conversation (301).",
    ],
    aiTrainingRecommendations: [
      "AI Advantage — partner outreach + content automation paths.",
      "Use AI Assistants to draft Realtor scorecards and follow-ups.",
      "Build an AI Twin persona for content reps.",
    ],
    supportRouting: [
      "Weekly 1:1 with team leader.",
      "Quarterly business review with a corporate coach.",
      "Pull marketing review for content beyond a starter rhythm.",
    ],
    teamLeaderNotes: [
      "Push partner-first work over pure volume.",
      "Reinforce content rhythm — once a week minimum.",
      "Watch for next-tier coaching needs at month 3-4.",
    ],
  },
};

export const newLoReadinessOrder: NewLoReadinessId[] = [
  "foundation-builder",
  "coachable-climber",
  "confident-starter",
  "ready-producer",
];
