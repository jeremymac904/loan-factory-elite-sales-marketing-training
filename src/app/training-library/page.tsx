import Link from "next/link";
import ClipLibraryRail from "@/components/ClipLibraryRail";
import PlatformModulePage from "@/components/PlatformModulePage";
import SectionHeading from "@/components/SectionHeading";
import AudioCompanionCard from "@/components/audio/AudioCompanionCard";
import { coreAudioCompanions } from "@/data/audioCompanions";
import { getPlatformModule } from "@/data/platform";

export const metadata = { title: "Training Library" };

const library = [
  { title: "Audio Training", href: "/audio-training/", status: "Live" },
  { title: "Scripts", href: "/scripts/", status: "Live" },
  { title: "Roleplays", href: "/roleplays/", status: "Live" },
  { title: "Prompts", href: "/prompts/", status: "Live" },
  { title: "Recordings", href: "/recordings/", status: "Library" },
  {
    title: "LO Development Clip Library",
    href: "/training-library/clips/",
    status: "Library",
  },
  { title: "Tracker", href: "/tracker/", status: "Tool" },
  { title: "Assessments", href: "/assessments/", status: "Beta" },
];

export default function TrainingLibraryPage() {
  const platformModule = getPlatformModule("training-library");

  return (
    <PlatformModulePage module={platformModule}>
      <section className="container-page py-14">
        <SectionHeading
          eyebrow="Library Catalog"
          title="Resources grouped by how an LO actually uses them."
          description="Open scripts, roleplays, recordings, prompts, trackers, and handouts from one clean library."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {library.map((item) => (
            <Link key={item.title} href={item.href} className="card hover:shadow-lift">
              <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                {item.status}
              </span>
              <h3 className="h-display mt-2 text-lg">{item.title}</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                Open the resource area for this part of LO Development.
              </p>
            </Link>
          ))}
        </div>
      </section>

      <ClipLibraryRail
        title="Short LO Development training clips"
        description="Searchable cutdowns from existing internal training recordings, staged for approved Loan Factory users."
        limit={4}
      />

      <section className="container-page pb-14">
        <SectionHeading
          title="Audio companions"
          description="Audio players appear here after the companion files are reviewed and approved for publishing."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {coreAudioCompanions.map((companion) => (
            <AudioCompanionCard
              key={companion.id}
              companion={companion}
              compact
            />
          ))}
        </div>
      </section>
    </PlatformModulePage>
  );
}
