"use client";

import { useEffect, useState } from "react";
import { readSubmissions, type SubmissionRecord } from "@/lib/scorecardSync";
import {
  addCoachFeedbackCloud,
  fetchAllFeedbackCloud,
  fetchSubmissionsCloud,
  markSubmissionReviewed,
} from "@/lib/coachingCloud";
import {
  allianceScorecardMetrics,
  scorecardMetrics,
} from "@/data/coachingPlatform";

type Row = SubmissionRecord & {
  program: string;
  id?: string;
  memberId?: string;
  memberName?: string;
  reviewed?: boolean;
};

type Feedback = { memberId: string; feedback: string; nextAction: string; createdAt: string };

const DAY_ORDER = ["monday", "tuesday", "wednesday", "thursday", "friday", "weekend"];

function goalsFor(program: string) {
  return program === "Alliance" ? allianceScorecardMetrics : scorecardMetrics;
}

/** % of metrics the member actually recorded data for this week. */
function scorecardPct(row: Row): number {
  const goals = goalsFor(row.program);
  const withData = goals.filter((m) => (row.totals[m.metric] ?? 0) > 0).length;
  return Math.round((withData / goals.length) * 100);
}

/** Capped average progress against the weekly goals. */
function goalPct(row: Row): number {
  const goals = goalsFor(row.program);
  const sum = goals.reduce(
    (acc, m) => acc + Math.min((row.totals[m.metric] ?? 0) / (m.goal || 1), 1),
    0,
  );
  return Math.round((sum / goals.length) * 100);
}

/**
 * The coach review queue — everything on one screen: numbers, goal progress,
 * time blocks, weekly reflection, and coach notes with inline reply.
 */
export default function SubmissionQueue() {
  const [rows, setRows] = useState<Row[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [source, setSource] = useState<"cloud" | "local">("local");
  const [hydrated, setHydrated] = useState(false);
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  useEffect(() => {
    Promise.all([fetchSubmissionsCloud(), fetchAllFeedbackCloud()]).then(([cloud, fb]) => {
      if (cloud) {
        setRows(
          cloud.map((c) => ({
            ...c,
            program: c.program === "alliance" ? "Alliance" : "LO Mastery",
          })),
        );
        setSource("cloud");
        if (fb) setFeedback(fb);
      } else {
        setRows([
          ...readSubmissions("mastery").map((r) => ({ ...r, program: "LO Mastery" })),
          ...readSubmissions("alliance").map((r) => ({ ...r, program: "Alliance" })),
        ]);
        setSource("local");
      }
      setHydrated(true);
    });
  }, []);

  function review(id: string) {
    markSubmissionReviewed(id).then((ok) => {
      if (!ok) return;
      setRows((current) => current.map((r) => (r.id === id ? { ...r, reviewed: true } : r)));
    });
  }

  function sendNote(row: Row) {
    const note = (drafts[row.id ?? ""] ?? "").trim();
    if (!note || !row.memberId || !row.id) return;
    addCoachFeedbackCloud(row.memberId, note, row.id).then((ok) => {
      if (!ok) return;
      setFeedback((current) => [
        { memberId: row.memberId!, feedback: note, nextAction: "", createdAt: "just now" },
        ...current,
      ]);
      setDrafts((current) => ({ ...current, [row.id!]: "" }));
    });
  }

  if (!hydrated || rows.length === 0) return null;

  return (
    <section className="rounded-2xl border border-lf-line bg-white shadow-card">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-lf-line px-4 py-2">
        <h2 className="h-display text-lg">Scorecard submissions</h2>
        <p className="text-xs text-lf-slate">
          {source === "cloud"
            ? `${rows.filter((r) => !r.reviewed).length} waiting for review`
            : "Local records only — member submissions appear once signed in"}
        </p>
      </div>
      <div className="divide-y divide-lf-line">
        {rows.map((row, index) => {
          const notes = feedback.filter((f) => f.memberId === row.memberId).slice(0, 2);
          const blocks = DAY_ORDER.filter((d) => row.timeBlocks?.[d]);
          return (
            <div key={row.id ?? `${row.program}-${row.submittedAt}-${index}`} className="px-4 py-2.5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <p className="text-sm font-bold text-lf-navy">
                  {row.memberName ? `${row.memberName} · ` : ""}
                  {row.program} · week of {row.weekOf}
                </p>
                <p className="text-xs text-lf-slate">{row.submittedAt}</p>
                <p className="text-xs font-bold text-lf-charcoal">
                  Scorecard {scorecardPct(row)}% · Goal{" "}
                  <span className={goalPct(row) >= 60 ? "text-green-700" : "text-lf-orange"}>
                    {goalPct(row)}%
                  </span>
                </p>
                <div className="ml-auto">
                  {source === "cloud" && row.id ? (
                    row.reviewed ? (
                      <p className="text-xs font-bold uppercase tracking-wide text-lf-slate">Reviewed</p>
                    ) : (
                      <button type="button" onClick={() => review(row.id!)} className="btn-secondary">
                        Mark reviewed
                      </button>
                    )
                  ) : null}
                </div>
              </div>

              <p className="mt-1 text-sm text-lf-charcoal">
                {Object.entries(row.totals)
                  .filter(([, total]) => total > 0)
                  .map(([metric, total]) => `${metric}: ${total}`)
                  .join(" · ") || "No activity recorded"}
              </p>

              {blocks.length > 0 && (
                <p className="mt-0.5 text-sm text-lf-slate">
                  <strong className="text-lf-navy">Time blocks:</strong>{" "}
                  {blocks.map((d) => `${d.slice(0, 3)}: ${row.timeBlocks?.[d]}`).join(" · ")}
                </p>
              )}

              {(row.worked || row.didntWork || row.stuck || row.focus) && (
                <div className="mt-0.5 grid gap-x-6 sm:grid-cols-2">
                  {([
                    ["Worked", row.worked],
                    ["Didn't work", row.didntWork],
                    ["Obstacle", row.stuck],
                    ["Next week", row.focus],
                  ] as const)
                    .filter(([, value]) => value)
                    .map(([label, value]) => (
                      <p key={label} className="text-sm text-lf-slate">
                        <strong className="text-lf-navy">{label}:</strong> {value}
                      </p>
                    ))}
                </div>
              )}

              {notes.length > 0 && (
                <div className="mt-0.5">
                  {notes.map((note, noteIndex) => (
                    <p key={noteIndex} className="border-l-2 border-lf-orange pl-2 text-sm text-lf-charcoal">
                      <strong className="text-lf-navy">Coach note ({note.createdAt}):</strong>{" "}
                      {note.feedback}
                    </p>
                  ))}
                </div>
              )}

              {source === "cloud" && row.id && row.memberId && (
                <div className="mt-1.5 flex gap-2">
                  <input
                    aria-label={`Coach note for ${row.memberName}`}
                    value={drafts[row.id] ?? ""}
                    onChange={(event) =>
                      setDrafts((current) => ({ ...current, [row.id!]: event.target.value }))
                    }
                    placeholder="Add a coach note — the member sees this on their profile"
                    className="h-8 min-w-0 flex-1 rounded-lg border border-lf-line px-2 text-sm text-lf-charcoal outline-none focus:border-lf-orange"
                  />
                  <button type="button" onClick={() => sendNote(row)} className="btn-secondary shrink-0">
                    Send note
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
