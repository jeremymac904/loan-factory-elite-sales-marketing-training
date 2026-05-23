"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import {
  getSupabasePublicConfig,
  hasSupabasePublicConfig,
} from "@/lib/supabase/config";

const jeremyEmail = "jeremy.mcdonald@loanfactory.com";

type Props = {
  triggerLabel?: string;
  triggerClassName?: string;
};

type SuggestionAuthState =
  | { status: "loading" }
  | { status: "not-configured" }
  | { status: "signed-out" }
  | { status: "signed-in"; userId: string; email: string };

export default function SuggestionModal({
  triggerLabel = "Send Feedback",
  triggerClassName = "rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-semibold text-lf-charcoal transition hover:border-lf-orange hover:text-lf-orange",
}: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [localOnly, setLocalOnly] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const supabaseConfigured = hasSupabasePublicConfig(getSupabasePublicConfig());
  const [authState, setAuthState] = useState<SuggestionAuthState>(() =>
    supabaseConfigured ? { status: "loading" } : { status: "not-configured" },
  );
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "platform",
    feedback: "",
    anonymous: false,
  });

  useEffect(() => {
    if (!supabaseConfigured) return;

    const supabase = createBrowserSupabaseClient();

    if (!supabase) return;

    const client = supabase;
    let active = true;

    async function loadUser() {
      const {
        data: { user },
      } = await client.auth.getUser();

      if (!active) return;

      setAuthState(
        user?.email
          ? { status: "signed-in", userId: user.id, email: user.email }
          : { status: "signed-out" },
      );
    }

    void loadUser();

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange(() => {
      void loadUser();
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabaseConfigured]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(jeremyEmail);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  async function saveSuggestion() {
    const feedback = form.feedback.trim();

    setSaved(false);
    setLocalOnly(false);
    setSaveError(null);

    if (!feedback) {
      setSaveError("Add feedback before saving.");
      return;
    }

    if (authState.status !== "signed-in") {
      setLocalOnly(true);
      setSaved(true);
      return;
    }

    const supabase = createBrowserSupabaseClient();

    if (!supabase) {
      setSaveError("Feedback saving is not ready in this environment yet.");
      return;
    }

    const { error } = await supabase.from("suggestions").insert({
      user_id: form.anonymous ? null : authState.userId,
      anonymous: form.anonymous,
      category: form.topic,
      message: [
        `Name: ${form.anonymous ? "Anonymous" : form.name.trim() || "Not provided"}`,
        `Email: ${form.anonymous ? "Anonymous" : form.email.trim() || authState.email}`,
        "",
        feedback,
      ].join("\n"),
    });

    if (error) {
      setSaveError(error.message);
      return;
    }

    setSaved(true);
  }

  return (
    <>
      <button
        type="button"
        className={triggerClassName}
        onClick={() => {
          setOpen(true);
          setSaved(false);
          setLocalOnly(false);
          setSaveError(null);
        }}
      >
        {triggerLabel}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-5 py-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="suggestion-title"
        >
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-lf-line bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="suggestion-title" className="h-display text-2xl">
                  Send feedback
                </h2>
                <p className="mt-2 text-sm leading-6 text-lf-slate">
                  Tell us what is confusing, broken, missing, or worth
                  improving. The app will not send email. If you are not signed
                  in, your feedback is only shown as a preview confirmation.
                  Do not include borrower names, loan details, or private file
                  information.
                </p>
              </div>
              <button
                type="button"
                className="rounded-full border border-lf-line px-3 py-1 text-sm font-semibold text-lf-charcoal hover:border-lf-orange hover:text-lf-orange"
                onClick={() => setOpen(false)}
                aria-label="Close feedback form"
              >
                Close
              </button>
            </div>

            <div className="mt-5 grid gap-4">
              <p className="rounded-lg border border-lf-line bg-lf-mist px-3 py-2 text-sm font-semibold text-lf-slate">
                {authState.status === "signed-in"
                  ? `Saving as ${form.anonymous ? "anonymous feedback" : authState.email}.`
                  : "Preview only: sign in with Google if you need to submit feedback."}
              </p>
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
                  disabled={form.anonymous}
                  className="rounded-lg border border-lf-line px-3 py-2 font-normal outline-none focus:border-lf-orange focus:ring-2 focus:ring-lf-orange/20 disabled:bg-lf-mist"
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
                  disabled={form.anonymous}
                  className="rounded-lg border border-lf-line px-3 py-2 font-normal outline-none focus:border-lf-orange focus:ring-2 focus:ring-lf-orange/20 disabled:bg-lf-mist"
                />
              </label>
              <label className="grid gap-1 text-sm font-semibold text-lf-charcoal">
                Topic
                <select
                  value={form.topic}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      topic: event.target.value,
                    }))
                  }
                  className="rounded-lg border border-lf-line px-3 py-2 font-normal outline-none focus:border-lf-orange focus:ring-2 focus:ring-lf-orange/20"
                >
                  <option value="platform">Website or app</option>
                  <option value="content">Content</option>
                  <option value="broken_link">Broken link</option>
                  <option value="feature">Feature request</option>
                  <option value="other">Other</option>
                </select>
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
              <label className="flex items-center gap-2 text-sm font-semibold text-lf-charcoal">
                <input
                  type="checkbox"
                  checked={form.anonymous}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      anonymous: event.target.checked,
                    }))
                  }
                  className="h-4 w-4 rounded border-lf-line text-lf-orange"
                />
                Send as anonymous feedback
              </label>
            </div>

            {saved && (
              <p className="mt-4 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">
                {localOnly
                  ? "Feedback captured for this preview session only. It was not submitted and no email was sent."
                  : "Feedback saved. No email was sent."}
              </p>
            )}

            {saveError && (
              <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
                {saveError}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
              <button type="button" className="btn-secondary" onClick={copyEmail}>
                {copied ? "Email copied" : "Copy email"}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={saveSuggestion}
                disabled={!form.feedback.trim()}
              >
                Save feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
