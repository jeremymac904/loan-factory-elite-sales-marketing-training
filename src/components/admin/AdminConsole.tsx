"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export type AdminUserCard = {
  name: string;
  email: string;
  roleLabel: string;
  department: string;
  status: string;
  preview: boolean;
};

export type AdminToolGroup = {
  label: string;
  tools: { label: string; href: string }[];
};

export type AdminViewAsRole = { value: string; label: string };

const quickActions = [
  { label: "Users & Access", href: "/admin/users" },
  { label: "LO Development", href: "/lo-development/" },
  { label: "QA Checklist", href: "/admin/qa-checklist/" },
  { label: "Platform Status", href: "/admin/platform-status" },
];

export const adminToolGroups: AdminToolGroup[] = [
  {
    label: "People & Access",
    tools: [
      { label: "Users & Access", href: "/admin/users" },
      { label: "Coach Assignments", href: "/admin/coach-assignments" },
      { label: "View-As Mode", href: "/admin/view-as" },
      { label: "Department Routing", href: "/department-routing/" },
      { label: "Settings", href: "/settings/" },
    ],
  },
  {
    label: "Coaching",
    tools: [
      { label: "Coach Command Center", href: "/coach-command-center" },
      { label: "Coaching Members", href: "/coaching/" },
      { label: "LO Development Dashboard", href: "/lo-development/" },
      { label: "Loan Officer Support", href: "/loan-officer-support/" },
    ],
  },
  {
    label: "Training & Content",
    tools: [
      { label: "Training Academy", href: "/training-academy/" },
      { label: "Training Library", href: "/training-library/" },
      { label: "Video Library", href: "/ai-training/video-library/" },
      { label: "Resource Library", href: "/resources/" },
      { label: "Content Skills", href: "/content-skills/" },
      { label: "Quiz Review", href: "/admin/quiz-review" },
    ],
  },
  {
    label: "Ops & Review",
    tools: [
      { label: "Marketing Dashboard", href: "/marketing/" },
      { label: "FaceGram Moderation", href: "/facegram/" },
      { label: "Feedback & Suggestions", href: "/admin/feedback" },
      { label: "Lender Escalations", href: "/admin/lender-escalations" },
      { label: "AI Assistant Settings", href: "/admin/ai-assistants" },
      { label: "Launch QA Checklist", href: "/admin/qa-checklist/" },
      { label: "Platform Status", href: "/admin/platform-status" },
    ],
  },
];

export const adminViewAsRoles: AdminViewAsRole[] = [
  { value: "master_admin", label: "Master Admin" },
  { value: "admin", label: "Admin" },
  { value: "lo_development_lead", label: "LO Development Lead" },
  { value: "lo_development_member", label: "LO Development Member" },
  { value: "training_academy", label: "Training Academy" },
  { value: "loan_officer_support", label: "Loan Officer Support" },
  { value: "corporate_coach", label: "Corporate Coach" },
  { value: "marketing", label: "Marketing" },
  { value: "team_leader", label: "Team Leader" },
  { value: "coaching_member_level_1", label: "LO Mastery Member" },
  { value: "coaching_member_level_2", label: "Loan Factory Alliance Member" },
  { value: "loan_officer", label: "Loan Officer" },
];

export default function AdminConsole({
  user,
  stats,
}: {
  user: AdminUserCard;
  stats: { label: string; value: string }[];
}) {
  const router = useRouter();

  function handleGroupNav(e: React.ChangeEvent<HTMLSelectElement>) {
    const href = e.target.value;
    if (href) router.push(href);
    e.target.selectedIndex = 0;
  }

  return (
    <section className="container-page py-10">
      {/* Quick actions above the fold */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wide text-lf-slate">
          Quick actions
        </span>
        {quickActions.map((a) => (
          <Link key={a.href} href={a.href} className="btn-primary text-sm">
            {a.label}
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {/* Compact current-user card */}
        <div className="card">
          <div className="flex items-center justify-between gap-2">
            <h2 className="h-display text-lg">Current user</h2>
            <span className="rounded-full bg-lf-orangeSoft px-2.5 py-0.5 text-xs font-semibold text-lf-orangeDark">
              {user.preview ? "Beta Preview" : "Google Auth"}
            </span>
          </div>
          <dl className="mt-3 space-y-1.5 text-sm">
            <Row label="Name" value={user.name} />
            <Row label="Email" value={user.email} />
            <div className="flex items-center justify-between gap-3">
              <dt className="font-semibold text-lf-slate">Role</dt>
              <dd>
                <span className="inline-block rounded-full bg-lf-navy px-2.5 py-0.5 text-xs font-semibold text-white">
                  {user.roleLabel}
                </span>
              </dd>
            </div>
            <Row label="Department" value={user.department} />
            <Row label="Status" value={user.status} />
          </dl>
        </div>

        {/* Categorized admin tools via dropdowns */}
        <div className="card lg:col-span-2">
          <h2 className="h-display text-lg">Admin tools</h2>
          <p className="mt-1 text-xs text-lf-slate">
            Pick a category, then choose a destination.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {adminToolGroups.map((group) => (
              <label key={group.label} className="block">
                <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                  {group.label}
                </span>
                <select
                  defaultValue=""
                  onChange={handleGroupNav}
                  className="mt-1 w-full rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-semibold text-lf-charcoal focus:border-lf-orange focus:outline-none focus:ring-1 focus:ring-lf-orange"
                >
                  <option value="" disabled>
                    Go to…
                  </option>
                  {group.tools.map((t) => (
                    <option key={t.href} value={t.href}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>

          {/* View-As role dropdown */}
          <div className="mt-5 rounded-lg border border-lf-line bg-lf-mist p-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
              View As role
            </span>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <select
                defaultValue=""
                onChange={(e) => {
                  if (e.target.value)
                    router.push(`/admin/view-as/?role=${e.target.value}`);
                }}
                className="min-w-[14rem] flex-1 rounded-lg border border-lf-line bg-white px-3 py-2 text-sm font-semibold text-lf-charcoal focus:border-lf-orange focus:outline-none focus:ring-1 focus:ring-lf-orange"
              >
                <option value="" disabled>
                  Select a role to preview…
                </option>
                {adminViewAsRoles.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
              <Link href="/admin/view-as" className="btn-secondary text-sm">
                Open View-As
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Compact platform status strip */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-lf-line bg-white px-4 py-3"
          >
            <p className="text-xs font-semibold text-lf-slate">{s.label}</p>
            <p className="mt-1 text-lg font-bold text-lf-charcoal">{s.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="font-semibold text-lf-slate">{label}</dt>
      <dd className="truncate text-lf-charcoal">{value}</dd>
    </div>
  );
}
