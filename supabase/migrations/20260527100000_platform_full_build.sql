begin;

-- ============================================================
-- 1. Extend profiles with additional fields
-- ============================================================

alter table public.profiles
  add column if not exists bio text,
  add column if not exists nmls text,
  add column if not exists states_licensed text[],
  add column if not exists preferred_language text default 'en',
  add column if not exists timezone text default 'America/Los_Angeles',
  add column if not exists coaching_tier text,
  add column if not exists ai_twin_enabled boolean default false,
  add column if not exists profile_visibility text default 'internal';

-- ============================================================
-- 2. FaceGram saved posts
-- ============================================================

create table if not exists public.facegram_saved_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  post_id uuid references public.facegram_posts(id) on delete cascade,
  created_at timestamptz default now(),
  unique (user_id, post_id)
);

create index if not exists facegram_saved_posts_user_idx
  on public.facegram_saved_posts (user_id);

alter table public.facegram_saved_posts enable row level security;

drop policy if exists "facegram_saved_select_own" on public.facegram_saved_posts;
create policy "facegram_saved_select_own"
on public.facegram_saved_posts for select to authenticated
using (user_id = auth.uid());

drop policy if exists "facegram_saved_insert_own" on public.facegram_saved_posts;
create policy "facegram_saved_insert_own"
on public.facegram_saved_posts for insert to authenticated
with check (public.is_approved_user() and user_id = auth.uid());

drop policy if exists "facegram_saved_delete_own" on public.facegram_saved_posts;
create policy "facegram_saved_delete_own"
on public.facegram_saved_posts for delete to authenticated
using (user_id = auth.uid());

-- ============================================================
-- 3. FaceGram follows
-- ============================================================

create table if not exists public.facegram_follows (
  id uuid primary key default gen_random_uuid(),
  follower_id uuid references auth.users(id) on delete cascade,
  following_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  unique (follower_id, following_id)
);

create index if not exists facegram_follows_follower_idx
  on public.facegram_follows (follower_id);
create index if not exists facegram_follows_following_idx
  on public.facegram_follows (following_id);

alter table public.facegram_follows enable row level security;

drop policy if exists "facegram_follows_select_approved" on public.facegram_follows;
create policy "facegram_follows_select_approved"
on public.facegram_follows for select to authenticated
using (public.is_approved_user());

drop policy if exists "facegram_follows_insert_own" on public.facegram_follows;
create policy "facegram_follows_insert_own"
on public.facegram_follows for insert to authenticated
with check (public.is_approved_user() and follower_id = auth.uid());

drop policy if exists "facegram_follows_delete_own" on public.facegram_follows;
create policy "facegram_follows_delete_own"
on public.facegram_follows for delete to authenticated
using (follower_id = auth.uid());

-- ============================================================
-- 4. FaceGram group members
-- ============================================================

create table if not exists public.facegram_group_members (
  id uuid primary key default gen_random_uuid(),
  group_id uuid references public.facegram_groups(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role text default 'member',
  joined_at timestamptz default now(),
  unique (group_id, user_id)
);

create index if not exists facegram_group_members_group_idx
  on public.facegram_group_members (group_id);
create index if not exists facegram_group_members_user_idx
  on public.facegram_group_members (user_id);

alter table public.facegram_group_members enable row level security;

drop policy if exists "facegram_group_members_select_approved" on public.facegram_group_members;
create policy "facegram_group_members_select_approved"
on public.facegram_group_members for select to authenticated
using (public.is_approved_user());

drop policy if exists "facegram_group_members_insert_own" on public.facegram_group_members;
create policy "facegram_group_members_insert_own"
on public.facegram_group_members for insert to authenticated
with check (public.is_approved_user() and user_id = auth.uid());

drop policy if exists "facegram_group_members_delete_own_or_admin" on public.facegram_group_members;
create policy "facegram_group_members_delete_own_or_admin"
on public.facegram_group_members for delete to authenticated
using (user_id = auth.uid() or public.can_access_admin());

-- ============================================================
-- 5. FaceGram messages (internal DMs)
-- ============================================================

create table if not exists public.facegram_messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid references auth.users(id) on delete set null,
  recipient_id uuid references auth.users(id) on delete set null,
  body text not null,
  read boolean default false,
  created_at timestamptz default now()
);

