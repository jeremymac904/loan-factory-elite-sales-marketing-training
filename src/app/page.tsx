import Link from "next/link";

const dashboardModules = [
  {
    title: "Apex Advisor",
    description: "Paid coaching, accountability, member resources, and Apex scorecards.",
    href: "/apex-advisor/",
    cta: "Explore",
  },
  {
    title: "Sales & Marketing",
    description: "The six-part 101 to 601 training series for Loan Factory LOs.",
    href: "/sales-training/",
    cta: "Open",
  },
  {
    title: "AI Training",
    description: "Practical lessons for using AI tools to draft, practice, and improve.",
    href: "/ai-training/",
    cta: "Open",
  },
  {
    title: "FaceGram",
    description: "The internal Loan Factory social feed for posts, groups, wins, and feedback.",
    href: "/creator-network/",
    cta: "Explore",
  },
  {
    title: "AI Assistants",
    description: "Drafting helpers for coaching, content, scenarios, and review preparation.",
    href: "/ai-assistants/",
    cta: "Explore",
  },
  {
    title: "Resources",
    description: "Quick access to guides, support contacts, downloads, and reference materials.",
    href: "/resources/",
    cta: "Open",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-lf-line bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div aria-hidden className="absolute inset-0 bg-black/68" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.46)_48%,rgba(0,0,0,0.84)_100%)]"
        />
        <div className="relative container-page py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="chrome-title font-display text-4xl font-semibold tracking-normal md:text-6xl">
              Loan Factory LO Development
            </h1>
            <p className="mt-5 text-lg leading-8 text-white/85 md:text-xl">
              Training, coaching, AI tools, and internal resources for Loan
              Factory loan officers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/apex-advisor/" className="btn-primary">
                Start with Apex Advisor
              </Link>
              <Link
                href="/sales-training/"
                className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
              >
                View Sales &amp; Marketing
              </Link>
              <Link
                href="/ai-assistants/"
                className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
              >
                Explore AI Assistants
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="flex max-w-3xl flex-col gap-3">
          <h2 className="h-display text-3xl">Choose your training area.</h2>
          <p className="prose-lf text-lf-slate">
            Pick the card that matches what you need right now. Each area opens
            to training, tools, or resources with no extra dashboard clutter.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {dashboardModules.map((module) => (
            <article
              key={module.href}
              className="card flex min-h-52 flex-col gap-4 transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="h-display text-xl">{module.title}</h3>
              </div>
              <p className="prose-lf text-sm text-lf-slate">
                {module.description}
              </p>
              <Link
                href={module.href}
                className="mt-auto inline-flex w-fit items-center rounded-lg bg-lf-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-lf-orange"
              >
                {module.cta}
                <span aria-hidden className="ml-2">
                  &rarr;
                </span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
