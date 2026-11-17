import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductView } from "@/components/pdp/ProductView";
import { getCollection, getProduct, getRelatedProducts, getStaticProductSlugs } from "@/lib/products";

/** Prerender all TR products + themed + a sample of "yakında"; other slugs render on first request. */
export async function generateStaticParams() {
  return (await getStaticProductSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/urun/[slug]">): Promise<Metadata> {
  const p = await getProduct((await params).slug);
  if (!p) return {};
  // Preview-only fallback names must never be indexed (K-024). Final title/JSON-LD: seo-uzmani (src/lib/seo/).
  return {
    title: `${p.name} | ${p.brand.title}`,
    description: p.shortDescription ?? undefined,
    robots: p.nameIsFallback ? { index: false, follow: false } : undefined,
  };
}

/** PDP (wireframe/urun-detay.md). "Yakında": related rail shows only TR products (K-052), up to 8. */
export default async function ProductPage({ params }: PageProps<"/urun/[slug]">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const comingSoon = product.availability === "yakinda";
  const [related, premium] = await Promise.all([
    getRelatedProducts(slug, comingSoon ? 24 : 4),
    product.theme ? getCollection("premium-gold", { limit: 0 }) : Promise.resolve(null),
  ]);
  const rail = comingSoon ? related.filter((r) => r.availability === "tr").slice(0, 8) : related;
  return <ProductView product={product} related={rail} inPremiumCollection={premium?.title ?? null} />;
}
