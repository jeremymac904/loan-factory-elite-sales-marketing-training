import Link from "next/link";
import ModuleCard from "@/components/ModuleCard";
import ResourceCard from "@/components/ResourceCard";
import SectionHeading from "@/components/SectionHeading";
import ComplianceCallout from "@/components/ComplianceCallout";
import { LevelTagGroup } from "@/components/LevelTag";
import BrandImage from "@/components/BrandImage";
import { modules } from "@/data/modules";
import { paths } from "@/data/paths";
import { brandAssets } from "@/data/brandAssets";

export default function HomePage() {
  return (
    <>
      <section className="bg-lf-navy text-white">
        <div className="container-page py-16 md:py-24">
          <div className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="rounded-full bg-lf-orange px-3 py-1 text-xs font-bold uppercase tracking-wide">
                Internal training portal
              </span>
              <h1 className="mt-5 max-w-2xl font-display text-4xl font-semibold tracking-tight md:text-5xl">
                A six week operating system for Loan Factory loan officers.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-white/85">
                Conversations create pipeline. Pipeline creates closings.
                Closings create referrals. This series gives you the simple
                weekly system that makes all of that repeatable, with scripts,
                AI prompts, roleplays, and a tracker you can run starting
                Monday.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/paths/" className="btn-primary">
                  Choose your path
                </Link>
                <Link
                  href="/101-foundation/"
                  className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white"
                >
                  Start with 101
                </Link>
                <Link
                  href="/training-path/"
                  className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white"
                >
                  See the full path
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-white p-6 md:p-8">
              <BrandImage
                asset={brandAssets.elite}
                heightClass="h-44 md:h-52"
              />
              <div className="h-px w-16 bg-lf-line" />
              <div className="flex flex-col items-center gap-2">
                <span className="text-[11px] uppercase tracking-wide text-lf-slate">
                  Powered by
                </span>
                <BrandImage
                  asset={brandAssets["loan-factory"]}
                  heightClass="h-7 md:h-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <SectionHeading
          eyebrow="Choose Your Starting Point"
          title="Three honest options."
          description="Pick the one that matches where you are right now. You can always switch lanes later."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {paths.map((p) => (
            <Link
              key={p.id}
              href={`/paths/#${p.id}`}
              className="card group flex h-full flex-col gap-3 transition hover:shadow-lift"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                  {p.tagline}
                </span>
                <LevelTagGroup levels={[p.level]} />
              </div>
              <h3 className="h-display text-xl">{p.title}</h3>
              <p className="prose-lf text-sm text-lf-slate">
                {p.id === "beginner" &&
                  "New or overwhelmed? Start with Beginner Path."}
                {p.id === "intermediate" &&
                  "Already originating but inconsistent? Start with Intermediate Path."}
                {p.id === "advanced" &&
                  "Leading a team, coaching others, or using AI heavily? Start with Advanced Path."}
              </p>
              <p className="prose-lf text-sm">
                <strong>Goal: </strong>
                {p.goal}
              </p>
              <span className="mt-auto inline-flex items-center text-sm font-semibold text-lf-navy group-hover:text-lf-orange">
                Open this path
                <span
                  aria-hidden
                  className="ml-1 transition group-hover:translate-x-0.5"
                >
                  &rarr;
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="What this series does"
          title="From scattered activity to a clear weekly system."
          description="Built for the brand new LO who feels overwhelmed and the experienced producer who is leaking pipeline. Each week installs one specific behavior, with scripts, AI prompts, roleplays, and a tracker. Practical over theoretical. Broker positive. Compliance aware."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="card">
            <h3 className="h-display text-lg">More conversations.</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              5 to 8 real conversations a day, every day. The number one
              predictor of production for a new LO.
            </p>
          </div>
          <div className="card">
            <h3 className="h-display text-lg">Better conversion.</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Structured first calls, real discovery questions, and a 43 to 57
              talk to listen ratio that builds trust fast.
            </p>
          </div>
          <div className="card">
            <h3 className="h-display text-lg">Stronger partners.</h3>
            <p className="prose-lf mt-2 text-sm text-lf-slate">
              Five named priority Realtors and a partner first meeting flow that
              respects RESPA.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-lf-mist">
        <div className="container-page py-16">
          <SectionHeading
            eyebrow="The path"
            title="101 through 601 in six weeks."
            description="Start with 101. Stay in sequence. Each module adds one specific layer to the system."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((m) => (
              <ModuleCard
                key={m.slug}
                level={m.level}
                title={m.title}
                promise={m.corePromise}
                href={m.href}
                status={m.status}
                levels={m.levels}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <SectionHeading
          eyebrow="Resources"
          title="Everything an LO needs to run the week."
          description="The libraries below sit alongside the modules so you can grab the right tool the minute you need it."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            meta="Scripts"
            title="Script Library"
            description="Borrower, Realtor, partner, listing agent, past client, hook, text, and email scripts. Compliance notes included."
            href="/scripts/"
          />
          <ResourceCard
            meta="AI"
            title="AI Prompt Library"
            description="TERA ready prompts for call prep, follow up, partner outreach, content, roleplay, and weekly review."
            href="/prompts/"
          />
          <ResourceCard
            meta="Practice"
            title="Roleplay Library"
            description="Ten short structured roleplays from cold Realtor outreach to past client check ins."
            href="/roleplays/"
          />
          <ResourceCard
            meta="Audio"
            title="Audio Training Library"
            description="Short source grounded training conversations on sales psychology, the operating system, and the training blueprint."
            href="/audio-training/"
          />
          <ResourceCard
            meta="Tracker"
            title="Weekly Tracker"
            description="Activity, content, partner, follow up, AI usage, and next week commitments."
            href="/tracker/"
          />
          <ResourceCard
            meta="Study"
            title="Recommended Channels"
            description="Outside voices and references worth studying. Grouped by topic and by skill level."
            href="/recommended-channels/"
          />
        </div>
      </section>

      <section className="bg-lf-navy/[0.03]">
        <div className="container-page py-16">
          <SectionHeading
            eyebrow="For coaches and team leaders"
            title="Run the series with your team."
            description="The coach and team leader guides show how to teach, reinforce, review, and hold accountability without overengineering the week."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <ResourceCard
              meta="Coach"
              title="Coach Guide"
              description="How corporate coaches teach the modules, reinforce one behavior a week, and run a clean review rubric."
              href="/coach-guide/"
            />
            <ResourceCard
              meta="Team leader"
              title="Team Leader Guide"
              description="A clean weekly cadence: Monday kickoff, Wednesday roleplay, Friday production review."
              href="/team-leader-guide/"
            />
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <SectionHeading
          eyebrow="What is coming"
          title="A future AI coaching assistant."
          description="In version one, this site is the static training hub. The AI coaching assistant is a placeholder, with planned capabilities documented for the team."
        />
        <div className="mt-6">
          <ResourceCard
            meta="Preview"
            title="AI Coaching Assistant (planned)"
            description="Future role: call prep, follow up drafts, roleplay, pipeline review, weekly accountability summary, and content drafting, all aligned to the modules."
            href="/ai-coaching-assistant/"
          />
        </div>
      </section>

      <section className="container-page pb-20">
        <ComplianceCallout title="Internal use only" variant="default">
          <p>
            This portal is for Loan Factory team training. Borrower facing,
            Realtor facing, and public artifacts must be reviewed by compliance
            before use. Do not publish anything in this site outside the
            company.
          </p>
        </ComplianceCallout>
      </section>
    </>
  );
}
