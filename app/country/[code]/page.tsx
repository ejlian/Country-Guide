import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Globe2,
  MapPin,
  Users,
  Wind,
} from "lucide-react";

import { CountryActions } from "@/components/country/country-actions";
import { getCountryByCode, getNeighborSummaries } from "@/lib/api/countries";
import { getWeatherByCity } from "@/lib/api/weather";
import { getCurrencyRates } from "@/lib/api/exchange";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface CountryPageProps {
  params: { code: string };
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const code = params.code?.toUpperCase();
  const country = await getCountryByCode(code);

  if (!country) {
    return {
      title: "Country not found",
    };
  }

  return {
    title: `${country.name} · Country Guide`,
    description: `Live snapshot for ${country.name}, including weather, currency, and regional insights.`,
  };
}

export default async function CountryPage({ params }: CountryPageProps) {
  const code = params.code?.toUpperCase();
  const country = await getCountryByCode(code);

  if (!country) {
    notFound();
  }

  const primaryCurrency = country.currencies[0]?.code;
  const [weather, exchangeRates, neighbors] = await Promise.all([
    getWeatherByCity(country.capital, country.code),
    getCurrencyRates(primaryCurrency),
    getNeighborSummaries(country.borders),
  ]);

  return (
    <article className="space-y-10">
      <header className="flex flex-col gap-6 rounded-xl border bg-card p-6 shadow-sm md:flex-row md:items-center md:gap-10">
        <div className="relative h-28 w-44 flex-shrink-0 overflow-hidden rounded-lg border bg-muted">
          <Image
            src={country.flagPng}
            alt={country.flagAlt ?? `${country.name} flag`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 60vw, 200px"
          />
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {country.name}
            </h1>
            <p className="text-base text-muted-foreground">{country.officialName}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="border-border/60">
              <Globe2 className="mr-1 h-3.5 w-3.5" aria-hidden /> {country.region}
            </Badge>
            {country.subregion && (
              <Badge variant="outline">{country.subregion}</Badge>
            )}
            {country.independent !== undefined && (
              <Badge variant={country.independent ? "default" : "outline"}>
                {country.independent ? "Independent" : "Territory"}
              </Badge>
            )}
            {country.capital && (
              <Badge variant="outline" className="border-dashed">
                <MapPin className="mr-1 h-3.5 w-3.5" aria-hidden /> {country.capital}
              </Badge>
            )}
          </div>
          <CountryActions country={country} />
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Key facts pulled from REST Countries</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2">
            <StatBlock
              icon={<Users className="h-5 w-5" aria-hidden />}
              label="Population"
              value={formatNumber(country.population)}
            />
            {country.area && (
              <StatBlock
                icon={<Globe2 className="h-5 w-5" aria-hidden />}
                label="Area"
                value={`${formatNumber(country.area)} km²`}
              />
            )}
            <StatBlock
              icon={<Wind className="h-5 w-5" aria-hidden />}
              label="Timezones"
              value={country.timezones.join(", ")}
            />
            {country.languages.length > 0 && (
              <StatBlock
                icon={<ArrowRight className="h-5 w-5" aria-hidden />}
                label="Languages"
                value={country.languages.join(", ")}
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weather</CardTitle>
            <CardDescription>
              {country.capital
                ? `Current conditions in ${country.capital}`
                : "Capital city unknown"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {weather ? (
              <div className="space-y-2">
                <p className="text-3xl font-semibold">{Math.round(weather.temperature)}°C</p>
                <p className="text-muted-foreground capitalize">{weather.description}</p>
                <p className="text-sm text-muted-foreground">
                  Feels like {Math.round(weather.feelsLike)}° · Humidity {weather.humidity}%
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Weather data requires an OpenWeather API key. Set <code>OPENWEATHER_API_KEY</code> in your environment to
                enable this section.
              </p>
            )}
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Currency insights</CardTitle>
          <CardDescription>
            {primaryCurrency
              ? `Latest conversion rates for ${primaryCurrency}`
              : "Currency information is not available"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {primaryCurrency && exchangeRates ? (
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {selectHighlightedRates(exchangeRates, primaryCurrency).map(([symbol, value]) => (
                <li key={symbol} className="rounded-lg border bg-muted/30 p-4">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{symbol}</div>
                  <div className="text-xl font-semibold">{value.toLocaleString(undefined, { maximumFractionDigits: 4 })}</div>
                </li>
              ))}
            </ul>
          ) : primaryCurrency ? (
            <p className="text-sm text-muted-foreground">
              Live rates are temporarily unavailable. The ExchangeRate API may be responding slowly—please refresh later.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Currency details are missing from the REST Countries response.
            </p>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">Neighbouring countries</h2>
          {country.maps.googleMaps && (
            <Link
              href={country.maps.googleMaps}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              View on Google Maps <ExternalLink className="h-4 w-4" aria-hidden />
            </Link>
          )}
        </div>
        <Separator />
        {neighbors.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {neighbors.map((neighbor) => (
              <Link
                key={neighbor.code}
                href={`/country/${neighbor.code.toLowerCase()}`}
                className="inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-2 text-sm transition-colors hover:bg-muted/70"
              >
                <span>{neighbor.name}</span>
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No bordering countries were found for this nation.</p>
        )}
      </section>
    </article>
  );
}

function formatNumber(value: number) {
  return new Intl.NumberFormat().format(value);
}

function selectHighlightedRates(exchangeRates: Awaited<ReturnType<typeof getCurrencyRates>>, base: string) {
  if (!exchangeRates) return [] as Array<[string, number]>;

  const preferred = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD"].filter((code) => code !== base);
  const entries = Object.entries(exchangeRates.rates).filter(([code]) => code !== base);

  const prioritized = entries
    .filter(([code]) => preferred.includes(code))
    .slice(0, 6);

  if (prioritized.length >= 4) {
    return prioritized;
  }

  return entries.slice(0, 6);
}

interface StatBlockProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function StatBlock({ icon, label, value }: StatBlockProps) {
  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      <p className="mt-2 text-lg font-semibold text-foreground">{value}</p>
    </div>
  );
}
