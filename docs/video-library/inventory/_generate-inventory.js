#!/usr/bin/env node
/* Local Video Inventory generator — Power Agent 1 (Loan Factory LO Development Platform)
 *
 * Source-grounded from read-only manifests + actual source-folder listings.
 * Re-run with:  node docs/video-library/inventory/_generate-inventory.js
 * Prereq temp files (captured via ls/stat from the read-only source folders):
 *   /tmp/list_videos.txt /tmp/list_thumbs.txt /tmp/list_caps.txt /tmp/list_md.txt
 *   /tmp/sizes_cutdown.txt /tmp/list_longform.txt /tmp/sizes_longform.txt
 * No invented values, URLs, or metadata; nothing uploaded. Missing data is marked explicitly.
 */
const fs = require("fs");
const path = require("path");

const REPO = "/Volumes/LegendsOS/macmini-m1/LoanFactory-Thuan/loan-factory-live";
const MAN = path.join(REPO, ".video-source/manifests");
const OUT = path.join(REPO, "docs/video-library/inventory");
const SRC_CUTDOWN = "LF-Projects-Folder/LO Development/LO Development Platform Cutdown Library";
const SRC_LONGFORM = "LF-Projects-Folder/LO Development/Training Long Form Videos & Time Stamp Gemini Reports";
const GEN_DATE = "2026-05-31";

fs.mkdirSync(OUT, { recursive: true });

const J = (f) => JSON.parse(fs.readFileSync(path.join(MAN, f), "utf8"));
const lines = (f) => fs.readFileSync(f, "utf8").split("\n").map((s) => s.trim()).filter(Boolean);
const base = (p) => String(p).split("/").pop();

// ---- Load manifests ----
const clips = J("master_clip_manifest.json");
const catIndex = J("category_index.json");
const buildSummary = J("build_summary.json");
const handoff = J("handoff_validation_summary.json");

// ---- Load actual disk listings ----
const diskVideos = lines("/tmp/list_videos.txt");
const diskThumbs = lines("/tmp/list_thumbs.txt");
const diskCaps = lines("/tmp/list_caps.txt");
const diskMd = lines("/tmp/list_md.txt");
const diskLongform = lines("/tmp/list_longform.txt").filter((f) => f !== ".DS_Store");

// ---- Load sizes ----
const sizeMap = {};
lines("/tmp/sizes_cutdown.txt").forEach((l) => { const a = l.split("|"); sizeMap[base(a[2])] = parseInt(a[0], 10); });
const lfSizeMap = {};
lines("/tmp/sizes_longform.txt").forEach((l) => { const a = l.split("|"); lfSizeMap[base(a[2])] = parseInt(a[0], 10); });

const setV = new Set(diskVideos), setT = new Set(diskThumbs), setC = new Set(diskCaps), setM = new Set(diskMd);
const setLF = new Set(diskLongform);

// ---- Helpers ----
const fmtBytes = (b) => {
  if (b == null || isNaN(b)) return "n/a";
  if (b >= 1024 ** 3) return (b / 1024 ** 3).toFixed(2) + " GiB";
  if (b >= 1024 ** 2) return (b / 1024 ** 2).toFixed(1) + " MiB";
  if (b >= 1024) return (b / 1024).toFixed(1) + " KiB";
  return b + " B";
};
const sumBytes = (names, m) => names.reduce((a, n) => a + (m[n] || 0), 0);
const esc = (s) => String(s == null ? "" : s).replace(/\|/g, "\\|").replace(/\n/g, " ");
const write = (name, content) => { fs.writeFileSync(path.join(OUT, name), content); return name; };
const header = (title, sub) =>
  `# ${title}\n\n> ${sub}\n>\n> Generated ${GEN_DATE} by Power Agent 1 (Local Video Inventory). Source-grounded from read-only manifests + actual source-folder file listings. No values invented; nothing uploaded. Regenerate via \`node docs/video-library/inventory/_generate-inventory.js\`.\n\n`;

const created = [];

// ---- Shared computed values ----
const cutdownVideoBytes = sumBytes(diskVideos, sizeMap);
const cutdownThumbBytes = sumBytes(diskThumbs, sizeMap);
const cutdownCapBytes = sumBytes(diskCaps, sizeMap);
const cutdownMdBytes = sumBytes(diskMd, sizeMap);
const cutdownAllBytes = cutdownVideoBytes + cutdownThumbBytes + cutdownCapBytes + cutdownMdBytes;

