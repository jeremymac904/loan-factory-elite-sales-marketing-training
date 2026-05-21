# Loan Factory Elite Sales and Marketing Training Series

A six week training portal for Loan Factory loan officers, 101 through 601.

## What this project is

A static, internal training website that holds the six week Elite Sales and Marketing Training Series. It includes:

1. Three Learner Paths (Beginner, Intermediate, Advanced) that point each user to the right starting point, with a first week day by day plan.
2. Six module pages: 101 Foundation (fully built with Do This Today, scripts, prompt, conversation source list), 201 through 601 (staged with Do This Today, scripts, prompts, roleplays, assignment, tracker, notes wired in).
3. Script Library, AI Prompt Library, Roleplay Library. Every entry carries a skill level tag.
4. Weekly Tracker spec with CSV header export.
5. Coach Guide and Team Leader Guide.
6. Compliance Notes with Reg Z, SAFE Act NMLS display, RESPA Section 8, FFIEC social media guidance, and Loan Factory policy rules.
7. Recordings page with replay placeholders by module.
8. Recommended Channels page. Outside resources worth studying, grouped by category and by level, with a compliance disclaimer.
9. AI Coaching Assistant placeholder page with seven assistant mode cards (Beginner Coach, Sales Roleplay Coach, Script Builder, Content Coach, Pipeline Review Coach, Team Leader Coach, Advanced AI Workflow Coach). No live AI in version one.
10. Audio Training Library at `/audio-training/`. Source grounded audio overviews with native player, skill level tags, suggested use, key takeaways, related modules, and transcript status. Disclaimer pinned to the top of the page.

## Skill level tag system

Modules, scripts, prompts, roleplays, AI assistant modes, and recommended channels carry one or more of:

1. Beginner
2. Intermediate
3. Advanced
4. Team Leader
5. Coach
6. Compliance Review

Tags drive the Learner Paths page and let any user filter what fits where they are.

## Who this is for

1. Loan Factory loan officers running the weekly series.
2. Loan Factory team leaders using the series as their team meeting backbone.
3. Loan Factory corporate coaches teaching modules and scoring calls.
4. Loan Factory leadership reviewing the curriculum before pilot and rollout.

## What is included in version one

1. Static site, no login.
2. Real content for 101 with full agenda, scripts, AI prompts, and assignment.
3. Staged content for 201 through 601 wired from the same data model.
4. Compliance, coach, team leader, tracker, and AI assistant pages.
5. Placeholders for replays and PDF handouts. These are produced and uploaded later.

## Tech stack

1. Next.js 14 (App Router).
2. TypeScript.
3. Tailwind CSS.
4. Static export (`output: "export"`). Deploys cleanly to Netlify or Vercel.
5. No client side data fetching. All content lives in `src/data/*.ts`.

## Local setup

1. Install Node 20 or higher.
2. From this directory:

