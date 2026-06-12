/**
 * Podcast library metadata — source of truth for the Resources > Podcast tab.
 *
 * Audio lives in Supabase Storage (see PODCAST_AUDIO_BASE below); source
 * masters stay in the workspace "Audio Podcast" folder, out of the repo.
 * Titles are cleaned from the file names; summaries/takeaways are derived from
 * the titles until transcripts exist. Transcript status flips to "ready" when
 * a matching report lands in public/podcast-transcripts/.
 */

/**
 * Audio is hosted in Supabase Storage (public bucket "podcasts", 64kbps mono
 * AAC podcast encodes) — works in production, no repo or symlink dependency.
 */
export const PODCAST_AUDIO_BASE =
  "https://ajitnzvbplyjrlzwzmwe.supabase.co/storage/v1/object/public/podcasts/";

export function podcastAudioUrl(file: string): string {
  return `${PODCAST_AUDIO_BASE}${encodeURIComponent(file)}`;
}

export const PODCAST_CATEGORIES = [
  "Sales Psychology",
  "Realtor Relationships",
  "Community Marketing",
  "Foreign Language Community Growth",
  "Pipeline Systems",
  "Mortgage Strategy",
  "AI and Automation",
  "Mindset and Discipline",
] as const;

export type PodcastCategory = (typeof PODCAST_CATEGORIES)[number];

export type PodcastEpisode = {
  slug: string;
  title: string;
  category: PodcastCategory;
  summary: string;
  takeaways: string[];
  action: string;
  /** File name inside /podcasts/ (the Audio Podcast folder). */
  file: string;
  transcript: "ready" | "pending";
  /** Cover art: branded category placeholder until final art is generated. */
  cover: string;
  coverStatus: "placeholder" | "final";
};

const CATEGORY_COVER: Record<PodcastCategory, string> = {
  "Sales Psychology": "/podcast-covers/sales-psychology.svg",
  "Realtor Relationships": "/podcast-covers/realtor-relationships.svg",
  "Community Marketing": "/podcast-covers/community-marketing.svg",
  "Foreign Language Community Growth": "/podcast-covers/foreign-language-community-growth.svg",
  "Pipeline Systems": "/podcast-covers/pipeline-systems.svg",
  "Mortgage Strategy": "/podcast-covers/mortgage-strategy.svg",
  "AI and Automation": "/podcast-covers/ai-and-automation.svg",
  "Mindset and Discipline": "/podcast-covers/mindset-and-discipline.svg",
};

function episode(
  file: string,
  title: string,
  category: PodcastCategory,
  summary: string,
  takeaways: string[],
  action: string,
  transcript: "ready" | "pending" = "pending",
): PodcastEpisode {
  return {
    slug: file.replace(/\.m4a$/, "").toLowerCase().replace(/_/g, "-"),
    title,
    category,
    summary,
    takeaways,
    action,
    file,
    transcript,
    cover: CATEGORY_COVER[category],
    coverStatus: "placeholder",
  };
}

