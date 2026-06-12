#!/usr/bin/env node
/**
 * Transcribe a podcast episode and label speaker turns.
 *
 * Usage:
 *   node scripts/podcast/transcribe-podcast.mjs <slug|manifest.json> [options]
 *
 * Options:
 *   --model base        Whisper model: tiny|base|small|medium|large-v3 (default: base)
 *   --gap 0.6           Silence gap (seconds) that triggers a speaker change in the
 *                       alternation heuristic (default: 0.6)
 *   --placeholder       Skip transcription and write an alternating Speaker A/B
 *                       placeholder transcript (use when Whisper is unavailable)
 *
 * Transcription engine: local faster-whisper (pip install faster-whisper).
 * Speaker detection: true diarization is NOT bundled. The default is the documented
 * fallback — speakers alternate on pause gaps. Replace with pyannote.audio later
 * (see podcast/docs/README.md → "Upgrading speaker detection").
 */
import { spawnSync } from "node:child_process";
import { existsSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import {
  PATHS, REPO_ROOT, loadManifest, updateManifest, fail, relPath,
  SPEAKER_LABELS, hasCommand, ffprobeDuration,
} from "./lib.mjs";

const args = process.argv.slice(2);
const target = args.find((a) => !a.startsWith("--"));
function opt(name, fallback) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}
if (!target) {
  fail("No episode given", [
    "Usage: node scripts/podcast/transcribe-podcast.mjs <slug>",
    "List slugs: node scripts/podcast/scan-podcast-folder.mjs",
  ]);
}

const { manifest, path: mPath } = loadManifest(target);
const audioPath = join(REPO_ROOT, manifest.filePath);
if (!existsSync(audioPath)) fail(`Audio file missing: ${manifest.filePath}`);

const model = opt("model", "base");
const gapThreshold = Number(opt("gap", "0.6"));
const speakerCount = Math.min(Math.max(manifest.speakerCount || 2, 1), 4);
const usePlaceholder = args.includes("--placeholder");

// ── 1. raw segments: whisper or placeholder ─────────────────────

const PY_TRANSCRIBE = `
import json, sys
from faster_whisper import WhisperModel
model = WhisperModel(sys.argv[2], device="cpu", compute_type="int8")
segments, info = model.transcribe(sys.argv[1], vad_filter=True)
out = {"language": info.language, "segments": []}
for s in segments:
    out["segments"].append({"start": round(s.start, 2), "end": round(s.end, 2), "text": s.text.strip()})
print(json.dumps(out))
`;

function whisperAvailable() {
  if (!hasCommand("python3")) return { ok: false, why: "python3 not found" };
  const probe = spawnSync("python3", ["-c", "import faster_whisper"], { encoding: "utf8" });
  if (probe.status !== 0) return { ok: false, why: "faster-whisper not installed (pip install faster-whisper)" };
  return { ok: true };
}

