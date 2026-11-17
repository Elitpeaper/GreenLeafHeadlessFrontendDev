import Image from "next/image";
import Link from "next/link";
import { CornerFlourish, GoldDoubleRule, GoldFrame } from "@/components/brand/ornaments";
import { Badge } from "@/components/product/Badge";
import { FavoriteButton } from "@/components/product/FavoriteButton";
import { PriceBlock, PricePair } from "@/components/product/Price";
import { ProductCard } from "@/components/product/ProductCard";
import { Rail } from "@/components/sections/Rail";
import { ChevronDown, ChevronRight, Info, ShieldCheck, Sprout } from "@/components/ui/lucide";
import { getSkinType } from "@/lib/catalog/skin";
import type { ProductDetail, ProductSummary } from "@/lib/products";
import { ThemeScope } from "@/lib/theme/ThemeScope";
import { t } from "@/components/sections/copy";
import { BuyActions, StickyAdd, StickyBar } from "./BuyActions";
import { Gallery } from "./Gallery";

const COSMETIC_ROOTS = new Set(["cilt-bakimi", "makyaj", "sac-bakimi", "vucut-bakimi", "setler"]);

/**
 * Product detail (wireframe/urun-detay.md; premium variant premium-theme.md §5.2, K-092).
 * Theme only dresses the top block surfaces; buy-box order, price badge, PV and CTA are invariant.
 * Hover-recolor: none on this page (K-093).
 */
