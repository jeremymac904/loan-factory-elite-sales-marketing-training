import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  href?: string;
  badge?: string;
  badgeTone?: "neutral" | "orange" | "green" | "yellow" | "purple";
  footer?: ReactNode;
  locked?: boolean;
};

const badgeClasses: Record<string, string> = {
  neutral: "bg-lf-mist text-lf-charcoal",
  orange: "bg-lf-orange/15 text-lf-orangeDark",
  green: "bg-green-100 text-green-800",
  yellow: "bg-yellow-100 text-yellow-800",
  purple: "bg-purple-100 text-purple-800",
};

export default function MarketMentorCard({
  title,
  description,
  href,
  badge,
  badgeTone = "neutral",
  footer,
  locked = false,
}: Props) {
  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className="h-display text-lg">{title}</h3>
        {badge && (
          <span
            className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${badgeClasses[badgeTone]}`}
          >
            {badge}
          </span>
        )}
      </div>
      <p className="prose-lf mt-2 text-sm text-lf-slate">{description}</p>
      {footer && <div className="mt-3 text-sm">{footer}</div>}
      {href && !locked && (
        <span className="mt-auto inline-flex items-center pt-3 text-sm font-semibold text-lf-orange">
          Open
          <span aria-hidden className="ml-1">&rarr;</span>
        </span>
      )}
      {locked && (
        <span className="mt-auto inline-flex items-center pt-3 text-sm font-semibold text-lf-slate">
          Paid coaching members
        </span>
      )}
    </>
  );

  if (href && !locked) {
    return (
      <Link
        href={href}
        className="card flex h-full flex-col transition hover:-translate-y-0.5 hover:shadow-lift"
      >
        {inner}
      </Link>
    );
  }

  return <div className="card flex h-full flex-col">{inner}</div>;
}