```
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

## Build command

```
npm run build
```

The static site is exported to `out/`. You can serve it with any static host.

To check types and lint:

```
npm run typecheck
npm run lint
```

## Deploy notes

1. Netlify
   - Build command: `npm run build`
   - Publish directory: `out`
   - Node version: 20

2. Vercel
   - Framework preset: Next.js
   - Vercel will detect static export automatically with the `output: "export"` setting.

Version one is private. Access is controlled by sharing the site link. Do not publish or deploy without Jeremy's approval.

## Content update instructions

All curriculum content lives in `src/data/`:

1. `modules.ts` for module metadata, outcomes, topics, doThisToday, levels, assignment, tracker metrics, coach notes, team leader notes, compliance watch outs.
2. `scripts.ts` for the Script Library entries (with `level`).
3. `prompts.ts` for the AI Prompt Library entries (with `level`).
4. `roleplays.ts` for the Roleplay Library entries (with `level`).
5. `trackerFields.ts` for the weekly tracker form spec and CSV headers.
6. `complianceRules.ts` for the compliance reference content.
7. `paths.ts` for the three Learner Paths (Beginner, Intermediate, Advanced) with curated modules, resources, and a first week day by day plan.
8. `conversationSources.ts` for the beginner Where to find your first 25 conversations source list.
9. `recommendedChannels.ts` for the Recommended Channels page entries.
10. `audioTraining.ts` for the Audio Training Library entries.

## Audio Training

The `/audio-training/` page serves source grounded audio overviews as supplemental training. Files live under `public/audio/`. Transcript placeholders live under `docs/audio-transcripts/`. To add a new file, drop the audio into `public/audio/` with a snake_case filename, add an entry to `src/data/audioTraining.ts`, and add a matching transcript placeholder. The full pipeline is documented in `docs/AUDIO_TRAINING_WORKFLOW.md`.

## Brand assets

Logo files live in `public/images/brand/`:

1. `elite-sales-marketing-training-logo.png` — Elite Sales and Marketing Training logo. Primary brand on this portal. Used in the site header, the homepage hero, and the footer.
2. `loan-factory-logo-transparent.png` — Loan Factory logo. Supporting brand. Used in the homepage hero and the footer at a smaller size than the Elite logo.

The brand hierarchy rule: on this internal training site the Elite training logo always reads larger than the Loan Factory logo. Loan Factory is the supporting brand here.

To replace a logo:

1. Save the new PNG with a transparent background.
2. Overwrite the file at the same path in `public/images/brand/`. Keep the filename.
3. Confirm the result on `/brand-preview/`.

If you want to add a new brand asset, add an entry to `src/data/brandAssets.ts` and reference it through the `BrandImage` component so the aspect ratio is preserved and the asset never stretches.

To add a script, prompt, or roleplay, add an object to the array. The library pages and the module pages will pick it up automatically by `category` and `module`.

To add a recording, drop the file under `public/recordings/` and update the placeholders in the relevant module page.

To add a PDF handout, drop the file under `public/downloads/`, replace the `DownloadPlaceholder` component on the relevant page with a real link.

## Compliance warning

1. This portal is for internal team training only.
2. Borrower facing, Realtor facing, and public artifacts must be reviewed by compliance before any external use.
3. Do not publish, share, or distribute scripts, prompts, or content outside Loan Factory without review.
4. Reg Z triggering terms (specific down payment, payment period, specific payment, specific finance charge) require full disclosures when used in any public message.
5. RESPA Section 8 applies to any partner relationship. No things of value tied to referrals.
6. SAFE Act NMLS ID display is required on advertising and public communications.

## Future roadmap

1. Replace placeholder replays with live session recordings.
2. Replace download placeholders with compliance reviewed PDF handouts.
3. Build the AI Coaching Assistant feature (prep, follow up, roleplay, pipeline review, weekly summary, content drafting).
4. Add a built in weekly tracker form for LOs to submit.
5. Add role based dashboards for LO, team leader, coach, and Jeremy owner admin.
6. Add the second wave of niche playbooks beyond self employed and VA.
7. Pilot 101 through 301 with a single team and refine the back half from pilot data.

## Integration path with Loan Factory AI Advantage

This site is the static version of what will eventually live inside Loan Factory AI Advantage. The handoff is described in `docs/FUTURE_AI_ADVANTAGE_INTEGRATION.md`.

In short, every page here maps to a future AI Advantage surface:

1. Module pages become structured lessons.
2. Library pages become assistant tool surfaces.
3. The tracker becomes a built in form with dashboards by role.
4. Coach and team leader pages become role specific dashboards and review queues.
5. Compliance notes become assistant guardrails baked into every draft.

We do not assume an open Loan Factory API. We do not claim free processing. We do not claim daily training. We do not promise production outcomes.

## Repository

GitHub remote: `https://github.com/jeremymac904/loan-factory-elite-sales-marketing-training.git`

Do not push without Jeremy's approval.
