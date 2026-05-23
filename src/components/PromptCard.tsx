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

  function downloadPrompt() {
    const safeTitle = prompt.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const content = [
      `# ${prompt.title}`,
      "",
      `Category: ${prompt.category}`,
      `When to use it: ${prompt.useCase}`,
      "",
      "## Prompt",
      prompt.body,
      "",
      "## Review reminder",
      prompt.tips ??
        "AI output is a draft. Review and edit before any borrower-facing, partner-facing, or public use.",
    ].join("\n");
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${safeTitle || prompt.id}.md`;
    anchor.click();
    URL.revokeObjectURL(url);
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
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            className="rounded-lg border border-lf-line bg-white px-3 py-2 text-xs font-semibold text-lf-navy transition hover:border-lf-orange hover:text-lf-orange"
            onClick={copyPrompt}
          >
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            type="button"
            className="rounded-lg border border-lf-line bg-white px-3 py-2 text-xs font-semibold text-lf-navy transition hover:border-lf-orange hover:text-lf-orange"
            onClick={downloadPrompt}
          >
            Download .md
          </button>
          <button
            type="button"
            className="rounded-lg border border-lf-line bg-lf-mist px-3 py-2 text-xs font-semibold text-lf-slate"
            disabled
          >
            Google Doc coming soon
          </button>
        </div>
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
