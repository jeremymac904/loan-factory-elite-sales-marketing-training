"use client";

import { useState } from "react";

const jeremyEmail = "jeremy.mcdonald@loanfactory.com";

export default function SuggestionModal() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    suggestion: "",
  });

  const subject = encodeURIComponent("LO Development Platform Suggestion");
  const body = encodeURIComponent(
    [
      "Have an idea, broken link, missing resource, or platform improvement?",
      "",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      "",
      "Suggestion:",
      form.suggestion,
    ].join("\n"),
  );

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(jeremyEmail);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-semibold text-lf-charcoal transition hover:border-lf-orange hover:text-lf-orange"
        onClick={() => setOpen(true)}
      >
        Suggestions?
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-5 py-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="suggestion-title"
        >
          <div className="w-full max-w-lg rounded-2xl border border-lf-line bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="suggestion-title" className="h-display text-2xl">
                  Send a suggestion
                </h2>
                <p className="mt-2 text-sm leading-6 text-lf-slate">
                  Have an idea, broken link, missing resource, or platform
                  improvement? Send it to Jeremy.
                </p>
              </div>
              <button
                type="button"
                className="rounded-full border border-lf-line px-3 py-1 text-sm font-semibold text-lf-charcoal hover:border-lf-orange hover:text-lf-orange"
                onClick={() => setOpen(false)}
                aria-label="Close suggestion form"
              >
                Close
              </button>
            </div>

            <div className="mt-5 grid gap-4">
              <label className="grid gap-1 text-sm font-semibold text-lf-charcoal">
                Name
                <input
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  className="rounded-lg border border-lf-line px-3 py-2 font-normal outline-none focus:border-lf-orange focus:ring-2 focus:ring-lf-orange/20"
                />
              </label>
              <label className="grid gap-1 text-sm font-semibold text-lf-charcoal">
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  className="rounded-lg border border-lf-line px-3 py-2 font-normal outline-none focus:border-lf-orange focus:ring-2 focus:ring-lf-orange/20"
                />
              </label>
              <label className="grid gap-1 text-sm font-semibold text-lf-charcoal">
                Suggestion
                <textarea
                  value={form.suggestion}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      suggestion: event.target.value,
                    }))
                  }
                  rows={5}
                  className="rounded-lg border border-lf-line px-3 py-2 font-normal outline-none focus:border-lf-orange focus:ring-2 focus:ring-lf-orange/20"
                />
              </label>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" className="btn-secondary" onClick={() => setOpen(false)}>
                Close
              </button>
              <button type="button" className="btn-secondary" onClick={copyEmail}>
                {copied ? "Email copied" : "Copy email"}
              </button>
              <a
                href={`mailto:${jeremyEmail}?subject=${subject}&body=${body}`}
                className="btn-primary"
              >
                Email Jeremy
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
