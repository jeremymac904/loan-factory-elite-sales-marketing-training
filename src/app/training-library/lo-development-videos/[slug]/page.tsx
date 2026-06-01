import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { getHostBadge, sourceTypeLabel } from "@/components/video-library/hostBadge";
import {
  getLoVideoBySlug,
  loDevelopmentVideoLibrary,
} from "@/data/loDevelopmentVideoLibrary";
import { getLoVideoContent } from "@/data/loDevelopmentVideoContent";

export function generateStaticParams() {
  return loDevelopmentVideoLibrary.map((v) => ({ slug: v.routeSlug }));
}

export default async function LoDevelopmentVideoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const video = getLoVideoBySlug(slug);
  if (!video) notFound();

  const content = getLoVideoContent(video.id);
  const badge = getHostBadge({
    hostingStatus: video.hostingStatus,
    youtubeEmbedUrl: video.youtubeEmbedUrl,
    googleDriveUrl: video.googleDriveUrl,
    youtubeVideoId: video.youtubeVideoId,
  });

  const hasYouTube = Boolean(video.youtubeEmbedUrl || video.youtubeVideoId);
  const hasDrive = !hasYouTube && Boolean(video.googleDriveUrl);
  const keyTopics = content?.keyTopics ?? [];
  const relatedResources = content?.relatedResources ?? [];
  const embedSrc = video.youtubeEmbedUrl ?? (video.youtubeVideoId ? `https://www.youtube.com/embed/${video.youtubeVideoId}` : "");

  return (
    <div>
      <PageHero
        eyebrow="LO Development"
        title={video.title}
        body={content?.summary ?? video.description}
      >
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${badge.className}`}
          >
            {badge.label}
          </span>
          <span className="lf-chip">{sourceTypeLabel(video.sourceType)}</span>
          <span className="lf-chip">{video.category}</span>
          {video.module ? <span className="lf-chip">{video.module}</span> : null}
          {content?.watchTime ? <span className="lf-chip">{content.watchTime}</span> : null}
          <span className="lf-chip">Priority: {video.priority}</span>
        </div>
        <div className="mt-6">
          <Link href="/training-library/lo-development-videos" className="btn-secondary">
            Back to library
          </Link>
        </div>
      </PageHero>

      <div className="container-page section-y">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
          {/* Player + body */}
          <div className="space-y-6">
            {hasYouTube && embedSrc ? (
              <YouTubeEmbed
                src={embedSrc}
                title={video.title}
              />
            ) : hasDrive ? (
              <div className="card flex flex-col items-start gap-3">
                <span className="lf-chip">Google Drive</span>
                <p className="text-sm text-lf-slate">
                  This lesson opens in Google Drive while the YouTube upload is being prepared. It
                  opens in a new tab; access follows your Google Drive permissions.
                </p>
                <a
                  href={video.googleDriveUrl ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Open in Google Drive
                </a>
              </div>
            ) : (
              <div className="card flex flex-col items-start gap-2 border-dashed">
                <span className="lf-chip">{badge.label}</span>
                <p className="text-sm font-semibold text-lf-navy">Video not available yet.</p>
                <p className="text-sm text-lf-slate">
                  {badge.label === "Manual review needed"
                    ? "This lesson has been catalogued from the source library and is flagged for a manual review before it is staged. It will appear here once it has been reviewed and uploaded."
                    : badge.label === "YouTube upload pending"
                      ? "This lesson has been catalogued from the source library and is queued for YouTube upload. The player will appear here once the upload completes."
                      : "This lesson has been catalogued from the source library, but it has not been staged to Google Drive or YouTube yet. The recording will appear here once it is uploaded."}
                </p>
              </div>
            )}

            <section>
              <h2 className="h-display text-lg text-lf-navy">About this lesson</h2>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                {content?.summary ?? video.description}
              </p>
              {content?.whatThisHelpsWith ? (
                <div className="card-compact mt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lf-orange">
                    What this helps with
                  </p>
                  <p className="prose-lf mt-1 text-sm text-lf-slate">{content.whatThisHelpsWith}</p>
                </div>
              ) : null}
            </section>

            {keyTopics.length > 0 ? (
              <section>
                <h2 className="h-display text-lg text-lf-navy">Key topics</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {keyTopics.map((topic) => (
                    <li key={topic} className="lf-chip">
                      {topic}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {content?.nextAction ? (
              <section className="card">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-lf-orange">
                  Next action
                </p>
                <p className="prose-lf mt-1 text-sm text-lf-slate">{content.nextAction}</p>
              </section>
            ) : null}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="card-compact">
              <h3 className="text-sm font-semibold text-lf-navy">Details</h3>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-lf-slate">Format</dt>
                  <dd className="font-medium text-lf-navy">{sourceTypeLabel(video.sourceType)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-lf-slate">Category</dt>
                  <dd className="text-right font-medium text-lf-navy">{video.category}</dd>
                </div>
                {video.module ? (
                  <div className="flex justify-between gap-3">
                    <dt className="text-lf-slate">Module</dt>
                    <dd className="text-right font-medium text-lf-navy">{video.module}</dd>
                  </div>
                ) : null}
                {content?.audience ? (
                  <div className="flex justify-between gap-3">
                    <dt className="text-lf-slate">Audience</dt>
                    <dd className="text-right font-medium text-lf-navy">{content.audience}</dd>
                  </div>
                ) : null}
                <div className="flex justify-between gap-3">
                  <dt className="text-lf-slate">Hosting</dt>
                  <dd className="text-right font-medium text-lf-navy">{badge.label}</dd>
                </div>
              </dl>
            </div>

            {video.relatedLongFormSource || video.relatedTrainingModule ? (
              <div className="card-compact">
                <h3 className="text-sm font-semibold text-lf-navy">Related training</h3>
                <ul className="mt-2 space-y-1 text-sm text-lf-slate">
                  {video.relatedLongFormSource ? (
                    <li>Source recording: {video.relatedLongFormSource}</li>
                  ) : null}
                  {video.relatedTrainingModule ? (
                    <li>Training module: {video.relatedTrainingModule}</li>
                  ) : null}
                </ul>
              </div>
            ) : null}

            {relatedResources.length > 0 ? (
              <div className="card-compact">
                <h3 className="text-sm font-semibold text-lf-navy">Related resources</h3>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-lf-slate">
                  {relatedResources.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {video.markdownPath || video.captionPath ? (
              <div className="card-compact">
                <h3 className="text-sm font-semibold text-lf-navy">Companion files</h3>
                <ul className="mt-2 space-y-1 text-sm text-lf-slate">
                  {video.markdownPath ? <li>Lesson notes (markdown) available</li> : null}
                  {video.captionPath ? <li>Captions (SRT) available</li> : null}
                </ul>
                <p className="mt-2 text-xs text-lf-slate">
                  These companion files are staged in the source library and surface alongside the
                  video once published.
                </p>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </div>
  );
}
