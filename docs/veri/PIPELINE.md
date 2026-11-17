# Veri Hattı (Pipeline) — Nasıl Çalıştırılır

> Sahip: veri-muhendisi · Kod: `scripts/data/` · Node v24 · tek bağımlılık: `sharp` (Next.js ile geliyor; `devDependencies`'e açıkça eklenmesi için frontend-mimar'a devir notu bırakıldı) · Çıktı: `data/`, `public/products/`
> İlgili: [DOGRULAMA-RAPORU.md](DOGRULAMA-RAPORU.md) (her çalıştırmada yenilenir) · [KATEGORI-ESLEME-ONERISI.md](KATEGORI-ESLEME-ONERISI.md) · [SEMA-TASLAGI.md](SEMA-TASLAGI.md) · `data/schema.ts` (tip sözleşmesi, v2)
> Son çalıştırma: 2026-11-16 (Faz 0/1 sonrası; panel dışa aktarımı `kaynaklar/panel/` ile)

## Hızlı başlangıç

```
cd <proje kökü>
node scripts/data/run-all.mjs                 # 00 → 05 (ağ gerekir, kaldığı yerden devam eder)
node scripts/data/run-all.mjs --no-fetch      # ağsız: yalnız önbellekten
node scripts/data/run-all.mjs --lock-slugs    # slug'lar kesinleşince: data/slug-lock.json yazar
node scripts/data/05-validate.mjs --no-write  # yalnız doğrula/rapor
```

