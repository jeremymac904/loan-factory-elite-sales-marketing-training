"use client";

import { useMemo, useState } from "react";
import {
  coachingLiveTools,
  type CoachingFormTemplate,
  getCoachingFormsForAudience,
} from "@/data/coachingForms";

type DraftState = Record<string, string>;

function readDraft(storageKey: string): DraftState {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(storageKey) ?? "{}") as DraftState;
  } catch {
    return {};
  }
}

function DraftFormCard({ form }: { form: CoachingFormTemplate }) {
  const [values, setValues] = useState<DraftState>(() => readDraft(form.storageKey));
  const [status, setStatus] = useState<"draft" | "saved" | "idle">("idle");

  function updateField(key: string, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setStatus("draft");
  }

  function persist() {
    try {
      localStorage.setItem(form.storageKey, JSON.stringify(values));
      setStatus("saved");
    } catch {
      // Local storage can fail in private mode; the form still works in memory.
    }
  }

  function resetDraft() {
    setValues({});
    setStatus("idle");
    try {
      localStorage.removeItem(form.storageKey);
    } catch {
      // ignore
    }
  }

  return (
    <article id={form.id} className="card flex scroll-mt-24 flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
            {form.sourceFolder}
          </span>
          <h3 className="h-display mt-1 text-lg">{form.title}</h3>
        </div>
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
          {status === "saved" ? "Saved locally" : "Draft only"}
        </span>
      </div>

      <p className="prose-lf text-sm text-lf-slate">{form.description}</p>

      <div className="rounded-xl border border-lf-line bg-lf-mist/40 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
          Who it is for
        </p>
        <p className="mt-1 text-sm text-lf-charcoal">{form.whoFor}</p>
      </div>

      {form.sourceFileName && (
        <div className="rounded-xl border border-lf-line bg-white px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
            Source file
          </p>
          <p className="mt-1 text-sm text-lf-charcoal">{form.sourceFileName}</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {form.fields.map((field) => {
          const value = values[field.key] ?? "";
          if (field.type === "textarea") {
            return (
              <label key={field.key} className="grid gap-1 text-sm font-semibold text-lf-charcoal sm:col-span-2">
                {field.label}
                {field.hint && (
                  <span className="text-xs font-normal text-lf-slate">{field.hint}</span>
                )}
                <textarea
                  value={value}
                  onChange={(event) => updateField(field.key, event.target.value)}
                  rows={field.rows ?? 3}
                  placeholder={field.placeholder}
                  className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-normal text-lf-charcoal"
                />
              </label>
            );
          }

          if (field.type === "select") {
            return (
              <label key={field.key} className="grid gap-1 text-sm font-semibold text-lf-charcoal">
                {field.label}
                {field.hint && (
                  <span className="text-xs font-normal text-lf-slate">{field.hint}</span>
                )}
                <select
                  value={value}
                  onChange={(event) => updateField(field.key, event.target.value)}
                  className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-normal text-lf-charcoal"
                >
                  <option value="">Select…</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            );
          }

          return (
            <label key={field.key} className="grid gap-1 text-sm font-semibold text-lf-charcoal">
              {field.label}
              {field.hint && (
                <span className="text-xs font-normal text-lf-slate">{field.hint}</span>
              )}
              <input
                type={field.type === "number" ? "number" : field.type}
                value={value}
                onChange={(event) => updateField(field.key, event.target.value)}
                placeholder={field.placeholder}
                className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-normal text-lf-charcoal"
              />
            </label>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={persist} className="btn-primary">
          Save draft
        </button>
        <button type="button" onClick={resetDraft} className="btn-secondary">
          Reset
        </button>
        <p className="text-xs text-lf-slate">
          Draft only until persistence is wired. Nothing is sent anywhere.
        </p>
      </div>
    </article>
  );
}

type Props = {
  access: {
    canLoMastery: boolean;
    canAlliance: boolean;
    isStaff: boolean;
  };
};

export default function TrackerFormsCenter({ access }: Props) {
  const forms = useMemo(
    () =>
      getCoachingFormsForAudience(access).sort((a, b) => {
        const order = { member: 0, growth: 1, coach: 2 } as const;
        return order[a.section] - order[b.section];
      }),
    [access],
  );

  const memberLiveTools = coachingLiveTools.filter((tool) => {
    if (access.isStaff && tool.audience === "coach") return true;
    if (tool.audience === "member") return true;
    return access.isStaff;
  });

  return (
    <div className="grid gap-8">
      <section className="card border-lf-orange/30 bg-lf-orangeSoft/20">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orangeDark">
              Live native tools
            </p>
            <h2 className="h-display text-2xl">Open the live tools first.</h2>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wide text-lf-charcoal">
            Native pages
          </span>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {memberLiveTools.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="rounded-xl border border-lf-line bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <p className="text-sm font-semibold text-lf-charcoal">{tool.title}</p>
              <p className="mt-1 text-xs text-lf-slate">{tool.description}</p>
            </a>
          ))}
        </div>
      </section>

      <div className="grid gap-8">
        {forms.map((form) => (
          <DraftFormCard key={form.id} form={form} />
        ))}
      </div>
    </div>
  );
}
