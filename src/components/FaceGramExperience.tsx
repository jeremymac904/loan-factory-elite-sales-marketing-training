"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import {
  faceGramGroups,
  faceGramPosts,
  faceGramRightRail,
  faceGramShortcuts,
  lenderPromotionNotes,
} from "@/data/facegram";

const postOptions = [
  "Text post",
  "Image",
  "Video/Reel",
  "Story",
  "Poll",
  "Ask for feedback",
];

const stories = [
  { label: "Create story", image: "/team/andre-king.png" },
  { label: "Training win", image: "/team/edward-arvizo.png" },
  { label: "Marketing idea", image: "/team/duyen-nguyen.png" },
  { label: "New LO question", image: "/team/kevin-truong.png" },
  { label: "Coach recap", image: "/team/jody-richards.png" },
];

const accentClasses = {
  orange: "from-lf-orange/90 via-[#2b2b2b] to-black",
  charcoal: "from-[#3a3a3a] via-[#161616] to-black",
  silver: "from-[#d9d9d9] via-[#363636] to-black",
};

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
              Loan Factory&apos;s internal social community for loan officers,
              AEs, approved vendors, corporate coaches, marketing reviewers,
              and internal teams.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
              Share questions, ideas, scripts, videos, wins, marketing
              examples, groups, and feedback inside Loan Factory. FaceGram does
              not publish to public social channels.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                className="btn-primary"
                onClick={() => setEntered(true)}
              >
                Enter FaceGram
              </button>
              <Link
                href="/creator-network/groups/"
                className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
              >
                Browse Groups
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="facegram-feed" className="bg-[#f0f2f5] py-6">
        <div className="mx-auto grid w-full max-w-[1480px] gap-5 px-4 lg:grid-cols-[270px_minmax(0,680px)_310px] xl:grid-cols-[300px_minmax(0,760px)_340px]">
          <aside className="hidden space-y-3 lg:block">
            <div className="rounded-2xl bg-white p-4 shadow-card">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-lf-orange text-lg font-black text-white">
                  F
                </div>
                <div>
                  <h2 className="font-display text-lg font-semibold text-lf-navy">
                    FaceGram
                  </h2>
                  <p className="text-xs text-lf-slate">Internal community</p>
                </div>
              </div>
              <nav className="mt-4 grid gap-1" aria-label="FaceGram shortcuts">
                {faceGramShortcuts.map((shortcut) => (
                  <Link
                    key={shortcut.label}
                    href={shortcut.href}
                    className="rounded-lg px-3 py-2 text-sm font-semibold text-lf-charcoal hover:bg-lf-mist hover:text-lf-orange"
                  >
                    {shortcut.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-card">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-lf-navy">
                  Groups
                </h3>
                <Link
                  href="/creator-network/groups/"
                  className="text-sm font-semibold text-lf-orange"
                >
                  See all
                </Link>
              </div>
              <div className="mt-3 grid gap-2">
                {faceGramGroups.slice(0, 6).map((group) => (
                  <Link
                    key={group.slug}
                    href={`/creator-network/groups/${group.slug}/`}
                    className="rounded-xl border border-lf-line bg-white px-3 py-3 text-sm font-semibold text-lf-charcoal hover:border-lf-orange hover:text-lf-orange"
                  >
                    {group.name}
                    <span className="mt-1 block text-xs font-normal text-lf-slate">
                      {group.memberCount}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          <main className="space-y-4">
            {!entered && (
              <div className="rounded-2xl border border-lf-line bg-white p-5 shadow-card">
                <h2 className="font-display text-2xl font-semibold text-lf-navy">
                  Welcome to FaceGram
                </h2>
                <p className="mt-2 text-sm leading-6 text-lf-slate">
                  Enter the internal community feed to review posts, groups,
                  coaching reminders, and internal examples.
                </p>
                <button
                  type="button"
                  onClick={() => setEntered(true)}
                  className="btn-primary mt-4"
                >
                  Login / Enter FaceGram
                </button>
              </div>
            )}

            <div className="rounded-2xl bg-white p-4 shadow-card">
              <div className="grid grid-cols-[auto_1fr] gap-3">
                <img
                  src="/team/andre-king.png"
                  alt="Andre King"
                  className="h-11 w-11 rounded-full object-cover"
                />
                <textarea
                  value={draftPost}
                  onChange={(event) => setDraftPost(event.target.value)}
                  rows={2}
                  placeholder="What's on your mind?"
                  className="min-h-12 resize-none rounded-2xl border border-lf-line bg-[#f0f2f5] px-4 py-3 text-sm outline-none focus:border-lf-orange focus:ring-2 focus:ring-lf-orange/20"
                />
              </div>
              <div className="mt-4 grid gap-2 border-t border-lf-line pt-4 sm:grid-cols-3">
                {postOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="rounded-lg px-3 py-2 text-sm font-semibold text-lf-charcoal hover:bg-lf-mist hover:text-lf-orange"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 overflow-hidden sm:grid-cols-5">
              {stories.map((story) => (
                <article
                  key={story.label}
                  className="relative min-h-36 overflow-hidden rounded-2xl bg-lf-navy shadow-card"
                >
                  <img
                    src={story.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-55"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />
                  <p className="absolute bottom-3 left-3 right-3 text-sm font-semibold text-white">
                    {story.label}
                  </p>
                </article>
              ))}
            </div>

            {faceGramPosts.map((post) => (
              <article key={post.title} className="rounded-2xl bg-white shadow-card">
                <div className="p-5">
                  <div className="flex items-start gap-3">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-base font-semibold text-lf-navy">
                        {post.author}
                      </h3>
                      <p className="text-xs text-lf-slate">
                        {post.role} · {post.group} · {post.time}
                      </p>
                    </div>
                  </div>
                  <h4 className="mt-4 text-lg font-semibold text-lf-navy">
                    {post.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-lf-charcoal">
                    {post.body}
                  </p>
                </div>
                <div className={`bg-gradient-to-br ${accentClasses[post.accent]} p-5 text-white`}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                    {post.mediaLabel}
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
                    <div className="flex min-h-44 items-end rounded-xl bg-white/12 p-4">
                      <p className="max-w-xs font-display text-2xl font-semibold">
                        Internal example for feedback
                      </p>
                    </div>
                    <div className="grid gap-3">
                      <div className="rounded-xl bg-white/15 p-4 text-sm">
                        Script idea
                      </div>
                      <div className="rounded-xl bg-white/10 p-4 text-sm">
                        Coaching note
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 border-t border-lf-line text-center text-sm font-semibold text-lf-slate">
                  {["Like", "Comment", "Save", "Share internally"].map((action) => (
                    <button
                      key={action}
                      type="button"
                      className="px-2 py-3 hover:bg-lf-mist hover:text-lf-orange"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </main>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl bg-white p-4 shadow-card">
              <h3 className="font-display text-lg font-semibold text-lf-navy">
                Lender Promotions
              </h3>
              <div className="mt-3 grid gap-3">
                {lenderPromotionNotes.map((note) => (
                  <article
                    key={note.title}
                    className="rounded-xl border border-lf-line bg-lf-mist p-3"
                  >
                    <h4 className="text-sm font-semibold text-lf-navy">
                      {note.title}
                    </h4>
                    <p className="mt-1 text-xs leading-5 text-lf-slate">
                      {note.body}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-card">
              <h3 className="font-display text-lg font-semibold text-lf-navy">
                What to watch
              </h3>
              <div className="mt-3 grid gap-2">
                {faceGramRightRail.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-lf-line px-3 py-3 text-sm font-semibold text-lf-charcoal"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-lf-navy p-5 text-white shadow-card">
              <h3 className="font-display text-xl font-semibold">
                Content Coach
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/75">
                Turn a rough internal post into a cleaner draft before sending
                it through the right human review path.
              </p>
              <Link href="/ai-assistants/" className="btn-primary mt-4">
                Open Content Coach
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
