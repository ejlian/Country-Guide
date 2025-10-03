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
    return "Global snapshot";
  }, [search, region]);

  return (
    <section className="space-y-10">
      <header className="space-y-4">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Explore the world
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Find countries, compare stats, and curate your travel wishlist.
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            Search by name or focus on a specific region. Save favorites to revisit later and dive into detailed
            insights including weather and currency trends.
          </p>
        </div>
        <CountryFilters
          search={search}
          region={region}
          onSearchChange={setSearch}
          onRegionChange={setRegion}
        />
      </header>

      <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="font-medium text-foreground">{headline}</div>
        <div>{countries.length.toLocaleString()} countries</div>
      </div>

      <Separator />

      {error ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-destructive/40 bg-destructive/10 p-10 text-destructive">
          <AlertTriangle className="h-8 w-8" />
          <div className="text-center">
            <p className="font-semibold">We couldn’t load countries right now.</p>
            <p className="text-sm text-destructive/80">
              {error.message || "Please try again in a moment."}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {(isLoading || isFetching) && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Fetching the latest country data…
            </div>
          )}
          {isLoading ? (
            <CountryGridSkeleton />
          ) : countries.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-10 text-center text-muted-foreground">
              <p className="text-lg font-semibold">No countries found</p>
              <p className="max-w-md text-sm">
                Try adjusting your search or region filter. The REST Countries API occasionally rate limits queries—if that
                happens, wait a few seconds and refresh.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {countries.map((country) => (
                <CountryCard key={country.code} country={country} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
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
