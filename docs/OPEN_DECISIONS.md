# Open Decisions

**Status:** Living list — update as decisions are made.
**Owner:** Jeremy McDonald (tracking)
**Last updated:** 2026-05-21

This is the master list of open decisions that block the full production build. Items are organized by the stakeholder who owns the decision. Each item is short, decision-shaped, and should resolve to a clear yes/no/specific answer.

---

## From Andre — LO Development Owner

- [ ] Confirm module priorities — which module ships first after the prototype is approved?
- [ ] Confirm LO role definitions and access rules (validate [`ROLE_ACCESS_MODEL.md`](./ROLE_ACCESS_MODEL.md))
- [ ] Confirm 1+1=5 scope and content ownership — who authors campaign kits, recruiting kits, content kits?
- [ ] Confirm LO Development team scope — do Tara, Kevin, Benjamin each see only their assigned LOs, or do they share visibility?
- [ ] Confirm the routing playbook (post-onboarding, escalation, training academy, corporate coach, feedback) — source content needed
- [ ] Confirm whether team leaders see Coach Hub data for their team members
- [ ] Approve the platform name "Loan Factory LO Development Platform" or propose alternative
- [ ] Approve subdomain `lodevelopment.loanfactory.com` or propose alternative
- [ ] Confirm Jeremy as platform architect and primary builder

---

## From Edward — Corporate Coaching Lead

- [ ] Confirm Corporate Coach Hub scope (validate [`LO_DEVELOPMENT_PLATFORM_MODULE_MAP.md`](./LO_DEVELOPMENT_PLATFORM_MODULE_MAP.md))
- [ ] Confirm coaching note privacy rules — private to coach + member, shared across coaches by default, or visible to LO Development leadership?
- [ ] Confirm certification review process — who certifies, who recertifies, what's the cadence?
- [ ] Confirm coach playbook authorship and update cadence
- [ ] Confirm session note retention period
- [ ] Confirm member-to-coach assignment process

---

## From TERA/Ally Team

All open items in [`TERA_ALLY_STACK_ALIGNMENT_CHECKLIST.md`](./TERA_ALLY_STACK_ALIGNMENT_CHECKLIST.md). Highest-priority items repeated here:

- [ ] SSO decision — identity provider, role provisioning, group claims
- [ ] Hosting platform — Netlify acceptable for production, or required to move to AWS / Azure / GCP?
- [ ] Database choice for production
- [ ] Integration method with TERA for LO and production data (API, webhook, event stream, scheduled export)
- [ ] Subdomain DNS ownership and approval chain for `lodevelopment.loanfactory.com`
- [ ] Asset storage decision — Google Drive long term, or migrate media to S3 / Azure Blob / GCS?
- [ ] CI/CD standard
- [ ] Observability / monitoring standard
- [ ] Security review requirements before subdomain creation
- [ ] Compliance rules around LO production data in a training system

---

## From Victoria — Marketing Reviewer

- [ ] Confirm approval gate position — gating publication, or post-hoc review?
- [ ] Confirm scope — all public-facing content, all recruiting content, all rate-referencing content (note: platform does not display rates)
- [ ] Approve all public-facing copy before launch
- [ ] Approve recruiting kits in 1+1=5 before launch
- [ ] Approve Apex Advisor landing page copy
- [ ] Confirm brand standards compliance — palette, voice, terminology

---

## From Thuan / Loan Factory Leadership

- [ ] Approve the platform name: "Loan Factory LO Development Platform"
- [ ] Approve the subdomain: `lodevelopment.loanfactory.com`
- [ ] Confirm Jeremy's role as platform architect
- [ ] Confirm Andre as LO Development owner
- [ ] Confirm Edward as Corporate Coaching lead
- [ ] Confirm Loan Factory IT contact for DNS work
- [ ] Confirm whether the platform is fully internal (recommended) or has any public-facing surface

---

## From Jeremy

- [ ] Confirm Apex Advisor pricing ($249 Tier 1, $449 Tier 2) is finalized
- [ ] Confirm whether AI Assistants primarily reference Gemini (Gemini Gem AI Twin) or Claude
- [ ] Confirm launch sequencing — which module goes live first after the prototype?
- [ ] Confirm Master workspace copy approach for large assets — do they stay in Drive permanently, or eventually move to a cloud bucket?
- [ ] Confirm whether the prototype is shared with named reviewers via Netlify password or `/owner-preview` route obscurity
- [ ] Confirm whether to commit the four uncommitted-modified files before adding new modules, or carry them in the same change
- [ ] Confirm whether `/sales-training/[level]` replaces or runs alongside existing top-level `/101-foundation` etc. routes (recommend alongside, with redirects added after approval)

---

## Decision log (closed items)

_None yet. As decisions close, move them here with a short note and the date._

---

## How to use this doc

- New decisions go under the right stakeholder
- Closed decisions move to the Decision log with the answer and date
- Anything that blocks production-build start should also be flagged in the prototype `RELEASE_CANDIDATE_NOTES.md` (to be authored in Hour 46–48 of the build plan)

---

## Update: Creator Network + Audience Quality Panel Open Decisions (Pass 3)

### Creator Network — open decisions

- [ ] **Andre** — confirm Creator Network scope: which user types are included in v1 (LO, TL, Coach, Marketing Reviewer — or a more restricted rollout)?
- [ ] **Thuan / Leadership** — approve the concept of an internal employee social network. Does this align with Loan Factory's team culture and communication policies?
- [ ] **Victoria** — confirm moderation standards. What is the internal review process for the "Approved for External Adaptation" status? Who has final authority?
- [ ] **TERA / Ally team** — confirm that **no TERA data is used or displayed** in Creator Network v1: no loan data, no pricing, no borrower data.
- [ ] **Jeremy** — confirm phase rollout order (Phase 1 now vs. Phase 2 immediately after) and the Content Coach timeline.

### Audience Quality Panel — open decisions

- [ ] **Jeremy** — confirm which OpenRouter models to assign to each panel tier (low-cost for panels, stronger for synthesis).
- [ ] **Jeremy** — confirm whether the Audience Quality Panel runs **automatically** on "Approved for External Adaptation" status change, or **manual-only** in v1.
- [ ] **Victoria / Marketing** — confirm compliance gate rules. Which flag types **auto-block**, and which require human review?
- [ ] **Leadership** — confirm whether panel scores are visible to **all LOs**, or only to **post authors and admins**.