Her adım idempotenttir; aynı girdi/önbellek aynı çıktıyı üretir (üretilen JSON'da zaman damgası yoktur).

## Adımlar

| # | Script | Ne yapar | Ağ | Çıktı (`.cache/pipeline/`) |
|---|---|---|---|---|
| 0 | `00-panel.mjs` | **Panel dışa aktarımı** (`kaynaklar/panel/goods.json`, salt okunur) → normalize: kuruş → TL (`/100`), `base`=üye fiyatı, `client`=müşteri fiyatı, `points.base/100`=PV, `description.ru`'dan `boxQty`. **Dışlananlar:** test kayıtları (`Тест…`), `KGZ*` etkinlik biletleri, tabanı olmayan `/A`. `/A` ekli kodlar tabana birleştirilir (kodsuz CARICH mendili başlık eşleşmesiyle). Uzun RU `content` ayrı dosyaya | hayır | `panel.json`, `panel-content-ru.json` |
| 1 | `01-index.mjs` | Mağazadaki 1676 ürünün listesi + kategori ağacı (Faz-0 anlık görüntüsünden; ağa çıkmaz) | yalnız `--recrawl` | `shop-index.json`, `shop-tree.json` |
| 2 | `02-fetch-products.mjs` | Her ürün sayfasını bir kez indirir (resumable). 2b: kategori listelerinde olmayan ama var olan ürünler (`SHOP_EXTRA_IDS`, şu an 988 = CBE034) | evet | `product-html/*.html` |
| 3 | `03-parse-shop.mjs` | HTML → model kodu, RU kısa açıklama, görsel URL'leri, stok, **bonus puanı** | hayır | `shop-parsed.json` |
| 4 | `04-merge.mjs` | Ad temizleme (`(Кол-во в коробке N шт)` → `boxQty`), marka tespiti, **K-050 kategori eşleme** (`category-map.mjs`), TR kayıtları = panel ∪ xlsx (+ katalog metni + mağaza eşleşmesi), fiyat/PV kuralları, slug, kategori/marka/çeviri listeleri | hayır | `merged.json` |
| 6 | `06-fetch-thumbs.mjs` | Mağazadan 250 px küçük görseller — **yalnız palet hesabı için** ("yakında" ürünlerin görseli sitede uzak URL olarak kalır). Kibar: 1 istek/≥1,1 sn, robots, önbellek | evet | `img-thumb/<shopId>.<uzantı>` |
| 4b | `04b-images.mjs` | **Yalnız TR ürünler:** xlsx URL'si (greenleaf-global.com) + mağaza galerisi indirilir, `sharp` ile **webp, en fazla 800 px**, `public/products/<slug>/main.webp`, `gallery-2.webp…` (en çok 4 galeri; aynı resmin kopyası 9×8 dHash ile elenir). Orijinaller `.cache/pipeline/img-orig/` altında (public'e **konmaz**: PNG'ler 1–11 MB) | evet | `images.json`, `public/products/**` |
| 4c | `04c-palette.mjs` | Her görsel için 2–3 baskın renk (`sharp`, 48 px, beyaz/gri zemin atılır, ton kovaları) + `onPrimary` (≥ 4.5:1: #FFFFFF / #333533 / #000000'dan en iyisi) | hayır | `palette.json` (önbellekli) |
| 4d | `04d-enrich.mjs` | görsel + palet + `themeHint` + `publishReady` bindirir | hayır | `final.json` |
| 5 | `05-validate.mjs` | Doğrulama; **hata varsa `data/*.json` yazılmaz**. Yazılanlar: `data/products.json`, `categories.json`, `brands.json`, `content/to-translate.json`, `content/content-ru.json`, `slug-lock.json` (yalnız `--lock-slugs`) ve `docs/veri/DOGRULAMA-RAPORU.md`, `KATEGORI-ESLEME-ONERISI.md` | hayır | `data/…`, `docs/veri/…` |

Yerel kaynaklar (xlsx + Ağustos kataloğu) Faz-0'da çıkarılmış anlık görüntülerden okunur: `.cache/yerel/xlsx-products.json`, `catalog-products.json` (ham dosyalar `../` salt okunur, xlsx "Bilgi" sayfası hiçbir adımda okunmaz). Panel dışa aktarımı yalnız `kaynaklar/panel/` içinden **okunur**; oturum/token/cookie hiçbir yerde yoktur.

## Kibar tarama kuralları (kodda zorunlu)
- Mağaza `robots.txt` her çalıştırmada kontrol edilir; `?limit=`, `?sort=`, `?filter_*`, boş `?page=` hiç istenmez.
- Tek seferde **1 istek**, istekler arası ≥ 1,1 sn (+ 0–0,4 sn). Kimlik: `GreenLeafCatalogBot/1.0` (kişisel bilgi yok).
- Aynı URL ikinci kez indirilmez (önbellek). Yalnız HTTP 200 önbelleğe yazılır.
- Ürün sayfaları: 1608 + 1 istek (tamamlandı). Küçük görseller: ~1670 istek (≈ 35 dk). Kesilirse aynı komutla devam eder.

## Ayar noktaları

| Ne | Nerede |
|---|---|
| `LIST_PRICE_MULTIPLIER = 2` — **tek yer** (liste = üye × 2; panelde `client` kademesi varsa o kullanılır) | `scripts/data/config.mjs` |
| Fiyat şüpheli kodlar (`price-implausible`), yeni TR ürünlerin kategori tahmini | `config.mjs` → `PRICE_REVIEW_CODES`, `TR_CATEGORY_GUESS` |
| Katalog dışı ama var olan mağaza ürünleri | `config.mjs` → `SHOP_EXTRA_IDS` |
| Ad çatışması kodları (`name-conflict`) | `config.mjs` → `NAME_CONFLICT_CODES` |
| **K-050 kategori ağacı** + kaynak→tüketici eşleme + TR kod ezmeleri | `category-map.mjs` (`CONSUMER`, `RULES`, `MIGRATE`, `TR_CODE_OVERRIDES`) |
| Marka tanıma (takma adlar) | `04-merge.mjs` → `BRANDS` |
| Tema anahtar sözcükleri, palet altın tonu | `04d-enrich.mjs` (`GOLD`, `PREMIUM`, `isGoldHue`) |
| Görsel boyut/kalite | `04b-images.mjs` (`MAX=800`, `QUALITY=82`, `MAX_GALLERY=4`) |
| Slug kilidi | `data/slug-lock.json` (yalnız `--lock-slugs`; yayın öncesi yazılmaz, çünkü Türkçe başlıklar gelince slug'lar değişmeli) |

## Birleştirme kuralları (özet)

- **Anahtar:** model kodu (büyük harf). `LPA025/CDA025` gibi çift kodlu kayıtlar için her iki parça da denenir. Kod yoksa **birebir aynı temiz RU başlık** (tek eşleşme) → `shop-matched-by-title`.
- **TR kümesi (51):** panel (47 ürün; `/A` kopyaları birleşik) ∪ xlsx'te olup panelde olmayan 4 kod (`CCC001, CCC029, NWA052, T001` → `panel-missing`). `availability: "tr"`.
- **Fiyat (K-036):** `memberPrice` = panel `price.base.try/100` (yoksa xlsx; panel–xlsx farkı `price-xlsx-mismatch`, şu an 0). `price` = panel `price.client.try/100` **müşteri kademesi üye kademesinden büyükse**; aksi halde `memberPrice × LIST_PRICE_MULTIPLIER`. Tam liraya yuvarlama **yok** (K-013). Tutarsızlıklar `needsReview` bayrağı + raporda listelenir. Diğer kademeler (`store/co70/co80`) yalnız `_source.panelPriceTiers`.
- **PV (K-062):** TR: panel `points.base/100` > xlsx > mağaza puanı/100. **"Yakında": mağaza bonus puanı/100** (`pvSource: "shop-points"`). Oran doğrulaması: panel PV × 100 = mağaza puanı, eşleşen TR kümede **36/36**.
- **Ad:** TR `title_tr` = Ağustos kataloğu adı (el ile temizlenmiş, RU ile doğrulanmış) > panel `title.tr` (Kiril içermiyorsa) > xlsx > boş. Panel `title.tr` ham haliyle `_source.titlePanelTr`'de. Rusça başlıklar çevrilmez.
- **Kategori:** RU yolu → eski kural tablosu → `migrate()` → K-050 slug'ları. Kod ezmesi (`TR_CODE_OVERRIDES`) en üstte. Yeni TR ürünlerde kataloğu/mağaza kategorisi yoksa ad tabanlı tahmin (`category-guess`).
- **Görseller:** TR ürünlerde yerel webp (`/products/<slug>/main.webp`), `images[].remote` özgün URL. "Yakında": uzak URL.
- **Palet / tema (K-065/K-066):** `palette {primary, secondary, tertiary, onPrimary}`; `themeHint` = `gold` | `premium` | null — anahtar sözcük (başlık: золот/gold/24K/altın; premium/премиум/люкс) veya yalnız **setlerde** altın tonlu palet. Altın tonlu paleti olan ama anahtar sözcüğü olmayan ürünler uygulanmaz, raporda sayı olarak verilir.
- **publishReady (K-024'ün mekanik kısmı):** Türkçe başlık + ≥ 1 görsel (+ TR için fiyat). İddia denetimi ayrı, insan kapısı (icerik-editoru).
- **Uzun RU metin:** `products.json`'da **yok**; `data/content/content-ru.json` `{id: ham HTML}` (yalnız icerik-editoru girdisi, sitede gösterilmez).

## Sonraki dalga için devirler
- **icerik-editoru:** `data/content/to-translate.json` (öncelik 1 = satıştaki TR ürünler; 2 = yakında) + `content-ru.json`. Sonuçlar `data/content/` altına `{id → {title_tr, shortDescription_tr, …}}` biçiminde gelirse birleştirme adımına EL katmanı olarak eklenir.
- **frontend-mimar:** `data/schema.ts` v2 (yeni alanlar: `priceSource, pv`(tüm ürünlerde), `pvSource, palette, themeHint, publishReady`, yerel `images[]`, yeni `needsReview` bayrakları, K-050 slug'ları). `sharp` devDependency.
- **seo-uzmani:** `data/slug-lock.json` yayından önce `--lock-slugs` ile dondurulmalı.
