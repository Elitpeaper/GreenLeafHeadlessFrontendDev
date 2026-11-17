# Farmacy Beauty (farmacybeauty.com) — İlham Analizi

> Yön: **Doğal / yeşil** (MEMORY §9). Hazırlayan: A3-ilham-dogal-premium, FAZ 0. Tarih: 15 Kasım 2026.
> **Gözlem** = HTML/CSS/JSON'dan; **Yorum** = görüşümüz. Ham önbellek: `.cache/arastirma/farmacy/`
> Not (Gözlem): Bülten metni "Farmacy Beauty and other trusted P&G brands" diyor — marka artık P&G çatısında; bu "bağımsız çiftlik markası" imajıyla kurumsal arka plan arasında bir fark.

## 1. Kaynaklar
| URL | Ne için | Not |
|---|---|---|
| https://www.farmacybeauty.com/ | Ana sayfa HTML | 200, Shopify (tema olay adları "eurus:…") |
| https://www.farmacybeauty.com/collections/clean-skin-care-products | Listeleme HTML (100 ürün) | 200 (`/collections/all` yerine ana sayfadaki gerçek koleksiyon bağlantısı) |
| https://www.farmacybeauty.com/products/green-clean-cleansing-balm | Ürün detay HTML | 200 |
| https://www.farmacybeauty.com/pages/quiz-finder | Quiz sayfası | 200 ama içerik JS ile (HTML boş) |
| https://www.farmacybeauty.com/products.json?limit=3 ve `?limit=30&page=3` | Ürün verisi/etiketler | 200 |
| `.../cdn/shop/t/1470/assets/theme.css`, `custom-theme.css` | CSS | 200 |

**Kısıt:** İlk HTML istekleri 429 (Retry-After 60); bekleyip yavaş (4-6 sn) tekrar edildi. Quiz soruları görülemedi (JS). Tarayıcıda canlı animasyon görülmedi; his tahminleri CSS'e dayanır.

## 2. Ana sayfa bölüm akışı (Gözlem)
1. **Duyuru çubuğu**: 3 dönen mesaj ("GET A FREE HONEY MILK MINI WITH ORDERS $85+", "SHOP NEW LEMON MINT LIP SMOOTHIE | $22", "SHOP NEW & LIMITED-EDITION HOLIDAY KITS")
2. Header: SHOP · NEW · BEST SELLERS · GIFT GUIDE · **SKINCARE QUIZ** · TRY FARMACY · REWARDS; sepet çekmecesinde "Login to the hive — Get Your Sweet Rewards!"
3. **Hero slideshow** (3 slayt: Holiday Kits / Holiday Favorites / Gift Guide), her biri üst etiket + başlık + alt cümle + CTA
4. **Shop By Category** (görsel galeri: The Gift of More / The Sweet Spot / Little Luxuries / Stocking Stuffers — sezonluk)
5. **Shop By Skincare Concern** (Oil/Combo Skin · Dry Skin · Sensitive Skin · Fine Lines · Dullness) — görselli kutucuklar
6. **Product spotlight**: "Your Farmacy Holiday Gift Guide" + 2 öne çıkan kit kartı (**"You Save 40% ($32)"**)
7. **Best Sellers — "Your skin's new best friends."** (kaydırmalı koleksiyon, "View All")
8. **"Join the Hive"** — ödül programı görsel+metin bloğu ("SIGN UP NOW")
9. **Skincare Quiz** bloğu: "Didn't find your perfect match? Take our quick skincare quiz… **FIND MY ROUTINE**"
10. Marka hikâyesi slaytı: "At Farmacy Beauty We Respect our Roots — … real, farm-sourced ingredients raised in nature" (ABOUT US)
11. Uygulama bölümleri (yorum/UGC vb.), bülten: "Get 15% off your first order!"
12. Footer: Shop by Category / About / Help / Follow us; ücretsiz kargo notu ($50 eşiği)
Kaynak: https://www.farmacybeauty.com/
**Yorum:** Akışta **"Concern → Best Sellers → Üyelik → Quiz → Marka hikâyesi"** sırası var; quiz, ürün göründükten **sonra** "bulamadıysan" kurtarma bloğu olarak konmuş — bu bizim "alışveriş önde, test ikinci" yaklaşımıyla uyumlu.

## 3. Ürün kartı anatomisi (Gözlem)
- Görsel (kare, `padding-bottom:100%`) → **çift görsel** (hover'da ikinci görsel; `animate_transition_card__image` + `lazy_active`) → rozet katmanı (`x-badges`, metafield `custom.product_badges`; "yeni/indirim/stok" kuralları `diff_day_create`, `diff_day_publish`, `qty` ile) → ürün adı → **tek satır işlev cümlesi** ("hydrating holiday trio of our favorite honey formulas") → fiyat → **"$35($54 Value)"** + **"You Save 35% ($19)"** → yıldız/**yorum sayısı "(11)"** → "Add to Bag" (kart altında/hover'da) · "Sold out".
- Hızlı görünüm (quick-view) bölümü global (`sections--quick-view`).
Kaynak: https://www.farmacybeauty.com/ , https://www.farmacybeauty.com/collections/clean-skin-care-products
**Yorum:** "**$X ($Y Value) / You Save Z% ($N)**" tam olarak bizim **liste fiyatı + üye fiyatı + tasarruf** ihtiyacının karşılığı; liste fiyatın "Value" diye çerçevelenmesi, MEMORY §7'deki "indirim fiyata yansımıyor" hatasının **tersini** yapıyor (tasarrufu rakamla gösteriyor).

