# Module Landing Page Template — LO Development Platform

**Status:** Draft template. Static, prototype-ready. No data fetching.
**Owner:** Jeremy McDonald
**Last updated:** 2026-05-21
**Companion docs:** [`LO_DEVELOPMENT_BRAND_UNIFICATION_PLAN.md`](./LO_DEVELOPMENT_BRAND_UNIFICATION_PLAN.md), [`LO_DEVELOPMENT_PLATFORM_NAVIGATION_PLAN.md`](./LO_DEVELOPMENT_PLATFORM_NAVIGATION_PLAN.md)

A single, reusable template for every module landing page in the platform. Use it for: Apex Advisor, Elite Sales & Marketing, AI Training, 1+1+1=5, Training Library, Team Leader OS, Corporate Coach Hub, AI Assistant Hub, Support Routing, and any future module.

---

## 1. Template sections (top to bottom)

1. **ModuleBanner** — Full-width, dark, module name + tagline + optional CTA. Orange accent stripe.
2. **WhoIsThisFor** — 2–3 column grid of audience cards (LO, Team Leader, Coach, Admin, etc.).
3. **WhatYouGet** — Feature/benefit grid (6–8 items, each with icon, title, short description).
4. **ContentAvailable** — Content list or card grid showing what's in this module (links to sub-routes, Drive assets, or both).
5. **HowItConnects** — 2–3 callouts showing how this module links to other platform areas.
6. **ComingNext** — Timeline or card grid showing planned future additions.
7. **CTAFooter** — Bottom CTA section with orange button and support link.

Section spacing follows the brand unification plan: 80px between sections on desktop, 48px on mobile.

---

## 2. TypeScript props interface

```ts
// src/components/ModuleLandingPage.types.ts

export type AudienceTag = "LO" | "Team Leader" | "Coach" | "Admin" | "Marketing" | "Compliance";

export interface AudienceCardProps {
  tag: AudienceTag;
  title: string;
  description: string;
  iconKey?: string;
}

export interface FeatureProps {
  iconKey?: string;
  title: string;
  description: string;
}

export interface ContentItemProps {
  title: string;
  type: "Audio" | "Script" | "Roleplay" | "Tracker" | "Flashcard" | "Quiz" | "PDF" | "Video" | "Doc" | "Page";
  description: string;
  source: "In-repo" | "Drive" | "External";
  href: string;
}

export interface CrossModuleCalloutProps {
  moduleName: string;
  description: string;
  href: string;
}

export interface ComingNextItemProps {
  title: string;
  eta: string;
  description: string;
}

export interface ModuleLandingPageProps {
  module: {
    name: string;                  // e.g., "Apex Advisor"
    tagline: string;               // e.g., "Where Top Loan Officers Are Built"
    description: string;           // one-paragraph "What it does"
    primaryCta?: { label: string; href: string };
  };
  audiences: AudienceCardProps[];           // 2–3 entries
  features: FeatureProps[];                  // 6–8 entries
  content: ContentItemProps[];               // any number
  connections: CrossModuleCalloutProps[];    // 2–3 entries
  comingNext: ComingNextItemProps[];         // 1–4 entries
  footerCta: { label: string; href: string; supportHref?: string };
}
```

---

## 3. Static React/Next.js template

This is a prototype-ready template. No data fetching, no `use client`, no client-side state. Drop it into `src/components/ModuleLandingPage.tsx` and import it from any module landing page.

