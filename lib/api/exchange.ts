import { CurrencyRates } from "@/types/country";

const EXCHANGE_BASE = "https://open.er-api.com/v6/latest";

interface ExchangeResponse {
  result: string;
  base_code: string;
  time_last_update_utc: string;
  rates: Record<string, number>;
}

export async function getCurrencyRates(base?: string): Promise<CurrencyRates | null> {
  if (!base) {
    return null;
  }

  const normalizedBase = base.toUpperCase();
  const response = await fetch(`${EXCHANGE_BASE}/${normalizedBase}`, {
    next: { revalidate: 60 * 60 },
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as ExchangeResponse;

  if (data.result !== "success") {
    return null;
  }

  return {
    base: data.base_code,
    lastUpdated: data.time_last_update_utc,
    rates: data.rates,
  };
}
