import Link from "next/link";
import { getCoachingAccess } from "@/lib/coachingAccess";

export const dynamic = "force-dynamic";
export const metadata = { title: "LO Mastery Member View" };

export default async function LoMasteryMemberAreaPage() {
  const access = await getCoachingAccess();
  const dashboardCards = [
    {
      title: "Program overview",
      description:
        "Built for loan officers who want structure, consistency, and a simple weekly coaching rhythm.",
    },
    {
      title: "Current week",
      description:
        "Keep the daily rhythm tight, submit the scorecard, and bring one real win to coaching.",
    },
    {
      title: "Daily time blocker",
      description:
        "Protect a focused block for conversations, follow-up, and the next action before the day gets busy.",
      href: "/member-area/trackers/#daily-time-blocker",
    },
    {
      title: "Theme days planner",
      description:
        "Pick one focus for each day so the week stays narrow and repeatable.",
      href: "/member-area/trackers/#theme-days-planner",
    },
    {
      title: "Weekly scorecard",
      description:
        "Record the conversations, Realtor touches, past-client touches, pipeline follow-up, and commitments you completed.",
      href: "/member-area/scorecards/",
    },
    {
      title: "Greatness tracker",
      description:
        "Track consistency, wins, and the smallest actions that move the week forward.",
      href: "/member-area/trackers/#greatness-tracker",
    },
    {
      title: "Script library",
      description:
        "Keep your coaching scripts close so you can copy, personalize, and move quickly.",
      href: "/member-area/scripts/",
    },
    {
      title: access.isStaff ? "Coach notes" : "Coach follow-up",
      description: access.isStaff
        ? "Review the latest coaching notes and next-step commitments."
        : "Your coach can leave follow-up notes during review. Bring the last commitment to your next call.",
      href: access.isStaff ? "/coach-command-center/coaching-notes/" : undefined,
    },
  ];

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
            LO Mastery Member View
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Weekly coaching, accountability, scorecards, and the tools you need
            to keep the $249 program moving.
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
