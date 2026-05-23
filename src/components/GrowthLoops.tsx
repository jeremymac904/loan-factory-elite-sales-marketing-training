"use client";

import { useState } from "react";

const featureIdeas = [
  { title: "FaceGram saved posts", status: "Planned", votes: 18 },
  { title: "AI Twin project builder", status: "In Progress", votes: 24 },
  { title: "Weekly challenge streak", status: "Planned", votes: 11 },
  { title: "Drive source maps", status: "Not Now", votes: 7 },
];

const challenges = [
  "Send five personal follow-ups.",
  "Practice one first-call roleplay.",
  "Rewrite one social post through the prompt library.",
];

export default function GrowthLoops() {
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [complete, setComplete] = useState<Record<string, boolean>>({});

  return (
    <section className="bg-lf-mist">
      <div className="container-page py-14">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Feature voting
            </p>
            <h2 className="h-display mt-2 text-3xl">
              Vote on what should improve next.
            </h2>
            <p className="prose-lf mt-3 text-sm text-lf-slate">
              Beta-safe local voting for review. Admin statuses show the simple
              build loop: Planned, In Progress, Built, or Not Now.
            </p>
            <div className="mt-6 grid gap-3">
              {featureIdeas.map((idea) => (
                <article key={idea.title} className="rounded-xl border border-lf-line bg-white p-4 shadow-card">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-lf-navy">
                        {idea.title}
                      </h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-lf-slate">
                        {idea.status}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() =>
                        setVotes((current) => ({
                          ...current,
                          [idea.title]: (current[idea.title] ?? idea.votes) + 1,
                        }))
                      }
                    >
                      Upvote {votes[idea.title] ?? idea.votes}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Weekly challenge
            </p>
            <h2 className="h-display mt-2 text-3xl">
              One simple action loop.
            </h2>
            <p className="prose-lf mt-3 text-sm text-lf-slate">
              Professional weekly challenges keep beta testers trying the
              platform without turning it into a giant gamification system.
            </p>
            <div className="mt-6 grid gap-3">
              {challenges.map((challenge) => (
                <label
                  key={challenge}
                  className="flex items-center gap-3 rounded-xl border border-lf-line bg-white p-4 text-sm font-semibold text-lf-charcoal shadow-card"
                >
                  <input
                    type="checkbox"
                    checked={complete[challenge] ?? false}
                    onChange={(event) =>
                      setComplete((current) => ({
                        ...current,
                        [challenge]: event.target.checked,
                      }))
                    }
                    className="h-5 w-5 rounded border-lf-line text-lf-orange"
                  />
                  {challenge}
                </label>
              ))}
            </div>
            <p className="mt-4 text-sm font-semibold text-lf-orangeDark">
              Local/demo completion only. No leaderboard points are saved yet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
