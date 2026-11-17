"use client";

/** Price range (K-029): two labelled number inputs, applied as ?fiyat=min-max. Only covers TR products (note). */
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { useT } from "@/lib/ui-text/client";

export function PriceFilter({
  baseHref,
  min,
  max,
  bounds,
}: {
  /** Current listing URL without the fiyat param. */
  baseHref: string;
  min?: number;
  max?: number;
  bounds: { min: number; max: number } | null;
}) {
  const { t } = useT();
  const router = useRouter();
  const [lo, setLo] = useState(min != null ? String(min) : "");
  const [hi, setHi] = useState(max != null ? String(max) : "");
  const id = useId();
  const apply = () => {
    const url = new URL(baseHref, "http://x");
    if (lo || hi) url.searchParams.set("fiyat", `${lo}-${hi}`);
    else url.searchParams.delete("fiyat");
    url.searchParams.delete("sayfa");
    router.push(url.pathname + url.search, { scroll: false });
  };
  const field = "h-12 w-full rounded-md border border-line-strong bg-surface px-3 text-base tabular-nums text-ink focus:border-green-700";
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        apply();
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor={`${id}-min`} className="mb-1 block text-sm text-ink-muted">
            {t("listing.filter.priceMin")}
          </label>
          <input id={`${id}-min`} inputMode="numeric" pattern="[0-9]*" value={lo} onChange={(e) => setLo(e.target.value.replace(/\D/g, ""))} placeholder={bounds ? String(Math.floor(bounds.min)) : undefined} className={field} />
        </div>
        <div>
          <label htmlFor={`${id}-max`} className="mb-1 block text-sm text-ink-muted">
            {t("listing.filter.priceMax")}
          </label>
          <input id={`${id}-max`} inputMode="numeric" pattern="[0-9]*" value={hi} onChange={(e) => setHi(e.target.value.replace(/\D/g, ""))} placeholder={bounds ? String(Math.ceil(bounds.max)) : undefined} className={field} />
        </div>
      </div>
      <button type="submit" className="mt-3 inline-flex min-h-tap w-full items-center justify-center rounded-pill border-[1.5px] border-green-700 font-medium text-green-700 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-green-50">
        {t("common.apply")}
      </button>
      <p className="mt-2 text-xs text-ink-muted">{t("listing.priceNote")}</p>
    </form>
  );
}
