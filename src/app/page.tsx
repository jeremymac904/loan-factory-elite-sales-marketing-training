import Link from "next/link";
import { redirect } from "next/navigation";
import YouTubeEmbed from "@/components/YouTubeEmbed";

const dashboardModules = [
  {
    title: "Coaching",
    description:
      "Get coaching, accountability, trackers, and member resources through LO Mastery or Loan Factory Alliance.",
    href: "/coaching/",
    cta: "Start with Coaching",
  },
  {
    title: "Sales & Marketing",
    description:
      "Use the 101-601 training path to start more conversations, improve follow-up, and build stronger Realtor relationships.",
    href: "/sales-training/",
    cta: "View Sales & Marketing",
  },
  {
    title: "AI Advantage",
    description:
      "Learn simple ways to use AI for drafts, scripts, marketing ideas, and better daily follow-up.",
    href: "/ai-training/",
    cta: "Explore AI Advantage",
  },
  {
    title: "FaceGram",
    description:
      "Share internal ideas, wins, questions, scripts, videos, and marketing examples with other Loan Factory LOs.",
    href: "/facegram/",
    cta: "Explore",
  },
  {
    title: "AI Assistants",
    description:
      "Ask for help with LO support or marketing drafts. Everything is draft-only until you review it.",
    href: "/ai-assistants/",
    cta: "Explore",
  },
  {
    title: "Resources",
    description:
      "Find support contacts, compliance reminders, recordings, feedback, and manual lender escalation.",
    href: "/resources/",
    cta: "Open",
  },
];

type SearchParams = Record<string, string | string[] | undefined>;

type Props = {
  searchParams?: Promise<SearchParams> | SearchParams;
};

function buildCallbackQuery(params: SearchParams) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, item));
      return;
    }

    if (typeof value === "string") {
      query.set(key, value);
    }
  });

  return query.toString();
}

export default async function HomePage({ searchParams }: Props) {
  const params = searchParams ? await searchParams : {};

  if (typeof params.code === "string" && params.code) {
    const query = buildCallbackQuery(params);
    redirect(`/auth/callback/${query ? `?${query}` : ""}`);
  }

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-lf-line bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div aria-hidden className="absolute inset-0 bg-black/68" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.46)_48%,rgba(0,0,0,0.84)_100%)]"
        />
        <div className="relative container-page grid gap-8 py-12 md:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.55fr)] lg:items-center">
          <div className="max-w-3xl">
            <h1 className="chrome-title font-display text-3xl font-semibold tracking-normal md:text-5xl">
              Loan Factory LO Development
            </h1>
            <p className="mt-3 text-base leading-7 text-white/85 md:text-lg">
              Find the training, scripts, AI help, coaching, and support you
              need to grow your business.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/coaching/" className="btn-primary w-full sm:w-auto">
                Start with Coaching
              </Link>
              <Link
                href="/sales-training/"
                className="btn-secondary w-full border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20 sm:w-auto"
              >
                View Sales &amp; Marketing
              </Link>
              <Link
                href="/ai-training/"
                className="btn-secondary w-full border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20 sm:w-auto"
              >
                Explore AI Advantage
              </Link>
            </div>
          </div>
          <div className="min-w-0 rounded-xl border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Start here
            </p>
            <h2 className="mt-1.5 break-words font-display text-xl font-semibold text-white">
              Pick one area. Take one clear next step.
            </h2>
            <div className="mt-3 grid gap-2 text-sm text-white/82">
              <div className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">
                Need accountability? Start with Coaching.
              </div>
              <div className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">
                Need more conversations? Start Sales & Marketing.
              </div>
              <div className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">
                Need daily help? Use AI Advantage, FaceGram, Assistants, or Resources.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page section-y">
        <article className="grid gap-5 rounded-2xl border border-lf-line bg-white p-4 shadow-card md:grid-cols-[minmax(0,1fr)_minmax(320px,0.92fr)] md:items-center md:p-5">
          <div className="max-w-2xl">
            <h2 className="h-display text-xl md:text-2xl">
              Welcome to the Loan Factory LO Development Platform
            </h2>
            <p className="prose-lf mt-2 text-lf-slate">
              A quick welcome from Thuan, Andre, Edward, and Jeremy on why this
              platform was built and how it helps Loan Factory loan officers
              train, connect, execute, and grow.
            </p>
          </div>
          <YouTubeEmbed
            src="https://www.youtube.com/embed/Ba67qj-6EOE"
            title="Welcome to the Loan Factory LO Development Platform"
          />
        </article>
      </section>

      <section className="relative isolate overflow-hidden section-y">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div aria-hidden className="absolute inset-0 bg-white/90" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(242,106,31,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.92),rgba(245,246,248,0.94))]"
        />
        <div className="relative container-page">
          <div className="flex max-w-3xl flex-col gap-2">
            <h2 className="h-display text-2xl">What do you need today?</h2>
            <p className="prose-lf text-lf-slate">
              Pick one card. Each one takes you to a useful next step without
              extra clutter.
            </p>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dashboardModules.map((module) => (
              <article
                key={module.href}
                className="card-compact flex flex-col gap-3 bg-white/95 transition hover:-translate-y-0.5 hover:shadow-lift"
              >
                <h3 className="metal-title text-xl">{module.title}</h3>
                <p className="prose-lf text-sm text-lf-slate">
                  {module.description}
                </p>
                <Link
                  href={module.href}
                  className="mt-auto inline-flex w-fit items-center rounded-lg bg-lf-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-lf-orange"
                >
                  {module.cta}
                  <span aria-hidden className="ml-2">
                    &rarr;
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
