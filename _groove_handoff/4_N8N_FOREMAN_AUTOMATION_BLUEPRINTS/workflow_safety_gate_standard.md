# Workflow Safety Gate Standard

Every n8n workflow blueprint in this package MUST inherit and implement the controls below. Anything not covered here defaults to "disabled and requires Jeremy approval." This standard exists to protect approved Loan Factory users, the Supabase data layer, and external accounts (Gmail, Google Chat, YouTube).

---

## 1. Trigger Types Allowed

**Allowed:**
- Cron / scheduled trigger (n8n schedule node)
- Manual trigger (admin clicks a button in the internal Loan Factory app, or runs the workflow from the n8n UI)
- Supabase row-insert / row-update webhook authenticated via service-role JWT or HMAC-signed payload
- Authenticated internal API call from the Loan Factory app (bearer token tied to an approved user)

**Forbidden:**
- Public unauthenticated webhook URLs
- Mass-broadcast email triggers
- Any external public-facing webhook without HMAC signature verification or auth header
- Triggers that fan out to all users without an explicit per-user opt-in row

---

## 2. Inputs Schema Requirement

Every workflow must declare a typed input contract at the top of its blueprint and validate it in the first node:

- Field name
- Type (uuid, string, integer, timestamp, jsonb, enum)
- Required vs optional
- Source (which Supabase table column, which API caller, which cron parameter)

Invalid inputs short-circuit the workflow and log to the failure audit table — they never propagate downstream.

---

## 3. Status Field On Every Row

Every row created or updated by a workflow must carry a `status` column (or equivalent enum like `state`, `run_status`, `sync_status`). Allowed states at minimum:

- `pending`
- `running`
- `succeeded`
- `failed`
- `skipped_dry_run`
- `requires_review`

No silent updates. Every state change is timestamped (`status_updated_at`).

---

## 4. Duplicate Protection

Every workflow must pick one and document it in the blueprint:

- **Idempotency key:** Workflow accepts an `idempotency_key` input and checks `workflow_runs` for a prior success with the same key.
- **Seen-id index table:** For sync workflows (e.g., YouTube), maintain a small table (`youtube_seen_video_ids`, etc.) and skip any id already present.
- **Database uniqueness constraint:** Use a Postgres unique index on the natural key (e.g., `gmail_draft_id`, `(user_id, scheduled_task_id, scheduled_for)`).

A workflow with no documented duplicate protection cannot ship.

---

## 5. Dry-Run Mode

Every workflow must support `DRY_RUN=true` as an environment variable or input flag.

When `DRY_RUN=true`:
- All read operations execute normally.
- All write operations (Supabase insert/update, Google API calls, AI provider calls that cost money) are **skipped**.
- The workflow logs what it WOULD have done into `workflow_runs` with `status = 'skipped_dry_run'`.
- Output JSON includes a `dry_run: true` flag for downstream nodes.

Dry-run is the default during pre-launch testing.

---

## 6. Failure Logging

A new Supabase table (planned):

```
workflow_runs (
  id uuid primary key,
  workflow_name text not null,
  workflow_version text,
  trigger_type text,
  inputs jsonb,
  status text not null,        -- succeeded | failed | skipped_dry_run | partial
  error_message text,
  error_stack text,
  started_at timestamptz,
  finished_at timestamptz,
  affected_row_ids jsonb,
  dry_run boolean default false
)
```

Every workflow run — success or failure — writes exactly one row to `workflow_runs`. Failures additionally surface to the admin dashboard. No workflow swallows errors silently.

---

## 7. Writeback Fields Required

Every workflow that mutates a Supabase row must update:

- `status`
- `status_updated_at`
- `last_run_at` (where the row represents a recurring task)
- `last_workflow_run_id` (foreign key to `workflow_runs.id`)

This guarantees every state change is traceable back to a specific workflow run.

---

## 8. Credentials Required

Credentials are declared per workflow. They live in the n8n credentials store or Supabase Vault. **Never inlined in the blueprint, never committed to the repo, never logged.**

Categories:

- **Supabase service role JWT** — required for writes from n8n; restricted via RLS where possible
- **Google OAuth per-user tokens** — read from `google_connections`; scopes are minimum-necessary (`gmail.compose`, not `gmail.send` until approved)
- **Google Chat webhook URLs** — space-level, stored as separate credentials per space
- **AI provider key** — single org-level key (Anthropic / OpenAI / equivalent), rotated quarterly
- **YouTube Data API read key or OAuth** — read-only

---

## 9. Safe Test Path

Before any workflow flips from blueprint to live:

1. Build in n8n against the Supabase **branch database** (created via Supabase branching), never against main project.
2. Use a designated test user (`test+loanfactory@…`) — never a real LO.
3. Run with `DRY_RUN=true` for at least one full cycle; verify `workflow_runs` rows.
4. Run with `DRY_RUN=false` against the branch — verify writeback rows.
5. Jeremy reviews `workflow_runs` output, sample writebacks, and any external side effects.
6. Promote to main only after explicit written approval.

---

## 10. Disabled / Manual-First Rule

- Every workflow ships in the **disabled** state in n8n.
- The default trigger is manual until Jeremy enables the schedule/webhook.
- Cron-triggered workflows have their schedule defined but the workflow itself is inactive.
- Admin toggles activation from the n8n UI after sign-off.

---

## 11. What Must Never Happen Automatically

The following are **absolute prohibitions** across every workflow:

- No bulk emails to multiple recipients
- No auto-send of any Gmail message — drafts only, user clicks send from Gmail UI
- No compliance flags applied to internal training clips (they are accessible to approved Loan Factory users by default)
- No hidden review queues for internal training content
- No Supabase `DELETE` operations from any workflow (use `archived = true` or `status = 'archived'` instead)
- No destructive operations on `aiTrainingVideos.ts` or any metadata file — changes go via PR to a feature branch, never directly to `main`
- No outbound communication to lenders or external parties from automation
- No n8n trigger activation without Jeremy approval
- No use of production credentials during testing
- No workflow that fans out to all users without a per-user opt-in row

---

## 12. Approval Workflow

1. Blueprint reviewed by Jeremy.
2. n8n implementation built in disabled state.
3. Branch-database dry-run cycle completed.
4. Sample output and `workflow_runs` rows shown to Jeremy.
5. Jeremy provides written go-live approval (Slack / email / commit message).
6. Workflow enabled in n8n production.
7. First 24 hours monitored; rollback path documented in the blueprint.

Any change to an active workflow restarts the approval cycle from step 3.
