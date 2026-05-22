# Loan Factory Creator Network — Moderation Rules

> **Scope note:** Planning document for the Loan Factory LO Development Platform. This is **NOT** LegendsOS. Rules described here are policy intent — they govern the design of the Creator Network module and the behavior of all roles who participate in it.

---

## 1. Internal-Only Policy

The Loan Factory Creator Network is **internal-only at all times**.

- **All posts are internal.** No post is ever public.
- **No post is ever made public** through any action, status change, link share, embed, RSS feed, API export, or AI assistant output.
- **No public sharing links.** No URL in the Creator Network produces a publicly-viewable page. No post URL is unfurlable outside the authenticated platform.
- **No external access** of any kind:
  - No borrower access
  - No Realtor access
  - No referral partner access
  - No customer access
  - No vendor access
  - No press / media access
- **External adaptation flag ≠ external publication.** The status `Approved for External Adaptation` is a queue marker for further human review only. It does not publish content externally. See §6.

---

## 2. Post Status Flow

```
Draft
   │
   ▼
Internal Published
   │
   ├──► (optional) Flagged for Review
   │         │
   │         ▼
   │     Approved Internal Resource
   │         OR
   │     Approved for External Adaptation
   │         OR
   │     Archived
   │
   ├──► Approved Internal Resource
   │
   ├──► Approved for External Adaptation
   │
   └──► Archived
```

**Notes:**
- A post does **not** have to be flagged before being approved.
- A post **can** be flagged at any time after Internal Published.
- Status transitions are role-gated (see §3).
- Archiving is non-destructive — the row is retained for audit / history but removed from the active feed.

---

## 3. Who Can Change Each Status

References roles defined in `LO_DEVELOPMENT_CREATOR_NETWORK_ACCESS_MODEL.md`.

| Status Transition | Allowed Roles |
|---|---|
| `(none) → Draft` | Author (LO, Team Leader, Corporate Coach, Admin) |
| `Draft → Internal Published` | Author |
| `Internal Published → Flagged for Review` | Team Leader (team scope), Corporate Coach, Marketing Reviewer, Admin |
| `Flagged for Review → Internal Published` (resolve) | Marketing Reviewer, Admin |
| `Flagged for Review → Approved Internal Resource` | Marketing Reviewer, Admin |
| `Flagged for Review → Approved for External Adaptation` | Marketing Reviewer, Admin |
| `Flagged for Review → Archived` | Marketing Reviewer, Admin |
| `Internal Published → Approved Internal Resource` | Marketing Reviewer, Admin |
| `Internal Published → Approved for External Adaptation` | Marketing Reviewer, Admin |
| `Any → Archived` | Marketing Reviewer, Admin |
| `Archived → Internal Published` (un-archive) | Admin only |

> Marketing Reviewers cannot create regular posts in the feed (see access model §5). Their authoring is limited to moderation edits, with annotation required.

---

## 4. Compliance / Risk Flag Triggers

Flags can be **auto-raised by the system** or **human-raised** by Team Leaders, Corporate Coaches, Marketing Reviewers, or Admin.

### 4.1 Auto-Flag Triggers (Intent — Implementation Phase 3)

- Rate claims (e.g., specific APR numbers, "lowest rate", "best rate")
- Payment amount claims (specific dollar amounts presented as guaranteed)
- Fee claims (specific dollar fees, "no fee", "zero fee")
- Approval guarantee language (e.g., "guaranteed approval", "approved in 24 hours")
- "Free processing" claims
- Competitor names paired with negative claims
- Likely borrower PII (names + loan amounts, addresses + borrower references, etc.)
- TERA capability claims that overstate what TERA does
- Recruiting content (any post tagged Recruiting auto-routes to Marketing Reviewer)

### 4.2 Human-Flag Reasons

Any role with flagging permission may raise a flag for any reason. Recommended reasons:

- Brand voice concern
- Tone concern
- Inaccurate or out-of-date information
- Sensitive scenario (legal, regulatory, customer-specific)
- Internal disagreement that needs leadership decision

Every flag carries a free-text `flag_reason` so reviewers have context.

---

## 5. Flag Resolution Process

1. **Post enters `Flagged for Review`** (auto or human).
2. **Marketing Reviewer reviews** in `/creator-network/review-queue`.
3. **Marketing Reviewer chooses one outcome:**
   - **Approve unchanged** → status returns to `Internal Published`. Moderation note recorded.
   - **Edit and approve** → Marketing Reviewer edits the post (e.g., removes PII, softens a claim), annotates the change, status returns to `Internal Published`. The author is notified.
   - **Promote to Approved Internal Resource** → status becomes `Approved Internal Resource`. Moderation note recorded.
   - **Promote to Approved for External Adaptation** → status becomes `Approved for External Adaptation`. **This does not publish anything externally** — it adds the post to a downstream queue for further human review.
   - **Archive** → status becomes `Archived`. Moderation note recorded with reason.
   - **Escalate to Admin (Jeremy)** → flag remains open, escalated for Jeremy's review.
