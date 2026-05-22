# Loan Factory Creator Network — Access Model

> **Scope note:** Planning document for the Loan Factory LO Development Platform. This is **NOT** LegendsOS. Access patterns described here are intent — they are not yet implemented in Supabase RLS.

---

## 1. Roles Overview

The Creator Network defines **5 roles**. Every authenticated user maps to exactly one role for the purposes of Creator Network access (roles may be additive in the broader platform; this document describes only Creator Network behavior).

1. **LO** — Loan Officer
2. **Team Leader** — Manages a team of LOs
3. **Corporate Coach** — Coaches across teams
4. **Marketing Reviewer** — Compliance / brand review
5. **Admin** — Platform owner (Jeremy)

All Creator Network access is **employee-only**. No role in this document includes borrowers, Realtors, referral partners, or customers.

---

## 2. Role: LO (Loan Officer)

| Capability | Details |
|---|---|
| **Can see** | Internal feed, all Internal Published posts, all LO profiles, comments, likes, saves, categories, leaderboard, Approved Internal Resources |
| **Can create / edit** | Own profile, own posts (Draft + Internal Published), own comments, own saves, own likes |
| **Moderation actions** | None |
| **Admin functions** | None |
| **CANNOT do** | Moderate other LOs' posts, change other users' post statuses, flag content as Approved Internal Resource, flag content as Approved for External Adaptation, access the review queue, feature posts, manage categories, see other users' saved lists |

---

## 3. Role: Team Leader

| Capability | Details |
|---|---|
| **Can see** | Everything an LO can see + team-level engagement data + team contribution breakdowns |
| **Can create / edit** | All LO actions + feature posts for members of their team |
| **Moderation actions** | Feature posts within their team; raise human compliance flags on team posts |
| **Admin functions** | None at platform level; team-scoped only |
| **CANNOT do** | Access platform-wide admin, manage categories, mark posts as Approved Internal Resource, mark posts as Approved for External Adaptation, change post statuses outside their own team's content, access the platform-wide review queue |

---

## 4. Role: Corporate Coach

| Capability | Details |
|---|---|
| **Can see** | Everything an LO can see + moderation notes scoped to Coach + Marketing Reviewer + Admin |
| **Can create / edit** | All LO actions + share coaching prompts, scripts, recaps, and roleplay examples; highlight examples across teams; add moderation notes |
| **Moderation actions** | Add moderation notes (visible to Coach + Marketing Reviewer + Admin); highlight / surface posts as coaching examples |
| **Admin functions** | None |
| **CANNOT do** | Mark posts as Approved for External Adaptation, approve external use, change a post to Archived, manage user accounts, manage categories, override Marketing Reviewer decisions |

---

## 5. Role: Marketing Reviewer

| Capability | Details |
|---|---|
| **Can see** | All posts in all statuses; the review queue; all moderation notes; compliance flags |
| **Can create / edit** | **Read-only for regular post creation** — Marketing Reviewers do not create regular feed posts. They may edit posts as part of moderation (e.g., redact PII or fix non-compliant claims) and must annotate edits via moderation notes. |
| **Moderation actions** | Flag risky content; resolve flags; mark as **Approved Internal Resource**; mark as **Approved for External Adaptation**; move posts to Archived; add moderation notes |
| **Admin functions** | None on user accounts or categories |
| **CANNOT do** | Create regular posts in the feed, manage user accounts, manage categories, change platform settings, approve **final external publishing** (Approved for External Adaptation is a flag for further human review only — it does not publish externally) |

> **Reinforcement:** "Approved for External Adaptation" is a queue marker, not an act of publication. Even Marketing Reviewers cannot trigger external publication from inside the Creator Network. External publication, if it ever happens, is a separate downstream process owned by humans outside this module.

---

## 6. Role: Admin (Jeremy)

| Capability | Details |
|---|---|
| **Can see** | Everything in the Creator Network — all posts in all statuses, all profiles, all comments, all moderation notes, all flags, all queues |
| **Can create / edit** | All content of all kinds; user accounts; categories; visibility settings; featured posts (platform-wide); status changes on any post |
| **Moderation actions** | All moderation actions available to all other roles, plus the ability to override |
| **Admin functions** | Manage users, categories, visibility, flags, featured posts, review queue, platform settings |
| **CANNOT do** | (No restrictions inside the Creator Network. External publication still requires the separate downstream human review process.) |

---

## 7. Role Capability Matrix (Quick Reference)

| Capability | LO | Team Leader | Corporate Coach | Marketing Reviewer | Admin |
|---|:-:|:-:|:-:|:-:|:-:|
| Browse internal feed | ✅ | ✅ | ✅ | ✅ | ✅ |
| Create own posts | ✅ | ✅ | ✅ | ❌ | ✅ |
| Comment / like / save | ✅ | ✅ | ✅ | ✅ | ✅ |
| Feature posts (team) | ❌ | ✅ | ❌ | ❌ | ✅ |
| Feature posts (platform) | ❌ | ❌ | ❌ | ❌ | ✅ |
| Add moderation notes | ❌ | ❌ | ✅ | ✅ | ✅ |
| Flag posts for review | ❌ | ✅ (team) | ✅ | ✅ | ✅ |
| Resolve flags | ❌ | ❌ | ❌ | ✅ | ✅ |
| Mark as Approved Internal Resource | ❌ | ❌ | ❌ | ✅ | ✅ |
| Mark as Approved for External Adaptation | ❌ | ❌ | ❌ | ✅ | ✅ |
| Archive posts | ❌ | ❌ | ❌ | ✅ | ✅ |
| Access review queue | ❌ | ❌ | ❌ | ✅ | ✅ |
| Manage users / categories | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## 8. RLS Intent Notes (Planning Only — Do Not Implement)

The following describes **intended row-level security behavior**. It is not yet implemented. No migrations are authorized.

| Table | Visibility Intent |
|---|---|
| `creator_posts` | Visible to all authenticated team members for posts in status `Internal Published`, `Approved Internal Resource`, `Approved for External Adaptation`. Drafts visible only to author. Flagged posts visible to author + Marketing Reviewer + Admin. Archived posts visible to Marketing Reviewer + Admin. |
| `creator_review_queue` | Visible to **Marketing Reviewer and Admin only**. |
| `creator_moderation_notes` | Visible to **Corporate Coach + Marketing Reviewer + Admin**. Not visible to LO or Team Leader. |
| `creator_approved_resources` | Visible to **all authenticated team members**. |
| `lo_profiles` | Visible to all authenticated team members. Not visible to any external party. |
| `creator_comments` / `creator_reactions` / `creator_saves` | Visible to all authenticated team members (saves are private per user — only the owning user sees their own save list). |
| `creator_categories` | Visible to all authenticated team members. Writable by Admin only. |
| `creator_featured_posts` | Visible to all authenticated team members. Writable by Team Leader (team scope) and Admin (platform scope). |
| `creator_post_media` | Visible according to parent post's visibility. |

> **All visibility is gated to `auth.role() != 'anon'`.** No anonymous or public access to any Creator Network table.
