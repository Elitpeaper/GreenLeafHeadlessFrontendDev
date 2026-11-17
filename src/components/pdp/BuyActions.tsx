"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Minus, Plus } from "@/components/ui/lucide";
import { CART_MAX_QTY } from "@/config/storefront";
import { useAddToCart } from "@/lib/cart";

export interface BuyLabels {
  qty: string;
  increase: string;
  decrease: string;
  add: string;
  added: string;
  maxQty: string;
}

/**
 * Qty stepper (1–10, K-031) + the single primary CTA "Sepete ekle" (K-030). After adding: "Eklendi ✓" for 1.2 s,
 * drawer opens (useAddToCart). Motion hook M-12 / data-motion="added". The button id is observed by the sticky bar.
 */
export function BuyActions({ code, name, labels }: { code: string; name: string; labels: BuyLabels }) {
  const [qty, setQty] = useState(1);
  const [done, setDone] = useState(false);
  const add = useAddToCart();
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onAdd = () => {
    add(code, qty);
    setDone(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setDone(false), 1200);
  };

  const step =
    "grid size-12 place-items-center rounded-pill text-ink transition-colors duration-250 hover:bg-accent-soft aria-disabled:text-ink-muted aria-disabled:opacity-50";
  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <div role="group" aria-label={labels.qty} className="inline-flex items-center rounded-pill ring-1 ring-line-strong">
          <button
            type="button"
            className={step}
            aria-label={`${labels.decrease}: ${name}`}
            aria-disabled={qty <= 1 || undefined}
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            <Minus size={20} />
          </button>
          <output aria-live="polite" className="w-10 text-center text-lg font-semibold tabular-nums" data-motion="tick">
            {qty}
          </output>
          <button
            type="button"
            className={step}
            aria-label={`${labels.increase}: ${name}`}
            aria-disabled={qty >= CART_MAX_QTY || undefined}
            onClick={() => setQty((q) => Math.min(CART_MAX_QTY, q + 1))}
          >
            <Plus size={20} />
          </button>
        </div>
        {qty >= CART_MAX_QTY && <p className="text-sm text-ink-muted">{labels.maxQty}</p>}
      </div>
      <button
        id="pdp-primary-cta"
        type="button"
        onClick={onAdd}
        data-motion="M-12"
        data-state={done ? "done" : "idle"}
        className="inline-flex min-h-control-lg w-full items-center justify-center gap-2 rounded-pill bg-green-700 px-8 text-lg font-medium text-white shadow-button transition-[background-color,scale] duration-250 hover:bg-green-800 motion-safe:active:scale-[0.99]"
      >
        {done ? (
          <>
            <Check size={22} /> {labels.added}
          </>
        ) : (
          labels.add
        )}
      </button>
    </div>
  );
}

/**
 * Mobile sticky bar (< 1024 px, wireframe §9): appears when the buy-box CTA scrolls out of view.
 * TR: thumbnail + "Üye fiyatı · Fiyat" + Sepete ekle. Yakında: badge text + "Benzerlerini gör".
 */
export function StickyBar({
  targetId,
  children,
}: {
  targetId: string;
  children: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShow(!!e && !e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [targetId]);
  return (
    <div
      data-motion="slide-panel"
      data-state={show ? "open" : "closed"}
      aria-hidden={!show}
      inert={!show}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 px-gutter pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-overlay backdrop-blur transition-transform duration-200 lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {children}
    </div>
  );
}

/** Sticky-bar add button (same action as the buy box, qty 1). */
export function StickyAdd({ code, label }: { code: string; label: string }) {
  const add = useAddToCart();
  return (
    <button
      type="button"
      onClick={() => add(code, 1)}
      className="inline-flex min-h-control shrink-0 items-center justify-center rounded-pill bg-green-700 px-5 font-medium text-white transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-green-800"
    >
      {label}
    </button>
  );
}
