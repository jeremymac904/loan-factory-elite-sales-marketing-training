import Link from "next/link";
import { getCoachingAccess } from "@/lib/coachingAccess";

export const dynamic = "force-dynamic";
export const metadata = { title: "My Tracker · Member Area" };

const trackerItems = [
  {
    title: "Greatness tracker",
    description:
      "Keep a simple view of your weekly consistency, wins, and follow-through.",
  },
  {
    title: "Daily time blocker",
    description:
      "Protect a focused block for conversations and follow-up before the day gets full.",
  },
  {
    title: "Theme day reminder",
    description:
      "Pick one theme for the day so your work stays narrow and repeatable.",
  },
  {
    title: "Weekly focus",
    description:
      "Set the one coaching focus you want to finish before the next call.",
  },
  {
    title: "Coach notes",
    description:
      "Keep the last coaching note and next action visible while you work.",
    href: "/coach-command-center/coaching-notes/",
  },
  {
    title: "Scorecard",
    description:
      "Open your scorecard to review the commitments and activity you logged this week.",
    href: "/member-area/scorecards/",
  },
];

export default async function MemberTrackersPage() {
  const access = await getCoachingAccess();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-14">
          <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
            Member Area
          </p>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            My Tracker
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            A simple tracker for the weekly rhythm, the day&apos;s focus, and
            the next action you need to complete.
          </p>
          {access.viewingAsLabel && (
            <p className="mt-4 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              Viewing as: {access.viewingAsLabel}
            </p>
          )}
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {trackerItems.map((item) =>
            item.href ? (
              <Link
                key={item.title}
                href={item.href}
                className="card transition hover:-translate-y-0.5 hover:shadow-lift"
              >
                <h2 className="h-display text-lg">{item.title}</h2>
                <p className="prose-lf mt-2 text-sm text-lf-slate">
                  {item.description}
                </p>
              </Link>
            ) : (
              <article key={item.title} className="card">
                <h2 className="h-display text-lg">{item.title}</h2>
                <p className="prose-lf mt-2 text-sm text-lf-slate">
                  {item.description}
                </p>
              </article>
            ),
          )}
        </div>
      </section>
    </>
  );
}
