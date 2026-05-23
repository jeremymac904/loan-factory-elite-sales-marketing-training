import Link from "next/link";
import AuthDebugTrailView from "@/components/AuthDebugTrail";
import { getBetaUserSession } from "@/lib/supabase/session";

export const dynamic = "force-dynamic";
export const metadata = { title: "Auth Debug" };

export default async function AuthDebugPage() {
  const session = await getBetaUserSession();
  const serverSessionExists =
    session.status === "approved" || session.status === "pending";
  const serverProfile =
    session.status === "approved" || session.status === "pending"
      ? session.profile
      : null;

  return (
    <section className="container-page py-12">
      <div className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
          Auth debug
        </span>
        <h1 className="h-display mt-1 text-3xl">Safe OAuth stage report</h1>
        <p className="prose-lf mt-3 max-w-2xl text-base">
          This page shows only stage names, booleans, and profile metadata. It
          does not expose token, cookie, API key, or service role values.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AuthDebugTrailView
          serverSessionExists={serverSessionExists}
          serverStatus={session.status}
          serverProfileEmail={serverProfile?.email}
          serverProfileRole={serverProfile?.role}
          serverProfileStatus={serverProfile?.status}
        />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/login/" className="btn-primary">
          Sign in
        </Link>
        <Link href="/auth/status/" className="btn-secondary">
          Auth status
        </Link>
        <Link href="/admin/" className="btn-secondary">
          Admin
        </Link>
        <Link href="/auth/sign-out/" className="btn-secondary">
          Sign out
        </Link>
      </div>
    </section>
  );
}
