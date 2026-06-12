"use client";

import { useState } from "react";
import Link from "next/link";
import generated from "@/data/weeklyCurriculumVideos.generated.json";
import {
  allianceWeeks,
  masteryWeeks,
  type ProgramKey,
  type ProgramWeek,
} from "@/data/coachingPlatform";

type WeeklyVideo = {
  program: string;
  week: number;
  weekLabel: string;
  coach: string;
  heygenVideoId: string | null;
  title: string | null;
  embedUrl: string | null;
  status: string;
};

const COACH_ORDER = ["Edward", "John", "Craig"];

const todayRoute: Record<ProgramKey, string> = {
  mastery: "/member-area/today/",
  alliance: "/member-area/alliance-today/",
};

/**
 * 12-week coaching video curriculum, generated from the HeyGen API by
 * scripts/sync-heygen-videos.mjs. Weeks with no completed render show a plain
 * "Video pending" note — never a fake player.
 *
 * INTERNAL NOTE: Alliance currently plays the same weekly videos as LO Mastery
 * (sharedAcrossPrograms flag in the generated JSON) because program-specific
 * weeklies don't exist in HeyGen yet. This is intentionally NOT surfaced to
 * members. See docs/HEYGEN_MISSING_VIDEOS.md for the create/rename list.
 */
export default function WeeklyCurriculumVideos({ program }: { program: ProgramKey }) {
  const weeksMeta: ProgramWeek[] = program === "alliance" ? allianceWeeks : masteryWeeks;
  const videos = (generated.videos as WeeklyVideo[]).filter((v) => v.program === program);
  const [week, setWeek] = useState(1);
  const [coachByWeek, setCoachByWeek] = useState<Record<number, string>>({});

  const weekVideos = videos.filter((v) => v.week === week);
  const ready = COACH_ORDER.map(
    (coach) => weekVideos.find((v) => v.coach === coach && v.status === "completed" && v.embedUrl),
  ).filter((v): v is WeeklyVideo => Boolean(v));
  const notReady = COACH_ORDER.filter(
    (coach) => !ready.some((v) => v.coach === coach),
  );
  const activeCoach =
    coachByWeek[week] && ready.some((v) => v.coach === coachByWeek[week])
      ? coachByWeek[week]
      : ready[0]?.coach;
  const active = ready.find((v) => v.coach === activeCoach);
  const meta = weeksMeta.find((w) => w.week === week);

  return (
    <section className="rounded-2xl border border-lf-line bg-white shadow-card">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-lf-line px-4 py-2.5">
        <h2 className="h-display text-xl">12-week coaching videos</h2>
        <p className="text-xs text-lf-slate">
          {videos.filter((v) => v.status === "completed").length} of {videos.length} ready
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 border-b border-lf-line p-3">
        {weeksMeta.map((w) => {
          const isActive = w.week === week;
          const hasVideo = videos.some((v) => v.week === w.week && v.status === "completed");
          return (
            <button
              key={w.week}
              type="button"
              onClick={() => setWeek(w.week)}
              className={`inline-flex items-center rounded-lg border px-2.5 py-1.5 text-sm font-semibold transition ${
                isActive
                  ? "border-lf-orange bg-lf-orange text-white"
                  : hasVideo
                    ? "border-lf-line bg-white text-lf-navy hover:border-lf-navy hover:bg-lf-mist"
                    : "border-lf-line bg-white text-lf-slate hover:border-lf-navy hover:bg-lf-mist"
              }`}
            >
              W{w.week}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div>
          {ready.length > 1 && (
            <div className="mb-2 flex flex-wrap gap-1.5">
              {ready.map((v) => (
                <button
                  key={v.coach}
                  type="button"
                  onClick={() => setCoachByWeek((current) => ({ ...current, [week]: v.coach }))}
                  className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-sm font-semibold transition ${
                    v.coach === activeCoach
                      ? "border-lf-navy bg-lf-navy text-white"
                      : "border-lf-line bg-white text-lf-navy hover:border-lf-navy hover:bg-lf-mist"
                  }`}
                >
                  Coach {v.coach}
                </button>
              ))}
            </div>
          )}
          {active ? (
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
              <iframe
                key={active.heygenVideoId}
                className="h-full w-full"
                src={active.embedUrl ?? undefined}
                title={active.title ?? `Week ${week} coaching video`}
                loading="lazy"
                allow="encrypted-media; fullscreen;"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed border-lf-line bg-lf-mist">
              <p className="text-sm font-semibold text-lf-slate">
                Video pending — this week&apos;s video is still rendering in HeyGen.
              </p>
            </div>
          )}
          {notReady.length > 0 && ready.length > 0 && (
            <p className="mt-2 text-xs text-lf-slate">
              Pending: {notReady.map((coach) => `Coach ${coach}`).join(", ")}
            </p>
          )}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
            Week {week}{meta ? ` · ${meta.phase}` : ""}
          </p>
          <h3 className="h-display mt-1 text-xl">{meta?.theme ?? `Week ${week}`}</h3>
          {meta && (
            <>
              <p className="mt-2 text-sm leading-6 text-lf-charcoal">{meta.actions[0]}</p>
              <p className="mt-2 text-sm text-lf-slate">
                <strong className="text-lf-navy">Tracked number:</strong> {meta.number}
              </p>
              <p className="mt-1 text-sm text-lf-slate">
                <strong className="text-lf-navy">Win condition:</strong> {meta.win}
              </p>
            </>
          )}
          <div className="mt-4 border-t border-lf-line pt-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
              Next action
            </p>
            <p className="mt-1 text-sm text-lf-charcoal">
              Watch the video, then log today&apos;s numbers.
            </p>
            <Link href={todayRoute[program]} className="btn-primary mt-2">
              Open Today
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
