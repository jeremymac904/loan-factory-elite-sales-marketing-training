import { getCoachAccess } from "@/lib/coachAccess";
import CoachCommandNav from "@/components/coach/CoachCommandNav";
import EmailWorkspace from "@/components/comms/EmailWorkspace";
import ConnectionStatusBadge from "@/components/comms/ConnectionStatusBadge";
import { emailTemplates } from "@/data/coachCommandCenter";
import { WORKSPACE_CONNECTED, workspaceServiceMeta } from "@/data/coachComms";

export const dynamic = "force-dynamic";
export const metadata = { title: "Email Center · Coach Command Center" };

export default async function CoachEmailCenterPage() {
  const access = await getCoachAccess();
  const gmailConnected = WORKSPACE_CONNECTED.gmail;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-10">
          <p className="text-xs font-bold uppercase tracking-wide text-lf-orange">
            Coach Command Center
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Email Center
          </h1>
          <p className="mt-2 max-w-2xl text-base text-white/85">
            Compose a one-to-one coaching email draft, personalize it, and save
            it locally. Drafts only — never auto-sent, never bulk.
          </p>
          {access.viewingAsLabel && (
            <p className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              Viewing as: {access.viewingAsLabel}
            </p>
          )}
        </div>
      </section>

      <CoachCommandNav
        current="/coach-command-center/email-center/"
        showAdmin={access.seesAll}
      />

      <section className="container-page py-8">
        <div className="card border-lf-orange/40 bg-lf-orangeSoft/40">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-lf-charcoal">
              Gmail status
            </h2>
            <ConnectionStatusBadge service="gmail" connected={gmailConnected} />
          </div>
          <p className="prose-lf mt-2 text-sm">
            {workspaceServiceMeta.gmail.connectHint} You compose and personalize
            a draft here, then copy it and send it yourself from Gmail. There is
            no &quot;Connect Gmail&quot; button because live Gmail draft creation
            is not implemented yet — when it is, it will be approval-gated and
            create a Gmail draft only. Approval is required before any send.
          </p>
        </div>
      </section>

      <section className="container-page pb-8">
        <EmailWorkspace templates={emailTemplates} />
      </section>

      <section className="container-page pb-12">
        <details className="card">
          <summary className="cursor-pointer text-base font-semibold text-lf-charcoal">
            Browse all email templates
          </summary>
          <p className="prose-lf mt-2 text-sm">
            The same templates power the composer above. Pick one there to edit
            and save it as a draft.
          </p>
          <ul className="mt-4 divide-y divide-lf-line">
            {emailTemplates.map((template) => (
              <li key={template.title} className="py-3">
                <p className="text-sm font-semibold text-lf-charcoal">
                  {template.title}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-lf-slate">
                  Subject
                </p>
                <p className="text-sm text-lf-charcoal">{template.subject}</p>
                <p className="mt-1 text-sm text-lf-slate">{template.body}</p>
              </li>
            ))}
          </ul>
        </details>
      </section>
    </>
  );
}
