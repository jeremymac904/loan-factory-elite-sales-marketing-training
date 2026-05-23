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
  triggerLabel = "Suggestions?",
  triggerClassName = "rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-semibold text-lf-charcoal transition hover:border-lf-orange hover:text-lf-orange",
}: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const supabaseConfigured = hasSupabasePublicConfig(getSupabasePublicConfig());
  const [authState, setAuthState] = useState<SuggestionAuthState>(() =>
    supabaseConfigured ? { status: "loading" } : { status: "not-configured" },
  );
  const [form, setForm] = useState({
    category: "platform",
    suggestion: "",
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
    const suggestion = form.suggestion.trim();

    setSaved(false);
    setSaveError(null);

    if (!suggestion) {
      setSaveError("Add a suggestion before saving.");
      return;
    }

    if (authState.status !== "signed-in") {
      setSaveError("Sign in with Google before saving to Supabase.");
      return;
    }

    const supabase = createBrowserSupabaseClient();

    if (!supabase) {
      setSaveError("Supabase is not configured for this environment yet.");
      return;
    }

    const { error } = await supabase.from("suggestions").insert({
      user_id: form.anonymous ? null : authState.userId,
      anonymous: form.anonymous,
      category: form.category,
      message: suggestion,
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
          <div className="w-full max-w-lg rounded-2xl border border-lf-line bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="suggestion-title" className="h-display text-2xl">
                  Send a suggestion
                </h2>
                <p className="mt-2 text-sm leading-6 text-lf-slate">
                  Have an idea, broken link, missing resource, or platform
                  improvement? Signed-in users can save a category and message
                  to Supabase. Or copy Jeremy's email and send it manually.
                  This app will not send email.
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
              <p className="rounded-lg border border-lf-line bg-lf-mist px-3 py-2 text-sm font-semibold text-lf-slate">
                {authState.status === "signed-in"
                  ? `Saving as ${form.anonymous ? "anonymous feedback" : authState.email}.`
                  : "Sign in with Google to save feedback in Supabase."}
              </p>
              <label className="grid gap-1 text-sm font-semibold text-lf-charcoal">
                Category
                <select
                  value={form.category}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      category: event.target.value,
                    }))
                  }
                  className="rounded-lg border border-lf-line px-3 py-2 font-normal outline-none focus:border-lf-orange focus:ring-2 focus:ring-lf-orange/20"
                >
                  <option value="platform">Platform</option>
                  <option value="content">Content</option>
                  <option value="broken_link">Broken link</option>
                  <option value="feature">Feature request</option>
                  <option value="other">Other</option>
                </select>
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
                Save as anonymous feedback
              </label>
            </div>

            {saved && (
              <p className="mt-4 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">
                Suggestion saved in Supabase.
              </p>
            )}

            {saveError && (
              <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
                {saveError}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" className="btn-secondary" onClick={() => setOpen(false)}>
                Close
              </button>
              <button type="button" className="btn-secondary" onClick={copyEmail}>
                {copied ? "Email copied" : "Copy email"}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={saveSuggestion}
                disabled={authState.status !== "signed-in" || !form.suggestion.trim()}
              >
                Save suggestion
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
