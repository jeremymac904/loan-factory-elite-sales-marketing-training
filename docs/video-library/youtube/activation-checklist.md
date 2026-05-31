# YouTube Upload Automation — Activation Checklist (APPROVAL GATE)

> **DO NOT activate without Jeremy's explicit approval.**
> The n8n workflow ships `"active": false`. Nothing has been uploaded to Google
> Drive or YouTube. Source mp4 files are unmodified. All 91 clips are queued
> `pending`, `unlisted`, `notify=false`, with empty Drive/YouTube URLs. Going
> live moves ~7.7 GB of video to Jeremy's Google account — that is a deliberate,
> approved action, not a default.

This is the gate that must be cleared, in order, before the automation may run
even once.

---

## Pre-flight (Jeremy decisions)

- [ ] **Approval to upload at all.** Jeremy explicitly says "yes, upload the LO
      Development clips to YouTube as unlisted." (No upload happens without this.)
- [ ] **Target channel confirmed.** Which YouTube channel / brand account
      receives the 91 clips? (Personal vs. a Loan Factory brand account.)
- [ ] **Google account confirmed.** The ~7.7 GB lands on this Google account's
      storage/quota; confirm it is the intended one.
- [ ] **Privacy confirmed = unlisted.** No clip is published publicly. (Hard-coded,
      but confirm the policy.)
- [ ] **Notify subscribers = false confirmed.** No subscriber notifications.
      (Hard-coded, but confirm.)
- [ ] **Batch size confirmed = 5/day** (or explicitly raised to 6 if the channel
      has upload history). Finishing 91 at 5/day takes ~19 days.
- [ ] **Schedule confirmed = 08:00 America/Los_Angeles**, once daily.
- [ ] **Playlist confirmed = "LO Development Resource Clips"** for all 91.

---

## Google Cloud / OAuth setup

- [ ] A Google Cloud project exists with **YouTube Data API v3 enabled**.
- [ ] OAuth consent screen configured (internal/testing is fine for an unlisted
      internal library).
- [ ] OAuth client created; **Jeremy completes the consent flow** granting:
      - `https://www.googleapis.com/auth/youtube.upload` (required to upload)
      - `https://www.googleapis.com/auth/youtube.force-ssl` (required to read
        status / manage playlist items)
- [ ] Confirm the project's **daily quota = 10,000 units** (default). If a higher
      throughput is ever wanted, a quota increase request is a separate,
      approved step — not needed for 5/day.

> **Quota reminder:** one resumable upload (`videos.insert`) ≈ 1,600 units.
> 5 uploads ≈ 8,000 units/day, under the 10,000 cap. Do not exceed 6/day on this
> default quota.

---

## n8n wiring

- [ ] Import `automation/n8n/youtube-upload-workflow.draft.json` into n8n.
- [ ] Create the n8n credential **"Jeremy YouTube (youtube.upload)"** and replace
      the `REPLACE_WITH_JEREMY_YOUTUBE_OAUTH2_CREDENTIAL` placeholder on the
      `YouTube Upload (UNLISTED)` node.
- [ ] Set the n8n instance **timezone to America/Los_Angeles** (so cron 8 AM = PT).
- [ ] Decide the **mp4 source path** and add the binary node before the upload
      node:
      - Local n8n volume → add `Read Binary File` resolving `localFileName`, OR
      - Google Drive → add `Google Drive: Download` resolving `driveFileLink`
        (requires a Drive OAuth credential with `drive.readonly`).
- [ ] Point the `Read Upload Queue Manifest` node at the deployed queue JSON
      (`$env.LF_UPLOAD_QUEUE_PATH`).
- [ ] Choose the **status write-back store** (committed JSON via PR / Google Sheet
      / Supabase) and wire the success + failure patches to it. (Supabase = schema
      change = separate approval.)

---

## Dry run (no real upload)

- [ ] Run the workflow **manually** with the upload node temporarily set to
      **pin/mock data** (n8n "Execute Node" with pinned output) to confirm:
      - the filter keeps only `pending` clips,
      - the limit caps at 5,
      - success/failure branches and the report node behave.
- [ ] Optionally upload **one** clip manually to verify the OAuth credential and
      `privacyStatus=unlisted` actually take effect, then check it appears
      unlisted in YouTube Studio. (Counts as ~1,600 quota units.)

---

## Go-live

- [ ] **Jeremy gives final explicit approval to enable the workflow.**
- [ ] Set the workflow `active: true` and enable it in n8n.
- [ ] Monitor day 1: confirm exactly 5 unlisted uploads, correct titles, and the
      status write-back updated those 5 clips to `uploaded` with real video IDs.
- [ ] Let it run daily until `pending` count = 0. Investigate any `needs_review`.

---

## Hard stops (any one fails the rollout)

- Any clip going **public** instead of unlisted.
- Subscribers being **notified**.
- More than the approved batch/day (quota or practical-limit breach).
- Modifying or deleting any **source** mp4 / thumbnail / caption / markdown /
  manifest.
- Fabricating a Drive or YouTube URL in the manifest (URLs must come from real
  API responses only).
- Activating the workflow **before** Jeremy's explicit approval.
