import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CoachCommandNav from "@/components/coach/CoachCommandNav";
import ResourceCatalog from "@/components/coaching/ResourceCatalog";
import { coachingResourceCategories } from "@/data/coachingResources";
import { getCoachAccess } from "@/lib/coachAccess";

export const metadata = { title: "Coach Command Center Resources" };

export default async function CoachCommandCenterResourcesPage() {
  const access = await getCoachAccess();

  return (
    <>
      <PageHero
        eyebrow="Coach Command Center"
        title="Coach resources"
        body={
          <p>
            Use this hub for coach documents, program docs, scripts, trackers,
            review tools, and the presentation pack that keeps the paid
            coaching platform aligned.
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

      <CoachCommandNav
        current="/coach-command-center/resources/"
        showAdmin={access.seesAll}
      />

      <section className="container-page py-10">
        <div className="card border-lf-orange/30 bg-lf-orangeSoft/20">
          <SectionHeading
            eyebrow="Coach-first"
            title="Everything you need to coach the paid programs."
            description="Open the program packs, scripts, trackers, and review tools from one clean coaching hub."
          />
        </div>
      </section>

      <ResourceCatalog
        categories={coachingResourceCategories}
        introTitle="All coaching packs."
        introDescription="Coaches, coaching managers, and admin can see the full library, including the presentation materials and coaching-only tool packs."
      />
    </>
  );
}
