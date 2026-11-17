/**
 * Mega menu / mobile drawer promo tile (zone 4, mega-menu.md §1.4). Editorial only: no %, no countdown, no urgency.
 * No AI imagery (K-102): an illustrated tile (icon + leaf motif) unless the campaign config supplies an image.
 * Text never sits on an image; it lives on the panel below.
 */
import Image from "next/image";
import Link from "next/link";
import { GoldRule } from "@/components/brand/ornaments";
import { IconBadge, type BadgeGlyph } from "@/components/illustrations/badges";
import { PatternLeafVeinEmboss } from "@/components/illustrations/patterns";
import { ArrowRight, Gem } from "@/components/ui/lucide";
import { t } from "@/lib/ui-text";
import type { MenuPromo } from "./menu-data";

const COPY: Record<Exclude<MenuPromo["kind"], "campaign">, { title: string; body: string; cta: string }> = {
  finder: { title: "megaMenu.finder.title", body: "megaMenu.finder.body", cta: "megaMenu.finder.cta" },
  inStock: { title: "megaMenu.inStock.title", body: "megaMenu.inStock.body", cta: "megaMenu.promo.cta" },
  pv: { title: "megaMenu.pv.title", body: "megaMenu.pv.body", cta: "megaMenu.promo.cta" },
  sets: { title: "megaMenu.sets.title", body: "megaMenu.sets.body", cta: "megaMenu.promo.cta" },
};

export function PromoTile({ promo, onNavigate, className = "" }: { promo: MenuPromo; onNavigate?: () => void; className?: string }) {
  const copy =
    promo.kind === "campaign"
      ? { title: promo.title ?? "", body: promo.text ?? "", cta: t("megaMenu.promo.cta") }
      : { title: t(COPY[promo.kind].title), body: t(COPY[promo.kind].body), cta: t(COPY[promo.kind].cta) };
  const gold = promo.kind === "sets";
  // K-189 / K-188: reference-language tile — forest or earth gradient + cream icon badge (brown only as a tile, never a ground).
  const glyph: BadgeGlyph = promo.kind === "finder" ? "drop" : promo.kind === "inStock" ? "leaf" : promo.kind === "pv" ? "pv" : "member";

  return (
    <Link
      href={promo.href}
      onClick={onNavigate}
      data-theme={gold ? "premium-gold" : undefined}
      className={`group/promo block overflow-hidden rounded-tile bg-surface shadow-card ring-1 ring-line transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:shadow-tile-hover ${className}`}
    >
      {promo.photo ? (
        <span aria-hidden="true" className="relative block h-28 overflow-hidden">
          <Image src={promo.photo.src} alt="" fill sizes="320px" className="object-cover" placeholder={promo.photo.blurDataURL ? "blur" : "empty"} blurDataURL={promo.photo.blurDataURL} />
        </span>
      ) : (
      <span
        aria-hidden="true"
        className={`relative flex h-24 items-center justify-center overflow-hidden ${
          gold
            ? "bg-(image:--gradient-forest-depth)"
            : promo.kind === "pv" || promo.kind === "campaign"
              ? "bg-[linear-gradient(150deg,var(--color-earth-600),var(--color-earth-700))]"
              : "bg-[linear-gradient(135deg,var(--color-forest-600),var(--color-forest-800))]"
        }`}
      >
        {!gold && <PatternLeafVeinEmboss className="pointer-events-none absolute inset-0 size-full opacity-60" />}
        {gold && <span className="absolute -right-6 -top-6 size-28 rounded-full bg-(image:--gradient-gold-glow)" />}
        {gold ? (
          <span className="relative grid size-14 place-items-center rounded-full bg-forest-950 text-gold-300 ring-1 ring-gold-400/60">
            <Gem size={26} />
          </span>
        ) : (
          <IconBadge glyph={glyph} tone="cream" className="relative size-14" />
        )}
        {gold && <GoldRule className="absolute inset-x-6 bottom-3" />}
      </span>
      )}
      <span className="block p-4">
        <span className="block text-base font-semibold leading-snug text-ink">{copy.title}</span>
        <span className="mt-1 block text-sm text-ink-muted">{copy.body}</span>
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-green-700 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 group-hover/promo:underline">
          {copy.cta}
          <ArrowRight size={16} />
        </span>
      </span>
    </Link>
  );
}
