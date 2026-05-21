type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          {eyebrow}
        </span>
      )}
      <h2 className="h-display mt-1 text-2xl md:text-3xl">{title}</h2>
      {description && (
        <p className="prose-lf mt-3 text-base text-lf-slate">{description}</p>
      )}
    </div>
  );
}
