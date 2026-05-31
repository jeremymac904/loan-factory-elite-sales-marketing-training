import Link from "next/link";
import { marketingTrainingAssets } from "@/data/marketingTrainingAssets";

export const metadata = { title: "Marketing Training Asset Library" };

export default function MarketingAssetsPage() {
  return (
    <main className="container-page py-14">
      <header className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          Marketing Training Asset Library
        </span>
        <h1 className="h-display mt-2 text-3xl sm:text-4xl">
          Marketing and tracking setup guides for loan officer sites.
        </h1>
        <p className="prose-lf mt-4 text-lf-slate">
          Five step-by-step guides covering the marketing and tracking
          infrastructure used across Loan Factory loan officer websites and
          campaigns. View each guide in your browser or download the printable
          PDF. These onboarding references support the free internal Sales and
          Marketing 101-601 series (especially 401 Content and Marketing) and the
          AI Advantage track. They are not part of paid coaching progress.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/training-library/" className="btn-secondary">
            Back to Training Library
          </Link>
        </div>
      </header>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {marketingTrainingAssets.map((asset, index) => (
          <article key={asset.id} id={asset.id} className="card flex flex-col">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                  {asset.category}
                </span>
                <h2 className="h-display mt-1 text-lg">
                  {String(index + 1).padStart(2, "0")}. {asset.title}
                </h2>
              </div>
              <span className="rounded-full bg-lf-mist px-3 py-1 text-xs font-semibold text-lf-slate">
                {asset.estimatedTime}
              </span>
            </div>

            <p className="prose-lf mt-3 text-sm text-lf-slate">
              {asset.summary}
            </p>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                In this guide
              </p>
              <ul className="mt-2 grid gap-1.5">
                {asset.topics.map((topic) => (
                  <li
                    key={topic}
                    className="flex items-start gap-2 text-sm text-lf-charcoal"
                  >
                    <span aria-hidden className="mt-1 text-lf-orange">
                      &bull;
                    </span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="prose-lf mt-4 text-xs text-lf-slate">
              {asset.seriesMapping} &middot; Pairs with AI Advantage:{" "}
              {asset.aiAdvantageTieIn.title}
            </p>

            <div className="mt-auto flex flex-wrap gap-3 pt-5">
              <a
                href={asset.markdownHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                View guide
              </a>
              <a
                href={asset.pdfHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Download PDF
              </a>
            </div>
          </article>
        ))}
      </div>

      <p className="prose-lf mt-10 max-w-3xl text-xs text-lf-slate">
        Internal Loan Factory training material for loan officer onboarding. Keep
        ad copy and any displayed pricing compliant, with required disclosures,
        per each guide&apos;s best practices. Verify lender-paid compensation and
        company policy before changing any pricing or compensation display.
      </p>
    </main>
  );
}