```tsx
// src/components/ModuleLandingPage.tsx
import Link from "next/link";
import type { ModuleLandingPageProps } from "./ModuleLandingPage.types";

export default function ModuleLandingPage({
  module,
  audiences,
  features,
  content,
  connections,
  comingNext,
  footerCta,
}: ModuleLandingPageProps) {
  return (
    <main className="bg-[#1A1A1A] text-white">
      {/* 1. ModuleBanner */}
      <section className="w-full bg-black border-b-4 border-[#FF6B00]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-20">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {module.name}
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-[#A0A0A0]">
            {module.tagline}
          </p>
          <p className="mt-8 max-w-3xl text-base md:text-lg leading-relaxed text-white/90">
            {module.description}
          </p>
          {module.primaryCta && (
            <Link
              href={module.primaryCta.href}
              className="inline-block mt-8 bg-[#FF6B00] text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90"
            >
              {module.primaryCta.label}
            </Link>
          )}
        </div>
      </section>

      {/* 2. WhoIsThisFor */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-20">
        <h2 className="text-2xl md:text-3xl font-bold">Who this is for</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {audiences.map((a) => (
            <div
              key={a.tag + a.title}
              className="bg-[#2C2C2C] rounded-xl p-6"
            >
              <div className="text-xs uppercase tracking-widest text-[#FF6B00]">
                {a.tag}
              </div>
              <h3 className="mt-2 text-xl font-semibold">{a.title}</h3>
              <p className="mt-2 text-sm text-[#A0A0A0]">{a.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WhatYouGet */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-20 border-t border-[#2C2C2C]">
        <h2 className="text-2xl md:text-3xl font-bold">What you get</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-[#2C2C2C] rounded-xl p-6 hover:ring-1 hover:ring-[#FF6B00]"
            >
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-[#A0A0A0]">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ContentAvailable */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-20 border-t border-[#2C2C2C]">
        <h2 className="text-2xl md:text-3xl font-bold">What's inside</h2>
        <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.map((c) => (
            <li
              key={c.title}
              className="bg-[#2C2C2C] rounded-xl p-5 flex items-start justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-widest text-[#FF6B00] border border-[#FF6B00] rounded-full px-2 py-0.5">
                    {c.type}
                  </span>
                  <span className="text-xs text-[#A0A0A0]">{c.source}</span>
                </div>
                <h3 className="mt-2 text-base font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-[#A0A0A0]">{c.description}</p>
              </div>
              <Link
                href={c.href}
                className="self-center text-sm font-semibold text-[#FF6B00] hover:underline whitespace-nowrap"
              >
                Open →
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 5. HowItConnects */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-20 border-t border-[#2C2C2C]">
        <h2 className="text-2xl md:text-3xl font-bold">How this connects</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {connections.map((cn) => (
            <Link
              key={cn.moduleName}
              href={cn.href}
              className="block bg-[#2C2C2C] rounded-xl p-6 hover:ring-1 hover:ring-[#FF6B00]"
            >
              <div className="text-xs uppercase tracking-widest text-[#A0A0A0]">
                Connected module
              </div>
              <h3 className="mt-2 text-xl font-semibold">{cn.moduleName}</h3>
              <p className="mt-2 text-sm text-[#A0A0A0]">{cn.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. ComingNext */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-20 border-t border-[#2C2C2C]">
        <h2 className="text-2xl md:text-3xl font-bold">Coming next</h2>
        <ol className="mt-8 space-y-4">
          {comingNext.map((item) => (
            <li
              key={item.title}
              className="bg-[#2C2C2C] rounded-xl p-5 flex items-start gap-4"
            >
              <span className="text-xs uppercase tracking-widest text-[#FF6B00] mt-1 whitespace-nowrap">
                {item.eta}
              </span>
              <div>
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="text-sm text-[#A0A0A0]">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 7. CTAFooter */}
      <section className="w-full bg-black border-t-4 border-[#FF6B00]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Ready to put this to work?
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={footerCta.href}
              className="inline-block bg-[#FF6B00] text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90"
            >
              {footerCta.label}
            </Link>
            {footerCta.supportHref && (
              <Link
                href={footerCta.supportHref}
                className="inline-block border border-[#A0A0A0] text-white font-semibold px-6 py-3 rounded-lg hover:border-[#FF6B00]"
              >
                Get Help
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
```

**Notes on the template:**
- Hex values match the brand unification plan. They are placeholders pending exact Loan Factory hex confirmation.
- No client-side state, no data fetching, no `use client`. Safe to drop into a server component or page.
- Tailwind utility classes only (the repo already uses Tailwind). If a non-Tailwind style approach is preferred, the same structure ports cleanly to CSS Modules.
- Accessibility basics: heading hierarchy, semantic `main`/`section`/`ol`/`ul`, focus-visible expected via Tailwind defaults. Add `aria-label` to anchor groups if needed.

---

## 4. Example usage — Apex Advisor

