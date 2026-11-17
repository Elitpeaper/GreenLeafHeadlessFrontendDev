"use client";

/**
 * Price primitives (K-036, K-059, K-062, tasarim-kurallari §10, product-card.md §2). Isomorphic (server + client).
 *
 * STABLE API (Developer B imports these — do not break):
 *
 *   <Money value={1299.9} />                                  // "₺1.299,90" visible, "1.299,90 TL" for screen readers
 *
 *   <PricePair price={p.price} memberPrice={p.memberPrice} size="card" />
 *       Two LABELLED prices: "Fiyat ₺X" (ink) + green-700 badge "Üye fiyatı ₺Y" (invariant, never themed).
 *       Renders nothing unless BOTH values exist — a member price is never shown alone.
 *       size: "card" (container query: side by side ≥ 220px, stacked below) · "mini" (one line, small)
 *             · "line" (cart line, small two-label row) · "lg" (PDP buy box)
 *
 *   <PriceBlock price memberPrice pv availability size="card" />
 *       The full block every product surface uses: PricePair + PvChip. For availability "yakinda": no prices,
 *       the "price announced later" line + PV chip (K-052, K-062). `pvInfo={false}` hides the ⓘ popover.
 *
 * No strike-through, no percentage, no "savings" anywhere (K-036). Never put a price on a dark/gold surface.
 */
import { formatPrice } from "@/lib/format";
import type { Availability } from "@/lib/catalog/types";
import { useT } from "@/lib/ui-text/client";
import { PvChip, type PvChipSize } from "./PvChip";

export type PriceSize = "card" | "mini" | "line" | "lg";

export function Money({ value, className = "" }: { value: number; className?: string }) {
  const text = formatPrice(value);
  return (
    <span className={`tabular-nums ${className}`}>
      <span aria-hidden="true">{text}</span>
      <span className="sr-only">{text.replace("₺", "")} TL</span>
    </span>
  );
}

export interface PricePairProps {
  price: number | null | undefined;
  memberPrice: number | null | undefined;
  size?: PriceSize;
  className?: string;
}

export function PricePair({ price, memberPrice, size = "card", className = "" }: PricePairProps) {
  const { t } = useT();
  if (price == null || memberPrice == null) return null;
  const priceLabel = t("product.price.label");
  const memberLabel = t("product.memberPrice.label");

  if (size === "mini") {
    return (
      <dl className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-sm ${className}`}>
        <div className="flex items-baseline gap-1">
          <dt className="text-xs text-ink-muted">{priceLabel}</dt>
          <dd>
            <Money value={price} className="font-semibold text-ink" />
          </dd>
        </div>
        <div className="flex items-baseline gap-1 rounded-sm bg-green-700 px-2 py-0.5 text-xs font-semibold text-white">
          <dt>{memberLabel}</dt>
          <dd>
            <Money value={memberPrice} />
          </dd>
        </div>
      </dl>
    );
  }

  if (size === "line") {
    return (
      <dl className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-sm ${className}`}>
        <div className="flex items-baseline gap-1">
          <dt className="text-ink-muted">{priceLabel}</dt>
          <dd>
            <Money value={price} className="font-medium text-ink" />
          </dd>
        </div>
        <div className="flex items-baseline gap-1 rounded-sm bg-green-700 px-2 py-0.5 text-xs font-semibold text-white">
          <dt>{memberLabel}</dt>
          <dd>
            <Money value={memberPrice} />
          </dd>
        </div>
      </dl>
    );
  }

  if (size === "lg") {
    return (
      <dl className={`flex flex-wrap items-end gap-x-6 gap-y-3 ${className}`}>
        <div>
          <dt className="text-sm font-medium text-ink-muted">{priceLabel}</dt>
          <dd className="text-2xl font-semibold leading-tight text-ink">
            <Money value={price} />
          </dd>
        </div>
        <div className="rounded-md bg-green-700 px-4 py-2 text-white shadow-button">
          <dt className="text-sm font-medium leading-tight">{memberLabel}</dt>
          <dd className="text-2xl font-bold leading-tight">
            <Money value={memberPrice} />
          </dd>
        </div>
      </dl>
    );
  }

  // "card" (K-174): container query — side by side when the card body is ≥ 220px wide; below that (360px, 2 columns)
  // two compact rows with the label left and the amount right, so nothing wraps.
  return (
    <div className={`@container ${className}`}>
      <dl className="flex flex-col gap-1.5 @min-[220px]:flex-row @min-[220px]:items-end @min-[220px]:justify-between @min-[220px]:gap-3">
        <div className="flex items-baseline justify-between gap-2 px-0.5 @min-[220px]:block @min-[220px]:px-0">
          <dt className="text-xs font-medium text-ink-muted">{priceLabel}</dt>
          <dd className="text-sm font-semibold leading-tight text-ink @min-[220px]:text-base">
            <Money value={price} />
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-2 rounded-md bg-green-700 px-2.5 py-1.5 text-white @min-[220px]:block @min-[220px]:px-3 @min-[220px]:text-right">
          <dt className="text-xs font-medium leading-tight">{memberLabel}</dt>
          <dd className="text-sm font-bold leading-tight @min-[220px]:text-base">
            <Money value={memberPrice} />
          </dd>
        </div>
      </dl>
    </div>
  );
}

export interface PriceBlockProps {
  price: number | null | undefined;
  memberPrice: number | null | undefined;
  pv: number | null | undefined;
  availability: Availability;
  size?: PriceSize;
  /** ⓘ popover on the PV chip (default: true except "mini"/"line"). */
  pvInfo?: boolean;
  className?: string;
}

const PV_SIZE: Record<PriceSize, PvChipSize> = { card: "md", mini: "sm", line: "sm", lg: "lg" };

export function PriceBlock({ price, memberPrice, pv, availability, size = "card", pvInfo, className = "" }: PriceBlockProps) {
  const { t } = useT();
  const comingSoon = availability === "yakinda";
  const info = pvInfo ?? (size === "card" || size === "lg");
  const chip = <PvChip value={pv} comingSoon={comingSoon} info={info} size={PV_SIZE[size]} placement={size === "lg" ? "bottom" : "top"} />;

  if (comingSoon) {
    return (
      <div className={`flex flex-col items-start gap-2 ${className}`}>
        <p
          className={
            size === "card"
              ? "w-full rounded-md bg-blue-50 px-2.5 py-1.5 text-xs leading-snug text-blue-800"
              : size === "mini"
                ? "text-xs text-ink-muted"
                : "text-sm text-ink-muted"
          }
        >
          {t("product.card.priceHidden")}
        </p>
        {size === "card" ? <div className="min-h-8">{chip}</div> : chip}
      </div>
    );
  }
  return (
    <div className={`flex items-start gap-2 ${size === "mini" ? "flex-row flex-wrap items-center" : "flex-col"} ${size === "lg" ? "gap-3" : ""} ${className}`}>
      <PricePair price={price} memberPrice={memberPrice} size={size} className={size === "card" ? "w-full" : ""} />
      {chip}
    </div>
  );
}
