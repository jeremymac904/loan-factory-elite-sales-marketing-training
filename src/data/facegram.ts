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
    coverTitle: "First 90 Days at Loan Factory",
    coverSubtitle: "Systems, first files, first conversations, and where to ask questions",
    description:
      "A starting place for new loan officers to ask questions, learn Loan Factory systems, build a daily rhythm, discuss first files, and get help with first conversations.",
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
      "A place for bilingual LOs to discuss scripts, training ideas, and community examples.",
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
    slug: "team-leaders",
    name: "Team Leaders",
    visibility: "Internal group",
    memberCount: "118 members",
    category: "Leadership",
    coverTitle: "Team Leaders",
    coverSubtitle: "Team coaching, accountability, and group support",
    description:
      "A leader space for weekly accountability prompts, team training assignments, script practice, and team FaceGram group support.",
    rules: [
      "Do not share private team member details outside the right group.",
      "Keep coaching examples practical and respectful.",
      "Route marketing-sensitive examples to review.",
    ],
  },
  {
    slug: "vendor-lender-partner-preview",
    name: "Vendor/Lender Partner Review",
    visibility: "Approval-based group",
    memberCount: "Partner review group",
    category: "Partners",
    coverTitle: "Vendor/Lender Partner Review",
    coverSubtitle: "Sponsored content review and training resources",
    description:
      "A controlled area for reviewed vendor and wholesale lender training classes, resources, and sponsored placements.",
    rules: [
      "Vendor posting requires LO Development approval.",
      "No borrower data or production files.",
      "Sponsored resources require admin or marketing approval.",
    ],
  },
  {
    slug: "apex-advisor",
    name: "LO Mastery",
    visibility: "Member group",
    memberCount: "491 members",
    category: "Coaching",
    coverTitle: "LO Mastery",
    coverSubtitle: "Coaching rhythm, scorecards, and accountability",
    description:
      "A group for LO Mastery members to discuss coaching takeaways, scorecards, trackers, and daily execution.",
    rules: [
      "Keep coaching examples constructive.",
      "Do not blend paid coaching with the 101-601 training series.",
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
      "Use the 101-601 series for training, not paid coaching.",
    ],
  },
  {
    slug: "ai-training",
    name: "AI Advantage",
    visibility: "Internal group",
    memberCount: "405 members",
    category: "AI",
    coverTitle: "AI Advantage",
    coverSubtitle: "Prompt practice and safer draft review",
    description:
      "A group for prompt practice, AI setup questions, NotebookLM lessons, and safer draft review.",
    rules: [
      "Do not paste borrower data into prompts.",
      "Review every AI draft before using it.",
      "Use official Loan Factory systems as the source of truth.",
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
    group: "LO Mastery",
    time: "This week",
    title: "Power Hour win",
    body:
      "One LO booked two referral partner conversations by asking a cleaner next-step question. Drop your version below.",
    mediaLabel: "Video-style recap",
    accent: "silver",
  },
];

export const faceGramShortcuts = [
  { label: "Home Feed", href: "/facegram/" },
  { label: "Groups", href: "/facegram/groups/" },
  { label: "Profile", href: "/facegram/#profile" },
  { label: "Saved", href: "/facegram/#saved-posts" },
  { label: "Events", href: "/facegram/groups/team-leaders/?tab=events" },
  { label: "AI Assistants", href: "/ai-assistants/" },
];

export const lenderPromotionNotes = [
  {
    sponsor: "Rocket",
    label: "Sponsored / Demo placement",
    title: "Rocket training spotlight",
    cta: "View resource",
    accent: "R",
    body:
      "Reviewed lender training example for internal education. Vendor content requires LO Development approval before it appears in beta.",
  },
  {
    sponsor: "PennyMac",
    label: "Sponsored / Demo placement",
    title: "PennyMac partner resource",
    cta: "Learn more",
    accent: "P",
    body:
      "Partner resource example for a future class, guide, or replay. Vendor self-posting is not enabled.",
  },
];

export const faceGramRightRail = [
  {
    title: "101 Foundation this week",
    body: "Practice the first-call follow-up and post one sentence that worked.",
    action: "Open training reminder",
  },
  {
    title: "First-call follow-up",
    body: "Compare quick openers, next-step questions, and cleaner handoffs.",
    action: "View topic",
  },
  {
    title: "Coaching calendar",
    body: "See group check-ins, script practice, and office-hour reminders.",
    action: "View schedule",
  },
  {
    title: "Saved posts",
    body: "Review posts you bookmarked from the feed during this session.",
    action: "Open saved posts",
  },
  {
    title: "New groups",
    body: "Browse active FaceGram groups for training, coaching, and team support.",
    action: "Open groups",
  },
];

export function getFaceGramGroup(slug: string) {
  return faceGramGroups.find((group) => group.slug === slug);
}
