# Site Architecture

Next.js 16 (App Router) site with TypeScript and Tailwind. Public content lives in typed data files. Supabase handles beta Google Auth, Postgres data, role permissions, and RLS. The app is no longer a static export because OAuth callback routes and session cookies require server-capable Next output.

## Top level layout

1. `src/app/layout.tsx` is the root layout. Loads `globals.css`. Renders `SiteHeader`, the page body, and `SiteFooter`.
2. `src/app/page.tsx` is the home page.
3. Each route lives in `src/app/<slug>/page.tsx`.

## Routes

1. `/` Home (now with the Choose Your Starting Point Path Selector)
2. `/paths/` Learner Paths (Beginner, Intermediate, Advanced)
3. `/training-path/` Training Path (all six modules in sequence)
4. `/101-foundation/` 101 (full build, includes Do This Today, Where to find your first 25 conversations)
5. `/201-borrower-conversion/` 201 (staged, with Do This Today)
6. `/301-referral-partner-growth/` 301 (staged, with Do This Today)
7. `/401-content-and-marketing/` 401 (staged, with Do This Today)
8. `/501-pipeline-and-sales-systems/` 501 (staged, with Do This Today)
9. `/601-elite-execution/` 601 (staged, with Do This Today)
10. `/scripts/` Script Library
11. `/prompts/` AI Prompt Library
12. `/roleplays/` Roleplay Library
13. `/tracker/` Weekly Tracker
14. `/coach-guide/` Coach Guide
15. `/team-leader-guide/` Team Leader Guide
16. `/compliance/` Compliance Notes
17. `/recordings/` Recordings
18. `/recommended-channels/` Recommended Channels (outside resources worth studying)
19. `/ai-coaching-assistant/` AI Coaching Assistant placeholder with seven mode cards
20. `/audio-training/` Audio Training Library (NotebookLM audio overviews and other supplemental audio)
21. `/brand-preview/` Brand Preview (logos on light, logos on dark, recommended lockups)
22. `/login/` Google sign-in through Supabase.
23. `/auth/callback/` Supabase OAuth callback and profile sync.
24. `/auth/sign-out/` Supabase sign-out route.
25. `/access-pending/` Pending or blocked access state.
26. `/admin/` Admin-lite beta page for approved admin users.

## Data files (`src/data/`)

1. `modules.ts` is the single source of truth for module metadata, including `levels` (SkillLevel[]) and `doThisToday` (string[]).
2. `scripts.ts` for the script library. Each entry carries a `level`.
3. `prompts.ts` for the AI prompt library. Each entry carries a `level`.
4. `roleplays.ts` for the roleplay library. Each entry carries a `level`.
5. `trackerFields.ts` for the weekly tracker spec and CSV headers.
6. `complianceRules.ts` for compliance reference rules, the safe content decision tree, and banned content phrases.
7. `paths.ts` for the three Learner Paths (Beginner, Intermediate, Advanced) with focus areas, modules, resources, and a first week day by day plan.
8. `conversationSources.ts` for the beginner conversation source list shown on the 101 page.
9. `recommendedChannels.ts` for the Recommended Channels page entries.
10. `audioTraining.ts` for the Audio Training Library entries and the four audio categories. Each item supports optional `driveUrl`, `downloadUrl`, `hostedLocation`, and `assetStatus`.
11. `brandAssets.ts` for the Elite (SVG primary + PNG fallback) and Loan Factory logo paths, alt text, usage notes, and the brand hierarchy rule.
12. `driveAssets.ts` for the Drive hosted asset registry. Documents the Drive folder URL, the recommended folder structure, and every asset that should migrate to Drive.

The shared external link constants live in `src/lib/externalLinks.ts`. Update that file when the real registration, events, or Loan Factory homepage URLs are confirmed.

Supabase utilities live in `src/lib/supabase/`. `config.ts`, `client.ts`, `server.ts`, and `proxy.ts` implement the public/browser/server session pattern. `admin.ts` is server-only usage for OAuth profile sync with the service role key. `auth.ts` and `session.ts` provide role labels, gate checks, and current-user session lookup.

## Skill level tag system

`src/lib/utils.ts` defines `SkillLevel`:

1. Beginner
2. Intermediate
3. Advanced
4. Team Leader
5. Coach
6. Compliance Review

The `LevelTag` and `LevelTagGroup` components render the tags consistently across module cards, module hero, AI assistant mode cards, recommended channel cards, and the paths page. The tag colors are defined in `skillLevelStyles`.

## Components (`src/components/`)

1. Layout. `SiteHeader`, `SiteFooter`.
2. Module surfaces. `ModuleCard`, `ModuleHero`, `ModuleSummarySections`, `StagedModulePage`.
3. Resources. `ResourceCard`, `ScriptCard`, `PromptCard`, `RoleplayCard`.
4. Building blocks. `ComplianceCallout`, `AssignmentBox`, `DoThisToday`, `RecordingPlaceholder`, `DownloadPlaceholder`, `StatusBadge`, `SectionHeading`.
5. Tagging. `LevelTag`, `LevelTagGroup`.
6. Audio. `AudioTrainingCard`.
7. Brand. `BrandImage` (SVG primary, PNG fallback via `<picture>`, aspect preserved).
8. Heros. `PageHero` (background image or video with charcoal scrim).
9. Auth and access. `HeaderAuthStatus`, `GoogleSignInButton`, `RoleGate`.
10. AI. `GeminiGemCallout`.
11. Live training. `ClassRegistration`.

## Design tokens

Tailwind theme extension in `tailwind.config.ts`:

1. `lf-navy` `#0B1F3A` for headers and hero backgrounds.
2. `lf-orange` `#F26A1F` accent.
3. `lf-charcoal` `#1F2937` for body text.
4. `lf-slate` `#475569` for secondary text.
5. `lf-mist` `#F4F6F8` for soft surfaces.
6. `lf-line` `#E2E8F0` for borders.

## Server-capable Next output

`next.config.mjs` does not set `output: "export"`. Netlify should run `npm run build` and serve the Next app with dynamic routes for `/auth/callback/`, `/auth/sign-out/`, `/admin/`, `/coach-guide/`, and `/team-leader-guide/`.

## Adding a new module

1. Add the module object to `src/data/modules.ts`.
2. Create `src/app/<slug>/page.tsx`.
3. Render either the staged template (`StagedModulePage`) or a custom layout that pulls scripts, prompts, and roleplays filtered by module level.

## Adding a script, prompt, or roleplay

1. Add an object to the relevant data array.
2. Set `module` to the level (101, 201, etc.) so the right module page picks it up.
3. The Script Library, AI Prompt Library, and Roleplay Library pages will index it automatically.

## What lives where

1. Replays. `public/recordings/` (placeholders today).
2. PDF handouts. `public/downloads/` (placeholders today).
3. Images and logos. `public/images/`.

## What this site does not do

1. No Firebase.
2. No TERA reads or writes.
3. No live AI model calls.
4. No analytics or tracking pixels.
5. No outbound sends, social publishing, n8n triggers, or Google Workspace calls.
5. No borrower facing distribution path.
