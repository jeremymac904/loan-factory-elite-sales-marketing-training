# Dead-Action Audit (P7) — Loan Factory LO Development Platform

Owner: Power Agent 4 (Video Honesty + Dead-Action Audit). HEAD `e387187`.
Read-only audit across the app; the only code touched is in PA4-owned video files.

## Verdict

No fake "connect" buttons were found. Every integration-touching control either
(a) routes to a real OAuth start, (b) is honestly disabled with a "setup needed"
label, or (c) is a local-only draft/copy action with explicit "nothing is sent"
copy. The platform's draft-only posture is consistently and clearly labeled.

Two pre-existing video systems exist side by side:
- **LO Development video library** (PA4-owned) — 98 records, all unhosted except
  7 long-form with real Google Drive URLs. Hardened this sprint (see below).
- **AI Advantage uploaded clips** (`aiAdvantageYoutubeEmbeds.json`) — 63 clips,
  all with **real** `youtube_embed_url` + `youtube_video_id` (verified). The
  "uploaded, unlisted, safe to embed" claim is honest.
- **platform-videos explorer** (`PlatformVideoLibraryExplorer.tsx`) — its own
  status vocabulary; uses honest disabled `ActionLink`s.

## Audit table

| Control | Location (file:line) | State | Clearly labeled? | Fix needed |
|---|---|---|---|---|
| Google OAuth "Connect Google" | `src/app/settings/google/page.tsx:119` → `src/app/auth/google/route.ts:101` | **Live** — real Supabase `signInWithOAuth({provider:"google"})` | Yes | No (see note A) |
| "Connect Google Drive" | `src/app/ai-assistants/knowledge/page.tsx:94` | Link → `/settings/google/` (real OAuth page) | Yes | No |
| "Manage in Google settings" | `src/app/ai-assistants/connections/page.tsx:128,167` | Link → `/settings/google/` | Yes | No |
| Connected-services list | `src/app/profile/page.tsx:127-153` | Display only; status from static `connectedServices` (`connected`/`Not enabled` badges) | Yes | No |
| Gmail status badge + "no Connect Gmail button" notice | `src/app/coach-command-center/email-center/page.tsx:53-61` | `gmailConnected = WORKSPACE_CONNECTED.gmail` (`false`); explicitly states live draft creation not implemented | Yes | No |
| Calendar status + Meet draft notice | `src/app/coach-command-center/calendar/page.tsx:54-65` | `calendarConnected` = `false`; "nothing is added to any calendar here" | Yes | No |
| Google Chat post (Messages) | `src/app/coach-command-center/messages/page.tsx:52-55,105` | Draft-only; "No Gmail, Google Chat, n8n, Zapier, or outbound send is triggered." "This page does not post to Google Chat." | Yes | No |
| DraftComposer Save/Personalize/Copy | `src/components/comms/DraftComposer.tsx:98-120,246-264` | Local React state only; "Draft only — not sent" badge; "Send it yourself from Gmail/your messaging tool" | Yes | No |
| CopyDraftButton | `src/components/coach/CopyDraftButton.tsx:30-48` | Clipboard copy only; never passed `connected={true}` in practice (`WORKSPACE_CONNECTED` all false) | Yes | No — but see note B |
| EmailWorkspace / CalendarWorkspace / EventDraftBuilder / DraftList | `src/components/comms/*` | Draft-only scaffolding around `coachComms.ts` (`WORKSPACE_CONNECTED` const `false`); `buildMeetTrainingDraft` emits "no real Meet link is created" | Yes | No |
| Scorecard "Save draft" / "Submit weekly scorecard" | `src/components/coach/MemberScorecardForm.tsx:183-196` (`localStorage` at :71) | Local `localStorage` only; "nothing is sent yet. Live submission … pending" | Yes | No |
| HeyGen "Generate" (video studio) | `src/components/market-mentor/MarketVideoTemplateCard.tsx:70-80`; page `src/app/market-mentor/video-studio/page.tsx:12,68-69` | **Disabled** (`disabled={!heygenConnected}`, const `false`); label "Generate (HeyGen setup needed)"; "No live API call is made yet" | Yes | No |
| Market roleplay "Launch roleplay" / "Copy prompt" | `src/components/market-mentor/MarketRoleplayCard.tsx:99-114` | Toggles local prompt view / clipboard copy; data note: "no API call is made" | Yes | No |
| Market update "Build versions" | `src/components/market-mentor/MarketUpdateInterpreter.tsx:47-50,106-113` | Reveals **static sample** outputs; disclaimer "AI provider connection pending … example template versions — not generated text" | Yes (disclaimer present) | No — see note C |
| Command Center chat "Ask" | `src/components/assistant/CommandCenterChat.tsx:52-61,189-195` | Local `answerPlatformQuestion(q, role)` router; no `fetch`/API | Yes | No |
| AI Twin Gmail review (workflow) | `src/app/ai-twins/gmail-review/page.tsx` | Descriptive only, no action buttons; "Nothing sends automatically" | Yes | No |
| AI Twin connections statuses | `src/app/ai-assistants/connections/page.tsx:8-45` | Static `connected`/`not-enabled`; "draft-only and read-only until … approved" | Yes | No |
| LO Dev video — YouTube player | `src/app/training-library/lo-development-videos/[slug]/page.tsx:68-72` | Renders `<YouTubeEmbed>` **only** when `hasYouTube && embedSrc` (PA4-hardened) | Yes | Fixed this sprint |
| LO Dev video — "Open in Google Drive" | `[slug]/page.tsx:73-87` | Real `<a>` to `video.googleDriveUrl` (7 long-form have real Drive URLs); shown only when `hasDrive`; `href` is `undefined` when null (no `#`) | Yes | Fixed this sprint |
| LO Dev video — host badge | `src/components/video-library/hostBadge.ts` | URL-grounded; pending states never imply playable (PA4-hardened) | Yes | Fixed this sprint |
| n8n / Zapier | (no UI controls) | No in-app n8n/Zapier trigger buttons exist; only referenced in copy as "not triggered" and in `docs/`/`_groove_handoff/`/`automation/` (out-of-app scaffolding) | n/a | No |
| YouTube / Drive **upload** | (no UI controls) | No in-app upload buttons. Upload is handled by out-of-app scripts (`scripts/*.mjs`, `automation/`) which are DRY-RUN/report-only per their headers | n/a | No |

