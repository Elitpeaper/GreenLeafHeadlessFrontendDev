# Biossance (biossance.com) — Sade/bilimsel yön ilham analizi

> Hazırlayan: A4-ilham-bilimsel-egitici · Tarih: 15 Kasım 2026 · Faz 0, kod yok.
> **Gözlem** = HTML/CSS'ten doğrudan; **Yorum** = bizim değerlendirmemiz.
> Önbellek: `.cache/arastirma/biossance/` (home.html, list.html, pdp.html, guide.html, cert.html, tenant.css).

---

## 1. Kaynaklar

| URL | Durum | Not |
|---|---|---|
| https://biossance.com/ (→ www.biossance.com) | 200 | Ana sayfa (THG Ingenuity tabanlı SSR; görseller static.thcdn.com) |
| https://www.biossance.com/c/shop-by-skin-concern/skincare-for-dry-skin/ | 200 | Listeleme ("Squalane for Dry Skin", 16 ürün) |
| https://www.biossance.com/p/squalane-plus-vitamin-c-rose-oil/12766621/ | 200 | Ürün detay |
| https://www.biossance.com/c/product-guide/ | 200 | "Product Guide" — editoryal ürün seçici (test yerine) |
| https://www.biossance.com/blog/certifications-and-awards/ | 200 | Sertifika/test standartları sayfası |
| https://www.biossance.com/ssr-assets/biossance/tenant-v137.css | 200 | Marka CSS'i (10 KB) |
| /collections/serums, /pages/skin-quiz | 404 | Shopify varsayımı yanlış; platform Shopify değil |

**Sınırlamalar:** Filtre paneli "More Filters +" arkasında, facet adları statik HTML'de çıkmadı; yorumlar widget ile yükleniyor (JSON-LD'de puan 4.72 var). Hiçbir görsel indirilmedi.

---

## 2. Ana sayfa bölüm akışı (Gözlem)

1. Duyuru çubuğu (rotasyon): "FREE US SHIPPING ON $50+ · PAY LATER WITH AFTERPAY · FREE SHIPPING IN APP · SIGN UP FOR $20 OFF · FREE COSMETIC BAG WITH BUNDLE".
2. Header + mega menü: Shop Skincare (Shop by Category · **Shop by Concern: Anti-Aging, Brightening, Dry, Oily, Sensitive, "Eczema Approved", "Pregnancy Safe"** · Featured: New, Gift Guide, Core Routines, Award Winners, Jumbo/Travel Sizes) · Bestsellers (5 ürün adı doğrudan menüde) · Offers · Earn Rewards · About Us (Our Story, **What is Squalane?**, The Skinspo Blog, Our Partnership, **Product Guide**).
3. Hero kampanya bandı: "HOLIDAY BONUS: FREE COSMETIC BAG with any bundle or set".
4. **"The season's brightest picks"**: 3 büyük karo (Bestselling Brilliance / Limited-edition sets / Gift guide).
5. **"Our Community's Faves"** — 6 slaytlık ürün/set kaydırıcı (Showing slide 1…; "SHOP NOW").
6. **"Find your moisture match"** — nemlendirici seçici bandı ("biotech moisturizers…" → SHOP MOISTURIZERS).
7. Uygulama indirme bandı ("FREE SHIPPING IN APP").
8. **$20 off** — e-posta ve **SMS** olarak iki ayrı kayıt bandı.
9. SEO metin bloğu: "Biossance Award Winning Clean Skincare…" (marka hikâyesi + anahtar kelime).
10. Footer: yeni kayıt, Help, Shop, About (**Certifications & Awards**, Skinspo Blog), yasal bağlantılar.

**Yorum:** Ana sayfa **promosyon/indirim ağırlıklı** (US pazarı). Eğitici içerik (What is Squalane, Product Guide, Blog) ana sayfa gövdesinde değil menüde. Greenleaf'te bu oran tersine çevrilmeli: alışveriş + güven önde.

---

## 3. Ürün kartı anatomisi (Gözlem: list.html)

