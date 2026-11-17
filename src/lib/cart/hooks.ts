"use client";

import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { CHECKOUT_ENABLED } from "@/config/storefront";
import { useCartCatalog } from "./CartProvider";
import { useCartStore } from "./store";
import { computeCart, type CartTotals } from "./totals";

/** Resolved cart for the drawer: lines with live product data + totals (Toplam / Üye fiyatıyla toplam / Toplam PV). */
export function useCart(): CartTotals & { hydrated: boolean; isOpen: boolean; droppedCodes: string[] } {
  const catalog = useCartCatalog();
  const { lines, hydrated, isOpen, droppedCodes } = useCartStore(
    useShallow((s) => ({ lines: s.lines, hydrated: s.hydrated, isOpen: s.isOpen, droppedCodes: s.droppedCodes })),
  );
  const totals = useMemo(() => computeCart(lines, catalog), [lines, catalog]);
  return { ...totals, hydrated, isOpen, droppedCodes };
}

/** Header badge count. 0 until hydrated (no SSR mismatch). */
export function useCartCount(): number {
  return useCartStore((s) => (s.hydrated ? s.lines.reduce((a, l) => a + l.qty, 0) : 0));
}

/** Stable action references (do not cause re-renders). */
export function useCartActions() {
  return useCartStore(
    useShallow((s) => ({
      add: s.add,
      setQty: s.setQty,
      remove: s.remove,
      clear: s.clear,
      open: s.open,
      close: s.close,
      toggle: s.toggle,
      dismissDropped: s.dismissDropped,
    })),
  );
}

/** "Add to cart" helper: adds and opens the drawer. Only call for products with `sellable === true`. */
export function useAddToCart() {
  const add = useCartStore((s) => s.add);
  const open = useCartStore((s) => s.open);
  return (code: string, qty = 1) => {
    add(code, qty);
    open();
  };
}

/**
 * K-068 / K-088: checkout is disabled. The button stays focusable with aria-disabled and does nothing.
 * `onDisabledClick` is where the analytics event `checkout_disabled_click` will be sent (K-020).
 */
export function useCheckout() {
  return {
    enabled: CHECKOUT_ENABLED,
    buttonProps: {
      "aria-disabled": !CHECKOUT_ENABLED || undefined,
      onClick: (e: { preventDefault: () => void }) => {
        if (!CHECKOUT_ENABLED) e.preventDefault();
      },
    },
  } as const;
}
