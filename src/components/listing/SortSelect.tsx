"use client";

/** Sort control (K-029). Hrefs are precomputed on the server; the select only navigates (no scroll jump). */
import { useRouter } from "next/navigation";
import { useId } from "react";
import { ArrowUpDown } from "@/components/ui/lucide";
import type { SortKey } from "@/lib/catalog/types";
import { useT } from "@/lib/ui-text/client";

const LABELS: Record<SortKey, string> = {
  onerilen: "listing.sort.recommended",
  "fiyat-artan": "listing.sort.priceAsc",
  "fiyat-azalan": "listing.sort.priceDesc",
  yeni: "listing.sort.new",
};

export function SortSelect({ value, hrefs, className = "" }: { value: SortKey; hrefs: Record<SortKey, string>; className?: string }) {
  const { t } = useT();
  const router = useRouter();
  const id = useId();
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <label htmlFor={id} className="sr-only">
        {t("listing.sort.label")}
      </label>
      <ArrowUpDown size={18} className="pointer-events-none absolute left-4 text-ink-muted" />
      <select
        id={id}
        value={value}
        onChange={(e) => router.push(hrefs[e.target.value as SortKey], { scroll: false })}
        className="min-h-control w-full appearance-none rounded-pill border border-line-strong bg-surface py-2 pl-11 pr-10 text-base text-ink transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:border-green-700"
      >
        {(Object.keys(LABELS) as SortKey[]).map((k) => (
          <option key={k} value={k}>
            {t(LABELS[k])}
          </option>
        ))}
      </select>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute right-4 size-4 text-ink-muted" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}
