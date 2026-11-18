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

  // "card" (K-174, K-288 flat DOM): a flat grid — dt/dd pairs without wrapper elements (the card is the size container).
  // Narrow (2 columns at 360px): two rows, label left / amount right. >= 220px: two columns, label over amount.
  // The member badge is painted by its own dt (rounded left / top) and dd (rounded right / bottom).
  const text = formatPrice(price);
  const memberText = formatPrice(memberPrice);
  const sr = (v: string) => `${v.replace("₺", "")} TL`;
  return (
    <dl
      className={`grid grid-cols-[auto_1fr] items-baseline gap-y-1.5 @min-[220px]:grid-flow-col @min-[220px]:grid-cols-none @min-[220px]:grid-rows-[auto_auto] @min-[220px]:justify-between @min-[220px]:gap-x-3 @min-[220px]:gap-y-0 ${className}`}
    >
      <dt className="px-0.5 text-xs font-medium text-ink-muted @min-[220px]:px-0">{priceLabel}</dt>
      <dd aria-label={sr(text)} className="px-0.5 text-right text-sm font-semibold leading-tight tabular-nums text-ink @min-[220px]:px-0 @min-[220px]:text-left @min-[220px]:text-base">
        {text}
      </dd>
      <dt className="rounded-l-md bg-green-700 py-1.5 pl-2.5 text-xs font-medium leading-tight text-white @min-[220px]:rounded-t-md @min-[220px]:rounded-bl-none @min-[220px]:px-3 @min-[220px]:pb-0 @min-[220px]:text-right">
        {memberLabel}
      </dt>
      <dd
        aria-label={sr(memberText)}
        className="rounded-r-md bg-green-700 py-1.5 pr-2.5 text-right text-sm font-bold leading-tight tabular-nums text-white @min-[220px]:rounded-l-none @min-[220px]:rounded-br-md @min-[220px]:px-3 @min-[220px]:pt-0"
      >
        {memberText}
      </dd>
    </dl>
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
  if (size === "card") {
    // K-288: no wrapper — the card is already a flex column; the caller's className positions the prices (mt-auto, margins).
    return (
      <>
        <PricePair price={price} memberPrice={memberPrice} size="card" className={className} />
        <PvChip value={pv} info={info} size={PV_SIZE.card} placement="top" className="mx-0.5 mt-2 self-start" />
      </>
    );
  }
  return (
    <div className={`flex items-start gap-2 ${size === "mini" ? "flex-row flex-wrap items-center" : "flex-col"} ${size === "lg" ? "gap-3" : ""} ${className}`}>
      <PricePair price={price} memberPrice={memberPrice} size={size} className="" />
      {chip}
    </div>
  );
}
