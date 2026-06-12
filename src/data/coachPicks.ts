import type { CommunityPost, ProgramKey } from "./coachingPlatform";

/**
 * Coach Picks — curated seeded feed posts per program. Sourced from the
 * "YouTube Video Research for Coaching Platform" report (mindset, sales
 * psychology, AI tools lanes). The Realtor-partnership and community-marketing
 * lane posts are text frameworks tied to the platform's own scripts and
 * trackers — the matching strategy PDFs contained placeholder text only, so
 * no claims were sourced from them.
 *
 * Rules honored: professional training content only, no rate quotes, no APR,
 * max 14 posts per program.
 */

export type CoachPick = CommunityPost & { kind: "pick"; refKey: string };

function pick(
  refKey: string,
  category: string,
  title: string,
  intro: string,
  action: string,
  discussion: string,
  youtubeUrl?: string,
  poll?: { question: string; options: string[] },
): CoachPick {
  return {
    author: "Loan Factory Coaching",
    role: "Coach",
    category: "Coach Picks",
    title: `${category}: ${title}`,
    body: `${intro}\n\nDo this: ${action}\n\nDiscussion: ${discussion}`,
    comments: [],
    youtubeUrl,
    kind: "pick",
    refKey,
    ...(poll
      ? {
          pollQuestion: poll.question,
          pollOptions: poll.options.map((label, i) => ({
            id: `${refKey}-opt${i}`,
            label,
            votes: 0,
          })),
        }
      : {}),
  };
}

