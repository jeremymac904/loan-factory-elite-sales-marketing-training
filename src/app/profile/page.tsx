import Link from "next/link";
import { betaPreviewEmail, isBetaPreviewEnabled } from "@/lib/betaPreview";
import { getRoleLabel, isAdminRole } from "@/lib/supabase/auth";
import { roleCanCoach } from "@/lib/coachAccess";
import { getBetaUserSession } from "@/lib/supabase/session";

export const dynamic = "force-dynamic";
export const metadata = { title: "Profile" };

const connectedServices = [
  {
    name: "Google Workspace",
    description: "Sign-in and email identity",
    status: "connected" as const,
  },
  {
    name: "Gmail Review",
    description: "Email review for AI Twin training",
    status: "future" as const,
  },
  {
    name: "Drive Sources",
    description: "Document sources for AI Twin context",
    status: "future" as const,
  },
  {
    name: "AI Twin",
    description: "Personal AI assistant trained on your style",
    status: "future" as const,
  },
];

export default async function ProfilePage() {
  const session = await getBetaUserSession();
  const previewEnabled = await isBetaPreviewEnabled();

  if (!previewEnabled && session.status !== "approved") {
    return (
      <section className="container-page py-16">
        <div className="card max-w-2xl">
          <h1 className="h-display text-3xl">Sign in required</h1>
          <p className="prose-lf mt-3">
            Sign in with your Loan Factory Google account to view your profile.
          </p>
          <Link href="/login/" className="btn-primary mt-6 inline-block">
            Sign in
          </Link>
        </div>
      </section>
    );
  }

  const profile = previewEnabled
    ? null
    : session.status === "approved"
      ? session.profile
      : null;
  const email = profile?.email ?? (previewEnabled ? betaPreviewEmail : "");
  const name = profile?.full_name ?? "";
  const role = previewEnabled
    ? "Review"
    : getRoleLabel(profile?.role);
  const department = profile?.department ?? "—";
  const title = profile?.title ?? "—";
  const teamBrand = profile?.team_brand ?? "—";
  const phone = profile?.phone ?? "—";
  const profileUrl = profile?.profile_url ?? null;
  const status = previewEnabled ? "review-only" : profile?.status ?? "pending";
  const showAdmin =
    previewEnabled ||
    (session.status === "approved" && isAdminRole(session.profile.role));
  const showCoach =
    previewEnabled ||
    (session.status === "approved" && roleCanCoach(session.profile.role));

  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-14">
          <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
            Profile
          </p>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            {name || "Your Profile"}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">{email}</p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card">
            <h2 className="h-display text-2xl">Account</h2>
            <dl className="mt-5 grid gap-4 text-sm">
              <ProfileField label="Name" value={name || "Not set"} />
              <ProfileField label="Email" value={email} />
              <ProfileField label="Role" value={role} />
              <ProfileField label="Department" value={department} />
              <ProfileField label="Title" value={title} />
              <ProfileField label="Team / Brand" value={teamBrand} />
              <ProfileField label="Phone" value={phone} />
              {profileUrl && (
                <div>
                  <dt className="font-semibold text-lf-slate">Profile URL</dt>
                  <dd className="mt-1">
                    <a
                      href={profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lf-orange hover:underline"
                    >
                      {profileUrl}
                    </a>
                  </dd>
                </div>
              )}
              <ProfileField label="Account Status" value={status} />
            </dl>
          </div>

          <div className="card">
            <h2 className="h-display text-2xl">Connected services</h2>
            <div className="mt-5 grid gap-3">
              {connectedServices.map((service) => (
                <div
                  key={service.name}
                  className="flex items-center justify-between rounded-lg border border-lf-line px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-lf-charcoal">
                      {service.name}
                    </p>
                    <p className="text-xs text-lf-slate">
                      {service.description}
                    </p>
                  </div>
                  {service.status === "connected" ? (
                    <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                      Connected
                    </span>
                  ) : (
                    <span className="rounded-full bg-lf-mist px-2.5 py-0.5 text-xs font-semibold text-lf-slate">
                      Not enabled
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/profile/edit/" className="btn-primary">
            Edit profile
          </Link>
          <Link href="/settings/" className="btn-secondary">
            Settings
          </Link>
          {showCoach && (
            <Link href="/coach-command-center/" className="btn-secondary">
              Coach Center
            </Link>
          )}
          {showAdmin && (
            <Link href="/admin/" className="btn-secondary">
              Admin
            </Link>
          )}
          <Link href="/settings/google/" className="btn-secondary">
            Google connections
          </Link>
          <Link href="/" className="btn-secondary">
            Home
          </Link>
          <Link
            href="/auth/sign-out/"
            className="btn-secondary border-red-200 text-red-600 hover:border-red-400 hover:text-red-700"
          >
            Sign out
          </Link>
        </div>
      </section>
    </>
  );
}

function ProfileField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <dt className="font-semibold text-lf-slate">{label}</dt>
      <dd className="mt-1 text-lf-charcoal">{value}</dd>
    </div>
  );
}
