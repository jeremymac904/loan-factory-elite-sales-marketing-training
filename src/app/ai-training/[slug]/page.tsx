import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { aiTrainingPaths, aiTrainingVideos } from "@/data/aiTrainingVideos";

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

const weeklyActions: Record<string, string[]> = {
  "gemini-ai-twin": [
    "Write down the tone you want AI to use for your borrower and partner drafts.",
    "Create one safe sample prompt for a past-client follow-up draft.",
    "Review every AI draft before it leaves your desk.",
  ],
  "google-ai-studio": [
    "Sketch one simple AI helper idea you would use every week.",
    "List what the helper should never do.",
    "Bring the idea to LO Development before trying to automate anything.",
  ],
  notebooklm: [
    "Pick one approved training document to summarize.",
    "Turn the summary into five practice questions.",
    "Do not upload borrower files or private loan documents.",
  ],
  "gmail-workspace": [
    "Draft one follow-up email from notes, then rewrite it in your voice.",
    "Create a short action-item list from a meeting recap.",
    "Do not connect Gmail or Drive until OAuth is approved.",
  ],
  "google-business-profile": [
    "Draft one local education post with no rate, payment, or fee language.",
    "Add one real community detail you can verify.",
    "Send public-facing copy through the proper review path.",
  ],
  "social-realtor-marketing": [
    "Pick one Realtor audience and write one helpful post idea.",
    "Turn the idea into a 30-second video outline.",
    "Review claims, tone, and compliance-sensitive language before use.",
  ],
  "custom-gpts": [
    "Decide whether you need a prompt, assistant, Gem, or no AI at all.",
    "Write the one job the tool should do.",
    "Keep private data out unless a future approved policy allows it.",
  ],
  "heygen-ai-video": [
    "Choose one training topic that would be easier as a short video.",
    "Write a 45-second script in plain English.",
    "Do not publish or upload public video without approval.",
  ],
  "ai-safety": [
    "Remove borrower/private details before asking AI for help.",
    "Check every draft for rate, fee, APR, approval, or underwriting claims.",
    "Use AI for drafts only. Human review decides what is used.",
  ],
};

function matchingVideos(slug: string) {
  const path = aiTrainingPaths.find((item) => item.anchor === slug);
  if (!path) return [];

  return aiTrainingVideos
    .filter((video) =>
      [video.category, ...video.tags]
        .join(" ")
        .toLowerCase()
        .includes(path.title.split(" ")[0].toLowerCase()),
    )
    .slice(0, 3);
}

export function generateStaticParams() {
  return aiTrainingPaths.map((path) => ({ slug: path.anchor }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const path = aiTrainingPaths.find((item) => item.anchor === slug);

  return { title: path ? `${path.title} | AI Advantage` : "AI Advantage" };
}

export default async function AITrainingPathPage({ params }: Props) {
  const { slug } = await params;
  const path = aiTrainingPaths.find((item) => item.anchor === slug);

  if (!path) notFound();

  const videos = matchingVideos(slug);
  const actions = weeklyActions[slug] ?? [
    "Pick one safe AI use case.",
    "Try one draft.",
    "Review it before use.",
  ];

  return (
    <>
      <PageHero
        eyebrow="AI Advantage"
        title={path.title}
        body={
          <p>
            {path.description} Use this page to understand the tool, choose a
            safe first action, and avoid sharing private borrower information.
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
            <h2 className="h-display text-2xl">What this helps you do</h2>
            <p className="prose-lf mt-3 text-sm text-lf-slate">
              Use this path to save time on drafting, organizing, reviewing, or
              preparing. It does not replace your judgment, Loan Factory policy,
              or required review.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {path.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-lf-line bg-lf-mist px-3 py-2 text-xs font-semibold text-lf-slate"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
          <article className="card">
            <h2 className="h-display text-2xl">What to do this week</h2>
            <ol className="prose-lf mt-3 list-decimal space-y-2 pl-5 text-sm">
              {actions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ol>
          </article>
        </div>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-14">
          <SectionHeading
            title="Training videos"
            description="Approved YouTube clips will appear here. Until then, use the topic summary and prompts to practice safely."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {(videos.length ? videos : aiTrainingVideos.slice(0, 3)).map((video) => (
              <Link
                key={video.id}
                href={`/ai-training/recordings/${video.id}/`}
                className="card hover:shadow-lift"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                  {video.duration} | Video coming soon
                </p>
                <h3 className="h-display mt-2 text-lg">{video.category}</h3>
                <p className="mt-2 text-sm leading-6 text-lf-slate">
                  {video.topic}
                </p>
                <span className="mt-5 inline-flex text-sm font-semibold text-lf-orange">
                  Open lesson highlights &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="rounded-2xl border border-lf-orange/30 bg-lf-orangeSoft p-5 text-sm leading-6 text-lf-charcoal">
          AI is a draft helper. Do not paste borrower PII, do not make rate,
          APR, fee, approval, underwriting, or compliance approval claims, and
          use human review before anything leaves Loan Factory.
        </div>
      </section>
    </>
  );
}
