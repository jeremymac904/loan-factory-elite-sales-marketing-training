import Link from "next/link";
import { coachingTiers } from "@/data/coaching";

const weeklyRhythm = [
  { day: "Monday", focus: "Protect your schedule and Power Block." },
  { day: "Tuesday", focus: "Follow up and move files." },
  { day: "Wednesday", focus: "Realtor relationships." },
  { day: "Thursday", focus: "Pipeline and database." },
  { day: "Friday", focus: "Scorecard and coaching prep." },
  { day: "Weekend", focus: "Plan and reset." },
];

const memberTools = [
  "Today page",
  "Weekly scorecard",
  "Trackers",
  "Scripts",
  "Playbooks",
  "Classroom",
  "Calendar",
  "Community feed",
  "Coach review",
];

export default function PaidCoachingLanding() {
  return (
    <div className="bg-white">
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div aria-hidden className="absolute inset-0 bg-black/76" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(242,106,31,0.28),transparent_30%),linear-gradient(90deg,rgba(0,0,0,0.96),rgba(15,15,15,0.66),rgba(0,0,0,0.92))]"
        />
        <div className="relative container-page py-16 md:py-20">
          <h1 className="metal-title-dark max-w-4xl text-4xl md:text-6xl">
            Loan Factory Paid Coaching Platform
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/85 md:text-xl">
            Simple weekly execution, accountability, coaching, and community for
            approved Loan Factory loan officers.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="https://forms.gle/LiJmtVoJ8wKW7wEJ8"
              target="_blank"
              rel="noreferrer"
              className="btn-primary w-full sm:w-auto"
            >
              Apply
            </a>
            <Link
              href="/lo-mastery-coaching/"
              className="btn-secondary w-full border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20 sm:w-auto"
            >
              View LO Mastery
            </Link>
            <Link
              href="/loan-factory-alliance/"
              className="btn-secondary w-full border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20 sm:w-auto"
            >
              View Loan Factory Alliance
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-14 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Why this exists
            </p>
            <h2 className="h-display mt-2 text-3xl md:text-4xl">
              Most loan officers do not need more information. They need
              structure.
            </h2>
          </div>
          <div className="prose-lf text-lg leading-8 text-lf-slate">
            <p>
              Production comes from a simple weekly rhythm: daily execution,
              real follow up, consistent Realtor activity, an honest scorecard,
              and a coach who reviews the week and gives you the next action.
              This platform puts all of that in one place so you always know
              what to do today.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-lf-line bg-lf-mist">
        <div className="container-page py-14 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
            The two programs
          </p>
          <h2 className="h-display mt-2 text-3xl md:text-4xl">
            Pick the level that matches your business.
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {coachingTiers.map((tier) => (
              <article
                key={tier.id}
                className="flex flex-col rounded-2xl border border-lf-line bg-white p-7 shadow-card"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                  {tier.price} {tier.priceSuffix}
                </p>
                <h3 className="h-display mt-2 text-2xl">{tier.shortName}</h3>
                <p className="prose-lf mt-3 text-lf-slate">
                  {tier.id === "alliance"
                    ? "Deeper accountability and growth systems for producers ready to scale partners, conversion, and team leverage."
                    : "A simple weekly rhythm: daily execution, follow up, Realtor growth, scorecards, and coach review."}
                </p>
                <p className="prose-lf mt-3 text-sm text-lf-slate">{tier.bestFor}</p>
                <div className="mt-auto pt-6">
                  <Link href={tier.href} className="btn-primary">
                    View {tier.shortName}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              How it works
            </p>
            <h2 className="h-display mt-2 text-3xl md:text-4xl">
              One weekly rhythm. Every day has a job.
            </h2>
            <div className="mt-7 divide-y divide-lf-line border-y border-lf-line">
              {weeklyRhythm.map((item) => (
                <div
                  key={item.day}
                  className="grid grid-cols-[110px_minmax(0,1fr)] gap-4 py-4"
                >
                  <p className="font-black text-lf-navy">{item.day}</p>
                  <p className="text-lf-charcoal">{item.focus}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              What members get
            </p>
            <h2 className="h-display mt-2 text-3xl md:text-4xl">
              Everything lives inside the member area.
            </h2>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {memberTools.map((tool) => (
                <li
                  key={tool}
                  className="border-l-2 border-lf-orange pl-4 text-lg font-semibold text-lf-navy"
                >
                  {tool}
                </li>
              ))}
            </ul>
            <p className="prose-lf mt-6 text-lf-slate">
              No content maze. No busywork. Open the platform, see what today
              is, do the work, and submit it to your coach.
            </p>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-14 text-center md:py-16">
          <h2 className="metal-title-dark mx-auto max-w-3xl text-3xl md:text-5xl">
            Ready for a simpler week?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/85">
            Apply for LO Mastery or Loan Factory Alliance and start running a
            coached weekly rhythm.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="https://forms.gle/LiJmtVoJ8wKW7wEJ8"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Apply
            </a>
          </div>
          <p className="mt-5 text-sm text-white/70">
            Already approved? Use the Sign In button in the top right.
          </p>
        </div>
      </section>
    </div>
  );
}
