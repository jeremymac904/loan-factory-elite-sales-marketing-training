import Link from "next/link";
import ComplianceCallout from "@/components/ComplianceCallout";
import SectionHeading from "@/components/SectionHeading";
import { PlatformModule } from "@/data/platform";

type Props = {
  module: PlatformModule;
  children?: React.ReactNode;
};

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="card h-full">
      <h3 className="h-display text-lg">{title}</h3>
      <ul className="prose-lf mt-3 list-disc space-y-1 pl-5 text-sm">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export default function PlatformModulePage({ module, children }: Props) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,106,31,0.24),transparent_34%),linear-gradient(135deg,#000000_0%,#111111_46%,#2b2b2b_100%)]"
        />
        <div className="relative container-page py-16 md:py-20">
          <span className="inline-flex rounded-full border border-lf-orange/70 bg-black/30 px-3 py-1 text-xs font-bold uppercase tracking-wide text-lf-orange">
            {module.status}
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-5xl">
            {module.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">
            {module.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="btn-primary">
              Platform Home
            </Link>
            <Link
              href="/support-routing/"
              className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
            >
              Support Routing
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <SectionHeading
          eyebrow="Module Overview"
          title="What this module does"
          description={module.summary}
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <ListCard title="Who it is for" items={module.whoFor} />
          <ListCard title="Tools included" items={module.tools} />
          <ListCard title="Resources included" items={module.resources} />
        </div>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-14">
          <div className="grid gap-5 md:grid-cols-2">
            <article className="card">
              <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                Current status
              </p>
              <h2 className="h-display mt-2 text-2xl">{module.status}</h2>
              <p className="prose-lf mt-3 text-sm text-lf-slate">
                {module.currentStatus}
              </p>
            </article>
            <article className="card">
              <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                Next action
              </p>
              <h2 className="h-display mt-2 text-2xl">What happens next</h2>
              <p className="prose-lf mt-3 text-sm text-lf-slate">
                {module.nextAction}
              </p>
            </article>
          </div>
        </div>
      </section>

      {children}

      <section className="container-page py-14">
        <SectionHeading
          eyebrow="Platform connection"
          title="How this connects to the rest of LO Development"
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {module.connections.map((connection) => (
            <article key={connection} className="card">
              <p className="prose-lf text-sm text-lf-slate">{connection}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page pb-20">
        <ComplianceCallout title="Internal platform guardrail">
          <p>
            This page is part of an internal Loan Factory LO Development
            Platform prototype. Features marked planned, draft only, coming
            next, requires sandbox wiring, requires human review, or requires
            source content are not live integrations.
          </p>
        </ComplianceCallout>
      </section>
    </>
  );
}
