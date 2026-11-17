---
kimden: frontend-mimar
kime: frontend-gelistirici
tarih: 2026-11-17
durum: AÇIK
ilgili: TASARIM-INCELEME-1 M-1/M-2, TEKNIK-TASARIM §3, §8
---

## Ne yaptım (veri katmanı, sizi etkileyenler)
- M-1: satılamayan üründe `price`/`memberPrice` = `null` (fiyat bloğu kendiliğinden gizlenir); `price-implausible` hiçbir modda listelenmez; her sıralamada görselsiz ürünler sona.
- Yeni: `ProductSummary.hoverImage`, `toProductSummary()`, `getProductsBySlugs()`, `tRaw()` (`@/lib/ui-text`), `getStockImage()` (`@/lib/images`), `@/lib/content/blog`, `bg-gradient-<ad>` / `surface-showcase` / `surface-commerce` yardımcıları, `site.memberLoginUrl`.

## İnceleme bulguları (düzeltin)
1. `@data/*` lib dışında (TEKNIK-TASARIM §8): `src/components/listing/stock.ts:6`, `src/components/sections/media.ts:10` → `getStockImage()`; `src/components/pv/plan.ts:12` → `tRaw()`.
2. Elle kurulan özet `hoverImage`'ı düşürüyor: `src/app/api/urunler/route.ts:18-19` → `getProductsBySlugs()`; `src/components/finder/candidates.ts:26-47` → `toProductSummary(d)`.
3. `src/components/product/ProductCard.tsx:89-91` tip genişletmesi gereksiz → `p.hoverImage ?? null`.
4. Blog importları `@/components/blog/source` → `@/lib/content/blog`; sonra `source.ts` silinir. `src/app/kvkk/` ve `src/app/cerez-politikasi/` artık 308 ile karşılanıyor, silinebilir.
5. K-158/K-231 (WCAG 2.2.2): sonsuz döngülü v0 sınıfları hâlâ kullanımda: `src/app/globals.css:214-224`, `src/components/brand/LeafCluster.tsx:30`, `src/components/sections/Hero.tsx:34,74`, `src/components/sections/home/HomeSlides.tsx:274`, `src/components/sections/parts.tsx:116`. `data-motion` karşılıklarına geçip sınıfları silin (hareket-tasarimcisi ile).
6. Lint uyarısı: `src/components/sections/home/Manifesto.tsx:2,12` kullanılmayan değişkenler.

## Kabul kriteri
`grep '@data/' src` yalnız `src/lib/` döndürür; `npm run lint` src/ için uyarısız; build geçer.

## A yanıtı (2026-11-17)
Kapsam A: ProductCard hoverImage tip genişletmesi kaldırıldı (madde 3), listing/stock.ts getStockImage (madde 1 kısmen). Açık: media.ts, pv/plan.ts, api/urunler/route.ts, finder/candidates.ts, blog importları, v0 sonsuz döngü sınıfları, Manifesto.tsx (A sahibi değil / B-C).
