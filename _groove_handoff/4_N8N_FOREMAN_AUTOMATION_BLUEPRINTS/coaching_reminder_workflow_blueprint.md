# Coaching Reminder Workflow Blueprint

## Workflow purpose

Active $249 and $449 Loan Factory coaching members receive recurring nudges tied to their cadence: daily morning check-in, weekly Monday planning prompt, biweekly Mastermind reminder for $449 members. This workflow reads `coaching_assignments`, builds the next scheduled prompt per member, and inserts a `scheduled_tasks` row plus an optional in-app `facegram_notifications` row. It does **not** send email by default. If a future Gmail-draft variant is approved, it would generate drafts only — never auto-send.

## Trigger

- **Type:** Cron schedule
  - Daily 08:00 local member timezone (resolved via `profiles.timezone`)
  - Weekly Monday 07:30 local
  - Biweekly (alternating Mondays for $449 Mastermind) 09:00 local
- All three cron nodes ship disabled

## Inputs

| Field | Type | Required | Source |
|-------|------|----------|--------|
| `cadence` | enum (`daily`, `weekly`, `biweekly_mastermind`) | yes | cron node param |
| `as_of` | timestamptz | yes | cron run time |
| `dry_run` | boolean | yes (default true) | env `DRY_RUN` |

Per-member resolution reads:
- `coaching_assignments (user_id, tier, status, started_at, cadence_overrides)`
- `profiles (timezone, full_name)`

## Status field

- `scheduled_tasks.status` — `pending`, `delivered_in_app`, `failed`, `skipped_dry_run`, `skipped_opted_out`
- `facegram_notifications.status` — existing column

## Duplicate protection

- Unique constraint on `(user_id, task_type, scheduled_for::date)` in `scheduled_tasks`
- Workflow checks for an existing row before insert and skips with `status = 'skipped_duplicate'`

## Dry-run mode

When `DRY_RUN=true`:
- Resolves the full member list and prompt payloads
- Inserts NO `scheduled_tasks` or `facegram_notifications`
- Writes one summary row to `workflow_runs` listing intended user_ids in `affected_row_ids`

## Failure logging

- Run-level: `workflow_runs`
- Per-user failure (e.g., missing timezone, invalid tier) writes a `scheduled_tasks` row with `status = 'failed'` and `error_message`
- Daily summary surfaced to admin dashboard

## Writeback fields

- `scheduled_tasks` — insert with `task_type`, `scheduled_for`, `payload`, `status`, `created_at`, `last_workflow_run_id`
- `facegram_notifications` — insert with `user_id`, `kind = 'coaching_reminder'`, `body`, `link`
- `coaching_assignments.last_reminder_at` updated on success

## Credentials required

- Supabase service role JWT (read `coaching_assignments`, `profiles`; write `scheduled_tasks`, `facegram_notifications`, `workflow_runs`)
- No Google credentials in v1 (no email)
- No AI provider key in v1 (prompts are templated, not LLM-generated)

## Safe test path

1. Seed a test user with `coaching_assignments.tier = '249'` and `status = 'active'`
2. Run with `DRY_RUN=true` for each cadence
3. Verify `workflow_runs` shows the test user
4. Switch to `DRY_RUN=false`, verify exactly one `scheduled_tasks` row + one `facegram_notifications` row
5. Add a $449 test user and verify biweekly Mastermind path
6. Promote to live cron after Jeremy approval

## Disabled / manual-first rule

- All cron nodes inactive on deploy
- Workflow is run manually for the first week with a single test user
- Cron enabled in stages: $249 daily first, then weekly, then $449 biweekly

## What must never happen automatically

- Never send Gmail messages — drafts not in v1, send never
- Never bulk-email any group of members
- Never insert a `scheduled_tasks` row without checking opt-out (`coaching_assignments.notifications_paused = true`)
- Never charge against AI provider quota (no LLM calls in v1)
- Never write a notification with PII beyond the user's first name
- Never run during a Supabase maintenance window flagged in admin config
- Never auto-resume notifications for a member whose `status` is `paused`, `cancelled`, or `churned`
- Never assume timezone — skip and log if `profiles.timezone` is null
