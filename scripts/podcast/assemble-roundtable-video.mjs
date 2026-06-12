#!/usr/bin/env node
/**
 * Assemble the final multi-avatar podcast video from per-turn avatar clips.
 *
 * Layouts (from the video plan):
 *   single        one avatar full screen
 *   split_2       Speaker A left / Speaker B right
 *   roundtable_3  three equal vertical panels
 *   grid_4        2×2 grid
 *
 * For each turn, the ACTIVE speaker's clip plays in their panel while the other
 * panels show a dimmed freeze-frame of that coach. Lower-third name labels are
 * drawn on every panel; a branded intro and outro card bookend the episode.
 *
 * Usage:
 *   node scripts/podcast/assemble-roundtable-video.mjs <slug> [--out path.mp4]
 *
 * Expects clips at podcast/video_outputs/<slug>/clips/turn_NNN.mp4 — produced by
 * render-avatar-video-local.mjs or render-avatar-video-heygen.mjs.
 */
import { existsSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import {
  REPO_ROOT, PATHS, BRAND, loadManifest, updateManifest, loadJSON, fail,
  relPath, requireFfmpeg, runFfmpeg, findFont, drawtextEscape,
} from "./lib.mjs";

const args = process.argv.slice(2);
const target = args.find((a) => !a.startsWith("--"));
function opt(name, fallback) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}
if (!target) fail("Usage: node scripts/podcast/assemble-roundtable-video.mjs <slug>");

requireFfmpeg();
const font = findFont(true);
const { manifest, path: mPath } = loadManifest(target);
if (!manifest.videoPlanPath) {
  fail(`No video plan for "${manifest.id}"`, [`Run: node scripts/podcast/create-video-plan.mjs ${manifest.id}`]);
}
const plan = loadJSON(join(REPO_ROOT, manifest.videoPlanPath));
const { width: W, height: H, fps } = plan.canvas;

// ── preflight: every turn needs its clip ────────────────────────
const missing = plan.turns.filter((t) => !existsSync(join(REPO_ROOT, t.avatarClipPath)));
if (missing.length) {
  fail(`${missing.length}/${plan.turns.length} avatar clips are missing`, [
    `Expected in: ${plan.assembly.expectsClipsIn}`,
    `First missing: ${missing[0].avatarClipPath}`,
    "",
    "Generate them first:",
    `  local:  node scripts/podcast/render-avatar-video-local.mjs ${manifest.id}`,
    `  heygen: node scripts/podcast/render-avatar-video-heygen.mjs generate ${manifest.id}`,
    "Or skip avatars entirely:",
    `  node scripts/podcast/render-waveform-fallback.mjs ${manifest.id}`,
  ]);
}

const workDir = join(PATHS.processed, manifest.id, "assembly");
rmSync(workDir, { recursive: true, force: true });
mkdirSync(workDir, { recursive: true });

const AUDIO_ARGS = ["-c:a", "aac", "-b:a", "160k", "-ar", "48000", "-ac", "2"];
const VIDEO_ARGS = ["-c:v", "libx264", "-preset", "fast", "-crf", "21", "-pix_fmt", "yuv420p", "-r", String(fps)];

// ── posters: freeze-frame per panel avatar ──────────────────────
const posters = {};
for (const panel of plan.panels) {
  const firstClip = plan.turns.find((t) => t.avatarId === panel.avatarId);
  const poster = join(workDir, `poster_${panel.avatarId}.png`);
  if (firstClip) {
    runFfmpeg(["-i", join(REPO_ROOT, firstClip.avatarClipPath), "-vframes", "1", poster]);
  } else {
    runFfmpeg(["-f", "lavfi", "-i", `color=c=${BRAND.dark}:s=640x720`, "-vframes", "1", poster]);
  }
  posters[panel.avatarId] = poster;
}

const fitFilter = (rect) =>
  `scale=${rect.w}:${rect.h}:force_original_aspect_ratio=increase,crop=${rect.w}:${rect.h},setsar=1,fps=${fps}`;

function panelLabel(panel, idx) {
  const name = drawtextEscape(panel.avatarName);
  const r = panel.rect;
  return (
    `drawbox=x=${r.x}:y=${r.y + r.h - 64}:w=${Math.min(420, r.w)}:h=44:color=black@0.6:t=fill,` +
    `drawtext=fontfile=${font}:text='${name}':fontcolor=white:fontsize=26:x=${r.x + 18}:y=${r.y + r.h - 54}`
  );
}

