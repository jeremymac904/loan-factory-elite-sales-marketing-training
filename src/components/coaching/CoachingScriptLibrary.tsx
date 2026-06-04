"use client";

import { useMemo, useState } from "react";
import {
  getCoachingScriptsByCategory,
} from "@/data/coachingScripts";

type CopiedState = string | null;

type Props = {
  access: {
    canLoMastery: boolean;
    canAlliance: boolean;
    isStaff: boolean;
  };
};

export default function CoachingScriptLibrary({ access }: Props) {
  const [copied, setCopied] = useState<CopiedState>(null);
  const grouped = useMemo(
    () =>
      getCoachingScriptsByCategory()
        .map((group) => ({
          ...group,
          scripts: group.scripts.filter((script) => {
            if (access.isStaff) return true;
            if (script.accessTier === "coach") return false;
            if (script.accessTier === "alliance") return access.canAlliance;
            return access.canLoMastery;
          }),
        }))
        .filter((group) => group.scripts.length > 0),
    [access],
  );

  async function copyText(id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      window.setTimeout(() => setCopied((current) => (current === id ? null : current)), 1800);
    } catch {
      // Copy may be unavailable; the text remains visible.
    }
  }

  return (
    <div className="grid gap-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {grouped.map((category) => (
          <a
            key={category.id}
            href={`#${category.id}`}
            className="card transition hover:-translate-y-0.5 hover:shadow-lift"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Scripts
            </span>
            <h2 className="h-display mt-1 text-lg">{category.title}</h2>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              {category.description}
            </p>
          </a>
        ))}
      </div>

      {grouped.map((group) => (
        <section key={group.id} id={group.id} className="scroll-mt-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              {group.title}
            </p>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              {group.description}
            </p>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {group.scripts.map((script) => (
              <article key={script.id} id={script.anchor} className="card flex flex-col gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                    {script.whoFor}
                  </span>
                  <h3 className="h-display mt-1 text-lg">{script.title}</h3>
                  <p className="prose-lf mt-2 text-sm text-lf-slate">
                    {script.purpose}
                  </p>
                </div>

                <div className="rounded-xl border border-lf-line bg-white px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                    Source
                  </p>
                  <p className="mt-1 text-sm text-lf-charcoal">
                    {script.sourceFolder}
                    {script.sourceFileName ? ` · ${script.sourceFileName}` : ""}
                  </p>
                </div>

                <pre className="code-block whitespace-pre-wrap">{script.body}</pre>

                <div className="mt-auto flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => copyText(script.id, script.body)}
                    className="btn-primary"
                  >
                    {copied === script.id ? "Copied" : "Copy script"}
                  </button>
                  <a
                    href="/member-area/trackers/"
                    className="btn-secondary"
                  >
                    Open trackers
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
