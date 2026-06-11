"use client";

import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import type { ProgramKey } from "@/data/coachingPlatform";
import type { SubmissionRecord } from "@/lib/scorecardSync";

/**
 * Supabase-first data layer for the member OS pipe. Every function degrades
 * to null/false when env vars are missing or the user is signed out — the
 * calling components keep their localStorage fallback so the app stays
 * usable, but production runs on these tables.
 */

export type CloudUser = { id: string; email: string; name: string };

export type CloudFeedPost = {
  id: string;
  author: string;
  role: string;
  category: string;
  title: string;
  body: string;
  youtubeUrl?: string;
  pinned?: boolean;
  comments: string[];
};

export type CloudSubmission = SubmissionRecord & {
  id: string;
  program: string;
  memberName: string;
  memberEmail: string;
  reviewed: boolean;
};

function client() {
  return createBrowserSupabaseClient();
}

/** Monday of the current week as YYYY-MM-DD (the week key for all stores). */
export function weekOfMonday(date: Date = new Date()): string {
  const d = new Date(date);
  const day = (d.getDay() + 6) % 7; // Mon=0 ... Sun=6
  d.setDate(d.getDate() - day);
  return d.toISOString().slice(0, 10);
}

export async function getCloudUser(): Promise<CloudUser | null> {
  const supabase = client();
  if (!supabase) return null;
  try {
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    if (!user) return null;
    return {
      id: user.id,
      email: user.email ?? "",
      name:
        (user.user_metadata?.full_name as string | undefined) ??
        (user.user_metadata?.name as string | undefined) ??
        user.email ??
        "",
    };
  } catch {
    return null;
  }
}

