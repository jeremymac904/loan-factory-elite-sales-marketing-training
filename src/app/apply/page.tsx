import Link from "next/link";
import { coachingTiers } from "@/data/coaching";

const APPLICATION_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdnCdhiGDaz3W0i33aGiiPk4UlkeStesQCrj1ryzYKG9DRZQA/viewform";

export const metadata = { title: "Apply" };

export default function ApplyPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-14">
          <h1 className="metal-title-dark max-w-3xl text-4xl md:text-5xl">
            Apply for paid coaching
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/85">
            Pick the program that fits where your business is right now. We
            review every application and follow up with the next step.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-6 lg:grid-cols-2">
          {coachingTiers.map((tier) => (
            <article
              key={tier.id}
              className="flex flex-col rounded-2xl border border-lf-line bg-white p-7 shadow-card"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                {tier.price} {tier.priceSuffix}
              </p>
              <h2 className="h-display mt-2 text-2xl">{tier.shortName}</h2>
              <p className="prose-lf mt-3 text-lf-slate">{tier.bestFor}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-6">
                <a
                  href={APPLICATION_FORM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  Apply now
                </a>
                <Link href={tier.href} className="btn-secondary">
                  View {tier.shortName}
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-lf-line bg-lf-mist p-7">
          <h2 className="h-display text-2xl">How to apply</h2>
          <p className="prose-lf mt-3 max-w-3xl text-lf-charcoal">
            Complete the application form and we follow up with approval and
            your start date. Already approved? Use the Sign In button in the
            top right.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <a
              href={APPLICATION_FORM_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Open the application form
            </a>
            <p className="text-sm text-lf-slate">
              Questions?{" "}
              <a
                className="font-semibold text-lf-orange hover:underline"
                href="mailto:jeremy.mcdonald@loanfactory.com?subject=Paid%20Coaching%20Application"
              >
                jeremy.mcdonald@loanfactory.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
