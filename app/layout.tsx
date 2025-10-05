import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { QueryProvider } from "@/components/providers";
import { MainNav } from "@/components/navigation/main-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Country Guide",
  description:
    "Discover countries worldwide with weather snapshots, currency insights, and saved favorites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <QueryProvider>
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-40 border-b bg-card shadow-sm">
              <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-8 px-6 py-4">
                <div className="flex items-center gap-2">
                  <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
                    GlobeTrekker
                  </Link>
                </div>
                <MainNav />
              </div>
            </header>
            <main className="flex-1 bg-background">
              <div className="mx-auto w-full max-w-7xl px-6 py-12">
                {children}
              </div>
            </main>
            <footer className="border-t bg-card">
              <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
                <p className="text-foreground font-medium">© {new Date().getFullYear()} GlobeTrekker. All rights reserved.</p>
                <p className="text-xs">
                  Powered by REST Countries · OpenWeather · ExchangeRate API
                </p>
              </div>
            </footer>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