create index if not exists facegram_messages_sender_idx
  on public.facegram_messages (sender_id);
create index if not exists facegram_messages_recipient_idx
  on public.facegram_messages (recipient_id);
create index if not exists facegram_messages_created_idx
  on public.facegram_messages (created_at desc);

alter table public.facegram_messages enable row level security;

drop policy if exists "facegram_messages_select_own" on public.facegram_messages;
create policy "facegram_messages_select_own"
on public.facegram_messages for select to authenticated
using (sender_id = auth.uid() or recipient_id = auth.uid());

drop policy if exists "facegram_messages_insert_own" on public.facegram_messages;
create policy "facegram_messages_insert_own"
on public.facegram_messages for insert to authenticated
with check (public.is_approved_user() and sender_id = auth.uid());

drop policy if exists "facegram_messages_update_read" on public.facegram_messages;
create policy "facegram_messages_update_read"
on public.facegram_messages for update to authenticated
using (recipient_id = auth.uid())
with check (recipient_id = auth.uid());

-- ============================================================
-- 6. FaceGram notifications
-- ============================================================

create table if not exists public.facegram_notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  actor_id uuid references auth.users(id) on delete set null,
  type text not null,
  reference_id uuid,
  message text not null,
  read boolean default false,
  created_at timestamptz default now()
);

create index if not exists facegram_notifications_user_idx
  on public.facegram_notifications (user_id);
create index if not exists facegram_notifications_created_idx
  on public.facegram_notifications (created_at desc);

alter table public.facegram_notifications enable row level security;

drop policy if exists "facegram_notifications_select_own" on public.facegram_notifications;
create policy "facegram_notifications_select_own"
on public.facegram_notifications for select to authenticated
using (user_id = auth.uid());

drop policy if exists "facegram_notifications_update_own" on public.facegram_notifications;
create policy "facegram_notifications_update_own"
on public.facegram_notifications for update to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

-- ============================================================
-- 7. AI Twins
-- ============================================================

create table if not exists public.ai_twins (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid references auth.users(id) on delete cascade,
  display_name text not null,
  assistant_name text,
  role text,
  bio text,
  persona_instructions text,
  coaching_style text,
  specialties text[],
  allowed_audiences text[],
  default_disclaimers text[],
  source_folders_connected boolean default false,
  gmail_connected boolean default false,
  drive_connected boolean default false,
  task_scheduling_enabled boolean default false,
  email_draft_enabled boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (owner_user_id)
);

create index if not exists ai_twins_owner_idx on public.ai_twins (owner_user_id);

alter table public.ai_twins enable row level security;

drop policy if exists "ai_twins_select_own_or_admin" on public.ai_twins;
create policy "ai_twins_select_own_or_admin"
on public.ai_twins for select to authenticated
using (owner_user_id = auth.uid() or public.can_access_admin());

drop policy if exists "ai_twins_insert_own" on public.ai_twins;
create policy "ai_twins_insert_own"
on public.ai_twins for insert to authenticated
with check (public.is_approved_user() and owner_user_id = auth.uid());

drop policy if exists "ai_twins_update_own" on public.ai_twins;
create policy "ai_twins_update_own"
on public.ai_twins for update to authenticated
using (owner_user_id = auth.uid())
with check (owner_user_id = auth.uid());

drop policy if exists "ai_twins_admin_all" on public.ai_twins;
create policy "ai_twins_admin_all"
on public.ai_twins for all to authenticated
using (public.can_access_admin())
with check (public.can_access_admin());

-- ============================================================
-- 8. Google connections
-- ============================================================

create table if not exists public.google_connections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  gmail_connected boolean default false,
  drive_connected boolean default false,
  calendar_connected boolean default false,
  gmail_scopes text[],
  drive_folders text[],
  last_synced_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (user_id)
);

