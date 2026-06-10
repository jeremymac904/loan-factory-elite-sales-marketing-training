import Link from "next/link";
import type { CoachingResourceCategory } from "@/data/coachingResources";

type Props = {
  categories: CoachingResourceCategory[];
  introTitle: string;
  introDescription: string;
};

export default function ResourceCatalog({
  categories,
  introTitle,
  introDescription,
}: Props) {
  return (
    <section className="container-page py-12">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          Coaching resource library
        </p>
        <h2 className="h-display mt-1 text-2xl md:text-3xl">{introTitle}</h2>
        <p className="prose-lf mt-3 text-base text-lf-slate">
          {introDescription}
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <article key={category.id} className="card flex h-full flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                  {category.sourceFolder}
                </span>
                <h3 className="h-display mt-1 text-lg">{category.title}</h3>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                {category.items.length} items
              </span>
            </div>

            <p className="prose-lf text-sm text-lf-slate">{category.description}</p>

            <div className="rounded-xl border border-lf-line bg-lf-mist/50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                Who it is for
              </p>
              <p className="mt-1 text-sm text-lf-charcoal">{category.whoFor}</p>
            </div>

            <ul className="grid gap-2">
              {category.items.slice(0, 3).map((item) => (
                <li key={item.id} className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm">
                  <p className="font-semibold text-lf-charcoal">{item.title}</p>
                  <p className="mt-1 text-xs text-lf-slate">{item.description}</p>
                </li>
              ))}
              {category.items.length > 3 && (
                <li className="text-xs font-semibold text-lf-slate">
                  + {category.items.length - 3} more in the pack
                </li>
              )}
            </ul>

            <div className="mt-auto flex flex-wrap gap-3 pt-2">
              <Link href={category.openHref} className="btn-primary">
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
  );
}

