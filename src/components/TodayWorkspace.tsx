"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FOCUS_FIELD,
  NOTE_FIELD,
  PLAN_FIELD,
  STUCK_FIELD,
  WIN_FIELD,
  currentDayKey,
  dailyCountFields,
  todayDays,
  type TodayDay,
} from "@/data/todaySystem";
import type { ProgramKey } from "@/data/coachingPlatform";
import { scorecardHref, syncTodayToScorecard } from "@/lib/scorecardSync";
import { loadTodayCloud, saveTodayCloud } from "@/lib/coachingCloud";

type DayEntries = Record<string, string>;
type TodayStore = {
  entries: Record<string, DayEntries>;
  status: Record<string, string>;
};

function readTodayStore(storageKey: string): TodayStore | null {
  if (typeof window === "undefined") return null;
  const saved = window.localStorage.getItem(storageKey);
  if (!saved) return null;
  try {
    return JSON.parse(saved) as TodayStore;
  } catch {
    window.localStorage.removeItem(storageKey);
    return null;
  }
}

const calendarRoute: Record<ProgramKey, string> = {
  mastery: "/member-area/resources/?tab=calendar",
  alliance: "/member-area/alliance-resources/?tab=calendar",
};

export default function TodayWorkspace({ program }: { program: ProgramKey }) {
  const storageKey = `lf-today-${program}`;
  const [activeKey, setActiveKey] = useState("monday");
  const [store, setStore] = useState<TodayStore>({ entries: {}, status: {} });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restore browser-only saved state after hydration to avoid SSR/client mismatches.
    setStore(readTodayStore(storageKey) ?? { entries: {}, status: {} });
    setActiveKey(currentDayKey());
    setHydrated(true);
    // Supabase is the primary store when configured and signed in; cloud
    // entries for the current week win over the local copy.
    loadTodayCloud(program).then((cloud) => {
      if (!cloud) return;
      setStore((current) => ({
        ...current,
        entries: { ...current.entries, ...cloud },
      }));
    });
  }, [storageKey, program]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(storageKey, JSON.stringify(store));
  }, [hydrated, storageKey, store]);

  const day: TodayDay = todayDays.find((d) => d.key === activeKey) ?? todayDays[0];
  const isWeekend = day.key === "weekend";
  const isFriday = day.key === "friday";
  const textFields = isWeekend
    ? [PLAN_FIELD, STUCK_FIELD]
    : isFriday
      ? [NOTE_FIELD, STUCK_FIELD, WIN_FIELD, FOCUS_FIELD]
      : [NOTE_FIELD, STUCK_FIELD];
  const entries = store.entries[day.key] ?? {};
  const status = store.status[day.key] ?? "Not started";
  const countFilled = isWeekend
    ? 0
    : dailyCountFields.filter((f) => (entries[f] ?? "").trim() !== "").length;

  function updateField(label: string, value: string) {
    setStore((current) => ({
      ...current,
      entries: {
        ...current.entries,
        [day.key]: { ...(current.entries[day.key] ?? {}), [label]: value },
      },
      status: { ...current.status, [day.key]: "Draft in progress" },
    }));
  }

  function finishDay(kind: "Saved" | "Submitted") {
    // One source of truth: Today writes straight into the weekly scorecard.
    const synced = syncTodayToScorecard(program, day.key, entries);
    const stamp = new Date().toLocaleString();
    const note =
      synced.length > 0 ? `${kind} ${stamp} · scorecard updated` : `${kind} ${stamp}`;
    setStore((current) => ({
      ...current,
      status: { ...current.status, [day.key]: note },
    }));
    saveTodayCloud(program, day.key, entries, kind.toLowerCase()).then((ok) => {
      if (!ok) return;
      setStore((current) => ({
        ...current,
        status: { ...current.status, [day.key]: `${note} · synced` },
      }));
    });
  }

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {todayDays.map((d) => {
            const isActive = d.key === day.key;
            return (
              <button
                key={d.key}
                type="button"
                onClick={() => setActiveKey(d.key)}
                className={`inline-flex items-center rounded-lg border px-2.5 py-1.5 text-sm font-semibold transition ${
                  isActive
                    ? "border-lf-orange bg-lf-orange text-white"
                    : "border-lf-line bg-white text-lf-navy hover:border-lf-navy hover:bg-lf-mist"
                }`}
              >
                {d.day}
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-3 text-sm font-semibold">
          <Link href={scorecardHref(program)} className="text-lf-orange hover:underline">
            Scorecard
          </Link>
          <Link href={calendarRoute[program]} className="text-lf-orange hover:underline">
            Calendar
          </Link>
        </div>
      </div>

      <section className="rounded-2xl border border-lf-line bg-white shadow-card">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-lf-line px-4 py-2.5">
          <h2 className="h-display text-lg">
            {day.day}: {day.theme}
          </h2>
          <p className="text-sm text-lf-slate">{day.instruction}</p>
          <p className="text-sm text-lf-slate">
            Script:{" "}
            <Link
              href={`${
                program === "alliance"
                  ? "/member-area/alliance-resources/"
                  : "/member-area/resources/"
              }?tab=scripts`}
              className="font-semibold text-lf-orange hover:underline"
            >
              {day.script}
            </Link>
          </p>
        </div>

        {!isWeekend && (
          <div className="grid grid-cols-2 gap-2 border-b border-lf-line p-3 sm:grid-cols-4">
            {dailyCountFields.map((label) => (
              <label
                key={label}
                className="grid content-start gap-1 text-[11px] font-semibold uppercase tracking-wide text-lf-slate"
              >
                {label}
                <input
                  aria-label={label}
                  type="number"
                  min={0}
                  value={entries[label] ?? ""}
                  onChange={(event) => updateField(label, event.target.value)}
                  className="h-9 rounded-lg border border-lf-line px-2 text-sm font-semibold normal-case tracking-normal text-lf-navy outline-none focus:border-lf-orange"
                />
              </label>
            ))}
          </div>
        )}

        <div className="grid gap-2 p-3 sm:grid-cols-2">
          {textFields.map((label) => (
            <label
              key={label}
              className="grid content-start gap-1 text-[11px] font-semibold uppercase tracking-wide text-lf-slate"
            >
              {label}
              <input
                aria-label={label}
                value={entries[label] ?? ""}
                onChange={(event) => updateField(label, event.target.value)}
                className="h-9 rounded-lg border border-lf-line px-2 text-sm font-normal normal-case tracking-normal text-lf-charcoal outline-none focus:border-lf-orange"
              />
            </label>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-lf-line px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-lf-slate">
            {status}
            {!isWeekend && ` · ${countFilled}/${dailyCountFields.length} numbers`}
          </p>
          <div className="flex gap-2">
            <button type="button" onClick={() => finishDay("Saved")} className="btn-secondary">
              Save today
            </button>
            <button type="button" onClick={() => finishDay("Submitted")} className="btn-primary">
              Submit to coach
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
