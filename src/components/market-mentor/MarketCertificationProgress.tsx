"use client";

import { useSyncExternalStore } from "react";
import type { MarketMentorCertificationStep } from "@/data/marketMentor";

type Props = {
  steps: MarketMentorCertificationStep[];
};

const STORAGE_KEY = "lf_market_mentor_cert_progress_v1";
const EVENT_NAME = "lf-market-mentor-cert-changed";

function readProgress(): string {
  if (typeof window === "undefined") return "{}";
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "{}";
  } catch {
    return "{}";
  }
}

function writeProgress(value: Record<string, boolean>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    window.dispatchEvent(new Event(EVENT_NAME));
  } catch {
    // ignore
  }
}

function subscribeProgress(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT_NAME, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENT_NAME, callback);
  };
}

export default function MarketCertificationProgress({ steps }: Props) {
  const raw = useSyncExternalStore(subscribeProgress, readProgress, () => "{}");
  let progress: Record<string, boolean> = {};
  try {
    progress = JSON.parse(raw) as Record<string, boolean>;
  } catch {
    progress = {};
  }

  function toggle(slug: string) {
    const next = { ...progress, [slug]: !progress[slug] };
    writeProgress(next);
  }

  const completed = steps.filter((s) => progress[s.slug]).length;
  const pct = Math.round((completed / steps.length) * 100);

  return (
    <div className="card">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="h-display text-2xl">Certification progress</h2>
          <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
            Local progress (stored in your browser until a Supabase tracking record is connected)
          </p>
        </div>
        <div className="text-right">
          <p className="font-display text-3xl font-semibold text-lf-orange">
            {pct}%
          </p>
          <p className="text-xs text-lf-slate">
            {completed} / {steps.length} steps
          </p>
        </div>
      </div>

      <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-lf-mist">
        <div
          className="h-2 bg-lf-orange transition-all"
          style={{ width: `${pct}%` }}
          aria-hidden
        />
      </div>

      <ol className="mt-6 grid gap-2">
        {steps.map((step) => {
          const done = Boolean(progress[step.slug]);
          return (
            <li
              key={step.slug}
              className={`flex items-start gap-3 rounded-lg border px-3 py-3 transition ${
                done
                  ? "border-green-200 bg-green-50"
                  : "border-lf-line bg-white"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(step.slug)}
                aria-pressed={done}
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                  done
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-lf-line bg-white text-transparent"
                }`}
              >
                <span className="text-[12px] leading-none">&#10003;</span>
              </button>
              <div className="flex-1">
                <p className="text-sm font-semibold text-lf-charcoal">
                  {step.order}. {step.title}
                </p>
                <p className="text-xs text-lf-slate">{step.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
