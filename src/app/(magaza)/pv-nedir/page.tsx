import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/membership/Faq";
import { ProductCard } from "@/components/product/ProductCard";
import { BusinessSection } from "@/components/pv/BusinessSection";
import { PvCalculator, type CalcItem } from "@/components/pv/PvCalculator";
import { t, tFaq } from "@/components/pv/plan";
import { PvScene } from "@/components/sections/home/PvScene";
import { PanelLeafSegments } from "@/components/illustrations";
import { HeroPhoto, PageHero, creamCta, creamLink } from "@/components/sections/PageHero";
import { ShoppingBag, Sprout, UserPlus } from "@/components/ui/lucide";
import { formatPv } from "@/lib/format";
import { getCollection } from "@/lib/products";

export const metadata: Metadata = { title: t("pv.page.title"), description: t("pv.page.metaDescription") };

/**
 * /pv-nedir (wireframe/pv.md §B, pv-explainer.md). Order: hero → 3 steps → where → example basket (live) →
 * coming-soon PV → what it gives (sourced) → #is-firsati (gated, K-099) → FAQ → final CTA.
 * Upper half = shopping language only; earnings content exists only inside BusinessSection.
 */
export default async function PvPage() {
  const [tr, soon] = await Promise.all([
    getCollection("turkiyede-satista", { limit: 12 }),
    getCollection("turkiyeye-yakinda", { limit: 12 }),
  ]);
  const trItems = (tr?.products ?? []).filter((p) => !p.regulated && p.pv != null && p.image);
  const example = trItems[0] ?? null;
  const calc: CalcItem[] = trItems.slice(1, 4).flatMap((p) =>
    p.price != null && p.memberPrice != null && p.pv != null
      ? [{ code: p.code, name: p.name, href: p.href, image: p.image?.src ?? null, price: p.price, memberPrice: p.memberPrice, pv: p.pv }]
      : [],
  );
  const sceneItems = trItems.slice(4, 7).length === 3 ? trItems.slice(4, 7) : trItems.slice(0, 3);
  const soonItem = (soon?.products ?? []).find((p) => p.pv != null && !p.nameIsFallback && !p.regulated) ?? null;
  const steps = [
    { icon: Sprout, title: t("pv.step1.title"), body: t("pv.step1.body") },
    { icon: ShoppingBag, title: t("pv.step2.title"), body: t("pv.step2.body") },
    { icon: UserPlus, title: t("pv.step3.title"), body: t("pv.step3.body") },
  ];
  const gives = [t("pv.gives.1"), t("pv.gives.2"), t("pv.gives.3"), t("pv.gives.4")];

  return (
    <>
      {/* 1 Hero — short forest hero (K-187); PV coin on a light plate, paper leaves behind it (B-9) */}
      <PageHero
        id="pv-title"
        eyebrow={t("pv.hero.eyebrow")}
        title={t("pv.hero.title")}
        body={t("pv.hero.body")}
        actions={
          <>
            <Link href="/uye-ol" className={creamCta}>
              {t("pv.hero.cta")}
            </Link>
            <Link href="/koleksiyon/turkiyede-satista" className={creamLink}>
              {t("pv.hero.secondary")} <span aria-hidden="true">→</span>
            </Link>
          </>
        }
        visual={
          <HeroPhoto slot="page.pv.hero">
            <div
              aria-hidden="true"
              className="grid size-24 place-items-center rounded-full bg-lime-100 text-lime-700 sm:size-28"
              data-motion="M-20"
            >
              <span className="text-center">
                <span className="block font-[family-name:var(--font-role-accent)] text-base font-bold">PV</span>
                <span className="block text-2xl font-semibold leading-none tabular-nums" data-motion="M-19">
                  {example?.pv != null ? formatPv(example.pv) : "PV"}
                </span>
              </span>
            </div>
          </HeroPhoto>
        }
      />

      {/* 2 Steps — leaf-segment panel (K-188) */}
      <section aria-labelledby="pv-steps" className="mx-auto max-w-page px-gutter pt-section">
        <h2 id="pv-steps" className="text-3xl text-ink">
          {t("pv.steps.title")}
        </h2>
        <div className="relative mt-8 overflow-hidden rounded-panel shadow-long">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <PanelLeafSegments segments={3} className="size-full" />
          </div>
          <ol className="relative grid md:grid-cols-3" data-motion="stagger">
            {steps.map(({ icon: Icon, title, body }, i) => (
              <li key={title} className="flex flex-col items-center px-6 py-8 text-center md:px-8 md:py-12">
                <span className="font-[family-name:var(--font-role-accent)] text-sm font-bold text-lime-200">{i + 1}</span>
                <Icon size={40} className="mt-3 text-cream-100" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-semibold text-cream-100">{title}</h3>
                <p className="mt-2 max-w-xs text-base text-cream-100">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      {/* 2b PV scene (moved from the home page, K-178): three real products flow into a total */}
      {sceneItems.length > 0 && (
        <section aria-labelledby="pv-scene-title" className="mt-section bg-[linear-gradient(180deg,var(--color-surface),var(--color-lime-50))] py-section-tight">
          <PvScene id="pv-scene-title" products={sceneItems} eyebrow={t("pv.hero.eyebrow")} title={t("pv.scene.title")} body={t("pv.scene.body")} cta={false} />
        </section>
      )}

      {/* 3 Where */}
      {example && (
        <section aria-labelledby="pv-where" className="bg-accent-soft py-section-tight">
          <div className="mx-auto grid max-w-page items-center gap-10 px-gutter md:grid-cols-2">
            <div>
              <h2 id="pv-where" className="text-3xl text-ink">
                {t("pv.where.title")}
              </h2>
              <p className="mt-3 max-w-prose text-lg text-ink-muted">{t("pv.where.body")}</p>
            </div>
            <div className="relative mx-auto w-full max-w-xs">
              <ProductCard product={example} headingLevel={3} />
              <span
                aria-hidden="true"
                className="absolute -left-4 bottom-[5.5rem] hidden -translate-x-full items-center gap-2 text-sm font-semibold text-lime-700 md:flex"
              >
                PV <span className="h-0.5 w-12 rounded-pill bg-lime-700" />
              </span>
            </div>
          </div>
        </section>
      )}

      {/* 4 Example basket (live) */}
      {calc.length === 3 && (
        <section aria-labelledby="pv-example" className="mx-auto max-w-page px-gutter pt-section">
          <h2 id="pv-example" className="text-3xl text-ink">
            {t("pv.example.title")}
          </h2>
          <p className="mt-3 max-w-prose text-lg text-ink-muted">{t("pv.example.body")}</p>
          <div className="mt-8">
            <PvCalculator
              items={calc}
              labels={{
                total: t("pv.example.total"),
                memberTotal: t("pv.example.memberTotal"),
                pvTotal: t("pv.example.pv"),
                formula: t("pv.example.formula"),
                increase: t("product.qty.increase"),
                decrease: t("product.qty.decrease"),
                qty: t("product.qty.label"),
              }}
            />
          </div>
        </section>
      )}

      {/* 4b Coming-soon products have PV too */}
      {soonItem && (
        <section aria-labelledby="pv-soon" className="mx-auto grid max-w-page items-center gap-10 px-gutter pt-section md:grid-cols-2">
          <div className="mx-auto w-full max-w-xs md:order-2">
            <ProductCard product={soonItem} />
          </div>
          <div>
            <h2 id="pv-soon" className="text-3xl text-ink">
              {t("pv.soon.title")}
            </h2>
            <p className="mt-3 max-w-prose text-lg text-ink-muted">{t("product.pv.tooltipComingSoon")}</p>
          </div>
        </section>
      )}

      {/* 5 What PV gives (sourced) */}
      <section aria-labelledby="pv-gives" className="mt-section bg-lime-50 py-section-tight">
        <div className="mx-auto max-w-page px-gutter">
          <h2 id="pv-gives" className="text-3xl text-ink">
            {t("pv.gives.title")}
          </h2>
          <ul className="mt-8 grid gap-grid-gap sm:grid-cols-2">
            {gives.map((g) => (
              <li key={g} className="flex gap-3 rounded-lg bg-surface p-5 text-base text-ink ring-1 ring-lime-100">
                <span aria-hidden="true" className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-lime-100 text-lime-700">
                  <Sprout size={16} />
                </span>
                {g}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-muted">{t("pv.gives.source")}</p>
        </div>
      </section>

      {/* 6 Business opportunity — gated (K-085, K-099) */}
      <BusinessSection />

      {/* 7 FAQ */}
      <Faq id="pv-faq" title={t("pv.faq.title")} items={tFaq("pv.faq")} />

      {/* 8 Final CTA */}
      <section aria-labelledby="pv-final" className="mx-auto max-w-page px-gutter py-section text-center">
        <h2 id="pv-final" className="text-3xl text-ink">
          {t("pv.final.title")}
        </h2>
        <Link
          href="/uye-ol"
          className="mt-6 inline-flex min-h-control-lg items-center justify-center rounded-pill bg-green-700 px-10 font-medium text-white shadow-button transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-green-800"
        >
          {t("pv.final.cta")}
        </Link>
      </section>
    </>
  );
}
