"use client";

import { useState } from "react";
import type { MarketPrompt } from "@/data/marketMentorPrompts";

type Props = {
  prompt: MarketPrompt;
};

export default function MarketPromptCard({ prompt }: Props) {
  const [copied, setCopied] = useState(false);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt.body);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article className="card flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="h-display text-base">{prompt.title}</h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-lf-slate">
            For {prompt.audience}
          </p>
        </div>
        <span className="rounded-full bg-lf-mist px-2 py-0.5 text-[11px] font-semibold text-lf-charcoal">
          {prompt.category.replaceAll("_", " ")}
        </span>
      </div>
      <pre className="overflow-x-auto rounded-lg border border-lf-line bg-lf-mist p-3 text-xs leading-relaxed text-lf-charcoal whitespace-pre-wrap">
        {prompt.body}
      </pre>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={copyPrompt}
          className="rounded-md bg-lf-navy px-3 py-1.5 text-xs font-semibold text-white hover:bg-lf-orange"
        >
          {copied ? "Copied" : "Copy prompt"}
        </button>
        {prompt.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-lf-line px-2 py-0.5 text-[10px] font-semibold text-lf-slate"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
