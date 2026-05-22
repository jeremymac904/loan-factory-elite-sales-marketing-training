# Loan Factory Apex Advisor Platform

**Tagline.** Where Top Loan Officers Are Built.

Apex Advisor is the Loan Factory training and development platform for loan officers. It brings the foundation course (the Apex Advisor Track, 101 through 601), live coaching, certifications, summits, and the Apex Mastermind community into one operating system.

This repository started as the Loan Factory Elite Sales and Marketing Training Series. That curriculum is now the **Apex Advisor Track** inside the broader Apex Advisor platform. All existing 101 to 601 material continues to live at its current routes and is now framed as the foundation course.

## Apex Advisor at a glance

- **Tier 1 — Apex Advisor.** $249 per month. Full Apex Advisor Track, resource libraries, member area, ACLO eligibility.
- **Tier 2 — Apex Advisor Pro.** $449 per month. Everything in Tier 1 plus monthly live mastermind, direct coaching, advanced TERA workflows, priority requests, Apex Summit access, Apex Mastermind community.

Key Apex routes: `/apex-advisor`, `/apex-advisor-track`, `/apex-advisor-pro`, `/apex-member-area`, `/apex-certifications`, `/apex-calendar`, `/apex-leaderboards`, `/apex-mastermind`, `/apex-launch-call`, `/personality-workshop`, `/recommended-channels`.

See `docs/PLATFORM_OVERVIEW.md` for the canonical platform map and `docs/apex-launch/` for the launch campaign assets.

## Compliance ground rules

Apex Advisor is a training and development platform. Membership, certifications, live coaching, and mastermind access are not guarantees of production, income, or business results. Any borrower facing, Realtor facing, or public artifact derived from platform content requires Loan Factory compliance review before use. TERA is Loan Factory's loan origination software, point of sale, and CRM platform.

---

# Loan Factory Elite Sales and Marketing Training Series (legacy framing)

The legacy framing for the foundation course follows. This is now the Apex Advisor Track.

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
9. AI Coaching Assistant placeholder page with seven assistant mode cards (Beginner Coach, Sales Roleplay Coach, Script Builder, Content Coach, Pipeline Review Coach, Team Leader Coach, Advanced AI Workflow Coach). No live AI in version one. Includes the Gemini Gem AI Twin intake callout and a walkthrough video placeholder.
10. Audio Training Library at `/audio-training/`. Source grounded audio overviews with native player, skill level tags, suggested use, key takeaways, related modules, and transcript status. Disclaimer pinned to the top of the page.
11. Role preview login at `/login`. Static role chooser stored in localStorage. Coach Guide and Team Leader Guide are role gated.
12. Brand Preview page at `/brand-preview/`. Logo lockup reference on light and dark.

## Role preview login

Visit `/login` to switch between role previews. Roles include Jeremy McDonald (Owner Admin), Andre King (Leadership), Tara / Kevin / Benjamin (LO Development), Corporate Coach, Team Leader, Loan Officer, and Marketing Reviewer Duyen. The choice is saved in `localStorage` only. There is no real authentication in version one. A small role banner sits at the top of every page so the current preview is always visible. Coach Guide is visible to Owner Admin, Leadership, LO Development, Corporate Coach, and Marketing Reviewer. Team Leader Guide is visible to those roles plus Team Leader. Loan Officer view sees a friendly notice instead.

## Color palette

Brand colors only. Allowed: Loan Factory orange (`lf-orange`), black, dark charcoal (`lf-navy`, `lf-navyDark`, `lf-charcoal`), silver (`lf-slate`), white, and light gray (`lf-mist`, `lf-line`). No blue, green, purple, or pastel colors anywhere on UI chips, badges, buttons, or hover states.

## Hero assets

Background images and videos live in `public/media/`:

