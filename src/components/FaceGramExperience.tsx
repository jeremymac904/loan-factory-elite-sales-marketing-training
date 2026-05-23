"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import BrandImage from "@/components/BrandImage";
import { brandAssets } from "@/data/brandAssets";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import {
  getSupabasePublicConfig,
  hasSupabasePublicConfig,
} from "@/lib/supabase/config";
import {
  faceGramGroups,
  faceGramPosts,
  faceGramRightRail,
  faceGramShortcuts,
  lenderPromotionNotes,
} from "@/data/facegram";

const postOptions = [
  { label: "Text post", status: "Local demo ready" },
  { label: "Image post", status: "Needs upload rules" },
  { label: "Video/Reel", status: "Needs storage rules" },
  { label: "Story", status: "Static preview" },
  { label: "Poll", status: "Coming soon" },
  { label: "Feedback request", status: "Coming soon" },
];

const stories = [
  { label: "Create story", image: "/team/andre-king.png" },
  { label: "Training win", image: "/team/edward-arvizo.png" },
  { label: "Marketing idea", image: "/team/duyen-nguyen.png" },
  { label: "New LO question", image: "/team/kevin-truong.png" },
  { label: "Coach recap", image: "/team/jody-richards.png" },
];

const accentClasses = {
  orange: "from-lf-orange/90 via-[#2b2b2b] to-black",
  charcoal: "from-[#3a3a3a] via-[#161616] to-black",
  silver: "from-[#d9d9d9] via-[#363636] to-black",
};

type FaceGramAuthState =
  | { status: "loading" }
  | { status: "not-configured" }
  | { status: "signed-out" }
  | { status: "pending"; email: string }
  | { status: "approved"; email: string };

