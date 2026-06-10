import Link from "next/link";
import { resolveAdminAccess } from "@/lib/supabase/adminAccess";

export const dynamic = "force-dynamic";
export const metadata = { title: "Settings" };

const settingsLinks = [
  {
    href: "/admin/view-as/",
    title: "View as role",
    description: "Preview the platform as Master Admin, Coach, LO Mastery Member, or Alliance Member.",
  },
  {
    href: "/admin/users/",
    title: "Users",
    description: "Approved users, roles, and access review.",
  },
  {
    href: "/admin/coach-assignments/",
    title: "Coach assignments",
    description: "Which coach owns which members.",
  },
  {
    href: "/admin/platform-status/",
    title: "Platform status",
    description: "Environment, auth, and deployment health.",
  },
  {
    href: "/admin/qa-checklist/",
    title: "QA checklist",
    description: "Release review checklist for every surface.",
  },
];

export default async function AdminSettingsPage() {
  const access = await resolveAdminAccess();
  if (!access.allowed) {
    return (
      <section className="container-page py-16">
        <div className="card max-w-2xl">
          <h1 className="h-display text-3xl">Admin access required</h1>
          <Link href="/admin/" className="btn-primary mt-6 inline-block">
            Back to admin
          </Link>
        </div>
      </section>
    );
  }
  return (
    <section className="container-page py-10">
      <h1 className="h-display text-3xl">Settings</h1>
      <p className="prose-lf mt-2 max-w-2xl text-lf-slate">
        Platform controls. Every link below is a working admin tool.
      </p>
      <div className="mt-6 overflow-hidden rounded-2xl border border-lf-line bg-white shadow-card">
        {settingsLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col gap-1 border-b border-lf-line p-4 transition last:border-b-0 hover:bg-lf-mist sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="text-sm font-bold text-lf-navy">{item.title}</span>
            <span className="text-sm text-lf-slate">{item.description}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
