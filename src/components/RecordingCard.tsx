import YouTubeEmbed from "./YouTubeEmbed";

type Props = {
  level: string;
  title: string;
  description?: string;
  videoSrc?: string;
  videoTitle?: string;
};

export default function RecordingCard({
  level,
  title,
  description,
  videoSrc,
  videoTitle,
}: Props) {
  const statusLabel = videoSrc ? "Ready to watch" : "Replay guide";

  return (
    <div className="card flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          {level}
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          {statusLabel}
        </span>
      </div>
      <h3 className="h-display text-lg">{title}</h3>
      {description && (
        <p className="prose-lf text-sm text-lf-slate">{description}</p>
      )}
      {videoSrc ? (
        <div className="mt-3 overflow-hidden rounded-xl border border-lf-orange/25 bg-lf-navy p-2">
          <YouTubeEmbed
            src={videoSrc}
            title={videoTitle ?? title}
            className="border-white/10"
          />
        </div>
      ) : (
        <p className="mt-2 rounded-xl border border-lf-line bg-lf-mist p-3 text-sm leading-6 text-lf-slate">
          Use this guide to focus your review. The replay player appears only
          when an approved video is available on this page.
        </p>
      )}
    </div>
  );
}
