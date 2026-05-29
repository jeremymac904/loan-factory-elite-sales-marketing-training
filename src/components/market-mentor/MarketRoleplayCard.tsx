"use client";

import { useState } from "react";
import type { MarketRoleplay } from "@/data/marketMentorRoleplays";

type Props = {
  roleplay: MarketRoleplay;
};

const difficultyBadge: Record<MarketRoleplay["difficulty"], string> = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  hard: "bg-red-100 text-red-800",
};

export default function MarketRoleplayCard({ roleplay }: Props) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(roleplay.starterPrompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article className="card flex flex-col gap-3">
      <header className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="h-display text-base">{roleplay.title}</h3>
          <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
            For {roleplay.audience}
          </p>
        </div>
        <span
          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${difficultyBadge[roleplay.difficulty]}`}
        >
          {roleplay.difficulty}
        </span>
      </header>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
          Scenario
        </p>
        <p className="prose-lf mt-1 text-sm">{roleplay.scenario}</p>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
          Goal
        </p>
        <p className="prose-lf mt-1 text-sm">{roleplay.goal}</p>
      </div>

      <details className="rounded-lg border border-lf-line bg-lf-mist p-3 text-sm">
        <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-lf-charcoal">
          What good sounds like / common mistakes / score criteria
        </summary>
        <div className="mt-3 grid gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-lf-slate">
              What good sounds like
            </p>
            <ul className="mt-1 list-disc pl-5 text-xs">
              {roleplay.whatGoodSoundsLike.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-lf-slate">
              Common mistakes
            </p>
            <ul className="mt-1 list-disc pl-5 text-xs">
              {roleplay.commonMistakes.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-lf-slate">
              Score criteria
            </p>
            <ul className="mt-1 list-disc pl-5 text-xs">
              {roleplay.scoreCriteria.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </details>

      <div className="flex flex-wrap items-center gap-2 pt-2">
        <button
          type="button"
          onClick={() => setShowPrompt(!showPrompt)}
          className="rounded-md bg-lf-navy px-3 py-1.5 text-xs font-semibold text-white hover:bg-lf-orange"
        >
          {showPrompt ? "Hide starter prompt" : "Launch roleplay"}
        </button>
        {showPrompt && (
          <button
            type="button"
            onClick={copyPrompt}
            className="rounded-md border border-lf-line bg-white px-3 py-1.5 text-xs font-semibold text-lf-charcoal hover:border-lf-orange"
          >
            {copied ? "Copied" : "Copy prompt"}
          </button>
        )}
      </div>

      {showPrompt && (
        <pre className="overflow-x-auto rounded-lg border border-lf-line bg-lf-mist p-3 text-xs leading-relaxed whitespace-pre-wrap">
          {roleplay.starterPrompt}
        </pre>
      )}
    </article>
  );
}
