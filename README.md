## GlobeTrekker

GlobeTrekker is a modern travel discovery platform built with Next.js 15 App Router. Explore countries worldwide, view live weather and currency data, and curate your personalized travel wishlist. Features a stunning, travel-focused design inspired by leading booking platforms, powered by REST Countries, OpenWeather, and Open Exchange Rate APIs.

## Features

### Core Experience
- 🌍 **Beautiful Hero**: Large, engaging hero section with "Find Your Next Adventure" messaging
- 🏞️ **Image-First Cards**: Stunning country cards with flag backgrounds, gradient overlays, and hover animations
- 🔍 **Advanced Search & Filters**: Prominent search with sliding filter sidebar for continents and activities
- 🏳️ **Detailed Country Pages**: Rich profiles with weather, currency, demographics, photo galleries, and neighboring countries
- 📌 **Save Favorites**: Persist your travel wishlist locally with one-click bookmarking
- 🌓 **Dark Mode**: Full dark/light theme support with smooth transitions and system preference detection
- 💱 **Currency Converter**: Real-time currency conversion widget on country pages with 8+ currencies

### Travel Planning
- 🗺️ **Interactive Map**: Leaflet-powered map view with location markers, POI popups, and category filters
- ✈️ **Trip Planner**: Complete trip planning with destinations, activities, notes, and social sharing
- 📍 **Destinations Browser**: Curated collection of popular destinations with budget, weather, and best time info
- 💡 **Travel Tips**: Country-specific tips covering cultural etiquette, safety, transportation, and advice

### Social & Community
- ⭐ **Reviews & Ratings**: 5-star rating system with review submission, distribution charts, and likes/comments
- 👤 **User Profiles**: Social profiles with avatar, followers/following counts, saved countries, and review history
- 💬 **Community Page**: Browse and engage with traveler reviews and ratings

### Personalization
- ⚙️ **Settings**: Language preferences with 10+ language options and account management
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

- `app/` – App Router routes including:
  - `/` – Homepage with hero and country cards
  - `/country/[code]/` – Dynamic country detail pages
  - `/destinations/` – Curated destinations browser
  - `/map/` – Interactive map view with location markers
  - `/trips/` – Trip planning interface
  - `/saved/` – Saved countries collection
  - `/community/` – Reviews and ratings system
  - `/profile/` – User profile with social features
  - `/tips/` – Country-specific travel tips
  - `/settings/` – User preferences and language settings
- `components/` – Reusable UI components:
  - `ui/` – shadcn/ui primitives (buttons, cards, dialogs, etc.)
  - `country/` – Country-specific components (cards, filters, actions)
  - `navigation/` – Main navigation and routing
  - `providers/` – Theme and React Query providers
  - `map/` – Interactive map components (React Leaflet)
- `lib/api/` – API wrappers for REST Countries, OpenWeather, and Exchange Rate APIs
- `store/` – Zustand stores for client-side state (saved countries)
- `hooks/` – Custom React hooks (country search, etc.)
- `types/` – TypeScript type definitions

## Tech Stack

- **Framework**: Next.js 15 with App Router and React 19
- **Styling**: Tailwind CSS v4 with oklch color space
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: Zustand with localStorage persistence
- **Data Fetching**: TanStack Query (React Query)
- **Maps**: React Leaflet with OpenStreetMap tiles
- **Theme**: next-themes for dark mode support
- **Icons**: Lucide React
- **TypeScript**: Full type safety throughout

## Next steps

- 🔐 Wire up authentication (Auth.js/NextAuth) and cross-device sync for saved countries
- 🗄️ Add backend database (PostgreSQL/Supabase) for user data, reviews, and trips
- 🔄 Implement real-time updates for reviews and community features
- 📊 Expand analytics (GDP, HDI, sustainability metrics) with additional providers
- 🧪 Add automated testing (Vitest, Playwright) covering flows and persistence
- 🌐 Connect real flight/hotel APIs for booking functionality
- 📧 Add email notifications for trip updates and community interactions
