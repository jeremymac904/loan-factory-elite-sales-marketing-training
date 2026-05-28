import Link from "next/link";
import {
  AudioCompanion,
  getAudioStatusLabel,
  getDriveAudioUrl,
} from "@/data/audioCompanions";

type Props = {
  companion: AudioCompanion;
  compact?: boolean;
};

function statusClass(label: string) {
  if (label === "Published") {
    return "border-lf-orange bg-lf-orange text-white";
  }

  if (label === "Audio version in production") {
    return "border-lf-orange/40 bg-lf-orangeSoft text-lf-orangeDark";
  }

  if (label === "Audio version under review") {
    return "border-lf-line bg-lf-mist text-lf-slate";
  }

  return "border-lf-line bg-lf-mist text-lf-slate";
}

function formatType(type: string) {
  return type
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function AudioCompanionCard({ companion, compact = false }: Props) {
  const statusLabel = getAudioStatusLabel(companion.status);
  const audioUrl = companion.status === "published" ? getDriveAudioUrl(companion) : null;
  const trackLabel = companion.track === "core" ? "101-601 companion" : "Bonus companion";

  return (
    <article
      id={companion.id}
      className={`card flex min-w-0 flex-col gap-4 scroll-mt-24 ${
        compact ? "p-5" : ""
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
            {companion.session ?? trackLabel}
          </p>
          <h3 className="h-display mt-1 break-words text-xl">
            {companion.title}
          </h3>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusClass(
            statusLabel,
          )}`}
        >
          {statusLabel}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 text-sm text-lf-slate">
        <span>{formatType(companion.type)}</span>
        <span aria-hidden>·</span>
        <span>{trackLabel}</span>
        {companion.duration && (
          <>
            <span aria-hidden>·</span>
            <span>{companion.duration}</span>
          </>
        )}
      </div>

      {companion.notes && (
        <p className="prose-lf text-sm text-lf-charcoal">{companion.notes}</p>
      )}

      {audioUrl ? (
        <div className="rounded-xl border border-lf-line bg-lf-mist p-3">
          <audio
            controls
            preload="none"
            className="w-full"
            aria-label={`Audio companion for ${companion.title}`}
          >
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support audio playback.
          </audio>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-lf-line bg-lf-mist p-4 text-sm leading-6 text-lf-slate">
          {statusLabel === "Audio version in production"
            ? "The audio version of this lesson is being prepared. It appears here once it is reviewed and approved."
            : "Audio version under review. The player appears here once the approved audio is published."}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 text-sm">
        {companion.route && companion.track === "core" && (
          <Link
            href={`${companion.route}/`}
            className="font-semibold text-lf-navy hover:text-lf-orange"
          >
            Open lesson page
          </Link>
        )}
      </div>
    </article>
  );
}
