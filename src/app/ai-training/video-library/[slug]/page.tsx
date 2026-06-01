import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import {
  aiAdvantagePublishedVideos,
  getAiAdvantagePublishedVideo,
} from "@/data/aiAdvantagePublishedVideos";
import {
  aiAdvantageYoutubeEmbeds,
  getAiAdvantageYoutubeEmbedByLessonSlug,
} from "@/data/aiAdvantageYoutubeEmbeds";

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

export function generateStaticParams() {
  const published = aiAdvantagePublishedVideos.map((video) => video.slug);
  const uploaded = aiAdvantageYoutubeEmbeds.map(
    (video) => video.suggestedLessonSlug,
  );

  return [...new Set([...published, ...uploaded])].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const video = getLessonBySlug(slug);

  return {
    title: video ? `${video.title} | AI Advantage` : "AI Advantage Video",
  };
}

export default async function AiAdvantageVideoDetailPage({ params }: Props) {
  const { slug } = await params;
  const video = getLessonBySlug(slug);

  if (!video) notFound();

  if (video.kind === "published") {
    return (
      <>
        <PageHero
          eyebrow="AI Advantage video"
          title={video.title}
          body={
            <p>
              {video.description} Watch the lesson, then choose one practical
              action to test in your own workflow.
            </p>
          }
          backgroundImage="/media/dark-hero-background.png"
          overlayOpacity={0.7}
        >
          <div className="flex flex-wrap gap-3">
            <Link href="/ai-training/video-library/" className="btn-primary">
              Back to video library
            </Link>
            <Link
              href="/prompts/"
              className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
            >
              Open Prompt Library
            </Link>
          </div>
        </PageHero>

        <section className="container-page py-14">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="card p-0">
              <YouTubeEmbed
                src={video.youtubeEmbedUrl}
                title={video.title}
                className="rounded-b-none border-0"
              />
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                  AI Advantage &gt; {video.librarySection}
                </p>
                <h2 className="h-display mt-2 text-2xl">{video.title}</h2>
                <p className="mt-3 text-sm leading-6 text-lf-slate">
                  {video.description}
                </p>
              </div>
            </article>

            <aside className="card">
              <SectionHeading
                title="What to do next"
                description="Keep the action simple so the lesson turns into a useful habit."
              />
              <ol className="prose-lf mt-5 list-decimal space-y-2 pl-5 text-sm">
                <li>Watch the short lesson.</li>
                <li>
                  Write down one {video.librarySection.toLowerCase()} workflow
                  you can improve this week.
                </li>
                <li>Use the Prompt Library to draft a safe first version.</li>
                <li>Review the draft before it leaves your desk.</li>
              </ol>
              <a
                href={video.youtubeVideoUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary mt-6"
              >
                Watch on YouTube
              </a>
            </aside>
          </div>
        </section>

        <section className="container-page pb-16">
          <div className="rounded-2xl border border-lf-orange/30 bg-lf-orangeSoft p-5 text-sm leading-6 text-lf-charcoal">
            AI is a draft helper. Do not paste borrower PII, do not make rate,
            APR, fee, approval, underwriting, or compliance approval claims,
            and use human review before anything leaves Loan Factory.
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="AI Advantage uploaded clip"
        title={video.title}
        body={
          <p>
            {video.module}. Open the internal lesson route, then use the
            viewer if you want to watch it directly inside the platform.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
        overlayOpacity={0.7}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/ai-training/video-library/" className="btn-primary">
            Back to video library
          </Link>
          <Link
            href="/prompts/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            Open Prompt Library
          </Link>
        </div>
      </PageHero>

      <section className="container-page py-14">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="card p-0">
            <YouTubeEmbed
              src={video.youtubeEmbedUrl}
              title={video.title}
              className="rounded-b-none border-0"
            />
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                AI Advantage &gt; {video.module}
              </p>
              <h2 className="h-display mt-2 text-2xl">{video.title}</h2>
              <dl className="mt-5 grid gap-3 text-sm md:grid-cols-2">
                <Meta label="Lesson route" value={video.suggestedLessonPath} />
                <Meta label="Source status" value={formatStatus(video.sourceStatus)} />
                <Meta label="Uploaded" value={formatUploadedAt(video.uploadedAt)} />
                <Meta label="Privacy" value={formatStatus(video.privacy)} />
              </dl>
            </div>
          </article>

          <aside className="card">
            <SectionHeading
              title="What to do next"
              description="Use the internal route first, then open the viewer if you want the clip inside the platform."
            />
            <div className="mt-5 space-y-3 text-sm leading-6 text-lf-charcoal">
              <p>{video.notes}</p>
              {video.sourceIssue && (
                <p className="font-semibold text-lf-orangeDark">
                  Source issue: {video.sourceIssue}
                </p>
              )}
            </div>
            <ol className="prose-lf mt-5 list-decimal space-y-2 pl-5 text-sm">
              <li>Open the lesson route for this clip.</li>
              <li>Use the module browser to find the neighboring lessons.</li>
              <li>Keep the clip unlisted and embed only through the player URL.</li>
              <li>Do not publish it public or enable subscriber notifications.</li>
            </ol>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={video.suggestedLessonPath} className="btn-primary">
                Open source path
              </Link>
              <Link href="/ai-training/video-library/" className="btn-secondary">
                Back to library
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="rounded-2xl border border-lf-orange/30 bg-lf-orangeSoft p-5 text-sm leading-6 text-lf-charcoal">
          Safety note: this AI Advantage clip is unlisted. Use the embed URL
          for the player, do not publish it public, and do not enable
          subscriber notifications.
        </div>
      </section>
    </>
  );
}

function getLessonBySlug(slug: string) {
  const published = getAiAdvantagePublishedVideo(slug);
  if (published) {
    return {
      kind: "published" as const,
      ...published,
    };
  }

  const uploaded = getAiAdvantageYoutubeEmbedByLessonSlug(slug);
  if (uploaded) {
    return {
      kind: "uploaded" as const,
      ...uploaded,
    };
  }

  return undefined;
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
        {label}
      </dt>
      <dd className="mt-1 break-words text-lf-charcoal">{value}</dd>
    </div>
  );
}

function formatUploadedAt(uploadedAt: string) {
  const date = new Date(uploadedAt);
  if (Number.isNaN(date.getTime())) return uploadedAt;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatStatus(value: string) {
  return value
    .trim()
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());
}
