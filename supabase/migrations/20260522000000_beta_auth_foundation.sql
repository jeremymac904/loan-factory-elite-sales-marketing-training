begin;

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  role text,
  department text,
  title text,
  avatar_url text,
  status text default 'pending',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.approved_users (
  email text primary key,
  role text not null,
  full_name text,
  department text,
  title text,
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.role_permissions (
  role text primary key,
  can_access_admin boolean default false,
  can_access_coaching boolean default false,
  can_access_facegram boolean default true,
  can_access_ai_assistants boolean default true,
  can_access_resources boolean default true,
  can_moderate_facegram boolean default false,
  can_review_marketing boolean default false
);

create table if not exists public.suggestions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  anonymous boolean default false,
  category text,
  message text not null,
  status text default 'new',
  created_at timestamptz default now()
);

create table if not exists public.facegram_groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  visibility text default 'internal',
  created_at timestamptz default now()
);

create table if not exists public.facegram_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  group_id uuid references public.facegram_groups(id) on delete set null,
  body text not null,
  post_type text default 'text',
  status text default 'internal_published',
  created_at timestamptz default now()
);

create table if not exists public.facegram_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.facegram_posts(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  body text not null,
  status text default 'internal_published',
  created_at timestamptz default now()
);

create table if not exists public.facegram_reactions (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.facegram_posts(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  reaction_type text default 'like',
  created_at timestamptz default now(),
  unique (post_id, user_id, reaction_type)
);

create table if not exists public.ai_chats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  assistant_type text not null,
  title text,
  created_at timestamptz default now()
);

create table if not exists public.ai_messages (
  id uuid primary key default gen_random_uuid(),
  chat_id uuid references public.ai_chats(id) on delete cascade,
  role text not null,
  content text not null,
  created_at timestamptz default now()
);

create table if not exists public.training_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  module_id text not null,
  status text default 'not_started',
  updated_at timestamptz default now(),
  unique (user_id, module_id)
);

create table if not exists public.quiz_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  quiz_type text not null,
  profile_name text,
  score_json jsonb,
  report_json jsonb,
  created_at timestamptz default now()
);

create index if not exists profiles_email_idx on public.profiles (lower(email));
create index if not exists approved_users_active_idx on public.approved_users (active);
create index if not exists suggestions_user_id_idx on public.suggestions (user_id);
create index if not exists facegram_posts_group_id_idx on public.facegram_posts (group_id);
create index if not exists facegram_posts_user_id_idx on public.facegram_posts (user_id);
create index if not exists facegram_comments_post_id_idx on public.facegram_comments (post_id);
create index if not exists facegram_reactions_post_id_idx on public.facegram_reactions (post_id);
create index if not exists ai_chats_user_id_idx on public.ai_chats (user_id);
create index if not exists ai_messages_chat_id_idx on public.ai_messages (chat_id);
create index if not exists training_progress_user_id_idx on public.training_progress (user_id);
create index if not exists quiz_results_user_id_idx on public.quiz_results (user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

drop trigger if exists set_training_progress_updated_at on public.training_progress;
create trigger set_training_progress_updated_at
before update on public.training_progress
for each row
execute function public.set_updated_at();

create or replace function public.current_user_email()
returns text
language sql
stable
as $$
  select lower(auth.jwt() ->> 'email');
$$;

create or replace function public.is_approved_user()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.approved_users
    where lower(email) = public.current_user_email()
      and active is true
  );
$$;

create or replace function public.current_profile_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role
  from public.profiles
  where id = auth.uid()
    and status = 'approved'
  limit 1;
$$;

create or replace function public.has_role_permission(permission_name text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    case permission_name
      when 'can_access_admin' then rp.can_access_admin
      when 'can_access_coaching' then rp.can_access_coaching
      when 'can_access_facegram' then rp.can_access_facegram
      when 'can_access_ai_assistants' then rp.can_access_ai_assistants
      when 'can_access_resources' then rp.can_access_resources
      when 'can_moderate_facegram' then rp.can_moderate_facegram
      when 'can_review_marketing' then rp.can_review_marketing
      else false
    end,
    false
  )
  from public.role_permissions rp
  where rp.role = public.current_profile_role()
  limit 1;
$$;

create or replace function public.can_access_admin()
returns boolean
language sql
stable
as $$
  select public.has_role_permission('can_access_admin');
$$;

create or replace function public.can_moderate_facegram()
returns boolean
language sql
stable
as $$
  select public.has_role_permission('can_moderate_facegram');
$$;

create or replace function public.can_access_coaching()
returns boolean
language sql
stable
as $$
  select public.has_role_permission('can_access_coaching');
$$;

create or replace function public.guard_profile_user_updates()
returns trigger
language plpgsql
as $$
begin
  if auth.uid() = old.id and not public.can_access_admin() then
    new.id = old.id;
    new.email = old.email;
    new.role = old.role;
    new.department = old.department;
    new.title = old.title;
    new.status = old.status;
    new.created_at = old.created_at;
  end if;

  return new;
end;
$$;

