import { SkillLevel } from "@/lib/utils";

export type RoleplayItem = {
  id: string;
  module: string;
  level: SkillLevel;
  title: string;
  setup: string;
  goal: string;
  duration: string;
  watchOuts: string[];
};

export const roleplays: RoleplayItem[] = [
  {
    id: "cold-realtor-outreach",
    module: "301",
    level: "Intermediate",
    title: "Cold Realtor outreach.",
    setup:
      "Partner up. LO A plays the loan officer. LO B plays a Realtor with 18 deals over the last 12 months who has never heard of the LO.",
    goal: "Book a 15 minute meeting without bragging or leading with rate.",
    duration: "10 minutes",
    watchOuts: [
      "Bragging or stat dumping",
      "Leading with rate",
      "Weak ask. No date, no time",
    ],
  },
  {
    id: "warm-realtor-follow-up",
    module: "301",
    level: "Intermediate",
    title: "Warm Realtor follow up.",
    setup:
      "LO B plays a Realtor who said they would meet, then went quiet for two weeks.",
    goal: "Re engage without pressure. Stay useful.",
    duration: "8 minutes",
    watchOuts: [
      "Needy tone",
      "Multiple long paragraphs",
      "Pushing for a yes the same day",
    ],
  },
  {
    id: "borrower-rate-shopper",
    module: "201",
    level: "Intermediate",
    title: "Borrower rate shopper.",
    setup:
      "LO B plays a borrower who opens with what is your best rate today.",
    goal: "Redirect to a plan first conversation without becoming defensive.",
    duration: "10 minutes",
    watchOuts: [
      "Quoting a teaser rate",
      "Apologizing for not quoting",
      "Sounding annoyed by the question",
    ],
  },
  {
    id: "payment-concern",
    module: "201",
    level: "Intermediate",
    title: "Borrower nervous about payment.",
    setup:
      "LO B plays a first time buyer with a household income of 95 thousand a year who is anxious about a payment number they read online.",
    goal:
      "Lead with goals and total monthly comfort, not a teaser number.",
    duration: "10 minutes",
    watchOuts: [
      "Throwing out a payment number in writing later",
      "Skipping the budget conversation",
      "Avoiding the emotional concern",
    ],
  },
  {
    id: "credit-concern",
    module: "201",
    level: "Intermediate",
    title: "Borrower with credit concerns.",
    setup:
      "LO B plays a borrower who thinks their credit score is too low and is embarrassed.",
    goal:
      "Build trust, offer a soft pull, frame credit as one of several factors and a workable one.",
    duration: "10 minutes",
    watchOuts: [
      "Making the borrower feel judged",
      "Promising a specific approval",
      "Skipping the soft pull offer",
    ],
  },
  {
    id: "listing-agent-confidence",
    module: "301",
    level: "Intermediate",
    title: "Listing agent confidence call.",
    setup:
      "LO B plays a listing agent who just received an offer. LO A is the lender on the offer.",
    goal: "Project competence in under 90 seconds.",
    duration: "6 minutes",
    watchOuts: [
      "Talking too fast",
      "Skipping the offer of the cell phone number",
      "Forgetting the NMLS ID and brokerage",
    ],
  },
  {
    id: "open-house-partner-pitch",
    module: "301",
    level: "Intermediate",
    title: "Open house partner pitch.",
    setup:
      "LO A walks into an open house. LO B plays the Realtor hosting the open house.",
    goal: "Offer one specific value drop, not a sales pitch.",
    duration: "8 minutes",
    watchOuts: [
      "Pitching a rate",
      "Cookie bribery RESPA risk",
      "Asking for referrals on first meeting",
    ],
  },
  {
    id: "past-client-checkin",
    module: "501",
    level: "Intermediate",
    title: "Past client check in.",
    setup:
      "LO B plays a past client who closed 18 months ago and has not heard from the LO since.",
    goal: "Lead with curiosity and value, not rates dropped want to refi.",
    duration: "10 minutes",
    watchOuts: [
      "Leading with refi",
      "Sounding scripted",
      "Skipping the helpful first move",
    ],
  },
  {
    id: "self-employed-consult",
    module: "601",
    level: "Advanced",
    title: "Self employed borrower consult.",
    setup:
      "LO B plays a self employed business owner asking what they need to qualify.",
    goal:
      "Surface the right documents and frame the plan in plain language.",
    duration: "12 minutes",
    watchOuts: [
      "Going deep on doc jargon",
      "Promising approval",
      "Skipping the goals discovery",
    ],
  },
  {
    id: "first-time-buyer-consult",
    module: "201",
    level: "Intermediate",
    title: "First time buyer consult.",
    setup:
      "LO B plays a first time buyer who is excited but overwhelmed.",
    goal:
      "Simple language, no jargon, clear next step. Reduce anxiety, not features.",
    duration: "12 minutes",
    watchOuts: [
      "Mortgage jargon",
      "Skipping the next step confirmation",
      "Treating the call as a transaction, not a relationship start",
    ],
  },
];
