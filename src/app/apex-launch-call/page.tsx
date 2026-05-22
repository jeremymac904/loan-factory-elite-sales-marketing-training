import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ComplianceCallout from "@/components/ComplianceCallout";

export const metadata = { title: "Apex Launch Call" };

export default function ApexLaunchCallPage() {
  return (
    <>
      <PageHero
        eyebrow="Platform launch"
        title="Apex Advisor is launching."
        body={
          <p>
            Where Top Loan Officers Are Built. The Apex Advisor platform brings
            together the Apex Advisor Track, live coaching, certifications,
            summits, and the Apex Mastermind. Drop your email to be on the
            launch list.
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
          title="Be first to know when Apex opens."
          description="Email capture is a placeholder. Form integration is a future build."
        />
        <form
          className="mt-8 grid max-w-xl gap-3 sm:grid-cols-[1fr_auto]"
          aria-label="Apex Advisor launch email capture (placeholder)"
        >
          <label className="sr-only" htmlFor="apex-launch-email">
            Your work email
          </label>
          <input
            id="apex-launch-email"
            type="email"
            placeholder="you@yourcompany.com"
            className="rounded-lg border border-lf-line bg-white px-4 py-3 text-sm text-lf-charcoal placeholder:text-lf-slate focus:border-lf-navy focus:outline-none focus:ring-2 focus:ring-lf-orange"
            disabled
          />
          <button
            type="button"
            disabled
            className="btn-primary cursor-not-allowed opacity-70"
          >
            Notify me (placeholder)
          </button>
        </form>
        <p className="mt-3 text-xs text-lf-slate">
          We will not share your email. The form above is a placeholder for the
          live launch integration.
        </p>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-12">
          <SectionHeading
            eyebrow="What launches"
            title="The full Apex Advisor platform."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <div className="card">
              <h3 className="h-display text-lg">Apex Advisor Track</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                The 101 through 601 foundation course. Included at both tiers.
              </p>
            </div>
            <div className="card">
              <h3 className="h-display text-lg">Two membership tiers</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                Apex Advisor at $249 per month. Apex Advisor Pro at $449 per
                month.
              </p>
            </div>
            <div className="card">
              <h3 className="h-display text-lg">Apex certifications</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                ACLO, TERA Power User, Marketing Pro, and Pro Graduate.
              </p>
            </div>
            <div className="card">
              <h3 className="h-display text-lg">Live mastermind (Pro)</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                Monthly live mastermind calls and the Apex Mastermind community.
              </p>
            </div>
            <div className="card">
              <h3 className="h-display text-lg">Apex Summit (Pro)</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                Live annual summit access for Apex Advisor Pro members.
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
          <Link href="/apex-advisor-track/" className="btn-secondary">
            Explore the Apex Track
          </Link>
          <Link href="/apex-mastermind/" className="btn-secondary">
            See the Apex Mastermind
          </Link>
        </div>
      </section>

      <section className="container-page pb-20">
        <ComplianceCallout title="Compliance review" variant="default">
          <p>
            Apex Advisor is a Loan Factory training and development platform.
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