drop trigger if exists guard_profile_user_updates on public.profiles;
create trigger guard_profile_user_updates
before update on public.profiles
for each row
execute function public.guard_profile_user_updates();

revoke all on function public.current_user_email() from public;
revoke all on function public.is_approved_user() from public;
revoke all on function public.current_profile_role() from public;
revoke all on function public.has_role_permission(text) from public;
revoke all on function public.can_access_admin() from public;
revoke all on function public.can_moderate_facegram() from public;
revoke all on function public.can_access_coaching() from public;

grant execute on function public.current_user_email() to authenticated;
grant execute on function public.is_approved_user() to authenticated;
grant execute on function public.current_profile_role() to authenticated;
grant execute on function public.has_role_permission(text) to authenticated;
grant execute on function public.can_access_admin() to authenticated;
grant execute on function public.can_moderate_facegram() to authenticated;
grant execute on function public.can_access_coaching() to authenticated;

alter table public.profiles enable row level security;
alter table public.approved_users enable row level security;
alter table public.role_permissions enable row level security;
alter table public.suggestions enable row level security;
alter table public.facegram_groups enable row level security;
alter table public.facegram_posts enable row level security;
alter table public.facegram_comments enable row level security;
alter table public.facegram_reactions enable row level security;
alter table public.ai_chats enable row level security;
alter table public.ai_messages enable row level security;
alter table public.training_progress enable row level security;
alter table public.quiz_results enable row level security;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
on public.profiles
for select
to authenticated
using (id = auth.uid() or public.can_access_admin());

drop policy if exists "profiles_update_own_limited" on public.profiles;
create policy "profiles_update_own_limited"
on public.profiles
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

drop policy if exists "profiles_admin_all" on public.profiles;
create policy "profiles_admin_all"
on public.profiles
for all
to authenticated
using (public.can_access_admin())
with check (public.can_access_admin());

drop policy if exists "approved_users_select_own_or_admin" on public.approved_users;
create policy "approved_users_select_own_or_admin"
on public.approved_users
for select
to authenticated
using (lower(email) = public.current_user_email() or public.can_access_admin());

drop policy if exists "approved_users_admin_all" on public.approved_users;
create policy "approved_users_admin_all"
on public.approved_users
for all
to authenticated
using (public.can_access_admin())
with check (public.can_access_admin());

drop policy if exists "role_permissions_select_approved" on public.role_permissions;
create policy "role_permissions_select_approved"
on public.role_permissions
for select
to authenticated
using (public.is_approved_user());

drop policy if exists "role_permissions_admin_all" on public.role_permissions;
create policy "role_permissions_admin_all"
on public.role_permissions
for all
to authenticated
using (public.can_access_admin())
with check (public.can_access_admin());

drop policy if exists "suggestions_insert_own_or_anonymous" on public.suggestions;
create policy "suggestions_insert_own_or_anonymous"
on public.suggestions
for insert
to authenticated
with check (
  public.is_approved_user()
  and (
    user_id = auth.uid()
    or (anonymous is true and user_id is null)
  )
);

drop policy if exists "suggestions_select_own_or_moderator" on public.suggestions;
create policy "suggestions_select_own_or_moderator"
on public.suggestions
for select
to authenticated
using (
  user_id = auth.uid()
  or public.can_access_admin()
  or public.can_moderate_facegram()
);

drop policy if exists "suggestions_moderator_update" on public.suggestions;
create policy "suggestions_moderator_update"
on public.suggestions
for update
to authenticated
using (public.can_access_admin() or public.can_moderate_facegram())
with check (public.can_access_admin() or public.can_moderate_facegram());

drop policy if exists "facegram_groups_select_approved" on public.facegram_groups;
create policy "facegram_groups_select_approved"
on public.facegram_groups
for select
to authenticated
using (public.is_approved_user());

drop policy if exists "facegram_groups_moderator_all" on public.facegram_groups;
create policy "facegram_groups_moderator_all"
on public.facegram_groups
for all
to authenticated
using (public.can_access_admin() or public.can_moderate_facegram())
with check (public.can_access_admin() or public.can_moderate_facegram());

drop policy if exists "facegram_posts_select_approved" on public.facegram_posts;
create policy "facegram_posts_select_approved"
on public.facegram_posts
for select
to authenticated
using (
  public.is_approved_user()
  and (
    status in ('internal_published', 'under_review')
    or user_id = auth.uid()
    or public.can_access_admin()
    or public.can_moderate_facegram()
  )
);

drop policy if exists "facegram_posts_insert_own" on public.facegram_posts;
create policy "facegram_posts_insert_own"
on public.facegram_posts
for insert
to authenticated
with check (
  public.is_approved_user()
  and user_id = auth.uid()
);

drop policy if exists "facegram_posts_update_own_or_moderator" on public.facegram_posts;
create policy "facegram_posts_update_own_or_moderator"
on public.facegram_posts
for update
to authenticated
using (
  user_id = auth.uid()
  or public.can_access_admin()
  or public.can_moderate_facegram()
)
with check (
  user_id = auth.uid()
  or public.can_access_admin()
  or public.can_moderate_facegram()
);

