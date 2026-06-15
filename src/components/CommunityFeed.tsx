"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { CommunityPost } from "@/data/coachingPlatform";
import { currentDayKey, dailyCountFields, todayDays } from "@/data/todaySystem";
import {
  createCommentCloud,
  createPostCloud,
  fetchFeedCloud,
} from "@/lib/coachingCloud";
import { buildSystemPosts, isCurrentWeekly, isTodaysDaily } from "@/lib/systemPosts";
import { getCoachPicks } from "@/data/coachPicks";
import { getSeedPosts } from "@/data/seedPosts";

// Categories members can post under (composer dropdown).
const CATEGORIES = ["Pinned", "Daily", "Weekly", "Wins", "Questions", "Scripts"] as const;
// Filter pills include the coach-curated lane, which members can't post to.
const FILTER_CATEGORIES = ["Pinned", "Daily", "Weekly", "Coach Picks", "Wins", "Questions", "Scripts"] as const;
type Category = (typeof FILTER_CATEGORIES)[number] | "All";

type PollOption = { id: string; label: string; votes: number };
type LocalPost = CommunityPost & {
  pollOptions?: PollOption[];
  pollQuestion?: string;
  images?: string[];
  videoUrl?: string;
  videoFileName?: string;
  youtubeUrl?: string;
  cloudId?: string;
  kind?: string;
  refKey?: string;
  localKey?: string;
};

type Props = {
  posts: CommunityPost[];
  storageKey?: string;
  program?: "mastery" | "alliance";
};

type FeedStore = {
  posts: LocalPost[];
  votes: Record<string, string>;
};

function readFeedStore(storageKey: string): FeedStore | null {
  if (typeof window === "undefined") return null;
  const saved = window.localStorage.getItem(storageKey);
  if (!saved) return null;
  try {
    return JSON.parse(saved) as FeedStore;
  } catch {
    window.localStorage.removeItem(storageKey);
    return null;
  }
}

