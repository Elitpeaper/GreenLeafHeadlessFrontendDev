import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { Membership } from "@/components/sections/Membership";
import { ProductTeaser } from "@/components/sections/ProductTeaser";
import { WhyGreenleaf } from "@/components/sections/WhyGreenleaf";
import { getTeaserProducts } from "@/lib/products";

/** K-046 interim landing ("yakında + üye ol"). Kept reachable at /yakinda after the full store took over "/" (K-063). */
const title = "Greenleaf Türkiye — Çok yakında";
const description =
  "Doğadan ilham alan Greenleaf bakım ve ev ürünleri Türkiye'ye geliyor. Şimdi üye olun, ürünleri üyelere özel fiyatla alın.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/yakinda" },
  openGraph: { type: "website", locale: "tr_TR", url: "/yakinda", siteName: "Greenleaf Türkiye", title, description },
  twitter: { card: "summary_large_image", title, description },
};

export default function ComingSoonPage() {
  const products = getTeaserProducts();

  return (
    <>
      <SiteHeader />
      <main id="icerik" tabIndex={-1} className="outline-none">
        <Hero showcase={products} />
        <ProductTeaser products={products} />
        <WhyGreenleaf />
        <Membership />
      </main>
      <SiteFooter />
    </>
  );
}
