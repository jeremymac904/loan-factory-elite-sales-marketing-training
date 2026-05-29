import Link from "next/link";

type Props = {
  title: string;
  description: string;
  /** Locked-state message shown in place of the open action. */
  message?: string;
  /** Where the upgrade / contact CTA routes. Defaults to the Alliance overview. */
  ctaHref?: string;
  ctaLabel?: string;
};

// Reusable locked resource card for coaching tier gating. Looks like a resource
// card but the action is replaced with an upgrade/contact prompt — no dead
// buttons: the CTA always routes somewhere useful.
export default function LockedResourceCard({
  title,
  description,
  message = "Upgrade to Loan Factory Alliance for this resource.",
  ctaHref = "/loan-factory-alliance/",
  ctaLabel = "Upgrade to Alliance",
}: Props) {
  return (
    <div className="card flex flex-col gap-2 border-dashed bg-lf-mist/40">
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-base font-semibold text-lf-slate">{title}</h2>
        <span
          aria-hidden
          className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-lf-slate ring-1 ring-lf-line"
        >
          🔒 Locked
        </span>
      </div>
      <p className="text-sm text-lf-slate">{description}</p>
      <p className="mt-1 text-xs font-semibold text-lf-orangeDark">{message}</p>
      <Link
        href={ctaHref}
        className="mt-auto inline-flex items-center text-sm font-semibold text-lf-orange hover:underline"
      >
        {ctaLabel} <span aria-hidden className="ml-2">&rarr;</span>
      </Link>
    </div>
  );
}
