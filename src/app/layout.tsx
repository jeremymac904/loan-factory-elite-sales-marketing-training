import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HeyGenVideoWidget from "@/components/HeyGenVideoWidget";
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
      </body>
    </html>
  );
}
