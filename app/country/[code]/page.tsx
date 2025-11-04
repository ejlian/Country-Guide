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
  Cloud,
  Droplets,
  TrendingUp,
  Calendar,
  Languages,
  Building2,
  Compass,
  Flag,
  Eye,
  Sparkles,
} from "lucide-react";

import { CountryActions } from "@/components/country/country-actions";
import { CurrencyConverter } from "@/components/currency-converter";
import { PhotoGallery } from "@/components/photo-gallery";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    <article className="space-y-8">
      {/* Modern Hero Header with Flag */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 text-white shadow-2xl md:p-12">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-16 w-24 overflow-hidden rounded-lg shadow-xl ring-2 ring-white/30">
                <img
                  src={`https://flagcdn.com/w320/${code.toLowerCase()}.png`}
                  alt={`${country.name} flag`}
                  className="h-full w-full object-cover"
                />
              </div>
              <Badge className="bg-white/20 text-white backdrop-blur-sm hover:bg-white/30">
                {country.region}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold tracking-tight drop-shadow-lg md:text-5xl lg:text-6xl">
              {country.name}
            </h1>
            <p className="text-lg text-white/90 drop-shadow-md">
              {country.officialName}
            </p>
            {country.capital && (
              <div className="flex items-center gap-2 text-white/90">
                <Building2 className="h-5 w-5" />
                <span className="font-medium">Capital: {country.capital}</span>
              </div>
            )}
          </div>
          <CountryActions country={country} />
        </div>
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
      </section>

      {/* Interactive Stats Grid */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InteractiveStatCard
          icon={<Users className="h-6 w-6" />}
          label="Population"
          value={formatNumber(country.population)}
          color="blue"
        />
        {country.area && (
          <InteractiveStatCard
            icon={<Globe2 className="h-6 w-6" />}
            label="Area"
            value={`${formatNumber(country.area)} km²`}
            color="green"
          />
        )}
        {country.languages.length > 0 && (
          <InteractiveStatCard
            icon={<Languages className="h-6 w-6" />}
            label="Languages"
            value={country.languages[0]}
            subtitle={country.languages.length > 1 ? `+${country.languages.length - 1} more` : undefined}
            color="purple"
          />
        )}
        <InteractiveStatCard
          icon={<Wind className="h-6 w-6" />}
          label="Timezones"
          value={country.timezones[0]}
          subtitle={country.timezones.length > 1 ? `+${country.timezones.length - 1} more` : undefined}
          color="orange"
        />
      </section>

      {/* Tabs for Organized Content */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="weather">Weather</TabsTrigger>
          <TabsTrigger value="currency">Currency</TabsTrigger>
          <TabsTrigger value="explore">Explore</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-blue-600" />
                  Key Facts
                </CardTitle>
                <CardDescription>Essential information about {country.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <InfoRow icon={<MapPin />} label="Region" value={country.region} />
                {country.subregion && (
                  <InfoRow icon={<Compass />} label="Subregion" value={country.subregion} />
                )}
                {country.currencies.length > 0 && (
                  <InfoRow 
                    icon={<TrendingUp />} 
                    label="Currency" 
                    value={`${country.currencies[0].name} (${country.currencies[0].code})`}
                  />
                )}
                {country.drivingSide && (
                  <InfoRow 
                    icon={<ArrowRight />} 
                    label="Driving Side" 
                    value={country.drivingSide === "right" ? "Right" : "Left"}
                  />
                )}
              </CardContent>
            </Card>

            <Card className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="h-5 w-5 text-purple-600" />
                  Languages & Culture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {country.languages.map((lang) => (
                    <Badge key={lang} variant="secondary" className="text-sm">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Weather Tab */}
        <TabsContent value="weather" className="space-y-6">
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-6 w-6" />
                Current Weather
              </CardTitle>
              <CardDescription className="text-white/90">
                {country.capital
                  ? `Live conditions in ${country.capital}`
                  : "Capital city unknown"}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {weather ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-6xl font-bold text-blue-600">{Math.round(weather.temperature)}°C</p>
                      <p className="mt-2 text-xl capitalize text-muted-foreground">{weather.description}</p>
                    </div>
                    <div className="text-right">
                      <Cloud className="h-20 w-20 text-blue-400" />
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-4">
                      <Sparkles className="h-8 w-8 text-orange-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Feels Like</p>
                        <p className="text-2xl font-bold">{Math.round(weather.feelsLike)}°C</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-4">
                      <Droplets className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Humidity</p>
                        <p className="text-2xl font-bold">{weather.humidity}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border-2 border-dashed bg-muted/20 p-8 text-center">
                  <Cloud className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 text-sm text-muted-foreground">
                    Weather data requires an OpenWeather API key. Set <code className="rounded bg-muted px-2 py-1">OPENWEATHER_API_KEY</code> in your environment.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Currency Tab */}
        <TabsContent value="currency" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6" />
                  Exchange Rates
                </CardTitle>
                <CardDescription className="text-white/90">
                  {primaryCurrency
                    ? `Latest conversion rates for ${primaryCurrency}`
                    : "Currency information is not available"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {primaryCurrency && exchangeRates ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {selectHighlightedRates(exchangeRates, primaryCurrency).map(([symbol, value]) => (
                      <div key={symbol} className="group rounded-xl border-2 bg-gradient-to-br from-muted/30 to-muted/10 p-4 transition-all duration-300 hover:scale-105 hover:border-green-500 hover:shadow-lg">
                        <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{symbol}</div>
                        <div className="mt-1 text-2xl font-bold text-green-600">{value.toLocaleString(undefined, { maximumFractionDigits: 4 })}</div>
                      </div>
                    ))}
                  </div>
                ) : primaryCurrency ? (
                  <div className="rounded-lg border-2 border-dashed bg-muted/20 p-8 text-center">
                    <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-sm text-muted-foreground">
                      Live rates are temporarily unavailable. Please refresh later.
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Currency details are missing from the REST Countries response.
                  </p>
                )}
              </CardContent>
            </Card>

            <CurrencyConverter rates={exchangeRates?.rates} baseCurrency={primaryCurrency} />
          </div>
        </TabsContent>

        {/* Explore Tab */}
        <TabsContent value="explore" className="space-y-6">
          <PhotoGallery countryName={country.name} flagUrl={country.flagPng} />

      <PhotoGallery countryName={country.name} flagUrl={country.flagPng} />

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Flag className="h-5 w-5 text-blue-600" />
                    Neighboring Countries
                  </CardTitle>
                  <CardDescription>Explore nearby destinations</CardDescription>
                </div>
                {country.maps.googleMaps && (
                  <Link
                    href={country.maps.googleMaps}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-700 hover:scale-105"
                  >
                    <MapPin className="h-4 w-4" />
                    View on Map
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {neighbors.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {neighbors.map((neighbor) => (
                    <Link
                      key={neighbor.code}
                      href={`/country/${neighbor.code.toLowerCase()}`}
                      className="group flex items-center gap-3 rounded-xl border-2 bg-gradient-to-br from-muted/30 to-muted/10 p-4 transition-all duration-300 hover:scale-105 hover:border-blue-500 hover:shadow-lg"
                    >
                      <img
                        src={`https://flagcdn.com/w80/${neighbor.code.toLowerCase()}.png`}
                        alt={`${neighbor.name} flag`}
                        className="h-8 w-12 rounded object-cover shadow-md"
                      />
                      <span className="flex-1 font-semibold">{neighbor.name}</span>
                      <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-600" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border-2 border-dashed bg-muted/20 p-8 text-center">
                  <Compass className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 text-sm text-muted-foreground">No bordering countries found.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
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

// Modern Interactive Stat Card Component
interface InteractiveStatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle?: string;
  color: "blue" | "green" | "purple" | "orange";
}

function InteractiveStatCard({ icon, label, value, subtitle, color }: InteractiveStatCardProps) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
    green: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
    purple: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
    orange: "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border-2 border-transparent bg-gradient-to-br p-6 transition-all duration-300 hover:border-white hover:shadow-2xl hover:-translate-y-2">
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} transition-opacity duration-300`}></div>
      <div className="relative z-10">
        <div className="mb-4 inline-flex rounded-lg bg-white/20 p-3 text-white backdrop-blur-sm">
          {icon}
        </div>
        <p className="text-sm font-medium uppercase tracking-wider text-white/80">{label}</p>
        <p className="mt-2 text-3xl font-bold text-white">{value}</p>
        {subtitle && (
          <p className="mt-1 text-sm text-white/70">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

// Info Row Component
interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-muted/20 p-3 transition-colors hover:bg-muted/40">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
          {icon}
        </div>
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
      </div>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
