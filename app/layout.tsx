import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { QueryProvider, ThemeProvider } from "@/components/providers";
import { MainNav } from "@/components/navigation/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Bell, Globe } from "lucide-react";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <div className="flex min-h-screen flex-col">
              <header className="sticky top-0 z-40 border-b bg-card shadow-sm backdrop-blur-sm">
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
                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <button className="h-9 w-9 rounded-full hover:bg-muted flex items-center justify-center">
                      <Globe className="h-5 w-5" />
                      <span className="sr-only">Change language</span>
                    </button>
                    <button className="h-9 w-9 rounded-full hover:bg-muted flex items-center justify-center relative">
                      <Bell className="h-5 w-5" />
                      <span className="sr-only">Notifications</span>
                    </button>
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </header>
            <main className="flex-1 bg-background">
              {children}
            </main>
          </div>
        </QueryProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}
