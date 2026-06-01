"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  noteTemplates,
  noteTypes,
  shortName,
  type AssignedPerson,
} from "@/data/coachCommandCenter";

type SavedNote = {
  id: string;
  personId: string;
  personName: string;
  noteType: string;
  tags: string;
  note: string;
  actionItems: string;
  followUpDate: string;
  savedAt: string;
};

const STORAGE_KEY = "loan-factory-coaching-notes";

function readStoredNotes(): SavedNote[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as SavedNote[];
  } catch {
    return [];
  }
}

// Real coaching-notes workflow (Finding #18): note creation form (local state),
// note templates, assigned member select, tags, action items, and a next
// follow-up date. Saved locally this sprint — DB wiring is planned.
export default function CoachingNotesWorkspace({
  people,
}: {
  people: AssignedPerson[];
}) {
  const [personId, setPersonId] = useState(people[0]?.id ?? "");
  const [noteType, setNoteType] = useState(noteTypes[0]);
  const [tags, setTags] = useState("");
  const [note, setNote] = useState("");
  const [actionItems, setActionItems] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [savedNotes, setSavedNotes] = useState<SavedNote[]>(readStoredNotes);
  const [justSaved, setJustSaved] = useState(false);

  const selectedPerson = useMemo(
    () => people.find((p) => p.id === personId) ?? people[0],
    [people, personId],
  );

  function applyTemplate(title: string) {
    const template = noteTemplates.find((t) => t.title === title);
    if (!template) return;
    setNoteType(template.type);
    setNote(template.body);
    setTags(template.tags);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedPerson) return;
    const entry: SavedNote = {
      id: `${Date.now()}`,
      personId: selectedPerson.id,
      personName: selectedPerson.name,
      noteType,
      tags,
      note,
      actionItems,
      followUpDate,
      savedAt: new Date().toISOString(),
    };
    const next = [entry, ...savedNotes].slice(0, 50);
    setSavedNotes(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Local storage may be unavailable; the note still shows in this session.
    }
    setJustSaved(true);
    setNote("");
    setActionItems("");
    setTags("");
    setFollowUpDate("");
    window.setTimeout(() => setJustSaved(false), 2500);
  }

  function deleteNote(id: string) {
    const next = savedNotes.filter((n) => n.id !== id);
    setSavedNotes(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  }

  const notesForPerson = savedNotes.filter(
    (n) => !selectedPerson || n.personId === selectedPerson.id,
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <div className="card border-lf-orange/40 bg-lf-orangeSoft/20">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orangeDark">
              Create a coaching note
            </p>
            <h2 className="h-display mt-1 text-2xl">
              Capture the next coaching action.
            </h2>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-lf-charcoal">
            Saved locally until the database is connected
          </span>
        </div>

        <div className="mt-4">
          <p className="text-xs font-semibold text-lf-slate">Start from a template</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {noteTemplates.map((t) => (
              <button
                key={t.title}
                type="button"
                onClick={() => applyTemplate(t.title)}
                className="rounded-lg border border-lf-line px-2.5 py-1 text-xs font-semibold text-lf-slate transition hover:border-lf-orange hover:text-lf-orange"
              >
                {t.title}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1 text-sm font-semibold text-lf-charcoal">
            Assigned member
            <select
              value={personId}
              onChange={(event) => setPersonId(event.target.value)}
              className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-normal text-lf-charcoal"
              required
            >
              {people.map((p) => (
                <option key={p.id} value={p.id}>
                  {shortName(p.name)} — {p.program}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1 text-sm font-semibold text-lf-charcoal">
            Note type
            <select
              value={noteType}
              onChange={(event) => setNoteType(event.target.value)}
              className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-normal text-lf-charcoal"
            >
              {noteTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>

          <label className="grid gap-1 text-sm font-semibold text-lf-charcoal">
            Tags
            <input
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              placeholder="scorecard, re-engage, realtor-outreach"
              className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-normal text-lf-charcoal"
            />
          </label>

          <label className="grid gap-1 text-sm font-semibold text-lf-charcoal">
            Next follow-up date
            <input
              type="date"
              value={followUpDate}
              onChange={(event) => setFollowUpDate(event.target.value)}
              className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-normal text-lf-charcoal"
            />
          </label>

          <label className="grid gap-1 text-sm font-semibold text-lf-charcoal sm:col-span-2">
            Coaching note
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              rows={5}
              placeholder="Wins, stuck points, scorecard context, coaching decision…"
              className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-normal text-lf-charcoal"
              required
            />
          </label>

          <label className="grid gap-1 text-sm font-semibold text-lf-charcoal sm:col-span-2">
            Action items
            <textarea
              value={actionItems}
              onChange={(event) => setActionItems(event.target.value)}
              rows={3}
              placeholder="Owner, due date, resource assigned, how we verify…"
              className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-normal text-lf-charcoal"
            />
          </label>

          <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
            <button type="submit" className="btn-primary">
              Save note locally
            </button>
            {justSaved && (
              <p className="text-sm font-semibold text-green-700">
                Saved locally in this browser ✓
              </p>
            )}
            <p className="w-full text-xs text-lf-slate">
              Notes are saved locally in this browser until the database is
              connected — nothing is sent anywhere.
            </p>
          </div>
        </form>
      </div>

      <div className="card">
        <div className="flex items-center justify-between gap-3">
          <h3 className="h-display text-lg">
            {selectedPerson
              ? `Notes for ${shortName(selectedPerson.name)}`
              : "Saved notes"}
          </h3>
          <span className="text-xs font-semibold text-lf-slate">
            {notesForPerson.length} saved
          </span>
        </div>
        {notesForPerson.length === 0 ? (
          <p className="prose-lf mt-4 text-sm">
            No saved notes yet for this member. Create one on the left — it is
            saved locally in this browser until the database is connected.
          </p>
        ) : (
          <ul className="mt-4 grid gap-3">
            {notesForPerson.map((n) => (
              <li
                key={n.id}
                className="rounded-lg border border-lf-line bg-lf-mist/40 px-3 py-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-lf-orangeDark">
                    {n.noteType}
                  </p>
                  <button
                    type="button"
                    onClick={() => deleteNote(n.id)}
                    className="text-xs font-semibold text-lf-slate hover:text-lf-orange"
                    aria-label="Delete note"
                  >
                    Remove
                  </button>
                </div>
                <p className="mt-1 whitespace-pre-wrap text-sm text-lf-charcoal">
                  {n.note}
                </p>
                {n.actionItems && (
                  <p className="mt-2 whitespace-pre-wrap text-xs text-lf-slate">
                    <span className="font-semibold">Action items:</span>{" "}
                    {n.actionItems}
                  </p>
                )}
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-lf-slate">
                  {n.tags && <span>Tags: {n.tags}</span>}
                  {n.followUpDate && <span>Follow-up: {n.followUpDate}</span>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
