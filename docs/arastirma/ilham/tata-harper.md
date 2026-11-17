# Tata Harper (tataharperskincare.com) — İlham Analizi

> Yön: **Doğal / yeşil** (MEMORY §9). Hazırlayan: A3-ilham-dogal-premium, FAZ 0. Tarih: 15 Kasım 2026.
> Etiketler: **Gözlem** = doğrudan HTML/CSS/JSON'dan; **Yorum** = bizim görüşümüz (tasarım kararı değil, seçenek).
> Ham önbellek: `.cache/arastirma/tata/`

## 1. Kaynaklar
| URL | Ne için | Not |
|---|---|---|
| https://tataharperskincare.com/ | Ana sayfa HTML (15.11.2026) | 200 OK, Shopify |
| https://tataharperskincare.com/collections/all | Listeleme HTML | İlk denemede 429, ~10 dk sonra yavaş tekrar ile 200 |
| https://tataharperskincare.com/products/regenerating-cleanser (+ `.js`) | Ürün detay HTML + JSON | İlk denemede 429, sonra 200 |
| https://tataharperskincare.com/products.json?limit=3 / `?limit=30&page=2` | Ürün verisi (etiketler, varyantlar, compare_at fiyat) | 200 |
| https://tataharperskincare.com/pages/skin-analysis | AI Skin Analysis sayfası (HTML iskeleti) | 200; içerik JS ile (Revieve) yüklendiği için sorular görünmüyor |
| `.../cdn/shop/t/350/assets/theme.css`, `components.css` | Gerçek CSS değerleri | 200 |

