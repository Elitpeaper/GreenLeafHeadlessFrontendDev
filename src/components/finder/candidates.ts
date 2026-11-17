/**
 * Server-side: builds the finder candidate list (CILT-TESTI §4 Adım 1) from the data layer.
 * Uses whatever skinType tags exist in the catalog. Only if NO product is tagged at all, products fall back to the
 * category default step (§3.3) as "tum-ciltler" so the finder still returns a routine. No UI notice either way.
 */
import { CATEGORY_DEFAULT_STEP, type FinderCandidate } from "@/lib/catalog/skin";
import { getProduct, getProducts, type ProductSummary } from "@/lib/products";

export type FinderProduct = FinderCandidate & { product: ProductSummary };

export async function getFinderCandidates(): Promise<FinderProduct[]> {
  const [skin, sets] = await Promise.all([
    getProducts({ category: "cilt-bakimi", pageSize: 2000 }),
    getProducts({ category: "setler", pageSize: 200 }),
  ]);
  const details = await Promise.all([...skin.items, ...sets.items].map((p) => getProduct(p.slug)));
  const tagged = details.some((d) => d && d.skinType.length > 0);
  const out: FinderProduct[] = [];
  for (const d of details) {
    if (!d || d.regulated) continue;
    const path = d.category.child ? `${d.category.root}/${d.category.child}` : d.category.root;
    const routineStep = d.routineStep ?? (tagged ? null : (CATEGORY_DEFAULT_STEP[path] ?? null));
    const skinType = tagged ? d.skinType : ["tum-ciltler"];
    if (!d.isSet && (!routineStep || skinType.length === 0)) continue;
    if (d.isSet && !tagged) continue; // no quizRoutine data yet
    const summary: ProductSummary = {
      id: d.id,
      slug: d.slug,
      href: d.href,
      code: d.code,
      name: d.name,
      nameIsFallback: d.nameIsFallback,
      brand: d.brand,
      category: d.category,
      availability: d.availability,
      sellable: d.sellable,
      price: d.price,
      memberPrice: d.memberPrice,
      pv: d.pv,
      image: d.image,
      volume: d.volume,
      isSet: d.isSet,
      theme: d.theme,
      accent: d.accent,
      regulated: d.regulated,
      shortDescription: null,
    };
    out.push({
      id: d.id,
      code: d.code,
      skinType,
      concerns: d.concerns,
      routineStep,
      availability: d.availability,
      price: d.price,
      isSet: d.isSet,
      product: summary,
    });
  }
  return out;
}
