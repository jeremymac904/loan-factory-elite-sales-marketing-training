"use client";

import { useState } from "react";

const initialForm = {
  loName: "",
  loEmail: "",
  processorName: "",
  processorEmail: "",
  lenderName: "",
  aeName: "",
  aeEmail: "",
  loanNumber: "",
  urgency: "normal",
  issueCategory: "status_update",
  explanation: "",
  requestedHelp: "",
};

export default function LenderEscalationForm() {
  const [form, setForm] = useState(initialForm);
  const [saved, setSaved] = useState(false);

  function updateField(field: keyof typeof initialForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setSaved(false);
  }

  function saveLocal() {
    setSaved(true);
  }

  return (
    <div className="card">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="LO name" value={form.loName} onChange={(value) => updateField("loName", value)} />
        <Field label="LO email" type="email" value={form.loEmail} onChange={(value) => updateField("loEmail", value)} />
        <Field label="Processor name" value={form.processorName} onChange={(value) => updateField("processorName", value)} />
        <Field label="Processor email" type="email" value={form.processorEmail} onChange={(value) => updateField("processorEmail", value)} />
        <Field label="Lender name" value={form.lenderName} onChange={(value) => updateField("lenderName", value)} />
        <Field label="AE name" value={form.aeName} onChange={(value) => updateField("aeName", value)} />
        <Field label="AE email" type="email" value={form.aeEmail} onChange={(value) => updateField("aeEmail", value)} />
        <Field label="Loan number optional" value={form.loanNumber} onChange={(value) => updateField("loanNumber", value)} />
        <label className="grid gap-1 text-sm font-semibold text-lf-charcoal">
          Urgency
          <select
            value={form.urgency}
            onChange={(event) => updateField("urgency", event.target.value)}
            className="rounded-lg border border-lf-line px-3 py-2 font-normal outline-none focus:border-lf-orange focus:ring-2 focus:ring-lf-orange/20"
          >
            <option value="normal">Normal</option>
            <option value="urgent">Urgent</option>
            <option value="critical">Critical</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm font-semibold text-lf-charcoal">
          Issue category
          <select
            value={form.issueCategory}
            onChange={(event) => updateField("issueCategory", event.target.value)}
            className="rounded-lg border border-lf-line px-3 py-2 font-normal outline-none focus:border-lf-orange focus:ring-2 focus:ring-lf-orange/20"
          >
            <option value="status_update">Status update</option>
            <option value="conditions">Conditions</option>
            <option value="turn_time">Turn time</option>
            <option value="communication">Communication</option>
            <option value="other">Other</option>
          </select>
        </label>
      </div>

      <div className="mt-4 grid gap-4">
        <TextArea label="Explanation" value={form.explanation} onChange={(value) => updateField("explanation", value)} />
        <TextArea label="Requested help" value={form.requestedHelp} onChange={(value) => updateField("requestedHelp", value)} />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="button" className="btn-primary" onClick={saveLocal}>
          Save for Manual Review
        </button>
        <p className="text-sm font-semibold text-lf-slate">
          No email, automation, Google connection, or external send is triggered.
        </p>
      </div>

      {saved && (
        <p className="mt-4 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">
          Escalation captured for beta preview only. Manual review is still
          required before anyone contacts the lender.
        </p>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-lf-charcoal">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-lg border border-lf-line px-3 py-2 font-normal outline-none focus:border-lf-orange focus:ring-2 focus:ring-lf-orange/20"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-lf-charcoal">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className="rounded-lg border border-lf-line px-3 py-2 font-normal outline-none focus:border-lf-orange focus:ring-2 focus:ring-lf-orange/20"
      />
    </label>
  );
}
