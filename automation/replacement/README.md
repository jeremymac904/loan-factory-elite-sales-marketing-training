# automation/replacement — Scheduled Drive→YouTube replacement runner

This folder holds the **runner wiring and report template** for the daily
Drive→YouTube replacement loop. The actual logic lives in
`scripts/replace-drive-with-youtube.mjs`; the design lives in
`docs/video-hosting-replacement-workflow.md`.

> **Nothing here is activated this sprint.** All runner definitions are reference
> drafts kept disabled. No uploads, no `--apply`, no `git push`, no n8n activation.

## Files

| File | Purpose |
| --- | --- |
| `daily-report-template.md` | Token template the runner renders into a dated report under `reports/`. |
| `aionui-task.json` | Reference definition for the daily 08:00 AionUI scheduled task (DRY-RUN). Disabled. |
| `n8n-replacement-workflow.draft.json` | Reference n8n Schedule→Execute-Command workflow (DRY-RUN). `active: false`. |
| `reports/` | Where dated DRY-RUN reports land once the runner is enabled (created on first run). |

## What the runner does (DRY-RUN, daily 08:00 America/Chicago)

1. `node scripts/replace-drive-with-youtube.mjs --json`
2. Capture the `JSON_REPORT_BEGIN … JSON_REPORT_END` block from stdout.
3. Substitute tokens in `daily-report-template.md`; save to
   `reports/YYYY-MM-DD-replacement-report.md`.
4. If `counts.newlyReplaced > 0`, notify Jeremy: "N clips ready — approve `--apply`."

The `--apply` step is **never scheduled**. It is human-invoked after Jeremy approves.

## Choice of runner

Primary: **AionUI scheduled task** on Jeremy's machine (same host as this repo, so the
script can read/edit the working tree and the change flows through normal git review).
Secondary/optional: **n8n** Schedule Trigger → Execute Command that shells out to the
same Node command — left `active: false`. See the workflow doc §5 for the full rationale
(n8n is great for API orchestration, poor for safely editing TS source behind a human
`--apply` + local build gate).