## Notes / low-severity items for the Lead

- **Note A (low):** `settings/google/page.tsx` shows a per-scope "Connect Google"
  button next to rows like "Gmail Draft — Setup needed", but `/auth/google/`
  starts the **base** Google OAuth (openid/email/profile), not an incremental
  Gmail/Drive scope grant. The button is real (not fake) and the page footer
  explains scopes are approved per-user, but a user could read the button as
  granting that specific scope. Optional copy tweak only — not a launch blocker.
  Outside PA4-owned paths; left untouched.

- **Note B (low):** `CopyDraftButton` (`src/components/coach/CopyDraftButton.tsx:18-20,46`)
  keeps a `connected` prop whose "Create Draft" label would render while the
  click still only copies (no Gmail draft API). Today no caller passes
  `connected={true}` (all `WORKSPACE_CONNECTED` are `false`), so the live UI only
  ever shows "Copy Email Draft" — honest now. When a real draft API lands, wire
  the click to it before flipping `connected`. Outside PA4-owned paths.

- **Note C (low):** `MarketUpdateInterpreter` "Build versions" reveals canned
  sample outputs that look AI-generated. The inline disclaimer is present and
  clear, so this is acceptable; consider an even more prominent "Sample" pill if
  desired. Outside PA4-owned paths.

- **Note D (data, for PA2):** `src/data/loDevelopmentVideoLibrary.ts` header
  comment (lines 7-8) says every entry has "null Drive/YouTube fields", but
  `lo-longform-01..07` carry **real** `googleDriveUrl` values
  (`drive.google.com/open?id=...`) while `hostingStatus` stays
  `google_drive_ready`. The data is correct and honest (the 7 Drive links are
  real); only the file's summary comment is stale. PA2-owned auto-generated file;
  left untouched. The PA4 badge logic is URL-grounded, so it labels these 7 as
  "Google Drive" (playable link) and the other 91 as "Google Drive staging
  pending" regardless of the comment.

- **Note E (consistency, optional):** The `platform-videos` system
  (`PlatformVideoLibraryExplorer.tsx:510-511`, `:717-718`) uses the older label
  vocabulary ("Google Drive fallback pending", "YouTube pending"). PA4 hardened
  the **LO Development** library to "Google Drive staging pending" / "YouTube
  upload pending" / "Manual review needed". The two systems are independent (no
  shared `hostBadge` import) so nothing breaks, but the Lead may want one shared
  vocabulary later. Outside PA4-owned paths.

## P6 video-honesty changes shipped (PA4-owned files)

- `src/components/video-library/hostBadge.ts` — rewrote `getHostBadge` to be
  URL-grounded. New honest label set: `YouTube live` (only when a real embed/
  videoId exists), `Google Drive` (real Drive URL), `YouTube upload pending`,
  `Google Drive staging pending`, `Manual review needed`. Added `isPlayable`
  flag so the UI can never claim a playable asset that does not exist. The 91
  unhosted clips now read "Google Drive staging pending" (previously the
  misleading "Google Drive fallback" even though no Drive URL existed).
- `[slug]/page.tsx` — passes `youtubeVideoId` to the badge; renders the embed
  only when `hasYouTube && embedSrc`; the pending notice now mirrors the honest
  badge label (review / upload pending / staging pending); Drive `<a>` uses
  `undefined` (not `#`) when no URL.
- `LoVideoCard.tsx` + list `page.tsx` — added `youtubeVideoId` to the card model
  so the card badge matches the detail badge exactly.
- No local file paths are exposed anywhere: `localFileName` is never rendered;
  the detail page only states "Lesson notes (markdown) available" / "Captions
  (SRT) available". `LoVideoCard` only renders `<img>` for public `/`-relative
  thumbnails (`isPublicAsset` guard), never `/Users/...` absolutes.
