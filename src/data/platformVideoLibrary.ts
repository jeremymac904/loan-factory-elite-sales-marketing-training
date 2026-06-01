import { loDevelopmentClipLibrary, type LoDevelopmentClip } from "@/data/loDevelopmentClipLibrary";

export type PlatformVideoType = "long_form" | "clip";

export type PlatformHostingStatus =
  | "local_only"
  | "google_drive_pending"
  | "google_drive_live"
  | "youtube_pending"
  | "youtube_live"
  | "manual_review_needed"
  | "source_issue";

export type PlatformReviewStatus = "manual_review_needed" | "reviewed" | "source_issue";

export type PlatformPiiReviewStatus = "manual_review_needed" | "clear" | "flagged" | "unknown";

export type PlatformVideoRecord = {
  id: string;
  title: string;
  description: string;
  video_type: PlatformVideoType;
  source_file_name: string;
  source_folder: string;
  source_report_file: string;
  category: string;
  platform_section: string;
  recommended_route: string;
  tags: string[];
  audience: string[];
  duration: string;
  thumbnail_file: string;
  caption_file: string;
  markdown_file: string;
  google_drive_file_id: string;
  google_drive_url: string;
  youtube_video_id: string;
  youtube_url: string;
  youtube_embed_url: string;
  hosting_status: PlatformHostingStatus;
  upload_status: string;
  manual_review_status: PlatformReviewStatus;
  pii_review_status: PlatformPiiReviewStatus;
  visibility: string;
  priority: string;
  last_checked: string;
  notes: string;
  source_start_time?: string;
  source_end_time?: string;
  source_recording_name?: string;
  source_status?: string;
};

type LongFormSourceVideoInput = {
  id: string;
  title: string;
  description: string;
  source_file_name: string;
  source_folder: string;
  source_report_file: string;
  category: string;
  platform_section: string;
  recommended_route: string;
  tags: string[];
  audience: string[];
  duration_seconds: number;
  priority: string;
  notes: string;
};

const sourceCheckedAt = "2026-05-31";
const longFormFolderName = "Training Long Form Videos & Time Stamp Gemini Reports";
const clipFolderName = "LO Development Platform Cutdown Library";
const clipThumbnailFolderName = "/training-assets/lo-development/video-library/thumbnails";
const clipCaptionFolderName = "/training-assets/lo-development/video-library/captions";
const clipMarkdownFolderName = "/training-assets/lo-development/video-library/markdown";
const sourceReportPublicFolderName = "/training-assets/lo-development/video-library/source-reports";

