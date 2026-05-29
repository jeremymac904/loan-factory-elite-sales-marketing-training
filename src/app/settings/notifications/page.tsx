"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "lf_notification_prefs";
const CHANGE_EVENT = "lf-notification-prefs-changed";

type PrefKey =
  | "facegramMentions"
  | "directMessages"
  | "coachingReminders"
  | "platformAnnouncements";

type Prefs = Record<PrefKey, boolean>;

const defaultPrefs: Prefs = {
  facegramMentions: true,
  directMessages: true,
  coachingReminders: true,
  platformAnnouncements: true,
};

const toggleConfig: {
  key: PrefKey;
  title: string;
  description: string;
}[] = [
  {
    key: "facegramMentions",
    title: "FaceGram mentions",
    description:
      "Get notified when someone mentions you or replies to your posts on FaceGram.",
  },
  {
    key: "directMessages",
    title: "Direct messages",
    description:
      "Get notified about new direct messages from your teammates and coaches.",
  },
  {
    key: "coachingReminders",
    title: "Coaching reminders",
    description:
      "Power Hour prompts, accountability check-ins, and coaching session reminders.",
  },
  {
    key: "platformAnnouncements",
    title: "Platform announcements",
    description:
      "Updates from the Loan Factory team about new features and important changes.",
  },
];

function parsePrefs(raw: string): Prefs {
  if (!raw) return defaultPrefs;

  try {
    const parsed = JSON.parse(raw) as Partial<Prefs>;
    return {
      facegramMentions:
        typeof parsed.facegramMentions === "boolean"
          ? parsed.facegramMentions
          : defaultPrefs.facegramMentions,
      directMessages:
        typeof parsed.directMessages === "boolean"
          ? parsed.directMessages
          : defaultPrefs.directMessages,
      coachingReminders:
        typeof parsed.coachingReminders === "boolean"
          ? parsed.coachingReminders
          : defaultPrefs.coachingReminders,
      platformAnnouncements:
        typeof parsed.platformAnnouncements === "boolean"
          ? parsed.platformAnnouncements
          : defaultPrefs.platformAnnouncements,
    };
  } catch {
    return defaultPrefs;
  }
}

// localStorage-backed store read via useSyncExternalStore — hydration-safe and
// avoids setState-in-effect. Server snapshot is the defaults; the client
// re-reads after hydration and on any cross-tab/storage change.
function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function getClientSnapshot() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function getServerSnapshot() {
  return "";
}

export default function NotificationSettingsPage() {
  const raw = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const prefs = parsePrefs(raw);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  function toggle(key: PrefKey) {
    const next = { ...prefs, [key]: !prefs[key] };

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event(CHANGE_EVENT));
      setSavedAt(
        new Date().toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "2-digit",
        }),
      );
    } catch {
      // localStorage may be unavailable in restricted browser contexts.
    }
  }

  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-12">
          <div className="flex items-center gap-3">
            <Link
              href="/settings/"
              className="text-sm font-semibold text-white/70 hover:text-white"
            >
              Settings
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-sm font-semibold text-white">
              Notifications
            </span>
          </div>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
            Notification preferences
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">
            Choose what you want to hear about across the Loan Factory platform.
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="card lg:col-span-2">
            <h2 className="h-display text-2xl">Preferences</h2>
            <p className="prose-lf mt-2 text-sm">
              These preferences are saved in this browser. Toggle anything on or
              off — your choices persist on this device.
            </p>
            <div className="mt-5 grid gap-3">
              {toggleConfig.map((item) => (
                <div
                  key={item.key}
                  className="flex items-start justify-between gap-4 rounded-lg border border-lf-line bg-white px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-lf-charcoal">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-lf-slate">
                      {item.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={prefs[item.key]}
                    aria-label={`Toggle ${item.title}`}
                    onClick={() => toggle(item.key)}
                    className={`relative mt-0.5 inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition ${
                      prefs[item.key] ? "bg-lf-orange" : "bg-lf-mist"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                        prefs[item.key] ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-lf-slate" aria-live="polite">
              {savedAt
                ? `Saved in this browser at ${savedAt}.`
                : "Changes save automatically in this browser."}
            </p>
          </div>

          <div className="grid gap-6">
            <div className="card">
              <h2 className="h-display text-2xl">Delivery status</h2>
              <p className="prose-lf mt-3 text-sm">
                Your preferences are stored on this device today. Server-pushed
                notifications (email and in-app delivery) activate when
                notification delivery is connected. Until then, check your
                activity directly from the links below.
              </p>
            </div>

            <div className="card">
              <h2 className="h-display text-2xl">Check activity</h2>
              <div className="mt-4 grid gap-2">
                <Link
                  href="/facegram/notifications/"
                  className="rounded-lg border border-lf-line px-4 py-3 text-sm font-semibold hover:border-lf-orange"
                >
                  FaceGram notifications
                </Link>
                <Link
                  href="/facegram/messages/"
                  className="rounded-lg border border-lf-line px-4 py-3 text-sm font-semibold hover:border-lf-orange"
                >
                  Direct messages
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/settings/" className="btn-secondary">
            Back to settings
          </Link>
        </div>
      </section>
    </>
  );
}
