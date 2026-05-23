import { Suspense } from "react";
import AuthCallbackHandler from "@/components/AuthCallbackHandler";

export const dynamic = "force-dynamic";
export const metadata = { title: "Signing In" };

export default function AuthCallbackPage() {
  return (
    <section className="container-page py-16">
      <div className="card max-w-2xl">
        <span className="rounded-full bg-lf-orange px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
          Supabase beta
        </span>
        <h1 className="mt-5 h-display text-3xl">Finishing sign-in</h1>
        <Suspense
          fallback={
            <p className="mt-4 text-lf-slate">
              Checking your Google session and beta access.
            </p>
          }
        >
          <AuthCallbackHandler />
        </Suspense>
      </div>
    </section>
  );
}
