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

const routes: Record<ProgramKey, { today: string; scorecard: string }> = {
  mastery: { today: "/member-area/today/", scorecard: "/member-area/scorecards/" },
  alliance: { today: "/member-area/alliance-today/", scorecard: "/member-area/alliance-scorecard/" },
};

/**
 * Course Overview: the 12-week curriculum flow. Each week card expands into a
 * detail area with the coach overview video embedded INSIDE it (coach selector
 * for Edward/John/Craig where ready), week meta, and the next action.
 * Weeks without a completed render show a plain "Video pending" note.
 *
 * INTERNAL NOTE: Alliance temporarily plays the same weekly overview videos as
 * LO Mastery (sharedAcrossPrograms in the generated JSON) — program-specific
 * Alliance weeklies don't exist in HeyGen yet. Never surfaced to members.
 * See docs/HEYGEN_MISSING_VIDEOS.md.
 */
export default function CourseOverview({ program }: { program: ProgramKey }) {
  const weeksMeta: ProgramWeek[] = program === "alliance" ? allianceWeeks : masteryWeeks;
  const videos = (generated.videos as WeeklyVideo[]).filter((v) => v.program === program);
  const [openWeek, setOpenWeek] = useState<number>(1);
  const [coachByWeek, setCoachByWeek] = useState<Record<number, string>>({});

  return (
    <section className="rounded-2xl border border-lf-line bg-white shadow-card">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-lf-line px-4 py-2.5">
        <div>
          <h2 className="h-display text-xl">Course Overview</h2>
          <p className="text-sm text-lf-slate">
            What each week is about — watch this before starting the week.
          </p>
        </div>
        <p className="text-xs text-lf-slate">
          {videos.filter((v) => v.status === "completed").length} coach videos ready
        </p>
      </div>

      <div className="divide-y divide-lf-line">
        {weeksMeta.map((week) => {
          const isOpen = openWeek === week.week;
          const weekVideos = videos.filter((v) => v.week === week.week);
          const ready = COACH_ORDER.map((coach) =>
            weekVideos.find(
              (v) => v.coach === coach && v.status === "completed" && v.embedUrl,
            ),
          ).filter((v): v is WeeklyVideo => Boolean(v));
          const activeCoach =
            coachByWeek[week.week] && ready.some((v) => v.coach === coachByWeek[week.week])
              ? coachByWeek[week.week]
              : ready[0]?.coach;
          const active = ready.find((v) => v.coach === activeCoach);

          return (
            <div key={week.week}>
              <button
                type="button"
                onClick={() => setOpenWeek(isOpen ? 0 : week.week)}
                className="flex w-full items-baseline gap-3 px-4 py-3 text-left transition hover:bg-lf-mist"
              >
                <span className="shrink-0 text-sm font-black text-lf-orange">
                  W{week.week}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-lf-navy">{week.theme}</span>
                  <span className="block truncate text-sm text-lf-slate">
                    {week.actions[0]}
                  </span>
                </span>
                <span className="ml-auto shrink-0 text-xs font-semibold text-lf-slate">
                  {isOpen ? "Close" : "Open"}
                </span>
              </button>

              {isOpen && (
                <div className="grid gap-4 border-t border-lf-line bg-lf-mist/40 p-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
                  <div>
                    {ready.length > 1 && (
                      <div className="mb-2 flex flex-wrap gap-1.5">
                        {ready.map((v) => (
                          <button
                            key={v.coach}
                            type="button"
                            onClick={() =>
                              setCoachByWeek((current) => ({ ...current, [week.week]: v.coach }))
                            }
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
                          title={active.title ?? `Week ${week.week} overview video`}
                          loading="lazy"
                          allow="encrypted-media; fullscreen;"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed border-lf-line bg-white">
                        <p className="text-sm font-semibold text-lf-slate">
                          Video pending — this week&apos;s overview is still rendering in HeyGen.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                      Week {week.week} · {week.phase}
                    </p>
                    <h3 className="h-display mt-1 text-xl">{week.theme}</h3>
                    <p className="mt-2 text-sm leading-6 text-lf-charcoal">{week.actions[0]}</p>
                    <p className="mt-2 text-sm text-lf-slate">
                      <strong className="text-lf-navy">Tracked number:</strong> {week.number}
                    </p>
                    <p className="mt-1 text-sm text-lf-slate">
                      <strong className="text-lf-navy">Win condition:</strong> {week.win}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 border-t border-lf-line pt-3">
                      <Link href={routes[program].today} className="btn-primary">
                        Open Today
                      </Link>
                      <Link href={routes[program].scorecard} className="btn-secondary">
                        Open Scorecard
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
