"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ProgramKey, ProgramWeek } from "@/data/coachingPlatform";

// Launch: Week 1 starts the week of Monday, June 22, 2026.
const LAUNCH_YEAR = 2026;
const LAUNCH_MONTH = 5; // June (0-indexed)
const LAUNCH_DAY = 22;

const ASSIGNMENTS = [
  "Watch this week's course overview video",
  "Hit the tracked number goal",
  "Practice the week's script out loud",
  "Submit the Friday scorecard",
];

type Store = {
  done: Record<number, boolean[]>;
  goals: Record<number, string>;
};

function weekOfLabel(week: number) {
  const date = new Date(LAUNCH_YEAR, LAUNCH_MONTH, LAUNCH_DAY + (week - 1) * 7);
  return date.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
}

function readStore(storageKey: string): Store | null {
  if (typeof window === "undefined") return null;
  const saved = window.localStorage.getItem(storageKey);
  if (!saved) return null;
  try {
    return JSON.parse(saved) as Store;
  } catch {
    window.localStorage.removeItem(storageKey);
    return null;
  }
}

const routes: Record<ProgramKey, { scorecard: string; resources: string }> = {
  mastery: { scorecard: "/member-area/scorecards/", resources: "/member-area/resources/" },
  alliance: {
    scorecard: "/member-area/alliance-scorecard/",
    resources: "/member-area/alliance-resources/",
  },
};

/**
 * The live 12-week training schedule. Real training content: launch dates,
 * talking points, assignments, adjustable goals. Training videos are honestly
 * marked as coming soon — the weekly OVERVIEW videos live in Course Overview.
 */
export default function TrainingWeeks({
  program,
  weeks,
}: {
  program: ProgramKey;
  weeks: ProgramWeek[];
}) {
  const storageKey = `lf-training-${program}`;
  const [store, setStore] = useState<Store>({ done: {}, goals: {} });
  const [hydrated, setHydrated] = useState(false);
  const [openWeek, setOpenWeek] = useState(1);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restore browser-only saved state after hydration to avoid SSR/client mismatches.
    setStore(readStore(storageKey) ?? { done: {}, goals: {} });
    setHydrated(true);
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(storageKey, JSON.stringify(store));
  }, [hydrated, store, storageKey]);

  function toggle(week: number, index: number) {
    setStore((current) => {
      const list = [...(current.done[week] ?? ASSIGNMENTS.map(() => false))];
      list[index] = !list[index];
      return { ...current, done: { ...current.done, [week]: list } };
    });
  }

  return (
    <section className="rounded-2xl border border-lf-line bg-white shadow-card">
      <div className="border-b border-lf-line px-4 py-2.5">
        <h2 className="h-display text-xl">Live training schedule</h2>
        <p className="text-sm text-lf-slate">
          Twelve weeks, starting the week of {weekOfLabel(1)}. Full live training time and
          day will be sent by Google Calendar invite.
        </p>
      </div>

      <div className="divide-y divide-lf-line">
        {weeks.map((week) => {
          const isOpen = openWeek === week.week;
          const done = store.done[week.week] ?? ASSIGNMENTS.map(() => false);
          const goal = store.goals[week.week] ?? "";
          return (
            <div key={week.week}>
              <button
                type="button"
                onClick={() => setOpenWeek(isOpen ? 0 : week.week)}
                className="flex w-full items-baseline gap-3 px-4 py-3 text-left transition hover:bg-lf-mist"
              >
                <span className="shrink-0 text-sm font-black text-lf-orange">W{week.week}</span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-lf-navy">{week.theme}</span>
                  <span className="block text-sm text-lf-slate">
                    Week of {weekOfLabel(week.week)}
                  </span>
                </span>
                <span className="ml-auto shrink-0 text-xs font-semibold text-lf-slate">
                  {done.filter(Boolean).length}/{ASSIGNMENTS.length} · {isOpen ? "Close" : "Open"}
                </span>
              </button>

              {isOpen && (
                <div className="grid gap-4 border-t border-lf-line bg-lf-mist/40 p-4 lg:grid-cols-2">
                  <div>
                    <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed border-lf-line bg-white">
                      <p className="px-4 text-center text-sm font-semibold text-lf-slate">
                        The live group training recording will be posted here after the session
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-lf-slate">
                      Live training time and day come by Google Calendar invite. The weekly
                      overview video (Course Overview tab) is a short preview of the week —
                      it is not the live training.
                    </p>
                    <div className="mt-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                        Talking points
                      </p>
                      <ul className="mt-1 grid gap-1">
                        {week.actions.map((point) => (
                          <li key={point} className="border-l-2 border-lf-line pl-3 text-sm text-lf-charcoal">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                      Week {week.week} · {week.phase}
                    </p>
                    <label className="mt-2 grid gap-1 text-xs font-semibold uppercase tracking-wide text-lf-slate">
                      This week&apos;s goal (recommended: {week.number})
                      <input
                        value={goal}
                        placeholder={week.number}
                        onChange={(event) =>
                          setStore((current) => ({
                            ...current,
                            goals: { ...current.goals, [week.week]: event.target.value },
                          }))
                        }
                        className="h-9 rounded-lg border border-lf-line bg-white px-2 text-sm font-normal normal-case tracking-normal text-lf-charcoal outline-none focus:border-lf-orange"
                      />
                    </label>
                    <p className="mt-2 text-sm text-lf-slate">
                      <strong className="text-lf-navy">Win condition:</strong> {week.win}
                    </p>
                    <div className="mt-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                        Assignments
                      </p>
                      <div className="mt-1 grid gap-1">
                        {ASSIGNMENTS.map((item, index) => (
                          <label key={item} className="flex items-start gap-2 text-sm text-lf-charcoal">
                            <input
                              type="checkbox"
                              checked={done[index] ?? false}
                              onChange={() => toggle(week.week, index)}
                              className="mt-1 h-4 w-4 accent-lf-orange"
                            />
                            <span className={done[index] ? "text-lf-slate line-through" : ""}>
                              {item}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2 border-t border-lf-line pt-3">
                      <Link href={routes[program].scorecard} className="btn-primary">
                        Open Scorecard
                      </Link>
                      <Link href={`${routes[program].resources}?tab=course-overview`} className="btn-secondary">
                        Open Course Overview
                      </Link>
                      <Link href={`${routes[program].resources}?tab=scripts`} className="btn-secondary">
                        Scripts
                      </Link>
                      <Link href={`${routes[program].resources}?tab=tools`} className="btn-secondary">
                        Tools
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
