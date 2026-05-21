type Props = {
  level: string;
  title: string;
  description?: string;
};

export default function RecordingPlaceholder({
  level,
  title,
  description,
}: Props) {
  return (
    <div className="card flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          {level}
        </span>
        <span className="pill">Recording pending</span>
      </div>
      <h3 className="h-display text-lg">{title}</h3>
      {description && (
        <p className="prose-lf text-sm text-lf-slate">{description}</p>
      )}
      <div className="mt-3 flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-lf-line bg-lf-mist text-sm text-lf-slate">
        Replay link will be posted here after the live session is recorded.
      </div>
    </div>
  );
}
