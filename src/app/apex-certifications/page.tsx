import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ComplianceCallout from "@/components/ComplianceCallout";
import { apexCertifications, apexCertificationCompliance } from "@/data/apex";

export const metadata = { title: "Apex Certifications" };

const howToEarnSteps = [
  {
    step: "1. Complete the requirement",
    body: "Each certification has a clear requirement. Finish the modules, the assessment, or the deliverable listed for that credential.",
  },
  {
    step: "2. Display the credential",
    body: "Add it to your email signature, your LinkedIn, your business card, and your borrower welcome packet.",
  },
  {
    step: "3. Share it the right way",
    body: "Use the approved Apex certification language. Any borrower facing, Realtor facing, or public claim still goes through Loan Factory compliance review.",
  },
];

export default function ApexCertificationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Apex Credentials"
        title="Certifications that signal you have done the work."
        body={
          <p>
            Certifications build credibility and differentiate you in the
            market. Apex certifications are awarded for completing the work,
            not for paying a fee.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      />

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="The four certifications"
          title="Earn one. Earn all four."
          description="Each Apex certification represents a specific body of work inside the Apex Advisor platform. They stack."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {apexCertifications.map((cert) => (
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
              <div className="flex flex-wrap gap-2 pt-2">
                {cert.eligibleTiers.map((t) => (
                  <span key={t} className="pill">
                    {t}
                  </span>
                ))}
              </div>
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
          <Link href="/apex-advisor/" className="btn-primary">
            Join Apex Advisor
          </Link>
          <Link href="/apex-advisor-track/" className="btn-secondary">
            See the Apex Track
          </Link>
        </div>
      </section>

      <section className="container-page pb-20">
        <ComplianceCallout title="Compliance review" variant="default">
          <p>{apexCertificationCompliance}</p>
        </ComplianceCallout>
      </section>
    </>
  );
}
