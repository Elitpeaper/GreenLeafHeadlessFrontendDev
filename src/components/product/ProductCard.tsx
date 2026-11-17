/**
 * ProductCard — the site's ONE product card (product-card.md, K-030, K-036, K-062, K-174 redesign). Isomorphic.
 *
 * STABLE API (Developer B imports these — do not break):
 *
 *   import { ProductCard, ProductCardMini, ProductCardSkeleton } from "@/components/product/ProductCard";
 *
 *   <ProductCard product={p} />                    p: ProductSummary from "@/lib/products"
 *     priority?: boolean       — LCP card (first row of a hero rail)
 *     sizes?: string           — next/image sizes; default fits the 2/3/4-column grid. Rails: pass e.g.
 *                                "(min-width:1024px) 300px, 78vw"
 *     headingLevel?: 2|3|4     — default 3 (card sits under a section h2)
 *     className?: string
 *   Variants are automatic from data:
 *     availability "yakinda" → "Türkiye'ye yakında" badge, no prices, PV chip, no cart button
 *     theme "premium-gold"    → gold foil tile, gold glow + double rule, "Premium" eyebrow (prices/CTA unchanged)
 *     accent (palette)        → tile tint + hover band in product colours; root carries data-accent so the card is a
 *                                hover-recolor TRIGGER inside any [data-accent-zone] (Z3 vitrin)
 *     hoverImage (optional)   → if the data layer provides `hoverImage`, it cross-fades in on hover
 *
 *   <ProductCardMini product={p} />                horizontal link card (mega menu, search panel, empty cart)
 *     p: ProductSummary | SearchHit-like (MiniProduct). size?: "sm" | "md"; showPrice?: boolean (default true)
 *
 *   <ProductCardSkeleton />                        same footprint, CLS 0 (motion hook data-motion="skeleton")
 *
 * K-174 anatomy (docs/tasarim/kart-ilham.md): frameless card; the 4:5 image tile carries the tint, shadow and all
 * overlays (badge top-left, heart top-right, detail panel + quick add bottom). The cart action is ALWAYS visible
 * (round bag button) and grows into a labelled "Sepete ekle" pill on hover/focus — it is never hidden behind hover.
 * Body: brand eyebrow · name (2 lines reserved) · meta (1 line reserved) · prices pinned to the bottom (mt-auto),
 * so every card in a row lines up.
 *
 * Whole card links to the PDP via the title link's ::after; favourite + add-to-cart sit above it (z-10).
 * Motion hooks (hareket-tasarimcisi): data-product-card, data-motion="card-media" | "card-band" | "card-reveal".
 */
import Link from "next/link";
import { GoldDoubleRule } from "@/components/brand/ornaments";
import { AddToCartButton } from "@/components/shell/AddToCartButton";
import { ArrowRight } from "@/components/ui/lucide";
import type { ProductSummary } from "@/lib/catalog/types";
import { accentTriggerProps } from "@/lib/theme/accent";
import { accentStyle } from "@/lib/theme/palette";
import { t } from "@/lib/ui-text";
import { Badge } from "./Badge";
import { MediaFallback, ProductImage } from "./ProductCardParts";
import { FavoriteButton } from "./FavoriteButton";
import { PriceBlock } from "./Price";

export const CARD_GRID_SIZES = "(min-width: 1280px) 290px, (min-width: 1024px) 24vw, (min-width: 640px) 32vw, 46vw";

/** K-231: shared reveal transition. Opacity always fades (~0.25 s, also under reduced motion); translate only with motion. */
const REVEAL =
  "transition-opacity duration-250 ease-(--ease-out-expo) motion-safe:transition-[opacity,translate] motion-safe:duration-(--duration-base)";

export interface ProductCardProps {
  product: ProductSummary;
  priority?: boolean;
  sizes?: string;
  headingLevel?: 2 | 3 | 4;
  /**
   * Surface the card sits on (K-186: the card itself is always white).
   *   "default" — white page, frameless card (K-200).
   *   "plate"   — cream / tinted light surface (e.g. home Vitrin 2 on cream-50): white plate behind the whole card.
   *   "forest"  — dark forest surface (K-189): white plate + forest-toned shadow.
   */
  surface?: "default" | "plate" | "forest";
  className?: string;
}

