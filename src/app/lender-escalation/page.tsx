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
            Use this when a lender issue needs manual LO Development review.
            During beta, this form does not send email or run automations.
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
          description="For beta, this saves only on this screen. Later, an approved manual review flow can send from the right LO Development email with the right people copied."
        />
        <div className="mt-8">
          <LenderEscalationForm />
        </div>
      </section>
    </>
  );
}
