#!/usr/bin/env node
/**
 * Generate the SQL that seeds the automatic coaching posts in feed_posts:
 *   - 6 daily coaching video posts per program (kind='daily', pinned)
 *   - 12 weekly coaching posts per program (kind='weekly')
 *
 * Idempotent: the SQL deletes existing kind daily/weekly rows first.
 * Usage: node scripts/seed-coaching-posts.mjs > /tmp/seed-posts.sql
 * Run the output against Supabase (MCP execute_sql or psql).
 *
 * The same titles/bodies are synthesized client-side in CommunityFeed as a
 * fallback when the cloud is unavailable — keep both in sync.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
// System posts are authored by the master admin account.
const AUTHOR_ID = "5edc282b-e5cc-418f-9d57-90b61047bb1c";

const feed = JSON.parse(readFileSync(join(root, "src/data/feedCoachingVideos.generated.json"), "utf8"));
const weekly = JSON.parse(
  readFileSync(join(root, "src/data/weeklyCurriculumVideos.generated.json"), "utf8"),
);
const todaySrc = readFileSync(join(root, "src/data/todaySystem.ts"), "utf8");
const platformSrc = readFileSync(join(root, "src/data/coachingPlatform.ts"), "utf8");

// Parse day themes/instructions from todaySystem.ts
const dayMeta = {};
for (const m of todaySrc.matchAll(
  /key: "(\w+)",\s*day: "([^"]+)",\s*theme: "([^"]+)",\s*instruction:\s*"([^"]+)"/g,
)) {
  dayMeta[m[1]] = { day: m[2], theme: m[3], instruction: m[4] };
}

// Parse program weeks (theme, number, win, first action) from coachingPlatform.ts
function parseWeeks(constName) {
  const start = platformSrc.indexOf(`export const ${constName}`);
  const end = platformSrc.indexOf("\n];", start);
  const block = platformSrc.slice(start, end);
  const weeks = [];
  for (const m of block.matchAll(
    /week: (\d+),\s*theme: "([^"]+)",\s*number: "([^"]+)",\s*phase: "([^"]+)",\s*actions: \[\s*"([^"]+)"/g,
  )) {
    weeks.push({ week: Number(m[1]), theme: m[2], number: m[3], firstAction: m[5] });
  }
  const wins = [...block.matchAll(/win: "([^"]+)"/g)].map((m) => m[1]);
  weeks.forEach((w, i) => (w.win = wins[i] ?? ""));
  return weeks;
}
const weeksByProgram = { mastery: parseWeeks("masteryWeeks"), alliance: parseWeeks("allianceWeeks") };

const esc = (s) => String(s).replace(/'/g, "''");
const rows = [];

// Start Here + the six feed coaching videos (one coach per day) — the
// "First Six Daily coaching videos" HeyGen folder. Same set for both programs.
const startHere = feed.videos.find((v) => v.slot === "start_here");
for (const program of ["mastery", "alliance"]) {
  if (startHere) {
    const body = "Welcome to the coaching platform. Watch this first — Jeremy walks through exactly how the platform works: the Feed is your coaching hub, Today is where you log your numbers, the Scorecard goes to your coach every Friday, and Resources holds your scripts and tools. Questions? Drop them in the comments.";
    rows.push(
      `('${AUTHOR_ID}', '${program}', 'Jeremy McDonald', 'Coach', 'Pinned', 'Start Here: How To Use The Coaching Platform', '${esc(body)}', '${startHere.embedUrl}', true, 'start', 'start_here')`,
    );
  }
  for (const v of feed.videos) {
    if (v.slot === "start_here") continue;
    const meta = dayMeta[v.slot];
    if (!meta) continue;
    const title = `${meta.day} Coaching with ${v.coach}`;
    const body = `${meta.day}'s coaching message from Coach ${v.coach}. Watch it, then log your numbers in Today. Questions or wins? Drop them in the comments.`;
    rows.push(
      `('${AUTHOR_ID}', '${program}', 'Coach ${esc(v.coach)}', 'Coach', 'Daily', '${esc(title)}', '${esc(body)}', '${v.embedUrl}', true, 'daily', '${v.slot}')`,
    );
  }
}

const byProgramWeekCoach = {};
for (const v of weekly.videos) {
  if (v.status !== "completed") continue;
  byProgramWeekCoach[`${v.program}|${v.week}|${v.coach}`] = v;
}

for (const program of ["mastery", "alliance"]) {
  for (const w of weeksByProgram[program]) {
    const video =
      byProgramWeekCoach[`${program}|${w.week}|Edward`] ??
      byProgramWeekCoach[`${program}|${w.week}|John`] ??
      byProgramWeekCoach[`${program}|${w.week}|Craig`];
    if (!video) continue;
    const title = `Week ${w.week}: ${w.theme}`;
    const body = [
      w.firstAction,
      "",
      "This week's assignments:",
      "- Watch the coaching video above",
      `- Hit the tracked number: ${w.number}`,
      "- Practice the week's script out loud",
      "- Submit the Friday scorecard",
      "",
      `Win condition: ${w.win}`,
      "",
      "Use the comments as this week's discussion thread — post your numbers, stuck points, and wins.",
    ].join("\n");
    rows.push(
      `('${AUTHOR_ID}', '${program}', 'Loan Factory Coaching', 'Coach', 'Weekly', '${esc(title)}', '${esc(body)}', '${video.embedUrl}', false, 'weekly', 'w${w.week}')`,
    );
  }
}

console.log(`-- ${rows.length} automatic coaching posts (idempotent upsert by program+kind+ref_key)
insert into public.feed_posts
  (user_id, program, author_name, author_role, category, title, body, youtube_url, pinned, kind, ref_key)
values
${rows.join(",\n")}
on conflict (program, kind, ref_key) where kind <> 'member'
do update set
  author_name = excluded.author_name,
  category = excluded.category,
  title = excluded.title,
  body = excluded.body,
  youtube_url = excluded.youtube_url,
  pinned = excluded.pinned;`);
