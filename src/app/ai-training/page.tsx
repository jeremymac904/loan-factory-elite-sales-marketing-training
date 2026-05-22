import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import {
  aiTrainingMicroLessonQueue,
  aiTrainingPaths,
  aiTrainingStartHere,
  aiTrainingVideos,
  duplicateAiTrainingMarkdownFiles,
} from "@/data/aiTrainingVideos";

export const metadata = { title: "AI Training" };

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
  const avoidItems = aiTrainingVideos.flatMap((video) =>
    video.clipsToAvoidOrMerge.slice(0, 3).map((item) => ({
      video: compactTitle(video.title),
      item,
    })),
  );

  return (
    <>
      <PageHero
        title="AI Training"
        body={
          <p>
            Practical AI training for Loan Factory loan officers: Gemini,
            NotebookLM, Google Workspace, Google Business Profile, AI Twins,
            content automation, and safe AI workflows.
          </p>
        }
        backgroundImage="/media/dark-hero-background.png"
        overlayOpacity={0.68}
      >
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
            href="#editing-queue"
            className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
          >
            Editing queue
          </a>
        </div>
      </PageHero>

      <section id="start-here" className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Start here"
              title="The first five AI lessons every LO should watch."
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
            title="Nine practical AI paths from the timestamp breakdowns"
            description="Each path maps to real source clips. No video is embedded here; this is the training structure and editing command center."
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
            description={`${totalSegments} timestamped segments are mapped. ${keepSegments} are marked usable or queued; duplicate May 12 Markdown is excluded.`}
          />
          <div className="rounded-2xl border border-lf-line bg-white p-4 text-sm text-lf-slate shadow-card sm:max-w-sm">
            <strong className="text-lf-navy">Media rule:</strong> large video
            files stay in local storage or Google Drive. GitHub stores metadata,
            docs, timestamps, and source code only.
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
                <a
                  href="#editing-queue"
                  className="btn-secondary"
                  aria-label={`View editing queue entries for ${compactTitle(
                    video.title,
                  )}`}
                >
                  Queue clips
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="editing-queue" className="bg-lf-mist">
        <div className="container-page py-14">
          <SectionHeading
            eyebrow="Micro-lesson editing queue"
            title="Cut these clips first when editing starts."
            description="This queue is metadata only. It gives the future editor source video, timestamp range, title, priority, and suggested output filename."
          />
          <div className="mt-8 overflow-hidden rounded-2xl border border-lf-line bg-white shadow-card">
            <div className="grid gap-0 divide-y divide-lf-line">
              {aiTrainingMicroLessonQueue.map((clip) => (
                <article
                  key={clip.id}
                  className="grid gap-4 p-5 lg:grid-cols-[1fr_0.75fr_0.65fr]"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                      {clip.category} · {clip.status}
                    </p>
                    <h3 className="mt-1 h-display text-lg">
                      {clip.clipTitle}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-lf-slate">
                      {clip.whyItMatters}
                    </p>
                  </div>
                  <div className="text-sm leading-6 text-lf-slate">
                    <p className="font-semibold text-lf-navy">
                      {compactTitle(clip.sourceVideoTitle)}
                    </p>
                    <p>{clipRange(clip.start, clip.end)}</p>
                  </div>
                  <div className="rounded-xl bg-lf-mist p-3 font-mono text-xs leading-5 text-lf-charcoal">
                    {clip.suggestedOutputFilename}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <SectionHeading
          eyebrow="Segment index"
          title="Open each recording to see its timestamp map."
          description="These details come from the Gemini Markdown breakdowns. Segments marked skip or merge are included so editors know what not to cut as standalone clips."
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
                {video.segments.map((segment) => (
                  <article
                    key={segment.id}
                    className="grid gap-4 rounded-xl border border-lf-line bg-lf-mist p-4 lg:grid-cols-[0.45fr_1fr_0.5fr]"
                  >
                    <div>
                      <p className="text-sm font-semibold text-lf-navy">
                        {clipRange(segment.start, segment.end)}
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-lf-orange">
                        {segment.keep ? "Keep" : "Skip or merge"}
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
                    <div className="font-mono text-xs leading-5 text-lf-slate">
                      {segment.suggestedClipFilename}
                    </div>
                  </article>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-14">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <SectionHeading
                eyebrow="Clips to avoid"
                title="Not every timestamp becomes a lesson."
                description="The source breakdowns flagged setup delays, troubleshooting-heavy stretches, and off-topic discussion so the future editing batch stays focused."
              />
              <div className="mt-6 rounded-2xl border border-lf-orange/30 bg-white p-5 shadow-card">
                <h3 className="h-display text-lg">General editing rule</h3>
                <p className="mt-2 text-sm leading-6 text-lf-slate">
                  Avoid dead air, troubleshooting loops, repeated setup delays,
                  and broad off-topic discussion. Keep short guardrail moments
                  only when they help LOs use AI more safely.
                </p>
              </div>
            </div>
            <div className="grid gap-3">
              {avoidItems.slice(0, 8).map((entry) => (
                <article
                  key={`${entry.video}-${entry.item}`}
                  className="rounded-xl border border-lf-line bg-white p-4 shadow-card"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                    {entry.video}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-lf-charcoal">
                    {entry.item}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="grid gap-6 rounded-2xl border border-lf-line bg-lf-navy p-6 text-white shadow-card lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Drive and media note
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold">
              Large video files stay out of GitHub.
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/75">
              The local MP4 recordings should remain in local storage or move to
              Google Drive later. This site exposes the training structure,
              segment map, clip titles, timestamps, and editing priorities only.
            </p>
          </div>
          <div className="rounded-xl bg-white/10 p-4 text-sm leading-6 text-white/80">
            <p>
              <strong className="text-white">Markdown processed:</strong>{" "}
              {aiTrainingVideos.length} canonical breakdowns, with{" "}
              {duplicateAiTrainingMarkdownFiles.length} duplicate excluded.
            </p>
            <p className="mt-2">
              <strong className="text-white">Future setup:</strong> upload one
              canonical MP4 per training to Drive, then add reviewed Drive links
              to the metadata.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="rounded-2xl border border-lf-orange/30 bg-lf-orangeSoft/50 p-6">
          <h2 className="h-display text-2xl">Connected AI resources</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
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
          </div>
        </div>
      </section>
    </>
  );
}
