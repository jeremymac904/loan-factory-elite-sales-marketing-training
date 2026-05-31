import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ComplianceCallout from "@/components/ComplianceCallout";
import {
  coachingCertificationCompliance,
  coachingCertifications,
} from "@/data/coaching";

export const metadata = { title: "Coaching Certifications" };

const howToEarnSteps = [
  {
    step: "1. Complete the requirement",
    body: "Each certification has a clear requirement. Finish the approved assessment or deliverable listed for that credential.",
  },
  {
    step: "2. Display the credential",
    body: "Add it to your email signature, LinkedIn, business card, and borrower welcome packet only after the display language is approved.",
  },
  {
    step: "3. Share it the right way",
    body: "Use approved certification language. Borrower-facing, Realtor-facing, or public claims still go through Loan Factory compliance review.",
  },
];

export default function CoachingCertificationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Coaching Credentials"
        title="Certifications that signal you have done the work."
        body={
          <p>
            Certifications build credibility and differentiate you in the
            market. Coaching certifications are awarded for completing the work,
            not for paying a fee.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      />

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="The certifications"
          title="Build credibility through approved credentials."
          description="Each coaching certification represents approved work inside LO Mastery or Loan Factory Alliance. Specialty tracks are Alliance-level and launch only after review."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {coachingCertifications.map((cert) => (
            <article key={cert.id} className="card flex h-full flex-col gap-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                  Certification
                </span>
                <h3 className="h-display mt-1 text-lg">{cert.name}</h3>
              </div>
              <p className="prose-lf text-sm">{cert.summary}</p>
              <p className="prose-lf text-sm">
                <strong>Requirement:</strong> {cert.requirement}
              </p>
              <p className="pt-2 text-sm text-lf-slate">
                <strong className="text-lf-navy">Eligible tiers: </strong>
                {cert.eligibleTiers.join(", ")}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-12">
          <SectionHeading
            eyebrow="How to earn and display"
            title="Three steps from finished to credentialed."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {howToEarnSteps.map((s) => (
              <div key={s.step} className="card">
                <h3 className="h-display text-lg">{s.step}</h3>
                <p className="prose-lf mt-2 text-sm text-lf-slate">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="Why it matters"
          title="Credibility you can point to."
          description="Certifications build credibility and differentiate you in the market. Borrowers and Realtors want to work with loan officers who have invested in training."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/lo-mastery-coaching/" className="btn-primary">
            Join LO Mastery
          </Link>
          <Link href="/loan-factory-alliance/" className="btn-secondary">
            See Loan Factory Alliance
          </Link>
        </div>
      </section>

      <section className="container-page pb-20">
        <ComplianceCallout title="Compliance review" variant="default">
          <p>{coachingCertificationCompliance}</p>
        </ComplianceCallout>
      </section>
    </>
  );
}