function runWhisper() {
  console.log(`Transcribing with faster-whisper (${model}) — this can take a few minutes…`);
  const res = spawnSync("python3", ["-c", PY_TRANSCRIBE, audioPath, model], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  if (res.status !== 0) {
    const err = (res.stderr || "").trim();
    const offline = /allowlist|Forbidden|connection|LocalEntryNotFound/i.test(err);
    fail("Whisper transcription failed", [
      offline
        ? "The Whisper model could not be downloaded — this machine cannot reach huggingface.co."
        : `Python error:\n${err.split("\n").slice(-6).join("\n")}`,
      "",
      "Fix options:",
      "  1. On a machine with internet: pip install faster-whisper, then re-run (models cache in ~/.cache/huggingface).",
      "  2. Pre-download the model on another machine and copy ~/.cache/huggingface/hub/models--Systran--faster-whisper-* over.",
      "  3. Re-run with --placeholder to continue the pipeline with an alternating-speaker placeholder transcript.",
    ]);
  }
  return JSON.parse(res.stdout);
}

function placeholderSegments() {
  const duration = manifest.durationSeconds ?? ffprobeDuration(audioPath) ?? 600;
  const block = 30; // seconds per placeholder speaker block
  const segments = [];
  let i = 0;
  for (let t = 0; t < duration; t += block, i += 1) {
    segments.push({
      start: Math.round(t * 10) / 10,
      end: Math.round(Math.min(t + block, duration) * 10) / 10,
      text: "[placeholder — replace with real transcript text for this block]",
      // documented fallback: speakers alternate section by section
      speaker: SPEAKER_LABELS[i % speakerCount],
    });
  }
  return { language: manifest.language ?? "en", segments };
}

let raw;
let method;
if (usePlaceholder) {
  raw = placeholderSegments();
  method = "placeholder_alternating";
  console.log("Writing placeholder transcript (no transcription engine used).");
} else {
  const avail = whisperAvailable();
  if (!avail.ok) {
    fail(`Cannot transcribe: ${avail.why}`, [
      "Install locally:  pip install faster-whisper",
      "Or run with --placeholder to keep the pipeline moving without a real transcript.",
    ]);
  }
  raw = runWhisper();
  method = `faster-whisper:${model}`;
}

// ── 2. speaker labeling (alternation heuristic) ────────────────

const labels = SPEAKER_LABELS.slice(0, speakerCount);
let current = 0;
let prevEnd = null;
const labeled = raw.segments.map((seg) => {
  if (seg.speaker) return seg; // placeholder mode pre-assigns speakers
  if (prevEnd !== null && seg.start - prevEnd >= gapThreshold) {
    current = (current + 1) % labels.length;
  }
  prevEnd = seg.end;
  return { ...seg, speaker: labels[current] };
});

// Merge consecutive same-speaker segments into turns for readability.
const turns = [];
for (const seg of labeled) {
  const last = turns[turns.length - 1];
  if (last && last.speaker === seg.speaker && seg.start - last.end < 2.0) {
    last.end = seg.end;
    last.text = `${last.text} ${seg.text}`.trim();
  } else {
    turns.push({ ...seg });
  }
}

// ── 3. write transcript files ───────────────────────────────────

mkdirSync(PATHS.transcripts, { recursive: true });
const base = join(PATHS.transcripts, manifest.id);

const transcript = {
  episodeId: manifest.id,
  title: manifest.title,
  language: raw.language ?? manifest.language,
  method,
  speakerDetection: method === "placeholder_alternating"
    ? "placeholder"
    : `alternation-heuristic (gap >= ${gapThreshold}s); upgrade path: pyannote.audio diarization`,
  speakerCount,
  speakers: labels,
  createdAt: new Date().toISOString(),
  segments: labeled,
  turns,
};
writeFileSync(`${base}.json`, JSON.stringify(transcript, null, 2) + "\n");

const fmtTime = (s) => {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = Math.floor(s % 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};
const md = [
  `# ${manifest.title} — Transcript`,
  "",
  `- Engine: ${method}`,
  `- Speaker detection: ${transcript.speakerDetection}`,
  `- Speakers: ${labels.join(", ")}`,
  "",
  ...turns.map((t) => `**[${fmtTime(t.start)}] ${t.speaker}:** ${t.text}\n`),
].join("\n");
writeFileSync(`${base}.md`, md + "\n");

const srtTime = (s) => {
  const ms = Math.round((s % 1) * 1000);
  return `${fmtTime(s)},${String(ms).padStart(3, "0")}`;
};
const srt = labeled
  .map((seg, i) => `${i + 1}\n${srtTime(seg.start)} --> ${srtTime(seg.end)}\n${seg.speaker}: ${seg.text}\n`)
  .join("\n");
writeFileSync(`${base}.srt`, srt + "\n");

updateManifest(mPath, {
  status: method === "placeholder_alternating" ? "transcribed_placeholder" : "transcribed",
  transcriptPath: relPath(`${base}.json`),
  durationSeconds: manifest.durationSeconds ?? ffprobeDuration(audioPath),
});

console.log(`✓ transcript: ${relPath(base)}.json (+ .md, .srt)`);
console.log(`  ${labeled.length} segments → ${turns.length} speaker turns (${labels.join(" / ")})`);
console.log(`  next: node scripts/podcast/create-video-plan.mjs ${manifest.id}`);
