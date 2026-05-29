# AI Twin Recurring Task Blueprint

## Workflow purpose

The `scheduled_tasks` table holds per-user recurring AI Twin work items: a reminder to follow up with a referral partner, a coaching nudge, a weekly self-review prompt, etc. Every 15 minutes this workflow scans for due rows, runs the AI Twin generation step per task type (`reminder`, `follow_up`, `coaching_nudge`), writes the draft into the appropriate target (in-app `ai_messages` thread, or a Gmail draft via blueprint 2), updates `last_run_at` and `next_run_at`, and logs to a new `task_runs` audit table.

## Trigger

- **Type:** Cron — every 15 minutes
- Cron node ships disabled

## Inputs

| Field | Type | Required | Source |
|-------|------|----------|--------|
| `as_of` | timestamptz | yes | cron run time |
| `batch_limit` | integer | no (default 50) | env var |
| `task_type_filter` | string[] (optional) | no | workflow param |
| `dry_run` | boolean | yes (default true) | env `DRY_RUN` |

Per-row inputs from `scheduled_tasks`:
- `id`, `user_id`, `ai_twin_id`, `task_type`, `payload jsonb`, `next_run_at`, `cadence`, `status`, `last_run_at`

## Status field

- `scheduled_tasks.status` — `active`, `paused`, `completed`, `failed`, `archived`
- Workflow only processes `status = 'active' AND next_run_at <= now()`
- Per-run state lives in `task_runs.status`: `succeeded`, `failed`, `skipped_dry_run`, `partial`

## Duplicate protection

- Unique constraint on `task_runs (scheduled_task_id, scheduled_for)`
- `scheduled_for` is set to the `next_run_at` value at dispatch time
- Workflow uses Postgres `SELECT ... FOR UPDATE SKIP LOCKED` to ensure two concurrent runs don't double-process the same row

## Dry-run mode

When `DRY_RUN=true`:
- Reads due tasks
- Calls the AI provider ONLY if `DRY_RUN_INCLUDE_LLM=true` (default false — saves quota)
- Writes a `task_runs` row with `status = 'skipped_dry_run'`
- Does NOT update `scheduled_tasks.last_run_at` or `next_run_at`
- Does NOT write `ai_messages` or trigger Gmail draft creation

## Failure logging

- New table `task_runs (id, scheduled_task_id, scheduled_for, status, started_at, finished_at, output_summary, error_message, error_stack, last_workflow_run_id)`
- Per-row failure increments `scheduled_tasks.consecutive_failures`
- 3 consecutive failures auto-pauses the task (`status = 'paused'`) and creates a `facegram_notifications` row for the owning user
- Run-level summary written to `workflow_runs`

## Writeback fields

- `scheduled_tasks` — `last_run_at`, `next_run_at` (computed from `cadence`), `status` (if auto-paused), `consecutive_failures`
- `task_runs` — one row per processed task
- `ai_messages` — insert with `role = 'assistant'`, `ai_twin_id`, generated content (for in-app surface task types)
- `ai_chats.last_message_at` — updated
- For `follow_up` of type `email_draft`: dispatch to blueprint 2 (Gmail draft workflow) with the user's idempotency_key

## Credentials required

- Supabase service role JWT (read `scheduled_tasks`, `ai_twins`, `ai_chats`; write `scheduled_tasks`, `task_runs`, `ai_messages`, `workflow_runs`)
- AI provider key (Anthropic / OpenAI / equivalent), org-level, stored in n8n credentials store
- Internal API bearer to call blueprint 2 (for email-draft task types)

## Safe test path

1. Seed 3 test `scheduled_tasks` rows in a Supabase branch (one per task_type) with `next_run_at = now()`
2. Run cron once with `DRY_RUN=true, DRY_RUN_INCLUDE_LLM=false` — verify task_runs rows
3. Run with `DRY_RUN=true, DRY_RUN_INCLUDE_LLM=true` — verify AI output but no writes
4. Run with `DRY_RUN=false` against the branch — verify writebacks and `next_run_at` advancement
5. Enable cron in production after Jeremy approval

## Disabled / manual-first rule

- Cron ships disabled
- First production runs are manual via n8n UI with `batch_limit=5`
- Cron enabled after a week of clean manual runs

## What must never happen automatically

- Never send a Gmail message — email-draft task types create drafts only via blueprint 2
- Never process a task with `status != 'active'`
- Never re-run a task whose `task_runs` row for that `scheduled_for` already exists
- Never bypass the 50-row default batch limit without explicit override
- Never call the AI provider in `DRY_RUN` unless `DRY_RUN_INCLUDE_LLM=true` is set
- Never delete a `scheduled_tasks` row — pause or archive only
- Never spawn child tasks without an explicit `parent_task_id` link
- Never write `ai_messages` to a chat the user doesn't own (validate `ai_chats.user_id` first)
- Never auto-resume an auto-paused task — the user must reactivate from the UI
