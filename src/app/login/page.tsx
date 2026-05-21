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
          <span className="rounded-full bg-lf-orange px-3 py-1 text-xs font-bold uppercase tracking-wide">
            Role preview
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight">
            Choose how you want to preview the site.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Pick a role to see what each user type lands on. Your choice is
            saved in this browser only. No password. No real authentication.
          </p>
        </div>
      </section>

      <LoginPicker />

      <section className="container-page pb-20">
        <div className="card">
          <h2 className="h-display text-xl">What changes when you switch role</h2>
          <ul className="prose-lf mt-3 list-disc space-y-1 pl-5 text-base">
            <li>
              A small role banner appears at the top of every page so the
              current role is always visible.
            </li>
            <li>
              The Coach Guide is visible to Owner Admin, Leadership, LO
              Development, Corporate Coach, and Marketing Reviewer roles.
            </li>
            <li>
              The Team Leader Guide is visible to those roles plus Team Leader.
            </li>
            <li>
              Loan Officer view sees a friendly notice on those two pages with
              a link back to the rest of the site.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
