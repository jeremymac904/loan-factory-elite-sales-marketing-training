import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ComplianceCallout from "@/components/ComplianceCallout";
import { apexTiers } from "@/data/apex";

export const metadata = { title: "Apex Advisor Platform" };

export default function ApexAdvisorPage() {
  return (
    <>
      <PageHero
        eyebrow="Loan Factory Apex Advisor Platform"
        title="Where Top Loan Officers Are Built."
        body={
          <p>
            Apex Advisor is the full development platform for serious loan
            officers. The Apex Advisor Track (101 through 601), live coaching,
            certifications, summits, and a mastermind community, all in one
            place.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="#tiers" className="btn-primary">
            See the tiers
          </Link>
          <Link
            href="/apex-advisor-track/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white"
          >
            Explore the Apex Track
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-14">
        <SectionHeading
          eyebrow="What is Apex Advisor"
          title="One platform for the way top loan officers actually grow."
          description="Apex Advisor brings together the training, tools, certifications, and community a serious loan officer needs. The Apex Advisor Track is the foundation. Pro adds live coaching, the Apex Mastermind community, advanced TERA workflows, and access to the Apex Summit."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="card">
            <h3 className="h-display text-lg">Train</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Apex Advisor Track 101 through 601. Scripts, AI prompts,
              roleplays, audio training, and a weekly tracker.
            </p>
          </div>
          <div className="card">
            <h3 className="h-display text-lg">Certify</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Earn Apex certifications that signal you have done the work.
              ACLO, TERA Power User, Marketing Pro, and Pro Graduate.
            </p>
          </div>
          <div className="card">
            <h3 className="h-display text-lg">Connect</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Live mastermind calls, an annual Apex Summit, and a community of
              loan officers who run the same operating system.
            </p>
          </div>
        </div>
      </section>

      <section id="tiers" className="bg-lf-mist">
        <div className="container-page py-14">
          <SectionHeading
            eyebrow="Membership tiers"
            title="Pick the level that matches the work you are willing to do."
            description="Both tiers include the Apex Advisor Track and the member area. Pro adds live coaching, the mastermind, and the Apex Summit."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {apexTiers.map((tier) => (
              <article
                key={tier.id}
                className="card flex h-full flex-col gap-4"
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                    {tier.id === "pro" ? "Tier 2" : "Tier 1"}
                  </span>
                  <h3 className="h-display mt-2 text-2xl">{tier.name}</h3>
                  <p className="mt-1 text-sm text-lf-slate">{tier.tagline}</p>
                </div>
                <div>
                  <span className="font-display text-4xl font-semibold text-lf-navy">
                    {tier.price}
                  </span>
                  <span className="ml-2 text-sm text-lf-slate">
                    {tier.priceSuffix}
                  </span>
                </div>
                <p className="prose-lf text-sm">{tier.description}</p>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                    What is included
                  </p>
                  <ul className="prose-lf mt-2 list-disc space-y-1 pl-5 text-sm">
                    {tier.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs text-lf-slate">
                  <strong className="text-lf-navy">Best for:</strong>{" "}
                  {tier.bestFor}
                </p>
                <div className="mt-auto flex flex-wrap gap-3 pt-2">
                  <Link href={tier.ctaHref} className="btn-primary">
                    {tier.ctaLabel}
                  </Link>
                  <Link
                    href={tier.id === "pro" ? "/apex-advisor-pro/" : "/apex-advisor-track/"}
                    className="btn-secondary"
                  >
                    Learn more
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <SectionHeading
          eyebrow="What is inside"
          title="The full Apex Advisor platform map."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/apex-advisor-track/" className="card hover:shadow-lift">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Course track
            </p>
            <h3 className="h-display mt-1 text-lg">Apex Advisor Track</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              The 101 through 601 foundation course. Included in both tiers.
            </p>
          </Link>
          <Link href="/apex-certifications/" className="card hover:shadow-lift">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Credentials
            </p>
            <h3 className="h-display mt-1 text-lg">Certifications</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Four Apex certifications that signal you have done the work.
            </p>
          </Link>
          <Link href="/apex-calendar/" className="card hover:shadow-lift">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Live events
            </p>
            <h3 className="h-display mt-1 text-lg">Calendar</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Monthly Q&amp;A, mastermind calls, and the Apex Summit.
            </p>
          </Link>
          <Link href="/apex-mastermind/" className="card hover:shadow-lift">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Community
            </p>
            <h3 className="h-display mt-1 text-lg">Apex Mastermind</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Pro tier community and coaching calls.
            </p>
          </Link>
          <Link href="/apex-leaderboards/" className="card hover:shadow-lift">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Recognition
            </p>
            <h3 className="h-display mt-1 text-lg">Leaderboards</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Production and activity leaderboards. For motivation, not
              guarantees.
            </p>
          </Link>
          <Link href="/apex-member-area/" className="card hover:shadow-lift">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Portal
            </p>
            <h3 className="h-display mt-1 text-lg">Member Area</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Sign in to your training, content, and live event schedule.
            </p>
          </Link>
        </div>
      </section>

      <section className="container-page pb-20">
        <ComplianceCallout title="Compliance review" variant="default">
          <p>
            Apex Advisor is a Loan Factory training and development platform.
            Course content, marketing content, and member content do not
            guarantee production, income, or business results. Anything created
            for borrowers, Realtors, or the public still requires Loan Factory
            compliance review before use.
          </p>
        </ComplianceCallout>
      </section>
    </>
  );
}
