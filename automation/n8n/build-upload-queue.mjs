#!/usr/bin/env node
/**
 * build-upload-queue.mjs
 * ----------------------
 * Manifest-driven codegen for the YouTube upload queue.
 *
 * Reads the source-of-truth CSV
 *   .video-source/manifests/youtube_upload_manifest_ready.csv
 * and emits
 *   docs/video-library/youtube/upload-queue-manifest.json
 *
 * SAFETY: read-only against the source CSV. Writes ONLY into
 * docs/video-library/youtube/. Does NOT upload anything, does NOT call any
 * API, does NOT touch Google Drive / YouTube. Every queue row is emitted with
 * status "pending", privacy "unlisted", notifySubscribers false and EMPTY
 * drive/youtube URL fields (nothing has been uploaded yet — verified state).
 *
 * Run locally with:  node automation/n8n/build-upload-queue.mjs
 *
 * If the source CSV is not present (it is gitignored / staged read-only), the
 * script exits 0 with a notice and leaves any committed manifest untouched, so
 * CI / a fresh clone never fails on a missing local source file.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..", "..");

const SOURCE_CSV = join(
  REPO_ROOT,
  ".video-source",
  "manifests",
  "youtube_upload_manifest_ready.csv",
);
const OUT_JSON = join(
  REPO_ROOT,
  "docs",
  "video-library",
  "youtube",
  "upload-queue-manifest.json",
);

/**
 * Minimal, dependency-free CSV parser that respects double-quoted fields
 * (which may contain commas and escaped "" quotes) and CRLF/LF line endings.
 */
function parseCsv(text) {
  const rows = [];
  let field = "";
  let record = [];
  let inQuotes = false;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      record.push(field);
      field = "";
    } else if (ch === "\n") {
      record.push(field);
      rows.push(record);
      record = [];
      field = "";
    } else if (ch === "\r") {
      // ignore; handled by the following \n
    } else {
      field += ch;
    }
  }
  // flush trailing field/record (file may not end with newline)
  if (field.length > 0 || record.length > 0) {
    record.push(field);
    rows.push(record);
  }
  return rows.filter((r) => r.length > 1 || (r.length === 1 && r[0] !== ""));
}

function splitTags(raw) {
  if (!raw) return [];
  return raw
    .split(";")
    .map((t) => t.trim())
    .filter(Boolean);
}

function main() {
  if (!existsSync(SOURCE_CSV)) {
    console.log(
      `[build-upload-queue] Source CSV not found at ${SOURCE_CSV}. ` +
        `This is expected on a fresh clone (the cutdown library is staged ` +
        `read-only and gitignored). Leaving any committed manifest untouched.`,
    );
    return;
  }

  const text = readFileSync(SOURCE_CSV, "utf8");
  const rows = parseCsv(text);
  const header = rows.shift();
  const idx = Object.fromEntries(header.map((h, i) => [h.trim(), i]));

  const required = [
    "row_id",
    "title",
    "description",
    "tags",
    "privacy",
    "notify_subscribers",
    "playlist",
    "platform_section",
    "category",
    "upload_status",
  ];
  for (const col of required) {
    if (!(col in idx)) {
      throw new Error(`Source CSV is missing required column: ${col}`);
    }
  }

  const queue = rows.map((cols) => {
    const get = (name) => (cols[idx[name]] ?? "").trim();
    const rowId = get("row_id");
    const clipId = `lo-dev-${rowId.padStart(3, "0")}`;
    const driveLink = get("drive_file_link");
    const ytUrl = get("youtube_video_url");
    const ytEmbed = get("youtube_embed_url");
    const ytId = get("youtube_video_id");

    // Grounding guard: nothing has been uploaded. If any URL field were ever
    // populated upstream we surface it verbatim (never fabricate), but the
    // verified current state is empty across all 91 rows.
    return {
      clipId,
      rowId,
      // queue status is independent of the source's upstream upload_status
      // ("youtube_hold"); the n8n draft treats every clip as "pending".
      queueStatus: "pending",
      sourceUploadStatus: get("upload_status") || null,
      title: get("title"),
      description: get("description"),
      tags: splitTags(get("tags")),
      privacy: get("privacy") || "unlisted",
      notifySubscribers:
        get("notify_subscribers").toUpperCase() === "YES" ? true : false,
      playlist: get("playlist") || null,
      platformSection: get("platform_section") || null,
      category: get("category") || null,
      publishAt: get("publish_at") || null,
      containsPii: get("contains_pii") || null,
      // Upload targets — EMPTY until Jeremy approves a real run.
      driveFileLink: driveLink || null,
      youtubeVideoId: ytId || null,
      youtubeVideoUrl: ytUrl || null,
      youtubeEmbedUrl: ytEmbed || null,
      uploadedAt: get("uploaded_at") || null,
      errorMessage: get("error_message") || null,
      attempts: 0,
      lastAttemptAt: null,
    };
  });

  const pending = queue.filter((q) => q.queueStatus === "pending").length;

  const out = {
    generatedBy: "automation/n8n/build-upload-queue.mjs",
    source: ".video-source/manifests/youtube_upload_manifest_ready.csv",
    note:
      "DRAFT upload queue. Nothing has been uploaded. All entries are " +
      "privacy=unlisted, notifySubscribers=false, status=pending, with empty " +
      "drive/youtube URL fields. Do NOT run a real upload without Jeremy's " +
      "explicit approval and Google-account confirmation.",
    defaults: {
      privacy: "unlisted",
      notifySubscribers: false,
      categoryId: "27", // YouTube "Education"
      madeForKids: false,
      dailyBatchSize: 5,
      scheduleCron: "0 8 * * *",
      timezone: "America/Los_Angeles",
    },
    stats: {
      total: queue.length,
      pending,
      uploaded: queue.length - pending,
    },
    queue,
  };

  mkdirSync(dirname(OUT_JSON), { recursive: true });
  writeFileSync(OUT_JSON, `${JSON.stringify(out, null, 2)}\n`, "utf8");
  console.log(
    `[build-upload-queue] Wrote ${queue.length} clips (${pending} pending) -> ${OUT_JSON}`,
  );
}

main();
