"use client";

import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import type { CartCatalog } from "@/lib/catalog/types";
import { CART_STORAGE_KEY, useCartStore } from "./store";

const CartCatalogContext = createContext<CartCatalog | null>(null);

/**
 * Mount once in the store layout with `catalog={await getCartCatalog()}`.
 * - rehydrates the persisted cart after mount (hydration-safe)
 * - prunes lines that are no longer sellable (K-031 notice via `droppedCodes`)
 * - syncs across tabs (storage event)
 * - opens the drawer when the URL has ?sepet=ac (target of the /sepet and /odeme redirects, K-087)
 */
export function CartProvider({ catalog, children }: { catalog: CartCatalog; children: ReactNode }) {
  const codes = useMemo(() => new Set(Object.keys(catalog)), [catalog]);

  useEffect(() => {
    const run = async () => {
      await useCartStore.persist.rehydrate();
      useCartStore.getState().prune(codes);
    };
    void run();

    const onStorage = (e: StorageEvent) => {
      if (e.key === CART_STORAGE_KEY) void useCartStore.persist.rehydrate();
    };
    window.addEventListener("storage", onStorage);

    const url = new URL(window.location.href);
    if (url.searchParams.get("sepet") === "ac") {
      useCartStore.getState().open();
      url.searchParams.delete("sepet");
      window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    }
    return () => window.removeEventListener("storage", onStorage);
  }, [codes]);

  return <CartCatalogContext.Provider value={catalog}>{children}</CartCatalogContext.Provider>;
}

export function useCartCatalog(): CartCatalog {
  const ctx = useContext(CartCatalogContext);
  if (!ctx) throw new Error("useCartCatalog must be used inside <CartProvider>");
  return ctx;
}
