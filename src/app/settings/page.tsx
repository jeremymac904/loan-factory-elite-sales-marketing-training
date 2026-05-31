import Link from "next/link";
import { betaPreviewEmail, isBetaPreviewEnabled } from "@/lib/betaPreview";
import { getRoleLabel } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";

export const dynamic = "force-dynamic";
export const metadata = { title: "Settings" };

const settingsSurfaces = [
  {
    title: "Profile",
    description:
      "Update your name, title, contact details, and how you appear across the platform.",
    href: "/profile/edit/",
  },
  {
    title: "Google connections",
    description:
      "Review your Google Workspace sign-in and the scopes connected to your account.",
    href: "/settings/google/",
  },
  {
    title: "Notifications",
    description:
      "Choose what you want to hear about — FaceGram activity, messages, coaching, and announcements.",
    href: "/settings/notifications/",
  },
  {
    title: "Security",
    description:
      "See your sign-in method, account status, and how identity is managed in Google.",
    href: "/settings/security/",
  },
  {
    title: "AI Twin",
    description:
      "Tune your personal AI Twin persona, voice, and connected knowledge sources.",
    href: "/ai-assistants/my-ai-twin/",
  },
];

export default async function SettingsPage() {
  const session = await getBetaUserSession();
  const previewEnabled = await isBetaPreviewEnabled();

  if (!previewEnabled && session.status !== "approved") {
    return (
      <section className="container-page py-16">
        <div className="card max-w-2xl">
          <h1 className="h-display text-3xl">Sign in required</h1>
          <p className="prose-lf mt-3">
            Settings are available to approved Loan Factory users. Sign in with
            your Loan Factory Google account to continue.
          </p>
          <Link href="/login/" className="btn-primary mt-6 inline-block">
            Sign in
          </Link>
        </div>
      </section>
    );
  }

  const profile =
    !previewEnabled && session.status === "approved" ? session.profile : null;
  const name =
    profile?.full_name ?? (previewEnabled ? "Your account" : "Your account");
  const email = profile?.email ?? (previewEnabled ? betaPreviewEmail : "");
  const role = previewEnabled ? "Review" : getRoleLabel(profile?.role);

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
            Settings
          </p>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            Settings
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Manage how you sign in, what you get notified about, and how your
            profile and AI Twin show up across the Loan Factory platform.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="card max-w-3xl">
          <h2 className="h-display text-2xl">Signed in</h2>
          <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-3">
            <div>
              <dt className="font-semibold text-lf-slate">Name</dt>
              <dd className="mt-1 text-lf-charcoal">{name}</dd>
            </div>
            <div>
              <dt className="font-semibold text-lf-slate">Email</dt>
              <dd className="mt-1 break-words text-lf-charcoal">{email}</dd>
            </div>
            <div>
              <dt className="font-semibold text-lf-slate">Role</dt>
              <dd className="mt-1 text-lf-charcoal">{role}</dd>
            </div>
          </dl>
          <p className="prose-lf mt-5 text-sm">
            These settings are for approved Loan Factory users. Each surface
            below opens a real, working area — profile editing, Google
            connections, notification preferences, security, and your AI Twin.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {settingsSurfaces.map((surface) => (
            <Link
              key={surface.href}
              href={surface.href}
              className="card flex flex-col gap-2 transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <h2 className="text-base font-semibold text-lf-charcoal">
                {surface.title}
              </h2>
              <p className="text-sm text-lf-slate">{surface.description}</p>
              <span className="mt-auto inline-flex items-center text-sm font-semibold text-lf-orange">
                Open <span aria-hidden className="ml-2">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/profile/" className="btn-secondary">
            Back to profile
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