export function ProductView({ product: p, related, inPremiumCollection }: { product: ProductDetail; related: ProductSummary[]; inPremiumCollection: string | null }) {
  const premium = p.theme === "premium-gold";
  const comingSoon = p.availability === "yakinda";
  const skinLabels = p.skinType.map((s) => (s === "tum-ciltler" ? null : getSkinType(s)?.label)).filter(Boolean) as string[];
  const descriptionText = p.description ?? p.shortDescription;
  const note = p.regulated ? t("product.notice.regulated") : COSMETIC_ROOTS.has(p.category.root) ? t("product.notice.cosmetic") : null;
  const relatedTitle = comingSoon ? t("product.section.relatedTr") : t("product.section.related");

  return (
    <>
      <ThemeScope theme={p.theme} accent={p.theme ? null : p.accent}>
        <div className={premium ? "relative bg-gold-50/60" : "relative"}>
          {premium && (
            <>
              <CornerFlourish corner="tl" className="absolute left-3 top-3 hidden md:block" />
              <CornerFlourish corner="br" className="absolute bottom-3 right-3 hidden md:block" />
            </>
          )}
          <div className="mx-auto max-w-page px-gutter pb-section-tight pt-6">
            {/* 1 Breadcrumb */}
            <nav aria-label={t("product.breadcrumb.aria")} className="text-sm text-ink-muted">
              <ol className="flex flex-wrap items-center gap-1">
                <li>
                  <Link href="/" className="inline-flex min-h-tap-min items-center hover:text-ink underline decoration-transparent underline-offset-4 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:decoration-current">
                    {t("product.breadcrumb.home")}
                  </Link>
                </li>
                <li className="inline-flex items-center gap-1">
                  <ChevronRight size={16} aria-hidden="true" />
                  <Link href={`/kategori/${p.category.root}`} className="inline-flex min-h-tap-min items-center hover:text-ink underline decoration-transparent underline-offset-4 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:decoration-current">
                    {p.category.rootTitle}
                  </Link>
                </li>
                {p.category.child && (
                  <>
                    <li className="inline-flex items-center gap-1">
                      <ChevronRight size={16} aria-hidden="true" />
                      <Link href={p.category.href} className="inline-flex min-h-tap-min items-center hover:text-ink underline decoration-transparent underline-offset-4 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:decoration-current">
                        {p.category.childTitle}
                      </Link>
                    </li>
                  </>
                )}
              </ol>
            </nav>
            {inPremiumCollection && (
              <Link href="/koleksiyon/premium-gold" className="mt-1 inline-flex min-h-tap-min items-center gap-1.5 text-sm font-medium text-accent-text underline decoration-transparent underline-offset-4 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:decoration-current">
                {t("product.collectionLink", { koleksiyon: inPremiumCollection })} <span aria-hidden="true">→</span>
              </Link>
            )}

            {/* 2 Top block */}
            <div className="mt-4 grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <div className="relative lg:sticky lg:top-28">
                  {comingSoon && <Badge tone="comingSoon" className="absolute left-4 top-4 z-10" />}
                  <Gallery images={p.images} name={p.name} premium={premium} labels={{ item: t("product.gallery.item") }} />
                  {premium && <GoldDoubleRule className="mx-auto mt-5 max-w-md" />}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className={premium ? "rounded-xl bg-surface p-6 shadow-gold sm:p-8" : ""}>
                  {premium && <p className="text-xs font-semibold uppercase tracking-premium text-accent-text">{t("product.badge.premium")}</p>}
                  <Link
                    href={`/arama?marka=${p.brand.slug}`}
                    className="inline-flex min-h-tap-min items-center text-sm font-medium uppercase tracking-eyebrow text-ink-muted hover:text-ink underline decoration-transparent underline-offset-4 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:decoration-current"
                  >
                    {p.brand.title}
                  </Link>
                  <h1 className={`text-4xl text-ink ${premium ? "premium-display" : ""}`}>
                    {p.name}
                  </h1>
                  {p.volume && <p className="mt-2 text-base text-ink-muted">{p.volume}</p>}
                  {skinLabels.length > 0 && (
                    <p className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                      <span className="text-ink-muted">{t("product.finder.forWho")}:</span>
                      {skinLabels.map((l) => (
                        <span key={l} className="rounded-pill bg-blue-50 px-3 py-1 text-blue-800">
                          {l}
                        </span>
                      ))}
                    </p>
                  )}

                  <div className="mt-6 border-t border-line pt-6">
                    <PriceBlock price={p.price} memberPrice={p.memberPrice} pv={p.pv} availability={p.availability} size="lg" />
                    {!comingSoon && <p className="mt-2 text-sm text-ink-muted">{t("common.currencyNote")}</p>}
                  </div>

                  {comingSoon ? (
                    <div className="mt-6 grid gap-4">
                      <div className="flex gap-3 rounded-lg bg-blue-50 p-4 text-blue-800">
                        <Sprout size={24} className="shrink-0" />
                        <div>
                          <p className="font-semibold">{t("product.comingSoon.title")}</p>
                          <p className="mt-1 text-sm text-ink">{t("product.comingSoon.body")}</p>
                        </div>
                      </div>
                      <a
                        id="pdp-primary-cta"
                        href="#benzer"
                        className="inline-flex min-h-control-lg w-full items-center justify-center gap-2 rounded-pill bg-green-700 px-8 text-lg font-medium text-white shadow-button transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-green-800"
                      >
                        {t("product.comingSoon.cta")} <ChevronDown size={20} />
                      </a>
                    </div>
                  ) : p.sellable ? (
                    <div className="mt-6">
                      <BuyActions
                        code={p.code}
                        name={p.name}
                        labels={{
                          qty: t("product.qty.label"),
                          increase: t("product.qty.increase"),
                          decrease: t("product.qty.decrease"),
                          add: t("product.card.addToCart"),
                          added: t("product.card.added"),
                          maxQty: t("product.maxQty", { max: 10 }),
                        }}
                      />
                      <Link href="/uye-ol" className="mt-4 inline-flex min-h-tap-min items-center gap-1.5 font-medium text-green-700 underline decoration-transparent underline-offset-4 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:decoration-current">
                        {t("product.membership.nudge")} <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  ) : null}

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                    <p className="text-sm text-ink-muted">
                      {t("product.detail.code")}: <span className="font-medium text-ink">{p.code}</span>
                    </p>
                    <FavoriteButton slug={p.slug} name={p.name} />
                  </div>
                  {!comingSoon && <p className="mt-2 text-sm text-ink-muted">{t("product.onlineSoon")}</p>}
                  {p.regulated && (
                    <p className="mt-4 flex gap-2 rounded-md bg-surface-muted p-3 text-sm text-ink">
                      <Info size={20} className="shrink-0 text-blue-700" />
                      {t("product.notice.regulated")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Certificates — only documents with a PDF (K-058) */}
        {p.certificates.some((c) => c.pdf) && (
          <section aria-labelledby="pdp-certs" className="mx-auto max-w-page px-gutter pt-section-tight">
            <h2 id="pdp-certs" className="text-2xl">
              {t("product.section.certificates")}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {p.certificates
                .flatMap((c) => (c.pdf ? [{ type: c.type, pdf: c.pdf }] : []))
                .map((c) => (
                  <li key={c.type}>
                    <a
                      href={c.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-control items-center gap-2 rounded-pill bg-surface px-5 ring-1 ring-line transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:shadow-card"
                    >
                      <ShieldCheck size={20} className="text-green-700" /> {c.type} <span aria-hidden="true">PDF ↗</span>
                      <span className="sr-only">({t("common.opensNewTab")})</span>
                    </a>
                  </li>
                ))}
            </ul>
          </section>
        )}

        {/* 4 Highlights */}
        {p.features.length > 0 && (
          <section aria-labelledby="pdp-features" className={premium ? "mt-section-tight [background:var(--gradient-forest-depth)] py-section-tight" : "pt-section-tight"}>
            <div className="mx-auto max-w-page px-gutter">
              <h2 id="pdp-features" className={`text-3xl ${premium ? "premium-display text-gold-200" : "text-ink"}`}>
                {t("product.section.highlights")}
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3 rounded-lg bg-surface p-4 text-base text-ink ring-1 ring-line">
                    <span aria-hidden="true" className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-text">
                      <Sprout size={16} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </ThemeScope>

      {/* 5 Info accordions (content stays in the DOM for SEO) */}
      <section aria-label={t("product.section.details")} className="mx-auto max-w-page px-gutter pt-section-tight">
        <div className="max-w-3xl divide-y divide-line border-y border-line">
          {p.isSet && p.setContents.length > 0 && (
            <Accordion title={t("product.section.setContents")} open>
              {premium ? (
                <ul className="grid gap-3 sm:grid-cols-2">
                  {p.setContents.map((s) => (
                    <li key={s}>
                      <GoldFrame className="p-4 text-base">{s}</GoldFrame>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="list-disc space-y-1 pl-5">
                  {p.setContents.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              )}
            </Accordion>
          )}
          {descriptionText && (
            <Accordion title={t("product.section.description")} open>
              <p>{descriptionText}</p>
              {note && <p className="mt-4 rounded-md bg-surface-muted p-3 text-sm text-ink-muted">{note}</p>}
            </Accordion>
          )}
          {p.usage && (
            <Accordion title={t("product.section.usage")}>
              <p>{p.usage}</p>
            </Accordion>
          )}
          <Accordion title={t("product.section.details")}>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
              <dt className="text-ink-muted">{t("product.detail.code")}</dt>
              <dd>{p.code}</dd>
              {p.barcode && (
                <>
                  <dt className="text-ink-muted">{t("product.detail.barcode")}</dt>
                  <dd>{p.barcode}</dd>
                </>
              )}
              <dt className="text-ink-muted">{t("product.detail.brand")}</dt>
              <dd>{p.brand.title}</dd>
              {p.volume && (
                <>
                  <dt className="text-ink-muted">{t("product.detail.volume")}</dt>
                  <dd>{p.volume}</dd>
                </>
              )}
              <dt className="text-ink-muted">{t("product.detail.category")}</dt>
              <dd>
                <Link href={p.category.href} className="text-green-700 underline decoration-transparent underline-offset-4 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:decoration-current">
                  {p.category.childTitle ?? p.category.rootTitle}
                </Link>
              </dd>
            </dl>
          </Accordion>
        </div>
      </section>

      {/* 6 Related */}
      <section id="benzer" aria-labelledby="pdp-related" className="mt-section bg-cream-50 py-section-tight">
       <div className="mx-auto max-w-page px-gutter">
        <h2 id="pdp-related" className="text-3xl text-ink">
          {relatedTitle}
        </h2>
        {related.length > 0 ? (
          <div className="mt-8">
            <Rail label={relatedTitle} prevLabel={t("common.railPrev")} nextLabel={t("common.railNext")}>
              {related.map((r) => (
                <ProductCard key={r.id} product={r} sizes="(min-width:1024px) 290px, 78vw" />
              ))}
            </Rail>
          </div>
        ) : (
          <p className="mt-4 text-ink-muted">
            {t("product.related.emptyTr")}{" "}
            <Link href="/koleksiyon/turkiyede-satista" className="font-medium text-green-700 underline decoration-transparent underline-offset-4 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:decoration-current">
              {t("collection.empty.cta")} →
            </Link>
          </p>
        )}
       </div>
      </section>

      {/* 7 Finder bridge (skin care root only) */}
      {p.category.root === "cilt-bakimi" && (
        <section className="mx-auto max-w-page px-gutter pt-section-tight">
          <Link
            href={p.skinType[0] && p.skinType[0] !== "tum-ciltler" ? `/cilt-tipine-gore?tip=${p.skinType[0]}` : "/cilt-tipine-gore"}
            className="flex min-h-tap items-center justify-between gap-4 rounded-lg bg-blue-50 p-5 font-medium text-ink ring-1 ring-blue-100 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:shadow-card"
          >
            <span>{t("product.finder.link")}</span>
            <span aria-hidden="true" className="text-blue-700">
              →
            </span>
          </Link>
        </section>
      )}
      <div className="h-section" />

      {/* 9 Mobile sticky bar */}
      <StickyBar targetId="pdp-primary-cta">
        <div className="flex items-center gap-3">
          {p.image && (
            <span className="relative size-12 shrink-0 overflow-hidden rounded-md bg-accent-soft">
              <Image src={p.image.src} alt="" fill sizes="48px" className="object-contain p-1 mix-blend-multiply" />
            </span>
          )}
          <div className="min-w-0 flex-1">
            {comingSoon ? (
              <Badge tone="comingSoon" />
            ) : (
              <PricePair price={p.price} memberPrice={p.memberPrice} size="mini" />
            )}
          </div>
          {comingSoon ? (
            <a href="#benzer" className="inline-flex min-h-control shrink-0 items-center rounded-pill bg-green-700 px-5 font-medium text-white">
              {t("product.stickyBar.similar")}
            </a>
          ) : p.sellable ? (
            <StickyAdd code={p.code} label={t("product.stickyBar.add")} />
          ) : null}
        </div>
      </StickyBar>
    </>
  );
}

function Accordion({ title, open = false, children }: { title: string; open?: boolean; children: React.ReactNode }) {
  return (
    <details open={open} className="group py-1" data-motion="accordion">
      <summary className="flex min-h-control-lg cursor-pointer list-none items-center justify-between gap-4 text-xl font-medium text-ink [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown size={24} className="shrink-0 transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="pb-6 text-base text-ink">{children}</div>
    </details>
  );
}
