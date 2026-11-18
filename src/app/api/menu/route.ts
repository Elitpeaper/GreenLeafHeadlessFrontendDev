import { getMenuMedia } from "@/components/shell/menu-data";
import { getCategoryTree } from "@/lib/products";

/**
 * GET /api/menu -> MenuMediaMap (K-288 / P-08): category images, covers, featured product and promo per root.
 * Reads build-time catalog data only, so it is prerendered as a static JSON file (Cache Components model).
 * Fetched by the mega menu / mobile drawer on first intent (src/components/shell/menu-media.ts).
 */
export async function GET() {
  return Response.json(await getMenuMedia(await getCategoryTree()));
}
