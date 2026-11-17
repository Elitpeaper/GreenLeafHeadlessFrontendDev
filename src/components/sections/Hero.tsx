import Image from "next/image";
import { MembershipCta } from "@/components/membership/MembershipCta";
import { t } from "@/lib/ui-text";
import { BrandStripe } from "@/components/brand/BrandStripe";
import { LeafCluster } from "@/components/brand/LeafCluster";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowDown } from "@/components/ui/icons";
import { site } from "@/config/site";
import type { TeaserProduct } from "@/lib/products";
import { cssVars } from "@/lib/css";

const FLOAT_POS = [
  "left-[2%] top-[30%] w-[38%] sm:w-[34%]",
  "right-[2%] top-[8%] w-[34%] sm:w-[30%]",
  "right-[8%] bottom-[2%] w-[36%] sm:w-[32%]",
];

export function Hero({ showcase }: { showcase: TeaserProduct[] }) {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* soft light — brandbook: bright, sunny, not muted */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_85%_20%,var(--color-blue-50)_0%,transparent_70%),radial-gradient(55%_60%_at_10%_90%,var(--color-lime-50)_0%,transparent_70%),radial-gradient(40%_40%_at_60%_70%,var(--color-green-50)_0%,transparent_70%)]"
      />

      <div className="mx-auto grid max-w-page items-center gap-10 px-gutter pb-14 pt-10 md:grid-cols-[1.2fr_1fr] md:gap-8 md:pb-20 md:pt-16 lg:gap-14">
        <div>
          <p
            className="anim-enter inline-flex items-center gap-2.5 rounded-pill bg-white px-3.5 py-1.5 text-sm font-medium text-blue-700 shadow-xs ring-1 ring-line"
            style={cssVars({ "--d": "0ms" })}
          >
            <span className="relative flex size-2.5" aria-hidden="true">
                            <span className="relative size-2.5 rounded-full bg-brand-blue" />
            </span>
            Türkiye&apos;de çok yakında
          </p>

          <h1 id="hero-title" className="anim-rise mt-5 text-display text-ink" style={cssVars({ "--d": "60ms" })}>
            Doğadan ilham alan bakım,{" "}
            <span className="box-decoration-clone bg-[linear-gradient(transparent_68%,color-mix(in_srgb,var(--color-brand-lime)_38%,transparent)_68%,color-mix(in_srgb,var(--color-brand-lime)_38%,transparent)_92%,transparent_92%)] text-green-700">
              Türkiye&apos;ye geliyor
            </span>
          </h1>

          <p className="anim-enter mt-6 max-w-prose text-lg text-ink" style={cssVars({ "--d": "160ms" })}>
            Cilt ve saç bakımından ev temizliğine, tüm aile için Greenleaf ürünleri. Online mağazamız çok yakında açılıyor;
            beklemek istemezseniz şimdi üye olun, ürünleri üyelere özel fiyatla alın.
          </p>

          <div className="anim-enter mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={cssVars({ "--d": "260ms" })}>
            <MembershipCta href={site.sponsorLink} source="yakinda-hero" label="Üye ol – üyelere özel fiyatla alışveriş" newTabLabel={t("common.opensNewTab")} />
            <ButtonLink
              href="#urunler"
              variant="secondary"
              icon={<ArrowDown className="size-[1.1em] transition-transform duration-200 motion-safe:group-hover/btn:translate-y-0.5" />}
            >
              Ürünleri keşfet
            </ButtonLink>
          </div>
          <p className="anim-enter mt-4 text-sm text-ink-muted" style={cssVars({ "--d": "340ms" })}>
            Üyelik kaydı yeni sekmede açılır.
          </p>
        </div>

        {/* Art: abstract leaf sprout + three real products floating */}
        <div className="anim-pop relative mx-auto aspect-[1/0.92] w-full max-w-[34rem]" style={cssVars({ "--d": "120ms" })}>
          <div aria-hidden="true" className="absolute inset-[6%] rounded-full bg-white shadow-card" />
          <LeafCluster className="absolute inset-x-[4%] bottom-[10%] top-[2%] h-[88%] w-[92%]" />
          {showcase.slice(0, 3).map((p, i) => (
            <figure
              key={p.code}
              data-motion="float"
              className={`absolute ${FLOAT_POS[i]}`}
              style={cssVars({ "--d": `${-i * 2.1}s` })}
            >
              <div className="rounded-lg bg-white/95 p-2 shadow-lift ring-1 ring-line/80 backdrop-blur-sm">
                <div className="relative aspect-square overflow-hidden rounded-md bg-white">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 180px, 34vw"
                    priority={i === 0}
                    className="object-contain p-[10%]"
                  />
                </div>
                <figcaption className="px-1 pb-0.5 pt-2 leading-tight">
                  <span className="block text-xs font-medium text-green-700">{p.brand}</span>
                  <span className="block truncate text-xs text-ink">{p.name}</span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>

      <BrandStripe animate="load" />
    </section>
  );
}
