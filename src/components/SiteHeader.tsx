import Link from "next/link";
import BrandImage from "./BrandImage";
import { brandAssets } from "@/data/brandAssets";
import { platformNav } from "@/data/platform";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-lf-line bg-white/95 backdrop-blur">
      <div className="container-page flex min-h-20 flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-full items-center justify-between gap-4 lg:w-auto">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-4"
            aria-label="Loan Factory LO Development Platform home"
          >
            <BrandImage asset={brandAssets.elite} heightClass="h-11" />
            <span aria-hidden className="hidden h-10 w-px bg-lf-line sm:block" />
            <BrandImage
              asset={brandAssets["loan-factory"]}
              heightClass="h-7 hidden sm:block"
            />
          </Link>

          <details className="group lg:hidden">
            <summary className="btn-primary cursor-pointer list-none">
              Platform Menu
            </summary>
            <nav className="absolute left-5 right-5 top-[76px] z-40 rounded-xl border border-lf-line bg-white p-3 shadow-lift">
              <div className="grid gap-1">
                {platformNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-3 py-2 text-sm font-semibold text-lf-charcoal hover:bg-lf-mist hover:text-lf-orange"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </details>
        </div>

        <nav
          className="hidden items-center justify-end gap-0.5 lg:flex"
          aria-label="Primary platform navigation"
        >
          {platformNav.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className="inline-flex items-center gap-1 rounded-md px-2 py-2 text-[13px] font-semibold text-lf-charcoal transition hover:bg-lf-mist hover:text-lf-orange"
                aria-haspopup={item.items ? "true" : undefined}
              >
                {item.label}
                {item.items && (
                  <span aria-hidden className="text-[10px] text-lf-slate">
                    &#9662;
                  </span>
                )}
              </Link>
              {item.items && (
                <div className="invisible absolute left-0 top-full z-10 mt-1 w-72 rounded-xl border border-lf-line bg-white p-2 opacity-0 shadow-lift transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className="block rounded-md border-l-2 border-transparent px-3 py-2 text-sm font-medium text-lf-charcoal transition hover:border-lf-orange hover:bg-lf-mist hover:text-lf-orange"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
