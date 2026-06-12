#!/usr/bin/env node
/**
 * Scan podcast/inbox for audio files and report pipeline status for each.
 *
 * Usage:
 *   node scripts/podcast/scan-podcast-folder.mjs           # human-readable table
 *   node scripts/podcast/scan-podcast-folder.mjs --json    # machine-readable
 */
import { existsSync } from "node:fs";
import {
  PATHS, listInboxAudio, listManifests, loadJSON, ffprobeDuration,
  hasCommand, slugify, relPath, basenameNoExt,
} from "./lib.mjs";

const asJson = process.argv.includes("--json");
const haveFfprobe = Boolean(hasCommand("ffprobe"));

const files = listInboxAudio();
const manifests = new Map(listManifests().map((m) => [m.slug, m.path]));

const rows = files.map((file) => {
  const slug = slugify(basenameNoExt(file));
  const manifestFile = manifests.get(slug);
  const manifest = manifestFile ? loadJSON(manifestFile) : null;
  return {
    file: relPath(file),
    slug,
    durationSeconds: haveFfprobe ? ffprobeDuration(file) : null,
    manifest: manifestFile ? relPath(manifestFile) : null,
    status: manifest?.status ?? "no-manifest",
    transcript: manifest?.transcriptPath ?? null,
    videoPlan: manifest?.videoPlanPath ?? null,
    videoOutput: manifest?.videoOutputPath ?? null,
  };
});

if (asJson) {
  console.log(JSON.stringify({ scannedAt: new Date().toISOString(), inbox: relPath(PATHS.inbox), episodes: rows }, null, 2));
  process.exit(0);
}

console.log(`\nPodcast inbox: ${relPath(PATHS.inbox)}`);
if (!haveFfprobe) console.log("  (ffprobe not found — durations skipped; install ffmpeg)");
if (rows.length === 0) {
  console.log("\n  No audio files found.");
  console.log("  Drop MP3 (or M4A/WAV) podcast episodes into podcast/inbox/ and re-run.");
  console.log("  Example: cp ~/Downloads/my_episode.mp3 podcast/inbox/\n");
  process.exit(0);
}

for (const r of rows) {
  const mins = r.durationSeconds ? `${Math.floor(r.durationSeconds / 60)}m${String(Math.round(r.durationSeconds % 60)).padStart(2, "0")}s` : "?";
  console.log(`\n  ${r.file}  (${mins})`);
  console.log(`    slug:      ${r.slug}`);
  console.log(`    status:    ${r.status}`);
  console.log(`    manifest:  ${r.manifest ?? "— run: node scripts/podcast/create-podcast-manifest.mjs " + r.file}`);
  if (r.transcript) console.log(`    transcript: ${r.transcript}`);
  if (r.videoPlan) console.log(`    video plan: ${r.videoPlan}`);
  if (r.videoOutput) console.log(`    video out:  ${r.videoOutput}`);
}

const next = rows.find((r) => r.status === "no-manifest");
if (next) {
  console.log(`\nNext step:\n  node scripts/podcast/create-podcast-manifest.mjs ${next.file}\n`);
} else {
  console.log("\nAll inbox files have manifests. Next: transcribe-podcast.mjs <slug>\n");
}

// Also warn about orphaned manifests whose audio left the inbox.
for (const [slug, path] of manifests) {
  const m = loadJSON(path);
  if (m.filePath && !existsSync(m.filePath) && !rows.some((r) => r.slug === slug)) {
    console.log(`  ! manifest ${slug} points at missing audio: ${m.filePath}`);
  }
}
