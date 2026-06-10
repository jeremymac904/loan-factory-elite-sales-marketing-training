"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  currentDayKey,
  dailyNotesFields,
  todayDays,
  type TodayDay,
} from "@/data/todaySystem";
import type { ProgramKey } from "@/data/coachingPlatform";
import { scorecardHref, syncTodayToScorecard } from "@/lib/scorecardSync";

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

const memberBase: Record<ProgramKey, { scripts: string; trackers: string }> = {
  mastery: {
    scripts: "/member-area/scripts/",
    trackers: "/member-area/trackers/",
  },
  alliance: {
    scripts: "/member-area/alliance-scripts/",
    trackers: "/member-area/alliance-trackers/",
  },
};

export default function TodayWorkspace({ program }: { program: ProgramKey }) {
  const storageKey = `lf-today-${program}`;
  const links = memberBase[program];
  const [activeKey, setActiveKey] = useState("monday");
  const [store, setStore] = useState<TodayStore>({ entries: {}, status: {} });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restore browser-only saved state after hydration to avoid SSR/client mismatches.
    setStore(readTodayStore(storageKey) ?? { entries: {}, status: {} });
    setActiveKey(currentDayKey());
    setHydrated(true);
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(storageKey, JSON.stringify(store));
  }, [hydrated, storageKey, store]);

  const day: TodayDay = todayDays.find((d) => d.key === activeKey) ?? todayDays[0];
  const dayLabels = new Set(day.fields.map((f) => f.label.toLowerCase()));
  const notesFields = dailyNotesFields.filter(
    (f) =>
      !(
        f.label === "Stuck point" &&
        day.fields.some((d) => d.label.toLowerCase().includes("stuck"))
      ) && !dayLabels.has(f.label.toLowerCase()),
  );
  const allFields = [...day.fields, ...notesFields];
  const entries = store.entries[day.key] ?? {};
  const status = store.status[day.key] ?? "Not started";
  const filled = allFields.filter((f) => (entries[f.label] ?? "").trim().length > 0).length;

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
    // Today feeds the weekly scorecard: any field that maps to a scorecard
    // metric is written into that day's column so numbers are entered once.
    const synced = syncTodayToScorecard(program, day.key, entries);
    const stamp = new Date().toLocaleString();
    const note =
      synced.length > 0 ? `${kind} ${stamp} · scorecard updated` : `${kind} ${stamp}`;
    setStore((current) => ({
      ...current,
      status: { ...current.status, [day.key]: note },
    }));
  }

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {todayDays.map((d) => {
            const isActive = d.key === day.key;
            return (
              <button
                key={d.key}
                type="button"
                onClick={() => setActiveKey(d.key)}
                className={`inline-flex items-center rounded-lg border px-3 py-1.5 text-sm font-semibold transition ${
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
          <Link href={links.scripts} className="text-lf-orange hover:underline">
            Script: {day.script}
          </Link>
          <Link href={scorecardHref(program)} className="text-lf-orange hover:underline">
            Scorecard
          </Link>
          <Link href={links.trackers} className="text-lf-orange hover:underline">
            Trackers
          </Link>
        </div>
      </div>

      <section className="rounded-2xl border border-lf-line bg-white shadow-card">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-lf-line px-4 py-3">
          <h2 className="h-display text-xl">
            {day.day}: {day.theme}
          </h2>
          <p className="text-sm text-lf-slate">{day.instruction}</p>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
          {allFields.map((field) => (
            <label
              key={field.label}
              className={`grid content-start gap-1 text-xs font-semibold uppercase tracking-wide text-lf-slate ${
                field.kind === "long" ? "sm:col-span-2 lg:col-span-3" : ""
              }`}
            >
              {field.label}
              {field.kind === "long" ? (
                <textarea
                  aria-label={field.label}
                  value={entries[field.label] ?? ""}
                  onChange={(event) => updateField(field.label, event.target.value)}
                  rows={2}
                  className="rounded-lg border border-lf-line p-2 text-sm font-normal normal-case tracking-normal text-lf-charcoal outline-none focus:border-lf-orange"
                />
              ) : (
                <input
                  aria-label={field.label}
                  type={field.kind === "number" ? "number" : "text"}
                  min={field.kind === "number" ? 0 : undefined}
                  value={entries[field.label] ?? ""}
                  onChange={(event) => updateField(field.label, event.target.value)}
                  className="h-9 rounded-lg border border-lf-line px-2 text-sm font-normal normal-case tracking-normal text-lf-charcoal outline-none focus:border-lf-orange"
                />
              )}
            </label>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-lf-line px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-lf-slate">
            {status} · {filled}/{allFields.length} filled
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
