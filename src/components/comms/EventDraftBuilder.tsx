"use client";

import { useMemo, useState } from "react";
import {
  recipientOptions,
  buildEventDraft,
  buildMeetTrainingDraft,
  localDraftId,
  type CommsDraft,
} from "@/data/coachComms";

// Honest DRAFT scheduling workflow for the Training Scheduler. Builds a
// Google Calendar event DRAFT and a Google Meet training DRAFT (text only) —
// it never creates a real event or a real Meet link. A prominent "not
// connected" status is rendered by the page above this builder.
//
// Event types are passed in from PA4's calendarEventTypes. Saving pushes a
// local CommsDraft (kind="event") onto the page's in-memory draft list.

type EventType = {
  type: string;
  title: string;
  description: string;
  defaultDuration: string;
  inviteDetail: string;
};

export default function EventDraftBuilder({
  eventTypes,
  onSaveDraft,
}: {
  eventTypes: EventType[];
  onSaveDraft: (draft: CommsDraft) => void;
}) {
  const [typeIndex, setTypeIndex] = useState(0);
  const selected = eventTypes[typeIndex];

  const [title, setTitle] = useState(selected?.title ?? "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(selected?.defaultDuration ?? "");
  const [details, setDetails] = useState(selected?.inviteDetail ?? "");
  const [attendeeId, setAttendeeId] = useState("");
  const [extraAttendees, setExtraAttendees] = useState("");
  const [savedNote, setSavedNote] = useState("");
  const [copied, setCopied] = useState<"event" | "meet" | "">("");

  const attendee = useMemo(
    () => recipientOptions.find((r) => r.id === attendeeId),
    [attendeeId],
  );

  function applyType(index: number) {
    setTypeIndex(index);
    const t = eventTypes[index];
    if (!t) return;
    setTitle(t.title);
    setDuration(t.defaultDuration);
    setDetails(t.inviteDetail);
    setSavedNote("");
  }

  const attendeesText = [attendee?.email, extraAttendees]
    .filter(Boolean)
    .join(", ");

  const eventDraft = buildEventDraft({
    title,
    date,
    time,
    duration,
    attendees: attendeesText,
    details,
  });

  const meetDraft = buildMeetTrainingDraft({
    title,
    date,
    time,
    duration,
    attendees: attendeesText,
  });

  async function copyText(which: "event" | "meet") {
    try {
      await navigator.clipboard.writeText(which === "event" ? eventDraft : meetDraft);
      setCopied(which);
      window.setTimeout(() => setCopied(""), 1800);
    } catch {
      setCopied("");
    }
  }

  function saveDraft() {
    const draft: CommsDraft = {
      id: localDraftId("event"),
      kind: "event",
      title: title || selected?.title || "Training session",
      recipientName: attendee?.name,
      recipientEmail: attendee?.email,
      date,
      time,
      duration,
      attendees: attendeesText,
      meetDraft,
      body: eventDraft,
      status: "draft",
      createdLabel: "Just now",
    };
    onSaveDraft(draft);
    setSavedNote(
      "Saved locally as a draft. Create the event yourself in Google Calendar — nothing was added to any calendar.",
    );
  }

  return (
    <div className="card flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-lf-charcoal">
          Build a training event draft
        </h3>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-lf-orangeSoft px-2.5 py-0.5 text-xs font-semibold text-lf-orangeDark">
          Draft only — no event created
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
            Event type
          </span>
          <select
            className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm text-lf-charcoal"
            value={typeIndex}
            onChange={(e) => applyType(Number(e.target.value))}
          >
            {eventTypes.map((t, i) => (
              <option key={t.type} value={i}>
                {t.title}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
            Title
          </span>
          <input
            type="text"
            className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm text-lf-charcoal"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setSavedNote("");
            }}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
            Date
          </span>
          <input
            type="date"
            className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm text-lf-charcoal"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setSavedNote("");
            }}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
            Time
          </span>
          <input
            type="time"
            className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm text-lf-charcoal"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
              setSavedNote("");
            }}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
            Duration
          </span>
          <input
            type="text"
            className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm text-lf-charcoal"
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
              setSavedNote("");
            }}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
            Primary attendee (LO)
          </span>
          <select
            className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm text-lf-charcoal"
            value={attendeeId}
            onChange={(e) => {
              setAttendeeId(e.target.value);
              setSavedNote("");
            }}
          >
            <option value="">— Optional —</option>
            {recipientOptions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm">
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
          Additional attendee emails (comma-separated)
        </span>
        <input
          type="text"
          placeholder="someone@loanfactory.com, another@loanfactory.com"
          className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm text-lf-charcoal"
          value={extraAttendees}
          onChange={(e) => {
            setExtraAttendees(e.target.value);
            setSavedNote("");
          }}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
          Agenda / details
        </span>
        <textarea
          className="min-h-[100px] rounded-lg border border-lf-line bg-white px-3 py-2 font-sans text-sm text-lf-charcoal"
          value={details}
          onChange={(e) => {
            setDetails(e.target.value);
            setSavedNote("");
          }}
        />
      </label>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-lf-line bg-lf-mist/40 p-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
              Calendar event draft
            </p>
            <button
              type="button"
              onClick={() => copyText("event")}
              className="text-xs font-semibold text-lf-orange"
            >
              {copied === "event" ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap font-sans text-sm text-lf-charcoal">
            {eventDraft}
          </pre>
        </div>

        <div className="rounded-lg border border-lf-line bg-lf-mist/40 p-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
              Google Meet training draft
            </p>
            <button
              type="button"
              onClick={() => copyText("meet")}
              className="text-xs font-semibold text-lf-orange"
            >
              {copied === "meet" ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap font-sans text-sm text-lf-charcoal">
            {meetDraft}
          </pre>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={saveDraft} className="btn-primary">
          Save event draft locally
        </button>
        <span className="text-xs text-lf-slate">
          Saving stores a local draft only. No real event or Meet link is created.
        </span>
      </div>

      {savedNote && (
        <p className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
          {savedNote}
        </p>
      )}
    </div>
  );
}
