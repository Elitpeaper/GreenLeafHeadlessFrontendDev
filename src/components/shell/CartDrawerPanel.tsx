"use client";

/**
 * Cart drawer panel — loaded lazily by CartDrawer.tsx (K-263). (bilesenler/cart-drawer.md, wireframe/sepet-drawer.md, K-031, K-059, K-062, K-068, K-079, K-088).
 * Native <dialog> (focus trap, Esc, inert background). Right side 28rem on desktop, full screen on mobile.
 * Checkout stays DISABLED: aria-disabled + describedby, focusable, click only highlights the explanation.
 * The ONE enabled action is the outlined "Üye ol, üye fiyatıyla al" -> /uye-ol.
 * Motion hooks: data-motion="cart-drawer" | "cart-line" | "cart-totals" | "checkout-note" (data-flash on click).
 */
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LeafCluster } from "@/components/brand/LeafCluster";
import { Money, PricePair } from "@/components/product/Price";
import { PvChip } from "@/components/product/PvChip";
import { ArrowRight, Info, Leaf, Lock, Minus, Plus, Trash2, X } from "@/components/ui/lucide";
import { CART_MAX_QTY } from "@/config/storefront";
import { useCart, useCartActions, useCheckout } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { useT } from "@/lib/ui-text/client";

