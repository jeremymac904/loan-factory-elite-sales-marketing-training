import Link from "next/link";
import BrandImage from "./BrandImage";
import { brandAssets } from "@/data/brandAssets";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/paths/", label: "Learner Paths" },
  { href: "/training-path/", label: "Training Path" },
  { href: "/scripts/", label: "Scripts" },
  { href: "/prompts/", label: "AI Prompts" },
  { href: "/roleplays/", label: "Roleplays" },
  { href: "/audio-training/", label: "Audio Training" },
  { href: "/tracker/", label: "Tracker" },
  { href: "/coach-guide/", label: "Coach Guide" },
  { href: "/team-leader-guide/", label: "Team Leader Guide" },
  { href: "/compliance/", label: "Compliance Notes" },
  { href: "/recordings/", label: "Recordings" },
  { href: "/recommended-channels/", label: "Recommended Channels" },
  { href: "/ai-coaching-assistant/", label: "AI Coaching Assistant" },
  { href: "/login/", label: "Login" },
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
          <p className="text-xs uppercase tracking-wide text-lf-slate">
            Internal training portal for Loan Factory loan officers.
          </p>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-lf-navy">
              Loan Factory Elite Sales and Marketing Training Series
            </p>
            <p className="mt-2 text-sm text-lf-slate">
              101 through 601. A simple, practical operating system for Loan
              Factory loan officers.
            </p>
            <p className="mt-4 text-xs text-lf-slate">
              Internal training portal. Not for borrower or public distribution.
              All borrower facing, Realtor facing, and public artifacts require
              compliance review before use.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm md:col-span-2">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-lf-charcoal hover:text-lf-orange"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-10 border-t border-lf-line pt-4 text-xs text-lf-slate">
          Loan Factory is a mortgage brokerage with access to 240+ wholesale
          lenders. NMLS 320841. Equal Housing Opportunity.
        </div>
      </div>
    </footer>
  );
}
