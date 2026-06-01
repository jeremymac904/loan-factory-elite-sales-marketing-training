import Link from "next/link";
import { platformVideoLibrary, type PlatformVideoRecord } from "@/data/platformVideoLibrary";

type Props = {
  title: string;
  description: string;
  section?: string;
  category?: string;
  audience?: string;
  limit?: number;
};

export default function ClipLibraryRail({
  title,
  description,
  section,
  category,
  audience,
  limit = 4,
}: Props) {
  const clips = platformVideoLibrary
    .filter((video) => {
      return (
        video.video_type === "clip" &&
        (!section || video.platform_section === section) &&
        (!category || video.category === category) &&
        (!audience || video.audience.includes(audience))
      );
    })
    .slice(0, limit);

  if (!clips.length) return null;

  const href = buildClipHref({ section, category, audience });

  return (
    <section className="container-page py-12">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
            Training clips
          </p>
          <h2 className="h-display mt-2 text-2xl">{title}</h2>
          <p className="prose-lf mt-2 max-w-3xl text-sm text-lf-slate">
            {description}
          </p>
        </div>
        <Link href={href} className="btn-secondary self-start md:self-auto">
          View related clips
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {clips.map((clip) => (
          <MiniClipCard key={clip.id} clip={clip} />
        ))}
      </div>
    </section>
  );
}

function MiniClipCard({ clip }: { clip: PlatformVideoRecord }) {
  return (
    <Link href="/training-library/clips/" className="card hover:shadow-lift">
      <span className="text-xs font-bold uppercase tracking-wide text-lf-orange">
        {clip.hosting_status === "google_drive_pending"
          ? "Drive pending"
          : "Ready"}
      </span>
      <h3 className="h-display mt-2 text-lg">{clip.title}</h3>
      <p className="prose-lf mt-2 text-sm text-lf-slate">{clip.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-lf-mist px-2.5 py-1 text-xs font-semibold text-lf-slate">
          {clip.duration}
        </span>
        <span className="rounded-full bg-lf-mist px-2.5 py-1 text-xs font-semibold text-lf-slate">
          {clip.priority}
        </span>
      </div>
    </Link>
  );
}

function buildClipHref({
  section,
  category,
  audience,
}: {
  section?: string;
  category?: string;
  audience?: string;
}) {
  const params = new URLSearchParams();
  if (section) params.set("section", section);
  if (category) params.set("category", category);
  if (audience) params.set("audience", audience);
  const query = params.toString();
  return `/training-library/clips/${query ? `?${query}` : ""}`;
}

