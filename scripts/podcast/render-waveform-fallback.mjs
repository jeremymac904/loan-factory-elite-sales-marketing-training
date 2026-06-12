#!/usr/bin/env node
/**
 * Render the branded audio-waveform fallback video for an episode.
 * Needs only ffmpeg — this is the guaranteed-to-work path when avatar
 * generation is unavailable or fails.
 *
 * Output: Loan Factory dark background + logo + episode title + topic lane
 * + animated waveform + burned-in subtitles (when a real transcript exists).
 *
 * Usage:
 *   node scripts/podcast/render-waveform-fallback.mjs <slug> [options]
 *
 * Options:
 *   --max-duration 90      render only the first N seconds (preview/POC)
 *   --out path.mp4         custom output path
 *   --no-subtitles         skip subtitle burn-in even if an SRT exists
 */
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  REPO_ROOT, PATHS, BRAND, loadManifest, updateManifest, fail, relPath,
  requireFfmpeg, runFfmpeg, findFont, drawtextEscape,
} from "./lib.mjs";

const args = process.argv.slice(2);
const target = args.find((a) => !a.startsWith("--"));
function opt(name, fallback) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}
if (!target) fail("Usage: node scripts/podcast/render-waveform-fallback.mjs <slug>");

requireFfmpeg();
const { manifest, path: mPath } = loadManifest(target);
const audio = join(REPO_ROOT, manifest.filePath);
if (!existsSync(audio)) fail(`Audio missing: ${manifest.filePath}`);

const font = findFont(true);
if (!font) fail("No usable TTF font found for drawtext", ["Install: sudo apt-get install -y fonts-dejavu"]);

const maxDuration = opt("max-duration") ? Number(opt("max-duration")) : null;
const outPath = opt("out")
  ? join(REPO_ROOT, opt("out"))
  : join(PATHS.videoOutputs, `${manifest.id}__waveform${maxDuration ? `_${maxDuration}s_preview` : ""}.mp4`);
mkdirSync(join(outPath, ".."), { recursive: true });

const hasBackground = existsSync(PATHS.brandBackground);
const hasLogo = existsSync(PATHS.brandLogo);
const srtPath = manifest.transcriptPath
  ? join(REPO_ROOT, manifest.transcriptPath.replace(/\.json$/, ".srt"))
  : null;
let isPlaceholderTranscript = false;
if (manifest.transcriptPath && existsSync(join(REPO_ROOT, manifest.transcriptPath))) {
  const t = JSON.parse(readFileSync(join(REPO_ROOT, manifest.transcriptPath), "utf8"));
  isPlaceholderTranscript = (t.method ?? "").startsWith("placeholder");
}
const burnSubtitles =
  !args.includes("--no-subtitles") && srtPath && existsSync(srtPath) && !isPlaceholderTranscript;

const title = drawtextEscape(manifest.title);
const lane = drawtextEscape(
  `${BRAND.productName} Podcast · ${String(manifest.topicLane ?? "general").replace(/[-_]/g, " ").toUpperCase()}` +
  (manifest.episodeNumber ? ` · EP ${manifest.episodeNumber}` : ""),
);
const footer = drawtextEscape(`${BRAND.companyName} · Elite Sales & Marketing Training`);

// ── filter graph ────────────────────────────────────────────────
const inputs = [];
const filters = [];

if (hasBackground) {
  inputs.push("-loop", "1", "-i", PATHS.brandBackground);
  filters.push("[0:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,setsar=1[bg0]");
} else {
  inputs.push("-f", "lavfi", "-i", `color=c=${BRAND.dark}:s=1920x1080:r=25`);
  filters.push("[0:v]setsar=1[bg0]");
}
inputs.push("-i", audio); // input 1: audio
let logoIdx = null;
if (hasLogo) {
  inputs.push("-loop", "1", "-i", PATHS.brandLogo);
  logoIdx = 2;
}

// dark vignette so text stays readable on the hero image
filters.push("[bg0]drawbox=x=0:y=0:w=1920:h=1080:color=black@0.45:t=fill[bg]");

// waveform
filters.push(
  `[1:a]aformat=channel_layouts=stereo,showwaves=s=1500x300:mode=cline:rate=25:scale=sqrt:colors=${BRAND.orange}|${BRAND.orange}[wave]`,
);
filters.push("[bg][wave]overlay=(W-w)/2:560:shortest=1[v1]");

// text block
filters.push(
  `[v1]drawtext=fontfile=${font}:text='${lane}':fontcolor=${BRAND.orange}:fontsize=34:x=(w-text_w)/2:y=150[v2]`,
);
filters.push(
  `[v2]drawtext=fontfile=${font}:text='${title}':fontcolor=white:fontsize=64:x=(w-text_w)/2:y=220[v3]`,
);
filters.push(
  `[v3]drawbox=x=0:y=990:w=1920:h=90:color=black@0.65:t=fill,` +
  `drawtext=fontfile=${font}:text='${footer}':fontcolor=white@0.9:fontsize=30:x=(w-text_w)/2:y=1020[v4]`,
);

let last = "v4";
if (logoIdx !== null) {
  // The Loan Factory logo is dark text on transparency — give it a white plate.
  filters.push(`[${logoIdx}:v]scale=240:-1[logo]`);
  filters.push(`[v4]drawbox=x=48:y=44:w=264:h=104:color=white@0.94:t=fill[v4b]`);
  filters.push(`[v4b][logo]overlay=60:56[v5]`);
  last = "v5";
}
if (burnSubtitles) {
  const escapedSrt = srtPath.replace(/\\/g, "/").replace(/:/g, "\\:").replace(/'/g, "\\'");
  filters.push(
    `[${last}]subtitles='${escapedSrt}':force_style='FontName=DejaVu Sans,FontSize=18,PrimaryColour=&HFFFFFF&,OutlineColour=&H80000000&,BorderStyle=3,MarginV=110'[vout]`,
  );
  last = "vout";
}

const ffArgs = [
  ...inputs,
  "-filter_complex", filters.join(";"),
  "-map", `[${last}]`,
  "-map", "1:a",
  ...(maxDuration ? ["-t", String(maxDuration)] : []),
  "-c:v", "libx264", "-preset", "medium", "-crf", "21", "-pix_fmt", "yuv420p",
  "-c:a", "aac", "-b:a", "160k",
  "-shortest",
  "-movflags", "+faststart",
  outPath,
];

console.log(`Rendering waveform video → ${relPath(outPath)}`);
if (burnSubtitles) console.log(`  subtitles: ${relPath(srtPath)}`);
if (isPlaceholderTranscript) console.log("  (placeholder transcript — subtitles skipped)");
runFfmpeg(ffArgs);

updateManifest(mPath, {
  status: maxDuration ? manifest.status : "rendered_waveform",
  videoOutputPath: relPath(outPath),
});
console.log(`✓ done: ${relPath(outPath)}`);
