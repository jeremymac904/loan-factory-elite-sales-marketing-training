// scripts/build-video-library.mjs
//
// Manifest-driven codegen for the unified LO Development video data model.
// Reads the staged read-only manifests under .video-source/manifests and EMITS
// src/data/loDevelopmentVideoLibrary.ts with all 98 entries (91 clips + 7 long_form).
//
// Re-runnable: `node scripts/build-video-library.mjs`
//
// SAFETY: read-only against the manifests; the ONLY file it writes is
// src/data/loDevelopmentVideoLibrary.ts. It never uploads, never touches source
// video/thumbnail/caption/markdown, and never invents Drive/YouTube URLs.
//
// Grounding rules baked in:
//   - googleDriveUrl / youtubeVideoId / youtubeEmbedUrl = null (nothing uploaded yet)
//   - hostingStatus = "google_drive_ready" for every entry (manifest prepared, not live)
//   - uploadStatus = the real youtube manifest upload_status (empty -> "pending")
//   - all *_path values rewritten to BASENAMES only (never /Users absolute paths)

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const MANIFEST_DIR = resolve(REPO_ROOT, ".video-source/manifests");
const OUT_FILE = resolve(REPO_ROOT, "src/data/loDevelopmentVideoLibrary.ts");

const CLIP_JSON = resolve(MANIFEST_DIR, "master_clip_manifest.json");
const YOUTUBE_CSV = resolve(MANIFEST_DIR, "youtube_upload_manifest_ready.csv");
const BUILD_SUMMARY = resolve(MANIFEST_DIR, "build_summary.json");

const LONGFORM_SOURCE_DIRS = [
  "/Volumes/LegendsOS/macmini-m1/LoanFactory-Thuan/LF-Projects-Folder/LO Development/Training Long Form Videos & Time Stamp Gemini Reports ",
  "/Volumes/LegendsOS/macmini-m1/LoanFactory-Thuan/LF-Projects-Folder/LO Development/Training Long Form Videos & Time Stamp Gemini Reports",
];

const LAST_CHECKED_DATE = "2026-05-31"; // sprint date; matches handoff_validation state

function die(msg) {
  console.error(`[build-video-library] ERROR: ${msg}`);
  process.exit(1);
}

for (const p of [CLIP_JSON, YOUTUBE_CSV, BUILD_SUMMARY]) {
  if (!existsSync(p)) die(`missing required input: ${p}`);
}

// ---------------------------------------------------------------------------
// Minimal RFC-4180-ish CSV parser (handles quoted fields with commas/newlines)
// ---------------------------------------------------------------------------
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
      // ignore
    } else {
      field += c;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.length > 1 || (r.length === 1 && r[0] !== ""));
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function basenameOrNull(p) {
  if (!p || typeof p !== "string") return null;
  const b = basename(p.trim());
  return b.length ? b : null;
}

