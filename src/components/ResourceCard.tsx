import Link from "next/link";

type Props = {
  title: string;
  description: string;
  href: string;
  meta?: string;
};

export default function ResourceCard({ title, description, href, meta }: Props) {
  return (
    <Link
      href={href}
      className="card group flex h-full flex-col gap-2 transition hover:shadow-lift"
    >
      {meta && (
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          {meta}
        </span>
      )}
      <h3 className="h-display text-lg">{title}</h3>
      <p className="prose-lf text-sm text-lf-slate">{description}</p>
      <span className="mt-auto inline-flex items-center text-sm font-semibold text-lf-navy group-hover:text-lf-orange">
        Open
        <span aria-hidden className="ml-1 transition group-hover:translate-x-0.5">
          &rarr;
        </span>
      </span>
    </Link>
  );
}
