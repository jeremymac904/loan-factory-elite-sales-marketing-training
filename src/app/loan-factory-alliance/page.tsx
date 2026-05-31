import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { coachingTiers } from "@/data/coaching";

export const metadata = { title: "Loan Factory Alliance" };

const alliance = coachingTiers.find((tier) => tier.id === "alliance")!;

export default function LoanFactoryAlliancePage() {
  return (
    <>
      <PageHero
        eyebrow="Level II coaching"
        title="Loan Factory Alliance"
        body={
          <p>
            Loan Factory Alliance is the advanced paid coaching program for LOs
            who want more frequent coaching, stronger accountability, and
            deeper member access.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/member-area/" className="btn-primary">
            Open Member Area
          </Link>
          <Link
            href="/lo-mastery-coaching/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            Compare LO Mastery
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-14">
        <SectionHeading
          title="What Alliance adds"
          description="Alliance includes LO Mastery plus a more advanced coaching rhythm and priority accountability."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {alliance.includes.slice(1, 7).map((item) => (
            <article key={item} className="card">
              <h2 className="h-display text-lg">{item}</h2>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                Designed for stronger weekly execution, accountability, and
                advanced coaching review.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-14">
          <div className="card max-w-3xl">
            <h2 className="h-display text-2xl">Pricing</h2>
            <p className="mt-3 text-4xl font-semibold text-lf-navy">
              $449<span className="ml-2 text-base font-medium text-lf-slate">per month</span>
            </p>
            <p className="prose-lf mt-3 text-sm text-lf-slate">
              $449 per month. Membership and billing are handled outside this
              platform.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