const longFormSourceVideos: LongFormSourceVideoInput[] = [
  {
    id: "lo-dev-longform-001",
    title: "LO Development Series: 1003 Mistakes to Avoid",
    description:
      "Avoid common mistakes in the 1003 application process. Covers app setup, support handoffs, pricing, comp, and compliance checkpoints.",
    source_file_name:
      "LO Development Series_ 1003 Mistakes to Avoid - 2026_05_18 12_39 PDT - Recording.mp4",
    source_folder: longFormFolderName,
    source_report_file:
      "LO Development Series_ 1003 Mistakes to Avoid - 2026_05_18 12_39 PDT - Recording.md",
    category: "1003 and Application Setup",
    platform_section: "1003 / Application Setup",
    recommended_route: "/lo-development/video-library/",
    tags: [
      "1003",
      "application setup",
      "first file survival",
      "support",
      "pricing",
      "compliance",
    ],
    audience: ["new LO", "experienced LO", "team leader", "LO support"],
    duration_seconds: 3920.916667,
    priority: "High",
    notes:
      "Source video ready. Timestamp report available. Upload pending until a YouTube ID is added.",
  },
  {
    id: "lo-dev-longform-002",
    title: "LO Kickoff Call",
    description:
      "Welcome orientation covering Rocket Pro, portal navigation, support layers, pricing engine, onboarding, and core first-day setup.",
    source_file_name:
      "LO Kickoff Call - 2026_05_20 10_53 PDT - Recording.mp4",
    source_folder: longFormFolderName,
    source_report_file:
      "LO Kickoff Call - 2026_05_20 10_53 PDT - Recording.md",
    category: "Getting Started",
    platform_section: "Training Library",
    recommended_route: "/lo-development/video-library/",
    tags: [
      "getting started",
      "marketplace",
      "pricing engine",
      "support",
      "onboarding",
      "portal setup",
    ],
    audience: ["new LO", "team leader", "LO support", "corporate coach"],
    duration_seconds: 3889.833333,
    priority: "High",
    notes:
      "Source video ready. Timestamp report available. Upload pending until a YouTube ID is added.",
  },
  {
    id: "lo-dev-longform-003",
    title: "LO Onboarding Series: Compensation & Fees",
    description:
      "Deep dive into wholesale and correspondent compensation, fee sheet mechanics, pricing settings, and compensation rules.",
    source_file_name:
      "LO Onboarding Series_ Compensation & Fees - 2026_02_06 09_47 PST - Recording.mp4",
    source_folder: longFormFolderName,
    source_report_file:
      "LO Onboarding Series_ Compensation & Fees - 2026_02_06 09_47 PST - Recording.md",
    category: "Compensation and Fees",
    platform_section: "Compensation and Fees",
    recommended_route: "/lo-development/video-library/",
    tags: [
      "compensation",
      "fees",
      "wholesale",
      "correspondent",
      "pricing loans",
      "fee sheet",
    ],
    audience: ["new LO", "experienced LO", "LO support", "LO development"],
    duration_seconds: 3837.583333,
    priority: "High",
    notes:
      "Source video ready. Timestamp report available. Upload pending until a YouTube ID is added.",
  },
  {
    id: "lo-dev-longform-004",
    title: "LO Onboarding Series: Leads & Marketing",
    description:
      "Lead management and marketing systems walkthrough covering TERA, labels, email sync, rate alerts, Loan Factory IQ, and ad setup.",
    source_file_name:
      "LO Onboarding Series_ Leads & Marketing - 2026_03_05 09_54 PST - Recording.mp4",
    source_folder: longFormFolderName,
    source_report_file:
      "LO Onboarding Series_ Leads & Marketing - 2026_03_05 09_54 PST - Recording.md",
    category: "Leads and Marketing",
    platform_section: "Sales & Marketing",
    recommended_route: "/lo-development/video-library/",
    tags: [
      "leads and marketing",
      "tera",
      "loan factory iq",
      "rate alerts",
      "facebook ads",
      "google business profile",
    ],
    audience: ["new LO", "marketing", "team leader", "LO development"],
    duration_seconds: 5192.041667,
    priority: "High",
    notes:
      "Source video ready. Timestamp report available. Upload pending until a YouTube ID is added.",
  },
  {
    id: "lo-dev-longform-005",
    title: "LO Onboarding Series: Loans (Highly Recommended)",
    description:
      "Core onboarding training on first-file survival, disclosures, locking, TRID, LOS behavior, and support flows.",
    source_file_name:
      "LO Onboarding Series_ Loans (Highly Recommended) - 2026_02_26 09_51 PST - Recording.mp4",
    source_folder: longFormFolderName,
    source_report_file:
      "LO Onboarding Series_ Loans (Highly Recommended) - 2026_02_26 09_51 PST - Recording.md",
    category: "First File Survival Guide",
    platform_section: "Onboarding / First File Survival",
    recommended_route: "/lo-development/video-library/",
    tags: [
      "onboarding",
      "first file survival",
      "disclosures",
      "TRID",
      "loan submission",
      "support",
    ],
    audience: ["new LO", "experienced LO", "LO support", "LO development"],
    duration_seconds: 3619.75,
    priority: "High",
    notes:
      "Source video ready. Timestamp report available. Upload pending until a YouTube ID is added.",
  },
  {
    id: "lo-dev-longform-006",
    title: "Q&A (Post-Training): Loans (LOS)",
    description:
      "Post-training Q&A covering DPA, Pylon, niche lenders, marketplace navigation, pricing, and troubleshooting.",
    source_file_name:
      "Q&A (Post-Training)_ Loans (LOS) - 2026_05_22 09_52 PDT - Recording.mp4",
    source_folder: longFormFolderName,
    source_report_file:
      "Q&A (Post-Training)_ Loans (LOS) - 2026_05_22 09_52 PDT - Recording.md",
    category: "Pricing Loans",
    platform_section: "Loan Officer Support",
    recommended_route: "/lo-development/video-library/",
    tags: [
      "DPA",
      "Pylon",
      "marketplace",
      "pricing",
      "reverse mortgage",
      "troubleshooting",
    ],
    audience: ["experienced LO", "LO support", "corporate coach", "LO development"],
    duration_seconds: 3806.708333,
    priority: "Medium",
    notes:
      "Source video ready. Timestamp report available. Upload pending until a YouTube ID is added.",
  },
  {
    id: "lo-dev-longform-007",
    title: "Q&A (Post-Training): Pricing (LOS)",
    description:
      "Pricing Q&A on Pylon, manual comp, lender selection, fee sheet strategy, and borrower or lender paid optics.",
    source_file_name:
      "Q&A (Post-Training)_ Pricing (LOS) - 2026_05_15 09_51 PDT - Recording.mp4",
    source_folder: longFormFolderName,
    source_report_file:
      "Q&A (Post-Training)_ Pricing (LOS) - 2026_05_15 09_51 PDT - Recording.md",
    category: "Pricing Loans",
    platform_section: "Pricing",
    recommended_route: "/lo-development/video-library/",
    tags: [
      "pricing",
      "manual comp",
      "Pylon",
      "fee sheet",
      "compensation",
      "borrower paid",
    ],
    audience: ["experienced LO", "LO support", "corporate coach", "LO development"],
    duration_seconds: 4542.083333,
    priority: "High",
    notes:
      "Source video ready. Timestamp report available. Upload pending until a YouTube ID is added.",
  },
];

