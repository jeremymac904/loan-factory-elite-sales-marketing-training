# Training Library YouTube Embed Sync Blueprint

## Workflow purpose

After Jeremy approves a YouTube video for embedding in the internal Training Library / AI Advantage video grid, this workflow updates the metadata file `src/data/aiTrainingVideos.ts` (or the equivalent target file under `src/data/`) to add or update the embed entry. The update is delivered as a pull request on a feature branch — never a direct commit to `main`. Internal training clips are accessible to approved Loan Factory users by default; this workflow does not add any compliance flag, hidden review queue, or visibility gate.

## Trigger

- **Type:** Manual — runs only after Jeremy approves a specific video for embed via admin UI or n8n manual trigger
- Optionally accepts a queue of approved video_ids written to a planned `training_embed_approvals` table

## Inputs

| Field | Type | Required | Source |
|-------|------|----------|--------|
| `video_id` | string (YouTube id, 11 chars) | yes | manual input or `training_embed_approvals.video_id` |
| `module_slug` | string (e.g., `ai-advantage`, `closer-academy`) | yes | manual input |
| `display_title` | string (max 120) | yes | manual input |
| `display_order` | integer | no (auto-append if null) | manual input |
| `approved_by_user_id` | uuid | yes | bearer token claim |
| `dry_run` | boolean | yes (default true) | env `DRY_RUN` |

## Status field

- New table `training_embed_approvals.status` — `pending_pr`, `pr_opened`, `pr_merged`, `failed`, `skipped_dry_run`

## Duplicate protection

- Workflow short-circuits if the `video_id` is already present in the target metadata file for the same `module_slug`
- Unique constraint on `(video_id, module_slug)` in `training_embed_approvals`

## Dry-run mode

When `DRY_RUN=true`:
- Reads the target metadata file from the repo
- Computes the diff
- Writes the diff into `workflow_runs.affected_row_ids` as a JSON snippet
- Does NOT open a PR
- Marks `training_embed_approvals.status = 'skipped_dry_run'`

## Failure logging

- Run logged to `workflow_runs`
- GitHub API failure (auth, branch conflict, file conflict) sets `training_embed_approvals.status = 'failed'` with `error_message`
- PR open success records the PR URL on the approval row

## Writeback fields

- `training_embed_approvals` — `status`, `pr_url`, `branch_name`, `status_updated_at`, `last_workflow_run_id`
- Repo — new branch `training-embed/<module_slug>/<video_id>` with a single commit updating `src/data/aiTrainingVideos.ts`
- PR body lists: video_id, module, approver, link to YouTube
- Internal training clip rule: no compliance flag set, no visibility gate added, no review queue field touched

## Credentials required

- GitHub PAT scoped to the platform repo with `repo` scope, restricted to opening PRs (never merging)
- Supabase service role JWT (read `training_embed_approvals`; write `training_embed_approvals`, `workflow_runs`)
- No Google credentials, no AI provider key

## Safe test path

1. Use a fork of the platform repo for the GitHub PAT
2. Provide a known test video_id
3. `DRY_RUN=true` — verify the computed diff in `workflow_runs`
4. Run with `DRY_RUN=false` against the fork — verify branch + PR created
5. Switch the PAT to the production repo only after Jeremy approval

## Disabled / manual-first rule

- Workflow ships disabled
- No connection to a queue table on first deploy — every run is a single manual invocation with explicit `video_id`
- Queue-mode (reading `training_embed_approvals` for `status = 'pending_pr'`) enabled only after manual mode has been used cleanly for at least 5 approvals

## What must never happen automatically

- Never commit directly to `main` — feature branch + PR only
- Never auto-merge the PR — Jeremy reviews every embed change
- Never set a compliance flag on an internal training clip
- Never put an internal training clip behind a hidden review queue
- Never alter YouTube upload visibility (this workflow does not call YouTube write endpoints)
- Never remove an existing embed entry (this workflow is add/update only — removals require a separate, explicit workflow)
- Never operate without an `approved_by_user_id` and an audit row
- Never include borrower / lender / external party data in the metadata file
- Never assume the YouTube upload is public — embed status is independent of YouTube visibility; if the video is unlisted/private the embed simply won't render for end users until YouTube visibility changes
