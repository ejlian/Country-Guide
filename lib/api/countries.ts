import { CountryDetail, CountrySummary, CurrencyInfo } from "@/types/country";

const REST_COUNTRIES_BASE = "https://restcountries.com/v3.1";
const COUNTRY_FIELDS = [
  "name",
  "cca2",
  "cca3",
  "capital",
  "region",
  "subregion",
  "population",
  "area",
  "timezones",
  "currencies",
  "languages",
  "flags",
  "maps",
  "borders",
  "latlng",
  "demonyms",
  "car",
  "independent",
].join(",");

type RestCountry = {
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, { official: string; common: string }>;
  };
  cca2: string;
  cca3: string;
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  area?: number;
  timezones: string[];
  currencies?: Record<string, { name: string; symbol?: string }>;
  languages?: Record<string, string>;
  flags: { png: string; svg: string; alt?: string };
  maps: { googleMaps?: string; openStreetMaps?: string };
  borders?: string[];
  latlng: [number, number];
  demonyms?: Record<string, { f?: string; m?: string }>;
  car?: { side?: "left" | "right" };
  independent?: boolean;
};

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    // Countries data updates infrequently, so we can revalidate every 24h by default.
    next: { revalidate: 60 * 60 * 24 },
  });

  if (!response.ok) {
    if (response.status === 404) {
      return [] as T;
    }

    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

function toCurrencyInfo(currencies?: Record<string, { name: string; symbol?: string }>): CurrencyInfo[] {
  if (!currencies) return [];

  return Object.entries(currencies).map(([code, info]) => ({
    code,
    name: info.name,
    symbol: info.symbol,
  }));
}

function toLanguages(languages?: Record<string, string>): string[] {
  if (!languages) return [];
  return Object.values(languages);
}

function toCountrySummary(country: RestCountry): CountrySummary {
  return {
    code: country.cca2,
    name: country.name.common,
    officialName: country.name.official,
    capital: country.capital?.[0],
    region: country.region,
    subregion: country.subregion,
    population: country.population,
    area: country.area,
    flagPng: country.flags.png,
    flagAlt: country.flags.alt,
    timezones: country.timezones,
    currencies: toCurrencyInfo(country.currencies),
    languages: toLanguages(country.languages),
  };
}

function toCountryDetail(country: RestCountry): CountryDetail {
  return {
    ...toCountrySummary(country),
    borders: country.borders ?? [],
    maps: country.maps ?? {},
    latlng: country.latlng,
    demonyms: country.demonyms ?? {},
    drivingSide: country.car?.side,
    independent: country.independent,
  };
}

export interface CountryQueryParams {
  search?: string;
  region?: string;
}

export async function getCountries({ search, region }: CountryQueryParams): Promise<CountrySummary[]> {
  const trimmedSearch = search?.trim();
  const normalizedRegion = region?.toLowerCase();

  const shouldFilterByRegion = normalizedRegion && normalizedRegion !== "all";

  let url: string;

  if (trimmedSearch) {
    const encoded = encodeURIComponent(trimmedSearch);
    url = `${REST_COUNTRIES_BASE}/name/${encoded}?fields=${COUNTRY_FIELDS}`;
  } else if (shouldFilterByRegion) {
    url = `${REST_COUNTRIES_BASE}/region/${normalizedRegion}?fields=${COUNTRY_FIELDS}`;
  } else {
    url = `${REST_COUNTRIES_BASE}/all?fields=${COUNTRY_FIELDS}`;
  }

  const data = await fetchJson<RestCountry[]>(url);

  const mapped = data.map(toCountrySummary);

  if (trimmedSearch && shouldFilterByRegion) {
    return mapped.filter((country) => country.region.toLowerCase() === normalizedRegion);
  }

  return mapped;
}

export async function getCountryByCode(code: string): Promise<CountryDetail | null> {
  if (!code) return null;
  const encoded = encodeURIComponent(code);
  const url = `${REST_COUNTRIES_BASE}/alpha/${encoded}?fields=${COUNTRY_FIELDS}`;
  const data = await fetchJson<RestCountry[]>(url);
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }
  return toCountryDetail(data[0]);
}

export async function getNeighborSummaries(borders: string[]): Promise<CountrySummary[]> {
  if (!borders.length) return [];
  const codes = borders
    .map((border) => border.trim().toUpperCase())
    .filter(Boolean)
    .join(",");
  if (!codes) return [];
  const url = `${REST_COUNTRIES_BASE}/alpha?codes=${codes}&fields=${COUNTRY_FIELDS}`;
  const data = await fetchJson<RestCountry[]>(url);
  return data.map(toCountrySummary);
}
