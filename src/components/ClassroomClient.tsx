"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ProgramKey, ProgramWeek } from "@/data/coachingPlatform";

type Props = {
  weeks: ProgramWeek[];
  program: ProgramKey;
  storageKey: string;
};

const phaseColors: Record<string, string> = {
  Foundation: "bg-lf-orangeSoft text-lf-orange",
  Activity: "bg-lf-orangeSoft text-lf-orange",
  Conversion: "bg-lf-orangeSoft text-lf-orange",
  Partners: "bg-lf-orangeSoft text-lf-orange",
  Systems: "bg-lf-orangeSoft text-lf-orange",
  Growth: "bg-lf-orangeSoft text-lf-orange",
  Diagnose: "bg-lf-orangeSoft text-lf-orange",
  Demand: "bg-lf-orangeSoft text-lf-orange",
  Leverage: "bg-lf-orangeSoft text-lf-orange",
  People: "bg-lf-orangeSoft text-lf-orange",
  Scale: "bg-lf-orangeSoft text-lf-orange",
};

const lessonBody: Record<number, string> = {
  1: "Open the program. Set the 12-week goal, build the daily Power Block, and complete the onboarding business plan. The first lesson is about commitment, not activity.",
  2: "Time owns the week. Run theme days, protect the morning block, and remove one recurring distraction. The lesson is consistency over motivation.",
  3: "Database work is the foundation. Load 100+ contacts, tag the top 25, and call sphere using the check-in script. The lesson is volume + specificity.",
  4: "Real conversations are the unit of progress. Use FORD, capture one detail per call, and bring the scorecard to the first coach review.",
  5: "The buyer consultation is the conversion moment. Ask payment goal, cash-to-close, timeline, and ownership goal before you quote anything.",
  6: "Objections are not rejection. They are the next question. Drill three objections per day, log them, and bring the pattern to coaching.",
  7: "Realtor outreach is a relationship discipline. Build the 25-agent target list, lead with value, and book a 15-minute meeting before pitching.",
  8: "Winning the relationship is about follow-through. Run discovery, set a real next step, and complete the second coach review checkpoint.",
  9: "Pipeline discipline is a Tuesday habit. Call every active file, surface the stuck point, and write the next action on the tracker.",
  10: "Follow-up closes the loop. Work pre-approved buyers, re-engage quiet leads, and assign a next-action date to every open opportunity.",
  11: "Reviews and referrals are a system, not a one-time ask. Request reviews from happy clients and ask past clients and partners for introductions.",
  12: "The cycle ends with the next plan. Review the 12 weeks, choose the next weekly number, and lock the schedule for the next cycle.",
};

