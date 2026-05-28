# Google Workspace Integration Roadmap

**Last updated:** 2026-05-27

## Scope strategy

Each Google scope is per-user, opt-in, and revocable. Nothing happens
automatically. Send is always gated behind an explicit safety confirmation.

## Scopes

| Scope | Purpose | Status |
|-------|---------|--------|
| `openid email profile` | Sign-in | Connected |
| `gmail.compose` | Create drafts | Setup needed per user |
| `gmail.readonly` | Summarize threads (optional) | Setup needed per user |
| `gmail.send` | Send emails | Off by default |
| `drive.readonly` | Reference Drive docs | Setup needed per user |
| `calendar` | Schedule reminders | Future |

## Storage

`public.google_connections` per-user:
- `gmail_connected`, `drive_connected`, `calendar_connected` flags
- `gmail_scopes[]`, `drive_folders[]`
- `last_synced_at`

## Tasks

`public.scheduled_tasks`:
- `task_type` — reminder | follow_up | coaching_nudge
- `recurrence` — daily | weekly | bi-weekly | triggered
- `next_run_at`, `last_run_at`, `status`

## Send safety

- Default: drafts only
- Bulk sending: never in beta
- Send button: disabled until per-user Gmail send scope is approved
- Audit log on send: planned

## Phases

1. Scope UI and storage — DONE
2. OAuth flow extension — needs Google project config
3. Gmail draft generation — pending OAuth
4. Drive folder picker — pending OAuth
5. Calendar task scheduling — pending OAuth
6. Audit log of all AI Twin send actions — planned
