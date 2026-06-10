"use client";

import { useState } from "react";
import { themeDays, type ProgramKey } from "@/data/coachingPlatform";

type CalendarEvent = {
  label: string;
  tone: "call" | "due" | "theme" | "office";
};

const WEEKDAY_HEADERS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Plain text with a colored edge — events are informational, not buttons.
const TONE_STYLES: Record<CalendarEvent["tone"], string> = {
  call: "border-lf-orange font-bold text-lf-orangeDark",
  office: "border-lf-navy font-bold text-lf-navy",
  due: "border-lf-orange text-lf-orangeDark",
  theme: "border-lf-line text-lf-slate",
};

function monthLabel(date: Date) {
  return date.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

/**
 * Weekly coaching rhythm rendered onto real dates. Local/mock schedule until
 * the live calendar source is connected:
 *  - Tuesday: group coaching call
 *  - Thursday: office hours
 *  - Friday: scorecard due
 *  - Mon-Fri: program theme day
 */
function eventsFor(date: Date, program: ProgramKey): CalendarEvent[] {
  const weekday = date.getDay(); // 0 Sun ... 6 Sat
  const events: CalendarEvent[] = [];
  if (weekday >= 1 && weekday <= 5) {
    const theme = themeDays[weekday - 1];
    if (theme) {
      events.push({
        label: program === "alliance" ? theme.alliance : theme.mastery,
        tone: "theme",
      });
    }
  }
  if (weekday === 2) events.push({ label: "Coaching call · 12:00pm", tone: "call" });
  if (weekday === 4) events.push({ label: "Office hours · 2:00pm", tone: "office" });
  if (weekday === 5) events.push({ label: "Scorecard due", tone: "due" });
  return events;
}

export default function CalendarMonth({ program }: { program: ProgramKey }) {
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const today = new Date();
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Monday-first offset: getDay() Sun=0 -> 6, Mon=1 -> 0 ...
  const leadingBlanks = (firstOfMonth.getDay() + 6) % 7;
  const totalCells = Math.ceil((leadingBlanks + daysInMonth) / 7) * 7;

  const cells = Array.from({ length: totalCells }, (_, index) => {
    const dayNumber = index - leadingBlanks + 1;
    if (dayNumber < 1 || dayNumber > daysInMonth) return null;
    return new Date(year, month, dayNumber);
  });

  function shiftMonth(delta: number) {
    setCursor((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1));
  }

  return (
    <section className="rounded-2xl border border-lf-line bg-white shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-lf-line px-4 py-3">
        <h2 className="h-display text-xl">{monthLabel(cursor)}</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            className="inline-flex items-center rounded-lg border border-lf-line bg-white px-3 py-1.5 text-sm font-semibold text-lf-navy transition hover:border-lf-navy hover:bg-lf-mist"
          >
            ← Prev
          </button>
          <button
            type="button"
            onClick={() =>
              setCursor(new Date(today.getFullYear(), today.getMonth(), 1))
            }
            className="inline-flex items-center rounded-lg border border-lf-line bg-white px-3 py-1.5 text-sm font-semibold text-lf-navy transition hover:border-lf-navy hover:bg-lf-mist"
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            className="inline-flex items-center rounded-lg border border-lf-line bg-white px-3 py-1.5 text-sm font-semibold text-lf-navy transition hover:border-lf-navy hover:bg-lf-mist"
          >
            Next →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b border-lf-line bg-lf-mist text-center text-xs font-semibold uppercase tracking-wide text-lf-slate">
        {WEEKDAY_HEADERS.map((label) => (
          <div key={label} className="px-1 py-2">
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map((date, index) => {
          const isToday =
            date !== null &&
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate();
          const events = date ? eventsFor(date, program) : [];
          return (
            <div
              key={index}
              className={`min-h-20 border-b border-r border-lf-line p-1.5 last:border-r-0 md:min-h-24 [&:nth-child(7n)]:border-r-0 ${
                date ? "bg-white" : "bg-lf-mist/40"
              }`}
            >
              {date && (
                <>
                  <p
                    className={`text-xs font-bold ${
                      isToday
                        ? "inline-flex h-5 w-5 items-center justify-center rounded-full bg-lf-orange text-white"
                        : "text-lf-navy"
                    }`}
                  >
                    {date.getDate()}
                  </p>
                  <div className="mt-1 grid gap-1">
                    {events.map((event) => (
                      <p
                        key={event.label}
                        className={`truncate border-l-2 pl-1 text-[11px] leading-4 ${TONE_STYLES[event.tone]}`}
                        title={event.label}
                      >
                        {event.label}
                      </p>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <p className="px-4 py-3 text-xs text-lf-slate">
        Coaching calls, office hours, scorecard due dates, and theme days. Local
        schedule until the live calendar source is connected.
      </p>
    </section>
  );
}
