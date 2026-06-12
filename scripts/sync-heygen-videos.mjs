#!/usr/bin/env node
/**
 * Regenerate the app's HeyGen video data from the HeyGen API:
 *   - src/data/dailyVideos.generated.json            (Today page)
 *   - src/data/weeklyCurriculumVideos.generated.json (Resource Library > Training)
 *
 * Usage: node scripts/sync-heygen-videos.mjs
 * Requires the authenticated HeyGen CLI (`heygen auth status`).
 *
 * NAMING CONVENTION (preferred — enables fully automatic sync):
 *   Daily:  "Daily LO Mastery Monday" ... "Daily Alliance Weekend"
 *   Weekly: "LO Mastery Week 01 Edward" / "Alliance Week 01 Craig" ... Week 12
 *
 * Until HeyGen titles are renamed to the convention, this script falls back to:
 *   Daily:  the verified DAILY_SEED ids below
 *   Weekly: legacy titles "w<N> - Edward|John P|Craig B" — the SAME video is
 *           mapped to BOTH programs (no program-specific weekly videos exist
 *           in HeyGen yet) and the newest completed render wins (so landscape
 *           re-renders replace older vertical originals automatically).
 *
 * Embeds always use https://app.heygen.com/embeds/<video_id> (stable).
 * Signed MP4 `video_url`s expire within days — stored only as fallbackDownloadUrl.
 */
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const PROGRAMS = ["mastery", "alliance"];
const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "weekend"];
const COACHES = ["Edward", "John", "Craig"];
const WEEKS = Array.from({ length: 12 }, (_, i) => i + 1);

const PROGRAM_LABEL = { mastery: "LO Mastery", alliance: "Alliance" };
const DAY_LABEL = {
  monday: "Monday", tuesday: "Tuesday", wednesday: "Wednesday",
  thursday: "Thursday", friday: "Friday", weekend: "Weekend",
};

// Verified daily ids (from the program video docs + HeyGen API validation).
const DAILY_SEED = {
  mastery: {
    monday: "43849ae965234f2d81fb1f159a68633d",
    tuesday: "690296bf189f4a2fb18542a4a0996f7e",
    wednesday: "2d269223555e414ba297cd3d28dd0eed",
    thursday: "e9e9b6d41110486592f567f4d6fcb6c7",
    friday: "5fda9c4fecd94e02afb8c58401bf7e33",
    weekend: "c908b1b432b949b88a29b3845fbaea39",
  },
  alliance: {
    monday: "8594f11c427a40ccb69b492a0b99e56f",
    tuesday: "065fac429034460385d4dda8f3277571",
    wednesday: "3d855963243f45508e87faaa6631fc66",
    thursday: "d72baeffcaf94682bc43f820aa169d7f",
    friday: "d0865cbe81084ee891e0a57348853643",
    weekend: "c049167ef09b4f76bb5534b9579b0241",
  },
};

// Legacy weekly title pattern: "w4 - Craig B - Craig B"
const LEGACY_WEEKLY = /^w(\d{1,2})\s*-\s*(Edward|John P|Craig B)\b/i;
const LEGACY_COACH = { edward: "Edward", "john p": "John", "craig b": "Craig" };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function cli(args) {
  const raw = execFileSync("heygen", args, { encoding: "utf8" });
  return JSON.parse(raw);
}

async function cliRetry(args, tries = 4) {
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      return cli(args);
    } catch (error) {
      if (attempt === tries) throw error;
      await sleep(2500 * attempt);
    }
  }
}

async function listAllVideos() {
  const all = [];
  let token = null;
  for (let page = 0; page < 10; page++) {
    const args = ["video", "list", "--limit", "50"];
    if (token) args.push("--token", token);
    const res = await cliRetry(args);
    const vids = Array.isArray(res.data) ? res.data : res.data?.videos ?? [];
    all.push(...vids);
    token = res.token ?? res.pagination?.token ?? res.next_page_token ?? null;
    if (!token || vids.length === 0) break;
    await sleep(800);
  }
  return all;
}

async function videoDetail(id) {
  const res = await cliRetry(["video", "get", id]);
  await sleep(700); // pace the API — burst calls get throttled
  return res.data;
}

function entryFrom(detail, base) {
  return {
    ...base,
    heygenVideoId: detail.id,
    title: detail.title,
    embedUrl: `https://app.heygen.com/embeds/${detail.id}`,
    playbackUrl: detail.video_page_url ?? `https://app.heygen.com/videos/${detail.id}`,
    fallbackDownloadUrl: detail.video_url ?? null,
    thumbnailUrl: detail.thumbnail_url ?? null,
    durationSeconds: detail.duration ? Math.round(detail.duration) : null,
    status: detail.status,
    lastSyncedAt: new Date().toISOString(),
  };
}

