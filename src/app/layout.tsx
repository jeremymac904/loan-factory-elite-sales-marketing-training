import type { Metadata } from "next";
import CanonicalHostGuard from "@/components/CanonicalHostGuard";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ConditionalFooter from "@/components/ConditionalFooter";
import BetaPreviewBanner from "@/components/BetaPreviewBanner";
import ViewAsBanner from "@/components/ViewAsBanner";
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
        <ConditionalFooter>
          <SiteFooter />
        </ConditionalFooter>
      </body>
    </html>
  );
}
