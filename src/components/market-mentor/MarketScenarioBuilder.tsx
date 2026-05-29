"use client";

import { useState } from "react";

export type ScenarioField = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "number";
  required?: boolean;
};

export type ScenarioOutput = {
  heading: string;
  body: string;
};

type Props = {
  fields: ScenarioField[];
  outputHeading: string;
  outputs: ScenarioOutput[];
  responsibleLabel: string;
  submitLabel?: string;
};

export default function MarketScenarioBuilder({
  fields,
  outputHeading,
  outputs,
  responsibleLabel,
  submitLabel = "Build scenario",
}: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [built, setBuilt] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBuilt(true);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <form onSubmit={handleSubmit} className="card grid gap-4">
        <div>
          <h2 className="h-display text-xl">Scenario inputs</h2>
          <p className="prose-lf mt-1 text-sm text-lf-slate">
            {responsibleLabel}
          </p>
        </div>
        <div className="grid gap-3">
          {fields.map((field) => (
            <label key={field.name} className="grid gap-1.5">
              <span className="text-sm font-semibold text-lf-slate">
                {field.label}
                {field.required && <span className="text-lf-orange"> *</span>}
              </span>
              <input
                type={field.type ?? "text"}
                inputMode={field.type === "number" ? "decimal" : "text"}
                value={values[field.name] ?? ""}
                onChange={(e) =>
                  setValues({ ...values, [field.name]: e.target.value })
                }
                placeholder={field.placeholder}
                className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm text-lf-charcoal focus:border-lf-orange focus:outline-none focus:ring-1 focus:ring-lf-orange"
              />
            </label>
          ))}
        </div>
        <button type="submit" className="btn-primary text-sm">
          {submitLabel}
        </button>
      </form>

      <div className="grid gap-4">
        <div className="card border-yellow-200 bg-yellow-50">
          <p className="text-sm font-semibold text-yellow-900">
            Educational estimate only — review before using externally. Do not
            predict rates, do not promise appreciation, do not guarantee savings.
          </p>
        </div>
        <div className="card">
          <h2 className="h-display text-xl">{outputHeading}</h2>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-lf-slate">
            {built ? "Example output" : "Fill in the scenario to preview"}
          </p>
          <div className="mt-4 grid gap-4">
            {outputs.map((output) => (
              <article
                key={output.heading}
                className="rounded-lg border border-lf-line bg-white p-4"
              >
                <h3 className="text-sm font-semibold text-lf-charcoal">
                  {output.heading}
                </h3>
                <p className="prose-lf mt-1 text-sm text-lf-slate">
                  {built
                    ? output.body
                    : "Submit the scenario to see this example output."}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-4 text-[11px] text-lf-slate">
            Estimate model will be connected to the AI Twin / coaching assistant. Until then this view shows static example outputs as starting points.
          </p>
        </div>
      </div>
    </div>
  );
}