alter table public.google_connections enable row level security;

drop policy if exists "google_connections_select_own" on public.google_connections;
create policy "google_connections_select_own"
on public.google_connections for select to authenticated
using (user_id = auth.uid() or public.can_access_admin());

drop policy if exists "google_connections_upsert_own" on public.google_connections;
create policy "google_connections_upsert_own"
on public.google_connections for insert to authenticated
with check (user_id = auth.uid());

drop policy if exists "google_connections_update_own" on public.google_connections;
create policy "google_connections_update_own"
on public.google_connections for update to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

-- ============================================================
-- 9. Coaching assignments
-- ============================================================

create table if not exists public.coaching_assignments (
  id uuid primary key default gen_random_uuid(),
  coach_user_id uuid references auth.users(id) on delete set null,
  member_user_id uuid references auth.users(id) on delete cascade,
  coaching_tier text not null,
  status text default 'active',
  assigned_at timestamptz default now(),
  unique (coach_user_id, member_user_id)
);

create index if not exists coaching_assignments_coach_idx
  on public.coaching_assignments (coach_user_id);
create index if not exists coaching_assignments_member_idx
  on public.coaching_assignments (member_user_id);

alter table public.coaching_assignments enable row level security;

drop policy if exists "coaching_assignments_select" on public.coaching_assignments;
create policy "coaching_assignments_select"
on public.coaching_assignments for select to authenticated
using (
  coach_user_id = auth.uid()
  or member_user_id = auth.uid()
  or public.can_access_admin()
  or public.can_access_coaching()
);

drop policy if exists "coaching_assignments_admin_all" on public.coaching_assignments;
create policy "coaching_assignments_admin_all"
on public.coaching_assignments for all to authenticated
using (public.can_access_admin())
with check (public.can_access_admin());

-- ============================================================
-- 10. Scheduled tasks
-- ============================================================

create table if not exists public.scheduled_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  description text,
  task_type text default 'reminder',
  recurrence text,
  next_run_at timestamptz,
  last_run_at timestamptz,
  status text default 'active',
  created_at timestamptz default now()
);

create index if not exists scheduled_tasks_user_idx
  on public.scheduled_tasks (user_id);
create index if not exists scheduled_tasks_next_run_idx
  on public.scheduled_tasks (next_run_at);

alter table public.scheduled_tasks enable row level security;

drop policy if exists "scheduled_tasks_select_own_or_admin" on public.scheduled_tasks;
create policy "scheduled_tasks_select_own_or_admin"
on public.scheduled_tasks for select to authenticated
using (user_id = auth.uid() or public.can_access_admin());

drop policy if exists "scheduled_tasks_insert_own" on public.scheduled_tasks;
create policy "scheduled_tasks_insert_own"
on public.scheduled_tasks for insert to authenticated
with check (public.is_approved_user() and user_id = auth.uid());

drop policy if exists "scheduled_tasks_update_own" on public.scheduled_tasks;
create policy "scheduled_tasks_update_own"
on public.scheduled_tasks for update to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "scheduled_tasks_delete_own" on public.scheduled_tasks;
create policy "scheduled_tasks_delete_own"
on public.scheduled_tasks for delete to authenticated
using (user_id = auth.uid());

-- ============================================================
-- 11. Grants for new tables
-- ============================================================

grant select, insert, update, delete on table public.facegram_saved_posts to authenticated, service_role;
grant select, insert, update, delete on table public.facegram_follows to authenticated, service_role;
grant select, insert, update, delete on table public.facegram_group_members to authenticated, service_role;
grant select, insert, update, delete on table public.facegram_messages to authenticated, service_role;
grant select, insert, update, delete on table public.facegram_notifications to authenticated, service_role;
grant select, insert, update, delete on table public.ai_twins to authenticated, service_role;
grant select, insert, update, delete on table public.google_connections to authenticated, service_role;
grant select, insert, update, delete on table public.coaching_assignments to authenticated, service_role;
grant select, insert, update, delete on table public.scheduled_tasks to authenticated, service_role;

commit;
