"use client";

/**
 * The single "Sepete ekle" CTA (K-030). Render ONLY for product.sellable === true.
 *   <AddToCartButton code={p.code} name={p.name} />                 // full width, 48px
 *   <AddToCartButton code name size="lg" qty={n} />                  // PDP: 56px
 *   <AddToCartButton code name variant="quick" />                    // ProductCard (K-174): round bag button on the
 *                                                                       image, always visible; grows into a labelled
 *                                                                       pill on card hover / keyboard focus
 * Adds, opens the drawer (useAddToCart) and flips to "Eklendi ✓" for 1.2s (motion hook data-state="added").
 * Primary button colour is invariant green-700 (K-072) — never themed.
 * `cardResponsive` is kept for API compatibility (label follows the @container/card width).
 */
import { useEffect, useRef, useState } from "react";
import { Check, ShoppingBag } from "@/components/ui/lucide";
import { useAddToCart } from "@/lib/cart";
import { useT } from "@/lib/ui-text/client";

export function AddToCartButton({
  code,
  name,
  qty = 1,
  size = "md",
  variant = "default",
  className = "",
  cardResponsive = false,
}: {
  code: string;
  /** Product name for the accessible label "{ad} ürününü sepete ekle". Strongly recommended. */
  name?: string;
  qty?: number;
  size?: "md" | "lg";
  variant?: "default" | "quick";
  className?: string;
  /** Inside ProductCard (@container/card): label shortens to "Ekle" below 200px. */
  cardResponsive?: boolean;
}) {
  const { t } = useT();
  const add = useAddToCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onClick = () => {
    add(code, qty);
    setAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1200);
  };
  const aria = name ? t("product.card.addToCartAria", { ad: name }) : undefined;

  if (variant === "quick") {
    // K-272: the round bag button opens into a labelled "Sepete ekle" pill on card hover / keyboard focus / after adding.
    // The pill is a SIBLING behind the button (the motion layer gives [data-motion=add-to-cart] overflow:hidden for its
    // shine): a clip window ([data-qa-pill]) whose inner pill slides out from under the button — transform only, no
    // layout animation (motion.css "K-272 quick add"). Gentle tier: the pill fades in place.
    return (
      <span data-qa="" data-state={added ? "added" : "idle"} className={`group/qa relative z-10 inline-flex ${className}`}>
        <span aria-hidden="true" data-qa-pill="">
          <span>{added ? t("product.card.added") : t("product.card.addToCart")}</span>
        </span>
        <button
          type="button"
          onClick={onClick}
          aria-label={aria ?? t("product.card.addToCart")}
          data-motion="add-to-cart"
          data-state={added ? "added" : "idle"}
          className="relative inline-flex size-11 items-center justify-center rounded-pill bg-green-700 text-white shadow-button transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-green-800 active:bg-green-800"
        >
          {added ? <Check size={20} /> : <ShoppingBag size={20} />}
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={aria}
      data-motion="add-to-cart"
      data-state={added ? "added" : "idle"}
      className={`relative z-10 inline-flex w-full items-center justify-center gap-2 rounded-pill bg-green-700 px-4 font-medium text-white shadow-button transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-green-800 active:bg-green-800 ${
        size === "lg" ? "min-h-control-lg text-lg" : "min-h-control text-base"
      } ${className}`}
    >
      {added ? <Check size={20} /> : <ShoppingBag size={20} />}
      {added ? (
        <span>{t("product.card.added")}</span>
      ) : cardResponsive ? (
        <>
          <span className="hidden @min-[200px]/card:inline">{t("product.card.addToCart")}</span>
          <span className="@min-[200px]/card:hidden">{t("product.card.addShort")}</span>
        </>
      ) : (
        <span>{t("product.card.addToCart")}</span>
      )}
    </button>
  );
}
