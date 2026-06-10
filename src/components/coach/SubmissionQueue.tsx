"use client";

import { useEffect, useState } from "react";
import { readSubmissions, type SubmissionRecord } from "@/lib/scorecardSync";

type Row = SubmissionRecord & { program: string };

/**
 * Member scorecard submissions land here automatically when a member submits
 * their week. Reads the local submission stores (browser-local until the
 * shared database is connected).
 */
export default function SubmissionQueue() {
  const [rows, setRows] = useState<Row[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only store read after hydration.
    setRows([
      ...readSubmissions("mastery").map((r) => ({ ...r, program: "LO Mastery" })),
      ...readSubmissions("alliance").map((r) => ({ ...r, program: "Alliance" })),
    ]);
    setHydrated(true);
  }, []);

  if (!hydrated || rows.length === 0) return null;

  return (
    <section className="rounded-2xl border border-lf-line bg-white p-5 shadow-card">
      <h2 className="h-display text-xl">New scorecard submissions</h2>
      <div className="mt-3 grid gap-3">
        {rows.map((row) => (
          <div key={`${row.program}-${row.submittedAt}`} className="border-l-2 border-lf-orange pl-3">
            <p className="text-sm font-bold text-lf-navy">
              {row.program} · week of {row.weekOf} · {row.submittedAt}
            </p>
            <p className="text-sm text-lf-charcoal">
              {Object.entries(row.totals)
                .filter(([, total]) => total > 0)
                .map(([metric, total]) => `${metric}: ${total}`)
                .join(" · ") || "No activity recorded"}
            </p>
            {(row.stuck || row.focus) && (
              <p className="text-sm text-lf-slate">
                {row.stuck && `Stuck: ${row.stuck}`}
                {row.stuck && row.focus && " · "}
                {row.focus && `Next week: ${row.focus}`}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
