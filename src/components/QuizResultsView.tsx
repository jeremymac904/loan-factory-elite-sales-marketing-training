"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  buildNewLoReport,
  buildPersonalityReport,
  quizDisclaimer,
  readinessLabel,
  scoreNewLoAptitudeQuiz,
  scorePersonalityQuiz,
} from "@/lib/quizScoring";
import { personalityQuizCategories } from "@/data/personalityQuiz";
import { aptitudeCategories } from "@/data/newLoAptitudeQuiz";
import { removeSessionItem, useSessionItem } from "@/lib/sessionStore";

type StoredLatest = {
  kind: "personality" | "new-lo";
  answers: Record<string, string>;
  submittedAt: string;
};

export default function QuizResultsView() {
  const raw = useSessionItem("lf-quiz:latest");
  const stored: StoredLatest | null = useMemo(() => {
    if (!raw) return null;
    try {
      return JSON.parse(raw) as StoredLatest;
    } catch {
      return null;
    }
  }, [raw]);
  const [toast, setToast] = useState<string | null>(null);

  const computed = useMemo(() => {
    if (!stored) return null;
    if (stored.kind === "personality") {
      const result = scorePersonalityQuiz(stored.answers);
      return {
        kind: "personality" as const,
        result,
        report: buildPersonalityReport(result),
      };
    }
    const result = scoreNewLoAptitudeQuiz(stored.answers);
    return {
      kind: "new-lo" as const,
      result,
      report: buildNewLoReport(result),
    };
  }, [stored]);

  function showToast(message: string) {
    setToast(message);
    setTimeout(() => setToast(null), 2200);
  }

  async function copyReport() {
    if (!computed) return;
    try {
      await navigator.clipboard.writeText(computed.report);
      showToast("Report copied to clipboard.");
    } catch {
      showToast("Could not copy. Try the download button instead.");
    }
  }

  function downloadReport() {
    if (!computed) return;
    const blob = new Blob([computed.report], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const name =
      computed.kind === "personality"
        ? "coaching-personality-report.md"
        : "new-lo-coaching-report.md";
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast("Report downloaded as Markdown.");
  }

  function printReport() {
    if (typeof window !== "undefined") window.print();
  }

  function startOver() {
    removeSessionItem("lf-quiz:personality");
    removeSessionItem("lf-quiz:new-lo");
    removeSessionItem("lf-quiz:latest");
  }

  if (!stored || !computed) {
    return (
      <div className="card">
        <h2 className="h-display text-xl">No completed quiz found.</h2>
        <p className="mt-2 text-sm text-lf-slate">
          Quiz answers are saved per browser session only. Take one of the
          quizzes below to generate your coaching report.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/personality-quiz/" className="btn-primary">
            Take the Coaching Personality Quiz
          </Link>
          <Link href="/new-lo-aptitude-quiz/" className="btn-secondary">
            Take the New LO Aptitude Quiz
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {toast && (
        <div className="rounded-lg border border-lf-orange/40 bg-lf-orangeSoft px-4 py-2 text-sm text-lf-orangeDark">
          {toast}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 print:hidden">
        <button type="button" className="btn-primary" onClick={copyReport}>
          Copy report
        </button>
        <button type="button" className="btn-secondary" onClick={downloadReport}>
          Download as Markdown
        </button>
        <button type="button" className="btn-secondary" onClick={printReport}>
          Print
        </button>
        <button type="button" className="btn-secondary" onClick={startOver}>
          Start over
        </button>
      </div>

      {computed.kind === "personality" ? (
        <PersonalityReport result={computed.result} />
      ) : (
        <NewLoReport result={computed.result} />
      )}

      <aside className="card border-lf-orange/30 bg-lf-orangeSoft/40">
        <p className="text-xs font-bold uppercase tracking-wide text-lf-orangeDark">
          Coaching tool only
        </p>
        <p className="prose-lf mt-2 text-sm text-lf-charcoal">{quizDisclaimer}</p>
      </aside>
    </div>
  );
}

function PersonalityReport({
  result,
}: {
  result: ReturnType<typeof scorePersonalityQuiz>;
}) {
  const { primary, secondary, profileScores, categoryLeads, isBlended } = result;
  const totalScore =
    profileScores.driver +
    profileScores.influencer +
    profileScores.steady +
    profileScores.conscientious;

  return (
    <article className="grid gap-6">
      <div className="card">
        <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          Coaching Personality Quiz · LO Development Profile
        </p>
        <h2 className="h-display mt-2 text-3xl">{primary.name}</h2>
        <p className="mt-1 text-sm text-lf-slate">{primary.tagline}</p>
        <p className="prose-lf mt-4 text-sm">{primary.summary}</p>
        {isBlended && secondary && (
          <p className="prose-lf mt-3 text-sm text-lf-charcoal">
            <strong>Secondary lean:</strong> {secondary.name}. You score nearly
            as high here, so use both profiles together when planning your
            coaching path.
          </p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="card">
          <h3 className="h-display text-lg">Strengths</h3>
          <ul className="prose-lf mt-3 text-sm">
            {primary.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3 className="h-display text-lg">Blind spots</h3>
          <ul className="prose-lf mt-3 text-sm">
            {primary.blindSpots.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card">
        <h3 className="h-display text-lg">Coaching recommendations</h3>
        <ul className="prose-lf mt-3 text-sm">
          {primary.coachingRecommendations.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="card">
          <h3 className="h-display text-lg">Best training path</h3>
          <p className="prose-lf mt-3 text-sm">{primary.bestTrainingPath}</p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-lf-orange">
            Suggested resources
          </p>
          <ul className="mt-2 grid gap-1 text-sm">
            {primary.suggestedResources.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="text-lf-navy underline hover:text-lf-orange">
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3 className="h-display text-lg">How your coach should talk to you</h3>
          <p className="prose-lf mt-3 text-sm">{primary.bestCommunicationStyle}</p>
        </div>
      </div>

      <div className="card">
        <h3 className="h-display text-lg">Category breakdown</h3>
        <p className="mt-1 text-sm text-lf-slate">
          Where each profile leads across your answers.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[460px] border-collapse text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-lf-slate">
                <th className="border-b border-lf-line pb-2">Category</th>
                <th className="border-b border-lf-line pb-2">Leading profile</th>
              </tr>
            </thead>
            <tbody>
              {personalityQuizCategories.map((cat) => (
                <tr key={cat.id} className="border-b border-lf-line">
                  <td className="py-2 pr-3 align-top text-lf-charcoal">{cat.label}</td>
                  <td className="py-2 align-top font-semibold text-lf-navy">
                    {labelForProfile(categoryLeads[cat.id])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-5 grid gap-2 text-xs text-lf-slate">
          <p>
            <strong className="text-lf-navy">Score totals:</strong> Driver{" "}
            {profileScores.driver} · Influencer {profileScores.influencer} ·
            Steady {profileScores.steady} · Conscientious{" "}
            {profileScores.conscientious}{" "}
            <span className="text-lf-slate">(out of {totalScore})</span>
          </p>
        </div>
      </div>

      <div className="card">
        <h3 className="h-display text-lg">Team leader notes</h3>
        <ul className="prose-lf mt-3 text-sm">
          {primary.teamLeaderNotes.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function NewLoReport({
  result,
}: {
  result: ReturnType<typeof scoreNewLoAptitudeQuiz>;
}) {
  const {
    readinessProfile,
    readinessAverage,
    personalityLean,
    categoryAverages,
  } = result;

  return (
    <article className="grid gap-6">
      <div className="card">
        <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          New LO Aptitude & Personality Quiz · LO Development Profile
        </p>
        <h2 className="h-display mt-2 text-3xl">{readinessProfile.name}</h2>
        <p className="mt-1 text-sm text-lf-slate">{readinessProfile.tagline}</p>
        <p className="mt-3 text-sm font-semibold text-lf-navy">
          {readinessProfile.developmentStage}
        </p>
        <p className="prose-lf mt-3 text-sm">{readinessProfile.summary}</p>
        {personalityLean && (
          <p className="prose-lf mt-3 text-sm text-lf-charcoal">
            <strong>Personality lean:</strong> {personalityLean.name} —{" "}
            {personalityLean.tagline}
          </p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="card">
          <h3 className="h-display text-lg">First 30-day coaching focus</h3>
          <ul className="prose-lf mt-3 text-sm">
            {readinessProfile.thirtyDayFocus.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3 className="h-display text-lg">First scripts to practice</h3>
          <ul className="prose-lf mt-3 text-sm">
            {readinessProfile.firstScripts.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="card">
          <h3 className="h-display text-lg">AI Training recommendations</h3>
          <ul className="prose-lf mt-3 text-sm">
            {readinessProfile.aiTrainingRecommendations.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3 className="h-display text-lg">Support routing</h3>
          <ul className="prose-lf mt-3 text-sm">
            {readinessProfile.supportRouting.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card">
        <h3 className="h-display text-lg">Category readiness</h3>
        <p className="mt-1 text-sm text-lf-slate">
          Overall readiness average: {readinessAverage.toFixed(2)} / 3 ·{" "}
          {readinessLabel(readinessAverage)}
        </p>
        <div className="mt-4 grid gap-2">
          {aptitudeCategories.map((cat) => {
            const score = categoryAverages[cat.id] ?? 0;
            const pct = Math.round((score / 3) * 100);
            return (
              <div key={cat.id}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-lf-charcoal">{cat.label}</span>
                  <span className="text-lf-slate">
                    {readinessLabel(score)} · {score.toFixed(2)}
                  </span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-lf-mist">
                  <div
                    className="h-full bg-lf-orange"
                    style={{ width: `${pct}%` }}
                    aria-hidden
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card">
        <h3 className="h-display text-lg">Team leader notes</h3>
        <ul className="prose-lf mt-3 text-sm">
          {readinessProfile.teamLeaderNotes.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function labelForProfile(
  id: "driver" | "influencer" | "steady" | "conscientious",
): string {
  switch (id) {
    case "driver":
      return "Driver";
    case "influencer":
      return "Influencer";
    case "steady":
      return "Steady";
    case "conscientious":
      return "Conscientious";
  }
}