function formatDuration(seconds: number) {
  const rounded = Math.max(0, Math.round(seconds));
  const hours = Math.floor(rounded / 3600);
  const minutes = Math.floor((rounded % 3600) / 60);
  const secs = rounded % 60;

  return [hours, minutes, secs]
    .map((value, index) => (index === 0 ? String(value).padStart(2, "0") : String(value).padStart(2, "0")))
    .join(":");
}

function buildPublicAssetPath(folder: string, fileName: string) {
  if (!fileName) return "";
  return `${folder}/${encodeURIComponent(fileName)}`;
}

function getBaseName(fileName: string) {
  return fileName.replace(/\.[^.]+$/, "");
}

function sourceReportFileFromRecording(fileName: string) {
  return fileName.replace(/\.mp4$/i, ".md");
}

function mapClipToPlatformVideo(clip: LoDevelopmentClip): PlatformVideoRecord {
  const clipBaseName = getBaseName(clip.fileName);
  const sourceReportFile = sourceReportFileFromRecording(clip.sourceRecordingName);

  return {
    id: clip.id,
    title: clip.title,
    description: clip.topicSummary,
    video_type: "clip",
    source_file_name: clip.fileName,
    source_folder: clipFolderName,
    source_report_file: sourceReportFile,
    category: clip.category,
    platform_section: clip.platformSection,
    recommended_route: clip.route,
    tags: clip.tags,
    audience: clip.audience,
    duration: clip.duration,
    thumbnail_file: `${clipBaseName}.jpg`,
    caption_file: `${clipBaseName}.srt`,
    markdown_file: `${clipBaseName}.md`,
    google_drive_file_id: "",
    google_drive_url: "",
    youtube_video_id: "",
    youtube_url: "",
    youtube_embed_url: "",
    hosting_status: "google_drive_pending",
    upload_status: "hold",
    manual_review_status: "manual_review_needed",
    pii_review_status: "manual_review_needed",
    visibility: clip.accessLevel,
    priority: clip.priority,
    last_checked: sourceCheckedAt,
    notes:
      "Rendered clip passed file, duration, audio, thumbnail, markdown, caption, category, and manifest checks. Manual OCR and PII detection were not performed. Keep on YouTube hold until review is complete.",
    source_start_time: clip.startTime,
    source_end_time: clip.endTime,
    source_recording_name: clip.sourceRecordingName,
    source_status: clip.youtubeStatus,
  };
}

