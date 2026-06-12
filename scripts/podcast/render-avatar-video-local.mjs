#!/usr/bin/env node
/**
 * Render per-turn talking-head clips with LOCAL lip-sync tools
 * (Black Frame AI local server, SadTalker, Wav2Lip, MuseTalk, LivePortrait).
 *
 * Usage:
 *   node scripts/podcast/render-avatar-video-local.mjs check          # probe what's installed
 *   node scripts/podcast/render-avatar-video-local.mjs <slug>         # render clips for an episode
 *
 * Tool detection order (first hit wins):
 *   1. BLACKFRAME_LOCAL_URL env var → HTTP lip-sync server (POST /lipsync)
 *   2. SADTALKER_DIR env var or ~/SadTalker checkout (python inference)
 *   3. WAV2LIP_DIR env var or ~/Wav2Lip checkout
 *   4. MUSETALK_DIR env var or ~/MuseTalk checkout
 *
 * Per-turn inputs come from the video plan (created by create-video-plan.mjs):
 *   - avatar source image/video: podcast/avatar_sources/<avatarId>/  (first .png/.jpg/.mp4)
 *   - speaker audio segment:     extracted from the episode audio via ffmpeg
 * Output clips land in podcast/video_outputs/<slug>/clips/turn_NNN.mp4
 * Then run: node scripts/podcast/assemble-roundtable-video.mjs <slug>
 */
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { homedir } from "node:os";
import {
  REPO_ROOT, PATHS, loadManifest, loadJSON, fail, relPath, loadEnv,
  requireFfmpeg, runFfmpeg, updateManifest, assertTranscriptReadyForAvatars,
} from "./lib.mjs";

const env = loadEnv();
const args = process.argv.slice(2);
const command = args[0];

// ── detection ───────────────────────────────────────────────────

async function detectTools() {
  const tools = [];

  if (env.BLACKFRAME_LOCAL_URL) {
    let reachable = false;
    try {
      const res = await fetch(`${env.BLACKFRAME_LOCAL_URL.replace(/\/$/, "")}/health`, {
        signal: AbortSignal.timeout(3000),
      });
      reachable = res.ok;
    } catch { /* unreachable */ }
    tools.push({
      id: "blackframe",
      label: `Black Frame AI local server (${env.BLACKFRAME_LOCAL_URL})`,
      available: reachable,
      detail: reachable ? "health check OK" : "BLACKFRAME_LOCAL_URL is set but /health is not responding",
    });
  } else {
    tools.push({
      id: "blackframe",
      label: "Black Frame AI local server",
      available: false,
      detail: "BLACKFRAME_LOCAL_URL not set",
    });
  }

  for (const [id, envVar, dirName, script] of [
    ["sadtalker", "SADTALKER_DIR", "SadTalker", "inference.py"],
    ["wav2lip", "WAV2LIP_DIR", "Wav2Lip", "inference.py"],
    ["musetalk", "MUSETALK_DIR", "MuseTalk", "scripts/inference.py"],
    ["liveportrait", "LIVEPORTRAIT_DIR", "LivePortrait", "inference.py"],
  ]) {
    const dir = env[envVar] ?? join(homedir(), dirName);
    const found = existsSync(join(dir, script));
    tools.push({
      id,
      label: `${dirName} (${envVar})`,
      available: found,
      detail: found ? `found at ${dir}` : `${envVar} not set and ${dir} not found`,
      dir: found ? dir : null,
      script,
    });
  }

  // Hosted "local-ish" fallbacks worth flagging during check
  for (const [id, envVar, label] of [
    ["fal", "FAL_KEY", "FAL (hosted lip-sync models, e.g. fal-ai/sadtalker)"],
    ["replicate", "REPLICATE_API_TOKEN", "Replicate (hosted SadTalker/Wav2Lip)"],
  ]) {
    tools.push({
      id, label,
      available: Boolean(env[envVar]),
      detail: env[envVar] ? `${envVar} is set (not yet wired into this script)` : `${envVar} not set`,
    });
  }
  return tools;
}

