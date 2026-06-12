/**
 * Shared helpers for the podcast → video pipeline.
 * All scripts in scripts/podcast/ import from here.
 */
import { execFileSync, spawnSync } from "node:child_process";
import {
  existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync,
} from "node:fs";
import { dirname, join, basename, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

export const PATHS = {
  inbox: join(REPO_ROOT, "podcast", "inbox"),
  processed: join(REPO_ROOT, "podcast", "processed"),
  transcripts: join(REPO_ROOT, "podcast", "transcripts"),
  manifests: join(REPO_ROOT, "podcast", "manifests"),
  videoOutputs: join(REPO_ROOT, "podcast", "video_outputs"),
  avatarSources: join(REPO_ROOT, "podcast", "avatar_sources"),
  workflows: join(REPO_ROOT, "podcast", "workflows"),
  docs: join(REPO_ROOT, "podcast", "docs"),
  avatarsConfig: join(REPO_ROOT, "podcast", "avatar_sources", "avatars.json"),
  brandBackground: join(REPO_ROOT, "site_background_vids_and_images", "dark-hero-background.png"),
  brandLogo: join(REPO_ROOT, "public", "images", "brand", "loan-factory-logo-transparent.png"),
};

export const BRAND = {
  orange: "#F97316",
  dark: "#0B1220",
  white: "#FFFFFF",
  productName: "LO Development",
  companyName: "Loan Factory",
};

export const AUDIO_EXTENSIONS = [".mp3", ".m4a", ".wav"];

// ── tiny utils ──────────────────────────────────────────────────

export function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 80);
}

export function loadJSON(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

export function saveJSON(path, data) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
}

export function fail(title, lines = []) {
  console.error(`\n✖ ${title}`);
  for (const line of lines) console.error(`  ${line}`);
  console.error("");
  process.exit(1);
}

export function relPath(abs) {
  return abs.startsWith(REPO_ROOT) ? abs.slice(REPO_ROOT.length + 1) : abs;
}

// ── env ─────────────────────────────────────────────────────────

