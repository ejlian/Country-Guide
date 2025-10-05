"use client";

import type { MouseEvent } from "react";

import Image from "next/image";
import Link from "next/link";
import { Bookmark, BookmarkCheck } from "lucide-react";

import type { CountrySummary } from "@/types/country";
import { useSavedCountries } from "@/store/use-saved-countries";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface CountryCardProps {
  country: CountrySummary;
}

export function CountryCard({ country }: CountryCardProps) {
  const toggleSaved = useSavedCountries((state) => state.toggle);
  const isSaved = useSavedCountries((state) => state.isSaved(country.code));

  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    toggleSaved(country);
  };

  return (
    <Link href={`/country/${country.code.toLowerCase()}`} prefetch>
      <Card className="group relative h-64 overflow-hidden rounded-xl border-border/60 transition-all hover:shadow-2xl cursor-pointer">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={country.flagPng}
            alt={country.flagAlt ?? `${country.name} flag`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover brightness-75 transition-transform duration-300 group-hover:scale-110"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        </div>
        
        {/* Content Overlay */}
        <div className="relative flex h-full flex-col justify-between p-6">
          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleToggle}
              className={cn(
                "rounded-full bg-white/90 p-2.5 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110",
                isSaved && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
              aria-label={isSaved ? "Remove from saved" : "Save country"}
            >
              {isSaved ? (
                <BookmarkCheck className="h-5 w-5" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Country Info */}
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white drop-shadow-lg">
              {country.name}
            </h3>
            {country.capital && (
              <p className="text-sm font-medium text-white/90 drop-shadow">
                {country.capital}
              </p>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
