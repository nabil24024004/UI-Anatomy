import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "UI Anatomy | UX Research Library",
  description: "A curated UX research library analyzing real-world product interfaces from leading companies. Explore onboarding, retention, monetization, and ethical design patterns.",
  keywords: ["UX research", "UI design", "case studies", "design patterns", "user experience"],
  authors: [{ name: "UI Anatomy" }],
  openGraph: {
    title: "UI Anatomy | UX Research Library",
    description: "Deep-dive UX research on real-world product interfaces",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${manrope.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
