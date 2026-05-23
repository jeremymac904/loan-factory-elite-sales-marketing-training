import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { apexTiers } from "@/data/apex";

export const metadata = { title: "LO Mastery Coaching" };

const loMastery = apexTiers.find((tier) => tier.id === "advisor")!;

export default function LoMasteryCoachingPage() {
  return (
    <>
      <PageHero
        eyebrow="Level I coaching"
        title="Loan Factory LO Mastery Coaching"
        body={
          <p>
            LO Mastery is paid coaching for loan officers who want a simple
            weekly plan, accountability, scorecards, scripts, recordings, and
            coaching resources.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/member-area/" className="btn-primary">
            Open Member Area
          </Link>
          <Link
            href="/loan-factory-alliance/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            Compare Alliance
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-14">
        <SectionHeading
          title="What members get"
          description="Use LO Mastery when you need coaching structure, not another training catalog."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {loMastery.includes.slice(0, 6).map((item) => (
            <article key={item} className="card">
              <h2 className="h-display text-lg">{item}</h2>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                Built for weekly action, coaching review, and stronger follow
                through.
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
              $249<span className="ml-2 text-base font-medium text-lf-slate">per month</span>
            </p>
            <p className="prose-lf mt-3 text-sm text-lf-slate">
              Pricing pending final approval before public rollout.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