function mapLongFormToPlatformVideo(
  video: LongFormSourceVideoInput,
): PlatformVideoRecord {
  return {
    id: video.id,
    title: video.title,
    description: video.description,
    video_type: "long_form",
    source_file_name: video.source_file_name,
    source_folder: video.source_folder,
    source_report_file: video.source_report_file,
    category: video.category,
    platform_section: video.platform_section,
    recommended_route: video.recommended_route,
    tags: video.tags,
    audience: video.audience,
    duration: formatDuration(video.duration_seconds),
    thumbnail_file: "",
    caption_file: "",
    markdown_file: video.source_report_file,
    google_drive_file_id: "",
    google_drive_url: "",
    youtube_video_id: "",
    youtube_url: "",
    youtube_embed_url: "",
    hosting_status: "local_only",
    upload_status: "pending",
    manual_review_status: "manual_review_needed",
    pii_review_status: "manual_review_needed",
    visibility: "approved_loan_factory_user",
    priority: video.priority,
    last_checked: sourceCheckedAt,
    notes: video.notes,
  };
}

export const platformVideoLibrary: PlatformVideoRecord[] = [
  ...longFormSourceVideos.map(mapLongFormToPlatformVideo),
  ...loDevelopmentClipLibrary.map(mapClipToPlatformVideo),
];

export const platformVideoStats = {
  total: platformVideoLibrary.length,
  longForm: platformVideoLibrary.filter((video) => video.video_type === "long_form").length,
  clips: platformVideoLibrary.filter((video) => video.video_type === "clip").length,
  drivePending: platformVideoLibrary.filter((video) => video.hosting_status === "google_drive_pending").length,
  localOnly: platformVideoLibrary.filter((video) => video.hosting_status === "local_only").length,
  manualReviewNeeded: platformVideoLibrary.filter(
    (video) => video.manual_review_status === "manual_review_needed",
  ).length,
  youtubeLive: platformVideoLibrary.filter(
    (video) => video.hosting_status === "youtube_live",
  ).length,
  sourceIssue: platformVideoLibrary.filter((video) => video.hosting_status === "source_issue").length,
};

export function getPlatformVideoById(id: string) {
  return platformVideoLibrary.find((video) => video.id === id);
}

export function getPlatformVideosByType(videoType: PlatformVideoType | "all") {
  return videoType === "all"
    ? platformVideoLibrary
    : platformVideoLibrary.filter((video) => video.video_type === videoType);
}

export function getPlatformVideosForSection(section: string) {
  return platformVideoLibrary.filter((video) => video.platform_section === section);
}

export function getPlatformVideoFilters() {
  return {
    sections: uniqueSorted(platformVideoLibrary.map((video) => video.platform_section)),
    categories: uniqueSorted(platformVideoLibrary.map((video) => video.category)),
    hostingStatuses: uniqueSorted(
      platformVideoLibrary.map((video) => video.hosting_status),
    ),
    reviewStatuses: uniqueSorted(
      platformVideoLibrary.map((video) => video.manual_review_status),
    ),
    piiStatuses: uniqueSorted(
      platformVideoLibrary.map((video) => video.pii_review_status),
    ),
    audiences: uniqueSorted(platformVideoLibrary.flatMap((video) => video.audience)),
    priorities: uniqueSorted(platformVideoLibrary.map((video) => video.priority)),
  };
}

export function getPlatformVideoAssetPath(
  kind: "thumbnail" | "caption" | "markdown" | "source_report",
  fileName: string,
) {
  const folder =
    kind === "thumbnail"
      ? clipThumbnailFolderName
      : kind === "caption"
        ? clipCaptionFolderName
        : kind === "markdown"
          ? clipMarkdownFolderName
          : sourceReportPublicFolderName;

  return buildPublicAssetPath(folder, fileName);
}

function uniqueSorted(values: string[]) {
  return [...new Set(values.filter(Boolean))].sort((left, right) =>
    left.localeCompare(right),
  );
}
