import SectionHeading from "@/components/SectionHeading";
import ComplianceCallout from "@/components/ComplianceCallout";
import LevelTag from "@/components/LevelTag";
import { recommendedChannelCategories } from "@/data/recommendedChannels";

export const metadata = { title: "Recommended Channels" };

const levelAnchors: Array<{ id: string; label: string }> = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];

export default function RecommendedChannelsPage() {
  // Build a level grouped view in addition to category view.
  const byLevel: Record<string, typeof recommendedChannelCategories[number]["channels"]> = {
    Beginner: [],
    Intermediate: [],
    Advanced: [],
  };
  for (const cat of recommendedChannelCategories) {
    for (const ch of cat.channels) {
      if (ch.level === "Beginner") byLevel.Beginner.push(ch);
      else if (ch.level === "Intermediate") byLevel.Intermediate.push(ch);
      else if (ch.level === "Advanced") byLevel.Advanced.push(ch);
      else {
        byLevel.Beginner.push(ch);
        byLevel.Intermediate.push(ch);
        byLevel.Advanced.push(ch);
      }
    }
  }

  return (
    <>
      <section className="bg-lf-navy text-white">
        <div className="container-page py-14">
          <span className="rounded-full bg-lf-orange px-3 py-1 text-xs font-bold uppercase tracking-wide">
            Outside Resources Worth Studying
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            Recommended Channels
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            A short list of outside voices and references worth studying as you
            run the series. These are not Loan Factory endorsements. Compliance
            still applies to anything you publish.
          </p>
        </div>
      </section>

      <section className="container-page pt-10">
        <ComplianceCallout title="Read this first" variant="default">
          <p>
            These channels are external. Their advice is not official Loan
            Factory compliance guidance. Any borrower facing, Realtor facing,
            public, rate related, fee related, or marketing content you create
            from their material still needs Loan Factory compliance review
            before you use it.
          </p>
        </ComplianceCallout>
      </section>

      <section className="container-page py-10">
        <SectionHeading
          eyebrow="By category"
          title="Grouped by what they help you build."
        />
        <div className="mt-8 space-y-10">
          {recommendedChannelCategories.map((cat) => (
            <div key={cat.id} id={cat.id} className="scroll-mt-24">
              <h3 className="h-display text-xl">{cat.title}</h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                {cat.description}
              </p>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {cat.channels.map((ch) => (
                  <article key={ch.name} className="card">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="h-display text-lg">{ch.name}</h4>
                      <LevelTag level={ch.level} />
                    </div>
                    <p className="prose-lf mt-2 text-sm">
                      <strong>What it is: </strong>
                      {ch.whatItIs}
                    </p>
                    <p className="prose-lf mt-2 text-sm">
                      <strong>Why it helps: </strong>
                      {ch.whyItHelps}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-12">
          <SectionHeading
            eyebrow="By level"
            title="Quick access by where you are."
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {levelAnchors.map((a) => (
              <a
                key={a.id}
                href={`#level-${a.id}`}
                className="pill hover:border-lf-navy hover:text-lf-navy"
              >
                {a.label}
              </a>
            ))}
          </div>

          {(["Beginner", "Intermediate", "Advanced"] as const).map((lvl) => (
            <div
              key={lvl}
              id={`level-${lvl.toLowerCase()}`}
              className="mt-8 scroll-mt-24"
            >
              <h3 className="h-display text-lg">{lvl}</h3>
              <ul className="prose-lf mt-3 list-disc space-y-1 pl-5 text-sm">
                {byLevel[lvl].map((ch) => (
                  <li key={`${lvl}-${ch.name}`}>
                    <strong>{ch.name}.</strong> {ch.whyItHelps}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
