import Link from "next/link";
import BrandImage from "@/components/BrandImage";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { brandAssets } from "@/data/brandAssets";
import { apexTiers } from "@/data/apex";

export const metadata = { title: "Loan Factory Coaching" };

export default function ApexAdvisorPage() {
  return (
    <>
      <PageHero
        eyebrow="Loan Factory Coaching"
        title="LO Mastery and Loan Factory Alliance."
        body={
          <p>
            Paid coaching for Loan Factory loan officers who want a clearer
            weekly plan, more accountability, stronger follow-up, and practical
            help from coaches. Sales &amp; Marketing is still a separate
            101-601 training path.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {apexTiers.map((tier) => (
            <div
              key={tier.id}
              className="inline-flex rounded-xl bg-white/95 p-2 shadow-card"
            >
              <BrandImage
                asset={brandAssets[tier.logoAssetId]}
                heightClass="h-14 md:h-16"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="#tiers" className="btn-primary">
            See the tiers
          </Link>
          <Link
            href="/member-area/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white"
          >
            Preview member resources
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-14">
        <SectionHeading
          eyebrow="What is coaching"
          title="Coaching gives you a plan and someone to help you stay on it."
          description="LO Mastery and Loan Factory Alliance are paid coaching programs. Use them when you want calls, accountability, trackers, scorecards, recordings, and coaching resources. Use Sales & Marketing for the separate 101-601 training lessons."
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
              Find recordings, scripts, handouts, documents, and favorite
              training references in one member area.
            </p>
          </div>
        </div>
      </section>

      <section id="tiers" className="bg-lf-mist">
        <div className="container-page py-14">
          <SectionHeading
            eyebrow="Membership tiers"
            title="Pick the coaching rhythm that fits your work."
            description="LO Mastery is $249 per month. Loan Factory Alliance is $449 per month and adds more frequent coaching, Breakfast Club, advanced certifications, and mastermind access. Pricing is pending final approval."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {apexTiers.map((tier) => (
              <article
                key={tier.id}
                className="card flex h-full flex-col gap-4"
              >
                <div>
                  <div className="mb-5 inline-flex rounded-xl bg-white p-2 shadow-card">
                    <BrandImage
                      asset={brandAssets[tier.logoAssetId]}
                      heightClass="h-16"
                    />
                  </div>
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
        <SectionHeading
          eyebrow="What is inside"
          title="What members can open"
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/member-area/" className="card hover:shadow-lift">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Member resources
            </p>
            <h3 className="h-display mt-1 text-lg">Resource area</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Past recordings, scripts, documents, handouts, and favorite
              training channels.
            </p>
          </Link>
          <Link href="/apex-certifications/" className="card hover:shadow-lift">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Credentials
            </p>
            <h3 className="h-display mt-1 text-lg">Certifications</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Track completion for LO Mastery and future Alliance specialty paths.
            </p>
          </Link>
          <Link href="/apex-calendar/" className="card hover:shadow-lift">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Live events
            </p>
            <h3 className="h-display mt-1 text-lg">Calendar</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Coaching calls, Power Hour, Breakfast Club, and member events.
            </p>
          </Link>
          <Link href="/apex-mastermind/" className="card hover:shadow-lift">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Community
            </p>
            <h3 className="h-display mt-1 text-lg">Alliance Mastermind</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Advanced mastermind access for Loan Factory Alliance members.
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
          <Link href="/member-area/" className="card hover:shadow-lift">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Portal
            </p>
            <h3 className="h-display mt-1 text-lg">Member Area</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Sign in to coaching resources, trackers, scorecards, recordings,
              and documents.
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
        </div>
      </section>

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
