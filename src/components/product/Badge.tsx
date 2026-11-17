"use client";

import type { ReactNode } from "react";
import { Gem, Sprout } from "@/components/ui/lucide";
import { useT } from "@/lib/ui-text/client";

/**
 * Product badge (product-card.md §3, K-174 refresh). Real text, never an image. At most ONE per card.
 * Pill, small caps-style label; contrast pairs unchanged:
 *   comingSoon — blue-100 / blue-800 (7.14) + sprout icon (not a clock)
 *   new / set  — green-50 / green-800
 *   soldOut    — surface-muted / ink (K-025, not triggered yet)
 *   premium    — gold-50 / gold-800 (premium-gold theme only)
 * `floating` = sits on an image tile (adds a soft shadow + hairline so it reads on any tint).
 */
export type BadgeTone = "comingSoon" | "new" | "set" | "soldOut" | "premium";

const STYLES: Record<BadgeTone, string> = {
  comingSoon: "bg-blue-100 text-blue-800",
  new: "bg-green-50 text-green-800",
  set: "bg-green-50 text-green-800",
  soldOut: "bg-surface-muted text-ink",
  premium: "bg-gold-50 text-gold-800",
};

const LABEL_KEYS: Record<BadgeTone, string> = {
  comingSoon: "product.badge.comingSoon",
  new: "product.badge.new",
  set: "product.badge.set",
  soldOut: "product.badge.soldOut",
  premium: "product.badge.premium",
};

export function Badge({
  tone,
  children,
  label,
  floating = false,
  className = "",
}: {
  tone: BadgeTone;
  children?: ReactNode;
  /** Overrides the default label text (e.g. "Çok yakında" for a TR product that is not sellable yet). */
  label?: string;
  floating?: boolean;
  className?: string;
}) {
  const { t } = useT();
  return (
    <span
      className={`inline-flex min-h-6 items-center gap-1 rounded-pill px-2.5 py-0.5 text-xs font-semibold leading-tight tracking-wide ${STYLES[tone]} ${
        floating ? "shadow-xs ring-1 ring-surface/70" : ""
      } ${className}`}
    >
      {tone === "comingSoon" && <Sprout size={14} className="shrink-0" />}
      {tone === "premium" && <Gem size={14} className="shrink-0" />}
      <span className="truncate">{children ?? label ?? t(LABEL_KEYS[tone])}</span>
    </span>
  );
}
