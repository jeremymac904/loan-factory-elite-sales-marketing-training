"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";

const groups = [
  "Florida LOs",
  "Vietnamese-speaking LOs",
  "New Loan Officers",
  "Referral Partner Ideas",
  "Open House Scripts",
  "AE and Vendor Ideas",
  "Content Feedback",
  "Spanish-speaking LOs",
];

const topics = [
  "Daily posts",
  "Questions",
  "Marketing ideas",
  "Scripts",
  "Videos",
  "Wins",
  "Feedback requests",
  "State groups",
  "Language groups",
  "Topic groups",
];

const posts = [
  {
    author: "Andre King",
    role: "LO Development",
    avatar: "/team/andre-king.png",
    title: "What worked on today's first-call practice",
    body: "Share one sentence that helped you slow down the conversation and keep the borrower engaged.",
    tag: "Question",
    media: "Script thread",
  },
  {
    author: "Duyen Nguyen",
    role: "Marketing",
    avatar: "/team/duyen-nguyen.png",
    title: "Before and after: local event post",
    body: "This example is ready for internal feedback. Keep comments focused on clarity, audience, and review needs.",
    tag: "Marketing idea",
    media: "Image-style card",
  },
  {
    author: "Edward Arvizo",
    role: "Corporate Coach",
    avatar: "/team/edward-arvizo.png",
    title: "Power Hour win",
    body: "One LO booked two referral partner conversations by asking a cleaner next-step question. Drop your version below.",
    tag: "Win",
    media: "Video-style recap",
  },
];

export default function FaceGramExperience() {
  const [entered, setEntered] = useState(false);
  const [draftPost, setDraftPost] = useState("");

  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div aria-hidden className="absolute inset-0 bg-black/72" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(242,106,31,0.34),transparent_28%),linear-gradient(90deg,rgba(0,0,0,0.92),rgba(17,17,17,0.66),rgba(0,0,0,0.92))]"
        />
        <div className="relative container-page py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="font-display text-5xl font-semibold tracking-tight md:text-7xl">
              FaceGram
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/85">
              Loan Factory's internal social community for loan officers, AEs,
              approved vendors, corporate coaches, marketing reviewers, and
              internal teams.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
              Use it to ask questions, share ideas, post examples, get feedback,
              join groups, and learn from the people doing the work every day.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                className="btn-primary"
                onClick={() => setEntered(true)}
              >
                Enter FaceGram
              </button>
              <a
                href="#facegram-feed"
                className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
              >
                Preview feed
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            {
              title: "Why LOs use it",
              body: "Get fast peer feedback, see practical examples, learn from coach comments, and find ideas by group or topic.",
            },
            {
              title: "What belongs here",
              body: "Daily posts, questions, marketing ideas, scripts, videos, wins, feedback requests, and group conversations.",
            },
            {
              title: "How it stays clean",
              body: "FaceGram is employee-only. Internal examples stay inside the community unless a separate reviewer approves adaptation.",
            },
          ].map((item) => (
            <article key={item.title} className="card">
              <h2 className="h-display text-xl">{item.title}</h2>
              <p className="prose-lf mt-2 text-sm text-lf-slate">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="facegram-feed" className="bg-lf-mist py-14">
        <div className="container-page">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="h-display text-3xl">Community feed</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-lf-slate">
                {entered
                  ? "You are inside the FaceGram preview experience."
                  : "Preview how FaceGram will organize internal posts, groups, coaching notes, and feedback requests."}
              </p>
            </div>
            {!entered && (
              <button
                type="button"
                className="btn-primary"
                onClick={() => setEntered(true)}
              >
                Login / Enter FaceGram
              </button>
            )}
          </div>

          <div className="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)_260px]">
            <aside className="card h-fit">
              <h3 className="h-display text-lg">Groups</h3>
              <div className="mt-4 grid gap-2">
                {groups.map((group) => (
                  <button
                    key={group}
                    type="button"
                    className="rounded-lg border border-lf-line bg-white px-3 py-2 text-left text-sm font-semibold text-lf-charcoal hover:border-lf-orange hover:text-lf-orange"
                  >
                    {group}
                  </button>
                ))}
              </div>
            </aside>

            <div className="space-y-5">
              <article className="card">
                <div className="flex items-center gap-3">
                  <img
                    src="/team/andre-king.png"
                    alt="Andre King"
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="h-display text-lg">Post composer</h3>
                    <p className="text-sm text-lf-slate">
                      Share an internal question, win, script, video idea, or
                      feedback request.
                    </p>
                  </div>
                </div>
                <textarea
                  value={draftPost}
                  onChange={(event) => setDraftPost(event.target.value)}
                  rows={4}
                  placeholder="What do you want to share with the Loan Factory community?"
                  className="mt-4 w-full rounded-xl border border-lf-line bg-lf-mist px-4 py-3 text-sm outline-none focus:border-lf-orange focus:ring-2 focus:ring-lf-orange/20"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Question", "Marketing idea", "Script", "Video", "Win"].map(
                    (tag) => (
                      <span key={tag} className="pill">
                        {tag}
                      </span>
                    ),
                  )}
                </div>
              </article>

              {posts.map((post) => (
                <article key={post.title} className="card">
                  <div className="flex items-start gap-3">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="h-display text-lg">{post.author}</h3>
                        <span className="pill">{post.tag}</span>
                      </div>
                      <p className="text-sm text-lf-slate">{post.role}</p>
                    </div>
                  </div>
                  <h4 className="mt-4 text-lg font-semibold text-lf-navy">
                    {post.title}
                  </h4>
                  <p className="prose-lf mt-2 text-sm text-lf-slate">
                    {post.body}
                  </p>
                  <div className="mt-4 rounded-xl border border-lf-line bg-[linear-gradient(135deg,#111111,#2b2b2b)] p-5 text-white">
                    <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                      {post.media}
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="h-24 rounded-lg bg-white/12" />
                      <div className="h-24 rounded-lg bg-white/16" />
                      <div className="h-24 rounded-lg bg-white/10" />
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold text-lf-charcoal">
                    <button type="button" className="btn-secondary">Like</button>
                    <button type="button" className="btn-secondary">Comment</button>
                    <button type="button" className="btn-secondary">Save</button>
                  </div>
                </article>
              ))}
            </div>

            <aside className="space-y-5">
              <article className="card">
                <h3 className="h-display text-lg">Trends</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {topics.map((topic) => (
                    <span key={topic} className="pill">
                      {topic}
                    </span>
                  ))}
                </div>
              </article>
              <article className="card border-lf-orange/35">
                <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                  Content Coach
                </p>
                <h3 className="h-display mt-2 text-lg">
                  Turn an idea into a cleaner draft
                </h3>
                <p className="prose-lf mt-2 text-sm text-lf-slate">
                  Use Content Coach to reshape an internal post into a clearer
                  draft before human review.
                </p>
                <Link href="/ai-assistants/" className="btn-primary mt-4">
                  Open Content Coach
                </Link>
              </article>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
