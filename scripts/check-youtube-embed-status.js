#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const repoRoot = process.cwd();
const queuePath = resolve(repoRoot, "youtube-upload-queue.json");
const manifestPath = resolve(repoRoot, "google-drive-upload-manifest.json");

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function summarize() {
  const queue = readJson(queuePath);
  const manifest = readJson(manifestPath);

  const clips = queue.videos ?? [];
  const live = clips.filter((video) => video.youtube_video_id || video.youtube_url || video.youtube_embed_url);
  const pending = clips.filter(
    (video) => !video.youtube_video_id && !video.youtube_url && !video.youtube_embed_url,
  );
  const manualReview = clips.filter((video) => video.manual_review_status === "manual_review_needed");

  return {
    generated_at: new Date().toISOString(),
    drive_manifest_videos: manifest.videos?.length ?? 0,
    youtube_queue_videos: clips.length,
    live_embeds: live.length,
    pending_embeds: pending.length,
    manual_review_needed: manualReview.length,
    unlisted: queue.privacy === "unlisted",
    notify_subscribers_false: queue.notify_subscribers === false,
  };
}

const result = summarize();
console.log(JSON.stringify(result, null, 2));

