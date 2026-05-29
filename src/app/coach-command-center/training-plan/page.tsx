import Link from "next/link";
import { getCoachAccess } from "@/lib/coachAccess";
import CoachCommandNav from "@/components/coach/CoachCommandNav";
import { trainingAssignables } from "@/data/coachCommandCenter";

export const dynamic = "force-dynamic";
export const metadata = { title: "Training Assignment · Coach Command Center" };

export default async function CoachTrainingPlanPage() {
  const access = await getCoachAccess();

  // Group the assignable training resources by their category so a coach can
  // scan lessons, AI Advantage, clips, scripts, prompts, roleplays, and the
  // weekly scorecard in one place. Order follows the source data.
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
            Pick the lessons, clips, scripts, and reps to assign your LOs — open
            any resource to review it before you assign it as a coaching task.
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

      <section className="container-page py-10">
        <div className="card border-lf-orange/40 bg-lf-orangeSoft/40">
          <p className="text-xs font-semibold uppercase tracking-wide text-lf-orangeDark">
            How assigning works
          </p>
          <h2 className="h-display mt-1 text-2xl">
            Assign a resource as a coaching task.
          </h2>
          <p className="prose-lf mt-2 text-sm">
            When you assign one of these, the coach records it as an internal
            coaching task — a tracked commitment for the LO to complete and for
            you to follow up on. Assignments are stored as internal coaching
            tasks and tracked manually until task automation is connected. Open a
            resource below to review it, then note the assignment in your
            coaching notes and follow up on the next check-in.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
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
            return (
              <div key={category}>
                <h2 className="h-display text-xl">{category}</h2>
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
