#!/usr/bin/env node
/**
 * build-video-content.mjs  (Power Agent 7 — Training Content Layer)
 *
 * Generates src/data/loDevelopmentVideoContent.ts — the editorial content layer
 * (LoVideoContent) keyed by LoVideo.id, source-grounded from:
 *   - .video-source/manifests/master_clip_manifest.csv   (91 clips)
 *   - .video-source/markdown/*.md                        (per-clip transcripts/notes)
 *   - .video-source/manifests/faq_to_clip_map.md         (related-resource hints)
 *   - .video-source/manifests/category_index.json        (category grouping)
 *   - .video-source/manifests/build_summary.json         (long-form source roster)
 *   - .video-source/longform-reports/*.md (+ long-form source folder fallback)
 *
 * IDs MUST match PA2 (src/data/loDevelopmentVideoLibrary.ts):
 *   clips      = manifest 'id' column (lo-dev-001 .. lo-dev-0NN)
 *   long-form  = lo-longform-01 .. lo-longform-07  (build_summary source_files_matched order)
 *
 * SAFETY: read-only on all sources. Writes ONLY src/data/loDevelopmentVideoContent.ts.
 * No uploads, no network, no fabricated Drive/YouTube URLs, no invented metadata.
 * If a clip has no usable markdown, sourceMissing=true with minimal manifest-only fields.
 */

import fs from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const VS = path.join(ROOT, ".video-source");
const MANIFESTS = path.join(VS, "manifests");
const MARKDOWN_DIR = path.join(VS, "markdown");
const LONGFORM_REPORTS = path.join(VS, "longform-reports");
const OUT_FILE = path.join(ROOT, "src", "data", "loDevelopmentVideoContent.ts");

// The original (read-only) long-form source folder(s), used only as a fallback
// to locate the 7 Gemini timestamp/markdown reports if they were not staged.
// NOTE: the on-disk folder name has a trailing space; both spellings are tried.
const LONGFORM_SOURCE_DIRS = [
  "/Volumes/LegendsOS/macmini-m1/LoanFactory-Thuan/LF-Projects-Folder/LO Development/Training Long Form Videos & Time Stamp Gemini Reports ",
  "/Volumes/LegendsOS/macmini-m1/LoanFactory-Thuan/LF-Projects-Folder/LO Development/Training Long Form Videos & Time Stamp Gemini Reports",
];

