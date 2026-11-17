import type { Metadata } from "next";
import Link from "next/link";
import { siteReady } from "@/components/coming-soon/placeholders";
import { PanelLeafSegments, TextureGrain } from "@/components/illustrations";
import { Faq } from "@/components/membership/Faq";
import { MembershipCta } from "@/components/membership/MembershipCta";
import { ProductCard } from "@/components/product/ProductCard";
import { t, tFaq } from "@/components/pv/plan";
import { HeroPhoto, PageHero, creamLink } from "@/components/sections/PageHero";
import { site } from "@/config/site";
import { getCollection } from "@/lib/products";

export const metadata: Metadata = { title: "Üye ol", description: t("membership.page.metaDescription") };

/**
 * /uye-ol (wireframe/uye-ol.md): hero → price examples → steps → FAQ → dark membership panel (moved from the home
 * page, K-178). Shopping-at-member-price language only (K-099). The sponsor link is still a placeholder, so every
 * CTA renders as "Çok yakında" instead of an external link (K-182) — flips automatically when site.ts is filled.
 */
export default async function JoinPage() {
  const tr = await getCollection("turkiyede-satista", { limit: 10 });
  const sellable = (tr?.products ?? []).filter((p) => !p.regulated && p.image && p.sellable);
  const examples = sellable.slice(0, 3);
  const steps = [t("membership.step1"), t("membership.step2"), t("membership.step3"), t("membership.step4")];
  const cta = (source: string, tone: "light" | "onDark" = "light") => (
    <MembershipCta href={site.sponsorLink} source={source} label={t("membership.cta")} newTabLabel={t("common.opensNewTab")} tone={tone} />
  );

  return (
    <>
      {/* Short forest hero (K-187, §7.7): paper leaves + member medallion; CTA flips from "Çok yakında" automatically */}
      <PageHero
        id="join-title"
        eyebrow={t("membership.hero.eyebrow")}
        title={t("membership.hero.title")}
        body={t("membership.hero.body")}
        actions={cta("uye-ol-hero", "onDark")}
        note={siteReady.sponsorLink ? t("membership.cta.note") : undefined}
        visual={<HeroPhoto slot="page.uyeOl.hero" glyph="member" />}
      />

      {examples.length > 0 && (
        <section aria-labelledby="join-examples" className="mx-auto max-w-page px-gutter pt-section">
          <h2 id="join-examples" className="text-3xl text-ink">
            {t("membership.example.title")}
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-grid-gap md:grid-cols-3">
            {examples.map((p, i) => (
              <li key={p.id} className={i === 2 ? "max-md:hidden" : undefined}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-muted">{t("common.currencyNote")}</p>
        </section>
      )}

      {/* Steps — leaf-segment panel (K-188) */}
      <section aria-labelledby="join-steps" className="mx-auto max-w-page px-gutter pt-section">
        <h2 id="join-steps" className="text-3xl text-ink">
          {t("membership.steps.title")}
        </h2>
        <div className="relative mt-8 overflow-hidden rounded-panel shadow-long">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <PanelLeafSegments segments={4} className="size-full" />
          </div>
          <ol className="relative grid sm:grid-cols-2 lg:grid-cols-4" data-motion="stagger">
            {steps.map((s, i) => (
              <li key={s} className="flex flex-col items-center px-6 py-8 text-center lg:py-12">
                <span className="grid size-12 place-items-center rounded-full bg-cream-100 font-[family-name:var(--font-role-accent)] text-xl font-bold text-forest-800">
                  {i + 1}
                </span>
                <p className="mt-4 max-w-xs text-base text-cream-100">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Faq id="join-faq" title={t("membership.faq.title")} items={tFaq("membership.faq")} />

      {/* Closing band (moved from the home page, K-178). No prices on the dark ground. */}
      <section aria-labelledby="join-final" className="mx-auto max-w-page px-gutter pb-section">
        <div className="relative overflow-hidden rounded-panel bg-[linear-gradient(160deg,var(--color-forest-800)_0%,var(--color-forest-900)_60%,var(--color-forest-950)_100%)] text-cream-100 shadow-long" data-motion="M-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <TextureGrain strength={0.12} />
          </div>
          <div className="relative grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:p-14">
            <div>
              <h2 id="join-final" className="text-4xl text-cream-200">
                {t("membership.final.title")}
              </h2>
              <p className="mt-4 max-w-prose text-lg text-cream-100">{t("home.membership.body")}</p>
              <Link href="/pv-nedir" className={`mt-4 ${creamLink}`}>
                {t("product.pv.learnMore")} <span aria-hidden="true">→</span>
              </Link>
            </div>
            {cta("uye-ol-footer", "onDark")}
          </div>
        </div>
      </section>
    </>
  );
}
