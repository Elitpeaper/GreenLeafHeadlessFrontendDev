/**
 * Forest footer (K-189, replaces K-078): forest-800 → forest-950 gradient + felt grain, radius.panel top corners,
 * cream-100 text (9.12+), logo on a white plate (logo only on white), light "Çok yakında" pills, signature stripe last.
 * Desktop: brand column + 4 link columns. Mobile: brand + PV strip on top, link columns as accordions (<details>),
 * legal links always flat (visible), seller band + stripe last. Certificate mini badges: none until PDFs exist (K-058).
 * Motion hooks: data-motion="footer-stripe" | "footer-watermark".
 */
import Link from "next/link";
import { BrandStripe } from "@/components/brand/BrandStripe";
import { LeafCluster } from "@/components/brand/LeafCluster";
import { TextureGrain } from "@/components/illustrations/textures";
import { ComingSoonBadge, ComingSoonLink, siteReady } from "@/components/coming-soon";
import { Logo } from "@/components/brand/Logo";
import { MotionToggle } from "@/components/motion/MotionToggle";
import { HideOnHome } from "./HideOnHome";
import { ArrowRight, ChevronDown, Mail, Phone, Sprout } from "@/components/ui/lucide";
import { site } from "@/config/site";
import { t } from "@/lib/ui-text";
import type { MenuRoot } from "./menu-data";

/** soon = target page exists but shows the K-181 "Çok yakında" state → K-182 badge next to the link. */
type FLink = { href: string; label: string; soon?: boolean };

