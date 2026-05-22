import LoginPicker from "@/components/LoginPicker";

export const metadata = { title: "Role Preview Login" };

export default function LoginPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-lf-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url(/media/dark-hero-background.png)" }}
        />
        <div className="relative container-page py-14">
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            Sign in to preview your role.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Choose the role that matches how you will use LO Development. The
            site will remember this choice in this browser and take you to the
            matching area.
          </p>
        </div>
      </section>

      <LoginPicker />

      <section className="container-page pb-20">
        <div className="card">
          <h2 className="h-display text-xl">Role access preview</h2>
          <ul className="prose-lf mt-3 list-disc space-y-1 pl-5 text-base">
            <li>
              Admin preview is for Jeremy, Andre, Tara, Benjamin, Edward,
              Kevin, and approved admin users.
            </li>
            <li>
              Marketing has its own role for review queues, FaceGram content
              review, and approved adaptation concepts.
            </li>
            <li>
              Loan Officer preview opens the main training, coaching, FaceGram,
              AI Assistants, and Resources paths.
            </li>
            <li>
              Real account login and permissions come later; this page only
              previews the user experience.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