- **Ürün adı** ("Squalane + Vitamin C Rose Oil" — *Squalane + [aktif]* adlandırma kalıbı) → **fiyat**.
- **Boy seçici** doğrudan kartta: "Full Size 50ml / Jumbo 100ml" çipleri.
- **Add to Bag** her kartta.
- Setlerde: "**Recommended Retail Price: $177.00 → Current price: $119.00 · 33% Off**" + "FREE COSMETIC BAG WITH PURCHASE" hediye etiketi + set adı (ör. "Peptide Power Routine", "Core Routine").
- Etiketler: "Award Winners", "New", % indirim.

**Yorum:** "Recommended Retail Price / Current price" kalıbı Greenleaf'in **Liste fiyatı / Üye fiyatı** ayrımına yakın; ama biz "indirim" değil "üye fiyatı" diyeceğiz (aşağıda).

---

## 4. Ürün detay sayfası yapısı (Gözlem: squalane-plus-vitamin-c-rose-oil)

1. Galeri + **video (transkript açılır: "Open Transcript")**.
2. Başlık → **ödül satırları** (3 ödül: "2024 The Bump Beauty Awards – Best pregnancy-safe face oil", Glamour, Allure).
3. **"Get 74 points with this purchase — Join Loyalty program"** (puan göstergesi).
4. Fiyat $74.00 + "Or 4 interest free payments of $18.50 with Afterpay" → Adet → **ADD TO BAG** / "Notify Me When Available".
5. **Description:** 1 paragraf + **3 madde fayda** ("Increases skin radiance by improving tone and texture…"), boyut "30mL/1oz".
6. **Clinical Results**: "97% agree skin firmness and suppleness is improved*", "91%…", "Improves radiance by 32% in 4 weeks*" + dipnot "*21-day consumer study of 32 women, ages 18-68" (**örneklem ve süre açık yazılı**).
7. **Ingredients:** "LEADING INGREDIENTS" (4 aktif; her birinin adı + 1 cümle: Vitamin C, Damascus Rose Extract, Chios Crystal Oil, Squalane) → ardından **tam INCI listesi** + "ambalajdaki listeye bakın" uyarısı.
8. **FAQ (akordeon, 4 soru):** "What does vitamin C do for your skin?", "Is it steam distilled or solvent extracted?", "Is it different from L-ascorbic acid?", "Isn't vitamin C light sensitive?" — **içerik sorularını PDP'de yanıtlıyor.**
9. **How To Use:** How / When / **Layering Tip** üç satır.
10. Stok durumu: "In stock | Usually dispatched within 24 hours".
11. **"Other Customers Bought"** (6 kart, slider).
12. **Sticky Add to Bag** (`sticky-atb`, `dock-shadow` sınıfı) — kaydırınca alt çubukta.

**Yorum:** Bu PDP şablonu Greenleaf için çok iyi bir iskelet: **Fayda (3 madde) → Kanıt (çalışma, dipnotlu) → Lider içerikler → Tam INCI → SSS → Kullanım**. Greenleaf'te klinik sonuç **elimizde yoksa bölümü boş bırakmak** (uydurma yok).

**TİTCK uyarıları (Gözlem → risk):** "Clinical Results: 91% agree skin appears younger", "pregnancy-safe", "Eczema Approved" etiketleri Türkiye'de **kanıtlanmış klinik çalışma belgesi** ve ürün bazında izin gerektirir; "Eczema/Pregnancy" kozmetikte tıbbi çağrışımdır → **ALMA** (bu etiketler). "Brightening / firming" dilini "görünümünü" ekiyle yumuşat ("daha aydınlık görünüm").

---

## 5. Listeleme / filtre UX (Gözlem)

