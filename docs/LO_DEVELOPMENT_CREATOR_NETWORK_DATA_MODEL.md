# Loan Factory Creator Network — Proposed Data Model (Planning Only)

> # ⚠️ DO NOT IMPLEMENT
>
> **This document is planning-only.**
>
> - **No migrations.**
> - **No SQL execution.**
> - **No `supabase db push`, no `supabase migration new`, no schema changes of any kind.**
> - **No table creation in any environment** (dev, staging, prod).
> - **No RLS policy creation.**
>
> This document captures the *intended* shape of the Creator Network data model so the team can review, debate, and refine before any implementation work is ever scheduled. **All implementation is gated on explicit approval that is not yet given.**

---

## 1. Scope

The Creator Network requires **11 tables**. All tables live in the LO Development Platform's Supabase project (not LegendsOS). All tables are internal-only and protected by row-level security as described in §4.

---

## 2. Table Definitions

### 2.1 `lo_profiles`

Profile data for any employee participating in the Creator Network.

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PRIMARY KEY | |
| `user_id` | `uuid` FK → `auth.users(id)` | One-to-one with auth user |
| `display_name` | `text` NOT NULL | |
| `title` | `text` | e.g., "Senior Loan Officer", "Team Leader" |
| `market_focus` | `text` | e.g., "FHA / VA, Central Florida" |
| `avatar_url` | `text` | Internal asset URL |
| `bio` | `text` | Short internal bio |
| `created_at` | `timestamptz` DEFAULT `now()` | |

---

### 2.2 `creator_posts`

The primary post record.

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PRIMARY KEY | |
| `author_id` | `uuid` FK → `lo_profiles(id)` | |
| `content_type` | `enum` (`text` / `video` / `image` / `link`) | See §5 |
| `body` | `text` NOT NULL | Post body / caption |
| `media_url` | `text` NULLABLE | Single primary media URL (multi-media in `creator_post_media`) |
| `category_ids` | `uuid[]` | Array of FK references to `creator_categories(id)` |
| `status` | `enum` (`Draft` / `Internal_Published` / `Flagged_for_Review` / `Approved_Internal_Resource` / `Approved_for_External_Adaptation` / `Archived`) | See §5 |
| `is_featured` | `boolean` DEFAULT `false` | Platform-level featured flag |
| `created_at` | `timestamptz` DEFAULT `now()` | |
| `updated_at` | `timestamptz` DEFAULT `now()` | Updated on any edit |

---

### 2.3 `creator_post_media`

Multi-media attachments for a single post.

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PRIMARY KEY | |
| `post_id` | `uuid` FK → `creator_posts(id)` ON DELETE CASCADE | |
| `media_type` | `text` | e.g., `image`, `video`, `pdf`, `link` |
| `url` | `text` NOT NULL | Internal asset URL |
| `thumbnail_url` | `text` NULLABLE | |
| `created_at` | `timestamptz` DEFAULT `now()` | |

---

### 2.4 `creator_comments`

Threaded comments under a post.

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PRIMARY KEY | |
| `post_id` | `uuid` FK → `creator_posts(id)` ON DELETE CASCADE | |
| `author_id` | `uuid` FK → `lo_profiles(id)` | |
| `body` | `text` NOT NULL | |
| `created_at` | `timestamptz` DEFAULT `now()` | |

---

### 2.5 `creator_reactions`

Reactions on a post. v1 supports only `like`.

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PRIMARY KEY | |
| `post_id` | `uuid` FK → `creator_posts(id)` ON DELETE CASCADE | |
| `user_id` | `uuid` FK → `lo_profiles(id)` | |
| `reaction_type` | `enum` (`like`) | Extensible later |
| `created_at` | `timestamptz` DEFAULT `now()` | |

**Unique constraint:** `(post_id, user_id)` — one reaction per user per post.

---

### 2.6 `creator_saves`

User-private save list.

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PRIMARY KEY | |
| `post_id` | `uuid` FK → `creator_posts(id)` ON DELETE CASCADE | |
| `user_id` | `uuid` FK → `lo_profiles(id)` | |
| `created_at` | `timestamptz` DEFAULT `now()` | |

**Unique constraint:** `(post_id, user_id)` — one save per user per post.

