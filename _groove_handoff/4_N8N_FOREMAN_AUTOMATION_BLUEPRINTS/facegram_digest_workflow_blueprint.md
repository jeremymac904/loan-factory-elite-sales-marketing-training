# FaceGram Digest Workflow Blueprint

## Workflow purpose

Once a week, summarize FaceGram activity (new posts, top reactions, top comments, new follows, group highlights) over the prior 7 days and deliver an internal-only digest to each approved Loan Factory user via a `facegram_notifications` row, with an optional Google Chat space post for high-traffic groups. **Email is not used.** Users can opt out per-user. The digest is internal-only and references only Loan Factory users and Loan Factory groups.

## Trigger

- **Type:** Cron schedule — Sunday 18:00 (Central, server time)
- Cron node ships disabled

## Inputs

| Field | Type | Required | Source |
|-------|------|----------|--------|
| `window_start` | timestamptz | yes | computed: now() - interval '7 days' |
| `window_end` | timestamptz | yes | computed: now() |
| `group_filter` | uuid[] (optional) | no | manual override during testing |
| `dry_run` | boolean | yes (default true) | env `DRY_RUN` |

## Status field

- New table `facegram_digest_runs.status` — enum: `succeeded`, `failed`, `partial`, `skipped_dry_run`
- `facegram_digest_runs.digest_run_at` (window_end snapshot, also used as duplicate key)

## Duplicate protection

- Unique constraint on `(user_id, digest_run_at::date)` in a new `facegram_digest_deliveries` table
- Workflow checks delivery existence per user per run date before insert

## Dry-run mode

When `DRY_RUN=true`:
- Computes the digest content per user
- Writes a `facegram_digest_runs` row with `status = 'skipped_dry_run'`
- Writes NO `facegram_notifications` rows
- Skips any Google Chat post

## Failure logging

- Run logged to `workflow_runs` and `facegram_digest_runs`
- Per-user delivery failure (RLS denial, missing user) logged into `facegram_digest_deliveries` with `status = 'failed'`
- Run with > 5% failure rate marks `facegram_digest_runs.status = 'partial'` and surfaces in admin dashboard

## Writeback fields

- `facegram_digest_runs` — one row per run
- `facegram_digest_deliveries` — one row per user per run
- `facegram_notifications` — insert with `kind = 'weekly_digest'`, `body`, `link`
- Optional: Google Chat space post via the chat notification blueprint (workflow 3) — no direct webhook call from this workflow

## Credentials required

- Supabase service role JWT (read `facegram_posts`, `facegram_comments`, `facegram_reactions`, `facegram_follows`, `facegram_group_members`; write `facegram_notifications`, `facegram_digest_runs`, `facegram_digest_deliveries`, `workflow_runs`)
- Optional Google Chat webhook (only for the group-highlights leg, gated through workflow 3)

## Safe test path

1. Run against a Supabase branch with seed data spanning the 7-day window
2. `DRY_RUN=true` — verify computed payload per test user
3. Verify duplicate protection by re-running same window
4. Switch to `DRY_RUN=false` with a test user list of 3 accounts
5. Promote to all users only after Jeremy approval

## Disabled / manual-first rule

- Cron disabled on deploy
- Manual trigger used for the first 2 weeks, restricted to a pilot group via `group_filter`
- Cron enabled after pilot sign-off

## What must never happen automatically

- Never send email
- Never include content from outside the configured FaceGram groups
- Never reveal another user's PII beyond what FaceGram itself already shows
- Never deliver to a user with `facegram_notifications.weekly_digest_opt_in = false`
- Never deliver to inactive or archived users
- Never link to a post the user lacks RLS permission to read (validate links before sending)
- Never deliver more than one digest per user per week (duplicate protection)
- Never broadcast across external Google Chat tenants
