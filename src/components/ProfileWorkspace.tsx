"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { todayDays } from "@/data/todaySystem";
import type { ProgramKey } from "@/data/coachingPlatform";
import {
  fetchCoachFeedbackCloud,
  getCloudUser,
  loadMemberProfileCloud,
  saveMemberProfileCloud,
} from "@/lib/coachingCloud";

type ProfileStore = {
  name: string;
  email: string;
  focus: string;
  weeklyGoal: string;
};

const EMPTY_PROFILE: ProfileStore = { name: "", email: "", focus: "", weeklyGoal: "" };

const SCORECARD_KEY: Record<ProgramKey, string> = {
  mastery: "lf-scorecard-lo-mastery-weekly-scorecard",
  alliance: "lf-scorecard-loan-factory-alliance-weekly-scorecard",
};

function readJson<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

type Snapshot = {
  scorecardStatus: string;
  submissions: string[];
  todayDone: string[];
  classroomWeek: number;
  classroomSteps: number;
};

export default function ProfileWorkspace({
  program,
  programLabel,
}: {
  program: ProgramKey;
  programLabel: string;
}) {
  const profileKey = `lf-profile-${program}`;
  const [profile, setProfile] = useState<ProfileStore>(EMPTY_PROFILE);
  const [snapshot, setSnapshot] = useState<Snapshot>({
    scorecardStatus: "Not started",
    submissions: [],
    todayDone: [],
    classroomWeek: 1,
    classroomSteps: 0,
  });
  const [hydrated, setHydrated] = useState(false);
  const [saveState, setSaveState] = useState("Saved locally");
  const [cloudIdentity, setCloudIdentity] = useState<{ name: string; email: string } | null>(null);
  const [coachFeedback, setCoachFeedback] = useState<
    { feedback: string; nextAction: string; createdAt: string }[]
  >([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restore browser-only saved state after hydration to avoid SSR/client mismatches.
    setProfile(readJson<ProfileStore>(profileKey) ?? EMPTY_PROFILE);

    const scorecard = readJson<{ status?: string; history?: string[] }>(
      SCORECARD_KEY[program],
    );
    const todayStore = readJson<{ status?: Record<string, string> }>(
      `lf-today-${program}`,
    );
    const classroom = readJson<Record<number, boolean[]>>(
      `lf-classroom-${program}-progress`,
    );

    const todayDone = todayDays
      .filter((day) => {
        const status = todayStore?.status?.[day.key] ?? "";
        return status.startsWith("Saved") || status.startsWith("Submitted");
      })
      .map((day) => `${day.day}: ${todayStore?.status?.[day.key]}`);

    const classroomWeeks = Object.entries(classroom ?? {})
      .filter(([, steps]) => steps.some(Boolean))
      .map(([week]) => Number(week));

    setSnapshot({
      scorecardStatus: scorecard?.status ?? "Not started",
      submissions: scorecard?.history ?? [],
      todayDone,
      classroomWeek: classroomWeeks.length > 0 ? Math.max(...classroomWeeks) : 1,
      classroomSteps: Object.values(classroom ?? {})
        .flat()
        .filter(Boolean).length,
    });
    setHydrated(true);
    // Supabase first: identity from the Google session, profile fields and
    // coach feedback from member_profiles / coach_feedback.
    getCloudUser().then((user) => {
      if (!user) return;
      setCloudIdentity({ name: user.name, email: user.email });
      setProfile((current) => ({
        ...current,
        name: current.name || user.name,
        email: user.email || current.email,
      }));
    });
    loadMemberProfileCloud().then((cloud) => {
      if (!cloud) return;
      setProfile((current) => ({
        ...current,
        name: cloud.displayName || current.name,
        focus: cloud.currentFocus || current.focus,
        weeklyGoal: cloud.weeklyGoal || current.weeklyGoal,
      }));
      setSaveState("Synced with your account");
    });
    fetchCoachFeedbackCloud().then((feedback) => {
      if (feedback) setCoachFeedback(feedback);
    });
  }, [profileKey, program]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(profileKey, JSON.stringify(profile));
  }, [hydrated, profile, profileKey]);

  function update(field: keyof ProfileStore, value: string) {
    setProfile((current) => {
      const next = { ...current, [field]: value };
      saveMemberProfileCloud({
        program,
        displayName: next.name,
        currentFocus: next.focus,
        weeklyGoal: next.weeklyGoal,
      }).then((ok) => setSaveState(ok ? "Synced with your account" : "Saved locally"));
      return next;
    });
    setSaveState("Saved locally");
  }

  const facts: [string, string][] = [
    ["Program", programLabel],
    ["Current classroom week", `Week ${snapshot.classroomWeek}`],
    ["Coach", "Jeremy McDonald"],
    ["Scorecard status", snapshot.scorecardStatus],
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <section className="rounded-2xl border border-lf-line bg-white shadow-card">
        <div className="border-b border-lf-line px-5 py-4">
          <h2 className="h-display text-xl">Member profile</h2>
          <p className="mt-1 text-sm text-lf-slate">{saveState}</p>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-2">
          <label className="grid gap-1 text-xs font-semibold uppercase tracking-wide text-lf-slate">
            Name
            <input
              value={profile.name}
              onChange={(event) => update("name", event.target.value)}
              className="h-10 rounded-lg border border-lf-line px-3 text-sm font-normal normal-case tracking-normal text-lf-charcoal outline-none focus:border-lf-orange"
            />
          </label>
          <label className="grid gap-1 text-xs font-semibold uppercase tracking-wide text-lf-slate">
            Email
            <input
              type="email"
              value={profile.email}
              readOnly={Boolean(cloudIdentity)}
              onChange={(event) => update("email", event.target.value)}
              className={`h-10 rounded-lg border border-lf-line px-3 text-sm font-normal normal-case tracking-normal text-lf-charcoal outline-none focus:border-lf-orange ${
                cloudIdentity ? "bg-lf-mist" : ""
              }`}
            />
          </label>
          <label className="grid gap-1 text-xs font-semibold uppercase tracking-wide text-lf-slate sm:col-span-2">
            Current focus
            <input
              value={profile.focus}
              onChange={(event) => update("focus", event.target.value)}
              placeholder="The one thing coaching is holding you to right now"
              className="h-10 rounded-lg border border-lf-line px-3 text-sm font-normal normal-case tracking-normal text-lf-charcoal outline-none focus:border-lf-orange"
            />
          </label>
          <label className="grid gap-1 text-xs font-semibold uppercase tracking-wide text-lf-slate sm:col-span-2">
            Weekly goal
            <input
              value={profile.weeklyGoal}
              onChange={(event) => update("weeklyGoal", event.target.value)}
              placeholder="The number you are committing to this week"
              className="h-10 rounded-lg border border-lf-line px-3 text-sm font-normal normal-case tracking-normal text-lf-charcoal outline-none focus:border-lf-orange"
            />
          </label>
        </div>
        <dl className="grid gap-3 border-t border-lf-line p-5 sm:grid-cols-2">
          {facts.map(([label, value]) => (
            <div key={label} className="border-l-2 border-lf-orange pl-3">
              <dt className="text-xs font-semibold uppercase tracking-wide text-lf-slate">
                {label}
              </dt>
              <dd className="mt-0.5 text-sm font-bold text-lf-navy">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="grid content-start gap-6">
        <section className="rounded-2xl border border-lf-line bg-white shadow-card">
          <div className="border-b border-lf-line px-5 py-4">
            <h2 className="h-display text-xl">Saved progress</h2>
          </div>
          <div className="grid gap-2 p-5 text-sm text-lf-charcoal">
            <p>
              <strong className="text-lf-navy">Today entries completed:</strong>{" "}
              {snapshot.todayDone.length} of {todayDays.length} days
            </p>
            <p>
              <strong className="text-lf-navy">Classroom steps done:</strong>{" "}
              {snapshot.classroomSteps}
            </p>
            {snapshot.todayDone.map((line) => (
              <p key={line} className="border-l-2 border-lf-line pl-3 text-lf-slate">
                {line}
              </p>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-lf-line bg-white shadow-card">
          <div className="border-b border-lf-line px-5 py-4">
            <h2 className="h-display text-xl">Recent submissions</h2>
          </div>
          <div className="grid gap-2 p-5 text-sm">
            {snapshot.submissions.length === 0 && (
              <p className="text-lf-slate">
                No scorecard submissions yet. Submit your first week from the
                scorecard page.
              </p>
            )}
            {snapshot.submissions.map((item) => (
              <p key={item} className="border-l-2 border-lf-orange pl-3 text-lf-charcoal">
                {item}
              </p>
            ))}
          </div>
        </section>

        {coachFeedback.length > 0 && (
          <section className="rounded-2xl border border-lf-line bg-white shadow-card">
            <div className="border-b border-lf-line px-5 py-4">
              <h2 className="h-display text-xl">Coach feedback</h2>
            </div>
            <div className="grid gap-3 p-5 text-sm">
              {coachFeedback.map((item) => (
                <div key={`${item.createdAt}-${item.feedback.slice(0, 20)}`} className="border-l-2 border-lf-orange pl-3">
                  <p className="text-lf-charcoal">{item.feedback}</p>
                  {item.nextAction && (
                    <p className="font-semibold text-lf-navy">Next action: {item.nextAction}</p>
                  )}
                  <p className="text-xs text-lf-slate">{item.createdAt}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="rounded-2xl border border-lf-line bg-white shadow-card">
          <div className="border-b border-lf-line px-5 py-4">
            <h2 className="h-display text-xl">Account access</h2>
          </div>
          <div className="p-5">
            <p className="text-sm text-lf-slate">
              Sign-in uses your approved Loan Factory Google account. Profile
              details and progress save in this browser until the database is
              connected.
            </p>
            <Link
              href="/auth/google/?next=/member-area/"
              prefetch={false}
              className="btn-secondary mt-4"
            >
              Sign in with Google
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
