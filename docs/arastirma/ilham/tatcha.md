# Tatcha (tatcha.com) — İlham Analizi

> Yön: **Premium / editoryal** (MEMORY §9). Hazırlayan: A3-ilham-dogal-premium, FAZ 0. Tarih: 15 Kasım 2026.
> **Gözlem** = HTML/CSS/JSON'dan; **Yorum** = görüşümüz. Ham önbellek: `.cache/arastirma/tatcha/`
> Bu siteyi en iyi okuyabildik: Tatcha'nın HTML sayfaları (ana sayfa, koleksiyon, PDP, Ritual Finder) 429 vermeden alındı; **Ritual Finder (cilt testi) soruları HTML'de tam görüldü.**

## 1. Kaynaklar
| URL | Ne için | Not |
|---|---|---|
| https://www.tatcha.com/ | Ana sayfa HTML | 200, Shopify |
| https://tatcha.com/collections/moisturizers | Listeleme HTML (13 ürün) | 200 (`/skincare/moisturizers` 404 verdi) |
| https://tatcha.com/products/the-dewy-skin-cream | Ürün detay HTML | 200 |
| https://tatcha.com/pages/ritual-finder | **Cilt testi** HTML | 200 |
| https://tatcha.com/products.json?limit=30 , https://tatcha.com/collections.json?limit=30 | Etiket sözlüğü, koleksiyonlar | 200 |
| `https://tatcha.com/cdn/shop/t/133/assets/theme.css` | CSS (240 KB) | 200 |

**Kısıt:** Tarayıcı render'ı yok; Yotpo yorum widget'ının iç yapısı HTML'de (SSR çıktı) göründü. Sonuç sayfası (quiz sonrası) çalıştırılamadı — yalnız CSS sınıflarından yapı çıkarıldı. Ana sayfa şu an **Holiday/Gifting** dönemine ait.

## 2. Ana sayfa bölüm akışı (Gözlem)
1. Duyuru çubuğu ("Complimentary Shipping on all U.S. Domestic Orders", autoplay)
2. Header: Shop (Featured / Category / Skin Type / **Benefits**) · Our Story · Science (Tatcha Institute, Hadasei-3, Ingredients) · **Ritual Finder** · Login · Bag; menüde "Previous/Next" ile kaydırmalı alt panel kartları ("The Dewy Skin Cream — Curate your own set")
3. **Hero slideshow:** "Gift a Ritual of Care — A gift from Tatcha offers a moment of pause and self-care…" + `Explore Gifts`
4. **Featured collections** (sekmeli: Bestsellers / New): bestseller kartları + tek ürün satırı arasına **banner kartı** ("Curate a Gift Set — Only on Tatcha.com")
5. "The Gift Guide" banner (Discover Gifts)
6. **"Shop by Skin Type"** medya blokları (Dry / Oily / Sensitive / Mature; Previous/Next)
7. **Testimonials** (4 müşteri yorumu: isim + alıntı, altında ilgili ürün şeridi: The Longevity Serum, The Rice Wash…)
8. Multi-column promosyon: "Curate a Gift Set — 15% off 4 full sizes" / "A Deep Red to Warm the Heart" / "Win Two Advent Calendars"
9. Slideshow (editoryal görsel)
10. **Trust icons** (3 slayt): "Complimentary shipping and returns on U.S. orders" · "Made with high-quality ingredients from Japan." · "Every Tatcha purchase supports education equality worldwide."
11. Bülten ("Keep in Touch") + footer (Company / Help / Account; ülke seçici ABD, HK, Japonya, UK)
Kaynak: https://www.tatcha.com/
**Yorum:** Akış **az bölüm, çok boşluk** (≈9 blok); "kategori" değil **"Skin Type" ve Benefits** üzerinden giriş. Bölümler arası ağırlık bir ürün şeridine değil, editoryal görsele verilmiş.

