# Ürün Veri Şeması — TASLAK

> Sahip: veri-muhendisi · Tarih: 2026-11-15 · Durum: **ÖNERİ** (frontend-mimar ile ortak sözleşme olacak; kullanıcı onayı yok)
> Dayanak: MEMORY §4, §6 · [ENVANTER.md](ENVANTER.md)

Kaynak kısaltmaları:
- **XL** = `greenleaf-turkiye-urunler.xlsx`
- **KT** = Ağustos katalog HTML
- **PN** = panel API `goods.json` / `categories.json` (bekleniyor)
- **RU** = global.green-leaf.shop
- **EL** = elle/editoryal (`data/content/`, icerik-editoru)

**Öncelik kuralı** (birleştirmede ilk dolu değer kazanır):
- Ticari alanlar (fiyat, PV, barkod, kapsam): `PN > XL > RU`
- Türkçe metin alanları: `EL > KT > XL`
- Rusça ham metin: `PN > RU`

## 1. Product (`data/products.json`)

| Alan | Tip | Zorunlu | XL | KT | PN | RU | Not |
|---|---|---|---|---|---|---|---|
| `id` | string | ✔ | `ID` | `id` | `id` | — | Panel/Greenleaf id, string olarak. Site içi kimlik `code` |
| `code` | string | ✔ | `Ürün Kodu` | `code` | `code` | "Модель" | **Birincil eşleştirme anahtarı.** Trim + büyük harf. `/A` gibi varyant ekleri korunur |
| `barcode` | string \| null | — | `Barkod` | `barcode` | `barcode` | — | EAN-13, check digit doğrulanır. Setlerde null |
| `slug` | string | ✔ | türetilir | türetilir | türetilir | — | Bkz. §5. Benzersiz |
| `title` | string | ✔ | `Ürün Adı (TR)` (temizlenmiş) | ad | — | — | Temiz perakende adı. Koli/hacim ifadesi çıkarılmış. EL > KT > XL |
| `title_raw` | string | ✔ | ham ad | ham ad | — | — | Denetim için temizlenmemiş hali |
| `title_ru` | string \| null | — | — | — | `title` | ad | Ham saklanır, çevrilmez |
| `brand` | string (Brand.slug) | ✔ | addan türetilir | addan | — | addan | Alt marka: carich, ilife, yibelle, nilrich… Tespit edilemezse `greenleaf` |
| `category` | string (Category.slug) | ✔ | eşleme tablosu | `category` | eşleme | — | TR kategori (8 + setler). Bkz. §2 |
| `sourceCategory` | object | — | `{xl: "Genel Ürünler"}` | `{kt: …}` | `{pn: id}` | `{ru: [yol]}` | İz; UI kullanmaz |
| `images` | Image[] | ✔ (≥1) | `Görsel URL` | base64 | `photo` | thumb→orijinal | Bkz. §6. Sıra: PN/XL > KT > RU |
| `description` | string \| null | — | — | açıklama | — | — | TR kısa tanıtım (1–3 cümle). EL > KT |
| `features` | string[] | — | — | `properties` | — | — | Madde işaretli özellikler |
| `usage` | string \| null | — | — | `usage` | — | — | Kullanım talimatı |
| `content` | string \| null | — | — | — | — | — | TR uzun metin. **Yalnız EL** (icerik-editoru `content_ru`'dan yerelleştirir) |
| `content_ru` | string \| null | — | — | — | `content` | açıklama HTML | **Ham, değiştirilmeden** saklanır (HTML dahil). Çevrilmez |
| `description_ru` | string \| null | — | — | — | `description` | — | Ham kısa meta (hacim + koli). boxQty/volume ayrıştırma girdisi |
| `volume` | `{value:number, unit:"ml"\|"g"\|"kg"\|"l"\|"adet"} \| null` | — | addan | `volume` | `description` | addan | Bkz. §4. Görüntü metni UI'da üretilir |
| `packCount` | number \| null | — | — | — | `description` | "30 шт" | Paket içi adet (ör. 30 kapsül). **boxQty ile karıştırılmaz** |
| `boxQty` | number \| null | — | addan | — | `description` | `(Кол-во в коробке N шт)` | Koli içi adet (toptan bilgisi). Bkz. §4. Perakende UI'da gösterilmesi tercihe bağlı |
| `price` | number (TRY, kuruşsuz tam sayı ya da 2 ondalık) | ✔ | `Fiyat (₺)` × LIST_PRICE_MULTIPLIER | aynı | `price` × çarpan | — | **Liste fiyatı (siyah).** Türetilir, bkz. §3 |
| `memberPrice` | number (TRY) | ✔ | `Fiyat (₺)` | `price` | `price` | ✘ | **Üye fiyatı (yeşil rozet)** = kaynaktaki güncel fiyat |
| `pv` | number | ✔ | `PV` | `pv` | `points` | bonus/100 | Ondalık (0,2 / 0,5 …). ₺/PV saklanmaz, gerekirse hesaplanır |
| `currency` | `"TRY"` | ✔ | sabit | sabit | `with_price=try` | ✘ | RUB hiçbir zaman yazılmaz |
| `stock` | `"in_stock"\|"out_of_stock"\|"unknown"` | ✔ | — | — | (varsa) | ✘ | Şimdilik `unknown`. UI "stokta" iddia etmez |
| `isSet` | boolean | ✔ | sayfa adı | `Setler` | — | — | Başlangıç setleri |
| `setItems` | string[] (code) \| null | — | — | (varsa) | — | — | Set içeriği. Kaynak yoksa EL |
| `badges` | string[] | — | — | — | — | — | `new`, `bestseller`, `campaign`… Yalnız EL/backend. Vitrin blokları buradan beslenir (K-008) |
| `collections` | string[] | — | — | — | — | — | Vitrin anahtarları (`getCollection(key)`). EL |
| `active` | boolean | ✔ | XL'de var → true | — | `visitor_group` TR | — | TR kapsam bayrağı |
| `needsReview` | string[] | — | — | — | — | — | Doğrulama bayrakları: `name-conflict`, `no-catalog-text`, `brand-guess`, `image-lowres`… |
| `_source` | object | ✔ | | | | | Alan bazlı iz: `{title:"KT", price:"XL", boxQty:"RU", …}` + kaynak dosya/sürüm + `fetchedAt` |
| `updatedAt` | ISO string | ✔ | | | | | Hat çalışma zamanı |

> Not: XL/KT'deki `₺/PV` sütunu şemaya alınmaz (türetilebilir değer).

## 2. Category (`data/categories.json`)

| Alan | Tip | Zorunlu | Kaynak | Not |
|---|---|---|---|---|
| `slug` | string | ✔ | türetilir | ör. `cilt-bakimi` |
| `title` | string | ✔ | KT / EL | Cilt Bakımı, Saç Bakımı, Ağız Bakımı, El & Vücut, Ev & Temizlik, Bebek & Çocuk, Kağıt Ürünler, Sağlık, Setler |
| `parent` | string \| null | ✔ | EL | Şimdilik düz (tek seviye). Ürün sayısı artınca 2 seviye |
| `order` | number | ✔ | EL | Menü sırası |
| `icon` | string \| null | — | EL / ui-tasarimci | İkonlu kategori şeridi (MEMORY §7) |
| `image` | string \| null | — | EL | Kategori kapağı |
| `description` | string \| null | — | EL | SEO giriş metni |
| `mapping` | `{xl:string[], pn:string[], ru:string[]}` | ✔ | EL | Kaynak kategori değerlerinin bu kategoriye eşlemesi (ör. xl "Cilt Bakım Kozmetiği" → `cilt-bakimi`). Eşlenmeyen değer doğrulamada hata verir |
| `productCount` | number | ✔ | hesaplanır | Yalnız `active` ürünler |

**"Genel Ürünler" (XL), "Kuponlu Ürünler" ve "Diğer" sorunu:** kategori eşlemesi kaynak kategoriye göre değil, **ürün koduna göre ezme tablosuyla** (`category-overrides`) yapılır. 37 ürün için katalog kategorisi zaten doğru. DAC056 için Ev & Temizlik önerilir.

## 3. Fiyat kuralı (TASLAK — K-007)

- Kaynaktaki fiyat (XL `Fiyat (₺)`, PN `price`) **güncel = üye fiyatıdır** → `memberPrice`.
- `price` (liste) = `memberPrice × LIST_PRICE_MULTIPLIER`.
- `LIST_PRICE_MULTIPLIER = 2`: hat konfigürasyonunda **tek bir sabit** olarak tutulur (ör. `scripts/data/config` içinde). Değişince tüm hat yeniden çalıştırılır. Başka hiçbir yerde ×2 yazılmaz.
- Yuvarlama: çarpımdan sonra tam liraya (ROUND_HALF_UP). Sabitle birlikte yapılandırılabilir.
- Doğrulama: `price > memberPrice`, `memberPrice > 0`, `pv ≥ 0`. ₺/PV medyandan 5 kat sapan kayıtlar uyarı olarak raporlanır (hata değil, çünkü PV basamaklı).
- RU fiyatı (RUB, ≈ TRY×3) **hiçbir hesaba girmez.**
- Açık nokta: "güncel fiyat" gerçekten üye fiyatı mı, yoksa perakende mi? Kullanıcı onayı bekleniyor.

## 4. Ad temizleme, boxQty, volume, packCount

Ayrıştırma sırası (her ifade addan çıkarılır, değer alana taşınır, ham hali `title_raw`'da kalır):

1. **boxQty** (koli adedi):
   - TR kalıbı: `\(?\s*Kutu başına\s*(\d+)\s*adet\s*\)?` (büyük/küçük harf ve Türkçe i/İ duyarsız).
   - RU kalıpları: `\(?\s*Кол-?во в коробке\s*(\d+)\s*шт\.?\s*\)?`, `в коробке\s*(\d+)`, `коробка\s*[:-]?\s*(\d+)`. B2'nin regex'i 23 ifadeden 16'sını yakaladı; üretimde tire, boşluk ve noktalama toleranslı olmalı. Yakalanamayanlar raporlanır.
   - PN `description` içinde de aynı RU kalıpları aranır. **Öncelik: PN > ad (TR) > RU adı.**
2. **volume**: `(\d+(?:[.,]\d+)?)\s*(ml|мл|g|gr|г|kg|кг|l|л|lt)\b` → `{value, unit}`. Ondalık virgül noktaya çevrilir, birim normalize edilir (`gr`/`г` → `g`, `мл` → `ml`). Örnek: XL adlarındaki `(80g)`, `(2KG)`, `1,25kg`. Öncelik: KT `volume` > PN `description` > ad.
3. **packCount**: `(\d+)\s*(adet|шт|штук|tablet|kapsül|капсул)` (koli ifadesi çıkarıldıktan *sonra* kalan). Örnek: "30 шт" → 30.
4. Kalan ad: çift boşluk, baş/son noktalama ve boş parantez temizlenir. Marka ön eki standart yazıma getirilir (`CARICH`, `iLiFE`, `YIBEILE`… yazım tablosu EL ile). Büyük/küçük harf: ilk harf büyük, marka yazımı korunur.
5. Hiçbir otomatik temizlik KT/EL başlığını ezmez. Bu kurallar yalnız XL/PN/RU adına uygulanır.

## 5. Slug kuralları

1. Kaynak: temizlenmiş TR `title` (marka dahil). Ör. "iLiFE SOD İpek Yüz Kremi" → `ilife-sod-ipek-yuz-kremi`.
2. Türkçe harf dönüşümü **küçük harfe çevirmeden önce** yapılır, çünkü `İ`.toLowerCase() → `i̇` sorunu var: `İ→i, I→i, ı→i, Ş/ş→s, Ğ/ğ→g, Ü/ü→u, Ö/ö→o, Ç/ç→c`. Ardından NFKD + aksan silme (â→a vb.).
3. `&` → `ve`. `+` → `plus`. Diğer alfasayısal olmayan karakter → `-`. Tekrarlı `-` teke indirilir, baş/son `-` atılır.
4. En fazla 80 karakter, kelime sınırından kesilir.
5. Benzersizlik: çakışmada `-<code küçük harf>` eklenir (ör. `ilife-sod-ipek-yuz-kremi-asb046`). Sıra numarası kullanılmaz.
6. **Kararlılık:** bir slug yayınlandıktan sonra başlık değişse bile korunur. `data/slug-lock.json` (code → slug) tutulur, yeniden adlandırmada eski slug `redirects` listesine yazılır (seo-uzmani'ye devir).
7. Kategori ve marka slug'ları aynı fonksiyonla üretilir.

## 6. Görseller

**Image nesnesi**

| Alan | Tip | Zorunlu | Not |
|---|---|---|---|
| `src` | string | ✔ | `/products/<slug>/<slug>-<n>.webp` |
| `original` | string | ✔ | `/products/<slug>/<slug>-<n>.<orijinal uzantı>` |
| `width`, `height` | number | ✔ | İşlenmiş görselin ölçüsü |
| `alt` | string | ✔ | Varsayılan = `title`. EL ile iyileştirilir |
| `source` | `"PN"\|"XL"\|"KT"\|"RU"` | ✔ | İz |
| `sourceUrl` | string \| null | — | Uzak kaynak URL'si (KT için null) |
| `bg` | `"white"\|"transparent"` | — | PNG alfa kanalı tespiti. Kart tasarımı için |

**Adlandırma ve dosya düzeni**
- Klasör: `public/products/<slug>/`.
- Dosya: `<slug>-1.webp` (ana görsel), `<slug>-2.webp` …; yanında orijinal dosya ve gerekiyorsa `.avif`.
- Ham indirmeler `.cache/images/<code>.<ext>` altında kod adıyla tutulur. Böylece slug değişse bile önbellek bozulmaz.
- Hedef genişlikler: 800 (ana), 400 (kart), 200 (küçük). Kaynak 800'den büyük olsa bile üst sınır 1200. **Büyütme yapılmaz.**
- Kaynak önceliği: PN `photo` ≈ XL URL (greenleaf-global.com) > KT base64 (700) > RU orijinal (≤800).
- Kaynak <600 px ise `needsReview: image-lowres` eklenir.

## 7. Brand (`data/brands.json`)

| Alan | Tip | Zorunlu | Not |
|---|---|---|---|
| `slug` | string | ✔ | `carich`, `ilife`, `yibelle`, `nilrich`, `sealuxe`, `kardli`, `easylove`, `greenleaf` |
| `title` | string | ✔ | Resmî yazım (iLiFE, CARICH…) |
| `aliases` | string[] | ✔ | Addan tespit için yazım varyantları: `YIBEIL`, `YIBEILE`, `Yibelle`… |
| `logo` | string \| null | — | Alt marka logoları şu an yok |
| `description` | string \| null | — | EL |
| `productCount` | number | ✔ | Hesaplanır |

Marka tespiti: başlık başındaki alias eşleşmesi. Bulunamazsa RU adına bakılır. O da bulunamazsa `greenleaf` + `needsReview: brand-guess`.

## 8. Hat (pipeline) adımları

Hepsi `scripts/data/` altında, Node.js ile, **idempotent**: aynı girdi her zaman aynı çıktıyı üretir. Her adım kendi ara çıktısını `.cache/pipeline/` altına yazar, böylece adımlar ayrı ayrı yeniden çalıştırılabilir.

**1. Fetch (çek).**
- Kaynaklar sırayla okunur:
  - XL (xlsx açılıp XML'den okunur; "Bilgi" sayfası okunmaz).
  - KT (HTML'deki JS dizileri; base64 görseller koda göre dosyaya).
  - PN (`kaynaklar/panel/goods.json` ve `categories.json` varsa; yoksa adım uyarı verip atlanır).
  - RU (yalnız TR kodları için `product/search&search=<KOD>` ile, önbellekli, 1–2 sn aralıklı; tam katalog taraması yapılmaz).
- Görseller önbellekte yoksa indirilir. Aynı URL iki kez indirilmez.
- Panel erişimindeki oturum bilgisi hiçbir dosyaya ya da loga yazılmaz.
- Çıktı: kaynak başına normalize edilmiş ham kayıt listesi. Her kayıtta kaynak etiketi bulunur.

**2. Clean (temizle).**
- Her kaynak kaydı kendi içinde normalize edilir: kod büyük harf; barkod rakam ve EAN kontrolü; fiyat sayıya.
- Ad ayrıştırma (§4) ile `boxQty`, `volume` ve `packCount` çıkarılır.
- Marka tespit edilir (§7). Kaynak kategorisi eşleme tablosundan TR kategorisine çevrilir.
- Rusça metinler dokunulmadan `*_ru` alanlarına konur.
- Çıktı: kaynak başına temiz kayıtlar ve bir ayrıştırma raporu (yakalanamayan koli/hacim ifadeleri).

**3. Merge (birleştir).**
- Kayıtlar `code` ile gruplanır. Barkod ikinci kontrol olarak kullanılır: aynı kodda barkodlar farklıysa **çatışma**dır, tahmin yapılmaz.
- Alan bazında öncelik kuralı uygulanır ve her alanın kaynağı `_source`'a yazılır.
- `data/content/` altındaki editoryal (EL) dosyalar en son katman olarak bindirilir.
- Kapsam: yalnız TR-aktif kodlar (XL/PN) ürün olur. RU'da olup TR'de olmayanlar alınmaz.
- Fiyat kuralı (§3) burada uygulanır. Slug kilidi (§5) burada okunur.
- Görseller işlenir: webp/avif'e çevrilir, yeniden boyutlandırılır, `public/products/<slug>/` altına yazılır.

**4. Validate (doğrula).**
- Şema doğrulaması (zorunlu alanlar, tipler).
- Benzersizlik: code, slug, barcode.
- Kırık veya eksik görsel; düşük çözünürlük.
- Fiyat kontrolleri: `price > memberPrice > 0`, PV aykırıları.
- Eşlenmemiş kategori değerleri.
- Kaynaklar arası çatışmalar: fiyat, barkod, ad anlamı (ad çatışması manuel listedir).
- Sağlık ve ağız bakımı ürünlerinde yasaklı iddia kelimeleri: "tedavi", "iyileştirir", "geçirir"… (uyarı, icerik-editoru'ne).
- Çıktı: `docs/veri/dogrulama-raporu.md`. **Hata** varsa `data/*.json` yazılmaz; **uyarılar** yazımı durdurmaz.
- Son olarak `data/products.json`, `categories.json` ve `brands.json` yazılır. Tip sözleşmesi `data/schema.ts` olarak frontend-mimar'a devir notuyla iletilir.
