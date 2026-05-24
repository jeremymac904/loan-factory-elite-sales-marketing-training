import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import {
  aiAdvantagePublishedVideos,
  getAiAdvantagePublishedVideo,
} from "@/data/aiAdvantagePublishedVideos";

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

export function generateStaticParams() {
  return aiAdvantagePublishedVideos.map((video) => ({ slug: video.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const video = getAiAdvantagePublishedVideo(slug);

  return {
    title: video ? `${video.title} | AI Advantage` : "AI Advantage Video",
  };
}

export default async function AiAdvantageVideoDetailPage({ params }: Props) {
  const { slug } = await params;
  const video = getAiAdvantagePublishedVideo(slug);

  if (!video) notFound();

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
                {video.rowId} | YouTube | Unlisted
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
              <li>Write down one workflow you can improve this week.</li>
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
          APR, fee, approval, underwriting, or compliance approval claims, and
          use human review before anything leaves Loan Factory.
        </div>
      </section>
    </>
  );
}
