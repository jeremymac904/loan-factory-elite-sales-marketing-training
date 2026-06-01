"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  answerPlatformQuestion,
  commandCenterStarterPrompts,
  starterPromptText,
  type GuidedAnswer,
} from "@/data/roleAssistant";

// Custom event the side-panel assistant listens for, so "Open full assistant"
// from the dashboard chat opens the same RoleAssistantPanel used everywhere.
export const OPEN_ASSISTANT_EVENT = "lf:open-assistant";

type ChatTurn = {
  id: string;
  question: string;
  answer: GuidedAnswer;
};

type Props = {
  role: string;
  roleLabel: string;
  firstName?: string | null;
  // Compact variant is used inside the right-side panel's "Ask" tab.
  variant?: "dashboard" | "panel";
};

/**
 * First-login Command Center chat — a premium, ChatGPT-style command box.
 *
 * HONEST GUIDED MODE: answers come from local, role-aware templates grounded in
 * real platform routes (answerPlatformQuestion). It does NOT call any external
 * or paid AI provider and never sends anything. The architecture is
 * provider-ready: swap answerPlatformQuestion() for a server action later and
 * the UI is unchanged.
 *
 * Not a modal, not a blocking popup, no autoplay video, no forced video popup.
 */
export default function CommandCenterChat({
  role,
  roleLabel,
  firstName,
  variant = "dashboard",
}: Props) {
  const [input, setInput] = useState("");
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [helperOpen, setHelperOpen] = useState(true);
  const counter = useRef(0);

  function ask(question: string) {
    const q = question.trim();
    if (!q) return;
    const answer = answerPlatformQuestion(q, role);
    counter.current += 1;
    setTurns((prev) =>
      [...prev, { id: `t${counter.current}`, question: q, answer }].slice(-6),
    );
    setInput("");
  }

  function openFullAssistant() {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(OPEN_ASSISTANT_EVENT));
    }
  }

  const greetingName = firstName?.trim() ? `, ${firstName.trim()}` : "";
  const isPanel = variant === "panel";

  return (
    <section
      aria-label="LO Development command center chat"
      className={
        isPanel
          ? "rounded-xl border border-lf-line bg-white"
          : "relative overflow-hidden rounded-2xl border border-lf-line bg-white shadow-soft"
      }
    >
      {!isPanel && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(242,106,31,0.10),transparent_42%)]"
        />
      )}

      <div className={isPanel ? "relative p-4" : "relative p-5 md:p-6"}>
        {/* Header row: title + role context + friendly avatar helper */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span
              aria-hidden
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lf-navy text-base font-bold text-white"
            >
              LF
            </span>
            <div>
              <h2
                className={
                  isPanel
                    ? "text-base font-semibold text-lf-charcoal"
                    : "h-display text-xl"
                }
              >
                Command Center
              </h2>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-lf-orangeDark">
                Guided help · {roleLabel}
              </p>
            </div>
          </div>
          {!isPanel && (
            <span className="rounded-full border border-lf-line bg-lf-mist px-2.5 py-1 text-[11px] font-semibold text-lf-slate">
              Guided answers · nothing is sent
            </span>
          )}
        </div>

        {/* Friendly, non-blocking helper card (dismissible, no popup/video). */}
        {helperOpen && (
          <div className="mt-4 flex items-start justify-between gap-3 rounded-xl border border-lf-orange/30 bg-lf-orangeSoft/60 px-4 py-3">
            <p className="text-sm font-medium text-lf-charcoal">
              👋 Have questions about how to use the LO Development Platform? Ask
              me right here{greetingName}.
            </p>
            <button
              type="button"
              onClick={() => setHelperOpen(false)}
              aria-label="Dismiss helper message"
              className="shrink-0 rounded-md px-1.5 text-sm font-bold text-lf-slate transition hover:text-lf-orange"
            >
              ✕
            </button>
          </div>
        )}

        {/* Conversation log (only after first question; keeps page compact). */}
        {turns.length > 0 && (
          <div
            className={`mt-4 grid gap-3 overflow-y-auto ${
              isPanel ? "max-h-72" : "max-h-80"
            }`}
          >
            {turns.map((turn) => (
              <div key={turn.id} className="grid gap-2">
                <p className="justify-self-end rounded-2xl rounded-br-sm bg-lf-navy px-3.5 py-2 text-sm font-medium text-white">
                  {turn.question}
                </p>
                <div className="rounded-2xl rounded-bl-sm border border-lf-line bg-lf-mist/50 px-3.5 py-2.5">
                  <p className="whitespace-pre-line text-sm text-lf-charcoal">
                    {turn.answer.body}
                  </p>
                  {turn.answer.links.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {turn.answer.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          prefetch={false}
                          className="inline-flex items-center gap-1 rounded-lg border border-lf-orange/40 bg-white px-2.5 py-1 text-xs font-semibold text-lf-orangeDark transition hover:bg-lf-orange hover:text-white"
                        >
                          {link.label} →
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Command input */}
        <form
          className="mt-4 flex items-center gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            ask(input);
          }}
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask how to use the platform…"
            aria-label="Ask the command center"
            className="min-w-0 flex-1 rounded-xl border border-lf-line bg-white px-4 py-3 text-sm text-lf-charcoal shadow-sm outline-none transition focus:border-lf-orange focus:ring-2 focus:ring-lf-orange/20"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="btn-primary shrink-0 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Ask
          </button>
        </form>

        {/* Suggested starter prompts */}
        <div className="mt-3 flex flex-wrap gap-2">
          {commandCenterStarterPrompts
            .slice(0, isPanel ? 6 : 10)
            .map((prompt) => (
              <button
                key={prompt.id}
                type="button"
                onClick={() => ask(starterPromptText(prompt.id))}
                className="rounded-full border border-lf-line bg-lf-mist/60 px-3 py-1.5 text-xs font-semibold text-lf-charcoal transition hover:border-lf-orange hover:bg-white hover:text-lf-orange"
              >
                {prompt.label}
              </button>
            ))}
        </div>

        {/* Footer: honest mode note + connect to the full side-panel assistant */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-lf-line pt-3">
          <p className="text-[11px] text-lf-slate">
            Guided assistant — structured answers grounded in the platform. Live
            AI provider wiring is planned; nothing is sent.
          </p>
          <button
            type="button"
            onClick={openFullAssistant}
            className="text-xs font-semibold text-lf-orangeDark underline-offset-2 transition hover:underline"
          >
            Open full assistant →
          </button>
        </div>
      </div>
    </section>
  );
}
