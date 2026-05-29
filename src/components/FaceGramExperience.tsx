"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  faceGramGroups,
  faceGramPosts,
  faceGramRightRail,
  faceGramShortcuts,
  lenderPromotionNotes,
} from "@/data/facegram";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import {
  getSupabasePublicConfig,
  hasSupabasePublicConfig,
} from "@/lib/supabase/config";

const stories = [
  { label: "Create story", image: "/team/andre-king.png" },
  { label: "Training win", image: "/team/edward-arvizo.png" },
  { label: "Marketing idea", image: "/team/duyen-nguyen.png" },
  { label: "New LO question", image: "/team/kevin-truong.png" },
  { label: "Coach recap", image: "/team/jody-richards.png" },
];

const notifications = [
  "Andre replied to a first-call follow-up thread.",
  "Team Leaders added a new discussion question.",
  "Marketing Support saved a cleaner post draft example.",
];

const messages = [
  "LO Development: bring one follow-up question to office hours.",
  "Marketing Support: draft review examples are ready in AI Assistants.",
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

type ComposerKind = "Text" | "Photo" | "Video" | "Story" | "Reel";

type UtilityPanel = "followers" | "messages" | "notifications" | null;

type DetailModal = {
  title: string;
  body: string;
  actionLabel?: string;
  href?: string;
} | null;

type ComposerModal = {
  kind: "Story" | "Reel";
  title: string;
  helper: string;
} | null;

export default function FaceGramExperience({
  initialApprovedEmail,
  previewMode = false,
}: {
  initialApprovedEmail?: string;
  previewMode?: boolean;
}) {
  const [entered, setEntered] = useState(false);
  const [draftPost, setDraftPost] = useState("");
  const [composerKind, setComposerKind] = useState<ComposerKind>("Text");
  const [fileAccept, setFileAccept] = useState("image/*");
  const [mediaPreviewUrl, setMediaPreviewUrl] = useState<string | null>(null);
  const [mediaName, setMediaName] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [displayName, setDisplayName] = useState("Loan Factory LO");
  const [profileTitle, setProfileTitle] = useState("Loan Officer");
  const [followedAuthors, setFollowedAuthors] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [utilityPanel, setUtilityPanel] = useState<UtilityPanel>(null);
  const [detailModal, setDetailModal] = useState<DetailModal>(null);
  const [composerModal, setComposerModal] = useState<ComposerModal>(null);
  const [modalDraft, setModalDraft] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pendingFileKindRef = useRef<ComposerKind>("Photo");
  const [posts, setPosts] = useState(() =>
    faceGramPosts.map((post, index) => ({
      ...post,
      id: post.title,
      likes: 18 - index * 3,
      comments: ["Helpful internal example."],
      saved: false,
      liked: false,
      mediaUrl: null as string | null,
      composerKind: "Text" as ComposerKind,
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
    authState.status === "approved" ? authState.email : "loan officer";
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredPosts = normalizedSearch
    ? posts.filter((post) =>
        [
          post.author,
          post.role,
          post.group,
          post.title,
          post.body,
          post.mediaLabel,
          ...post.comments,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch),
      )
    : posts;
  const filteredGroups = normalizedSearch
    ? faceGramGroups.filter((group) =>
        [group.name, group.category, group.description]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch),
      )
    : faceGramGroups;
  const savedPosts = posts.filter((post) => post.saved);
  const suggestedAuthors = Array.from(
    new Set(posts.map((post) => post.author)),
  ).slice(0, 6);

  function publishLocalPost(options?: {
    body?: string;
    kind?: ComposerKind;
    mediaUrl?: string | null;
  }) {
    const kind = options?.kind ?? composerKind;
    const body =
      options?.body?.trim() ||
      draftPost.trim() ||
      (mediaName ? `${kind} shared: ${mediaName}` : "");
    const attachedMediaUrl =
      typeof options?.mediaUrl === "string" ? options.mediaUrl : mediaPreviewUrl;

    if (!body && !attachedMediaUrl) return;

    setPosts((current) => [
      {
        id: `local-${Date.now()}`,
        author: displayName,
        role: profileTitle,
        avatar: "/team/andre-king.png",
        group: kind === "Story" || kind === "Reel" ? "FaceGram stories" : "FaceGram",
        time: "Just now",
        title:
          kind === "Text"
            ? "Feed post"
            : kind === "Photo"
              ? "Photo post"
              : kind === "Video"
                ? "Video post"
                : `${kind} share`,
        body,
        mediaLabel:
          kind === "Text"
            ? "Text post"
            : mediaName
              ? mediaName
              : `${kind} draft`,
        mediaUrl: attachedMediaUrl,
        composerKind: kind,
        accent: "orange" as const,
        likes: 0,
        comments: [],
        saved: false,
        liked: false,
      },
      ...current,
    ]);
    setDraftPost("");
    setComposerKind("Text");
    setMediaPreviewUrl(null);
    setMediaName("");
    setEntered(true);
  }

  function openComposerModal(
    kind: "Story" | "Reel",
    title: string,
    helper: string,
  ) {
    if (!canPost) {
      setDetailModal({
        title: "FaceGram access",
        body: "Sign in with approved Loan Factory access to post, comment, save, and share internal training ideas.",
        actionLabel: "Go to login",
        href: "/login/",
      });
      return;
    }

    setComposerKind(kind);
    setModalDraft(helper);
    setComposerModal({ kind, title, helper });
    setEntered(true);
  }

  function startMediaPost(kind: ComposerKind) {
    if (kind === "Story") {
      openComposerModal("Story", "Create a FaceGram story", "Story idea: ");
      return;
    }

    if (kind === "Reel") {
      openComposerModal("Reel", "Create a FaceGram reel", "Reel idea: ");
      return;
    }

    setComposerKind(kind);

    if (kind === "Photo" || kind === "Video") {
      pendingFileKindRef.current = kind;
      const accept = kind === "Photo" ? "image/*" : "video/*";
      setFileAccept(accept);
      if (fileInputRef.current) {
        fileInputRef.current.accept = accept;
      }
      fileInputRef.current?.click();
      return;
    }

    setDraftPost((current) => (current.trim() ? current : ""));
  }

  function handleMediaFile(file: File | undefined) {
    if (!file) return;
    if (mediaPreviewUrl) URL.revokeObjectURL(mediaPreviewUrl);
    const kind = pendingFileKindRef.current;
    setComposerKind(kind);
    setMediaPreviewUrl(URL.createObjectURL(file));
    setMediaName(file.name);
    setDraftPost((current) => {
      const trimmed = current.trim();
      const defaultMediaDraft =
        trimmed === "Photo post:" || trimmed === "Video post:";
      return trimmed && !defaultMediaDraft ? current : `${kind} post: `;
    });
  }

  function toggleFollow(author: string) {
    setFollowedAuthors((current) =>
      current.includes(author)
        ? current.filter((item) => item !== author)
        : [...current, author],
    );
  }

  function focusComment(id: string) {
    document.getElementById(`comment-input-${id}`)?.focus();
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

  function openRightRailItem(item: (typeof faceGramRightRail)[number]) {
    if (item.title === "New groups") {
      setDetailModal({
        title: item.title,
        body: item.body,
        actionLabel: "Open groups",
        href: "/facegram/groups/",
      });
      return;
    }

    if (item.title === "Saved posts") {
      setDetailModal({
        title: "Saved posts",
        body:
          savedPosts.length > 0
            ? `You have ${savedPosts.length} saved post${savedPosts.length === 1 ? "" : "s"} in this browser session.`
            : "Save useful FaceGram posts from the feed and they will appear here during this session.",
        actionLabel: "Review feed",
      });
      return;
    }

    setDetailModal({
      title: item.title,
      body: item.body,
      actionLabel: item.action,
    });
  }

  return (
    <>
      <section id="facegram-feed" className="bg-[#f0f2f5] pb-8">
        <div className="border-b border-lf-line/70 bg-[#f0f2f5]">
          <div className="mx-auto grid max-w-[1500px] gap-3 px-4 py-3 sm:px-6 lg:grid-cols-[260px_minmax(280px,1fr)_auto] lg:items-center">
            <Link
              href="/facegram/"
              className="inline-flex items-center gap-3 text-lf-navy"
              aria-label="FaceGram home"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-lf-orange text-sm font-black text-white">
                FG
              </span>
              <span className="metal-title text-3xl leading-none">FaceGram</span>
            </Link>

            <label className="flex min-w-0 items-center gap-3 rounded-full border border-lf-line bg-white px-4 py-2 shadow-sm">
              <span className="text-sm font-black text-lf-orange" aria-hidden>
                S
              </span>
              <span className="sr-only">Search FaceGram</span>
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search posts, groups, people, and training topics"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none"
              />
            </label>

            <nav
              className="flex gap-2 overflow-x-auto pb-1 lg:justify-end lg:pb-0"
              aria-label="FaceGram tools"
            >
              <FaceGramUtilityLink label="Home" icon="H" href="/facegram/" />
              <FaceGramUtilityButton
                label="Reels"
                icon="R"
                onClick={() =>
                  openComposerModal(
                    "Reel",
                    "Create a FaceGram reel",
                    "Reel idea: ",
                  )
                }
              />
              <FaceGramUtilityLink label="Groups" icon="G" href="/facegram/groups/" />
              <FaceGramUtilityButton
                label="Followers"
                icon="F"
                onClick={() =>
                  setUtilityPanel((current) =>
                    current === "followers" ? null : "followers",
                  )
                }
              />
              <FaceGramUtilityButton
                label="Notifications"
                icon="N"
                count={notifications.length}
                onClick={() =>
                  setUtilityPanel((current) =>
                    current === "notifications" ? null : "notifications",
                  )
                }
              />
              <FaceGramUtilityButton
                label="Messages"
                icon="M"
                count={messages.length}
                onClick={() =>
                  setUtilityPanel((current) =>
                    current === "messages" ? null : "messages",
                  )
                }
              />
            </nav>
          </div>
          {utilityPanel && (
            <div className="mx-auto max-w-[1500px] px-4 pb-4 sm:px-6">
              <UtilityPanelCard
                panel={utilityPanel}
                followedAuthors={followedAuthors}
                suggestedAuthors={suggestedAuthors}
                onFollow={toggleFollow}
              />
            </div>
          )}
        </div>

        <div className="grid w-full gap-5 px-4 pt-5 sm:px-6 lg:grid-cols-[300px_minmax(0,1fr)_320px] xl:grid-cols-[320px_minmax(0,1fr)_360px]">
          <aside className="hidden space-y-4 lg:block">
            <div className="rounded-2xl bg-[#f0f2f5] p-2">
              <p className="px-3 text-xs leading-5 text-lf-slate">
                Internal ideas, wins, questions, scripts, videos, and marketing
                examples for Loan Factory people.
              </p>
              <nav className="mt-3 grid gap-1" aria-label="FaceGram shortcuts">
                {faceGramShortcuts.map((shortcut) => (
                  <Link
                    key={shortcut.label}
                    href={shortcut.href}
                    className="rounded-xl px-3 py-2 text-sm font-semibold text-lf-charcoal hover:bg-white hover:text-lf-orange"
                  >
                    {shortcut.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div
              id="profile"
              className="rounded-2xl border border-lf-line/70 bg-[#f0f2f5] p-3"
            >
              <h3 className="font-display text-lg font-semibold text-lf-navy">
                Your FaceGram profile
              </h3>
              <p className="mt-1 text-sm text-lf-slate">
                Set how your name appears in the feed.
              </p>
              <button
                type="button"
                className="btn-secondary mt-4"
                onClick={() => setProfileOpen((current) => !current)}
              >
                {profileOpen ? "Close profile" : "Edit profile"}
              </button>
              {profileOpen && (
                <div className="mt-4 grid gap-3">
                  <input
                    value={displayName}
                    onChange={(event) => setDisplayName(event.target.value)}
                    className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm"
                    aria-label="Display name"
                  />
                  <input
                    value={profileTitle}
                    onChange={(event) => setProfileTitle(event.target.value)}
                    className="rounded-lg border border-lf-line bg-white px-3 py-2 text-sm"
                    aria-label="Title"
                  />
                  <p className="text-xs text-lf-slate">
                    Profile edits update the feed name in this browser.
                  </p>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-lf-line/70 bg-[#f0f2f5] p-3">
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
                {filteredGroups.slice(0, 6).map((group) => (
                  <Link
                    key={group.slug}
                    href={`/facegram/groups/${group.slug}/`}
                    className="rounded-xl border border-lf-line bg-white/75 px-3 py-3 text-sm font-semibold text-lf-charcoal hover:border-lf-orange hover:text-lf-orange"
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
              <div className="rounded-2xl border border-lf-line bg-white/85 p-5 shadow-card">
                <h2 className="font-display text-2xl font-semibold text-lf-navy">
                  Welcome to FaceGram
                </h2>
                <p className="mt-2 text-sm leading-6 text-lf-slate">
                  Share internal wins, ask questions, practice scripts, review
                  examples, and learn from other Loan Factory people.
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
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={fileAccept}
                  className="hidden"
                  onChange={(event) => handleMediaFile(event.target.files?.[0])}
                />
                {(mediaPreviewUrl || composerKind !== "Text") && (
                  <div className="mt-3 rounded-xl border border-lf-line bg-lf-mist p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                      {composerKind} composer
                    </p>
                    {mediaPreviewUrl && composerKind === "Photo" && (
                      <img
                        src={mediaPreviewUrl}
                        alt={mediaName}
                        className="mt-3 max-h-72 w-full rounded-xl object-cover"
                      />
                    )}
                    {mediaPreviewUrl && composerKind === "Video" && (
                      <video
                        src={mediaPreviewUrl}
                        controls
                        className="mt-3 max-h-72 w-full rounded-xl bg-black"
                      />
                    )}
                    {mediaName && (
                      <p className="mt-2 text-xs text-lf-slate">{mediaName}</p>
                    )}
                  </div>
                )}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                    {(["Text", "Photo", "Video", "Story", "Reel"] as ComposerKind[]).map((kind) => (
                      <button
                        key={kind}
                        type="button"
                        className={`rounded-lg border px-3 py-2 text-xs font-semibold ${
                          composerKind === kind
                            ? "border-lf-orange bg-lf-orangeSoft text-lf-orangeDark"
                            : "border-lf-line bg-white text-lf-slate hover:border-lf-orange hover:text-lf-orange"
                        }`}
                        onClick={() => startMediaPost(kind)}
                      >
                        {kind}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => publishLocalPost()}
                    disabled={!draftPost.trim() && !mediaPreviewUrl}
                  >
                    Post
                  </button>
                </div>
                <p className="mt-4 border-t border-lf-line pt-3 text-xs text-lf-slate">
                  FaceGram is internal only. Do not post borrower data or
                  private loan files.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-lf-line bg-white p-5 shadow-card">
                <h2 className="font-display text-xl font-semibold text-lf-navy">
                  Posting requires approved access
                </h2>
                <p className="mt-2 text-sm leading-6 text-lf-slate">
                  Sign in with approved Loan Factory access to post,
                  comment, save, and follow people.
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
                <button
                  key={story.label}
                  type="button"
                  className="relative min-h-36 overflow-hidden rounded-2xl bg-lf-navy text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
                  onClick={() =>
                    openComposerModal(
                      "Story",
                      story.label,
                      story.label === "Create story"
                        ? "Story idea: "
                        : `${story.label}: `,
                    )
                  }
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
                </button>
              ))}
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-card">
              <div className="grid gap-4 md:grid-cols-2">
                <button
                  type="button"
                  className="rounded-xl border border-lf-line bg-lf-mist p-4 text-left transition hover:border-lf-orange hover:bg-white"
                  onClick={() =>
                    openComposerModal(
                      "Reel",
                      "Short training clip",
                      "Reel idea: ",
                    )
                  }
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                    Reels
                  </p>
                  <h3 className="h-display mt-1 text-lg">Short training clips</h3>
                  <p className="mt-2 text-sm leading-6 text-lf-slate">
                    Draft a quick internal clip idea for sales practice,
                    marketing, coaching, or new LO support.
                  </p>
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-lf-line bg-lf-mist p-4 text-left transition hover:border-lf-orange hover:bg-white"
                  onClick={() =>
                    setDetailModal({
                      title: "Training posts",
                      body: "Use events to share class reminders, office-hour notes, group practice sessions, and reviewed lender training ideas.",
                      actionLabel: "Open group events",
                      href: "/facegram/groups/team-leaders/?tab=events",
                    })
                  }
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                    Events
                  </p>
                  <h3 className="h-display mt-1 text-lg">Training posts</h3>
                  <p className="mt-2 text-sm leading-6 text-lf-slate">
                    Find or share reminders for coaching, script practice,
                    office hours, and reviewed training sessions.
                  </p>
                </button>
              </div>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="rounded-2xl bg-white p-5 text-sm text-lf-slate shadow-card">
                No FaceGram posts matched your search. Try a group, person,
                training topic, or script keyword.
              </div>
            ) : (
              filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="rounded-2xl bg-white shadow-card"
                >
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
                          {post.role} - {post.group} - {post.time}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="rounded-lg border border-lf-line bg-white px-3 py-2 text-xs font-semibold text-lf-navy hover:border-lf-orange hover:text-lf-orange"
                        onClick={() => toggleFollow(post.author)}
                      >
                        {followedAuthors.includes(post.author)
                          ? "Following"
                          : "Follow"}
                      </button>
                    </div>
                    <h4 className="mt-4 text-lg font-semibold text-lf-navy">
                      {post.title}
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-lf-charcoal">
                      {post.body}
                    </p>
                  </div>
                  <div
                    className={`bg-gradient-to-br ${accentClasses[post.accent]} p-5 text-white`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                      {post.composerKind === "Text"
                        ? post.mediaLabel
                        : post.composerKind}
                    </p>
                    {post.mediaUrl && post.composerKind === "Photo" && (
                      <img
                        src={post.mediaUrl}
                        alt=""
                        className="mt-4 max-h-96 w-full rounded-xl object-cover"
                      />
                    )}
                    {post.mediaUrl && post.composerKind === "Video" && (
                      <video
                        src={post.mediaUrl}
                        controls
                        className="mt-4 max-h-96 w-full rounded-xl bg-black"
                      />
                    )}
                    {!post.mediaUrl && (
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
                    )}
                  </div>
                  <div className="grid grid-cols-3 border-t border-lf-line text-center text-sm font-semibold text-lf-slate">
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
                    <button
                      type="button"
                      className="px-2 py-3 hover:bg-lf-mist hover:text-lf-orange"
                      onClick={() => focusComment(post.id)}
                    >
                      Comment
                      <span className="mt-1 block text-xs font-normal">
                        {post.comments.length} comments
                      </span>
                    </button>
                    <button
                      type="button"
                      className="px-2 py-3 hover:bg-lf-mist hover:text-lf-orange"
                      onClick={() => toggleSave(post.id)}
                    >
                      {post.saved ? "Saved" : "Save"}
                      <span className="mt-1 block text-xs font-normal">
                        {post.saved ? "Bookmarked" : "For later"}
                      </span>
                    </button>
                  </div>
                  <p className="border-t border-lf-line px-4 py-3 text-xs font-semibold text-lf-slate">
                    Internal sharing only. Review before using any post outside
                    Loan Factory.
                  </p>
                  <div
                    id={`comments-${post.id}`}
                    className="border-t border-lf-line p-4"
                  >
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
                        placeholder="Add a comment"
                        id={`comment-input-${post.id}`}
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
              ))
            )}
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
                    className="rounded-2xl border border-lf-line bg-gradient-to-br from-white to-lf-mist p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-lf-navy text-lg font-black text-lf-orange">
                        {note.accent}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-lf-orange">
                          {note.label}
                        </p>
                        <h4 className="mt-1 text-sm font-semibold text-lf-navy">
                          {note.title}
                        </h4>
                      </div>
                    </div>
                    <p className="mt-3 text-xs leading-5 text-lf-slate">
                      {note.body}
                    </p>
                    <button
                      type="button"
                      className="mt-3 rounded-lg border border-lf-line bg-white px-3 py-2 text-xs font-semibold text-lf-navy hover:border-lf-orange hover:text-lf-orange"
                      onClick={() =>
                        setDetailModal({
                          title: note.title,
                          body: `${note.body} This opens the internal resource summary for review.`,
                          actionLabel: note.cta,
                        })
                      }
                    >
                      {note.cta}
                    </button>
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
                  <button
                    key={item.title}
                    type="button"
                    className="rounded-xl border border-lf-line px-3 py-3 text-left text-sm font-semibold text-lf-charcoal transition hover:border-lf-orange hover:bg-lf-mist hover:text-lf-orange"
                    onClick={() => openRightRailItem(item)}
                  >
                    {item.title}
                    <span className="mt-1 block text-xs font-normal leading-5 text-lf-slate">
                      {item.body}
                    </span>
                  </button>
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

      {composerModal && (
        <ModalShell onClose={() => setComposerModal(null)}>
          <h2 className="font-display text-2xl font-semibold text-lf-navy">
            {composerModal.title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-lf-slate">
            Draft a short internal {composerModal.kind.toLowerCase()} for the
            FaceGram feed. Keep borrower data and private files out.
          </p>
          <textarea
            value={modalDraft}
            onChange={(event) => setModalDraft(event.target.value)}
            rows={5}
            className="mt-4 w-full resize-none rounded-xl border border-lf-line px-4 py-3 text-sm outline-none focus:border-lf-orange focus:ring-2 focus:ring-lf-orange/20"
            aria-label={`${composerModal.kind} draft`}
          />
          <div className="mt-4 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setDraftPost(modalDraft || composerModal.helper);
                setComposerKind(composerModal.kind);
                setComposerModal(null);
              }}
            >
              Add to composer
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                publishLocalPost({
                  body: modalDraft,
                  kind: composerModal.kind,
                  mediaUrl: null,
                });
                setComposerModal(null);
              }}
              disabled={!modalDraft.trim()}
            >
              Post {composerModal.kind}
            </button>
          </div>
        </ModalShell>
      )}

      {detailModal && (
        <ModalShell onClose={() => setDetailModal(null)}>
          <h2 className="font-display text-2xl font-semibold text-lf-navy">
            {detailModal.title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-lf-slate">
            {detailModal.body}
          </p>
          <div className="mt-5 flex justify-end gap-3">
            {detailModal.href && detailModal.actionLabel ? (
              <Link
                href={detailModal.href}
                className="btn-primary"
                onClick={() => setDetailModal(null)}
              >
                {detailModal.actionLabel}
              </Link>
            ) : detailModal.actionLabel ? (
              <button
                type="button"
                className="btn-primary"
                onClick={() => setDetailModal(null)}
              >
                {detailModal.actionLabel}
              </button>
            ) : null}
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setDetailModal(null)}
            >
              Close
            </button>
          </div>
        </ModalShell>
      )}
    </>
  );
}

function FaceGramUtilityLink({
  label,
  icon,
  href,
}: {
  label: string;
  icon: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border border-lf-line bg-white px-3 py-2 text-sm font-semibold text-lf-charcoal shadow-sm hover:border-lf-orange hover:text-lf-orange"
    >
      <span className="grid h-6 w-6 place-items-center rounded-full bg-lf-mist text-[11px] font-black text-lf-orange">
        {icon}
      </span>
      {label}
    </Link>
  );
}

function FaceGramUtilityButton({
  label,
  icon,
  count,
  onClick,
}: {
  label: string;
  icon: string;
  count?: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="relative inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border border-lf-line bg-white px-3 py-2 text-sm font-semibold text-lf-charcoal shadow-sm hover:border-lf-orange hover:text-lf-orange"
      onClick={onClick}
    >
      <span className="grid h-6 w-6 place-items-center rounded-full bg-lf-mist text-[11px] font-black text-lf-orange">
        {icon}
      </span>
      {label}
      {typeof count === "number" && (
        <span className="ml-1 rounded-full bg-lf-orange px-2 py-0.5 text-[11px] font-bold text-white">
          {count}
        </span>
      )}
    </button>
  );
}

function UtilityPanelCard({
  panel,
  followedAuthors,
  suggestedAuthors,
  onFollow,
}: {
  panel: Exclude<UtilityPanel, null>;
  followedAuthors: string[];
  suggestedAuthors: string[];
  onFollow: (author: string) => void;
}) {
  if (panel === "notifications") {
    return (
      <div className="ml-auto max-w-xl rounded-2xl border border-lf-line bg-white p-4 shadow-card">
        <h3 className="font-display text-lg font-semibold text-lf-navy">
          Notifications
        </h3>
        <div className="mt-3 grid gap-2">
          {notifications.map((item) => (
            <p key={item} className="rounded-xl bg-lf-mist px-3 py-2 text-sm text-lf-charcoal">
              {item}
            </p>
          ))}
        </div>
      </div>
    );
  }

  if (panel === "messages") {
    return (
      <div className="ml-auto max-w-xl rounded-2xl border border-lf-line bg-white p-4 shadow-card">
        <h3 className="font-display text-lg font-semibold text-lf-navy">
          Messages
        </h3>
        <div className="mt-3 grid gap-2">
          {messages.map((item) => (
            <p key={item} className="rounded-xl bg-lf-mist px-3 py-2 text-sm text-lf-charcoal">
              {item}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="ml-auto max-w-xl rounded-2xl border border-lf-line bg-white p-4 shadow-card">
      <h3 className="font-display text-lg font-semibold text-lf-navy">
        Followers
      </h3>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {suggestedAuthors.map((author) => (
          <button
            key={author}
            type="button"
            className="rounded-xl border border-lf-line px-3 py-2 text-left text-sm font-semibold text-lf-charcoal hover:border-lf-orange hover:text-lf-orange"
            onClick={() => onFollow(author)}
          >
            {author}
            <span className="block text-xs font-normal text-lf-slate">
              {followedAuthors.includes(author) ? "Following" : "Tap to follow"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ModalShell({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/55 px-4 py-6">
      <div className="w-full max-w-xl rounded-2xl bg-white p-5 shadow-lift">
        <button
          type="button"
          className="ml-auto block rounded-full border border-lf-line px-3 py-1 text-xs font-semibold text-lf-slate hover:border-lf-orange hover:text-lf-orange"
          onClick={onClose}
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
}
