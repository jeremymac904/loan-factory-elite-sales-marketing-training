import Link from "next/link";
import type { ReactNode } from "react";
import RoleGate from "@/components/RoleGate";
import type { GatedSurface } from "@/lib/roles";
import { getEffectiveAccess } from "@/lib/supabase/effectiveAccess";

// LO-facing friendly fallback for internal STAFF surfaces.
//
// RoleGate (Lead-owned, already effective-role aware) will correctly DENY a
// regular Loan Officer — or an admin who is viewing-as Loan Officer — on staff
// gates like "lo-development" and "training-academy". The default denial is a
// generic AccessNotice. For a regular Loan Officer that bare "access denied" is
// confusing, because they DO have a home on the platform; it just isn't this
// internal staff dashboard.
//
// This wrapper detects the EFFECTIVE role via getEffectiveAccess (so it is
// view-as aware: an admin previewing Loan Officer sees the same friendly
// fallback the real LO would) and, ONLY for loan_officer, renders a branded
// redirect that points them to the right Loan Officer surface instead of a bare
// denial. For every other role it falls straight through to RoleGate, which
// keeps the real allow-list decision (and its AccessNotice) untouched. This
// NEVER grants access — loan_officer is not on these gates' allow-lists, and we
// only ever show LINKS to surfaces the LO can already reach.

export type LoFallbackDestination = {
  title: string;
  description: string;
  href: string;
  cta: string;
};

type Props = {
  /** The staff gate to enforce for non-LO roles (passed through to RoleGate). */
  gate: GatedSurface;
  /** Label of the staff surface the LO landed on, e.g. "LO Development". */
  surfaceLabel: string;
  /** One-line explanation of what this internal surface is. */
  explanation: string;
  /** Where a Loan Officer should actually go instead. */
  destinations: LoFallbackDestination[];
  children: ReactNode;
};

export default function LoFallbackGate({
  gate,
  surfaceLabel,
  explanation,
  destinations,
  children,
}: Props) {
  return (
    <LoFallbackGateContent
      gate={gate}
      surfaceLabel={surfaceLabel}
      explanation={explanation}
      destinations={destinations}
    >
      {children}
    </LoFallbackGateContent>
  );
}

async function LoFallbackGateContent({
  gate,
  surfaceLabel,
  explanation,
  destinations,
  children,
}: Props) {
  const effective = await getEffectiveAccess();

  // Only intercept a regular Loan Officer (or an admin viewing-as Loan Officer).
  // Everything else — including pending/signed-out and every staff/coach role —
  // is handed straight to RoleGate so its allow-list and AccessNotice decide.
  if (effective.effectiveRole !== "loan_officer") {
    return <RoleGate gate={gate}>{children}</RoleGate>;
  }

  return (
    <section className="container-page py-16">
      <div className="card max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          {surfaceLabel}
        </span>
        <h1 className="h-display mt-1 text-3xl">
          This is an internal staff dashboard
        </h1>
        <p className="prose-lf mt-3 text-base text-lf-slate">{explanation}</p>
        <p className="prose-lf mt-3 text-base text-lf-charcoal">
          As a Loan Officer, your tools and training live here:
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {destinations.map((destination) => (
            <Link
              key={destination.href}
              href={destination.href}
              className="rounded-2xl border border-lf-line bg-lf-mist p-4 transition hover:border-lf-orange hover:shadow-soft"
            >
              <h2 className="h-display text-lg">{destination.title}</h2>
              <p className="prose-lf mt-1 text-sm text-lf-slate">
                {destination.description}
              </p>
              <span className="mt-3 inline-flex text-sm font-semibold text-lf-orange">
                {destination.cta} &rarr;
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/normal-lo/" className="btn-primary">
            Go to my dashboard
          </Link>
          <Link href="/" className="btn-secondary">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
