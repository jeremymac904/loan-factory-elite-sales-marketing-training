"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  buildRoleAssistantDraft,
  getAssistantConfig,
  type RoleAssistantActionId,
} from "@/data/roleAssistant";

type SavedDraft = {
  id: string;
  action: string;
  roleLabel: string;
  pageContext: string;
  text: string;
  savedAt: string;
};

const SAVED_KEY = "loan-factory-role-assistant-drafts";

type Props = {
  // Effective (view-as aware) role key, e.g. "loan_officer", "corporate_coach".
  role: string;
  // Effective role label, e.g. "Corporate Coach". Shown as "Assisting as: ...".
  roleLabel: string;
};

// Universal right-side AI assistant available to ALL major operational roles.
// One collapsible slide-out: toggle button bottom-right, backdrop, Escape to
// close, w-[min(28rem,100vw)]. It does NOT lengthen pages and does NOT cover key
// controls. Contextual to the effective role (view-as aware) + the current page
// via usePathname(). DRAFT-ONLY: every action produces an editable text draft
// with Copy + Save-as-local-draft. Nothing is ever sent.
//
// To avoid double panels, this suppresses itself on /coach-command-center routes,
// where the richer roster-aware CoachAssistantPanel is already mounted.
export default function RoleAssistantPanel({ role, roleLabel }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [recent, setRecent] = useState<SavedDraft[]>([]);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const config = useMemo(
    () => getAssistantConfig(role, roleLabel, pathname),
    [role, roleLabel, pathname],
  );
  const [actionId, setActionId] = useState<RoleAssistantActionId>(
    config.actions[0]?.id ?? "create_note",
  );

  // Keep the selected action valid when the role/page (and thus action list)
  // changes — e.g. when the View-as role switches.
  useEffect(() => {
    if (!config.actions.some((a) => a.id === actionId)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- resync the selected action when the role/page action list changes
      setActionId(config.actions[0]?.id ?? "create_note");
      setDraft("");
    }
  }, [config.actions, actionId]);

  const action = useMemo(
    () => config.actions.find((a) => a.id === actionId),
    [config.actions, actionId],
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
    if (!action) return;
    setDraft(
      buildRoleAssistantDraft({
        actionId: action.id,
        roleLabel: config.roleLabel,
        pageContext: config.pageContext,
      }),
    );
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
    if (!draft || !action) return;
    const entry: SavedDraft = {
      id: `${Date.now()}`,
      action: action.label,
      roleLabel: config.roleLabel,
      pageContext: config.pageContext,
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

  // Avoid double panels: the coach command center mounts the richer
  // CoachAssistantPanel, so the universal panel stays out of the way there.
  if ((pathname ?? "").startsWith("/coach-command-center")) return null;

  if (config.actions.length === 0) return null;

  return (
    <>
      {/* Toggle button. Sits ABOVE the Send Feedback button (bottom-4 right-4)
          so neither covers the other. */}
      <button
        ref={toggleRef}
        type="button"
        onClick={openPanel}
        aria-expanded={open}
        aria-controls="role-assistant-panel"
        className="fixed bottom-20 right-4 z-40 rounded-full bg-lf-charcoal px-4 py-3 text-sm font-semibold text-white shadow-lift transition hover:bg-lf-navy focus:outline-none focus:ring-2 focus:ring-lf-orange/30 sm:bottom-[5.5rem] sm:right-5"
      >
        AI assistant
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
        id="role-assistant-panel"
        role="dialog"
        aria-modal={open}
        aria-label="AI assistant"
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
              AI assistant
            </h2>
            <p className="mt-0.5 text-xs text-lf-slate">
              Assisting as: {config.roleLabel}
            </p>
            <p className="mt-0.5 text-xs text-lf-slate">
              On: {config.pageContext}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              toggleRef.current?.focus();
            }}
            className="rounded-lg border border-lf-line px-2.5 py-1 text-sm font-semibold text-lf-slate transition hover:border-lf-orange hover:text-lf-orange"
            aria-label="Close AI assistant"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="grid gap-3">
            <label className="grid gap-1 text-xs font-semibold text-lf-charcoal">
              What should I draft?
              <select
                value={actionId}
                onChange={(event) => {
                  setActionId(event.target.value as RoleAssistantActionId);
                  setDraft("");
                }}
                className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-normal text-lf-charcoal"
              >
                {config.actions.map((a) => (
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
                    Draft only — nothing is sent. Integration required before
                    this can actually send.
                  </span>
                )}
              </p>
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
                Saved locally in this browser. Nothing is sent. DB and
                integrations are planned.
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
                      {entry.action} · {entry.pageContext}
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
