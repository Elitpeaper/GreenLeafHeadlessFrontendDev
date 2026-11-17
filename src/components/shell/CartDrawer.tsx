"use client";

/**
 * Cart drawer shell. The drawer itself (CartDrawerPanel: dialog, lines, totals, next/image, PvChip) loads lazily:
 * at browser idle after first paint, or immediately when the cart is opened (button, `?sepet=ac`). Keeping it out
 * of the first-load bundle is part of the K-263 JS budget. The panel opens itself on mount because `isOpen` is true.
 */
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";

const loadPanel = () => import("./CartDrawerPanel");
const CartDrawerPanel = dynamic(loadPanel, { ssr: false });

export function CartDrawer() {
  const cart = useCart();
  const [seen, setSeen] = useState(false);
  if (cart.isOpen && !seen) setSeen(true);

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 2500));
    const id = idle(() => void loadPanel());
    return () => (window.cancelIdleCallback ?? window.clearTimeout)(id);
  }, []);

  return seen ? <CartDrawerPanel /> : null;
}
