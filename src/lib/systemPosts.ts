"use client";

import feedVideos from "@/data/feedCoachingVideos.generated.json";
import weeklyVideos from "@/data/weeklyCurriculumVideos.generated.json";
import { currentDayKey, todayDays } from "@/data/todaySystem";
import {
  allianceWeeks,
  masteryWeeks,
  type CommunityPost,
  type ProgramKey,
} from "@/data/coachingPlatform";

/**
 * Client-side fallback for the automatic coaching posts. The real posts live
 * in feed_posts (kind daily/weekly, seeded by scripts/seed-coaching-posts.mjs);
 * these synthesized copies render when the cloud is unreachable (local review,
 * signed-out preview) so the feed never looks empty. Keep titles/bodies in
 * sync with the seed script.
 */

export type SystemPost = CommunityPost & { kind: "start" | "daily" | "weekly"; refKey: string };

// Week 1 starts the week of Monday, June 22, 2026.
export function currentLaunchWeek(now: Date = new Date()): number {
  const launch = new Date(2026, 5, 22);
  const diff = Math.floor((now.getTime() - launch.getTime()) / (7 * 24 * 3600 * 1000));
  return Math.min(12, Math.max(1, diff + 1));
}

type FeedVideo = { slot: string; coach: string; embedUrl: string; status: string };

export function buildSystemPosts(program: ProgramKey): SystemPost[] {
  const posts: SystemPost[] = [];
  const feed = feedVideos.videos as FeedVideo[];

  const startHere = feed.find((v) => v.slot === "start_here" && v.status === "completed");
  if (startHere) {
    posts.push({
      author: "Jeremy McDonald",
      role: "Coach",
      category: "Pinned",
      title: "Start Here: How To Use The Coaching Platform",
      body: "Welcome to the coaching platform. Watch this first — Jeremy walks through exactly how the platform works: the Feed is your coaching hub, Today is where you log your numbers, the Scorecard goes to your coach every Friday, and Resources holds your scripts and tools. Questions? Drop them in the comments.",
      comments: [],
      pinned: true,
      youtubeUrl: startHere.embedUrl,
      kind: "start",
      refKey: "start_here",
    });
  }

  for (const day of todayDays) {
    const video = feed.find((v) => v.slot === day.key && v.status === "completed");
    if (!video) continue;
    posts.push({
      author: `Coach ${video.coach}`,
      role: "Coach",
      category: "Daily",
      title: `${day.day} Coaching with ${video.coach}`,
      body: `${day.day}'s coaching message from Coach ${video.coach}. Watch it, then log your numbers in Today. Questions or wins? Drop them in the comments.`,
      comments: [],
      pinned: true,
      youtubeUrl: video.embedUrl,
      kind: "daily",
      refKey: day.key,
    });
  }

  const weeksMeta = program === "alliance" ? allianceWeeks : masteryWeeks;
  for (const week of weeksMeta) {
    const video = (weeklyVideos.videos as { program: string; week: number; embedUrl: string | null; status: string }[]).find(
      (v) => v.program === program && v.week === week.week && v.status === "completed" && v.embedUrl,
    );
    if (!video?.embedUrl) continue;
    posts.push({
      author: "Loan Factory Coaching",
      role: "Coach",
      category: "Weekly",
      title: `Week ${week.week}: ${week.theme}`,
      body: [
        week.actions[0],
        "",
        "This week's assignments:",
        "- Watch the coaching video above",
        `- Hit the tracked number: ${week.number}`,
        "- Practice the week's script out loud",
        "- Submit the Friday scorecard",
        "",
        `Win condition: ${week.win}`,
        "",
        "Use the comments as this week's discussion thread — post your numbers, stuck points, and wins.",
      ].join("\n"),
      comments: [],
      youtubeUrl: video.embedUrl,
      kind: "weekly",
      refKey: `w${week.week}`,
    });
  }

  return posts;
}

export function isTodaysDaily(refKey: string, now: Date = new Date()): boolean {
  return refKey === currentDayKey(now);
}

export function isCurrentWeekly(refKey: string, now: Date = new Date()): boolean {
  return refKey === `w${currentLaunchWeek(now)}`;
}
