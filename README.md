# Loan Factory LO Development Platform

Internal operating platform for Loan Factory loan officers, LO Development,
Training Academy, Loan Officer Support, Corporate Coaches, Marketing, and
approved coaching members.

This repo is the product implementation. AionUI, Codex, Claude, and other agent
tools are execution layers only.

## Current Product Definition

- **Product:** Loan Factory LO Development Platform.
- **Foundation curriculum:** Sales and Marketing 101-601.
- **Paid coaching tiers:** LO Mastery ($249/mo) and Loan Factory Alliance ($449/mo).
- **Execution policy:** local first, preview first, production only with Jeremy approval.
- **Deploy target:** Netlify configuration is present in `netlify.toml`; do not deploy without approval.
- **Auth model:** Supabase-backed Google login for approved users, with beta preview and admin View-As for walkthroughs.

## Core Role Dashboards

- Master Admin: `/admin/`
- LO Development: `/lo-development/`
- Training Academy: `/training-academy/`
- Loan Officer Support: `/loan-officer-support/`
- Corporate Coach: `/coach-command-center/`
- Marketing: `/marketing/`
- LO Mastery member: `/member-area/lo-mastery/`
- Loan Factory Alliance member: `/member-area/alliance/`
- Normal Loan Officer: `/normal-lo/`

## Platform Areas

- Coaching overview: `/coaching/`
- Sales and Marketing 101-601: `/sales-training/`
- AI Advantage: `/ai-training/`
- FaceGram: `/facegram/`
- AI Assistants: `/ai-assistants/`
- Training Library: `/training-library/`
- Content Skills registry: `/content-skills/`
- Department routing: `/department-routing/`
- Support routing: `/support-routing/`
- Launch QA checklist: `/admin/qa-checklist/`

Legacy paid-coaching alias routes are compatibility redirects only. Do not create new
copy, docs, features, or links using deprecated paid-coaching naming.

## Access Model (PERMANENT RULE — see docs/ACCESS_MODEL.md)

This is an **internal Loan Factory platform on a Loan Factory subdomain**, not a public
marketing website and not an app that forces login on every page. A normal Loan Factory
loan officer is already inside the Loan Factory ecosystem and must be able to browse the
informational/training-discovery layer **without an additional app login**.

> **General internal platform pages must remain accessible without an additional app
> login. Authentication is required only for private dashboards, role-specific tools,
> saved user data, admin functions, coaching records, support submissions, AI workspaces,
> and external connected actions.**

- **Public (no extra login):** Home, LO Development overview, Training / Training Library,
  Sales and Marketing (free 101-601), AI Advantage, Coaching, LO Mastery, Loan Factory
  Alliance, Performance Alliance, Inner Circle, Corporate Coaching, Team Leader Coaching,
  FaceGram overview, Support overview, Resources overview.
- **Protected (login required):** Admin / user management / View as / platform status,
  role dashboards, coach dashboards, paid-coaching member dashboards, private scorecards /
  coaching notes / progress, submitted forms, AI assistants + AI Twin workspaces, the
  FaceGram workspace, support submissions, private downloads, and any connected
  email/Gmail/Chat/Calendar/workflow tool.

**Do NOT re-gate the public overview pages.** Full rule + QA list: `docs/ACCESS_MODEL.md`.

## Compliance And Safety Rules

- No unsupported production, income, approval, or business-result guarantees.
- No hype, manifestation framing, or "borrow money to join" framing.
- Borrower-facing, Realtor-facing, recruiting, marketing, or public assets need
  Loan Factory review before use.
- Do not weaken Supabase RLS.
- Do not inspect or print `.env` values or secrets.
- Do not push, deploy, migrate, trigger n8n, call webhooks, mutate Google
  Workspace, or send outbound messages without explicit Jeremy approval.

## Tech Stack

- Next.js 16 App Router.
- React 18.
- TypeScript.
- Tailwind CSS.
- Supabase auth/RLS foundation.
- Netlify build target via `netlify.toml`.

## Local Development

```bash
npm install
npm run dev
```

Open the local URL printed by Next.js. If environment variables are not
configured, auth-dependent routes should fall back to setup, preview, or gated
states rather than reading production secrets.

## Validation

Use these checks before handoff:

```bash
npm run lint
npm run typecheck
npm run build
```

There is no configured unit test runner in this repo right now. Browser QA is
manual: use View-As to walk every role dashboard and confirm the core platform
routes still render.

## Supabase Notes

- Role labels and dashboard destinations live in `src/lib/supabase/auth.ts`.
- Local approved-user seed data lives in `src/data/approvedUsers.ts`.
- SQL migrations live in `supabase/migrations/`.
- RLS must remain enabled. New roles should be additive and should not broaden
  table access beyond the existing permission model.

## Content Skills

The repo includes content-generation rule files in
`loan-factory-content-skills/`. Use `/content-skills/` in the app as the
registry and the markdown files as source rules when creating training,
coaching, PDF, deck, email, video, FaceGram, or AI Advantage assets.
