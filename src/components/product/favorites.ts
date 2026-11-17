"use client";

/**
 * Device-local favourites (K-033). Stores product SLUGS only (yakında products may have no code); product data is
 * fetched fresh on /favoriler. Same hydration pattern as the cart store (skipHydration + rehydrate after mount).
 * NOTE: slugs are not locked before launch (K-110) — a slug change silently drops that favourite.
 */
import { useEffect } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const FAVORITES_STORAGE_KEY = "gl-fav-v1";
const MAX_FAVORITES = 200;

interface FavoritesState {
  slugs: string[];
  hydrated: boolean;
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      slugs: [],
      hydrated: false,
      toggle: (slug) => {
        const has = get().slugs.includes(slug);
        set({ slugs: has ? get().slugs.filter((s) => s !== slug) : [slug, ...get().slugs].slice(0, MAX_FAVORITES) });
      },
      remove: (slug) => set({ slugs: get().slugs.filter((s) => s !== slug) }),
    }),
    {
      name: FAVORITES_STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (s) => ({ slugs: s.slugs }),
      merge: (persisted, current) => {
        const raw = (persisted as { slugs?: unknown } | undefined)?.slugs;
        const slugs = Array.isArray(raw) ? raw.filter((s): s is string => typeof s === "string" && s !== "") : [];
        return { ...current, slugs };
      },
      onRehydrateStorage: () => () => useFavoritesStore.setState({ hydrated: true }),
    },
  ),
);

let rehydrating = false;
/** Call from any favourites consumer; rehydrates once per page load and keeps tabs in sync. */
export function useFavoritesHydration() {
  useEffect(() => {
    if (!rehydrating) {
      rehydrating = true;
      void useFavoritesStore.persist.rehydrate();
    }
    const onStorage = (e: StorageEvent) => {
      if (e.key === FAVORITES_STORAGE_KEY) void useFavoritesStore.persist.rehydrate();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
}

export function useIsFavorite(slug: string): boolean {
  return useFavoritesStore((s) => s.hydrated && s.slugs.includes(slug));
}

export function useFavoritesCount(): number {
  return useFavoritesStore((s) => (s.hydrated ? s.slugs.length : 0));
}