// Feed coaching videos — the "First Six Daily coaching videos" HeyGen folder.
// One coach per day + Jeremy's welcome (Start Here). NOTE the known title
// corrections: Craig's video is titled "Thusday" in HeyGen but IS the Tuesday
// video; Jeremy's "Saturday" video is the weekend video.
const FEED_FOLDER_PROBE_TITLE = "welcome - jeremy";
const FEED_COACH_TO_DAY = [
  { match: /welcome/i, slot: "start_here", coach: "Jeremy" },
  { match: /edward/i, slot: "monday", coach: "Edward" },
  { match: /craig/i, slot: "tuesday", coach: "Craig" },
  { match: /john/i, slot: "wednesday", coach: "John" },
  { match: /andre/i, slot: "thursday", coach: "Andre" },
  { match: /thuan/i, slot: "friday", coach: "Thuan" },
  { match: /saturday|weekend/i, slot: "weekend", coach: "Jeremy" },
];

const renamesNeeded = [];
const warnings = [];

const allVideos = await listAllVideos();
const byTitle = new Map();
for (const v of allVideos) {
  const t = (v.title ?? "").trim().toLowerCase();
  if (!byTitle.has(t)) byTitle.set(t, []);
  byTitle.get(t).push(v);
}
console.log(`Fetched ${allVideos.length} videos from HeyGen.`);

// ── Daily videos ───────────────────────────────────────────────
const dailyEntries = [];
for (const program of PROGRAMS) {
  for (const day of DAYS) {
    const conventionTitle = `Daily ${PROGRAM_LABEL[program]} ${DAY_LABEL[day]}`;
    const matches = (byTitle.get(conventionTitle.toLowerCase()) ?? [])
      .filter((v) => v.status === "completed")
      .sort((a, b) => (b.created_at ?? 0) - (a.created_at ?? 0));
    let id = matches[0]?.id;
    if (!id) {
      id = DAILY_SEED[program][day];
      renamesNeeded.push(`Rename daily video to "${conventionTitle}" (currently seeded by id ${id})`);
    }
    const detail = await videoDetail(id);
    if (detail.status !== "completed") {
      warnings.push(`daily ${program}/${day}: ${id} status "${detail.status}"`);
    }
    dailyEntries.push(entryFrom(detail, { program, day }));
    process.stdout.write(`✓ daily ${program}/${day}: ${detail.title} (${detail.status})\n`);
  }
}

// ── Feed coaching videos (Start Here + one coach per day) ─────
const feedProbe = allVideos.find((v) =>
  (v.title ?? "").toLowerCase().startsWith(FEED_FOLDER_PROBE_TITLE),
);
const feedEntries = [];
if (!feedProbe?.folder_id) {
  warnings.push('feed: could not locate the "First Six Daily coaching videos" folder (no "Welcome - Jeremy" video found)');
} else {
  const folderVideos = allVideos.filter((v) => v.folder_id === feedProbe.folder_id);
  for (const rule of FEED_COACH_TO_DAY) {
    const candidates = folderVideos.filter((v) => {
      const title = v.title ?? "";
      if (rule.slot === "start_here") return /welcome/i.test(title);
      if (rule.coach === "Jeremy") return rule.match.test(title) && !/welcome/i.test(title);
      return rule.match.test(title);
    });
    const best = candidates
      .filter((v) => v.status === "completed")
      .sort((a, b) => (b.created_at ?? 0) - (a.created_at ?? 0))[0];
    if (!best) {
      warnings.push(`feed ${rule.slot}: no completed video for ${rule.coach} in the feed folder`);
      continue;
    }
    if (candidates.length > 1) {
      warnings.push(`feed ${rule.slot}: ${candidates.length} candidates for ${rule.coach} — using newest completed`);
    }
    const detail = await videoDetail(best.id);
    feedEntries.push({ slot: rule.slot, coach: rule.coach, ...entryFrom(detail, {}) });
    process.stdout.write(`✓ feed ${rule.slot}: ${rule.coach} — ${detail.title} (${detail.status})\n`);
  }
}

// ── Weekly curriculum videos ───────────────────────────────────
// Candidates per (program, week, coach): convention titles first, legacy fallback.
const legacyByWeekCoach = new Map();
for (const v of allVideos) {
  const m = LEGACY_WEEKLY.exec(v.title ?? "");
  if (!m) continue;
  const week = Number(m[1]);
  const coach = LEGACY_COACH[m[2].toLowerCase()];
  if (!coach || week < 1 || week > 12) continue;
  const key = `${week}|${coach}`;
  if (!legacyByWeekCoach.has(key)) legacyByWeekCoach.set(key, []);
  legacyByWeekCoach.get(key).push(v);
}

function pickBest(candidates) {
  if (!candidates || candidates.length === 0) return null;
  const completed = candidates
    .filter((v) => v.status === "completed")
    .sort((a, b) => (b.created_at ?? 0) - (a.created_at ?? 0));
  if (completed.length > 0) return { video: completed[0], pending: false };
  const newest = [...candidates].sort((a, b) => (b.created_at ?? 0) - (a.created_at ?? 0))[0];
  return { video: newest, pending: true };
}

