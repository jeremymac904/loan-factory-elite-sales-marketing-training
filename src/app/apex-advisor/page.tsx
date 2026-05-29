import Link from "next/link";
import ClipLibraryRail from "@/components/ClipLibraryRail";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { apexTiers } from "@/data/apex";

export const metadata = { title: "Loan Factory Coaching" };

export default function ApexAdvisorPage() {
  return (
    <>
      <PageHero
        eyebrow="Loan Factory Coaching"
        title="LO Mastery and Loan Factory Alliance"
        body={
          <p>
            Paid coaching for Loan Factory loan officers who want a clearer
            weekly plan, more accountability, stronger follow-up, and practical
            help from coaches.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/lo-mastery-coaching/" className="btn-primary">
            Open LO Mastery
          </Link>
          <Link
            href="/loan-factory-alliance/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            Open Alliance
          </Link>
          <Link
            href="/member-area/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            Member Area
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-14">
        <SectionHeading
          eyebrow="What is coaching"
          title="Coaching gives you a plan and someone to help you stay on it."
          description="LO Mastery and Loan Factory Alliance are paid coaching programs. Use them when you want calls, accountability, trackers, scorecards, recordings, and practical coaching resources."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="card">
            <h3 className="h-display text-lg">Coach</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Join coaching calls, review what is working, and leave with a
              clearer next step for the week.
            </p>
          </div>
          <div className="card">
            <h3 className="h-display text-lg">Track</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Use trackers and scorecards to see your conversations, partner
              touches, follow-up, and weekly consistency.
            </p>
          </div>
          <div className="card">
            <h3 className="h-display text-lg">Resource</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Find recordings, scripts, handouts, documents, and coaching
              references in one member area.
            </p>
          </div>
        </div>
      </section>

      <section id="tiers" className="bg-lf-mist">
        <div className="container-page py-14">
          <SectionHeading
            eyebrow="Membership tiers"
            title="Pick the coaching rhythm that fits your work."
            description="LO Mastery is $249 per month. Loan Factory Alliance is $449 per month and adds more frequent coaching, Breakfast Club, advanced certifications, and deeper accountability. Pricing is pending final approval."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {apexTiers.map((tier) => (
              <article key={tier.id} className="card flex h-full flex-col gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                    {tier.id === "pro" ? "Level II" : "Level I"}
                  </span>
                  <h3 className="metal-title mt-2 text-2xl">{tier.name}</h3>
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
                    What you get
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
                    href={
                      tier.id === "pro"
                        ? "/loan-factory-alliance/"
                        : "/lo-mastery-coaching/"
                    }
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
        <SectionHeading eyebrow="What is inside" title="What members can open" />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/member-area/" className="card hover:shadow-lift">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Member resources
            </p>
            <h3 className="h-display mt-1 text-lg">Resource area</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Past recordings, scripts, documents, handouts, trackers, and
              scorecards.
            </p>
          </Link>
          <Link href="/apex-certifications/" className="card hover:shadow-lift">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Credentials
            </p>
            <h3 className="h-display mt-1 text-lg">Certifications</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Track completion for LO Mastery and future Alliance specialty
              paths.
            </p>
          </Link>
          <Link href="/apex-calendar/" className="card hover:shadow-lift">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Coaching calendar
            </p>
            <h3 className="h-display mt-1 text-lg">Calendar</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Coaching calls, Power Hour, Breakfast Club, and member events.
            </p>
          </Link>
          <Link href="/apex-leaderboards/" className="card hover:shadow-lift">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Recognition
            </p>
            <h3 className="h-display mt-1 text-lg">Leaderboards</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              LO Mastery and Loan Factory Alliance leaderboards for
              accountability and recognition.
            </p>
          </Link>
          <Link href="/trackers/" className="card hover:shadow-lift">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Trackers
            </p>
            <h3 className="h-display mt-1 text-lg">Scorecards and trackers</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Track calls, partner touches, deal flow, and weekly consistency.
            </p>
          </Link>
          <Link href="/assessments/" className="card hover:shadow-lift">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Coaching tool
            </p>
            <h3 className="h-display mt-1 text-lg">Assessments</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Coaching quizzes that help match an LO to scripts, practice, and
              the next training step. Coaching tool only.
            </p>
          </Link>
          <Link href="/market-mentor/" className="card hover:shadow-lift">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Coaching tool
            </p>
            <h3 className="h-display mt-1 text-lg">Market Mentor Studio</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Market updates, rate explainers, buy-vs-rent, and video scripts.
              Core tools for LO Mastery; advanced tools for Loan Factory
              Alliance.
            </p>
          </Link>
        </div>
      </section>

      <ClipLibraryRail
        title="Coaching support clips"
        description="Internal LO Development clips that help explain corporate coach support and early LO development resources."
        section="Corporate Coach Resources"
      />

      <section className="container-page pb-20">
        <p className="max-w-3xl text-sm leading-6 text-lf-slate">
          Coaching materials are for internal development. Borrower, Realtor,
          recruiting, and marketing use still needs the proper Loan Factory
          review before use.
        </p>
      </section>
    </>
  );
}
