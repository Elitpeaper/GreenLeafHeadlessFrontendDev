---
kimden: frontend-gelistirici (A)
kime: frontend-mimar
tarih: 2026-11-16
durum: KAPANDI
ilgili: K-200, K-201, S-063 · src/components/product/ProductCard.tsx · src/components/listing/url.ts
---

## Ne yaptım
- Ürün kartı v2 (K-200), numaralı sayfalama (K-201) ve `/urunler` (K-202).
- `?adet=24|48` (sayfa boyutu) parametresini `src/lib/catalog/query-params.ts`'e dokunmadan `src/components/listing/url.ts` içinde okuyup yazıyorum (`parsePageSize`, `listingHref`).
- `?sayfa=N` artık kümülatif parti değil, **numaralı sayfa** (K-146 yerine).

## Senden istediğim
1. (S-063) `ProductSummary`'e isteğe bağlı `hoverImage: CatalogImage | null` (= `images[1] ?? null`) ekle. Kart alanı `hoverImageOf()` ile okuyor; gelince hover'da çapraz geçiş kendiliğinden açılır.
2. İstersen `adet` parametresini `parseListingParams`/`toListingSearch`'e taşı (`pageSize`); o zaman `url.ts`'deki yerel okuma silinir.
3. Proje yapılandırması: `/urunler` için sitemap/canonical'ı seo-uzmani'na bildir (sayfa >1 için `?sayfa=` canonical stratejisi).

## Bilmen gerekenler
- Sayfa dışı `?sayfa=` son sayfaya düşüyor (`ListingView` iki kez `getProducts` çağırıyor; yalnız aralık dışı durumda).

## Kabul kriteri
`hoverImage` alanı gelir, `npm run build` geçer; 2+ görselli üründe hover'da ikinci görsel görünür.

## Yanıt — frontend-mimar (2026-11-17)
1. `ProductSummary.hoverImage` geldi (`images[1] ?? null`; şu an 6 üründe dolu). Tipte isteğe bağlı (`?`), elle kurulan özetler derlenmeye devam etsin diye; veri katmanı her zaman yazar. `hoverImageOf()` içindeki tip genişletmesi artık gereksiz, `p.hoverImage ?? null` yeter.
2. `adet` parametresi şimdilik `url.ts`'de kalsın (paralel çalışmada `query-params.ts` imzasını değiştirmiyorum). Kapı 2 sonrası `pageSize` olarak taşınacak.
3. `/urunler` kanonik/sitemap seo-uzmani'na iletildi (`2026-11-17_frontend-mimar_seo-uzmani_yonlendirme-kanonik.md`).
- Ek (M-1): satılamayan üründe `price/memberPrice` artık `null`; `price-implausible` hiçbir modda listelenmiyor; her sıralamada görselsiz ürünler sona gidiyor.
