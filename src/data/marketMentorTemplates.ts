/**
 * Market Mentor Studio — script and video templates
 *
 * Includes:
 * - market objection genome (objection + multi-channel responses)
 * - AI Avatar Video Studio templates (HeyGen-ready structures, no API)
 * - script templates for borrower, Realtor, video, FaceGram, email, text
 *
 * No live API. No video generation. Disabled generate buttons until HeyGen is
 * connected per user.
 */

export type ObjectionResponse = {
  borrower: string;
  realtor: string;
  textResponse: string;
  callScript: string;
  videoScript: string;
  roleplayScenario: string;
  aiTwinPrompt: string;
};

export type MarketObjection = {
  slug: string;
  objection: string;
  category: "rate" | "timing" | "competition" | "lifestyle" | "trust";
  response: ObjectionResponse;
};

export const marketObjectionGenome: MarketObjection[] = [
  {
    slug: "rates-too-high",
    objection: "Rates are too high",
    category: "rate",
    response: {
      borrower:
        "Totally hear you — rates are higher than they were a couple years ago. The two questions I'd think about: (1) what does your monthly look like at today's rate, and (2) if rates moved a half-point either way, would that actually change the move? Happy to walk through the numbers without any commitment.",
      realtor:
        "Buyers saying 'rates are too high' usually means 'I haven't seen the monthly yet.' Once they see the actual payment vs. their rent, the conversation changes. I can run that scenario for any buyer you want in 10 minutes.",
      textResponse:
        "Heard. Want me to run your actual monthly at today's rate — no commitment, just real numbers?",
      callScript:
        "Open with validation. Ask one qualifying question (timeline). Offer a 10-minute payment review. Set a specific time. Don't argue with the objection.",
      videoScript:
        "Hook: 'Rates are higher than they were two years ago.' Middle: 'Here's the actual payment difference vs. waiting six months — based on a real scenario, not a prediction.' Close: 'DM me if you want yours run.'",
      roleplayScenario:
        "Borrower opens with 'rates are too high' and shuts down hard. Goal: validate, get one piece of info, set a no-pressure next step.",
      aiTwinPrompt:
        "Respond to 'rates are too high' in 3 sentences. Validate. Reframe to monthly payment. Offer one no-commitment next step. No predictions.",
    },
  },
  {
    slug: "waiting-for-rates",
    objection: "I'm waiting for rates to drop",
    category: "timing",
    response: {
      borrower:
        "Waiting can be the right call — it really depends on your situation. Two things worth considering: (1) home prices and rates don't always move together, and (2) being ready to act fast when rates do shift matters more than predicting the moment. Want to stay ready without committing to anything?",
      realtor:
        "When buyers say they're waiting, the play isn't to convince them to buy now. It's to keep them ready and informed so they can move fast if their window opens. Quarterly check-ins beat one-time conversions.",
      textResponse:
        "Totally fair. Want me to set you up so we can move fast if your window opens, without any pressure right now?",
      callScript:
        "Honor the strategy. Don't argue. Offer a quarterly check-in. Stay top-of-mind with one piece of value each month.",
      videoScript:
        "Hook: 'You're waiting for rates to drop — smart move for some people.' Middle: 'Here's what to watch for that's actually within your control.' Close: 'Save this and message me when you're ready.'",
      roleplayScenario:
        "Buyer fully committed to waiting. They will not change their mind today. Goal: set the right follow-up.",
      aiTwinPrompt:
        "Respond to 'I'm waiting for rates to drop' in 4 sentences. Validate. Avoid prediction. Suggest a low-pressure follow-up cadence.",
    },
  },
  {
    slug: "fed-cut-rates-up",
    objection: "The Fed cut rates, why did mortgage rates not fall?",
    category: "rate",
    response: {
      borrower:
        "Great question. The Fed sets short-term rates banks charge each other. Mortgage rates move with longer-term bond demand, not directly with the Fed. So a Fed cut can already be 'priced in' to bonds, which means mortgage rates barely move — or move the other way.",
      realtor:
        "Quick way to explain it: Fed = short term loans, mortgages = long term bonds. They're cousins, not twins. The market often prices the Fed cut before it happens.",
      textResponse:
        "Quick one: Fed = short-term, mortgages = long-term bonds. They don't always move together. Want a 60-second video that explains it?",
      callScript:
        "One analogy (cousins not twins). One short example. End with 'does that make sense?' Don't lecture.",
      videoScript:
        "Hook: 'The Fed cut rates this week, so why are mortgage rates higher?' Middle: 'Mortgage rates follow long-term bonds, not the Fed funds rate. Markets often price the cut in early.' Close: 'Send this to anyone who's confused.'",
      roleplayScenario:
        "Borrower asks the question in frustration after locking. Goal: explain clearly without making them feel dumb.",
      aiTwinPrompt:
        "Explain in plain English why mortgage rates can move differently than the Fed funds rate. Under 100 words. One analogy. No prediction.",
    },
  },
  {
    slug: "bank-quoted-lower",
    objection: "My bank quoted lower",
    category: "competition",
    response: {
      borrower:
        "Smart to compare. Two questions when comparing: (1) is it the same loan type, same lock period, same points/credits, and (2) what's the all-in monthly with their fees vs ours? Sometimes the rate is lower but the all-in is higher. Want me to compare apples to apples?",
      realtor:
        "Rate alone never tells the story. Apples-to-apples comparison (same loan type, same lock, same points/credits, same fees) is where the real number shows up.",
      textResponse:
        "Always good to compare. Want me to run an apples-to-apples comparison on your bank's quote? I'll show you exactly where each dollar goes.",
      callScript:
        "Don't bash the bank. Ask 3 questions (loan type, lock period, points). Offer to do a real comparison. Stay professional.",
      videoScript:
        "Hook: 'Your bank quoted lower — should you take it?' Middle: 'Three things to check before you say yes.' Close: 'DM me your quote and I'll compare it for you.'",
      roleplayScenario:
        "Borrower compares your quote to a national bank's promotional rate. Goal: real comparison without bashing.",
      aiTwinPrompt:
        "Respond to 'my bank quoted lower' in 4 sentences. Don't bash. Ask 2 specific apples-to-apples questions. Offer real comparison.",
    },
  },
  {
    slug: "saw-lower-rate-online",
    objection: "I saw a lower rate online",
    category: "competition",
    response: {
      borrower:
        "Online rates are usually advertised with assumptions baked in (perfect credit, points paid, primary residence, no PMI). When we plug in your actual scenario, it almost always changes. Want me to run your real number side-by-side?",
      realtor:
        "Online rate ads are usually the 'best-case borrower' rate. Once you put in real scenarios, the number changes. Worth knowing for your buyers.",
      textResponse:
        "Most online rates use 'perfect borrower' assumptions. Want me to run yours with real numbers so you see the real rate?",
      callScript:
        "Validate the research. Explain rate advertising assumptions briefly. Offer a real personalized rate. Don't trash the competitor.",
      videoScript:
        "Hook: 'You saw a rate online. Is it real?' Middle: 'Three assumptions baked into every online rate ad.' Close: 'DM me and I'll run yours for real.'",
      roleplayScenario:
        "Borrower screenshots a rate ad and texts it. Goal: explain assumptions without bashing.",
      aiTwinPrompt:
        "Respond to 'I saw a lower rate online' in 4 sentences. Acknowledge the research. Explain the assumption gap. Offer a real number.",
    },
  },
  {
    slug: "want-to-keep-renting",
    objection: "I want to keep renting",
    category: "lifestyle",
    response: {
      borrower:
        "Renting can absolutely be the right move — flexibility, lower commitment, lower upfront cost. The honest answer is it depends on your timeline and goals. Want me to stay in touch with one practical update each month in case anything changes?",
      realtor:
        "When buyers say they want to keep renting, the worst move is to argue. The smart move is to stay top-of-mind with useful info until their situation shifts.",
      textResponse:
        "Honestly, renting is the right call for some people right now. Want me to keep you on a monthly check-in just in case?",
      callScript:
        "Honor the decision. Ask one curious question (what would change your mind). Offer monthly value follow-up.",
      videoScript:
        "Hook: 'Renting is the right call for some buyers right now.' Middle: 'Here are 3 questions to ask yourself before you make the call.' Close: 'Save this for whenever you need it.'",
      roleplayScenario:
        "Buyer is settled on renting. Don't try to flip them today. Goal: stay useful.",
      aiTwinPrompt:
        "Respond to 'I want to keep renting' in 3 sentences. Validate. Don't argue. Offer one piece of ongoing value.",
    },
  },
  {
    slug: "dont-want-to-buy-at-top",
    objection: "I don't want to buy at the top",
    category: "timing",
    response: {
      borrower:
        "That worry makes sense. The honest truth is no one (including me) knows where the top is — and home prices and rates don't always move together. Two ways to reduce that risk: a longer time horizon, and buying in a market with strong fundamentals. Want to talk through what your time horizon looks like?",
      realtor:
        "Buyers worried about 'the top' usually need to talk about their time horizon, not the market. 5+ year hold smooths a lot of noise.",
      textResponse:
        "Real concern. Quick question — how long do you think you'd stay in the next place? That changes the math more than the rate does.",
      callScript:
        "Acknowledge the fear. Ask about time horizon. Explain long-hold smoothing. No predictions about the top.",
      videoScript:
        "Hook: 'Worried about buying at the top?' Middle: 'Time horizon matters more than timing the market.' Close: 'Comment your timeline and I'll share a take.'",
      roleplayScenario:
        "Buyer convinced prices are about to crash. Goal: validate without predicting.",
      aiTwinPrompt:
        "Respond to 'I don't want to buy at the top' in 4 sentences. Validate. Pivot to time horizon. No market prediction.",
    },
  },
  {
    slug: "wait-until-prices-drop",
    objection: "I'll wait until prices drop",
    category: "timing",
    response: {
      borrower:
        "Hear you. Two things to weigh: (1) prices and rates often move in opposite directions, so when prices drop, rates often rise — the monthly might be similar, and (2) inventory tends to shrink when prices drop, making competition harder. Want to look at scenarios both ways?",
      realtor:
        "Common buyer logic: 'I'll wait for prices to drop.' What they don't usually price in: rates often rise when prices drop, and inventory shrinks. Good to walk them through scenarios both ways.",
      textResponse:
        "Want me to show you what happens to the monthly if prices drop 5% but rates rise 0.5%? Real scenarios, no pressure.",
      callScript:
        "Validate. Lay out the price-vs-rate tradeoff calmly. Offer a side-by-side scenario.",
      videoScript:
        "Hook: 'Waiting for prices to drop?' Middle: 'Here's what usually happens to monthly payments in that scenario.' Close: 'DM me yours and I'll run both.'",
      roleplayScenario:
        "Buyer committed to waiting for a price crash. Goal: surface tradeoff without arguing.",
      aiTwinPrompt:
        "Respond to 'I'll wait until prices drop' in 4 sentences. Validate. Surface price-vs-rate inverse pattern. Offer scenario comparison.",
    },
  },
  {
    slug: "dont-want-credit-pull",
    objection: "I don't want to pull credit yet",
    category: "trust",
    response: {
      borrower:
        "Totally fair — we don't need to pull credit to start. We can do a soft prep conversation, give you a planning range, and only pull when you're ready to make an offer. Sound okay?",
      realtor:
        "Buyers nervous about credit pulls just need to know there's a no-credit-pull prep conversation available. That usually opens the door.",
      textResponse:
        "We don't need a credit pull to start. We can do a planning conversation first. Want to set 15 min?",
      callScript:
        "Validate. Explain no-pull prep conversation. Offer a 15-min planning call.",
      videoScript:
        "Hook: 'Worried about a credit pull?' Middle: 'You can have a full planning conversation before any credit is pulled.' Close: 'DM me to schedule.'",
      roleplayScenario:
        "Buyer wants information but is scared of credit damage. Goal: educate, defuse, schedule.",
      aiTwinPrompt:
        "Respond to 'I don't want to pull credit yet' in 3 sentences. Validate. Offer no-pull planning conversation. Schedule.",
    },
  },
  {
    slug: "realtor-wants-their-lender",
    objection: "My Realtor wants me to use their lender",
    category: "trust",
    response: {
      borrower:
        "Smart that your Realtor has a trusted lender — that matters. You're allowed to compare though, and your Realtor wants you to get the best loan, not just the most convenient one. Want me to run a side-by-side with their lender? You decide from there.",
      realtor:
        "When your buyer wants to compare, the lender comparison conversation is healthy — it actually validates the buyer's trust in you. We win that conversation by being clearer and more responsive, not by undercutting.",
      textResponse:
        "Totally normal — Realtor lender recs are usually good. You're still allowed to compare. Want me to run a side-by-side so you decide?",
      callScript:
        "Honor the Realtor relationship. Frame comparison as healthy. Offer side-by-side. Stay graceful if borrower stays with the Realtor's lender.",
      videoScript:
        "Hook: 'Your Realtor said use their lender. Do you have to?' Middle: 'Comparison is healthy — here's how to do it without offending anyone.' Close: 'Comment if this happened to you.'",
      roleplayScenario:
        "Buyer feels pressure to use Realtor's lender. Goal: keep relationship clean while offering comparison.",
      aiTwinPrompt:
        "Respond to 'My Realtor wants me to use their lender' in 4 sentences. Honor the relationship. Frame comparison as healthy. Offer side-by-side.",
    },
  },
];

