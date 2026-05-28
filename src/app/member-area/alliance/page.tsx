import Link from "next/link";

export const metadata = { title: "Loan Factory Alliance · Member Area" };

const sections = [
  {
    title: "Daily Breakfast Club",
    description: "Daily morning live with the Alliance — wins, blockers, focus.",
    href: "/calendar/",
  },
  {
    title: "Weekly coaching",
    description: "Weekly live coaching with the Alliance coach team.",
    href: "/coaching/",
  },
  {
    title: "Biweekly Mastermind",
    description: "Mastermind sessions for advanced producers and team leaders.",
    href: "/apex-mastermind/",
  },
  {
    title: "Advanced certifications",
    description: "Advanced certifications including leadership and team builder track.",
    href: "/apex-certifications/",
  },
  {
    title: "Priority coaching",
    description: "Priority access to coaching support and reviews.",
    href: "/coaching/",
  },
  {
    title: "Leadership / team builder track",
    description: "1+1+1=5 team growth content for team leaders inside the Alliance.",
    href: "/one-plus-one-five/",
  },
  {
    title: "Mastermind resources",
    description: "Mastermind prep docs, scorecards, and recordings.",
    href: "/apex-mastermind/",
  },
  {
    title: "Alliance AI Coaching Assistant",
    description: "Strategy, mastermind prep, leadership coaching, and follow-up at the Alliance level.",
    href: "/ai-assistants/my-ai-twin/",
  },
  {
    title: "Everything in LO Mastery",
    description: "All LO Mastery Coaching content plus the upgrades above.",
    href: "/member-area/lo-mastery/",
  },
];

export default function AllianceMemberAreaPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-orange text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-12">
          <div className="flex items-center gap-3">
            <Link href="/member-area/" className="text-sm font-semibold text-white/80 hover:text-white">
              Member Area
            </Link>
            <span className="text-white/60">/</span>
            <span className="text-sm font-semibold text-white">Loan Factory Alliance</span>
          </div>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
            Loan Factory Alliance · $449
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/90">
            Advanced coaching, mastermind-level strategy, leadership growth.
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="card flex flex-col gap-2 transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <h2 className="text-base font-semibold text-lf-charcoal">
                {s.title}
              </h2>
              <p className="text-sm text-lf-slate">{s.description}</p>
              <span className="mt-auto inline-flex items-center text-sm font-semibold text-lf-orange">
                Open <span aria-hidden className="ml-2">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