const weeklyEntries = [];
let legacyUsed = false;
for (const program of PROGRAMS) {
  for (const week of WEEKS) {
    for (const coach of COACHES) {
      const padded = String(week).padStart(2, "0");
      const conventionTitle = `${PROGRAM_LABEL[program]} Week ${padded} ${coach}`;
      let candidates = byTitle.get(conventionTitle.toLowerCase()) ?? [];
      let viaLegacy = false;
      if (candidates.length === 0) {
        candidates = legacyByWeekCoach.get(`${week}|${coach}`) ?? [];
        viaLegacy = candidates.length > 0;
      }
      const best = pickBest(candidates);
      const base = { program, week, weekLabel: `Week ${week}`, coach };
      if (!best) {
        weeklyEntries.push({
          ...base,
          heygenVideoId: null, title: null, embedUrl: null, playbackUrl: null,
          fallbackDownloadUrl: null, thumbnailUrl: null, durationSeconds: null,
          status: "missing", lastSyncedAt: new Date().toISOString(),
        });
        warnings.push(`weekly ${program}/W${padded}/${coach}: no HeyGen video found`);
        continue;
      }
      if (viaLegacy) {
        legacyUsed = true;
      }
      const detail = await videoDetail(best.video.id);
      weeklyEntries.push(entryFrom(detail, base));
      process.stdout.write(
        `✓ weekly ${program}/W${padded}/${coach}: ${detail.title} (${detail.status})\n`,
      );
    }
  }
}

if (legacyUsed) {
  renamesNeeded.push(
    'Weekly videos matched via legacy "w<N> - <Coach>" titles and are SHARED across both programs. ' +
      'Rename in HeyGen to "LO Mastery Week 01 Edward" / "Alliance Week 01 Edward" (… through Week 12) ' +
      "for automatic, program-specific sync.",
  );
}

// TEMPORARY SHARED WEEKLY CONTENT: when legacy "w<N> - <Coach>" titles are the
// source, the SAME HeyGen video is mapped to both LO Mastery and Alliance for
// every week/coach slot. This is an internal stopgap — members are never told
// the content is shared. True Alliance weeklies must be created in HeyGen
// under "Alliance Week NN <Coach>" titles; this script will then split the
// programs automatically. See docs/HEYGEN_MISSING_VIDEOS.md.
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
writeFileSync(
  join(root, "src", "data", "dailyVideos.generated.json"),
  JSON.stringify({ syncedAt: new Date().toISOString(), videos: dailyEntries }, null, 2) + "\n",
);
writeFileSync(
  join(root, "src", "data", "feedCoachingVideos.generated.json"),
  JSON.stringify({ syncedAt: new Date().toISOString(), videos: feedEntries }, null, 2) + "\n",
);
writeFileSync(
  join(root, "src", "data", "weeklyCurriculumVideos.generated.json"),
  JSON.stringify(
    { syncedAt: new Date().toISOString(), sharedAcrossPrograms: legacyUsed, videos: weeklyEntries },
    null,
    2,
  ) + "\n",
);

console.log("\n══ FINAL MAPPING ══");
console.log("Start Here / Feed daily (both programs):");
for (const e of feedEntries) {
  console.log(`  ${e.slot.padEnd(11)} | ${e.coach.padEnd(7)} | ${e.heygenVideoId} | ${e.embedUrl}`);
}
console.log("Today page Daily Theme videos:");
for (const e of dailyEntries) {
  console.log(`  ${e.program.padEnd(8)} | ${e.day.padEnd(9)} | ${e.heygenVideoId} | ${e.embedUrl}`);
}
console.log("Weekly curriculum:");
for (const e of weeklyEntries) {
  console.log(`  ${e.program.padEnd(8)} | W${String(e.week).padEnd(2)} | ${(e.coach ?? "").padEnd(7)} | ${e.heygenVideoId ?? "MISSING"} | ${e.embedUrl ?? ""}`);
}

const pendingCount = weeklyEntries.filter((e) => e.status !== "completed").length;
console.log(`\nWrote ${dailyEntries.length} daily + ${weeklyEntries.length} weekly entries.`);
if (warnings.length > 0) {
  console.log(`\nWarnings (${warnings.length}):\n` + warnings.map((w) => `  ! ${w}`).join("\n"));
}
if (renamesNeeded.length > 0) {
  console.log(`\nRenames needed for automatic sync:\n` + renamesNeeded.map((r) => `  → ${r}`).join("\n"));
}
const dailyBroken = dailyEntries.filter((e) => e.status !== "completed").length;
if (dailyBroken > 0) {
  console.error(`\nFAIL: ${dailyBroken} daily videos are not completed.`);
  process.exit(1);
}
console.log(`\nWeekly pending/missing: ${pendingCount} (UI shows "Video pending" for these).`);