export default function FaceGramExperience({
  initialApprovedEmail,
  previewMode = false,
}: {
  initialApprovedEmail?: string;
  previewMode?: boolean;
}) {
  const [entered, setEntered] = useState(false);
  const [draftPost, setDraftPost] = useState("");
  const [posts, setPosts] = useState(() =>
    faceGramPosts.map((post, index) => ({
      ...post,
      id: post.title,
      likes: 18 - index * 3,
      comments: ["Helpful internal example."],
      saved: false,
      liked: false,
    })),
  );
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const supabaseConfigured = hasSupabasePublicConfig(getSupabasePublicConfig());
  const [authState, setAuthState] = useState<FaceGramAuthState>(() =>
    initialApprovedEmail
      ? { status: "approved", email: initialApprovedEmail }
      : supabaseConfigured
        ? { status: "loading" }
        : { status: "not-configured" },
  );

  useEffect(() => {
    if (previewMode || initialApprovedEmail || !supabaseConfigured) return;

    const supabase = createBrowserSupabaseClient();

    if (!supabase) return;

    const client = supabase;
    let active = true;

    async function loadUser() {
      const {
        data: { user },
      } = await client.auth.getUser();

      if (!active) return;

      if (!user?.email) {
        setAuthState({ status: "signed-out" });
        return;
      }

      const { data: profile } = await client
        .from("profiles")
        .select("status")
        .eq("id", user.id)
        .maybeSingle<{ status: string | null }>();

      if (!active) return;

      setAuthState(
        profile?.status === "approved"
          ? { status: "approved", email: user.email }
          : { status: "pending", email: user.email },
      );
    }

    void loadUser();

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange(() => {
      void loadUser();
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [initialApprovedEmail, previewMode, supabaseConfigured]);

  const canPost = previewMode || authState.status === "approved";
  const isPending = authState.status === "pending";
  const activeEmail =
    authState.status === "approved" ? authState.email : "beta preview";

  function publishLocalPost() {
    const body = draftPost.trim();

    if (!body) return;

    setPosts((current) => [
      {
        id: `local-${Date.now()}`,
        author: previewMode ? "Beta Preview User" : "Loan Factory LO",
        role: previewMode ? "Internal beta preview" : "Loan Officer",
        avatar: "/team/andre-king.png",
        group: "FaceGram",
        time: "Just now",
        title: "Beta preview text post",
        body,
        mediaLabel: "Text post",
        accent: "orange",
        likes: 0,
        comments: [],
        saved: false,
        liked: false,
      },
      ...current,
    ]);
    setDraftPost("");
    setEntered(true);
  }

  function toggleLike(id: string) {
    setPosts((current) =>
      current.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? Math.max(0, post.likes - 1) : post.likes + 1,
            }
          : post,
      ),
    );
  }

  function toggleSave(id: string) {
    setPosts((current) =>
      current.map((post) =>
        post.id === id ? { ...post, saved: !post.saved } : post,
      ),
    );
  }

  function addComment(id: string) {
    const comment = commentDrafts[id]?.trim();

    if (!comment) return;

    setPosts((current) =>
      current.map((post) =>
        post.id === id
          ? { ...post, comments: [...post.comments, comment] }
          : post,
      ),
    );
    setCommentDrafts((current) => ({ ...current, [id]: "" }));
  }

  return (
    <>
      <section className="border-b border-lf-line bg-white">
        <div className="mx-auto flex w-full max-w-[1480px] items-center gap-3 px-4 py-3">
          <div className="flex shrink-0 rounded-xl bg-white p-1">
            <BrandImage
              asset={brandAssets.facegram}
              heightClass="h-10"
            />
          </div>
          <div className="min-w-0">
            <h1 className="font-display text-xl font-semibold leading-6 text-lf-navy">
              FaceGram
            </h1>
            <p className="mt-0.5 text-sm leading-5 text-lf-slate">
              <span className="font-semibold text-lf-charcoal">What this is:</span>{" "}
              Loan Factory&apos;s internal social community for loan officers,
              AEs, approved vendors, corporate coaches, marketing reviewers,
              and internal teams.
            </p>
          </div>
        </div>
      </section>

      <section id="facegram-feed" className="bg-[#f0f2f5] py-5">
        <div className="grid w-full gap-5 px-4 sm:px-6 lg:grid-cols-[300px_minmax(0,1fr)_320px] xl:grid-cols-[320px_minmax(0,1fr)_360px]">
          <aside className="hidden space-y-3 lg:block">
            <div className="rounded-2xl bg-white p-4 shadow-card">
              <div className="flex items-center gap-3">
                <div className="flex shrink-0 rounded-xl bg-white p-1">
                  <BrandImage
                    asset={brandAssets.facegram}
                    heightClass="h-11"
                  />
                </div>
                <div>
                  <h2 className="font-display text-lg font-semibold text-lf-navy">
                    FaceGram
                  </h2>
                  <p className="text-xs text-lf-slate">Internal community</p>
                </div>
              </div>
              <nav className="mt-4 grid gap-1" aria-label="FaceGram shortcuts">
                {faceGramShortcuts.map((shortcut) => (
                  <Link
                    key={shortcut.label}
                    href={shortcut.href}
                    className="rounded-lg px-3 py-2 text-sm font-semibold text-lf-charcoal hover:bg-lf-mist hover:text-lf-orange"
                  >
                    {shortcut.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-card">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-lf-navy">
                  Groups
                </h3>
                <Link
                  href="/facegram/groups/"
                  className="text-sm font-semibold text-lf-orange"
                >
                  See all
                </Link>
              </div>
              <div className="mt-3 grid gap-2">
                {faceGramGroups.slice(0, 6).map((group) => (
                  <Link
                    key={group.slug}
                    href={`/facegram/groups/${group.slug}/`}
                    className="rounded-xl border border-lf-line bg-white px-3 py-3 text-sm font-semibold text-lf-charcoal hover:border-lf-orange hover:text-lf-orange"
                  >
                    {group.name}
                    <span className="mt-1 block text-xs font-normal text-lf-slate">
                      {group.memberCount}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          <main className="space-y-4">
            {!entered && (
              <div className="rounded-2xl border border-lf-line bg-white p-5 shadow-card">
                <h2 className="font-display text-2xl font-semibold text-lf-navy">
                  Welcome to FaceGram
                </h2>
                <p className="mt-2 text-sm leading-6 text-lf-slate">
                  Enter the internal community feed to review posts, groups,
                  coaching reminders, and internal examples.
                </p>
                <button
                  type="button"
                  onClick={() => canPost && setEntered(true)}
                  disabled={!canPost}
                  className="btn-primary mt-4"
                >
                  {canPost
                    ? "Enter FaceGram"
                    : isPending
                      ? "Access pending"
                      : "Sign in required"}
                </button>
                {!canPost && !isPending && (
                  <Link href="/login/" className="btn-secondary mt-3">
                    Sign in with Google
                  </Link>
                )}
                {isPending && (
                  <Link href="/access-pending/" className="btn-secondary mt-3">
                    View pending status
                  </Link>
                )}
              </div>
            )}

            {canPost ? (
              <div className="rounded-2xl bg-white p-4 shadow-card">
                <div className="grid grid-cols-[auto_1fr] gap-3">
                  <img
                    src="/team/andre-king.png"
                    alt=""
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <textarea
                    value={draftPost}
                    onChange={(event) => setDraftPost(event.target.value)}
                    rows={2}
                    placeholder={`What's on your mind, ${activeEmail}?`}
                    className="min-h-12 resize-none rounded-2xl border border-lf-line bg-[#f0f2f5] px-4 py-3 text-sm outline-none focus:border-lf-orange focus:ring-2 focus:ring-lf-orange/20"
                  />
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-semibold text-lf-slate">
                    Local beta post only. Nothing is saved to Supabase yet.
                  </p>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={publishLocalPost}
                    disabled={!draftPost.trim()}
                  >
                    Post
                  </button>
                </div>
                <div className="mt-4 grid gap-2 border-t border-lf-line pt-4 sm:grid-cols-3">
                  {postOptions.map((option) => (
                    <div
                      key={option.label}
                      className="rounded-lg border border-lf-line bg-lf-mist px-3 py-2 text-sm font-semibold text-lf-charcoal"
                    >
                      {option.label}
                      <span className="mt-1 block text-xs font-normal text-lf-slate">
                        {option.status}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs font-semibold text-lf-slate">
                  Media upload, public sharing, vendor posting, and external
                  publishing stay off until Supabase saving and moderation are
                  wired.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-lf-line bg-white p-5 shadow-card">
                <h2 className="font-display text-xl font-semibold text-lf-navy">
                  Posting requires approved access
                </h2>
                <p className="mt-2 text-sm leading-6 text-lf-slate">
                  The internal feed opens only after your approved Loan Factory
                  beta access is active.
                </p>
                {isPending ? (
                  <Link href="/access-pending/" className="btn-primary mt-4">
                    View pending status
                  </Link>
                ) : (
                  <Link href="/login/" className="btn-primary mt-4">
                    Sign in
                  </Link>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 overflow-hidden sm:grid-cols-5">
              {stories.map((story) => (
                <article
                  key={story.label}
                  className="relative min-h-36 overflow-hidden rounded-2xl bg-lf-navy shadow-card"
                >
                  <img
                    src={story.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-55"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />
                  <p className="absolute bottom-3 left-3 right-3 text-sm font-semibold text-white">
                    {story.label}
                  </p>
                </article>
              ))}
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-card">
              <div className="grid gap-4 md:grid-cols-2">
                <article className="rounded-xl border border-lf-line bg-lf-mist p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                    Reels
                  </p>
                  <h3 className="h-display mt-1 text-lg">Short training clips</h3>
                  <p className="mt-2 text-sm leading-6 text-lf-slate">
                    Static preview for short internal coaching and marketing
                    examples. Upload and playback rules come later.
                  </p>
                </article>
                <article className="rounded-xl border border-lf-line bg-lf-mist p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                    Events
                  </p>
                  <h3 className="h-display mt-1 text-lg">Training posts</h3>
                  <p className="mt-2 text-sm leading-6 text-lf-slate">
                    Future event cards for classes, office hours, and sponsored
                    lender/vendor training after approval.
                  </p>
                </article>
              </div>
            </div>

            {posts.map((post) => (
              <article key={post.id} className="rounded-2xl bg-white shadow-card">
                <div className="p-5">
                  <div className="flex items-start gap-3">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-base font-semibold text-lf-navy">
                        {post.author}
                      </h3>
                      <p className="text-xs text-lf-slate">
                        {post.role} · {post.group} · {post.time}
                      </p>
                    </div>
                  </div>
                  <h4 className="mt-4 text-lg font-semibold text-lf-navy">
                    {post.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-lf-charcoal">
                    {post.body}
                  </p>
                </div>
                <div className={`bg-gradient-to-br ${accentClasses[post.accent]} p-5 text-white`}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                    {post.mediaLabel}
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
                    <div className="flex min-h-44 items-end rounded-xl bg-white/12 p-4">
                      <p className="max-w-xs font-display text-2xl font-semibold">
                        Internal example for feedback
                      </p>
                    </div>
                    <div className="grid gap-3">
                      <div className="rounded-xl bg-white/15 p-4 text-sm">
                        Script idea
                      </div>
                      <div className="rounded-xl bg-white/10 p-4 text-sm">
                        Coaching note
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 border-t border-lf-line text-center text-sm font-semibold text-lf-slate sm:grid-cols-4">
                  <button
                    type="button"
                    className="px-2 py-3 hover:bg-lf-mist hover:text-lf-orange"
                    onClick={() => toggleLike(post.id)}
                  >
                    {post.liked ? "Liked" : "Like"}
                    <span className="mt-1 block text-xs font-normal">
                      {post.likes} reactions
                    </span>
                  </button>
                  <a
                    href={`#comments-${post.id}`}
                    className="px-2 py-3 hover:bg-lf-mist hover:text-lf-orange"
                  >
                    Comment
                    <span className="mt-1 block text-xs font-normal">
                      {post.comments.length} comments
                    </span>
                  </a>
                  <button
                    type="button"
                    className="px-2 py-3 hover:bg-lf-mist hover:text-lf-orange"
                    onClick={() => toggleSave(post.id)}
                  >
                    {post.saved ? "Saved" : "Save"}
                    <span className="mt-1 block text-xs font-normal">
                      Local only
                    </span>
                  </button>
                  <div className="px-2 py-3 text-lf-slate">
                    Share internally
                    <span className="mt-1 block text-xs font-normal">
                      Coming soon
                    </span>
                  </div>
                </div>
                <div id={`comments-${post.id}`} className="border-t border-lf-line p-4">
                  <div className="grid gap-2">
                    {post.comments.map((comment, index) => (
                      <p
                        key={`${post.id}-${index}`}
                        className="rounded-xl bg-lf-mist px-3 py-2 text-sm text-lf-charcoal"
                      >
                        {comment}
                      </p>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <input
                      value={commentDrafts[post.id] ?? ""}
                      onChange={(event) =>
                        setCommentDrafts((current) => ({
                          ...current,
                          [post.id]: event.target.value,
                        }))
                      }
                      placeholder="Add a beta comment"
                      className="min-w-0 flex-1 rounded-lg border border-lf-line px-3 py-2 text-sm outline-none focus:border-lf-orange focus:ring-2 focus:ring-lf-orange/20"
                    />
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => addComment(post.id)}
                      disabled={!commentDrafts[post.id]?.trim()}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </main>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl bg-white p-4 shadow-card">
              <h3 className="font-display text-lg font-semibold text-lf-navy">
                Sponsored lender/vendor placements
              </h3>
              <div className="mt-3 grid gap-3">
                {lenderPromotionNotes.map((note) => (
                  <article
                    key={note.title}
                    className="rounded-xl border border-lf-line bg-lf-mist p-3"
                  >
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-lf-orange">
                      Future approval-based
                    </p>
                    <h4 className="text-sm font-semibold text-lf-navy">
                      {note.title}
                    </h4>
                    <p className="mt-1 text-xs leading-5 text-lf-slate">
                      {note.body}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 shadow-card">
              <h3 className="font-display text-lg font-semibold text-lf-navy">
                What to watch
              </h3>
              <div className="mt-3 grid gap-2">
                {faceGramRightRail.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-lf-line px-3 py-3 text-sm font-semibold text-lf-charcoal"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-lf-navy p-5 text-white shadow-card">
              <h3 className="font-display text-xl font-semibold">
                Marketing Support
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/75">
                Turn a rough internal post into a cleaner draft before sending
                it through the right human review path.
              </p>
              <Link href="/ai-assistants/" className="btn-primary mt-4">
                Open AI Assistants
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
