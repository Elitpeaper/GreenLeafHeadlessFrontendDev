import Image from "next/image";
import Link from "next/link";
import { getStockImage } from "@/lib/images";
import { CategoryIllustration } from "@/components/illustrations/category-icons";
import { PatternLeafScatter } from "@/components/illustrations/patterns";
import type { CategoryNode } from "@/lib/products";
import { cssVars } from "@/lib/css";
import { t, tc } from "@/components/sections/copy";
import { Eyebrow } from "../parts";

/**
 * "Raflar" shelf wall (brief §4, replaces the v1 disc strip). 12 category roots as a bento of rounded tiles with the
 * custom category icons (K-209; no photos, K-161). 6 columns on desktop (Cilt Bakımı 2x2, Makyaj / Saç Bakımı / Setler
 * 2x1, the rest 1x1 = 18 cells), 3 columns on phones. Empty roots never reach this list (data layer hides them), the
 * dense grid reflows around them. Hover/focus: tile lifts and turns --accent-soft, icon blooms (data-svg-interact).
 * Text on tiles is ink / ink-muted (sand tile: ink only: ink-muted would be 3.79).
 */
type Size = "xl" | "wide" | "one";
const LAYOUT: Record<string, { size: Size; tint: string }> = {
  "cilt-bakimi": { size: "xl", tint: "bg-lime-100" },
  makyaj: { size: "wide", tint: "bg-blue-50" },
  "sac-bakimi": { size: "wide", tint: "bg-cream-100" },
  "vucut-bakimi": { size: "one", tint: "bg-green-50" },
  "agiz-ve-dis-bakimi": { size: "one", tint: "bg-surface" },
  setler: { size: "wide", tint: "bg-sand-300" },
  "ev-ve-temizlik": { size: "one", tint: "bg-blue-50" },
  "anne-ve-cocuk": { size: "one", tint: "bg-cream-100" },
  "hijyen-ve-kagit": { size: "one", tint: "bg-green-50" },
  "saglik-ve-takviye": { size: "one", tint: "bg-lime-100" },
  "mutfak-ve-gida": { size: "one", tint: "bg-surface" },
  "giyim-ve-aksesuar": { size: "one", tint: "bg-blue-50" },
};

const SPAN: Record<Size, string> = {
  xl: "col-span-3 md:col-span-2 md:row-span-2",
  wide: "col-span-2 md:col-span-2",
  one: "",
};
/** R-2: last two 1x1 tiles widen so the 4-column (md) and 3-column (phone) bentos end on full rows; lg stays 6 x 3. */
const FILL: Record<string, string> = {
  "giyim-ve-aksesuar": "col-span-2 md:col-span-2 lg:col-span-1",
  "mutfak-ve-gida": "md:col-span-2 lg:col-span-1",
};
const ICON: Record<Size, string> = {
  xl: "size-14 md:size-28 lg:size-36",
  wide: "size-12 md:size-14 lg:size-[4.5rem]",
  one: "size-12 md:size-14 lg:size-16",
};

export function Shelves({ roots }: { roots: CategoryNode[] }) {
  return (
    <section aria-labelledby="shelves-title" className="relative isolate overflow-hidden bg-cream-50 py-section">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <PatternLeafScatter strength={0.06} />
      </div>
      <div className="mx-auto max-w-page px-gutter">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <Eyebrow>{t("home.v2.shelves.eyebrow")}</Eyebrow>
            <h2 id="shelves-title" className="mt-4 text-display text-ink">
              {t("home.v2.shelves.title")}
            </h2>
          </div>
          <Link
            href="/urunler"
            className="inline-flex min-h-tap-min items-center gap-2 text-lg font-medium text-green-700 underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] duration-250 hover:decoration-current"
          >
            {t("home.v2.shelves.cta")} <span aria-hidden="true">→</span>
          </Link>
        </div>

        <ul className="mt-8 grid auto-rows-[7.5rem] grid-flow-dense grid-cols-3 gap-3 md:auto-rows-[9rem] md:grid-cols-4 lg:auto-rows-[11rem] lg:grid-cols-6 lg:gap-4">
          {roots.map((c, i) => {
            const def = LAYOUT[c.root] ?? { size: "one" as Size, tint: "bg-surface" };
            const photo = getStockImage(`shelf.${c.root}`);
            const sand = !photo && def.tint === "bg-sand-300";
            const onPhoto = !!photo;
            return (
              <li key={c.path} className={`${SPAN[def.size]} ${FILL[c.root] ?? ""}`}>
                <Link
                  href={c.href}
                  aria-label={t("home.v2.shelves.tileLabel", { ad: c.title, count: c.count })}
                  data-svg-host=""
                  data-motion="reveal"
                  style={cssVars({ "--i": i })}
                  className={`group relative isolate flex h-full flex-col justify-between overflow-hidden rounded-tile p-3 shadow-card ring-1 ring-line transition-[background-color,box-shadow,translate] duration-250 hover:shadow-lift motion-safe:hover:-translate-y-1 md:p-4 lg:p-5 ${photo ? "bg-forest-900" : `${def.tint} hover:bg-accent-soft`}`}
                >
                  {photo && (
                    <>
                      <Image
                        src={photo.src}
                        alt=""
                        fill
                        sizes={def.size === "xl" ? "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 17vw, (min-width: 768px) 25vw, 34vw"}
                        className="-z-10 object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                        placeholder={photo.blurDataURL ? "blur" : "empty"}
                        blurDataURL={photo.blurDataURL}
                      />
                      {/* K-270 scrim: forest-950 >= 70% behind the name (bottom), lighter on top */}
                      <span aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-forest-950/85 via-forest-950/70 via-45% to-forest-950/15 transition-opacity duration-250 group-hover:opacity-95" />
                    </>
                  )}
                  {def.size === "xl" && !photo && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-1 -top-3 hidden select-none text-[7rem] font-bold leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:2px_rgb(47_122_34/0.18)] md:block"
                    >
                      {c.count}
                    </span>
                  )}
                  {photo ? (
                    <span aria-hidden="true" className="relative grid size-10 shrink-0 place-items-center rounded-full bg-cream-50 text-forest-800 shadow-badge">
                      <CategoryIllustration slug={c.root} className="size-7" />
                    </span>
                  ) : (
                    <CategoryIllustration slug={c.root} className={`relative shrink-0 text-ink ${ICON[def.size]}`} />
                  )}
                  <span className="relative">
                    <span className={`font-semibold leading-snug ${onPhoto ? "text-white" : "text-ink"} ${def.size === "xl" ? "text-base md:text-3xl" : "text-sm md:text-xl lg:text-2xl"} ${def.size === "one" ? "line-clamp-3 md:text-lg lg:text-lg" : "block"}`}>
                      {c.title}
                    </span>
                    {(
                      <span className={`mt-0.5 hidden text-sm ${def.size === "one" ? "lg:block" : "md:block"} ${onPhoto ? "text-cream-100" : sand ? "text-ink" : "text-ink-muted"}`}>
                        {tc("home.v2.shelves.count", c.count)}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