function youtubeIdFromUrl(rawUrl: string) {
  if (!rawUrl) return null;
  const trimmed = rawUrl.trim();
  const patterns = [
    /youtu\.be\/([\w-]{6,})/i,
    /youtube\.com\/watch\?v=([\w-]{6,})/i,
    /youtube\.com\/embed\/([\w-]{6,})/i,
    /youtube\.com\/shorts\/([\w-]{6,})/i,
  ];
  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Stable, index-independent post identity. The render maps over visiblePosts
// (reordered/filtered) while the mutation handlers map over localPosts — keying
// by array index made those diverge, so comments/replies/votes silently failed
// in any non-raw view. A stable key per post fixes that.
let keySeq = 0;
function freshLocalKey() {
  keySeq += 1;
  return `lk-${Date.now().toString(36)}-${keySeq}`;
}
function withStableKeys(posts: LocalPost[]): LocalPost[] {
  return posts.map((p) =>
    p.cloudId || (p.kind && p.refKey) || p.localKey ? p : { ...p, localKey: freshLocalKey() },
  );
}
function makePostKey(post: LocalPost) {
  if (post.cloudId) return `cloud:${post.cloudId}`;
  if (post.kind && post.refKey) return `sys:${post.kind}:${post.refKey}`;
  if (post.localKey) return `local:${post.localKey}`;
  return `title:${post.title}`;
}

export default function CommunityFeed({
  posts,
  storageKey = "lf-feed-mastery",
  program = "mastery",
}: Props) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [localPosts, setLocalPosts] = useState<LocalPost[]>(() => withStableKeys(posts));
  const [hydrated, setHydrated] = useState(false);
  const [composerOpen, setComposerOpen] = useState(false);
  const [nextAction, setNextAction] = useState<{ day: string; theme: string; entered: number } | null>(null);
  const [composerTitle, setComposerTitle] = useState("");
  const [composerCategory, setComposerCategory] = useState<Exclude<Category, "All">>("Questions");
  const [composerBody, setComposerBody] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [videoFileName, setVideoFileName] = useState<string | null>(null);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);
  const [draftState, setDraftState] = useState("Draft ready");
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [commentDraft, setCommentDraft] = useState<Record<string, string>>({});
  const [replyDraft, setReplyDraft] = useState<Record<string, string>>({});
  const [openReplies, setOpenReplies] = useState<Record<string, boolean>>({});
  const [voteState, setVoteState] = useState<Record<string, string>>({});
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const saved = readFeedStore(storageKey);
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restore browser-only saved state after hydration to avoid SSR/client mismatches.
      setLocalPosts(
        withStableKeys([
          ...buildSystemPosts(program),
          ...getCoachPicks(program),
          ...getSeedPosts(program),
          ...saved.posts.filter((p) => !(p as LocalPost).kind || (p as LocalPost).kind === "member"),
        ]),
      );
      setVoteState(saved.votes);
    } else {
      setLocalPosts((current) =>
        withStableKeys([
          ...buildSystemPosts(program),
          ...getCoachPicks(program),
          ...getSeedPosts(program),
          ...current,
        ]),
      );
    }
    // Supabase is the primary feed when configured and signed in.
    fetchFeedCloud(program).then((cloud) => {
      if (!cloud) return;
      const cloudPosts: LocalPost[] = cloud.map((post) => ({
        author: post.author,
        role: post.role,
        category: post.category,
        title: post.title,
        body: post.body,
        comments: post.comments,
        pinned: post.pinned,
        youtubeUrl: post.youtubeUrl,
        cloudId: post.id,
        kind: post.kind,
        refKey: post.refKey,
      }));
      setLocalPosts((current) =>
        withStableKeys([
          ...cloudPosts,
          // Coach Picks and Q&A/Scripts seeds are curated client-side data, not
          // cloud rows — keep them when the cloud feed loads.
          ...current.filter(
            (p) =>
              p.kind === "pick" ||
              p.kind === "qa" ||
              p.kind === "script-tip" ||
              (p.pinned && !p.cloudId && !p.kind),
          ),
        ]),
      );
    });
    // Next-action strip: what should I do right now?
    try {
      const todayStore = JSON.parse(
        window.localStorage.getItem(`lf-today-${program}`) ?? "{}",
      ) as { entries?: Record<string, Record<string, string>> };
      const key = currentDayKey();
      const day = todayDays.find((d) => d.key === key);
      if (day) {
        const entries = todayStore.entries?.[key] ?? {};
        const entered =
          key === "weekend"
            ? 0
            : dailyCountFields.filter((f) => (entries[f] ?? "").trim() !== "").length;
        setNextAction({ day: day.day, theme: day.theme, entered });
      }
    } catch {
      // strip is optional
    }
    setHydrated(true);
  }, [storageKey, program]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({ posts: localPosts, votes: voteState }),
      );
    } catch {
      // Media-heavy posts can exceed the local storage quota; keep the feed working in memory.
    }
  }, [hydrated, localPosts, storageKey, voteState]);


  const visiblePosts = useMemo(() => {
    const isSystem = (p: LocalPost) =>
      p.kind === "start" || p.kind === "daily" || p.kind === "weekly" || p.kind === "pick";
    if (activeCategory === "Coach Picks") {
      return localPosts.filter((p) => p.kind === "pick");
    }
    if (activeCategory === "Daily") {
      const order = ["monday", "tuesday", "wednesday", "thursday", "friday", "weekend"];
      return localPosts
        .filter((p) => p.kind === "daily")
        .sort((a, b) => order.indexOf(a.refKey ?? "") - order.indexOf(b.refKey ?? ""));
    }
    if (activeCategory === "Weekly") {
      return localPosts
        .filter((p) => p.kind === "weekly")
        .sort((a, b) => Number((a.refKey ?? "w0").slice(1)) - Number((b.refKey ?? "w0").slice(1)));
    }
    if (activeCategory === "Pinned") {
      return localPosts.filter(
        (p) =>
          p.kind === "start" ||
          (p.pinned && !isSystem(p)) ||
          (p.kind === "daily" && isTodaysDaily(p.refKey ?? "")) ||
          (p.kind === "weekly" && isCurrentWeekly(p.refKey ?? "")),
      );
    }
    if (activeCategory === "All") {
      // Coaching hub order: Start Here, today's coach video, this week's
      // coaching post, pinned coach posts, Coach Picks, then member posts.
      const startHere = localPosts.filter((p) => p.kind === "start");
      const todaysDaily = localPosts.filter(
        (p) => p.kind === "daily" && isTodaysDaily(p.refKey ?? ""),
      );
      const currentWeekly = localPosts.filter(
        (p) => p.kind === "weekly" && isCurrentWeekly(p.refKey ?? ""),
      );
      const pinnedMember = localPosts.filter((p) => p.pinned && !isSystem(p));
      const picks = localPosts.filter((p) => p.kind === "pick");
      // Q&A and Scripts seeds live under their filter pills, not in All —
      // keeps the main feed focused on coaching posts and member activity.
      const members = localPosts.filter(
        (p) => !p.pinned && !isSystem(p) && p.kind !== "qa" && p.kind !== "script-tip",
      );
      return [...startHere, ...todaysDaily, ...currentWeekly, ...pinnedMember, ...picks, ...members];
    }
    return localPosts.filter((post) => post.category === activeCategory && !isSystem(post));
  }, [localPosts, activeCategory]);

  function addPost() {
    const body = composerBody.trim();
    if (!body) {
      return;
    }
    const title = composerTitle.trim() || body.split("\n")[0].slice(0, 80) || "Member update";
    const newPost: LocalPost = {
      author: "You",
      role: "Member",
      category: composerCategory,
      title,
      body,
      comments: [],
      youtubeUrl: youtubeUrl.trim() || undefined,
      images: imagePreviews.length > 0 ? imagePreviews : undefined,
      videoUrl: videoPreview ?? undefined,
      videoFileName: videoFileName ?? undefined,
      pollQuestion: pollQuestion.trim() || undefined,
      pollOptions:
        pollQuestion.trim() && pollOptions.some((opt) => opt.trim())
          ? pollOptions
              .filter((opt) => opt.trim())
              .map((opt, i) => ({ id: `${Date.now()}-${i}`, label: opt.trim(), votes: 0 }))
          : undefined,
    };
    newPost.localKey = freshLocalKey();
    setLocalPosts((current) => [newPost, ...current]);
    createPostCloud(program, {
      category: newPost.category,
      title: newPost.title,
      body: newPost.body,
      youtubeUrl: newPost.youtubeUrl,
    }).then((cloudId) => {
      if (!cloudId) return;
      setDraftState("Posted · synced");
      setLocalPosts((current) =>
        current.map((p) => (p === newPost ? { ...p, cloudId } : p)),
      );
    });
    setComposerTitle("");
    setComposerBody("");
    setYoutubeUrl("");
    setImagePreviews([]);
    setVideoPreview(null);
    setVideoFileName(null);
    setPollQuestion("");
    setPollOptions(["", ""]);
    setDraftState("Posted locally");
    setComposerOpen(false);
  }

  function addComment(postKey: string) {
    const draft = (commentDraft[postKey] ?? "").trim();
    if (!draft) return;
    setLocalPosts((current) =>
      current.map((post) => {
        if (makePostKey(post) !== postKey) return post;
        if (post.cloudId) createCommentCloud(post.cloudId, draft);
        return { ...post, comments: [...post.comments, `You: ${draft}`] };
      }),
    );
    setCommentDraft((current) => ({ ...current, [postKey]: "" }));
  }

  function addReply(postKey: string, parentComment: string) {
    const draft = (replyDraft[`${postKey}|${parentComment}`] ?? "").trim();
    if (!draft) return;
    setLocalPosts((current) =>
      current.map((post) => {
        if (makePostKey(post) !== postKey) return post;
        if (post.cloudId) createCommentCloud(post.cloudId, `↳ ${parentComment}: ${draft}`);
        return {
          ...post,
          comments: [...post.comments, `You ↳ ${parentComment}: ${draft}`],
        };
      }),
    );
    setReplyDraft((current) => ({ ...current, [`${postKey}|${parentComment}`]: "" }));
  }

  function vote(postKey: string, optionId: string) {
    setVoteState((current) => ({ ...current, [postKey]: optionId }));
    setLocalPosts((current) =>
      current.map((post) => {
        if (makePostKey(post) !== postKey) return post;
        if (!post.pollOptions) return post;
        return {
          ...post,
          pollOptions: post.pollOptions.map((opt) =>
            opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt,
          ),
        };
      }),
    );
  }

  async function handleImageFiles(files: FileList | null) {
    if (!files) return;
    const next: string[] = [];
    for (const file of Array.from(files)) {
      if (file.size > 4 * 1024 * 1024) {
        setDraftState("Image too large (max 4MB)");
        continue;
      }
      const dataUrl = await readFileAsDataURL(file);
      next.push(dataUrl);
    }
    setImagePreviews((current) => [...current, ...next]);
    setDraftState("Image attached");
  }

  async function handleVideoFile(file: File | null) {
    if (!file) return;
    if (file.size > 25 * 1024 * 1024) {
      setDraftState("Video too large (max 25MB)");
      return;
    }
    const dataUrl = await readFileAsDataURL(file);
    setVideoPreview(dataUrl);
    setVideoFileName(file.name);
    setDraftState("Video attached");
  }

  const youtubeId = youtubeIdFromUrl(youtubeUrl);
  const totalMembers = new Set(localPosts.map((p) => p.author)).size;
  const pinnedCount = localPosts.filter((p) => p.pinned).length;

  const memberBase = program === "alliance" ? "/member-area/alliance-" : "/member-area/";
  const todayHref = program === "alliance" ? "/member-area/alliance-today/" : "/member-area/today/";
  const scorecardHref = `${memberBase}scorecard${program === "alliance" ? "" : "s"}/`;

  return (
    <div className="grid gap-4">
      {nextAction && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-lf-orange/40 bg-lf-orangeSoft/40 px-4 py-3">
          <p className="text-sm font-semibold text-lf-navy">
            {nextAction.day}: {nextAction.theme}
            {nextAction.day !== "Weekend" &&
              ` · ${nextAction.entered}/${dailyCountFields.length} numbers entered`}
            {" · "}
            <span className="font-normal text-lf-slate">Scorecard due Friday</span>
          </p>
          <div className="flex gap-2">
            <Link href={todayHref} className="btn-primary">
              Open Today
            </Link>
            <Link href={scorecardHref} className="btn-secondary">
              Scorecard
            </Link>
          </div>
        </div>
      )}

      {!composerOpen && (
        <div className="flex items-center justify-between rounded-2xl border border-lf-line bg-white px-4 py-3 shadow-card">
          <p className="text-sm text-lf-slate">Share a win, question, or update with the community.</p>
          <button type="button" onClick={() => setComposerOpen(true)} className="btn-primary">
            New post
          </button>
        </div>
      )}

      {composerOpen && (
        <div className="rounded-2xl border border-lf-line bg-white shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-lf-line p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                Community feed
              </p>
              <h2 className="h-display mt-1 text-2xl">Start a new post</h2>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold text-lf-slate">{draftState}</p>
              <button
                type="button"
                onClick={() => setComposerOpen(false)}
                className="inline-flex items-center rounded-lg border border-lf-line bg-white px-3 py-1.5 text-xs font-semibold text-lf-navy transition hover:border-lf-navy hover:bg-lf-mist"
              >
                Close
              </button>
            </div>
          </div>
          <div className="grid gap-4 p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-lf-navy">
                Post title
                <input
                  value={composerTitle}
                  onChange={(event) => {
                    setComposerTitle(event.target.value);
                    setDraftState("Draft saved locally");
                  }}
                  placeholder="Short, specific, useful"
                  className="h-11 rounded-lg border border-lf-line px-3 text-sm font-normal text-lf-charcoal outline-none focus:border-lf-orange"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-lf-navy">
                Category
                <select
                  value={composerCategory}
                  onChange={(event) => {
                    setComposerCategory(event.target.value as Exclude<Category, "All">);
                    setDraftState("Draft saved locally");
                  }}
                  className="h-11 rounded-lg border border-lf-line px-3 text-sm font-normal text-lf-charcoal outline-none focus:border-lf-orange"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label className="grid gap-2 text-sm font-semibold text-lf-navy">
              Description
              <textarea
                value={composerBody}
                onChange={(event) => {
                  setComposerBody(event.target.value);
                  setDraftState("Draft saved locally");
                }}
                placeholder="Write the coaching conversation you want help with..."
                className="min-h-28 rounded-xl border border-lf-line p-3 text-sm font-normal text-lf-charcoal outline-none focus:border-lf-orange"
              />
            </label>

            <div className="grid gap-3 md:grid-cols-3">
              <label className="grid gap-2 text-sm font-semibold text-lf-navy">
                YouTube link
                <input
                  value={youtubeUrl}
                  onChange={(event) => {
                    setYoutubeUrl(event.target.value);
                    setDraftState("Draft saved locally");
                  }}
                  placeholder="Paste a YouTube URL"
                  className="h-11 rounded-lg border border-lf-line px-3 text-sm font-normal text-lf-charcoal outline-none focus:border-lf-orange"
                />
              </label>
              <div className="grid gap-2 text-sm font-semibold text-lf-navy">
                Image upload
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) => handleImageFiles(event.target.files)}
                  className="block w-full text-sm text-lf-charcoal file:mr-3 file:rounded-lg file:border-0 file:bg-lf-orange file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-lf-orangeDark"
                />
              </div>
              <div className="grid gap-2 text-sm font-semibold text-lf-navy">
                Video upload
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={(event) => handleVideoFile(event.target.files?.[0] ?? null)}
                  className="block w-full text-sm text-lf-charcoal file:mr-3 file:rounded-lg file:border-0 file:bg-lf-orange file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-lf-orangeDark"
                />
              </div>
            </div>

            <div className="grid gap-3 rounded-xl border border-lf-line bg-lf-mist p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                Poll (optional)
              </p>
              <label className="grid gap-2 text-sm font-semibold text-lf-navy">
                Question
                <input
                  value={pollQuestion}
                  onChange={(event) => {
                    setPollQuestion(event.target.value);
                    setDraftState("Draft saved locally");
                  }}
                  placeholder="What is the poll question?"
                  className="h-11 rounded-lg border border-lf-line bg-white px-3 text-sm font-normal text-lf-charcoal outline-none focus:border-lf-orange"
                />
              </label>
              <div className="grid gap-2 md:grid-cols-2">
                {pollOptions.map((option, index) => (
                  <input
                    key={index}
                    value={option}
                    onChange={(event) => {
                      const next = [...pollOptions];
                      next[index] = event.target.value;
                      setPollOptions(next);
                      setDraftState("Draft saved locally");
                    }}
                    placeholder={`Option ${index + 1}`}
                    className="h-11 rounded-lg border border-lf-line bg-white px-3 text-sm font-normal text-lf-charcoal outline-none focus:border-lf-orange"
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setPollOptions((current) => [...current, ""])}
                  className="btn-secondary"
                >
                  Add option
                </button>
                {pollOptions.length > 2 && (
                  <button
                    type="button"
                    onClick={() => setPollOptions((current) => current.slice(0, -1))}
                    className="btn-secondary"
                  >
                    Remove last
                  </button>
                )}
              </div>
            </div>

            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative overflow-hidden rounded-xl border border-lf-line">
                    <img src={src} alt={`upload preview ${index + 1}`} className="h-32 w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setImagePreviews((current) => current.filter((_, i) => i !== index))}
                      className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs font-semibold text-white"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            {youtubeId && (
              <div className="overflow-hidden rounded-xl border border-lf-line bg-black">
                <div className="aspect-video w-full">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title="YouTube preview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {videoPreview && (
              <div className="overflow-hidden rounded-xl border border-lf-line bg-black">
                <video src={videoPreview} controls className="aspect-video w-full" />
                <p className="px-3 py-2 text-xs text-white/72">{videoFileName}</p>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setComposerTitle("");
                  setComposerBody("");
                  setYoutubeUrl("");
                  setImagePreviews([]);
                  setVideoPreview(null);
                  setVideoFileName(null);
                  setPollQuestion("");
                  setPollOptions(["", ""]);
                  setDraftState("Cleared");
                }}
                className="btn-secondary"
              >
                Clear
              </button>
              <button type="button" onClick={addPost} className="btn-primary">
                Add to feed
              </button>
            </div>
          </div>
        </div>
      )}

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-lf-line bg-white p-4 shadow-card">
          <p className="text-sm font-semibold text-lf-slate">
            {visiblePosts.length} posts · {pinnedCount} pinned · {totalMembers} members posting
          </p>
          <div className="flex flex-wrap gap-2">
            {(["All", ...FILTER_CATEGORIES] as Category[]).map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex items-center rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                    isActive
                      ? "border-lf-orange bg-lf-orange text-white"
                      : "border-lf-line bg-white text-lf-navy hover:border-lf-navy hover:bg-lf-mist"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {visiblePosts.length === 0 && (
          <div className="rounded-2xl border border-dashed border-lf-line bg-white p-8 text-center text-sm text-lf-slate">
            No posts in this category yet. Be the first to share.
          </div>
        )}

        {visiblePosts.map((post) => {
          const key = makePostKey(post);
          const bodyYoutubeId = (() => {
            if (!post.body) return null;
            const lines = post.body.split("\n");
            for (const line of lines) {
              if (line.startsWith("YouTube link:")) {
                return youtubeIdFromUrl(line.replace("YouTube link:", "").trim());
              }
            }
            return null;
          })();
          const heygenUrl =
            post.youtubeUrl && post.youtubeUrl.includes("app.heygen.com/embeds/")
              ? post.youtubeUrl
              : null;
          const ytId = heygenUrl
            ? null
            : ((post.youtubeUrl ? youtubeIdFromUrl(post.youtubeUrl) : null) ??
              (post.videoUrl ? youtubeIdFromUrl(post.videoUrl) : null) ??
              bodyYoutubeId);
          return (
            <article
              key={key}
              className={`rounded-2xl border bg-white shadow-card ${
                post.pinned ? "border-lf-orange" : "border-lf-line"
              }`}
            >
              <div className="flex flex-col gap-3 border-b border-lf-line p-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
                    {post.pinned ? "Pinned coach post" : post.category}
                  </p>
                  <h2 className="h-display mt-2 text-2xl">{post.title}</h2>
                  <p className="mt-1 text-sm font-semibold text-lf-slate">
                    {post.author} · {post.role}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-lf-orange">
                    {post.comments.length} comments
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenComments((current) => ({
                        ...current,
                        [key]: !(current[key] ?? true),
                      }))
                    }
                    className="inline-flex items-center rounded-lg border border-lf-line bg-white px-3 py-1.5 text-xs font-semibold text-lf-navy transition hover:border-lf-navy hover:bg-lf-mist"
                  >
                    {openComments[key] ?? true ? "Hide" : "Show"} comments
                  </button>
                </div>
              </div>

              {post.images && post.images.length > 0 && (
                <div className="grid grid-cols-1 gap-2 border-b border-lf-line p-3 sm:grid-cols-2 lg:grid-cols-3">
                  {post.images.map((src, i) => (
                    <img key={i} src={src} alt={`post image ${i + 1}`} className="max-h-80 w-full rounded-xl object-cover" />
                  ))}
                </div>
              )}

              {heygenUrl && (
                <div className="border-b border-lf-line bg-black">
                  <div className="aspect-video w-full">
                    <iframe
                      className="h-full w-full"
                      src={heygenUrl}
                      title={post.title}
                      loading="lazy"
                      allow="encrypted-media; fullscreen;"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {ytId && (
                <div className="border-b border-lf-line bg-black">
                  <div className="aspect-video w-full">
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube.com/embed/${ytId}`}
                      title={post.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {post.videoUrl && !ytId && (
                <div className="border-b border-lf-line bg-black">
                  <video src={post.videoUrl} controls className="aspect-video w-full" />
                  {post.videoFileName && (
                    <p className="px-3 py-2 text-xs text-white/72">{post.videoFileName}</p>
                  )}
                </div>
              )}

              <div className="p-5">
                <p className="prose-lf whitespace-pre-line text-lf-charcoal">
                  {post.body
                    .split("\n")
                    .filter((line) => !line.startsWith("YouTube link:"))
                    .join("\n")
                    .replace(/\n{3,}/g, "\n\n")
                    .trim()}
                </p>

                {post.pollQuestion && post.pollOptions && (
                  <div className="mt-5 rounded-xl border border-lf-line bg-lf-mist p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-lf-orange">Poll</p>
                    <p className="mt-1 text-base font-semibold text-lf-navy">{post.pollQuestion}</p>
                    <div className="mt-3 grid gap-2">
                      {post.pollOptions.map((option) => {
                        const totalVotes = post.pollOptions!.reduce((sum, opt) => sum + opt.votes, 0);
                        const percent = totalVotes === 0 ? 0 : Math.round((option.votes / totalVotes) * 100);
                        const selected = voteState[key] === option.id;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => vote(key, option.id)}
                            className={`relative overflow-hidden rounded-lg border px-3 py-2 text-left text-sm font-semibold transition ${
                              selected
                                ? "border-lf-orange bg-lf-orangeSoft text-lf-navy"
                                : "border-lf-line bg-white text-lf-navy hover:border-lf-orange"
                            }`}
                          >
                            <span
                              className="absolute inset-y-0 left-0 bg-lf-orange/15"
                              style={{ width: `${percent}%` }}
                            />
                            <span className="relative flex items-center justify-between">
                              <span>{option.label}</span>
                              <span className="text-xs font-bold text-lf-orange">{percent}%</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {openComments[key] !== false && (
                  <div className="mt-5 grid gap-3">
                    {post.comments.length > 0 && (
                      <div className="grid gap-3">
                        {post.comments.map((comment) => {
                          const replyKey = `${key}|${comment}`;
                          return (
                            <div key={comment} className="border-l-2 border-lf-line pl-3">
                              <p className="text-sm text-lf-charcoal">{comment}</p>
                              <div className="mt-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setOpenReplies((current) => ({
                                      ...current,
                                      [replyKey]: !current[replyKey],
                                    }))
                                  }
                                  className="inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold text-lf-orange hover:bg-lf-orangeSoft"
                                >
                                  Reply
                                </button>
                                {openReplies[replyKey] && (
                                  <div className="mt-2 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-end">
                                    <label className="grid gap-1 text-xs font-semibold uppercase tracking-wide text-lf-orange">
                                      Reply
                                      <input
                                        value={replyDraft[replyKey] ?? ""}
                                        onChange={(event) =>
                                          setReplyDraft((current) => ({
                                            ...current,
                                            [replyKey]: event.target.value,
                                          }))
                                        }
                                        placeholder="Short, specific, useful"
                                        className="h-10 rounded-lg border border-lf-line bg-white px-3 text-sm font-normal text-lf-charcoal outline-none focus:border-lf-orange"
                                      />
                                    </label>
                                    <button
                                      type="button"
                                      onClick={() => addReply(key, comment)}
                                      className="btn-secondary"
                                    >
                                      Post reply
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <div className="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-end">
                      <label className="grid gap-1 text-xs font-semibold uppercase tracking-wide text-lf-orange">
                        Add a comment
                        <input
                          value={commentDraft[key] ?? ""}
                          onChange={(event) =>
                            setCommentDraft((current) => ({
                              ...current,
                              [key]: event.target.value,
                            }))
                          }
                          placeholder="Short, specific, useful"
                          className="h-11 rounded-lg border border-lf-line px-3 text-sm font-normal text-lf-charcoal outline-none focus:border-lf-orange"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => addComment(key)}
                        className="btn-secondary"
                      >
                        Post comment
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
    </div>
  );
}
