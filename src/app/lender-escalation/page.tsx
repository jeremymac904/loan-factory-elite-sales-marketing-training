import Link from "next/link";
import LenderEscalationForm from "@/components/LenderEscalationForm";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "Lender Escalation" };

export default function LenderEscalationPage() {
  return (
    <>
      <PageHero
        eyebrow="Lender support"
        title="Lender Escalation"
        body={
          <p>
            Use this when a lender issue needs LO Development review. Capture
            the people, issue, urgency, and requested help in one clean note.
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
          description="This keeps the details organized so LO Development can review the issue and decide the right next step."
        />
        <div className="mt-8">
          <LenderEscalationForm />
        </div>
      </section>
    </>
  );
}