---

### 2.7 `creator_categories`

The 16 categories defined in `LO_DEVELOPMENT_CREATOR_NETWORK_PLAN.md` §6.

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PRIMARY KEY | |
| `name` | `text` UNIQUE NOT NULL | e.g., "Referral Partner Strategy" |
| `slug` | `text` UNIQUE NOT NULL | e.g., `referral-partner-strategy` |
| `description` | `text` | Short label for category page |
| `sort_order` | `int` | Manual ordering in UI |

---

### 2.8 `creator_review_queue`

Flagged posts pending Marketing Reviewer / Admin review.

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PRIMARY KEY | |
| `post_id` | `uuid` FK → `creator_posts(id)` | |
| `flagged_by` | `uuid` FK → `lo_profiles(id)` | Null if auto-flagged by system |
| `flag_reason` | `text` NOT NULL | Free-text, supports auto-flag tags |
| `status` | `enum` (`pending` / `resolved` / `escalated`) | |
| `created_at` | `timestamptz` DEFAULT `now()` | |

---

### 2.9 `creator_moderation_notes`

Audit trail of moderation actions and notes.

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PRIMARY KEY | |
| `post_id` | `uuid` FK → `creator_posts(id)` | |
| `reviewer_id` | `uuid` FK → `lo_profiles(id)` | |
| `note` | `text` | Free-text moderation note |
| `action_taken` | `text` | e.g., `approved`, `edited`, `archived`, `escalated`, `flag_resolved` |
| `created_at` | `timestamptz` DEFAULT `now()` | |

---

### 2.10 `creator_featured_posts`

Posts featured by Team Leaders (team scope) or Admin (platform scope).

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PRIMARY KEY | |
| `post_id` | `uuid` FK → `creator_posts(id)` UNIQUE | One feature row per post |
| `featured_by` | `uuid` FK → `lo_profiles(id)` | |
| `context_note` | `text` | Why this is featured (visible in UI) |
| `created_at` | `timestamptz` DEFAULT `now()` | |

---

### 2.11 `creator_approved_resources`

Index of posts promoted to the Content Inspiration Library.

| Field | Type | Notes |
|---|---|---|
| `id` | `uuid` PRIMARY KEY | |
| `post_id` | `uuid` FK → `creator_posts(id)` | |
| `approved_by` | `uuid` FK → `lo_profiles(id)` | Marketing Reviewer or Admin |
| `resource_label` | `text` | Display label in the library |
| `category_id` | `uuid` FK → `creator_categories(id)` | Library categorization |
| `created_at` | `timestamptz` DEFAULT `now()` | |

---

## 3. Relationship Diagram (Text-Based)

```
auth.users
   │
   │ (1:1)
   ▼
lo_profiles ──────────────────────────────────────────────────────────────────┐
   │                                                                          │
   │ author_id                                                                │
   │                                                                          │
   ▼                                                                          │
creator_posts ──┬──► creator_post_media          (1 post : many media)        │
   │            │                                                             │
   │            ├──► creator_comments            (1 post : many comments) ────┤
   │            │                                                             │
   │            ├──► creator_reactions           (1 post : many reactions) ───┤
   │            │                                                             │
   │            ├──► creator_saves               (1 post : many saves) ───────┤
   │            │                                                             │
   │            ├──► creator_review_queue        (1 post : many flags) ───────┤
   │            │                                                             │
   │            ├──► creator_moderation_notes    (1 post : many notes) ───────┤
   │            │                                                             │
   │            ├──► creator_featured_posts      (1 post : 0..1 feature) ─────┤
   │            │                                                             │
   │            └──► creator_approved_resources  (1 post : many resources) ───┤
   │                                                                          │
   │ category_ids (uuid[])                                                    │
   ▼                                                                          │
creator_categories ◄──────────────────────────────────────────────────────────┘
                              (creator_approved_resources also FKs here)
```

**Notes:**
- `lo_profiles` is the central actor table — every authoring, commenting, reacting, saving, flagging, reviewing, and featuring action references it.
- `creator_posts` is the central content table — almost every other table points back to it.
- `creator_categories` is referenced both as an array on `creator_posts.category_ids` and as a direct FK on `creator_approved_resources.category_id`.

