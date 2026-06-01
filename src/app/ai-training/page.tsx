import Link from "next/link";
import AiAdvantageVideoCard from "@/components/AiAdvantageVideoCard";
import ClipLibraryRail from "@/components/ClipLibraryRail";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import {
  aiAdvantageVideoSectionOrder,
  getAiAdvantagePublishedVideosForSection,
} from "@/data/aiAdvantagePublishedVideos";
import { aiTrainingPaths, aiTrainingStartHere } from "@/data/aiTrainingVideos";
import { marketingTrainingAssets } from "@/data/marketingTrainingAssets";
import {
  aiAdvantageYoutubeEmbedModuleGroups,
  aiAdvantageYoutubeEmbedValidation,
} from "@/data/aiAdvantageYoutubeEmbeds";

export const metadata = { title: "AI Advantage" };

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
            href="/ai-training/video-library/aiadv-001/"
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
            Open video library
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

      <ClipLibraryRail
        title="AI support clip"
        description="Internal LO Development clip metadata connected to the AI Advantage support path."
        section="AI Advantage"
        limit={1}
      />

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
          {aiAdvantageVideoSectionOrder.flatMap((section) =>
            getAiAdvantagePublishedVideosForSection(section).map((video) => (
              <AiAdvantageVideoCard key={video.rowId} video={video} />
            )),
          )}
        </div>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-14">
          <SectionHeading
            eyebrow="Uploaded clips"
            title="Browse the 63 embeddable AI Advantage clips by module."
            description="These clips are all uploaded, unlisted, and safe to embed. Open a module to jump straight into the video library or use the lesson route for the internal viewer."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {aiAdvantageYoutubeEmbedModuleGroups.map((group) => (
              <Link
                key={group.module}
                href={`/ai-training/video-library/#${group.moduleSlug}`}
                className="card group hover:shadow-lift"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                      {group.module}
                    </p>
                    <h3 className="h-display mt-1 text-lg">
                      {group.count} clip{group.count === 1 ? "" : "s"}
                    </h3>
                  </div>
                  <span className="rounded-full bg-lf-orangeSoft px-3 py-1 text-xs font-semibold text-lf-orangeDark">
                    Uploaded
                  </span>
                </div>
                <p className="prose-lf mt-3 text-sm text-lf-slate">
                  Open the module browser for this AI Advantage section.
                </p>
                <p className="mt-4 text-sm font-semibold text-lf-navy group-hover:text-lf-orange">
                  Open module &rarr;
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <MiniStat
              label="Uploaded clips"
              value={aiAdvantageYoutubeEmbedValidation.embeddableRows}
            />
            <MiniStat
              label="Source issues"
              value={aiAdvantageYoutubeEmbedValidation.sourceIssueRows}
            />
            <MiniStat
              label="Modules"
              value={aiAdvantageYoutubeEmbedModuleGroups.length}
            />
          </div>
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

      <section className="container-page py-14">
        <SectionHeading
          eyebrow="Marketing setup tie-ins"
          title="Use AI Advantage with the new marketing assets."
          description="These prompts support the setup lessons without replacing review, compliance judgment, or Loan Factory support."
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {marketingTrainingAssets.map((asset) => (
            <article key={asset.id} className="card">
              <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                {asset.title}
              </p>
              <h3 className="h-display mt-1 text-xl">
                {asset.aiAdvantageTieIn.title}
              </h3>
              <p className="prose-lf mt-2 text-sm text-lf-slate">
                {asset.aiAdvantageTieIn.useCase}
              </p>
              <div className="mt-4 rounded-xl bg-lf-mist p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                  Prompt starter
                </p>
                <p className="prose-lf mt-2 text-sm text-lf-charcoal">
                  {asset.aiAdvantageTieIn.promptStarter}
                </p>
              </div>
              <Link
                href={`/training-library/#${asset.id}`}
                className="mt-5 inline-flex text-sm font-semibold text-lf-orange"
              >
                Open source asset &rarr;
              </Link>
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

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="card">
      <p className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold text-lf-navy">{value}</p>
    </div>
  );
}
