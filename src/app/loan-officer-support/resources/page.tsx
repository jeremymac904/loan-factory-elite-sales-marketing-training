import RoleGate from "@/components/RoleGate";
import PageHero from "@/components/PageHero";
import VideoResourceHub from "@/components/platform-videos/VideoResourceHub";

export const metadata = { title: "Loan Officer Support Resources" };

export default function LoanOfficerSupportResourcesPage() {
  return (
    <RoleGate gate="clip-library">
      <PageHero
        eyebrow="Loan Officer Support"
        title="Support Video Resources"
        body={
          <p>
            Focused support resources for the LO support team. Use these
            records to stage answers, find handoffs, and keep review flags
            visible before anything moves toward YouTube.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
        overlayOpacity={0.72}
      />

      <section className="container-page py-14">
        <VideoResourceHub
          title="Loan Officer Support inventory"
          description="This view highlights the support-oriented section of the video library and keeps the hosting and review state visible without hiding anything behind fake URLs."
          focusSections={["Loan Officer Support", "TERA / System Navigation", "Pricing"]}
          initialVideoTypes={["long_form", "clip"]}
        />
      </section>
    </RoleGate>
  );
}