1. `dark-hero-background.png` and `light-hero-background.png` for still hero backdrops.
2. `platform-motion-background.mp4`, `dark-premium-AI-workflow.mp4`, `team-leader-website-builder.mp4` for hero motion.
3. `team-marketing-system.png` reserved for future marketing sections.

Heros sit over a charcoal scrim so the headline always reads. Source files are mirrored in `site_background_vids_and_images/` at the project root for archival.

## TERA definition

TERA is Loan Factory's loan origination software, point of sale, and CRM platform. It is not an AI drafting tool. Anywhere on this site that talks about AI drafting refers to the Gemini Gem AI Twin or the planned AI Coaching Assistant.

## Gemini Gem AI Twin

Before using the AI prompts at scale, fill out the Gemini Gem AI Twin intake form: https://forms.gle/wzuBXPS5nXBBe2SC6. The callout appears on the AI Coaching Assistant page, the 101 page, and the AI Prompt Library. A walkthrough video placeholder lives on the AI Coaching Assistant page until Jeremy records it.

## Class Registration and Calendar

Live training classes run every other Thursday at 1 PM Eastern. The 101 page has a Class Registration section with three buttons: Register for Training, View Loan Factory Events, and Loan Factory Homepage. Update the placeholder URLs in `src/lib/externalLinks.ts` once leadership confirms the real links.

## Live vs Coming Soon

Module status reads either `Live` or `Coming Soon`. 101 is `Live`. 201 through 601 are `Coming Soon`. The status badge uses brand orange for `Live` and silver for `Coming Soon`.

## 101 handout status

The 101 handout source lives at `docs/handouts/101_foundation_handout.md` and is also published to `public/downloads/101_foundation_handout.md` so the 101 page can download it. A PDF export is pending design review. The Download button on 101 reads as `Live` and serves the markdown.

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

## Asset Hosting

The static site is code first. Large media assets live in Google Drive, not in this repo. The shared Drive folder for this site is at https://drive.google.com/drive/folders/1Rt8gY1GBIp_0LK_LW_gZY3UVVEptlhTD?usp=sharing. GitHub should not become the video and audio storage system. Drive links are added to `src/data/driveAssets.ts` and to the audio entries in `src/data/audioTraining.ts` as assets are finalized. Full guidance lives in `docs/DRIVE_ASSET_HOSTING.md` and `docs/ASSET_UPLOAD_CHECKLIST.md`. Today the eight audio briefs still play from `public/audio/`; the migration plan is described in those two documents.

## Audio Training

The `/audio-training/` page serves source grounded audio overviews as supplemental training. Audio files live under `public/audio/`. Transcript placeholders live under `docs/audio-transcripts/`. The library currently holds eight audio briefs grouped into four categories:

1. Sales Psychology and Borrower Conversion
2. Referral Partner and Realtor Trust
3. Broker Value Proposition and Guarantee Conversations
4. Training Blueprint and Coaching Strategy

To add a new audio brief:

1. Drop the m4a (or compatible audio) into `public/audio/` with a snake_case filename.
2. Add an entry to `src/data/audioTraining.ts` with title, description, category, skill level, related modules, key takeaways, suggested use, compliance note, and the transcript placeholder path.
3. Add a matching transcript placeholder under `docs/audio-transcripts/` with `Transcript status: Pending`.
4. Reload the dev server. The page picks up the new entry automatically and groups it into the matching category.

The full pipeline is documented in `docs/AUDIO_TRAINING_WORKFLOW.md`.

## Brand assets

Logo files live in `public/images/brand/`:

1. `elite-sales-marketing-training-logo.svg` — Elite Sales and Marketing Training logo. SVG is the primary asset used everywhere on the site so the mark stays crisp at any size.
2. `elite-sales-marketing-training-logo.png` — Transparent PNG fallback. Loaded only if the browser cannot render the SVG (rare on modern browsers).
3. `loan-factory-logo-transparent.png` — Loan Factory logo. Supporting brand. Used in the homepage hero and the footer at a smaller size than the Elite logo.

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
