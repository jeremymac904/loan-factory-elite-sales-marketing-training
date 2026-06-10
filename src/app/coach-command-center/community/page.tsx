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
        <div>
          <h2 className="h-display text-xl">LO Mastery feed</h2>
          <div className="mt-3">
            <CommunityFeed posts={communityPosts} storageKey="lf-feed-mastery" program="mastery" />
          </div>
        </div>
        <div>
          <h2 className="h-display text-xl">Alliance feed</h2>
          <div className="mt-3">
            <CommunityFeed posts={communityPosts} storageKey="lf-feed-alliance" program="alliance" />
          </div>
        </div>
      </div>
    </section>
  );
}