/** Reads process.env plus .env / .env.local at the repo root (gitignored). */
export function loadEnv() {
  const env = { ...process.env };
  for (const file of [".env", ".env.local"]) {
    const p = join(REPO_ROOT, file);
    if (!existsSync(p)) continue;
    for (const line of readFileSync(p, "utf8").split("\n")) {
      const m = /^\s*(?:export\s+)?([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
      if (m && env[m[1]] === undefined) {
        env[m[1]] = m[2].replace(/^["']|["']$/g, "");
      }
    }
  }
  return env;
}

// ── external tools ──────────────────────────────────────────────

export function hasCommand(cmd) {
  const res = spawnSync("which", [cmd], { encoding: "utf8" });
  return res.status === 0 ? res.stdout.trim() : null;
}

export function requireFfmpeg() {
  if (!hasCommand("ffmpeg") || !hasCommand("ffprobe")) {
    fail("ffmpeg / ffprobe not found", [
      "Install it first:",
      "  macOS:  brew install ffmpeg",
      "  Ubuntu: sudo apt-get update && sudo apt-get install -y ffmpeg",
    ]);
  }
}

export function ffprobeDuration(file) {
  try {
    const out = execFileSync(
      "ffprobe",
      ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file],
      { encoding: "utf8" },
    );
    return Math.round(parseFloat(out.trim()) * 10) / 10;
  } catch {
    return null;
  }
}

export function runFfmpeg(args, { quiet = true } = {}) {
  const fullArgs = ["-y", ...(quiet ? ["-v", "error"] : []), ...args];
  const res = spawnSync("ffmpeg", fullArgs, { stdio: ["ignore", "inherit", "inherit"] });
  if (res.status !== 0) {
    throw new Error(`ffmpeg failed (exit ${res.status}): ffmpeg ${fullArgs.join(" ")}`);
  }
}

export function findFont(bold = true) {
  const candidates = bold
    ? [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
      ]
    : [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
      ];
  return candidates.find((f) => existsSync(f)) ?? null;
}

/** Escape a string for use inside an ffmpeg drawtext text= value. */
export function drawtextEscape(text) {
  return text.replace(/\\/g, "\\\\").replace(/'/g, "’").replace(/:/g, "\\:").replace(/%/g, "\\%");
}

// ── manifests ───────────────────────────────────────────────────

export function manifestPath(slug) {
  return join(PATHS.manifests, `${slug}.json`);
}

export function loadManifest(slugOrPath) {
  const p = slugOrPath.endsWith(".json") ? resolve(slugOrPath) : manifestPath(slugOrPath);
  if (!existsSync(p)) {
    fail(`Manifest not found: ${relPath(p)}`, [
      "Create it first:",
      `  node scripts/podcast/create-podcast-manifest.mjs podcast/inbox/<file>.mp3`,
      "List existing manifests:",
      `  ls podcast/manifests/`,
    ]);
  }
  return { manifest: loadJSON(p), path: p };
}

export function updateManifest(path, patch) {
  const manifest = loadJSON(path);
  const updated = { ...manifest, ...patch, updatedAt: new Date().toISOString() };
  saveJSON(path, updated);
  return updated;
}

export function listManifests() {
  if (!existsSync(PATHS.manifests)) return [];
  return readdirSync(PATHS.manifests)
    .filter((f) => f.endsWith(".json") && !f.endsWith(".videoplan.json"))
    .map((f) => ({ slug: f.replace(/\.json$/, ""), path: join(PATHS.manifests, f) }));
}

export function listInboxAudio() {
  if (!existsSync(PATHS.inbox)) return [];
  return readdirSync(PATHS.inbox)
    .filter((f) => AUDIO_EXTENSIONS.includes(extname(f).toLowerCase()))
    .sort()
    .map((f) => join(PATHS.inbox, f));
}

// ── avatars ─────────────────────────────────────────────────────

export function loadAvatars() {
  if (!existsSync(PATHS.avatarsConfig)) {
    fail(`Avatar config missing: ${relPath(PATHS.avatarsConfig)}`);
  }
  const config = loadJSON(PATHS.avatarsConfig);
  const byId = Object.fromEntries(config.avatars.map((a) => [a.id, a]));
  return { config, byId };
}

/** Pick avatar ids for N speakers, honoring manifest overrides. */
export function assignAvatars(speakerCount, manifestAssigned, avatarsConfig) {
  if (Array.isArray(manifestAssigned) && manifestAssigned.length >= speakerCount) {
    return manifestAssigned.slice(0, speakerCount);
  }
  const d = avatarsConfig.defaults;
  if (speakerCount <= 1) return [d.singleCoach];
  if (speakerCount === 2) return [...d.podcastPair];
  if (speakerCount === 3) return [...d.roundtableThree];
  return d.roundtableFour.slice(0, Math.min(speakerCount, 4));
}

export const SPEAKER_LABELS = ["Speaker A", "Speaker B", "Speaker C", "Speaker D"];

/**
 * Hard guard before any avatar rendering (HeyGen or local lip-sync).
 * Blocks when the transcript is a placeholder, empty, or its speaker labels
 * come only from the pause-gap alternation heuristic — those turn boundaries
 * and speaker assignments are not trustworthy enough to spend render time or
 * HeyGen credits on. Trusted sources: Open Notebook speaker scripts and real
 * diarization (pyannote). Single-speaker episodes are exempt (nothing to
 * alternate). `allowHeuristic` (--allow-heuristic-speakers) overrides the
 * heuristic case only — never placeholder/empty.
 */
export function assertTranscriptReadyForAvatars(manifest, transcript, { allowHeuristic = false } = {}) {
  const block = (reason, extra = []) =>
    fail(`Avatar rendering blocked: ${reason}`, [
      ...extra,
      "",
      "Get a trustworthy transcript first:",
      `  real Whisper run:      node scripts/podcast/transcribe-podcast.mjs ${manifest.id}`,
      "  better speaker labels: use the Open Notebook speaker script",
      "                         (podcast/docs/OPEN_NOTEBOOK_WORKFLOW.md → method \"open-notebook-script\")",
      "                         or pyannote diarization (podcast/docs/README.md)",
      "Avatar-free alternative that always works:",
      `  node scripts/podcast/render-waveform-fallback.mjs ${manifest.id}`,
    ]);

  if (!transcript) block("no transcript found for this episode");

  const method = transcript.method ?? "";
  if (method.startsWith("placeholder")) {
    block("the transcript is a PLACEHOLDER (no real transcription was run)", [
      "Placeholder turn boundaries are invented 30-second blocks — avatar clips",
      "would cut speech mid-sentence and assign the wrong coach to the audio.",
    ]);
  }

  const turns = transcript.turns ?? [];
  const hasRealText = turns.some((t) => t.text && !/^\[placeholder/i.test(t.text.trim()));
  if (turns.length === 0 || !hasRealText) {
    block("the transcript is empty (no usable speaker turns)");
  }

  const speakerCount = transcript.speakerCount ?? manifest.speakerCount ?? 2;
  const heuristicOnly = /alternation-heuristic/i.test(transcript.speakerDetection ?? "");
  if (speakerCount > 1 && heuristicOnly && !allowHeuristic) {
    block("speaker labels come only from the pause-gap ALTERNATION HEURISTIC", [
      "With 2+ speakers the heuristic can swap who is \"talking\" mid-episode,",
      "which looks broken in split-screen and wastes HeyGen credits.",
      "",
      "If you have reviewed the transcript and the speaker labels look right,",
      "override with:  --allow-heuristic-speakers",
    ]);
  }
}

export function layoutForSpeakerCount(n) {
  if (n <= 1) return "single";
  if (n === 2) return "split_2";
  if (n === 3) return "roundtable_3";
  return "grid_4";
}

export function basenameNoExt(p) {
  return basename(p, extname(p));
}
