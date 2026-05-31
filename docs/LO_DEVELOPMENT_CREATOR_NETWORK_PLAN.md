# Loan Factory Creator Network — Product Plan

> **Scope note:** Planning document for the Loan Factory LO Development Platform. This is **NOT** LegendsOS. Nothing in this document authorizes builds, migrations, deployments, or external publishing.
>
> **FaceGram update:** The user-facing product name is now **FaceGram**. Treat this older Creator Network plan as background context. Use `FACEGRAM_PRODUCT_ROADMAP.md`, `FACEGRAM_ROLE_ACCESS_MODEL.md`, `FACEGRAM_VENDOR_MONETIZATION_PLAN.md`, and `FACEGRAM_SPONSORED_CONTENT_REVIEW_FLOW.md` as the current roadmap.

---

## 1. Definition

The **Loan Factory Creator Network** is an **employee-only internal social feed** that lives inside the LO Development Platform. It is a private, authenticated space for Loan Factory team members (Loan Officers, Team Leaders, Corporate Coaches, Marketing Reviewers, and Admin) to share marketing ideas, scripts, videos, wins, prompts, strategies, roleplays, referral partner ideas, and training examples with each other.

**It is never public.** There is no external publishing in v1. There are no public profiles, no public sharing links, and no borrower / Realtor / partner / customer access of any kind.

---

## 2. Alternative Names (Reference Only — Not Replacements)

These are alternative working titles considered for the same product. **"Creator Network" remains the primary name.** These are listed only for cross-reference in conversations and future branding discussions:

- LO Social Lab
- Loan Factory Growth Feed
- Advisor Exchange
- LO Marketing Exchange
- Loan Factory Content Hub

---

## 3. Purpose

> **The internal momentum engine.**

The Creator Network exists so Loan Factory team members can share, discover, and remix what is actually working in the field. It is the place where:

- LOs share marketing ideas, scripts, and videos they have personally tested
- Team Leaders highlight what is producing wins inside their teams
- Corporate Coaches drop prompts, recaps, and roleplay examples
- AI Training prompts get circulated and improved together
- Referral partner strategies are documented and reused
- Objection handling, open house playbooks, and Realtor scripts get shared
- Training examples and success stories flow back into the broader curriculum

It is **not** a content publishing platform. It is **not** a public brand surface. It is an **internal practice space** where the team trades reps and ideas in private.

---

## 4. Routes

All routes are authenticated and gated to employees only.

| Route | Purpose |
|---|---|
| `/creator-network` | Landing page — overview, recent activity, top contributors, featured posts |
| `/creator-network/feed` | Main internal feed (text / video / image / link posts) |
| `/creator-network/profile/[loId]` | Individual LO profile (internal only) |
| `/creator-network/post/[postId]` | Single post view with comments and engagement |
| `/creator-network/create` | Post composer |
| `/creator-network/saved` | Saved posts for the current user |
| `/creator-network/categories` | Browse by category / tag |
| `/creator-network/leaderboard` | Top contributors, most-shared posts, most-saved resources |
| `/creator-network/review-queue` | Marketing Reviewer + Admin only — flagged content queue |
| `/admin/creator-network` | Admin (Jeremy) only — users, categories, moderation, featured posts, status changes |

---

## 5. Core Features

### 5.1 LO Profiles
- Display name, title, market focus, avatar, short internal bio
- Internal-only — visible only to authenticated team members
- Activity stream showing the LO's recent posts and contributions

### 5.2 Internal Feed
- Post types: **text, video, image, link**
- Reverse-chronological default view with category and contributor filters
- Featured posts pinned at the top of the feed and on `/creator-network`

### 5.3 Post Composer
- Title + body
- Attach video, image, or link
- Assign one or more categories
- Save as Draft or Publish Internally

### 5.4 Categories & Tags
- 16 categories (see §6)
- Posts can carry multiple categories
- Browse, filter, and search by category

### 5.5 Engagement
- Likes (single reaction type in v1)
- Comments (threaded under post)
- Saves (private to user)
- Search and filter across all internal posts

### 5.6 Featured Posts
- Team Leaders can feature posts for their team
- Admin (Jeremy) can feature posts platform-wide
- Featured posts appear on `/creator-network` landing and at the top of the feed

