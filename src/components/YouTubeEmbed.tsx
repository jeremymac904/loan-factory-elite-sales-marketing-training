type Props = {
  /** Full embed URL, e.g. https://www.youtube.com/embed/VIDEO_ID */
  src: string;
  title: string;
  className?: string;
};

export default function YouTubeEmbed({ src, title, className }: Props) {
  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-xl border border-lf-line bg-black ${className ?? ""}`}
    >
      <iframe
        className="absolute inset-0 h-full w-full"
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; compute-pressure; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
