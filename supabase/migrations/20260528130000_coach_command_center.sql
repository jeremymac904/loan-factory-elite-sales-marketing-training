begin;

-- Coach Command Center data model. Idempotent and additive — safe to run on an
-- existing project. Creates the coaching relationship + activity tables the
-- Coach Command Center reads/writes. Until applied, the UI renders sample data
-- (src/data/coachCommandCenter.ts) and manual coaching entry; once applied,
-- pages can read live rows. No existing tables/users are modified or dropped.

create extension if not exists "pgcrypto";

-- Relationship tables -------------------------------------------------------
create table if not exists public.coach_assignments (
  id uuid primary key default gen_random_uuid(),
  coach_email text not null,
  lo_email text not null,
  relationship text not null default 'corporate_coach', -- corporate_coach | paid_coaching | team_leader
  active boolean default true,
  created_at timestamptz default now(),
  unique (coach_email, lo_email, relationship)
);

create table if not exists public.team_leader_assignments (
  id uuid primary key default gen_random_uuid(),
  team_leader_email text not null,
  lo_email text not null,
  team_name text,
  active boolean default true,
  created_at timestamptz default now(),
  unique (team_leader_email, lo_email)
);

create table if not exists public.coaching_member_assignments (
  id uuid primary key default gen_random_uuid(),
  coach_email text not null,
  member_email text not null,
  tier text not null default 'lo_mastery', -- lo_mastery | alliance
  active boolean default true,
  created_at timestamptz default now(),
  unique (coach_email, member_email)
);

-- Activity + coaching tables ------------------------------------------------
create table if not exists public.coaching_activity_logs (
  id uuid primary key default gen_random_uuid(),
  lo_email text not null,
  logged_by text,
  activity_type text not null,
  count integer default 0,
  note text,
  week_of date,
  created_at timestamptz default now()
);

create table if not exists public.coaching_notes (
  id uuid primary key default gen_random_uuid(),
  lo_email text not null,
  coach_email text,
  note text,
  stuck_points text,
  wins text,
  next_action text,
  follow_up_date date,
  private boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.coaching_tasks (
  id uuid primary key default gen_random_uuid(),
  lo_email text not null,
  assigned_by text,
  title text not null,
  resource_href text,
  status text default 'assigned', -- assigned | in_progress | done
  due_date date,
  created_at timestamptz default now()
);

create table if not exists public.coaching_scorecards (
  id uuid primary key default gen_random_uuid(),
  lo_email text not null,
  week_of date,
  tier text,
  fields jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists public.coaching_messages (
  id uuid primary key default gen_random_uuid(),
  from_email text,
  to_email text,
  body text not null,
  status text default 'draft', -- draft | sent
  created_at timestamptz default now()
);

create table if not exists public.coaching_email_drafts (
  id uuid primary key default gen_random_uuid(),
  lo_email text,
  coach_email text,
  subject text,
  body text,
  status text default 'draft', -- draft only; sending is never automated
  created_at timestamptz default now()
);

create table if not exists public.coaching_calendar_events (
  id uuid primary key default gen_random_uuid(),
  coach_email text,
  event_type text,
  title text,
  starts_at timestamptz,
  duration_min integer,
  attendees jsonb default '[]'::jsonb,
  status text default 'draft', -- draft until Google Calendar is connected + created
  created_at timestamptz default now()
);

create table if not exists public.coaching_member_progress (
  id uuid primary key default gen_random_uuid(),
  member_email text not null unique,
  tier text,
  onboarding text,
  path text,
  certification text,
  training_progress text,
  ai_twin_status text,
  next_action text,
  status text default 'active', -- coaching activity status: active | needs_nudge | stuck | inactive
  updated_at timestamptz default now()
);

create index if not exists coach_assignments_coach_idx on public.coach_assignments (lower(coach_email));
create index if not exists team_leader_assignments_tl_idx on public.team_leader_assignments (lower(team_leader_email));
create index if not exists coaching_member_assignments_coach_idx on public.coaching_member_assignments (lower(coach_email));
create index if not exists coaching_activity_logs_lo_idx on public.coaching_activity_logs (lower(lo_email));
create index if not exists coaching_notes_lo_idx on public.coaching_notes (lower(lo_email));
create index if not exists coaching_tasks_lo_idx on public.coaching_tasks (lower(lo_email));
create index if not exists coaching_scorecards_lo_idx on public.coaching_scorecards (lower(lo_email));

-- RLS: enable on all coaching tables. Approved users may read coaching data;
-- admins (public.can_access_admin) get full access. Sensitive coach text
-- (notes / messages / email drafts) is limited to the involved parties + admins.
do $$
declare t text;
begin
  foreach t in array array[
    'coach_assignments','team_leader_assignments','coaching_member_assignments',
    'coaching_activity_logs','coaching_notes','coaching_tasks','coaching_scorecards',
    'coaching_messages','coaching_email_drafts','coaching_calendar_events','coaching_member_progress'
  ] loop
    execute format('alter table public.%I enable row level security;', t);
    execute format('grant select, insert, update, delete on table public.%I to authenticated, service_role;', t);
  end loop;
end $$;

-- Admin-all + approved-read on the non-sensitive coaching tables.
do $$
declare t text;
begin
  foreach t in array array[
    'coach_assignments','team_leader_assignments','coaching_member_assignments',
    'coaching_activity_logs','coaching_tasks','coaching_scorecards',
    'coaching_calendar_events','coaching_member_progress'
  ] loop
    execute format('drop policy if exists "%s_admin_all" on public.%I;', t, t);
    execute format('create policy "%s_admin_all" on public.%I for all to authenticated using (public.can_access_admin()) with check (public.can_access_admin());', t, t);
    execute format('drop policy if exists "%s_approved_select" on public.%I;', t, t);
    execute format('create policy "%s_approved_select" on public.%I for select to authenticated using (public.is_approved_user());', t, t);
  end loop;
end $$;

-- Sensitive coach text: only the involved coach/LO or admins may read.
drop policy if exists "coaching_notes_admin_all" on public.coaching_notes;
create policy "coaching_notes_admin_all" on public.coaching_notes
  for all to authenticated
  using (public.can_access_admin() or lower(coach_email) = public.current_user_email() or lower(lo_email) = public.current_user_email())
  with check (public.can_access_admin() or lower(coach_email) = public.current_user_email());

drop policy if exists "coaching_messages_involved" on public.coaching_messages;
create policy "coaching_messages_involved" on public.coaching_messages
  for all to authenticated
  using (public.can_access_admin() or lower(from_email) = public.current_user_email() or lower(to_email) = public.current_user_email())
  with check (public.can_access_admin() or lower(from_email) = public.current_user_email());

drop policy if exists "coaching_email_drafts_involved" on public.coaching_email_drafts;
create policy "coaching_email_drafts_involved" on public.coaching_email_drafts
  for all to authenticated
  using (public.can_access_admin() or lower(coach_email) = public.current_user_email())
  with check (public.can_access_admin() or lower(coach_email) = public.current_user_email());

commit;
