import CommunityFeed from "@/components/CommunityFeed";
import { communityPosts } from "@/data/coachingPlatform";

export const dynamic = "force-dynamic";
export const metadata = { title: "Community" };

export default function CoachCommunityPage() {
  return (
    <section className="container-page py-8">
      <h1 className="h-display text-3xl">Community</h1>
      <p className="prose-lf mt-2 max-w-2xl text-lf-slate">
        Both program feeds. Pin posts, answer questions, and feature wins.
      </p>
      <div className="mt-6 grid gap-10">
        <div className="rounded-2xl border-2 border-lf-orange/50 p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-lf-orange px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
              LO Mastery
            </span>
            <h2 className="h-display text-xl">Program feed — what LO Mastery members see</h2>
          </div>
          <CommunityFeed posts={communityPosts} storageKey="lf-feed-mastery" program="mastery" />
        </div>
        <div className="rounded-2xl border-2 border-lf-navy/40 p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-lf-navy px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
              Loan Factory Alliance
            </span>
            <h2 className="h-display text-xl">Program feed — what Alliance members see</h2>
          </div>
          <CommunityFeed posts={communityPosts} storageKey="lf-feed-alliance" program="alliance" />
        </div>
      </div>
    </section>
  );
}
