import { getViewAsState } from "@/lib/viewAs";
import { getRoleLabel } from "@/lib/supabase/auth";
import ViewAsExitButton from "./ViewAsExitButton";

export default async function ViewAsBanner() {
  const state = await getViewAsState();

  if (!state) return null;

  return (
    <div className="sticky top-0 z-40 border-b border-lf-orangeDark bg-lf-orange text-white">
      <div className="container-page flex flex-wrap items-center justify-between gap-3 py-2 text-sm">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide">
            View-As
          </span>
          <span className="font-semibold">
            Viewing as {state.name ?? state.email ?? getRoleLabel(state.role)} · {getRoleLabel(state.role)}
          </span>
          <span className="hidden text-xs text-white/80 sm:inline">
            Admin preview only. Destructive actions are disabled.
          </span>
        </div>
        <ViewAsExitButton />
      </div>
    </div>
  );
}
