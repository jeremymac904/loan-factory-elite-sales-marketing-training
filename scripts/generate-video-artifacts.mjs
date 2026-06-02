#!/usr/bin/env node
/**
 * Generate the local planning artifacts for the LO Development video sprint.
 *
 * This script never uploads anything. It reads the staged clip handoff, the
 * YouTube status manifest, and the long-form recording inventory, then writes:
 * - google-drive-upload-manifest.json
 * - local-to-drive-video-mapping.csv
 * - youtube-upload-queue.json
 *
 * The outputs are intentionally local planning artifacts only.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const repoRoot = process.cwd();
const clipManifestPath = resolve(
  "/Volumes/LegendsOS/macmini-m1/LoanFactory-Thuan/LF-Projects-Folder/LO Development/LO Development Platform Cutdown Library/platform_clip_routing_handoff.json",
);
const youtubeManifestPath = resolve(
  "/Volumes/LegendsOS/macmini-m1/LoanFactory-Thuan/LF-Projects-Folder/LO Development/LO Development Platform Cutdown Library/youtube_upload_manifest_ready.csv",
);

const generatedAt = new Date().toISOString();
const driveRootFolder = "Loan Factory LO Development Platform Videos";
const driveFolders = {
  longForm: "Long Form Training Videos",
  clips: "Cutdown Clip Library",
  thumbnails: "Thumbnails",
  captions: "Captions",
  markdown: "Markdown Notes",
  manifests: "Manifests",
};

const longFormSourceVideos = [
  {
    id: "lo-dev-longform-001",
    title: "LO Development Series: 1003 Mistakes to Avoid",
    description:
      "Avoid common mistakes in the 1003 application process. Covers app setup, support handoffs, pricing, comp, and compliance checkpoints.",
    source_file_name:
      "LO Development Series_ 1003 Mistakes to Avoid - 2026_05_18 12_39 PDT - Recording.mp4",
    source_report_file:
      "LO Development Series_ 1003 Mistakes to Avoid - 2026_05_18 12_39 PDT - Recording.md",
    duration: "01:05:21",
    category: "1003 and Application Setup",
    platform_section: "1003 / Application Setup",
    recommended_route: "/lo-development/video-library/",
    tags: ["1003", "application setup", "first file survival", "support", "pricing", "compliance"],
    audience: ["new LO", "experienced LO", "team leader", "LO support"],
    priority: "High",
    notes: "Source video ready. Timestamp report available. Upload pending until a YouTube ID is added.",
  },
  {
    id: "lo-dev-longform-002",
    title: "LO Kickoff Call",
    description:
      "Welcome orientation covering Rocket Pro, portal navigation, support layers, pricing engine, onboarding, and core first-day setup.",
    source_file_name: "LO Kickoff Call - 2026_05_20 10_53 PDT - Recording.mp4",
    source_report_file: "LO Kickoff Call - 2026_05_20 10_53 PDT - Recording.md",
    duration: "01:04:50",
    category: "Getting Started",
    platform_section: "Training Library",
    recommended_route: "/lo-development/video-library/",
    tags: ["getting started", "marketplace", "pricing engine", "support", "onboarding", "portal setup"],
    audience: ["new LO", "team leader", "LO support", "corporate coach"],
    priority: "High",
    notes: "Source video ready. Timestamp report available. Upload pending until a YouTube ID is added.",
  },
  {
    id: "lo-dev-longform-003",
    title: "LO Onboarding Series: Compensation & Fees",
    description:
      "Deep dive into wholesale and correspondent compensation, fee sheet mechanics, pricing settings, and compensation rules.",
    source_file_name:
      "LO Onboarding Series_ Compensation & Fees - 2026_02_06 09_47 PST - Recording.mp4",
    source_report_file:
      "LO Onboarding Series_ Compensation & Fees - 2026_02_06 09_47 PST - Recording.md",
    duration: "01:03:58",
    category: "Compensation and Fees",
    platform_section: "Compensation and Fees",
    recommended_route: "/lo-development/video-library/",
    tags: ["compensation", "fees", "wholesale", "correspondent", "pricing loans", "fee sheet"],
    audience: ["new LO", "experienced LO", "LO support", "LO development"],
    priority: "High",
    notes: "Source video ready. Timestamp report available. Upload pending until a YouTube ID is added.",
  },
  {
    id: "lo-dev-longform-004",
    title: "LO Onboarding Series: Leads & Marketing",
    description:
      "Lead management and marketing systems walkthrough covering TERA, labels, email sync, rate alerts, Loan Factory IQ, and ad setup.",
    source_file_name:
      "LO Onboarding Series_ Leads & Marketing - 2026_03_05 09_54 PST - Recording.mp4",
    source_report_file:
      "LO Onboarding Series_ Leads & Marketing - 2026_03_05 09_54 PST - Recording.md",
    duration: "01:26:32",
    category: "Leads and Marketing",
    platform_section: "Sales & Marketing",
    recommended_route: "/lo-development/video-library/",
    tags: ["leads and marketing", "tera", "loan factory iq", "rate alerts", "facebook ads", "google business profile"],
    audience: ["new LO", "marketing", "team leader", "LO development"],
    priority: "High",
    notes: "Source video ready. Timestamp report available. Upload pending until a YouTube ID is added.",
  },
  {
    id: "lo-dev-longform-005",
    title: "LO Onboarding Series: Loans (Highly Recommended)",
    description:
      "Core onboarding training on first-file survival, disclosures, locking, TRID, LOS behavior, and support flows.",
    source_file_name:
      "LO Onboarding Series_ Loans (Highly Recommended) - 2026_02_26 09_51 PST - Recording.mp4",
    source_report_file:
      "LO Onboarding Series_ Loans (Highly Recommended) - 2026_02_26 09_51 PST - Recording.md",
    duration: "01:00:20",
    category: "First File Survival Guide",
    platform_section: "Onboarding / First File Survival",
    recommended_route: "/lo-development/video-library/",
    tags: ["onboarding", "first file survival", "disclosures", "TRID", "loan submission", "support"],
    audience: ["new LO", "experienced LO", "LO support", "LO development"],
    priority: "High",
    notes: "Source video ready. Timestamp report available. Upload pending until a YouTube ID is added.",
  },
  {
    id: "lo-dev-longform-006",
    title: "Q&A (Post-Training): Loans (LOS)",
    description:
      "Post-training Q&A covering DPA, Pylon, niche lenders, marketplace navigation, pricing, and troubleshooting.",
    source_file_name: "Q&A (Post-Training)_ Loans (LOS) - 2026_05_22 09_52 PDT - Recording.mp4",
    source_report_file: "Q&A (Post-Training)_ Loans (LOS) - 2026_05_22 09_52 PDT - Recording.md",
    duration: "01:03:27",
    category: "Pricing Loans",
    platform_section: "Loan Officer Support",
    recommended_route: "/lo-development/video-library/",
    tags: ["DPA", "Pylon", "marketplace", "pricing", "reverse mortgage", "troubleshooting"],
    audience: ["experienced LO", "LO support", "corporate coach", "LO development"],
    priority: "Medium",
    notes: "Source video ready. Timestamp report available. Upload pending until a YouTube ID is added.",
  },
  {
    id: "lo-dev-longform-007",
    title: "Q&A (Post-Training): Pricing (LOS)",
    description:
      "Pricing Q&A on Pylon, manual comp, lender selection, fee sheet strategy, and borrower or lender paid optics.",
    source_file_name: "Q&A (Post-Training)_ Pricing (LOS) - 2026_05_15 09_51 PDT - Recording.mp4",
    source_report_file: "Q&A (Post-Training)_ Pricing (LOS) - 2026_05_15 09_51 PDT - Recording.md",
    duration: "01:15:42",
    category: "Pricing Loans",
    platform_section: "Pricing",
    recommended_route: "/lo-development/video-library/",
    tags: ["pricing", "manual comp", "Pylon", "fee sheet", "compensation", "borrower paid"],
    audience: ["experienced LO", "LO support", "corporate coach", "LO development"],
    priority: "High",
    notes: "Source video ready. Timestamp report available. Upload pending until a YouTube ID is added.",
  },
];

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c === "\r") {
      continue;
    } else {
      field += c;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  const header = rows[0] ?? [];
  return rows.slice(1).map((current) => {
    const record = {};
    header.forEach((key, index) => {
      record[key] = current[index] ?? "";
    });
    return record;
  });
}

function readClipData() {
  const raw = JSON.parse(readFileSync(clipManifestPath, "utf8"));
  if (!Array.isArray(raw)) {
    throw new Error("platform_clip_routing_handoff.json must be an array");
  }
  return raw;
}

function readUploadManifest() {
  const csv = readFileSync(youtubeManifestPath, "utf8");
  const rows = parseCsv(csv);
  const byRowId = new Map();
  for (const row of rows) {
    if (!row.row_id) continue;
    byRowId.set(String(row.row_id).trim(), row);
  }
  return byRowId;
}

function toBooleanNotify(value) {
  return String(value || "").trim().toUpperCase() === "NO" ? false : true;
}

function buildClipRecord(clip, uploadRow) {
  const baseName = clip.file_name.replace(/\.[^.]+$/, "");
  return {
    id: clip.clip_id,
    title: clip.clip_title,
    description: clip.topic_summary,
    video_type: "clip",
    source_file_name: clip.file_name,
    source_folder: "LO Development Platform Cutdown Library",
    source_report_file: clip.source_markdown_report_name,
    category: clip.suggested_video_library_category,
    platform_section: clip.recommended_platform_section,
    recommended_route: clip.recommended_route,
    tags: clip.suggested_tags,
    audience: clip.who_needs_this,
    duration: clip.duration,
    thumbnail_file: `${baseName}.jpg`,
    caption_file: `${baseName}.srt`,
    markdown_file: `${baseName}.md`,
    google_drive_file_id: "",
    google_drive_url: uploadRow?.drive_file_link || "",
    youtube_video_id: "",
    youtube_url: "",
    youtube_embed_url: "",
    hosting_status: "google_drive_pending",
    upload_status: uploadRow?.upload_status || "hold",
    manual_review_status: "manual_review_needed",
    pii_review_status: "manual_review_needed",
    visibility: clip.platform_visibility,
    priority: clip.priority,
    last_checked: "2026-05-31",
    notes: clip.notes_for_platform_builder,
    source_recording_name: clip.source_recording_name,
    source_start_time: clip.start_time,
    source_end_time: clip.end_time,
    source_status: clip.youtube_status,
  };
}

function buildLongFormRecord(video) {
  return {
    id: video.id,
    title: video.title,
    description: video.description,
    video_type: "long_form",
    source_file_name: video.source_file_name,
    source_folder: "Training Long Form Videos & Time Stamp Gemini Reports",
    source_report_file: video.source_report_file,
    category: video.category,
    platform_section: video.platform_section,
    recommended_route: video.recommended_route,
    tags: video.tags,
    audience: video.audience,
    duration: video.duration,
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
    last_checked: generatedAt.slice(0, 10),
    notes: video.notes,
  };
}

function buildDriveManifest() {
  const clipRows = readClipData();
  const uploadRows = readUploadManifest();
  const clips = clipRows.map((clip) => {
    const rowId = String(clip.clip_id || "").replace(/^lo-dev-/, "");
    return buildClipRecord(clip, uploadRows.get(rowId));
  });
  const longForms = longFormSourceVideos.map(buildLongFormRecord);
  const videos = [...longForms, ...clips];

  return {
    generated_at: generatedAt,
    drive_root_folder: driveRootFolder,
    drive_folders: driveFolders,
    permission_target: "Anyone with a Loan Factory Google account can view",
    public_internet: false,
    videos,
  };
}

function buildLocalToDriveCsv(manifest) {
  const header = [
    "id",
    "title",
    "video_type",
    "source_file_name",
    "source_folder",
    "source_report_file",
    "category",
    "platform_section",
    "recommended_route",
    "duration",
    "thumbnail_file",
    "caption_file",
    "markdown_file",
    "drive_target_folder",
    "google_drive_file_id",
    "google_drive_url",
    "youtube_video_id",
    "youtube_url",
    "youtube_embed_url",
    "hosting_status",
    "upload_status",
    "manual_review_status",
    "pii_review_status",
    "visibility",
    "priority",
    "notes",
  ];

  const lines = [header.join(",")];
  for (const video of manifest.videos) {
    const targetFolder =
      video.video_type === "long_form" ? driveFolders.longForm : driveFolders.clips;
    lines.push(
      [
        video.id,
        video.title,
        video.video_type,
        video.source_file_name,
        video.source_folder,
        video.source_report_file,
        video.category,
        video.platform_section,
        video.recommended_route,
        video.duration,
        video.thumbnail_file,
        video.caption_file,
        video.markdown_file,
        targetFolder,
        video.google_drive_file_id,
        video.google_drive_url,
        video.youtube_video_id,
        video.youtube_url,
        video.youtube_embed_url,
        video.hosting_status,
        video.upload_status,
        video.manual_review_status,
        video.pii_review_status,
        video.visibility,
        video.priority,
        video.notes,
      ]
        .map(csvField)
        .join(","),
    );
  }

  return lines.join("\n") + "\n";
}

function buildYouTubeQueue(manifest) {
  const clips = manifest.videos.filter((video) => video.video_type === "clip");
  return {
    generated_at: generatedAt,
    batch_size_per_day: 4,
    schedule: "08:00 America/New_York",
    privacy: "unlisted",
    notify_subscribers: false,
    playlist: "LO Development Resource Clips",
    skip_uploaded_clips: true,
    videos: clips.map((video) => ({
      id: video.id,
      title: video.title,
      source_file_name: video.source_file_name,
      source_folder: video.source_folder,
      source_report_file: video.source_report_file,
      category: video.category,
      platform_section: video.platform_section,
      duration: video.duration,
      thumbnail_file: video.thumbnail_file,
      caption_file: video.caption_file,
      markdown_file: video.markdown_file,
      privacy: "unlisted",
      notify_subscribers: false,
      playlist: "LO Development Resource Clips",
      upload_status: video.upload_status,
      hosting_status: video.hosting_status,
      youtube_video_id: "",
      youtube_url: "",
      youtube_embed_url: "",
      manual_review_status: video.manual_review_status,
      pii_review_status: video.pii_review_status,
      priority: video.priority,
      notes: video.notes,
    })),
  };
}

function csvField(value) {
  const s = value == null ? "" : String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

const driveManifest = buildDriveManifest();
const driveManifestCsv = buildLocalToDriveCsv(driveManifest);
const youtubeQueue = buildYouTubeQueue(driveManifest);

writeFileSync(
  resolve(repoRoot, "google-drive-upload-manifest.json"),
  `${JSON.stringify(driveManifest, null, 2)}\n`,
  "utf8",
);

writeFileSync(
  resolve(repoRoot, "local-to-drive-video-mapping.csv"),
  driveManifestCsv,
  "utf8",
);

writeFileSync(
  resolve(repoRoot, "youtube-upload-queue.json"),
  `${JSON.stringify(youtubeQueue, null, 2)}\n`,
  "utf8",
);

console.log(JSON.stringify({
  generated_at: generatedAt,
  total_videos: driveManifest.videos.length,
  clip_count: youtubeQueue.videos.length,
  long_form_count: longFormSourceVideos.length,
}, null, 2));
