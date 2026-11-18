# Teknik Tasarım — v1 (frontend-mimar)

> v1.2 · 2026-11-17 · K-256 kütüphaneleri (§1), ölçülmüş JS bütçesi K-263 (§7, §10). v1.1 · 2026-11-17 · M-1/M-2 (TASARIM-INCELEME-1), tokens v1.2, yönlendirmeler, erişimciler. v1 · 2026-11-16 · Faz 2 önizleme dalgasının (K-043, tasarım kodda) temeli. v0 (K-046 ara sayfa) bu belgenin içinde, §9'da.
> Bağlayıcı kararlar: K-036, K-041, K-049, K-062–K-071, K-085, K-100–K-102. Bu belgedeki mimari seçimler K-120…K-126 olarak `ÖNERİ` statüsünde kayıtlı.

## 1. Yığın ve bağımlılıklar
| Parça | Sürüm | Gerekçe |
|---|---|---|
| Next.js (App Router, Turbopack, `cacheComponents`, `partialPrefetching`) | 16.4.6 | RSC, statik kabuk + PPR, `next/image`, `next/font`, Metadata API |
| React | 19.3 | Next ile birlikte |
| TypeScript | 5, `strict` + `noUncheckedIndexedAccess` + `allowImportingTsExtensions` (yalnız testler için) | Tip güvenliği |
| Tailwind CSS | 4.3 (CSS-first `@theme`) | Token → tema tek CSS dosyası |
| **zustand** | ^5.1 (≈1 KB gz) | Sepet durumu + `persist` (localStorage). K-003. Context+reducer'a göre: seçici abonelik (header sayacı yalnız sayı değişince render), hazır persist/sürüm/merge. Tek yeni çalışma zamanı bağımlılığı |
| **gsap** (+ ScrollTrigger) | ^3.15 (27,4 + 17,5 KB gz, tembel) | K-256. Yalnız kaydırmaya bağlı/sabitlenen sahneler ve Lenis tiki; tek giriş `loadGsap()` (`src/lib/motion/gsap.ts`), statik import yasak. Yalnız ≥ 1024 px ince işaretçi + tam katmanda indirilir |
| **lenis** | ^1.3 (5,4 KB gz, tembel) | K-256, K-258. Smooth scroll; `gsap.ticker` ile sürülür; sepet/mobil menü/dialog/mega menüde `stop()` |
| **swiper** | ^14.4 (24,2 KB gz, tembel, yalnız `/`) | K-256, K-259. Yalnız core, `useEffect` içinde `import("@/lib/motion/swiper")`; `swiper/react` yasak (`cacheComponents` ön-render'ında render sırasında saat okur) |
| sharp (dev) | ^0.35 | Veri hattı görsel optimizasyonu (veri-muhendisi isteği); Next zaten geçişli kullanıyor |

Animasyon kütüphaneleri K-256 ile kullanıcı kararıdır; üçü de ilk yük JS'ine girmez (tembel `import()`), `npm run perf:js` ile ölçülür. Testler Node'un yerleşik `node:test` + tip silme (Node ≥ 22.18) ile çalışır: ek test bağımlılığı yok.

## 2. Klasör yapısı
```
data/                          ← veri-muhendisi (products.json 1689 kayıt, categories.json, brands.json, schema.ts v2)
docs/tasarim/tokens.json       ← token TEK kaynağı (ui-tasarimci)
scripts/tokens/build-tokens.mjs← tokens.json → src/styles/tokens.css (predev/prebuild)
src/
  app/
    layout.tsx                 ← html/body, fontlar, site geneli metadata
    not-found.tsx              ← genel 404 (StoreChrome'u kendisi çizer)
    (yakinda)/yakinda/         ← K-046 ara sayfa (eski "/"), korunuyor
    kvkk/, cerez-politikasi/   ← ara sayfanın yasal yer tutucuları (eski)
    (magaza)/                  ← tam mağaza; layout = StoreChrome
      page.tsx                 ← "/" ana sayfa
      kategori/[kok]/[[...alt]]/ urun/[slug]/ koleksiyon/[key]/ arama/
      pv-nedir/ cilt-tipine-gore/(+[tip]) uye-ol/ sertifikalar/ hakkimizda/ favoriler/ yasal/[slug]/ error.tsx
    api/arama/route.ts         ← anlık arama uç noktası
  components/
    shell/                     ← iskelet yuvaları (StoreChrome, Header, MegaMenu, CartButton, CartDrawer, Footer,
                                  AnnouncementBar, AddToCartButton) + geçici stub'lar (PageStub, ProductListStub)
    brand/ layout/ sections/ product/ ui/ dev/   ← v0 ara sayfa bileşenleri
  config/
    site.ts                    ← K-047 satıcı kimliği
    storefront.ts              ← mağaza anahtarları: PREVIEW_ALL, CHECKOUT_ENABLED, koleksiyonlar, tema eşlemesi, ana sayfa, duyuru, e-posta, businessPlan
  lib/
    products.ts                ← VERİ CEPHESİ (UI yalnız bunu çağırır)
    catalog/json-source.ts     ← JSON adaptörü (data/*.json'u okuyan TEK dosya)
    catalog/types.ts           ← UI'a açık veri sözleşmesi
    catalog/query-params.ts    ← URL ↔ ProductQuery
    catalog/skin.ts            ← cilt tipi sözlüğü (5 slug)
    cart/                      ← store.ts, totals.ts (+test), hooks.ts, CartProvider.tsx, index.ts
    theme/                     ← palette.ts (+test), themes.ts, accent.ts, useAccentZone.ts, ThemeScope.tsx
    search.ts                  ← Türkçe katlama, puanlama (saf)
    format.ts (+test)          ← ₺ ve PV biçimleri
    fonts.ts, css.ts
  styles/tokens.css            ← OTOMATİK
```

## 3. Veri sözleşmesi ve backend geçişi (K-004, K-120)
```
UI bileşeni ──► src/lib/products.ts (async cephe: filtre, sıralama, sayfalama, arama, koleksiyon, sepet kataloğu)
                    └──► src/lib/catalog/json-source.ts  →  CatalogSnapshot { products: ProductDetail[], bySlug, categories, brands }
                              └──► data/*.json (schema.ts v2)
```
- **Geçiş = adaptör değişimi.** Medusa/Shopify geldiğinde `json-source.ts` yerine aynı `CatalogSnapshot`'ı üreten bir adaptör yazılır (`fetch` + `"use cache"` + `cacheTag`). `products.ts` ve tüm bileşenler değişmez. Tüm cephe fonksiyonları şimdiden `async`.
- **Sınır:** `ProductSummary`/`ProductDetail` (catalog/types.ts) Rusça alan **taşımaz** (K-024). `title_ru`, `shortDescription_ru`, `_source` adaptörde kalır.
- **Görünürlük ve satış kapısı** (`src/lib/catalog/gate.ts`, birim testli; her adaptör aynı kuralları uygular):
  - Listelenir: canlıda yalnız `publishReady`; önizlemede (`NEXT_PUBLIC_PREVIEW_ALL=1`, K-121) hazır olmayanlar da. **`price-implausible` (ör. LGD012) hiçbir modda listelenmez** (M-1).
  - `sellable`: `availability = tr` + `publishReady` + iki fiyat + kod + `price-implausible` yok. Önizleme bayrağından bağımsız (M-1). Sepete ekle yalnız bunda.
  - `price`/`memberPrice` yalnız `sellable` üründe dolu; diğerlerinde `null` → fiyat bloğu render edilmez ("fiyat var ama sepete eklenemez" durumu oluşmaz).
  - Türkçe adı olmayan ürün (artık veride yok) `"<Marka> <kod>"` yedek adı + `nameIsFallback: true`; ürün sayfası `noindex`.
- **Sıralama:** her sıralamada görselsiz ürünler sona (M-1); sonra TR önce (K-052).
- **`hoverImage`** (S-063): `images[1] ?? null`; kart hover çapraz geçişi. Özet nesnesi elle kurulmaz, `toProductSummary(detail)` kullanılır.
- **Tema/aksan:** `theme` = `themeHint` → `storefront.themes.enabledFor` eşlemesi (`premium-gold`), `accent` = paletin sunucuda çözülmüş, kontrastı garantili CSS değişkenleri (`resolvePalette`, 1684/1684 palet çözülüyor, ~80 ms/süreç).
- **Kategoriler:** `getCategoryTree()` K-050 ağacını menü sırasıyla, sayıları **yayındaki** ürünlerden yeniden hesaplayarak döndürür; boş düğüm gizlenir. `regulated` = K-095 alt kategorileri.

### Cephe API'si (`@/lib/products`)
| Fonksiyon | Dönüş | Not |
|---|---|---|
| `getProducts(q: ProductQuery)` | `ProductPage` (`items, total, page, pageCount, hasMore, facets{brands, price, availability}`) | `category` (kök ya da `kok/alt`), `brands[]`, `availability`, `q`, `priceMin/Max`, `skinType[]`, `concerns[]`, `collection`, `excludeIds`, `sort` (`onerilen` · `fiyat-artan` · `fiyat-azalan` · `yeni`), `page`, `pageSize` (24). TR önce (K-052). Facet'ler marka/fiyat filtresinden önce hesaplanır |
| `getProduct(slug)` | `ProductDetail \| null` | |
| `getProductsByCodes(codes)` | `ProductSummary[]` | Hero, elle seçilen yuvalar |
| `getProductsBySlugs(slugs)` | `ProductSummary[]` | Favoriler (`/api/urunler`), istek sırasıyla |
| `toProductSummary(detail)` | `ProductSummary` | Detaydan özet (elle alan seçme yerine) |
| `getRelatedProducts(slug, 4)` | `ProductSummary[]` | aynı alt → aynı kök → aynı marka, TR önce (K-030) |
| `searchProducts(q, 8)` | `SearchHit[]` | anlık arama |
| `getCategories()` / `getCategoryTree()` / `getCategory(kok, alt?)` | `CategoryNode` | |
| `getBrands()` | `BrandFacet[]` | |
| `getCollection(key, {limit, sort})` / `getCollections()` / `getCollectionKeys()` | `Collection \| null` | Boş koleksiyon = `null` → 404 |
| `getCartCatalog()` | `CartCatalog` (kod → ad, fiyat, üye fiyatı, PV, görsel) | Sunucu layout'u istemci sepete prop olarak verir |
| `getStaticProductSlugs()` | `string[]` | TR + temalı + 12 örnek yakında |

**Koleksiyonlar** (`storefront.collections`): `turkiyede-satista` (TR), `turkiyeye-yakinda`, `premium-gold` (`themeHint: gold`, K-101; canlıda 4 ürünün hepsi yakında + Türkçe adsız olduğu için şu an yalnız önizlemede dolu), `one-cikanlar` (elle kod listesi).

**URL parametreleri** (`catalog/query-params.ts`): `q`, `marka=a,b`, `fiyat=min-max`, `siralama`, `sayfa`, `stok=tr`, `tip`, `ihtiyac`. "Daha fazla yükle" için `pageSize = 24 × sayfa` önerilir (tek istek, kaydırma konumu korunur).

## 4. Render stratejisi
- Varsayılan Server Component; `"use client"` yalnız yapraklarda (CartButton, CartDrawer, AddToCartButton, FontSwitcher, error.tsx, cart/theme hook'ları).
- **Cache Components:** sayfaların kabuğu statik. `searchParams` okuyan kısımlar (kategori listesi, arama sonuçları, bulucu) `<Suspense>` içinde, başlık ve alt kategoriler kabukta.
- `generateStaticParams`: kategoriler (12 kök + alt düğümler), TR ürünleri + temalı + örnek yakında, boş olmayan koleksiyonlar, 5 cilt tipi, 4 yasal sayfa. Listede olmayan parametre ilk istekte render edilir ve saklanır (ISR benzeri).
- Build: 111 sayfa (önizleme modunda 189), ~5 sn.
- **Bilinen davranış:** PPR'de kabuk akmaya başladıktan sonra çağrılan `notFound()` HTTP **200** + `<meta name="robots" content="noindex">` ile 404 içeriği döner (soft 404). Kabul edilebilir, ama seo-uzmani'ne devredildi (gerekirse `proxy.ts` ile slug ön doğrulaması).
- Anlık arama: `GET /api/arama?q=&limit=` (dinamik route handler, `s-maxage=600`). Gerekçe: 1,6 bin ürünlük indeks istemciye gönderilmez (K-123).

## 5. Durum yönetimi — sepet (K-031, K-068, K-122)
- `useCartStore` (zustand + `persist`, anahtar `gl-cart-v1`): yalnız `{ code, qty }[]` saklanır; ad/fiyat her render'da `getCartCatalog()`'dan (`computeCart`) okunur. Satırda 1–10 adet.
- **Hidrasyon güvenliği:** `skipHydration: true`; `<CartProvider>` mount sonrası `rehydrate()` çağırır. Sunucu ve ilk istemci render'ı boş sepeti görür; `useCartCount()` hidrasyona kadar 0 döner.
- Satıştan kalkan kod: `prune()` düşürür, `droppedCodes` ile bir kerelik bildirim.
- Sekmeler arası eşitleme (`storage` olayı). `/sepet`, `/odeme*` → `/?sepet=ac` (307), provider drawer'ı açıp parametreyi temizler.
- Toplamlar kuruş cinsinden tam sayı toplanır: **Toplam**, **Üye fiyatıyla toplam**, **Toplam PV** (K-059, K-062).
- **Ödeme kapalı** (`CHECKOUT_ENABLED = false`): `useCheckout().buttonProps` → `aria-disabled`, odaklanabilir, tıklama hiçbir şey açmaz (K-088).
- Kod anahtarı gerekçesi: TR ürün kodları tekil (51/51 doğrulandı); kodsuz kayıt `sellable` değil.

## 6. Tema ve hover renk geçişi (K-065, K-066, K-124)
- **Token derleyici** (`build-tokens.mjs`) üretir: `@property` kayıtları (9 değişken: `--accent-soft/-line/-decor/-decor-2/-decor-3/-text`, `--stripe-1/2/3`; `<color>`, `inherits: true`), `@theme` statik token'lar (+ `--font-weight-*`, `--tracking-*`, `size` → `spacing-*`: `h-control`, `min-h-tap-min`, `h-header`…), `@theme inline` aksan renkleri (`bg-accent-soft`, `text-accent-text`, `bg-stripe-1`, `bg-accent-deep`, `text-on-accent-deep`…), `:root` varsayılan tema + süreler + `--gradient-gold-foil/-gold-button/-forest-depth/-gold-glow` + `--z-*` + `--font-role-*`, `[data-theme="premium-gold"]` bloğu ve `[data-accent-zone]` geçiş kuralı (`--recolor-duration`, `--recolor-ease` ile ayarlanır; reduced-motion'da 0).
- **Palet çözümü** (`lib/theme/palette.ts`): `paletteDerivation` adımları, hedef 4.6:1; karşılanamazsa `null` → marka teması. Testler: 4 örnek palet, varsayılan↔palet ve palet↔palet geçişlerinde t = 0/.25/.5/.75/1, sRGB ve Oklab ara değerlerde `--accent-text` ≥ 4.5.
- **ThemeScope** (sunucu): `<ThemeScope theme="premium-gold">` → `data-theme` + Cormorant değişkeni; `<ThemeScope accent={p.accent}>` → statik ürün aksanı. Bilinmeyen anahtar → marka teması (KK-11-02). Tema yalnız içerik yüzeylerine (K-092).
- **Hover bölgesi** (istemci): tetikleyiciye `accentTriggerProps(p.accent)` (`data-accent`), bölgeye `useAccentZone()` (`ref` + `data-accent-zone`). Olay delegasyonu; yalnız ince işaretçi + gerçek hover, klavyede `:focus-visible`, dokunmatikte asla; reduced-motion / `prefers-contrast: more` / forced-colors'ta kapalı; tetikleyiciler arası doğrudan geçiş; `linkedIds` ile Z1 → Z2 (header `id="header-accent"`). Yalnız 9 değişken değişir; `--accent`, birincil düğme, üye fiyatı rozeti, fiyat, odak halkası asla.
- **Premium display font:** `premium-display` yardımcı sınıfı. Varsayılan Jost 400, büyük harf, 0.14em; `?premiumFont=cormorant` → Cormorant Garamond 600 (`preload: false`, yalnız premium kapsayıcıda tanımlı, kullanılmazsa indirilmez).

## 7. Performans bütçesi (K-034, K-097)
| Ölçüt | Hedef |
|---|---|
| Mobil LCP / CLS / INP | ≤ 2,5 sn / ≤ 0,1 / ≤ 200 ms |
| Ana sayfa ilk ekran / toplam aktarım | ≤ 500 KB / ≤ 1,6 MB |
| İlk yük JS (gz), mağaza sayfaları | ≤ 220 KB (K-263 ÖNERİ). K-097'nin 170'i ulaşılamaz: Next 16 + React 19.3 çerçevesi tek başına 167,6 KB. Uygulama payı (çerçeve dışı) ≤ 52 KB. Ölçüm: `npm run build && npm run perf:js` |
| Tembel chunk'lar | ilk yüke girmez; GSAP/Lenis yalnız masaüstü, Swiper yalnız `/` |
| Mega menü görselleri | panel açılmadan 0 istek (KK-1-06) |
| Sepet kataloğu prop'u | yalnız satılabilir ürünler (~41 kayıt, birkaç KB) |
| Kabuk menü verisi (K-294) | sayfaya yalnız metin menü (`MenuRootNav`); görsel/öne çıkan/tanıtım `/api/menu` (statik) ile menü niyetinde |
| DOM (K-295) | ilk HTML ≤ 1500 element hedef, ≤ 2500 tavan |
| Modal açma/kapama (K-293) | `showModal()` kullanılmaz; `src/lib/a11y/modal-layer.ts` (`openLayer`/`closeLayer`, `<dialog popover="manual" aria-modal="true" tabIndex={-1}>`); arka plan inert bir kare sonra |
| not-found dosyaları | Next her not-found'u her sayfayla gönderir: kök `app/not-found.tsx` kabuk içermez (K-294) |
Kurallar: `products.json` (3,6 MB) yalnız sunucuda; istemci modülü `@/lib/products` import edemez. Liste prop'ları `ProductSummary` (detay alanları yok). Hero H1 opacity animasyonu almaz.

## 8. Kurallar ve isimlendirme
- UI → yalnız `@/lib/products` (tipler dahil: `import type { ProductSummary } from "@/lib/products"`). `@data/*` yalnız `src/lib` altında:
  - katalog → `lib/catalog/json-source.ts` (+ v0 teaser, `products.ts`)
  - arayüz metni → `lib/ui-text`: `t()`, `tc()`, yapılandırılmış içerik için `tRaw<T>(key, fallback?)` (SSS dizileri, `pv.business.plan`)
  - stok fotoğraf manifesti → `lib/images.ts`: `getStockImage(slot, { mobile })`, `getStockImageKeys()` (K-160)
  - blog/haber → `lib/content/blog.ts` (`getPosts`, `getPost`, `getPostSlugs`, `getPostCategories`, `getRelatedPosts`, `countPosts`, `postHref`, `basePath`, `formatPostDate`); eski yol `components/blog/source.ts` yalnız yeniden dışa aktarır
- **Token'lar (v1.2):** `build-tokens.mjs` `tokens.gradient.*` ve premium gradyanlarını `:root`'ta `--gradient-<ad>` olarak yazar (13 adet, çakışma derlemeyi durdurur) ve her biri için `bg-gradient-<ad>` yardımcısı üretir; `surfaceMode` → `surface-showcase` (orman gradyanı + cream-100 metin) ve `surface-commerce` (beyaz + ink). `texture` yalnız belge (SVG bileşenleri). Fiyat/üye rozeti/PV `surface-showcase` üstüne doğrudan konmaz.
- **K-231:** `[data-accent-zone]` renk geçişi reduced-motion'da da yumuşak (`--recolor-duration-reduced`, 250 ms); yalnız konum/ölçek hareketleri kapanır.
- **Yönlendirmeler (308):** `/pv` → `/pv-nedir`, `/kvkk` → `/yasal/kvkk-aydinlatma-metni`, `/cerez-politikasi` → `/yasal/cerez-politikasi`. Diğerleri 307 (seo-uzmani kesinleştirene kadar).
- **İç rotalar:** `/hareket-lab` canlı derlemede 404 (`beforeFiles` rewrite), yalnız `NEXT_PUBLIC_PREVIEW_ALL=1` derlemede açık; `/hareket-lab` ve `/svg-kutuphanesi` `X-Robots-Tag: noindex, nofollow` başlığı + sayfa metadata'sı.
- İstemci kodu tema yardımcılarını `@/lib/theme/accent` ve `@/lib/theme/useAccentZone` dosyalarından alır (index ThemeScope'u da dışa aktarır).
- Bileşen dosyası PascalCase, yardımcı camelCase, rota klasörü Türkçe slug. Kod/değişken İngilizce, UI Türkçe (CLAUDE.md §7).
- Yeni bağımlılık → önce bu belgeye gerekçe.
- Her değişiklikten sonra: `npm run lint`, `npm test`, `npm run build`.

## 9. Çalıştırma
```bash
npm run dev                          # predev token'ları üretir
NEXT_PUBLIC_PREVIEW_ALL=1 npm run dev  # tüm katalog (yakında ürünler yedek adlarla)
npm test                             # node:test — palet, biçim, arama, sepet toplamları
npm run lint && npm run build
```
Önizleme anahtarları: `?font=jost|poppins|comfortaa`, `?premiumFont=cormorant|jost`. Vercel: `NEXT_PUBLIC_MEMBERSHIP_URL`, önizleme ortamında `NEXT_PUBLIC_PREVIEW_ALL=1`.

## 10. Bilinen konular / sonraki adımlar
- Bekleyen (faz2-plan notu): cilt tipine göre eşleştirme saf fonksiyonu + testleri (CILT-TESTI §4), e-posta servis adaptörü (K-090), favoriler deposu, mega menü öne çıkan yedek zinciri (K-091). Ürün etiketleri (`skinType`, `concerns`) veride henüz boş.
- `yeni` sıralaması veride tarih olmadığı için kaynak id'sine göre (vekil).
- icerik-editoru'nun `data/content/products.tr*.json` başlıkları veri-muhendisi `products.json`'a birleştirdiğinde siteye kendiliğinden yansır; adaptörde ayrı birleştirme yapılmadı (tek kaynak).
- **JS ölçümü (2026-11-17, `scripts/perf/first-load-js.mjs`):** `/` 230,5 KB gz / 13 script; `/hakkimizda` 227,1; `/urunler` 229,0. Çerçeve (react-dom 69,9 + Next istemci 45,4 + app router 38,6 + Next yardımcı 7,5 + Turbopack 3,8 + 2,4) = 167,6. Mağaza kabuğu: paylaşılan uygulama chunk'ı 20,1 (içinde `ui.tr.json` ≈ 10 KB, sepet deposu, header eylemleri), header/mega menü/arama 13,3, hareket çalışma zamanı 13,0, `next/image` + kart parçaları 9,1 + 3,9. Ana sayfaya özgü yalnız 3,4 (HeroSwiper + HorizontalPin). Açık ana sayfadan değil kabuktan gelir; azaltma planı K-263 ve devir notları.
- v0 notu: `scripts/data/*` lint uyarıları (6, hata yok) veri-muhendisi'nde.
