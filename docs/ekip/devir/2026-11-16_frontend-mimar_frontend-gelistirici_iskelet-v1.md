---
kimden: frontend-mimar
kime: frontend-gelistirici
tarih: 2026-11-16
durum: AÇIK
ilgili: K-120…K-126 (ÖNERİ), docs/teknik/TEKNIK-TASARIM.md v1, src/lib/products.ts, src/components/shell/
---

## Ne yaptım
Faz 2 önizleme iskeleti hazır: tüm SAYFA-HARITASI rotaları başlıklarıyla render oluyor, veri katmanı, sepet, tema altyapısı çalışıyor. `npm run lint`, `npm test`, `npm run build` geçiyor (111 sayfa; `NEXT_PUBLIC_PREVIEW_ALL=1` ile 189).

## Senden istediğim
Sayfaları wireframe + bileşen spesifikasyonlarına göre doldur. Aşağıdaki genişleme noktalarını kullan, sözleşmeyi bozma.

## Bilmen gerekenler — genişleme noktaları
**Veri (tek giriş kapısı):** `import { getProducts, getProduct, getCategoryTree, getCollection, … } from "@/lib/products"` ve tipler aynı yerden (`ProductSummary`, `ProductDetail`, `CategoryNode`, `Collection`, `ProductPage`). Hepsi `async`. `@data/*` veya `data/*.json` import etme. İstemci bileşeni `@/lib/products` import edemez (3,6 MB JSON) — sunucuda çek, prop ver.
- Kart için gereken her şey `ProductSummary`'de: `name`, `nameIsFallback` (true ise görünür "önizleme adı" işareti ZORUNLU), `brand.title`, `availability` ("yakinda" → rozet, fiyat yok), `sellable` (yalnız true ise "Sepete ekle"), `price` ("Fiyat"), `memberPrice` (yeşil rozet "Üye fiyatı"), `pv` (null → PV öğesi yok), `image` (null → yer tutucu; `remote: true` ise width/height yok → `fill` + kare kutu), `theme` (premium kart varyantı), `accent` (palet), `regulated` (öne çıkarma yok + PDP notu).
- Liste filtreleri URL'de: `parseListingParams` / `toListingSearch` (`@/lib/catalog/query-params`): `q, marka, fiyat=min-max, siralama, sayfa, stok=tr, tip, ihtiyac`. `searchParams` okuyan kısmı `<Suspense>` içine koy (Cache Components; örnek: `app/(magaza)/kategori/[kok]/[[...alt]]/page.tsx`). Facet'ler `page.facets` içinde.
- Anlık arama paneli: `fetch("/api/arama?q=…&limit=8")` → `SearchHit[]` (en az 2 karakter; debounce sende).
- Ana sayfa verisi bağlı (`app/(magaza)/page.tsx`): hero kodları, Vitrin 1, tekrarsız Vitrin 2 sekmeleri, premium koleksiyon. Ayarlar `src/config/storefront.ts › home` (A/B: `home.variant`, `?home=` parametresini sen bağla).
- Biçim: `formatPrice` (K-059), `formatPvLabel` ("PV 0,5") — `@/lib/format`.

**Kabuk yuvaları** (`src/components/shell/`, artık senin): `StoreChrome` (veri çekimi + sağlayıcılar; yapısını koru), `Header` (Z2 bölgesi `id="header-accent"` + `data-accent-zone` korunmalı), `MegaMenu` (şimdilik `<details>`; görseller panel açılınca yüklenmeli, KK-1-06), `CartButton`, `CartDrawer` (native `<dialog>`, işlevsel), `Footer`, `AnnouncementBar`, `AddToCartButton`. `PageStub` ve `ProductListStub` geçici — yerlerine gerçek bileşenleri koyup silebilirsin.

**Sepet:** `@/lib/cart` → `useAddToCart()(code)`, `useCart()` (`lines`, `total`, `memberTotal`, `pv`, `count`, `droppedCodes`, `hydrated`, `isOpen`), `useCartCount()`, `useCartActions()`, `useCheckout()` (pasif ödeme düğmesi prop'ları, K-088). Sepet satırında ad/fiyat `line.product`'tan.

**Tema:** `ThemeScope` (`@/lib/theme/ThemeScope`, sunucu) → `theme={product.theme}` / `accent={product.accent}`. Renkleri sabit hex/`green-*` yerine tema yüzeylerinde aksan sınıflarıyla ver: `bg-accent-soft`, `text-accent-text`, `border-accent-line`, `bg-accent-deep`, `text-on-accent-deep`, `text-accent-on-deep`, `bg-stripe-1/2/3`, `bg-(image:--gradient-gold-foil)`. Değişmezler (üye fiyatı rozeti `bg-green-700`, birincil düğme, odak halkası, `text-ink`) aksana bağlanmaz. Premium başlık: `premium-display` sınıfı.

**Rotalar:** `(magaza)` grubu; `/yakinda` = eski ara sayfa (dokunma, footer bağlantıları `/yakinda#…` olarak güncellendi). 404: `app/not-found.tsx`.

## Mimari kurallar (inceleme bunlara göre yapılacak)
1. Varsayılan Server Component; `"use client"` yalnız yaprak.
2. Tip güvenliği: `any` yok; `noUncheckedIndexedAccess` açık.
3. Erişilebilirlik: dokunma hedefi ≥ 44 px (`min-h-tap-min`), görünür odak, `aria-disabled` pasif düğme odaklanabilir kalır.
4. Yeni bağımlılık önce bana devir notu (TEKNIK-TASARIM gerekçesi).

## Kabul kriteri
Her sayfa wireframe'ine göre dolu; `npm run lint`, `npm test`, `npm run build` geçer; yakında ürünlerde fiyat/sepete ekle yok; önizleme adları işaretli; kodda `@data/` importu yalnız `src/lib/` altında.

## Developer B durumu (2026-11-16)
Ana sayfa, PDP, PV, bulucu, üye ol, sertifikalar, hakkımızda, yasal şablon tamam (rapor: Orkestratör). Not ortak olduğu için (Developer A kabuk/kart/listeleme) KAPANDI işaretini A kendi kısmını bitirince yapar.
