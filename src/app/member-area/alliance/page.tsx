import Link from "next/link";
import { getCoachingAccess } from "@/lib/coachingAccess";

export const dynamic = "force-dynamic";
export const metadata = { title: "Loan Factory Alliance Member View" };

const dashboardCards = [
  {
    title: "Program overview",
    description:
      "Built for loan officers who want deeper accountability, more strategy, and a stronger business rhythm.",
  },
  {
    title: "Current week",
    description:
      "Week 3 focus: tighten the weekly plan, protect the call blocks, and bring one market insight to coaching.",
  },
  {
    title: "Daily time blocker",
    description:
      "Protect your focused block for conversations, partner outreach, and follow-up before the day gets busy.",
  },
  {
    title: "Theme day reminder",
    description:
      "Pick one business theme for the day, then keep the work narrow and repeatable.",
  },
  {
    title: "Weekly scorecard",
    description:
      "Record conversations, Realtor touches, past-client touches, pipeline follow-up, and commitments.",
    href: "/member-area/scorecards/",
  },
  {
    title: "Greatness tracker",
    description:
      "Track consistency, momentum, and the actions that move the business forward.",
    href: "/member-area/trackers/",
  },
  {
    title: "Script book",
    description:
      "Keep outreach scripts, partner language, and practice reps close before every call block.",
    href: "/resources/",
  },
  {
    title: "Coach notes",
    description:
      "Review the latest coaching notes and next-step commitments if your coach left one.",
    href: "/coach-command-center/coaching-notes/",
  },
];

export default async function AllianceMemberAreaPage() {
  const access = await getCoachingAccess();

  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-orange text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-14">
          <p className="text-xs font-bold uppercase tracking-wide text-white/90">
            Member Area
          </p>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            Loan Factory Alliance Member View
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Advanced coaching, deeper accountability, and the tools you need to
            grow the $449 program.
          </p>
          {access.viewingAsLabel && (
            <p className="mt-4 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              Viewing as: {access.viewingAsLabel}
            </p>
          )}
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboardCards.map((card) =>
            card.href ? (
              <Link
                key={card.title}
                href={card.href}
                className="card transition hover:-translate-y-0.5 hover:shadow-lift"
              >
                <h2 className="h-display text-lg">{card.title}</h2>
                <p className="prose-lf mt-2 text-sm text-lf-slate">
                  {card.description}
                </p>
              </Link>
            ) : (
              <article key={card.title} className="card">
                <h2 className="h-display text-lg">{card.title}</h2>
                <p className="prose-lf mt-2 text-sm text-lf-slate">
                  {card.description}
                </p>
              </article>
            ),
          )}
        </div>
      </section>
    </>
  );
}