## 4. Ürün detay sayfası yapısı (Gözlem — Green Clean Cleansing Balm)
1. Breadcrumb; galeri (`products.json`'da bu ailede 10 görsel)
2. Başlık + işlev ("makeup + SPF melting cleansing balm") + fiyat `$39.00`
3. Kısa açıklama (klinik iddia: "removes over 99% longwear foundation…")
4. **Select Size** (30 / 50 / 100 / 200 ml) + **Select Scent** (Original / Fragrance-Free / Honey Vanilla); adet ("(0 in cart)"); `Add to Bag`; **"View full details"**; ardından Size/Scent kombinasyon listesi + ikinci `Add to Bag` (yapışkan satın alma çubuğu olabilir — **Yorum**)
5. **Promotion grid:** "Earn up to **39 Reward Points** with this purchase. **Join the Hive** or Login" + "Free Shipping — Spend $50 or More"
6. **Proven Results:** Before + After; %96 / "3x more gentle than makeup wipes"; "Based on clinical testing on 31 participants"
7. Perfect For · **Why We Love It** (3 madde: içerik → fayda) · **Awards** (Allure 2017/2026, Byrdie 2022, Marie Claire 2023)
8. **Let's Recycle** (geri dönüşüm talimatı + "Empties Program" ücretsiz iade etiketi)
9. **Compare + Choose** karşılaştırma tablosu · scrolling banner · görsel+metin · FAQ · **Recently viewed**
Kaynak: https://www.farmacybeauty.com/products/green-clean-cleansing-balm
**Yorum:** PDP'de "**Earn … Reward Points with this purchase — Join the Hive**" satırı, Greenleaf'te **"Bu alışverişte X PV / üye olsanız Y TL daha ucuz"** satırının birebir örneği. Ödül mesajı satın alma alanının **hemen altında**, ana CTA'yı bozmadan.

## 5. Listeleme / filtre UX (Gözlem — 100 ürün)
- Başlık + açıklama + "Filter and sort · 100 products"
- **Availability** (In stock / Out of stock) · **Benefits** (çoklu seçim, "**Match all**" anahtarı; 17 seçenek: Anti-aging, Brightening, Calming Redness, Dark Spots, Hydrating, Oil Control, Removes Makeup, Sensitive Skin…) · **Sizes** (30 ml | 1 oz … 200 ml, Travel Size, Gift Set) · **Flavors** (Apple, Honey Vanilla, Lemon Mint…) · "Reset" her grupta
- **Sort by:** Featured · Most relevant · Best selling · A–Z · Z–A · Price low→high · Price high→low · Date old→new · Date new→old
- Etiket sözlüğü (JSON `tags`): `Benefits::Hydrating`, `Category::Moisturizers`, `group::Honey Halo` → **"Anahtar::Değer"** biçimli kontrollü sözlük.
- Sayfa sonunda SEO metni + SSS ("How do I choose the right clean skincare products for my skin?").
Kaynak: https://www.farmacybeauty.com/collections/clean-skin-care-products , https://www.farmacybeauty.com/products.json?limit=30&page=3
**Yorum:** `Match all` (VE/VEYA) anahtarı ve `Anahtar::Değer` etiket yapısı bizim JSON şemasında `badges[]`/`tags[]` için iyi model. Filtre listesi bazı hâllerde uzun (ml/oz karışık) — Greenleaf'te yalnız **tek birim** (ml veya g) gösterilmeli.

## 6. Cilt testi / ürün eşleştirme akışı
- **Var:** Menüde "SKINCARE QUIZ" → `/pages/quiz-finder`; ana sayfada "FIND MY ROUTINE" bloğu: "Take our quick skincare quiz to discover the products that fit your skin goals, lifestyle, and routine."
- **Soru tipleri/sonuç sayfası: GÖRÜLEMEDİ** — `quiz-finder` sayfası HTML'de yalnızca breadcrumb ("Home › Quiz Finder") ve footer içeriyor; quiz JS widget. Web araması Farmacy'ye özgü soru listesi vermedi. Bloğun vaadi (hedef + yaşam tarzı + rutin) üç boyutu işaret ediyor — **Yorum**.
Kaynak: https://www.farmacybeauty.com/pages/quiz-finder , https://www.farmacybeauty.com/

## 7. Mikro etkileşimler & animasyonlar (→ hareket-tasarimcisi)
| Etkileşim | Tetikleyici | His/süre | Amaç |
|---|---|---|---|
| Kart görseli geçişi, `lazy_active` sınıfı **250 ms** gecikmeyle eklenir | görünür olunca | 250 ms + CSS geçişi | Görsel yükleme/fade-in |
| Ağırlıklı ease: `cubic-bezier(.4,0,.2,1)` (21×), `(.19,1,.22,1)` easeOutExpo (12×), `(0,0,.2,1)` (10×); süre sık `.15s` | hover/aç-kapa | 150 ms hızlı; slayt/slide-in uzun | "Yumuşak ama hızlı" his |
| Slideshow giriş animasyonu: yüklenirken `disable-animation-slideshow` sınıfı kaldırılır | sayfa yüklenince | — | İlk boyamada kırpışmayı önleme |
| Sepet çekmecesi: ilerleme çubuğu (`cart-progress-bar`), önerilen ürünler, **ücretsiz numune**, **hediye (GWP)** bölümleri | sepete ekleme | — | Sepet büyütme/teşvik |
| Alpine.js mobil nav (`xMobileNav.open()`), modal odak yönetimi | tıklama | — | Erişilebilir çekmece |
→ hareket-tasarimcisi: **kart görsel fade-in + hover ikinci görsel**, **sepet ilerleme çubuğu (ücretsiz kargo eşiği)**, **easeOutExpo ile çekmece girişi**.

## 8. Mobil davranış (Gözlem)
- Ayrı **mobil gezinme bölümü** (`sections--mobile-navigation`), hamburger `rounded-full` yuvarlak buton arka planıyla (`mobile-navigation-modern-icon-bg`); arama ve sepet simgeleri ayrı tıklama alanları.
- Breakpoint'ler: `min-width:768px` (65 kural), `1024px` (77), `1280px` (16), `max-width:767px` (7) → **mobile-first** (çoğu kural min-width).
- Çerez bannerı alt sabit ("Decline / Got it!"); yüzen widget CSS'i (`custom-floating-widgets.css`).
- Sticky ATC: PDP'de varyant listesi altında ikinci Add to Bag bloğu var (yapışkan olduğu **doğrulanamadı**).

## 9. Tipografi / renk karakteri (Gözlem)
- Başlık: **Feature Display Web** (Light + Light Italic, serif; Typekit `bme2jea`); gövde/buton/menü: **proxima-nova**
- Pill butonlar: `border-radius:9999px` (14 kez) + kare (11).
- **Renkler:** `#231f20` (siyah metin) · `#ffffff` · `#52583d` (zeytin, vurgu) · `#858f4d` / `#6b762d` (zeytin yeşilleri) · `#c8b89f` (kum/bej) · `#43802D` (`--color-green`, canlı koyu yeşil) · `#ed8d46` (turuncu) · `#a90000` (kırmızı) · gri skalası `#767474`, `#867f7f`, `#c9c9c9`, `#f7f7f7`.
**Yorum:** Palet **zeytin/kum** ağırlıklı = "muted botanical"a yakın; ancak `#43802D` yeşili ve pill butonlar daha **canlı/sıcak**. Bölüm başlıklarındaki ince serif (Light) premium his veriyor. **Tamamı alınırsa muted yöne kayar** — yalnız tipografi ritmi/pill butonlar alınmalı.

## 10. Greenleaf için çıkarım
| Etiket | Madde | Neden |
|---|---|---|
| **ALIN** | Kartta **"$X ($Y Value) · You Save Z% ($N)"** deseni | Liste + üye fiyatı + net tasarruf rakamı; MEMORY §7 hatasının çözümü |
| **ALIN** | PDP'de **"Earn N Reward Points — Join the Hive"** bloğu | PV/üyelik mesajı için CTA'yı bozmayan yer; "Partner ol" dönüşümü |
| **ALIN** | `Anahtar::Değer` etiket sözlüğü + "Match all" filtre anahtarı | `badges[]`/filtre için kontrollü sözlük |
| **ALIN** | Sepet çekmecesinde ilerleme çubuğu / hediye / numune katmanları | Üye/seviye teşvikleri; backend sonrası etkinleşir |
| **UYARLA** | "FIND MY ROUTINE" quiz bloğu **ürünlerden sonra** ("bulamadıysan…") | Doğru konum; Greenleaf'te kısa 3-4 soruluk test; üstte ürün gelsin |
| **UYARLA** | Pill buton (9999px) + ince serif başlık ikilisi | Pinwheel yuvarlak diline uyar; serif için marka onayı gerek (Poppins zorunlu) |
| **UYARLA** | Concern kutucukları (görselli) | Ana kategori şeridine ek; görsel üretim maliyeti |
| **UYARLA** | "Recycle / Empties" bloğu fikri | Sürdürülebilirlik vaadi Greenleaf'te yoksa konmaz; sadece gerçek varsa |
| **ALMA** | Zeytin `#52583d` + kum `#c8b89f` paleti | Muted botanical yönü |
| **ALMA** | P&G dili / uzun yasal bülten metni | Greenleaf'e uymaz |
| **ALMA** | ml/oz karışık uzun boyut filtresi | Tek birim kullanılmalı |
