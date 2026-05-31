import SectionHeading from "@/components/SectionHeading";
import BrandImage from "@/components/BrandImage";
import { brandAssets, brandHierarchyRule } from "@/data/brandAssets";

export const metadata = { title: "Brand Preview" };

const lightCard = "rounded-2xl border border-lf-line bg-white p-8 shadow-card";
const darkCard = "rounded-2xl border border-lf-navy bg-lf-navy p-8";

export default function BrandPreviewPage() {
  return (
    <>
      <section className="bg-lf-navy text-white">
        <div className="container-page py-14">
          <span className="rounded-full bg-lf-orange px-3 py-1 text-xs font-bold uppercase tracking-wide">
            Brand Preview
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            Brand Preview
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Quick reference for how the Loan Factory platform logo and the
            Sales and Marketing 101-601 training mark render in this portal.
            Use this page to confirm contrast before publishing handouts or
            printed materials.
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        <SectionHeading
          eyebrow="Hierarchy rule"
          title="Loan Factory is primary. Program marks support it."
        />
        <p className="prose-lf mt-4 text-base">{brandHierarchyRule}</p>
      </section>

      <section className="container-page py-10">
        <SectionHeading
          eyebrow="On white"
          title="Logos on the light surface."
          description="This is the default page background. Reviews and printed handouts."
        />
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className={lightCard}>
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
              Sales and Marketing 101-601 mark
            </p>
            <div className="mt-6 flex items-center justify-center">
              <BrandImage
                asset={brandAssets.elite}
                heightClass="h-40"
              />
            </div>
          </div>
          <div className={lightCard}>
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
              Loan Factory logo
            </p>
            <div className="mt-6 flex items-center justify-center">
              <BrandImage
                asset={brandAssets["loan-factory"]}
                heightClass="h-16"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <SectionHeading
          eyebrow="On dark"
          title="Logos on the navy surface."
          description="Used in hero bands. Note: if the Loan Factory logo contains dark text, drop it on a white chip rather than placing it directly on navy."
        />
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className={darkCard}>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
              Sales and Marketing 101-601 mark
            </p>
            <div className="mt-6 flex items-center justify-center">
              <BrandImage
                asset={brandAssets.elite}
                heightClass="h-40"
              />
            </div>
          </div>
          <div className={darkCard}>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
              Loan Factory logo (on white chip inside dark band)
            </p>
            <div className="mt-6 flex items-center justify-center">
              <div className="rounded-xl bg-white px-6 py-4">
                <BrandImage
                  asset={brandAssets["loan-factory"]}
                  heightClass="h-12"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <SectionHeading
          eyebrow="Lockups"
          title="Recommended header and footer pairings."
        />
        <div className="mt-6 grid gap-5">
          <div className={lightCard}>
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
              Header lockup (used in site header)
            </p>
            <div className="mt-6 flex items-center gap-3">
              <BrandImage asset={brandAssets.elite} heightClass="h-11" />
              <span className="flex flex-col leading-tight">
                <span className="text-[11px] uppercase tracking-wide text-lf-slate">
                  Sales and Marketing
                </span>
                <span className="text-[11px] uppercase tracking-wide text-lf-slate">
                  Training 101 through 601
                </span>
              </span>
            </div>
            <p className="prose-lf mt-3 text-xs text-lf-slate">
              The current site header uses the Loan Factory platform logo.
              Training-specific marks stay available for handouts and review
              surfaces.
            </p>
          </div>

          <div className={lightCard}>
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
              Footer lockup (used in site footer)
            </p>
            <div className="mt-6 flex items-center gap-5">
              <BrandImage asset={brandAssets.elite} heightClass="h-12" />
              <span className="h-8 w-px bg-lf-line" />
              <BrandImage
                asset={brandAssets["loan-factory"]}
                heightClass="h-6"
                className="opacity-90"
              />
              <span className="ml-auto text-xs uppercase tracking-wide text-lf-slate">
                Internal training portal
              </span>
            </div>
          </div>

          <div className={darkCard}>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
              Hero brand block (used on the homepage)
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white p-6">
                <div className="flex flex-col items-center gap-4">
                  <BrandImage
                    asset={brandAssets.elite}
                    heightClass="h-32 md:h-40"
                  />
                  <div className="h-px w-16 bg-lf-line" />
                  <span className="text-[11px] uppercase tracking-wide text-lf-slate">
                    Powered by
                  </span>
                  <BrandImage
                    asset={brandAssets["loan-factory"]}
                    heightClass="h-6"
                  />
                </div>
              </div>
              <p className="prose-lf text-sm text-white/85">
                The Loan Factory logo is the platform-level brand. Program
                marks appear as supporting assets inside specific training or
                coaching surfaces.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
