# AI Avatar Video Studio — HeyGen Architecture

**Last updated:** 2026-05-28

## Naming

User-facing name: **AI Avatar Video Studio**.
Subtitle: **Powered by HeyGen connection**.

Do not call this "the HeyGen product." The Loan Factory feature wraps HeyGen — it is not HeyGen.

## Two architecture paths

Both are supported by the staging design. Pick one per environment; the UI behaves the same either way.

### A. Future HeyGen MCP architecture
- HeyGen exposes an MCP server
- Loan Factory configures HeyGen MCP with per-user OAuth or per-org service credential
- The AI Twin uses the MCP server to call HeyGen via the AI provider's tool-use loop
- Pros: no direct API key management in app code, generation requests audit-logged per user, easier to swap providers
- Cons: depends on HeyGen MCP availability and Anthropic / OpenAI tool-use orchestration

### B. Direct HeyGen API
- Server-side route at `/api/heygen/generate` (not yet created)
- Per-user `google_connections.heygen_*` or `ai_twins.heygen_*` flag tracks connection state
- Service-role key calls HeyGen API on behalf of the user (still per-user identity recorded)
- Pros: simpler, direct, full control
- Cons: must securely store HeyGen API key in env, must audit every generation request

## Current staging state

- No API key in repo
- No live API call from any route
- All generate buttons disabled with `disabled={!heygenConnected}` and a clear "HeyGen setup needed" label
- Connection status flag (`heygenConnected`) defaults to `false` in `/market-mentor/video-studio`

## What gets stored per user

When connection is approved, plan to store:
- `ai_twins.heygen_connected` boolean
- `ai_twins.heygen_avatar_id` text
- `ai_twins.heygen_voice_id` text
- Optionally separate `heygen_connections` table if many fields needed

## What gets stored per generation

When generation is wired:
- `heygen_video_drafts` table
- `id`, `owner_user_id`, `template_slug`, `script`, `heygen_video_id`, `status`, `preview_url`, `created_at`
- RLS: `owner_user_id = auth.uid()`

## Generation safety

- Drafts only
- Generated video remains in Loan Factory storage until user explicitly publishes
- No auto-publish to YouTube, FaceGram, or any external channel
- Marketing review required for any borrower-facing or Realtor-facing video before public use
- Bilingual videos must include the Spanish-language educational disclaimer

## Cost / rate-limiting

- Per-user monthly generation cap (planned)
- Admin-visible audit log of every generation
- Failed generations logged with HeyGen error code

## Setup checklist (when connection is approved)

1. Loan Factory HeyGen org account exists
2. Per-user avatar uploaded/approved
3. Per-user voice clone approved (optional)
4. Connection flag written to Supabase
5. Generation route returns preview URL or HeyGen video ID
6. Generated drafts list reads from `heygen_video_drafts` per user

## What is NOT done yet

- No HeyGen API key in env
- No /api/heygen/* route
- No webhook handler for HeyGen generation-complete callbacks
- No Supabase tables for HeyGen connection state or generated drafts
- No YouTube cross-publish path
