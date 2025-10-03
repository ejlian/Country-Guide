import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-muted-foreground">
      <Loader2 className="h-8 w-8 animate-spin" aria-hidden />
      <p className="text-sm">Loading country insights…</p>
    </main>
  );
}
