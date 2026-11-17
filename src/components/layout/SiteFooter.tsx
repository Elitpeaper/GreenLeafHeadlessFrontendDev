import Link from "next/link";
import { BrandStripe } from "@/components/brand/BrandStripe";
import { Logo } from "@/components/brand/Logo";
import { Mail, Phone } from "@/components/ui/icons";
import { ComingSoonLink, siteReady } from "@/components/coming-soon";
import { site } from "@/config/site";
import { t } from "@/lib/ui-text";

const linkCls = "rounded-sm text-ink-muted transition-colors hover:text-green-700";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-page gap-10 px-gutter py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo height={40} className="h-10 w-auto" />
          <p className="mt-5 max-w-sm text-sm text-ink-muted">
            Greenleaf ürünlerini Türkiye&apos;de tanıtan bağımsız distribütör sitesi. Online mağazamız çok yakında
            açılıyor.
          </p>
        </div>

        <div>
          <h2 className="text-base text-ink">İletişim</h2>
          <address className="mt-4 space-y-2 text-sm not-italic">
            {siteReady.sellerName && <p className="font-medium text-ink">{site.sellerName}</p>}
            <p className="text-ink-muted">{site.sellerTitle}</p>
            <p>
              <ComingSoonLink href={`mailto:${site.email}`} className={`${linkCls} inline-flex items-center gap-2`} soonClassName="text-ink-muted">
                <Mail className="size-4 shrink-0" />
                {siteReady.email ? site.email : t("about.contact.email")}
              </ComingSoonLink>
            </p>
            <p>
              <ComingSoonLink href={`tel:${site.phone.e164}`} className={`${linkCls} inline-flex items-center gap-2`} soonClassName="text-ink-muted">
                <Phone className="size-4 shrink-0" />
                {siteReady.phone ? site.phone.display : t("about.contact.phone")}
              </ComingSoonLink>
            </p>
          </address>
        </div>

        <nav aria-label="Alt bilgi">
          <h2 className="text-base text-ink">Bilgi</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/yakinda#urunler" className={linkCls}>
                Ürünler
              </Link>
            </li>
            <li>
              <Link href="/yakinda#uyelik" className={linkCls}>
                Üyelik
              </Link>
            </li>
            <li>
              <Link href="/yasal/kvkk-aydinlatma-metni" className={linkCls}>
                KVKK Aydınlatma Metni
              </Link>
            </li>
            <li>
              <Link href="/cerez-politikasi" className={linkCls}>
                Çerez Politikası
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="mx-auto max-w-page border-t border-line px-gutter py-6 text-xs text-ink-muted">
        <p>
          © {site.copyrightYear}{siteReady.sellerName ? ` ${site.sellerName}` : ""}. Bu site Greenleaf&apos;in resmî sitesi değildir; bağımsız bir
          Greenleaf distribütörü tarafından işletilir. Greenleaf adı ve logosu marka sahibine aittir.
        </p>
      </div>
      <BrandStripe />
    </footer>
  );
}
