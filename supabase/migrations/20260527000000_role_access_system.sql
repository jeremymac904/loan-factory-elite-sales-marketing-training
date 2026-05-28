begin;

-- ============================================================
-- 0. Expand role check constraints to allow new role values
-- ============================================================

alter table public.approved_users drop constraint if exists approved_users_role_check;
alter table public.profiles drop constraint if exists profiles_role_check;

alter table public.approved_users add constraint approved_users_role_check
  check (role = any (array[
    'master_admin', 'admin', 'lo_development_lead', 'lo_development_member',
    'lo_development', 'loan_officer_support', 'corporate_coach', 'marketing',
    'team_leader', 'coaching_member_level_1', 'coaching_member_level_2',
    'loan_officer', 'support_staff', 'vendor_partner_future'
  ]));

alter table public.profiles add constraint profiles_role_check
  check (role = any (array[
    'master_admin', 'admin', 'lo_development_lead', 'lo_development_member',
    'lo_development', 'loan_officer_support', 'corporate_coach', 'marketing',
    'team_leader', 'coaching_member_level_1', 'coaching_member_level_2',
    'loan_officer', 'support_staff', 'vendor_partner_future'
  ]));

-- ============================================================
-- 1. Extend profiles table with new fields
-- ============================================================

alter table public.profiles
  add column if not exists phone text,
  add column if not exists secondary_phone text,
  add column if not exists profile_url text,
  add column if not exists team_brand text,
  add column if not exists notes text,
  add column if not exists primary_role text,
  add column if not exists last_sign_in_at timestamptz;

-- ============================================================
-- 2. Create user_roles join table for multi-role support
-- ============================================================

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_email text not null,
  role text not null,
  granted_at timestamptz default now(),
  granted_by text,
  unique (user_email, role)
);

create index if not exists user_roles_email_idx on public.user_roles (lower(user_email));
create index if not exists user_roles_role_idx on public.user_roles (role);

alter table public.user_roles enable row level security;

drop policy if exists "user_roles_select_own_or_admin" on public.user_roles;
create policy "user_roles_select_own_or_admin"
on public.user_roles
for select
to authenticated
using (lower(user_email) = public.current_user_email() or public.can_access_admin());

drop policy if exists "user_roles_admin_all" on public.user_roles;
create policy "user_roles_admin_all"
on public.user_roles
for all
to authenticated
using (public.can_access_admin())
with check (public.can_access_admin());

grant select on table public.user_roles to authenticated, service_role;
grant insert, update, delete on table public.user_roles to service_role;

-- ============================================================
-- 3. Extend role_permissions with new columns
-- ============================================================

alter table public.role_permissions
  add column if not exists can_access_lo_development boolean default false,
  add column if not exists can_access_support boolean default false,
  add column if not exists can_access_team_leader boolean default false,
  add column if not exists can_manage_users boolean default false;

-- ============================================================
-- 4. Upsert all role permission rows (expanded set)
-- ============================================================

insert into public.role_permissions (
  role,
  can_access_admin,
  can_access_coaching,
  can_access_facegram,
  can_access_ai_assistants,
  can_access_resources,
  can_moderate_facegram,
  can_review_marketing,
  can_access_lo_development,
  can_access_support,
  can_access_team_leader,
  can_manage_users
) values
  ('master_admin',            true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true),
  ('admin',                   true,  true,  true,  true,  true,  true,  true,  true,  true,  true,  true),
  ('lo_development_lead',     true,  true,  true,  true,  true,  true,  false, true,  true,  false, false),
  ('lo_development_member',   false, true,  true,  true,  true,  false, false, true,  false, false, false),
  ('loan_officer_support',    false, false, false, false, true,  false, false, false, true,  false, false),
  ('corporate_coach',         false, true,  true,  true,  true,  true,  false, false, false, false, false),
  ('marketing',               false, false, true,  true,  true,  true,  true,  false, false, false, false),
  ('team_leader',             false, true,  true,  true,  true,  false, false, false, false, true,  false),
  ('coaching_member_level_1', false, true,  true,  true,  true,  false, false, false, false, false, false),
  ('coaching_member_level_2', false, true,  true,  true,  true,  false, false, false, false, false, false),
  ('loan_officer',            false, false, true,  true,  true,  false, false, false, false, false, false),
  ('vendor_partner_future',   false, false, false, false, false, false, false, false, false, false, false)
