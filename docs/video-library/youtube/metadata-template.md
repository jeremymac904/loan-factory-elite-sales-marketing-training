# YouTube Metadata Template (DRAFT, UNLISTED)

> **Status: DRAFT. Nothing uploaded.** Every clip in this mapping is queued as
> `privacy=unlisted`, `notifySubscribers=false`. Values below are taken verbatim
> from the source-of-truth manifest
> `.video-source/manifests/youtube_upload_manifest_ready.csv` (91 rows) — no
> metadata is invented. Where the manifest left a field empty, it is shown as
> empty here.

This is the per-video metadata contract the n8n upload node fills in. The upload
node reads each row from `upload-queue-manifest.json`; this document explains the
field mapping and shows worked examples so a human can sanity-check before
activation.

---

## Field mapping (manifest CSV column -> YouTube field)

| YouTube field            | Source column / value                              | Notes |
| ------------------------ | -------------------------------------------------- | ----- |
| `snippet.title`          | `title`                                            | Verbatim from manifest. |
| `snippet.description`    | `description`                                      | Verbatim. Ends with "Internal training use only." |
| `snippet.tags`           | `tags` (split on `;`, trimmed)                     | Manifest stores tags as a `;`-delimited string. |
| `status.privacyStatus`   | **`unlisted`** (forced)                            | Manifest `privacy` is `unlisted` on all 91 rows; the node hard-codes it anyway. |
| `notifySubscribers`      | **`false`** (forced)                               | Manifest `notify_subscribers` is `NO` on all 91 rows. |
| `snippet.categoryId`     | **`27`** (Education)                               | Not in the manifest; chosen default for internal training. |
| `status.selfDeclaredMadeForKids` | **`false`**                                | Internal LO training, not kids content. |
| `snippet.defaultLanguage`| `en`                                               | All recordings are English. |
| Playlist                 | `playlist` (= "LO Development Resource Clips")      | Single playlist for all 91 clips. Add via `playlistItems.insert` after upload. |
| (internal) platform map  | `platform_section`                                 | Where the clip surfaces in the LO Development Platform; not sent to YouTube. |
| (internal) category      | `category`                                         | LO Development library category; not sent to YouTube. |
| `publishAt`              | `publish_at` (empty on all rows -> none)           | No scheduled publish; clips stay unlisted. |

> **Privacy + notify are non-negotiable.** Even though the manifest already says
> `unlisted` / `NO`, the n8n upload node forces `privacyStatus=unlisted` and
> `notifySubscribers=false` so a manifest edit can never accidentally publish.

---

## Playlist mapping

All 91 clips map to a single YouTube playlist:

- **Playlist:** `LO Development Resource Clips`

The `platform_section` column further routes each clip inside the LO Development
Platform UI (this is internal — it does not become a YouTube playlist). Observed
`platform_section` values in the manifest:

- `AI Advantage`
- `Onboarding / First File Survival`
- `1003 / Application Setup`
- `Compensation and Fees`
- `Compliance and Process Reminders`
- `Loan Officer Support`
- `Pricing`
- `TERA / System Navigation`
- `Training Library`
- `Sales & Marketing`
- `LO Development Resources`
- `Corporate Coach Resources`
- `DPA / Grants`

---

## Worked examples (verbatim from the manifest)

### Example 1 — row 001 (`lo-dev-001`)

- **title:** `Using the Loan Factory AI Assistant`
- **description:** `Loan Factory LO Development training clip. Topic: How to use the Loan Factory AI Assistant for guidelines, marketing, and fast answers. It reduces support friction and helps LOs self-serve before opening a ticket. Platform section: AI Advantage. Source: LO Development Series_ 1003 Mistakes to Avoid - 2026_05_18 12_39 PDT - Recording.mp4, 00:09 - 02:56. Internal training use only.`
- **tags:** `AI Support`, `TERA`, `guidelines`, `support`, `TERA and System Navigation`, `Troubleshooting`
- **privacyStatus:** `unlisted`
- **notifySubscribers:** `false`
- **playlist:** `LO Development Resource Clips`
- **platform_section:** `AI Advantage`
- **category:** `AI Support`

### Example 2 — row 002 (`lo-dev-002`)

- **title:** `Why Loans Die: Appraised Value Mistake`
- **description:** `Loan Factory LO Development training clip. Topic: Why appraised value and purchase price alignment matters in the application. This prevents avoidable dead files and underwriting surprises. Platform section: Onboarding / First File Survival. Source: LO Development Series_ 1003 Mistakes to Avoid - 2026_05_18 12_39 PDT - Recording.mp4, 03:45 - 05:47. Internal training use only.`
- **tags:** `1003`, `appraised value`, `purchase price`, `DU`, `1003 and Application Setup`, `Loan Submission`, `First File Survival Guide`
- **privacyStatus:** `unlisted`
- **notifySubscribers:** `false`
- **playlist:** `LO Development Resource Clips`
- **platform_section:** `Onboarding / First File Survival`
- **category:** `First File Survival Guide`

### Example 3 — row 067 (`lo-dev-067`)

- **title:** `Orion DPA Intro`
- **description:** `Loan Factory LO Development training clip. Topic: How Orion support can help with DPA scenarios. It points LOs to responsive product support. Platform section: DPA / Grants. Source: Q&A (Post-Training)_ Loans (LOS) - 2026_05_22 09_52 PDT - Recording.mp4, 00:01 - 00:44. Internal training use only.`
- **tags:** `Orion`, `DPA`, `marketplace`, `Marketplace`
- **privacyStatus:** `unlisted`
- **notifySubscribers:** `false`
- **playlist:** `LO Development Resource Clips`
- **platform_section:** `DPA / Grants`
- **category:** `DPA`

---

## Naming guardrails (must hold in every uploaded title/description)

- Spell the partner/team name **Thuan** — never "Tuan".
- Paid coaching tiers are **LO Mastery** ($249) and **Loan Factory Alliance**
  ($449). Never reference deprecated paid-coaching naming, "Apex Advisor", or a
  paid "Elite" tier.
- **Sales and Marketing 101–601** is FREE internal training — never describe it
  as paid or "Elite".
- The AI section is **AI Advantage**.

The manifest descriptions already comply; do not rewrite them in a way that
introduces a banned term.

---

## Full per-clip data

The complete, machine-readable mapping for all 91 clips lives in
`docs/video-library/youtube/upload-queue-manifest.json` (one object per clip,
keyed by `clipId` `lo-dev-001` … `lo-dev-091`). Regenerate it from the source
CSV with:

```bash
node automation/n8n/build-upload-queue.mjs
```
