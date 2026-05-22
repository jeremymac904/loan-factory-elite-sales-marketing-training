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
      <div>
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          {format} handout
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
        ) : null}
      </div>
    </div>
  );
}