export async function saveTodayCloud(
  program: ProgramKey,
  dayKey: string,
  entries: Record<string, string>,
  status: string,
): Promise<boolean> {
  const supabase = client();
  if (!supabase) return false;
  const user = await getCloudUser();
  if (!user) return false;
  const { error } = await supabase.from("today_entries").upsert(
    {
      user_id: user.id,
      program,
      week_of: weekOfMonday(),
      day_key: dayKey,
      entries,
      status,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,program,week_of,day_key" },
  );
  return !error;
}

export async function loadTodayCloud(
  program: ProgramKey,
): Promise<Record<string, Record<string, string>> | null> {
  const supabase = client();
  if (!supabase) return null;
  const user = await getCloudUser();
  if (!user) return null;
  const { data, error } = await supabase
    .from("today_entries")
    .select("day_key, entries")
    .eq("user_id", user.id)
    .eq("program", program)
    .eq("week_of", weekOfMonday());
  if (error || !data) return null;
  const byDay: Record<string, Record<string, string>> = {};
  data.forEach((row) => {
    byDay[row.day_key as string] = (row.entries ?? {}) as Record<string, string>;
  });
  return byDay;
}

export async function saveScorecardCloud(
  program: ProgramKey,
  values: Record<string, number[]>,
  worked: string,
  stuck: string,
  focus: string,
  status: string,
): Promise<boolean> {
  const supabase = client();
  if (!supabase) return false;
  const user = await getCloudUser();
  if (!user) return false;
  const { error } = await supabase.from("scorecard_entries").upsert(
    {
      user_id: user.id,
      program,
      week_of: weekOfMonday(),
      values,
      worked,
      stuck,
      focus,
      status,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,program,week_of" },
  );
  return !error;
}

export async function loadScorecardCloud(program: ProgramKey): Promise<{
  values: Record<string, number[]>;
  worked: string;
  stuck: string;
  focus: string;
  status: string;
} | null> {
  const supabase = client();
  if (!supabase) return null;
  const user = await getCloudUser();
  if (!user) return null;
  const { data, error } = await supabase
    .from("scorecard_entries")
    .select("values, worked, stuck, focus, status")
    .eq("user_id", user.id)
    .eq("program", program)
    .eq("week_of", weekOfMonday())
    .maybeSingle();
  if (error || !data) return null;
  return {
    values: (data.values ?? {}) as Record<string, number[]>,
    worked: data.worked ?? "",
    stuck: data.stuck ?? "",
    focus: data.focus ?? "",
    status: data.status ?? "draft",
  };
}

export async function submitWeekCloud(
  program: ProgramKey,
  record: SubmissionRecord,
): Promise<boolean> {
  const supabase = client();
  if (!supabase) return false;
  const user = await getCloudUser();
  if (!user) return false;
  const { error } = await supabase.from("submissions").insert({
    user_id: user.id,
    member_name: user.name,
    member_email: user.email,
    program,
    week_of: weekOfMonday(),
    totals: record.totals,
    worked: record.worked,
    stuck: record.stuck,
    focus: record.focus,
  });
  return !error;
}

export async function fetchSubmissionsCloud(): Promise<CloudSubmission[] | null> {
  const supabase = client();
  if (!supabase) return null;
  const user = await getCloudUser();
  if (!user) return null;
  const { data, error } = await supabase
    .from("submissions")
    .select("id, program, member_name, member_email, week_of, totals, worked, stuck, focus, submitted_at, reviewed")
    .order("submitted_at", { ascending: false })
    .limit(50);
  if (error || !data) return null;
  return data.map((row) => ({
    id: row.id as string,
    program: row.program as string,
    memberName: (row.member_name as string) || (row.member_email as string) || "Member",
    memberEmail: row.member_email as string,
    weekOf: row.week_of as string,
    submittedAt: new Date(row.submitted_at as string).toLocaleString(),
    totals: (row.totals ?? {}) as Record<string, number>,
    worked: (row.worked as string) ?? "",
    stuck: (row.stuck as string) ?? "",
    focus: (row.focus as string) ?? "",
    reviewed: Boolean(row.reviewed),
  }));
}

export async function markSubmissionReviewed(id: string): Promise<boolean> {
  const supabase = client();
  if (!supabase) return false;
  const user = await getCloudUser();
  if (!user) return false;
  const { error } = await supabase
    .from("submissions")
    .update({ reviewed: true, reviewed_by: user.id, reviewed_at: new Date().toISOString() })
    .eq("id", id);
  return !error;
}

export type MemberProfileFields = {
  displayName: string;
  currentFocus: string;
  weeklyGoal: string;
  phone: string;
  nmls: string;
  licensedStates: string;
  bio: string;
  referralNotes: string;
  photoUrl: string;
};

export async function loadMemberProfileCloud(): Promise<
  (MemberProfileFields & { program: string | null }) | null
> {
  const supabase = client();
  if (!supabase) return null;
  const user = await getCloudUser();
  if (!user) return null;
  const { data, error } = await supabase
    .from("member_profiles")
    .select(
      "program, display_name, current_focus, weekly_goal, phone, nmls, licensed_states, bio, referral_notes, photo_url",
    )
    .eq("user_id", user.id)
    .maybeSingle();
  if (error) return null;
  return {
    program: (data?.program as string | null) ?? null,
    displayName: (data?.display_name as string) ?? "",
    currentFocus: (data?.current_focus as string) ?? "",
    weeklyGoal: (data?.weekly_goal as string) ?? "",
    phone: (data?.phone as string) ?? "",
    nmls: (data?.nmls as string) ?? "",
    licensedStates: (data?.licensed_states as string) ?? "",
    bio: (data?.bio as string) ?? "",
    referralNotes: (data?.referral_notes as string) ?? "",
    photoUrl: (data?.photo_url as string) ?? "",
  };
}

export async function saveMemberProfileCloud(
  fields: MemberProfileFields & { program: ProgramKey },
): Promise<boolean> {
  const supabase = client();
  if (!supabase) return false;
  const user = await getCloudUser();
  if (!user) return false;
  const { error } = await supabase.from("member_profiles").upsert({
    user_id: user.id,
    program: fields.program,
    display_name: fields.displayName,
    current_focus: fields.currentFocus,
    weekly_goal: fields.weeklyGoal,
    phone: fields.phone,
    nmls: fields.nmls,
    licensed_states: fields.licensedStates,
    bio: fields.bio,
    referral_notes: fields.referralNotes,
    photo_url: fields.photoUrl,
    updated_at: new Date().toISOString(),
  });
  return !error;
}

export async function fetchCoachFeedbackCloud(): Promise<
  { feedback: string; nextAction: string; createdAt: string }[] | null
> {
  const supabase = client();
  if (!supabase) return null;
  const user = await getCloudUser();
  if (!user) return null;
  const { data, error } = await supabase
    .from("coach_feedback")
    .select("feedback, next_action, created_at")
    .eq("member_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);
  if (error || !data) return null;
  return data.map((row) => ({
    feedback: row.feedback as string,
    nextAction: (row.next_action as string) ?? "",
    createdAt: new Date(row.created_at as string).toLocaleDateString(),
  }));
}

export async function fetchFeedCloud(program: ProgramKey): Promise<CloudFeedPost[] | null> {
  const supabase = client();
  if (!supabase) return null;
  const user = await getCloudUser();
  if (!user) return null;
  const { data: posts, error } = await supabase
    .from("feed_posts")
    .select("id, author_name, author_role, category, title, body, youtube_url, pinned, created_at")
    .eq("program", program)
    .order("pinned", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(50);
  if (error || !posts) return null;
  const ids = posts.map((p) => p.id as string);
  let commentsByPost: Record<string, string[]> = {};
  if (ids.length > 0) {
    const { data: comments } = await supabase
      .from("feed_comments")
      .select("post_id, author_name, body, created_at")
      .in("post_id", ids)
      .order("created_at", { ascending: true });
    (comments ?? []).forEach((c) => {
      const key = c.post_id as string;
      commentsByPost[key] = [
        ...(commentsByPost[key] ?? []),
        `${(c.author_name as string) || "Member"}: ${c.body as string}`,
      ];
    });
  }
  return posts.map((p) => ({
    id: p.id as string,
    author: (p.author_name as string) || "Member",
    role: (p.author_role as string) || "Member",
    category: p.category as string,
    title: p.title as string,
    body: (p.body as string) ?? "",
    youtubeUrl: (p.youtube_url as string | null) ?? undefined,
    pinned: Boolean(p.pinned),
    comments: commentsByPost[p.id as string] ?? [],
  }));
}

export async function createPostCloud(
  program: ProgramKey,
  post: { category: string; title: string; body: string; youtubeUrl?: string },
): Promise<string | null> {
  const supabase = client();
  if (!supabase) return null;
  const user = await getCloudUser();
  if (!user) return null;
  const { data, error } = await supabase
    .from("feed_posts")
    .insert({
      user_id: user.id,
      program,
      author_name: user.name,
      author_role: "Member",
      category: post.category,
      title: post.title,
      body: post.body,
      youtube_url: post.youtubeUrl ?? null,
    })
    .select("id")
    .single();
  if (error || !data) return null;
  return data.id as string;
}

export async function createCommentCloud(postId: string, body: string): Promise<boolean> {
  const supabase = client();
  if (!supabase) return false;
  const user = await getCloudUser();
  if (!user) return false;
  const { error } = await supabase.from("feed_comments").insert({
    post_id: postId,
    user_id: user.id,
    author_name: user.name,
    body,
  });
  return !error;
}