const masteryPicks: CoachPick[] = [
  pick(
    "m-mind-1",
    "Mindset",
    "The Fundamentals of the Growth Mindset",
    "Before scripts and trackers, this is the foundation. Fixed mindset reads a lost deal as proof you're not good enough; growth mindset reads it as data. This video is the cleanest explanation of the difference we've found.",
    "Pick one deal or conversation you lost in the last 30 days and write down what it taught you — one sentence, in your tracker notes.",
    "What's the story you tell yourself after a 'no'? Be honest in the comments.",
    "https://www.youtube.com/watch?v=JfdoJxPjp1k",
  ),
  pick(
    "m-mind-2",
    "Mindset",
    "Carol Dweck on Praise and Neuroplasticity",
    "The researcher behind growth mindset, in her own words. Key takeaway for LOs: reward the verbs (calls made, follow ups done) not the adjectives (being good, being a closer). That's exactly why your scorecard tracks activity, not luck.",
    "This week, judge your day only by the numbers you control — calls, touches, follow ups — not by results.",
    "Which activity number are you proudest of this week?",
    "https://www.youtube.com/watch?v=wh0OS4MrN3E",
  ),
  pick(
    "m-mind-3",
    "Mindset",
    "Huberman: Turning Stress Into Focus",
    "Neuroscience-backed and practical: stress before a call block isn't a warning sign, it's fuel — if you frame it that way. Watch this before your Monday Power Block.",
    "Next time you feel call reluctance, say 'this is focus arriving' and dial anyway. Track whether the first call breaks the resistance.",
    "What's your go-to move for getting into state before calls?",
    "https://www.youtube.com/watch?v=aQDOU3hPci0",
  ),
  pick(
    "m-mind-4",
    "Mindset",
    "The Science of Grit — Duckworth & Robbins",
    "Grit beats talent over a 12-week program, every time. This conversation unpacks why capable people quit early and how consistency compounds.",
    "Commit out loud: post one number you will hit every single day for the rest of this program.",
    "What's the daily number you refuse to miss?",
    "https://www.youtube.com/watch?v=rmW3Afu9npY",
    { question: "What kills your consistency most?", options: ["Busy file days", "Call reluctance", "No clear daily plan", "Losing steam mid-week"] },
  ),
  pick(
    "m-mind-5",
    "Mindset",
    "Mastering the Inner Game of Sales",
    "Based on Brian Tracy's classic work: the fear of rejection that keeps you off the phone is built on beliefs, not facts. This is the antidote to phone reluctance and impostor syndrome.",
    "Before tomorrow's block, write the limiting belief that slows you down — then write the evidence against it.",
    "What belief did you have to drop to start prospecting consistently?",
    "https://www.youtube.com/watch?v=PaFT24B6npg",
  ),
  pick(
    "m-sales-1",
    "Sales Psychology",
    "The Behavioral Science of Emotional Selling",
    "Buying decisions are emotional first, logical second. Stop leading with numbers and spreadsheets — lead with the story of the family and the home, then let the numbers confirm it.",
    "On your next buyer call, ask two feeling questions ('what would this home change for your family?') before any numbers.",
    "What question gets YOUR buyers talking emotionally?",
    "https://www.youtube.com/watch?v=m0BPznVlZQo",
  ),
  pick(
    "m-sales-2",
    "Sales Psychology",
    "The 7-Step Psychology of Selling",
    "Counterintuitive and true: high enthusiasm triggers defenses. The pros drop the pitch, drop the pressure, and operate entirely from the buyer's perspective with diagnostic questions.",
    "Rewrite your buyer-consult opener so the first 5 minutes contain zero pitching — only questions.",
    "What's the best diagnostic question you ask a new buyer?",
    "https://www.youtube.com/watch?v=p-nQzB51lsE",
  ),
  pick(
    "m-sales-3",
    "Sales Psychology",
    "Zig Ziglar on Attitude and Relational Selling",
    "The timeless one. Attitude dictates altitude, and long-term referral business is built by genuinely helping people get what they want. This pairs with every script in your Resources tab.",
    "Send one no-agenda value touch today to a past client — no ask attached.",
    "Who helped YOU get started, and what did they do that you can pass on?",
    "https://www.youtube.com/watch?v=FBm8dSFgFug",
  ),
  pick(
    "m-sales-4",
    "Sales Psychology",
    "Disrupting the Analyst Frame (Pitch Anything)",
    "When a rate-shopper drags you into spreadsheet combat, you've lost the frame. This shows how to acknowledge the numbers briefly and pivot back to fit and relationship — pair it with the Rate Shopper Redirect script.",
    "Practice the pivot once out loud: answer the rate question in one sentence, then ask a fit question.",
    "How do you handle 'what's your rate?' in the first 30 seconds?",
    "https://www.youtube.com/watch?v=15EmOqBDW-8",
  ),
  pick(
    "m-sales-5",
    "Sales Psychology",
    "Linguistic Mirroring and Frictionless Follow-Ups",
    "Tiny mechanics, big trust: mirror the prospect's words and run follow-up calls as service, not pursuit. This is the psychology behind your Tuesday follow-up block.",
    "On Tuesday, open three follow-ups with the prospect's own words from your last conversation (check your tracker notes).",
    "What's your opening line on a follow-up call so it doesn't feel like chasing?",
    "https://www.youtube.com/watch?v=trdSPP0P4dE",
  ),
  pick(
    "m-ai-1",
    "AI Leverage",
    "ChatGPT Deep Research for Lead Domination",
    "Use AI to reverse-engineer the exact questions buyers in your market are asking, then publish the answers before your competition does. Top-of-funnel leverage for one LO with no marketing team.",
    "Run one deep-research prompt on 'questions first-time buyers in [your city] ask' and turn the top answer into one social post this week.",
    "What's the most common question your buyers actually ask you?",
    "https://www.youtube.com/watch?v=6_Wsdb06Py4",
  ),
  pick(
    "m-ai-2",
    "AI Leverage",
    "Automating Your Pipeline with Gemini in Google Sheets",
    "Your Deal Flow Tracker, supercharged: this shows how AI inside a spreadsheet summarizes your pipeline, builds formulas, and flags what's stuck — without writing a single formula yourself.",
    "Export your Deal Flow Tracker to CSV and ask AI to find the deals with no next action.",
    "Where does your pipeline leak the most — and would a dashboard have caught it?",
    "https://www.youtube.com/watch?v=hPglmtJqv7k",
  ),
  pick(
    "m-realtor-1",
    "Realtor Growth",
    "The First-Call Discovery System",
    "Recruiting an agent partner starts with NOT pitching. The system: two discovery questions about their business, real listening, one specific follow-up within 24 hours. Your Realtor First Call script (Resources > Scripts) runs this exact play.",
    "Make two agent discovery calls this week using the script — book nothing, just learn their biggest friction.",
    "What's the most common problem agents tell you about their current lender?",
    undefined,
    { question: "What's your biggest barrier to agent outreach?", options: ["Don't know what to say", "Fear of the brush-off", "No time blocked for it", "No target list"] },
  ),
  pick(
    "m-realtor-2",
    "Realtor Growth",
    "The 24-Hour Value Follow-Up",
    "The partnership is won in the follow-up, not the meeting. Within 24 hours of every agent conversation, send one thing that solves a problem they mentioned — no ask attached. Track it in your Realtor Relationship Tracker.",
    "Add a 'next action' for every agent in your tracker right now. If a row is blank, that relationship is dying.",
    "What's the best value piece you've ever sent an agent?",
  ),
];

