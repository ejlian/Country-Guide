"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CountrySummary } from "@/types/country";

type SavedCountry = CountrySummary & { savedAt: string };

interface SavedCountriesState {
  saved: Record<string, SavedCountry>;
  add: (country: CountrySummary) => void;
  remove: (code: string) => void;
  toggle: (country: CountrySummary) => void;
  clear: () => void;
  isSaved: (code: string) => boolean;
  toArray: () => SavedCountry[];
}

export const useSavedCountries = create<SavedCountriesState>()(
  persist(
    (set, get) => ({
      saved: {},
      add: (country) =>
        set((state) => ({
          saved: {
            ...state.saved,
            [country.code]: {
              ...country,
              savedAt: new Date().toISOString(),
            },
          },
        })),
      remove: (code) =>
        set((state) => {
          const next = { ...state.saved };
          delete next[code];
          return { saved: next };
        }),
      toggle: (country) => {
        const { isSaved, remove, add } = get();
        if (isSaved(country.code)) {
          remove(country.code);
        } else {
          add(country);
        }
      },
      clear: () => set({ saved: {} }),
      isSaved: (code) => Boolean(get().saved[code]),
      toArray: () => Object.values(get().saved).sort((a, b) => (a.name ?? "").localeCompare(b.name ?? "")),
    }),
    {
      name: "saved-countries",
      storage: createJSONStorage(() => localStorage),
      partialize: ({ saved }) => ({ saved }),
    },
  ),
);

export type { SavedCountry };
