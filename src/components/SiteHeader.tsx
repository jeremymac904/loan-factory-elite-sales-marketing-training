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

const resourcesNav = [
  { href: "/coach-guide/", label: "Coach Guide" },
  { href: "/team-leader-guide/", label: "Team Leader Guide" },
  { href: "/recommended-channels/", label: "Recommended Channels" },
  { href: "/ai-coaching-assistant/", label: "AI Coaching Assistant" },
  { href: "/compliance/", label: "Compliance Notes" },
  { href: "/recordings/", label: "Recordings" },
  { href: "/brand-preview/", label: "Brand Preview" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-lf-line bg-white/95 backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-4"
          aria-label="Elite Sales and Marketing Training, home"
        >
          <BrandImage asset={brandAssets.elite} heightClass="h-12" />
          <span aria-hidden className="hidden h-10 w-px bg-lf-line sm:block" />
          <BrandImage
            asset={brandAssets["loan-factory"]}
            heightClass="h-7 hidden sm:block"
          />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2.5 py-2 text-sm font-medium text-lf-charcoal transition hover:bg-lf-mist hover:text-lf-navy"
            >
              {item.label}
            </Link>
          ))}

          <div className="group relative">
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-md px-2.5 py-2 text-sm font-medium text-lf-charcoal transition hover:bg-lf-mist hover:text-lf-navy"
              aria-haspopup="true"
            >
              Resources
              <span aria-hidden className="text-xs">&#9662;</span>
            </button>
            <div className="invisible absolute right-0 top-full z-10 mt-1 w-64 rounded-xl border border-lf-line bg-white p-2 opacity-0 shadow-lift transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              {resourcesNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-lf-charcoal transition hover:bg-lf-mist hover:text-lf-navy"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/login/"
            className="ml-2 rounded-md border border-lf-line px-3 py-2 text-sm font-semibold text-lf-charcoal transition hover:border-lf-navy hover:bg-lf-mist hover:text-lf-navy"
          >
            Login
          </Link>
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
