import { WeatherSnapshot } from "@/types/country";

const OPENWEATHER_BASE = "https://api.openweathermap.org/data/2.5/weather";

function getApiKey(): string | undefined {
  return process.env.OPENWEATHER_API_KEY ?? process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
}

interface OpenWeatherResponse {
  weather: { description: string; icon: string }[];
  main: { temp: number; feels_like: number; humidity: number };
}

export async function getWeatherByCity(city?: string, countryCode?: string): Promise<WeatherSnapshot | null> {
  const apiKey = getApiKey();

  if (!city || !apiKey) {
    return null;
  }

  const query = new URLSearchParams({
    q: countryCode ? `${city},${countryCode}` : city,
    units: "metric",
    appid: apiKey,
  });

  const response = await fetch(`${OPENWEATHER_BASE}?${query.toString()}`, {
    next: { revalidate: 60 * 30 },
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as OpenWeatherResponse;
  const current = data.weather?.[0];

  return {
    temperature: data.main?.temp,
    feelsLike: data.main?.feels_like,
    humidity: data.main?.humidity,
    description: current?.description ?? "", 
    icon: current?.icon,
  };
}
