"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import {
  removeSessionItem,
  setSessionItem,
  useSessionItem,
} from "@/lib/sessionStore";

type QuizOption = {
  id: string;
  label: string;
};

type QuizQuestion = {
  id: string;
  category: string;
  prompt: string;
  options: QuizOption[];
};

type QuizCategory = {
  id: string;
  label: string;
  description?: string;
};

type Props = {
  quizKind: "personality" | "new-lo";
  quizName: string;
  timeEstimate: string;
  categories: QuizCategory[];
  questions: QuizQuestion[];
  /** Where to send the LO after completion. */
  resultsHref: string;
};

const STORAGE_PREFIX = "lf-quiz:";

function storageKey(kind: Props["quizKind"]): string {
  return `${STORAGE_PREFIX}${kind}`;
}

type Persisted = {
  answers: Record<string, string>;
  activeIndex: number;
};

const EMPTY: Persisted = { answers: {}, activeIndex: 0 };

function parseRaw(raw: string | null): Persisted {
  if (!raw) return EMPTY;
  try {
    const parsed = JSON.parse(raw) as Partial<Persisted>;
    return {
      answers: parsed.answers ?? {},
      activeIndex: typeof parsed.activeIndex === "number" ? parsed.activeIndex : 0,
    };
  } catch {
    return EMPTY;
  }
}

export default function QuizRunner({
  quizKind,
  quizName,
  timeEstimate,
  categories,
  questions,
  resultsHref,
}: Props) {
  const router = useRouter();
  const key = storageKey(quizKind);
  const raw = useSessionItem(key);
  const state = useMemo(() => parseRaw(raw), [raw]);
  const { answers, activeIndex } = state;

  const categoryLabels = useMemo(() => {
    const map: Record<string, string> = {};
    categories.forEach((c) => (map[c.id] = c.label));
    return map;
  }, [categories]);

  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / questions.length) * 100);
  const current = questions[activeIndex];
  const allAnswered = answeredCount === questions.length;

  function persist(next: Persisted) {
    setSessionItem(key, JSON.stringify(next));
  }

  function select(optionId: string) {
    if (!current) return;
    const nextAnswers = { ...answers, [current.id]: optionId };
    const nextIndex =
      activeIndex < questions.length - 1 ? activeIndex + 1 : activeIndex;
    persist({ answers: nextAnswers, activeIndex: nextIndex });
  }

  function setActiveIndex(idx: number) {
    const clamped = Math.max(0, Math.min(questions.length - 1, idx));
    persist({ answers, activeIndex: clamped });
  }

  function submit() {
    if (!allAnswered) return;
    setSessionItem(
      `${STORAGE_PREFIX}latest`,
      JSON.stringify({
        kind: quizKind,
        answers,
        submittedAt: new Date().toISOString(),
      }),
    );
    router.push(resultsHref);
  }

  function resetQuiz() {
    removeSessionItem(key);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <div className="card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              {current ? categoryLabels[current.category] ?? "" : "All done"}
            </p>
            <h2 className="h-display mt-1 text-2xl">{quizName}</h2>
            <p className="mt-1 text-sm text-lf-slate">{timeEstimate}</p>
          </div>
          <span className="rounded-full border border-lf-line bg-white px-3 py-1 text-xs font-semibold text-lf-charcoal">
            Question {Math.min(activeIndex + 1, questions.length)} of {questions.length}
          </span>
        </div>

        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-lf-mist">
          <div
            className="h-full bg-lf-orange transition-all"
            style={{ width: `${progress}%` }}
            aria-hidden
          />
        </div>
        <p className="mt-2 text-xs text-lf-slate">
          {answeredCount} answered · {questions.length - answeredCount} to go
        </p>

        {current ? (
          <div className="mt-6">
            <h3 className="font-display text-xl font-semibold text-lf-navy">
              {current.prompt}
            </h3>
            <div className="mt-4 grid gap-3">
              {current.options.map((opt) => {
                const selected = answers[current.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => select(opt.id)}
                    className={`w-full rounded-xl border p-4 text-left text-sm leading-6 transition ${
                      selected
                        ? "border-lf-orange bg-lf-orangeSoft text-lf-navy shadow-card"
                        : "border-lf-line bg-white text-lf-charcoal hover:border-lf-orange hover:bg-lf-mist"
                    }`}
                    aria-pressed={selected}
                  >
                    <span className="block font-semibold text-lf-navy">
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setActiveIndex(activeIndex - 1)}
                disabled={activeIndex === 0}
              >
                Back
              </button>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setActiveIndex(activeIndex + 1)}
                  disabled={activeIndex >= questions.length - 1}
                >
                  Skip
                </button>
                {allAnswered && (
                  <button type="button" className="btn-primary" onClick={submit}>
                    See my report
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid gap-3 text-center">
            <h3 className="h-display text-2xl">All questions answered.</h3>
            <p className="text-sm text-lf-slate">
              Click below to generate your coaching profile.
            </p>
            <div className="mt-2 flex justify-center">
              <button type="button" className="btn-primary" onClick={submit}>
                See my report
              </button>
            </div>
          </div>
        )}
      </div>

      <aside className="card flex h-fit flex-col gap-4">
        <div>
          <h3 className="h-display text-lg">Progress</h3>
          <p className="mt-1 text-sm text-lf-slate">
            Jump to any question. Your answers are saved on this device for this
            session only.
          </p>
        </div>
        <ol className="grid grid-cols-5 gap-2 lg:grid-cols-4">
          {questions.map((q, i) => {
            const isActive = i === activeIndex;
            const isAnswered = !!answers[q.id];
            return (
              <li key={q.id}>
                <button
                  type="button"
                  aria-current={isActive ? "step" : undefined}
                  onClick={() => setActiveIndex(i)}
                  className={`flex h-9 w-full items-center justify-center rounded-md border text-xs font-semibold transition ${
                    isActive
                      ? "border-lf-orange bg-lf-orange text-white"
                      : isAnswered
                        ? "border-lf-line bg-lf-orangeSoft text-lf-orangeDark"
                        : "border-lf-line bg-white text-lf-charcoal hover:bg-lf-mist"
                  }`}
                >
                  {i + 1}
                </button>
              </li>
            );
          })}
        </ol>
        <div className="grid gap-2 text-xs text-lf-slate">
          <p>
            <span className="mr-1 inline-block h-3 w-3 rounded-sm bg-lf-orange align-middle" />
            Active question
          </p>
          <p>
            <span className="mr-1 inline-block h-3 w-3 rounded-sm bg-lf-orangeSoft align-middle" />
            Answered
          </p>
          <p>
            <span className="mr-1 inline-block h-3 w-3 rounded-sm bg-white align-middle ring-1 ring-lf-line" />
            Not answered
          </p>
        </div>
        <div className="border-t border-lf-line pt-4">
          <button
            type="button"
            className="text-xs font-semibold uppercase tracking-wide text-lf-orange hover:underline"
            onClick={resetQuiz}
          >
            Reset quiz
          </button>
          <p className="mt-3 text-xs text-lf-slate">
            Coaching tool only. Not a clinical, employment, or compliance
            assessment.
          </p>
          <Link
            href="/assessments/"
            className="mt-3 inline-block text-xs font-semibold text-lf-navy underline"
          >
            Back to Assessments
          </Link>
        </div>
      </aside>
    </div>
  );
}
