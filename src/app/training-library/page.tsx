import Link from "next/link";
import PlatformModulePage from "@/components/PlatformModulePage";
import SectionHeading from "@/components/SectionHeading";
import { getPlatformModule } from "@/data/platform";

export const metadata = { title: "Training Library" };

const library = [
  { title: "Audio Training", href: "/audio-training/", status: "Live" },
  { title: "Scripts", href: "/scripts/", status: "Live" },
  { title: "Roleplays", href: "/roleplays/", status: "Live" },
  { title: "Prompts", href: "/prompts/", status: "Live" },
  { title: "Recordings", href: "/recordings/", status: "Live foundation" },
  { title: "Tracker", href: "/tracker/", status: "Live foundation" },
  { title: "Flashcards", href: "/training-library/", status: "Planned" },
  { title: "Quizzes", href: "/training-library/", status: "Planned" },
  { title: "PDFs and handouts", href: "/training-library/", status: "Requires source content" },
];

export default function TrainingLibraryPage() {
  const platformModule = getPlatformModule("training-library");

  return (
    <PlatformModulePage module={platformModule}>
      <section className="container-page py-14">
        <SectionHeading
          eyebrow="Library Catalog"
          title="Resources grouped by how an LO actually uses them."
          description="Large media should stay in Drive or another approved asset system before production hardening."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {library.map((item) => (
            <Link key={item.title} href={item.href} className="card hover:shadow-lift">
              <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                {item.status}
              </span>
              <h3 className="h-display mt-2 text-lg">{item.title}</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                Open the current resource surface or review the planned catalog
                slot.
              </p>
            </Link>
          ))}
        </div>
      </section>
    </PlatformModulePage>
  );
}
