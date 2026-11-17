/**
 * "Cilt tipine göre" chip strip (kategori.md §4, skin-finder.md §0, K-081/K-089): Kuru · Yağlı · Karma · Normal · Hassas.
 * Chips toggle the `tip` filter (same as the filter group); the strip ends with a link to the finder.
 */
import Link from "next/link";
import { ArrowRight, Check, Sprout } from "@/components/ui/lucide";
import { SKIN_TYPES } from "@/lib/catalog/skin";
import { t } from "@/lib/ui-text";
import { listingHref, toggle, type ListingState } from "./url";

export function SkinTypeChips({ basePath, state }: { basePath: string; state: ListingState }) {
  const first = state.skinType?.[0];
  return (
    <div className="mt-5 rounded-lg bg-blue-50 p-3 sm:p-4">
      <div className="flex items-center gap-3 overflow-x-auto [scrollbar-width:none]">
        <p className="flex shrink-0 items-center gap-2 pr-1 text-sm font-semibold text-ink">
          <Sprout size={20} className="text-blue-700" />
          {t("listing.skinTypeChips.title")}
        </p>
        <ul className="flex shrink-0 gap-2">
          {SKIN_TYPES.map((s) => {
            const on = !!state.skinType?.includes(s.slug);
            return (
              <li key={s.slug}>
                <Link
                  href={listingHref(basePath, state, { skinType: toggle(state.skinType, s.slug) })}
                  scroll={false}
                  aria-current={on ? "true" : undefined}
                  className={`inline-flex min-h-tap-min items-center gap-1.5 rounded-pill px-4 text-sm font-medium ring-1 ${
                    on ? "bg-blue-800 text-white ring-blue-800" : "bg-surface text-ink ring-line transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:ring-blue-700"
                  }`}
                >
                  {on && <Check size={16} />}
                  {t(`finder.skinType.${s.slug}.name`)}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href={first ? `/cilt-tipine-gore?tip=${first}` : "/cilt-tipine-gore"}
          className="ml-auto inline-flex min-h-tap-min shrink-0 items-center gap-1.5 pl-2 text-sm font-medium text-blue-800 underline-offset-4 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:underline"
        >
          {t("listing.finderLink")}
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
