"use client";

import { useState } from "react";
import type { ReactNode } from "react";

export type TabItem = {
  id: string;
  label: ReactNode;
  content: ReactNode;
};

type TabsProps = {
  tabs: TabItem[];
  /** Tab id to show first. Defaults to the first tab. */
  defaultTabId?: string;
  className?: string;
};

/**
 * Compact tab strip built on the .lf-tabs classes. Keeps a lot of content out
 * of the initial scroll by sectioning it behind tabs.
 */
export default function Tabs({ tabs, defaultTabId, className = "" }: TabsProps) {
  const [activeId, setActiveId] = useState(defaultTabId ?? tabs[0]?.id);
  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  if (tabs.length === 0) return null;

  return (
    <div className={className}>
      <div className="lf-tabs" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === active?.id}
            onClick={() => setActiveId(tab.id)}
            className={`lf-tab ${tab.id === active?.id ? "lf-tab-active" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="mt-4">
        {active?.content}
      </div>
    </div>
  );
}
