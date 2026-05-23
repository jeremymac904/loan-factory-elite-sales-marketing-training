/**
 * Drive hosted asset registry.
 *
 * The static site is code first. Large media (audio, video, PDF, PowerPoint,
 * screen recordings) should not live in GitHub long term. This registry is
 * where each asset is declared once and referenced from the data files that
 * render it.
 *
 * For each item:
 *   - status `local only` means the file lives in `public/` for now.
 *   - status `needs upload` means the file is local and needs to move to
 *     Drive.
 *   - status `drive hosted` means the file is in Drive and the site reads
 *     from `driveUrl`. The `localFallbackPath` can be cleared once tested.
 *   - status `needs review` means leadership has not approved external
 *     hosting yet.
 */

export type DriveAssetCategory =
  | "course-videos"
  | "audio-training"
  | "pdf-handouts"
  | "slide-decks"
  | "screenshots"
  | "logos-brand"
  | "notebooklm-outputs"
  | "heygen-avatar"
  | "source-research"
  | "archive";

export type DriveAssetStatus =
  | "local only"
  | "drive hosted"
  | "needs upload"
  | "needs review";

export type DriveAssetType = "audio" | "video" | "pdf" | "image" | "deck" | "doc";

export type DriveAsset = {
  id: string;
  title: string;
  type: DriveAssetType;
  category: DriveAssetCategory;
  driveUrl?: string;
  siteUsage: string;
  localFallbackPath?: string;
  status: DriveAssetStatus;
};

export const driveFolderUrl = "/training-library/";

export const driveFolderStructure: { id: string; name: string; description: string }[] = [
  { id: "01", name: "01 Course Videos", description: "Recorded live sessions and module walkthroughs." },
  { id: "02", name: "02 Audio Training", description: "NotebookLM audio overviews and other supplemental audio." },
  { id: "03", name: "03 PDF Handouts", description: "Approved PDF handouts per module." },
  { id: "04", name: "04 Slide Decks", description: "PowerPoint and Google Slides decks used in live sessions." },
  { id: "05", name: "05 Screenshots and Walkthroughs", description: "Review screenshots, UI/UX walkthroughs, screen recordings." },
  { id: "06", name: "06 Logos and Brand Assets", description: "Source files for the Elite and Loan Factory logos." },
  { id: "07", name: "07 NotebookLM Outputs", description: "Source notebooks and exported overviews." },
  { id: "08", name: "08 HeyGen Avatar Videos", description: "Cutdown scripts and rendered HeyGen avatar videos." },
  { id: "09", name: "09 Source Research", description: "Research reports and reference material." },
  { id: "10", name: "10 Archive", description: "Older versions, deprecated assets, prior pilot material." },
];

