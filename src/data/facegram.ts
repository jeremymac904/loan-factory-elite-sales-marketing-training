export type FaceGramGroup = {
  slug: string;
  name: string;
  visibility: string;
  memberCount: string;
  description: string;
  coverTitle: string;
  coverSubtitle: string;
  category: string;
  rules: string[];
};

export type FaceGramPost = {
  author: string;
  role: string;
  avatar: string;
  group: string;
  time: string;
  title: string;
  body: string;
  mediaLabel: string;
  accent: "orange" | "charcoal" | "silver";
};

export const faceGramGroups: FaceGramGroup[] = [
  {
    slug: "new-loan-officer-group",
    name: "New Loan Officer Group",
    visibility: "Internal group",
    memberCount: "668 members",
    category: "Onboarding",
    coverTitle: "Pass the SAFE Exam",
    coverSubtitle: "Newbie Loan Officer Group",
    description:
      "A starting place for new loan officers to ask questions, find study support, share wins, and build early confidence.",
    rules: [
      "Keep questions practical and respectful.",
      "Do not post borrower data or private files.",
      "Share examples for internal learning only.",
    ],
  },
  {
    slug: "spanish-speaking-los",
    name: "Spanish-Speaking LOs",
    visibility: "Internal group",
    memberCount: "214 members",
    category: "Language",
    coverTitle: "Spanish-Speaking LOs",
    coverSubtitle: "Scripts, questions, and community support",
    description:
      "A language-group space for bilingual LOs to discuss scripts, training ideas, and community-specific examples.",
    rules: [
      "Keep content internal to Loan Factory.",
      "Use reviewed wording before any external adaptation.",
      "Ask for coaching support when translation changes meaning.",
    ],
  },
  {
    slug: "california-strategy",
    name: "California Strategy",
    visibility: "Internal group",
    memberCount: "342 members",
    category: "State",
    coverTitle: "California Strategy",
    coverSubtitle: "Market conversations and referral partner ideas",
    description:
      "A state-focused group for California LOs to share internal ideas, partner strategies, and training questions.",
    rules: [
      "No rate, fee, or payment claims.",
      "Share examples as internal learning material.",
      "Send public-facing content through the proper review path.",
    ],
  },
  {
    slug: "aes-vendors",
    name: "AEs + Vendors",
    visibility: "Approved participation",
    memberCount: "156 members",
    category: "Partners",
    coverTitle: "AEs + Vendors",
    coverSubtitle: "Approved internal ideas and promotion summaries",
    description:
      "A controlled space where approved AEs and vendors can participate in internal education, idea sharing, and promotion summaries.",
    rules: [
      "Participation must be approved.",
      "No borrower data or production files.",
      "Promotions are internal summaries, not public offers.",
    ],
  },
  {
    slug: "apex-advisor",
    name: "Apex Advisor",
    visibility: "Member group",
    memberCount: "491 members",
    category: "Coaching",
    coverTitle: "Apex Advisor",
    coverSubtitle: "Coaching rhythm, scorecards, and accountability",
    description:
      "A group for Apex Advisor members to discuss coaching takeaways, scorecards, trackers, and daily execution.",
    rules: [
      "Keep coaching examples constructive.",
      "Do not blend Apex with the 101-601 training series.",
      "Share wins and questions that help other members execute.",
    ],
  },
  {
    slug: "sales-marketing-101-601",
    name: "Sales & Marketing 101-601",
    visibility: "Training group",
    memberCount: "732 members",
    category: "Training",
    coverTitle: "Sales & Marketing 101-601",
    coverSubtitle: "Scripts, prompts, roleplays, trackers, and handouts",
    description:
      "The internal conversation space for the six-part Sales & Marketing training series.",
    rules: [
      "Keep posts tied to training practice.",
      "Ask for feedback on scripts, roleplays, and tracker habits.",
      "Use the 101-601 series for training, not Apex paid coaching.",
    ],
  },
  {
    slug: "ai-training",
    name: "AI Training",
    visibility: "Internal group",
    memberCount: "405 members",
    category: "AI",
    coverTitle: "AI Training",
    coverSubtitle: "Prompt practice and safer draft review",
    description:
      "A group for prompt practice, Gemini Gem AI Twin setup, NotebookLM lessons, and AI workflow questions.",
    rules: [
      "Do not paste borrower data into prompts.",
      "Review every AI draft before using it.",
      "Use TERA as the system of record.",
    ],
  },
  {
    slug: "realtor-partner-strategy",
    name: "Realtor Partner Strategy",
    visibility: "Internal group",
    memberCount: "529 members",
    category: "Referral partners",
    coverTitle: "Realtor Partner Strategy",
    coverSubtitle: "Partner touches, scripts, and relationship building",
    description:
      "A practical group for referral partner conversations, open house follow-up, coffee invites, and weekly touch plans.",
    rules: [
      "No compensation or thing-of-value claims.",
      "Keep examples internal until reviewed.",
      "Focus on useful conversations and follow-up rhythm.",
    ],
  },
];

export const faceGramPosts: FaceGramPost[] = [
  {
    author: "Andre King",
    role: "LO Development",
    avatar: "/team/andre-king.png",
    group: "New Loan Officer Group",
    time: "Today",
    title: "What worked on today's first-call practice",
    body:
      "Share one sentence that helped you slow down the conversation and keep the borrower engaged.",
    mediaLabel: "Script thread",
    accent: "orange",
  },
  {
    author: "Duyen Nguyen",
    role: "Marketing",
    avatar: "/team/duyen-nguyen.png",
    group: "Sales & Marketing 101-601",
    time: "Yesterday",
    title: "Before and after: local event post",
    body:
      "This example is ready for internal feedback. Keep comments focused on clarity, audience, and review needs.",
    mediaLabel: "Image-style example",
    accent: "charcoal",
  },
  {
    author: "Edward Arvizo",
    role: "Corporate Coach",
    avatar: "/team/edward-arvizo.png",
    group: "Apex Advisor",
    time: "This week",
    title: "Power Hour win",
    body:
      "One LO booked two referral partner conversations by asking a cleaner next-step question. Drop your version below.",
    mediaLabel: "Video-style recap",
    accent: "silver",
  },
];

export const faceGramShortcuts = [
  { label: "Home Feed", href: "/creator-network/" },
  { label: "Groups", href: "/creator-network/groups/" },
  { label: "Saved Posts", href: "/creator-network/" },
  { label: "Internal Videos", href: "/creator-network/" },
  { label: "Feedback Requests", href: "/creator-network/" },
  { label: "Content Coach", href: "/ai-assistants/" },
];

export const lenderPromotionNotes = [
  {
    title: "Weekly lender highlights",
    body:
      "Approved lender promotion summaries can appear here after review.",
  },
  {
    title: "Future automation source",
    body:
      "Later, automation can review approved lender promotional emails and surface internal summaries.",
  },
];

export const faceGramRightRail = [
  "Training reminders",
  "Trending topics",
  "Upcoming coaching calls",
  "Top internal posts",
  "New groups",
];

export function getFaceGramGroup(slug: string) {
  return faceGramGroups.find((group) => group.slug === slug);
}