on conflict (role) do update set
  can_access_admin = excluded.can_access_admin,
  can_access_coaching = excluded.can_access_coaching,
  can_access_facegram = excluded.can_access_facegram,
  can_access_ai_assistants = excluded.can_access_ai_assistants,
  can_access_resources = excluded.can_access_resources,
  can_moderate_facegram = excluded.can_moderate_facegram,
  can_review_marketing = excluded.can_review_marketing,
  can_access_lo_development = excluded.can_access_lo_development,
  can_access_support = excluded.can_access_support,
  can_access_team_leader = excluded.can_access_team_leader,
  can_manage_users = excluded.can_manage_users;

-- Update legacy roles that may exist
update public.role_permissions set
  can_access_lo_development = true,
  can_access_support = false,
  can_access_team_leader = false,
  can_manage_users = false
where role = 'lo_development' and can_access_lo_development is null;

update public.role_permissions set
  can_access_lo_development = false,
  can_access_support = true,
  can_access_team_leader = false,
  can_manage_users = false
where role = 'support_staff' and can_access_support is null;

-- ============================================================
-- 5. Seed approved_users
-- ============================================================

-- Master Admin
insert into public.approved_users (email, role, full_name, department, title, active) values
  ('jeremy.mcdonald@loanfactory.com', 'master_admin', 'Jeremy McDonald', 'LO Development', 'LO Development, AI, and Marketing Strategy Consultant', true)
on conflict (email) do update set
  role = excluded.role,
  full_name = excluded.full_name,
  department = excluded.department,
  title = excluded.title,
  active = excluded.active;

-- Admin
insert into public.approved_users (email, role, full_name, department, title, active) values
  ('thuan.nguyen@loanfactory.com', 'admin', 'Thuan Nguyen', 'Executive', null, true)
on conflict (email) do update set
  role = excluded.role,
  full_name = excluded.full_name,
  department = excluded.department,
  active = excluded.active;

-- LO Development Lead
insert into public.approved_users (email, role, full_name, department, title, active) values
  ('andre.king@loanfactory.com', 'lo_development_lead', 'Andre King', 'LO Development', null, true)
on conflict (email) do update set
  role = excluded.role,
  full_name = excluded.full_name,
  department = excluded.department,
  active = excluded.active;

-- LO Development Members
insert into public.approved_users (email, role, full_name, department, title, active) values
  ('kevin.truong@loanfactory.com', 'lo_development_member', 'Kevin Truong', 'LO Development', null, true),
  ('tara.bartoli@loanfactory.com', 'lo_development_member', 'Tara Bartoli', 'LO Development', null, true),
  ('dennis@loanfactory.com', 'lo_development_member', 'Dennis Nguyen', 'LO Development', null, true),
  ('jay.nguyen@loanfactory.com', 'lo_development_member', 'Jay Nguyen', 'LO Development', null, true),
  ('katarina@loanfactory.com', 'lo_development_member', 'Katarina Phan', 'Training Academy', null, true),
  ('henry.on@loanfactory.com', 'lo_development_member', 'Henry On', 'Training Academy', null, true)
on conflict (email) do update set
  role = excluded.role,
  full_name = excluded.full_name,
  department = excluded.department,
  active = excluded.active;

-- Benjamin has dual role: lo_development_member + loan_officer_support
insert into public.approved_users (email, role, full_name, department, title, active) values
  ('benjamin@loanfactory.com', 'lo_development_member', 'Benjamin Huynh', 'LO Development', null, true)
on conflict (email) do update set
  role = excluded.role,
  full_name = excluded.full_name,
  department = excluded.department,
  active = excluded.active;

-- Loan Officer Support
insert into public.approved_users (email, role, full_name, department, title, active) values
  ('jay.bathan@loanfactory.com', 'loan_officer_support', 'Jay Angelo Bathan', 'Loan Officer Support', null, true),
  ('nicosia@loanfactory.com', 'loan_officer_support', 'Nicosia Mae Pungtilan', 'Loan Officer Support', null, true),
  ('carlo@loanfactory.com', 'loan_officer_support', 'Carlo Morillo', 'Loan Officer Support', null, true),
  ('stephen@loanfactory.com', 'loan_officer_support', 'Stephen Tram', 'Loan Officer Support', null, true),
  ('fatima@loanfactory.com', 'loan_officer_support', 'Fatima Shayma Hayudin', 'Loan Officer Support', null, true),
  ('alejandro.mora@loanfactory.com', 'loan_officer_support', 'Alejandro Mora', 'Loan Officer Support', null, true),
  ('liam.nguyen@loanfactory.com', 'loan_officer_support', 'Liam Nguyen', 'Loan Officer Support', null, true)
