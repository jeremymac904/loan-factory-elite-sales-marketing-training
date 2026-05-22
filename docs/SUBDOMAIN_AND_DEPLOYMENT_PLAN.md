# Subdomain and Deployment Plan

**Status:** Draft. Final hosting decision pending TERA/Ally team review.
**Owner:** Jeremy McDonald
**Last updated:** 2026-05-21

This document captures the deployment plan for the LO Development Platform across two phases: prototype and production.

---

## Phase 1 — Prototype (today through TERA/Ally review)

**Hosting:** Netlify, on a Netlify-provided URL (e.g. `lo-development-platform-preview.netlify.app`).
**Why Netlify for prototype:** Fast preview deploys per branch, zero infrastructure setup, free SSL, easy rollback via deploy history, no Loan Factory IT involvement required for a non-public URL.

**Custom domain during prototype:** None. The platform must NOT live on `lodevelopment.loanfactory.com` until TERA/Ally and Loan Factory IT approve the subdomain.

**Access control during prototype:**
- Default: password-protected preview via Netlify site password OR
- An `/owner-preview` route that is the de facto admin shell. Not real auth — "security through obscurity" only suitable for an internal preview shared with named reviewers.
- No public LOs invited to the prototype URL until prototype acceptance.

**Auth:** No real authentication. No Supabase Auth, no Cognito, no OAuth. All "gated" surfaces in the prototype are gated by route convention only.

**Database:** No live database. All data is typed config in `src/data/` (TypeScript modules) and markdown content in `docs/`.

**External services:** No live AI calls, no webhooks, no n8n triggers, no Gmail/email sends. Any AI references in the UI are static screenshots, copy, or links — not live integrations.

**Assets:** Google Drive share-link embeds for large media (MP4, M4A, PDFs, PPTs, NotebookLM outputs, HeyGen videos). Drive master folder: <https://drive.google.com/drive/folders/1Rt8gY1GBIp_0LK_LW_gZY3UVVEptlhTD>. Small images and logos in the repo only.

**Rollback during prototype:** Netlify deploy history. Every deploy is a snapshot; one-click rollback to any prior deploy. Git is the source of truth.

---

## Phase 2 — Production (after TERA/Ally alignment)

**Hosting:** TBD. Align with TERA/Ally team decision. Candidate options:
1. Stay on Netlify and integrate via API only — fastest path, lowest ops burden
2. Move to AWS / Azure / GCP — required if Loan Factory IT mandates infrastructure parity with TERA
3. Move to Vercel — alternative if Next.js-specific features (edge functions, ISR) are needed

**Decision criteria:**
- Identity / SSO compatibility with TERA's identity provider
- Network reachability to TERA (private VPC vs. public API)
- Compliance posture (data residency, SOC 2 scope, etc.)
- CI/CD standard alignment

**Subdomain:** `lodevelopment.loanfactory.com`

**DNS:** Owned by Loan Factory IT. Subdomain creation requires:
1. Approval from Loan Factory leadership (platform name and subdomain confirmed)
2. CNAME or A record created by Loan Factory IT pointing to the chosen host
3. Verification of host (Netlify, Vercel, or cloud provider) so SSL can issue

**SSL/TLS:** Automatic via the chosen hosting provider (Netlify, Vercel, or cloud-managed cert). No manual cert management. TLS 1.2+ only, HSTS enabled.

**Auth in production:** Real auth, pending TERA/Ally SSO decision. Most likely options:
- SSO via TERA's identity provider — preferred if available
- Standalone identity provider (Auth0, Cognito) bridged to TERA — fallback
- Magic link or SSO-only invitations — no passwords stored by the platform

**Database in production:** Pending TERA/Ally decision. Options:
- Postgres (managed Supabase, AWS RDS, or Azure DB)
- Shared TERA-managed database with separate schema for LO Development
- Hybrid: read-only access to a TERA data product, writes to a dedicated LO Development database

**Assets in production:** Re-evaluate Google Drive vs. cloud storage (S3, Azure Blob, GCS) once usage patterns and access control needs are clear. Likely outcome: keep Drive for source-of-truth media library, push delivery-optimized assets to a CDN-backed bucket.

**Rollback in production:** Git-based. Every deploy is tied to a commit; rollback = redeploy a prior commit. Database migrations versioned and reversible. Feature flags for risky launches.

**Observability:** TBD — align with TERA/Ally standards. Minimum: error tracking (Sentry or equivalent), uptime monitoring, deploy notifications to a Slack channel.

---

## Environments

| Environment | URL | Purpose | Auth | Data |
|-------------|-----|---------|------|------|
| Local dev | `localhost:3000` | Jeremy's local development | None | Typed data files |
| Preview | Netlify branch URL | Per-branch previews for review | Netlify password or `/owner-preview` route | Typed data files |
| Staging | TBD | Pre-production validation | TBD (SSO) | Snapshot of production-shaped data |
| Production | `lodevelopment.loanfactory.com` | Live for LOs, team leaders, coaches | TBD (SSO) | Production database + Drive media |

---

## Open questions

These are the unresolved deployment questions that block the production phase:

1. **Who owns DNS for `loanfactory.com`?** Need a named contact in Loan Factory IT.
2. **What is the approval chain for creating `lodevelopment.loanfactory.com`?** Likely: Andre → Thuan / Loan Factory leadership → IT ticket. Confirm.
3. **Is the chosen hosting platform required to be inside Loan Factory's cloud account, or can it be a SaaS deployment that talks to Loan Factory APIs?**
4. **Is there a security review required before the subdomain is created (vendor risk, pen test, data classification)?**
5. **What is the change window and deploy cadence expectation?** Internal platforms usually have more freedom than borrower-facing systems, but the standard must be confirmed.

All five questions tracked in [`OPEN_DECISIONS.md`](./OPEN_DECISIONS.md).
