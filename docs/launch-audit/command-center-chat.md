# Command Center Chat (P3) — Verification

Status: **VERIFIED, SHIPPED at HEAD e387187.** Read-only audit. One precise data-only follow-up flagged for the Lead (a missing required starter prompt) — I write docs only; the Lead applies the one-line edit.

Scope: the first-login, ChatGPT-style guided command box on dashboards + the "Ask" path of the right-side panel.

Files audited:
- `src/components/assistant/CommandCenterChat.tsx` (the chat UI)
- `src/components/assistant/CommandCenterChatMount.tsx` (server wrapper)
- `src/data/roleAssistant.ts` — `answerPlatformQuestion` (`:794-815`), `roleBucket` (`:526-557`), `startAnswer` (`:560-614`), `matchers` (`:624-789`), `commandCenterStarterPrompts` (`:472-483`), `starterPromptText` (`:819-823`)

---

## 1. Honest guided mode (no external/paid AI, nothing sent) — CONFIRMED

- `answerPlatformQuestion(question, role)` (`roleAssistant.ts:794-815`) is purely local: lowercases the question, picks a `roleBucket`, runs keyword `matchers` in order (first hit wins), else returns a friendly fallback. **No `fetch`, no server action, no SDK, no provider call** anywhere in the function or its helpers.
- File header is explicit (`:445-452`): "GUIDED assistant, not a live LLM... never calls an external/paid AI provider and never sends anything. The architecture is provider-ready: `answerPlatformQuestion()` is the single seam a future server action can replace, returning the same `GuidedAnswer` shape."
- UI reinforces honesty: dashboard badge "Guided answers · nothing is sent" (`CommandCenterChat.tsx:113-117`); footer "Guided assistant — structured answers grounded in the platform. Live AI provider wiring is planned; nothing is sent." (`:216-219`). The chat only renders `GuidedAnswer.body` + clickable in-app `links` — no outbound message of any kind.
- `ask()` (`CommandCenterChat.tsx:52-61`) just appends a local `ChatTurn` (capped to last 6 via `.slice(-6)`); no persistence, no network.

## 2. Role-aware — CONFIRMED (every required role maps to a tailored bucket)

`roleBucket()` (`:526-557`) maps the effective role to one of 9 buckets. Matrix of all 15 required roles:

| # | Required role key | Bucket (line) | Generic LO default by accident? |
|---|---|---|---|
| 1 | `master_admin` | `admin` (`:528-530`) | No |
| 2 | `admin` | `admin` (`:529-530`) | No |
| 3 | `lo_development_lead` | `lo_development` (`:531-533`) | No |
| 4 | `lo_development_member` | `lo_development` (`:532-533`) | No |
| 5 | `training_academy` | `training_academy` (`:546-547`) | No |
| 6 | `loan_officer_support` | `support` (`:548-549`) | No |
| 7 | `marketing` | `marketing` (`:551-552`) | No |
| 8 | `corporate_coach` | `coach` (`:535-541`) | No |
| 9 | `corporate_coach_supervisor` | `coach` (`:536`) | No |
| 10 | `lo_mastery_coach` | `coach` (`:537`) | No |
| 11 | `loan_factory_alliance_coach` | `coach` (`:538`) | No |
| 12 | `team_leader` | `coach` (`:540`) | No |
| 13 | `coaching_member_level_1` | `lo_mastery_member` (`:542-543`) | No |
| 14 | `coaching_member_level_2` | `alliance_member` (`:544-545`) | No |
| 15 | `loan_officer` | `loan_officer` (`:553-555`) | Intentional (this role IS the loan_officer bucket) |

**Result: 15/15 required roles map to a tailored bucket. No required role falls to the generic `loan_officer` default unintentionally** — `loan_officer` reaching the `loan_officer` bucket is correct, not a fallthrough. Bonus keys `lo_development` (`:533`), `coaching_director` (`:539`→coach), `support_staff` (`:549`→support) are also correctly bucketed.

Each bucket produces tailored `startAnswer()` copy (`:560-614`) and tailored branches inside the coaching/scorecard/support/admin matchers (`:644-789`). Member buckets correctly cite the $249 (LO Mastery) and $449 (Loan Factory Alliance) tiers (`:584,589,659,665`).

## 3. Helper avatar copy + starter prompts — CONFIRMED (with one gap)

- **Avatar + helper copy** present: "LF" avatar circle (`CommandCenterChat.tsx:91-97`), title "Command Center" + "Guided help · {roleLabel}" (`:99-111`), dismissible non-blocking helper card "👋 Have questions about how to use the LO Development Platform? Ask me right here{, FirstName}." (`:121-136`). Not a modal, no autoplay/forced video (matches the docstring `:40`).
- **Starter prompts**: `commandCenterStarterPrompts` (`roleAssistant.ts:472-483`) currently holds **10** prompts. Dashboard renders all 10; the compact panel variant renders the first 6 (`CommandCenterChat.tsx:200-201`). Chips reuse the same answer path via `starterPromptText(id)` → `ask()` (`:206`).

Current 10 starter prompts (ids): `start`, `next_action`, `coaching`, `scorecard`, `sales_training`, `ai_advantage`, `support`, `facegram`, `walkthroughs`, `ask_help`.

### GAP — missing required starter prompt: "Where are the LO Development videos?"
The spec lists **"Where are the LO Development videos?"** as a required starter prompt. It is **not** in `commandCenterStarterPrompts`. The closest is `walkthroughs` ("How do I find video walkthroughs?", `:481`) whose `walkthroughs` matcher (`:714-722`) DOES return the LO Development video library link (`LINKS.loDevVideos` → `/training-library/lo-development-videos/`, `:497`). So the **answer path exists**, but there is no dedicated chip/prompt with the spec's exact wording.