**Kısıt:** Shopify, ardışık HTML isteklerine 429 (Retry-After 60) döndü; beklenip istekler 4-6 sn aralıkla yeniden yapıldı. JS ile çizilen bileşenlerin (AI analiz soruları, değerlendirme widget'ı iç yapısı, tarayıcıdaki gerçek animasyon hissi) çalışan hâli **görülmedi**; yalnızca HTML/CSS/JS kaynağından çıkarım yapıldı. Tarayıcı render'ı/ekran görüntüsü yok.

## 2. Ana sayfa bölüm akışı (Gözlem — `/` HTML sırası)
1. Duyuru çubuğu (iki mesaj: "NEW Holiday Sets…" + "Free Ground Shipping On All Domestic Orders $50+")
2. Header: mega menü — Shop (Kategori / Concern), Skincare Rituals (Morning/Evening/Discovery Kits), **AI-Skin Analysis ("Take the quiz")**, About Tata (Consultation, Visit a Spa), Rewards, Subscribe & Save, Ingredients Glossary; sağda "AI Skin Analysis", Log in, sepet sayacı
3. Hero (slideshow/video) — "Look 5 Years Younger by the Holidays": tek ürün (Crème Supreme) + klinik rakam + `SHOP NOW`; altında dipnot ("*Self-assessment from clinical, 33 women, after 8 weeks")
4. Kurucu alıntısı (rich text): "I couldn't find anything that was effective, made of high-quality ingredients… So I decided to create my own." — Tata
5. "Gifts Under $100" ürün sekmeleri (kit kartları: **Regular $84 → Sale $58** çizgili/etiketli)
6. "Best Sellers" ürün vitrini (kartlarda "Best Seller" rozeti + beden çipleri 125ML/315ML/30ML)
7. Holiday Favorites — kampanya bannerı ("Rituals of Comfort & Joy")
8. Limited-Edition Holiday Sets vitrini ("Limited Edition" rozeti)
9. "Find the Perfect Gift" bannerı
10. **"Start Your Green Beauty Journey"** — 4 kart: Loyalty Program (JOIN NOW) / Skin Analysis (START NOW) / Subscribe to Save (LEARN MORE) / Consultations (BOOK NOW)
11. Newsletter: "Stay in the glow. Enjoy 20% off when you sign up."
12. Footer (Experience / Tata Harper / Contact Us / Account; çerez + gizlilik)
Kaynak: https://tataharperskincare.com/

**Yorum:** Akış "tek güçlü hero → güven (kurucu) → ürün → üyelik/analiz/abonelik kartları" şeklinde. Üyelik/bonus anlatısı sayfanın **sonunda ve 4 eşit karta** bölünmüş: bizim "üyelik tek ve şık bölüm" hedefimize (MEMORY §7) uygun örnek.

## 3. Ürün kartı anatomisi (Gözlem)
- Sıra: görsel → **rozet** ("Best Seller" / "Limited Edition") → ürün adı (serif başlık) → alt başlık/işlev ("Daily Triple-Action Exfoliating Cleanser") → fiyat ("**$28+**" = en düşük varyant, "+" işareti) → beden çipleri (125ML · 315ML · 30ML) → "Add to Bag".
- Kit kartlarında: güncel fiyat + üstü çizili **regular price** (örn. $58 / $84). Varyantlı ürünlerde "from" benzeri `$28+` gösterimi.
- Aynı kart bileşeni mini-sepet "Recommended For You" ve arama çekmecesi ("Most searched products") içinde de tekrar kullanılıyor.
- Veri (products.json): kitlerde `compare_at_price` dolu (örn. 248 / 316), etiketler: `Discount_OK`, `Discount_Excluded`, `Discounted_Kit`, `Retail`.
Kaynak: https://tataharperskincare.com/ , https://tataharperskincare.com/products.json?limit=3
**Yorum:** `$28+` ve `Discount_Excluded` etiketi, **indirim dışı ürün** ayrımı bizim "üye fiyatı uygulanmayan ürün" durumunu veri düzeyinde modelleme fikri veriyor.

## 4. Ürün detay sayfası yapısı (Gözlem — /products/regenerating-cleanser)
1. Breadcrumb: Home › Natural Face Cleansers › ürün
2. **Galeri:** 12 medya, "Open media in gallery view" (tam ekran galeri)
3. Başlık + alt başlık; **"Select Size"** (Full 125ML / Spa 315ML / Travel 30ML) + "Size chart"
4. **Purchase options:** *One Time Purchase $88.00* vs *Subscribe to Save $74.80* (üstü çizili $88); avantaj metni: "15% off & free shipping with your first order / 20% off, free shipping & free gift with every recurring order"; "Deliver Every" 1–6 ay ("Most Popular" = 2 ay)
5. Tek CTA: **"Add to Bag - $88.00"** (butonda fiyat)
6. Sekmeler/akordeon: Description · **Best For** (All Skin Types / Lack of Radiance / Uneven Texture) · Product Details · "100% Natural Origin Formula Powered By" (içerik grupları: To Cleanse & Exfoliate / To Hydrate & Nourish / For Barrier Support / For Fresh Scent) · **Sertifikalar:** "COSMOS NATURAL certified by Ecocert Greenlife", "Certified Vegan by the American Vegetarian Association", "Certified Cruelty-Free by PETA" ("100% Natural Origin. 82% Organic.") · Full Ingredient List (açılır) · How to Use
7. **Clinical Results** — önce/sonra kaydırıcı (image comparison) + %96 / %90 büyük rakamlar + kapsamlı dipnot ("32 women…")
8. **Key Benefits** — numaralı (01/02/03) sekmeli görsel bölüm
9. **How to Use** — 3 adımlı (Step 1/2/3) görsel anlatım + "önce yağ temizleyici" çapraz satış cümlesi
10. **Compare Products** karşılaştırma tablosu (4 temizleyici; skin type / concern / "Use AM + PM"; her sütunda Add to Bag - fiyat)
11. Değerlendirmeler (Yotpo): genel puan 4.90/5, 3451 yorum; **AI Generated Review Summary**; Summary topics (yüzde dağılımı: Skin Feel 25%, Scent 25%…); Review highlights; bireysel yorumlar; Q&A
12. FAQ
Kaynak: https://tataharperskincare.com/products/regenerating-cleanser , https://tataharperskincare.com/products/regenerating-cleanser.js

**Yorum:** Bizim "ISO/GMP/Helal iddiaları kanıtsız → tıklanabilir sertifika rozeti" ihtiyacımız için en doğrudan model: sertifika adı + belgeleyen kurum **aynı satırda**. "Kapsamlı dipnotlu klinik rakam" kozmetik iddialarında TİTCK/tedavi edici iddia riski taşır (MEMORY §10) — biçimi alıp **iddia içeriğini** Greenleaf'in doğrulanmış verisine bağlamak gerekir.

## 5. Listeleme / filtre UX (Gözlem — /collections/all)
- Üstte "Filter: 70 products", **Sort by:** Featured · Most relevant · Best selling · A–Z · Z–A · Price low→high · Price high→low · Date old→new · Date new→old
- Facet'ler: **Category** (Accessories & Tools (6), Body (3), Cleansers (4), …, "+ Show more / – Show less"), **Age Group** (20s/30s/40s/50s+ ve sayaçlar), **Skin Type** (All Skin Types (38), Dryness (15), Lack of Radiance (14)…), "Clear all", "Apply"
- Her facet seçeneğinin yanında ürün sayısı.
- **Veri hijyeni sorunu (Gözlem):** Skin Type facet'inde "Sensitive / Sensitive Skin / Sensitive or sensitized skin / Sensitized Skin / Sensitive or Sensitized Skin Types" gibi aynı anlama gelen 5+ ayrı seçenek ve "Dry / Dry Skin / Dryness" tekrarı var; ayrıca bir facette hem cilt tipi hem endişe (Dullness, Puffiness) karışıyor.
- Koleksiyon içinde "collection-interruptor" (liste arasına giren banner) CSS'i var.
Kaynak: https://tataharperskincare.com/collections/all , `…/assets/theme.css` (`collection-interruptor.css` bağlantısı ana sayfa `<link>`'inde)
**Yorum:** Facet sayaçları + "Show more" iyi; ama etiket yönetimi **kontrolsüz** — bizim `lib/products.ts` şemasında filtre değerleri **sabit sözlükten (enum)** gelmeli.

## 6. Cilt testi / ürün eşleştirme akışı
- **Var:** "AI-Skin Analysis — Take the quiz" menüde ve header'da; sayfa `/pages/skin-analysis`. Ana sayfada ayrı kart: "Skin Analysis — START NOW". Ayrıca **"Schedule a Consultation"** (insanla görüşme; `products.json`'da `Express Consultation` $0 ürünü, etiket `consult-appointment`).
- **Sağlayıcı (Gözlem):** Sayfa kaynağında "Revieve" referansları (8 küçük + 15 büyük harf) — üçüncü parti AI analiz widget'ı.
- **Sorular/sonuç sayfası: GÖRÜLEMEDİ** — widget JS ile çiziliyor; HTML'de yok. Web aramasında Tata'ya özgü sayfa çıkmadı; genel olarak bu tür araçlar selfie + kısa quiz ile puan üretir (https://apps.shopify.com/tangent-1 gibi örnekler) — bu Tata için kanıt **değil**.
- Ritüel yönlendirmesi: menüde Morning / Evening / Discovery Kits / "Routines By Concern" koleksiyonları (`/collections/tatas-morning-routine` vb.).
Kaynak: https://tataharperskincare.com/ , https://tataharperskincare.com/pages/skin-analysis
**Yorum:** Selfie analizi KVKK (biyometrik/özel nitelikli veri riski) ve altyapı yükü getirir; Faz 1'de **sorulu test** yeterli, selfie ALMA.

## 7. Mikro etkileşimler & animasyonlar (→ hareket-tasarimcisi)
Gözlem kaynağı: `theme.css`, `components.css`, ana sayfa HTML (JS çalıştırılmadı, his tahmini Yorum'dur).
| Etkileşim | Tetikleyici | His/süre | Amaç |
|---|---|---|---|
| Genel bileşen geçişi `transition:.3s all` (buton, kart) | hover | 300 ms, tek ease | Basit, hızlı geri bildirim |
| Duyuru çubuğu ardışık mesajlar (28 `announcement` referansı) | zamanlayıcı | — | Tek satırda birden fazla fayda |
| AOS (animate-on-scroll) izleri (4) + Swiper (3) | scroll / sürükleme | — | Bölüm girişi, vitrin kaydırma |
| Klinik önce/sonra **image-comparison slider** (PDP) | sürükleme | anlık | Kanıtı etkileşimli yapma |
| Numaralı "Key Benefits" **sekmeli görsel** | tıklama | — | Uzun metni parçalama |
| Buton: 74 px yükseklik, kare köşe (`--btn-rounded:0`), büyük harf; hover'da zemin `#3fa533`'e döner | hover | ~300 ms | Cesur, "lüks-editoryal" CTA |
| Mini-sepet "free shipping" ilerleme/hedef (`cart-goal.css`) | sepete ekleme | — | Sepet büyütme |
→ hareket-tasarimcisi: **buton hover rengi geçişi + sepet-hedef çubuğu + before/after slider** (üçü de Greenleaf için uygulanabilir; AOS yerine Intersection Observer önerilir).

## 8. Mobil davranış (Gözlem — CSS @media)
- Breakpoint'ler: `max-width:767.98px` (en çok kural), `639.98px`, `min-width:768px`, `1024`, `1280`, `1536`.
- Mobil menü: header markup'ında ayrı mobil menü + ülke/para birimi listesi (≈200 ülke) aynı HTML'de.
- Mobilde ayrı başlık ölçeği: `--font-heading-mobile-scale: 0.74` (masaüstü başlığın ~%74'ü).
- Buton yüksekliği 74 px **masaüstü** değeri; mobil özelleştirme CSS'te ayrıca (görülmedi, kesin değil).
- Sticky ATC / yapışkan alt bar: ana sayfa HTML'inde `sticky-header` var; PDP'de sticky ATC **doğrulanamadı**.
Kaynak: `https://tataharperskincare.com/cdn/shop/t/350/assets/theme.css`

## 9. Tipografi / renk karakteri (Gözlem — CSS değişkenleri)
- **Gövde/başlık/buton:** `neue-haas-grotesk-display` (Adobe Fonts), gövde 400 / vurgu 500, `--font-body-scale:1.08`
- **Display başlık:** `ivyora-display` (serif; Typekit `use.typekit.net/pqm1sla.css`)
- Buton: uppercase, `--btn-height:74px`, `--btn-rounded:0px`
- **Renkler (ana sayfa CSS değişkenlerinden, sıklık sırasıyla):** `#ffffff` · `#0a2600` (çok koyu yeşil, metin) · `#033702` (koyu orman yeşili: buton zemini, rozet) · `#fffff7` (krem beyaz) · `#3fa533` / `#42b029` (parlak yeşil: hover, "hot" rozeti, sepet balonu) · `#7adb64` (açık yeşil, buton ::before) · `#2e7320` (orta yeşil, kenar) · `#dcff13` (neon lime: "sale" rozeti) · `#e17855` (somon vurgu) · `#336a6e` ("new" rozeti, petrol mavisi) · `#c1d8c2`, `#90d183`, `#e8f4ec` (açık yeşil yüzeyler)
**Yorum:** Bu, listelenen 6 site içinde **Greenleaf paletine en yakın** olanı: `#42b029` ≈ `#4EAE36`; `#dcff13`/`#7adb64` ≈ lime `#86B726` ailesi; petrol `#336a6e` mavi eksenini (`#30A8D7`) çağrıştırıyor. **Cesur doygun yeşil + serif display** kombinasyonu "muted botanical" değil — kullanıcının reddettiği çizgiden **uzak**. Koyu orman yeşili `#033702` marka değil; kullanılacaksa UYARLA.

## 10. Greenleaf için çıkarım
| Etiket | Madde | Neden |
|---|---|---|
| **ALIN** | Doygun parlak yeşil + çok koyu yeşil metin + açık yeşil yüzey paleti yaklaşımı | Marka yeşili ile uyumlu, "muted" değil; kanıt: §9 |
| **ALIN** | PDP'de **sertifika adı + belgeleyen kurum** satırı ("COSMOS NATURAL certified by Ecocert…") | "Kanıtsız ISO/GMP" sorununun çözümü (MEMORY §7) |
| **ALIN** | Satın alma seçenekleri bloğu: tek seferlik vs abone fiyatı **yan yana**, fayda cümleleri altında | Liste/üye fiyatı çifti için doğrudan şablon |
| **ALIN** | Butonda fiyat ("Sepete ekle – ₺X") | Tek net CTA ilkesi |
| **UYARLA** | Üyelik/analiz/abonelik/danışmanlık 4'lü kart şeridi | Üyelik tek şık bölüm; kart sayısı 2-3'e indirilebilir; Greenleaf'te "Partner ol" ayrı vurgu |
| **UYARLA** | Karşılaştırma tablosu (4 ürün, cilt tipi/fayda/kullanım) | Geniş katalogda "hangisi bana?" için; yalnız kozmetik kategoride |
| **UYARLA** | `$28+` "başlayan fiyat" gösterimi | Varyantlı ürünlerde; ₺ ve üye fiyatı ile birlikte düşünülmeli |
| **UYARLA** | Klinik rakam + dipnot bölümü | Biçim alınabilir; içerik yalnız Greenleaf'in belgeli verisinden (TİTCK) |
| **UYARLA** | Serif display başlık (ivyora) | Poppins zorunlu; premium his için tek vurgu başlıkta serif kullanımı opsiyonel — **marka kararı gerektirir** |
| **ALMA** | Selfie/AI cilt analizi (Revieve) | KVKK/biyometrik risk, bağımlılık, Faz 1 kapsamı dışı |
| **ALMA** | 74 px kare köşe, büyük harf devasa buton | Greenleaf'in yuvarlak/pinwheel dili ile çelişir |
| **ALMA** | Facet etiket kirliliği (aynı anlama gelen 5 seçenek) | Veri sözlüğü sabit olmalı |
| **ALMA** | Ülke/para listesinin ana HTML'e gömülmesi | Gereksiz ağırlık (HTML ≈1,2 MB) |
