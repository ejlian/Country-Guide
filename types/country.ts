export interface CountrySummary {
  code: string;
  name: string;
  officialName: string;
  capital?: string;
  region: string;
  subregion?: string;
  population: number;
  area?: number;
  flagPng: string;
  flagAlt?: string;
  timezones: string[];
  currencies: CurrencyInfo[];
  languages: string[];
}

export interface CurrencyInfo {
  code: string;
  name: string;
  symbol?: string;
}

export interface CountryDetail extends CountrySummary {
  borders: string[];
  maps: {
    googleMaps?: string;
    openStreetMaps?: string;
  };
  latlng: [number, number];
  demonyms: Record<string, { f?: string; m?: string }>;
  drivingSide?: "left" | "right";
  independent?: boolean;
}

export interface WeatherSnapshot {
  temperature: number;
  feelsLike: number;
  humidity: number;
  description: string;
  icon?: string;
}

export interface CurrencyRates {
  base: string;
  lastUpdated: string;
  rates: Record<string, number>;
}
