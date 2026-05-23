"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import type { FaceGramGroup } from "@/data/facegram";
import { faceGramPosts } from "@/data/facegram";

type Props = {
  activeTab: string;
  group: FaceGramGroup;
};

type LocalPost = {
  id: string;
  author: string;
  role: string;
  avatar: string;
  title: string;
  body: string;
  mediaLabel: string;
  comments: string[];
  liked: boolean;
  saved: boolean;
  likes: number;
};

export default function FaceGramGroupTabs({ activeTab, group }: Props) {
  const [draft, setDraft] = useState("");
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [posts, setPosts] = useState<LocalPost[]>(() =>
    faceGramPosts.slice(0, 4).map((post, index) => ({
      id: `${group.slug}-${post.title}`,
      author: post.author,
      role: post.role,
      avatar: post.avatar,
      title: post.title,
      body: post.body,
      mediaLabel: post.mediaLabel,
      comments: ["Useful group example."],
      liked: false,
      saved: false,
      likes: 12 - index * 2,
    })),
  );

  function addPost() {
    const body = draft.trim();
    if (!body) return;

    setPosts((current) => [
      {
        id: `local-${Date.now()}`,
        author: "Loan Factory LO",
        role: activeTab === "discussion" ? "Group discussion" : "Group post",
        avatar: "/team/andre-king.png",
        title: activeTab === "discussion" ? "Discussion question" : "Group update",
        body,
        mediaLabel: activeTab === "discussion" ? "Discussion" : "Feed post",
        comments: [],
        liked: false,
        saved: false,
        likes: 0,
      },
      ...current,
    ]);
    setDraft("");
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

  if (activeTab === "about") {
    return (
      <article className="rounded-2xl bg-white p-5 shadow-card">
        <h2 className="font-display text-2xl font-semibold text-lf-navy">
          About {group.name}
        </h2>
        <p className="mt-3 text-sm leading-6 text-lf-slate">
          {group.description}
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <InfoCard label="Visibility" value={group.visibility} />
          <InfoCard label="Members" value={group.memberCount} />
        </div>
      </article>
    );
  }

  if (activeTab === "rules") {
    return (
      <article className="rounded-2xl bg-white p-5 shadow-card">
        <h2 className="font-display text-2xl font-semibold text-lf-navy">
          Group rules
        </h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-lf-slate">
          {group.rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ol>
      </article>
    );
  }

  if (activeTab === "photos") {
    return (
      <MediaPanel
        title="Group photos"
        items={[
          "Training whiteboard",
          "Team win snapshot",
          "Marketing example",
          "Event recap",
        ]}
      />
    );
  }

  if (activeTab === "files") {
    return (
      <MediaPanel
        title="Group files"
        items={["PDF handouts", "Scripts", "Trackers", "Slide decks"]}
      />
    );
  }

  if (activeTab === "events") {
    return (
      <MediaPanel
        title="Group events"
        items={[
          "Weekly group check-in",
          "Script practice block",
          "Marketing review hour",
          "Office hours recap",
        ]}
      />
    );
  }

  if (activeTab === "live") {
    return (
      <MediaPanel
        title="Live sessions"
        items={[
          "No live session scheduled right now",
          "Next live session will show date, host, and replay path here",
        ]}
      />
    );
  }

  if (activeTab === "videos") {
    return (
      <MediaPanel
        title="Group videos"
        items={[
          "Training replay",
          "Coach recap",
          "Marketing example",
          "Short lesson clip",
        ]}
      />
    );
  }

  return (
    <>
      <article className="rounded-2xl bg-white p-4 shadow-card">
        <div className="flex gap-3">
          <div className="h-11 w-11 rounded-full bg-lf-orange" aria-hidden />
          <textarea
            rows={2}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={
              activeTab === "discussion"
                ? `Ask ${group.name} a question`
                : `Share a useful update with ${group.name}`
            }
            className="min-h-12 flex-1 resize-none rounded-2xl border border-lf-line bg-[#f0f2f5] px-4 py-3 text-sm outline-none focus:border-lf-orange focus:ring-2 focus:ring-lf-orange/20"
          />
        </div>
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            className="btn-primary"
            onClick={addPost}
            disabled={!draft.trim()}
          >
            {activeTab === "discussion" ? "Post discussion" : "Post to group"}
          </button>
        </div>
        <p className="mt-4 border-t border-lf-line pt-3 text-xs text-lf-slate">
          Group posts save locally in this browser for beta review. Public
          sharing and external publishing stay off.
        </p>
      </article>

      {posts.map((post) => (
        <article key={post.id} className="rounded-2xl bg-white p-5 shadow-card">
          <div className="flex items-start gap-3">
            <img
              src={post.avatar}
              alt={post.author}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-display text-base font-semibold text-lf-navy">
                {post.author}
              </h3>
              <p className="text-xs text-lf-slate">{post.role}</p>
            </div>
          </div>
          <h4 className="mt-4 text-lg font-semibold text-lf-navy">
            {post.title}
          </h4>
          <p className="mt-2 text-sm leading-6 text-lf-charcoal">{post.body}</p>
          <div className="mt-4 rounded-xl bg-lf-mist p-4 text-sm font-semibold text-lf-charcoal">
            {post.mediaLabel}
          </div>
          <div className="mt-4 grid grid-cols-3 border-y border-lf-line text-center text-sm font-semibold text-lf-slate">
            <button
              type="button"
              className="px-2 py-3 hover:bg-lf-mist hover:text-lf-orange"
              onClick={() => toggleLike(post.id)}
            >
              {post.liked ? "Liked" : "Like"}
              <span className="block text-xs font-normal">
                {post.likes} reactions
              </span>
            </button>
            <button
              type="button"
              className="px-2 py-3 hover:bg-lf-mist hover:text-lf-orange"
              onClick={() =>
                document.getElementById(`group-comment-${post.id}`)?.focus()
              }
            >
              Comment
              <span className="block text-xs font-normal">
                {post.comments.length} comments
              </span>
            </button>
            <button
              type="button"
              className="px-2 py-3 hover:bg-lf-mist hover:text-lf-orange"
              onClick={() => toggleSave(post.id)}
            >
              {post.saved ? "Saved" : "Save"}
              <span className="block text-xs font-normal">Local</span>
            </button>
          </div>
          <div className="mt-4 grid gap-2">
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
              id={`group-comment-${post.id}`}
              value={commentDrafts[post.id] ?? ""}
              onChange={(event) =>
                setCommentDrafts((current) => ({
                  ...current,
                  [post.id]: event.target.value,
                }))
              }
              placeholder="Add a group comment"
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
        </article>
      ))}
    </>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-lf-line bg-lf-mist p-4 text-sm text-lf-charcoal">
      <span className="block text-xs font-semibold uppercase tracking-wide text-lf-orange">
        {label}
      </span>
      <span className="mt-1 block font-semibold">{value}</span>
    </div>
  );
}

function MediaPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-2xl bg-white p-5 shadow-card">
      <h2 className="font-display text-2xl font-semibold text-lf-navy">
        {title}
      </h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-xl border border-lf-line bg-lf-mist p-4 text-sm font-semibold text-lf-charcoal"
          >
            {item}
          </div>
        ))}
      </div>
    </article>
  );
}
