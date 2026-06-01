import Link from "next/link";
import type { RoleDashboard } from "@/data/roleDashboards";
import CommandCenterChatMount from "@/components/assistant/CommandCenterChatMount";

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
        <div className="relative container-page py-10 md:py-12">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-lf-orange">
            {dashboard.eyebrow}
          </p>
          <h1 className="mt-2 max-w-4xl font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {dashboard.title}
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-white/84">
            {dashboard.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
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

          {/* Metrics sit in the hero so key numbers stay above the fold. */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {dashboard.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur"
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">
                  {metric.label}
                </p>
                <p className="mt-0.5 text-xl font-bold text-white">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next actions promoted directly under the hero for fast access. */}
      <section className="container-page section-y-tight">
        <div className="rounded-2xl border border-lf-orange/30 bg-lf-orangeSoft/60 p-4 md:p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-lf-orangeDark">
            Next actions
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {dashboard.nextActions.map((action) => (
              <li
                key={action}
                className="rounded-lg border border-white/70 bg-white px-3 py-2 text-sm font-semibold text-lf-charcoal"
              >
                {action}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* First-login Command Center chat — role-aware guided help, draft-only. */}
      <CommandCenterChatMount />

      <section className="container-page section-y-tight pb-10">
        <div className="grid gap-5">
          {dashboard.sections.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl border border-lf-line bg-white p-4 shadow-soft md:p-5"
            >
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
                  {section.title}
                </p>
                <h2 className="h-display mt-1 text-xl">{section.description}</h2>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {section.cards.map((card) => (
                  <Link
                    key={`${section.title}-${card.title}`}
                    href={card.href}
                    className="group flex h-full flex-col rounded-xl border border-lf-line bg-lf-mist/40 p-4 transition hover:-translate-y-0.5 hover:border-lf-orange hover:bg-white hover:shadow-lift"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-lf-slate">
                        {card.owner}
                      </span>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                          statusClassName[card.status]
                        }`}
                      >
                        {card.status}
                      </span>
                    </div>
                    <h3 className="mt-2.5 text-base font-semibold text-lf-charcoal group-hover:text-lf-orange">
                      {card.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-lf-slate">
                      {card.description}
                    </p>
                    <span className="mt-auto pt-3 text-sm font-semibold text-lf-orange">
                      Open area -&gt;
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
