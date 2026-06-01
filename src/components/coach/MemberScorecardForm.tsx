"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  scorecardSectionsForTier,
  type ScorecardField,
} from "@/data/coachCommandCenter";

type Tier = "lo_mastery" | "alliance";

type SavedScorecard = {
  id: string;
  tier: Tier;
  weekOf: string;
  values: Record<string, string>;
  savedAt: string;
};

const STORAGE_KEY = "loan-factory-member-scorecard";

function readSavedScorecard(): SavedScorecard | null {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? "null",
    ) as SavedScorecard | null;
  } catch {
    return null;
  }
}

function isoWeekLabel(): string {
  const now = new Date();
  return now.toISOString().slice(0, 10);
}

// LO-owned weekly scorecard (Findings #6 / #17). The LO submits THEIR real
// weekly activity. Saved locally as a draft this sprint — no DB write yet.
export default function MemberScorecardForm({
  initialTier = "lo_mastery",
}: {
  initialTier?: Tier;
}) {
  const [initialSaved] = useState<SavedScorecard | null>(readSavedScorecard);
  const [tier, setTier] = useState<Tier>(initialSaved?.tier ?? initialTier);
  const [weekOf, setWeekOf] = useState(initialSaved?.weekOf ?? isoWeekLabel());
  const [values, setValues] = useState<Record<string, string>>(
    initialSaved?.values ?? {},
  );
  const [status, setStatus] = useState<"draft" | "saved" | null>(null);
  const [lastSaved, setLastSaved] = useState<SavedScorecard | null>(
    initialSaved,
  );

  const sections = useMemo(() => scorecardSectionsForTier(tier), [tier]);

  function setField(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setStatus("draft");
  }

  function persist(kind: "draft" | "saved") {
    const entry: SavedScorecard = {
      id: `${Date.now()}`,
      tier,
      weekOf,
      values,
      savedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
      setLastSaved(entry);
    } catch {
      // Local storage may be unavailable; values remain on screen.
    }
    setStatus(kind);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    persist("saved");
  }

  function renderField(field: ScorecardField) {
    const value = values[field.key] ?? "";
    if (field.type === "longtext") {
      return (
        <label
          key={field.key}
          className="grid gap-1 text-sm font-semibold text-lf-charcoal sm:col-span-2"
        >
          {field.label}
          {field.hint && (
            <span className="text-xs font-normal text-lf-slate">{field.hint}</span>
          )}
          <textarea
            value={value}
            onChange={(event) => setField(field.key, event.target.value)}
            rows={3}
            className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-normal text-lf-charcoal"
          />
        </label>
      );
    }
    return (
      <label
        key={field.key}
        className="grid gap-1 text-sm font-semibold text-lf-charcoal"
      >
        {field.label}
        {field.hint && (
          <span className="text-xs font-normal text-lf-slate">{field.hint}</span>
        )}
        <input
          type={field.type === "number" ? "number" : "text"}
          min={field.type === "number" ? 0 : undefined}
          inputMode={field.type === "number" ? "numeric" : undefined}
          value={value}
          onChange={(event) => setField(field.key, event.target.value)}
          className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-normal text-lf-charcoal"
        />
      </label>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="card flex flex-wrap items-end justify-between gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1 text-sm font-semibold text-lf-charcoal">
            Your coaching tier
            <select
              value={tier}
              onChange={(event) => {
                setTier(event.target.value as Tier);
                setStatus("draft");
              }}
              className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-normal text-lf-charcoal"
            >
              <option value="lo_mastery">LO Mastery ($249)</option>
              <option value="alliance">Loan Factory Alliance ($449)</option>
            </select>
          </label>
          <label className="grid gap-1 text-sm font-semibold text-lf-charcoal">
            Week of
            <input
              type="date"
              value={weekOf}
              onChange={(event) => {
                setWeekOf(event.target.value);
                setStatus("draft");
              }}
              className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-normal text-lf-charcoal"
            />
          </label>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            status === "saved"
              ? "bg-green-100 text-green-800"
              : "bg-lf-mist text-lf-slate"
          }`}
        >
          {status === "saved"
            ? "Saved locally in this browser ✓"
            : status === "draft"
              ? "Draft — not yet saved"
              : "Saved locally until the database is connected"}
        </span>
      </div>

      {sections.map((section) => (
        <div key={section.title} className="card">
          <h3 className="h-display text-lg">{section.title}</h3>
          <p className="prose-lf mt-1 text-sm">{section.description}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {section.fields.map(renderField)}
          </div>
        </div>
      ))}

      <div className="card flex flex-wrap items-center gap-3 border-lf-orange/40 bg-lf-orangeSoft/20">
        <button type="submit" className="btn-primary">
          Submit weekly scorecard
        </button>
        <button
          type="button"
          onClick={() => persist("draft")}
          className="btn-secondary"
        >
          Save draft
        </button>
        <p className="prose-lf text-xs text-lf-slate">
          Saved locally in this browser until the database is connected.
          Submitting marks your scorecard ready for your coach to review and
          keeps it on this device — nothing is sent yet. Live submission to your
          coach is planned.
        </p>
        {lastSaved && status === "saved" && (
          <p className="w-full text-sm font-semibold text-green-700">
            Scorecard saved locally in this browser for week of{" "}
            {lastSaved.weekOf}. It stays on this device until the database is
            connected; your coach reviews submitted scorecards in the Coach
            Command Center.
          </p>
        )}
      </div>
    </form>
  );
}
