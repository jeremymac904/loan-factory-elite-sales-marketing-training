import Link from "next/link";
import { notFound } from "next/navigation";
import FaceGramAccessNotice from "@/components/FaceGramAccessNotice";
import FaceGramGroupTabs from "@/components/FaceGramGroupTabs";
import {
  faceGramGroups,
  getFaceGramGroup,
} from "@/data/facegram";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { canAccessFaceGram, getRoleLabel } from "@/lib/supabase/auth";
import { getBetaUserSession } from "@/lib/supabase/session";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ tab?: string }> | { tab?: string };
};

export function generateStaticParams() {
  return faceGramGroups.map((group) => ({ slug: group.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const group = getFaceGramGroup(slug);
  return {
    title: group ? `${group.name} | FaceGram` : "FaceGram Group",
  };
}

const tabs = [
  { id: "feed", label: "Feed" },
  { id: "discussion", label: "Discussion" },
  { id: "about", label: "About" },
  { id: "rules", label: "Rules" },
  { id: "photos", label: "Photos" },
  { id: "files", label: "Files" },
  { id: "events", label: "Events" },
  { id: "live", label: "Live" },
  { id: "videos", label: "Videos" },
];

export const dynamic = "force-dynamic";

export default async function FaceGramGroupPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const query = searchParams ? await searchParams : {};
  const group = getFaceGramGroup(slug);

  if (!group) {
    notFound();
  }

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

  const activeTab = tabs.some((tab) => tab.id === query.tab)
    ? query.tab!
    : "feed";

  return (
    <main className="bg-[#f0f2f5]">
      <section className="border-b border-lf-line bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <div className="relative min-h-[290px] overflow-hidden rounded-b-2xl bg-gradient-to-br from-lf-orange via-[#2b2b2b] to-black p-8 text-white shadow-card">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(255,255,255,0.32),transparent_22%),radial-gradient(circle_at_12%_90%,rgba(242,106,31,0.55),transparent_32%)]"
            />
            <div className="relative flex min-h-[230px] items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-white/75">
                  {group.coverSubtitle}
                </p>
                <h1 className="metal-title-dark mt-2 max-w-3xl text-4xl md:text-6xl">
                  {group.coverTitle}
                </h1>
              </div>
            </div>
          </div>

          <div className="grid gap-5 py-5 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <h2 className="font-display text-3xl font-semibold text-lf-navy">
                {group.name}
              </h2>
              <p className="mt-1 text-sm font-semibold text-lf-slate">
                {group.visibility} · {group.memberCount}
              </p>
            </div>
          </div>

          <nav
            className="flex gap-1 overflow-x-auto border-t border-lf-line py-2"
            aria-label={`${group.name} sections`}
          >
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                href={`/facegram/groups/${group.slug}/?tab=${tab.id}`}
                className={`whitespace-nowrap rounded-lg px-4 py-3 text-sm font-semibold ${
                  tab.id === activeTab
                    ? "bg-lf-orange text-white"
                    : "text-lf-charcoal hover:bg-lf-mist hover:text-lf-orange"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-5 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-5">
          <FaceGramGroupTabs activeTab={activeTab} group={group} />
        </div>

        <aside id="about" className="space-y-5 lg:sticky lg:top-24 lg:h-fit">
          <article className="rounded-2xl bg-white p-5 shadow-card">
            <h3 className="font-display text-xl font-semibold text-lf-navy">
              About this group
            </h3>
            <p className="mt-3 text-sm leading-6 text-lf-slate">
              {group.description}
            </p>
            <div className="mt-4 grid gap-3 text-sm text-lf-charcoal">
              <div className="rounded-xl border border-lf-line p-3">
                {group.visibility}
              </div>
              <div className="rounded-xl border border-lf-line p-3">
                Internal visibility only
              </div>
            </div>
          </article>

          <article id="rules" className="rounded-2xl bg-white p-5 shadow-card">
            <h3 className="font-display text-xl font-semibold text-lf-navy">
              Group rules
            </h3>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-lf-slate">
              {group.rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ol>
          </article>

          <article className="rounded-2xl bg-lf-navy p-5 text-white shadow-card">
            <h3 className="font-display text-xl font-semibold">
              More FaceGram groups
            </h3>
            <div className="mt-4 grid gap-2">
              {faceGramGroups
                .filter((item) => item.slug !== group.slug)
                .slice(0, 4)
                .map((item) => (
                  <Link
                    key={item.slug}
                    href={`/facegram/groups/${item.slug}/`}
                    className="rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-lf-orange"
                  >
                    {item.name}
                  </Link>
                ))}
            </div>
          </article>
        </aside>
      </section>
    </main>
  );
}
