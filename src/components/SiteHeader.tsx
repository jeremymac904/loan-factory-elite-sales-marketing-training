import Link from "next/link";
import BrandImage from "./BrandImage";
import { brandAssets } from "@/data/brandAssets";

const primaryNav = [
  { href: "/paths/", label: "Paths" },
  { href: "/training-path/", label: "Modules" },
  { href: "/scripts/", label: "Scripts" },
  { href: "/prompts/", label: "AI Prompts" },
  { href: "/roleplays/", label: "Roleplays" },
  { href: "/audio-training/", label: "Audio Training" },
  { href: "/tracker/", label: "Tracker" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-lf-line bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3"
          aria-label="Elite Sales and Marketing Training, home"
        >
          <BrandImage asset={brandAssets.elite} heightClass="h-10 md:h-11" />
          <span className="hidden flex-col leading-tight md:flex">
            <span className="text-[11px] uppercase tracking-wide text-lf-slate">
              Elite Sales and Marketing
            </span>
            <span className="text-[11px] uppercase tracking-wide text-lf-slate">
              Training 101 through 601
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2.5 py-2 text-sm font-medium text-lf-charcoal transition hover:bg-lf-mist hover:text-lf-navy"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/101-foundation/" className="btn-primary ml-2">
            Start with 101
          </Link>
        </nav>
        <Link
          href="/paths/"
          className="btn-primary lg:hidden"
          aria-label="Open learner paths"
        >
          Paths
        </Link>
      </div>
    </header>
  );
}
