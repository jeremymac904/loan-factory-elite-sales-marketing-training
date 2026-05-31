#!/usr/bin/env node
// build-drive-manifest.mjs
// Power Agent 3 — Google Drive Staging Runbook (Loan Factory LO Development Platform)
//
// PURPOSE
//   Manifest-driven CODEGEN. Reads the read-only cutdown/long-form manifests and
//   emits a single planning object describing every file that WOULD be uploaded to
//   Google Drive, plus its planned destination folder. No network. No uploads.
//   Writes docs/video-library/google-drive/local-to-drive-mapping.csv.
//   Also exported (buildPlan / DRIVE_ROOT_FOLDER / DRIVE_FOLDERS) for the guarded
//   uploader in scripts/drive-upload/upload-to-drive.mjs.
//
// SAFETY
//   READ-ONLY against sources. Writes ONLY inside the agent's owned paths
//   (docs/video-library/google-drive/). Never touches the source folders, never
//   contacts Google.
//
// SOURCE OF TRUTH (staged read-only copies inside the repo):
//   .video-source/manifests/master_clip_manifest.json        (91 clips)
//   .video-source/manifests/build_summary.json                (7 long-form recordings)
//   .video-source/manifests/youtube_upload_manifest_ready.csv (privacy/playlist per clip)
//
// GROUNDING RULE
//   Only real values from the manifests are used. driveFileId / driveFileUrl are
//   ALWAYS emitted empty (to be filled post-upload). We never fabricate URLs.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, basename } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..", "..");
const MANIFEST_DIR = resolve(REPO_ROOT, ".video-source", "manifests");

// ---- Planned Drive folder tree (single source of folder names) -------------
export const DRIVE_ROOT_FOLDER = "Loan Factory LO Development Platform Videos";
export const DRIVE_FOLDERS = {
  longForm: "Long Form Training Videos",
  clips: "Cutdown Clip Library",
  thumbnails: "Thumbnails",
  captions: "Captions",
  markdown: "Markdown Notes",
  manifests: "Manifests",
};

// ---- Tiny dependency-free CSV reader (quote-aware) --------------------------
function parseCsv(text) {
  const rows = [];
  let row = [];
  let cur = "";
  let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') {
        cur += '"';
        i++;
      } else if (c === '"') {
        q = false;
      } else {
        cur += c;
      }
    } else if (c === '"') {
      q = true;
    } else if (c === ",") {
      row.push(cur);
      cur = "";
    } else if (c === "\n") {
      row.push(cur);
      rows.push(row);
      row = [];
      cur = "";
    } else if (c === "\r") {
      // ignore CR
    } else {
      cur += c;
    }
  }
  if (cur.length || row.length) {
    row.push(cur);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell !== ""));
}