drop policy if exists "facegram_comments_select_approved" on public.facegram_comments;
create policy "facegram_comments_select_approved"
on public.facegram_comments
for select
to authenticated
using (
  public.is_approved_user()
  and (
    status = 'internal_published'
    or user_id = auth.uid()
    or public.can_access_admin()
    or public.can_moderate_facegram()
  )
);

drop policy if exists "facegram_comments_insert_own" on public.facegram_comments;
create policy "facegram_comments_insert_own"
on public.facegram_comments
for insert
to authenticated
with check (
  public.is_approved_user()
  and user_id = auth.uid()
);

drop policy if exists "facegram_comments_update_own_or_moderator" on public.facegram_comments;
create policy "facegram_comments_update_own_or_moderator"
on public.facegram_comments
for update
to authenticated
using (
  user_id = auth.uid()
  or public.can_access_admin()
  or public.can_moderate_facegram()
)
with check (
  user_id = auth.uid()
  or public.can_access_admin()
  or public.can_moderate_facegram()
);

drop policy if exists "facegram_reactions_select_approved" on public.facegram_reactions;
create policy "facegram_reactions_select_approved"
on public.facegram_reactions
for select
to authenticated
using (public.is_approved_user());

drop policy if exists "facegram_reactions_insert_own" on public.facegram_reactions;
create policy "facegram_reactions_insert_own"
on public.facegram_reactions
for insert
to authenticated
with check (
  public.is_approved_user()
  and user_id = auth.uid()
);

drop policy if exists "facegram_reactions_delete_own_or_moderator" on public.facegram_reactions;
create policy "facegram_reactions_delete_own_or_moderator"
on public.facegram_reactions
for delete
to authenticated
using (
  user_id = auth.uid()
  or public.can_access_admin()
  or public.can_moderate_facegram()
);

drop policy if exists "ai_chats_select_own" on public.ai_chats;
create policy "ai_chats_select_own"
on public.ai_chats
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "ai_chats_insert_own" on public.ai_chats;
create policy "ai_chats_insert_own"
on public.ai_chats
for insert
to authenticated
with check (
  public.is_approved_user()
  and user_id = auth.uid()
);

drop policy if exists "ai_chats_update_own" on public.ai_chats;
create policy "ai_chats_update_own"
on public.ai_chats
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "ai_messages_select_own_chat" on public.ai_messages;
create policy "ai_messages_select_own_chat"
on public.ai_messages
for select
to authenticated
using (
  exists (
    select 1
    from public.ai_chats c
    where c.id = ai_messages.chat_id
      and c.user_id = auth.uid()
  )
);

drop policy if exists "ai_messages_insert_own_chat" on public.ai_messages;
create policy "ai_messages_insert_own_chat"
on public.ai_messages
for insert
to authenticated
with check (
  exists (
    select 1
    from public.ai_chats c
    where c.id = ai_messages.chat_id
      and c.user_id = auth.uid()
  )
);

drop policy if exists "training_progress_select_own_or_coach" on public.training_progress;
create policy "training_progress_select_own_or_coach"
on public.training_progress
for select
to authenticated
using (
  user_id = auth.uid()
  or public.can_access_admin()
  or public.can_access_coaching()
);

drop policy if exists "training_progress_insert_own" on public.training_progress;
create policy "training_progress_insert_own"
on public.training_progress
for insert
to authenticated
with check (
  public.is_approved_user()
  and user_id = auth.uid()
);

drop policy if exists "training_progress_update_own" on public.training_progress;
create policy "training_progress_update_own"
on public.training_progress
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "quiz_results_select_own_or_coach" on public.quiz_results;
create policy "quiz_results_select_own_or_coach"
on public.quiz_results
for select
to authenticated
using (
  user_id = auth.uid()
  or public.can_access_admin()
  or public.can_access_coaching()
);

drop policy if exists "quiz_results_insert_own" on public.quiz_results;
create policy "quiz_results_insert_own"
on public.quiz_results
for insert
to authenticated
with check (
  public.is_approved_user()
  and user_id = auth.uid()
);

insert into public.role_permissions (
  role,
  can_access_admin,
  can_access_coaching,
  can_access_facegram,
  can_access_ai_assistants,
  can_access_resources,
  can_moderate_facegram,
  can_review_marketing
) values
  ('admin', true, true, true, true, true, true, true),
  ('lo_development', false, true, true, true, true, false, false),
  ('marketing', false, false, true, true, true, true, true),
  ('corporate_coach', false, true, true, true, true, true, false),
  ('team_leader', false, true, true, true, true, false, false),
  ('loan_officer', false, false, true, true, true, false, false),
  ('support_staff', false, false, false, false, true, false, false)
on conflict (role) do update set
  can_access_admin = excluded.can_access_admin,
  can_access_coaching = excluded.can_access_coaching,
  can_access_facegram = excluded.can_access_facegram,
  can_access_ai_assistants = excluded.can_access_ai_assistants,
  can_access_resources = excluded.can_access_resources,
  can_moderate_facegram = excluded.can_moderate_facegram,
  can_review_marketing = excluded.can_review_marketing;

commit;
