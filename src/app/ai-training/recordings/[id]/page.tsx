import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { aiTrainingVideos } from "@/data/aiTrainingVideos";

type Props = {
  params: Promise<{ id: string }> | { id: string };
};

function cleanTitle(title: string) {
  return title.replace("AI Training", "AI Advantage").replace(" - Recording", "");
}

function clipRange(start: string, end: string) {
  if (!start && !end) return "Key section";
  return `${start || "?"}-${end || "?"}`;
}

export function generateStaticParams() {
  return aiTrainingVideos.map((video) => ({ id: video.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const video = aiTrainingVideos.find((item) => item.id === id);

  return { title: video ? `${cleanTitle(video.title)} | AI Advantage` : "AI Lesson" };
}

export default async function AIRecordingPage({ params }: Props) {
  const { id } = await params;
  const video = aiTrainingVideos.find((item) => item.id === id);

  if (!video) notFound();

  const highlights = video.segments.filter((segment) => segment.keep);

  return (
    <>
      <PageHero
        eyebrow="AI Advantage lesson"
        title={cleanTitle(video.title)}
        body={
          <p>
            {video.topic} Review the highlights, then pick one practical action
            to try this week.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
        overlayOpacity={0.7}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/ai-training/" className="btn-primary">
            Back to AI Advantage
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
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="card">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              {video.date} | {video.duration} | {video.speaker}
            </p>
            <h2 className="h-display mt-2 text-2xl">Lesson summary</h2>
            <p className="prose-lf mt-3 text-sm text-lf-slate">
              {video.recommendedUse}
            </p>
          </article>
          <article className="card">
            <h2 className="h-display text-2xl">How to use this lesson</h2>
            <p className="prose-lf mt-3 text-sm text-lf-slate">
              Read the highlights, choose one idea, and turn it into a prompt,
              follow-up, or practice action you can review before use.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-14">
          <SectionHeading
            title="Lesson highlights"
            description="These highlights show what to practice and how to apply the lesson this week."
          />
          <div className="mt-8 grid gap-4">
            {highlights.map((segment) => (
              <article
                key={segment.id}
                className="grid gap-4 rounded-2xl border border-lf-line bg-white p-5 shadow-card lg:grid-cols-[0.28fr_1fr]"
              >
                <div>
                  <p className="text-sm font-semibold text-lf-navy">
                    {clipRange(segment.start, segment.end)}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-lf-orange">
                    Practice point
                  </p>
                </div>
                <div>
                  <h3 className="h-display text-lg">
                    {segment.bestStandaloneClipTitle}
                  </h3>
                  <p className="prose-lf mt-2 text-sm text-lf-slate">
                    {segment.whatJeremyCovers || segment.reason}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-lf-charcoal">
                    Action: write down one way this changes your next call,
                    follow-up, post, or weekly review.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
