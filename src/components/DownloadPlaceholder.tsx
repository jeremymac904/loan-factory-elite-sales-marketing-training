type Props = {
  title: string;
  format?: string;
  description?: string;
  /** When provided, the card becomes a real download button. */
  downloadHref?: string;
  /** Optional second download (eg. PDF) when present. */
  secondaryHref?: string;
  secondaryLabel?: string;
};

export default function DownloadPlaceholder({
  title,
  format = "PDF",
  description,
  downloadHref,
  secondaryHref,
  secondaryLabel,
}: Props) {
  const isReady = !!downloadHref;
  return (
    <div className="card flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          {format} handout
        </span>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
            isReady
              ? "border-lf-orange/40 bg-lf-orangeSoft text-lf-orangeDark"
              : "border-lf-line bg-lf-mist text-lf-slate"
          }`}
        >
          {isReady && (
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-lf-orange"
            />
          )}
          {isReady ? "Live" : "Coming Soon"}
        </span>
      </div>
      <h3 className="h-display text-lg">{title}</h3>
      {description && (
        <p className="prose-lf text-sm text-lf-slate">{description}</p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {isReady ? (
          <>
            <a href={downloadHref} download className="btn-primary">
              Download handout
            </a>
            {secondaryHref && (
              <a
                href={secondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                {secondaryLabel ?? "View source"}
              </a>
            )}
          </>
        ) : (
          <button
            type="button"
            disabled
            className="cursor-not-allowed rounded-lg border border-lf-line bg-lf-mist px-4 py-2 text-sm font-semibold text-lf-slate"
          >
            Download (pending compliance review)
          </button>
        )}
      </div>
    </div>
  );
}
