import Link from "next/link";
import BrandImage from "./BrandImage";
import { brandAssets } from "@/data/brandAssets";
import { platformNav } from "@/data/platform";

const utilityLinks = [
  { href: "/compliance/", label: "Compliance Notes" },
  { href: "/coach-guide/", label: "Coach Guide" },
  { href: "/team-leader-guide/", label: "Team Leader Guide" },
  { href: "/recommended-channels/", label: "Recommended Channels" },
  { href: "/login/", label: "Role Preview" },
];

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-lf-line bg-lf-mist">
      <div className="container-page py-10">
        <div className="flex flex-col items-start gap-5 border-b border-lf-line pb-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-6">
            <BrandImage asset={brandAssets.elite} heightClass="h-14" />
            <span aria-hidden className="h-10 w-px bg-lf-line" />
            <BrandImage
              asset={brandAssets["loan-factory"]}
              heightClass="h-9"
            />
          </div>
          <p className="max-w-xl text-xs uppercase tracking-wide text-lf-slate">
            Internal Loan Factory LO Development Platform. Static prototype
            surfaces are not borrower-facing, partner-facing, or public
            publishing systems.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <p className="text-sm font-semibold text-lf-navy">
              Loan Factory LO Development Platform
            </p>
            <p className="mt-2 text-sm leading-6 text-lf-slate">
              Unified home for Apex Advisor, Elite Sales & Marketing, AI
              Training, 1+1+1=5, Training Library, Creator Network concepts,
              AI Assistants, Audience Quality Panel, trackers, resources, and
              support routing.
            </p>
            <p className="mt-4 text-xs leading-5 text-lf-slate">
              Draft and internal training outputs require human review before
              borrower-facing, Realtor-facing, recruiting-facing, public, or
              compliance-sensitive use.
            </p>
          </div>
          <div className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
            {[...platformNav, ...utilityLinks].map((item) => (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                className="text-lf-charcoal hover:text-lf-orange"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-10 border-t border-lf-line pt-4 text-xs text-lf-slate">
          Loan Factory is a mortgage brokerage with access to a broad wholesale
          lender network. NMLS 320841. Equal Housing Opportunity.
        </div>
      </div>
    </footer>
  );
}