on conflict (email) do update set
  role = excluded.role,
  full_name = excluded.full_name,
  department = excluded.department,
  active = excluded.active;

-- Corporate Coaches
insert into public.approved_users (email, role, full_name, department, title, active) values
  ('edward.arvizo@loanfactory.com', 'corporate_coach', 'Edward Arvizo', 'Corporate Coaching', null, true),
  ('alessandra@loanfactory.com', 'corporate_coach', 'Alessandra Pereira', 'Corporate Coaching', null, true),
  ('acardoso@loanfactory.com', 'corporate_coach', 'Alexander Cardoso', 'Corporate Coaching', null, true),
  ('bobs@loanfactory.com', 'corporate_coach', 'Bob Shahidapury', 'Corporate Coaching', null, true),
  ('ddang@loanfactory.com', 'corporate_coach', 'Duc Dang', 'Corporate Coaching', null, true),
  ('jody.richards@loanfactory.com', 'corporate_coach', 'Jody Richards', 'Corporate Coaching', null, true),
  ('john.lemos@loanfactory.com', 'corporate_coach', 'John P Lemos', 'Corporate Coaching', null, true),
  ('jerry.kindig@loanfactory.com', 'corporate_coach', 'Jerry Kindig', 'Corporate Coaching', null, true)
on conflict (email) do update set
  role = excluded.role,
  full_name = excluded.full_name,
  department = excluded.department,
  active = excluded.active;

-- Marketing
insert into public.approved_users (email, role, full_name, department, title, active) values
  ('duyen@loanfactory.com', 'marketing', 'Duyen Nguyen', 'Marketing', null, true),
  ('joyce.nguyen@loanfactory.com', 'marketing', 'Joyce Nguyen', 'Marketing', null, true),
  ('hoai.vo@loanfactory.com', 'marketing', 'Hoai Vo', 'Marketing', null, true),
  ('rose.nguyen@loanfactory.com', 'marketing', 'Rose Nguyen', 'Marketing', null, true),
  ('yen.le@loanfactory.com', 'marketing', 'Yen Le', 'Marketing', null, true),
  ('zoey.le@loanfactory.com', 'marketing', 'Zoey Le', 'Marketing', null, true),
  ('leslie@loanfactory.com', 'marketing', 'Leslie Do', 'Marketing', null, true),
  ('chilinh.nguyen@loanfactory.com', 'marketing', 'Chi-Linh Nguyen', 'Marketing', null, true),
  ('sophie.ng@loanfactory.com', 'marketing', 'Sophie Nguyen', 'Marketing', null, true),
  ('vy.nguyen@loanfactory.com', 'marketing', 'Vy Nguyen', 'Marketing', null, true)
on conflict (email) do update set
  role = excluded.role,
  full_name = excluded.full_name,
  department = excluded.department,
  active = excluded.active;

-- ============================================================
-- 6. Seed user_roles for multi-role users
-- ============================================================

-- Jeremy: master_admin + team_leader
insert into public.user_roles (user_email, role, granted_by) values
  ('jeremy.mcdonald@loanfactory.com', 'master_admin', 'system'),
  ('jeremy.mcdonald@loanfactory.com', 'team_leader', 'system')
on conflict (user_email, role) do nothing;

-- Benjamin: lo_development_member + loan_officer_support
insert into public.user_roles (user_email, role, granted_by) values
  ('benjamin@loanfactory.com', 'lo_development_member', 'system'),
  ('benjamin@loanfactory.com', 'loan_officer_support', 'system')
on conflict (user_email, role) do nothing;

-- All other users get their primary role in user_roles
insert into public.user_roles (user_email, role, granted_by)
select email, role, 'system'
from public.approved_users
where active = true
on conflict (user_email, role) do nothing;

commit;
