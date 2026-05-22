import Link from "next/link";
import ComplianceCallout from "@/components/ComplianceCallout";
import SectionHeading from "@/components/SectionHeading";
import { platformModules } from "@/data/platform";

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <video
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-45 grayscale"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/media/dark-hero-background.png"
        >
          <source src="/media/platform-motion-background.mp4" type="video/mp4" />
        </video>
        <div aria-hidden className="absolute inset-0 bg-black/72" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(242,106,31,0.28),transparent_30%)]"
        />

        <div className="relative container-page py-16 md:py-24">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-lf-orange/70 bg-black/30 px-3 py-1 text-xs font-bold uppercase tracking-wide text-lf-orange">
              Internal LO development platform
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-6xl">
              Loan Factory LO Development Platform
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85 md:text-xl">
              One unified shell for Apex Advisor, Elite Sales & Marketing, AI
              Training, 1+1+1=5, Training Library, Creator Network, AI
              Assistants, Audience Quality Panel, Calendar, Trackers,
              Resources, and Support Routing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/apex-advisor/" className="btn-primary">
                Open Apex Advisor
              </Link>
              <Link
                href="/creator-network/"
                className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
              >
                View Creator Network
              </Link>
              <Link
                href="/ai-assistants/"
                className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
              >
                View AI Assistants
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="grid gap-5 md:grid-cols-4">
          {[
            ["12", "Platform areas"],
            ["Static", "Safe prototype mode"],
            ["0", "External APIs wired"],
            ["Human", "Review before external use"],
          ].map(([value, label]) => (
            <article key={label} className="card">
              <p className="font-display text-3xl font-semibold text-lf-navy">
                {value}
              </p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-lf-orange">
                {label}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-16">
          <SectionHeading
            eyebrow="Unified Platform"
            title="Every module has one consistent operating model."
            description="Each area now states what it does, who it serves, the tools/resources included, current status, and the next action. Static prototypes are labeled honestly and do not imply live integrations."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {platformModules.map((module) => (
              <Link
                key={module.id}
                href={module.href}
                className="card group flex h-full flex-col gap-4 transition hover:-translate-y-0.5 hover:shadow-lift"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="h-display text-xl">{module.shortTitle}</h2>
                  <span className="shrink-0 rounded-full border border-lf-orange/35 bg-lf-orangeSoft px-2.5 py-0.5 text-[11px] font-semibold text-lf-orangeDark">
                    {module.status}
                  </span>
                </div>
                <p className="prose-lf text-sm text-lf-slate">
                  {module.summary}
                </p>
                <div className="mt-auto border-t border-lf-line pt-3 text-sm font-semibold text-lf-navy group-hover:text-lf-orange">
                  Open module
                  <span aria-hidden className="ml-1">
                    &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <SectionHeading
          eyebrow="Live-ready posture"
          title="Built as a working site shell, not a fake product."
          description="The platform is now navigable and demoable, while every non-wired capability is clearly marked as planned, draft only, requires source content, requires sandbox wiring, or requires human review."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <article className="card">
            <h3 className="h-display text-lg">Static where appropriate</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Creator Network, Audience Quality Panel, and AI Assistants are
              visible without claiming auth, feeds, model calls, or publishing.
            </p>
          </article>
          <article className="card">
            <h3 className="h-display text-lg">Training routes preserved</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              The existing 101 to 601 pages, Apex pages, scripts, roleplays,
              prompts, audio training, and trackers remain reachable.
            </p>
          </article>
          <article className="card">
            <h3 className="h-display text-lg">Review gates visible</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Draft outputs, marketing/recruiting materials, support routing,
              and compliance-sensitive work point back to human review.
            </p>
          </article>
        </div>
      </section>

      <section className="container-page pb-20">
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
