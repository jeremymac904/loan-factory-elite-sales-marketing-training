import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import TrackerFormsCenter from "@/components/coaching/TrackerFormsCenter";
import { getCoachingAccess } from "@/lib/coachingAccess";

export const dynamic = "force-dynamic";
export const metadata = { title: "Trackers · Member Area" };

export default async function MemberTrackersPage() {
  const access = await getCoachingAccess();

  return (
    <>
      <PageHero
        eyebrow="Paid coaching tools"
        title="Trackers and forms center"
        body={
          <p>
            Draft the weekly rhythm, planning sheets, and coaching forms that
            keep the paid platform simple and actionable.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
      >
        {access.viewingAsLabel && (
          <p className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
            Viewing as: {access.viewingAsLabel}
          </p>
        )}
      </PageHero>

      <section className="container-page py-10">
        <SectionHeading
          eyebrow="Draft only"
          title="Use the live scorecard first, then work the native drafts here."
          description="The weekly scorecard and coach notes already have live pages. The rest of this center is draft-only until a persistence layer is connected."
        />
      </section>

      <section className="container-page pb-14">
        <TrackerFormsCenter access={access} />
      </section>
    </>
  );
}
