## GlobeTrekker

GlobeTrekker is a modern travel discovery platform built with Next.js 15 App Router. Explore countries worldwide, view live weather and currency data, and curate your personalized travel wishlist. Features a stunning, travel-focused design inspired by leading booking platforms, powered by REST Countries, OpenWeather, and Open Exchange Rate APIs.

## Features

- 🌍 **Beautiful Hero**: Large, engaging hero section with "Find Your Next Adventure" messaging
- 🏞️ **Image-First Cards**: Stunning country cards with flag backgrounds, gradient overlays, and hover animations
- 🔍 **Prominent Search**: Rounded search bar with inline button, perfectly centered in the hero
- 🏳️ **Detailed Pages**: Rich country profiles with weather, currency, demographics, and neighboring countries
- 📌 **Save Favorites**: Persist your travel wishlist locally with one-click bookmarking
- 🎨 **Modern Design**: Clean GlobeTrekker aesthetic with cyan-blue accents, generous white space, and polished UI
- 📱 **Fully Responsive**: Optimized layouts from mobile to 4K displays

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
