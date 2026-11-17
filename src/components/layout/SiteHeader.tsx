import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ComingSoonBadge, siteReady } from "@/components/coming-soon";
import { site } from "@/config/site";

const NAV = [
  { href: "/yakinda#urunler", label: "Ürünler" },
  { href: "/yakinda#neden-greenleaf", label: "Neden Greenleaf" },
  { href: "/yakinda#uyelik", label: "Üyelik" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/85 backdrop-blur-md supports-[not(backdrop-filter:blur(1px))]:bg-white">
      {/* brandbook inner-page header: green top band */}
      <div aria-hidden="true" className="h-1 bg-brand-green" />
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-4 px-gutter md:h-20">
        <a href="#icerik" className="shrink-0 rounded-sm" aria-label="Greenleaf — sayfanın başı">
          <Logo height={34} priority className="h-[30px] w-auto sm:h-[36px] md:h-[42px]" />
        </a>
        <nav aria-label="Sayfa içi" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm text-ink">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="relative py-2 transition-colors hover:text-green-700 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-brand-green after:transition-transform after:duration-300 after:ease-out-expo hover:after:scale-x-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {siteReady.sponsorLink ? (
          <ButtonLink href={site.sponsorLink} external size="md" className="shrink-0">
            Üye ol
          </ButtonLink>
        ) : (
          <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-ink">
            Üye ol <ComingSoonBadge />
          </span>
        )}
      </div>
    </header>
  );
}
