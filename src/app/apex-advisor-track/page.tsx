import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ComplianceCallout from "@/components/ComplianceCallout";
import ModuleCard from "@/components/ModuleCard";
import { modules } from "@/data/modules";

export const metadata = { title: "Apex Advisor Track" };

export default function ApexAdvisorTrackPage() {
  return (
    <>
      <PageHero
        eyebrow="The foundation course"
        title="Apex Advisor Track. 101 through 601."
        body={
          <p>
            The Apex Advisor Track is the foundation course inside the Apex
            Advisor platform. Six modules, one week each. The Elite Sales and
            Marketing Training Series, rebuilt as the official Apex Advisor
            curriculum. Included in both membership tiers.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/101-foundation/" className="btn-primary">
            Start with 101
          </Link>
          <Link
            href="/apex-advisor/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white"
          >
            See platform tiers
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-14">
        <SectionHeading
          eyebrow="What this track does"
          title="One installable behavior per week, for six weeks."
          description="The Apex Advisor Track is the same operating system that the Elite Sales and Marketing Training Series taught. Each module installs one specific behavior with scripts, AI prompts, roleplays, and a tracker. Practical over theoretical. Broker positive. Compliance aware."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="card">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Tier 1
            </p>
            <h3 className="h-display mt-1 text-lg">Included in Apex Advisor</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Full Apex Advisor Track access at $249 per month.
            </p>
          </div>
          <div className="card">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Tier 2
            </p>
            <h3 className="h-display mt-1 text-lg">Included in Apex Advisor Pro</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Full Apex Advisor Track plus live coaching at $449 per month.
            </p>
          </div>
          <div className="card">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Credential
            </p>
            <h3 className="h-display mt-1 text-lg">Apex Certified Loan Officer</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Complete all six modules to be eligible for the ACLO credential.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-14">
          <SectionHeading
            eyebrow="The path"
            title="Six modules. One week at a time."
            description="Start with 101. Stay in sequence. Each module adds one specific layer to the system."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((m) => (
              <ModuleCard
                key={m.slug}
                level={m.level}
                title={m.title}
                promise={m.corePromise}
                href={m.href}
                status={m.status}
                levels={m.levels}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <SectionHeading
          eyebrow="Resources that run with the track"
          title="Everything you need to actually do the week."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/scripts/" className="card hover:shadow-lift">
            <h3 className="h-display text-lg">Script Library</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Borrower, Realtor, partner, listing agent, past client, hook,
              text, and email scripts. Compliance notes included.
            </p>
          </Link>
          <Link href="/prompts/" className="card hover:shadow-lift">
            <h3 className="h-display text-lg">AI Prompt Library</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Gemini Gem AI Twin prompts for call prep, follow up, partner
              outreach, content, roleplay, and weekly review.
            </p>
          </Link>
          <Link href="/roleplays/" className="card hover:shadow-lift">
            <h3 className="h-display text-lg">Roleplay Library</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Ten short structured roleplays from cold Realtor outreach to past
              client check ins.
            </p>
          </Link>
          <Link href="/audio-training/" className="card hover:shadow-lift">
            <h3 className="h-display text-lg">Audio Training Library</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Short source grounded training conversations on sales psychology,
              the operating system, and the training blueprint.
            </p>
          </Link>
          <Link href="/tracker/" className="card hover:shadow-lift">
            <h3 className="h-display text-lg">Weekly Tracker</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Activity, content, partner, follow up, AI usage, and next week
              commitments.
            </p>
          </Link>
          <Link href="/personality-workshop/" className="card hover:shadow-lift">
            <h3 className="h-display text-lg">Personality Workshop</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Know your strengths and selling style. Self paced with an
              optional live debrief.
            </p>
          </Link>
        </div>
      </section>

      <section className="container-page pb-20">
        <ComplianceCallout title="Compliance review" variant="default">
          <p>
            Apex Advisor Track content is for Loan Factory team training. It is
            not a guarantee of production or income. Any borrower facing,
            Realtor facing, or public artifact created from this material must
            be reviewed by Loan Factory compliance before use.
          </p>
        </ComplianceCallout>
      </section>
    </>
  );
}
