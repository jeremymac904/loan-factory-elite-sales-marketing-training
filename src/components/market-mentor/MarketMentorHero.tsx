import type { ReactNode } from "react";
import Link from "next/link";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href: string }[];
  children?: ReactNode;
  tierBadge?: "Mastery" | "Alliance" | "Preview" | null;
};

const tierBadgeClasses: Record<string, string> = {
  Mastery: "bg-lf-orange/20 text-lf-orange border-lf-orange/40",
  Alliance: "bg-purple-500/20 text-purple-200 border-purple-300/40",
  Preview: "bg-white/15 text-white/85 border-white/30",
};

export default function MarketMentorHero({
  eyebrow = "Market Mentor Studio",
  title,
  subtitle,
  breadcrumb,
  children,
  tierBadge = null,
}: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-lf-navy text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-35"
        style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
      />
      <div className="relative container-page py-12">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center gap-2 text-sm font-semibold text-white/70">
            {breadcrumb.map((crumb, idx) => (
              <span key={crumb.href} className="flex items-center gap-2">
                <Link href={crumb.href} className="hover:text-white">
                  {crumb.label}
                </Link>
                {idx < breadcrumb.length - 1 && (
                  <span className="text-white/40">/</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-3">
          {eyebrow && (
            <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
              {eyebrow}
            </p>
          )}
          {tierBadge && (
            <span
              className={`rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${tierBadgeClasses[tierBadge]}`}
            >
              {tierBadge}
            </span>
          )}
        </div>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-lg text-white/85">{subtitle}</p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
