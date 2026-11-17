# True Botanicals (truebotanicals.com) — İlham Analizi

> Yön: **Doğal / yeşil** (MEMORY §9). Hazırlayan: A3-ilham-dogal-premium, FAZ 0. Tarih: 15 Kasım 2026.
> **Gözlem** = HTML/CSS/JSON'dan; **Yorum** = görüşümüz. Ham önbellek: `.cache/arastirma/truebot/`

## 1. Kaynaklar
| URL | Ne için | Not |
|---|---|---|
| https://www.truebotanicals.com/ | Ana sayfa HTML | 200, Shopify |
| https://www.truebotanicals.com/collections/all | Listeleme HTML | İlk denemede 429; bekleyip 6 sn aralıkla tekrar → 200 |
| https://www.truebotanicals.com/products/pure-radiance-oil-renew | Ürün detay HTML | 200 (ilk denemede 429) |
| https://www.truebotanicals.com/products.json?limit=3 ve `?limit=30&page=2` | Ürün verisi | 200 |
| https://www.truebotanicals.com/robots.txt | Kibarlık kontrolü | Yalnızca `sort_by` / çoklu `filter` / `+` kombinasyonları engelli; aldığımız sayfalar yasak değil |
| `.../cdn/shop/t/1614/assets/base.css` | Gerçek CSS | 200 |