// ── per-turn segments ───────────────────────────────────────────
const segments = [];
console.log(`Assembling ${plan.turns.length} turns (${plan.layout})…`);
for (const turn of plan.turns) {
  const seg = join(workDir, `${turn.turnId}.ts`);
  const clip = join(REPO_ROOT, turn.avatarClipPath);

  if (plan.layout === "single") {
    runFfmpeg([
      "-i", clip,
      "-vf", `${fitFilter({ x: 0, y: 0, w: W, h: H })},${panelLabel(plan.panels[0], 0)}`,
      ...VIDEO_ARGS, ...AUDIO_ARGS, "-f", "mpegts", seg,
    ]);
  } else {
    // canvas + one input per panel (active = clip, others = dimmed poster)
    const inputs = ["-f", "lavfi", "-i", `color=c=${BRAND.dark}:s=${W}x${H}:r=${fps}`];
    const filters = [];
    let inIdx = 1;
    let chain = "[0:v]";
    let audioMap = null;
    for (const panel of plan.panels) {
      const isActive = panel.avatarId === turn.avatarId && panel.speaker === turn.speaker;
      if (isActive) {
        inputs.push("-i", clip);
        audioMap = `${inIdx}:a`;
        filters.push(`[${inIdx}:v]${fitFilter(panel.rect)}[p${panel.panelIndex}]`);
      } else {
        inputs.push("-loop", "1", "-i", posters[panel.avatarId]);
        filters.push(`[${inIdx}:v]${fitFilter(panel.rect)},eq=brightness=-0.18:saturation=0.7[p${panel.panelIndex}]`);
      }
      const next = `[c${panel.panelIndex}]`;
      filters.push(`${chain}[p${panel.panelIndex}]overlay=${panel.rect.x}:${panel.rect.y}:shortest=${isActive ? 1 : 0}${next}`);
      chain = next;
      inIdx += 1;
    }
    const labels = plan.panels.map((p) => panelLabel(p)).join(",");
    filters.push(`${chain}${labels}[vout]`);
    runFfmpeg([
      ...inputs,
      "-filter_complex", filters.join(";"),
      "-map", "[vout]", "-map", audioMap,
      ...VIDEO_ARGS, ...AUDIO_ARGS, "-f", "mpegts", seg,
    ]);
  }
  segments.push(seg);
  process.stdout.write(`  ✓ ${turn.turnId} (${turn.avatarName}, ${turn.durationSeconds}s)\n`);
}

// ── intro / outro cards ─────────────────────────────────────────
function card(outName, lines, seconds) {
  const out = join(workDir, outName);
  const draw = lines
    .map((l, i) =>
      `drawtext=fontfile=${font}:text='${drawtextEscape(l.text)}':fontcolor=${l.color}:fontsize=${l.size}:x=(w-text_w)/2:y=${l.y}`,
    )
    .join(",");
  const bg = existsSync(PATHS.brandBackground)
    ? ["-loop", "1", "-t", String(seconds), "-i", PATHS.brandBackground]
    : ["-f", "lavfi", "-t", String(seconds), "-i", `color=c=${BRAND.dark}:s=${W}x${H}:r=${fps}`];
  runFfmpeg([
    ...bg,
    "-f", "lavfi", "-t", String(seconds), "-i", "anullsrc=channel_layout=stereo:sample_rate=48000",
    "-filter_complex",
    `[0:v]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},setsar=1,fps=${fps},drawbox=x=0:y=0:w=${W}:h=${H}:color=black@0.5:t=fill,${draw}[v]`,
    "-map", "[v]", "-map", "1:a",
    ...VIDEO_ARGS, ...AUDIO_ARGS, "-shortest", "-f", "mpegts", out,
  ]);
  return out;
}

const intro = card("intro.ts", [
  { text: `${BRAND.productName} Podcast`, color: BRAND.orange, size: 40, y: 380 },
  { text: manifest.title, color: "white", size: 68, y: 460 },
  { text: `Episode ${manifest.episodeNumber ?? ""} · ${plan.panels.map((p) => p.avatarName).join("  ·  ")}`, color: "white@0.85", size: 32, y: 580 },
], plan.assembly.introCardSeconds ?? 3);

const outro = card("outro.ts", [
  { text: BRAND.companyName, color: BRAND.orange, size: 56, y: 420 },
  { text: "Elite Sales & Marketing Training", color: "white", size: 40, y: 510 },
  { text: "Keep going — your next episode is in the coaching library.", color: "white@0.85", size: 30, y: 590 },
], plan.assembly.outroCardSeconds ?? 4);

// ── concat ──────────────────────────────────────────────────────
const concatList = join(workDir, "concat.txt");
writeFileSync(concatList, [intro, ...segments, outro].map((f) => `file '${f}'`).join("\n") + "\n");
const outPath = opt("out")
  ? join(REPO_ROOT, opt("out"))
  : join(PATHS.videoOutputs, `${manifest.id}__${plan.layout}.mp4`);
mkdirSync(join(outPath, ".."), { recursive: true });
runFfmpeg(["-f", "concat", "-safe", "0", "-i", concatList, "-c", "copy", "-movflags", "+faststart", outPath]);

updateManifest(mPath, { status: "rendered", videoOutputPath: relPath(outPath) });
console.log(`\n✓ final video: ${relPath(outPath)}`);
console.log("  Publish destinations (manifest.platformDestinations):", manifest.platformDestinations.join(", "));
console.log("  See podcast/docs/DAILY_AUTOMATION_PLAN.md for the publish step.");
