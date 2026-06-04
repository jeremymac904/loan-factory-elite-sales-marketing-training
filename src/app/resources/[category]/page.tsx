import { notFound } from "next/navigation";
import Link from "next/link";
import AccessNotice from "@/components/AccessNotice";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import {
  canViewCoachingResourceCategory,
  type CoachingResourceCategory,
  getCoachingResourceCategory,
} from "@/data/coachingResources";
import { getCoachingAccess } from "@/lib/coachingAccess";

type Props = {
  params: Promise<{ category: string }>;
};

type ResourceCategoryId = CoachingResourceCategory["id"];

export async function generateMetadata({ params }: Props) {
  const resolved = await params;
  const category = getCoachingResourceCategory(
    resolved.category as ResourceCategoryId,
  );

  return {
    title: category ? `${category.title} Resources` : "Resource Library",
  };
}

export default async function ResourceCategoryPage({ params }: Props) {
  const resolved = await params;
  const category = getCoachingResourceCategory(
    resolved.category as ResourceCategoryId,
  );
  const access = await getCoachingAccess();

  if (!category) {
    notFound();
  }

  if (access.status !== "approved") {
    return (
      <AccessNotice surfaceLabel="Resources" status={access.status}>
        This coaching pack is available to approved Loan Factory coaching
        users.
      </AccessNotice>
    );
  }

  if (!canViewCoachingResourceCategory(category, access)) {
    return (
      <AccessNotice surfaceLabel={category.title} status="access-denied" roleLabel={access.effectiveRoleLabel}>
        Your current access level does not include this coaching pack yet.
      </AccessNotice>
    );
  }

  return (
    <>
      <PageHero
        eyebrow={category.sourceFolder}
        title={category.title}
        body={<p>{category.description}</p>}
        backgroundImage="/media/dark-hero-background.png"
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/resources/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            Back to resources
          </Link>
          <Link
            href={`/api/coaching-resources/${category.id}/download`}
            className="btn-primary"
          >
            Download pack
          </Link>
        </div>
        {access.viewingAsLabel && (
          <p className="mt-4 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
            Viewing as: {access.viewingAsLabel}
          </p>
        )}
      </PageHero>

      <section className="container-page py-10">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card">
            <SectionHeading
              eyebrow="Who it is for"
              title={category.whoFor}
              description="The cards below keep the pack simple: one title, one purpose, one next step."
            />
          </div>
          <div className="card border-lf-orange/30 bg-lf-orangeSoft/20">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orangeDark">
              Native access
            </p>
            <p className="prose-lf mt-2 text-sm">
              Use the open buttons to jump straight to the live coaching tool or
              platform page tied to this pack.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {category.items.map((item) => (
            <article key={item.id} id={item.id} className="card flex scroll-mt-24 flex-col gap-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                    {item.sourceFolder}
                  </span>
                  <h2 className="h-display mt-1 text-lg">{item.title}</h2>
                </div>
                <span className="rounded-full bg-lf-mist px-2.5 py-0.5 text-xs font-semibold text-lf-slate">
                  {item.whoFor}
                </span>
              </div>
              <p className="prose-lf text-sm text-lf-slate">{item.description}</p>
              {item.sourceFileName && (
                <p className="text-xs text-lf-slate">
                  Source file: <span className="font-semibold text-lf-charcoal">{item.sourceFileName}</span>
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-lf-orangeSoft px-2.5 py-1 text-xs font-semibold text-lf-orangeDark"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex flex-wrap gap-3 pt-2">
                <Link href={item.openHref} className="btn-primary">
                  Open
                </Link>
                <Link
                  href={`/api/coaching-resources/${category.id}/download`}
                  className="btn-secondary"
                >
                  Download pack
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
