#!/usr/bin/env node
/**
 * replace-drive-with-youtube.mjs
 * Loan Factory LO Development Platform — Scheduled Drive -> YouTube replacement.
 *
 * Reads the YouTube upload-status manifest, finds clips that now have a REAL
 * youtube_video_id, and flips the matching entries in
 * src/data/loDevelopmentVideoLibrary.ts from the Google Drive fallback to the
 * YouTube embed (hostingStatus = "youtube_live").
 *
 * SAFETY (do not weaken):
 *   - DRY-RUN by default. Requires --apply to write the data file.
 *   - Never uploads anything to Google Drive or YouTube.
 *   - Never invents a youtube_video_id or URL. Only rows whose id matches the
 *     11-char YouTube id shape are eligible.
 *   - Never modifies/deletes any source video/thumbnail/caption/markdown/manifest.
 *   - Never runs git / build / deploy. Validation + commit are done by a human.
 *   - Idempotent: re-running on an already-replaced library is a no-op.
 *
 * Usage:
 *   node scripts/replace-drive-with-youtube.mjs              # DRY-RUN report
 *   node scripts/replace-drive-with-youtube.mjs --apply      # write the data file
 *   node scripts/replace-drive-with-youtube.mjs --json       # machine-readable only
 *   node scripts/replace-drive-with-youtube.mjs --manifest <path>
 *   node scripts/replace-drive-with-youtube.mjs --data <path>
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_VERSION = "1.0.0";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");

// ---- CLI args -------------------------------------------------------------
const argv = process.argv.slice(2);
const FLAGS = {
  apply: argv.includes("--apply"),
  json: argv.includes("--json"),
  manifest: argFor("--manifest"),
  data: argFor("--data"),
};
function argFor(name) {
  const i = argv.indexOf(name);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : null;
}

// ---- Paths ----------------------------------------------------------------
const DATA_FILE =
  FLAGS.data || path.join(REPO_ROOT, "src", "data", "loDevelopmentVideoLibrary.ts");

const MANIFEST_CANDIDATES = [
  FLAGS.manifest,
  path.join(REPO_ROOT, "docs", "video-library", "youtube", "upload-queue-manifest.json"),
  path.join(REPO_ROOT, ".video-source", "manifests", "youtube_upload_manifest_ready.csv"),
  path.join(REPO_ROOT, "docs", "video-library", "youtube", "youtube_upload_manifest_ready.csv"),
].filter(Boolean);

// PA2 generator candidates (preferred path if any exists).
const GENERATOR_CANDIDATES = [
  path.join(REPO_ROOT, "scripts", "build-lo-video-library.mjs"),
  path.join(REPO_ROOT, "scripts", "generate-lo-video-library.mjs"),
  path.join(REPO_ROOT, "scripts", "video-library", "build-lo-video-library.mjs"),
];

// Real YouTube video id shape (11 chars). This is the core anti-fabrication guard.
const YT_ID_RE = /^[A-Za-z0-9_-]{11}$/;
const PLACEHOLDER = new Set(["", "null", "none", "pending", "tbd", "n/a", "na", "-"]);

// ---- Small utilities ------------------------------------------------------
function todayLocalISODate() {
  // YYYY-MM-DD in local time (the scheduled runner's tz, expected America/Chicago).
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function fileExists(p) {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

function readText(p) {
  return fs.readFileSync(p, "utf8");
}

function isRealYtId(v) {
  if (v == null) return false;
  const s = String(v).trim();
  if (PLACEHOLDER.has(s.toLowerCase())) return false;
  return YT_ID_RE.test(s);
}

function embedUrlFor(id) {
  return `https://www.youtube.com/embed/${id}`;
}

// ---- Minimal, dependency-free CSV parser ---------------------------------
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
      // skip
    } else {
      field += c;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  if (rows.length === 0) return [];
  const header = rows[0].map((h) => h.trim());
  return rows.slice(1)
    .filter((r) => r.some((c) => c.trim() !== ""))
    .map((r) => {
      const obj = {};
      header.forEach((h, idx) => (obj[h] = (r[idx] ?? "").trim()));
      return obj;
    });
}

// ---- Load the status manifest into a normalized item list -----------------
// Normalized item: { id|null, slug|null, title|null, youtubeVideoId|null,
//                    youtubeEmbedUrl|null, uploadStatus, privacy, rowIndex }
function loadManifest() {
  const manifestPath = MANIFEST_CANDIDATES.find(fileExists);
  if (!manifestPath) {
    return { manifestPath: null, items: [], format: null };
  }
  const text = readText(manifestPath);
  if (manifestPath.endsWith(".json")) {
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      throw new Error(`Could not parse JSON manifest ${manifestPath}: ${e.message}`);
    }
    const list = Array.isArray(parsed) ? parsed : parsed.items || parsed.queue || [];
    const items = list.map((it, idx) => ({
      id: it.id ?? null,
      slug: it.slug ?? null,
      title: it.title ?? null,
      youtubeVideoId: it.youtubeVideoId ?? it.youtube_video_id ?? null,
      youtubeEmbedUrl: it.youtubeEmbedUrl ?? it.youtube_embed_url ?? null,
      uploadStatus: it.uploadStatus ?? it.upload_status ?? "pending",
      privacy: it.privacy ?? "unlisted",
      rowIndex: idx,
    }));
    return { manifestPath, items, format: "json" };
  }
  // CSV fallback.
  const records = parseCsv(text);
  const items = records.map((r, idx) => ({
    id: r.id ?? null,
    slug: r.slug ?? null,
    title: r.title ?? null,
    youtubeVideoId: r.youtube_video_id ?? null,
    youtubeEmbedUrl: r.youtube_embed_url ?? null,
    uploadStatus: r.upload_status || "pending",
    privacy: r.privacy || "unlisted",
    rowIndex: idx,
  }));
  return { manifestPath, items, format: "csv" };
}

// ---- Parse library entries (id + current youtube fields) for matching -----
// AST-free: we locate each `id: "..."` and read its sibling youtube fields by
// scanning the enclosing object literal via brace matching.
function findEntryBlocks(source) {
  const blocks = [];
  const idRe = /id:\s*"([^"]+)"/g;
  let m;
  while ((m = idRe.exec(source)) !== null) {
    const id = m[1];
    // Walk backward to the opening brace of this object literal.
    let open = source.lastIndexOf("{", m.index);
    if (open < 0) continue;
    // Walk forward via brace matching to find the matching close brace.
    let depth = 0;
    let close = -1;
    for (let i = open; i < source.length; i++) {
      const ch = source[i];
      if (ch === "{") depth++;
      else if (ch === "}") {
        depth--;
        if (depth === 0) {
          close = i;
          break;
        }
      }
    }
    if (close < 0) continue;
    blocks.push({ id, open, close, text: source.slice(open, close + 1) });
  }
  return blocks;
}

function readField(blockText, field) {
  // Matches: field: "value"  |  field: null
  const re = new RegExp(`${field}:\\s*("([^"]*)"|null)`);
  const m = blockText.match(re);
  if (!m) return undefined; // field not present in this entry
  if (m[1] === "null") return null;
  return m[2];
}

function setField(blockText, field, value) {
  // value === null -> write `null`; else write a quoted string.
  const replacement = value === null ? "null" : `"${String(value).replace(/"/g, '\\"')}"`;
  const re = new RegExp(`(${field}:\\s*)("([^"]*)"|null)`);
  if (re.test(blockText)) {
    return blockText.replace(re, `$1${replacement}`);
  }
  return blockText; // field absent -> leave block untouched (no invention)
}

// ---- Plan the replacements ------------------------------------------------
function buildPlan(libraryBlocks, items) {
  const byId = new Map(libraryBlocks.map((b) => [b.id, b]));
  const plan = {
    rowsScanned: items.length,
    rowsWithId: 0,
    alreadyLive: 0,
    newlyReplaced: 0,
    skippedNoId: 0,
    skippedNoMatch: 0,
    needsReview: 0,
    changes: [], // { id, slug, ytId, embedUrl, oldStatus }
    skips: [], // { id|slug, reason }
  };

  for (const it of items) {
    const ytId = it.youtubeVideoId == null ? "" : String(it.youtubeVideoId).trim();

    if (!isRealYtId(ytId)) {
      plan.skippedNoId++;
      // Quiet skip for normal "not uploaded yet" rows; only record a few for the report.
      if (plan.skips.length < 200) {
        plan.skips.push({
          id: it.id || it.slug || `row#${it.rowIndex}`,
          reason: "no real youtube_video_id (clip stays google_drive_ready)",
        });
      }
      continue;
    }

    plan.rowsWithId++;

    // Privacy guard — refuse to flip anything that is not unlisted.
    if (it.privacy && String(it.privacy).toLowerCase() !== "unlisted") {
      plan.needsReview++;
      plan.skips.push({
        id: it.id || it.slug || `row#${it.rowIndex}`,
        reason: `privacy="${it.privacy}" is not unlisted — refusing to flip (needs_review)`,
      });
      continue;
    }

    const block = it.id ? byId.get(it.id) : null;
    if (!block) {
      plan.skippedNoMatch++;
      plan.skips.push({
        id: it.id || it.slug || `row#${it.rowIndex}`,
        reason: "no matching library id (not guessing — set id on the manifest row)",
      });
      continue;
    }

    const currentStatus = readField(block.text, "hostingStatus");
    const currentYt = readField(block.text, "youtubeVideoId");

    if (currentStatus === "youtube_live" && currentYt === ytId) {
      plan.alreadyLive++;
      continue; // idempotent no-op
    }

    plan.newlyReplaced++;
    plan.changes.push({
      id: block.id,
      slug: it.slug || readField(block.text, "routeSlug") || null,
      ytId,
      embedUrl: embedUrlFor(ytId),
      oldStatus: currentStatus ?? "(unknown)",
    });
  }

  return { plan, byId };
}

// ---- Apply the plan to the source string (per-id block edit) --------------
function applyPlan(source, byId, plan, runDate) {
  // Edit from the bottom up so earlier offsets stay valid.
  const ordered = [...plan.changes]
    .map((c) => ({ c, block: byId.get(c.id) }))
    .filter((x) => x.block)
    .sort((a, b) => b.block.open - a.block.open);

  let out = source;
  for (const { c, block } of ordered) {
    let t = block.text;
    t = setField(t, "youtubeVideoId", c.ytId);
    t = setField(t, "youtubeEmbedUrl", c.embedUrl);
    t = setField(t, "hostingStatus", "youtube_live");
    t = setField(t, "uploadStatus", "uploaded");
    t = setField(t, "lastCheckedDate", runDate);
    out = out.slice(0, block.open) + t + out.slice(block.close + 1);
  }
  return out;
}

// ---- Reporting ------------------------------------------------------------
function printHuman(ctx) {
  const { mode, manifestPath, plan, generatorDetected, wrote, runDate } = ctx;
  const L = (s = "") => process.stdout.write(s + "\n");
  L("==========================================================");
  L("  Drive -> YouTube replacement  (LO Development Platform)");
  L("==========================================================");
  L(`  Script version : ${SCRIPT_VERSION}`);
  L(`  Run date       : ${runDate}`);
  L(`  Mode           : ${mode}`);
  L(`  Manifest       : ${manifestPath || "(none found)"}`);
  L(`  Data file      : ${path.relative(REPO_ROOT, DATA_FILE)}`);
  L(`  Generator seen : ${generatorDetected || "no (using guarded per-id edit)"}`);
  L("----------------------------------------------------------");
  L(`  Rows scanned             : ${plan.rowsScanned}`);
  L(`  Rows with real YT id     : ${plan.rowsWithId}`);
  L(`  Already youtube_live     : ${plan.alreadyLive}`);
  L(`  Newly replaced (planned) : ${plan.newlyReplaced}`);
  L(`  Skipped (no YT id)       : ${plan.skippedNoId}`);
  L(`  Skipped (no library id)  : ${plan.skippedNoMatch}`);
  L(`  Needs review             : ${plan.needsReview}`);
  L(`  Write performed          : ${wrote ? "YES" : "NO (dry-run)"}`);
  L("----------------------------------------------------------");
  if (plan.changes.length) {
    L("  Newly replaced clips:");
    for (const c of plan.changes) {
      L(`    - ${c.id}  ${c.ytId}  (${c.oldStatus} -> youtube_live)`);
    }
  } else {
    L("  No clips eligible for replacement this run (normal until uploads begin).");
  }
  if (plan.skippedNoMatch || plan.needsReview) {
    L("  Attention:");
    for (const s of plan.skips) {
      if (
        s.reason.includes("no matching library id") ||
        s.reason.includes("needs_review")
      ) {
        L(`    - ${s.id}: ${s.reason}`);
      }
    }
  }
  L("==========================================================");
  if (mode === "DRY-RUN") {
    L("  DRY-RUN: nothing written. Re-run with --apply to write the data file");
    L("  (then a human runs lint/typecheck/build + git commit; never auto-push).");
  } else {
    L("  APPLIED: data file updated. Next: human runs lint/typecheck/build,");
    L("  reviews the diff, commits locally. Do NOT push/deploy without approval.");
  }
}

function printJson(ctx) {
  const { mode, manifestPath, plan, generatorDetected, wrote, runDate } = ctx;
  const payload = {
    script: "replace-drive-with-youtube",
    version: SCRIPT_VERSION,
    runDate,
    mode,
    manifestPath: manifestPath ? path.relative(REPO_ROOT, manifestPath) : null,
    dataFile: path.relative(REPO_ROOT, DATA_FILE),
    generatorDetected: generatorDetected || null,
    wrote,
    counts: {
      rowsScanned: plan.rowsScanned,
      rowsWithId: plan.rowsWithId,
      alreadyLive: plan.alreadyLive,
      newlyReplaced: plan.newlyReplaced,
      skippedNoId: plan.skippedNoId,
      skippedNoMatch: plan.skippedNoMatch,
      needsReview: plan.needsReview,
    },
    changes: plan.changes,
    attention: plan.skips.filter(
      (s) =>
        s.reason.includes("no matching library id") ||
        s.reason.includes("needs_review"),
    ),
  };
  process.stdout.write("JSON_REPORT_BEGIN\n");
  process.stdout.write(JSON.stringify(payload, null, 2) + "\n");
  process.stdout.write("JSON_REPORT_END\n");
}

// ---- Main -----------------------------------------------------------------
function main() {
  const runDate = todayLocalISODate();
  const mode = FLAGS.apply ? "APPLY" : "DRY-RUN";

  if (!fileExists(DATA_FILE)) {
    const msg = `[replace-drive-with-youtube] Data file not found: ${DATA_FILE}\n` +
      "  PA2 must produce src/data/loDevelopmentVideoLibrary.ts first. Aborting (no changes).";
    process.stderr.write(msg + "\n");
    process.exitCode = 2;
    return;
  }

  const { manifestPath, items } = loadManifest();
  if (!manifestPath) {
    process.stderr.write(
      "[replace-drive-with-youtube] No status manifest found in any known location.\n" +
        "  Looked for: docs/video-library/youtube/upload-queue-manifest.json and\n" +
        "  .video-source/manifests/youtube_upload_manifest_ready.csv\n" +
        "  Nothing to do. Exiting cleanly (no changes).\n",
    );
    // Not an error per se — there is simply no queue yet.
    const empty = {
      rowsScanned: 0, rowsWithId: 0, alreadyLive: 0, newlyReplaced: 0,
      skippedNoId: 0, skippedNoMatch: 0, needsReview: 0, changes: [], skips: [],
    };
    const ctx = { mode, manifestPath: null, plan: empty, generatorDetected: null, wrote: false, runDate };
    if (FLAGS.json) printJson(ctx);
    else printHuman(ctx);
    return;
  }

  const source = readText(DATA_FILE);
  const blocks = findEntryBlocks(source);
  const { plan, byId } = buildPlan(blocks, items);

  const generatorDetected = GENERATOR_CANDIDATES.find(fileExists);
  // NOTE: generator re-run is intentionally NOT auto-invoked here. Re-running a
  // generator is an --apply-only, human-supervised action; the safe default for a
  // scheduled DRY-RUN is the per-id edit plan. If you wire generator re-run, do it
  // only under FLAGS.apply and only after writing a merged overrides side-car.

  let wrote = false;
  if (FLAGS.apply) {
    if (plan.newlyReplaced > 0) {
      const updated = applyPlan(source, byId, plan, runDate);
      if (updated !== source) {
        fs.writeFileSync(DATA_FILE, updated, "utf8");
        wrote = true;
      }
    }
    // If newlyReplaced === 0, apply is a deliberate no-op (idempotent).
  }

  const ctx = {
    mode,
    manifestPath,
    plan,
    generatorDetected: generatorDetected
      ? path.relative(REPO_ROOT, generatorDetected)
      : null,
    wrote,
    runDate,
  };
  if (FLAGS.json) printJson(ctx);
  else printHuman(ctx);

  // Explicitly: this script NEVER runs git / build / deploy.
}

try {
  main();
} catch (e) {
  process.stderr.write(`[replace-drive-with-youtube] FATAL: ${e.stack || e.message}\n`);
  process.exitCode = 1;
}
