import Link from "next/link";
import { skoolSectionTabs, type CoachingSkoolTab } from "@/data/coachingSkool";

type Props = {
  active: string;
  tabs?: CoachingSkoolTab[];
  className?: string;
};

export default function SkoolSectionTabs({
  active,
  tabs = skoolSectionTabs,
  className = "",
}: Props) {
  return (
    <nav
      aria-label="Coaching sections"
      className={`flex gap-2 overflow-x-auto border-b border-lf-line bg-white ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active;

        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={`whitespace-nowrap px-4 py-4 text-sm font-semibold transition ${
              isActive
                ? "border-b-4 border-lf-black text-lf-black"
                : "border-b-4 border-transparent text-lf-slate hover:text-lf-black"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