---

## 4. RLS Policy Intent (Per Table)

> Planning-only. No policies are authorized to be written yet.

| Table | RLS Intent |
|---|---|
| `lo_profiles` | `SELECT` for any authenticated user. `INSERT`/`UPDATE` only for the row owner (own profile) or Admin. |
| `creator_posts` | `SELECT` for any authenticated user when `status IN ('Internal_Published','Approved_Internal_Resource','Approved_for_External_Adaptation')`. Drafts: `SELECT` only by author. Flagged: `SELECT` by author + Marketing Reviewer + Admin. Archived: `SELECT` by Marketing Reviewer + Admin. `INSERT` by LO / Team Leader / Corporate Coach / Admin (not Marketing Reviewer). `UPDATE` by author (own posts) and Marketing Reviewer / Admin (for moderation). Status transitions enforced per `LO_DEVELOPMENT_CREATOR_NETWORK_MODERATION_RULES.md` §3. |
| `creator_post_media` | Inherits parent post's visibility. `INSERT` / `DELETE` by post author or Admin. |
| `creator_comments` | `SELECT` for any authenticated user (when parent post is visible). `INSERT` by any authenticated user. `UPDATE` / `DELETE` by comment author or Admin. |
| `creator_reactions` | `SELECT` for any authenticated user. `INSERT` / `DELETE` only by `user_id` owner. |
| `creator_saves` | `SELECT` only by `user_id` owner (private). `INSERT` / `DELETE` only by `user_id` owner. |
| `creator_categories` | `SELECT` for any authenticated user. `INSERT` / `UPDATE` / `DELETE` only by Admin. |
| `creator_review_queue` | `SELECT` / `INSERT` / `UPDATE` only by Marketing Reviewer + Admin. |
| `creator_moderation_notes` | `SELECT` only by Corporate Coach + Marketing Reviewer + Admin. `INSERT` by Corporate Coach + Marketing Reviewer + Admin. `UPDATE` / `DELETE` by Admin only. |
| `creator_featured_posts` | `SELECT` for any authenticated user. `INSERT` / `DELETE` by Team Leader (team scope) and Admin (platform scope). |
| `creator_approved_resources` | `SELECT` for any authenticated user. `INSERT` / `UPDATE` / `DELETE` only by Marketing Reviewer + Admin. |

> **All tables:** No `anon` access of any kind. All policies require `auth.role() != 'anon'` as a baseline.

---

## 5. Enums

### 5.1 `creator_post_content_type`

```
text
video
image
link
```

### 5.2 `creator_post_status`

```
Draft
Internal_Published
Flagged_for_Review
Approved_Internal_Resource
Approved_for_External_Adaptation
Archived
```

### 5.3 `creator_reaction_type`

```
like
```

(Extensible in future phases. v1 supports only `like`.)

### 5.4 `creator_review_queue_status`

```
pending
resolved
escalated
```

---

## 6. Indexing Suggestions

> Planning intent. Apply during implementation, not now.

- `creator_posts(created_at DESC)` — primary feed sort
- `creator_posts(author_id)` — profile / author lookups
- `creator_posts(status)` — moderation queue + status filters
- `creator_posts` **GIN index on `category_ids`** — array contains lookups for category filtering
- `creator_comments(post_id, created_at)` — fast comment loading per post
- `creator_reactions(post_id)` — fast reaction counts per post
- `creator_saves(user_id, created_at DESC)` — user's saved list
- `creator_review_queue(status, created_at)` — queue ordering by oldest pending
- `creator_moderation_notes(post_id, created_at DESC)` — moderation history per post
- `creator_featured_posts(post_id)` — unique constraint already provides this; also useful for join
- `creator_approved_resources(category_id, created_at DESC)` — Content Inspiration Library browsing

---

## 7. Out of Scope (v1)

The following are deliberately **not** in this data model. Listed here so they are not added without explicit decision:

- Multiple reaction types beyond `like`
- Threaded / nested comments (comments are flat in v1)
- Direct messages / private chat
- Notifications table (handled outside this module in v1)
- Hashtags as a separate table (tags are handled via `creator_categories`)
- Public profile or any external-facing field
- External publishing destinations
- TERA borrower data linkage
- Any open API surface
