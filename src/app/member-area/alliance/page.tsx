import Link from "next/link";

export const metadata = { title: "Loan Factory Alliance Member View" };

const cards = [
  {
    title: "Program overview",
    description:
      "Built for loan officers who want deeper accountability, more strategy, and a stronger business rhythm.",
  },
  {
    title: "Current week",
    description:
      "Tighten the weekly plan, protect the call blocks, and bring one market insight to coaching.",
  },
  {
    title: "Daily time blocker",
    description:
      "Protect your focused block for conversations, partner outreach, and follow-up before the day gets busy.",
  },
  {
    title: "Theme days planner",
    description:
      "Pick one business theme for the day, then keep the work narrow and repeatable.",
  },
  {
    title: "Weekly scorecard",
    description:
      "Record conversations, Realtor touches, past-client touches, pipeline follow-up, and commitments.",
  },
  {
    title: "Greatness tracker",
    description:
      "Track consistency, momentum, and the actions that move the business forward.",
  },
  {
    title: "Business plan roadmap",
    description:
      "Plan the next 12 weeks of growth, focus, and accountability.",
  },
  {
    title: "Coach follow-up",
    description:
      "Your coach can leave follow-up notes during review. Bring the last commitment to your next call.",
  },
];

export default function AllianceMemberAreaPage() {
  return (
    <>
      <section className="border-b border-lf-line bg-white">
        <div className="container-page py-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="rounded-3xl border border-lf-line bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
                Member Area
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-lf-black md:text-4xl">
                Loan Factory Alliance Member View
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-lf-slate">
                Advanced coaching, deeper accountability, and the tools you need
                to grow the $449 program.
              </p>
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
                    Loan Factory Alliance
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-white/80">
                    Advanced coaching for approved members.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-white/90">
                  $449
                </div>
              </div>

              <div className="space-y-5 p-5">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Sections", value: "6" },
                    { label: "Tools", value: "12+" },
                    { label: "Calls", value: "Weekly" },
                  ].map((stat) => (
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

                <Link
                  href="/member-area/scorecards/"
                  className="btn-primary w-full justify-center"
                >
                  Weekly scorecard
                </Link>
                <Link
                  href="/member-area/trackers/"
                  className="btn-secondary w-full justify-center"
                >
                  Trackers
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f6f4]">
        <div className="container-page py-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {cards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-3xl border border-lf-line bg-white p-5 shadow-sm"
                >
                  <h2 className="h-display text-lg">{card.title}</h2>
                  <p className="prose-lf mt-2 text-sm text-lf-slate">
                    {card.description}
                  </p>
                </article>
              ))}
            </div>

            <aside className="space-y-4">
              <div className="card border-lf-orange/30 bg-lf-orangeSoft/20">
                <p className="text-xs font-semibold uppercase tracking-wide text-lf-orangeDark">
                  Program focus
                </p>
                <h2 className="mt-2 text-xl font-semibold text-lf-black">
                  Advanced coaching and accountability
                </h2>
                <p className="mt-2 text-sm leading-6 text-lf-slate">
                  Business planning, database reactivation, Realtor growth, and
                  production systems stay in one simple rhythm.
                </p>
              </div>

              <div className="card">
                <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                  Quick links
                </p>
                <div className="mt-3 grid gap-2">
                  <Link
                    href="/member-area/scripts/"
                    className="rounded-xl border border-lf-line bg-white px-4 py-3 text-sm font-semibold text-lf-charcoal transition hover:border-lf-orange hover:text-lf-orange"
                  >
                    Script library
                  </Link>
                  <Link
                    href="/member-area/trackers/"
                    className="rounded-xl border border-lf-line bg-white px-4 py-3 text-sm font-semibold text-lf-charcoal transition hover:border-lf-orange hover:text-lf-orange"
                  >
                    Trackers and forms
                  </Link>
                  <Link
                    href="/resources/"
                    className="rounded-xl border border-lf-line bg-white px-4 py-3 text-sm font-semibold text-lf-charcoal transition hover:border-lf-orange hover:text-lf-orange"
                  >
                    Resource library
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
