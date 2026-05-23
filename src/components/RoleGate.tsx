import Link from "next/link";
import { ReactNode } from "react";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { GatedSurface } from "@/lib/roles";
import { canAccessGate, getRoleLabel } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";

type Props = {
  gate: GatedSurface;
  children: ReactNode;
};

export default function RoleGate({ gate, children }: Props) {
  return <RoleGateContent gate={gate}>{children}</RoleGateContent>;
}

async function RoleGateContent({ gate, children }: Props) {
  const session = await getBetaUserSession();
  const previewEnabled = await isBetaPreviewEnabled();
  const allowed =
    previewEnabled ||
    session.status === "approved" &&
    canAccessGate(gate, session.profile, session.permissions);

  if (allowed) {
    return <>{children}</>;
  }

  return (
    <section className="container-page py-16">
      <div className="card max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          Restricted beta area
        </span>
        <h2 className="h-display mt-1 text-2xl">
          This section is for team leaders, coaches, and approved internal users.
        </h2>
        <p className="prose-lf mt-3 text-base">
          {session.status === "not-configured"
            ? "Supabase env vars are not configured for this environment yet."
            : session.status === "signed-out"
              ? "Sign in with an approved Loan Factory Google account to continue."
              : session.status === "pending"
                ? "Your account is signed in, but access has not been approved in Supabase yet."
                : `Your current role is ${getRoleLabel(session.profile.role)}.`}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {session.status === "signed-out" && (
            <Link href="/login/" className="btn-primary">
              Sign in
            </Link>
          )}
          {session.status === "pending" && (
            <Link href="/access-pending/" className="btn-primary">
              Access pending
            </Link>
          )}
          <Link href="/" className="btn-secondary">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
