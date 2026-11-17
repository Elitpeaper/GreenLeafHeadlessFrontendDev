import { HomeDoors, type DoorDef } from "@/components/sections/home/HomeDoors";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { Shelves } from "@/components/sections/home/Shelves";
import { Showcase } from "@/components/sections/home/Showcase";
import { Brands } from "@/components/sections/home/StoryBrands";
import { TabbedShowcase } from "@/components/sections/home/TabbedShowcase";
import { home } from "@/config/storefront";
import { getBrands, getCategoryTree, getCollection, getProducts, getProductsByCodes, type ProductSummary } from "@/lib/products";
import { t } from "@/components/sections/copy";

const featurable = (p: ProductSummary) => !p.regulated; // K-095: regulated items are never featured

/**
 * /haberler (K-180, built by another stream). If the route is ever unavailable set true: the door renders without a link and
 * with the "Çok yakında" pill (K-182).
 */
const NEWS_SOON = false;

/**
 * Home v2 "Maksimalist" (K-233, K-234; brief ana-sayfa-maximalist.md §1): hero "Mühür" (logo roll-in + 5-slide swiper in one
 * scene) → Dev şerit (the page's one band) → Raflar (category bento) → Vitrin 1 → Kapılar (promo bento, K-178) →
 * Vitrin 2 (tabs) → Marka duvarı → footer. The rich PV / premium / finder / membership content stays on its own pages.
 * No product appears in two showcases (K-008); hero packshots show PV only (hero exception, K-062).
 */
export default async function HomePage() {
  const [hero, primary, premium, tree, brands] = await Promise.all([
    getProductsByCodes(home.heroCodes),
    getCollection(home.primaryCollection, { limit: 20 }),
    getCollection(home.premiumCollection, { limit: 6 }),
    getCategoryTree(),
    getBrands(),
  ]);

  const primaryItems = (primary?.products ?? []).filter(featurable);
  const withImage = primaryItems.filter((p) => p.image);
  const vitrin1 = withImage.slice(0, 8);
  const slideTr = withImage.slice(8, 11).length === 3 ? withImage.slice(8, 11) : withImage.slice(0, 3);
  const slidePv = withImage.slice(11, 14).length === 3 ? withImage.slice(11, 14) : withImage.slice(0, 3);
  const shownIds = new Set(vitrin1.map((p) => p.id));

  const tabs = await Promise.all(
    home.tabs.map(async (root) => {
      const node = tree.find((c) => c.root === root);
      const page = await getProducts({ category: root, excludeIds: [...shownIds], pageSize: 24 });
      return {
        key: root,
        label: node?.title ?? root,
        href: node?.href ?? `/kategori/${root}`,
        linkLabel: t("home.showcase2.allIn", { kategori: node?.title ?? root }),
        products: page.items.filter(featurable),
      };
    }),
  );

  const premiumLead = premium?.products.find((p) => p.image) ?? null;
  const doors: DoorDef[] = [
    { key: "pv", href: "/pv-nedir", title: t("home.v2.gates.pv.title"), body: t("home.v2.gates.pv.body") },
    { key: "finder", href: "/cilt-tipine-gore", title: t("home.v2.gates.finder.title"), body: t("home.v2.gates.finder.body") },
    ...(premium ? [{ key: "premium" as const, href: premium.href, title: t("home.v2.gates.premium.title"), body: t("home.v2.gates.premium.body") }] : []),
    { key: "membership", href: "/uye-ol", title: t("home.v2.gates.member.title"), body: t("home.v2.gates.member.body") },
    { key: "news", href: "/haberler", title: t("home.v2.gates.news.title"), body: t("home.v2.gates.news.body"), soon: NEWS_SOON },
  ];

  const trBrands = [...brands].sort((a, b) => b.count - a.count);

  return (
    <>
      <HomeHero heroProducts={hero} trProducts={slideTr} premium={premium} pvProducts={slidePv} />
      <Shelves roots={tree} />
      {primary && (
        <Showcase
          id="vitrin1-title"
          eyebrow={t("home.v2.showcase1.eyebrow")}
          title={t("home.v2.showcase1.title")}
          lead={t("home.showcase1.body")}
          href={primary.href}
          total={primary.total}
          products={vitrin1}
        />
      )}
      <HomeDoors items={doors} premiumProduct={premiumLead} pvProducts={slidePv} />
      <TabbedShowcase tabs={tabs} />
      <Brands brands={trBrands} />
    </>
  );
}
