import Link from "next/link";
import BrandImage from "./BrandImage";
import HeaderAuthStatus from "./HeaderAuthStatus";
import { brandAssets } from "@/data/brandAssets";

const primaryNav = [
  { label: "Home", href: "/" },
  { label: "Coaching", href: "/apex-advisor/" },
  { label: "Sales & Marketing", href: "/sales-training/" },
  { label: "AI Training", href: "/ai-training/" },
  { label: "FaceGram", href: "/facegram/" },
  { label: "AI Assistants", href: "/ai-assistants/" },
  { label: "Resources", href: "/resources/" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-lf-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-20 w-full max-w-[1500px] items-center justify-between gap-5 px-5 py-3 sm:px-8">
        <div className="flex w-full items-center justify-between gap-4 lg:w-auto">
          <Link
            href="/"
            className="flex min-w-0 items-center"
            aria-label="Loan Factory LO Development home"
          >
            <BrandImage
              asset={brandAssets["loan-factory"]}
              heightClass="h-8 sm:h-9"
            />
          </Link>

          <details className="group lg:hidden">
            <summary className="btn-primary cursor-pointer list-none">
              Menu
            </summary>
            <nav className="fixed left-5 right-5 top-20 z-40 max-w-[calc(100vw-2.5rem)] rounded-xl border border-lf-line bg-white p-3 shadow-lift">
              <div className="grid gap-2">
                {primaryNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-3 py-3 text-base font-semibold text-lf-charcoal hover:bg-lf-mist hover:text-lf-orange"
                  >
                    {item.label}
                  </Link>
                ))}
                <HeaderAuthStatus variant="mobile" />
              </div>
            </nav>
          </details>
        </div>

        <div className="hidden min-w-0 items-center justify-end gap-3 lg:flex">
          <nav
            className="flex min-w-0 items-center justify-end gap-2"
            aria-label="Primary navigation"
          >
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-semibold text-lf-charcoal transition hover:bg-lf-mist hover:text-lf-orange xl:px-3 xl:text-[15px]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <HeaderAuthStatus />
        </div>
      </div>
    </header>
  );
}
