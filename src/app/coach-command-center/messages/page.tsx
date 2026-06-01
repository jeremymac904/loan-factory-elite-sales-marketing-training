import Link from "next/link";
import { getCoachAccess } from "@/lib/coachAccess";
import CoachCommandNav from "@/components/coach/CoachCommandNav";
import MessageWorkspace from "@/components/comms/MessageWorkspace";
import {
  communicationWorkflows,
  messageTemplates,
} from "@/data/coachCommandCenter";

export const dynamic = "force-dynamic";
export const metadata = { title: "Communication Center · Coach Command Center" };

export default async function CoachMessagesPage() {
  const access = await getCoachAccess();

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
            Communication Center
          </h1>
          <p className="mt-2 max-w-2xl text-base text-white/85">
            Plan and draft coach follow-ups, encouragement, scorecard
            reminders, training assignments, meeting recaps, and next-action
            messages. Drafts are local and nothing is auto-sent.
          </p>
          {access.viewingAsLabel && (
            <p className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              Viewing as: {access.viewingAsLabel}
            </p>
          )}
        </div>
      </section>

      <CoachCommandNav
        current="/coach-command-center/messages/"
        showAdmin={access.seesAll}
      />

      <section className="container-page py-8">
        <div className="card mb-6 border-lf-orange/40 bg-lf-orangeSoft/30">
          <h2 className="h-display text-xl">Draft-only workflows</h2>
          <p className="prose-lf mt-2 text-sm">
            The composer below creates local drafts only. No Gmail, Google Chat,
            n8n, Zapier, or outbound send is triggered.
          </p>
          <div className="mt-4 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {communicationWorkflows.map((workflow) => (
              <div
                key={workflow.title}
                className="rounded-lg border border-lf-line bg-white px-3 py-2"
              >
                <p className="text-sm font-semibold text-lf-charcoal">
                  {workflow.title}
                </p>
                <p className="mt-0.5 text-xs text-lf-slate">
                  {workflow.useCase}
                </p>
              </div>
            ))}
          </div>
        </div>
        <MessageWorkspace templates={messageTemplates} />
      </section>

      <section className="container-page pb-10">
        <details className="card">
          <summary className="cursor-pointer text-base font-semibold text-lf-charcoal">
            Browse all message templates
          </summary>
          <p className="prose-lf mt-2 text-sm">
            These are the same templates used in the composer. Open one in the
            composer above to personalize and save it as a draft.
          </p>
          <ul className="mt-4 divide-y divide-lf-line">
            {messageTemplates.map((template) => (
              <li key={template.title} className="py-3">
                <p className="text-sm font-semibold text-lf-charcoal">
                  {template.title}
                </p>
                <p className="mt-1 text-sm text-lf-slate">{template.body}</p>
              </li>
            ))}
          </ul>
        </details>
      </section>

      <section className="container-page pb-12">
        <div className="card flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-lf-charcoal">
              Posting to a whole group?
            </h2>
            <p className="prose-lf mt-1 text-sm">
              For a team or cohort message, review the draft first, then choose
              the approved destination. This page does not post to Google Chat
              or send email.
            </p>
          </div>
          <Link href="/facegram/" className="btn-secondary shrink-0">
            Open FaceGram
          </Link>
        </div>
      </section>
    </>
  );
}
