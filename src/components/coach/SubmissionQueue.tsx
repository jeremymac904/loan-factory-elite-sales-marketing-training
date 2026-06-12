"use client";

import { useEffect, useState } from "react";
import { readSubmissions, type SubmissionRecord } from "@/lib/scorecardSync";
import {
  fetchSubmissionsCloud,
  markSubmissionReviewed,
  type CloudSubmission,
} from "@/lib/coachingCloud";

type Row = SubmissionRecord & {
  program: string;
  id?: string;
  memberName?: string;
  reviewed?: boolean;
};

/**
 * The coach review queue. Reads real member submissions from Supabase when
 * configured; falls back to this browser's local records otherwise.
 */
export default function SubmissionQueue() {
  const [rows, setRows] = useState<Row[]>([]);
  const [source, setSource] = useState<"cloud" | "local">("local");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    fetchSubmissionsCloud().then((cloud) => {
      if (cloud) {
        setRows(
          cloud.map((c: CloudSubmission) => ({
            ...c,
            program: c.program === "alliance" ? "Alliance" : "LO Mastery",
            memberName: c.memberName,
          })),
        );
        setSource("cloud");
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
      setRows((current) =>
        current.map((row) => (row.id === id ? { ...row, reviewed: true } : row)),
      );
    });
  }

  if (!hydrated || rows.length === 0) return null;

  return (
    <section className="rounded-2xl border border-lf-line bg-white p-5 shadow-card">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="h-display text-xl">Scorecard submissions</h2>
        <p className="text-xs text-lf-slate">
          {source === "cloud"
            ? `${rows.filter((r) => !r.reviewed).length} waiting for review`
            : "Local records only — member submissions appear once signed in"}
        </p>
      </div>
      <div className="mt-3 grid gap-3">
        {rows.map((row, index) => (
          <div
            key={row.id ?? `${row.program}-${row.submittedAt}-${index}`}
            className="flex flex-col gap-1 border-l-2 border-lf-orange pl-3 sm:flex-row sm:items-start sm:justify-between"
          >
            <div className="min-w-0">
              <p className="text-sm font-bold text-lf-navy">
                {row.memberName ? `${row.memberName} · ` : ""}
                {row.program} · week of {row.weekOf} · {row.submittedAt}
              </p>
              <p className="text-sm text-lf-charcoal">
                {Object.entries(row.totals)
                  .filter(([, total]) => total > 0)
                  .map(([metric, total]) => `${metric}: ${total}`)
                  .join(" · ") || "No activity recorded"}
              </p>
              {row.timeBlocks && Object.keys(row.timeBlocks).length > 0 && (
                <p className="text-sm text-lf-slate">
                  Time blocks: {Object.entries(row.timeBlocks).map(([d, v]) => `${d}: ${v}`).join(" · ")}
                </p>
              )}
              {(row.stuck || row.focus) && (
                <p className="text-sm text-lf-slate">
                  {row.stuck && `Stuck: ${row.stuck}`}
                  {row.stuck && row.focus && " · "}
                  {row.focus && `Next week: ${row.focus}`}
                </p>
              )}
            </div>
            {source === "cloud" && row.id && (
              <div className="shrink-0">
                {row.reviewed ? (
                  <p className="text-xs font-bold uppercase tracking-wide text-lf-slate">
                    Reviewed
                  </p>
                ) : (
                  <button type="button" onClick={() => review(row.id!)} className="btn-secondary">
                    Mark reviewed
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
