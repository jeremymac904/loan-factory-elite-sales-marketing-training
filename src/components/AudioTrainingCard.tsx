import Link from "next/link";
import { AudioTrainingItem } from "@/data/audioTraining";
import { LevelTagGroup } from "./LevelTag";
import ComplianceCallout from "./ComplianceCallout";

type Props = {
  item: AudioTrainingItem;
};

const transcriptStatusStyle: Record<
  AudioTrainingItem["transcriptStatus"],
  string
> = {
  Pending: "bg-slate-100 text-slate-600 border-slate-200",
  Draft: "bg-amber-50 text-amber-700 border-amber-200",
  Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function AudioTrainingCard({ item }: Props) {
  return (
    <article id={item.id} className="card flex flex-col gap-4 scroll-mt-24">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          {item.sourceType}
        </span>
        <LevelTagGroup levels={item.skillLevel} />
      </div>

      <h3 className="h-display text-xl">{item.title}</h3>
      <p className="prose-lf text-sm text-lf-charcoal">{item.description}</p>

      <div className="flex flex-wrap items-center gap-2">
        <span className="pill">{item.duration}</span>
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${transcriptStatusStyle[item.transcriptStatus]}`}
        >
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
        <button
          type="button"
          disabled
          className="cursor-not-allowed rounded-lg border border-lf-line bg-lf-mist px-4 py-2 text-sm font-semibold text-lf-slate"
        >
          View transcript ({item.transcriptStatus.toLowerCase()})
        </button>
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
