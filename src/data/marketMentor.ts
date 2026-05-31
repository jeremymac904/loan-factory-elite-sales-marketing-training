/**
 * Market Mentor Studio — feature catalog
 *
 * Internal Loan Factory market intelligence, borrower advisory, Realtor value,
 * and AI video studio for approved Loan Factory users. Paid coaching members
 * get the full toolset; normal LOs see a preview.
 *
 * Tier mapping lives below in `marketMentorAccess`.
 */

export type MarketMentorTier = "preview" | "mastery_249" | "alliance_449";

export type MarketMentorTool = {
  slug: string;
  title: string;
  description: string;
  href: string;
  category:
    | "interpreter"
    | "advisory"
    | "realtor"
    | "scripts"
    | "video"
    | "practice"
    | "track";
  tier: MarketMentorTier;
  status: "live" | "staged" | "needs_ai_connection";
};

export const marketMentorTools: MarketMentorTool[] = [
  {
    slug: "market-update",
    title: "Market Update Interpreter",
    description:
      "Turn a market headline, rate report, or internal note into useful borrower, Realtor, social, video, and email language.",
    href: "/market-mentor/market-update",
    category: "interpreter",
    tier: "mastery_249",
    status: "needs_ai_connection",
  },
  {
    slug: "rate-explainer",
    title: "Rate Movement Explainer",
    description:
      "Plain-English lessons on why mortgage rates move — inflation, jobs report, Fed vs mortgage rates, bonds, lock vs float.",
    href: "/market-mentor/rate-explainer",
    category: "advisory",
    tier: "mastery_249",
    status: "live",
  },
  {
    slug: "cost-of-waiting",
    title: "Cost of Waiting Builder",
    description:
      "Educational scenario builder for the cost-of-waiting conversation. Borrower and Realtor talking points, video script, and follow-up draft.",
    href: "/market-mentor/cost-of-waiting",
    category: "advisory",
    tier: "mastery_249",
    status: "staged",
  },
  {
    slug: "buy-vs-rent",
    title: "Buy vs Rent Advisory Lab",
    description:
      "Educational rent vs ownership conversation. No guarantees, no wealth promise — talking points, video template, objection roleplay.",
    href: "/market-mentor/buy-vs-rent",
    category: "advisory",
    tier: "mastery_249",
    status: "staged",
  },
  {
    slug: "debt-consolidation",
    title: "Debt Consolidation Conversation Builder",
    description:
      "Responsible cash-out and consolidation conversation. Risk reminders, breakeven framing, monthly cashflow talking points.",
    href: "/market-mentor/debt-consolidation",
    category: "advisory",
    tier: "mastery_249",
    status: "staged",
  },
  {
    slug: "realtor-update",
    title: "Realtor Market Expert Kit",
    description:
      "Weekly Realtor market update builder, open house and listing support angles, email, text, social drafts, FaceGram seed.",
    href: "/market-mentor/realtor-update",
    category: "realtor",
    tier: "mastery_249",
    status: "live",
  },
  {
    slug: "roleplay",
    title: "Market Roleplay Arena",
    description:
      "Practice scenarios for market conversations — nervous first-time buyer, rate shopper, skeptical Realtor, refinance borrower, and more.",
    href: "/market-mentor/roleplay",
    category: "practice",
    tier: "mastery_249",
    status: "needs_ai_connection",
  },
  {
    slug: "video-studio",
    title: "AI Avatar Video Studio",
    description:
      "Powered by HeyGen connection. Market update, Realtor weekly, coaching recap, training nugget, buyer education, bilingual templates.",
    href: "/market-mentor/video-studio",
    category: "video",
    tier: "alliance_449",
    status: "needs_ai_connection",
  },
  {
    slug: "templates",
    title: "Template Library",
    description:
      "Reusable script templates, talking points, prompt cards, and HeyGen video templates across every Market Mentor tool.",
    href: "/market-mentor/templates",
    category: "scripts",
    tier: "mastery_249",
    status: "live",
  },
  {
    slug: "certification",
    title: "Market Mentor Certification",
    description:
      "Internal recognition track — Market Basics through Market Mentor Complete. Progress tracked locally for now.",
    href: "/market-mentor/certification",
    category: "track",
    tier: "mastery_249",
    status: "staged",
  },
];

