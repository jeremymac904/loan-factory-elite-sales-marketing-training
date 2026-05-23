import Link from "next/link";
import { isBetaPreviewEnabled } from "@/lib/betaPreview";

export default async function BetaPreviewBanner() {
  const previewEnabled = await isBetaPreviewEnabled();

  if (!previewEnabled) {
    return null;
  }

  return (
    <div className="border-b border-lf-orange/30 bg-lf-orangeSoft text-lf-charcoal">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-2 px-5 py-2 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          <strong className="text-lf-navy">Beta Preview Mode:</strong> internal
          review only. This is not real sign-in. It cannot send email, connect
          private files, run automations, change Loan Factory systems, or use AI
          credits.
        </p>
        <Link href="/auth/preview-exit/" className="font-semibold text-lf-orangeDark">
          Exit preview
        </Link>
      </div>
    </div>
  );
}