export type VideoTemplateAudience =
  | "borrower"
  | "realtor"
  | "coaching_member"
  | "team_leader"
  | "broad_internal";

export type VideoTemplate = {
  slug: string;
  title: string;
  audience: VideoTemplateAudience;
  durationSeconds: number;
  structure: string;
  ctaStyle: string;
  reviewNotes: string[];
  tier: "mastery_249" | "alliance_449";
  bilingual?: boolean;
};

export const videoTemplates: VideoTemplate[] = [
  {
    slug: "market-update-weekly",
    title: "Weekly Market Update",
    audience: "borrower",
    durationSeconds: 60,
    structure:
      "Hook (1 sentence) → What happened (2 sentences) → What it means for buyers (1 sentence) → What it means for Realtors (1 sentence) → CTA (1 sentence).",
    ctaStyle: "Soft CTA: 'DM me with questions' — never 'apply now'.",
    reviewNotes: [
      "No predictions about where rates go.",
      "Cite the datapoint source if visible.",
      "Review with Marketing before public-facing post.",
    ],
    tier: "mastery_249",
  },
  {
    slug: "realtor-weekly-update",
    title: "Realtor Weekly Update",
    audience: "realtor",
    durationSeconds: 75,
    structure:
      "Hook → One market datapoint → One buyer conversation Realtors should have → One listing conversation Realtors should have → Close with 'send to your buyers'.",
    ctaStyle: "Forwardable: 'Send this to your buyers if it helps.'",
    reviewNotes: [
      "Make it forwardable in tone — Realtor should feel safe sharing.",
      "Avoid borrower-specific advice in the script.",
    ],
    tier: "mastery_249",
  },
  {
    slug: "coaching-recap",
    title: "Coaching Recap",
    audience: "coaching_member",
    durationSeconds: 90,
    structure:
      "Hook → Top 3 takeaways from this week's coaching session → One commitment to make this week → Close.",
    ctaStyle: "Internal: 'Post your commitment in FaceGram.'",
    reviewNotes: [
      "Internal Loan Factory only — never publish externally.",
      "Use names only with permission.",
    ],
    tier: "mastery_249",
  },
  {
    slug: "training-nugget",
    title: "Training Nugget",
    audience: "broad_internal",
    durationSeconds: 45,
    structure: "Hook → One specific lesson → One way to apply it tomorrow → Close.",
    ctaStyle: "Action: 'Try it on one call this week.'",
    reviewNotes: [
      "Bite-sized. One idea only.",
      "Tie to an existing scripts library entry if possible.",
    ],
    tier: "mastery_249",
  },
  {
    slug: "buyer-education",
    title: "Buyer Education",
    audience: "borrower",
    durationSeconds: 60,
    structure:
      "Hook (common buyer question) → Plain-English answer (4 sentences) → Soft CTA.",
    ctaStyle: "Educational: 'Save this for when you're ready.'",
    reviewNotes: [
      "Plain English only. No jargon.",
      "One concept per video.",
    ],
    tier: "mastery_249",
  },
  {
    slug: "bilingual-market-update",
    title: "Bilingual Market Update (EN + ES)",
    audience: "borrower",
    durationSeconds: 90,
    structure:
      "EN hook → EN content (3 sentences) → 1-second pause → ES translation (natural, not literal) → Close in both languages.",
    ctaStyle: "Bilingual soft CTA in both EN and ES.",
    reviewNotes: [
      "Spanish should be natural, not literal translation.",
      "Add a Spanish-language disclaimer that this is educational only.",
      "Alliance-tier template.",
    ],
    tier: "alliance_449",
    bilingual: true,
  },
  {
    slug: "leadership-briefing",
    title: "Team Leader Market Briefing",
    audience: "team_leader",
    durationSeconds: 120,
    structure:
      "Hook for team leaders → One datapoint → Language they can repeat → One borrower conversation → One Realtor conversation → Weekly team challenge.",
    ctaStyle: "Direct: 'Use this in your huddle tomorrow.'",
    reviewNotes: [
      "Built for team leaders to repeat.",
      "Tie to scorecards if possible.",
      "Alliance-tier template.",
    ],
    tier: "alliance_449",
  },
  {
    slug: "mastermind-prompt",
    title: "Mastermind Discussion Prompt",
    audience: "coaching_member",
    durationSeconds: 60,
    structure:
      "Hook → This week's market story → Discussion question for the room → Close with 'bring an example'.",
    ctaStyle: "Discussion: 'Bring one example to mastermind.'",
    reviewNotes: [
      "Alliance-only template.",
      "Internal Loan Factory only.",
    ],
    tier: "alliance_449",
  },
];

