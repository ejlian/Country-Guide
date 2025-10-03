import Link from "next/link";
import { Compass, Home, Map } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Compass className="h-8 w-8 text-muted-foreground" aria-hidden />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">We lost sight of that destination</h1>
        <p className="max-w-xl text-sm text-muted-foreground">
          The page you’re after might have moved or never existed. Use the shortcuts below to get back on course.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-4 py-2 transition-colors hover:bg-muted"
        >
          <Home className="h-4 w-4" aria-hidden /> Explore countries
        </Link>
        <Link
          href="/saved"
          className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-4 py-2 transition-colors hover:bg-muted"
        >
          <Map className="h-4 w-4" aria-hidden /> View saved list
        </Link>
      </div>
    </main>
  );
}