### 5.7 Moderation & Compliance
- Admin moderation queue at `/creator-network/review-queue`
- Compliance / risk flagging (auto-flag triggers + human-flag option)
- Status workflow for every post (see §7)

### 5.8 Content Inspiration Library
- Browsable library of **Approved Internal Resources** (see §7)
- Organized by category
- Surfaces top posts as reusable internal training material

### 5.9 Approval Flags
- **Approved Internal Resource** — marks a post as a vetted internal asset team members can confidently reuse internally
- **Approved for External Adaptation** — flags a post for **further human review** before any possible external use. **This does NOT publish externally.** It does NOT bypass marketing, compliance, or leadership review. It is a queue marker, not an act of publication.

---

## 6. Categories (16)

1. Referral Partner Strategy
2. Borrower Conversion
3. Social Media Ideas
4. Open House Marketing
5. Realtor Scripts
6. Video Scripts
7. Email Templates
8. AI Prompts
9. Success Stories
10. Objection Handling
11. Events
12. Recruiting
13. LO Mastery
14. Sales and Marketing 101-601
15. 1+1+1=5
16. AI Training

---

## 7. Post Statuses

Every post moves through a defined status flow. Status changes are governed by role (see `LO_DEVELOPMENT_CREATOR_NETWORK_ACCESS_MODEL.md`) and moderation rules (see `LO_DEVELOPMENT_CREATOR_NETWORK_MODERATION_RULES.md`).

| Status | Description |
|---|---|
| **Draft** | Author is still editing. Not visible in the feed. Visible only to the author. |
| **Internal Published** | Live in the internal feed. Visible to all authenticated team members. |
| **Flagged for Review** | Auto-flagged or human-flagged for compliance / risk review. Visible to author + Marketing Reviewer + Admin. |
| **Approved Internal Resource** | Marketing Reviewer (or Admin) has marked the post as a vetted internal asset. Surfaces in the Content Inspiration Library. Still internal-only. |
| **Approved for External Adaptation** | Marketing Reviewer (or Admin) has flagged the post for **further human review** before any possible external use. **This status does NOT publish content externally.** It does NOT bypass downstream marketing, compliance, or leadership review. It is a queue marker only. |
| **Archived** | Removed from the active feed. Retained for audit / history. |

> **Critical clarification:** "Approved for External Adaptation" ≠ published externally. No status in this system causes content to leave the internal platform. External publication, if it ever happens, is a separate downstream process owned by human reviewers.

---

## 8. Content Coach AI Integration

The Creator Network connects to the platform's **Content Coach AI Assistant** (lives in the AI Assistant Hub). Content Coach can take an internal post as input and generate **9 output types** for the LO to consider:

1. LinkedIn draft
2. Instagram caption
3. Short video script
4. Realtor email draft
5. Text message draft
6. Flyer copy
7. Open house follow-up draft
8. Team leader training example
9. AI prompt template

### Output Rules (Non-Negotiable)
- **Every output is labeled:** `"Draft only. Review before external use."`
- **No auto-send.** Content Coach never publishes, sends, posts, or transmits anything anywhere.
- **Draft-only.** Outputs are presented to the LO inside the platform for them to copy, edit, or discard.
- **Human review required** before any external use of any output.
- Content Coach never bypasses the moderation process described in this document and in `LO_DEVELOPMENT_CREATOR_NETWORK_MODERATION_RULES.md`.

---

## 9. Module Connections

The Creator Network is a hub that connects to other modules in the LO Development Platform:

| Connected Module | Connection |
|---|---|
| **Sales and Marketing 101-601 (lessons 101–601)** | Lesson examples and success stories surface in the feed; top posts can become lesson examples |
| **LO Mastery** | Coaching wins, advisor recaps, and program highlights flow into the feed |
| **AI Training** | Prompt sharing, prompt iteration, prompt library cross-link |
| **Training Library** | Top posts (Approved Internal Resource) can be promoted into the formal Training Library |
| **Team Leader OS** | Team Leaders see engagement metrics and team contributions |
| **AI Assistant Hub** | Hosts the Content Coach AI assistant that powers the 9 output drafts |
| **Coach Hub** | Corporate Coaches feature posts, drop prompts, and surface roleplay examples |

