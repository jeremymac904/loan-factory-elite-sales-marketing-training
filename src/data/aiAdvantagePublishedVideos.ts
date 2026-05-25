export type AiAdvantageVideoSection =
  | "Foundations"
  | "AI Twin Setup"
  | "Client Communication"
  | "Marketing & Content"
  | "Content Creation";

export type AiAdvantagePublishedVideo = {
  rowId: string;
  slug: string;
  title: string;
  description: string;
  youtubeVideoId: string;
  youtubeVideoUrl: string;
  youtubeEmbedUrl: string;
  status: "published";
  privacy: "unlisted";
  platformSection: "AI Advantage";
  source: "YouTube";
  librarySection: AiAdvantageVideoSection;
  pathSlug: string;
  sourceFileName: string;
  suggestedLessonPage: string;
  notes: string;
};

export const aiAdvantageVideoSectionOrder: AiAdvantageVideoSection[] = [
  "Foundations",
  "AI Twin Setup",
  "Client Communication",
  "Marketing & Content",
  "Content Creation",
];

export const aiAdvantagePublishedVideos = [
  {
    rowId: "TEST-001",
    slug: "test-001",
    title: "AI Advantage: AI Training Overview, Content Research and Automation",
    description:
      "Start here for the big-picture tour of AI Advantage, content research, and how these lessons help loan officers work faster with review.",
    youtubeVideoId: "c8zULkTrwGU",
    youtubeVideoUrl: "https://www.youtube.com/watch?v=c8zULkTrwGU",
    youtubeEmbedUrl: "https://www.youtube.com/embed/c8zULkTrwGU",
    status: "published",
    privacy: "unlisted",
    platformSection: "AI Advantage",
    source: "YouTube",
    librarySection: "Foundations",
    pathSlug: "notebooklm",
    sourceFileName:
      "ai-advantage__2026-04-14__ai-training-overview-content-research-and-automation__0000-0055.mp4",
    suggestedLessonPage:
      "/lo-development/ai-advantage/foundations/ai-training-overview",
    notes:
      "Series overview and orientation clip. Good as the first lesson in the library. Originally the pipeline test upload.",
  },
  {
    rowId: "AIA-002",
    slug: "aia-002",
    title: "AI Advantage: AI Data Security for Loan Officers",
    description:
      "Learn the security basics: protect private information, keep borrower data out of AI tools, and use human review before anything leaves Loan Factory.",
    youtubeVideoId: "ozTujCSxaqE",
    youtubeVideoUrl: "https://www.youtube.com/watch?v=ozTujCSxaqE",
    youtubeEmbedUrl: "https://www.youtube.com/embed/ozTujCSxaqE",
    status: "published",
    privacy: "unlisted",
    platformSection: "AI Advantage",
    source: "YouTube",
    librarySection: "Foundations",
    pathSlug: "ai-safety",
    sourceFileName:
      "ai-advantage__2026-02-11__ai-data-security-for-loan-officers__1758-1917.mp4",
    suggestedLessonPage:
      "/lo-development/ai-advantage/foundations/ai-data-security-for-loan-officers",
    notes: "Compliance and security foundation. Pair early with onboarding.",
  },
  {
    rowId: "AIA-003",
    slug: "aia-003",
    title: "AI Advantage: AI Powered Loan Status Updates",
    description:
      "Use AI to draft clearer loan status updates while keeping judgment, accuracy, and review in the process.",
    youtubeVideoId: "5BPKlTxCJPU",
    youtubeVideoUrl: "https://www.youtube.com/watch?v=5BPKlTxCJPU",
    youtubeEmbedUrl: "https://www.youtube.com/embed/5BPKlTxCJPU",
    status: "published",
    privacy: "unlisted",
    platformSection: "AI Advantage",
    source: "YouTube",
    librarySection: "Client Communication",
    pathSlug: "gmail-workspace",
    sourceFileName:
      "ai-advantage__2026-02-11__ai-powered-loan-status-updates__5645-5825.mp4",
    suggestedLessonPage:
      "/lo-development/ai-advantage/client-communication/ai-powered-loan-status-updates",
    notes: "Borrower communication automation.",
  },
  {
    rowId: "AIA-004",
    slug: "aia-004",
    title: "AI Advantage: Automating your Daily Market Updates",
    description:
      "Turn daily market information into a repeatable draft workflow for reviewed education and follow-up content.",
    youtubeVideoId: "ti-AwZl14vk",
    youtubeVideoUrl: "https://www.youtube.com/watch?v=ti-AwZl14vk",
    youtubeEmbedUrl: "https://www.youtube.com/embed/ti-AwZl14vk",
    status: "published",
    privacy: "unlisted",
    platformSection: "AI Advantage",
    source: "YouTube",
    librarySection: "Marketing & Content",
    pathSlug: "social-realtor-marketing",
    sourceFileName:
      "ai-advantage__2026-02-11__automating-your-daily-market-updates__5144-5305.mp4",
    suggestedLessonPage:
      "/lo-development/ai-advantage/marketing/automating-daily-market-updates",
    notes: "Daily market content automation.",
  },
  {
    rowId: "AIA-005",
    slug: "aia-005",
    title: "AI Advantage: Dominating your Local Market with AI",
    description:
      "Use local market context to create stronger education and marketing ideas without making claims that require review first.",
    youtubeVideoId: "dynRVCanBGA",
    youtubeVideoUrl: "https://www.youtube.com/watch?v=dynRVCanBGA",
    youtubeEmbedUrl: "https://www.youtube.com/embed/dynRVCanBGA",
    status: "published",
    privacy: "unlisted",
    platformSection: "AI Advantage",
    source: "YouTube",
    librarySection: "Marketing & Content",
    pathSlug: "google-business-profile",
    sourceFileName:
      "ai-advantage__2026-02-11__dominating-your-local-market-with-ai__3852-4100.mp4",
    suggestedLessonPage:
      "/lo-development/ai-advantage/marketing/dominating-your-local-market-with-ai",
    notes: "Local market and SEO angle.",
  },
  {
    rowId: "AIA-006",
    slug: "aia-006",
    title: "AI Advantage: Drafting Client Emails in Gmail",
    description:
      "Draft clearer client emails in Gmail faster, then review every word before sending anything externally.",
    youtubeVideoId: "GBfe2N9Du64",
    youtubeVideoUrl: "https://www.youtube.com/watch?v=GBfe2N9Du64",
    youtubeEmbedUrl: "https://www.youtube.com/embed/GBfe2N9Du64",
    status: "published",
    privacy: "unlisted",
    platformSection: "AI Advantage",
    source: "YouTube",
    librarySection: "Client Communication",
    pathSlug: "gmail-workspace",
    sourceFileName:
      "ai-advantage__2026-02-11__drafting-client-emails-in-gmail__4340-4545.mp4",
    suggestedLessonPage:
      "/lo-development/ai-advantage/client-communication/drafting-client-emails-in-gmail",
    notes: "Gmail and Gemini drafting.",
  },
  {
    rowId: "AIA-007",
    slug: "aia-007",
    title: "AI Advantage: Finalizing your Gemini Gem Setup",
    description:
      "Finish the Gemini Gem setup sequence so your AI helper is easier to use in practical loan officer workflows.",
    youtubeVideoId: "Saz-qFxCu1Y",
    youtubeVideoUrl: "https://www.youtube.com/watch?v=Saz-qFxCu1Y",
    youtubeEmbedUrl: "https://www.youtube.com/embed/Saz-qFxCu1Y",
    status: "published",
    privacy: "unlisted",
    platformSection: "AI Advantage",
    source: "YouTube",
    librarySection: "AI Twin Setup",
    pathSlug: "gemini-ai-twin",
    sourceFileName:
      "ai-advantage__2026-02-11__finalizing-your-gemini-gem-setup__0736-0907.mp4",
    suggestedLessonPage:
      "/lo-development/ai-advantage/ai-twin/finalizing-gemini-gem-setup",
    notes:
      "Part of the AI Twin setup sequence. Suggest ordering after Starting the AI Twin Setup.",
  },
  {
    rowId: "AIA-008",
    slug: "aia-008",
    title: "AI Advantage: Gemini Gems vs Generic AI",
    description:
      "See why a role-specific Gemini Gem can produce cleaner, more consistent drafts than a generic AI chat.",
    youtubeVideoId: "3LzjDAMkk04",
    youtubeVideoUrl: "https://www.youtube.com/watch?v=3LzjDAMkk04",
    youtubeEmbedUrl: "https://www.youtube.com/embed/3LzjDAMkk04",
    status: "published",
    privacy: "unlisted",
    platformSection: "AI Advantage",
    source: "YouTube",
    librarySection: "AI Twin Setup",
    pathSlug: "gemini-ai-twin",
    sourceFileName:
      "ai-advantage__2026-02-11__gemini-gems-vs-generic-ai__0141-0317.mp4",
    suggestedLessonPage:
      "/lo-development/ai-advantage/ai-twin/gemini-gems-vs-generic-ai",
    notes: "Why custom Gems beat generic prompts.",
  },
  {
    rowId: "AIA-009",
    slug: "aia-009",
    title: "AI Advantage: Improving AI Tone with Bio Docs",
    description:
      "Use approved background notes to help AI draft in a tone that sounds more like you while keeping review in place.",
    youtubeVideoId: "L_FBdXpkYG0",
    youtubeVideoUrl: "https://www.youtube.com/watch?v=L_FBdXpkYG0",
    youtubeEmbedUrl: "https://www.youtube.com/embed/L_FBdXpkYG0",
    status: "published",
    privacy: "unlisted",
    platformSection: "AI Advantage",
    source: "YouTube",
    librarySection: "AI Twin Setup",
    pathSlug: "gemini-ai-twin",
    sourceFileName:
      "ai-advantage__2026-02-11__improving-ai-tone-with-bio-docs__1406-1650.mp4",
    suggestedLessonPage:
      "/lo-development/ai-advantage/ai-twin/improving-ai-tone-with-bio-docs",
    notes: "Personalization via bio documents.",
  },
  {
    rowId: "AIA-010",
    slug: "aia-010",
    title: "AI Advantage: Multi Language Content Strategy",
    description:
      "Plan bilingual and multilingual outreach drafts with plain-language review before anything is used publicly.",
    youtubeVideoId: "uBSDv9RVgaQ",
    youtubeVideoUrl: "https://www.youtube.com/watch?v=uBSDv9RVgaQ",
    youtubeEmbedUrl: "https://www.youtube.com/embed/uBSDv9RVgaQ",
    status: "published",
    privacy: "unlisted",
    platformSection: "AI Advantage",
    source: "YouTube",
    librarySection: "Marketing & Content",
    pathSlug: "social-realtor-marketing",
    sourceFileName:
      "ai-advantage__2026-02-11__multi-language-content-strategy__1200-1405.mp4",
    suggestedLessonPage:
      "/lo-development/ai-advantage/marketing/multi-language-content-strategy",
    notes: "Bilingual and multilingual outreach.",
  },
  {
    rowId: "AIA-012",
    slug: "aia-012",
    title: "AI Advantage: Starting the AI Twin Setup",
    description:
      "Begin the AI Twin setup track with the first practical steps for a Gemini-based loan officer helper.",
    youtubeVideoId: "zNwOFHZ2XbM",
    youtubeVideoUrl: "https://www.youtube.com/watch?v=zNwOFHZ2XbM",
    youtubeEmbedUrl: "https://www.youtube.com/embed/zNwOFHZ2XbM",
    status: "published",
    privacy: "unlisted",
    platformSection: "AI Advantage",
    source: "YouTube",
    librarySection: "AI Twin Setup",
    pathSlug: "gemini-ai-twin",
    sourceFileName:
      "ai-advantage__2026-02-11__starting-the-ai-twin-setup__0318-0510.mp4",
    suggestedLessonPage:
      "/lo-development/ai-advantage/ai-twin/starting-ai-twin-setup",
    notes:
      "Entry point for the AI Twin setup track. Suggest ordering before Finalizing your Gemini Gem Setup.",
  },
  {
    rowId: "AIA-015",
    slug: "aia-015",
    title: "AI Advantage: Creating Video Content with HeyGen AI Clones",
    description:
      "See how AI video can support training and content planning when scripts and public use are reviewed first.",
    youtubeVideoId: "AC-jBgffnHc",
    youtubeVideoUrl: "https://www.youtube.com/watch?v=AC-jBgffnHc",
    youtubeEmbedUrl: "https://www.youtube.com/embed/AC-jBgffnHc",
    status: "published",
    privacy: "unlisted",
    platformSection: "AI Advantage",
    source: "YouTube",
    librarySection: "Content Creation",
    pathSlug: "heygen-ai-video",
    sourceFileName:
      "ai-advantage__2026-03-03__creating-video-content-with-heygen-ai-clones__1248-1440.mp4",
    suggestedLessonPage:
      "/lo-development/ai-advantage/content-creation/heygen-ai-clones",
    notes: "Video avatar production.",
  },
  {
    rowId: "AIA-016",
    slug: "aia-016",
    title: "AI Advantage: Overview Marketing with NotebookLM and AI Twins",
    description:
      "Use source-grounded research and AI Twins to organize marketing ideas before review and use.",
    youtubeVideoId: "Jou4jrGFKsg",
    youtubeVideoUrl: "https://www.youtube.com/watch?v=Jou4jrGFKsg",
    youtubeEmbedUrl: "https://www.youtube.com/embed/Jou4jrGFKsg",
    status: "published",
    privacy: "unlisted",
    platformSection: "AI Advantage",
    source: "YouTube",
    librarySection: "Marketing & Content",
    pathSlug: "notebooklm",
    sourceFileName:
      "ai-advantage__2026-03-03__overview-marketing-with-notebooklm-and-ai-twins__0933-1100.mp4",
    suggestedLessonPage:
      "/lo-development/ai-advantage/marketing/notebooklm-ai-twins-overview",
    notes: "NotebookLM plus AI Twin marketing overview.",
  },
  {
    rowId: "AIA-052",
    slug: "aia-052",
    title: "AI Advantage: How to Build your Public Loan Officer AI Twin",
    description:
      "Review how a public-facing loan officer AI Twin can be planned. Do not publish or share one until content, disclosures, guardrails, and compliance review are approved.",
    youtubeVideoId: "kH9VDBwwuh0",
    youtubeVideoUrl: "https://www.youtube.com/watch?v=kH9VDBwwuh0",
    youtubeEmbedUrl: "https://www.youtube.com/embed/kH9VDBwwuh0",
    status: "published",
    privacy: "unlisted",
    platformSection: "AI Advantage",
    source: "YouTube",
    librarySection: "AI Twin Setup",
    pathSlug: "gemini-ai-twin",
    sourceFileName:
      "ai-advantage__2026-04-28__how-to-build-your-public-loan-officer-ai-twin__0737-0843.mp4",
    suggestedLessonPage:
      "/lo-development/ai-advantage/ai-twin/public-loan-officer-ai-twin",
    notes: "Public-facing AI Twin build.",
  },
  {
    rowId: "AIA-056",
    slug: "aia-056",
    title: "AI Advantage: Automate your Social Posts with Gemini AI",
    description:
      "Use Gemini to draft social post ideas faster, then review tone, claims, and compliance-sensitive language before use.",
    youtubeVideoId: "AFPffFdcmQo",
    youtubeVideoUrl: "https://www.youtube.com/watch?v=AFPffFdcmQo",
    youtubeEmbedUrl: "https://www.youtube.com/embed/AFPffFdcmQo",
    status: "published",
    privacy: "unlisted",
    platformSection: "AI Advantage",
    source: "YouTube",
    librarySection: "Marketing & Content",
    pathSlug: "social-realtor-marketing",
    sourceFileName:
      "ai-advantage__2026-05-12__automate-your-social-posts-with-gemini-ai__2532-3304.mp4",
    suggestedLessonPage:
      "/lo-development/ai-advantage/marketing/automate-social-posts-with-gemini-ai",
    notes: "Social posting automation with Gemini.",
  },
] satisfies AiAdvantagePublishedVideo[];

export function getAiAdvantagePublishedVideo(slug: string) {
  return aiAdvantagePublishedVideos.find((video) => video.slug === slug);
}

export function getAiAdvantagePublishedVideosForPath(pathSlug: string) {
  return aiAdvantagePublishedVideos.filter((video) => video.pathSlug === pathSlug);
}

export function getAiAdvantagePublishedVideosForSection(
  section: AiAdvantageVideoSection,
) {
  return aiAdvantagePublishedVideos.filter(
    (video) => video.librarySection === section,
  );
}
