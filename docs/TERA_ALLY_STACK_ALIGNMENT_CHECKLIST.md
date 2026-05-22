# TERA/Ally Stack Alignment Checklist

**Status:** Draft — please review with the TERA/Ally team and return answers.
**Owner:** Jeremy McDonald
**Audience:** TERA/Ally team (stack and integration partners)
**Last updated:** 2026-05-21

The LO Development Platform intends to share TERA's identity model, hosting approach, and integration standards. This checklist captures the questions and decisions needed from the TERA/Ally team before final architecture decisions are locked in.

**How to use:** Answer each item, replace `[ ]` with `[x]` once decided, and note any constraints alongside the answer. Items left open will appear in [`OPEN_DECISIONS.md`](./OPEN_DECISIONS.md).

**Reminder on terminology:** TERA = Loan Factory's loan origination software, point of sale, and CRM. We use "LO" or "loan officer" — never "ELO." There is no public Loan Factory API.

---

## Frontend

- [ ] What frontend framework does TERA/Ally use (React, Next.js, Vue, other)?
- [ ] Is there a shared component library or design system the LO Development Platform should adopt?
- [ ] Are there brand/color standards beyond the official Loan Factory style guide (orange / black / charcoal / silver / white / light gray)?
- [ ] Are there shared layout primitives (header, sidebar, footer, modal) the platform should reuse?
- [ ] Is there a shared icon library or icon system?
- [ ] What is the preferred CSS approach (Tailwind, CSS Modules, styled-components, vanilla CSS)?
- [ ] Are there accessibility (a11y) standards beyond WCAG AA the platform must meet?

---

## Backend

- [ ] What backend language/framework is in use (Node, Python, Go, .NET, Java, other)?
- [ ] Is there a shared API gateway or BFF pattern in front of TERA services?
- [ ] REST or GraphQL?
- [ ] What schema standards do you use (OpenAPI, JSON Schema, protobuf)?
- [ ] Is there a shared SDK or client library for talking to TERA?
- [ ] What are the auth, rate limit, and idempotency conventions for API calls?
- [ ] Are there shared background-job or queue patterns (n8n, SQS, Pub/Sub, custom)?

---

## Auth and Identity

- [ ] What identity provider does TERA use (Cognito, Auth0, Supabase, Okta, Azure AD, other)?
- [ ] Is SSO available or planned for third-party platforms inside Loan Factory?
- [ ] What user roles exist in TERA that LO Development needs to mirror?
- [ ] How are LO records provisioned, updated, and deactivated?
- [ ] Is there an existing JWT / session standard we should adopt?
- [ ] What are the password, MFA, and session-timeout standards?
- [ ] Can the LO Development Platform receive role/team metadata at sign-in, or does it need to call back to TERA?

---

## Hosting and Deployment

- [ ] What hosting infrastructure does TERA/Ally use (AWS, Azure, GCP, other)?
- [ ] Is Netlify acceptable for prototype hosting during development?
- [ ] What is the subdomain management process for `lodevelopment.loanfactory.com`?
- [ ] Who owns DNS for `loanfactory.com` and what is the change request process?
- [ ] Is there a CI/CD standard (GitHub Actions, GitLab CI, Azure DevOps, CodePipeline)?
- [ ] Are there required pre-deploy checks (security scan, license scan, lint gates)?
- [ ] What are the staging and production environment expectations?
- [ ] Are there observability standards (logging, metrics, tracing) the platform should adopt?
- [ ] What is the on-call / incident response expectation for an internal platform?

---

## Database and Storage

- [ ] What database does TERA use (Postgres, MySQL, SQL Server, DynamoDB, other)?
- [ ] Is there a shared data warehouse or analytics layer (Snowflake, BigQuery, Redshift, other) the platform should write to?
- [ ] Is Google Drive an acceptable long-term asset storage solution, or should media move to S3 / Azure Blob / GCS?
- [ ] Are there data residency or retention rules for training records and member progress data?
- [ ] What is the backup and disaster recovery standard?
- [ ] Is there a shared search index (Elastic, OpenSearch, Algolia, other) for content?

---

## Integration Boundaries

- [ ] What data can LO Development access from TERA (LO profiles, production data, pipeline, leaderboards, certifications)?
- [ ] What is the integration method (API, webhook, event stream, scheduled export, manual export)?
- [ ] Are there compliance rules around LO production data living inside a training system?
- [ ] What borrower data (if any) is off-limits to the platform?
- [ ] Are there state-licensing or NMLS rules that restrict what the platform can reference?
- [ ] Is there an Ally-side data product the platform can consume directly?
- [ ] What is the error-handling contract when TERA is unavailable?

---

## Governance

- [ ] Who approves platform naming and branding (Loan Factory marketing, Thuan, legal)?
- [ ] Who reviews public-facing, recruiting-facing, or rate-related content before publishing?
- [ ] What is the change management process for platform updates (release cadence, sign-off)?
- [ ] Who owns the security review for new third-party dependencies?
- [ ] Who owns vendor risk review for any external AI provider (Gemini, Claude, OpenAI)?
- [ ] What is the access review cadence for admin and owner roles?
- [ ] Is there an existing privacy policy / acceptable use policy LOs already accept?

---

## Decisions needed before final architecture lock

These items, if unresolved, will block the production build (the prototype can proceed without them):

1. Identity provider and SSO model
2. Hosting platform and CI/CD standard
3. Database choice and data warehouse target
4. Integration method with TERA for LO and production data
5. DNS ownership for `lodevelopment.loanfactory.com`
6. Marketing review approval chain (Victoria's role formalized)
7. AI provider governance (Gemini vs. Claude vs. OpenAI; vendor risk review owner)

Once these are answered, Jeremy will produce a follow-up architecture lock document.
