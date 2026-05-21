import SectionHeading from "@/components/SectionHeading";
import ComplianceCallout from "@/components/ComplianceCallout";
import AudioTrainingCard from "@/components/AudioTrainingCard";
import { audioTraining, audioCategories } from "@/data/audioTraining";

export const metadata = { title: "Audio Training Library" };

const comingNext = [
  "Timestamped transcripts",
  "Short clip library",
  "HeyGen avatar cutdown scripts",
  "Module specific audio notes",
  "Quiz questions from each audio overview",
];

export default function AudioTrainingPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div aria-hidden className="absolute inset-0 bg-lf-navyDark/60" />
        <div className="relative container-page py-14">
          <span className="rounded-full bg-lf-orange px-3 py-1 text-xs font-bold uppercase tracking-wide">
            Supplemental Training
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            Audio Training Library
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Listen to short source grounded training conversations that break
            down the sales, marketing, psychology, and execution ideas behind
            the Loan Factory Elite Sales and Marketing Series.
          </p>
        </div>
      </section>

      <section className="container-page pt-10">
        <ComplianceCallout title="Read this first" variant="default">
          <p>
            These audio overviews are supplemental training resources. They are
            not official compliance guidance, borrower facing content, Realtor
            facing content, or final approved scripts. Use them for learning,
            discussion, and idea generation. Any public, borrower facing,
            Realtor facing, rate related, fee related, or marketing content
            still requires proper review before use.
          </p>
        </ComplianceCallout>
      </section>

      <section className="container-page py-8">
        <div className="flex flex-wrap gap-2">
          {audioCategories.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="pill hover:border-lf-navy hover:text-lf-navy"
            >
              {c.title}
            </a>
          ))}
        </div>
      </section>

      {audioCategories.map((cat) => {
        const items = audioTraining.filter((a) => a.category === cat.id);
        if (items.length === 0) return null;
        return (
          <section
            key={cat.id}
            id={cat.id}
            className="container-page py-8 scroll-mt-24"
          >
            <SectionHeading
              eyebrow={`${items.length} audio`}
              title={cat.title}
              description={cat.description}
            />
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {items.map((a) => (
                <AudioTrainingCard key={a.id} item={a} />
              ))}
            </div>
          </section>
        );
      })}

      <section className="bg-lf-mist">
        <div className="container-page py-12">
          <SectionHeading
            eyebrow="Coming next"
            title="What we will add to this library."
            description="Each one of these strengthens the supplemental layer without replacing the official live sessions and replays."
          />
          <ul className="prose-lf mt-6 grid list-disc gap-2 pl-5 text-base md:grid-cols-2">
            {comingNext.map((c, i) => (
              <li key={c}>
                {i + 1}. {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page pb-16 pt-12">
        <SectionHeading
          eyebrow="How to use these"
          title="Three honest workflows."
        />
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <div className="card">
            <h3 className="h-display text-lg">Listen before a module</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Use the audio as a pre read. Land in the module page with the
              ideas already in your head. Easier to do the assignment that way.
            </p>
          </div>
          <div className="card">
            <h3 className="h-display text-lg">Listen as a coach prompt</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Pull one idea from the audio and turn it into a Monday team
              discussion question or a Friday coaching note.
            </p>
          </div>
          <div className="card">
            <h3 className="h-display text-lg">Listen as a refresher</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Six weeks after certification, replay the audio to keep the
              system top of mind. Repetition is the operating system.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
