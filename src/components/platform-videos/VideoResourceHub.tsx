import Link from "next/link";
import {
  getPlatformVideosByType,
  platformVideoLibrary,
  platformVideoStats,
  type PlatformVideoRecord,
  type PlatformVideoType,
} from "@/data/platformVideoLibrary";

type Props = {
  title: string;
  description: string;
  focusSections?: string[];
  initialVideoTypes?: PlatformVideoType[];
};

export default function VideoResourceHub({
  title,
  description,
  focusSections,
  initialVideoTypes = ["long_form", "clip"],
}: Props) {
  const focusedVideos = getFocusedVideos(focusSections, initialVideoTypes);
  const highlightVideos = focusedVideos.slice(0, 8);

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total videos" value={platformVideoStats.total} />
        <StatCard label="Long form" value={platformVideoStats.longForm} />
        <StatCard label="Cutdown clips" value={platformVideoStats.clips} />
        <StatCard label="Manual review" value={platformVideoStats.manualReviewNeeded} />
      </section>

      <section className="rounded-2xl border border-lf-line bg-white p-6 shadow-card">
        <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
          Resource hub
        </p>
        <h2 className="h-display mt-2 text-3xl">{title}</h2>
        <p className="prose-lf mt-3 max-w-4xl text-sm text-lf-slate">
          {description}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/training-library/clips/" className="btn-primary">
            Open video library
          </Link>
          <Link href="/lo-development/video-library/" className="btn-secondary">
            Open long-form source videos
          </Link>
          <Link href="/lo-development/resources/" className="btn-secondary">
            Open LO Development resources
          </Link>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
        <div className="rounded-2xl border border-lf-line bg-white p-5 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
                Focus list
              </p>
              <p className="mt-1 text-sm text-lf-slate">
                Sorted by priority, then by title.
              </p>
            </div>
            <p className="text-sm font-semibold text-lf-charcoal">
              {highlightVideos.length} shown
            </p>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-[860px] w-full border-collapse text-left">
              <thead className="bg-lf-mist/80 text-xs uppercase tracking-wide text-lf-slate">
                <tr>
                  <th className="px-4 py-3 font-semibold">Title</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Section</th>
                  <th className="px-4 py-3 font-semibold">Duration</th>
                  <th className="px-4 py-3 font-semibold">Hosting</th>
                </tr>
              </thead>
              <tbody>
                {highlightVideos.map((video) => (
                  <tr key={video.id} className="border-t border-lf-line">
                    <td className="px-4 py-3 align-top">
                      <p className="text-sm font-semibold text-lf-charcoal">
                        {video.title}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-lf-slate">
                        {video.description}
                      </p>
                    </td>
                    <td className="px-4 py-3 align-top text-sm font-semibold text-lf-charcoal">
                      {video.video_type === "long_form" ? "Long form" : "Cutdown clip"}
                    </td>
                    <td className="px-4 py-3 align-top text-sm text-lf-slate">
                      {video.platform_section}
                    </td>
                    <td className="px-4 py-3 align-top text-sm font-semibold text-lf-charcoal">
                      {video.duration}
                    </td>
                    <td className="px-4 py-3 align-top text-sm text-lf-slate">
                      {displayHostingStatus(video.hosting_status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="space-y-4 rounded-2xl border border-lf-line bg-white p-5 shadow-card">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
              What to do next
            </p>
            <ul className="mt-3 space-y-3 text-sm leading-6 text-lf-charcoal">
              <li>Use the clip library for filtered browsing and pending-hosting review.</li>
              <li>Use the long-form library for source trainings and timestamp reports.</li>
              <li>Keep manual review status visible before any YouTube live promotion.</li>
              <li>Do not invent Google Drive or YouTube URLs when they are missing.</li>
            </ul>
          </div>

          <div className="rounded-xl border border-lf-orange/30 bg-lf-orangeSoft p-4 text-sm leading-6 text-lf-charcoal">
            Drive fallback stays pending until a real Loan Factory Google Drive
            link is confirmed. YouTube automation stays on hold until Jeremy
            approves the batch process.
          </div>

          <div className="rounded-xl border border-lf-line bg-lf-mist/60 p-4 text-sm leading-6 text-lf-slate">
            <p className="font-semibold text-lf-charcoal">Manual review reminder</p>
            <p className="mt-1">
              Compliance flags remain visible. No automated OCR or PII detection
              has been used to clear the clip package.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="card">
      <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold text-lf-navy">{value}</p>
    </div>
  );
}

function getFocusedVideos(
  focusSections: string[] | undefined,
  initialVideoTypes: PlatformVideoType[],
) {
  const typeVideos = initialVideoTypes.length
    ? initialVideoTypes.flatMap((videoType) => getPlatformVideosByType(videoType))
    : platformVideoLibrary;

  const focused = typeVideos.filter((video) => {
    if (!focusSections?.length) return true;
    return focusSections.includes(video.platform_section);
  });

  return [...focused].sort((left, right) => {
    const priorityRank = rankPriority(left.priority) - rankPriority(right.priority);
    if (priorityRank !== 0) return priorityRank;
    return left.title.localeCompare(right.title);
  });
}

function rankPriority(priority: PlatformVideoRecord["priority"]) {
  if (priority === "High") return 0;
  if (priority === "Medium") return 1;
  return 2;
}

function displayHostingStatus(status: PlatformVideoRecord["hosting_status"]) {
  const labels: Record<PlatformVideoRecord["hosting_status"], string> = {
    local_only: "Local only",
    google_drive_pending: "Drive pending",
    google_drive_live: "Drive live",
    youtube_pending: "YouTube pending",
    youtube_live: "YouTube live",
    manual_review_needed: "Manual review",
    source_issue: "Source issue",
  };

  return labels[status];
}
