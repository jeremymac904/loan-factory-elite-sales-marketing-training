import Link from "next/link";
import MarketMentorHero from "@/components/market-mentor/MarketMentorHero";
import MarketMentorToolGrid from "@/components/market-mentor/MarketMentorToolGrid";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { getBetaUserSession } from "@/lib/supabase/session";
import {
  hasMarketMentorAlliance,
  hasMarketMentorFullAccess,
  marketMentorTools,
} from "@/data/marketMentor";

export const dynamic = "force-dynamic";
export const metadata = { title: "Market Mentor Studio" };

export default async function MarketMentorPage() {
  const session = await getBetaUserSession();
  const previewEnabled = await isBetaPreviewEnabled();

  if (!previewEnabled && session.status !== "approved") {
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

  const role =
    previewEnabled
      ? "master_admin"
      : session.status === "approved"
        ? session.profile.role ?? null
        : null;

  const fullAccess = hasMarketMentorFullAccess(role);
  const alliance = hasMarketMentorAlliance(role);

  const tierBadge: "Mastery" | "Alliance" | "Preview" = alliance
    ? "Alliance"
    : fullAccess
      ? "Mastery"
      : "Preview";

  return (
    <>
      <MarketMentorHero
        title="Market Mentor Studio"
        subtitle="Internal market intelligence, borrower advisory, Realtor value, and AI video studio for approved Loan Factory users. Built for paid coaching members and internal leadership."
        tierBadge={tierBadge}
      >
        <div className="flex flex-wrap gap-2">
          <Link href="/market-mentor/market-update/" className="btn-primary text-sm">
            Open Market Update Interpreter
          </Link>
          <Link
            href="/market-mentor/templates/"
            className="btn-secondary border-white/30 bg-white/10 text-sm text-white hover:border-white"
          >
            Template Library
          </Link>
          <Link
            href="/market-mentor/certification/"
            className="btn-secondary border-white/30 bg-white/10 text-sm text-white hover:border-white"
          >
            Certification track
          </Link>
        </div>
      </MarketMentorHero>

      <section className="container-page py-10">
        <h2 className="h-display text-2xl">Tools</h2>
        <p className="prose-lf mt-2 max-w-3xl text-sm text-lf-slate">
          {fullAccess
            ? "Full toolset access. Alliance tools (advanced video templates, mastermind prompts, bilingual scripts, leadership briefings) require Loan Factory Alliance."
            : "Preview only. The full toolset is for paid coaching members and internal leadership/coaching users. Talk to your coach to upgrade access."}
        </p>
        <div className="mt-6">
          <MarketMentorToolGrid
            tools={marketMentorTools}
            hasFullAccess={fullAccess}
            hasAlliance={alliance}
          />
        </div>
      </section>

      <section className="container-page pb-12">
        <div className="card max-w-3xl bg-lf-mist">
          <h2 className="h-display text-xl">Internal use only</h2>
          <p className="prose-lf mt-2 text-sm">
            Everything in Market Mentor Studio is for approved Loan Factory
            users. Always review before any borrower- or Realtor-facing use. Do
            not predict rates. Do not promise appreciation. Do not guarantee
            savings. Use the responsible-language reminders shown on each tool.
          </p>
        </div>
      </section>
    </>
  );
}