export const podcastEpisodes: PodcastEpisode[] = [
  episode(
    "Behavioral_Architecture_for_High_Stakes_Sales.m4a",
    "Behavioral Architecture for High-Stakes Sales",
    "Sales Psychology",
    "How to design your sales behavior on purpose — the structures, cues, and habits that hold up when the deal and the emotions are big.",
    [
      "High-stakes conversations reward preparation systems, not improvisation",
      "Behavior you architect in advance beats willpower in the moment",
      "Pressure exposes whatever process you didn't build",
    ],
    "Write the pre-call routine you will run before every high-stakes conversation this week.",
  ),
  episode(
    "Build_an_unshakeable_TERA_pipeline_rhythm.m4a",
    "Build an Unshakeable TERA Pipeline Rhythm",
    "Pipeline Systems",
    "Installing a weekly pipeline rhythm that keeps prospecting, follow-up, and partner touches running no matter how busy file work gets.",
    [
      "A pipeline rhythm is a calendar commitment, not a to-do list",
      "Consistency in small weekly blocks compounds into predictable closings",
      "Busy file weeks are exactly when the rhythm matters most",
    ],
    "Block your pipeline rhythm into next week's calendar before Monday — then protect it.",
  ),
  episode(
    "Building_a_Sane_Mortgage_Pipeline_Engine.m4a",
    "Building a Sane Mortgage Pipeline Engine",
    "Pipeline Systems",
    "Turning a chaotic pipeline into an engine: clear stages, next actions on every file, and a review cadence that removes the daily scramble.",
    [
      "Every deal needs a stage and a next action — no exceptions",
      "A sane pipeline is reviewed on a schedule, not when it hurts",
      "Systems lower stress and raise conversion at the same time",
    ],
    "Open your Deal Flow Tracker and fill in the next action for every active file.",
  ),
  episode(
    "Building_local_authority_through_compliant_content.m4a",
    "Building Local Authority Through Compliant Content",
    "Community Marketing",
    "Becoming the known local expert with content that educates your market — while staying inside compliance lines.",
    [
      "Local authority is built by answering real local questions consistently",
      "Compliant educational content outlasts hype content",
      "Authority compounds: each piece makes the next referral warmer",
    ],
    "Publish one locally-focused educational piece this week — a question your buyers actually asked.",
  ),
  episode(
    "Building_Trust_in_Russian_Speaking_Communities.m4a",
    "Building Trust in Russian-Speaking Communities",
    "Foreign Language Community Growth",
    "What it takes to earn and keep trust in Russian-speaking communities — language, presence, and serving in cultural context.",
    [
      "Trust in close-knit communities is earned in person and kept by reputation",
      "Serving in someone's language is a service, not a marketing tactic",
      "One well-served family opens an entire network",
    ],
    "Identify one community connector you can serve this month — without asking for anything.",
  ),
  episode(
    "Close_40_million_with_110_contacts.m4a",
    "Close $40 Million with 110 Contacts",
    "Pipeline Systems",
    "Why a small, deeply-served database can out-produce a huge cold list — depth of relationship over breadth of contacts.",
    [
      "Production comes from relationship depth, not contact count",
      "A served database refers; a stored database forgets you",
      "Knowing 110 people well is a system, not an accident",
    ],
    "List your top 25 relationships and schedule a real touch for each over the next 30 days.",
  ),
  episode(
    "Close_More_Loans_By_Shrinking_Your_Database.m4a",
    "Close More Loans by Shrinking Your Database",
    "Pipeline Systems",
    "The counterintuitive move: cut the dead weight, focus on the contacts you can genuinely serve, and watch conversion rise.",
    [
      "A smaller list you actually work beats a big list you ignore",
      "Pruning forces clarity about who your real relationships are",
      "Service capacity is finite — point it at the right people",
    ],
    "Cut your database to the people you can genuinely serve this quarter; archive the rest.",
  ),
  episode(
    "Community_Is_Your_Ultimate_Competitive_Advantage.m4a",
    "Community Is Your Ultimate Competitive Advantage",
    "Community Marketing",
    "Why the lender who belongs to the community beats the lender with the bigger ad budget — and how to actually belong.",
    [
      "Community presence is a moat no competitor can copy quickly",
      "Belonging means contributing before extracting",
      "The obvious local lender wins deals that never go to bidding",
    ],
    "Pick the one community you'll genuinely belong to this year and show up this week.",
  ),
  episode(
    "Community_Trust_Beats_Massive_Ad_Budgets.m4a",
    "Community Trust Beats Massive Ad Budgets",
    "Community Marketing",
    "Trust built face-to-face in a community outperforms paid reach — the economics and the playbook.",
    [
      "Earned trust converts at rates paid ads never reach",
      "Consistent presence beats sporadic sponsorship",
      "Your reputation is the cheapest media you'll ever own",
    ],
    "Replace one ad-spend hour this week with one in-person community hour. Compare what comes back.",
  ),
  episode(
    "Daily_habits_for_a_Michelin_star_mortgage.m4a",
    "Daily Habits for a Michelin-Star Mortgage Practice",
    "Mindset and Discipline",
    "Running your practice like a top kitchen: daily prep, standards that never slip, and excellence as a habit rather than an event.",
    [
      "Excellence is a daily standard, not a big-moment performance",
      "Mise en place for an LO: prep tomorrow's calls today",
      "Small daily disciplines are what clients experience as 'quality'",
    ],
    "Write your daily non-negotiables — three of them — and run them every working day this week.",
  ),
  episode(
    "Double_your_mortgage_pipeline_by_talking_less.m4a",
    "Double Your Mortgage Pipeline by Talking Less",
    "Sales Psychology",
    "The listening-to-talking ratio that wins borrowers: diagnostic questions, real silence, and letting the client sell themselves.",
    [
      "The person asking questions controls the conversation",
      "Silence after a question is where the real answer arrives",
      "Borrowers commit to plans they helped build",
    ],
    "On your next three borrower calls, track your talk time — aim to stay under 40%.",
  ),
  episode(
    "Engineered_Systems_for_Mortgage_Realtor_Partnerships.m4a",
    "Engineered Systems for Mortgage-Realtor Partnerships",
    "Realtor Relationships",
    "Moving agent relationships from vibes to systems: defined touchpoints, value cadence, and partnership standards that scale.",
    [
      "Partnerships survive on systems, not memory",
      "Define the value cadence: what every partner gets, and when",
      "Engineered consistency is what top agents call 'reliability'",
    ],
    "Build the touch cadence for your top five agents into your Realtor Relationship Tracker now.",
  ),
  episode(
    "Hispanic_Buyers_Drive_All_Housing_Growth.m4a",
    "Hispanic Buyers Drive Housing Growth",
    "Foreign Language Community Growth",
    "The demographic reality: Hispanic households are the engine of homeownership growth — and what serving that market well requires.",
    [
      "The growth market is already in your backyard",
      "Serving the market means language, trust, and family-centered process",
      "Early movers in underserved markets become the default lender",
    ],
    "Map the Hispanic community organizations in your market and pick one to connect with this month.",
  ),
  episode(
    "How_Russian_loan_officers_beat_big_banks.m4a",
    "How Russian-Speaking Loan Officers Beat Big Banks",
    "Foreign Language Community Growth",
    "Why community LOs win against big-bank pricing: trust, speed, language, and being personally accountable to a community.",
    [
      "Banks have rates; community LOs have relationships and accountability",
      "In-language guidance removes the fear big banks can't address",
      "Community reputation is a referral engine banks can't buy",
    ],
    "Write down the three things you offer that a big bank cannot — and say them on your next call.",
  ),
  episode(
    "How_Trust_Powers_the_Hispanic_Market.m4a",
    "How Trust Powers the Hispanic Market",
    "Foreign Language Community Growth",
    "Trust as the core currency in Hispanic homebuying — multigenerational decisions, family advisors, and the LO's role inside that circle.",
    [
      "The buying decision often includes the whole family — serve the whole family",
      "Trust travels: one well-served household becomes a referral network",
      "Patience with first-generation buyers builds decade-long clients",
    ],
    "Adjust your consult to welcome family decision-makers instead of working around them.",
  ),
  episode(
    "Scaling_business_through_Vietnamese_community_trust.m4a",
    "Scaling Business Through Vietnamese Community Trust",
    "Foreign Language Community Growth",
    "How deep roots in the Vietnamese community scale into a durable mortgage business — presence, patience, and reputation.",
    [
      "Community trust scales through reputation, not advertising",
      "Show up at the community's events, not just your own",
      "Long loyalty cycles reward the LO who stays present",
    ],
    "Add the next three Vietnamese community events in your market to your calendar.",
  ),
  episode(
    "Scaling_Community_Trust_With_AI.m4a",
    "Scaling Community Trust with AI",
    "AI and Automation",
    "Using AI to extend — not replace — community trust: in-language follow-ups, content leverage, and freeing hours for face time.",
    [
      "AI should buy you more human hours, not replace them",
      "In-language communication at scale is now possible for one LO",
      "Automate the admin; never automate the relationship",
    ],
    "Pick one repetitive communication task and hand it to AI this week — spend the saved hour in the community.",
  ),
  episode(
    "Stop_Shaking_the_Referral_Vending_Machine.m4a",
    "Stop Shaking the Referral Vending Machine",
    "Realtor Relationships",
    "Why 'got anything for me?' kills agent relationships — and the value-first approach that makes referrals automatic.",
    [
      "Asking for referrals without depositing value is extraction",
      "Partners refer when you solve their problems, not when you ask harder",
      "Be the lender agents brag about, not the one they dodge",
    ],
    "Before your next referral ask, make three genuine value deposits with that partner.",
  ),
  episode(
    "Why_Mortgages_Are_Not_a_Numbers_Game.m4a",
    "Why Mortgages Are Not a Numbers Game",
    "Sales Psychology",
    "Against pure volume thinking: mortgages are a trust business where conversion quality beats activity quantity.",
    [
      "Ten deep conversations beat a hundred shallow dials",
      "Clients buy certainty and care, not spreadsheets",
      "Measure relationships advanced, not just calls made",
    ],
    "Review last week's activity: which numbers actually moved relationships forward? Do more of those.",
  ),
  episode(
    "Why_Your_Client_Rejected_the_Math.m4a",
    "Why Your Client Rejected the Math",
    "Sales Psychology",
    "The deal made financial sense and they still said no — the emotional logic underneath every borrower decision.",
    [
      "People decide emotionally and justify with math, not the reverse",
      "Address the fear before you present the figures",
      "A confused or scared client says no to a 'perfect' deal",
    ],
    "On your next presentation, name the client's biggest fear out loud before showing numbers.",
  ),
  episode(
    "Why_Your_Plan_B_is_Dangerous.m4a",
    "Why Your Plan B Is Dangerous",
    "Mindset and Discipline",
    "How a comfortable fallback quietly drains the commitment your primary plan needs to work.",
    [
      "Energy split between Plan A and Plan B weakens both",
      "Commitment changes behavior in ways optionality never will",
      "Burn the boats on the goals that matter",
    ],
    "Name the escape hatch you're keeping open — and decide this week whether to close it.",
  ),
  episode(
    "Win_Realtors_with_Experience_Architecture.m4a",
    "Win Realtors with Experience Architecture",
    "Realtor Relationships",
    "Designing the agent experience end-to-end — communication standards, surprise moments, and a process agents want to attach their name to.",
    [
      "Agents refer the experience, not the rate sheet",
      "Design every touchpoint an agent has with your process",
      "Predictability plus occasional delight equals loyalty",
    ],
    "Map every touchpoint an agent has with you on one deal — fix the weakest one this week.",
  ),
  episode(
    "Win_the_first_call_borrower_conversion.m4a",
    "Win the First-Call Borrower Conversion",
    "Sales Psychology",
    "The first borrower call decides the relationship: structure, trust-building, and converting inquiry into commitment.",
    [
      "The first call sets the frame for the entire deal",
      "Diagnose before you prescribe — questions first, options second",
      "End every first call with a clear, scheduled next step",
    ],
    "Script your first-call structure: opener, three diagnostic questions, and the close for the next step.",
  ),
  episode(
    "Winning_the_multigenerational_mortgage_market.m4a",
    "Winning the Multigenerational Mortgage Market",
    "Mortgage Strategy",
    "Multigenerational households are a growing share of purchases — structuring deals and conversations for buyers who decide as a family.",
    [
      "Multigenerational buying is a strategy opportunity, not a complication",
      "The LO who can structure for extended families wins unique deals",
      "Family-decision processes need patience and clear education",
    ],
    "Learn the loan structures that fit multigenerational purchases and add one to your toolkit this month.",
  ),
  episode(
    "Winning_the_Punjabi_American_Mortgage_Market.m4a",
    "Winning the Punjabi-American Mortgage Market",
    "Foreign Language Community Growth",
    "Serving Punjabi-American buyers well: community presence, family-centered deals, and trust built the long way.",
    [
      "Community events and gurdwara networks matter more than ads",
      "Family and business assets often shape the file — learn the patterns",
      "Reputation in the community is the only marketing that scales here",
    ],
    "Find the Punjabi community hubs in your market and make one genuine connection this month.",
  ),
  episode(
    "Winning_Vietnamese_mortgage_deals_through_trust.m4a",
    "Winning Vietnamese Mortgage Deals Through Trust",
    "Foreign Language Community Growth",
    "Earning Vietnamese-American clients: language, patience with documentation patterns, and becoming the community's trusted advisor.",
    [
      "Trust is referred person-to-person — earn it one family at a time",
      "Understand the community's documentation and savings patterns",
      "The trusted advisor gets the whole network, not just the deal",
    ],
    "Ask your best Vietnamese-American client what made them trust you — then do more of that on purpose.",
  ),
];

export function podcastsByCategory(): { category: PodcastCategory; episodes: PodcastEpisode[] }[] {
  return PODCAST_CATEGORIES.map((category) => ({
    category,
    episodes: podcastEpisodes.filter((e) => e.category === category),
  })).filter((group) => group.episodes.length > 0);
}
