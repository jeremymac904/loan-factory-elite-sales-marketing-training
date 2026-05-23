import Link from "next/link";
import { AudioTrainingItem } from "@/data/audioTraining";
import ComplianceCallout from "./ComplianceCallout";

type Props = {
  item: AudioTrainingItem;
};

export default function AudioTrainingCard({ item }: Props) {
  return (
    <article id={item.id} className="card flex flex-col gap-4 scroll-mt-24">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          {item.sourceType}
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
          {item.skillLevel.join(" / ")}
        </span>
      </div>

      <h3 className="h-display text-xl">{item.title}</h3>
      <p className="prose-lf text-sm text-lf-charcoal">{item.description}</p>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-lf-navy">{item.duration}</span>
        <span className="text-sm text-lf-slate">
          Transcript: {item.transcriptStatus}
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-lf-line bg-lf-mist p-3">
        <audio
          controls
          preload="none"
          className="w-full"
          aria-label={`Audio player for ${item.title}`}
        >
          <source src={item.filePath} type="audio/mp4" />
          Your browser does not support the audio element. Download the file at{" "}
          <a href={item.filePath} className="text-lf-orange underline">
            {item.filePath}
          </a>
          .
        </audio>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
          Key takeaways
        </p>
        <ul className="prose-lf mt-2 list-disc space-y-1 pl-5 text-sm">
          {item.keyTakeaways.map((k) => (
            <li key={k}>{k}</li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
          Suggested use
        </p>
        <p className="prose-lf mt-1 text-sm">{item.suggestedUse}</p>
      </div>

      {item.relatedModules.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
            Related pages
          </p>
          <ul className="prose-lf mt-2 list-disc space-y-1 pl-5 text-sm">
            {item.relatedModules.map((m) => (
              <li key={m.href}>
                <Link href={m.href} className="text-lf-navy hover:text-lf-orange">
                  {m.level}. {m.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-lg border border-lf-line bg-lf-mist px-4 py-2 text-sm font-semibold text-lf-slate">
          Transcript: {item.transcriptStatus.toLowerCase()}
        </span>
        <a
          href={item.filePath}
          download
          className="btn-secondary"
        >
          Download audio
        </a>
      </div>

      <ComplianceCallout title="Use this audio as study material" variant="soft">
        <p>{item.complianceNote}</p>
      </ComplianceCallout>
    </article>
  );
}
