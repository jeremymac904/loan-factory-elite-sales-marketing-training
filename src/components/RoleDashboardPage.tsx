import Link from "next/link";
import type { RoleDashboard } from "@/data/roleDashboards";

const statusClassName: Record<string, string> = {
  Live: "border-lf-orange/30 bg-lf-orangeSoft text-lf-orangeDark",
  Ready: "border-lf-navy/15 bg-lf-mist text-lf-navy",
  "Needs review": "border-lf-orange/30 bg-white text-lf-orangeDark",
  "Sandbox first": "border-lf-navy/15 bg-white text-lf-navy",
};

export default function RoleDashboardPage({
  dashboard,
}: {
  dashboard: RoleDashboard;
}) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(242,106,31,0.38),transparent_32%),linear-gradient(90deg,rgba(0,0,0,0.92),rgba(10,16,28,0.72),rgba(0,0,0,0.9))]"
        />
        <div className="relative container-page py-14 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-lf-orange">
            {dashboard.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold tracking-tight md:text-5xl">
            {dashboard.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/84">
            {dashboard.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={dashboard.primaryHref} className="btn-primary">
              {dashboard.primaryLabel}
            </Link>
            <Link
              href={dashboard.secondaryHref}
              className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
            >
              {dashboard.secondaryLabel}
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page -mt-8 pb-8">
        <div className="relative grid gap-4 md:grid-cols-3">
          {dashboard.metrics.map((metric) => (
            <div key={metric.label} className="card border-white/70 shadow-lift">
              <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                {metric.label}
              </p>
              <p className="mt-1 text-2xl font-bold text-lf-charcoal">
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-14">
        <div className="grid gap-8">
          {dashboard.sections.map((section) => (
            <section key={section.title} className="rounded-2xl border border-lf-line bg-white p-5 shadow-soft md:p-7">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
                  {section.title}
                </p>
                <h2 className="h-display mt-2 text-2xl">
                  {section.description}
                </h2>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {section.cards.map((card) => (
                  <Link
                    key={`${section.title}-${card.title}`}
                    href={card.href}
                    className="group flex h-full flex-col rounded-xl border border-lf-line bg-lf-mist/40 p-5 transition hover:-translate-y-0.5 hover:border-lf-orange hover:bg-white hover:shadow-lift"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                        {card.owner}
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
                          statusClassName[card.status]
                        }`}
                      >
                        {card.status}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-lf-charcoal group-hover:text-lf-orange">
                      {card.title}
                    </h3>
                    <p className="prose-lf mt-2 text-sm text-lf-slate">
                      {card.description}
                    </p>
                    <span className="mt-auto pt-5 text-sm font-semibold text-lf-orange">
                      Open area -&gt;
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="rounded-2xl border border-lf-orange/30 bg-lf-orangeSoft/60 p-6">
          <p className="text-xs font-bold uppercase tracking-wide text-lf-orangeDark">
            Next actions
          </p>
          <ul className="mt-4 grid gap-3 md:grid-cols-3">
            {dashboard.nextActions.map((action) => (
              <li
                key={action}
                className="rounded-xl border border-white/70 bg-white px-4 py-3 text-sm font-semibold text-lf-charcoal"
              >
                {action}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