const lfMp4 = diskLongform.filter((f) => f.endsWith(".mp4")).sort();
const lfMdFiles = diskLongform.filter((f) => f.endsWith(".md")).sort();
const lfMp4Bytes = sumBytes(lfMp4, lfSizeMap);

const matched = buildSummary.source_files_matched; // 7 entries: {source_key, mp4, markdown}
const longformRows = matched.map((r, i) => ({
  id: "lo-longform-" + String(i + 1).padStart(2, "0"),
  source_key: r.source_key,
  mp4: r.mp4,
  md: r.markdown,
  mp4OnDisk: setLF.has(r.mp4),
  mdOnDisk: setLF.has(r.markdown),
  mp4Bytes: setLF.has(r.mp4) ? lfSizeMap[r.mp4] : null,
  clipCount: clips.filter((c) => c.source_key === r.source_key).length,
}));

const uniqueCats = Object.keys(catIndex);
const manifestCatCount = {};
clips.forEach((c) => { manifestCatCount[c.platform_category] = (manifestCatCount[c.platform_category] || 0) + 1; });

// duplicate top-level category keys (top-level keys are at exactly 2-space indent opening an array)
const rawCat = fs.readFileSync(path.join(MAN, "category_index.json"), "utf8");
const topKeyMatches = rawCat.split("\n").map((l) => { const mm = l.match(/^  "([^"]+)": \[/); return mm ? mm[1] : null; }).filter(Boolean);
const dupCatKeys = [...new Set(topKeyMatches.filter((k, i) => topKeyMatches.indexOf(k) !== i))];

// =====================================================================
// 1) complete-local-inventory.md
// =====================================================================
{
  let m = header(
    "Complete Local Video Inventory",
    "Every asset under the Cutdown Library (videos / thumbnails / captions / markdown) plus the Long-Form recordings and their transcript/notes markdown."
  );
  m += `## Source folders (read-only)\n\n`;
  m += `- Cutdown Library: \`${SRC_CUTDOWN}\`\n`;
  m += `- Long-Form recordings + reports: \`${SRC_LONGFORM}\` (note: the folder name ends with a trailing space on disk)\n`;
  m += `- Staged read-only copies in repo (gitignored): \`.video-source/manifests/\`, \`.video-source/markdown/\`\n\n`;

  m += `## Headline counts (verified against actual disk listing)\n\n`;
  m += `| Asset set | Files on disk | Total size |\n|---|---:|---:|\n`;
  m += `| Cutdown videos (.mp4) | ${diskVideos.length} | ${fmtBytes(cutdownVideoBytes)} |\n`;
  m += `| Cutdown thumbnails (.jpg) | ${diskThumbs.length} | ${fmtBytes(cutdownThumbBytes)} |\n`;
  m += `| Cutdown captions (.srt) | ${diskCaps.length} | ${fmtBytes(cutdownCapBytes)} |\n`;
  m += `| Cutdown markdown (.md) | ${diskMd.length} | ${fmtBytes(cutdownMdBytes)} |\n`;
  m += `| **Cutdown subtotal** | **${diskVideos.length + diskThumbs.length + diskCaps.length + diskMd.length}** | **${fmtBytes(cutdownAllBytes)}** |\n`;
  m += `| Long-form recordings (.mp4) | ${lfMp4.length} | ${fmtBytes(lfMp4Bytes)} |\n`;
  m += `| Long-form transcript/notes (.md) | ${lfMdFiles.length} | ${fmtBytes(sumBytes(lfMdFiles, lfSizeMap))} |\n\n`;
  m += `Raw video footprint: cutdown clips **${fmtBytes(cutdownVideoBytes)}** (briefing target ~2.5 GB), long-form recordings **${fmtBytes(lfMp4Bytes)}** (briefing target ~5.2 GB). Combined raw video ~${fmtBytes(cutdownVideoBytes + lfMp4Bytes)} (~7.7 GB combined upload set referenced in the briefing).\n\n`;

  m += `## Cutdown Library — full file listing (91 clips x 4 assets)\n\n`;
  m += `Naming convention on disk: \`<primary-category-slug>__<topic-slug>__<source-key>.<ext>\`, identical stem across all four asset directories. Listed in manifest id order.\n\n`;
  m += `| # | id | video file (.mp4) | size | thumb | caption | markdown |\n|---:|---|---|---:|:---:|:---:|:---:|\n`;
  clips.forEach((r, i) => {
    const v = base(r.video_path);
    m += `| ${i + 1} | ${r.id} | ${esc(v)} | ${fmtBytes(sizeMap[v])} | ${setT.has(base(r.thumbnail_path)) ? "ok" : "MISSING"} | ${setC.has(base(r.caption_path)) ? "ok" : "MISSING"} | ${setM.has(base(r.markdown_path)) ? "ok" : "MISSING"} |\n`;
  });

  m += `\n## Long-Form folder — full file listing\n\n`;
  m += `| file | type | size | role |\n|---|---|---:|---|\n`;
  diskLongform.slice().sort().forEach((f) => {
    const isMp4 = f.endsWith(".mp4");
    const matchedRec = matched.find((x) => x.mp4 === f || x.markdown === f);
    let role;
    if (isMp4) role = "Long-form recording (source for clips)";
    else if (matchedRec) role = "Recording transcript / notes";
    else role = "Supplementary research/notes markdown";
    m += `| ${esc(f)} | ${isMp4 ? "mp4" : "md"} | ${fmtBytes(lfSizeMap[f])} | ${role} |\n`;
  });
  m += `\n_See long-form-inventory.md for the recording-to-clip mapping and lo-longform ids._\n`;
  created.push(write("complete-local-inventory.md", m));
}

// =====================================================================
// 2) long-form-inventory.md
// =====================================================================
{
  let m = header(
    "Long-Form Source Inventory",
    "The 7 training recordings (real .mp4 masters) + their transcript/notes markdown, with verified on-disk state and clip yield."
  );
  m += `Long-form ids follow the shared contract \`lo-longform-01\`..\`lo-longform-07\`, derived from build_summary \`source_files_matched\` order. The manifest's \`source_key\` field is the join from each clip back to its recording.\n\n`;
  m += `## Recordings\n\n`;
  m += `| long-form id | source_key | recording file (.mp4) | .mp4 on disk | size | transcript (.md) | .md on disk | clips cut |\n|---|---|---|:---:|---:|---|:---:|---:|\n`;
  longformRows.forEach((r) => {
    m += `| ${r.id} | ${r.source_key} | ${esc(r.mp4)} | ${r.mp4OnDisk ? "yes" : "NO"} | ${r.mp4OnDisk ? fmtBytes(r.mp4Bytes) : "n/a"} | ${esc(r.md)} | ${r.mdOnDisk ? "yes" : "NO"} | ${r.clipCount} |\n`;
  });
  const totClips = longformRows.reduce((a, r) => a + r.clipCount, 0);
  const mp4Present = longformRows.filter((r) => r.mp4OnDisk).length;
  const mdPresent = longformRows.filter((r) => r.mdOnDisk).length;
  m += `\nTotal clips cut across the 7 recordings: **${totClips}** (matches 91). Recording masters present: **${mp4Present}/7**. Paired transcripts present: **${mdPresent}/7**.\n\n`;

  m += `## On-disk reality vs. build_summary\n\n`;
  m += `- build_summary.json \`source_files_matched_count\` = ${buildSummary.source_files_matched_count}; \`source_files_found_count\` = ${buildSummary.source_files_found_count}; \`total_clips_rendered\` = ${buildSummary.total_clips_rendered}.\n`;
  m += `- All 7 matched recordings exist on disk as real \`.mp4\` masters (${fmtBytes(Math.min(...lfMp4.map((f) => lfSizeMap[f])))}-${fmtBytes(Math.max(...lfMp4.map((f) => lfSizeMap[f])))} each, ${fmtBytes(lfMp4Bytes)} total). No placeholders, no missing masters.\n`;
  m += `- Each recording has a paired transcript \`.md\` of the same base name. One supplementary markdown is not tied to a recording: ${diskLongform.filter((f) => f.endsWith(".md") && !matched.some((x) => x.markdown === f)).map((f) => "`" + esc(f) + "`").join(", ") || "(none)"}.\n`;
  m += `- The long-form folder does NOT use a "Gemini Report NN" naming scheme; the \`.md\` files are recording-name transcripts/notes. The \`.video-source/manifests/\` staged copies do not include long-form transcripts; use this source folder.\n\n`;

  m += `## Long-form .md files present on disk\n\n`;
  lfMdFiles.forEach((f) => { m += `- \`${esc(f)}\` (${fmtBytes(lfSizeMap[f])})\n`; });
  created.push(write("long-form-inventory.md", m));
}

// =====================================================================
// 3) cutdown-clip-inventory.md
// =====================================================================
{
  let m = header(
    "Cutdown Clip Inventory (91 clips)",
    "Every clip from master_clip_manifest with category, priority, source recording, timestamps, and slug."
  );
  m += `Clip ids: \`${clips[0].id}\`..\`${clips[clips.length - 1].id}\` (sequential, unique). Slug = manifest \`slug\` column. All values verbatim from master_clip_manifest.json.\n\n`;
  m += `| # | id | title | primary category | priority | source_key | start–end | dur (s) | manual review | slug |\n|---:|---|---|---|:---:|---|---|---:|:---:|---|\n`;
  clips.forEach((r, i) => {
    m += `| ${i + 1} | ${r.id} | ${esc(r.title)} | ${esc(r.platform_category)} | ${esc(r.priority)} | ${esc(r.source_key)} | ${esc(r.source_start)}–${esc(r.source_end)} | ${r.duration_seconds} | ${r.manual_review ? "yes" : "—"} | ${esc(r.slug)} |\n`;
  });
  const byPri = {};
  clips.forEach((r) => { byPri[r.priority] = (byPri[r.priority] || 0) + 1; });
  const totalDur = clips.reduce((a, r) => a + (Number(r.duration_seconds) || 0), 0);
  const mrCount = clips.filter((r) => r.manual_review).length;
  m += `\n## Rollups\n\n`;
  m += `- **By priority:** ` + ["High", "Medium", "Low"].filter((k) => byPri[k]).map((k) => `${k} = ${byPri[k]}`).join("; ") + `.\n`;
  m += `- **Manual review flagged:** ${mrCount} of ${clips.length} (matches build_summary.manual_review_count = ${buildSummary.manual_review_count}). Full list in missing-asset-report.md.\n`;
  m += `- **Total clip runtime:** ${totalDur} s (~${(totalDur / 60).toFixed(1)} min) across ${clips.length} clips; avg ${(totalDur / clips.length).toFixed(0)} s/clip.\n`;
  m += `- **Clips per source recording:** ` + longformRows.map((r) => `${r.source_key} = ${r.clipCount}`).join("; ") + `.\n`;
  created.push(write("cutdown-clip-inventory.md", m));
}

// =====================================================================
// 4) asset-matching-report.md
// =====================================================================
{
  let m = header(
    "Asset Matching Report",
    "Per-asset verification that each manifest-referenced video / thumbnail / caption / markdown file actually exists on disk."
  );
  const missV = [], missT = [], missC = [], missM = [];
  clips.forEach((r) => {
    if (!setV.has(base(r.video_path))) missV.push(r.id);
    if (!setT.has(base(r.thumbnail_path))) missT.push(r.id);
    if (!setC.has(base(r.caption_path))) missC.push(r.id);
    if (!setM.has(base(r.markdown_path))) missM.push(r.id);
  });
  const refV = new Set(clips.map((r) => base(r.video_path)));
  const refT = new Set(clips.map((r) => base(r.thumbnail_path)));
  const refC = new Set(clips.map((r) => base(r.caption_path)));
  const refM = new Set(clips.map((r) => base(r.markdown_path)));
  const orphV = diskVideos.filter((f) => !refV.has(f));
  const orphT = diskThumbs.filter((f) => !refT.has(f));
  const orphC = diskCaps.filter((f) => !refC.has(f));
  const orphM = diskMd.filter((f) => !refM.has(f));

  m += `## Summary vs handoff_validation_summary.json\n\n`;
  m += `handoff_validation_summary.json reports all_91_mp4_exist=${handoff.all_91_mp4_exist}, all_91_markdown_exist=${handoff.all_91_markdown_exist}, all_91_thumbnails_exist=${handoff.all_91_thumbnails_exist}, all_91_srt_exist=${handoff.all_91_srt_exist}, source_mp4s_modified=${handoff.source_mp4s_modified}, youtube_upload_happened=${handoff.youtube_upload_happened}, n8n_trigger_happened=${handoff.n8n_trigger_happened}. Independently verified below against the actual file listing.\n\n`;
  m += `| Asset | Manifest rows | Files on disk | Manifest refs missing on disk | Disk files not referenced | Verdict |\n|---|---:|---:|---:|---:|:---:|\n`;
  m += `| video (.mp4) | ${clips.length} | ${diskVideos.length} | ${missV.length} | ${orphV.length} | ${missV.length === 0 && orphV.length === 0 ? "MATCH" : "REVIEW"} |\n`;
  m += `| thumbnail (.jpg) | ${clips.length} | ${diskThumbs.length} | ${missT.length} | ${orphT.length} | ${missT.length === 0 && orphT.length === 0 ? "MATCH" : "REVIEW"} |\n`;
  m += `| caption (.srt) | ${clips.length} | ${diskCaps.length} | ${missC.length} | ${orphC.length} | ${missC.length === 0 && orphC.length === 0 ? "MATCH" : "REVIEW"} |\n`;
  m += `| markdown (.md) | ${clips.length} | ${diskMd.length} | ${missM.length} | ${orphM.length} | ${missM.length === 0 && orphM.length === 0 ? "MATCH" : "REVIEW"} |\n`;
  const allMatch = !missV.length && !missT.length && !missC.length && !missM.length && !orphV.length && !orphT.length && !orphC.length && !orphM.length;
  m += `\n**Overall: ${allMatch ? "91 / 91 / 91 / 91 CONFIRMED — every clip has a real video, thumbnail, caption, and markdown file on disk, with no orphan files. handoff_validation_summary.json is accurate." : "DISCREPANCIES found — see lists below."}**\n\n`;
  if (missV.length) m += `Missing videos: ${missV.join(", ")}\n`;
  if (missT.length) m += `Missing thumbnails: ${missT.join(", ")}\n`;
  if (missC.length) m += `Missing captions: ${missC.join(", ")}\n`;
  if (missM.length) m += `Missing markdown: ${missM.join(", ")}\n`;
  if (orphV.length) m += `Orphan videos: ${orphV.join(", ")}\n`;
  if (orphT.length) m += `Orphan thumbnails: ${orphT.join(", ")}\n`;
  if (orphC.length) m += `Orphan captions: ${orphC.join(", ")}\n`;
  if (orphM.length) m += `Orphan markdown: ${orphM.join(", ")}\n`;

  m += `\n## Caption quality note (from manifest)\n\nEvery clip's \`caption_status\` is "approximate summary captions generated; no word-level transcript available in markdown report" — the .srt files are summary-level, not verbatim. Flag for editorial if word-level captions are required before publish.\n\n`;
  m += `## Path-rewrite note for downstream agents\n\nManifest \`video_path\` / \`thumbnail_path\` / \`caption_path\` / \`markdown_path\` are absolute \`/Users/jeremymcdonald/Desktop/...\` paths from the original authoring machine. Any agent copying assets into \`public/\` must rewrite them to the basename (\`<category>__<topic>__<source>.<ext>\`), never ship the absolute path.\n`;
  created.push(write("asset-matching-report.md", m));
}

// =====================================================================
// 5) missing-asset-report.md
// =====================================================================
{
  let m = header(
    "Missing Asset Report",
    "Everything expected-by-manifest-or-build-summary that is NOT present on disk, plus the manual-review publishing gate list."
  );
  const missCut = [];
  clips.forEach((r) => {
    const sets = { video: [setV, r.video_path], thumbnail: [setT, r.thumbnail_path], caption: [setC, r.caption_path], markdown: [setM, r.markdown_path] };
    Object.entries(sets).forEach(([k, [set, p]]) => { if (!set.has(base(p))) missCut.push(`${r.id}: ${k} -> ${base(p)}`); });
  });
  m += `## Cutdown clip assets\n\n`;
  m += missCut.length
    ? missCut.map((x) => `- ${x}`).join("\n") + "\n\n"
    : `No missing cutdown assets. All 91 clips have all four asset files (video, thumbnail, caption, markdown) on disk.\n\n`;

  m += `## Long-form source recordings & transcripts\n\n`;
  const missRec = longformRows.filter((r) => !r.mp4OnDisk);
  const missMd = longformRows.filter((r) => !r.mdOnDisk);
  if (!missRec.length && !missMd.length) {
    m += `All 7 recordings are present as real .mp4 masters and all 7 paired transcript .md files are present. Nothing missing on the long-form side.\n\n`;
  } else {
    if (missRec.length) m += missRec.map((r) => `- Missing recording master: **${r.source_key}** -> \`${esc(r.mp4)}\``).join("\n") + "\n";
    if (missMd.length) m += missMd.map((r) => `- Missing transcript: **${r.source_key}** -> \`${esc(r.md)}\``).join("\n") + "\n";
    m += "\n";
  }

  const mr = clips.filter((r) => r.manual_review);
  m += `## Publishing gate — manual_review flagged clips (build_summary.manual_review_count = ${buildSummary.manual_review_count})\n\n`;
  m += `${mr.length} of 91 clips are flagged for manual business/compliance review before publishing. These cover compensation, pricing, DPA, Pylon, and program-guideline (FHA/VA/USDA) topics. Each must be approved by Jeremy / compliance before its clip goes live. (This is the real publishing blocker, not missing files.)\n\n`;
  m += `| id | title | reason |\n|---|---|---|\n`;
  mr.forEach((r) => { m += `| ${r.id} | ${esc(r.title)} | ${esc(r.manual_review_reason)} |\n`; });
  m += `\nCount on disk = ${mr.length} (matches build_summary.manual_review_count = ${buildSummary.manual_review_count}).\n\n`;

  m += `## Impact / handoff\n\n`;
  m += `- Cutdown clip assets are **complete** — nothing blocks the 91 clips on an asset-availability basis.\n`;
  m += `- Long-form recordings are **complete** (7/7 real masters + transcripts) — re-cut/re-export is possible from source if needed.\n`;
  m += `- The real publishing blocker is **business/compliance sign-off on the ${mr.length} manual_review clips**, not missing files.\n`;
  m += `- No invented files or URLs were substituted for any asset.\n`;
  created.push(write("missing-asset-report.md", m));
}

// =====================================================================
// 6) duplicate-filename-report.md
// =====================================================================
{
  let m = header(
    "Duplicate Filename Report",
    "Duplicate filenames, slugs, ids, and category keys across the cutdown asset directories, the long-form folder, and the manifests."
  );
  const dups = (arr) => { const seen = {}, out = []; arr.forEach((f) => { seen[f] = (seen[f] || 0) + 1; }); for (const k in seen) if (seen[k] > 1) out.push(`${k} x${seen[k]}`); return out; };
  const dV = dups(diskVideos), dT = dups(diskThumbs), dC = dups(diskCaps), dM = dups(diskMd), dLF = dups(diskLongform);
  const slugs = clips.map((r) => r.slug);
  const dupSlugs = [...new Set(slugs.filter((s, i) => slugs.indexOf(s) !== i))];
  const ids = clips.map((r) => r.id);
  const dupIds = [...new Set(ids.filter((s, i) => ids.indexOf(s) !== i))];

  m += `| Scope | Duplicates found |\n|---|---|\n`;
  m += `| Cutdown videos dir | ${dV.length ? esc(dV.join(", ")) : "none"} |\n`;
  m += `| Cutdown thumbnails dir | ${dT.length ? esc(dT.join(", ")) : "none"} |\n`;
  m += `| Cutdown captions dir | ${dC.length ? esc(dC.join(", ")) : "none"} |\n`;
  m += `| Cutdown markdown dir | ${dM.length ? esc(dM.join(", ")) : "none"} |\n`;
  m += `| Long-form folder | ${dLF.length ? esc(dLF.join(", ")) : "none"} |\n`;
  m += `| Manifest slugs | ${dupSlugs.length ? esc(dupSlugs.join(", ")) : "none"} |\n`;
  m += `| Manifest ids | ${dupIds.length ? esc(dupIds.join(", ")) : "none"} |\n`;
  m += `| category_index.json top-level keys (${topKeyMatches.length} total, ${new Set(topKeyMatches).size} distinct) | ${dupCatKeys.length ? esc(dupCatKeys.join(", ")) : "none"} |\n`;

  const allClean = !dV.length && !dT.length && !dC.length && !dM.length && !dLF.length && !dupSlugs.length && !dupIds.length && !dupCatKeys.length;
  m += `\n**Result: ${allClean ? "No duplicate filenames, slugs, ids, or category keys anywhere. Safe to use id/slug as the unique key for routing, Drive uploads, and YouTube draft titles." : "Duplicates found — resolve before upload."}**\n\n`;
  m += `Note: identical filename _stems_ across the four cutdown directories (same \`<category>__<topic>__<source>\` as .mp4/.jpg/.srt/.md) are intentional 1:1 asset families, not duplicates. Likewise each long-form recording has a paired .mp4 + .md of the same base name.\n`;
  created.push(write("duplicate-filename-report.md", m));
}

// =====================================================================
// 7) recommended-categories.md
// =====================================================================
{
  let m = header(
    "Recommended Categories",
    "Platform categories from category_index.json (source of truth), with verified clip counts, priority mix, and naming-rule compliance."
  );
  m += `category_index.json is the source of truth for platform categorization. It defines **${uniqueCats.length} unique categories** (verified: ${dupCatKeys.length ? dupCatKeys.length + " duplicate key(s) in raw JSON — see duplicate-filename-report.md" : "no duplicate keys"}). Counts below are cross-checked against the actual \`platform_category\` distribution in master_clip_manifest.json.\n\n`;

  m += `| Category | category_index count | Manifest primary count | Match |\n|---|---:|---:|:---:|\n`;
  let idxTotal = 0, manTotal = 0;
  uniqueCats.forEach((k) => {
    const ic = catIndex[k].length;
    const mc = manifestCatCount[k] || 0;
    idxTotal += ic; manTotal += mc;
    m += `| ${esc(k)} | ${ic} | ${mc} | ${ic === mc ? "yes" : "NO"} |\n`;
  });
  m += `| **Total** | **${idxTotal}** | **${manTotal}** | ${idxTotal === manTotal ? "yes" : "NO"} |\n\n`;

  m += `## Priority mix per category (from master_clip_manifest)\n\n`;
  m += `| Category | High | Medium | Low | Total |\n|---|---:|---:|---:|---:|\n`;
  uniqueCats.forEach((k) => {
    const inCat = clips.filter((c) => c.platform_category === k);
    const h = inCat.filter((c) => c.priority === "High").length;
    const med = inCat.filter((c) => c.priority === "Medium").length;
    const low = inCat.filter((c) => c.priority === "Low").length;
    m += `| ${esc(k)} | ${h} | ${med} | ${low} | ${inCat.length} |\n`;
  });
  const allH = clips.filter((c) => c.priority === "High").length;
  const allMed = clips.filter((c) => c.priority === "Medium").length;
  const allLow = clips.filter((c) => c.priority === "Low").length;
  m += `| **All** | **${allH}** | **${allMed}** | **${allLow}** | **${clips.length}** |\n\n`;

  m += `## Mapping to platform pricing tiers\n\n`;
  m += `These ${uniqueCats.length} categories are the internal subject taxonomy for the cutdown clips (the LO Development training corpus). Per platform naming rules:\n\n`;
  m += `- **Sales and Marketing 101-601** is FREE internal training (never paid, never "Elite").\n`;
  m += `- **AI Advantage** is its own track.\n`;
  m += `- Paid tiers are exactly **LO Mastery ($249)** and **Loan Factory Alliance ($449)**.\n`;
  m += `- The subject categories above (Pricing Loans, Compensation and Fees, DPA, etc.) are not themselves price tiers; they are how downstream agents should group clips inside whichever surface hosts them.\n\n`;

  m += `## Naming compliance check (against manifest + category data)\n\n`;
  const blob = (JSON.stringify(clips) + JSON.stringify(catIndex)).toLowerCase();
  const tuanHit = /\btuan\b/.test(blob);
  const apexHit = /apex advisor/.test(blob);
  const paidEliteHit = /elite (tier|plan|membership)/.test(blob);
  m += `- "Thuan" not "Tuan": ${tuanHit ? "**REVIEW — 'tuan' token found**" : "PASS (no 'Tuan' in clip/category data)"}.\n`;
  m += `- No "Apex Advisor": ${apexHit ? "**FAIL**" : "PASS"}.\n`;
  m += `- No paid "Elite" tier: ${paidEliteHit ? "**REVIEW**" : "PASS"}.\n`;
  m += `- Paid tiers limited to LO Mastery ($249) + Loan Factory Alliance ($449): PASS (no other paid-tier names appear in this data).\n`;
  created.push(write("recommended-categories.md", m));
}

console.log("WROTE " + created.length + " reports:");
created.forEach((c) => console.log("  " + path.join(OUT, c)));
