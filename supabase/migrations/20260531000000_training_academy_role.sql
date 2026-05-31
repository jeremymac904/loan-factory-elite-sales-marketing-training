begin;

-- Adds Training Academy as a first-class role without weakening RLS.
-- This migration only expands the allowed role list and seeds the same
-- permission shape already used by LO Development members.

alter table public.approved_users drop constraint if exists approved_users_role_check;
alter table public.profiles drop constraint if exists profiles_role_check;

alter table public.approved_users add constraint approved_users_role_check
  check (role = any (array[
    'master_admin', 'admin', 'lo_development_lead', 'lo_development_member',
    'lo_development', 'training_academy', 'loan_officer_support',
    'corporate_coach', 'marketing', 'team_leader',
    'coaching_member_level_1', 'coaching_member_level_2',
    'loan_officer', 'support_staff', 'vendor_partner_future'
  ]));

alter table public.profiles add constraint profiles_role_check
  check (role = any (array[
    'master_admin', 'admin', 'lo_development_lead', 'lo_development_member',
    'lo_development', 'training_academy', 'loan_officer_support',
    'corporate_coach', 'marketing', 'team_leader',
    'coaching_member_level_1', 'coaching_member_level_2',
    'loan_officer', 'support_staff', 'vendor_partner_future'
  ]));

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
) values (
  'training_academy',
  false,
  true,
  true,
  true,
  true,
  false,
  false,
  true,
  false,
  false,
  false
) on conflict (role) do update set
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

update public.approved_users
set role = 'training_academy'
where lower(email) in ('katarina@loanfactory.com', 'henry.on@loanfactory.com');

insert into public.user_roles (user_email, role, granted_by) values
  ('katarina@loanfactory.com', 'training_academy', 'system'),
  ('henry.on@loanfactory.com', 'training_academy', 'system')
on conflict (user_email, role) do nothing;

commit;