export const driveAssets: DriveAsset[] = [
  // Audio Training, currently local
  {
    id: "audio-mortgage-sales-psychology-and-ai-systems",
    title: "Mortgage Sales Psychology and AI Systems",
    type: "audio",
    category: "audio-training",
    siteUsage: "Audio Training Library, Sales Psychology and Borrower Conversion section",
    localFallbackPath: "/audio/mortgage_sales_psychology_and_ai_systems.m4a",
    status: "needs upload",
  },
  {
    id: "audio-elite-mortgage-sales-operating-system",
    title: "The Elite Mortgage Sales Operating System",
    type: "audio",
    category: "audio-training",
    siteUsage: "Audio Training Library, Training Blueprint and Coaching Strategy section",
    localFallbackPath: "/audio/elite_mortgage_sales_operating_system.m4a",
    status: "needs upload",
  },
  {
    id: "audio-loan-factory-training-blueprint",
    title: "Upgrading the Loan Factory Training Blueprint",
    type: "audio",
    category: "audio-training",
    siteUsage: "Audio Training Library, Training Blueprint and Coaching Strategy section",
    localFallbackPath: "/audio/loan_factory_training_blueprint.m4a",
    status: "needs upload",
  },
  {
    id: "audio-earn-realtor-trust",
    title: "Earn Realtor Trust With Closing Certainty",
    type: "audio",
    category: "audio-training",
    siteUsage: "Audio Training Library, Referral Partner and Realtor Trust section",
    localFallbackPath: "/audio/earn_realtor_trust_with_closing_certainty.m4a",
    status: "needs upload",
  },
  {
    id: "audio-psychological-judo",
    title: "Psychological Judo in Mortgage Sales",
    type: "audio",
    category: "audio-training",
    siteUsage: "Audio Training Library, Sales Psychology and Borrower Conversion section",
    localFallbackPath: "/audio/psychological_judo_in_mortgage_sales.m4a",
    status: "needs upload",
  },
  {
    id: "audio-stop-link-drop",
    title: "Stop Killing Deals With the Link Drop",
    type: "audio",
    category: "audio-training",
    siteUsage: "Audio Training Library, Sales Psychology and Borrower Conversion section",
    localFallbackPath: "/audio/stop_killing_deals_with_the_link_drop.m4a",
    status: "needs upload",
  },
  {
    id: "audio-master-key-240",
    title: "The Master Key to 240 Wholesale Lenders",
    type: "audio",
    category: "audio-training",
    siteUsage: "Audio Training Library, Broker Value Proposition and Guarantee Conversations section",
    localFallbackPath: "/audio/the_master_key_to_240_wholesale_lenders.m4a",
    status: "needs upload",
  },
  {
    id: "audio-best-price-guarantee",
    title: "How to Explain the Two Thousand Dollar Best Price Guarantee",
    type: "audio",
    category: "audio-training",
    siteUsage: "Audio Training Library, Broker Value Proposition and Guarantee Conversations section",
    localFallbackPath:
      "/audio/how_to_explain_the_two_thousand_dollar_best_price_guarantee.m4a",
    status: "needs review",
  },
  // Hero media. These are small enough to keep local.
  {
    id: "media-dark-hero-background",
    title: "Dark Hero Background",
    type: "image",
    category: "screenshots",
    siteUsage: "Background image on Home, 101, Audio Training, Recommended Channels, AI Coaching Assistant, Login heros",
    localFallbackPath: "/media/dark-hero-background.png",
    status: "local only",
  },
  {
    id: "media-light-hero-background",
    title: "Light Hero Background",
    type: "image",
    category: "screenshots",
    siteUsage: "Reserved for future light themed surfaces",
    localFallbackPath: "/media/light-hero-background.png",
    status: "local only",
  },
  {
    id: "media-platform-motion-background",
    title: "Platform Motion Background",
    type: "video",
    category: "course-videos",
    siteUsage: "Homepage hero video",
    localFallbackPath: "/media/platform-motion-background.mp4",
    status: "needs upload",
  },
  {
    id: "media-dark-premium-ai-workflow",
    title: "Dark Premium AI Workflow",
    type: "video",
    category: "course-videos",
    siteUsage: "Paths and AI Coaching Assistant hero videos",
    localFallbackPath: "/media/dark-premium-AI-workflow.mp4",
    status: "needs upload",
  },
  {
    id: "media-team-leader-website-builder",
    title: "Team Leader Website Builder",
    type: "video",
    category: "course-videos",
    siteUsage: "Team Leader Guide hero video",
    localFallbackPath: "/media/team-leader-website-builder.mp4",
    status: "needs upload",
  },
  {
    id: "handout-101",
    title: "101 Mortgage Sales Foundation handout",
    type: "doc",
    category: "pdf-handouts",
    siteUsage: "101 page session materials download",
    localFallbackPath: "/downloads/101_foundation_handout.md",
    status: "needs review",
  },
];

export function getDriveAsset(id: string): DriveAsset | undefined {
  return driveAssets.find((a) => a.id === id);
}
