# Coaching Member Access Model

**Last updated:** 2026-05-27

## Tiers

| Tier | Price | DB role | Member Area |
|------|-------|---------|-------------|
| LO Mastery Coaching | $249/mo | `coaching_member_level_1` | `/member-area/lo-mastery/` |
| Loan Factory Alliance | $449/mo | `coaching_member_level_2` | `/member-area/alliance/` |

## $249 LO Mastery — includes

- Daily Power Hour
- Biweekly group coaching
- Daily coaching email
- Certified Mortgage Advisor track
- Scripts library
- Trackers
- Resource library
- Leaderboard
- LO Mastery Coaching AI Assistant

## $449 Alliance — includes

Everything in LO Mastery, plus:
- Daily Breakfast Club
- Weekly coaching
- Biweekly Mastermind sessions
- Advanced certifications
- Priority coaching
- Leadership / Team Builder track
- Mastermind resources
- Alliance AI Coaching Assistant

## Tier storage

Member tier lives in `profiles.coaching_tier`. AI Twin tier mapping lives
in `src/data/aiTwinPersonas.ts`. Per-coach assignments live in
`coaching_assignments`.

## Tier entitlement behavior (implemented 2026-05-28)

Central helper: **`src/lib/coachingAccess.ts` → `getCoachingAccess()`** (server,
View-As aware). Reusable locked UI: **`src/components/LockedResourceCard.tsx`**.

### Access matrix

| Effective role | LO Mastery ($249) | Alliance ($449) | Behavior |
|---|---|---|---|
| `master_admin`, `admin` | Full | Full | Sees everything (`isStaff`) |
| `lo_development_lead`, `lo_development_member`, `lo_development`, `corporate_coach`, `team_leader` | Full | Full | Staff/coach/support access to both tiers |
| `coaching_member_level_2` | Full | Full | Alliance member |
| `coaching_member_level_1` | Full | **Upgrade preview** | Sees Alliance hub with premium items shown as locked cards: "Upgrade to Loan Factory Alliance for this resource." |
| normal approved LO (no tier) | **Members only** | **Members only** | Sees coaching overview + CTA; member resources locked with preview |

`profiles.coaching_tier` is honored as a secondary signal for the real user
(values containing `alliance`/`level_2`/`449` → Alliance; `mastery`/`level_1`/`249`
→ LO Mastery). Role is the primary signal.

### View-As compatibility

`getCoachingAccess()` consumes `getViewAsState()` (the admin-only, httpOnly
`lf_view_as` cookie). When an admin (or internal preview) has an active View-As,
pages render AS the viewed role — so Jeremy can record the LO Mastery member
view, the Alliance member view, and the non-member view from one admin account.
A "View-As preview: <role>" chip appears on the gated pages. Non-admins can never
escalate (the cookie can only be set by `resolveAdminAccess`-gated `/api/view-as`).

### No dead buttons

Locked cards and gated pages never present a dead control. Upgrade/join CTAs
route to the tier overview pages (`/lo-mastery-coaching/`, `/loan-factory-alliance/`)
and every gated page offers "Contact the coaching team" → `/support-routing/`,
since live enrollment is not wired yet.

### Gated routes

`/member-area`, `/member-area/lo-mastery`, `/member-area/alliance` apply the
entitlement. The `/member-area/*` resource subroutes (trackers, scripts,
recordings, etc.) redirect to shared canonical top-level routes available to all
coaching members; the paid differentiation lives on the Alliance hub's premium
cards. `/coaching`, `/lo-mastery-coaching`, `/loan-factory-alliance` remain open
overview/preview pages with join CTAs.
