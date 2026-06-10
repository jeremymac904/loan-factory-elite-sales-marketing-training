"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { currentDayKey, todayDays, type TodayDay } from "@/data/todaySystem";
import type { ProgramKey } from "@/data/coachingPlatform";

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

const memberBase: Record<ProgramKey, Record<string, string>> = {
  mastery: {
    scripts: "/member-area/scripts/",
    trackers: "/member-area/trackers/",
    scorecard: "/member-area/scorecards/",
    feed: "/member-area/",
    resources: "/member-area/resources/",
  },
  alliance: {
    scripts: "/member-area/alliance-scripts/",
    trackers: "/member-area/alliance-trackers/",
    scorecard: "/member-area/alliance-scorecard/",
    feed: "/member-area/alliance/",
    resources: "/member-area/alliance-resources/",
  },
};

export default function TodayWorkspace({
  program,
  coachNote,
}: {
  program: ProgramKey;
  coachNote: string;
}) {
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
  const entries = store.entries[day.key] ?? {};
  const status = store.status[day.key] ?? "Not started";
  const filled = day.fields.filter((f) => (entries[f.label] ?? "").trim().length > 0).length;

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

  function setStatus(next: string) {
    setStore((current) => ({
      ...current,
      status: { ...current.status, [day.key]: next },
    }));
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap gap-2">
        {todayDays.map((d) => {
          const isActive = d.key === day.key;
          return (
            <button
              key={d.key}
              type="button"
              onClick={() => setActiveKey(d.key)}
              className={`inline-flex items-center rounded-lg border px-3 py-2 text-sm font-semibold transition ${
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

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="rounded-2xl border border-lf-line bg-white shadow-card">
          <div className="border-b border-lf-line p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              {day.day} · {day.theme}
            </p>
            <h2 className="h-display mt-2 text-3xl">{day.theme}</h2>
            <p className="prose-lf mt-3 text-lf-charcoal">{day.instruction}</p>
          </div>

          <div className="grid gap-4 p-5 md:grid-cols-2">
            {day.fields.map((field) => (
              <label
                key={field.label}
                className={`grid gap-2 text-sm font-semibold text-lf-navy ${
                  field.kind === "long" ? "md:col-span-2" : ""
                }`}
              >
                {field.label}
                {field.kind === "long" ? (
                  <textarea
                    aria-label={field.label}
                    value={entries[field.label] ?? ""}
                    onChange={(event) => updateField(field.label, event.target.value)}
                    className="min-h-24 rounded-xl border border-lf-line p-3 text-sm font-normal text-lf-charcoal outline-none focus:border-lf-orange"
                  />
                ) : (
                  <input
                    aria-label={field.label}
                    type={field.kind === "number" ? "number" : "text"}
                    min={field.kind === "number" ? 0 : undefined}
                    value={entries[field.label] ?? ""}
                    onChange={(event) => updateField(field.label, event.target.value)}
                    className="h-11 rounded-lg border border-lf-line px-3 text-sm font-normal text-lf-charcoal outline-none focus:border-lf-orange"
                  />
                )}
              </label>
            ))}
          </div>

          <div className="flex flex-col gap-3 border-t border-lf-line p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-lf-slate">
              {status} · {filled} of {day.fields.length} fields filled
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setStatus(`Saved ${new Date().toLocaleString()}`)}
                className="btn-secondary"
              >
                Save today
              </button>
              <button
                type="button"
                onClick={() => setStatus(`Submitted ${new Date().toLocaleString()}`)}
                className="btn-primary"
              >
                Submit to coach
              </button>
            </div>
          </div>
        </section>

        <aside className="grid gap-5 self-start">
          <div className="rounded-2xl border border-lf-line bg-white p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Today&apos;s tools
            </p>
            <div className="mt-4 grid gap-3">
              <Link href={links.scripts} className="btn-secondary">
                Script: {day.script}
              </Link>
              <Link href={links.trackers} className="btn-secondary">
                Tracker: {day.tracker}
              </Link>
              <Link href={links.scorecard} className="btn-secondary">
                Open scorecard
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-lf-line bg-white p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Community prompt
            </p>
            <p className="prose-lf mt-3 text-sm text-lf-charcoal">{day.communityPrompt}</p>
            <Link href={links.feed} className="btn-primary mt-4">
              Post in the feed
            </Link>
          </div>
          <div className="rounded-2xl border border-lf-line bg-white p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Coach note
            </p>
            <p className="prose-lf mt-3 text-sm text-lf-charcoal">{coachNote}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
