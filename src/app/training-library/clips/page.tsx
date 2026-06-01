import Link from "next/link";
import RoleGate from "@/components/RoleGate";
import ClipLibraryExplorer from "@/components/ClipLibraryExplorer";
import PageHero from "@/components/PageHero";

export const metadata = { title: "LO Development Video Library" };

export default function TrainingLibraryClipsPage() {
  return (
    <RoleGate gate="clip-library">
      <PageHero
        eyebrow="Training Library"
        title="LO Development Video Library"
        body={
          <p>
            Search 7 long-form source trainings and 91 cutdown clips by topic,
            section, audience, priority, hosting status, and manual review state.
            Google Drive fallback stays pending until a real link exists, and
            YouTube stays on hold until the batch scaffold is approved.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
        overlayOpacity={0.72}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/training-library/" className="btn-primary">
            Back to Training Library
          </Link>
          <Link
            href="/support-routing/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            Need support?
          </Link>
        </div>
      </PageHero>

      <ClipLibraryExplorer />
    </RoleGate>
  );
}