---

## 10. Implementation Phases

> **Build sequencing only.** No phase is authorized to start without explicit approval. No phase begins external publishing.

### Phase 1 — Static Landing & Wireframe
- Static `/creator-network` landing page
- Feed wireframe (no real data)
- No Supabase, no posts, no auth wiring beyond existing platform auth
- Goal: lock visual + IA before any backend work

### Phase 2 — Posts + Feed (Supabase)
- Post creation (Draft + Internal Published)
- Live feed reading from Supabase
- Likes, comments, saves
- LO profiles
- Categories
- All access remains employee-only

### Phase 3 — Moderation, Featured Posts, Compliance Flags
- Review queue at `/creator-network/review-queue`
- Featured posts (team-level + platform-level)
- Compliance flag triggers (auto + human)
- Full status workflow live (see §7)
- Marketing Reviewer role active

### Phase 4 — Content Coach AI Integration
- Content Coach AI assistant integration in the AI Assistant Hub
- 9 output types generated as drafts only
- All outputs labeled `"Draft only. Review before external use."`
- No auto-send, no auto-publish, no external transmission

---

## 11. Guardrails

The following constraints apply to the Creator Network at all phases and override any feature request that conflicts with them:

- **Employee-only.** All access is gated to authenticated Loan Factory team members.
- **No public profiles.** LO profiles are internal-only and never indexed or exposed externally.
- **No public sharing links.** No URL pattern in the Creator Network produces a publicly-viewable page.
- **No borrower access.** Borrowers cannot see, read, comment on, or be referenced by name in posts.
- **No Realtor access.** Realtors cannot see or access any Creator Network content.
- **No partner access.** Referral partners and outside partners cannot see or access any Creator Network content.
- **No customer access.** Customers of any kind cannot see or access any Creator Network content.
- **No external publishing in v1.** No status, action, or feature publishes content outside the platform.
- **No borrower PII** in posts, comments, or attachments.
- **No rate / payment / fee claims** without Marketing Reviewer approval.
- **No guaranteed approval language.**
- **No "free processing" claims.**
- **No unsupported competitor claims.**
- **No claims of direct TERA access.** The Creator Network does **not** write to TERA and does **not** read TERA borrower data.
- **No automated external posting** without explicit human review.
- **Do not claim Loan Factory has an open API.**
- **Do not write to TERA from this module.**

---

## Update: Audience Quality Panel Integration (Pass 3)

The Audience Quality Panel internal QA tool integrates with Creator Network at two points.

**1. Status change trigger.**

When a post's status changes to **"Approved for External Adaptation"**, the **Compliance/Risk** panel and **Borrower** panel auto-run **before** the status transition completes. The status transition requires Marketing Reviewer confirmation **after** reviewing the panel report.

**2. Manual trigger.**

Any LO can run the full 5-panel review on any draft before posting. This is opt-in and does not block normal "Internal Published" posts.

**Reporting and gating:**

- The panel report is displayed to the **post author** and the **Marketing Reviewer**.
- If the Compliance/Risk panel returns **"Needs Human Review"** or **"Not Suitable,"** the "Approved for External Adaptation" status is **blocked** until manually overridden by an authorized reviewer with a documented reason.

**Content Coach integration:**

- The Content Coach (Assistant #15) **always** runs the Compliance/Risk panel and the Borrower panel before delivering any draft output.
- If either panel blocks, Content Coach returns the panel feedback in place of the draft and routes to human review.

See [`LO_DEVELOPMENT_AUDIENCE_QUALITY_PANEL_PLAN.md`](./LO_DEVELOPMENT_AUDIENCE_QUALITY_PANEL_PLAN.md), [`LO_DEVELOPMENT_AI_PANEL_SCORING_RUBRIC.md`](./LO_DEVELOPMENT_AI_PANEL_SCORING_RUBRIC.md), and [`LO_DEVELOPMENT_CONTENT_QA_WORKFLOW.md`](./LO_DEVELOPMENT_CONTENT_QA_WORKFLOW.md).
