/**
 * Cart store (K-003, K-031): Zustand + localStorage. Persists ONLY { code, qty } lines — names and prices are
 * re-read from the catalog on every render (computeCart), so stale prices can never be shown.
 *
 * Hydration safety: `skipHydration: true` -> server render and the first client render both see an empty cart;
 * <CartProvider> calls rehydrate() after mount. Read `hydrated` before showing counts if a flash matters.
 */
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CART_MAX_QTY } from "@/config/storefront";
import { clampQty, type CartLine } from "./totals";

export const CART_STORAGE_KEY = "gl-cart-v1";

export interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  hydrated: boolean;
  /** Codes removed because they are no longer sellable; the drawer shows a one-time notice. */
  droppedCodes: string[];

  add: (code: string, qty?: number) => void;
  setQty: (code: string, qty: number) => void;
  remove: (code: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  /** Drops lines whose code is not in `sellableCodes`. */
  prune: (sellableCodes: ReadonlySet<string>) => void;
  dismissDropped: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      hydrated: false,
      droppedCodes: [],

      add: (code, qty = 1) => {
        if (!code) return;
        const lines = get().lines;
        const existing = lines.find((l) => l.code === code);
        set({
          lines: existing
            ? lines.map((l) => (l.code === code ? { ...l, qty: clampQty(l.qty + qty, CART_MAX_QTY) } : l))
            : [...lines, { code, qty: clampQty(qty, CART_MAX_QTY) }],
        });
      },
      setQty: (code, qty) =>
        set({ lines: get().lines.map((l) => (l.code === code ? { ...l, qty: clampQty(qty, CART_MAX_QTY) } : l)) }),
      remove: (code) => set({ lines: get().lines.filter((l) => l.code !== code) }),
      clear: () => set({ lines: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set({ isOpen: !get().isOpen }),
      prune: (sellable) => {
        const dropped = get().lines.filter((l) => !sellable.has(l.code)).map((l) => l.code);
        if (dropped.length) set({ lines: get().lines.filter((l) => sellable.has(l.code)), droppedCodes: dropped });
      },
      dismissDropped: () => set({ droppedCodes: [] }),
    }),
    {
      name: CART_STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (s) => ({ lines: s.lines }),
      // Defensive: tolerate hand-edited / corrupted storage.
      merge: (persisted, current) => {
        const raw = (persisted as { lines?: unknown } | undefined)?.lines;
        const lines = Array.isArray(raw)
          ? raw
              .filter((l): l is CartLine => typeof l?.code === "string" && l.code !== "" && typeof l?.qty === "number")
              .map((l) => ({ code: l.code, qty: clampQty(l.qty, CART_MAX_QTY) }))
          : [];
        return { ...current, lines };
      },
      onRehydrateStorage: () => () => {
        useCartStore.setState({ hydrated: true });
      },
    },
  ),
);
