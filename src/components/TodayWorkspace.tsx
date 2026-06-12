"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  FOCUS_FIELD,
  NOTE_FIELD,
  PLAN_FIELD,
  STUCK_FIELD,
  WIN_FIELD,
  currentDayKey,
  dailyCountFields,
  getDailyVideo,
  timeBlockLabels,
  todayDays,
  type TodayDay,
} from "@/data/todaySystem";
import type { ProgramKey } from "@/data/coachingPlatform";
import { scorecardHref, syncTimeBlockToScorecard, syncTodayToScorecard } from "@/lib/scorecardSync";
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

type TimeBlock = {
  start: string;
  end: string;
  focus: string;
  contacts: string;
  mustComplete: string;
  savedAt?: string;
};

type TimeBlockStore = Record<string, TimeBlock>;

const EMPTY_BLOCK: TimeBlock = { start: "", end: "", focus: "", contacts: "", mustComplete: "" };

function readTimeBlockStore(storageKey: string): TimeBlockStore | null {
  if (typeof window === "undefined") return null;
  const saved = window.localStorage.getItem(storageKey);
  if (!saved) return null;
  try {
    return JSON.parse(saved) as TimeBlockStore;
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
  const timeBlockKey = `lf-timeblock-${program}`;
  const [activeKey, setActiveKey] = useState("monday");
  const [store, setStore] = useState<TodayStore>({ entries: {}, status: {} });
  const [blocks, setBlocks] = useState<TimeBlockStore>({});
  const [hydrated, setHydrated] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    function fit() {
      if (!root) return;
      if (window.innerWidth < 1024) {
        root.style.height = "";
        return;
      }
      const top = root.getBoundingClientRect().top;
      const parentPad = root.parentElement
        ? parseFloat(getComputedStyle(root.parentElement).paddingBottom) || 0
        : 0;
      root.style.height = `${Math.max(window.innerHeight - top - parentPad - 4, 480)}px`;
    }
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restore browser-only saved state after hydration to avoid SSR/client mismatches.
    setStore(readTodayStore(storageKey) ?? { entries: {}, status: {} });
    setBlocks(readTimeBlockStore(timeBlockKey) ?? {});
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
  }, [storageKey, timeBlockKey, program]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(storageKey, JSON.stringify(store));
  }, [hydrated, storageKey, store]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(timeBlockKey, JSON.stringify(blocks));
  }, [hydrated, timeBlockKey, blocks]);

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
  const block = blocks[day.key] ?? EMPTY_BLOCK;
  const video = getDailyVideo(program, day.key);
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

  function updateBlock(field: keyof TimeBlock, value: string) {
    setBlocks((current) => ({
      ...current,
      [day.key]: { ...(current[day.key] ?? EMPTY_BLOCK), [field]: value, savedAt: undefined },
    }));
  }

  function saveBlock() {
    const current = blocks[day.key] ?? EMPTY_BLOCK;
    const summary = [
      current.start && current.end ? `${current.start}–${current.end}` : current.start || "",
      current.focus,
      current.contacts && `Contact: ${current.contacts}`,
      current.mustComplete && `Complete: ${current.mustComplete}`,
    ]
      .filter(Boolean)
      .join(" · ");
    // The plan goes to the weekly scorecard too, so the coach sees it.
    if (summary) syncTimeBlockToScorecard(program, day.key, summary);
    setBlocks((state) => ({
      ...state,
      [day.key]: {
        ...(state[day.key] ?? EMPTY_BLOCK),
        savedAt: `${new Date().toLocaleString()} · added to scorecard`,
      },
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
    <div ref={rootRef} className="flex flex-col gap-2 lg:overflow-hidden">
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

      <section className="shrink-0 rounded-2xl border border-lf-line bg-white shadow-card">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-lf-line px-3 py-2">
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
          <div className="grid grid-cols-2 gap-1.5 border-b border-lf-line p-2 sm:grid-cols-4 2xl:grid-cols-8">
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
                  className="h-8 rounded-lg border border-lf-line px-2 text-sm font-semibold normal-case tracking-normal text-lf-navy outline-none focus:border-lf-orange"
                />
              </label>
            ))}
          </div>
        )}

        <div className="grid gap-1.5 p-2 sm:grid-cols-2">
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

        <div className="flex flex-col gap-2 border-t border-lf-line px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
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

      {/* Video first on mobile; side by side filling the rest of the screen on desktop. */}
      <div className="grid gap-2 lg:min-h-0 lg:flex-1 lg:grid-cols-2">
        <section className="flex flex-col overflow-hidden rounded-2xl border border-lf-line bg-white shadow-card lg:min-h-0">
          <p className="shrink-0 border-b border-lf-line px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-lf-slate">
            Daily Theme · {day.day}
          </p>
          <div className="relative aspect-video w-full bg-black lg:aspect-auto lg:min-h-0 lg:flex-1">
            {video ? (
              <iframe
                key={video.heygenVideoId}
                className="absolute inset-0 h-full w-full"
                src={video.embedUrl}
                title={video.title}
                loading="lazy"
                allow="encrypted-media; fullscreen;"
                allowFullScreen
              />
            ) : (
              <p className="p-4 text-sm text-white/80">
                No coaching video published for this day yet.
              </p>
            )}
          </div>
        </section>

        <section className="flex flex-col rounded-2xl border border-lf-line bg-white shadow-card lg:min-h-0">
          <p className="shrink-0 border-b border-lf-line px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-lf-slate">
            {day.day} time block · {timeBlockLabels[day.key]}
          </p>
          <div className="grid min-h-0 flex-1 content-start grid-cols-2 gap-1.5 overflow-y-auto p-2">
            <label className="grid content-start gap-1 text-[11px] font-semibold uppercase tracking-wide text-lf-slate">
              Start time
              <input
                type="time"
                aria-label="Start time"
                value={block.start}
                onChange={(event) => updateBlock("start", event.target.value)}
                className="h-8 rounded-lg border border-lf-line px-2 text-sm font-normal normal-case tracking-normal text-lf-charcoal outline-none focus:border-lf-orange"
              />
            </label>
            <label className="grid content-start gap-1 text-[11px] font-semibold uppercase tracking-wide text-lf-slate">
              End time
              <input
                type="time"
                aria-label="End time"
                value={block.end}
                onChange={(event) => updateBlock("end", event.target.value)}
                className="h-8 rounded-lg border border-lf-line px-2 text-sm font-normal normal-case tracking-normal text-lf-charcoal outline-none focus:border-lf-orange"
              />
            </label>
            <label className="col-span-2 grid content-start gap-1 text-[11px] font-semibold uppercase tracking-wide text-lf-slate">
              Main focus
              <input
                aria-label="Main focus"
                value={block.focus}
                onChange={(event) => updateBlock("focus", event.target.value)}
                className="h-8 rounded-lg border border-lf-line px-2 text-sm font-normal normal-case tracking-normal text-lf-charcoal outline-none focus:border-lf-orange"
              />
            </label>
            <label className="col-span-2 grid content-start gap-1 text-[11px] font-semibold uppercase tracking-wide text-lf-slate">
              Who I need to contact
              <input
                aria-label="Who I need to contact"
                value={block.contacts}
                onChange={(event) => updateBlock("contacts", event.target.value)}
                className="h-8 rounded-lg border border-lf-line px-2 text-sm font-normal normal-case tracking-normal text-lf-charcoal outline-none focus:border-lf-orange"
              />
            </label>
            <label className="col-span-2 grid content-start gap-1 text-[11px] font-semibold uppercase tracking-wide text-lf-slate">
              What must be completed
              <input
                aria-label="What must be completed"
                value={block.mustComplete}
                onChange={(event) => updateBlock("mustComplete", event.target.value)}
                className="h-8 rounded-lg border border-lf-line px-2 text-sm font-normal normal-case tracking-normal text-lf-charcoal outline-none focus:border-lf-orange"
              />
            </label>
          </div>
          <div className="flex shrink-0 items-center justify-between gap-2 border-t border-lf-line px-3 py-2">
            <p className="text-sm text-lf-slate">
              {block.savedAt ? `Saved ${block.savedAt}` : "Not saved yet"}
            </p>
            <button type="button" onClick={saveBlock} className="btn-secondary">
              Save time block
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
