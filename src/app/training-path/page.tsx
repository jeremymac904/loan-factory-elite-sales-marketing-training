import ModuleCard from "@/components/ModuleCard";
import SectionHeading from "@/components/SectionHeading";
import { modules } from "@/data/modules";

export const metadata = {
  title: "Training Path",
};

export default function TrainingPathPage() {
  return (
    <>
      <section className="bg-lf-navy text-white">
        <div className="container-page py-16">
          <span className="rounded-full bg-lf-orange px-3 py-1 text-xs font-bold uppercase tracking-wide">
            The Path
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            101 to 601 in six sessions.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Run the series in order. Each module sits on top of the one before
            it. By week six, the LO has a written 12 week plan and a working AI
            stack.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <SectionHeading
          eyebrow="What you get"
          title="The same structure every week."
          description="Title and core promise. 45 minute live session. Scripts. AI prompts. Roleplay. Weekly assignment. Tracker metrics. Coach notes. Team leader notes. Compliance watch outs."
        />
        <ol className="prose-lf mt-8 space-y-3 text-base text-lf-charcoal">
          <li>
            <strong>Watch or attend</strong> the 45 minute session. Replays live
            on the Recordings page.
          </li>
          <li>
            <strong>Run the weekly assignment.</strong> Every module has one
            clear assignment due by Friday.
          </li>
          <li>
            <strong>Log the tracker</strong> on Friday. Activity, content,
            partner, follow up, AI usage, next week commitments.
          </li>
          <li>
            <strong>Friday review</strong> with your team leader or coach.
            Fifteen minutes. One specific change next week.
          </li>
        </ol>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-16">
          <SectionHeading
            eyebrow="Modules"
            title="The six week series."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((m) => (
              <ModuleCard
                key={m.slug}
                level={m.level}
                title={m.title}
                promise={m.corePromise}
                href={m.href}
                status={m.status}
                levels={m.levels}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
