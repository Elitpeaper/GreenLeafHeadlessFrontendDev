import type { Metadata } from "next";
import Image from "next/image";
import { getStockImage } from "@/lib/images";
import Link from "next/link";
import { ComingSoonBadge } from "@/components/coming-soon/ComingSoonBadge";
import { siteReady } from "@/components/coming-soon/placeholders";
import { Manifesto } from "@/components/sections/home/Manifesto";
import { HeroPhoto, PageHero, creamCta, creamLink } from "@/components/sections/PageHero";
import { Leaf, Mail, Phone, ShieldCheck } from "@/components/ui/lucide";
import { Tag } from "@/components/ui/icons";
import { site } from "@/config/site";
import { t } from "@/components/sections/copy";

export const metadata: Metadata = { title: t("about.title"), description: t("about.body") };

/**
 * About + contact (K-033). Carries the brand story, manifesto + "Neden Greenleaf" and the trust strip that used to sit
 * on the home page (K-178). Seller identity comes from src/config/site.ts (K-047); placeholder values are never shown
 * or linked — each contact row shows "Çok yakında" until the real value lands (K-181/K-182).
 */
export default function AboutPage() {
  const life = ["about.family", "about.home", "about.growth"].flatMap((k) => {
    const p = getStockImage(k);
    return p ? [p] : [];
  });
  const trust = [
    { icon: Tag, text: t("home.trust.prices") },
    { icon: Leaf, text: t("brand.originNote") },
    { icon: ShieldCheck, text: t("common.currencyNote") },
  ];
  const contact = [
    { key: "email", icon: Mail, label: site.email, href: `mailto:${site.email}`, ready: siteReady.email, name: t("about.contact.email") },
    { key: "phone", icon: Phone, label: site.phone.display, href: `tel:${site.phone.e164}`, ready: siteReady.phone, name: t("about.contact.phone") },
  ];

  return (
    <>
      <PageHero
        id="about-title"
        eyebrow={t("brand.name")}
        title={t("about.title")}
        body={t("about.body")}
        actions={
          <>
            <Link href="#iletisim" className={creamCta}>
              {t("about.contact.title")}
            </Link>
            <Link href="/sertifikalar" className={creamLink}>
              {t("home.certificates.title")} <span aria-hidden="true">→</span>
            </Link>
          </>
        }
        visual={<HeroPhoto slot="page.hakkimizda.hero" />}
      />

      {/* Manifesto + Neden Greenleaf (moved from the home page) as a leaf-segment panel (K-188) */}
      <Manifesto showStoryLink={false} panel />
      {/* Trust strip — verifiable statements only */}
      <section aria-labelledby="trust-title" className="mx-auto max-w-page px-gutter">
        <h2 id="trust-title" className="sr-only">
          {t("about.trust.title")}
        </h2>
        <ul className="grid gap-3 rounded-lg bg-surface-muted p-4 sm:grid-cols-3 sm:p-5">
          {trust.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3 text-sm text-ink">
              <Icon size={24} className="shrink-0 text-green-700" />
              {text}
            </li>
          ))}
        </ul>
      </section>

      {life.length > 0 && (
        <section aria-label={t("about.title")} className="mx-auto max-w-page px-gutter pt-section">
          <ul className="grid grid-cols-3 gap-3 sm:gap-grid-gap">
            {life.map((p) => (
              <li key={p.src} className="relative aspect-[3/4] overflow-hidden rounded-tile bg-surface-muted shadow-card">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1280px) 400px, 33vw"
                  className="object-cover"
                  placeholder={p.blurDataURL ? "blur" : "empty"}
                  blurDataURL={p.blurDataURL}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section id="iletisim" aria-labelledby="contact-title" className="mx-auto max-w-page scroll-mt-32 px-gutter py-section">
        <h2 id="contact-title" className="text-3xl text-ink">
          {t("about.contact.title")}
        </h2>
        <ul className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-2">
          {contact.map(({ key, icon: Icon, label, href, ready, name }) => (
            <li key={key}>
              {ready ? (
                <a href={href} className="flex min-h-control-lg items-center gap-3 rounded-lg bg-surface px-5 ring-1 ring-line transition-shadow hover:shadow-card">
                  <Icon size={22} className="shrink-0 text-green-700" /> {label}
                </a>
              ) : (
                <div className="flex min-h-control-lg items-center gap-3 rounded-lg bg-surface px-5 ring-1 ring-line">
                  <Icon size={22} className="shrink-0 text-green-700" />
                  <span className="text-ink">{name}</span>
                  <ComingSoonBadge className="ml-auto" />
                </div>
              )}
            </li>
          ))}
        </ul>
        {siteReady.sellerName && (
          <p className="mt-4 text-base text-ink">
            {site.sellerName} · {site.sellerTitle}
          </p>
        )}
        <p className="mt-6 max-w-prose text-sm text-ink-muted">{t("brand.unofficial")}</p>
      </section>
    </>
  );
}
