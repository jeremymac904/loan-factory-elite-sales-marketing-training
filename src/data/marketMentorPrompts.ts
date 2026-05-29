/**
 * Market Mentor Studio — AI prompt cards
 *
 * These are starter prompt templates for AI Twins, paid coaching assistants,
 * and roleplay practice. They are draft-only. Always review before sending
 * anything borrower- or Realtor-facing.
 */

export type MarketPromptCategory =
  | "market_update"
  | "rate_explainer"
  | "cost_of_waiting"
  | "buy_vs_rent"
  | "debt_consolidation"
  | "realtor"
  | "objection"
  | "video";

export type MarketPrompt = {
  slug: string;
  title: string;
  category: MarketPromptCategory;
  audience: string;
  body: string;
  tags: string[];
};

export const marketMentorPrompts: MarketPrompt[] = [
  {
    slug: "explain-rate-headline-to-borrower",
    title: "Explain today's rate headline to a borrower",
    category: "market_update",
    audience: "Borrower",
    body: "Take this market headline and turn it into a 4-sentence plain-English explanation for a borrower who is rate-sensitive. Avoid jargon. Do not predict where rates will go. End with one clear next step. Headline: [PASTE HEADLINE].",
    tags: ["plain English", "borrower", "today"],
  },
  {
    slug: "explain-rate-headline-to-realtor",
    title: "Realtor-facing version of today's headline",
    category: "market_update",
    audience: "Realtor",
    body: "Rewrite this market headline as a 3-sentence Realtor update that helps them talk to their buyers this week. Practical, not predictive. Tie it to one buyer conversation they should have. Headline: [PASTE HEADLINE].",
    tags: ["Realtor", "weekly", "practical"],
  },
  {
    slug: "fed-cut-but-rates-up",
    title: "Why didn't mortgage rates drop after the Fed cut?",
    category: "rate_explainer",
    audience: "Borrower",
    body: "Explain in plain English why mortgage rates can move differently than the Fed rate. Keep it under 120 words. Use one analogy. Do not predict the future.",
    tags: ["Fed", "spread", "common question"],
  },
  {
    slug: "lock-vs-float",
    title: "Lock vs Float conversation",
    category: "rate_explainer",
    audience: "Borrower",
    body: "Draft a calm, educational lock-vs-float conversation script. Cover: (1) what locking does, (2) what floating does, (3) what changes between now and close, (4) how we'd make the decision together. Do not predict rates.",
    tags: ["lock", "float", "advisory"],
  },
  {
    slug: "cost-of-waiting-talking-points",
    title: "Cost of Waiting talking points",
    category: "cost_of_waiting",
    audience: "Borrower",
    body: "Given these inputs (purchase price [X], down payment [Y], estimated rate [Z], estimated rent [R], appreciation assumption [A], waiting period [N months]), write 5 borrower talking points. Label all numbers as educational estimates. Do not guarantee appreciation. End with: 'What would change the math for you?'.",
    tags: ["cost of waiting", "scenario"],
  },
  {
    slug: "buy-vs-rent-balanced",
    title: "Buy vs Rent — balanced version",
    category: "buy_vs_rent",
    audience: "Borrower",
    body: "Write a balanced 5-bullet comparison between renting and buying for a first-time buyer making [X]/year in [CITY]. No wealth promises. No predictions. Acknowledge real tradeoffs of each. End with one practical next step.",
    tags: ["first-time buyer", "balanced"],
  },
  {
    slug: "consolidation-responsible",
    title: "Debt consolidation — responsible framing",
    category: "debt_consolidation",
    audience: "Borrower",
    body: "Draft a responsible debt consolidation conversation for a homeowner with $[X] in non-mortgage debt. Cover: (1) this is not free money, (2) monthly cashflow vs total interest, (3) risk of putting unsecured debt on a home, (4) breakeven framing on the refinance, (5) one disqualifying scenario.",
    tags: ["cash-out", "responsible"],
  },
  {
    slug: "realtor-weekly-update",
    title: "Realtor weekly market update",
    category: "realtor",
    audience: "Realtor",
    body: "Draft a 5-sentence weekly market update for a Realtor partner. Include: (1) one market datapoint this week, (2) one buyer conversation they should have, (3) one listing conversation they should have, (4) what changed this week vs last, (5) how to reach me. No predictions.",
    tags: ["Realtor", "weekly"],
  },
  {
    slug: "open-house-talking-points",
    title: "Open house talking points for the Realtor",
    category: "realtor",
    audience: "Realtor",
    body: "Give a Realtor 4 talking points to use at an open house this weekend that show market awareness without predicting rates. Include one borrower-financing question they can use to qualify warm-but-shy attendees.",
    tags: ["open house", "tactical"],
  },
  {
    slug: "rates-too-high",
    title: "Objection: rates are too high",
    category: "objection",
    audience: "Borrower",
    body: "Respond to 'Rates are too high right now' in 3 sentences. Acknowledge the concern. Offer one practical framing. Suggest one concrete next step that doesn't require committing to a loan.",
    tags: ["objection", "rates"],
  },
  {
    slug: "waiting-for-rates-to-drop",
    title: "Objection: I'm waiting for rates to drop",
    category: "objection",
    audience: "Borrower",
    body: "Respond to 'I'm waiting for rates to drop' in 4 sentences. Validate the strategy. Share one tradeoff to consider. Avoid predicting rates. Offer one way to stay ready without committing.",
    tags: ["objection", "waiting"],
  },
  {
    slug: "video-market-update-script",
    title: "60-second video market update",
    category: "video",
    audience: "Borrower",
    body: "Write a 60-second video script (about 150 words) for a weekly market update. Structure: hook (1 sentence), what happened (2 sentences), what it means for buyers (1 sentence), what it means for Realtors (1 sentence), one CTA. Plain English. No predictions.",
    tags: ["video", "weekly", "HeyGen-ready"],
  },
  {
    slug: "bilingual-market-update",
    title: "Bilingual market update (EN + ES)",
    category: "video",
    audience: "Borrower",
    body: "Write a 45-second bilingual market update script. English first, then Spanish. Same content, natural translation (not literal). Cover one market datapoint and one practical takeaway. Add a Spanish disclaimer that this is educational only.",
    tags: ["video", "bilingual", "Alliance"],
  },
  {
    slug: "mastermind-discussion-prompt",
    title: "Mastermind discussion prompt — market week",
    category: "video",
    audience: "Coaching member",
    body: "Draft a mastermind discussion prompt for this week. Pick one market story. Ask: (1) what conversation did this trigger with a client, (2) what worked, (3) what didn't. Keep it 90 seconds to read aloud.",
    tags: ["mastermind", "Alliance"],
  },
];

export function getPromptsByCategory(category: MarketPromptCategory): MarketPrompt[] {
  return marketMentorPrompts.filter((p) => p.category === category);
}