## 3. Ürün kartı anatomisi (Gözlem)
- Sıra: üst **rozet(ler)** ("Special Value", "Bestseller", "New", "HSA/FSA Eligible") → **format çipleri** (Gratitude · Full Size · Refill · Mini — aynı ürünün formatları kartta seçilebilir) → ürün adı (serif) → **tek satır işlev** ("Rich Line-Plumping Moisturizer") → fiyat (`$93`) → "Add to Bag".
- Kitlerde: "Holiday Value Set" etiketi + `$126` + "(… value)" (değer karşılaştırması).
- Her kartta tek **birincil fiyat**; çizili eski fiyat yok (indirimsiz marka).
Kaynak: https://www.tatcha.com/ , https://tatcha.com/collections/moisturizers
**Yorum:** "Full Size / Refill / Mini" çipleri; Greenleaf'te "tek ürün – çoklu hacim/koli" yapısına (50 ml / 100 ml) benzer; **koli adedi addan çıkarılacak** (MEMORY §6) → hacim seçimi çiple.

## 4. Ürün detay sayfası yapısı (Gözlem — The Dewy Skin Cream)
1. **Galeri:** 24 görsel + (Go to item 1…24) pager; rozet "Special Value / Bestseller"
2. Breadcrumb "Shop All / Moisturizers"; başlık + alt başlık; **Size** (75 ml / 2.54 fl. oz.); fiyat `$93.00`; **format çipleri** (Gratitude / Full Size / Refill / Mini)
3. **Gönderim mantığı:** "Ships Now: 1x Refillable Jar + 1x Refill Pod · Ships Later: 1x Refill Pod"; **ZIP ile tahmini varış** ("Ship to 98152 UPDATE — Calculating estimated arrival…")
4. Adet (−/+); **tek CTA "Add to Bag"**; "Free shipping and returns on U.S. orders"; "Got a Product Question? **Ask Now**"
5. **Recommended for:** Dry, Combo to Dry, Hydrating, Plumping, Healthy Aging · **Formulated without:** Mineral oil, synthetic fragrances, sulfate detergents, parabens, urea, DEA, TEA, phthalates · **Dermatologist Tested · Non-Comedogenic · Cruelty-free** (rozet satırı)
6. **Featured Ingredients** (3 içerik: ad + tek cümle fayda: "Hyaluronic acid & red algae — Hydrate & visibly plump lines") + "See Full Ingredients" + tam INCI açılır
7. Subscribe & Save (**%10 + ücretsiz kargo**) kuralları
8. **Benefits** (3 madde) → **Clinical Results** ("Boosts skin moisturization by 225% after 1 use"; 100% / 88% büyük rakam; "Based on a clinical study of 36 panelists" dipnotu + "See Full Results")
9. **How to Use** ("PLUMP — Cushion skin with rich, radiant hydration" + gold spoon talimatı) + **Pairs with: The Rice Wash**
10. Text-with-icons: **"Inspired by uruoi"** / **"Powered by proprietary complex Hadasei-3™"** (hikâye)
11. **Suggested Ritual** carousel + **"Add All to Bag"**
12. **Yorumlar (Yotpo):** genel puan 4.77/5, 6100 yorum; **AI Generated Review Summary**; Summary topics (yüzde: Sensitive Dry Skin 34%, Silky Soft Feel 19%…); highlights; bireysel yorumlar
13. FAQ · Related Articles (blog kartları: "Is There a Dewy Skin Cream Dupe?…") · related-products
14. **Sticky Add-to-Bag** (`product-sticky-add-to-cart`, görünür olunca opacity/visibility ile açılır; sayfanın altında sabit)
Kaynak: https://tatcha.com/products/the-dewy-skin-cream
**Yorum:** Üç yapı özellikle değerli: (a) **Recommended for / Formulated without / Dermatologist Tested** tek satırlık rozet bloğu (içerik sözlüğü + sertifika için), (b) **"Pairs with" + Suggested Ritual + Add All** çapraz satış zinciri, (c) **blog makalelerinin PDP'ye gömülmesi** (SEO + eğitim) — MEMORY §7'deki "haber/içerik bölümü" fikrini ürün sayfasına taşıyor.

