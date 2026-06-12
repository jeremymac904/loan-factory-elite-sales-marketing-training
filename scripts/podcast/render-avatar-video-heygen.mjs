#!/usr/bin/env node
/**
 * HeyGen fallback path: render per-turn avatar clips via the HeyGen v2 API
 * using UPLOADED AUDIO (voice.type = "audio"), then download the MP4s for
 * local assembly.
 *
 * VERIFIED CAPABILITIES (HeyGen API v2, see podcast/docs/HEYGEN_WORKFLOW.md):
 *   ✓ video from existing avatar            (video_inputs[].character.avatar_id)
 *   ✓ video from uploaded audio             (voice: { type: "audio", audio_asset_id })
 *   ✓ video from script text                (voice: { type: "text", voice_id })
 *   ✓ multi-scene videos                    (max 10 scenes per video)
 *   ✗ NO native multi-avatar podcast layout — scenes play sequentially, one avatar
 *     on screen at a time. Split-screen/roundtable is assembled locally with ffmpeg.
 *
 * Usage:
 *   node scripts/podcast/render-avatar-video-heygen.mjs check             # verify key, list avatars+voices
 *   node scripts/podcast/render-avatar-video-heygen.mjs generate <slug>   # extract audio, upload, generate clips
 *   node scripts/podcast/render-avatar-video-heygen.mjs status <slug>     # poll pending videos, download done ones
 *
 * Requires: HEYGEN_API_KEY in the environment or repo-root .env/.env.local.
 * No key on this machine? The same calls are available through the Zapier MCP
 * HeyGen actions (heygen_upload_an_asset / heygen_create_an_avatar_video_*).
 */
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
  REPO_ROOT, PATHS, loadManifest, updateManifest, loadJSON, saveJSON, fail,
  relPath, loadEnv, loadAvatars, requireFfmpeg, runFfmpeg,
} from "./lib.mjs";

const API = "https://api.heygen.com";
const UPLOAD = "https://upload.heygen.com";

const env = loadEnv();
const [command, target] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const isTest = process.argv.includes("--test"); // watermark, no credits

function requireKey() {
  if (!env.HEYGEN_API_KEY) {
    fail("HEYGEN_API_KEY is not set", [
      "1. Get the key: HeyGen → Settings → Subscriptions & API → HeyGen API.",
      "2. Add to the repo root .env.local (gitignored):",
      "     HEYGEN_API_KEY=your_key_here",
      "3. Re-run this command.",
      "",
      "Alternative without a key: the Zapier MCP connection in Claude sessions",
      "already exposes HeyGen actions (upload asset, create avatar video, video",
      "status). See podcast/docs/HEYGEN_WORKFLOW.md → 'Zapier MCP path'.",
    ]);
  }
  return env.HEYGEN_API_KEY;
}