function avatarSourceFor(avatarId) {
  const dir = join(PATHS.avatarSources, avatarId);
  if (!existsSync(dir)) return null;
  const files = readdirSync(dir).filter((f) => /\.(png|jpe?g|mp4|mov)$/i.test(f)).sort();
  return files.length ? join(dir, files[0]) : null;
}

if (command === "check" || command === "--check") {
  const tools = await detectTools();
  console.log("\nLocal avatar / lip-sync tool check:\n");
  let anyUsable = false;
  for (const t of tools) {
    console.log(`  ${t.available ? "✓" : "✗"} ${t.label}`);
    console.log(`      ${t.detail}`);
    if (t.available && ["blackframe", "sadtalker", "wav2lip", "musetalk"].includes(t.id)) anyUsable = true;
  }
  console.log("\nAvatar source material (podcast/avatar_sources/<id>/):");
  for (const a of loadJSON(PATHS.avatarsConfig).avatars) {
    const src = avatarSourceFor(a.id);
    console.log(`  ${src ? "✓" : "✗"} ${a.id}: ${src ? relPath(src) : "no image/video — drop a frontal photo or short clip in podcast/avatar_sources/" + a.id + "/"}`);
  }
  console.log(
    anyUsable
      ? "\n→ Local rendering is possible. Run: node scripts/podcast/render-avatar-video-local.mjs <slug>\n"
      : "\n→ No local lip-sync tool available. Use the HeyGen path:\n   node scripts/podcast/render-avatar-video-heygen.mjs generate <slug>\n   Setup guide: podcast/docs/LOCAL_BLACKFRAME_WORKFLOW.md\n",
  );
  process.exit(0);
}

if (!command || command.startsWith("--")) {
  fail("Usage", [
    "node scripts/podcast/render-avatar-video-local.mjs check",
    "node scripts/podcast/render-avatar-video-local.mjs <slug>",
  ]);
}

// ── render ──────────────────────────────────────────────────────

requireFfmpeg();
const { manifest, path: mPath } = loadManifest(command);
if (!manifest.videoPlanPath) {
  fail(`No video plan for "${manifest.id}"`, [`Run: node scripts/podcast/create-video-plan.mjs ${manifest.id}`]);
}
const plan = loadJSON(join(REPO_ROOT, manifest.videoPlanPath));

// Hard guard: same rule as the HeyGen path — no avatar rendering from a
// placeholder/empty/heuristic-only transcript (--allow-heuristic-speakers overrides).
const transcriptAbs = manifest.transcriptPath ? join(REPO_ROOT, manifest.transcriptPath) : null;
assertTranscriptReadyForAvatars(
  manifest,
  transcriptAbs && existsSync(transcriptAbs) ? loadJSON(transcriptAbs) : null,
  { allowHeuristic: args.includes("--allow-heuristic-speakers") },
);

const tools = await detectTools();
const tool = tools.find((t) => t.available && ["blackframe", "sadtalker", "wav2lip", "musetalk"].includes(t.id));
if (!tool) {
  fail("No local lip-sync tool is available on this machine", [
    "Probed: Black Frame AI (BLACKFRAME_LOCAL_URL), SadTalker, Wav2Lip, MuseTalk, LivePortrait.",
    "Run `node scripts/podcast/render-avatar-video-local.mjs check` for details.",
    "",
    "Either install one (podcast/docs/LOCAL_BLACKFRAME_WORKFLOW.md) or use HeyGen:",
    `  node scripts/podcast/render-avatar-video-heygen.mjs generate ${manifest.id}`,
    "Or render the branded waveform fallback right now:",
    `  node scripts/podcast/render-waveform-fallback.mjs ${manifest.id}`,
  ]);
}
console.log(`Using local tool: ${tool.label}`);

