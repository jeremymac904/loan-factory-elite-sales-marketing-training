-- Run this after supabase/migrations/20260522000000_beta_auth_foundation.sql
-- if approved Google users land on /access-pending/?reason=profile-sync.

begin;

grant usage on schema public to anon, authenticated, service_role;

grant select, insert, update, delete on table public.profiles to authenticated, service_role;
grant select on table public.approved_users to authenticated, service_role;
grant insert, update, delete on table public.approved_users to service_role;
grant select on table public.role_permissions to authenticated, service_role;
grant insert, update, delete on table public.role_permissions to service_role;
grant select, insert, update, delete on table public.suggestions to authenticated, service_role;
grant select, insert, update, delete on table public.facegram_groups to authenticated, service_role;
grant select, insert, update, delete on table public.facegram_posts to authenticated, service_role;
grant select, insert, update, delete on table public.facegram_comments to authenticated, service_role;
grant select, insert, update, delete on table public.facegram_reactions to authenticated, service_role;
grant select, insert, update, delete on table public.ai_chats to authenticated, service_role;
grant select, insert, update, delete on table public.ai_messages to authenticated, service_role;
grant select, insert, update, delete on table public.training_progress to authenticated, service_role;
grant select, insert, update, delete on table public.quiz_results to authenticated, service_role;

grant usage, select on all sequences in schema public to authenticated, service_role;

grant execute on function public.current_user_email() to authenticated, service_role;
grant execute on function public.is_approved_user() to authenticated, service_role;
grant execute on function public.current_profile_role() to authenticated, service_role;
grant execute on function public.has_role_permission(text) to authenticated, service_role;
grant execute on function public.can_access_admin() to authenticated, service_role;
grant execute on function public.can_moderate_facegram() to authenticated, service_role;
grant execute on function public.can_access_coaching() to authenticated, service_role;
grant execute on function public.set_updated_at() to service_role;
grant execute on function public.guard_profile_user_updates() to service_role;

alter default privileges for role postgres in schema public
  grant select, insert, update, delete on tables to authenticated, service_role;

alter default privileges for role postgres in schema public
  grant usage, select on sequences to authenticated, service_role;

insert into public.approved_users (
  email,
  role,
  full_name,
  department,
  title,
  active
) values
  ('jeremy.mcdonald@loanfactory.com', 'admin', 'Jeremy McDonald', 'LO Development', 'Platform Owner', true),
  ('andre.king@loanfactory.com', 'admin', 'Andre King', 'LO Development', null, true),
  ('kevin.truong@loanfactory.com', 'lo_development', 'Kevin Truong', 'LO Development', null, true),
  ('dennis@loanfactory.com', 'lo_development', 'Dennis', 'LO Development', null, true),
  ('benjamin@loanfactory.com', 'lo_development', 'Benjamin', 'LO Development', null, true),
  ('tara.bartoli@loanfactory.com', 'lo_development', 'Tara Bartoli', 'LO Development', null, true),
  ('jay.nguyen@loanfactory.com', 'lo_development', 'Jay Nguyen', 'LO Development', null, true),
  ('duyen@loanfactory.com', 'marketing', 'Duyen', 'Marketing', null, true),
  ('leslie@loanfactory.com', 'marketing', 'Leslie', 'Marketing', null, true),
  ('edward.arvizo@loanfactory.com', 'corporate_coach', 'Edward Arvizo', 'Corporate Coaching', null, true)
on conflict (email) do update set
  role = excluded.role,
  full_name = excluded.full_name,
  department = excluded.department,
  title = excluded.title,
  active = excluded.active;

commit;
