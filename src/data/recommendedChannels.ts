import { SkillLevel } from "@/lib/utils";

export type RecommendedChannel = {
  name: string;
  whatItIs: string;
  whyItHelps: string;
  level: SkillLevel | "All Levels";
};

export type RecommendedChannelCategory = {
  id: string;
  title: string;
  description: string;
  channels: RecommendedChannel[];
};

export const recommendedChannelCategories: RecommendedChannelCategory[] = [
  {
    id: "mortgage",
    title: "Mortgage and Loan Officer Growth",
    description:
      "Industry voices, sales coaches, and producers worth following for mortgage specific perspective. Treat as study material, not policy.",
    channels: [
      {
        name: "Mortgage Coach (Dave Savage and team)",
        whatItIs:
          "Industry voice on Total Cost Analysis and helping borrowers compare scenarios.",
        whyItHelps:
          "Sharpens the plan first conversation. Useful for 201 borrower conversion.",
        level: "Intermediate",
      },
      {
        name: "The Loan Officer Podcast (Frazier and Spencer)",
        whatItIs:
          "Weekly podcast covering production, partner growth, and origination strategy.",
        whyItHelps:
          "Solid practical content for newer LOs working on consistency.",
        level: "Beginner",
      },
      {
        name: "Mortgage Marketing Animals (Carl White)",
        whatItIs:
          "Community and content focused on referral partner growth and weekly habits.",
        whyItHelps:
          "Reinforces the 301 partner motion and the weekly rhythm.",
        level: "Intermediate",
      },
      {
        name: "Todd Duncan (High Trust Selling)",
        whatItIs:
          "High Trust Selling framework. Books, talks, and longform content on trust based sales.",
        whyItHelps:
          "Foundational for the 201 mindset of help, not pitch. The one Realtor who can give me 10 loans framing.",
        level: "All Levels",
      },
      {
        name: "HousingWire",
        whatItIs:
          "Mortgage and housing industry news and data.",
        whyItHelps:
          "Keeps your market context current. Useful for 401 and 601 content.",
        level: "All Levels",
      },
    ],
  },
  {
    id: "sales",
    title: "Sales Skills and Prospecting",
    description:
      "Sales research and frameworks that translate well to mortgage. Study the principles, not the boilerplate scripts.",
    channels: [
      {
        name: "Jeb Blount and Sales Gravy",
        whatItIs:
          "Books and podcast on prospecting and sales acceleration.",
        whyItHelps:
          "Builds the discipline behind 7 touch follow up and speed to lead.",
        level: "Intermediate",
      },
      {
        name: "Gong Labs",
        whatItIs:
          "Research arm of Gong analyzing hundreds of thousands of recorded sales calls.",
        whyItHelps:
          "Source of the 43 to 57 talk to listen ratio and the winners ask 15 to 16 questions benchmark used in 201.",
        level: "Intermediate",
      },
      {
        name: "Robert Cialdini (Influence)",
        whatItIs:
          "Seven principles of persuasion. Reciprocity, consistency, social proof, authority, liking, scarcity, unity.",
        whyItHelps:
          "Foundation for the trust mechanics in 201 and 301.",
        level: "All Levels",
      },
      {
        name: "Anthony Iannarino (The Sales Blog)",
        whatItIs:
          "Long form sales blog and books on consultative B2B sales.",
        whyItHelps:
          "Useful for advanced partner motion in 301 and niche selling in 601.",
        level: "Advanced",
      },
      {
        name: "Chris Voss (Never Split the Difference)",
        whatItIs:
          "Tactical empathy, mirroring, labeling, and calibrated questions.",
        whyItHelps:
          "Sharper discovery and objection redirects in 201. Pairs well with the High Trust Intake.",
        level: "Intermediate",
      },
    ],
  },
  {
    id: "marketing",
    title: "Marketing, Video, SEO, and Content",
    description:
      "Brand, content, video, and local SEO references. Useful for 401 and 601. Compliance still applies to anything borrower facing.",
    channels: [
      {
        name: "Alex Hormozi",
        whatItIs:
          "Offers and content frameworks. Books and short form video on hook craft.",
        whyItHelps:
          "Sharpens the hook structure for short form video in 401.",
        level: "Intermediate",
      },
      {
        name: "Gary Vaynerchuk",
        whatItIs:
          "Document don't create. Repurposing one topic across channels.",
        whyItHelps:
          "Backs the one creation, six distributions approach in 401.",
        level: "Intermediate",
      },
      {
        name: "Backlinko (Brian Dean)",
        whatItIs:
          "SEO research and step by step guides.",
        whyItHelps:
          "Solid grounding for any LO building a local SEO strategy in 401 and 601.",
        level: "Advanced",
      },
      {
        name: "Whitespark",
        whatItIs:
          "Annual Local Search Ranking Factors survey and Google Business Profile guidance.",
        whyItHelps:
          "Direct support for the GBP build and weekly post routine in 401.",
        level: "Advanced",
      },
      {
        name: "Justin Welsh",
        whatItIs:
          "Solopreneur content frameworks. LinkedIn and email focused.",
        whyItHelps:
          "Strong reference for the personal brand pillar in 401 and the niche brand strategy in 601.",
        level: "Intermediate",
      },
    ],
  },
  {
    id: "ai-workflow",
    title: "AI Tools and Workflow Design",
    description:
      "For advanced LOs comfortable building automations and AI workflows. Outputs are drafts. Every borrower or public artifact is still LO reviewed and compliance reviewed.",
    channels: [
      {
        name: "Anthropic Claude documentation",
        whatItIs:
          "Official Claude documentation. Tool use, prompt engineering, agents.",
        whyItHelps:
          "Reference for advanced AI workflow design in 601, especially when wiring TERA into deeper workflows.",
        level: "Advanced",
      },
      {
        name: "OpenAI Codex and ChatGPT documentation",
        whatItIs:
          "Reference for prompt design, function calling, and automation patterns.",
        whyItHelps:
          "Useful for advanced LOs comfortable building scripts and pipelines around AI outputs.",
        level: "Advanced",
      },
      {
        name: "n8n community templates",
        whatItIs:
          "Open source automation templates and patterns.",
        whyItHelps:
          "Patterns for connecting AI drafts to forms, sheets, and messaging without sending borrower facing content unreviewed.",
        level: "Advanced",
      },
    ],
  },
];
