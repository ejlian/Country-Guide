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
            <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
              <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
                <Link href="/" className="font-semibold tracking-tight text-lg">
                  Country Guide
                </Link>
                <MainNav />
              </div>
            </header>
            <main className="flex-1">
              <div className="mx-auto w-full max-w-6xl px-6 py-10">
                {children}
              </div>
            </main>
            <footer className="border-t bg-muted/40">
              <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
                <p>Built with Next.js, React Query, Zustand, and shadcn/ui.</p>
                <p className="font-mono text-xs">
                  {new Date().getFullYear()} · REST Countries · OpenWeather · ExchangeRate
                </p>
              </div>
            </footer>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
