import Link from "next/link";
import BrandImage from "./BrandImage";
import { brandAssets } from "@/data/brandAssets";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/apex-advisor/", label: "Apex Advisor" },
  { href: "/sales-training/", label: "Sales & Marketing" },
  { href: "/ai-training/", label: "AI Training" },
  { href: "/creator-network/", label: "Creator Network" },
  { href: "/ai-assistants/", label: "AI Assistants" },
  { href: "/resources/", label: "Resources" },
  {
    href: "/support-routing/#lo-development-support-team",
    label: "Support Team",
  },
];

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-lf-line bg-lf-mist">
      <div className="container-page py-10">
        <div className="flex flex-col items-start gap-5 border-b border-lf-line pb-6 md:flex-row md:items-center md:justify-between">
          <BrandImage
            asset={brandAssets["loan-factory"]}
            heightClass="h-9"
          />
          <p className="max-w-xl text-sm leading-6 text-lf-slate">
            Training, coaching, AI tools, and internal resources for Loan
            Factory loan officers.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <p className="text-sm font-semibold text-lf-navy">
              Loan Factory LO Development
            </p>
            <p className="mt-2 text-sm leading-6 text-lf-slate">
              Clear paths for coaching, Sales & Marketing training, AI
              practice, internal community, and support resources.
            </p>
          </div>
          <div className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
            {footerLinks.map((item) => (
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
