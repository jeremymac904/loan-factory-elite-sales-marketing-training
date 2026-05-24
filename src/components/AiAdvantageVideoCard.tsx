import Link from "next/link";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import type { AiAdvantagePublishedVideo } from "@/data/aiAdvantagePublishedVideos";

type Props = {
  video: AiAdvantagePublishedVideo;
  compact?: boolean;
};

export default function AiAdvantageVideoCard({ video, compact = false }: Props) {
  return (
    <article className="card flex h-full flex-col overflow-hidden p-0">
      <YouTubeEmbed
        src={video.youtubeEmbedUrl}
        title={video.title}
        className="rounded-b-none border-0"
      />
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          {video.rowId} | YouTube | Unlisted
        </p>
        <h3 className="h-display mt-2 text-xl">{video.title}</h3>
        {!compact && (
          <p className="mt-3 text-sm leading-6 text-lf-slate">
            {video.description}
          </p>
        )}
        <div className="mt-auto flex flex-wrap gap-3 pt-5">
          <Link
            href={`/ai-training/video-library/${video.slug}/`}
            className="btn-primary"
          >
            Open lesson
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
      </div>
    </article>
  );
}
