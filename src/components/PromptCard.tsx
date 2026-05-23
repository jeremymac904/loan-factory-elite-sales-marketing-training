"use client";

import { useState } from "react";
import { PromptItem } from "@/data/prompts";

type Props = {
  prompt: PromptItem;
};

export default function PromptCard({ prompt }: Props) {
  const [copied, setCopied] = useState(false);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt.body);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article
      id={prompt.id}
      className="card flex flex-col gap-3 scroll-mt-24"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          {prompt.category}
        </span>
      </div>
      <div className="flex items-start justify-between gap-3">
        <h3 className="h-display text-lg">{prompt.title}</h3>
        <button
          type="button"
          className="shrink-0 rounded-lg border border-lf-line bg-white px-3 py-2 text-xs font-semibold text-lf-navy transition hover:border-lf-orange hover:text-lf-orange"
          onClick={copyPrompt}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="prose-lf text-sm text-lf-slate">{prompt.useCase}</p>
      <pre className="code-block">{prompt.body}</pre>
      {prompt.tips && (
        <div className="prose-lf text-sm text-lf-slate">
          <strong className="text-lf-navy">How to use it: </strong>
          {prompt.tips}
        </div>
      )}
    </article>
  );
}
