import Link from "next/link";
import { ReactNode } from "react";
import { getCoachAccess } from "@/lib/coachAccess";

// Gate the whole /coach-command-center subtree to coaches, team leaders, and
// admins (View-As aware). Normal LOs without a coach/team-leader/admin role do
// not see the command center.
export default async function CoachCommandCenterLayout({
  children,
}: {
  children: ReactNode;
}) {
  const access = await getCoachAccess();

  if (!access.isCoach) {
    return (
      <section className="container-page py-16">
        <div className="card max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
            Coach Command Center
          </span>
          <h1 className="h-display mt-1 text-3xl">Coaches & team leaders only</h1>
          <p className="prose-lf mt-3">
            The Coach Command Center is for approved Loan Factory coaches, team
            leaders, and LO Development. If you coach or lead a team and need
            access, ask Jeremy or LO Development.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/coaching/" className="btn-primary">
              Coaching overview
            </Link>
            <Link href="/" className="btn-secondary">
              Back to home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return <>{children}</>;
}