function kebab(s) {
  return s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Clean a recording filename into a human title.
// e.g. "LO Onboarding Series_ Compensation & Fees - 2026_02_06 09_47 PST - Recording.mp4"
//      -> "LO Onboarding Series: Compensation & Fees"
function cleanRecordingTitle(mp4Name) {
  let t = mp4Name.replace(/\.mp4$/i, "");
  // strip trailing " - <date> ... - Recording"
  t = t.replace(/\s*-\s*\d{4}[_-].*$/i, "");
  // colon-ify the "Series_ " pattern
  t = t.replace(/_\s/g, ": ").replace(/_$/g, "");
  return t.trim();
}

function normalizePriority(p) {
  if (p === "High" || p === "Medium" || p === "Low") return p;
  // default to Medium if a future manifest has an unexpected value
  return "Medium";
}

function findFileInDirs(fileName, dirs) {
  for (const dir of dirs) {
    const candidate = resolve(dir, fileName);
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

function extractDriveLink(text) {
  const m = String(text || "").match(/https:\/\/drive\.google\.com\/open\?id=[A-Za-z0-9_-]+/);
  return m ? m[0] : null;
}

function extractQuickRecapSummary(md) {
  if (!md) return "";
  const lines = md.split(/\r?\n/);
  let capture = false;
  const body = [];
  for (const line of lines) {
    const t = line.trim();
    if (!capture && /quick video recap/i.test(t)) {
      capture = true;
      continue;
    }
    if (capture) {
      if (/^###\s+\d+\./.test(t) || /^##\s+/.test(t)) break;
      if (/^###\s+\*\*\d+\.\s+/i.test(t) && !/quick video recap/i.test(t)) break;
      if (t) body.push(t.replace(/^[-*]\s+/, ""));
    }
  }
  if (!body.length) return "";
  const text = body.join(" ").replace(/\s+/g, " ").trim();
  const sentence = text.match(/^(.+?[.!?])(\s|$)/);
  return (sentence ? sentence[1] : text).slice(0, 320);
}

// ---------------------------------------------------------------------------
// Load inputs
// ---------------------------------------------------------------------------
const clips = JSON.parse(readFileSync(CLIP_JSON, "utf8"));
if (!Array.isArray(clips)) die("master_clip_manifest.json is not an array");

const ytRows = parseCsv(readFileSync(YOUTUBE_CSV, "utf8"));
const ytHeader = ytRows[0];
const colRowId = ytHeader.indexOf("row_id");
const colUploadStatus = ytHeader.indexOf("upload_status");
if (colRowId === -1 || colUploadStatus === -1) {
  die("youtube_upload_manifest_ready.csv missing row_id or upload_status column");
}
// Map row_id ("001") -> upload_status. row_id maps to clip number, i.e. lo-dev-001.
const uploadStatusByRowId = new Map();
for (let i = 1; i < ytRows.length; i++) {
  const r = ytRows[i];
  const rid = (r[colRowId] || "").trim();
  if (!rid) continue;
  const status = (r[colUploadStatus] || "").trim();
  uploadStatusByRowId.set(rid, status || "pending");
}

const buildSummary = JSON.parse(readFileSync(BUILD_SUMMARY, "utf8"));
const matched = buildSummary.source_files_matched;
if (!Array.isArray(matched) || matched.length === 0) {
  die("build_summary.json source_files_matched missing/empty");
}

// ---------------------------------------------------------------------------
// Build clip entries
// ---------------------------------------------------------------------------
/** @returns {object[]} LoVideo[] for the 91 clips */
function buildClipEntries() {
  return clips.map((c) => {
    // derive the youtube row_id from the clip id (lo-dev-001 -> "001")
    const idNum = (c.id || "").replace(/^lo-dev-/, "");
    const uploadStatus = uploadStatusByRowId.get(idNum) || "pending";
    return {
      id: c.id,
      title: c.title,
      description: c.description || "",
      category: c.platform_category,
      module: null, // clips are not 101-601 modules
      sourceType: "clip",
      localFileName: basenameOrNull(c.video_path),
      thumbnailPath: basenameOrNull(c.thumbnail_path),
      captionPath: basenameOrNull(c.caption_path),
      markdownPath: basenameOrNull(c.markdown_path),
      googleDriveUrl: null,
      youtubeVideoId: null,
      youtubeEmbedUrl: null,
      hostingStatus: "google_drive_ready",
      uploadStatus,
      priority: normalizePriority(c.priority),
      routeSlug: c.slug,
      relatedTrainingModule: null,
      relatedLongFormSource: c.source_recording || null,
      lastCheckedDate: LAST_CHECKED_DATE,
    };
  });
}

// ---------------------------------------------------------------------------
// Build long-form entries (7, in build_summary source order)
// ---------------------------------------------------------------------------
function buildLongFormEntries() {
  return matched.map((m, idx) => {
    const seq = String(idx + 1).padStart(2, "0");
    const mp4 = m.mp4;
    const reportPath = m.markdown ? findFileInDirs(m.markdown, LONGFORM_SOURCE_DIRS) : null;
    const reportText = reportPath ? readFileSync(reportPath, "utf8") : "";
    const summary = extractQuickRecapSummary(reportText);
    return {
      id: `lo-longform-${seq}`,
      title: cleanRecordingTitle(mp4),
      description: summary,
      category: "Training Long Form",
      module: null,
      sourceType: "long_form",
      localFileName: basenameOrNull(mp4),
      thumbnailPath: null, // long-form recordings have no rendered thumbnail in the cutdown library
      captionPath: null,
      markdownPath: basenameOrNull(m.markdown),
      googleDriveUrl: extractDriveLink(reportText),
      youtubeVideoId: null,
      youtubeEmbedUrl: null,
      hostingStatus: "google_drive_ready",
      uploadStatus: "pending", // long-form not in youtube manifest (which is clips only)
      priority: "High",
      routeSlug: kebab(cleanRecordingTitle(mp4)),
      relatedTrainingModule: null,
      relatedLongFormSource: mp4 || null,
      lastCheckedDate: LAST_CHECKED_DATE,
    };
  });
}

// ---------------------------------------------------------------------------
// Assemble + validate
// ---------------------------------------------------------------------------
const clipEntries = buildClipEntries();
const longFormEntries = buildLongFormEntries();
const all = [...clipEntries, ...longFormEntries];

// hard guard: no /Users absolute paths leaked anywhere
const leaked = all.filter((e) =>
  ["localFileName", "thumbnailPath", "captionPath", "markdownPath"].some(
    (k) => typeof e[k] === "string" && e[k].includes("/Users")
  )
);
if (leaked.length) {
  die(`/Users absolute path leaked into ${leaked.length} entr(y/ies): ${leaked.map((e) => e.id).join(", ")}`);
}

// hard guard: unique slugs
const slugSeen = new Map();
for (const e of all) {
  if (slugSeen.has(e.routeSlug)) {
    die(`duplicate routeSlug "${e.routeSlug}" (${slugSeen.get(e.routeSlug)} and ${e.id})`);
  }
  slugSeen.set(e.routeSlug, e.id);
}

// hard guard: counts
if (clipEntries.length !== 91) die(`expected 91 clips, got ${clipEntries.length}`);
if (longFormEntries.length !== 7) die(`expected 7 long_form, got ${longFormEntries.length}`);
if (all.length !== 98) die(`expected 98 total, got ${all.length}`);

// ---------------------------------------------------------------------------
// Compute stats
// ---------------------------------------------------------------------------
const byHostingStatus = {};
const byCategory = {};
for (const e of all) {
  byHostingStatus[e.hostingStatus] = (byHostingStatus[e.hostingStatus] || 0) + 1;
  byCategory[e.category] = (byCategory[e.category] || 0) + 1;
}
const stats = {
  total: all.length,
  clips: clipEntries.length,
  longForm: longFormEntries.length,
  byHostingStatus,
  byCategory,
};

// ---------------------------------------------------------------------------
// Emit TypeScript
// ---------------------------------------------------------------------------
// JSON.stringify produces valid TS object literals with all quotes/newlines
// correctly escaped, so string fields are safe by construction.
function emit() {
  const header = `// AUTO-GENERATED by scripts/build-video-library.mjs — DO NOT EDIT BY HAND.
// Regenerate with: node scripts/build-video-library.mjs
//
// Unified, manifest-driven LO Development video data model.
// Source of truth: .video-source/manifests/{master_clip_manifest.json,
// youtube_upload_manifest_ready.csv, build_summary.json}.
// Nothing has been uploaded to Google Drive or YouTube yet, so every entry is
// hostingStatus "google_drive_ready" with null Drive/YouTube fields.
// 91 clips (lo-dev-001..lo-dev-091) + 7 long_form (lo-longform-01..lo-longform-07) = 98 entries.

export type VideoHostingStatus =
  | "local_only"
  | "google_drive_ready"
  | "google_drive_live"
  | "youtube_pending"
  | "youtube_live"
  | "youtube_failed"
  | "needs_review";

export type VideoSourceType = "long_form" | "clip";

export type LoVideo = {
  id: string;
  title: string;
  description: string;
  category: string;
  module: string | null;
  sourceType: VideoSourceType;
  localFileName: string;
  thumbnailPath: string | null;
  captionPath: string | null;
  markdownPath: string | null;
  googleDriveUrl: string | null;
  youtubeVideoId: string | null;
  youtubeEmbedUrl: string | null;
  hostingStatus: VideoHostingStatus;
  uploadStatus: string;
  priority: "High" | "Medium" | "Low";
  routeSlug: string;
  relatedTrainingModule: string | null;
  relatedLongFormSource: string | null;
  lastCheckedDate: string;
};
`;

  const body = `
export const loDevelopmentVideoLibrary: LoVideo[] = ${JSON.stringify(all, null, 2)};

export function getLoVideoBySlug(slug: string): LoVideo | undefined {
  return loDevelopmentVideoLibrary.find((v) => v.routeSlug === slug);
}

export const loVideoLibraryStats: {
  total: number;
  clips: number;
  longForm: number;
  byHostingStatus: Record<string, number>;
  byCategory: Record<string, number>;
} = ${JSON.stringify(stats, null, 2)};
`;

  return header + body;
}

const ts = emit();

// final guard: no raw /Users substring anywhere in the emitted source
if (ts.includes("/Users")) {
  die("emitted TypeScript still contains a /Users path; aborting write");
}

writeFileSync(OUT_FILE, ts, "utf8");

console.log(`[build-video-library] wrote ${OUT_FILE}`);
console.log(`[build-video-library]   total=${stats.total} clips=${stats.clips} longForm=${stats.longForm}`);
console.log(`[build-video-library]   byHostingStatus=${JSON.stringify(stats.byHostingStatus)}`);
console.log(`[build-video-library]   categories=${Object.keys(stats.byCategory).length}`);
console.log(`[build-video-library]   uploadStatus values=${JSON.stringify([...new Set(all.map((e) => e.uploadStatus))])}`);
