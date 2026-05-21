# UI and UX Review Implementation Checklist

Source: `elite sales and marketing website ui_ux screen shots review.pptx` (9 slides).

Each slide is a screenshot of the site with red annotations. This checklist captures every annotation and tracks its fix.

## Slide 1. Homepage hero

| Annotation | Required fix | Files | Status |
|---|---|---|---|
| Remove header text label `Elite Sales and Marketing Training / 101 through 601` | Drop the text block in the header. Logo is enough. | `src/components/SiteHeader.tsx` | Implemented |
| Need an awesome background video | Add hero background video on the homepage hero. | `src/app/page.tsx`, `public/media/*` | Implemented |
| Loan Factory logo needs to be as big as the Elite logo | Balance both logos at equal weight. Drop the "Powered by" wording. | `src/app/page.tsx`, `src/components/SiteHeader.tsx`, `src/components/SiteFooter.tsx`, `src/app/brand-preview/page.tsx` | Implemented |
| Need admin log in | Add a Login link in the header pointing at `/login`. | `src/components/SiteHeader.tsx`, `src/app/login/page.tsx` | Implemented |

## Slide 2. For coaches and team leaders block

| Annotation | Required fix | Files | Status |
|---|---|---|---|
| This section must be access controlled to team leaders, corporate coaches, LO Development, Jeremy, and Marketing Reviewer | Role preview gates on Coach Guide and Team Leader Guide pages. LO sees a friendly notice. | `src/app/coach-guide/page.tsx`, `src/app/team-leader-guide/page.tsx`, `src/components/RoleGate.tsx`, `src/lib/roles.ts` | Implemented |

## Slide 3. 101 session materials section

| Annotation | Required fix | Files | Status |
|---|---|---|---|
| The 101 Premium PDF Handout cannot be a fake placeholder | Build a real handout source under `docs/handouts/101_foundation_handout.md` and link to it. PDF generated only if clean. | `docs/handouts/101_foundation_handout.md`, `src/app/101-foundation/page.tsx`, `src/components/DownloadPlaceholder.tsx` | Implemented (markdown source; PDF marked pending) |

## Slide 4. 101 page hero

| Annotation | Required fix | Files | Status |
|---|---|---|---|
| Need better hero image or video | Apply a dark hero background image on the 101 hero. | `src/components/ModuleHero.tsx`, `src/app/101-foundation/page.tsx` | Implemented |

## Slide 5. 101 page AI prompt section

| Annotation | Required fix | Files | Status |
|---|---|---|---|
| TERA is Loan Factory's LOS/POS/CRM, not an AI tool. Prompts go into the LO's Gemini Gem AI Twin | Scrub all AI usage references that say TERA. Replace with Gemini Gem AI Twin or AI Coaching Assistant. Keep TERA where the meaning is LOS/POS/CRM. | `src/data/prompts.ts`, `src/data/modules.ts`, `src/data/audioTraining.ts`, `src/app/ai-coaching-assistant/page.tsx`, `src/app/101-foundation/page.tsx` | Implemented |

## Slide 6. 101 page "What happens in the live session"

| Annotation | Required fix | Files | Status |
|---|---|---|---|
| Remove this entire section | Drop the 45 minute agenda block. Replace with Class Registration and Calendar. | `src/app/101-foundation/page.tsx`, `src/components/ClassRegistration.tsx` | Implemented |

## Slide 7. Training Path modules grid

| Annotation | Required fix | Files | Status |
|---|---|---|---|
| Replace `Fully Built` and `Staged` with `Live` / `Coming Soon` | Rename module status labels. Update styling to orange/charcoal/silver only. | `src/lib/utils.ts`, `src/components/StatusBadge.tsx` | Implemented |
| Correct branding on chips and tags | Remove blue, green, purple from level tags and compliance review chip. Use only orange, black, charcoal, silver, white, light gray. | `src/lib/utils.ts`, `src/components/LevelTag.tsx`, `src/components/ComplianceCallout.tsx`, `src/components/StatusBadge.tsx`, `src/components/AudioTrainingCard.tsx` | Implemented |

## Slide 8. Paths page cards

| Annotation | Required fix | Files | Status |
|---|---|---|---|
| Do not use colors that are not in our brand. Only orange, black, silver, white | Same palette cleanup as slide 7. Card meta chips, level tags, hover states. | `src/lib/utils.ts`, `src/app/paths/page.tsx` | Implemented |

## Slide 9. 101 page TERA references

| Annotation | Required fix | Files | Status |
|---|---|---|---|
| Scrub entire site for TERA mentions and either confirm they refer to LOS/CRM/POS or change to Gemini Gem AI Twin | Site-wide scrub. Prompts now route through Gemini Gem AI Twin. TERA only used when the meaning is the Loan Factory platform itself. | All `src/data/*.ts`, all `src/app/*/page.tsx` | Implemented |

## Additional implementation items from the brief

| Item | Required fix | Status |
|---|---|---|
| Header items: Logo, Paths, Modules, Scripts, AI Prompts, Roleplays, Audio Training, Tracker, Login, Start with 101 | Slim the desktop nav to exactly these. Push everything else into a Resources dropdown / footer. | Implemented |
| Role preview login at `/login` with the listed roles | Static role chooser, localStorage backed, visible role banner site-wide. Documented as preview only. | Implemented |
| Hero backgrounds on Home, Paths, 101, Audio Training, Recommended Channels, AI Coaching Assistant | Use the assets in `public/media/` (copied from `site_background_vids_and_images`). | Implemented |
| Gemini Gem AI Twin intake link on AI Coaching Assistant, 101, Prompts | New callout with the form URL and a note that a walkthrough video is coming. | Implemented |
| Gemini Gem walkthrough placeholder | Card on AI Coaching Assistant. | Implemented |
| Update README, SITE_ARCHITECTURE, FUTURE_AI_ADVANTAGE_INTEGRATION | Document role preview, palette, logo balance, hero assets, TERA definition, Gemini Gem link, class registration, Live vs Coming Soon, handout status. | Implemented |
| QA: typecheck, lint, build, route checks | Confirm clean build and all required routes 200. | Implemented |

## Notes

1. Real authentication is intentionally out of scope for version one. The role preview uses localStorage and shows a banner explaining that.
2. The 101 handout is delivered as markdown. PDF export is marked pending so we do not ship a low quality PDF.
3. All curriculum content is unchanged. Only UI, copy, and labels were edited.