```tsx
// src/app/apex-advisor/page.tsx
import ModuleLandingPage from "@/components/ModuleLandingPage";

export default function ApexAdvisorPage() {
  return (
    <ModuleLandingPage
      module={{
        name: "Apex Advisor",
        tagline: "Where Top Loan Officers Are Built",
        description:
          "Apex Advisor is Loan Factory's paid coaching program for loan officers who want a structured, accountable path from solid producer to elite producer. Power Hour, Breakfast Club, certifications, leaderboards, mastermind sessions — everything you need to compound your skills and your production.",
        primaryCta: { label: "Explore Apex Track", href: "/apex-advisor-track" },
      }}
      audiences={[
        {
          tag: "LO",
          title: "Producing Loan Officers",
          description:
            "You're already closing loans. Apex helps you compound results with weekly coaching, scripts that work, and accountability that sticks.",
        },
        {
          tag: "LO",
          title: "Apex Pro Members",
          description:
            "Tier 2 members get deeper mastermind access, advanced certifications, and 1:1 coaching touchpoints.",
        },
        {
          tag: "Team Leader",
          title: "Team Leaders",
          description:
            "Bring your team into Apex to align coaching, accountability, and growth on one shared system.",
        },
      ]}
      features={[
        { title: "Power Hour", description: "Weekly high-energy coaching focused on the script of the week." },
        { title: "Breakfast Club", description: "Monthly small-group coaching with peers at your level." },
        { title: "Certifications", description: "Earn certifications that map directly to elite producer skills." },
        { title: "Leaderboards", description: "See where you stand and chase the next tier." },
        { title: "Mastermind", description: "Quarterly mastermind sessions on advanced strategy." },
        { title: "Member Area", description: "Your home base for tier content, schedules, and resources." },
        { title: "Trackers", description: "Lightweight trackers to keep activity and results visible." },
        { title: "Summit Access", description: "Annual Apex Summit invitation for active members." },
      ]}
      content={[
        { title: "Apex Track Overview", type: "Page", description: "Walk through the full Apex Track curriculum.", source: "In-repo", href: "/apex-advisor-track" },
        { title: "Apex Pro Tier", type: "Page", description: "What's included in Tier 2.", source: "In-repo", href: "/apex-advisor-pro" },
        { title: "Certifications", type: "Page", description: "Active certifications and progress.", source: "In-repo", href: "/apex-certifications" },
        { title: "Apex Calendar", type: "Page", description: "Power Hour, Breakfast Club, and Mastermind schedule.", source: "In-repo", href: "/apex-calendar" },
        { title: "Leaderboards", type: "Page", description: "Tier and team standings.", source: "In-repo", href: "/apex-leaderboards" },
        { title: "Mastermind", type: "Page", description: "Mastermind agenda and notes.", source: "In-repo", href: "/apex-mastermind" },
      ]}
      connections={[
        {
          moduleName: "Elite Sales & Marketing",
          description:
            "Apex coaching reinforces the 101–601 curriculum. Drop into Elite content any time.",
          href: "/sales-training",
        },
        {
          moduleName: "AI Assistant Hub",
          description:
            "The Apex Advisor Coach assistant helps you prep for Power Hour and review your certifications.",
          href: "/ai-assistants/apex-advisor-coach",
        },
        {
          moduleName: "Training Library",
          description:
            "Every Apex recording, script, and roleplay shows up in the Training Library catalog.",
          href: "/training-library",
        },
      ]}
      comingNext={[
        { title: "Live Mastermind Recordings", eta: "Q3", description: "Searchable archive of mastermind sessions." },
        { title: "Certification Quiz Engine", eta: "Q3", description: "In-app quizzes for each Apex certification." },
        { title: "Tier Upgrade Flow", eta: "Pending billing decision", description: "Self-serve Tier 1 → Tier 2 upgrade." },
      ]}
      footerCta={{
        label: "Open My Apex Member Area",
        href: "/apex-member-area",
        supportHref: "/support-routing",
      }}
    />
  );
}
```

---

## 5. Reuse plan

This template is the source of truth for module landings. Every one of the 8+ module landings will be authored by:
1. Importing `ModuleLandingPage`
2. Filling in the props
3. Saving to `src/app/<module>/page.tsx`

When the design evolves, the change happens **once in `ModuleLandingPage.tsx`** and every module landing inherits it automatically. That's the unification mechanic.

**Modules this template will be used for:**
- Apex Advisor (`/apex-advisor`)
- Elite Sales & Marketing (`/sales-training`)
- AI Training (`/ai-training`)
- 1+1+1=5 (`/one-plus-one-five`)
- Training Library (`/training-library`)
- Team Leader OS (`/team-leader-os`)
- Corporate Coach Hub (`/corporate-coach-hub`)
- AI Assistant Hub (`/ai-assistants`)
- Support Routing (`/support-routing`)
- Any future module

---

## 6. Open items

- [ ] Confirm exact Loan Factory Orange hex; update the template once locked
- [ ] Confirm typeface stack; update Tailwind config and template once locked
- [ ] Confirm whether existing Apex page should be refactored onto this template now (recommended) or after broader review
- [ ] Confirm icon source (currently template has no icons; add icon system in a follow-up)

---

## Worked Example: Creator Network Landing Page (/creator-network)

Applies the 7-section template to the Creator Network module landing page.

```
ModuleBanner:
  title: "Loan Factory Creator Network"
  tagline: "Where LO Ideas Become Team Playbooks."
  description: "An employee-only internal feed for sharing marketing ideas, scripts, wins, and prompts — all in one place. Internal only. Never public."
  ctaLabel: "Browse the Feed"
  ctaHref: "/creator-network/feed"
  badgeLabel: "Internal Only"

WhoIsThisFor:
  - Loan Officers looking for real scripts and ideas that work
  - Team Leaders who want to surface and share team wins
  - Corporate Coaches sharing prompts, recaps, and strategies
  - Marketing Reviewers overseeing content quality

WhatYouGet:
  - A private internal feed of real LO-tested content
  - 16 content categories from Realtor scripts to AI prompts
  - Ability to save, like, and comment on posts
  - Content Coach AI that repurposes your posts into draft content
  - Audience Quality Panel to check your content before sharing

ContentAvailable:
  - Video scripts, social captions, email templates
  - Referral partner strategies and Realtor scripts
  - AI prompts, objection handling, success stories
  - Training examples and coaching recaps

HowItConnects:
  - Connects to Elite S&M training lessons (101–601)
  - Top posts can become Training Library resources
  - Content Coach repurposes posts for external draft use
  - Team Leader OS tracks engagement and contributions

ComingNext:
  - Post creation with video and image support (Phase 2)
  - Moderation queue and compliance flagging (Phase 3)
  - Content Coach AI integration (Phase 4)

CTAFooter:
  label: "Start Browsing"
  href: "/creator-network/feed"
  note: "Internal Loan Factory team members only. Not accessible to borrowers, Realtors, or external partners."
```
