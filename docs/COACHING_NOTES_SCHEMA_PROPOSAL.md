# Coaching Notes Schema Proposal

Status: proposal for Lead review. Do not apply automatically.

The current `coaching_notes` table supports core note text, stuck points, wins,
next action, follow-up date, and private coach notes. The coaching note workflow
now needs three additive fields before live Supabase persistence is wired:

```sql
alter table public.coaching_notes
  add column if not exists note_type text,
  add column if not exists tags text[] default '{}'::text[],
  add column if not exists action_items jsonb default '[]'::jsonb;

create index if not exists coaching_notes_tags_idx
  on public.coaching_notes using gin (tags);
```

RLS should remain unchanged from `20260528130000_coach_command_center.sql`:
admins and the involved coach/LO can access sensitive coach text; no broad
approved-user read should be added to coaching notes.
