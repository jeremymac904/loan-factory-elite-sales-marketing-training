import Link from "next/link";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";
import { getBetaUserSession } from "@/lib/supabase/session";
import { seedAiTwinPersonas } from "@/data/aiTwinPersonas";

export const dynamic = "force-dynamic";
export const metadata = { title: "AI Twin Persona" };

export default async function AiTwinPersonaPage() {
  const session = await getBetaUserSession();
  const previewEnabled = await isBetaPreviewEnabled();

  if (!previewEnabled && session.status !== "approved") {
    return (
      <section className="container-page py-16">
        <div className="card max-w-2xl">
          <h1 className="h-display text-3xl">Sign in required</h1>
          <Link href="/login/" className="btn-primary mt-6 inline-block">
            Sign in
          </Link>
        </div>
      </section>
    );
  }

  const email = session.status === "approved" ? session.profile.email : null;
  const persona = seedAiTwinPersonas.find((p) => p.ownerEmail === email);

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
            <Link href="/ai-assistants/" className="text-sm font-semibold text-white/70 hover:text-white">
              AI Assistants
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-sm font-semibold text-white">Persona</span>
          </div>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
            AI Twin Persona
          </h1>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="card max-w-3xl">
          <h2 className="h-display text-2xl">{persona?.assistantName ?? "Persona settings"}</h2>
          <dl className="mt-5 grid gap-4 text-sm">
            <div>
              <dt className="font-semibold text-lf-slate">Voice / tone</dt>
              <dd className="mt-1 text-lf-charcoal">
                {persona?.voice ?? "Tell your AI Twin how you communicate — direct, supportive, technical, coach-style."}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-lf-slate">Bio context</dt>
              <dd className="mt-1 text-lf-charcoal">
                {persona?.bio ?? "Your AI Twin uses your profile bio. Edit your profile to update it."}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-lf-slate">Specialties</dt>
              <dd className="mt-1 flex flex-wrap gap-1.5">
                {(persona?.specialties ?? ["Daily planning", "Draft writing"]).map((s) => (
                  <span key={s} className="rounded-full border border-lf-line bg-lf-mist px-2.5 py-0.5 text-xs font-semibold text-lf-charcoal">
                    {s}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-lf-slate">Allowed audiences</dt>
              <dd className="mt-1 text-lf-charcoal">
                {(persona?.allowedAudiences ?? ["self"]).join(", ")}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-lf-slate">Default disclaimers</dt>
              <dd className="mt-1 grid gap-1">
                {(persona?.defaultDisclaimers ?? [
                  "Internal Loan Factory use only.",
                  "Drafts only — review before external use.",
                ]).map((d) => (
                  <span key={d} className="text-xs text-lf-slate">
                    · {d}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/profile/edit/" className="btn-secondary text-sm">
              Edit profile bio
            </Link>
            <Link href="/ai-assistants/my-ai-twin/" className="btn-primary text-sm">
              Back to My AI Twin
            </Link>
          </div>
          <p className="mt-5 text-xs text-lf-slate">
            Full persona editing UI will use your AI Twin record in Supabase
            (ai_twins table). Until then, persona changes flow through your
            profile bio and admin AI settings.
          </p>
        </div>
      </section>
    </>
  );
}
