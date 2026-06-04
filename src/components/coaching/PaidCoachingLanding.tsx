import Link from "next/link";
import { coachingTiers } from "@/data/coaching";
import {
  skoolAboutBullets,
  skoolCalendarItems,
  skoolClassroomModules,
  skoolCommunityPosts,
  skoolLeaderboardRows,
  skoolMemberSnapshots,
} from "@/data/coachingSkool";
import SkoolSectionTabs from "@/components/coaching/SkoolSectionTabs";

const sidebarStats = [
  { label: "Programs", value: "2" },
  { label: "Sections", value: "6" },
  { label: "Native tools", value: "12+" },
];

const communityFilters = ["All", "Pinned", "Wins", "Questions", "Resources"];

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-lf-mist">
      <div
        className="h-full rounded-full bg-lf-orange"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export default function PaidCoachingLanding() {
  return (
    <div className="bg-[#f6f6f4]">
      <section className="border-b border-lf-line bg-white">
        <div className="container-page py-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="rounded-3xl border border-lf-line bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-2xl">
                  <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
                    Loan Factory Paid Coaching
                  </p>
                  <h1 className="mt-2 text-3xl font-semibold tracking-tight text-lf-black md:text-4xl">
                    Loan Factory Paid Coaching Platform
                  </h1>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-lf-slate">
                    Structure, accountability, coaching, and community for
                    approved Loan Factory loan officers who want a simpler way
                    to execute every week.
                  </p>
                </div>
                <div className="rounded-full border border-lf-line bg-lf-mist px-3 py-2 text-xs font-semibold text-lf-black">
                  Skool-style community
                </div>
              </div>

              <div className="mt-5 grid gap-3 rounded-2xl border border-lf-line bg-lf-mist/60 p-3 md:grid-cols-[1fr_auto] md:items-center">
                <div className="rounded-xl border border-lf-line bg-white px-4 py-3 text-sm text-lf-slate">
                  Search members, posts, scripts, trackers, and resources
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href="/login/" className="btn-primary">
                    Sign in
                  </Link>
                  <Link href="#about" className="btn-secondary">
                    View programs
                  </Link>
                </div>
              </div>
            </div>

            <aside className="overflow-hidden rounded-[28px] border border-lf-line bg-white shadow-sm">
              <div
                className="flex min-h-[180px] items-end justify-between gap-4 px-6 py-5 text-white"
                style={{
                  background:
                    "radial-gradient(circle at 82% 16%, rgba(255,255,255,.24), transparent 18%), linear-gradient(135deg, #fff7ed 0%, #f26f23 48%, #0a0a0a 100%)",
                }}
              >
                <div className="max-w-[14rem]">
                  <p className="text-xs font-bold uppercase tracking-wide text-white/80">
                    Loan Factory Coaching
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold leading-tight">
                    Paid Coaching Platform
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-white/80">
                    LO Mastery and Loan Factory Alliance for approved members.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-white/90">
                  Members only
                </div>
              </div>

              <div className="space-y-5 p-5">
                <div className="grid grid-cols-3 gap-3">
                  {sidebarStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-lf-line bg-lf-mist/50 px-3 py-3 text-center"
                    >
                      <p className="text-2xl font-semibold text-lf-black">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-lf-slate">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                {coachingTiers.map((tier) => (
                  <div
                    key={tier.id}
                    className="rounded-2xl border border-lf-line bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                          {tier.id === "alliance" ? "Level II" : "Level I"}
                        </p>
                        <h3 className="mt-1 text-lg font-semibold text-lf-black">
                          {tier.shortName}
                        </h3>
                      </div>
                      <span className="rounded-full bg-lf-orangeSoft px-2.5 py-1 text-xs font-semibold text-lf-orangeDark">
                        {tier.price}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-lf-slate">
                      {tier.tagline}
                    </p>
                    <Link
                      href={tier.href}
                      className="mt-3 inline-flex text-sm font-semibold text-lf-orange hover:underline"
                    >
                      Learn more
                    </Link>
                  </div>
                ))}

                <Link href="/login/" className="btn-primary w-full justify-center">
                  Sign in
                </Link>
              </div>
            </aside>
          </div>

          <div className="mt-6">
            <SkoolSectionTabs active="community" />
          </div>
        </div>
      </section>

      <main className="container-page py-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-8">
            <section id="community" className="space-y-4">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                  Community feed
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-lf-black md:text-3xl">
                  Pinned posts, wins, and coaching prompts.
                </h2>
              </div>

              <div className="rounded-3xl border border-lf-line bg-white p-4 shadow-sm">
                <div className="flex flex-wrap items-center gap-3 text-sm text-lf-slate">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-lf-black text-sm font-semibold text-white">
                    LF
                  </div>
                  <div className="flex min-w-0 flex-1 items-center rounded-2xl border border-lf-line bg-lf-mist/60 px-4 py-3">
                    <span>Share a win, ask a question, or post a coaching update</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {communityFilters.map((filter, index) => (
                  <span
                    key={filter}
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      index === 0
                        ? "border border-lf-black bg-lf-black text-white"
                        : "border border-lf-line bg-white text-lf-slate"
                    }`}
                  >
                    {filter}
                  </span>
                ))}
              </div>

              <div className="grid gap-5">
                {skoolCommunityPosts.map((post) => (
                  <article
                    key={post.id}
                    className={`rounded-3xl border bg-white p-5 shadow-sm ${
                      post.pinned ? "border-lf-orange/35" : "border-lf-line"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lf-black text-sm font-semibold text-white">
                          {post.author
                            .split(" ")
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <p className="text-base font-semibold text-lf-black">
                            {post.author}
                          </p>
                          <p className="text-xs text-lf-slate">{post.role}</p>
                        </div>
                      </div>
                      {post.pinned && (
                        <span className="rounded-full bg-lf-orangeSoft px-3 py-1 text-xs font-semibold text-lf-orangeDark">
                          Pinned
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold text-lf-black">
                      {post.title}
                    </h3>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-lf-slate">
                      {post.body}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold text-lf-slate">
                      <span>{post.meta.likes}</span>
                      <span>{post.meta.comments}</span>
                      <span>{post.meta.views}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="classroom" className="space-y-4">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                  Classroom
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-lf-black md:text-3xl">
                  Modules that move the week forward.
                </h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {skoolClassroomModules.map((module) => (
                  <article
                    key={module.id}
                    className="rounded-3xl border border-lf-line bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                          {module.badge}
                        </p>
                        <h3 className="mt-1 text-xl font-semibold text-lf-black">
                          {module.title}
                        </h3>
                      </div>
                      <span className="rounded-full bg-lf-mist px-3 py-1 text-xs font-semibold text-lf-slate">
                        {module.progress}%
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-lf-slate">
                      {module.description}
                    </p>
                    <div className="mt-4">
                      <ProgressBar value={module.progress} />
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="calendar" className="space-y-4">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                  Calendar
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-lf-black md:text-3xl">
                  Keep the coaching rhythm simple.
                </h2>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {skoolCalendarItems.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-3xl border border-lf-line bg-white p-5 shadow-sm"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                      {item.time}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-lf-black">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-lf-slate">
                      {item.details}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section id="members" className="space-y-4">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                  Members
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-lf-black md:text-3xl">
                  Member progress stays visible.
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {skoolMemberSnapshots.map((snapshot) => (
                  <article
                    key={snapshot.label}
                    className="rounded-3xl border border-lf-line bg-white p-5 shadow-sm"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                      {snapshot.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-lf-black">
                      {snapshot.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-lf-slate">
                      {snapshot.note}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section id="leaderboards" className="space-y-4">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                  Leaderboards
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-lf-black md:text-3xl">
                  Accountability, not vanity.
                </h2>
              </div>

              <div className="rounded-3xl border border-lf-line bg-white p-5 shadow-sm">
                <div className="space-y-4">
                  {skoolLeaderboardRows.map((row, index) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-lf-line bg-lf-mist/40 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lf-black text-sm font-semibold text-white">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-lf-black">{row.label}</p>
                          <p className="text-xs text-lf-slate">
                            Keep the week narrow and measurable
                          </p>
                        </div>
                      </div>
                      <p className="text-lg font-semibold text-lf-black">{row.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="about" className="space-y-4">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                  About
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-lf-black md:text-3xl">
                  What members get, in one simple place.
                </h2>
              </div>

              <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    "12 week path",
                    "Daily time blocker",
                    "Theme days planner",
                    "Script book",
                    "Greatness tracker",
                    "Weekly scorecard",
                    "Coach calls",
                    "Community",
                    "Accountability",
                  ].map((item) => (
                    <article
                      key={item}
                      className="rounded-3xl border border-lf-line bg-white p-5 shadow-sm"
                    >
                      <h3 className="text-lg font-semibold text-lf-black">{item}</h3>
                      <p className="mt-2 text-sm leading-6 text-lf-slate">
                        Simple coaching support for the week.
                      </p>
                    </article>
                  ))}
                </div>

                <div className="rounded-3xl border border-lf-line bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                    About this platform
                  </p>
                  <ul className="mt-3 space-y-3 text-sm leading-6 text-lf-slate">
                    {skoolAboutBullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-lf-line bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                Right rail
              </p>
              <h2 className="mt-2 text-xl font-semibold text-lf-black">
                Program summary
              </h2>
              <p className="mt-2 text-sm leading-6 text-lf-slate">
                Everything is coaching-only. Use the feed for updates, the
                classroom for the playbook, and the scorecard rhythm to keep the
                week tight.
              </p>
              <div className="mt-4 rounded-2xl bg-lf-black p-4 text-white">
                <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                  Next step
                </p>
                <p className="mt-2 text-lg font-semibold">
                  Sign in with your approved Loan Factory Google account.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href="/login/" className="btn-primary">
                    Sign in
                  </Link>
                  <Link href="#about" className="btn-secondary border-white/20 bg-white/10 text-white hover:border-white hover:bg-white/15">
                    About
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-lf-line bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                Current week
              </p>
              <h3 className="mt-2 text-lg font-semibold text-lf-black">
                Protect the block. Finish the scorecard.
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-lf-slate">
                <li>1. Time block the day before it gets busy.</li>
                <li>2. Use one theme for the day.</li>
                <li>3. Send the weekly scorecard before coaching.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-lf-line bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                Quick note
              </p>
              <p className="mt-2 text-sm leading-6 text-lf-slate">
                Coaches can use the same structure for member progress, notes,
                classroom modules, calendar prep, and weekly accountability.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
