"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";

import { CountryCard } from "@/components/country/country-card";
import {
  CountryFilters,
  type RegionFilter,
} from "@/components/country/country-filters";
import { useCountrySearch } from "@/hooks/use-country-search";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState<RegionFilter>("all");

  const { countries, isLoading, isFetching, error } = useCountrySearch({
    search,
    region,
  });

  const headline = useMemo(() => {
    if (search) {
      return `Results for "${search}"`;
    }
    if (region !== "all") {
      return `${region.charAt(0).toUpperCase()}${region.slice(1)} spotlight`;
    }
    return "Popular Destinations";
  }, [search, region]);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center space-y-6 py-12 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
          Find Your Next Adventure
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Explore countries, discover hidden gems, and plan the trip of a lifetime.
        </p>
        <div className="w-full max-w-2xl">
          <CountryFilters
            search={search}
            region={region}
            onSearchChange={setSearch}
            onRegionChange={setRegion}
          />
        </div>
      </section>

      {/* Results Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">{headline}</h2>
          {!isLoading && (
            <span className="text-sm text-muted-foreground">
              {countries.length.toLocaleString()} {countries.length === 1 ? 'country' : 'countries'}
            </span>
          )}
        </div>

              {error ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-destructive/40 bg-destructive/10 p-12 text-destructive">
            <AlertTriangle className="h-10 w-10" />
            <div className="text-center">
              <p className="text-lg font-semibold">We couldn't load countries right now.</p>
              <p className="text-sm text-destructive/80">
                {error.message || "Please try again in a moment."}
              </p>
            </div>
          </div>
        ) : (
          <>
            {(isLoading || isFetching) && (
              <div className="flex items-center justify-center gap-3 py-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading destinations…
              </div>
            )}
            {isLoading ? (
              <CountryGridSkeleton />
            ) : countries.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed bg-muted/20 p-16 text-center">
                <p className="text-xl font-semibold text-foreground">No countries found</p>
                <p className="max-w-md text-muted-foreground">
                  Try adjusting your search or region filter to discover more destinations.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {countries.map((country) => (
                  <CountryCard key={country.code} country={country} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

function CountryGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="space-y-3 rounded-lg border border-border/40 p-4">
          <Skeleton className="h-20 w-full rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-full" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-14" />
          </div>
          <Skeleton className="h-9 w-full" />
        </div>
      ))}
    </div>
  );
}
