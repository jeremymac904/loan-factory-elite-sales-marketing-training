import { ModuleSummary } from "@/data/modules";
import AssignmentBox from "./AssignmentBox";

type Props = {
  module: ModuleSummary;
};

export default function ModuleSummarySections({ module }: Props) {
  return (
    <div className="container-page space-y-12 py-14">
      <section>
        <h2 className="h-display text-2xl">Topics covered</h2>
        <ol className="prose-lf mt-3 list-decimal space-y-1 pl-5 text-base">
          {module.topics.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ol>
      </section>

      <AssignmentBox items={module.assignment} />

      <section>
        <h2 className="h-display text-2xl">What to track</h2>
        <ul className="prose-lf mt-3 list-disc space-y-1 pl-5 text-base">
          {module.trackerMetrics.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <div className="card">
          <h2 className="h-display text-lg">For coaches</h2>
          <ul className="prose-lf mt-3 list-disc space-y-1 pl-5 text-sm">
            {module.coachNotes.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h2 className="h-display text-lg">For team leaders</h2>
          <ul className="prose-lf mt-3 list-disc space-y-1 pl-5 text-sm">
            {module.teamLeaderNotes.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="card">
          <h2 className="h-display text-lg">Safety reminders</h2>
        <ul className="prose-lf mt-3 list-disc space-y-1 pl-5 text-sm">
          {module.complianceWatchOuts.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      {module.behaviorChange && (
        <section className="card border-lf-orange/40 bg-lf-orangeSoft/40">
          <h2 className="h-display text-lg">Goal for this lesson</h2>
          <p className="prose-lf mt-2 text-sm">{module.behaviorChange}</p>
        </section>
      )}
    </div>
  );
}
