"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  buildCoachAssistantDraft,
  coachAssistantActions,
  coachProfileFromLabel,
  shortName,
  type AssignedPerson,
  type CoachAssistantActionId,
} from "@/data/coachCommandCenter";

type SavedDraft = {
  id: string;
  personId: string;
  personName: string;
  action: string;
  text: string;
  savedAt: string;
};

const SAVED_KEY = "loan-factory-coach-assistant-drafts";

type Props = {
  people: AssignedPerson[];
  coachLabel: string;
};

// Right-side slide-out coaching assistant. Available to corporate coaches, paid
// coaches, team leaders, LO Development, and master_admin (mounted in the
// command-center layout, which is already role-gated). It is contextual to the
// coach + a selected LO from their roster and produces REAL drafts — never a
// bare copy-prompt button. Everything is draft-only and local; nothing is sent.
export default function CoachAssistantPanel({ people, coachLabel }: Props) {
  const [open, setOpen] = useState(false);
  const [personId, setPersonId] = useState(people[0]?.id ?? "");
  const [actionId, setActionId] = useState<CoachAssistantActionId>(
    coachAssistantActions[0].id,
  );
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [recent, setRecent] = useState<SavedDraft[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const coach = useMemo(() => coachProfileFromLabel(coachLabel), [coachLabel]);
  const person = useMemo(
    () => people.find((p) => p.id === personId) ?? people[0],
    [people, personId],
  );
  const action = useMemo(
    () => coachAssistantActions.find((a) => a.id === actionId),
    [actionId],
  );

  // Close on Escape; restore focus to the toggle.
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function readRecentDrafts(): SavedDraft[] {
    try {
      return (
        JSON.parse(localStorage.getItem(SAVED_KEY) ?? "[]") as SavedDraft[]
      ).slice(0, 5);
    } catch {
      return [];
    }
  }

  function openPanel() {
    setRecent(readRecentDrafts());
    setOpen(true);
  }

  function generate() {
    if (!person || !action) return;
    setDraft(buildCoachAssistantDraft(action.id, coach, person));
    setCopied(false);
    setSaved(false);
  }

  async function copyDraft() {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be blocked; the draft stays visible to copy manually.
    }
  }

  function saveLocal() {
    if (!draft || !person || !action) return;
    const entry: SavedDraft = {
      id: `${Date.now()}`,
      personId: person.id,
      personName: person.name,
      action: action.label,
      text: draft,
      savedAt: new Date().toISOString(),
    };
    try {
      const existing = JSON.parse(
        localStorage.getItem(SAVED_KEY) ?? "[]",
      ) as SavedDraft[];
      localStorage.setItem(
        SAVED_KEY,
        JSON.stringify([entry, ...existing].slice(0, 25)),
      );
      setRecent([entry, ...existing].slice(0, 5));
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2500);
    } catch {
      // Local storage may be unavailable; the draft remains on screen.
    }
  }

  if (people.length === 0) return null;

  return (
    <>
      {/* Toggle button (always visible bottom-right) */}
      <button
        ref={toggleRef}
        type="button"
        onClick={openPanel}
        aria-expanded={open}
        aria-controls="coach-assistant-panel"
        className="fixed bottom-4 right-4 z-40 rounded-full bg-lf-charcoal px-4 py-3 text-sm font-semibold text-white shadow-lift transition hover:bg-lf-navy"
      >
        Coach assistant
      </button>

      {/* Backdrop */}
      {open && (
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-lf-charcoal/30"
        />
      )}

      {/* Slide-out panel */}
      <aside
        id="coach-assistant-panel"
        ref={panelRef}
        role="dialog"
        aria-modal={open}
        aria-label="Coach assistant"
        className={`fixed inset-y-0 right-0 z-50 flex w-[min(28rem,100vw)] flex-col bg-white shadow-lift transition-transform duration-200 ${
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between gap-3 border-b border-lf-line px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orangeDark">
              Draft-only · nothing is sent
            </p>
            <h2 className="mt-1 text-lg font-semibold text-lf-charcoal">
              Coach assistant
            </h2>
            <p className="mt-0.5 text-xs text-lf-slate">
              Coach: {coach.name}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              toggleRef.current?.focus();
            }}
            className="rounded-lg border border-lf-line px-2.5 py-1 text-sm font-semibold text-lf-slate transition hover:border-lf-orange hover:text-lf-orange"
            aria-label="Close coach assistant"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="grid gap-3">
            <label className="grid gap-1 text-xs font-semibold text-lf-charcoal">
              Select an LO from your roster
              <select
                value={personId}
                onChange={(event) => {
                  setPersonId(event.target.value);
                  setDraft("");
                }}
                className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-normal text-lf-charcoal"
              >
                {people.map((p) => (
                  <option key={p.id} value={p.id}>
                    {shortName(p.name)} — {p.program}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1 text-xs font-semibold text-lf-charcoal">
              What should I draft?
              <select
                value={actionId}
                onChange={(event) => {
                  setActionId(event.target.value as CoachAssistantActionId);
                  setDraft("");
                }}
                className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-normal text-lf-charcoal"
              >
                {coachAssistantActions.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.label}
                  </option>
                ))}
              </select>
            </label>

            {action && (
              <p className="text-xs text-lf-slate">
                {action.description}
                {action.needsIntegration && (
                  <span className="ml-1 font-semibold text-lf-orangeDark">
                    Integration required before this can actually send.
                  </span>
                )}
              </p>
            )}

            {person && (
              <div className="rounded-lg bg-lf-mist/60 px-3 py-2 text-xs text-lf-slate">
                Context: {shortName(person.name)} ·{" "}
                {person.scorecardStatus === "submitted"
                  ? "scorecard submitted"
                  : person.scorecardStatus === "missing"
                    ? "scorecard missing"
                    : "scorecard not required"}{" "}
                · next: {person.nextTask}
              </div>
            )}

            <button
              type="button"
              onClick={generate}
              className="btn-primary w-full"
            >
              Generate draft
            </button>
          </div>

          {draft && (
            <div className="mt-4">
              <label className="grid gap-1 text-xs font-semibold text-lf-charcoal">
                Draft (edit before you use it)
                <textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  rows={12}
                  className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-normal text-lf-charcoal"
                />
              </label>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={copyDraft}
                  className="btn-secondary text-sm"
                >
                  {copied ? "Copied ✓" : "Copy draft"}
                </button>
                <button
                  type="button"
                  onClick={saveLocal}
                  className="rounded-lg bg-lf-orange px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-lf-orangeDark"
                >
                  {saved ? "Saved locally ✓" : "Save as local draft"}
                </button>
              </div>
              <p className="mt-2 text-xs text-lf-slate">
                Saved locally in this browser. DB wiring is planned — see the
                integration plan.
              </p>
            </div>
          )}

          {recent.length > 0 && (
            <div className="mt-6 border-t border-lf-line pt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                Recent local drafts
              </h3>
              <ul className="mt-2 grid gap-2">
                {recent.map((entry) => (
                  <li
                    key={entry.id}
                    className="rounded-lg border border-lf-line bg-lf-mist/40 px-3 py-2"
                  >
                    <p className="text-xs font-semibold text-lf-charcoal">
                      {entry.action} · {shortName(entry.personName)}
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-lf-slate">
                      {entry.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
