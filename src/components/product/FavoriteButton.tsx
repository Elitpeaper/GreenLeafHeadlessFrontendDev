"use client";

import { Heart } from "@/components/ui/lucide";
import { useT } from "@/lib/ui-text/client";
import { useFavoritesHydration, useFavoritesStore, useIsFavorite } from "./favorites";

/** Caller-supplied positioning replaces the default `relative` (otherwise both classes fight). */
const POSITIONED = /(^|\s)(absolute|fixed|sticky)(\s|$)/;

/** Heart toggle (product-card.md §3.5). 44×44 target, aria-pressed. Motion hook: data-motion="fav-pop". */
export function FavoriteButton({ slug, name, className = "" }: { slug: string; name: string; className?: string }) {
  const { t } = useT();
  useFavoritesHydration();
  const active = useIsFavorite(slug);
  const toggle = useFavoritesStore((s) => s.toggle);
  const label = active ? t("product.card.favoriteRemove") : t("product.card.favoriteAdd");
  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={active}
      aria-label={`${label}: ${name}`}
      title={label}
      data-motion="fav-pop"
      data-state={active ? "on" : "off"}
      className={`${POSITIONED.test(className) ? "" : "relative"} z-10 grid size-11 place-items-center rounded-pill bg-surface/85 text-ink shadow-xs backdrop-blur-sm transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-surface hover:text-green-700 ${className}`}
    >
      <Heart size={20} className={active ? "fill-green-700 text-green-700" : ""} />
    </button>
  );
}
