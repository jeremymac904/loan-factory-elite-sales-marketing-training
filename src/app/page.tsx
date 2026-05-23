import Link from "next/link";
import { redirect } from "next/navigation";
import BrandImage from "@/components/BrandImage";
import { BrandAsset, brandAssets } from "@/data/brandAssets";

const dashboardModules = [
  {
    title: "Coaching",
    description:
      "Paid coaching through LO Mastery and Loan Factory Alliance. Start here when you want coaching rhythm, accountability, trackers, and member resources.",
    href: "/coaching/",
    cta: "Start with Coaching",
    logos: ["lo-mastery", "loan-factory-alliance"],
  },
  {
    title: "Sales & Marketing",
    description:
      "The six-part 101 to 601 training series for conversations, referral partners, content, pipeline, and execution.",
    href: "/sales-training/",
    cta: "View Sales & Marketing",
  },
  {
    title: "AI Advantage",
    description:
      "Practical AI training for prompts, draft review, video lessons, and safer daily workflows.",
    href: "/ai-training/",
    cta: "Explore AI Advantage",
    logos: ["ai-advantage"],
  },
  {
    title: "FaceGram",
    description:
      "The internal Loan Factory social feed for posts, groups, training wins, comments, saves, and approved partner previews.",
    href: "/facegram/",
    cta: "Explore",
    logos: ["facegram"],
  },
  {
    title: "AI Assistants",
    description:
      "Two simple draft assistants for LO support and marketing support. Use them for drafts, checklists, and review prep.",
    href: "/ai-assistants/",
    cta: "Explore",
  },
  {
    title: "Resources",
    description:
      "Support contacts, compliance notes, recordings, anonymous suggestions, and manual lender escalation.",
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
        <div className="relative container-page grid gap-10 py-16 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.55fr)] lg:items-center">
          <div className="max-w-3xl">
            <h1 className="chrome-title font-display text-4xl font-semibold tracking-normal md:text-6xl">
              Loan Factory LO Development
            </h1>
            <p className="mt-5 text-lg leading-8 text-white/85 md:text-xl">
              Training, coaching, AI tools, and internal resources for Loan
              Factory loan officers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/coaching/" className="btn-primary">
                Start with Coaching
              </Link>
              <Link
                href="/sales-training/"
                className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
              >
                View Sales &amp; Marketing
              </Link>
              <Link
                href="/ai-training/"
                className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
              >
                Explore AI Advantage
              </Link>
            </div>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
              Start here
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-white">
              Pick one area. Take one action.
            </h2>
            <div className="mt-5 grid gap-3 text-sm text-white/82">
              <div className="rounded-lg border border-white/10 bg-black/25 p-3">
                Coaching for accountability and member resources.
              </div>
              <div className="rounded-lg border border-white/10 bg-black/25 p-3">
                Sales & Marketing for the 101-601 training path.
              </div>
              <div className="rounded-lg border border-white/10 bg-black/25 p-3">
                AI Advantage, FaceGram, Assistants, and Resources for daily help.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="flex max-w-3xl flex-col gap-3">
          <h2 className="h-display text-3xl">Choose your training area.</h2>
          <p className="prose-lf text-lf-slate">
            Pick the card that matches what you need right now. Each area opens
            to training, tools, or resources with no extra dashboard clutter.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {dashboardModules.map((module) => (
            <article
              key={module.href}
              className="card flex min-h-52 flex-col gap-4 transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="h-display text-xl">{module.title}</h3>
                {"logos" in module && module.logos && (
                  <div className="flex shrink-0 items-center gap-2">
                    {(module.logos as BrandAsset["id"][]).map((logo) => (
                      <BrandImage
                        key={logo}
                        asset={brandAssets[logo]}
                        heightClass="h-10"
                        className="rounded-md"
                      />
                    ))}
                  </div>
                )}
              </div>
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
      </section>
    </>
  );
}
