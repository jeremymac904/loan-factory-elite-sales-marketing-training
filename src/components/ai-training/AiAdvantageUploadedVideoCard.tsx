import Link from "next/link";
import type { AiAdvantageYoutubeEmbedRecord } from "@/data/aiAdvantageYoutubeEmbeds";

type Props = {
  video: AiAdvantageYoutubeEmbedRecord;
};

export default function AiAdvantageUploadedVideoCard({ video }: Props) {
  return (
    <article className="card flex h-full flex-col">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
            {video.module}
          </p>
          <h3 className="h-display mt-1 text-xl">{video.title}</h3>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <Chip label={sourceStatusLabel(video.sourceStatus)} />
          <Chip label={video.privacy === "unlisted" ? "Unlisted" : video.privacy} />
          <Chip label={video.embeddable ? "Embeddable" : "Source issue"} />
        </div>
      </div>

      <dl className="mt-5 grid gap-3 text-sm md:grid-cols-2">
        <Meta label="Lesson route" value={video.suggestedLessonPath} />
        <Meta label="Source status" value={sourceStatusLabel(video.sourceStatus)} />
        <Meta label="Uploaded" value={formatUploadedAt(video.uploadedAt)} />
        <Meta label="Video ID" value={video.youtubeVideoId} />
      </dl>

      <div className="mt-5 rounded-xl border border-lf-line bg-lf-mist p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
          Source note
        </p>
        <p className="prose-lf mt-2 text-sm text-lf-charcoal">{video.notes}</p>
        {video.sourceIssue && (
          <p className="mt-3 text-sm font-semibold text-lf-orangeDark">
            Source issue: {video.sourceIssue}
          </p>
        )}
      </div>

      <div className="mt-auto flex flex-wrap gap-3 pt-5">
        <Link href={video.suggestedLessonPath} className="btn-primary">
          Open lesson
        </Link>
        <Link href={video.lessonViewerPath} className="btn-secondary">
          Open viewer
        </Link>
        <a
          href={video.youtubeVideoUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary"
        >
          Watch on YouTube
        </a>
      </div>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
        {label}
      </dt>
      <dd className="mt-1 break-words text-lf-charcoal">{value}</dd>
    </div>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-lf-line bg-white px-2.5 py-1 text-xs font-semibold text-lf-slate">
      {label}
    </span>
  );
}

function sourceStatusLabel(status: AiAdvantageYoutubeEmbedRecord["sourceStatus"]) {
  switch (status) {
    case "uploaded":
      return "Uploaded";
    case "ready":
      return "Ready";
    case "skipped":
      return "Skipped";
    default:
      return "Source issue";
  }
}

function formatUploadedAt(uploadedAt: string) {
  const date = new Date(uploadedAt);
  if (Number.isNaN(date.getTime())) return uploadedAt;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