export default function ClassroomClient({ weeks, program, storageKey }: Props) {
  const [activeWeek, setActiveWeek] = useState<number>(weeks[0]?.week ?? 1);
  const [query, setQuery] = useState("");
  const [progress, setProgress] = useState<Record<number, boolean[]>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(storageKey);
    if (raw) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- restore browser-only saved state after hydration to avoid SSR/client mismatches.
        setProgress(JSON.parse(raw));
      } catch {
        // ignore
      }
    }
    setHydrated(true);
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [hydrated, progress, storageKey]);

  const current = weeks.find((w) => w.week === activeWeek) ?? weeks[0];
  const completedSteps = progress[current.week] ?? [];
  const totalCompleted = weeks.reduce(
    (sum, week) =>
      sum + (progress[week.week] ?? []).filter(Boolean).length,
    0,
  );
  const totalSteps = weeks.reduce((sum, week) => sum + week.actions.length, 0);
  const overallPercent = totalSteps > 0 ? Math.round((totalCompleted / totalSteps) * 100) : 0;

  const filteredWeeks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return weeks;
    return weeks.filter(
      (w) =>
        w.theme.toLowerCase().includes(q) ||
        w.phase.toLowerCase().includes(q) ||
        w.actions.some((a) => a.toLowerCase().includes(q)),
    );
  }, [weeks, query]);

  function toggleStep(weekNumber: number, index: number) {
    setProgress((current) => {
      const week = weeks.find((w) => w.week === weekNumber);
      if (!week) return current;
      const existing = current[weekNumber] ?? week.actions.map(() => false);
      const next = [...existing];
      next[index] = !next[index];
      return { ...current, [weekNumber]: next };
    });
  }

  const weekProgress = (week: ProgramWeek) => {
    const arr = progress[week.week] ?? week.actions.map(() => false);
    return arr.filter(Boolean).length;
  };

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-lf-line bg-white p-5 shadow-card">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              {program === "mastery" ? "LO Mastery" : "Loan Factory Alliance"} classroom
            </p>
            <h2 className="h-display mt-2 text-2xl">12 weekly modules</h2>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Open any week to read the lesson, run the assignment, and mark the steps complete. Progress saves locally.
            </p>
          </div>
          <div className="grid gap-2">
            <label className="grid gap-1 text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Search lessons
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Theme, phase, or action"
                className="h-11 rounded-lg border border-lf-line px-3 text-sm font-normal text-lf-charcoal outline-none focus:border-lf-orange"
              />
            </label>
            <div className="rounded-xl bg-lf-navy p-3 text-white">
              <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">Overall progress</p>
              <p className="mt-1 text-2xl font-black">{overallPercent}%</p>
              <p className="text-xs text-white/72">{totalCompleted} of {totalSteps} steps complete</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
        <nav className="grid gap-2 self-start">
          {filteredWeeks.map((week) => {
            const done = weekProgress(week);
            const total = week.actions.length;
            const isActive = week.week === activeWeek;
            return (
              <button
                key={week.week}
                type="button"
                onClick={() => setActiveWeek(week.week)}
                className={`rounded-2xl border p-4 text-left transition ${
                  isActive
                    ? "border-lf-orange bg-lf-orangeSoft"
                    : "border-lf-line bg-white hover:border-lf-orange"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black uppercase tracking-wide text-lf-orange">
                    Week {week.week}
                  </p>
                  <p className="text-xs font-semibold text-lf-slate">
                    {done}/{total}
                  </p>
                </div>
                <h3 className="h-display mt-2 text-lg">{week.theme}</h3>
                <p className="mt-1 text-xs font-semibold text-lf-slate">
                  {week.phase} · {week.number}
                </p>
              </button>
            );
          })}
          {filteredWeeks.length === 0 && (
            <p className="rounded-2xl border border-dashed border-lf-line bg-white p-6 text-sm text-lf-slate">
              No lessons match that search.
            </p>
          )}
        </nav>

        <article className="rounded-2xl border border-lf-line bg-white p-6 shadow-card">
          <p className="text-xs font-black uppercase tracking-wide text-lf-orange">
            Week {current.week} · {current.phase}
          </p>
          <h2 className="h-display mt-2 text-3xl">{current.theme}</h2>
          <p className="mt-2 text-sm font-semibold text-lf-slate">
            Tracked number: {current.number}
          </p>
          <p className="prose-lf mt-4 text-lf-slate">
            {lessonBody[current.week] ?? current.win}
          </p>

          <div className="mt-6 grid gap-3 rounded-xl bg-lf-mist p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Assignment
            </p>
            {current.actions.map((action, index) => {
              const checked = (progress[current.week] ?? [])[index] ?? false;
              return (
                <label
                  key={`${current.week}-${index}`}
                  className="flex items-start gap-3 rounded-lg bg-white p-3 text-sm leading-6 text-lf-charcoal"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleStep(current.week, index)}
                    className="mt-1 h-4 w-4 accent-lf-orange"
                  />
                  <span className={checked ? "line-through text-lf-slate" : ""}>{action}</span>
                </label>
              );
            })}
          </div>

          <p className="mt-6 border-l-2 border-lf-orange bg-lf-orangeSoft p-4 text-sm font-semibold text-lf-charcoal">
            Win condition: {current.win}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={program === "mastery" ? "/member-area/scorecards/" : "/member-area/alliance-scorecard/"}
              className="btn-primary"
            >
              Open scorecard
            </Link>
            <Link
              href={program === "mastery" ? "/member-area/trackers/" : "/member-area/alliance-trackers/"}
              className="btn-secondary"
            >
              Open trackers
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