function csvField(value) {
  const s = value == null ? "" : String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

// ---- Slug helper for long-form route slugs (kebab of recording name) -------
function kebab(input) {
  return String(input)
    .replace(/\.[^.]+$/, "") // drop extension
    .replace(/&/g, " and ")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

// ---- Read manifests ---------------------------------------------------------
function readManifests() {
  const clipsPath = resolve(MANIFEST_DIR, "master_clip_manifest.json");
  const buildPath = resolve(MANIFEST_DIR, "build_summary.json");
  const ytPath = resolve(MANIFEST_DIR, "youtube_upload_manifest_ready.csv");

  for (const p of [clipsPath, buildPath]) {
    if (!existsSync(p)) {
      throw new Error(`Required manifest missing (read-only source): ${p}`);
    }
  }

  const clipsRaw = JSON.parse(readFileSync(clipsPath, "utf8"));
  // master_clip_manifest.json is a bare array of clip objects.
  const clips = Array.isArray(clipsRaw) ? clipsRaw : clipsRaw.clips || [];
  const build = JSON.parse(readFileSync(buildPath, "utf8"));

  // YouTube manifest is optional for the Drive plan; used only to surface playlist.
  const ytByTitle = new Map();
  if (existsSync(ytPath)) {
    const rows = parseCsv(readFileSync(ytPath, "utf8"));
    const header = rows[0] || [];
    const idx = (name) => header.indexOf(name);
    for (let r = 1; r < rows.length; r++) {
      const title = rows[r][idx("title")];
      ytByTitle.set(title, {
        privacy: rows[r][idx("privacy")] || "",
        notifySubscribers: rows[r][idx("notify_subscribers")] || "",
        playlist: rows[r][idx("playlist")] || "",
        driveFileLink: rows[r][idx("drive_file_link")] || "",
      });
    }
  }

  return { clips, build, ytByTitle };
}

// ---- Build the upload plan (the canonical file list) ------------------------
export function buildPlan() {
  const { clips, build, ytByTitle } = readManifests();

  const CUTDOWN_REL =
    "LF-Projects-Folder/LO Development/LO Development Platform Cutdown Library";
  const LONGFORM_REL =
    "LF-Projects-Folder/LO Development/Training Long Form Videos & Time Stamp Gemini Reports";

  const entries = [];

  // 1) Long-form recordings (7) -> Long Form Training Videos
  const matched = build.source_files_matched || [];
  matched.forEach((rec, i) => {
    const num = String(i + 1).padStart(2, "0");
    const id = `lo-longform-${num}`;
    entries.push({
      assetKind: "long_form_video",
      id,
      routeSlug: kebab(rec.mp4),
      localFileName: rec.mp4,
      sourceFolder: LONGFORM_REL,
      sourceRelPath: `${LONGFORM_REL}/${rec.mp4}`,
      driveFolder: DRIVE_FOLDERS.longForm,
      driveFileId: "",
      driveFileUrl: "",
      privacy: "restricted (link, not public)",
      notes: `Source recording (source_key: ${rec.source_key})`,
    });
  });

  // Long-form Gemini markdown reports -> Markdown Notes (named by report file)
  matched.forEach((rec, i) => {
    const num = String(i + 1).padStart(2, "0");
    entries.push({
      assetKind: "long_form_markdown",
      id: `lo-longform-${num}-notes`,
      routeSlug: kebab(rec.markdown),
      localFileName: rec.markdown,
      sourceFolder: LONGFORM_REL,
      sourceRelPath: `${LONGFORM_REL}/${rec.markdown}`,
      driveFolder: DRIVE_FOLDERS.markdown,
      driveFileId: "",
      driveFileUrl: "",
      privacy: "restricted (link, not public)",
      notes: `Gemini timestamp/notes report (source_key: ${rec.source_key})`,
    });
  });

  // 2) Cutdown clips (91): video + thumbnail + caption + markdown.
  //    Source paths in the manifest are absolute /Users/.../Desktop/... paths,
  //    so we rewrite to basenames under the staged-relative source folders.
  for (const clip of clips) {
    const yt = ytByTitle.get(clip.title) || {};
    const videoName = clip.video_path ? basename(clip.video_path) : `${clip.slug}.mp4`;
    const thumbName = clip.thumbnail_path
      ? basename(clip.thumbnail_path)
      : `${clip.slug}.jpg`;
    const capName = clip.caption_path ? basename(clip.caption_path) : `${clip.slug}.srt`;
    const mdName = clip.markdown_path ? basename(clip.markdown_path) : `${clip.slug}.md`;
    const base = { id: clip.id, routeSlug: clip.slug, privacy: "restricted (link, not public)" };

    entries.push({
      ...base,
      assetKind: "clip_video",
      localFileName: videoName,
      sourceFolder: `${CUTDOWN_REL}/videos`,
      sourceRelPath: `${CUTDOWN_REL}/videos/${videoName}`,
      driveFolder: DRIVE_FOLDERS.clips,
      driveFileId: "",
      driveFileUrl: "",
      notes: `${clip.title}${yt.playlist ? ` | playlist: ${yt.playlist}` : ""}`,
    });
    entries.push({
      ...base,
      assetKind: "clip_thumbnail",
      localFileName: thumbName,
      sourceFolder: `${CUTDOWN_REL}/thumbnails`,
      sourceRelPath: `${CUTDOWN_REL}/thumbnails/${thumbName}`,
      driveFolder: DRIVE_FOLDERS.thumbnails,
      driveFileId: "",
      driveFileUrl: "",
      notes: `Thumbnail for ${clip.id}`,
    });
    entries.push({
      ...base,
      assetKind: "clip_caption",
      localFileName: capName,
      sourceFolder: `${CUTDOWN_REL}/captions`,
      sourceRelPath: `${CUTDOWN_REL}/captions/${capName}`,
      driveFolder: DRIVE_FOLDERS.captions,
      driveFileId: "",
      driveFileUrl: "",
      notes: `Caption for ${clip.id}`,
    });
    entries.push({
      ...base,
      assetKind: "clip_markdown",
      localFileName: mdName,
      sourceFolder: `${CUTDOWN_REL}/markdown`,
      sourceRelPath: `${CUTDOWN_REL}/markdown/${mdName}`,
      driveFolder: DRIVE_FOLDERS.markdown,
      driveFileId: "",
      driveFileUrl: "",
      notes: `Markdown notes for ${clip.id}`,
    });
  }

  // 3) Manifests bundle -> Manifests folder (the planning record itself)
  const manifestFiles = [
    "master_clip_manifest.csv",
    "master_clip_manifest.json",
    "category_index.json",
    "build_summary.json",
    "handoff_validation_summary.json",
    "platform_resource_index.md",
    "automation_trigger_map.md",
    "faq_to_clip_map.md",
    "youtube_upload_manifest_ready.csv",
  ];
  for (const m of manifestFiles) {
    entries.push({
      assetKind: "manifest",
      id: `manifest-${m}`,
      routeSlug: kebab(m),
      localFileName: m,
      sourceFolder: `${CUTDOWN_REL}/manifests`,
      sourceRelPath: `${CUTDOWN_REL}/manifests/${m}`,
      driveFolder: DRIVE_FOLDERS.manifests,
      driveFileId: "",
      driveFileUrl: "",
      privacy: "restricted (link, not public)",
      notes: "Planning manifest (reference copy)",
    });
  }

  const countBy = (kind) => entries.filter((e) => e.assetKind === kind).length;

  return {
    rootFolder: DRIVE_ROOT_FOLDER,
    folders: DRIVE_FOLDERS,
    generatedAt: new Date().toISOString(),
    counts: {
      longFormVideos: countBy("long_form_video"),
      longFormMarkdown: countBy("long_form_markdown"),
      clipVideos: countBy("clip_video"),
      clipThumbnails: countBy("clip_thumbnail"),
      clipCaptions: countBy("clip_caption"),
      clipMarkdown: countBy("clip_markdown"),
      manifests: countBy("manifest"),
      total: entries.length,
    },
    entries,
  };
}

// ---- CSV writer -------------------------------------------------------------
function writeMappingCsv(plan, outPath) {
  const header = [
    "asset_kind",
    "id",
    "route_slug",
    "local_file_name",
    "source_rel_path",
    "planned_drive_folder",
    "drive_file_id",
    "drive_file_url",
    "privacy",
    "notes",
  ];
  const lines = [header.join(",")];
  for (const e of plan.entries) {
    lines.push(
      [
        e.assetKind,
        e.id,
        e.routeSlug,
        e.localFileName,
        e.sourceRelPath,
        e.driveFolder,
        e.driveFileId, // intentionally empty placeholder
        e.driveFileUrl, // intentionally empty placeholder
        e.privacy,
        e.notes,
      ]
        .map(csvField)
        .join(",")
    );
  }
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, lines.join("\n") + "\n", "utf8");
  return lines.length - 1;
}

// ---- Main (run directly) ----------------------------------------------------
const isMain = resolve(process.argv[1] || "") === fileURLToPath(import.meta.url);
if (isMain) {
  const plan = buildPlan();
  const outCsv = resolve(
    REPO_ROOT,
    "docs",
    "video-library",
    "google-drive",
    "local-to-drive-mapping.csv"
  );
  const written = writeMappingCsv(plan, outCsv);
  console.log("Drive upload plan (DRY DATA — no network, no uploads):");
  console.log(JSON.stringify(plan.counts, null, 2));
  console.log(`Wrote ${written} rows -> ${outCsv}`);
  console.log(
    "All drive_file_id / drive_file_url cells are intentionally EMPTY (fill post-upload)."
  );
}
