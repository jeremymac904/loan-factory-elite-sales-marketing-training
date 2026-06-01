import Link from "next/link";
import RoleGate from "@/components/RoleGate";
import PageHero from "@/components/PageHero";
import PlatformVideoLibraryExplorer from "@/components/platform-videos/PlatformVideoLibraryExplorer";

export const metadata = { title: "LO Development Source Video Library" };

export default function LoDevelopmentVideoLibraryPage() {
  return (
    <RoleGate gate="clip-library">
      <PageHero
        eyebrow="LO Development"
        title="Source Video Library"
        body={
          <p>
            Browse the seven matched long-form source trainings that feed the
            LO Development platform. Each record keeps the timestamp report
            visible, and YouTube stays pending until a real ID is added.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
        overlayOpacity={0.72}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/training-library/clips/" className="btn-primary">
            Open clip library
          </Link>
          <Link
            href="/lo-development/resources/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            Open resources hub
          </Link>
        </div>
      </PageHero>

      <section className="container-page pb-16">
        <PlatformVideoLibraryExplorer initialVideoType="long_form" />
      </section>
    </RoleGate>
  );
}

