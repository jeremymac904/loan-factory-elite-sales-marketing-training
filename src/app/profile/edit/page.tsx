import Link from "next/link";
import { getBetaUserSession } from "@/lib/supabase/session";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import ProfileEditForm from "@/components/ProfileEditForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit Profile" };

export default async function ProfileEditPage() {
  const session = await getBetaUserSession();
  const previewEnabled = await isBetaPreviewEnabled();

  if (!previewEnabled && session.status !== "approved") {
    return (
      <section className="container-page py-16">
        <div className="card max-w-2xl">
          <h1 className="h-display text-3xl">Sign in required</h1>
          <p className="prose-lf mt-3">
            Sign in with your Loan Factory Google account to edit your profile.
          </p>
          <Link href="/login/" className="btn-primary mt-6 inline-block">
            Sign in
          </Link>
        </div>
      </section>
    );
  }

  const profile = session.status === "approved" ? session.profile : null;

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
              href="/profile/"
              className="text-sm font-semibold text-white/70 hover:text-white"
            >
              Profile
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-sm font-semibold text-white">Edit</span>
          </div>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            Edit profile
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Update your contact info, team brand, and Loan Factory details.
            These show up across the platform and in FaceGram.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        {previewEnabled ? (
          <div className="card max-w-2xl border-lf-orange/30 bg-lf-orangeSoft/30">
            <h2 className="h-display text-2xl">Beta Preview Mode</h2>
            <p className="prose-lf mt-3">
              You are in preview mode. Edits are not saved. Sign in with your
              Loan Factory Google account to save profile changes.
            </p>
            <Link href="/login/" className="btn-primary mt-6 inline-block">
              Sign in with Google
            </Link>
          </div>
        ) : (
          <ProfileEditForm profile={profile} />
        )}
      </section>
    </>
  );
}