**Kısıt:** 429 sınırı (bkz. diğer dosyalar). JS ile oluşan davranışlar (hover'daki kart açılışı, geri sayım, slider) çalışırken görülmedi; markup/CSS/JS kaynağından çıkarıldı. **Önemli bağlam:** Sayfa Kasım 2026 "Black Friday / Early Access" kampanyasının ortasında — header, banner ve kartlar kampanya katmanıyla dolu; "normal gün" tasarımı farklı olabilir.

## 2. Ana sayfa bölüm akışı (Gözlem)
1. **Duyuru çubuğu + geri sayım** ("Early Access Gifts End Tonight" — `00 D : 00 H : 00 M : 00 S`) ve "30% Off Sitewide / Free Express Shipping on Orders $500+" döngüsü; **promo offers çekmecesi** (çoklu kampanya listesi)
2. Header: Shop (Category / Concern / **Skin Type** üç sütun), Bestsellers, The Routine, Holiday Shop, About Us, Search, Log in, Cart
3. **Hero carousel** (Splide, `data-slide-speed="5500"` = 5,5 sn): "EXCLUSIVE EARLY ACCESS — 30% Off Sitewide" + `SHOP THE SALE`
4. **"Skincare Essentials"** ürün şeridi (best-sellers; hover'da kart açılır)
5. "Our Best Gifts of Black Friday" banner (UNLOCK NOW)
6. **"Shop by Concern"** — 5 kutucuk (Dark Spots & Dark Circles / Sensitive Skin / Breakouts & Blemishes / Pregnancy / Fine Lines & Wrinkles), her biri "Shop Now"
7. "The Holiday Shop" banner
8. **"All True Botanicals Products Are Pure. Potent. Proven.®"** — güven bloğu: MADE SAFE® sertifikası, EWG doğrulaması, klinik kanıt, dermatolog testi, hipoalerjenik
9. "Featured In" (basın logoları) + marquee şeritler
10. Footer: Shop / Learn / Help sütunları, sosyal medya
Kaynak: https://www.truebotanicals.com/

**Yorum:** Üst yarı tamamen kampanya; asıl kimlik "Pure. Potent. Proven." üçlüsünde. Ana sayfa **kısa** (≈5 bölüm) — bizim "alışveriş önde" ilkesine uygun yoğunluk.

## 3. Ürün kartı anatomisi (Gözlem — "Skincare Essentials")
- Rozet: `Bestseller` / `NEW` → ürün adı (iki kez: normal + hover gövdesi) → **hover'da kısa fayda cümlesi** ("clinically proven to outperform two leading anti-aging serums…") → **"Add to bag"** → fiyat.
- **Kampanya fiyatı:** `$90` (çizili) `$63` (güncel); karttaki `Sold out` metni varyant durumu şablonu.
- Çok boyutlu ürünlerde **"Choose Size"** + fiyat aralığı `$72 - $120` + açılır "Select Size": *Full Size (1oz | 30mL, $4/mL)* · *Travel Size (.5oz | 15mL, $4.80/mL)* — **birim fiyat (mL başına)** gösterimi.
- Karta "EARLY ACCESS" ikon/etiket katmanı (30% off, hediye eşiği).
- Veri: kitlerde `compare_at_price` (örn. 175/310, 99/200).
Kaynak: https://www.truebotanicals.com/ , https://www.truebotanicals.com/products.json?limit=3
**Yorum:** **mL başı fiyat** ve **liste/üye fiyat çifti** Greenleaf'in gramaj odaklı çok ürünlü kataloğu için yararlı; hover fayda cümlesi mobilde çalışmaz (hover yok) — dokunmatik alternatifi gerekir.

## 4. Ürün detay sayfası yapısı (Gözlem — Pure Radiance Oil)
1. Breadcrumb; **galeri** (video dahil — "Pause video"; 8-9 görsel `products.json`'da)
2. Başlık ("Renew / Pure Radiance Oil"); fiyat `$120 → $84`; **Size** seçici (Full / Travel)
3. **Abonelik kademeleri:** "30% off your first order… / **20% off your 2nd & 3rd orders / 15% off every order after** / Gifts with every order / Cancel anytime"; "Frequency Recommendation" tablosu (günde 2 kez → 2 ayda bir; günde 1 → 3 ay; haftada birkaç → 4 ay)
4. `ADD TO BAG` (fiyat butonda)
5. Güven şeridi: "Free Shipping on All U.S. Orders" · "**30-Day Money-Back Guarantee**"
6. Akordeonlar: Description · How to Use ("Apply 3-8 drops…") · Ingredient List (tam INCI)
7. **Dermatolog sözü** (isim + unvan: "Dr. Daniel Butler, MD, Board-Certified Dermatologist")
8. "Build Your Routine" — 3 ürün çapraz satış (Spirulina Cleansing Powder → Chebula Active Serum → The Routine seti)
9. **"Real Results from our Community"** — UGC fotoğrafları ("30 gün sonra, rötuşsuz")
10. **Clinical Results** büyük rakamlar (%100 / %100 / %100) + dipnot ("45-day clinical study of 20 women")
11. **"Intelligent Ingredients"** akordeon (Chia & Kiwi tohumu yağları → ne işe yaradığı)
12. **"Meet Your Routine"** sekmeli (Cleanse / Treat / Moisturize), her sekmede ürün kartı
13. Değerlendirmeler: Yotpo/Okendo/Loox referansları (yorum ayrıntısı görülmedi)
Kaynak: https://www.truebotanicals.com/products/pure-radiance-oil-renew
**Yorum:** "İçerik → ne işe yarar" akordeonu (**Intelligent Ingredients**) bizim "içerik sözlüğü" fikrinin ürün sayfası karşılığı; ILIA/Tatcha'daki gibi **tek kısa cümle/içerik**.

## 5. Listeleme / filtre UX (Gözlem — /collections/all)
- Üstte "Filter/Sort"; **Filter:** *Category* (Cleansers & Toners (6), Serums (5), Face Oils (4), Moisturizers (5), Eye Treatments (6), Lip Treatments (3), Targeted Treatments (8), Body Care (7), Skincare Sets (12), Tools & Accessories (4)); *Concerns* (Fine Lines & Wrinkles (21), Dark Circles (6), Dryness (20), Breakouts (8), Dullness (15), Redness & Sensitive Skin (11), Uneven Skin Tone and Roughness (12), Sagging Skin (7), Dark Spots (7), Anti-Aging & Prevention (23), **Pregnancy Approved (31)**…) — her grubun üstünde "0 selected" + "Reset"; seçenekte sayaç.
- Filtre alanları metafield'dan (`filter.p.m.filter_app.category`, `…concerns`, `custom.filter_app_holiday_shop`).
- Koleksiyon sayfasında ürün ızgarası "collapsible content / FAQ" ile bitiyor ("What is True Botanicals?", "Is True Botanicals cruelty-free and vegan?").
- Ürün etiketleri (JSON): içerik adları (`Aloe Vera`, `Green Tea`…), `pregnancy safe`, `routine-step_cleanse/treat/hydrate`, `eligible-for-replenishment` → **içerik ve rutin adımı** etiketleri filtrelemeye veri sağlıyor.
Kaynak: https://www.truebotanicals.com/collections/all , https://www.truebotanicals.com/products.json?limit=30&page=2
**Yorum:** "**Pregnancy Approved**" gibi tek tıkla güven filtresi çok değerli; Greenleaf'te bebek/hijyen kategorilerinde benzeri ("Hassas cilde uygun", "Bebekler için") filtre olabilir — **ancak** iddia doğrulaması şart (MEMORY §10).

## 6. Cilt testi / ürün eşleştirme akışı
- **Quiz bulunmadı.** Header/ana sayfa HTML'inde quiz bağlantısı yok (arama: `quiz|consult|finder` → yalnızca `/collections/meet-your-routine`, `/collections/combination-skincare-routine`).
- Yerine **statik rehberlik:** "Shop by Concern", "Shop by Skin Type", **"The Routine"** (4 adım: cleanse, treat, hydrate, moisturize; tek set ürün $368 → $257,60) ve PDP'de "Meet Your Routine" sekmeleri; FAQ metni "…for a personalized recommendation" (müşteri hizmetine yönlendirme).
Kaynak: https://www.truebotanicals.com/ , https://www.truebotanicals.com/collections/all
**Yorum:** Test olmadan da "rutin seti + endişe kutucukları" ile eşleştirme yapılıyor — Faz 1 için **hafif alternatif**.

## 7. Mikro etkileşimler & animasyonlar (→ hareket-tasarimcisi)
| Etkileşim | Tetikleyici | His/süre | Amaç |
|---|---|---|---|
| Hero carousel otomatik geçiş | zamanlayıcı | 5,5 sn (`data-slide-speed`) | Kampanya döngüsü |
| **Geri sayım sayacı** (D:H:M:S, 90 `countdown` referansı) | sürekli | saniye | Aciliyet (kampanyaya özgü) |
| **Kart hover'ında açılan fayda metni + "Add to bag"** (`#best-sellers-hover`, Splide slider) | hover | hızlı | Kart yüzeyini sade tutup bilgiyi isteğe bağlı vermek |
| Marquee şeritler (158 referans) | otomatik | sürekli yatay kayma | Basın/avantaj ticker'ı |
| Splide ok/pagination | tıklama/sürükle | — | Vitrin gezinti |
→ hareket-tasarimcisi: **kartta hover-reveal (dokunmatikte tıklama alternatifi)**, **marquee güven şeridi** (sertifika logoları için uygun), geri sayım **yalnız gerçek kampanyada** (sahte aciliyet ALMA).

## 8. Mobil davranış (Gözlem — CSS/markup)
- Breakpoint'ler (Dawn tabanı): `min-width:750px`, `min-width:990px`, `max-width:749px`.
- Filtre ve filtre-chip'leri **mobil için ayrı id'li** (`…concerns-mobile-6…9`) — masaüstü yan menü / mobil çekmece ayrımı.
- Splide slider'lar mobilde kaydırmalı (swipe).
- Sticky ATC / alt çubuk: **doğrulanamadı**.
Kaynak: `https://truebotanicals.com/cdn/shop/t/1614/assets/base.css`

## 9. Tipografi / renk karakteri (Gözlem)
- Başlık: **ABC Marist Book** (serif, `--font-heading-family`); gövde: **Suisse Intl** (`--font-body-family`); ayrıca `Pinyon Script` / `Snell Roundhand` (el yazısı vurgu).
- Düğme: köşe yarıçapı **0** (`--buttons-radius:0px`), kenar 2 px.
- **Renkler (sıklık sırasıyla):** `#2c1203` (koyu çikolata kahvesi, metin) · `#f9f4ee` (krem) · `#ffffff` · `#d8d2c2` (bej-gri) · `#5b332c` (kahve) · `#c65238` (kiremit) · `#61070a` (bordo) · `#fcd6d7` / `#d3efcd` (pastel).
**Yorum:** Palet **krem + toprak kahvesi + bej** = tam anlamıyla "muted botanical / earthy" estetiği. Kullanıcının **reddettiği yöne en yakın site** bu. Yeşil çok az (`#d3efcd` pastel). Estetik olarak başarılı ama Greenleaf kimliğine **ters**.

## 10. Greenleaf için çıkarım
| Etiket | Madde | Neden |
|---|---|---|
| **ALMA** | Krem/kahve/bej palet, el yazısı vurgu fontu | Reddedilen "muted botanical"; Greenleaf'in `#4EAE36` kimliğiyle çelişir (§9) |
| **ALIN** | **"Pure. Potent. Proven.®"** üçlü güven bloğu (üç kelime + sertifika adları) | Kanıtsız ISO/GMP iddialarına karşı sade, güçlü yapı |
| **ALIN** | PDP'de **isimli uzman alıntısı** (isim + unvan) | Güven; Greenleaf için "Ürün geliştirme uzmanı/dermatolog görüşü" yalnız gerçekse |
| **ALIN** | "Intelligent Ingredients" akordeonu (içerik → tek cümle fayda) | İçerik sözlüğü fikrinin PDP uygulaması |
| **UYARLA** | **Abonelik kademesi merdiveni** (%30 ilk / %20 2-3. / %15 sonrası) | Üyelik avantajını "ilk siparişte X, sonra Y" kademesi olarak anlatma modeli; MLM/PV mantığına bağlanabilir ama hukuki dil kontrolü gerek |
| **UYARLA** | mL başı birim fiyat ("$4/mL") | Gramajlı ürünlerde şeffaflık; yalnız kozmetikte |
| **UYARLA** | Kart hover'ında fayda cümlesi + Add to bag | Masaüstünde; mobilde dokunmatik karşılığı tanımlanmalı |
| **UYARLA** | "Shop by Concern" 5'li kutucuk | Kategori şeridine ek kozmetik alt girişi olarak (Greenleaf'te ana giriş ikonlu kategori şeridi) |
| **ALMA** | Ana sayfayı geri sayım + %30 banner ile doldurma | "Alışveriş önde, kampanya gürültüsü yok" ilkesi ve düşük güven riski |
| **ALMA** | Kare köşeli, 2 px kenarlı butonlar | Marka yuvarlak dil (pinwheel) ile uyumsuz |
