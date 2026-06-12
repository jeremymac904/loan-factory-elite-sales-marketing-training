#!/usr/bin/env node
/**
 * Create (or refresh) a podcast episode manifest for an audio file.
 *
 * Usage:
 *   node scripts/podcast/create-podcast-manifest.mjs podcast/inbox/episode.mp3 [options]
 *   node scripts/podcast/create-podcast-manifest.mjs --all          # every inbox file without a manifest
 *
 * Options:
 *   --title "Episode Title"          default: derived from filename
 *   --topic-lane "sales-marketing"   default: general
 *   --language en                    default: en
 *   --source-notebook "name"         default: open-notebook
 *   --episode 12                     default: next number across manifests
 *   --speakers 2                     default: 2 (NotebookLM/Open Notebook podcasts are 2-host)
 *   --avatars jeremy,edward          default: chosen later by create-video-plan.mjs
 *   --platforms community_feed,podcast_library,daily_email,youtube_queue
 *   --force                          overwrite an existing manifest
 */
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import {
  PATHS, slugify, saveJSON, loadJSON, fail, ffprobeDuration, hasCommand,
  listInboxAudio, listManifests, manifestPath, relPath, basenameNoExt,
} from "./lib.mjs";

const args = process.argv.slice(2);
function opt(name, fallback = null) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}
const flag = (name) => args.includes(`--${name}`);

const DEFAULT_PLATFORMS = ["community_feed", "podcast_library", "daily_email", "youtube_queue"];

function titleFromSlug(slug) {
  return slug.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function nextEpisodeNumber() {
  let max = 0;
  for (const { path } of listManifests()) {
    const m = loadJSON(path);
    if (typeof m.episodeNumber === "number") max = Math.max(max, m.episodeNumber);
  }
  return max + 1;
}

function createFor(file, episodeNumber) {
  const abs = resolve(file);
  if (!existsSync(abs)) {
    fail(`Audio file not found: ${file}`, [
      "Drop the MP3 into podcast/inbox/ first, e.g.:",
      "  cp ~/Downloads/episode.mp3 podcast/inbox/",
    ]);
  }
  const slug = slugify(basenameNoExt(abs));
  const outPath = manifestPath(slug);
  if (existsSync(outPath) && !flag("force")) {
    console.log(`= manifest already exists (use --force to overwrite): ${relPath(outPath)}`);
    return null;
  }

  const avatarsOpt = opt("avatars");
  const manifest = {
    id: slug,
    title: opt("title", titleFromSlug(slug)),
    topicLane: opt("topic-lane", "general"),
    language: opt("language", "en"),
    sourceNotebook: opt("source-notebook", "open-notebook"),
    episodeNumber,
    filePath: relPath(abs),
    durationSeconds: hasCommand("ffprobe") ? ffprobeDuration(abs) : null,
    status: "new",
    transcriptPath: null,
    speakerCount: Number(opt("speakers", "2")),
    assignedAvatars: avatarsOpt ? avatarsOpt.split(",").map((s) => s.trim()) : [],
    videoPlanPath: null,
    videoOutputPath: null,
    platformDestinations: (opt("platforms") ?? DEFAULT_PLATFORMS.join(","))
      .split(",")
      .map((s) => s.trim()),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  saveJSON(outPath, manifest);
  console.log(`✓ wrote ${relPath(outPath)}  (episode ${episodeNumber}, "${manifest.title}")`);
  console.log(`  next: node scripts/podcast/transcribe-podcast.mjs ${slug}`);
  return manifest;
}

if (flag("all")) {
  const files = listInboxAudio();
  if (files.length === 0) {
    fail("No audio files in podcast/inbox/", [`Inbox: ${relPath(PATHS.inbox)}`]);
  }
  let ep = nextEpisodeNumber();
  for (const f of files) {
    if (createFor(f, ep)) ep += 1;
  }
} else {
  const file = args.find((a) => !a.startsWith("--") && !args[args.indexOf(a) - 1]?.startsWith("--"));
  if (!file) {
    fail("No audio file given", [
      "Usage: node scripts/podcast/create-podcast-manifest.mjs podcast/inbox/<file>.mp3",
      "   or: node scripts/podcast/create-podcast-manifest.mjs --all",
    ]);
  }
  createFor(file, Number(opt("episode", String(nextEpisodeNumber()))));
}