- Başlık "Squalane for Dry Skin" + **16 Items** sayacı.
- Üst bar: **More Filters +** (genişleyen panel; "Less Filters −") · **Clear All** · **Sort**: Popularity / Price: Low to High / Price: High to Low / Newest Arrivals.
- Sıralama kontrolü iki kez (masaüstü + mobil) render ediliyor.
- Grid: set/bundle kartları **önce**, sonra tek ürünler (öne çıkarma = set).
- Concern koleksiyonları ("Dry Skin / Oily / Sensitive / Anti-Aging / Brightening") menüden doğrudan.

**Yorum:** ~37 ürünlük Greenleaf kataloğu için: **kategori + ihtiyaç** koleksiyonları, sıralama (Popüler/Fiyat/Yeni), filtre gizli ("Filtrele" butonu) — Biossance düzeni uygun.

---

## 6. Cilt testi / ürün eşleştirme akışı

**Durum: YOK (kanıtlı).** `quiz` kelimesi ana sayfa, PDP, listeleme, Product Guide ve Certifications sayfalarının hiçbirinde geçmiyor (grep ile doğrulandı). `/pages/skin-quiz` 404.

**Yerine kullanılan mekanizmalar (Gözlem):**
- **"Find your moisture match"** (ana sayfa bandı) → `/c/product-guide/` sayfası: 6 ürün, her biri 1–2 cümle + "LEARN MORE" (Probiotic Gel Moisturizer, Omega Repair Cream, Growth Factor Firming Moisturizer, 5% Niacinamide Eye Serum, Daily Mineral Sunscreen SPF 50, Vitamin C Rose Oil). Yani **elle yazılmış "hangisi sana göre" rehberi**.
- Menüde **"Shop by Concern"** (tek tıkla ihtiyaç koleksiyonu).
- **"Core Routines"** setleri (Moisturizing Core Routine, Protective Daytime Core Routine, Peptide Power Routine) — rutin hazır paket olarak satılıyor.

**Yorum:** Test yerine "editoryal seçici + hazır rutin seti" 37 ürünlük katalog için **test fikrinin hafif/ucuz alternatifi** ve test sonucunun da çıktısı olabilir (sonuç = hazır rutin seti).

---

## 7. İçerik sözlüğü / eğitici içerik

- **"What is Squalane?"** (marka içi eğitim sayfası) — Biossance'ın tek "hero içerik" için ayrı sayfası olması dikkat çekici (aktif maddeyi markalaştırmak).
- **Skinspo Blog**: kategoriler Latest / Routines / New Products / **Education** / Sustainability / Gift Guides / Trends.
- **Certifications & Awards** (blog altında sayfa): "Biotechnology: the foundation", "Skin-Safe, Science-Backed Skincare", **dermatolog testli / pediatrist testli / klinik ve tüketici testi / non-komedojenik testi** — her biri 1–2 cümle ile açıklanıyor ("Depending on the formula, products may feature: …"). Doğrudan **rozet listesi mantığı**.
- PDP'de aktif madde açıklamaları sayfa içinde (kısa), ayrı sözlük sayfasına link doğrulanmadı. Tam bir **A–Z sözlük yok**.

**Yorum:** Greenleaf'te tek sertifika sayfası + PDP'de rozet satırı ("Sertifikalar" bölümü) MEMORY §7'de istenen "tıklanabilir belge"yi karşılar: Biossance sayfası bunun metin kalıbı.

---

## 8. Mikro etkileşimler & animasyonlar (Gözlem — sınırlı)

| Etkileşim | Tetikleyici | His/süre | Amaç | Etiket |
|---|---|---|---|---|
| Duyuru çubuğu rotasyonu | otomatik | (süre ölçülmedi) | 5 mesaj döner | → hareket-tasarimcisi |
| "Our Community's Faves" slider | ok/kaydırma | slayt geçişi | Ürün keşfi | → hareket-tasarimcisi |
| Sticky Add to Bag | PDP'de kaydırma | alt çubuk "dock" gölgeli | Satın alma yolu hep görünür | → hareket-tasarimcisi |
| Akordeon SSS / Open Transcript | tıklama | aç-kapa | İçerik yoğunluğunu gizle | → hareket-tasarimcisi |
| Boy çipi seçimi kartta | tıklama | fiyat/ID güncellenir | Hızlı varyant | → hareket-tasarimcisi |

