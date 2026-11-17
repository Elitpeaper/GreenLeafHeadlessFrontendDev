import type { NextRequest } from "next/server";
import { searchProductsScoped } from "@/lib/products";

/**
 * Instant-search endpoint for the header panel (K-028, K-268):
 *   GET /api/arama?q=…&limit=8[&kok=cilt-bakimi] -> SearchHit[]
 * Response headers (body stays an array so existing consumers keep working):
 *   X-Search-Total  total matches in the scope (for "Cilt Bakımı'nda 12 sonuç")
 *   X-Search-Scope  resolved root slug, or "" when the search ran over all products (unknown/empty `kok` is ignored)
 * Keeps the 1.6k-product index on the server; the client sends one small request per (debounced) keystroke.
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const q = params.get("q")?.trim().slice(0, 80) ?? "";
  const limit = Math.min(20, Math.max(1, Number(params.get("limit")) || 8));
  const kok = params.get("kok")?.trim().slice(0, 60) || null;
  const { hits, total, scope } = q.length >= 2 ? await searchProductsScoped(q, limit, kok) : { hits: [], total: 0, scope: null };
  return Response.json(hits, {
    headers: {
      "Cache-Control": "public, max-age=60, s-maxage=600",
      "X-Search-Total": String(total),
      "X-Search-Scope": scope?.root ?? "",
    },
  });
}
