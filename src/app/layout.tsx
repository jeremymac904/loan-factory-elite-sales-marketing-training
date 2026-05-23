import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HeyGenVideoWidget from "@/components/HeyGenVideoWidget";
import SuggestionModal from "@/components/SuggestionModal";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Loan Factory LO Development",
    template: "%s | Loan Factory LO Development",
  },
  description:
    "Internal Loan Factory LO Development site for coaching, Sales & Marketing training, AI Advantage, FaceGram, resources, and support routing.",
  robots: { index: false, follow: false },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <HeyGenVideoWidget />
        <SuggestionModal
          triggerLabel="Send Feedback"
          triggerClassName="fixed right-4 top-24 z-40 rounded-full bg-lf-orange px-4 py-3 text-sm font-bold text-white shadow-2xl transition hover:-translate-y-0.5 hover:bg-lf-orangeDark focus:outline-none focus:ring-2 focus:ring-lf-orange/30"
        />
      </body>
    </html>
  );
}
