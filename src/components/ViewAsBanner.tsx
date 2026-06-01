import { getViewAsState } from "@/lib/viewAs";
import { getRoleLabel } from "@/lib/supabase/auth";
import ViewAsExitButton from "./ViewAsExitButton";

export default async function ViewAsBanner() {
  const state = await getViewAsState();

  if (!state) return null;

  return (
    // z-40 keeps the banner sticky and above page content, but below the header
    // account dropdown (z-[60]) so the dropdown panel can never clip behind it.
    <div className="sticky top-0 z-40 border-b border-lf-orangeDark bg-lf-orange text-white">
      <div className="container-page flex flex-wrap items-center justify-between gap-x-3 gap-y-1 py-2 text-sm">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide">
            View as role
          </span>
          <span className="font-semibold">
            Viewing as {state.name ?? state.email ?? getRoleLabel(state.role)} ·{" "}
            {getRoleLabel(state.role)}
          </span>
          <span className="basis-full text-xs text-white/80 sm:basis-auto">
            Admin preview only. Destructive actions are disabled.
          </span>
        </div>
        <ViewAsExitButton />
      </div>
    </div>
  );
}
