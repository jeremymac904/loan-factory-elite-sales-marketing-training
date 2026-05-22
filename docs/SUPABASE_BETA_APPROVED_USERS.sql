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
