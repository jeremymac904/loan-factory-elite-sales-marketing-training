import { workspaceServiceMeta, type WorkspaceService } from "@/data/coachComms";

// Honest status badge for a Google Workspace service. This sprint every
// service is "not connected", so the badge always reads draft-only. It never
// claims a live connection that does not exist.
//
// Pure presentational component — safe in a Server Component. Rendering this
// next to any composer makes the "drafts only" contract impossible to miss.

export default function ConnectionStatusBadge({
  service,
  connected,
  className = "",
}: {
  service: WorkspaceService;
  connected: boolean;
  className?: string;
}) {
  const meta = workspaceServiceMeta[service];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        connected
          ? "bg-green-100 text-green-800"
          : "bg-lf-orangeSoft text-lf-orangeDark"
      } ${className}`}
    >
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${
          connected ? "bg-green-600" : "bg-lf-orange"
        }`}
      />
      {connected
        ? `${meta.label} connected`
        : `${meta.label} not connected — drafts only`}
    </span>
  );
}
