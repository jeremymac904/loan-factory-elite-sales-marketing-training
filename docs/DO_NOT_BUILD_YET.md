# DO NOT BUILD YET

**Status:** Active hold list. Any item here requires explicit approval before work begins.
**Owner:** Jeremy McDonald
**Last updated:** 2026-05-21

This is the master exclusion list for the LO Development Platform prototype and the next-48-hour build sprint. Anything on this list is **not** to be built, integrated, claimed, or deployed without explicit approval from Jeremy and (where applicable) Andre, Edward, Victoria, TERA/Ally, or Loan Factory leadership.

If a request looks like it falls into one of these categories, stop and confirm before proceeding.

---

## Auth and identity

- [ ] Real authentication of any kind — no Supabase Auth, no Cognito, no Auth0, no Okta, no Azure AD, no Google OAuth, no custom auth
- [ ] Password storage or hashing
- [ ] Magic-link auth
- [ ] Session cookies tied to a real identity provider
- [ ] SSO integration with TERA
- [ ] Role enforcement in code (the role model is documented, not yet enforced — prototype uses route convention only; `/owner-preview` is obscurity-only, not security)

Prototype access control = the `/owner-preview` route + "do not link from public nav." That is the entire access model until production.

---

## Payments and subscriptions

- [ ] Stripe integration
- [ ] Any checkout flow
- [ ] Subscription management
- [ ] Tier upgrades or downgrades inside the app
- [ ] Billing portal
- [ ] Coupon or promo code logic
- [ ] Refund flows

LO Mastery billing happens **outside** the platform. The platform shows tier benefits and gates content by tier label only — no real billing data.

---

## TERA integration

- [ ] Any live API call to TERA
- [ ] LO data sync from TERA
- [ ] Production data sync from TERA (pipeline, leaderboards, certifications)
- [ ] Any claim that the platform is integrated with TERA
- [ ] Any claim that Loan Factory has an open / public API
- [ ] Importing LO records, borrower records, loan records, or any TERA data

All TERA-shaped data in the prototype is placeholder, clearly labeled.

---

## Database and persistence

- [ ] Supabase tables
- [ ] Postgres / MySQL / SQL Server / DynamoDB / any production database
- [ ] SQL migrations
- [ ] User-generated content storage (tracker entries, roleplay submissions, coaching notes) as persistent server state
- [ ] Server-side analytics events
- [ ] Real-time sync of any kind

Prototype state = typed config files in `src/data/` only. Anything user-entered is form-only and discarded.

---

## External APIs and integrations

- [ ] Live AI calls — Gemini API, Claude API, OpenAI API, or any model provider
- [ ] n8n workflow triggers
- [ ] Gmail / email send integration
- [ ] Webhooks (incoming or outgoing)
- [ ] Slack notifications
- [ ] Google Calendar integration (read or write)
- [ ] NotebookLM API
- [ ] HeyGen API
- [ ] Any vendor or third-party API

If an AI feature is shown, it is a static screenshot, a description, or a CTA to an external tool the LO already uses — never a live call from the platform.

---

## Automated communication

- [ ] Transactional email (welcome, reminder, password reset, etc.)
- [ ] Marketing email sends
- [ ] SMS sends
- [ ] Push notifications
- [ ] Scheduled notifications
- [ ] In-app notification persistence

---

## Deployment

- [ ] Production deployment to `lodevelopment.loanfactory.com`
- [ ] DNS configuration for `lodevelopment.loanfactory.com`
- [ ] Any push to GitHub during the prototype work (per session safety rules)
- [ ] Any deploy to Netlify production
- [ ] Any deploy to Vercel
- [ ] Any deploy to AWS / Azure / GCP

Prototype hosting = Netlify dev URL only, if and when Jeremy chooses to deploy after local review.

---

## Public-facing and recruiting content

- [ ] Publishing recruiting pages without Victoria's marketing review
- [ ] Publishing 1+1=5 campaign or recruiting kits without Victoria's marketing review
- [ ] Publishing any borrower-facing content (the platform is not borrower-facing)
- [ ] Publishing any rate, fee, APR, or pricing display of any kind
- [ ] Publishing any content that implies a production guarantee or income guarantee
- [ ] Publishing any content that claims "free processing" or "daily companywide training"
- [ ] Publishing any content that claims Loan Factory has an open / public API
- [ ] Publishing any content that calls loan officers "ELO" (use "LO" or "loan officer")
- [ ] Using the term "MOSO" anywhere

---

## Data displays

- [ ] Real leaderboard data from TERA (placeholder only in prototype)
- [ ] Real coaching notes from any source (placeholder only)
- [ ] Real member progress data (placeholder only)
- [ ] Real recruiting candidate data (placeholder only)
- [ ] Real coaching membership data (placeholder only)
- [ ] Any personally identifiable information (PII) — borrower names, LO personal data, candidate contact info, etc.

---

## Media and assets

- [ ] Committing large media to GitHub (MP4, M4A, large PDF, large PPT) — Google Drive only
- [ ] Committing HeyGen video files
- [ ] Committing NotebookLM raw outputs (only link to them in Drive)
- [ ] Hosting media on the Netlify deploy directly (use Drive embeds)

Drive master folder: <https://drive.google.com/drive/folders/1Rt8gY1GBIp_0LK_LW_gZY3UVVEptlhTD>

Small images, logos, and brand assets in the repo are fine.

---

## Claims and language

- [ ] "Loan Factory has an open API" — false claim
- [ ] "Free processing" — do not claim
- [ ] "Daily companywide training" — do not claim
- [ ] "Guaranteed production" / "guaranteed income" / "guaranteed growth" — do not claim
- [ ] "ELO" — use "LO" or "loan officer"
- [ ] "MOSO" — do not use
- [ ] Any branded program name not explicitly approved by Loan Factory leadership
- [ ] Any pricing or rate that has not been confirmed by Jeremy
- [ ] Any compliance, NMLS, or state-licensing claim without review

---

## File and repo actions

- [ ] Deleting or overwriting any existing file (per session safety rules)
- [ ] Renaming existing routes (additive-only changes only)
- [ ] Force-pushing
- [ ] Touching `src/components/SiteHeader.tsx` or `src/app/page.tsx` or `src/app/recommended-channels/page.tsx` or `README.md` without confirming with Jeremy (they are already modified-uncommitted)
- [ ] Production builds (`next build`) during prototype work
- [ ] Modifying `package.json` dependencies without coordination

---

## How to override an item

1. Identify the item
2. Identify the approver (Jeremy + relevant stakeholder)
3. Get written approval (Slack, email, or doc)
4. Move the item to a new section at the bottom of this file: `## Approved exceptions` with date and approver
5. Then build

Until then: **do not build it.**
