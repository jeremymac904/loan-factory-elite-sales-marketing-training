import Link from "next/link";
import BrandImage from "./BrandImage";
import HeaderAuthStatus from "./HeaderAuthStatus";
import MobileMenu from "./header/MobileMenu";
import { primaryNav } from "./nav/primaryNav";
import { brandAssets } from "@/data/brandAssets";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-lf-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-[4.5rem] w-full max-w-[1500px] items-center justify-between gap-4 px-5 py-2.5 sm:px-8 lg:grid lg:grid-cols-[220px_minmax(0,1fr)_240px]">
        <div className="flex min-w-0 flex-1 items-center justify-between gap-4 lg:flex-none lg:justify-start">
          <Link
            href="/"
            className="flex min-w-0 items-center"
            aria-label="Loan Factory LO Development home"
          >
            <BrandImage
              asset={brandAssets["loan-factory"]}
              heightClass="h-9 sm:h-11"
            />
          </Link>

          <MobileMenu>
            <div className="grid gap-1.5">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2.5 text-base font-semibold text-lf-charcoal hover:bg-lf-mist hover:text-lf-orange"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-1 border-t border-lf-line pt-2">
                <HeaderAuthStatus variant="mobile" />
              </div>
            </div>
          </MobileMenu>
        </div>

        <nav
          className="hidden min-w-0 items-center justify-center gap-1 lg:flex"
          aria-label="Primary navigation"
        >
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center whitespace-nowrap rounded-lg px-2 py-2 text-[13px] font-semibold text-lf-charcoal transition hover:bg-lf-mist hover:text-lf-orange xl:px-2.5 xl:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden min-w-0 items-center justify-end lg:flex">
          <HeaderAuthStatus />
        </div>
      </div>
    </header>
  );
}
