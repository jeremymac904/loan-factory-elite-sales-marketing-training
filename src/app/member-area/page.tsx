import Link from "next/link";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { getBetaUserSession } from "@/lib/supabase/session";

export const dynamic = "force-dynamic";
export const metadata = { title: "Member Area" };

const tiers = [
  {
    name: "LO Mastery Coaching",
    price: "$249",
    href: "/member-area/lo-mastery/",
    description:
      "Daily rhythm, Power Hour, biweekly group coaching, Certified Mortgage Advisor track, scripts, trackers, AI Mastery Coaching Assistant.",
  },
  {
    name: "Loan Factory Alliance",
    price: "$449",
    href: "/member-area/alliance/",
    description:
      "Everything in LO Mastery plus weekly coaching, daily Breakfast Club, biweekly Mastermind, advanced certifications, leadership/team builder track, Alliance AI Assistant.",
  },
];

export default async function MemberAreaPage() {
  const session = await getBetaUserSession();
  const previewEnabled = await isBetaPreviewEnabled();

  const tier =
    session.status === "approved" ? session.profile.coaching_tier ?? null : null;

  if (!previewEnabled && session.status !== "approved") {
    return (
      <section className="container-page py-16">
        <div className="card max-w-2xl">
          <h1 className="h-display text-3xl">Sign in required</h1>
          <p className="prose-lf mt-3">
            The Member Area is for approved Loan Factory coaching members.
          </p>
          <Link href="/login/" className="btn-primary mt-6 inline-block">
            Sign in
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-14">
          <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
            Coaching Member Area
          </p>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            Coaching membership
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Pick your tier to open coaching resources, recordings, trackers,
            scripts, and your coaching AI assistant.
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-6 md:grid-cols-2">
          {tiers.map((t) => (
            <Link
              key={t.name}
              href={t.href}
              className="card flex flex-col gap-4 transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div className="flex items-baseline gap-2">
                <h2 className="font-display text-2xl font-semibold text-lf-charcoal">
                  {t.name}
                </h2>
                <span className="text-sm font-bold text-lf-orange">
                  {t.price}/mo
                </span>
              </div>
              <p className="prose-lf text-sm">{t.description}</p>
              <span className="mt-auto inline-flex items-center text-sm font-semibold text-lf-orange">
                Open tier <span aria-hidden className="ml-2">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>

        {tier && (
          <div className="mt-8 card max-w-xl border-lf-orange/30 bg-lf-orangeSoft/30">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orangeDark">
              Your tier
            </p>
            <p className="mt-1 text-base font-semibold text-lf-charcoal">
              {tier}
            </p>
          </div>
        )}
      </section>
    </>
  );
}
