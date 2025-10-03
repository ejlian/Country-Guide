"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";

import type { CountrySummary } from "@/types/country";
import { useSavedCountries } from "@/store/use-saved-countries";
import { Button } from "@/components/ui/button";

interface CountryActionsProps {
  country: CountrySummary;
}

export function CountryActions({ country }: CountryActionsProps) {
  const toggleSaved = useSavedCountries((state) => state.toggle);
  const isSaved = useSavedCountries((state) => state.isSaved(country.code));

  return (
    <Button
      type="button"
      variant={isSaved ? "default" : "outline"}
      className="rounded-full"
      onClick={() => toggleSaved(country)}
    >
      {isSaved ? (
        <>
          <BookmarkCheck className="mr-2 h-4 w-4" aria-hidden /> Saved
        </>
      ) : (
        <>
          <Bookmark className="mr-2 h-4 w-4" aria-hidden /> Save country
        </>
      )}
    </Button>
  );
}
