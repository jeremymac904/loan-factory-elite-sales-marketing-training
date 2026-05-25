import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ComplianceCallout from "@/components/ComplianceCallout";

export const metadata = { title: "Coaching Launch Call" };

export default function ApexLaunchCallPage() {
  return (
    <>
      <PageHero
        eyebrow="Coaching launch"
        title="Request coaching access."
        body={
          <p>
            Loan Factory Coaching brings together LO Mastery, Loan Factory
            Alliance, daily rhythm, member resources, certifications,
            scorecards, leaderboards, and advanced group coaching access. Email
            Jeremy when you want help choosing the right coaching lane.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        <Link href="/coaching/" className="btn-primary">
          Compare coaching options
        </Link>
      </PageHero>

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="Manual next step"
          title="Ask which coaching option fits you."
          description="Email Jeremy with your current goal, team situation, and whether you are considering LO Mastery or Loan Factory Alliance."
        />
        <a
          href="mailto:jeremy.mcdonald@loanfactory.com?subject=Loan%20Factory%20Coaching%20Access"
          className="btn-primary mt-8"
        >
          Email Jeremy
        </a>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-12">
          <SectionHeading
            eyebrow="What launches"
            title="The full coaching program."
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
                accountability, and advanced group coaching access.
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
          title="Explore coaching now."
        />
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/apex-advisor/" className="btn-primary">
            See coaching tiers
          </Link>
          <Link href="/sales-training/" className="btn-secondary">
            View Sales &amp; Marketing Training
          </Link>
          <Link href="/member-area/" className="btn-secondary">
            Open Member Area
          </Link>
        </div>
      </section>

      <section className="container-page pb-20">
        <ComplianceCallout title="Compliance review" variant="default">
          <p>
            Loan Factory Coaching is a Loan Factory training and development program.
            Membership, certifications, live coaching, and advanced group coaching access
            are not guarantees of production, income, or business results. Any
            launch content used outside this portal still requires Loan Factory
            compliance review before use.
          </p>
        </ComplianceCallout>
      </section>
    </>
  );
}
