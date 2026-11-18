"use client";

/**
 * PV chip (K-062, K-098, product-card.md §2): lime-100 / lime-700 (5.57), pill, "PV 12,5" + ⓘ.
 *
 * API (stable — Developer B imports this):
 *   <PvChip value={product.pv} />                         // with info popover (default)
 *   <PvChip value={pv} comingSoon />                      // adds "Türkiye'de satışa çıktığında değişebilir."
 *   <PvChip value={pv} info={false} size="sm" />           // static chip (mini cards, cart lines, search rows)
 *   <PvChip value={pv} size="lg" />                        // PDP / PV page
 * Renders NOTHING when value is null (K-098). Never animate the value colour; motion hook data-motion="pv-chip".
 */
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { formatPv } from "@/lib/format";
import { useT } from "@/lib/ui-text/client";

export type PvChipSize = "sm" | "md" | "lg";

export interface PvChipProps {
  value: number | null | undefined;
  comingSoon?: boolean;
  /** Show the ⓘ popover button (default true). */
  info?: boolean;
  size?: PvChipSize;
  /** Popover side; "top" suits cards (chip sits near the bottom). */
  placement?: "top" | "bottom";
  className?: string;
}

const SIZE: Record<PvChipSize, string> = {
  sm: "min-h-7 px-2.5 text-xs",
  md: "min-h-8 px-3 text-xs",
  lg: "min-h-10 px-4 text-sm",
};

export function PvChip({ value, comingSoon = false, info = true, size = "md", placement = "top", className = "" }: PvChipProps) {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLSpanElement>(null);
  const popId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        wrap.current?.querySelector("button")?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  if (value == null) return null;
  const label = `PV ${formatPv(value)}`;
  const chipClass = `inline-flex items-center gap-1.5 rounded-pill bg-lime-100 font-semibold tabular-nums text-lime-700 ${SIZE[size]}`;

  if (!info) {
    return (
      <span className={`${chipClass} ${className}`} data-motion="pv-chip">
        <span aria-hidden="true">{label}</span>
        <span className="sr-only">{t("common.pvAria", { value: formatPv(value) })}</span>
      </span>
    );
  }

  return (
    <span
      ref={wrap}
      className={`relative z-10 inline-flex ${className}`}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={popId}
        aria-label={`${t("common.pvAria", { value: formatPv(value) })}. ${t("product.pv.infoButton")}`}
        onClick={() => setOpen((o) => !o)}
        data-motion="pv-chip"
        className={`${chipClass} relative transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-lime-50 before:absolute before:-inset-y-2 before:inset-x-0 before:content-[''] after:grid after:shrink-0 after:place-items-center after:rounded-full after:border-[1.5px] after:border-current after:font-bold after:leading-none after:content-['i'] ${size === "lg" ? "after:size-[18px] after:text-xs" : "after:size-4 after:text-[0.6875rem]"}`}
      >
        {label}
      </button>
      {open && (
        <span
          id={popId}
          role="note"
          data-motion="popover"
          className={`absolute left-0 z-30 w-64 rounded-md bg-surface p-4 text-sm font-normal text-ink shadow-overlay ring-1 ring-line ${
            placement === "top" ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          <span className="block">{t("product.pv.tooltip")}</span>
          {comingSoon && <span className="mt-1.5 block text-ink-muted">{t("product.pv.tooltipComingSoon")}</span>}
          <Link
            href="/pv-nedir"
            className="mt-2 inline-flex min-h-tap-min items-center font-medium text-green-700 underline underline-offset-4 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:text-green-800"
          >
            {t("product.pv.learnMore")} →
          </Link>
        </span>
      )}
    </span>
  );
}
