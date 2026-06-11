"use client";

import { useEffect, useState } from "react";
import { todayDays } from "@/data/todaySystem";
import type { ProgramKey } from "@/data/coachingPlatform";
import {
  fetchCoachFeedbackCloud,
  getCloudUser,
  loadMemberProfileCloud,
  saveMemberProfileCloud,
  type MemberProfileFields,
} from "@/lib/coachingCloud";

type ProfileStore = MemberProfileFields & { email: string };

const EMPTY_PROFILE: ProfileStore = {
  displayName: "",
  email: "",
  phone: "",
  nmls: "",
  licensedStates: "",
  bio: "",
  referralNotes: "",
  photoUrl: "",
  currentFocus: "",
  weeklyGoal: "",
};

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

const identityFields: { key: keyof ProfileStore; label: string }[] = [
  { key: "displayName", label: "Name" },
  { key: "phone", label: "Phone" },
  { key: "nmls", label: "NMLS #" },
  { key: "licensedStates", label: "Licensed states" },
];

export default function ProfileWorkspace({
  program,
  programLabel,
}: {
  program: ProgramKey;
  programLabel: string;
}) {
  const profileKey = `lf-profile-${program}`;
  const [profile, setProfile] = useState<ProfileStore>(EMPTY_PROFILE);
  const [submissions, setSubmissions] = useState<string[]>([]);
  const [todayDone, setTodayDone] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [saveState, setSaveState] = useState("Saved locally");
  const [emailLocked, setEmailLocked] = useState(false);
  const [coachFeedback, setCoachFeedback] = useState<
    { feedback: string; nextAction: string; createdAt: string }[]
  >([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restore browser-only saved state after hydration to avoid SSR/client mismatches.
    setProfile({ ...EMPTY_PROFILE, ...(readJson<Partial<ProfileStore>>(profileKey) ?? {}) });

    const scorecard = readJson<{ history?: string[] }>(SCORECARD_KEY[program]);
    const todayStore = readJson<{ status?: Record<string, string> }>(`lf-today-${program}`);
    setSubmissions(scorecard?.history ?? []);
    setTodayDone(
      todayDays
        .filter((day) => {
          const status = todayStore?.status?.[day.key] ?? "";
          return status.startsWith("Saved") || status.startsWith("Submitted");
        })
        .map((day) => `${day.day}: ${todayStore?.status?.[day.key]}`),
    );
    setHydrated(true);

    // Supabase first: identity from the Google session; everything else from
    // member_profiles and coach_feedback.
    getCloudUser().then((user) => {
      if (!user) return;
      setEmailLocked(true);
      setProfile((current) => ({
        ...current,
        displayName: current.displayName || user.name,
        email: user.email || current.email,
      }));
    });
    loadMemberProfileCloud().then((cloud) => {
      if (!cloud) return;
      setProfile((current) => ({
        ...current,
        displayName: cloud.displayName || current.displayName,
        phone: cloud.phone || current.phone,
        nmls: cloud.nmls || current.nmls,
        licensedStates: cloud.licensedStates || current.licensedStates,
        bio: cloud.bio || current.bio,
        referralNotes: cloud.referralNotes || current.referralNotes,
        photoUrl: cloud.photoUrl || current.photoUrl,
        currentFocus: cloud.currentFocus || current.currentFocus,
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
    try {
      window.localStorage.setItem(profileKey, JSON.stringify(profile));
    } catch {
      // photo can exceed quota — cloud copy still saves
    }
  }, [hydrated, profile, profileKey]);

  function persist(next: ProfileStore) {
    saveMemberProfileCloud({ ...next, program }).then((ok) =>
      setSaveState(ok ? "Synced with your account" : "Saved locally"),
    );
  }

  function update(field: keyof ProfileStore, value: string) {
    setProfile((current) => {
      const next = { ...current, [field]: value };
      persist(next);
      return next;
    });
  }

  function handlePhoto(file: File | null) {
    if (!file) return;
    if (file.size > 400 * 1024) {
      setSaveState("Photo too large (max 400KB)");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => update("photoUrl", reader.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <section className="rounded-2xl border border-lf-line bg-white shadow-card">
        <div className="border-b border-lf-line px-5 py-4">
          <h2 className="h-display text-xl">Member profile</h2>
          <p className="mt-1 text-sm text-lf-slate">{saveState}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 border-b border-lf-line p-5">
          {profile.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- member-uploaded data URL
            <img
              src={profile.photoUrl}
              alt="Profile photo"
              className="h-20 w-20 rounded-full border border-lf-line object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-lf-navy text-2xl font-black text-white">
              {(profile.displayName || "LO").slice(0, 1).toUpperCase()}
            </div>
          )}
          <label className="grid gap-1 text-xs font-semibold uppercase tracking-wide text-lf-slate">
            Profile photo
            <input
              type="file"
              accept="image/*"
              onChange={(event) => handlePhoto(event.target.files?.[0] ?? null)}
              className="block text-sm font-normal normal-case tracking-normal text-lf-charcoal file:mr-3 file:rounded-lg file:border-0 file:bg-lf-orange file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-lf-orangeDark"
            />
          </label>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-2">
          {identityFields.map(({ key, label }) => (
            <label
              key={key}
              className="grid gap-1 text-xs font-semibold uppercase tracking-wide text-lf-slate"
            >
              {label}
              <input
                value={profile[key]}
                onChange={(event) => update(key, event.target.value)}
                className="h-10 rounded-lg border border-lf-line px-3 text-sm font-normal normal-case tracking-normal text-lf-charcoal outline-none focus:border-lf-orange"
              />
            </label>
          ))}
          <label className="grid gap-1 text-xs font-semibold uppercase tracking-wide text-lf-slate sm:col-span-2">
            Email
            <input
              type="email"
              value={profile.email}
              readOnly={emailLocked}
              onChange={(event) => update("email", event.target.value)}
              className={`h-10 rounded-lg border border-lf-line px-3 text-sm font-normal normal-case tracking-normal text-lf-charcoal outline-none focus:border-lf-orange ${
                emailLocked ? "bg-lf-mist" : ""
              }`}
            />
          </label>
          <label className="grid gap-1 text-xs font-semibold uppercase tracking-wide text-lf-slate sm:col-span-2">
            Bio / about me
            <textarea
              value={profile.bio}
              onChange={(event) => update("bio", event.target.value)}
              rows={3}
              className="rounded-lg border border-lf-line p-3 text-sm font-normal normal-case tracking-normal text-lf-charcoal outline-none focus:border-lf-orange"
            />
          </label>
          <label className="grid gap-1 text-xs font-semibold uppercase tracking-wide text-lf-slate sm:col-span-2">
            Referral notes
            <textarea
              value={profile.referralNotes}
              onChange={(event) => update("referralNotes", event.target.value)}
              rows={2}
              placeholder="The referral partners, niches, or markets you want sent your way"
              className="rounded-lg border border-lf-line p-3 text-sm font-normal normal-case tracking-normal text-lf-charcoal outline-none focus:border-lf-orange"
            />
          </label>
          <label className="grid gap-1 text-xs font-semibold uppercase tracking-wide text-lf-slate sm:col-span-2">
            Current focus
            <input
              value={profile.currentFocus}
              onChange={(event) => update("currentFocus", event.target.value)}
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
          {[
            ["Program", programLabel],
            ["Coach", "Jeremy McDonald"],
          ].map(([label, value]) => (
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
            <h2 className="h-display text-xl">Recent submissions</h2>
          </div>
          <div className="grid gap-2 p-5 text-sm">
            {submissions.length === 0 && todayDone.length === 0 && (
              <p className="text-lf-slate">
                Nothing submitted yet this week. Start with Today.
              </p>
            )}
            {submissions.map((item) => (
              <p key={item} className="border-l-2 border-lf-orange pl-3 text-lf-charcoal">
                {item}
              </p>
            ))}
            {todayDone.map((line) => (
              <p key={line} className="border-l-2 border-lf-line pl-3 text-lf-slate">
                {line}
              </p>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-lf-line bg-white shadow-card">
          <div className="border-b border-lf-line px-5 py-4">
            <h2 className="h-display text-xl">Latest coach feedback</h2>
          </div>
          <div className="grid gap-3 p-5 text-sm">
            {coachFeedback.length === 0 && (
              <p className="text-lf-slate">
                No coach feedback yet. It lands here after your coach reviews a
                submitted week.
              </p>
            )}
            {coachFeedback.map((item) => (
              <div
                key={`${item.createdAt}-${item.feedback.slice(0, 20)}`}
                className="border-l-2 border-lf-orange pl-3"
              >
                <p className="text-lf-charcoal">{item.feedback}</p>
                {item.nextAction && (
                  <p className="font-semibold text-lf-navy">
                    Next action: {item.nextAction}
                  </p>
                )}
                <p className="text-xs text-lf-slate">{item.createdAt}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
