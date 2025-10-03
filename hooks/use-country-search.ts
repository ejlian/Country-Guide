"use client";

import { useQuery } from "@tanstack/react-query";

import { getCountries, type CountryQueryParams } from "@/lib/api/countries";
import type { CountrySummary } from "@/types/country";

interface CountrySearchResult {
  countries: CountrySummary[];
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  refetch: () => Promise<CountrySummary[]>;
}

export function useCountrySearch(params: CountryQueryParams): CountrySearchResult {
  const query = useQuery<CountrySummary[], Error>({
    queryKey: [
      "countries",
      params.search?.toLowerCase() ?? "",
      params.region?.toLowerCase() ?? "all",
    ],
    queryFn: async () => await getCountries(params),
    placeholderData: (prevData) => prevData,
  });

  return {
    countries: query.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error ?? null,
    refetch: async () => {
      const result = await query.refetch({ cancelRefetch: false });
      return result.data ?? [];
    },
  };
}
