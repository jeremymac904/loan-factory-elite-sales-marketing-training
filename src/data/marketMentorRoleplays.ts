/**
 * Market Mentor Studio — roleplay scenarios
 *
 * Practice cards for market conversations. Each card includes the scenario,
 * the goal, what good sounds like, common mistakes, suggested score criteria,
 * and a starter prompt the AI Twin or roleplay assistant can use.
 *
 * If live AI roleplay is not connected, the launch button copies the prompt
 * to clipboard or opens a prompt modal — no API call is made.
 */

export type MarketRoleplayDifficulty = "easy" | "medium" | "hard";

export type MarketRoleplay = {
  slug: string;
  title: string;
  audience: string;
  difficulty: MarketRoleplayDifficulty;
  scenario: string;
  goal: string;
  whatGoodSoundsLike: string[];
  commonMistakes: string[];
  scoreCriteria: string[];
  starterPrompt: string;
  tier: "mastery_249" | "alliance_449";
};

export const marketMentorRoleplays: MarketRoleplay[] = [
  {
    slug: "nervous-first-time-buyer",
    title: "Nervous first-time buyer",
    audience: "Borrower",
    difficulty: "easy",
    scenario:
      "A first-time buyer reaches out after seeing a scary rate headline. They feel like they missed the chance and are second-guessing.",
    goal: "Calm them down, validate the feeling, give one practical next step that doesn't require committing.",
    whatGoodSoundsLike: [
      "Acknowledges the feeling out loud.",
      "Avoids predicting rates.",
      "Offers a concrete pre-approval or budget conversation as next step.",
      "Ends with a calm tone, not a hard close.",
    ],
    commonMistakes: [
      "Telling them 'rates will come back down.'",
      "Pushing toward an application before they're emotionally ready.",
      "Using jargon (BPS, MBS, DTI) without explaining.",
    ],
    scoreCriteria: [
      "Validation in first 30 seconds.",
      "Zero predictive language.",
      "One concrete next step offered, not demanded.",
    ],
    starterPrompt:
      "You are a nervous first-time buyer who just saw a headline that rates jumped. You almost made an offer last month but didn't. You are second-guessing everything. Push back politely on anything that sounds like a sales pitch.",
    tier: "mastery_249",
  },
  {
    slug: "rate-shopper",
    title: "Rate shopper",
    audience: "Borrower",
    difficulty: "medium",
    scenario:
      "Borrower opens with: 'I'm just shopping rates. What's your best rate today?' They sound transactional.",
    goal: "Move from rate-shopping to a value conversation without dodging the question.",
    whatGoodSoundsLike: [
      "Gives a real rate range with a caveat about what affects it.",
      "Asks 2 qualifying questions before quoting tighter.",
      "Surfaces one piece of value other LOs may not mention.",
    ],
    commonMistakes: [
      "Dodging the rate question.",
      "Quoting a meaningless 'starting at' rate.",
      "Bashing the competitor by name.",
    ],
    scoreCriteria: [
      "Direct answer + caveat.",
      "Asked 2 qualifying questions.",
      "Surfaced one differentiator without bashing.",
    ],
    starterPrompt:
      "You are a borrower comparing 3 lenders. Your only opener is: 'What's your best rate today?' You are skeptical of any LO who dodges the question.",
    tier: "mastery_249",
  },
  {
    slug: "waiting-buyer",
    title: "Waiting buyer",
    audience: "Borrower",
    difficulty: "medium",
    scenario:
      "Borrower says: 'I'm going to wait until rates drop.' They sound committed to waiting.",
    goal: "Honor their strategy and stay top-of-mind without trying to convince them right now.",
    whatGoodSoundsLike: [
      "Validates the wait strategy.",
      "Avoids predicting rates.",
      "Sets a useful check-in cadence.",
      "Offers one piece of value they can use now.",
    ],
    commonMistakes: [
      "Trying to convince them they're wrong.",
      "Predicting where rates are going.",
      "Letting them disappear with no follow-up plan.",
    ],
    scoreCriteria: [
      "No predictive language.",
      "Check-in cadence agreed on.",
      "One immediate piece of value delivered.",
    ],
    starterPrompt:
      "You are a buyer who is fully committed to waiting until rates drop. Don't change your mind in this conversation. Push back on anything that sounds like a sales pitch.",
    tier: "mastery_249",
  },
  {
    slug: "skeptical-realtor",
    title: "Skeptical Realtor",
    audience: "Realtor",
    difficulty: "medium",
    scenario:
      "A Realtor agrees to coffee but says: 'My buyers don't really care about rates. I already have a lender.'",
    goal: "Earn the next 15 minutes by being useful, not pitching for the loan.",
    whatGoodSoundsLike: [
      "Asks about their last 3 deals.",
      "Offers one market story they can use with a buyer this week.",
      "Doesn't ask for the loan in the first meeting.",
    ],
    commonMistakes: [
      "Asking for referrals on first meeting.",
      "Bashing their current lender.",
      "Talking about your rate sheet.",
    ],
    scoreCriteria: [
      "Asked at least 2 questions about their pipeline.",
      "Gave away one piece of useful value.",
      "Set a real next step (not 'let me know if you ever need me').",
    ],
    starterPrompt:
      "You are a top-25%-in-your-office Realtor. You already have a preferred lender. You agreed to coffee out of curiosity. Be polite but skeptical.",
    tier: "mastery_249",
  },
  {
    slug: "refinance-borrower",
    title: "Refinance borrower",
    audience: "Borrower",
    difficulty: "medium",
    scenario:
      "A past client calls asking if it's a good time to refi. They're 18 months into a 6.875% loan.",
    goal: "Walk them through breakeven thinking honestly, even if it means 'not yet.'",
    whatGoodSoundsLike: [
      "Asks about current payment, balance, and how long they plan to stay.",
      "Walks through breakeven in months, not just rate.",
      "Acknowledges 'not right now' if math doesn't work.",
    ],
    commonMistakes: [
      "Quoting a 'savings number' without breakeven.",
      "Glossing over closing costs.",
      "Pushing them into a refi that doesn't make sense.",
    ],
    scoreCriteria: [
      "Breakeven explained in months.",
      "Honest 'not yet' if it applies.",
      "Clear next step (whether refi or stay).",
    ],
    starterPrompt:
      "You are a past client 18 months into a 6.875% loan. You read a headline that rates may drop. You want to know if it's worth refinancing now. Push for a real answer, not marketing.",
    tier: "mastery_249",
  },
  {
    slug: "buyer-who-wants-to-rent",
    title: "Buyer who wants to rent",
    audience: "Borrower",
    difficulty: "easy",
    scenario:
      "A pre-approved buyer says: 'You know what, I think we're just going to keep renting for now.'",
    goal: "Stay useful and stay top-of-mind. Do not try to sell them ownership today.",
    whatGoodSoundsLike: [
      "Honors the decision out loud.",
      "Asks one curious question about why.",
      "Stays in helpful follow-up mode.",
    ],
    commonMistakes: [
      "Selling them on ownership in the moment.",
      "Bashing renting.",
      "Disappearing because they didn't convert.",
    ],
    scoreCriteria: [
      "Validation given.",
      "Curious question asked.",
      "Follow-up cadence set.",
    ],
    starterPrompt:
      "You are a pre-approved buyer who got cold feet and decided to keep renting. You feel a little embarrassed about pulling out. Be honest about why.",
    tier: "mastery_249",
  },
  {
    slug: "agent-asking-for-market-update",
    title: "Agent asking for a market update",
    audience: "Realtor",
    difficulty: "easy",
    scenario:
      "A Realtor partner texts: 'Got anything I can send my buyers this week?'",
    goal: "Deliver a clean 60-second market update without overpromising.",
    whatGoodSoundsLike: [
      "One datapoint.",
      "One practical implication for buyers.",
      "Short. Forwardable.",
    ],
    commonMistakes: [
      "Sending a giant report no one reads.",
      "Predicting where rates will go.",
      "Forgetting to say 'happy to talk through with any of them.'",
    ],
    scoreCriteria: [
      "Under 100 words.",
      "Zero predictions.",
      "Offers a 1-line invite to call.",
    ],
    starterPrompt:
      "You are a Realtor partner. You want one short market update you can text to your buyer list this week. You hate long emails.",
    tier: "mastery_249",
  },
  {
    slug: "buyer-confused-by-fed",
    title: "Buyer confused by Fed headlines",
    audience: "Borrower",
    difficulty: "medium",
    scenario:
      "Borrower asks: 'The Fed cut rates this week, so why did you tell me mortgage rates went up?'",
    goal: "Explain the difference in plain English without making it complicated.",
    whatGoodSoundsLike: [
      "One analogy.",
      "Under 90 seconds.",
      "Doesn't make them feel dumb.",
    ],
    commonMistakes: [
      "Jargon (MBS, 10Y, spreads).",
      "Long technical lecture.",
      "Predicting where rates go next.",
    ],
    scoreCriteria: [
      "One clear analogy used.",
      "Under 90 seconds.",
      "Borrower feels smarter, not smaller.",
    ],
    starterPrompt:
      "You are a borrower who just read that the Fed cut rates. You're confused because your loan officer said your rate locked higher. Ask the question simply.",
    tier: "mastery_249",
  },
  {
    slug: "alliance-leadership-briefing",
    title: "Alliance: leadership briefing",
    audience: "Team Leader",
    difficulty: "hard",
    scenario:
      "You're briefing your team leaders on this week's market for their team huddle. They will repeat what you say.",
    goal: "Equip them with one datapoint, one borrower story, one Realtor angle, and one team challenge.",
    whatGoodSoundsLike: [
      "Frames market through 'what your team can do with this.'",
      "Gives concrete language to repeat.",
      "Ends with a specific weekly challenge.",
    ],
    commonMistakes: [
      "Treating leaders like LOs.",
      "Giving them slides instead of language.",
      "No challenge / no scorecard tie-in.",
    ],
    scoreCriteria: [
      "Concrete language for one borrower conversation.",
      "Concrete language for one Realtor conversation.",
      "Weekly challenge defined.",
    ],
    starterPrompt:
      "You are a team leader prepping for your team huddle. You only want material your LOs can repeat tomorrow. Push back on theory.",
    tier: "alliance_449",
  },
  {
    slug: "alliance-mastermind-debate",
    title: "Alliance: mastermind debate",
    audience: "Coaching member (Alliance)",
    difficulty: "hard",
    scenario:
      "Mastermind format. Two members disagree about whether buyers should lock or float right now. Facilitate.",
    goal: "Pull out the real reasoning from both sides without picking a winner.",
    whatGoodSoundsLike: [
      "Names the actual constraint behind each side.",
      "Surfaces one borrower scenario where each would be right.",
      "Lands on 'depends on the borrower' without it being a cop-out.",
    ],
    commonMistakes: [
      "Picking a side.",
      "Letting it become a lecture.",
      "Making predictions about rates.",
    ],
    scoreCriteria: [
      "Both sides represented.",
      "Concrete borrower scenarios named.",
      "Group leaves with a clearer framework, not a verdict.",
    ],
    starterPrompt:
      "You are a mastermind participant who believes buyers should lock now. Your peer believes they should float. Defend your side practically, not theoretically.",
    tier: "alliance_449",
  },
];

export function getRoleplaysByTier(tier: "mastery_249" | "alliance_449") {
  if (tier === "alliance_449") return marketMentorRoleplays;
  return marketMentorRoleplays.filter((r) => r.tier === "mastery_249");
}
