# FaceGram Product Roadmap

## Status

Planning source of truth for FaceGram. This document updates the older Creator Network planning docs. The user-facing brand is **FaceGram**.

This is a roadmap only. It does not authorize payment wiring, vendor publishing, external social publishing, email sends, n8n workflows, TERA writes, borrower data access, or production database changes.

## Product Definition

FaceGram is Loan Factory's internal social platform for loan officers, team leaders, LO Development, corporate coaches, marketing reviewers, approved internal teams, and later approved vendors or wholesale partners.

The product should feel familiar, close to a simple internal Facebook-style experience:

- A main feed
- Stories
- Reels
- Groups
- Events and training posts
- Comments and reactions
- Saved posts and resources
- A right rail for useful internal highlights and approved sponsored content

It must stay simple enough for non-technical loan officers. The first beta should show fewer choices, plain labels, and no fake actions.

## Non-Negotiable Safety Boundaries

- FaceGram is internal only.
- No public profiles.
- No public sharing links.
- No borrower data.
- No external posting.
- No uncontrolled vendor messaging.
- No rate, fee, APR, approval, or underwriting claims.
- No claims that Loan Factory has an open API.
- No TERA read or write behavior.
- Sponsored content must be clearly labeled.
- Sponsored posts, events, and vendor resources require admin or marketing approval before appearing.

## Core Content Types

FaceGram should eventually support these post types:

| Type | Purpose | Beta behavior |
|---|---|---|
| Text post | Questions, wins, scripts, coaching notes | Can be static/demo until posting is wired |
| Image post | Marketing examples, screenshots, training visuals | Hide upload if not functional |
| Video post | Internal training clips and examples | Link/embed only until storage rules are finalized |
| Story | Short temporary internal updates | Show as simple story cards first |
| Reel | Short training or marketing examples | Show as labeled short-video cards first |
| Event/training post | Calls, classes, office hours, webinars | Can be read-only cards in beta |
| Sponsored vendor/lender post | Approved partner promotion or class | Must be labeled Sponsored and approval-gated |

## Groups

FaceGram groups are a major product surface, not a side feature.

### Group Types

| Group type | Who can create | Notes |
|---|---|---|
| Official group | LO Development/Admin | Company-wide or program-level groups |
| Team group | Team Leader | Scoped to that team |
| Marketing/resource group | Marketing/Admin | Approved marketing, scripts, resources, examples |
| Coaching group | Corporate Coach/Admin | Coaching cohorts, office hours, certification |
| Vendor/lender group | Paid vendor account later, approved by Admin | Not available for open beta creation |

### Beta Rule

Do not let everyone create groups in beta. Group creation should be restricted to Admin, LO Development, Marketing/Admin, Corporate Coach, and approved Team Leaders. Vendor group creation waits until vendor approval and monetization rules are defined.

## Right Rail Direction

The FaceGram right rail should not show random filler. It should be reserved for useful, approved, clearly labeled items:

- Sponsored lender/vendor promotions
- Upcoming sponsored training classes
- Approved vendor resources
- Featured partner events
- Trending internal posts
- Official LO Development reminders
- Training events and coaching calls

Every sponsored item must include a visible **Sponsored** label and should route through review before display.

## Vendor / Wholesale Partner Direction

FaceGram should build toward a separate Vendor / Wholesale Partner landing page.

### Free Vendor Tier

- Vendor profile
- Approved participation
- Partner directory listing
- Read/comment participation only where approved

### Paid Vendor Tier

- Vendor-owned approved group
- Sponsored posts
- Sponsored training classes
- Live events
- Featured promotions/resources
- Future analytics

No payment, billing, Stripe, or subscription logic should be wired until explicitly approved.

## Recommended Beta UI

The first working beta should use a simple layout:

- Left rail: Home, Groups, Events, Saved, Resources
- Center: stories row, simple post composer, feed
- Right rail: upcoming training, approved sponsored items, trending internal posts
- Group page: cover, plain description, rules, posts, pinned resources

Use simple labels:

- Post
- Story
- Reel
- Group
- Event
- Sponsored
- Save
- Comment

Avoid:

- Non-clickable pills
- Prototype warnings
- Internal engineering notes
- Long explanations
- A large list of features users cannot use
- Buttons that pretend to publish or send

## Data Model Roadmap

The current beta schema has lean `facegram_*` tables. Future FaceGram should evolve toward these concepts:

- `facegram_groups`
- `facegram_group_members`
- `facegram_posts`
- `facegram_post_media`
- `facegram_comments`
- `facegram_reactions`
- `facegram_saved_posts`
- `facegram_stories`
- `facegram_reels`
- `facegram_events`
- `facegram_vendor_profiles`
- `facegram_vendor_tiers`
- `facegram_sponsored_items`
- `facegram_sponsored_reviews`
- `facegram_moderation_notes`

Do not add these tables until a migration sprint is explicitly approved.

## Build Phases

### Phase 0: Auth Gate

- Supabase auth must work before FaceGram beta testing.
- `/auth/status` must show approved roles.
- Admin must load for approved admin users.

### Phase 1: Simple Internal Beta

- Auth-gated FaceGram home
- Readable internal feed
- Simple group browsing
- Basic post composer only if Supabase session is reliable
- Demo-safe stories/reels/events sections
- No vendor publishing
- No payments
- No external posting

### Phase 2: Useful Community Features

- Create posts
- Comment
- React
- Save
- Group pages
- Admin/marketing moderation queue
- Team Leader group creation by approval

### Phase 3: Events, Reels, Stories

- Event/training posts
- Story cards
- Short internal reel posts
- Pinned resources
- Better search and filtering

### Phase 4: Vendor / Sponsored Content

- Vendor landing page
- Approved vendor profiles
- Sponsored content submission
- Sponsored content review queue
- Approved sponsored right rail
- Approved vendor-owned groups for paid partners

### Phase 5: Monetization and Analytics

- Payment/billing only after explicit approval
- Vendor analytics
- Sponsored campaign reporting
- Renewal workflow

## Acceptance Criteria For Next FaceGram UI Sprint

- A loan officer understands the page in 5 seconds.
- Visible sections include Posts, Stories, Reels, Groups, Events, and Sponsored.
- Non-functional actions are hidden or clearly disabled.
- Sponsored content is clearly labeled.
- Group creation is not open to everyone.
- No public publishing is implied.
- No vendor can publish freely.
- No borrower or loan data is shown.
