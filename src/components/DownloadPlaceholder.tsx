type Props = {
  title: string;
  format?: string;
  description?: string;
};

export default function DownloadPlaceholder({
  title,
  format = "PDF",
  description,
}: Props) {
  return (
    <div className="card flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          {format} handout
        </span>
        <span className="pill">Coming soon</span>
      </div>
      <h3 className="h-display text-lg">{title}</h3>
      {description && (
        <p className="prose-lf text-sm text-lf-slate">{description}</p>
      )}
      <button
        type="button"
        disabled
        className="mt-3 cursor-not-allowed rounded-lg border border-lf-line bg-lf-mist px-4 py-2 text-sm font-semibold text-lf-slate"
      >
        Download (pending compliance review)
      </button>
    </div>
  );
}
