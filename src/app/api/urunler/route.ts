import type { NextRequest } from "next/server";
import { getProduct, type ProductSummary } from "@/lib/products";

/**
 * GET /api/urunler?slug=a,b,c -> ProductSummary[] (in request order, unknown slugs skipped). Max 60 per request.
 * Used by /favoriler (device-local favourites store slugs only, K-033).
 */
export async function GET(request: NextRequest) {
  const slugs = (request.nextUrl.searchParams.get("slug") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 60);
  const out: ProductSummary[] = [];
  for (const slug of slugs) {
    const p = await getProduct(slug);
    if (!p) continue;
    const { id, href, code, name, nameIsFallback, brand, category, availability, sellable, price, memberPrice, pv, image, volume, isSet, theme, accent, regulated, shortDescription } = p;
    out.push({ id, slug, href, code, name, nameIsFallback, brand, category, availability, sellable, price, memberPrice, pv, image, volume, isSet, theme, accent, regulated, shortDescription });
  }
  return Response.json(out, { headers: { "Cache-Control": "public, max-age=60, s-maxage=600" } });
}
