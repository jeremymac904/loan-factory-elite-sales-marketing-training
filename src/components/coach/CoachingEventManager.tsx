"use client";

import { useEffect, useMemo, useState } from "react";
import {
  createCoachingEventCloud,
  deleteCoachingEventCloud,
  listCoachingEventsCloud,
  type CoachingEvent,
} from "@/lib/coachingCloud";

/**
 * Coaching event manager — the launch calendar workflow. A coach pastes a
 * Google Meet / Zoom / Calendar-invite link they created themselves, sets the
 * title/date/time/program, and the event is saved to the platform calendar so
 * the program's members see it with a Join button. No mailbox or email-account
 * dependency — the coach creates the meeting elsewhere and pastes the link.
 */

const PROVIDERS = [
  { value: "google_meet", label: "Google Meet" },
  { value: "zoom", label: "Zoom" },
  { value: "calendar", label: "Calendar invite" },
  { value: "other", label: "Other link" },
] as const;

const PROGRAMS = [
  { value: "both", label: "Both programs" },
  { value: "mastery", label: "LO Mastery" },
  { value: "alliance", label: "Loan Factory Alliance" },
] as const;

function isHttpUrl(url: string) {
  return /^https?:\/\/\S+$/i.test(url.trim());
}

function fmtWhen(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function CoachingEventManager() {
  const [events, setEvents] = useState<CoachingEvent[]>([]);
  const [cloudReady, setCloudReady] = useState<boolean | null>(null);
  const [title, setTitle] = useState("Weekly group coaching call");
  const [program, setProgram] = useState<(typeof PROGRAMS)[number]["value"]>("both");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(60);
  const [provider, setProvider] = useState<(typeof PROVIDERS)[number]["value"]>("google_meet");
  const [meetingUrl, setMeetingUrl] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  async function refresh() {
    const [m, a] = await Promise.all([
      listCoachingEventsCloud("mastery"),
      listCoachingEventsCloud("alliance"),
    ]);
    if (m === null && a === null) {
      setCloudReady(false);
      return;
    }
    setCloudReady(true);
    const byId = new Map<string, CoachingEvent>();
    [...(m ?? []), ...(a ?? [])].forEach((e) => byId.set(e.id, e));
    setEvents([...byId.values()].sort((x, y) => x.startsAt.localeCompare(y.startsAt)));
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- async cloud fetch hydrates the event list after mount.
    refresh();
  }, []);

  const urlValid = useMemo(() => meetingUrl === "" || isHttpUrl(meetingUrl), [meetingUrl]);
  const canSave = title.trim() && date && time && (meetingUrl === "" || urlValid) && !saving;

  async function create() {
    if (!canSave) return;
    setSaving(true);
    setStatus("");
    const startsAt = new Date(`${date}T${time}`).toISOString();
    const id = await createCoachingEventCloud({
      title: title.trim(),
      description: description.trim() || undefined,
      startsAt,
      durationMin: duration,
      meetingUrl: meetingUrl.trim() || undefined,
      meetingProvider: provider,
      program,
    });
    setSaving(false);
    if (!id) {
      setStatus("Couldn't save — sign in as a coach to publish events to the platform calendar.");
      return;
    }
    setStatus("Event published to the platform calendar.");
    setMeetingUrl("");
    setDescription("");
    await refresh();
  }

  async function remove(id: string) {
    const ok = await deleteCoachingEventCloud(id);
    if (ok) setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Creator */}
      <div className="card flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base font-semibold text-lf-charcoal">Create a coaching event</h3>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-lf-orangeSoft px-2.5 py-0.5 text-xs font-semibold text-lf-orangeDark">
            Paste your Meet / Zoom link
          </span>
        </div>
        <p className="text-sm text-lf-slate">
          Create the meeting in Google Meet or Zoom, then paste the link here. The event shows on the
          platform calendar for the program you choose — no mailbox or email account needed.
        </p>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">Title</span>
          <input
            type="text"
            className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm text-lf-charcoal outline-none focus:border-lf-orange"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">Program</span>
            <select
              className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm text-lf-charcoal outline-none focus:border-lf-orange"
              value={program}
              onChange={(e) => setProgram(e.target.value as typeof program)}
            >
              {PROGRAMS.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">Meeting platform</span>
            <select
              className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm text-lf-charcoal outline-none focus:border-lf-orange"
              value={provider}
              onChange={(e) => setProvider(e.target.value as typeof provider)}
            >
              {PROVIDERS.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">Date</span>
            <input
              type="date"
              className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm text-lf-charcoal outline-none focus:border-lf-orange"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">Time</span>
            <input
              type="time"
              className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm text-lf-charcoal outline-none focus:border-lf-orange"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">Duration (min)</span>
            <input
              type="number"
              min={15}
              step={15}
              className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm text-lf-charcoal outline-none focus:border-lf-orange"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value) || 60)}
            />
          </label>
        </div>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
            Meeting link (Meet / Zoom / Calendar invite)
          </span>
          <input
            type="url"
            placeholder="https://meet.google.com/... or https://zoom.us/j/..."
            className={`rounded-lg border bg-white px-3 py-2 text-sm text-lf-charcoal outline-none focus:border-lf-orange ${
              urlValid ? "border-lf-line" : "border-red-400"
            }`}
            value={meetingUrl}
            onChange={(e) => setMeetingUrl(e.target.value)}
          />
          {!urlValid && (
            <span className="text-xs font-semibold text-red-600">Enter a full https:// link.</span>
          )}
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">Agenda (optional)</span>
          <textarea
            className="min-h-[72px] rounded-lg border border-lf-line bg-white px-3 py-2 text-sm text-lf-charcoal outline-none focus:border-lf-orange"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={create} disabled={!canSave} className="btn-primary disabled:opacity-50">
            {saving ? "Publishing…" : "Publish to calendar"}
          </button>
          {status && <span className="text-xs font-semibold text-lf-slate">{status}</span>}
        </div>
      </div>

      {/* Upcoming */}
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-semibold text-lf-charcoal">
          Upcoming coaching events {events.length > 0 ? `(${events.length})` : ""}
        </h3>
        {cloudReady === false && (
          <p className="card text-sm text-lf-slate">
            Sign in as a coach to publish and manage events on the live platform calendar.
          </p>
        )}
        {cloudReady && events.length === 0 && (
          <p className="card text-sm text-lf-slate">No upcoming events yet. Create one on the left.</p>
        )}
        {events.map((ev) => (
          <div key={ev.id} className="card flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-lf-charcoal">{ev.title}</p>
                <p className="text-xs text-lf-slate">
                  {fmtWhen(ev.startsAt)}
                  {ev.durationMin ? ` · ${ev.durationMin} min` : ""} ·{" "}
                  {ev.program === "both" ? "Both programs" : ev.program === "mastery" ? "LO Mastery" : "Alliance"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => remove(ev.id)}
                className="shrink-0 text-xs font-semibold text-lf-slate hover:text-red-600"
              >
                Remove
              </button>
            </div>
            {ev.description && <p className="text-sm text-lf-charcoal">{ev.description}</p>}
            {ev.meetingUrl && (
              <a
                href={ev.meetingUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary w-fit text-xs"
              >
                Join {ev.meetingProvider === "zoom" ? "Zoom" : ev.meetingProvider === "google_meet" ? "Meet" : "meeting"}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
