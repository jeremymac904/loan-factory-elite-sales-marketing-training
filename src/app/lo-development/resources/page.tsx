import Link from "next/link";
import RoleGate from "@/components/RoleGate";
import PageHero from "@/components/PageHero";
import VideoResourceHub from "@/components/platform-videos/VideoResourceHub";

export const metadata = { title: "LO Development Resources" };

export default function LoDevelopmentResourcesPage() {
  return (
    <RoleGate gate="clip-library">
      <PageHero
        eyebrow="LO Development"
        title="Video Resources"
        body={
          <p>
            Use this hub for staging, review, and routing. It points to the
            clip library, the long-form source library, the Google Drive
            staging runbook, and the YouTube automation scaffold.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
        overlayOpacity={0.72}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/training-library/clips/" className="btn-primary">
            Open video library
          </Link>
          <Link
            href="/lo-development/video-library/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            Open source library
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-14">
        <VideoResourceHub
          title="LO Development video staging hub"
          description="This hub keeps the combined video inventory, hosting status, manual review flags, and next-step docs in one place so the platform can replace fallback links only when real YouTube IDs exist."
        />
      </section>
    </RoleGate>
  );
}

