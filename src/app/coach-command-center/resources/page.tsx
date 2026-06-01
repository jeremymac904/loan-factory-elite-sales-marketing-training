import RoleGate from "@/components/RoleGate";
import PageHero from "@/components/PageHero";
import VideoResourceHub from "@/components/platform-videos/VideoResourceHub";

export const metadata = { title: "Coach Command Center Resources" };

export default function CoachCommandCenterResourcesPage() {
  return (
    <RoleGate gate="clip-library">
      <PageHero
        eyebrow="Coach Command Center"
        title="Coach Video Resources"
        body={
          <p>
            A coach-facing resource hub for training clips, long-form source
            videos, and staging status. Keep manual review and hosting state
            visible before any coaching asset moves forward.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
        overlayOpacity={0.72}
      />

      <section className="container-page py-14">
        <VideoResourceHub
          title="Coach-facing inventory"
          description="This view keeps the coach-relevant sections of the video library close to the command center so leadership can stage reviews and route follow-up assets without guessing at host status."
          focusSections={["Corporate Coach Resources", "Training Library", "Loan Officer Support"]}
          initialVideoTypes={["long_form", "clip"]}
        />
      </section>
    </RoleGate>
  );
}

