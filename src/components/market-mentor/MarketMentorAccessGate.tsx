import Link from "next/link";
import type { ReactNode } from "react";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { getBetaUserSession } from "@/lib/supabase/session";
import {
  hasMarketMentorAlliance,
  hasMarketMentorFullAccess,
} from "@/data/marketMentor";

type Props = {
  children: ReactNode;
  requireAlliance?: boolean;
};

export default async function MarketMentorAccessGate({
  children,
  requireAlliance = false,
}: Props) {
  const previewEnabled = await isBetaPreviewEnabled();
  const session = await getBetaUserSession();

  if (previewEnabled) {
    return <>{children}</>;
  }

  if (session.status !== "approved") {
    return (
      <section className="container-page py-16">
        <div className="card max-w-2xl">
          <h1 className="h-display text-3xl">Sign in required</h1>
          <p className="prose-lf mt-3">
            Market Mentor Studio is for approved Loan Factory users. Sign in
            with your Loan Factory Google account.
          </p>
          <Link href="/login/" className="btn-primary mt-6 inline-block">
            Sign in
          </Link>
        </div>
      </section>
    );
  }

  const role = session.profile.role ?? null;

  if (!hasMarketMentorFullAccess(role)) {
    return (
      <section className="container-page py-16">
        <div className="card max-w-2xl">
          <h1 className="h-display text-3xl">Paid coaching access required</h1>
          <p className="prose-lf mt-3">
            This tool is part of Market Mentor Studio and is reserved for paid
            coaching members and internal leadership. You can browse the
            overview, but tool access requires the LO Mastery or Loan Factory
            Alliance tier.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/market-mentor/" className="btn-secondary">
              Back to overview
            </Link>
            <Link href="/coaching/" className="btn-primary">
              Talk to a coach
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (requireAlliance && !hasMarketMentorAlliance(role)) {
    return (
      <section className="container-page py-16">
        <div className="card max-w-2xl">
          <h1 className="h-display text-3xl">Loan Factory Alliance only</h1>
          <p className="prose-lf mt-3">
            This advanced Market Mentor Studio tool is for Loan Factory
            Alliance members and internal leadership.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/market-mentor/" className="btn-secondary">
              Back to overview
            </Link>
            <Link
              href="/member-area/alliance/"
              className="btn-primary"
            >
              See Alliance
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return <>{children}</>;
}
