import Link from "next/link";
import type { ReactNode } from "react";
import {
  PersonaCommunity,
  PersonaTemplate,
  personaComplianceDisclaimer,
} from "@/data/personaIntelligence";

export const personaModuleNav = [
  { label: "Overview", href: "/one-plus-one-five/" },
  { label: "Personas", href: "/one-plus-one-five/personas/" },
  { label: "Communities", href: "/one-plus-one-five/communities/" },
  { label: "Campaign Builder", href: "/one-plus-one-five/campaign-builder/" },
  { label: "Funnel Strategy", href: "/one-plus-one-five/funnel-strategy/" },
  { label: "Realtor Outreach", href: "/one-plus-one-five/realtor-outreach/" },
  { label: "Recruiting", href: "/one-plus-one-five/recruiting/" },
  { label: "AI Boardroom", href: "/one-plus-one-five/ai-boardroom/" },
  { label: "Playbook", href: "/one-plus-one-five/team-leader-playbook/" },
  { label: "Scorecards", href: "/one-plus-one-five/scorecards/" },
];

export function PersonaShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(242,106,31,0.28),transparent_32%),linear-gradient(135deg,#000000_0%,#111111_52%,#2d2d2d_100%)]"
        />
        <div className="relative container-page py-16 md:py-20">
          <h1 className="metal-title-dark max-w-4xl text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/one-plus-one-five/campaign-builder/" className="btn-primary">
              Build campaign plan
            </Link>
            <Link
              href="/one-plus-one-five/communities/"
              className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
            >
              Choose a community
            </Link>
          </div>
        </div>
      </section>
      <PersonaNav />
      {children}
    </>
  );
}

export function PersonaNav() {
  return (
    <section className="border-b border-lf-line bg-white">
      <nav
        aria-label="1+1+1=5 module navigation"
        className="container-page flex gap-2 overflow-x-auto py-3"
      >
        {personaModuleNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-lf-charcoal hover:bg-lf-mist hover:text-lf-orange"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </section>
  );
}

export function ComplianceNotice() {
  return (
    <div className="rounded-2xl border border-lf-orange/30 bg-lf-orangeSoft p-5">
      <h2 className="h-display text-lg">Review required before public use</h2>
      <p className="prose-lf mt-2 text-sm text-lf-slate">
        {personaComplianceDisclaimer}
      </p>
      <ul className="mt-3 grid gap-2 text-sm text-lf-slate md:grid-cols-2">
        <li>Use inclusive language.</li>
        <li>Do not include or exclude borrowers based on protected characteristics.</li>
        <li>Validate community insights locally.</li>
        <li>Compliance review is required before public campaigns.</li>
      </ul>
    </div>
  );
}

export function ListBlock({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <article className="card h-full">
      <h3 className="h-display text-lg">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-lf-slate">
        {items.slice(0, 7).map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lf-orange" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function InlineList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-lf-navy">{title}</h4>
      <ul className="mt-2 space-y-1 text-sm leading-6 text-lf-slate">
        {items.slice(0, 4).map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lf-orange" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TextBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="card h-full">
      <h3 className="h-display text-lg">{title}</h3>
      <div className="prose-lf mt-3 text-sm text-lf-slate">{children}</div>
    </article>
  );
}

export function CommunityCard({ community }: { community: PersonaCommunity }) {
  return (
    <Link
      href={`/one-plus-one-five/communities/${community.slug}/`}
      className="card group flex h-full flex-col gap-4 transition hover:-translate-y-0.5 hover:shadow-lift"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          {community.cluster}
        </p>
        <h3 className="h-display mt-1 text-xl">{community.name}</h3>
      </div>
      <p className="prose-lf text-sm text-lf-slate">
        {community.overview}
      </p>
      <div className="mt-auto flex flex-wrap gap-2 text-xs text-lf-slate">
        {community.languages.slice(0, 3).map((language) => (
          <span key={language} className="rounded-full border border-lf-line px-2 py-1">
            {language}
          </span>
        ))}
      </div>
      <span className="text-sm font-semibold text-lf-navy group-hover:text-lf-orange">
        Open community plan &rarr;
      </span>
    </Link>
  );
}

export function PersonaCard({ persona }: { persona: PersonaTemplate }) {
  return (
    <article className="card flex h-full flex-col gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          {persona.type}
        </p>
        <h3 className="h-display mt-1 text-xl">{persona.title}</h3>
      </div>
      <p className="prose-lf text-sm text-lf-slate">{persona.audience}</p>
      <InlineList title="What they care about" items={persona.careAbout} />
      <InlineList title="Trust triggers" items={persona.trustTriggers} />
      <InlineList title="Suggested campaign ideas" items={persona.campaignIdeas} />
      <p className="rounded-xl border border-lf-line bg-lf-mist p-3 text-sm leading-6 text-lf-slate">
        {persona.complianceReminder}
      </p>
    </article>
  );
}

export function ReadOnlyCallout({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-lf-line bg-lf-mist p-5 text-sm leading-6 text-lf-slate">
      <strong className="text-lf-navy">Planning guardrail:</strong> {children}
    </div>
  );
}
