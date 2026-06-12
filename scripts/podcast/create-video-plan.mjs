#!/usr/bin/env node
/**
 * Build the video plan JSON for an episode: speaker turns → avatar assignments,
 * layout choice, per-turn audio extraction spec, and render-strategy payloads
 * for the local, HeyGen, and waveform paths.
 *
 * Usage:
 *   node scripts/podcast/create-video-plan.mjs <slug> [options]
 *
 * Options:
 *   --layout single|split_2|roundtable_3|grid_4|waveform   override auto layout
 *   --avatars jeremy,edward                                 override avatar assignment
 *   --min-turn 1.5                                          merge turns shorter than N seconds
 *                                                           into the previous turn (default 1.5)
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  REPO_ROOT, PATHS, loadManifest, updateManifest, loadJSON, saveJSON, fail,
  relPath, loadAvatars, assignAvatars, layoutForSpeakerCount, SPEAKER_LABELS,
} from "./lib.mjs";

const args = process.argv.slice(2);
const target = args.find((a) => !a.startsWith("--"));
function opt(name, fallback) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}
if (!target) fail("Usage: node scripts/podcast/create-video-plan.mjs <slug>");

const { manifest, path: mPath } = loadManifest(target);
if (!manifest.transcriptPath) {
  fail(`Episode "${manifest.id}" has no transcript yet`, [
    `Run: node scripts/podcast/transcribe-podcast.mjs ${manifest.id}`,
  ]);
}
const transcriptAbs = join(REPO_ROOT, manifest.transcriptPath);
if (!existsSync(transcriptAbs)) fail(`Transcript file missing: ${manifest.transcriptPath}`);
const transcript = loadJSON(transcriptAbs);

const { config: avatarsConfig, byId: avatarsById } = loadAvatars();

// ── avatar assignment ───────────────────────────────────────────

const overrideAvatars = opt("avatars")?.split(",").map((s) => s.trim());
const speakerCount = transcript.speakerCount ?? manifest.speakerCount ?? 2;
const avatarIds = assignAvatars(
  speakerCount,
  overrideAvatars ?? manifest.assignedAvatars,
  avatarsConfig,
);
for (const id of avatarIds) {
  if (!avatarsById[id]) {
    fail(`Unknown avatar id "${id}"`, [
      `Known avatars: ${Object.keys(avatarsById).join(", ")}`,
      `Edit ${relPath(PATHS.avatarsConfig)} to add more.`,
    ]);
  }
}
const speakerToAvatar = Object.fromEntries(
  SPEAKER_LABELS.slice(0, speakerCount).map((label, i) => [label, avatarIds[i]]),
);

// ── turns (merge micro-turns) ───────────────────────────────────

const minTurn = Number(opt("min-turn", "1.5"));
const turns = [];
for (const t of transcript.turns ?? []) {
  const last = turns[turns.length - 1];
  if (last && t.end - t.start < minTurn) {
    last.end = t.end;
    last.text = `${last.text} ${t.text}`.trim();
  } else {
    turns.push({ ...t });
  }
}
if (turns.length === 0) fail("Transcript has no speaker turns");

const layout = opt("layout", layoutForSpeakerCount(speakerCount));
const LAYOUT_PANELS = {
  single: [{ x: 0, y: 0, w: 1920, h: 1080 }],
  split_2: [
    { x: 0, y: 0, w: 960, h: 1080 },
    { x: 960, y: 0, w: 960, h: 1080 },
  ],
  roundtable_3: [
    { x: 0, y: 0, w: 640, h: 1080 },
    { x: 640, y: 0, w: 640, h: 1080 },
    { x: 1280, y: 0, w: 640, h: 1080 },
  ],
  grid_4: [
    { x: 0, y: 0, w: 960, h: 540 },
    { x: 960, y: 0, w: 960, h: 540 },
    { x: 0, y: 540, w: 960, h: 540 },
    { x: 960, y: 540, w: 960, h: 540 },
  ],
  waveform: [],
};
if (!(layout in LAYOUT_PANELS)) {
  fail(`Unknown layout "${layout}"`, [`Valid: ${Object.keys(LAYOUT_PANELS).join(", ")}`]);
}

// ── plan ────────────────────────────────────────────────────────

const turnsDir = relPath(join(PATHS.processed, manifest.id, "turns"));
const clipsDir = relPath(join(PATHS.videoOutputs, manifest.id, "clips"));

const planTurns = turns.map((t, i) => {
  const avatarId = speakerToAvatar[t.speaker] ?? avatarIds[0];
  const turnId = `turn_${String(i + 1).padStart(3, "0")}`;
  return {
    turnId,
    index: i,
    speaker: t.speaker,
    avatarId,
    avatarName: avatarsById[avatarId].name,
    start: t.start,
    end: t.end,
    durationSeconds: Math.round((t.end - t.start) * 10) / 10,
    text: t.text,
    audioSegmentPath: `${turnsDir}/${turnId}.mp3`,
    avatarClipPath: `${clipsDir}/${turnId}.mp4`,
  };
});

const panels = SPEAKER_LABELS.slice(0, speakerCount).map((label, i) => ({
  panelIndex: i,
  speaker: label,
  avatarId: avatarIds[i],
  avatarName: avatarsById[avatarIds[i]].name,
  rect: LAYOUT_PANELS[layout][i] ?? null,
}));

const plan = {
  episodeId: manifest.id,
  title: manifest.title,
  createdAt: new Date().toISOString(),
  sourceAudio: manifest.filePath,
  transcriptPath: manifest.transcriptPath,
  transcriptMethod: transcript.method,
  canvas: { width: 1920, height: 1080, fps: 25 },
  layout,
  speakerCount,
  panels,
  turns: planTurns,
  renderStrategies: {
    preferred: "local_lipsync",
    order: ["local_lipsync", "heygen", "waveform_fallback"],
    local_lipsync: {
      script: "scripts/podcast/render-avatar-video-local.mjs",
      requires: "Black Frame AI / SadTalker / Wav2Lip / MuseTalk — see podcast/docs/LOCAL_BLACKFRAME_WORKFLOW.md",
      perTurnInputs: ["avatar source image/video", "audioSegmentPath", "text"],
    },
    heygen: {
      script: "scripts/podcast/render-avatar-video-heygen.mjs",
      requires: "HEYGEN_API_KEY + heygenAvatarId per avatar in podcast/avatar_sources/avatars.json",
      mode: "uploaded_audio_per_turn",
      notes: "HeyGen v2 supports voice.type=audio per scene (max 10 scenes/video). Each turn becomes one scene; clips are downloaded and assembled locally.",
    },
    waveform_fallback: {
      script: "scripts/podcast/render-waveform-fallback.mjs",
      requires: "ffmpeg only",
    },
  },
  assembly: {
    script: "scripts/podcast/assemble-roundtable-video.mjs",
    expectsClipsIn: clipsDir,
    introCardSeconds: 3,
    outroCardSeconds: 4,
    lowerThirds: true,
    subtitles: transcript.method?.startsWith("faster-whisper")
      ? manifest.transcriptPath.replace(/\.json$/, ".srt")
      : null,
  },
  platformDestinations: manifest.platformDestinations,
};

const planPath = join(PATHS.manifests, `${manifest.id}.videoplan.json`);
saveJSON(planPath, plan);
updateManifest(mPath, {
  status: "planned",
  assignedAvatars: avatarIds,
  videoPlanPath: relPath(planPath),
});

console.log(`✓ video plan: ${relPath(planPath)}`);
console.log(`  layout: ${layout} · ${speakerCount} speaker(s) · ${planTurns.length} turns`);
for (const p of panels) console.log(`  panel ${p.panelIndex}: ${p.speaker} → ${p.avatarName}`);
console.log("\nRender options:");
console.log(`  local:    node scripts/podcast/render-avatar-video-local.mjs ${manifest.id}`);
console.log(`  heygen:   node scripts/podcast/render-avatar-video-heygen.mjs generate ${manifest.id}`);
console.log(`  fallback: node scripts/podcast/render-waveform-fallback.mjs ${manifest.id}`);
