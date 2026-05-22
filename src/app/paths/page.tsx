import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ComplianceCallout from "@/components/ComplianceCallout";
import { paths } from "@/data/paths";

export const metadata = { title: "Learner Paths" };

export default function PathsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <video
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/media/dark-hero-background.png"
        >
          <source src="/media/dark-premium-AI-workflow.mp4" type="video/mp4" />
        </video>
        <div aria-hidden className="absolute inset-0 bg-lf-navyDark/60" />
        <div className="relative container-page py-16">
          <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
            Choose Your Path
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Pick the starting point that fits where you are right now.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Three paths. Beginner for new or overwhelmed LOs. Intermediate for
            working LOs who want consistency. Advanced for producers, team
            leaders, coaches, and AI power users.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="Choose Your Starting Point"
          title="Three honest options."
        />
        <div className="prose-lf mt-6 grid gap-4 text-base md:grid-cols-3">
          <div className="card">
            <p>
              <strong>New or overwhelmed?</strong>
              <br />
              Start with the Beginner Path.
            </p>
          </div>
          <div className="card">
            <p>
              <strong>Already originating but inconsistent?</strong>
              <br />
              Start with the Intermediate Path.
            </p>
          </div>
          <div className="card">
            <p>
              <strong>Leading a team, coaching others, or using AI heavily?</strong>
              <br />
              Start with the Advanced Path.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page space-y-8 pb-16">
        {paths.map((p) => (
          <article key={p.id} id={p.id} className="card scroll-mt-24">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              {p.tagline} · {p.level}
            </p>
            <h2 className="h-display mt-3 text-2xl">{p.title}</h2>
            <p className="prose-lf mt-1 text-sm text-lf-slate">{p.audience}</p>
            <p className="prose-lf mt-2 text-base">
              <strong>Goal: </strong>
              {p.goal}
            </p>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                  Focus
                </h3>
                <ul className="prose-lf mt-2 list-disc space-y-1 pl-5 text-sm">
                  {p.focus.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                  Modules
                </h3>
                <ul className="prose-lf mt-2 list-disc space-y-1 pl-5 text-sm">
                  {p.modules.map((m) => (
                    <li key={m.href}>
                      <Link href={m.href} className="text-lf-navy hover:text-lf-orange">
                        {m.level}. {m.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                  Resources
                </h3>
                <ul className="prose-lf mt-2 list-disc space-y-1 pl-5 text-sm">
                  {p.resources.map((r) => (
                    <li key={r.href}>
                      <Link href={r.href} className="text-lf-navy hover:text-lf-orange">
                        {r.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-lf-line bg-lf-mist p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                First week, day by day
              </h3>
              <ol className="prose-lf mt-2 list-decimal space-y-1 pl-5 text-sm">
                {p.firstWeek.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ol>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={p.modules[0].href} className="btn-primary">
                Start with {p.modules[0].level}
              </Link>
              <Link href="/recommended-channels/" className="btn-secondary">
                Recommended channels
              </Link>
            </div>
          </article>
        ))}

        <ComplianceCallout title="One reminder before you start" variant="default">
          <p>
            Path choice does not change the compliance rules. Borrower facing,
            Realtor facing, and public artifacts still require compliance review
            before use, no matter which path you are on.
          </p>
        </ComplianceCallout>
      </section>
    </>
  );
}
