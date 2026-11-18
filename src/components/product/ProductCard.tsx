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
 * Motion hooks (hareket-tasarimcisi): data-product-card, data-card-shadow (article::before), data-card-tile (+::before light,
 * ::after accent glow), data-card-glare (+::after sweep), data-motion="card-media" (the <img>) | "card-band" | "card-reveal".
 *
 * K-288 DOM diet (was 56 elements per card, now ~25): decoration lives in pseudo-elements, dt/dd are flat, the body has
 * no wrapper, the second hover image is the only optional extra. Hover state is a single [data-product-card]:hover in
 * motion.css (no :has(), no group-hover utilities), and the card root carries `contain: layout style`.
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

/** K-288: the tile light (white halo behind the packshot + podium shadow) is the tile's ::before — no extra elements. */
const TILE_LIGHT =
  "before:pointer-events-none before:absolute before:inset-0 before:content-[''] before:[background:radial-gradient(closest-side_at_50%_44%,var(--color-surface)_0%,color-mix(in_oklab,var(--color-surface)_55%,transparent)_55%,transparent_100%),radial-gradient(closest-side,color-mix(in_oklab,var(--accent-line)_70%,transparent),transparent)_50%_88.4%/56%_5%_no-repeat]";
const TILE_LIGHT_GOLD =
  "before:pointer-events-none before:absolute before:inset-0 before:content-[''] before:[background:var(--gradient-gold-glow),radial-gradient(closest-side,color-mix(in_oklab,var(--accent-line)_70%,transparent),transparent)_50%_88.4%/56%_5%_no-repeat]";

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
  const second = p.hoverImage ?? null;
  const detail = p.shortDescription?.trim() || null;
  const meta = [p.volume, p.category.childTitle ?? p.category.rootTitle].filter(Boolean).join(" · ");

  return (
    <article
      aria-labelledby={titleId}
      data-product-card=""
      data-card-shadow=""
      data-availability={p.availability}
      data-theme={premium ? "premium-gold" : undefined}
      {...accentTriggerProps(p.accent)}
      style={!premium && p.accent ? accentStyle(p.accent) : undefined}
      className={`@container/card relative flex h-full min-w-0 flex-col [contain:layout_style] ${
        surface === "default" ? "" : `rounded-tile bg-surface p-card-pad [--card-pad:var(--spacing-card-pad)] ${surface === "forest" ? "shadow-card-on-forest" : "shadow-card"}`
      } ${className}`}
    >
      {/* ------------------------------------------------------------ image tile */}
      {/* P-02/K-272 perf: the hover depth is a pre-painted shadow layer (article::before, only its opacity moves), so the
          tilting tile never repaints a box-shadow. */}
      <div
        data-card-tile=""
        className={`relative aspect-[4/5] overflow-hidden rounded-tile shadow-xs ${premium ? TILE_LIGHT_GOLD : TILE_LIGHT} ${
          premium
            ? "border border-transparent bg-gold-50 shadow-gold [background:linear-gradient(var(--color-gold-50),var(--color-gold-50))_padding-box,var(--gradient-gold-foil)_border-box]"
            : p.accent
              ? "bg-accent-soft"
              : "bg-cream-100"
        }`}
      >
        {/* K-272 hover light: a pre-painted glare layer that fx.ts slides with translate; its ::after is the one-shot sweep */}
        <span aria-hidden="true" data-card-glare="" className="pointer-events-none absolute inset-0 z-[3]" />

        {/* Hover band (3px, product/theme stripes as one gradient). */}
        <span
          aria-hidden="true"
          data-motion="card-band"
          className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-[3px] opacity-0 [background:linear-gradient(to_right,var(--color-stripe-1)_0_45.45%,var(--color-stripe-2)_0_68.18%,var(--color-stripe-3)_0)]"
        />

        {p.image ? (
          <ProductImage image={p.image} name={p.name} sizes={sizes} priority={priority} media className={second ? "transition-opacity duration-250" : ""} />
        ) : (
          <MediaFallback name={p.name} />
        )}
        {second && <ProductImage image={{ ...second, alt: "" }} name="" sizes={sizes} media className="opacity-0 transition-opacity duration-250" />}

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

        {/* Detail reveal (fine pointer, wide cards): ONE element, 2-line clamp; transparent borders act as vertical padding
            (padding would let a 3rd clamped line peek through). Opacity/translate come from motion.css on card hover. */}
        {detail && (
          <p
            aria-hidden="true"
            data-motion="card-reveal"
            className="pointer-events-none absolute inset-x-3 bottom-16 z-[4] hidden rounded-md border-y-8 border-transparent bg-surface/95 px-3 text-xs leading-snug text-ink shadow-xs @min-[220px]/card:line-clamp-2"
          >
            {detail}
          </p>
        )}
        {/* Always-visible quick add (round) that opens into a labelled pill on hover/focus. */}
        {p.sellable && !comingSoon && (
          <AddToCartButton code={p.code} name={p.name} variant="quick" className="absolute bottom-2 right-2 z-[4] @min-[220px]/card:bottom-3 @min-[220px]/card:right-3" />
        )}
        {comingSoon && (
          // K-272: same round button -> pill opening as the cart button, but "Ürünü incele" (no add to cart, K-038).
          // Decorative: the whole card is already the link (title ::after), so clicks pass through. The round disc is the
          // arrow svg itself (padding + ring), not a wrapper.
          <span
            aria-hidden="true"
            data-qa=""
            className="pointer-events-none absolute bottom-2 right-2 z-[4] inline-flex @min-[220px]/card:bottom-3 @min-[220px]/card:right-3"
          >
            <ArrowRight data-qa-round="" size={20} className="relative z-[1] size-11 rounded-pill bg-surface p-3 text-green-800 shadow-button ring-1 ring-line" />
            <span data-qa-pill="" data-tone="view">
              <span>{t("product.card.view")}</span>
            </span>
          </span>
        )}

        {premium && <GoldDoubleRule className="absolute inset-x-0 bottom-0 z-[3]" />}
      </div>

      {/* ------------------------------------------------------------ body (direct children of the card: no wrapper) */}
      <p
        className={`mx-0.5 mt-3 block truncate text-xs font-semibold uppercase tracking-eyebrow text-ink-muted before:mr-1.5 before:inline-block before:size-1.5 before:rounded-full before:align-middle before:content-[''] @min-[220px]/card:mt-4 ${
          premium ? "before:bg-gold-500" : "before:bg-accent-decor"
        }`}
      >
        {premium ? `${t("product.badge.premium")} · ${p.brand.title}` : p.brand.title}
      </p>
      <H id={titleId} className="mx-0.5 mt-1.5 min-h-[2lh] font-sans text-sm font-medium leading-snug tracking-normal text-ink @min-[220px]/card:text-base">
        <Link
          href={p.href}
          data-card-link=""
          className="line-clamp-2 outline-none transition-colors duration-250 after:absolute after:inset-0 after:z-[2] after:rounded-tile after:content-[''] focus-visible:after:ring-3 focus-visible:after:ring-blue-700 focus-visible:after:ring-offset-2"
        >
          {p.name}
        </Link>
      </H>
      <p className="mx-0.5 mt-1 min-h-[1lh] truncate text-xs text-ink-muted">{meta}</p>
      <PriceBlock
        price={comingSoon ? null : p.price}
        memberPrice={comingSoon ? null : p.memberPrice}
        pv={p.pv}
        availability={comingSoon ? "yakinda" : p.availability}
        size="card"
        className="mx-0.5 mt-auto pt-3"
      />
    </article>
  );
}

export { ProductCardMini, ProductCardSkeleton, toMiniProduct, type MiniProduct } from "./ProductCardParts";
