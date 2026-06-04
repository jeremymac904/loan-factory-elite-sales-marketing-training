import Link from "next/link";
import { getCoachingAccess } from "@/lib/coachingAccess";
import MemberScorecardForm from "@/components/coach/MemberScorecardForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "My Scorecard · Member Area" };

export default async function MemberScorecardsPage() {
  const access = await getCoachingAccess();
  const initialTier = access.canAlliance ? "alliance" : "lo_mastery";

  return (
    <section className="container-page py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
            My Scorecard
          </p>
          <h1 className="h-display mt-1 text-3xl">Submit this week&apos;s activity</h1>
          <p className="prose-lf mt-2 max-w-2xl text-sm">
            Record what you actually did this week: real conversations, Realtor
            activity, past-client touches, pipeline work, and the commitments
            from your last coaching call. Your coach reviews what you submit;
            they do not fill it in for you.
          </p>
        </div>
        <Link href="/member-area/" className="btn-secondary text-sm">
          Open member area
        </Link>
      </div>

      <div className="card mt-6 border-lf-orange/30 bg-lf-orangeSoft/30">
        <p className="prose-lf text-sm">
          <span className="font-semibold text-lf-charcoal">How this works:</span>{" "}
          fill the lines that apply, save a draft any time, then submit when
          your week is complete. Everything is saved locally in this browser
          until the database is connected.
        </p>
      </div>

      <div className="mt-6">
        <MemberScorecardForm initialTier={initialTier} />
      </div>
    </section>
  );
}
