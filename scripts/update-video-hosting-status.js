#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const repoRoot = process.cwd();
const manifestPath = resolve(repoRoot, "google-drive-upload-manifest.json");
const queuePath = resolve(repoRoot, "youtube-upload-queue.json");
const reportPath = resolve(repoRoot, "video-hosting-status-report.md");

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function toReport() {
  const manifest = readJson(manifestPath);
  const queue = readJson(queuePath);
  const videos = manifest.videos ?? [];
  const clips = queue.videos ?? [];

  const counts = {
    total: videos.length,
    clips: clips.length,
    longForm: videos.filter((video) => video.video_type === "long_form").length,
    drivePending: videos.filter((video) => video.hosting_status === "google_drive_pending").length,
    localOnly: videos.filter((video) => video.hosting_status === "local_only").length,
    manualReview: videos.filter((video) => video.manual_review_status === "manual_review_needed").length,
    youtubePending: clips.filter((video) => !video.youtube_video_id).length,
    youtubeLive: clips.filter((video) => video.youtube_video_id).length,
  };

  const lines = [
    "# Video Hosting Status Report",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Counts",
    "",
    `- Total videos: ${counts.total}`,
    `- Long-form source videos: ${counts.longForm}`,
    `- Cutdown clips: ${counts.clips}`,
    `- Drive pending: ${counts.drivePending}`,
    `- Local only: ${counts.localOnly}`,
    `- Manual review needed: ${counts.manualReview}`,
    `- YouTube pending: ${counts.youtubePending}`,
    `- YouTube live: ${counts.youtubeLive}`,
    "",
    "## Notes",
    "",
    "- No Google Drive API or YouTube API calls were made.",
    "- No n8n workflow was activated.",
    "- No subscriber notifications were enabled.",
    "- No public URLs were invented.",
    "",
  ];

  writeFileSync(reportPath, lines.join("\n"), "utf8");
  return { counts, reportPath };
}

const result = toReport();
console.log(JSON.stringify(result, null, 2));

