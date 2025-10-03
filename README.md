## Country Guide Web

Country Guide is a Next.js 14 App Router experience for discovering countries, drilling into weather and currency data, and curating a personalised list of favourites. It combines REST Countries, OpenWeather, and Open Exchange Rate APIs with a modern UI powered by Tailwind CSS and shadcn/ui.

## Features

- 🌍 **Explore**: Filter countries by name or region with instant feedback powered by React Query.
- 🏳️ **Detail pages**: Rich snapshots with flags, key facts, neighbour listings, live weather, and currency highlights.
- 📌 **Saved collection**: Persist favourites locally using Zustand with storage middleware.
- 👤 **Profile**: Centralised hub for upcoming sync features and provider references.
- 🎨 **Design system**: Tailored shadcn/ui components, responsive layout, and dark-mode friendly palette.

## Getting started

1. **Install dependencies**

	```powershell
	npm install
	```

2. **Configure environment variables**

	Copy `.env.example` to `.env.local` and add your OpenWeather key (optional but recommended):

	```powershell
	Copy-Item .env.example .env.local
	# then edit .env.local to set OPENWEATHER_API_KEY
	```

3. **Run the development server**

	```powershell
	npm run dev
	```

	Visit [http://localhost:3000](http://localhost:3000) to explore the app. Saved countries persist per browser via local storage.

## Scripts

| Command         | Description                               |
|-----------------|-------------------------------------------|
| `npm run dev`   | Start the development server (Turbopack). |
| `npm run build` | Create an optimised production build.     |
| `npm run start` | Serve the production build.               |
| `npm run lint`  | Run ESLint over the project.              |

## Data sources

- [REST Countries](https://restcountries.com) – core country metadata.
- [OpenWeather](https://openweathermap.org/api) – capital city weather snapshots (requires API key).
- [ExchangeRate-API](https://www.exchangerate-api.com/) – live currency conversion rates.

## Folder highlights

- `app/` – App Router routes (`page.tsx`, dynamic country details, saved/profile). 
- `components/` – shadcn/ui primitives, navigation, and country UI building blocks.
- `lib/api/` – lightweight wrappers around third-party APIs with caching hints.
- `store/` – Zustand store for saved countries.
- `types/` – shared TypeScript contracts.

## Next steps

- Wire up authentication and cross-device sync for saved countries.
- Expand analytics (GDP, HDI, sustainability metrics) with additional providers.
- Add automated integration tests covering fetch flows and store persistence.