export type MarketMentorAccessRole =
  | "master_admin"
  | "admin"
  | "lo_development_lead"
  | "lo_development_member"
  | "training_academy"
  | "corporate_coach"
  | "marketing"
  | "team_leader"
  | "coaching_member_level_1"
  | "coaching_member_level_2"
  | "loan_officer";

/**
 * Full toolset access — paid coaching and internal leadership.
 */
export const marketMentorFullAccessRoles: MarketMentorAccessRole[] = [
  "master_admin",
  "admin",
  "lo_development_lead",
  "lo_development_member",
  "training_academy",
  "corporate_coach",
  "marketing",
  "team_leader",
  "coaching_member_level_1",
  "coaching_member_level_2",
];

/**
 * Preview-only access — normal approved Loan Factory LOs see the hub and an
 * overview of what the paid version includes, but tools are gated.
 */
export const marketMentorPreviewOnlyRoles: MarketMentorAccessRole[] = [
  "loan_officer",
];

export function hasMarketMentorFullAccess(role: string | null | undefined): boolean {
  if (!role) return false;
  return marketMentorFullAccessRoles.includes(role as MarketMentorAccessRole);
}

export function hasMarketMentorAlliance(role: string | null | undefined): boolean {
  return role === "coaching_member_level_2" ||
    role === "master_admin" ||
    role === "admin" ||
    role === "lo_development_lead" ||
    role === "corporate_coach";
}

export type MarketMentorCertificationStep = {
  slug: string;
  title: string;
  description: string;
  order: number;
};

export const marketMentorCertificationSteps: MarketMentorCertificationStep[] = [
  { slug: "market-basics", order: 1, title: "Market Basics", description: "What moves mortgage rates and how to talk about it plainly." },
  { slug: "rate-movement", order: 2, title: "Rate Movement", description: "Inflation, jobs, Fed vs mortgage rates, mortgage bonds, lock vs float." },
  { slug: "buyer-advisory", order: 3, title: "Buyer Advisory", description: "How to advise a buyer without predicting rates or promising appreciation." },
  { slug: "realtor-market-updates", order: 4, title: "Realtor Market Updates", description: "Build a useful weekly Realtor update without overpromising." },
  { slug: "cost-of-waiting", order: 5, title: "Cost of Waiting", description: "Educational cost-of-waiting conversation, clearly labeled as estimate." },
  { slug: "buy-vs-rent", order: 6, title: "Buy vs Rent", description: "Responsible buy vs rent conversation. No wealth promise." },
  { slug: "debt-consolidation", order: 7, title: "Debt Consolidation", description: "Cash-out / consolidation conversation. Responsible framing." },
  { slug: "video-market-updates", order: 8, title: "Video Market Updates", description: "Use the AI Avatar Video Studio responsibly. Review before sharing." },
  { slug: "market-mentor-complete", order: 9, title: "Market Mentor Complete", description: "All steps complete. Internal recognition." },
];

export const marketMentorAudienceOptions = [
  "Borrower",
  "Realtor",
  "Past client",
  "Coaching member",
  "FaceGram post",
  "Video script",
] as const;

export const marketMentorToneOptions = [
  "Plain English",
  "Confident",
  "Calm",
  "Educational",
  "Urgent but not pushy",
] as const;

export type MarketMentorAudience = (typeof marketMentorAudienceOptions)[number];
export type MarketMentorTone = (typeof marketMentorToneOptions)[number];

export const responsibleLanguageReminders = [
  "Educational estimate only.",
  "Review before using externally.",
  "Do not predict where rates will go.",
  "Do not promise appreciation or guaranteed savings.",
  "Use approved adaptation review before any public-facing post.",
];