export function ProductCard({ product: p, priority = false, sizes = CARD_GRID_SIZES, headingLevel = 3, surface = "default", className = "" }: ProductCardProps) {
  const H = `h${headingLevel}` as "h2" | "h3" | "h4";
  const titleId = `pc-${p.id}`;
  // A-3: a TR product that is not sellable (price-implausible, no price, publishReady=false in preview) never shows price or cart.
  const notSellable = p.availability === "tr" && !p.sellable;
  const comingSoon = p.availability === "yakinda" || notSellable;
  const premium = p.theme === "premium-gold";
  const badge = comingSoon ? "comingSoon" : p.isSet && !premium ? "set" : null;
  const second = (p.hoverImage ?? null);
  const detail = p.shortDescription?.trim() || null;
  const meta = [p.volume, p.category.childTitle ?? p.category.rootTitle].filter(Boolean).join(" · ");

  return (
    <article
      aria-labelledby={titleId}
      data-product-card=""
      data-availability={p.availability}
      data-theme={premium ? "premium-gold" : undefined}
      {...accentTriggerProps(p.accent)}
      style={!premium && p.accent ? accentStyle(p.accent) : undefined}
      className={`group/card @container/card relative flex h-full min-w-0 flex-col ${
        surface === "default" ? "" : `rounded-tile bg-surface p-card-pad ${surface === "forest" ? "shadow-card-on-forest" : "shadow-card"}`
      } ${className}`}
    >
      {/* ------------------------------------------------------------ image tile (motion hook: data-card-tile) */}
      <div
        data-card-tile=""
        className={`relative aspect-[4/5] overflow-hidden rounded-tile shadow-xs transition-shadow duration-250 group-hover/card:shadow-tile group-has-[a[data-card-link]:focus-visible]/card:ring-3 group-has-[a[data-card-link]:focus-visible]/card:ring-blue-700 group-has-[a[data-card-link]:focus-visible]/card:ring-offset-2 ${
          premium
            ? "border border-transparent bg-gold-50 shadow-gold [background:linear-gradient(var(--color-gold-50),var(--color-gold-50))_padding-box,var(--gradient-gold-foil)_border-box]"
            : p.accent ? "bg-accent-soft" : "bg-cream-100"
        }`}
      >
        {/* Soft light: white halo behind the packshot + podium shadow (tint stays at the edges). */}
        <span
          aria-hidden="true"
          className={`absolute inset-0 ${
            premium
              ? "bg-(image:--gradient-gold-glow)"
              : "bg-[radial-gradient(closest-side_at_50%_44%,var(--color-surface)_0%,color-mix(in_oklab,var(--color-surface)_55%,transparent)_55%,transparent_100%)]"
          }`}
        />
        <span aria-hidden="true" className="absolute inset-x-[22%] bottom-[11%] h-[5%] rounded-[50%] bg-accent-line/70 blur-md" />
        {/* K-272 hover light: glare follows the cursor (fx.ts sets --glare-x/y), one sweep crosses the tile per hover */}
        <span aria-hidden="true" data-card-glare="" className="pointer-events-none absolute inset-0 z-[3]" />
        <span aria-hidden="true" data-card-sweep="" className="pointer-events-none absolute inset-0 z-[3] overflow-hidden" />

        {/* Hover band (3px, product/theme stripes). */}
        <span
          aria-hidden="true"
          data-motion="card-band"
          className="pointer-events-none absolute inset-x-0 top-0 z-[3] grid h-[3px] grid-cols-[2fr_1fr_1.4fr] opacity-0 transition-opacity duration-250 group-hover/card:opacity-100 group-has-[:focus-visible]/card:opacity-100"
        >
          <span className="bg-stripe-1" />
          <span className="bg-stripe-2" />
          <span className="bg-stripe-3" />
        </span>

        <div data-motion="card-media" className="absolute inset-x-[12%] bottom-[14%] top-[10%]">
          {p.image ? (
            <ProductImage
              image={p.image}
              name={p.name}
              sizes={sizes}
              priority={priority}
              className={second ? `group-hover/card:opacity-0 ${REVEAL}` : ""}
            />
          ) : null}
          {second && (
            <ProductImage image={{ ...second, alt: "" }} name="" sizes={sizes} className={`opacity-0 group-hover/card:opacity-100 ${REVEAL}`} />
          )}
        </div>
        {!p.image && <MediaFallback name={p.name} />}

        {badge && (
          <Badge
            tone={badge}
            label={notSellable ? t("product.badge.verySoon") : undefined}
            floating
            className={`absolute z-[4] @min-[220px]/card:left-3 @min-[220px]/card:top-3 @min-[220px]/card:max-w-[calc(100%-3.25rem)] ${
              // Narrow cards (2 columns at 360px): the long "Türkiye'ye yakında" label moves to the bottom-left corner,
              // left of the round "Ürünü incele" button, so it never truncates next to the heart.
              badge === "comingSoon"
                ? "bottom-2 left-2 max-w-[calc(100%-3.75rem)] px-2 @min-[220px]/card:bottom-auto @min-[220px]/card:px-2.5 [&>svg]:hidden @min-[220px]/card:[&>svg]:block"
                : "left-2.5 top-2.5 max-w-[calc(100%-3.25rem)]"
            }`}
          />
        )}
        {premium && !badge && (
          <Badge tone="premium" floating className="absolute left-2.5 top-2.5 z-[4] max-w-[calc(100%-3.25rem)] @min-[220px]/card:left-3 @min-[220px]/card:top-3" />
        )}
        <FavoriteButton slug={p.slug} name={p.name} className="absolute right-1.5 top-1.5 z-[4] @min-[220px]/card:right-2 @min-[220px]/card:top-2" />

        {/* Bottom overlay: detail reveal (fine pointer, wide cards) + always-visible quick add. */}
        <div className="absolute inset-x-2 bottom-2 z-[4] flex flex-col items-end gap-2 @min-[220px]/card:inset-x-3 @min-[220px]/card:bottom-3">
          {detail && (
            <p
              aria-hidden="true"
              data-motion="card-reveal"
              className={`pointer-events-none hidden w-full translate-y-2 rounded-md bg-surface/92 px-3 py-2 text-xs leading-snug text-ink opacity-0 shadow-xs backdrop-blur-sm group-hover/card:translate-y-0 group-hover/card:opacity-100 @min-[220px]/card:block ${REVEAL}`}
            >
              <span className="line-clamp-2">{detail}</span>
            </p>
          )}
          {p.sellable && !comingSoon && <AddToCartButton code={p.code} name={p.name} variant="quick" className="shrink-0" />}
          {comingSoon && (
            // K-272: same round button -> pill opening as the cart button, but "Ürünü incele" (no add to cart, K-038).
            // Decorative: the whole card is already the link (title ::after), so clicks pass through.
            <span aria-hidden="true" data-qa="" className="pointer-events-none relative inline-flex shrink-0">
              <span data-qa-pill="" data-tone="view">
                <span>{t("product.card.view")}</span>
              </span>
              <span data-qa-round="" className="relative grid size-11 place-items-center rounded-pill bg-surface text-green-800 shadow-button ring-1 ring-line">
                <ArrowRight size={20} />
              </span>
            </span>
          )}
        </div>

        {premium && <GoldDoubleRule className="absolute inset-x-0 bottom-0 z-[3]" />}
      </div>

      {/* ------------------------------------------------------------ body */}
      <div className="flex flex-1 flex-col px-0.5 pt-3 @min-[220px]/card:pt-4">
        <p className="flex min-w-0 items-center gap-1.5 text-xs font-semibold uppercase tracking-eyebrow text-ink-muted">
          <span aria-hidden="true" className={`size-1.5 shrink-0 rounded-full ${premium ? "bg-gold-500" : "bg-accent-decor"}`} />
          <span className="truncate">{premium ? `${t("product.badge.premium")} · ${p.brand.title}` : p.brand.title}</span>
        </p>
        <H id={titleId} className="mt-1.5 min-h-[2lh] font-sans text-sm font-medium leading-snug tracking-normal text-ink @min-[220px]/card:text-base">
          <Link
            href={p.href}
            data-card-link=""
            className="line-clamp-2 outline-none after:absolute after:inset-0 after:z-[2] after:rounded-tile after:content-[''] transition-colors duration-250 group-hover/card:text-green-800"
          >
            {p.name}
          </Link>
        </H>
        <p className="mt-1 min-h-[1lh] truncate text-xs text-ink-muted">{meta}</p>

        <div className="mt-auto pt-3">
          <PriceBlock price={comingSoon ? null : p.price} memberPrice={comingSoon ? null : p.memberPrice} pv={p.pv} availability={comingSoon ? "yakinda" : p.availability} size="card" />
        </div>
      </div>
    </article>
  );
}

export { ProductCardMini, ProductCardSkeleton, toMiniProduct, type MiniProduct } from "./ProductCardParts";
