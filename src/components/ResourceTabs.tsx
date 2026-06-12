"use client";

import { useEffect, useState, type ReactNode } from "react";

const TABS = [
  { key: "scripts", label: "Scripts" },
  { key: "tools", label: "Tools" },
  { key: "training", label: "Training" },
  { key: "podcast", label: "Podcast" },
  { key: "calendar", label: "Calendar" },
  { key: "course-overview", label: "Course Overview" },
  { key: "downloads", label: "Downloads" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

/**
 * The Resource Library shell: one place for scripts, tools, and training.
 * Slots render server-side; this component only switches which is visible.
 * Deep links work via ?tab=scripts|tools|training.
 */
export default function ResourceTabs({
  scripts,
  tools,
  training,
  podcast,
  calendar,
  course,
  downloads,
}: {
  scripts: ReactNode;
  tools: ReactNode;
  training: ReactNode;
  podcast: ReactNode;
  calendar: ReactNode;
  course: ReactNode;
  downloads: ReactNode;
}) {
  const [active, setActive] = useState<TabKey>("scripts");

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("tab");
    const tab = raw === "course" ? "course-overview" : raw; // legacy deep links
    if (
      tab === "tools" || tab === "training" || tab === "scripts" ||
      tab === "podcast" || tab === "calendar" || tab === "course-overview" ||
      tab === "downloads"
    ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- read the deep-link tab once after hydration.
      setActive(tab);
    }
  }, []);

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-1.5">
        {TABS.map((tab) => {
          const isActive = tab.key === active;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                setActive(tab.key);
                window.history.replaceState(null, "", `?tab=${tab.key}`);
              }}
              className={`inline-flex items-center rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "border-lf-orange bg-lf-orange text-white"
                  : "border-lf-line bg-white text-lf-navy hover:border-lf-navy hover:bg-lf-mist"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className={active === "scripts" ? "grid gap-6" : "hidden"}>{scripts}</div>
      <div className={active === "tools" ? "grid gap-6" : "hidden"}>{tools}</div>
      <div className={active === "training" ? "grid gap-6" : "hidden"}>{training}</div>
      <div className={active === "podcast" ? "grid gap-6" : "hidden"}>{podcast}</div>
      <div className={active === "calendar" ? "grid gap-6" : "hidden"}>{calendar}</div>
      <div className={active === "course-overview" ? "grid gap-6" : "hidden"}>{course}</div>
      <div className={active === "downloads" ? "grid gap-6" : "hidden"}>{downloads}</div>
    </div>
  );
}