Tenant CSS'inde `@keyframes` bulunmadı (sade); hareket çoğunlukla slider/akordeon kütüphanesinden.

---

## 9. Mobil davranış (Gözlem)

- Breakpoint'ler: **640 / 768 / 1024 px** (tenant.css `@media`: min 640, max 768, min 1024).
- Menü: mobilde "Enter submenu / Close / Back" öğeli **alt menülü çekmece** (HTML'de `(Shop Skincare) Enter submenu` etiketleri).
- PDP'de **sticky Add to Bag** (alt çubuk).
- Sort kontrolü mobil için ayrı render.
- Footer'da kayıt formu ve uygulama indirme bandı.

---

## 10. Tipografi / renk karakteri (Gözlem: tenant-v137.css)

- Font: **Barlow Semi Condensed** 400/500/700 (Google Fonts; `font-family: 'Barlow Semi Condensed', 'arial-fallback', sans-serif`). Dar, teknik, büyük harf başlık.
- Renkler: `#fff6f2` (şeftali/krem zemin — en sık), `#936f43` ve `#7a5c39` (altın-kahve vurgu), `#4f4f4f`, `#333333`, `#ffffff`, `#e5e7eb`.
- Karakter: **sıcak krem + kahve/altın**, büyük harf dar başlıklar; "biotech" tonu duyuru metnindedir, renkte değil.

**Yorum:** Poppins'in geometrik yuvarlak yapısı Barlow Semi Condensed'den farklı; biz yalnızca **büyük harf kısa başlık (KAMPANYA / SHOP NOW) kalıbını** benzetebiliriz.

---

## 11. Greenleaf için çıkarım

| Etiket | Madde | Gerekçe |
|---|---|---|
| **ALIN** | PDP sırası: **Fayda 3 madde → Kanıt (dipnotlu) → Lider içerikler → Tam INCI → SSS → Kullanım** | Bilgi hiyerarşisi net; her aşamada kaynak/uyarı |
| **ALIN** | **Sticky Add to Bag** (mobil PDP) | Dönüşüm; Greenleaf'te "Sepete ekle" + üye fiyatı |
| **ALIN** | Kartta **boy çipi + sepete ekle** (hızlı ekle) | Küçük katalogda tıklamayı azaltır (dikkat: "tek net CTA" kuralı, ikinci buton yok) |
| **UYARLA** | "Recommended Retail Price / Current price" kalıbı | Greenleaf: kartta **Liste fiyatı (üstü çizili değil, siyah) + Üye fiyatı yeşil rozet**; "indirim %" yerine "Üye fiyatı" |
| **UYARLA** | "Find your moisture match" **editoryal seçici sayfası** (6 ürün + 1–2 cümle) | Test kurulana kadar ya da testin çıktısı olarak "Sana uygun hazır rutin" |
| **UYARLA** | **Certifications & Awards** sayfası + PDP'de rozet satırı | "ISO/GMP/Helal" kanıtsız iddialarını belgeli ve tıklanabilir yap (MEMORY §7) |
| **UYARLA** | Klinik sonuç bloğu (yüzde + **örneklem/süre dipnotu**) | Yalnızca elimizde gerçek çalışma varsa; yoksa blok gizlenir |
| **UYARLA** | PDP içi **SSS akordeonu** (içerik kaynaklı sorular) | Rusça içerikten çevrilecek SSS; sağlık iddiasız |
| **ALMA** | "Eczema Approved", "Pregnancy Safe" etiketleri | Tıbbi çağrışım; TİTCK |
| **ALMA** | Puan/sadakat + Afterpay + SMS $20 indirim yığılması | Greenleaf'in üyelik modeli (MLM) ayrı; karışık promosyon yoğunluğu "premium UI" hedefine ters |
| **ALMA** | Barlow Semi Condensed + krem/kahve palet | Marka tipografisi Poppins, renk #4EAE36/#86B726/#30A8D7 |
