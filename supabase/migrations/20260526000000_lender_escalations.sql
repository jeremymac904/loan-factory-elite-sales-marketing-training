-- Lender escalation submissions.
-- This table backs `POST /api/lender-escalation`. The client sends a structured
-- escalation note; the server route validates it with the user's Supabase
-- session (no service role key) and inserts it under RLS.

create table if not exists public.lender_escalations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  lo_name text,
  lo_email text,
  processor_name text,
  processor_email text,
  lender_name text,
  ae_name text,
  ae_email text,
  loan_number text,
  urgency text default 'normal',
  issue_category text default 'status_update',
  explanation text not null,
  requested_help text,
  status text default 'new',
  created_at timestamptz default now()
);

create index if not exists lender_escalations_user_id_idx
  on public.lender_escalations (user_id);
create index if not exists lender_escalations_status_idx
  on public.lender_escalations (status);
create index if not exists lender_escalations_created_at_idx
  on public.lender_escalations (created_at desc);

alter table public.lender_escalations enable row level security;

-- Approved users can insert their own escalation. The user_id must match
-- the current auth uid.
drop policy if exists "lender_escalations_insert_own"
  on public.lender_escalations;
create policy "lender_escalations_insert_own"
  on public.lender_escalations
  for insert
  to authenticated
  with check (
    public.is_approved_user()
    and user_id = auth.uid()
  );

-- LOs can read their own submissions. Admins and Facegram moderators can read
-- all (LO Development uses the moderator permission today).
drop policy if exists "lender_escalations_select_own_or_admin"
  on public.lender_escalations;
create policy "lender_escalations_select_own_or_admin"
  on public.lender_escalations
  for select
  to authenticated
  using (
    user_id = auth.uid()
    or public.can_access_admin()
    or public.can_moderate_facegram()
  );

-- Only admins and LO Development moderators can change status. LOs cannot
-- edit their own submission after the fact; they file a new one if the
-- escalation evolves.
drop policy if exists "lender_escalations_admin_update"
  on public.lender_escalations;
create policy "lender_escalations_admin_update"
  on public.lender_escalations
  for update
  to authenticated
  using (public.can_access_admin() or public.can_moderate_facegram())
  with check (public.can_access_admin() or public.can_moderate_facegram());

grant select, insert, update on table public.lender_escalations
  to authenticated, service_role;
