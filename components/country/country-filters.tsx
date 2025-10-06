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
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div className="relative flex flex-1 items-center">
        <Search className="absolute left-4 h-5 w-5 text-muted-foreground" aria-hidden />
        <Input
          value={localSearch}
          onChange={(event) => handleSearchChange(event.target.value)}
          placeholder="Where to?"
          className="h-12 rounded-full border-border bg-card pl-12 pr-24 text-base shadow-sm focus-visible:ring-primary"
        />
        {localSearch && (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute right-16 h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={handleClearSearch}
          >
            <X className="h-4 w-4" aria-hidden />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
      
      {/* Region Tabs - Always visible */}
      <div className="flex justify-center">
        <Tabs value={region} onValueChange={(value) => onRegionChange(value as RegionFilter)} className="w-full">
          <TabsList className="inline-flex h-auto w-auto gap-1 rounded-full bg-muted p-1">
            {REGIONS.map((option) => (
              <TabsTrigger 
                key={option} 
                value={option} 
                className="capitalize rounded-full px-6 py-2 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                {option}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
