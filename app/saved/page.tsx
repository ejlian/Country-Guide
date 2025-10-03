"use client";

import { useMemo } from "react";
import { BookmarkX, Trash2 } from "lucide-react";

import { CountryCard } from "@/components/country/country-card";
import { useSavedCountries } from "@/store/use-saved-countries";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function SavedPage() {
  const savedList = useSavedCountries((state) => state.toArray());
  const clear = useSavedCountries((state) => state.clear);

  const savedCount = savedList.length;
  const headline = useMemo(() => {
    if (savedCount === 0) return "No saved countries yet";
    if (savedCount === 1) return "1 saved country";
    return `${savedCount} saved countries`;
  }, [savedCount]);

  return (
    <section className="space-y-10">
      <header className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Your collection
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Build a personalised list of countries to revisit anytime.
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            Saved countries sync to your browser’s local storage. Add new favorites from the Explore tab and manage them
            here.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border border-dashed border-border/40 bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{headline}</span>
          <span>Saved items stay on this device unless you clear them.</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Quick actions
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="inline-flex items-center gap-2"
            onClick={clear}
            disabled={savedCount === 0}
          >
            <Trash2 className="h-4 w-4" aria-hidden /> Clear all
          </Button>
        </div>
      </header>

      <Separator />

      {savedCount === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {savedList.map((country) => (
            <CountryCard key={country.code} country={country} />
          ))}
        </div>
      )}
    </section>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 rounded-xl border border-dashed border-border/60 bg-muted/30 p-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <BookmarkX className="h-6 w-6 text-muted-foreground" aria-hidden />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Nothing saved yet</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Browse the explore page and use the “Save country” button to curate your personal list. They’ll appear here for
          quick access.
        </p>
      </div>
    </div>
  );
}