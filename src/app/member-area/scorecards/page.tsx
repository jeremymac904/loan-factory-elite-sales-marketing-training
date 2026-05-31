import Link from "next/link";
import MemberScorecardForm from "@/components/coach/MemberScorecardForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Weekly Scorecard · Member Area" };

// The LO owns their weekly scorecard (Findings #6 / #17). This is the LO's
// INPUT surface — they record their real weekly activity and submit it for
// their coach to review. Saved locally this sprint (no DB write yet).
export default function MemberScorecardsPage() {
  return (
    <section className="container-page py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
            My weekly scorecard
          </p>
          <h1 className="h-display mt-1 text-3xl">Submit this week&apos;s activity</h1>
          <p className="prose-lf mt-2 max-w-2xl text-sm">
            This is your scorecard. Record what you actually did this week — real
            conversations, Realtor activity, past-client touches, pipeline and
            follow-up work, and the commitments you made on your last coaching
            call. Your coach reviews what you submit; they don&apos;t fill it in
            for you.
          </p>
        </div>
        <Link href="/member-area/trackers/" className="btn-secondary text-sm">
          Open trackers
        </Link>
      </div>

      <div className="card mt-6 border-lf-orange/30 bg-lf-orangeSoft/30">
        <p className="prose-lf text-sm">
          <span className="font-semibold text-lf-charcoal">How this works:</span>{" "}
          fill the lines that apply, save a draft any time, then submit when your
          week is complete. Submitting marks your scorecard ready for your coach
          to review in the Coach Command Center.
        </p>
      </div>

      <div className="mt-6">
        <MemberScorecardForm initialTier="lo_mastery" />
      </div>
    </section>
  );
}