export function Footer({ roots }: { roots: MenuRoot[] }) {
  const columns: { title: string; links: FLink[] }[] = [
    { title: t("footer.col.shop"), links: roots.map((r) => ({ href: r.href, label: r.title })) },
    {
      title: t("footer.col.explore"),
      links: [
        { href: "/urunler", label: t("footer.link.products") },
        { href: "/koleksiyon/turkiyede-satista", label: t("footer.link.inStock") },
        { href: "/kategori/setler", label: t("footer.link.sets") },
        { href: "/cilt-tipine-gore", label: t("footer.link.finder") },
        { href: "/favoriler", label: t("footer.link.favorites") },
      ],
    },
    {
      title: t("footer.col.info"),
      links: [
        { href: "/hakkimizda", label: t("footer.link.about") },
        { href: "/sertifikalar", label: t("footer.link.certificates") },
        { href: "/uye-ol", label: t("footer.link.membership") },
        { href: "/pv-nedir", label: t("footer.link.pv") },
      ],
    },
  ];
  const legal: FLink[] = [
    { href: "/yasal/kvkk-aydinlatma-metni", label: t("footer.link.kvkk"), soon: true },
    { href: "/yasal/cerez-politikasi", label: t("footer.link.cookies"), soon: true },
    { href: "/yasal/e-posta-acik-riza", label: t("footer.link.emailConsent"), soon: true },
  ];
  const linkCls =
    "inline-flex min-h-tap-min items-center text-sm text-cream-100 transition-[color,translate] duration-250 hover:text-white motion-safe:hover:translate-x-1";
  const item = (l: FLink) => (
    <span className="inline-flex flex-wrap items-center gap-x-2">
      <Link href={l.href} className={linkCls}>
        {/* K-272: underline draws in from the left on hover/focus (motion.css [data-link-draw]) */}
        <span data-link-draw="">{l.label}</span>
      </Link>
      {l.soon && <ComingSoonBadge tone="onDark" />}
    </span>
  );
  const seller = siteReady.sellerName ? site.sellerName : t("brand.siteName");

  return (
    <footer
      className="relative -mt-9 overflow-hidden rounded-t-panel bg-gradient-forest-deep text-cream-100"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <TextureGrain strength={0.12} />
      </div>
      <LeafCluster className="pointer-events-none absolute -bottom-10 -right-16 w-[28rem] opacity-[0.10]" />

      <div className="relative mx-auto max-w-page px-gutter pt-[calc(var(--spacing-section-tight)+2.25rem)]">
        {/* [A] PV + finder strip (hidden on home, A-11) */}
        <HideOnHome>
        <div className="grid gap-4 rounded-tile bg-surface p-5 text-ink shadow-card-on-forest sm:p-6 md:grid-cols-2 md:gap-8">
          <div className="flex items-start gap-4">
            <span aria-hidden="true" className="grid h-10 min-w-14 shrink-0 place-items-center rounded-pill bg-lime-100 text-sm font-bold text-lime-700">
              PV
            </span>
            <p className="text-base">
              {t("footer.pvStrip")}{" "}
              <Link href="/pv-nedir" className="font-medium text-green-700 underline underline-offset-4 transition-colors duration-250 hover:text-green-800">
                {t("footer.pvStrip.link")}
              </Link>
            </p>
          </div>
          <Link href="/cilt-tipine-gore" className="group flex items-start gap-4 md:border-l md:border-line md:pl-8">
            <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-700">
              <Sprout size={22} />
            </span>
            <span className="text-base">
              <span className="font-medium text-ink transition-colors duration-250 group-hover:text-green-800">{t("footer.link.finder")}</span>
              <span className="block text-sm text-ink-muted">{t("footer.finderStrip")}</span>
            </span>
            <ArrowRight size={20} className="ml-auto mt-1 shrink-0 text-green-700 transition-transform duration-250 motion-safe:group-hover:translate-x-1" />
          </Link>
        </div>

        </HideOnHome>

        {/* [B] Columns */}
        <nav aria-label={t("footer.nav.aria")} className="mt-stack grid gap-grid-gap lg:grid-cols-[1.4fr_1.6fr_1fr_1fr_1fr]">
          <div className="pb-4 lg:pr-6">
            <div className="inline-flex rounded-tile bg-surface p-4 shadow-long">
              <Logo height={36} />
            </div>
            <p className="mt-4 max-w-sm text-sm text-cream-100">{t("footer.about")}</p>
            <p className="mt-2 max-w-sm text-sm text-cream-100/90">{t("brand.originNote")}</p>
          </div>

          {/* Desktop columns */}
          {columns.map((c, i) => (
            <div key={c.title} className="hidden lg:block">
              <h2 className="font-sans text-sm font-semibold tracking-normal text-cream-200">{c.title}</h2>
              <ul className={`mt-3 ${i === 0 ? "grid grid-cols-2 gap-x-4" : ""}`}>
                {c.links.map((l) => (
                  <li key={l.href}>
                    {item(l)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="hidden lg:block">
            <h2 className="font-sans text-sm font-semibold tracking-normal text-cream-200">{t("footer.col.legal")}</h2>
            <ul className="mt-3">
              {legal.map((l) => (
                <li key={l.href}>
                  {item(l)}
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile accordions */}
          <div className="divide-y divide-cream-100/20 border-y border-cream-100/20 lg:hidden">
            {columns.map((c) => (
              <details key={c.title} className="group/acc">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between text-base font-semibold [&::-webkit-details-marker]:hidden">
                  <h2 className="font-sans text-base font-semibold tracking-normal text-cream-200">{c.title}</h2>
                  <ChevronDown size={22} className="text-cream-100 transition-transform duration-250 group-open/acc:rotate-180" />
                </summary>
                <ul className="grid grid-cols-2 gap-x-4 pb-4">
                  {c.links.map((l) => (
                    <li key={l.href}>
                      {item(l)}
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
          <ul className="flex flex-wrap gap-x-6 lg:hidden">
            {legal.map((l) => (
              <li key={l.href}>
                {item(l)}
              </li>
            ))}
          </ul>
        </nav>

        {/* [C] Seller band */}
        <div className="mt-stack flex flex-col gap-3 border-t border-cream-100/20 py-6 text-sm text-cream-100 md:flex-row md:flex-wrap md:items-center md:gap-x-8">
          <p className="font-medium text-cream-200">
            {siteReady.sellerName ? `${site.sellerName} — ${site.sellerTitle}` : site.sellerTitle}
          </p>
          {/* K-182: placeholder contact values are never links — icon + "Çok yakında" pill until site.ts is filled. */}
          <span className="inline-flex min-h-tap-min items-center gap-2">
            <Mail size={18} />
            <ComingSoonLink href={`mailto:${site.email}`} hideLabelWhenSoon badge={{ tone: "onDark" }} className="transition-colors duration-250 hover:text-white">
              {site.email}
            </ComingSoonLink>
          </span>
          <span className="inline-flex min-h-tap-min items-center gap-2">
            <Phone size={18} />
            <ComingSoonLink href={`tel:${site.phone.e164}`} hideLabelWhenSoon badge={{ tone: "onDark" }} className="transition-colors duration-250 hover:text-white">
              {site.phone.display}
            </ComingSoonLink>
          </span>
          {/* K-264: visible "Hareketi azalt" switch (site opens with full motion whatever the OS setting) */}
          <MotionToggle label={t("motion.toggle.label")} hint={t("motion.toggle.hint")} className="md:ml-auto" />
          <p className="md:basis-full">{t("footer.copyright", { year: site.copyrightYear, seller, unofficial: t("brand.unofficial") })}</p>
        </div>
      </div>

      {/* [D] Signature stripe */}
      <BrandStripe animate="scroll" className="relative" />
    </footer>
  );
}
