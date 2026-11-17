import Link from "next/link";
import type { BrandFacet } from "@/lib/products";
import { t } from "@/components/sections/copy";
import { Marquee } from "@/components/motion/Marquee";

/**
 * "Marka duvarı" (brief §8, K-236): brand-lime colour block, forest-950 type (6.49). Typographic names (no sub-brand
 * logos in data), most TR products first, max 10, two marquee rows (M-23: visible pause button, reduced motion =
 * wrapped static grid, K-158). Chips: 3xl-ish uppercase Jost 600 in a forest-950/30 outline; hover/focus fills cream-50
 * (forest-900 text 11.78). The lime block runs 2.25 rem under the footer's rounded forest sheet ("paper on paper"):
 * negative bottom margin + matching padding; the section is deliberately not positioned so the footer paints above it.
 */
export function Brands({ brands }: { brands: BrandFacet[] }) {
  if (brands.length < 3) return null;
  const top = brands.slice(0, 10);
  return (
    <section aria-labelledby="brands-title" className="-mb-[2.25rem] bg-brand-lime pb-[calc(var(--spacing-section)+2.25rem)] pt-section">
      <div className="mx-auto max-w-wide px-gutter">
        <h2 id="brands-title" className="text-center text-3xl text-forest-950">
          {t("home.v2.brands.title")}
        </h2>
        <Marquee
          className="mt-8 text-center [&_[data-motion-part=marquee-toggle]]:text-forest-950 [&_[data-motion-part=track]]:py-1.5"
          label={t("home.v2.brands.title")}
          pauseLabel={t("home.v2.brands.pause")}
          playLabel={t("home.v2.brands.play")}
          rows={[top.slice(0, Math.ceil(top.length / 2)), top.slice(Math.ceil(top.length / 2))].map((row) =>
            row.map((b) => (
              <Link
                key={b.slug}
                href={`/arama?marka=${b.slug}`}
                aria-label={t("home.v2.brands.linkLabel", { ad: b.title })}
                className="inline-flex min-h-16 items-center rounded-pill px-8 text-2xl font-semibold uppercase tracking-eyebrow text-forest-950 ring-1 ring-forest-950/30 transition-[color,background-color,box-shadow] duration-250 hover:bg-cream-50 hover:text-forest-900 focus-visible:bg-cream-50 focus-visible:text-forest-900 lg:text-3xl"
              >
                {b.title}
              </Link>
            )),
          )}
        />
      </div>
    </section>
  );
}