export default function CartDrawerPanel() {
  const { t, tc } = useT();
  const cart = useCart();
  const { close, setQty, remove, add, dismissDropped } = useCartActions();
  const checkout = useCheckout();
  const ref = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const opener = useRef<Element | null>(null);
  const [undo, setUndo] = useState<{ code: string; qty: number } | null>(null);
  const [flash, setFlash] = useState(0);
  const [maxHit, setMaxHit] = useState<string | null>(null);
  const undoTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (cart.isOpen && !d.open) {
      opener.current = document.activeElement;
      d.showModal();
      titleRef.current?.focus();
      document.documentElement.style.overflow = "hidden";
    }
    if (!cart.isOpen && d.open) d.close();
  }, [cart.isOpen]);

  useEffect(() => () => window.clearTimeout(undoTimer.current), []);

  const onClose = () => {
    document.documentElement.style.overflow = "";
    close();
    if (opener.current instanceof HTMLElement) opener.current.focus();
  };

  const removeLine = (code: string, qty: number) => {
    remove(code);
    setUndo({ code, qty });
    window.clearTimeout(undoTimer.current);
    undoTimer.current = window.setTimeout(() => setUndo(null), 5000);
  };

  const empty = cart.hydrated && cart.lines.length === 0;
  const title = t("cart.title", { count: cart.count });

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close();
      }}
      aria-labelledby="cart-title"
      data-motion="cart-drawer"
      className="z-(--z-drawer) m-0 ml-auto h-dvh max-h-dvh w-full max-w-none bg-surface p-0 text-ink shadow-overlay backdrop:bg-ink/40 sm:max-w-drawer"
    >
      <div className="flex h-full flex-col">
        <div aria-hidden="true" className="grid h-1 shrink-0 grid-rows-[2px_1px_1px]">
          <span className="bg-stripe-1" />
          <span className="bg-stripe-2" />
          <span className="bg-stripe-3" />
        </div>
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
          <h2 id="cart-title" ref={titleRef} tabIndex={-1} className="text-2xl outline-none">
            {title}
          </h2>
          <button type="button" onClick={() => ref.current?.close()} aria-label={t("cart.close")} className="grid size-12 place-items-center rounded-pill transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-surface-muted">
            <X size={24} />
          </button>
        </div>

        {/* Notices */}
        <div aria-live="polite" className="shrink-0 empty:hidden">
          {cart.droppedCodes.length > 0 && (
            <p className="mx-5 mt-4 flex items-start gap-3 rounded-md bg-blue-50 p-3 text-sm">
              <Info size={20} className="mt-0.5 shrink-0 text-blue-700" />
              <span className="flex-1">{tc("cart.notice.removedUnavailable", cart.droppedCodes.length)}</span>
              <button type="button" onClick={dismissDropped} className="min-h-tap-min shrink-0 px-1 font-medium text-green-700 underline">
                {t("common.close")}
              </button>
            </p>
          )}
          {maxHit && <p className="mx-5 mt-4 rounded-md bg-blue-50 p-3 text-sm">{t("cart.notice.maxQty")}</p>}
        </div>

        {empty ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <LeafCluster className="w-40" />
            <p className="mt-4 font-display text-2xl">{t("cart.empty.title")}</p>
            <p className="mt-2 max-w-xs text-ink-muted">{t("cart.empty.body")}</p>
            <Link
              href="/koleksiyon/turkiyede-satista"
              onClick={() => ref.current?.close()}
              className="mt-6 inline-flex min-h-control items-center gap-2 rounded-pill bg-green-700 px-6 font-medium text-white shadow-button transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-green-800"
            >
              {t("cart.empty.cta")}
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {[...cart.lines].reverse().map((l) => {
                const p = l.product;
                const atMax = l.qty >= CART_MAX_QTY;
                return (
                  <li key={l.code} className="flex gap-3 py-4" data-motion="cart-line">
                    <Link href={p.href} onClick={() => ref.current?.close()} className="relative size-18 shrink-0 overflow-hidden rounded-md bg-accent-soft" tabIndex={-1} aria-hidden="true">
                      {p.image ? (
                        <span className="absolute inset-[10%]">
                          <Image src={p.image.src} alt="" fill sizes="72px" className="object-contain mix-blend-multiply" />
                        </span>
                      ) : (
                        <Leaf size={26} className="absolute inset-0 m-auto text-accent-decor" />
                      )}
                    </Link>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium uppercase tracking-eyebrow text-ink-muted">{p.brandTitle}</p>
                      <Link href={p.href} onClick={() => ref.current?.close()} className="line-clamp-2 text-base font-medium leading-snug transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:text-green-800">
                        {p.name}
                      </Link>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        <PricePair price={p.price} memberPrice={p.memberPrice} size="line" />
                        <PvChip value={p.pv} info={false} size="sm" />
                      </div>
                      <div className="mt-2 flex items-center justify-between gap-3">
                        <div className="inline-flex items-center rounded-pill ring-1 ring-line-strong">
                          {l.qty <= 1 ? (
                            <button type="button" onClick={() => removeLine(l.code, l.qty)} aria-label={t("cart.line.removeAria", { ad: p.name })} className="grid size-11 place-items-center rounded-pill text-ink-muted transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:text-danger">
                              <Trash2 size={18} />
                            </button>
                          ) : (
                            <button type="button" onClick={() => setQty(l.code, l.qty - 1)} aria-label={`${p.name}: ${t("product.qty.decrease")}`} className="grid size-11 place-items-center rounded-pill transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-surface-muted">
                              <Minus size={18} />
                            </button>
                          )}
                          <span className="min-w-8 text-center font-semibold tabular-nums">
                            <span className="sr-only">{t("product.qty.label")}: </span>
                            {l.qty}
                          </span>
                          <button
                            type="button"
                            aria-disabled={atMax || undefined}
                            onClick={() => {
                              if (atMax) setMaxHit(l.code);
                              else {
                                setMaxHit(null);
                                add(l.code, 1);
                              }
                            }}
                            aria-label={`${p.name}: ${t("product.qty.increase")}`}
                            title={atMax ? t("cart.line.maxHint") : undefined}
                            className={`grid size-11 place-items-center rounded-pill ${atMax ? "text-line-strong" : "transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-surface-muted"}`}
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                        <p className="text-right">
                          <span className="sr-only">{t("cart.line.lineTotal")}: </span>
                          <Money value={l.lineTotal} className="text-lg font-semibold" />
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
              {undo && (
                <li className="flex items-center justify-between py-3 text-sm text-ink-muted">
                  {t("cart.line.removed")}
                  <button
                    type="button"
                    onClick={() => {
                      add(undo.code, undo.qty);
                      setUndo(null);
                    }}
                    className="min-h-tap-min px-2 font-medium text-green-700 underline"
                  >
                    {t("cart.line.undo")}
                  </button>
                </li>
              )}
            </ul>

            {/* Sticky summary */}
            <div className="shrink-0 border-t border-line bg-surface px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_30px_-18px_rgb(28_36_29/0.25)]" data-motion="cart-totals">
              <p className="sr-only" aria-live="polite">
                {t("cart.live.totals", { total: formatPrice(cart.total), memberTotal: formatPrice(cart.memberTotal) })}
              </p>
              <dl className="space-y-1.5 sm:space-y-2">
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-base">{t("cart.totals.total")}</dt>
                  <dd>
                    <Money value={cart.total} className="text-xl font-semibold" />
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-base">{t("cart.totals.memberTotal")}</dt>
                  <dd className="rounded-md bg-green-700 px-3 py-1 text-white">
                    <Money value={cart.memberTotal} className="text-xl font-bold" />
                  </dd>
                </div>
                {cart.pv > 0 && (
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-base">{t("cart.totals.pv")}</dt>
                    <dd>
                      <PvChip value={cart.pv} placement="top" />
                    </dd>
                  </div>
                )}
              </dl>
              <p className="mt-2 text-xs text-ink-muted">{t("cart.totals.vatNote")}</p>

              <button
                type="button"
                {...checkout.buttonProps}
                onClick={(e) => {
                  checkout.buttonProps.onClick(e);
                  setFlash((n) => n + 1);
                }}
                aria-label={t("cart.checkout.aria")}
                aria-describedby="checkout-note"
                className="mt-3 flex min-h-control-lg w-full cursor-default items-center gap-3 rounded-pill border-[1.5px] border-dashed border-line-strong bg-surface-muted px-5 text-base font-semibold text-ink-muted"
              >
                <Lock size={20} />
                <span className="flex-1 text-left">{t("cart.checkout.label")}</span>
                <span className="rounded-pill bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">{t("cart.checkout.badge")}</span>
              </button>
              <p
                id="checkout-note"
                key={flash}
                data-motion="checkout-note"
                data-flash={flash > 0 ? "" : undefined}
                aria-live={flash > 0 ? "polite" : undefined}
                className={`mt-1.5 flex gap-2 rounded-md px-2 py-1.5 text-sm text-ink-muted ${flash > 0 ? "bg-accent-soft" : ""}`}
              >
                <Info size={18} className="mt-0.5 shrink-0 text-blue-700" />
                {t("cart.checkout.explain")}
              </p>

              <Link
                href="/uye-ol"
                onClick={() => ref.current?.close()}
                className="mt-2 flex min-h-control-lg w-full items-center justify-center gap-2 rounded-pill border-[1.5px] border-green-700 px-5 text-base font-semibold text-green-700 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-green-50"
              >
                {t("cart.membership.cta")}
                <ArrowRight size={18} />
              </Link>
              <button type="button" onClick={() => ref.current?.close()} className="mt-1 flex min-h-tap w-full items-center justify-center text-sm font-medium text-ink underline underline-offset-4 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:text-green-800">
                {t("cart.continue")}
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