4. **Author notification** is required for any edit, archive, or escalation outcome.
5. **All decisions produce a `creator_moderation_notes` row** with reviewer, action, and note.

---

## 6. Prohibited Content

The following content is prohibited inside the Creator Network. Posts containing prohibited content will be auto-flagged or human-flagged and removed or edited by Marketing Reviewer / Admin.

- **Borrower PII** — names, loan numbers, addresses, contact info, financial details that identify a specific borrower
- **Guaranteed approval language** — "guaranteed approval", "approved in X hours", "anyone can qualify"
- **Rate, payment, or fee claims without Marketing Reviewer approval** — including specific APRs, specific monthly payments, "no fee", "zero closing costs", etc., unless reviewed and approved
- **"Free processing" claims** of any kind without review
- **Unauthorized competitor claims** — naming competitors with negative claims, comparative claims without supporting evidence
- **Content implying external auto-publish** — any content suggesting that posts will be auto-pushed to public channels (they will not)
- **Claims that Loan Factory has an open API** — Loan Factory does not have an open / publicly-documented API for this platform
- **TERA writes** — no post or workflow in the Creator Network writes to TERA
- **Direct TERA data** — no post should contain direct exports or screenshots of TERA borrower data
- **Claims of direct TERA access** that overstate the integration

---

## 7. External Adaptation Rules

The `Approved for External Adaptation` status is the most easily-misunderstood part of this module. The rules are absolute:

- **`Approved for External Adaptation` flags a post for further human review** before any possible external use.
- **It does NOT publish content externally.** No external channel — social media, email, website, blog, press, partner site, anywhere — receives content as a result of this status change.
- **It does NOT bypass human marketing, compliance, or leadership review.** It adds the post to a downstream queue. Downstream review still requires human marketing, compliance, and (for sensitive cases) leadership sign-off before anything is ever used externally.
- **It does NOT grant the original author permission to externally publish.** Authors must wait for the downstream review outcome.
- **It is reversible.** Marketing Reviewer or Admin can revoke the flag at any time.

---

## 8. Content Coach Output Rules

The Content Coach AI assistant generates 9 output types from internal posts (see `LO_DEVELOPMENT_CREATOR_NETWORK_PLAN.md` §8). The following rules apply to every Content Coach output without exception:

- **Every output is labeled:** `"Draft only. Review before external use."`
- **No auto-send.** Content Coach never sends, posts, publishes, emails, texts, or transmits any output to any channel, person, or system.
- **No auto-publish.** Content Coach does not push outputs to social media, email, website, CRM, TERA, or any other system.
- **No bypass of the review process.** A Content Coach output does not inherit any approval status from the source post. It is always a fresh draft.
- **Human review required before any external use.** The LO who requested the output must personally review and decide what to do with it.
- **Marketing Reviewer must still review** any draft the LO intends to use externally, following the standard external adaptation pathway in §7.
- **Content Coach outputs that contain prohibited content** (see §6) must be flagged and corrected before any external use.

---

## 9. Audit & Retention

- **All status changes are logged** with timestamp, actor, and reason.
- **All moderation notes are retained** for audit purposes.
- **Archived posts are retained** for audit purposes and are not hard-deleted from the database.
- **Flags and resolutions are retained** for audit purposes.
- **No hard deletion** of posts, comments, or moderation history from inside the Creator Network UI. Hard deletion requires direct database action by Admin.

---

## Update: Audience Quality Panel in Moderation Flow (Pass 3)

The Audience Quality Panel is part of the moderation chain for posts being promoted to **"Approved for External Adaptation."**

**Gate behavior:**

- The **Compliance/Risk panel** must return **"Ready for Internal Use"** or **"Needs Edits"** — not **"Needs Human Review"** or **"Not Suitable"** — before a Marketing Reviewer can confirm the "Approved for External Adaptation" status.
- If the Compliance/Risk panel **auto-blocks** (PII detected, guaranteed approval language, rate claim, or other hard-block conditions), the status change is **blocked automatically**. Marketing Reviewer must **manually override** with a **documented reason** stored in the moderation log.

**Logging:**

- All panel outputs are logged internally for audit purposes.
- Logs contain: **no PII**, a **content snippet only** (not full content if sensitive), **timestamp**, and **reviewer ID** (where applicable).

**Authority and boundary:**

- Panel outputs **do not constitute compliance approval**.
- **Human review is always required** before any external use, regardless of panel scores.
- The Audience Quality Panel is an internal QA aid, not a compliance authority.

See [`LO_DEVELOPMENT_AUDIENCE_QUALITY_PANEL_PLAN.md`](./LO_DEVELOPMENT_AUDIENCE_QUALITY_PANEL_PLAN.md) and [`LO_DEVELOPMENT_AI_PANEL_SCORING_RUBRIC.md`](./LO_DEVELOPMENT_AI_PANEL_SCORING_RUBRIC.md) for panel scoring details.
