import Link from "next/link";

// PUBLIC FaceGram overview — shown to signed-out / not-configured visitors on an
// internal Loan Factory subdomain. It EXPLAINS what FaceGram is and who it helps,
// then routes to sign-in. It renders NO posts, NO feed, and NO private user data
// — the personalized FaceGram workspace stays behind sign-in (see /facegram).
const highlights = [
  {
    title: "Team wins & recognition",
    body: "See and celebrate Loan Factory loan officer wins, milestones, and shout-outs in one internal feed.",
  },
  {
    title: "Ask the group",
    body: "Post questions, share what is working, and learn from other approved Loan Factory users.",
  },
  {
    title: "Training & resource drops",
    body: "Catch clips, scripts, and announcements the team shares — tied back to your training and resources.",
  },
];

export default function FaceGramOverview() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-16 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-lf-orange">
            FaceGram
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-5xl">
            The internal Loan Factory community
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/85">
            FaceGram is the private, internal-only feed for approved Loan Factory
            users — wins, questions, recognition, and training drops in one place.
            Sign in with your Loan Factory Google account to open your workspace.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/login/" className="btn-primary">
              Sign in to open FaceGram
            </Link>
            <Link
              href="/resources/"
              className="btn-secondary border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
            >
              Explore resources
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="grid gap-5 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="card">
              <h2 className="h-display text-xl">{item.title}</h2>
              <p className="prose-lf mt-2 text-sm text-lf-slate">{item.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-lf-slate">
          FaceGram is internal-audience only and for approved Loan Factory users.
          The live feed and posting tools open after you sign in.
        </p>
      </section>
    </>
  );
}
