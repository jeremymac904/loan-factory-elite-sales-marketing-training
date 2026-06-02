import type { Metadata } from "next";
import CanonicalHostGuard from "@/components/CanonicalHostGuard";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BetaPreviewBanner from "@/components/BetaPreviewBanner";
import ViewAsBanner from "@/components/ViewAsBanner";
import SuggestionModal from "@/components/SuggestionModal";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Loan Factory Paid Coaching",
    template: "%s | Loan Factory Paid Coaching",
  },
  description:
    "Loan Factory paid coaching platform for LO Mastery and Loan Factory Alliance.",
  manifest: "/manifest.webmanifest",
  robots: { index: false, follow: false },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d1b2a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white antialiased">
        <CanonicalHostGuard />
        <SiteHeader />
        <ViewAsBanner />
        <BetaPreviewBanner />
        <main>{children}</main>
        <SiteFooter />
        <SuggestionModal
          triggerLabel="Send Feedback"
          triggerClassName="fixed bottom-4 right-4 z-40 rounded-full bg-lf-orange px-4 py-3 text-sm font-bold text-white shadow-2xl transition hover:-translate-y-0.5 hover:bg-lf-orangeDark focus:outline-none focus:ring-2 focus:ring-lf-orange/30 sm:bottom-5 sm:right-5"
        />
      </body>
    </html>
  );
}
