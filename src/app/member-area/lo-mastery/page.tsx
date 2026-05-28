import Link from "next/link";

export const metadata = { title: "LO Mastery Coaching · Member Area" };

const sections = [
  {
    title: "Daily Power Hour",
    description: "Morning focus block with prompts, prospecting plan, and follow-up.",
    href: "/calendar/",
  },
  {
    title: "Biweekly group coaching",
    description: "Live group coaching with Edward and the LO Mastery team.",
    href: "/coaching/",
  },
  {
    title: "Daily coaching email",
    description: "Daily action prompt delivered to your inbox.",
    href: "/ai-assistants/email-drafts/",
  },
  {
    title: "Certified Mortgage Advisor track",
    description: "Progress through the CMA certification path.",
    href: "/apex-certifications/",
  },
  {
    title: "Scripts library",
    description: "Internal scripts for calls, follow-up, and Realtor conversations.",
    href: "/scripts/",
  },
  {
    title: "Trackers",
    description: "Daily and weekly trackers for activity, pipeline, and follow-up.",
    href: "/trackers/",
  },
  {
    title: "Resource library",
    description: "Sales & Marketing 101-601, AI Advantage, and coaching resources.",
    href: "/resources/",
  },
  {
    title: "Leaderboard",
    description: "Team and member leaderboard for coaching activity and wins.",
    href: "/apex-leaderboards/",
  },
  {
    title: "LO Mastery Coaching Assistant",
    description: "Your daily AI coaching assistant — Power Hour prompts, follow-up drafts, accountability check-ins.",
    href: "/ai-assistants/my-ai-twin/",
  },
];

export default function LoMasteryMemberAreaPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-12">
          <div className="flex items-center gap-3">
            <Link href="/member-area/" className="text-sm font-semibold text-white/70 hover:text-white">
              Member Area
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-sm font-semibold text-white">LO Mastery Coaching</span>
          </div>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
            LO Mastery Coaching · $249
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">
            Daily rhythm, accountability, and coaching to grow your business.
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <Link
              key={s.href}
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
