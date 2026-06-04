import PageHero from "@/components/PageHero";
import AccessNotice from "@/components/AccessNotice";
import ResourceCatalog from "@/components/coaching/ResourceCatalog";
import {
  canViewCoachingResourceCategory,
  coachingResourceCategories,
} from "@/data/coachingResources";
import { getCoachingAccess } from "@/lib/coachingAccess";

export const dynamic = "force-dynamic";
export const metadata = { title: "Resources" };

export default async function ResourcesPage() {
  const access = await getCoachingAccess();

  if (access.status === "not-configured") {
    return (
      <AccessNotice surfaceLabel="Resources" status="not-configured">
        Sign-in setup is not ready in this environment yet.
      </AccessNotice>
    );
  }

  if (access.status === "signed-out") {
    return (
      <AccessNotice surfaceLabel="Resources" status="signed-out">
        The resource library is for approved Loan Factory coaching users.
      </AccessNotice>
    );
  }

  if (access.status === "pending") {
    return (
      <AccessNotice surfaceLabel="Resources" status="pending">
        Your account is signed in, but it is not approved for the coaching
        resource library yet.
      </AccessNotice>
    );
  }

  const visibleCategories = coachingResourceCategories.filter((category) =>
    canViewCoachingResourceCategory(category, access),
  );

  if (visibleCategories.length === 0) {
    return (
      <AccessNotice
        surfaceLabel="Resources"
        status="access-denied"
        roleLabel={access.effectiveRoleLabel}
      >
        Your current role does not include coaching resource library access yet.
      </AccessNotice>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Loan Factory paid coaching"
        title="Coaching resource library"
        body={
          <p>
            Download the coaching packs, open the native coaching tools, and
            keep the paid platform focused on the two programs that matter.
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
        <div className="card border-lf-orange/30 bg-lf-orangeSoft/20">
          <h2 className="h-display text-xl">Source of truth</h2>
          <p className="prose-lf mt-2 text-sm">
            The library is organized from the coaching package in Google Drive.
            Each category opens a native coaching view and offers a generated
            download manifest that lists the included assets.
          </p>
        </div>
      </section>

      <ResourceCatalog
        categories={visibleCategories}
        introTitle="Open the coaching packs."
        introDescription="Each card is coaching-specific, filtered to your approved access, and built around the final coaching asset package."
      />
    </>
  );
}
