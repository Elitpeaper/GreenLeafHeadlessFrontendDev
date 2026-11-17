import Link from "next/link";
import { LeafHeartSpecimen } from "@/components/illustrations";
import { ProductCard } from "@/components/product/ProductCard";
import type { ProductSummary } from "@/lib/products";
import { t } from "@/components/sections/copy";
import { Eyebrow } from "../parts";
import { AccentZone } from "./AccentZone";

/**
 * Vitrin 1 "Türkiye'de satışta" (brief §5) — RecolorZone Z3: hovering/focusing a card with a palette repaints the zone
 * tint, the outline count and the specimen leaf (only RECOLOR_VARS; price, CTA and badges never change).
 * Header collage: giant outline count (= total, decor, aria-hidden, follows --accent-decor) behind eyebrow + H2, a
 * paper-cut heart leaf bleeding off the right edge (sway). Grid: 4 x 2 cards on desktop, a 1.25-card rail on phones
 * (one list, two layouts: no duplicated cards). Cards stay white; price, member price and PV are complete (K-036, K-062).
 */
export function Showcase({
  id,
  title,
  lead,
  eyebrow,
  href,
  total,
  products,
}: {
  id: string;
  title: string;
  lead?: string;
  eyebrow: string;
  href: string;
  total: number;
  products: ProductSummary[];
}) {
  products = products.filter((p) => p.image); // showcases only with an official image (K-153)
  if (products.length === 0) return null;
  return (
    <AccentZone aria-labelledby={id} linkHeader className="relative mt-0 overflow-hidden bg-surface py-section">
      <LeafHeartSpecimen className="pointer-events-none absolute -right-8 -top-10 hidden w-40 rotate-[24deg] md:block lg:-right-6 lg:w-56" />
      <div className="relative mx-auto max-w-page px-gutter">
        <div className="relative flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-2 -top-10 select-none text-[7rem] font-bold leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:1.5px_color-mix(in_srgb,var(--accent-decor)_24%,transparent)] md:text-[10rem] lg:-top-16 lg:text-colossal"
          >
            {total}
          </span>
          <div className="relative max-w-2xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id={id} className="mt-4 text-display text-ink">
              {title}
            </h2>
            {lead && <p className="mt-3 text-lg text-ink-muted">{lead}</p>}
          </div>
          <Link
            href={href}
            className="relative inline-flex min-h-tap-min items-center gap-2 text-lg font-medium text-green-700 underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] duration-250 hover:decoration-current "
          >
            {t("home.v2.showcase1.cta", { count: total })} <span aria-hidden="true">→</span>
          </Link>
        </div>

        <ul className="-mx-gutter mt-8 flex scroll-px-gutter snap-x snap-mandatory gap-grid-gap overflow-x-auto px-gutter pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0 lg:pb-0">
          {products.slice(0, 8).map((p) => (
            <li key={p.id} data-motion="M-9" className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-auto">
              <ProductCard product={p} sizes="(min-width:1024px) 290px, 78vw" />
            </li>
          ))}
        </ul>
      </div>
    </AccentZone>
  );
}