const alliancePicks: CoachPick[] = [
  pick(
    "a-mind-1",
    "Mindset",
    "Finding Internal Drive and Purpose",
    "At your level, market mood swings are the enemy. This is about anchoring drive to internal purpose so production stays steady regardless of headlines. Required watching before you build your 12-month roadmap.",
    "Write the one-sentence purpose that keeps your business moving when the market doesn't cooperate.",
    "What keeps you building when conditions are against you?",
    "https://www.youtube.com/watch?v=w4dm-Pep-e0",
  ),
  pick(
    "a-mind-2",
    "Mindset",
    "Tony Robbins on State Management",
    "Leaders set the emotional thermostat. Your team, your partners, and your clients read your state before they hear your words. This is the playbook for governing it deliberately.",
    "Before your next difficult conversation, take 90 seconds to reset state — posture, breath, intent — and notice the difference.",
    "How do you reset between a bad call and the next one?",
    "https://www.youtube.com/watch?v=vBuphe8XLtU",
  ),
  pick(
    "a-mind-3",
    "Mindset",
    "The 10 Rules for Unshakable Success",
    "Focus controls energy, and hunger beats motivation. A dense set of operating principles for producers who are scaling past personal production into systems and people.",
    "Pick ONE rule from this video and install it as a daily standard for the next two weeks.",
    "Which rule hit hardest, and why?",
    "https://www.youtube.com/watch?v=z9LpVIkqmhQ",
  ),
  pick(
    "a-sales-1",
    "Sales Psychology",
    "Shifting Buyer Identity and Belief Systems",
    "Database reactivation isn't about reminding people you exist — it's about offering a new opportunity, not an incremental improvement. This reframe is why most win-back campaigns fail and how to fix yours.",
    "Rewrite your reactivation opener as a new-opportunity message instead of a check-in (the Database Reactivation script is your base).",
    "What gets a cold past client to actually respond — in your real experience?",
    "https://www.youtube.com/watch?v=-X3FLl9OmMc",
  ),
  pick(
    "a-sales-2",
    "Sales Psychology",
    "The Psychology of Creating Inbound Demand",
    "Stop pushing; engineer pull. Position your advisory brand so qualified borrowers and agents come to you. This is the strategic frame behind your content rhythm.",
    "Audit your last five posts or touches: were they chasing or attracting? Adjust the next five.",
    "What's the one piece of content that has actually generated inbound business for you?",
    "https://www.youtube.com/watch?v=sMUN5-fll6g",
    { question: "Where does your inbound business come from today?", options: ["Past clients", "Agent partners", "Social content", "Almost none — all outbound"] },
  ),
  pick(
    "a-sales-3",
    "Sales Psychology",
    "Jordan Belfort: State Management in Closing",
    "The final stages of a complex deal are an emotional minefield. This covers catching yourself slipping into a disempowered state mid-negotiation and snapping back before it costs you the file.",
    "Identify your tell — the first sign you're losing the frame in a negotiation — and write your reset move.",
    "What's your tell when a negotiation starts getting away from you?",
    "https://www.youtube.com/watch?v=k_KfzQB9ko0",
  ),
  pick(
    "a-sales-4",
    "Sales Psychology",
    "The Art of Subtle Frame Control",
    "Authority without aggression. How to keep control of partner and client conversations while staying completely service-oriented — essential for Tier-A agent relationships.",
    "In your next partner meeting, set the agenda in the first 60 seconds and watch how the dynamic changes.",
    "How do you keep authority in a conversation with a top-producing agent?",
    "https://www.youtube.com/watch?v=YT4yDpge36A",
  ),
  pick(
    "a-ai-1",
    "AI Automation",
    "Claude AI Workflows for Real Estate Professionals",
    "For the high-touch communication your business runs on: training AI on your voice for partner outreach, difficult-conversation prep, and analysis — without sounding like a robot.",
    "Set up one reusable prompt that drafts your weekly partner update in your voice. Test it on this Friday's update.",
    "What communication task would you hand to AI first?",
    "https://www.youtube.com/watch?v=YhlxYg3V-CE",
  ),
  pick(
    "a-ai-2",
    "AI Automation",
    "The Unified Google Workspace AI Integration",
    "The whole back office in one connected flow: summarize a document in Drive, analyze it in Sheets, draft the client email in Gmail. This is the infrastructure play for an LO running lean.",
    "Map your three most repetitive weekly admin tasks — those are your first automation targets.",
    "What's the most time-wasting admin task in your week?",
    "https://www.youtube.com/watch?v=Lpc1W9gr_1g",
  ),
  pick(
    "a-ai-3",
    "AI Automation",
    "Live Dashboards with Gemini in Sheets",
    "Run the business by ratios, not vibes (Week 3 of your curriculum). This builds a live pipeline dashboard from a spreadsheet with conversational prompts — your conversion ratios, visible daily.",
    "Build one chart this week: leads to applications by source. That single ratio will change your marketing spend.",
    "Which ratio do you actually track weekly — and which one should you?",
    "https://www.youtube.com/watch?v=OYm80EVm0_8",
  ),
  pick(
    "a-ai-4",
    "AI Automation",
    "Frictionless Client Intake with AI Forms",
    "Onboarding friction kills conversion. Generate professional intake questionnaires from a single prompt and stop losing prospects at the paperwork stage.",
    "Replace your clunkiest intake step with an AI-generated form this week.",
    "Where do your prospects drop off in onboarding?",
    "https://www.youtube.com/watch?v=9UjcD5ScBwk",
  ),
  pick(
    "a-ai-5",
    "AI Automation",
    "Empathic Communication with AI in Gmail",
    "Delivering tough news without burning trust — and without burning an hour drafting it. Frameworks for tactful, emotionally intelligent replies to demanding clients and partners.",
    "Save one prompt template for 'deliver difficult news with empathy and authority' and use it on your next hard email.",
    "What's the hardest email you have to write regularly?",
    "https://www.youtube.com/watch?v=4wppKdmQID0",
  ),
  pick(
    "a-partner-1",
    "Partner Strategy",
    "Co-Marketing by Tier",
    "Not all agents earn the same investment. Tier A gets co-marketing assets and recurring touchpoints; Tier B gets value drops; Tier C gets the newsletter. Your Partner Tier Tracker (Resources > Tools) is built for exactly this.",
    "Tier your current partner list this week — A, B, or C next to every name. Then plan one co-marketing asset for your top Tier A.",
    "What co-marketing actually moved the needle with an agent — event, content, or something else?",
    undefined,
    { question: "How many true Tier-A partners do you have right now?", options: ["0 — building from scratch", "1–2", "3–5", "More than 5"] },
  ),
  pick(
    "a-community-1",
    "Community Marketing",
    "The Community & Multicultural Marketing Rhythm",
    "The most defensible growth channel is the community that already knows you. Pick one community — neighborhood, language, profession, culture — show up on a rhythm, serve in their context, and become the obvious lender there. Consistency beats reach.",
    "Choose one community to own this quarter. Put its recurring event or group on your calendar and add the rhythm to your Content Rhythm Tracker.",
    "Which community could you genuinely serve better than any other lender — and what's stopping you?",
  ),
];

export function getCoachPicks(program: ProgramKey): CoachPick[] {
  return program === "alliance" ? alliancePicks : masteryPicks;
}
