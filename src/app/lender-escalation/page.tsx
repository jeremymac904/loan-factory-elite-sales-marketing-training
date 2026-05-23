import Link from "next/link";
import LenderEscalationForm from "@/components/LenderEscalationForm";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "Lender Escalation" };

export default function LenderEscalationPage() {
  return (
    <>
      <PageHero
        eyebrow="Manual review only"
        title="Lender Escalation"
        body={
          <p>
            A beta-safe form shell for lender escalation requests. It captures
            the details needed for LO Development review without sending email
            or triggering automation.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        <Link href="/resources/" className="btn-primary">
          Back to Resources
        </Link>
      </PageHero>

      <section className="container-page py-12">
        <SectionHeading
          title="What happens next"
          description="For beta, this is local/demo capture only. Later, Andre-approved OAuth and a manual approval flow can send from the right LO Development sender with copied stakeholders."
        />
        <div className="mt-8">
          <LenderEscalationForm />
        </div>
      </section>
    </>
  );
}
