import Link from "next/link";
import BrandImage from "@/components/BrandImage";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { brandAssets } from "@/data/brandAssets";
import {
  aiTrainingPaths,
  aiTrainingStartHere,
  aiTrainingVideos,
} from "@/data/aiTrainingVideos";

export const metadata = { title: "AI Advantage" };

const driveResources = [
  {
    title: "AI LO Training Drive",
    href: "https://drive.google.com/drive/folders/133w74YcUtK4w8g2Xa8Ttp7j2W7RVw1vz?usp=sharing",
  },
  {
    title: "Jeremy and Andre BD Folder",
    href: "https://drive.google.com/drive/folders/164oRV4Vn1XRh6UTySL52USyXDugfQp6a?usp=sharing",
  },
];

function compactTitle(title: string) {
  return title.replace(" - Recording", "");
}

function clipRange(start: string, end: string) {
  if (!start && !end) return "Timestamp pending";
  return `${start || "?"}-${end || "?"}`;
}

function statusClass(status: string) {
  if (status.includes("Selective")) {
    return "border-lf-line bg-white text-lf-charcoal";
  }

  if (status.includes("Source")) {
    return "border-lf-orange/40 bg-lf-orangeSoft text-lf-orangeDark";
  }

  return "border-lf-orange/40 bg-lf-orange text-white";
}

export default function AITrainingPage() {
  const totalSegments = aiTrainingVideos.reduce(
    (count, video) => count + video.segments.length,
    0,
  );
  const keepSegments = aiTrainingVideos.reduce(
    (count, video) =>
      count + video.segments.filter((segment) => segment.keep).length,
    0,
  );
  return (
    <>
      <PageHero
        title="AI Advantage"
        body={
          <p>
            AI Advantage is the practical AI Training path for Loan Factory
            loan officers: Gemini, NotebookLM, Google Workspace, Google
            Business Profile, AI Twins, content automation, and safe AI
            workflows.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
        overlayOpacity={0.68}
      >
        <div className="mb-6 inline-flex rounded-xl bg-white/95 p-3 shadow-card">
          <BrandImage
            asset={brandAssets["ai-advantage"]}
            heightClass="h-16 md:h-20"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="#start-here" className="btn-primary">
            Start here
          </a>
          <a
            href="#video-library"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            View video library
          </a>
          <a
            href="/prompts/"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            Open prompt library
          </a>
        </div>
      </PageHero>

      <section id="start-here" className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Start here"
              title="The first five AI Advantage lessons every LO should watch."
              description="This path pulls the strongest beginner clips from the timestamp breakdowns so a new loan officer knows exactly where to begin."
            />
            <div className="mt-6 grid gap-3">
              {driveResources.map((resource) => (
                <a
                  key={resource.href}
                  href={resource.href}
                  className="rounded-xl border border-lf-line bg-white p-4 text-sm font-semibold text-lf-charcoal shadow-card transition hover:border-lf-orange hover:text-lf-orange"
                >
                  {resource.title}
                  <span aria-hidden className="ml-2 text-lf-orange">
                    {"->"}
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="grid gap-3">
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
                    Find this clip in the library below, then use the matching
                    micro-lesson queue entry when it is time to cut the training
                    video.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-14">
          <SectionHeading
            eyebrow="Training paths"
            title="Nine practical AI Advantage paths from the timestamp breakdowns"
            description="Each path points loan officers to practical AI skills they can use for drafting, review, planning, and safer daily workflow."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {aiTrainingPaths.map((path) => (
              <article key={path.title} id={path.anchor} className="card">
                <h3 className="h-display text-xl">{path.title}</h3>
                <p className="mt-3 text-sm leading-6 text-lf-slate">
                  {path.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {path.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-lf-line bg-lf-mist px-2.5 py-1 text-xs font-semibold text-lf-slate"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="video-library" className="container-page py-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Full video library"
            title="Seven unique AI training recordings are indexed."
            description={`${totalSegments} timestamped segments are mapped. ${keepSegments} are marked as useful first-watch lessons. Uploaded video links can be added as each lesson is approved.`}
          />
          <div className="rounded-2xl border border-lf-line bg-white p-4 text-sm text-lf-slate shadow-card sm:max-w-sm">
            <strong className="text-lf-navy">How to use this page:</strong>{" "}
            start with the first five lessons, then open the matching recording
            section when you want timestamps.
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
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(
                    video.status,
                  )}`}
                >
                  {video.status}
                </span>
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
                  Top clips
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
                <a href={`#segments-${video.id}`} className="btn-primary">
                  View segments
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page py-14">
        <SectionHeading
          eyebrow="Segment index"
          title="Open each recording to find the useful lessons."
          description="These timestamp notes help loan officers jump to the parts that matter most. Items that are not useful as standalone lessons stay hidden from this page."
        />
        <div className="mt-8 grid gap-4">
          {aiTrainingVideos.map((video) => (
            <details
              key={video.id}
              id={`segments-${video.id}`}
              className="rounded-2xl border border-lf-line bg-white shadow-card"
            >
              <summary className="cursor-pointer list-none p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                      {video.category}
                    </p>
                    <h3 className="h-display text-xl">
                      {compactTitle(video.title)}
                    </h3>
                  </div>
                  <span className="text-sm font-semibold text-lf-charcoal">
                    {video.segments.length} segments
                  </span>
                </div>
              </summary>
              <div className="grid gap-3 border-t border-lf-line p-5">
                {video.segments.filter((segment) => segment.keep).map((segment) => (
                  <article
                    key={segment.id}
                    className="grid gap-4 rounded-xl border border-lf-line bg-lf-mist p-4 lg:grid-cols-[0.35fr_1fr]"
                  >
                    <div>
                      <p className="text-sm font-semibold text-lf-navy">
                        {clipRange(segment.start, segment.end)}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lf-charcoal">
                        {segment.bestStandaloneClipTitle}
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-lf-slate">
                        {segment.whatJeremyCovers || segment.reason}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </details>
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
                Use AI Twin and prompt clips as source concepts for assistant
                starter prompts.
              </p>
            </Link>
            <Link href="/prompts/" className="card p-4 hover:shadow-lift">
              <h3 className="font-semibold text-lf-navy">Prompt Library</h3>
              <p className="mt-2 text-sm leading-6 text-lf-slate">
                Connect Gemini, NotebookLM, and content QA clips to reusable
                prompt practice.
              </p>
            </Link>
            <Link
              href="/training-library/"
              className="card p-4 hover:shadow-lift"
            >
              <h3 className="font-semibold text-lf-navy">Training Library</h3>
              <p className="mt-2 text-sm leading-6 text-lf-slate">
                Future home for published lessons once clips are cut and hosted
                outside GitHub.
              </p>
            </Link>
            <Link href="/assessments/" className="card p-4 hover:shadow-lift">
              <h3 className="font-semibold text-lf-navy">Assessments</h3>
              <p className="mt-2 text-sm leading-6 text-lf-slate">
                Coaching Personality Quiz and New LO Aptitude Quiz to match
                each LO to the right AI training path. Coaching tool only.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
