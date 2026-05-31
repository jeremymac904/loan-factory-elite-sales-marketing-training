import Link from "next/link";
import type { LoVideo } from "@/data/loDevelopmentVideoLibrary";
import { getHostBadge, sourceTypeLabel } from "./hostBadge";

/**
 * Card-friendly projection of an LoVideo. The list page merges the library
 * model (PA2) with the editorial layer (PA7) and passes only what a card needs.
 */
export type LoVideoCardModel = {
  id: string;
  routeSlug: string;
  title: string;
  description: string;
  category: string;
  sourceType: LoVideo["sourceType"];
  hostingStatus: LoVideo["hostingStatus"];
  youtubeEmbedUrl: string | null;
  googleDriveUrl: string | null;
  thumbnailPath: string | null;
  priority: LoVideo["priority"];
  /** Optional editorial watch-time string from PA7 content layer. */
  watchTime?: string | null;
};

function isPublicAsset(path: string | null): path is string {
  // Only render <img> for repo-relative public/ paths; never point at /Users absolutes.
  return Boolean(path) && (path as string).startsWith("/");
}

export default function LoVideoCard({ video }: { video: LoVideoCardModel }) {
  const badge = getHostBadge({
    hostingStatus: video.hostingStatus,
    youtubeEmbedUrl: video.youtubeEmbedUrl,
    googleDriveUrl: video.googleDriveUrl,
  });

  return (
    <Link
      href={`/training-library/lo-development-videos/${video.routeSlug}`}
      className="card-compact group flex h-full flex-col transition-colors hover:border-lf-orange"
    >
      <div className="relative mb-3 aspect-video w-full overflow-hidden rounded-lg bg-lf-mist">
        {isPublicAsset(video.thumbnailPath) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={video.thumbnailPath}
            alt={video.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-lf-mist to-white">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-lf-orange">
              {sourceTypeLabel(video.sourceType)}
            </span>
          </div>
        )}
        <span
          className={`absolute left-2 top-2 inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${badge.className}`}
        >
          {badge.label}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="lf-chip">{sourceTypeLabel(video.sourceType)}</span>
        <span className="lf-chip">{video.category}</span>
        {video.watchTime ? <span className="lf-chip">{video.watchTime}</span> : null}
      </div>

      <h3 className="mt-2 text-sm font-semibold text-lf-navy group-hover:text-lf-orangeDark">
        {video.title}
      </h3>
      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-lf-slate">{video.description}</p>
    </Link>
  );
}
