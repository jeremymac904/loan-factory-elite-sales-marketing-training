"use client";

import { useMemo, useState } from "react";

type Props = {
  triggerLabel?: string;
  triggerClassName?: string;
};

export default function AnonymousFeedbackModal({
  triggerLabel = "Submit anonymous feedback",
  triggerClassName = "btn-primary",
}: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    topic: "",
    feedback: "",
    contactEmail: "",
  });

  const feedbackText = useMemo(
    () =>
      [
        "Anonymous LO Development feedback",
        "",
        `Topic: ${form.topic}`,
        `Optional contact email: ${form.contactEmail}`,
        "",
        "Feedback:",
        form.feedback,
      ].join("\n"),
    [form],
  );

  async function copyFeedback() {
    try {
      await navigator.clipboard.writeText(feedbackText);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  function submitFeedback() {
    setSubmitted(true);
  }

  return (
    <>
      <button
        type="button"
        className={triggerClassName}
        onClick={() => {
          setOpen(true);
          setCopied(false);
          setSubmitted(false);
        }}
      >
        {triggerLabel}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-5 py-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="anonymous-feedback-title"
        >
          <div className="w-full max-w-lg rounded-2xl border border-lf-line bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="anonymous-feedback-title" className="h-display text-2xl">
                  Anonymous complaints and suggestions
                </h2>
                <p className="mt-2 text-sm leading-6 text-lf-slate">
                  Share feedback, complaints, missing resources, platform issues,
                  or ideas for improving LO Development programs.
                </p>
              </div>
              <button
                type="button"
                className="rounded-full border border-lf-line px-3 py-1 text-sm font-semibold text-lf-charcoal hover:border-lf-orange hover:text-lf-orange"
                onClick={() => setOpen(false)}
                aria-label="Close anonymous feedback form"
              >
                Close
              </button>
            </div>

            <div className="mt-5 grid gap-4">
              <label className="grid gap-1 text-sm font-semibold text-lf-charcoal">
                Topic
                <input
                  value={form.topic}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      topic: event.target.value,
                    }))
                  }
                  className="rounded-lg border border-lf-line px-3 py-2 font-normal outline-none focus:border-lf-orange focus:ring-2 focus:ring-lf-orange/20"
                />
              </label>
              <label className="grid gap-1 text-sm font-semibold text-lf-charcoal">
                Feedback
                <textarea
                  value={form.feedback}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      feedback: event.target.value,
                    }))
                  }
                  rows={5}
                  className="rounded-lg border border-lf-line px-3 py-2 font-normal outline-none focus:border-lf-orange focus:ring-2 focus:ring-lf-orange/20"
                />
              </label>
              <label className="grid gap-1 text-sm font-semibold text-lf-charcoal">
                Optional contact email
                <input
                  type="email"
                  value={form.contactEmail}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      contactEmail: event.target.value,
                    }))
                  }
                  className="rounded-lg border border-lf-line px-3 py-2 font-normal outline-none focus:border-lf-orange focus:ring-2 focus:ring-lf-orange/20"
                />
              </label>
            </div>

            {submitted && (
              <p className="mt-4 rounded-lg border border-lf-orange/30 bg-lf-orangeSoft px-3 py-2 text-sm font-semibold text-lf-orangeDark">
                Feedback is ready. Use Copy feedback to keep the text.
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" className="btn-secondary" onClick={() => setOpen(false)}>
                Close
              </button>
              <button type="button" className="btn-secondary" onClick={copyFeedback}>
                {copied ? "Feedback copied" : "Copy feedback"}
              </button>
              <button type="button" className="btn-primary" onClick={submitFeedback}>
                Prepare feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
