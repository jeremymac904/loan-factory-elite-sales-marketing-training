import Link from "next/link";
import FaceGramAccessNotice from "@/components/FaceGramAccessNotice";
import { faceGramGroups } from "@/data/facegram";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { canAccessFaceGram, getRoleLabel } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";

export const metadata = { title: "FaceGram Groups" };
export const dynamic = "force-dynamic";

export default async function FaceGramGroupsPage() {
  const session = await getBetaUserSession();
  const previewEnabled = await isBetaPreviewEnabled();

  if (!previewEnabled && session.status === "not-configured") {
    return <FaceGramAccessNotice status="not-configured" />;
  }

  if (!previewEnabled && session.status === "signed-out") {
    return <FaceGramAccessNotice status="signed-out" />;
  }

  if (!previewEnabled && session.status === "pending") {
    return <FaceGramAccessNotice status="pending" />;
  }

  if (
    !previewEnabled &&
    session.status === "approved" &&
    !canAccessFaceGram(session.profile, session.permissions)
  ) {
    return (
      <FaceGramAccessNotice
        status="role"
        roleLabel={getRoleLabel(session.profile.role)}
      />
    );
  }

  return (
    <>
      <section className="bg-lf-navy text-white">
        <div className="container-page py-14">
          <h1 className="metal-title-dark text-4xl md:text-5xl">
            FaceGram Groups
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/80">
            Find internal Loan Factory groups by role, state, topic, language,
            and training path. Groups are for internal learning and community
            only.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/facegram/" className="btn-primary">
              Back to Feed
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f0f2f5] py-10">
        <div className="container-page">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {faceGramGroups.map((group) => (
              <Link
                key={group.slug}
                href={`/facegram/groups/${group.slug}/`}
                className="overflow-hidden rounded-2xl bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
              >
                <div className="relative min-h-36 bg-gradient-to-br from-lf-orange via-[#2b2b2b] to-black p-5 text-white">
                  <div aria-hidden className="absolute inset-0 bg-black/20" />
                  <div className="relative">
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
                      {group.category}
                    </p>
                    <h2 className="mt-3 font-display text-2xl font-semibold">
                      {group.name}
                    </h2>
                    <p className="mt-1 text-sm text-white/75">
                      {group.memberCount}
                    </p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm leading-6 text-lf-slate">
                    {group.description}
                  </p>
                  <span className="mt-5 inline-flex text-sm font-semibold text-lf-orange">
                    Open group &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