Note: adding a chip beyond 10 would make the dashboard render 11. To keep exactly 10, the Lead can either (a) replace one existing chip, or (b) accept 11. The intent matcher already routes correctly to `loDevVideos`, so no matcher change is needed — this is a label/data add only.

**Precise fix for the Lead (data-only, one line in `src/data/roleAssistant.ts`, inside `commandCenterStarterPrompts` at `:472-483`):**

Option A — add an 11th prompt (simplest, keeps all existing chips). Insert after the `walkthroughs` entry (`:481`):
```ts
{ id: "lo_dev_videos", label: "Where are the LO Development videos?" },
```
Then add a matcher OR rely on the existing `walkthroughs` matcher. Because `starterPromptText` falls back to the label text and `answerPlatformQuestion` keyword-matches on it: the label contains "video", which the `walkthroughs` matcher already tests (`/walkthrough|video|how-to|tutorial|clip|recording/`, `:715`) — so clicking the new chip will correctly return the LO Development + AI video libraries answer with no matcher edit required.

Option B — if exactly 10 chips is preferred, change the existing `walkthroughs` label (`:481`) from `"How do I find video walkthroughs?"` to `"Where are the LO Development videos?"` (the `walkthroughs` matcher and `loDevVideos` link already back it). This satisfies the spec wording with zero new entries.

Either is a single-line data edit; no logic/security change. Recommend **Option A** (preserves the generic walkthroughs chip and adds the spec-exact LO Development videos chip).

## 4. Connection to the side panel via `lf:open-assistant` — CONFIRMED

- Chat exports `OPEN_ASSISTANT_EVENT = "lf:open-assistant"` (`CommandCenterChat.tsx:14`) and `openFullAssistant()` dispatches `new CustomEvent(OPEN_ASSISTANT_EVENT)` (`:63-67`), wired to the "Open full assistant →" footer button (`:220-226`).
- The side panel listens for the same string: `window.addEventListener("lf:open-assistant", onOpen)` (`RoleAssistantPanel.tsx:105`) → `openPanel()`. Event name matches on both sides. Confirmed end-to-end.

## 5. Which dashboards mount the chat — CONFIRMED

`CommandCenterChatMount` (server wrapper, view-as aware, approved-only — `CommandCenterChatMount.tsx:11-34`) is mounted in:

1. `RoleDashboardPage` (`src/components/RoleDashboardPage.tsx:90`) — which renders these 5 role dashboards:
   - `/lo-development/` (`src/app/lo-development/page.tsx:11`)
   - `/marketing/` (`src/app/marketing/page.tsx:7`)
   - `/loan-officer-support/` (`src/app/loan-officer-support/page.tsx:10`)
   - `/training-academy/` (`src/app/training-academy/page.tsx:11`)
   - `/normal-lo/` (`src/app/normal-lo/page.tsx:11`)
2. `/member-area/lo-mastery/` (`src/app/member-area/lo-mastery/page.tsx:97`)
3. `/member-area/alliance/` (`src/app/member-area/alliance/page.tsx:107`)

→ **7 dashboard mount points total.**

### Observation — two role landing pages do NOT mount the dashboard chat
- **Admin** (`master_admin`/`admin` land at `/admin/` per `roleDashboardHrefs` `:88-89`): no `CommandCenterChatMount` found under `src/app/admin/`. Admins still get the universal right-side panel (it covers all approved roles via the layout mount) and the chat answers admin questions via the `admin` bucket, but the in-page Command Center chat card is absent from the Admin Console landing.
- **Team Leader** (`team_leader` lands at `/team-leader-guide/` per `:101`): `src/app/team-leader-guide/page.tsx` does not use `RoleDashboardPage` and does not mount `CommandCenterChatMount`. Same situation — universal side panel still applies; in-page chat card absent.

This is an in-page-chip placement observation, not a coverage failure: every role still has the guided assistant via the global side panel + `lf:open-assistant`, and `roleBucket` answers are tailored for both `admin` and `team_leader` (`coach` bucket). If Jeremy wants the in-page Command Center card on the Admin and Team Leader landing pages too, the Lead can drop `<CommandCenterChatMount />` into `src/app/admin/page.tsx` and `src/app/team-leader-guide/page.tsx` (both outside my owned paths). Flagged for the Lead's call — not required for P3 correctness.

---

## Summary of findings

- Honest guided mode: confirmed (no external/paid AI, nothing sent).
- Role-aware: 15/15 required roles correctly bucketed; no accidental generic fallthrough.
- Helper avatar + copy: confirmed. Starter prompts: 10 present, all wired.
- **One data gap**: required starter prompt "Where are the LO Development videos?" is missing from `commandCenterStarterPrompts` (`roleAssistant.ts:472-483`). Answer path already exists via the `walkthroughs` matcher → `loDevVideos`. Fix = one-line data add (Option A recommended). **For the Lead to apply** (in my read scope but outside my owned write paths).
- `lf:open-assistant` connection: confirmed both sides.
- Mounted on 7 dashboards; Admin (`/admin/`) and Team Leader (`/team-leader-guide/`) landing pages lack the in-page chip (side panel still covers them). Optional placement add flagged for the Lead.

Naming clean (LO Mastery $249 / Loan Factory Alliance $449, Sales and Marketing 101-601, AI Advantage, FaceGram, no "Elite"/"Apex Advisor"/"personate"). No security touched.
