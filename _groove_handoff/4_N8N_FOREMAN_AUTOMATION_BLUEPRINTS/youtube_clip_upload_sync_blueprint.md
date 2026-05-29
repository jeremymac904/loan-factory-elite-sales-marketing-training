# YouTube Clip Upload Sync Blueprint

## Workflow purpose

When Jeremy uploads a new video to the Loan Factory YouTube channel, this workflow pulls the new video's metadata (id, title, description, duration, publishedAt, thumbnail URL) and proposes an update to the platform's AI Advantage clip metadata file `src/data/aiTrainingVideos.ts`. It does **not** auto-publish the video into the internal Training Library. It opens a PR on a feature branch and pings Jeremy for review. No MP4s are downloaded, no local file paths are exposed, and no row is flipped to "live" without a human approval step.

## Trigger

- **Type:** Scheduled cron (every 30 min) OR manual run from n8n UI
- Schedule and trigger node both ship disabled. Manual trigger is enabled first.

## Inputs

| Field | Type | Required | Source |
|-------|------|----------|--------|
| `youtube_channel_id` | string | yes | n8n credential / env var |
| `last_synced_at` | timestamptz | yes | `youtube_sync_state.last_synced_at` |
| `max_results` | integer | no (default 25) | workflow param |
| `dry_run` | boolean | yes (default true) | env `DRY_RUN` |

## Status field

- `youtube_seen_video_ids.status` — enum: `seen`, `proposed_for_embed`, `pr_opened`, `merged`, `skipped`
- PR comment on GitHub carries human-readable status

## Duplicate protection

- Seen-id index table `youtube_seen_video_ids (video_id text primary key, first_seen_at timestamptz, status text, last_workflow_run_id uuid)`
- Workflow short-circuits any `video_id` already present and writes a `skipped` row to `workflow_runs`

## Dry-run mode

When `DRY_RUN=true`:
- YouTube Data API read still runs
- No insert into `youtube_seen_video_ids`
- No PR opened
- `workflow_runs` row written with `status = 'skipped_dry_run'` and `affected_row_ids` listing the video ids that WOULD have been inserted

## Failure logging

- All errors (YouTube quota, GitHub API failure, Supabase write failure) write a row to `workflow_runs` with `status = 'failed'`, full `error_message` and `error_stack`
- Admin dashboard surfaces failed runs

## Writeback fields

- `youtube_seen_video_ids` — insert new row per new video_id
- `youtube_sync_state.last_synced_at` updated to the workflow start time only on `succeeded`
- `aiTrainingVideos.ts` — **never written directly**; only via PR on a feature branch named `youtube-sync/<video_id>`

## Credentials required

- YouTube Data API v3 read scope (API key or OAuth, read-only)
- GitHub PAT with `repo` scope on the platform repo (scoped to opening PRs against feature branches, not main)
- Supabase service role JWT (write to `youtube_seen_video_ids`, `youtube_sync_state`, `workflow_runs`)

## Safe test path

1. Run against a test YouTube channel under Jeremy's account, not the live Loan Factory channel
2. Target a fork or test repo for PR creation, not the production repo
3. `DRY_RUN=true` for first 3 cycles
4. Verify `workflow_runs` shows accurate `affected_row_ids`
5. Switch to live channel + production repo with `DRY_RUN=false` only after Jeremy approval

## Disabled / manual-first rule

- Cron schedule defined but workflow inactive on deploy
- Manual trigger enabled after dry-run sign-off
- Cron enabled only after one week of clean manual runs

## What must never happen automatically

- Never auto-merge the PR — Jeremy reviews every metadata change
- Never download the MP4 to the n8n host
- Never expose local file paths in the metadata file
- Never write directly to `main` — always via feature branch + PR
- Never flip an `aiTrainingVideos.ts` entry from `draft` to `published` without Jeremy approval
- Never apply a compliance flag — internal training clips are accessible to approved Loan Factory users by default
- Never send email or external notification (use admin dashboard only)
- Never call YouTube write endpoints (this workflow is read-only on YouTube)
