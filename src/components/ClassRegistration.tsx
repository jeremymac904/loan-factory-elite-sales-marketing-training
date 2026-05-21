import { externalLinks } from "@/lib/externalLinks";

export default function ClassRegistration() {
  return (
    <section className="card flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          Class Registration and Calendar
        </span>
      </div>
      <h2 className="h-display text-2xl">Live training, every other Thursday.</h2>
      <p className="prose-lf text-base">
        Training classes happen every other Thursday at 1 PM Eastern. Register
        for the next session on the Loan Factory events marketplace, or head to
        the Loan Factory homepage.
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href={externalLinks.registerForTraining}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Register for Training
        </a>
        <a
          href={externalLinks.loanFactoryHomepage}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          Loan Factory Homepage
        </a>
      </div>
    </section>
  );
}
