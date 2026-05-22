begin;

-- Supabase projects created under the newer explicit-exposure model require
-- grants before public-schema tables are reachable through the Data API used
-- by supabase-js/PostgREST. RLS still controls row-level visibility.
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

commit;
