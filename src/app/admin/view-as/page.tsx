import Link from "next/link";
import { getRoleLabel } from "@/lib/supabase/auth";
import { resolveAdminAccess } from "@/lib/supabase/adminAccess";
import { getViewAsState } from "@/lib/viewAs";
import { approvedUserSeeds } from "@/data/approvedUsers";
import ViewAsControls from "@/components/ViewAsControls";

export const dynamic = "force-dynamic";
export const metadata = { title: "View-As Mode" };

const roleOptions = [
  "master_admin",
  "admin",
  "lo_development_lead",
  "lo_development_member",
  "training_academy",
  "loan_officer_support",
  "corporate_coach",
  "marketing",
  "team_leader",
  "coaching_member_level_1",
  "coaching_member_level_2",
  "loan_officer",
];

export default async function AdminViewAsPage() {
  const access = await resolveAdminAccess();
  const currentViewAs = await getViewAsState();

  if (!access.allowed) {
    const resolvedLabel = access.resolvedRole
      ? getRoleLabel(access.resolvedRole)
      : "no resolved role";
    return (
      <section className="container-page py-16">
        <div className="card max-w-2xl">
          <h1 className="h-display text-3xl">Admin access required</h1>
          <p className="prose-lf mt-3">
            View-As requires Master Admin or Admin access. Your current
            resolved role is: <strong>{resolvedLabel}</strong>.
          </p>
          <Link href="/admin/" className="btn-primary mt-6 inline-block">
            Back to admin
          </Link>
        </div>
      </section>
    );
  }

  const isMasterAdmin =
    access.resolvedRole === "master_admin" || access.reason === "preview";

  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-14">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/"
              className="text-sm font-semibold text-white/70 hover:text-white"
            >
              Admin
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-sm font-semibold text-white">View-As Mode</span>
          </div>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            View-As Mode
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Preview the platform as any seeded user or role. View as a role for
            recording training walkthroughs and validating access. You stay
            signed in as yourself — destructive actions remain disabled while
            previewing.
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        {currentViewAs && (
          <div className="card mb-6 border-lf-orange/30 bg-lf-orangeSoft/40">
            <h2 className="h-display text-xl">Currently viewing as</h2>
            <p className="prose-lf mt-2">
              {currentViewAs.name ?? currentViewAs.email ?? "—"} ·{" "}
              <span className="font-semibold">
                {getRoleLabel(currentViewAs.role)}
              </span>
            </p>
            <p className="text-xs text-lf-slate">
              The orange banner stays visible across the site while View-As is
              active.
            </p>
          </div>
        )}

        <ViewAsControls
          roleOptions={roleOptions}
          userOptions={approvedUserSeeds.map((u) => ({
            email: u.email,
            name: u.full_name,
            role: u.role,
          }))}
          isMasterAdmin={isMasterAdmin}
        />

        <div className="mt-8 rounded-xl border border-lf-line bg-lf-mist p-5 text-sm text-lf-slate">
          <p className="font-semibold text-lf-charcoal">How View-As works</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              View-As changes how the navigation, role badges, and gated
              surfaces appear — for visual review only.
            </li>
            <li>
              You stay signed in as your real account. Real data writes still go
              through your account.
            </li>
            <li>
              Use this to record training walkthroughs for each role without
              switching Google accounts.
            </li>
            <li>
              An orange banner stays visible at the top of every page until you
              click <strong>Exit View-As</strong>.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
