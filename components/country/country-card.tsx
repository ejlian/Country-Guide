"use client";

import type { MouseEvent } from "react";

import Image from "next/image";
import Link from "next/link";
import { Bookmark, BookmarkCheck, Globe } from "lucide-react";

import type { CountrySummary } from "@/types/country";
import { useSavedCountries } from "@/store/use-saved-countries";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CountryCardProps {
  country: CountrySummary;
}

const formatCompactNumber = (value: number) =>
  new Intl.NumberFormat(undefined, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

export function CountryCard({ country }: CountryCardProps) {
  const toggleSaved = useSavedCountries((state) => state.toggle);
  const isSaved = useSavedCountries((state) => state.isSaved(country.code));

  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    toggleSaved(country);
  };

  return (
    <Card className="group flex h-full flex-col overflow-hidden border-border/60 transition-shadow hover:shadow-lg">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <div className="relative h-20 w-32 overflow-hidden rounded-md border bg-muted">
          <Image
            src={country.flagPng}
            alt={country.flagAlt ?? `${country.name} flag`}
            fill
            sizes="(max-width: 768px) 50vw, 200px"
            className="object-cover"
          />
        </div>
        <div className="space-y-2">
          <CardTitle className="text-lg font-semibold leading-tight">
            {country.name}
          </CardTitle>
          <CardDescription className="flex items-center gap-1 text-xs uppercase tracking-wide text-muted-foreground">
            <Globe className="h-3 w-3" aria-hidden />
            {country.region}
          </CardDescription>
          {country.capital && (
            <p className="text-sm text-muted-foreground">
              Capital: <span className="font-medium text-foreground">{country.capital}</span>
            </p>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3 p-4 pt-0">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Population {formatCompactNumber(country.population)}</Badge>
          {country.area && <Badge variant="outline">Area {formatCompactNumber(country.area)} km²</Badge>}
          {country.timezones.slice(0, 2).map((tz) => (
            <Badge key={tz} variant="secondary" className="font-mono text-[11px] uppercase">
              {tz}
            </Badge>
          ))}
        </div>
        {country.languages.length > 0 && (
          <p className="text-sm text-muted-foreground">
            Languages: {country.languages.slice(0, 3).join(", ")}
            {country.languages.length > 3 ? "…" : ""}
          </p>
        )}
        {country.currencies.length > 0 && (
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            {country.currencies.slice(0, 2).map((currency) => (
              <Badge key={currency.code} variant="outline" className="rounded-full px-3 text-xs">
                {currency.code} {currency.symbol ?? ""}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-2 bg-muted/40 p-4">
        <Button asChild variant="secondary" size="sm" className="rounded-full">
          <Link href={`/country/${country.code.toLowerCase()}`} prefetch>
            View details
          </Link>
        </Button>
        <Button
          variant={isSaved ? "default" : "outline"}
          size="sm"
          className={cn("rounded-full", isSaved ? "bg-green-600 text-white hover:bg-green-500" : "")}
          onClick={handleToggle}
        >
          {isSaved ? (
            <>
              <BookmarkCheck className="mr-1 h-4 w-4" aria-hidden /> Saved
            </>
          ) : (
            <>
              <Bookmark className="mr-1 h-4 w-4" aria-hidden /> Save
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
