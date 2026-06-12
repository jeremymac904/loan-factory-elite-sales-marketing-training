#!/usr/bin/env node
/**
 * Scan public/podcast-transcripts for WhisperKit output and write
 * src/data/podcastTranscripts.generated.json — the list of episode file
 * basenames that have a transcript. The Podcast tab reads this to decide
 * "Transcript ready" vs "Transcript pending".
 *
 * Usage: node scripts/sync-podcast-transcripts.mjs
 */
import { readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "public/podcast-transcripts");

let ready = [];
try {
  ready = readdirSync(dir)
    .filter((f) => f.endsWith(".srt"))
    .map((f) => f.replace(/\.srt$/, ""))
    .sort();
} catch {
  // No transcripts yet.
}

const out = join(root, "src/data/podcastTranscripts.generated.json");
writeFileSync(out, JSON.stringify({ generatedAt: new Date().toISOString(), ready }, null, 2) + "\n");
console.log(`${ready.length} transcripts -> ${out}`);
