/**
 * Site header (bilesenler/header.md, K-017, K-062, K-064, K-066). Always plain white (no transparent variant).
 * - Sticky block = thin stripe + main row; it is hover-recolor zone Z2 (id "header-accent", linked from mega menu Z1).
 * - Sub-navigation row (≥ 1024px) is NOT sticky: it scrolls away, which gives the "compact" state with zero layout
 *   shift (header.md §4). Height-shrink motion (H6) is left to hareket-tasarimcisi.
 */
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { stockPhoto } from "@/components/listing/stock";
import { Sprout } from "@/components/ui/lucide";
import type { SiteNavGroup } from "@/lib/site-nav";
import { t } from "@/lib/ui-text";
import { ExploreCompass, ExploreHost, ExploreTrigger } from "./Explore";
import { AccountMenu, CartButton, FavoritesLink } from "./HeaderActions";
import { HeaderSearch } from "./HeaderSearch";
import type { MenuRootNav } from "./menu-model";
import { MobileNav } from "./MobileNav";
import { MobileSearch } from "./MobileSearch";

export function Header({ roots, siteNav }: { roots: MenuRootNav[]; siteNav: SiteNavGroup[] }) {
  const quickLinks = roots.slice(0, 6).map((r) => ({ href: r.href, title: r.title }));
  // Mobile search sheet empty state: every root + all products (K-290, K-266)
  const sheetLinks = [...roots.map((r) => ({ href: r.href, title: r.title })), { href: "/urunler", title: t("megaMenu.allProducts") }];
  return (
    <>
      <header id="header-accent" data-smart-header="" data-accent-zone="" className="sticky top-0 z-(--z-header) border-b border-line bg-surface">
        <div aria-hidden="true" className="grid h-1 grid-rows-[2px_1px_1px]" data-motion="header-stripe">
          <span className="bg-stripe-1" />
          <span className="bg-stripe-2" />
          <span className="bg-stripe-3" />
        </div>
        <div className="relative">
          <div className="mx-auto flex h-header-compact max-w-wide items-center gap-2 px-3 sm:px-gutter lg:h-header lg:gap-4">
            <MobileNav roots={roots} siteNav={siteNav} />
            <Link
              href="/"
              aria-label={t("product.breadcrumb.home")}
              className="mx-auto flex shrink-0 items-center rounded-sm lg:mx-0"
            >
              <Logo height={34} priority className="h-7 w-auto sm:h-8 lg:h-9" />
            </Link>
            <HeaderSearch roots={roots} quickLinks={quickLinks} />
            <div className="flex items-center gap-0.5 lg:ml-auto lg:gap-1">
              <MobileSearch roots={roots} quickLinks={sheetLinks} />
              <ExploreCompass />
              <AccountMenu />
              <FavoritesLink />
              <CartButton />
            </div>
            <Link
              href="/uye-ol"
              data-motion="cta-member"
              className="hidden min-h-control items-center rounded-pill bg-green-700 px-6 font-medium text-white shadow-button transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-green-800 lg:inline-flex"
            >
              {t("header.cta.membership")}
            </Link>
          </div>
          <ExploreHost nav={siteNav} photo={stockPhoto("nature.sunlit-branch")} />
        </div>
      </header>

      <nav id="header-subnav" aria-label={t("header.nav.secondary")} className="hidden border-b border-line bg-surface lg:block">
        <div className="mx-auto flex h-header-subnav max-w-wide items-center gap-8 px-gutter text-sm font-medium">
          <Link href="/koleksiyon/turkiyede-satista" className="subnav-link">
            {t("header.nav.inStock")}
          </Link>
          <Link href="/kategori/setler" className="subnav-link">
            {t("header.nav.sets")}
          </Link>
          <Link href="/cilt-tipine-gore" className="subnav-link inline-flex items-center gap-1.5">
            <Sprout size={18} className="text-green-700" />
            {t("header.nav.finder")}
          </Link>
          <Link href="/blog" className="subnav-link">
            {t("siteNav.blog")}
          </Link>
          <Link href="/haberler" className="subnav-link">
            {t("siteNav.news")}
          </Link>
          <span className="ml-auto" />
          <Link href="/pv-nedir" className="subnav-link inline-flex items-center gap-2 text-lime-700">
            <span aria-hidden="true" className="rounded-pill bg-lime-100 px-2 py-0.5 text-xs font-semibold">
              PV
            </span>
            {t("header.nav.pv")}
          </Link>
          <Link href="/sss" className="subnav-link">
            {t("siteNav.faq")}
          </Link>
          <ExploreTrigger />
        </div>
      </nav>
    </>
  );
}
