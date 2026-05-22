import Link from "next/link";
import ComplianceCallout from "@/components/ComplianceCallout";

const dashboardModules = [
  {
    title: "Apex Advisor",
    description: "Start here for coaching, Apex track access, certifications, and member resources.",
    href: "/apex-advisor/",
    status: "Live",
  },
  {
    title: "Elite Sales & Marketing",
    description: "Follow the 101 to 601 training path for conversations, conversion, partners, and execution.",
    href: "/sales-training/",
    status: "Live",
  },
  {
    title: "AI Training",
    description: "Learn how to use AI tools safely for drafts, practice, and training support.",
    href: "/ai-training/",
    status: "Guide",
  },
  {
    title: "Creator Network",
    description: "Use the internal-only idea network for scripts, prompts, examples, and field wins.",
    href: "/creator-network/",
    status: "Internal",
  },
  {
    title: "AI Assistants",
    description: "Open draft-only assistants for marketing, sales coaching, content, and support workflows.",
    href: "/ai-assistants/",
    status: "Draft only",
  },
  {
    title: "Training Library",
    description: "Find scripts, roleplays, prompts, recordings, audio training, and handouts.",
    href: "/training-library/",
    status: "Library",
  },
  {
    title: "Calendar",
    description: "See training sessions, coaching moments, review windows, and upcoming platform events.",
    href: "/calendar/",
    status: "Planning",
  },
  {
    title: "Trackers",
    description: "Track conversations, partner touches, assignments, and weekly accountability.",
    href: "/trackers/",
    status: "Tools",
  },
  {
    title: "Resources",
    description: "Jump to supporting guides, compliance reminders, downloads, and reference materials.",
    href: "/resources/",
    status: "Reference",
  },
  {
    title: "Support Routing",
    description: "Find where to send training, content, workflow, compliance, or platform support needs.",
    href: "/support-routing/",
    status: "Routing",
  },
  {
    title: "1+1+1=5 Growth",
    description: "Review the team growth playbook for partner strategy, content planning, and cadence.",
    href: "/one-plus-one-five/",
    status: "Planned",
  },
];

const platformStatus = [
  "Static shell only",
  "No external APIs wired",
  "Draft outputs require review",
  "TERA writes are blocked",
];

export default function HomePage() {
  return (
    <>
      <section className="border-b border-lf-line bg-lf-mist">
        <div className="container-page py-14 md:py-16">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl font-semibold tracking-tight text-lf-navy md:text-6xl">
              Loan Factory LO Development Platform
            </h1>
            <p className="mt-5 text-lg leading-8 text-lf-charcoal md:text-xl">
              Training, coaching, AI tools, and internal resources for Loan
              Factory loan officers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/apex-advisor/" className="btn-primary">
                Start with Apex Advisor
              </Link>
              <Link
                href="/sales-training/"
                className="btn-secondary"
              >
                View Sales Training
              </Link>
              <Link
                href="/ai-assistants/"
                className="btn-secondary"
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
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {dashboardModules.map((module) => (
            <article
              key={module.href}
              className="card flex min-h-56 flex-col gap-4 transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="h-display text-xl">{module.title}</h3>
                <span className="shrink-0 rounded-full border border-lf-orange/35 bg-lf-orangeSoft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-lf-orangeDark">
                  {module.status}
                </span>
              </div>
              <p className="prose-lf text-sm text-lf-slate">
                {module.description}
              </p>
              <Link
                href={module.href}
                className="mt-auto inline-flex w-fit items-center rounded-lg bg-lf-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-lf-orange"
              >
                Open
                <span aria-hidden className="ml-2">
                  &rarr;
                </span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-lf-line bg-white">
        <div className="container-page py-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-lf-orange">
            Platform status
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {platformStatus.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-lf-line bg-lf-mist px-4 py-3 text-sm font-semibold text-lf-charcoal"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <ComplianceCallout title="Internal use only" variant="default">
          <p>
            This platform is for Loan Factory internal training and LO
            development. It does not send messages, publish content, call AI
            models, write to TERA, or expose borrower data. Borrower-facing,
            Realtor-facing, recruiting-facing, public, rate-related,
            fee-related, and compliance-sensitive artifacts require human review
            before use.
          </p>
        </ComplianceCallout>
      </section>
    </>
  );
}
