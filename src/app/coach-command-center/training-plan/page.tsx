import Link from "next/link";
import { getCoachAccess } from "@/lib/coachAccess";
import CoachCommandNav from "@/components/coach/CoachCommandNav";
import { trainingAssignables } from "@/data/coachCommandCenter";

export const dynamic = "force-dynamic";
export const metadata = { title: "Training Assignment · Coach Command Center" };

// Finding #7: 101-601 is FREE Sales & Marketing training. It is offered as an
// assignable resource but is clearly labeled free and is NEVER counted as
// paid-coaching progress. Paid coaching resources (AI Advantage, clips,
// scripts, etc.) are grouped separately.
export default async function CoachTrainingPlanPage() {
  const access = await getCoachAccess();

  const categories: string[] = [];
  const grouped = new Map<string, typeof trainingAssignables>();
  for (const item of trainingAssignables) {
    if (!grouped.has(item.category)) {
      grouped.set(item.category, []);
      categories.push(item.category);
    }
    grouped.get(item.category)!.push(item);
  }

  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-12">
          <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
            Coach Command Center
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
            Training Assignment
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">
            Assign lessons, clips, scripts, and reps as coaching tasks — open any
            resource to review it first.
          </p>
          {access.viewingAsLabel && (
            <p className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              View-As preview: {access.viewingAsLabel}
            </p>
          )}
        </div>
      </section>

      <CoachCommandNav
        current="/coach-command-center/training-plan/"
        showAdmin={access.seesAll}
      />

      <section className="container-page py-8">
        <div className="card border-lf-orange/40 bg-lf-orangeSoft/30">
          <p className="prose-lf text-sm">
            <span className="font-semibold text-lf-charcoal">
              Free vs paid is kept separate.
            </span>{" "}
            Sales &amp; Marketing 101-601 is free internal training you can
            assign — but completing it is never counted as paid-coaching
            progress. Record assignments in your coaching notes and follow up on
            the next check-in. Assignments are tracked manually until task
            automation is connected.
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link
              href="/coach-command-center/coaching-notes/"
              className="btn-primary"
            >
              Record in coaching notes
            </Link>
            <Link href="/coach-command-center/team/" className="btn-secondary">
              Pick a person to assign
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-8">
          {categories.map((category) => {
            const items = grouped.get(category) ?? [];
            const isFree = items.some((i) => i.free);
            return (
              <div key={category}>
                <div className="flex items-center gap-2">
                  <h2 className="h-display text-xl">{category}</h2>
                  {isFree && (
                    <span className="rounded-full bg-lf-mist px-2.5 py-0.5 text-xs font-semibold text-lf-slate">
                      Free · not paid-coaching progress
                    </span>
                  )}
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="card flex flex-col gap-2 transition hover:-translate-y-0.5 hover:shadow-lift"
                    >
                      <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                        {item.category}
                      </span>
                      <h3 className="text-base font-semibold text-lf-charcoal">
                        {item.title}
                      </h3>
                      <span className="mt-auto inline-flex items-center text-sm font-semibold text-lf-orange">
                        Open &amp; assign{" "}
                        <span aria-hidden className="ml-2">
                          &rarr;
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
