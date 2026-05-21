import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default:
      "Loan Factory Elite Sales and Marketing Training Series (101 to 601)",
    template: "%s | Loan Factory Elite Training",
  },
  description:
    "Internal training portal for Loan Factory loan officers. A six week operating system for conversations, conversion, partner growth, content, pipeline, and elite execution.",
  robots: { index: false, follow: false },
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
      </body>
    </html>
  );
}
