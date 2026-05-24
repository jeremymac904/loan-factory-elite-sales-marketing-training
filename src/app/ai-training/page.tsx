import Link from "next/link";
import AiAdvantageVideoCard from "@/components/AiAdvantageVideoCard";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { aiAdvantagePublishedVideos } from "@/data/aiAdvantagePublishedVideos";
import {
  aiTrainingPaths,
  aiTrainingStartHere,
  aiTrainingVideos,
} from "@/data/aiTrainingVideos";

export const metadata = { title: "AI Advantage" };

function compactTitle(title: string) {
  return title.replace("AI Training", "AI Advantage").replace(" - Recording", "");
}

function clipRange(start: string, end: string) {
  if (!start && !end) return "Key section";
  return `${start || "?"}-${end || "?"}`;
}

export default function AITrainingPage() {
  return (
    <>
      <PageHero
        title="AI Advantage"
        body={
          <p>
            Learn simple ways to use AI for better follow-up, cleaner drafts,
            stronger marketing ideas, and faster prep. AI gives you a draft;
            you still review and decide what to use.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
        overlayOpacity={0.68}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/ai-training/gemini-ai-twin/" className="btn-primary">
            Start with Gemini AI Twin
          </Link>
          <Link
            href="/ai-training/recordings/ai-marketplace-2026-02-11/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            Open first lesson
          </Link>
          <Link
            href="/prompts/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            Open prompt library
          </Link>
          <Link
            href="/ai-training/video-library/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            Watch video lessons
          </Link>
        </div>
      </PageHero>

      <section id="start-here" className="container-page py-14">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeading
            eyebrow="Start here"
            title="Start with these five lessons."
            description="If you are new to AI, start here. These lessons show practical ways to save time without skipping review."
          />
        </div>
        <div className="mx-auto mt-8 grid max-w-5xl gap-3 md:grid-cols-2">
            {aiTrainingStartHere.map((lesson, index) => (
              <article
                key={lesson}
                className="grid gap-4 rounded-2xl border border-lf-line bg-white p-5 shadow-card sm:grid-cols-[auto_1fr]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lf-orange text-sm font-black text-white">
                  {index + 1}
                </div>
                <div>
                  <h3 className="h-display text-lg">{lesson}</h3>
                  <p className="mt-2 text-sm leading-6 text-lf-slate">
                    Find this lesson in the library below, then try one small
                    action the same day.
                  </p>
                </div>
              </article>
            ))}
        </div>
      </section>

      <section className="container-page py-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Published micro-lessons"
            title="AI Advantage video lessons"
            description="These short YouTube lessons are ready to watch inside the platform. Start with one video, try one prompt or workflow, and review every AI draft before use."
          />
          <Link href="/ai-training/video-library/" className="btn-primary">
            Open full video library
          </Link>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {aiAdvantagePublishedVideos.map((video) => (
            <AiAdvantageVideoCard key={video.rowId} video={video} />
          ))}
        </div>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-14">
          <SectionHeading
            eyebrow="Training paths"
            title="Nine practical AI Advantage paths"
            description="Each path teaches one useful way to draft, review, plan, follow up, or create better marketing ideas."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {aiTrainingPaths.map((path) => (
              <Link
                key={path.title}
                id={path.anchor}
                href={`/ai-training/${path.anchor}/`}
                className="card hover:shadow-lift"
              >
                <h3 className="h-display text-xl">{path.title}</h3>
                <p className="mt-3 text-sm leading-6 text-lf-slate">
                  {path.description}
                </p>
                <p className="mt-5 text-sm font-semibold text-lf-orange">
                  Open path &rarr;
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-lf-slate">
                  Good for: {path.tags.join(", ")}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="video-library" className="container-page py-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Full video library"
            title="AI lesson guides and highlights"
            description="Choose a training topic below. Each guide gives you key takeaways, practice ideas, and one next step."
          />
          <div className="rounded-2xl border border-lf-line bg-white p-4 text-sm text-lf-slate shadow-card sm:max-w-sm">
            <strong className="text-lf-navy">How to use this page:</strong>{" "}
            start with one topic, open the lesson highlights, then try one
            prompt or workflow the same week.
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {aiTrainingVideos.map((video) => (
            <article key={video.id} className="card flex flex-col">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                    {video.date} · {video.duration}
                  </p>
                  <h3 className="mt-2 h-display text-xl">
                    {compactTitle(video.title)}
                  </h3>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-lf-charcoal">
                {video.topic}
              </p>
              <p className="mt-3 text-sm leading-6 text-lf-slate">
                <strong className="text-lf-navy">Recommended use:</strong>{" "}
                {video.recommendedUse}
              </p>

              <div className="mt-5">
                <h4 className="text-sm font-semibold text-lf-navy">
                  Lesson highlights
                </h4>
                <ul className="mt-2 space-y-2 text-sm text-lf-slate">
                  {video.bestClipsToCutFirst.slice(0, 3).map((clip) => (
                    <li key={clip.segmentId}>
                      <span className="font-semibold text-lf-charcoal">
                        {clipRange(clip.start, clip.end)}:
                      </span>{" "}
                      {clip.clipTitle}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto flex flex-wrap gap-3 pt-6">
                <Link href={`/ai-training/recordings/${video.id}/`} className="btn-primary">
                  Open lesson guide
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="rounded-2xl border border-lf-orange/30 bg-lf-orangeSoft/50 p-6">
          <h2 className="h-display text-2xl">Connected AI resources</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/ai-assistants/" className="card p-4 hover:shadow-lift">
              <h3 className="font-semibold text-lf-navy">AI Assistants</h3>
              <p className="mt-2 text-sm leading-6 text-lf-slate">
                Ask for help with LO support or marketing drafts.
              </p>
            </Link>
            <Link href="/prompts/" className="card p-4 hover:shadow-lift">
              <h3 className="font-semibold text-lf-navy">Prompt Library</h3>
              <p className="mt-2 text-sm leading-6 text-lf-slate">
                Copy prompts for call prep, follow-up, partner outreach,
                marketing, roleplay, and weekly review.
              </p>
            </Link>
            <Link
              href="/training-library/"
              className="card p-4 hover:shadow-lift"
            >
              <h3 className="font-semibold text-lf-navy">Training Library</h3>
              <p className="mt-2 text-sm leading-6 text-lf-slate">
                Find training pages, scripts, prompts, and review materials.
              </p>
            </Link>
            <Link href="/assessments/" className="card p-4 hover:shadow-lift">
              <h3 className="font-semibold text-lf-navy">Assessments</h3>
              <p className="mt-2 text-sm leading-6 text-lf-slate">
                Use coaching quizzes to pick a better training path. Coaching
                tool only.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