export type ScriptTemplateChannel =
  | "borrower_call"
  | "borrower_text"
  | "borrower_email"
  | "realtor_email"
  | "realtor_text"
  | "social_post"
  | "facegram_post";

export type ScriptTemplate = {
  slug: string;
  title: string;
  channel: ScriptTemplateChannel;
  body: string;
};

export const scriptTemplates: ScriptTemplate[] = [
  {
    slug: "borrower-followup-text",
    title: "Borrower follow-up — text",
    channel: "borrower_text",
    body: "Hey [NAME] — quick thought from our last conversation. [ONE SPECIFIC RECALL]. No need to do anything — just wanted to keep it real. Let me know if anything changes for you.",
  },
  {
    slug: "borrower-followup-email",
    title: "Borrower follow-up — email",
    channel: "borrower_email",
    body: "Subject: Following up\n\nHi [NAME],\n\nFollowing up after [LAST CONVERSATION]. Two things I want to make sure you have: (1) [SPECIFIC RESOURCE], (2) [NEXT STEP OPTION]. No pressure on the next step — happy to help when it makes sense.\n\nTalk soon,\n[YOU]",
  },
  {
    slug: "realtor-weekly-text",
    title: "Realtor weekly update — text",
    channel: "realtor_text",
    body: "Hey [REALTOR] — this week in the market: [DATAPOINT]. What that means for your buyers: [PRACTICAL ANGLE]. Send this to anyone who needs it. Happy to talk through their scenario.",
  },
  {
    slug: "realtor-monthly-email",
    title: "Realtor monthly update — email",
    channel: "realtor_email",
    body: "Subject: Monthly market note for your buyers\n\nHi [REALTOR],\n\nQuick monthly update for your buyer conversations:\n- [DATAPOINT 1]\n- [DATAPOINT 2]\n- [PRACTICAL TAKEAWAY]\n\nForward this to any buyers who'd find it useful. Always happy to run scenarios for them.\n\n[YOU]",
  },
  {
    slug: "facegram-win-post",
    title: "FaceGram win post",
    channel: "facegram_post",
    body: "[WIN]. What I tried: [SPECIFIC THING]. What worked: [ONE LINE]. Sharing in case it helps anyone with a similar conversation this week.",
  },
  {
    slug: "social-market-update",
    title: "Social market update post",
    channel: "social_post",
    body: "This week in the market: [DATAPOINT].\n\nWhat it means for buyers: [PRACTICAL].\nWhat it means for Realtors: [PRACTICAL].\n\nNot a prediction. Just the picture this week.\n\n[YOU] | [NMLS] | [STATES]",
  },
  {
    slug: "borrower-call-opener",
    title: "Borrower call — opener",
    channel: "borrower_call",
    body: "Hey [NAME], it's [YOU] from [LOAN FACTORY]. Two quick things — first, [SPECIFIC RECALL FROM LAST CONVERSATION]. Second, [REASON FOR CALL]. Got a couple minutes or should I catch you later?",
  },
];