async function api(path, { method = "GET", body, base = API, contentType } = {}) {
  const res = await fetch(`${base}${path}`, {
    method,
    headers: {
      "X-Api-Key": requireKey(),
      ...(body instanceof Buffer
        ? { "Content-Type": contentType ?? "application/octet-stream" }
        : body ? { "Content-Type": "application/json" } : {}),
    },
    body: body instanceof Buffer ? body : body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.error) {
    throw new Error(`HeyGen ${method} ${path} → ${res.status}: ${JSON.stringify(json.error ?? json).slice(0, 400)}`);
  }
  return json.data ?? json;
}

// ── check ───────────────────────────────────────────────────────

if (command === "check") {
  requireKey();
  console.log("Checking HeyGen API access…");
  const [avatars, voices] = await Promise.all([api("/v2/avatars"), api("/v2/voices")]);
  const avatarList = avatars.avatars ?? [];
  const voiceList = voices.voices ?? [];
  console.log(`✓ API key works. ${avatarList.length} avatars, ${voiceList.length} voices on the account.\n`);

  const { config } = loadAvatars();
  console.log("Matching against podcast/avatar_sources/avatars.json:");
  for (const a of config.avatars) {
    if (a.heygenAvatarId) {
      const hit = avatarList.find((h) => h.avatar_id === a.heygenAvatarId);
      console.log(`  ${hit ? "✓" : "✗"} ${a.id}: heygenAvatarId ${a.heygenAvatarId} ${hit ? "verified" : "NOT FOUND on account"}`);
    } else {
      const guess = avatarList.filter((h) =>
        (h.avatar_name ?? "").toLowerCase().includes(a.id),
      ).slice(0, 3);
      console.log(`  ? ${a.id}: heygenAvatarId not set.${guess.length ? " Candidates: " + guess.map((g) => `${g.avatar_name}=${g.avatar_id}`).join(", ") : " No name match — check custom avatars in the HeyGen dashboard."}`);
    }
  }
  console.log("\nPaste the right IDs into podcast/avatar_sources/avatars.json (heygenAvatarId / heygenVoiceId).");
  process.exit(0);
}

if (!command || !["generate", "status"].includes(command) || !target && command !== "check") {
  fail("Usage", [
    "node scripts/podcast/render-avatar-video-heygen.mjs check",
    "node scripts/podcast/render-avatar-video-heygen.mjs generate <slug> [--test]",
    "node scripts/podcast/render-avatar-video-heygen.mjs status <slug>",
  ]);
}

const { manifest, path: mPath } = loadManifest(target);
if (!manifest.videoPlanPath) {
  fail(`No video plan for "${manifest.id}"`, [`Run: node scripts/podcast/create-video-plan.mjs ${manifest.id}`]);
}
const plan = loadJSON(join(REPO_ROOT, manifest.videoPlanPath));
const jobsPath = join(PATHS.processed, manifest.id, "heygen_jobs.json");

// ── generate ────────────────────────────────────────────────────

if (command === "generate") {
  requireKey();
  requireFfmpeg();
  const { byId } = loadAvatars();

  const missing = [...new Set(plan.turns.map((t) => t.avatarId))].filter((id) => !byId[id]?.heygenAvatarId);
  if (missing.length) {
    fail(`These avatars have no heygenAvatarId yet: ${missing.join(", ")}`, [
      "Run `node scripts/podcast/render-avatar-video-heygen.mjs check` to list account avatars,",
      "then fill heygenAvatarId in podcast/avatar_sources/avatars.json.",
    ]);
  }

  // 1. extract per-turn audio
  const audio = join(REPO_ROOT, manifest.filePath);
  for (const turn of plan.turns) {
    const out = join(REPO_ROOT, turn.audioSegmentPath);
    mkdirSync(join(out, ".."), { recursive: true });
    runFfmpeg(["-i", audio, "-ss", String(turn.start), "-to", String(turn.end), "-c:a", "libmp3lame", "-q:a", "3", out]);
  }
  console.log(`✓ extracted ${plan.turns.length} turn audio segments`);

  // 2. upload each segment as an asset, 3. create one single-scene video per turn.
  //    (One video per turn — not 10-scene batches — so each clip maps 1:1 to a
  //    layout panel slot during local assembly.)
  const jobs = [];
  for (const turn of plan.turns) {
    const segBytes = readFileSync(join(REPO_ROOT, turn.audioSegmentPath));
    const asset = await api("/v1/asset", { base: UPLOAD, method: "POST", body: segBytes, contentType: "audio/mpeg" });
    const assetId = asset.id ?? asset.asset_id;
    const video = await api("/v2/video/generate", {
      method: "POST",
      body: {
        test: isTest,
        title: `${manifest.id} ${turn.turnId} ${turn.avatarId}`,
        dimension: { width: 1280, height: 720 },
        video_inputs: [
          {
            character: { type: "avatar", avatar_id: byId[turn.avatarId].heygenAvatarId, avatar_style: "normal" },
            voice: { type: "audio", audio_asset_id: assetId },
            background: { type: "color", value: "#0B1220" },
          },
        ],
      },
    });
    jobs.push({ turnId: turn.turnId, avatarId: turn.avatarId, audioAssetId: assetId, heygenVideoId: video.video_id, status: "submitted", clipPath: turn.avatarClipPath });
    console.log(`  ✓ ${turn.turnId}: submitted (video_id ${video.video_id})`);
    await new Promise((r) => setTimeout(r, 600)); // pace the API
  }
  saveJSON(jobsPath, { episodeId: manifest.id, submittedAt: new Date().toISOString(), test: isTest, jobs });
  updateManifest(mPath, { status: "heygen_rendering" });
  console.log(`\n✓ ${jobs.length} HeyGen jobs submitted → ${relPath(jobsPath)}`);
  console.log(`  poll + download: node scripts/podcast/render-avatar-video-heygen.mjs status ${manifest.id}`);
}

// ── status / download ───────────────────────────────────────────

if (command === "status") {
  requireKey();
  if (!existsSync(jobsPath)) {
    fail(`No HeyGen jobs file for "${manifest.id}"`, [`Run: node scripts/podcast/render-avatar-video-heygen.mjs generate ${manifest.id}`]);
  }
  const state = loadJSON(jobsPath);
  let done = 0, pending = 0, failed = 0;
  for (const job of state.jobs) {
    if (job.status === "downloaded") { done += 1; continue; }
    const st = await api(`/v1/video_status.get?video_id=${job.heygenVideoId}`);
    job.status = st.status;
    if (st.status === "completed" && st.video_url) {
      const out = join(REPO_ROOT, job.clipPath);
      mkdirSync(join(out, ".."), { recursive: true });
      const res = await fetch(st.video_url);
      await writeFile(out, Buffer.from(await res.arrayBuffer()));
      job.status = "downloaded";
      done += 1;
      console.log(`  ✓ ${job.turnId}: downloaded → ${job.clipPath}`);
    } else if (st.status === "failed") {
      failed += 1;
      console.log(`  ✗ ${job.turnId}: FAILED — ${JSON.stringify(st.error ?? {}).slice(0, 200)}`);
    } else {
      pending += 1;
      console.log(`  … ${job.turnId}: ${st.status}`);
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  saveJSON(jobsPath, state);
  console.log(`\n${done} downloaded, ${pending} pending, ${failed} failed (of ${state.jobs.length}).`);
  if (pending) console.log("Re-run this command in a few minutes.");
  if (!pending && !failed) {
    updateManifest(mPath, { status: "clips_rendered_heygen" });
    console.log(`All clips ready. Next: node scripts/podcast/assemble-roundtable-video.mjs ${manifest.id}`);
  }
}
