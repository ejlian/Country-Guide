import Link from "next/link";
import type { Metadata } from "next";
import { ExternalLink, Settings, UserRound } from "lucide-react";

export const metadata: Metadata = {
  title: "Profile · Country Guide",
  description:
    "Configure personal preferences for the Country Guide experience and review data provider notes.",
};

const DATA_PROVIDERS = [
  {
    name: "REST Countries",
    description: "Country facts and metadata",
    href: "https://restcountries.com",
  },
  {
    name: "OpenWeather",
    description: "Current weather by city",
    href: "https://openweathermap.org/api",
  },
  {
    name: "Open Exchange Rates",
    description: "Live currency conversions",
    href: "https://www.exchangerate-api.com/",
  },
];

export default function ProfilePage() {
  return (
    <section className="space-y-10">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Account</p>
        <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          <UserRound className="h-8 w-8 text-muted-foreground" aria-hidden />
          Personalise your experience
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          Use this space to manage saved countries and review the services that power the Country Guide. Future updates
          will introduce sign-in, syncing, and custom preferences.
        </p>
      </header>

      <section className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Sync and preferences</h2>
            <p className="text-sm text-muted-foreground">
              Coming soon: sign in to sync favorites across devices and configure measurement units.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-dashed border-border/60 px-4 py-2 text-sm text-muted-foreground"
            disabled
          >
            <Settings className="h-4 w-4" aria-hidden /> Manage settings
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Data providers</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DATA_PROVIDERS.map((provider) => (
            <li key={provider.name} className="rounded-lg border bg-muted/40 p-4">
              <h3 className="font-semibold text-foreground">{provider.name}</h3>
              <p className="text-sm text-muted-foreground">{provider.description}</p>
              <Link
                href={provider.href}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                Learn more <ExternalLink className="h-4 w-4" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