## 5. Listeleme / filtre UX (Gözlem — /collections/moisturizers)
- "13 Products" · **"Filter & sort (13)"** (tek buton → çekmece/panel) · **kart yoğunluğu anahtarları:** "Show two cards per row / three cards per row / Show cards bigger / smaller"
- Izgara içine **araya giren banner kartı** (4. sıra civarı: "A Message of Love — From you, to your skin… Shop Now")
- Kartlar PDP ile aynı (rozet + format çipleri + fiyat); kitler listenin sonunda.
- **Etiket/facet sözlüğü** (`products.json` etiketleri): `Claim: Non-Comedogenic`, `Concern: Acne`, `Format: Primer / Gift Set/Ritual Set / Lip Treatment`, `Key Ingredient: Algae/Seaweed`, `Skin Type: Oily`, `Use Case: Mini/Trial Size`, ek olarak `claims-paraben-free`, `formulation-liquid-lotion`, `product-type-lip-mask`, `excludeDiscount` → altı eksenli, **kontrollü** sözlük.
- Çok sayıda **niş koleksiyon** (`/collections.json`): `skincare-for-dry-skin`, `brightening-skincare`, `barrier-repair-skincare`, `cruelty-free-skincare`, `clean-beauty`, `algae-seaweed-skincare`… (SEO'ya yönelik her endişe/içerik için ayrı koleksiyon sayfası).
Kaynak: https://tatcha.com/collections/moisturizers , https://tatcha.com/collections.json?limit=30 , https://tatcha.com/products.json?limit=30
**Yorum:** "Kartları büyüt/küçült" anahtarı ve "Filter & sort" tek butonu düşük karmaşıklık; Greenleaf'in geniş kataloğunda **sol sabit filtre paneli (masaüstü) + çekmece (mobil)** daha uygun olabilir, ama Tatcha'nın etiket **eksen yapısı** doğrudan model.

## 6. Cilt testi / ürün eşleştirme akışı — **Ritual Finder** (Gözlem, tam)
Giriş: "For Your Skincare Wishes — The Ritual Finder. Your perfect beauty ritual is only a moment away! Simply answer a few quick questions to receive a skincare practice made for your: **Skin Type · Skin Benefits · Existing Skincare Collection**" → `Let's Get Started`.
| Adım | Soru | Tip | Detay |
|---|---|---|---|
| **1/4** | "How would you describe your skin today?" | Tekli seçim | Oily · Combo to Oily · Combo to Dry · Dry · Mature; **ek onay kutusu:** "Do you have sensitive skin? — Yes, I am prone to reaction, irritation, and redness"; yardım: "Need help determining your skin type? — Identifying your skin type" (her tip için 1-2 cümle tanım açılır) |
| **2/4** | "What skin benefits are you looking for?" — "Please select up to **three** benefits" | Çoklu (en fazla 3) | Brightening · Calming · Clarifying · Firming · Healthy Aging · Hydrating · Plumping · Pore-Minimizing · Smoothing · SPF · Tightening |
| **3/4** | "Would you like to address anything around your eyes?" — *Optional* | Çoklu, **isteğe bağlı** | Brightening · Hydrating · Smoothing |
| **4/4** | "Which Tatcha treasures are in your current routine?" — "We'll tailor a ritual to include what you select." | Ürün seçimi (kategorilere göre) | Cleanser & Exfoliators / Serums & Essence / Eye Care / Primer & Mist / Moisturizers / SPF / Lip Care / Masks & Treatments altında ürün adları listesi |
- **Sonuç sayfası (CSS'ten Gözlem, çalıştırılamadı):** `rf-results__filters` (sonuç filtreleri), `rf-results__product-card` (**akordeonlu** kart: `accordion-content`, `accordion-cta`), `rf-results__product-card__usage-time` (**AM/PM kullanım zamanı**), `__flag` (rozet), `__color-btn`, `rf-result-email__container` (**sonuçları e-postaya al**).
- Sorular ilerleme göstergeli ("Question 1/4"), cevapla ilerleyen, tek sayfalık akış (Gözlem: `rf-landing` bölümü + `rf-question__list/input/label`).
Kaynak: https://tatcha.com/pages/ritual-finder , `https://tatcha.com/cdn/shop/t/133/assets/theme.css`
**Yorum:** 4 kısa adım, ücretli/zorunlu veri yok, **mevcut rutini dikkate alma (4. adım) en güçlü fikir** — tavsiye "sıfırdan set sat" değil "sende olmayanı ekle". Greenleaf'te yalnızca 3 adım (cilt tipi → hedefler → mevcut ürünler) yeter; sonuç sayfası "AM/PM" ve e-posta ile kaydetme içerir.

## 7. Mikro etkileşimler & animasyonlar (→ hareket-tasarimcisi)
| Etkileşim | Tetikleyici | His/süre | Amaç |
|---|---|---|---|
| Çoğu geçiş `.2s` (`color`, `opacity`, `transform` 6×/5×/4×; `ease-in-out`); büyük geçişler `all .5s` | hover/odak | 200 ms hızlı, 500 ms yavaş | Sakin, kısa geri bildirim |
| Easing seti: `cubic-bezier(.4,0,.2,1)`, `(.4,0,.22,1)`, **`(.16,1,.3,1)` (easeOutExpo)**, **`(.34,1.56,.64,1)` (hafif aşım/yaylanma)** | UI geçişleri | yumuşak yavaşlama / 1 yaylanma | Lüks "süzülen" his |
| `@media (pointer:fine)` altında 26 kural | yalnızca fareyle | — | **Hover efektleri sadece fare cihazlarında** (dokunmatikte "yapışan hover" önlenir) |
| Keyframes: `cell-horizontal-parallax`, `cell-vertical-parallax` | scroll | — | Hücre/medya paralaks (editoryal görsel katmanı) |
| `textWithIconsItemsScale`, `hotSpotDotAnimation`, `backButtonBounce`, `gradient` | görünür olunca / etkileşim | — | İkonlu metin ölçeklenmesi, görsel üstü sıcak nokta |
| `fortuneSlideIn / FlipOut / FlipIn` | gift/bonus etkileşimi (amaç **Gözlem'den kesin değil**) | — | Kart çevirme tipi sürpriz |
| Sticky ATC `is-visible` (opacity+visibility) | ana CTA ekrandan çıkınca | ~200 ms | Kaydırırken satın alma erişimi |
| Menü alt paneli Previous/Next, Testimonials slider, Trust icons slider | tıkla/sürükle | — | Düşük yoğunluklu içerik gezinmesi |
→ hareket-tasarimcisi: **`pointer:fine` korumalı hover seti**, **easeOutExpo (.16,1,.3,1)** ana easing adayı, **sticky ATC giriş/çıkışı**, **yaylanmalı (1.56) küçük geri bildirim** (sepete ekleme onayı için).

## 8. Mobil davranış (Gözlem)
- Breakpoint'ler: `min-width:700px` (77), `min-width:1000px` (69), `max-width:699px` (25), `pointer:fine` (26) → **mobile-first**, hover ayrı kapı.
- PDP: **sticky add-to-cart** (`inset-block-end:0`, `padding:1rem`, arka plansız/gölgesiz; renk şeması "scheme-2"), görünür olduğunda opacity 1.
- Koleksiyonda kart yoğunluğu anahtarı **mobilde de** (2/3 kart per row).
- Header'da `Menu` + `Search` + `Bag` üçlüsü; menü Previous/Next kaydırma panelleri; **ülke seçici** footer'da.
Kaynak: `https://tatcha.com/cdn/shop/t/133/assets/theme.css`

## 9. Tipografi / renk karakteri (Gözlem)
- Başlık: **Rhymes Text** (Light + Light Italic; serif; yedek Garamond) — `--tatcha-font-serif`; gövde/UI: **Siaga** (Light/Medium/Light Italic; hümanist sans; yedek Helvetica/Arial) — `--tatcha-font-sans`.
- **Renkler:** `#141414` (metin/birincil buton) · `#ffffff` · `#e0e0dd` (sıcak açık gri) · `#f1f0f3` (lavanta-gri) · `#8f8e8c` · `#3a3a3a` · `#2d2d38` · `#282528` · `#2f60ea` (mavi bağlantı/odak) · `#ff5f00` (turuncu vurgu); arka plan şemaları: `rgb(219 216 233)` lavanta · `rgb(72 51 96)` koyu mor · `rgb(250 244 240)` pudra.
**Yorum:** Siyah/beyaz zemin + sıcak gri + lavanta/mor aksan = **nötr-lüks**, yeşil/doğa vurgusu yok. Doğrudan renk alınmaz; **boşluk, serif başlık + sade sans gövde ve siyah birincil CTA** disiplinini alıp rengi Greenleaf yeşiline çevirmek mümkün. "Muted/beige botanical" değil (daha çok gri-siyah editoryal) → **risk düşük**, ama Greenleaf'in neşeli/canlı yeşilini sönükleştirme riski var.

## 10. Greenleaf için çıkarım
| Etiket | Madde | Neden |
|---|---|---|
| **ALIN** | **Ritual Finder 4 adım yapısı** (cilt tipi → ≤3 hedef → opsiyonel göz → mevcut ürünler), ilerleme "1/4" | Rakiplerde olmayan fikir (MEMORY §9); sorular HTML'de kanıtlı |
| **ALIN** | Sonuç kartlarında AM/PM etiketi + "e-postama gönder" | Kullanışlı, düşük maliyet |
| **ALIN** | PDP **Recommended for / Formulated without / Dermatologist Tested** rozet satırı | İçerik/sertifika rozet isteğiyle birebir (MEMORY §7) |
| **ALIN** | **Featured Ingredients** (3 içerik, her biri tek cümle) | İçerik sözlüğü hafif sürümü |
| **ALIN** | **Sticky Add-to-Bag** (mobil) + tek CTA | Tek net CTA ilkesi |
| **ALIN** | `Skin Type / Concern / Key Ingredient / Claim / Format / Use Case` **kontrollü etiket ekseni** | `lib/products.ts` şeması + filtre için model |
| **ALIN** | `pointer:fine` koruması ile hover efektleri | Mobil kalite |
| **UYARLA** | Suggested Ritual + **Add All to Bag** + "Pairs with" | Çapraz satış; Greenleaf'te "set" mantığına bağla |
| **UYARLA** | Format çipleri (Full / Refill / Mini) | Greenleaf'te hacim/paket çipi; ad temizliği için |
| **UYARLA** | PDP'ye gömülü blog kartları | SEO/içerik; Faz 2 (blog kurulduktan sonra) |
| **UYARLA** | Yotpo benzeri **AI yorum özeti + konu yüzdeleri** | Yorum hacmi yokken anlamsız; sonraya |
| **UYARLA** | Serif başlık + siyah-beyaz editoryal | Boşluk/ritim alınır; Poppins ve yeşil marka rengi korunur |
| **UYARLA** | Klinik sonuç bölümü ("225%", "100%") | Yalnız doğrulanmış Greenleaf verisiyle; aksi hâlde TİTCK riski |
| **ALMA** | ABD'ye özgü ZIP tahmini varış, HSA/FSA rozeti | Türkiye'de karşılığı yok |
| **ALMA** | Lavanta/mor/gri nötr palet | Marka rengi değil |
| **ALMA** | Kart içi "Gratitude" gibi sezonluk format çipi | Greenleaf'te anlamsız |
