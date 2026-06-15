-- Coaching calendar — manual meeting links (launch, no mailbox dependency).
-- ADDITIVE ONLY. Extends the existing public.coaching_calendar_events so a coach
-- can paste a Google Meet / Zoom / Calendar-invite link, create a coaching
-- event, and have it display on the platform calendar for the program's
-- members. No real Google/Zoom account or mailbox is required — the coach
-- creates the meeting elsewhere and pastes the link.

set search_path = public;

alter table public.coaching_calendar_events
  add column if not exists meeting_url text,
  add column if not exists meeting_provider text,   -- google_meet | zoom | calendar | other
  add column if not exists program text,            -- mastery | alliance | both
  add column if not exists description text,
  add column if not exists created_by text,
  add column if not exists updated_at timestamptz default now();

-- Coaches/staff (and admins) may create and manage events. Members still read
-- via the existing *_approved_select policy. Listed roles mirror the app's
-- FULL_COACHING_STAFF_ROLES set.
drop policy if exists "coaching_calendar_events_staff_write" on public.coaching_calendar_events;
create policy "coaching_calendar_events_staff_write" on public.coaching_calendar_events
  for all to authenticated
  using (
    public.can_access_admin()
    or public.current_profile_role() in (
      'lo_development_lead','lo_development_member','lo_development','training_academy',
      'corporate_coach','corporate_coach_supervisor','lo_mastery_coach',
      'loan_factory_alliance_coach','coaching_director','team_leader'
    )
  )
  with check (
    public.can_access_admin()
    or public.current_profile_role() in (
      'lo_development_lead','lo_development_member','lo_development','training_academy',
      'corporate_coach','corporate_coach_supervisor','lo_mastery_coach',
      'loan_factory_alliance_coach','coaching_director','team_leader'
    )
  );
