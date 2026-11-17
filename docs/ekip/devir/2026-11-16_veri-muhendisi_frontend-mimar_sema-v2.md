---
kimden: veri-muhendisi
kime: frontend-mimar
tarih: 2026-11-16
durum: KAPANDI
ilgili: data/schema.ts (v2), data/products.json, data/categories.json, data/brands.json, K-036, K-050, K-062, K-065, K-066, K-067
---

## Ne yaptım
Panel dışa aktarımı (`kaynaklar/panel/`) ile veri hattını tamamladım; `data/` yeniden üretildi. Şema **v2** (`data/schema.ts`, `tsc --strict` geçer). `src/lib/products.ts` (`getProducts()` vb.) bu dosyalardan beslenmeli.

## Senden istediğim
1. `data/schema.ts` v2'yi tip sözleşmesi olarak al; `src/lib/` türleri buradan türesin (kopyalama değil, içe aktarma/aynalama).
2. `package.json` → `devDependencies`'e `sharp` ekle (veri hattı kullanıyor; şu an Next.js'in geçişli bağımlılığı olarak geliyor).
3. `next.config.ts` → `images.remotePatterns`: yakında ürünlerin görselleri uzak URL'dir: `https://global.green-leaf.shop/image/**` (TR ürün görselleri yerel: `/products/<slug>/main.webp`, `next/image` ile doğrudan).
4. Aşağıdaki sözleşme değişikliklerine göre `lib/products.ts` ve kategori ağacını güncelle.

## Bilmen gerekenler (v1 → v2 farkları)
- **Kategoriler K-050'ye geçti:** 12 kök, 2 seviye. Kök slug'ları: `cilt-bakimi, makyaj, sac-bakimi, vucut-bakimi, agiz-ve-dis-bakimi, setler, ev-ve-temizlik, anne-ve-cocuk, hijyen-ve-kagit, saglik-ve-takviye, mutfak-ve-gida, giyim-ve-aksesuar` (menü sırası `categories.consumer[].order`). Alt kategori slug'ı `kok/alt` biçiminde. `consumerCategory.child` **null olabilir** (ürün yalnız kök düğümde). Ürünsüz düğümler `productCount: 0` ile listede durur — **gizleme kararı arayüzde** (BILGI-MIMARISI §1.3).
- **İki ek alt kategori (ÖNERİ):** `saglik-ve-takviye/bant-ve-yamalar`, `saglik-ve-takviye/diger-saglik-urunleri` (K-067).
- **Fiyat:** `price` ("Fiyat") ve `memberPrice` ("Üye fiyatı") yalnız `availability: "tr"`. Kuruşlu olabilir (örn. 123.3); yuvarlama yok → biçim K-059 ("₺1.299,90" / kuruşsuzda "₺1.300"). `priceSource`: `panel-client` | `derived-x2`.
- **PV (K-062): artık her üründe** (`pv`, `pvSource`). Yakında ürünlerde mağaza puanı/100. `pv: null` olan ürünler var (puan kaynakta yok) → arayüz PV satırını gizlemeli, ACIK-SORULAR S-032.
- **Görseller:** TR ürünlerde `images[0].src = "/products/<slug>/main.webp"` (800 px webp, `width/height` verili, `remote` özgün URL). Yakındalarda uzak URL, `width/height` yok. Görseli olmayan ürünler var (`images: []`, `needsReview: no-image`) → yer tutucu gerek.
- **Palet (K-066):** `palette {primary, secondary, tertiary, onPrimary}` hex; `onPrimary` primary üzerinde ≥ 4.5:1. `null` olabilir. Hover'da vurgu rengini bu palete geçirmek frontend/hareket işi; **primary tek başına metin rengi olarak kullanılmamalı** (kontrast garantisi yalnız `onPrimary`/`primary` çiftinde).
- **`themeHint` (K-065):** `"gold" | "premium" | null` (+ `themeHintSource`). Ürüne özel tema kararı arayüzde; veri yalnız ipucu verir.
- **`publishReady`:** Türkçe başlık + görsel (+ TR için fiyat). Şu an yakındaki ürünlerin tamamı `false` (Türkçe başlık yok, K-039 yerelleştirmesi bekliyor); arayüz geliştirme sırasında `title_ru`'ya düşmemeli (K-024: Rusça metin görünmez) — yerelleştirme gelene kadar yakında ürünleri **gizle ya da yalnız geliştirme ortamında göster**.
- **Rusça metin:** `products.json`'da yalnız `title_ru` ve `shortDescription_ru` (denetim/teknik amaçlı, **gösterilmez**). Uzun metin `data/content/content-ru.json`'da, çalışma zamanında yüklenmez.
- **Slug'lar kilitli değil** (`data/slug-lock.json` yok): Türkçe başlıklar gelince yeniden üretilecek. Yayın öncesi `node scripts/data/run-all.mjs --lock-slugs`.
- **`needsReview`** yeni bayraklar: `panel-missing, not-in-xlsx, title-tr-missing, no-code, no-image, pv-missing, shop-matched-by-title, category-guess, price-client-not-above-member, price-client-not-2x, price-xlsx-mismatch, price-implausible`. `price-implausible` taşıyan ürün (LGD012) arayüzde satışa açılmamalı (S-025).
- `boxQty` müşteriye gösterilmez (K-030). `availability: "yakinda"` ürünlerde `price/memberPrice = null`, sepete eklenemez.

## Kabul kriteri
`getProducts()` v2 alanlarıyla tip hatasız derlenir; K-050 ağacı menüde görünür; TR ürün kartı yerel webp + iki etiketli fiyat + PV gösterir; yakında ürün kartı fiyatsız, rozetli.

## Kapanış (frontend-mimar, 2026-11-16)
1. Tipler `data/schema.ts`'ten içe aktarılıyor (yalnız `src/lib/catalog/json-source.ts`); UI sözleşmesi `src/lib/catalog/types.ts` (Rusça alan yok).
2. `sharp` devDependencies'e eklendi (^0.35.5).
3. `remotePatterns`: `global.green-leaf.shop/image/**`, `greenleaf-global.com/data/files/**` (+ Unsplash/Pexels, K-102).
4. `getProducts/getProduct/getCategoryTree…` v2 ile derleniyor; `child: null` destekli; sayılar yayındaki ürünlerden yeniden hesaplanıyor, boş düğüm gizli; `price-implausible` → `sellable: false`; `pv: null` → UI'da öğe yok; görselsiz ürün `image: null`. Yakındalar canlıda gizli, `NEXT_PUBLIC_PREVIEW_ALL=1` ile önizlemede "Marka + kod" yedek adıyla.
İstek: icerik-editoru'nun `data/content/products.tr*.json` başlıklarını `products.json`'a birleştirdiğinde (devir: icerik-editoru → veri-muhendisi) site kodu değişmeden yansır.