/* ------------------------------------------------------------------ */
/* CSV parsing (RFC-4180-ish: quoted fields, embedded commas/newlines) */
/* ------------------------------------------------------------------ */
function parseCsv(text) {
  const rows = [];
  let field = "";
  let row = [];
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
      field = "";
      rows.push(row);
      row = [];
    } else if (c === "\r") {
      // ignore; handled by \n
    } else {
      field += c;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function csvToObjects(text) {
  const rows = parseCsv(text).filter((r) => r.some((c) => c !== ""));
  const header = rows[0].map((h) => h.trim());
  return rows.slice(1).map((r) => {
    const o = {};
    header.forEach((h, idx) => {
      o[h] = (r[idx] ?? "").trim();
    });
    return o;
  });
}

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */
function clean(s) {
  return (s ?? "").replace(/\s+/g, " ").trim();
}

function splitList(s) {
  return clean(s)
    .split(/\s*;\s*/)
    .map((x) => x.trim())
    .filter(Boolean);
}

function fmtWatchTime(durationSeconds) {
  const d = Number(durationSeconds);
  if (!Number.isFinite(d) || d <= 0) return null;
  const total = Math.round(d);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return h > 0
    ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : `${m}:${String(s).padStart(2, "0")}`;
}

function uniq(arr) {
  return [...new Set(arr.filter(Boolean))];
}

function firstSentence(text, maxLen = 320) {
  const t = clean(text);
  if (!t) return "";
  // Prefer a full sentence boundary.
  const m = t.match(/^(.+?[.!?])(\s|$)/);
  let out = m ? m[1] : t;
  if (out.length > maxLen) out = out.slice(0, maxLen - 1).trimEnd() + "…";
  return out;
}

/* Extract the most informative prose body from a clip markdown file. */
function extractMarkdownBody(md) {
  if (!md) return "";
  const lines = md.split(/\r?\n/);
  const body = [];
  for (let line of lines) {
    const t = line.trim();
    if (!t) continue;
    if (t.startsWith("#")) continue; // headings
    if (/^[-*]\s/.test(t)) {
      body.push(t.replace(/^[-*]\s+/, ""));
      continue;
    }
    if (/^\|/.test(t)) continue; // table rows
    if (/^>/.test(t)) {
      body.push(t.replace(/^>\s?/, ""));
      continue;
    }
    if (/^\d{1,2}:\d{2}/.test(t)) continue; // timestamp lines
    if (/^(key\s*topics|tags|faq|audience|category|priority)\s*:/i.test(t)) continue;
    body.push(t);
  }
  return body.join(" ");
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
  return body.length > 0 ? firstSentence(body.join(" "), 320) : "";
}

function findFileInDirs(fileName, dirs) {
  for (const dir of dirs) {
    const candidate = path.join(dir, fileName);
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

function probeWatchTime(filePath) {
  if (!filePath) return "";
  try {
    const out = execFileSync(
      "ffprobe",
      [
        "-v",
        "error",
        "-show_entries",
        "format=duration",
        "-of",
        "default=noprint_wrappers=1:nokey=1",
        filePath,
      ],
      { encoding: "utf8" },
    ).trim();
    const seconds = Number(out);
    return fmtWatchTime(seconds);
  } catch {
    return "";
  }
}

function tsString(s) {
  // JSON.stringify gives a safe, escaped TS string literal (double-quoted).
  return JSON.stringify(s ?? "");
}

function tsStringArray(arr) {
  if (!arr || arr.length === 0) return "[]";
  return "[" + arr.map((x) => JSON.stringify(x)).join(", ") + "]";
}

function tsNullableString(s) {
  return s == null || s === "" ? "null" : JSON.stringify(s);
}

/* ------------------------------------------------------------------ */
/* Markdown filename -> manifest row matching                          */
/* The manifest markdown_path basename matches files in markdown/.     */
/* ------------------------------------------------------------------ */
function basenameNoExt(p) {
  return path.basename(p || "").replace(/\.[^.]+$/, "");
}

function readMarkdownForRow(row, mdIndex) {
  const candidates = uniq([
    basenameNoExt(row.markdown_path),
    `${row.platform_category}`, // unlikely, defensive
    row.slug,
  ]);
  for (const key of candidates) {
    if (key && mdIndex.has(key)) {
      try {
        return fs.readFileSync(mdIndex.get(key), "utf8");
      } catch {
        /* ignore */
      }
    }
  }
  return "";
}

/* ------------------------------------------------------------------ */
/* faq_to_clip_map.md -> related resources per category/title          */
/* ------------------------------------------------------------------ */
function parseFaqMap(text) {
  // Returns array of { question, target } lines we can surface as resources.
  const out = [];
  if (!text) return out;
  for (const line of text.split(/\r?\n/)) {
    const t = line.trim();
    // Markdown list items "- Question -> clip" or "Q: ..." patterns.
    const m = t.match(/^[-*]\s+(.*)$/);
    if (m) out.push(clean(m[1]));
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Build LoVideoContent for a clip row                                 */
/* ------------------------------------------------------------------ */
function buildClipContent(row, mdIndex) {
  const id = clean(row.id);
  const title = clean(row.title);
  const description = clean(row.description);
  const problemSolved = clean(row.problem_solved);
  const audience = clean(row.audience);
  const category = clean(row.platform_category);
  const secondary = splitList(row.secondary_categories);
  const tags = splitList(row.tags);
  const faqQuestions = splitList(row.faq_questions);
  const watchTime = fmtWatchTime(row.duration_seconds);

  const md = readMarkdownForRow(row, mdIndex);
  const mdBody = extractMarkdownBody(md);

  const hasUsableSource = Boolean(description || problemSolved || mdBody);

  // summary: prefer manifest description; enrich with markdown first sentence
  // only when the manifest description is thin.
  let summary = description;
  if (!summary && mdBody) summary = firstSentence(mdBody);
  if (!summary) summary = problemSolved || title;

  // whatThisHelpsWith: the problem solved (grounded).
  let whatThisHelpsWith = problemSolved;
  if (!whatThisHelpsWith && mdBody) whatThisHelpsWith = firstSentence(mdBody);
  if (!whatThisHelpsWith) whatThisHelpsWith = summary;

  // keyTopics: tags first, then secondary categories, deduped & capped.
  const keyTopics = uniq([...tags, ...secondary]).slice(0, 8);

  // relatedResources: FAQ questions this clip answers + sibling category label.
  const relatedResources = uniq([
    ...faqQuestions,
    category ? `${category} (platform category)` : null,
  ]).slice(0, 6);

  // nextAction: a concrete grounded step derived from category/title.
  const nextAction = buildNextAction(category, title, faqQuestions);

  return {
    id,
    lessonTitle: title,
    summary: clean(summary),
    audience: audience || "Loan Officers",
    module: category || null,
    whatThisHelpsWith: clean(whatThisHelpsWith),
    watchTime: watchTime || "",
    keyTopics,
    relatedResources,
    nextAction,
    sourceMissing: !hasUsableSource,
  };
}

function buildNextAction(category, title, faqQuestions) {
  const cat = clean(category);
  const t = clean(title);
  if (faqQuestions.length > 0) {
    return `Apply this in your next file: ${firstSentence(t, 120)}. If you hit the question "${faqQuestions[0]}", revisit this clip or open a support ticket.`;
  }
  if (cat) {
    return `Practice this step inside the ${cat} workflow, then continue to the next clip in this section.`;
  }
  return `Watch the clip, then apply the step in your next live file.`;
}

/* ------------------------------------------------------------------ */
/* Long-form (7) content from build_summary + Gemini reports           */
/* ------------------------------------------------------------------ */
function listGeminiReports() {
  const found = new Map(); // key -> filepath
  function scan(dir) {
    if (!fs.existsSync(dir)) return;
    for (const f of fs.readdirSync(dir)) {
      if (f.toLowerCase().endsWith(".md")) {
        found.set(f, path.join(dir, f));
      }
    }
  }
  scan(LONGFORM_REPORTS);
  // Fallback to the original source folder(s) (read-only) if staged copies absent.
  if (found.size === 0) {
    for (const dir of LONGFORM_SOURCE_DIRS) {
      scan(dir);
      if (found.size > 0) break;
    }
  }
  return found;
}

function deriveLongFormSlug(name) {
  return clean(name)
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function prettyLongFormTitle(sourceFile) {
  // "LO Development Series_ 1003 Mistakes to Avoid - 2026_05_18 ... .mp4"
  let n = clean(sourceFile).replace(/\.[^.]+$/, "");
  // Strip trailing timestamp/recording suffix.
  n = n.replace(/\s*-\s*\d{4}[_-]\d{2}[_-]\d{2}.*$/i, "");
  n = n.replace(/\s*-\s*Recording.*$/i, "");
  n = n.replace(/_/g, ": ").replace(/\s{2,}/g, " ").trim();
  return n;
}

function bestMatchReport(sourceFile, reports) {
  const base = basenameNoExt(sourceFile).toLowerCase();
  // Try exact basename match first.
  for (const [name, fp] of reports) {
    if (basenameNoExt(name).toLowerCase() === base) return fp;
  }
  // Try token overlap (theme words from the title).
  const theme = prettyLongFormTitle(sourceFile)
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 3);
  let best = null;
  let bestScore = 0;
  for (const [name, fp] of reports) {
    const ln = name.toLowerCase();
    const score = theme.reduce((acc, w) => acc + (ln.includes(w) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      best = fp;
    }
  }
  return bestScore > 0 ? best : null;
}

function buildLongFormContent(sourceFile, idx, reports) {
  const id = `lo-longform-${String(idx + 1).padStart(2, "0")}`;
  const title = prettyLongFormTitle(sourceFile);
  const reportPath = bestMatchReport(sourceFile, reports);
  let reportText = "";
  if (reportPath) {
    try {
      reportText = fs.readFileSync(reportPath, "utf8");
    } catch {
      /* ignore */
    }
  }
  const body = extractMarkdownBody(reportText);
  const recapSummary = extractQuickRecapSummary(reportText);
  const hasUsableSource = Boolean(body);
  const summary = recapSummary || (hasUsableSource ? firstSentence(body, 320) : `Full long-form training recording: ${title}.`);
  const sourcePath = findFileInDirs(sourceFile, LONGFORM_SOURCE_DIRS);
  const watchTime = probeWatchTime(sourcePath);

  // keyTopics: prefer the real "Topic" column from the Gemini Timestamp Topic
  // Map table (actual lesson subjects). Fall back to cleaned report headings,
  // dropping production-plan boilerplate ("Quick Video Recap", "Timestamp Topic
  // Map", "Best Clips to Cut", "Automation Opportunities", etc.).
  const tableTopics = extractTimestampTableTopics(reportText);
  const headingTopics = extractHeadingTopics(reportText)
    .map((topic) =>
      clean(
        topic
          .replace(/\\([.)&])/g, "$1") // unescape "\." / "\)" / "\&"
          .replace(/^\d+\s*[.)]\s*/, "") // strip leading "1." / "2)"
          .replace(/^[*_]+|[*_]+$/g, ""), // strip stray markdown emphasis
      ),
    )
    .filter((topic) => topic && topic.length >= 3 && topic.length <= 60)
    .filter((topic) => !isBoilerplateHeading(topic));
  const keyTopicsUnique = uniq([...tableTopics, ...headingTopics])
    .filter(Boolean)
    .slice(0, 8);

  return {
    id,
    lessonTitle: title,
    summary: clean(summary),
    audience: "Loan Officers, new LOs, LO Support, and corporate coaches",
    module: "Long-Form Training",
    whatThisHelpsWith: hasUsableSource
      ? `Deep-dive context behind the bite-size clips cut from this session: ${title}.`
      : `The complete recording for ${title}; bite-size clips are cut from this session.`,
    watchTime,
    keyTopics: keyTopicsUnique,
    relatedResources: ["Clips cut from this long-form session (see clip library)"],
    nextAction: hasUsableSource
      ? `Use the timestamp report to jump to the section you need, then apply it in a live file.`
      : `Watch the full session for end-to-end context, or use the related clips for a specific step.`,
    sourceMissing: !hasUsableSource,
  };
}

// Production-plan section headings that are NOT real lesson subjects.
const BOILERPLATE_HEADINGS =
  /^(quick video recap|timestamp topic map|best clips to cut|questions this video answers|automation opportunities|platform (resource|placement)|resource page|clip \d+|start|end|topic|priority|category|short clip|what lo learns|why it matters)\b/i;

function isBoilerplateHeading(topic) {
  return BOILERPLATE_HEADINGS.test(clean(topic));
}

// Pull the "Topic" column out of the Gemini "Timestamp Topic Map" markdown
// table. Table format: | Start | End | Topic | What LO Learns | ... |
function extractTimestampTableTopics(md) {
  if (!md) return [];
  const topics = [];
  for (const line of md.split(/\r?\n/)) {
    const t = line.trim();
    if (!/^\|/.test(t)) continue;
    const cells = t
      .split("|")
      .map((c) => clean(c.replace(/\\([.)&])/g, "$1")))
      .filter((c, i, arr) => !(i === 0 && c === "") && !(i === arr.length - 1 && c === ""));
    if (cells.length < 3) continue;
    const topic = cells[2];
    if (!topic) continue;
    if (/^[:\- ]+$/.test(topic)) continue; // separator row
    if (/^topic\b/i.test(topic)) continue; // header row ("Topic" / "Topic Covered")
    if (topic.length < 3 || topic.length > 60) continue;
    topics.push(topic);
  }
  return uniq(topics);
}

function extractHeadingTopics(md) {
  if (!md) return [];
  const topics = [];
  for (const line of md.split(/\r?\n/)) {
    const t = line.trim();
    const h = t.match(/^#{1,4}\s+(.*)$/);
    if (h) {
      const clean1 = clean(h[1]).replace(/^\d+[.)]\s*/, "");
      if (clean1 && clean1.length <= 60) topics.push(clean1);
      continue;
    }
    // timestamp section "00:12 Something" or "[00:12] Something"
    const ts = t.match(/^\[?\d{1,2}:\d{2}(?::\d{2})?\]?\s*[-–—]?\s*(.+)$/);
    if (ts) {
      const label = clean(ts[1]).replace(/[.!?]+$/, "");
      if (label && label.length <= 60) topics.push(label);
    }
  }
  return uniq(topics);
}

/* ------------------------------------------------------------------ */
/* Main                                                               */
/* ------------------------------------------------------------------ */
function main() {
  // 1) Index markdown files by basename-no-ext.
  const mdIndex = new Map();
  for (const f of fs.readdirSync(MARKDOWN_DIR)) {
    if (f.endsWith(".md")) {
      mdIndex.set(f.replace(/\.md$/, ""), path.join(MARKDOWN_DIR, f));
    }
  }

  // 2) Parse manifest.
  const csvText = fs.readFileSync(
    path.join(MANIFESTS, "master_clip_manifest.csv"),
    "utf8",
  );
  const rows = csvToObjects(csvText);

  const clipContent = rows.map((r) => buildClipContent(r, mdIndex));

  // 3) Long-form roster from build_summary.json.
  const buildSummary = JSON.parse(
    fs.readFileSync(path.join(MANIFESTS, "build_summary.json"), "utf8"),
  );
  const longFormSources = extractLongFormSources(buildSummary);
  const reports = listGeminiReports();
  const longFormContent = [];
  for (let i = 0; i < longFormSources.length; i++) {
    longFormContent.push(buildLongFormContent(longFormSources[i], i, reports));
  }

  const all = [...clipContent, ...longFormContent];

  // 4) Emit TS.
  emitTs(all, {
    clips: clipContent.length,
    longForm: longFormContent.length,
    reportsFound: reports.size,
  });

  // 5) Console report.
  const missing = all.filter((c) => c.sourceMissing).length;
  console.log(
    `[build-video-content] wrote ${all.length} entries ` +
      `(${clipContent.length} clips + ${longFormContent.length} long-form), ` +
      `sourceMissing=${missing}, geminiReportsFound=${reports.size}`,
  );
  console.log(`[build-video-content] output: ${OUT_FILE}`);
}

function extractLongFormSources(buildSummary) {
  // Try common shapes for the matched long-form source roster.
  const candidates = [];
  const push = (v) => {
    if (typeof v === "string") candidates.push(v);
  };
  const sm =
    buildSummary.source_files_matched ||
    buildSummary.sources_matched ||
    buildSummary.source_recordings ||
    buildSummary.long_form_sources ||
    buildSummary.recordings ||
    null;
  if (Array.isArray(sm)) {
    for (const item of sm) {
      if (typeof item === "string") push(item);
      else if (item && typeof item === "object")
        // Prefer the real recording filename (mp4/markdown) so the title is a
        // clean human label; fall back to source_key only if no filename exists.
        push(
          item.mp4 ||
            item.markdown ||
            item.source_file ||
            item.file ||
            item.recording ||
            item.name ||
            item.source_key,
        );
    }
  } else if (sm && typeof sm === "object") {
    for (const k of Object.keys(sm)) push(sm[k]?.mp4 || sm[k]?.source_file || k);
  }
  // De-dupe while preserving order.
  return uniq(candidates);
}

function emitTs(entries, meta) {
  const lines = [];
  lines.push("// AUTO-GENERATED by scripts/build-video-content.mjs — DO NOT EDIT BY HAND.");
  lines.push("// Editorial content layer (Power Agent 7) for the LO Development video library.");
  lines.push("// Source-grounded from .video-source manifests + per-clip markdown + long-form Gemini reports.");
  lines.push(`// Generated: ${new Date().toISOString()}`);
  lines.push(
    `// Counts: ${meta.clips} clips + ${meta.longForm} long-form = ${meta.clips + meta.longForm} entries; geminiReportsFound=${meta.reportsFound}.`,
  );
  lines.push("// IDs match src/data/loDevelopmentVideoLibrary.ts (PA2): clips lo-dev-0NN, long-form lo-longform-01..07.");
  lines.push("");
  lines.push("export type LoVideoContent = {");
  lines.push("  id: string;");
  lines.push("  lessonTitle: string;");
  lines.push("  summary: string;");
  lines.push("  audience: string;");
  lines.push("  module: string | null;");
  lines.push("  whatThisHelpsWith: string;");
  lines.push("  watchTime: string;");
  lines.push("  keyTopics: string[];");
  lines.push("  relatedResources: string[];");
  lines.push("  nextAction: string;");
  lines.push("  sourceMissing: boolean;");
  lines.push("};");
  lines.push("");
  lines.push("export const loDevelopmentVideoContent: LoVideoContent[] = [");
  for (const c of entries) {
    lines.push("  {");
    lines.push(`    id: ${tsString(c.id)},`);
    lines.push(`    lessonTitle: ${tsString(c.lessonTitle)},`);
    lines.push(`    summary: ${tsString(c.summary)},`);
    lines.push(`    audience: ${tsString(c.audience)},`);
    lines.push(`    module: ${tsNullableString(c.module)},`);
    lines.push(`    whatThisHelpsWith: ${tsString(c.whatThisHelpsWith)},`);
    lines.push(`    watchTime: ${tsString(c.watchTime)},`);
    lines.push(`    keyTopics: ${tsStringArray(c.keyTopics)},`);
    lines.push(`    relatedResources: ${tsStringArray(c.relatedResources)},`);
    lines.push(`    nextAction: ${tsString(c.nextAction)},`);
    lines.push(`    sourceMissing: ${c.sourceMissing ? "true" : "false"},`);
    lines.push("  },");
  }
  lines.push("];");
  lines.push("");
  lines.push("const _contentById = new Map<string, LoVideoContent>(");
  lines.push("  loDevelopmentVideoContent.map((c) => [c.id, c]),");
  lines.push(");");
  lines.push("");
  lines.push("export function getLoVideoContent(id: string): LoVideoContent | undefined {");
  lines.push("  return _contentById.get(id);");
  lines.push("}");
  lines.push("");
  fs.writeFileSync(OUT_FILE, lines.join("\n"), "utf8");
}

main();