// 1. extract per-turn audio segments
const audio = join(REPO_ROOT, manifest.filePath);
for (const turn of plan.turns) {
  const out = join(REPO_ROOT, turn.audioSegmentPath);
  mkdirSync(join(out, ".."), { recursive: true });
  runFfmpeg(["-i", audio, "-ss", String(turn.start), "-to", String(turn.end), "-c:a", "libmp3lame", "-q:a", "3", out]);
}
console.log(`✓ extracted ${plan.turns.length} audio segments → ${relPath(join(PATHS.processed, manifest.id, "turns"))}`);

// 2. lip-sync each turn
let failures = 0;
for (const turn of plan.turns) {
  const source = avatarSourceFor(turn.avatarId);
  if (!source) {
    fail(`No avatar source material for "${turn.avatarId}"`, [
      `Drop a frontal photo (PNG/JPG) or short video (MP4) into podcast/avatar_sources/${turn.avatarId}/`,
      "A clean, well-lit, front-facing head-and-shoulders shot works best.",
    ]);
  }
  const clipOut = join(REPO_ROOT, turn.avatarClipPath);
  mkdirSync(join(clipOut, ".."), { recursive: true });
  const audioSeg = join(REPO_ROOT, turn.audioSegmentPath);

  if (tool.id === "blackframe") {
    // Contract documented in podcast/docs/LOCAL_BLACKFRAME_WORKFLOW.md:
    // POST {BLACKFRAME_LOCAL_URL}/lipsync  multipart: source_image|source_video, audio → mp4 bytes
    const form = new FormData();
    const sourceField = /\.(mp4|mov)$/i.test(source) ? "source_video" : "source_image";
    form.append(sourceField, new Blob([await import("node:fs/promises").then((fs) => fs.readFile(source))]), source.split("/").pop());
    form.append("audio", new Blob([await import("node:fs/promises").then((fs) => fs.readFile(audioSeg))]), `${turn.turnId}.mp3`);
    const res = await fetch(`${env.BLACKFRAME_LOCAL_URL.replace(/\/$/, "")}/lipsync`, { method: "POST", body: form });
    if (!res.ok) {
      console.error(`  ✗ ${turn.turnId}: Black Frame server returned ${res.status}`);
      failures += 1;
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await import("node:fs/promises").then((fs) => fs.writeFile(clipOut, buf));
  } else {
    // SadTalker / Wav2Lip / MuseTalk python CLIs
    const argsByTool = {
      sadtalker: ["inference.py", "--driven_audio", audioSeg, "--source_image", source, "--result_dir", join(clipOut, ".."), "--still", "--preprocess", "full"],
      wav2lip: ["inference.py", "--checkpoint_path", "checkpoints/wav2lip_gan.pth", "--face", source, "--audio", audioSeg, "--outfile", clipOut],
      musetalk: ["scripts/inference.py", "--video_path", source, "--audio_path", audioSeg, "--result_dir", join(clipOut, "..")],
    };
    const res = spawnSync("python3", argsByTool[tool.id], { cwd: tool.dir, stdio: "inherit" });
    if (res.status !== 0) {
      console.error(`  ✗ ${turn.turnId}: ${tool.id} exited ${res.status}`);
      failures += 1;
      continue;
    }
  }
  console.log(`  ✓ ${turn.turnId} (${turn.avatarId}, ${turn.durationSeconds}s)`);
}

if (failures > 0) {
  fail(`${failures}/${plan.turns.length} turns failed`, [
    "Fix the tool errors above and re-run, or fall back to:",
    `  node scripts/podcast/render-avatar-video-heygen.mjs generate ${manifest.id}`,
    `  node scripts/podcast/render-waveform-fallback.mjs ${manifest.id}`,
  ]);
}

updateManifest(mPath, { status: "clips_rendered_local" });
console.log(`\n✓ all clips in ${plan.assembly.expectsClipsIn}`);
console.log(`  next: node scripts/podcast/assemble-roundtable-video.mjs ${manifest.id}`);
