import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ComplianceCallout from "@/components/ComplianceCallout";

export const metadata = { title: "Coaching Launch Call" };

export default function ApexLaunchCallPage() {
  return (
    <>
      <PageHero
        eyebrow="Platform launch"
        title="Loan Factory Coaching is launching."
        body={
          <p>
            Where Top Loan Officers Are Built. The coaching platform brings
            together LO Mastery, Loan Factory Alliance, daily rhythm, member
            resources, certifications, scorecards, leaderboards, and Alliance
            mastermind access.
            Drop your email to be on the launch list.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-lf-orange px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
          Launch date . TBD
        </span>
      </PageHero>

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="Get on the launch list"
          title="Be first to know when coaching opens."
          description="Email Jeremy to be added to the Loan Factory Coaching interest list."
        />
        <a
          href="mailto:jeremy.mcdonald@loanfactory.com?subject=Loan%20Factory%20Coaching%20Interest%20List"
          className="btn-primary mt-8"
        >
          Email Jeremy
        </a>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-12">
          <SectionHeading
            eyebrow="What launches"
            title="The full coaching platform."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <div className="card">
              <h3 className="h-display text-lg">LO Mastery</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                $249 per month. Biweekly group coaching, Power Hour Smile and
                Dial, daily coaching email, resources, trackers, and scorecards.
              </p>
            </div>
            <div className="card">
              <h3 className="h-display text-lg">Two membership tiers</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                LO Mastery at $249 per month. Loan Factory Alliance at $449
                per month.
              </p>
            </div>
            <div className="card">
              <h3 className="h-display text-lg">Coaching certifications</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                Certified Mortgage Advisor plus approved specialty-track
                certifications.
              </p>
            </div>
            <div className="card">
              <h3 className="h-display text-lg">Alliance coaching rhythm</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                Weekly coaching calls, daily Breakfast Club, priority
                accountability, and advanced mastermind access.
              </p>
            </div>
            <div className="card">
              <h3 className="h-display text-lg">Alliance specialty tracks</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                Military Housing Specialist, Investor Specialist, and future
                specialty tracks as they are approved.
              </p>
            </div>
            <div className="card">
              <h3 className="h-display text-lg">Member area</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                Progress, schedule, requests, and certification status in one
                place.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="Want a faster path"
          title="Explore the platform now."
        />
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/apex-advisor/" className="btn-primary">
            See platform tiers
          </Link>
          <Link href="/sales-training/" className="btn-secondary">
            View Sales &amp; Marketing Training
          </Link>
          <Link href="/apex-mastermind/" className="btn-secondary">
            See the Alliance Mastermind
          </Link>
        </div>
      </section>

      <section className="container-page pb-20">
        <ComplianceCallout title="Compliance review" variant="default">
          <p>
            Loan Factory Coaching is a Loan Factory training and development platform.
            Membership, certifications, live coaching, and mastermind access
            are not guarantees of production, income, or business results. Any
            launch content used outside this portal still requires Loan Factory
            compliance review before use.
          </p>
        </ComplianceCallout>
      </section>
    </>
  );
}
