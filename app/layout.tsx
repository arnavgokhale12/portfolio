import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Navbar, Footer } from "@/components";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CommandPalette } from "@/components/CommandPalette";
import { ConciergeWidget } from "@/components/ConciergeWidget";
import { siteConfig } from "@/lib/siteConfig";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.name} | ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.siteUrl,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ConciergeWidget />
          <CommandPalette />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
