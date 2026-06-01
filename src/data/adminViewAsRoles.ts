export type AdminViewAsRole = { value: string; label: string };

export const adminViewAsRoles: AdminViewAsRole[] = [
  { value: "master_admin", label: "Master Admin" },
  { value: "admin", label: "Admin" },
  { value: "lo_development_lead", label: "LO Development Lead" },
  { value: "lo_development_member", label: "LO Development Member" },
  { value: "training_academy", label: "Training Academy" },
  { value: "loan_officer_support", label: "Loan Officer Support" },
  { value: "corporate_coach", label: "Corporate Coach" },
  {
    value: "corporate_coach_supervisor",
    label: "Corporate Coach Supervisor",
  },
  { value: "lo_mastery_coach", label: "LO Mastery Coach" },
  {
    value: "loan_factory_alliance_coach",
    label: "Loan Factory Alliance Coach",
  },
  { value: "coaching_director", label: "Coaching Director" },
  { value: "team_leader", label: "Team Leader" },
  { value: "marketing", label: "Marketing" },
  { value: "coaching_member_level_1", label: "LO Mastery Member" },
  {
    value: "coaching_member_level_2",
    label: "Loan Factory Alliance Member",
  },
  { value: "loan_officer", label: "Loan Officer" },
];
