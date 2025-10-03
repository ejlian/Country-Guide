"use client";

import { useState, useTransition } from "react";
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const REGIONS = ["all", "africa", "americas", "asia", "europe", "oceania"] as const;

export type RegionFilter = (typeof REGIONS)[number];

interface CountryFiltersProps {
  search: string;
  region: RegionFilter;
  onSearchChange: (value: string) => void;
  onRegionChange: (value: RegionFilter) => void;
}

export function CountryFilters({ search, region, onSearchChange, onRegionChange }: CountryFiltersProps) {
  const [localSearch, setLocalSearch] = useState(search);
  const [, startTransition] = useTransition();

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    startTransition(() => {
      onSearchChange(value);
    });
  };

  const handleClearSearch = () => {
    setLocalSearch("");
    startTransition(() => {
      onSearchChange("");
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" aria-hidden />
        <Input
          value={localSearch}
          onChange={(event) => handleSearchChange(event.target.value)}
          placeholder="Search countries by name"
          className="pl-9 pr-20"
        />
        {localSearch && (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute right-1 h-8 w-8 text-muted-foreground"
            onClick={handleClearSearch}
          >
            <X className="h-4 w-4" aria-hidden />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
      <Tabs value={region} onValueChange={(value) => onRegionChange(value as RegionFilter)}>
        <TabsList className="flex flex-wrap justify-start gap-2 bg-muted/60 p-1">
          {REGIONS.map((option) => (
            <TabsTrigger key={option} value={option} className="capitalize">
              {option === "all" ? "All" : option}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
