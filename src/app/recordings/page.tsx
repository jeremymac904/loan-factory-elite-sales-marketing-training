import SectionHeading from "@/components/SectionHeading";
import RecordingCard from "@/components/RecordingCard";
import { modules } from "@/data/modules";

export const metadata = { title: "Recordings" };

export default function RecordingsPage() {
  return (
    <>
      <section className="bg-lf-navy text-white">
        <div className="container-page py-14">
          <span className="rounded-full bg-lf-orange px-3 py-1 text-xs font-bold uppercase tracking-wide">
            Replays
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            Session Recordings
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Past and upcoming session replays grouped by module. Approved
            replays show here as they are published for beta review.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="By module"
          title="One live session per module."
          description="Each module ships with a replay, a PDF handout, and the scripts and prompts referenced in the live walkthrough."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => (
            <RecordingCard
              key={m.level}
              level={m.level}
              title={m.title.split(". ").slice(1).join(". ") || m.title}
              description={m.corePromise}
            />
          ))}
        </div>
      </section>
    </>
  );
}
