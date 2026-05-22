# Loan Factory Apex Advisor Platform — Overview

This document is the canonical map of the Loan Factory Apex Advisor platform. It is internal and is not borrower facing.

**Old name.** Loan Factory Elite Sales and Marketing Training Series (101 to 601).
**New name.** Loan Factory Apex Advisor Platform.
**Tagline.** Where Top Loan Officers Are Built.

The 101 to 601 course track now lives inside Apex Advisor as the **Apex Advisor Track**. Apex Advisor adds membership tiers, certifications, live events, a mastermind, and a launch campaign.

## Membership tiers

| Tier | Price | Description |
| --- | --- | --- |
| Apex Advisor | $249 per month | Foundation tier. Full Apex Advisor Track, all resource libraries, member area, ACLO eligibility. |
| Apex Advisor Pro | $449 per month | Foundation plus live mastermind calls, direct coaching access, advanced TERA workflows, priority requests, Apex Summit access, Apex Mastermind community. |

Tier data is the single source of truth in `src/data/apex.ts`.

## Platform pages

| Route | Purpose |
| --- | --- |
| `/apex-advisor` | Platform landing page. Hero, what is Apex Advisor, two tiers, platform map. |
| `/apex-advisor-track` | The 101 to 601 foundation course inside Apex Advisor. |
| `/apex-advisor-pro` | Pro tier dedicated page. Live coaching, mastermind, summit. |
| `/apex-member-area` | Members only portal placeholder. Locked content blocks. |
| `/apex-certifications` | Four Apex certifications. How to earn and display. |
| `/apex-calendar` | Monthly Q and A, mastermind, Apex Summit. Placeholder layout. |
| `/apex-leaderboards` | Production (loan count) and activity boards. Sample data. |
| `/apex-mastermind` | Pro tier mastermind community. |
| `/apex-launch-call` | Launch announcement page with email capture placeholder. |
| `/personality-workshop` | Personality Workshop landing page. |
| `/recommended-channels` | 16 outside channels in 3 sections. Educational only. |

## Certifications

| Credential | Requirement |
| --- | --- |
| Apex Certified Loan Officer (ACLO) | Complete the Apex Advisor Track (101 to 601). |
| Apex TERA Power User | Complete the TERA module plus pass the TERA workflow assessment. |
| Apex Marketing Pro | Complete the marketing modules and submit a campaign sample. |
| Apex Advisor Pro Graduate | Complete the Pro coaching curriculum. |

Certifications recognize completion of training and assessments. They are not guarantees of production, income, or business results.

## Live events and community

- Monthly live Q and A for all members.
- Monthly mastermind calls for Pro members.
- Annual Apex Summit for Pro members. Date is TBD.
- Quarterly Personality Workshop live debrief for all members.

## Launch campaign

Launch campaign assets live in `docs/apex-launch/`:

1. `apex-launch-email.md` — primary launch email.
2. `apex-social-linkedin.md` — LinkedIn launch post.
3. `apex-social-facebook.md` — Facebook launch post.
4. `apex-social-instagram.md` — Instagram caption.
5. `apex-onboarding-sequence.md` — 3 email onboarding sequence.
6. `apex-objection-handling.md` — handling common objections.
7. `apex-faqs.md` — FAQ document.

Every launch asset carries a compliance review flag and the disclaimer:
"This content is for informational purposes only. Not a guarantee of results, income, or production."

## Compliance ground rules

- Apex Advisor is a Loan Factory training and development platform.
- Membership, certifications, live coaching, and mastermind access are not guarantees of production, income, or business results.
- Any borrower facing, Realtor facing, or public artifact derived from platform content requires Loan Factory compliance review before use.
- TERA is Loan Factory's loan origination software, point of sale, and CRM platform.
- The platform does not promise an open Loan Factory API. Future technology decisions are documented separately.
- Loan officers are referred to as "LO" or "loan officer". Production leaderboards use loan count only.

## Banned words (do not use anywhere on the platform)

`MOSO`, `ELO`, GoHighLevel recommendation, `CTO`, "daily training", "free processing", "open Loan Factory API", "production guarantee".

## Where things live

- Tier data — `src/data/apex.ts`
- Apex pages — `src/app/apex-*` and `src/app/personality-workshop/`
- Header nav — `src/components/SiteHeader.tsx`
- Homepage teaser — `src/app/page.tsx`
- Launch campaign docs — `docs/apex-launch/`
