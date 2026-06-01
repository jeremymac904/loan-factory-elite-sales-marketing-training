import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "Corporate Coaching" };

// PUBLIC internal overview page (no extra login; no private data). The actual
// Coach Command Center + coaching records stay behind sign-in.
const highlights = [
  {
    title: "Coaching included with Loan Factory",
    body: "Corporate Coaching is the company-provided coaching layer — corporate coaches help loan officers get onboarded, unblocked, and into a consistent weekly rhythm.",
  },
  {
    title: "Onboarding + first-file support",
    body: "New loan officers get help with their first files, system navigation, and the foundational habits that prevent dead deals.",
  },
  {
    title: "Path into paid coaching",
    body: "Corporate Coaching complements (and is separate from) the paid LO Mastery and Loan Factory Alliance programs and the free 101-601 training.",
  },
];

export default function CorporateCoachingOverviewPage() {
  return (
    <>
      <PageHero
        eyebrow="Coaching program"
        title="Corporate Coaching"
        body={
          <p>
            Corporate Coaching is the company-provided coaching layer at Loan
            Factory — corporate coaches help loan officers onboard, get unblocked,
            and build a consistent weekly rhythm. This overview explains it; the
            Coach Command Center and coaching records require sign-in.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/coaching/" className="btn-primary">
            Compare coaching programs
          </Link>
          <Link
            href="/support-routing/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            Find your coach / support
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-14">
        <SectionHeading
          title="How Corporate Coaching helps"
          description="Company-provided coaching to get every loan officer moving."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {highlights.map((item) => (
            <article key={item.title} className="card">
              <h2 className="h-display text-lg">{item.title}</h2>
              <p className="prose-lf mt-2 text-sm text-lf-slate">{item.body}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm text-lf-slate">
          Coaching assignments and records are private — coaches open them in the
          Coach Command Center after sign-in. Ask LO Development if you are not
          sure who your coach is.
        </p>
      </section>
    </>
  );
}
