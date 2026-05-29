"use client";

import { useState } from "react";
import {
  marketMentorAudienceOptions,
  marketMentorToneOptions,
  type MarketMentorAudience,
  type MarketMentorTone,
} from "@/data/marketMentor";

type SampleOutput = {
  heading: string;
  body: string;
};

const sampleOutputs: SampleOutput[] = [
  {
    heading: "Borrower explanation",
    body: "Mortgage rates moved this week after a new inflation report. Short version: bond markets re-priced, and that flowed through to mortgage rates. What it means for you: nothing is forced — but if you're close to a decision, it's worth re-running your numbers this week so you're working with today's reality, not last month's.",
  },
  {
    heading: "Realtor explanation",
    body: "Quick read: rates moved on this week's data. For your buyers, the conversation isn't about timing the market — it's about being ready to move when their personal situation lines up. Happy to run scenarios for any of your buyers if it helps the conversation.",
  },
  {
    heading: "Social / FaceGram post",
    body: "This week in the market: rates moved on new inflation data.\n\nWhat it means for buyers: re-run your numbers if you're close to a decision.\nWhat it means for Realtors: this is a buyer conversation worth having.\n\nNot a prediction. Just the picture this week.",
  },
  {
    heading: "Short video script (60s)",
    body: "Hook: Rates moved this week. Here's what happened. (1s)\nWhat happened: Inflation data came in higher than expected. Bonds re-priced. Mortgage rates followed. (2s)\nWhat it means for buyers: re-run the numbers if you're close to a decision. (1s)\nWhat it means for Realtors: this is the buyer conversation to have this week. (1s)\nCTA: DM me with any scenario you want me to run.",
  },
  {
    heading: "Email draft outline",
    body: "Subject: Quick market note for the week\n\nHi [NAME],\n\nQuick read on this week:\n- What happened: [HEADLINE]\n- What it means for you: [PRACTICAL]\n- Next step: [OPTIONAL CALL OR RE-RUN]\n\nNo pressure — just keeping the picture clear.\n\n[YOU]",
  },
];

export default function MarketUpdateInterpreter() {
  const [headline, setHeadline] = useState("");
  const [audience, setAudience] = useState<MarketMentorAudience>(
    marketMentorAudienceOptions[0],
  );
  const [tone, setTone] = useState<MarketMentorTone>(marketMentorToneOptions[0]);
  const [built, setBuilt] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBuilt(true);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
      <form onSubmit={handleSubmit} className="card grid gap-4">
        <div>
          <h2 className="h-display text-xl">Input</h2>
          <p className="prose-lf mt-1 text-sm text-lf-slate">
            Paste a market headline, rate report, or internal note. Pick an
            audience and a tone.
          </p>
        </div>

        <label className="grid gap-1.5">
          <span className="text-sm font-semibold text-lf-slate">
            Market update / headline / note
          </span>
          <textarea
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="Example: CPI came in hotter than expected. The 10-year yield rose. Mortgage rates ticked up..."
            rows={5}
            className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm text-lf-charcoal focus:border-lf-orange focus:outline-none focus:ring-1 focus:ring-lf-orange"
          />
        </label>

        <label className="grid gap-1.5">
          <span className="text-sm font-semibold text-lf-slate">Audience</span>
          <select
            value={audience}
            onChange={(e) => setAudience(e.target.value as MarketMentorAudience)}
            className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm focus:border-lf-orange focus:outline-none focus:ring-1 focus:ring-lf-orange"
          >
            {marketMentorAudienceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1.5">
          <span className="text-sm font-semibold text-lf-slate">Tone</span>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value as MarketMentorTone)}
            className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm focus:border-lf-orange focus:outline-none focus:ring-1 focus:ring-lf-orange"
          >
            {marketMentorToneOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" className="btn-primary text-sm">
          Build versions
        </button>
        <p className="text-[11px] text-lf-slate">
          AI provider connection pending. Until connected, output below shows
          example template versions — not generated text. Review before any
          external use.
        </p>
      </form>

      <div className="grid gap-4">
        <div className="card border-yellow-200 bg-yellow-50">
          <p className="text-sm font-semibold text-yellow-900">
            Educational. Review before using externally. Do not predict rates.
            Do not promise appreciation. Do not guarantee savings.
          </p>
        </div>
        <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
          {built
            ? `Example output for ${audience} · ${tone}`
            : "Submit to preview example output"}
        </p>
        {sampleOutputs.map((output) => (
          <article
            key={output.heading}
            className="card"
          >
            <h3 className="h-display text-base">{output.heading}</h3>
            <p className="prose-lf mt-2 whitespace-pre-wrap text-sm text-lf-slate">
              {built
                ? output.body
                : "Click 'Build versions' to see this example output."}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
