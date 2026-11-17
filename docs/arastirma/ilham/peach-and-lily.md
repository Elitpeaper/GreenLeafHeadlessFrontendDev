# Peach & Lily (peachandlily.com) — Eğitici yön ilham analizi

> Hazırlayan: A4-ilham-bilimsel-egitici · Tarih: 15 Kasım 2026 · Faz 0, kod yok.
> **Gözlem** = HTML/CSS/script'ten doğrudan; **Yorum** = bizim görüşümüz; **Yeniden kurgu** = kanıttan çıkarım.
> Önbellek: `.cache/arastirma/peach-and-lily/` (home.html, pdp.html, blog.html, quiz.html, quiz-section.txt, tangent.js).

---

## 1. Kaynaklar

| URL | Durum | Not |
|---|---|---|
| https://www.peachandlily.com/ | 200 | Ana sayfa (Shopify, Tailwind benzeri tema, web components) |
| https://www.peachandlily.com/products/l-glutathione-glow-on-brightening-toner | 200 | Ürün detay |
| https://www.peachandlily.com/pages/skincare-quiz | 200 | Test sayfası (**soru metinleri HTML'de yok** — üçüncü taraf Tangent uygulaması JS ile yüklüyor) |
| https://www.peachandlily.com/blogs/news | 200 | Blog/eğitici içerik |
| https://a.tangent.ai/quiz-inline/2.0.74/assets/index-v2.0.74.js | 200 | Test motorunun herkese açık JS paketi (yapı/özellik okundu) |
| /collections/serums, /collections/bestsellers, /collections/glass-skin-collection | **429** | Hız sınırı; tekrar denendi, listeleme sayfası **alınamadı** |
| /pages/skin-quiz, /blogs/ingredient-glossary | 404 | Doğru test URL'si `/pages/skincare-quiz` (menüden bulundu) |
| web.archive.org | WebFetch izin vermedi | Arşiv alternatifi kullanılamadı |

**Önemli sınırlamalar:**
1. **Test soru ve cevap metinleri doğrudan görülmedi.** Motor, soru yapılandırmasını `service.tangent.ai/shopify/get-config` ucundan sayfaya gömülü bir yetki anahtarıyla çekiyor. Bu anahtar bize verilmiş bir kimlik bilgisi olmadığından **kullanılmadı**; soru içeriği için çalışılmadı. Aşağıdaki test bölümü *sayfanın kendi HTML/CSS/script'inden* ve motor paketinden çıkarılanlarla sınırlı.
2. Listeleme sayfası 429 nedeniyle alınamadı.
3. "Ingredient glossary" (A–Z sözlük) bulunamadı — bkz. bölüm 7.

---

## 2. Ana sayfa bölüm akışı (Gözlem — Shopify `section` kimliklerinden sıralı)

1. Duyuru çubuğu: "Free Shipping on Orders $50+" + üstte **"Our Story · Ask an Esthetician · Refer A Friend · Peach Perks"** yardımcı bağlantıları + ülke/para birimi seçici (200+ ülke listesi).
2. Header (sticky, `sticky top-0 z-50`): Shop (Bestsellers, The Holiday Shop, New + 6 öne çıkan ürün adı; **Categories**: Cleansers, Toners, Essences, Serums, Sunscreens, Oils, Moisturizers, Eye Treatments, Spot Treatments, Exfoliators, Lip Care, Body Care, Masks, Makeup, Save with Kits, Subscribe & Save; **Concerns**: Acne, Aging, Blackheads, Dark Spots, Dehydration, Discoloration, Dryness, Dullness, Fine Lines, Firmness, Flakiness, Hyperpigmentation, Imbalance, Inflammation, Ingrown Hairs, Irritation, Oil Control…).
3. `hero_banner` (görsel ağırlıklı kampanya).
4. **`featured_collections_tabs`** — 4 sekme: *PEACH & LILY · PEACH SLICES · SKINCARE KITS · BEST OF KBEAUTY* (sekmeli ürün vitrini; yatay kaydırılabilir sekme çubuğu).
5. `categories_2up_3up` (2'li/3'lü kategori görselleri).
6. `hero_banner` (ikinci).
7. `blocks` — "**Glass Skin**" ve "**Anti-Aging**" kavram blokları + **"Shop by Concern"** çipleri (AGING · ACNE · DARK SPOTS · DRYNESS · BLACKHEADS · FIRMNESS · DULLNESS) + klinik çalışma dipnotu ("*Clinical study results of 3% ETERWELL YOUTH… Diagnoskin®").
8. `categories_2up_3up` (ikinci).
9. `featured_categories`.
10. `hero_banner` (üçüncü).
11. **`featured_blog_articles`** — Blog öne çıkanlar ("30 Days of Glass Skin: Real People, Real Results", "Korean skincare regimen by skin type", "Skin Barrier Deep Dive", "The Peach & Lily Standard: Clean for Skin and Earth").
12. `hero_banner` (dördüncü).
13. Footer: "**Get 15% off your first order**" e-posta + "**Join Peach Texts**" SMS; SHOP / HELP (My Account, **Skincare Quiz**, FAQs, Contact, Gift card balance) / ABOUT (About, Blog, Refer a Friend, **Peach Perks**, Affiliate).

**Yorum:** Hero bantları görsel ağırlıklı (metinler görselin içinde, HTML'de yok → erişilebilirlik riski). "Test" bağlantısı ana sayfa gövdesinde **yok**, yalnızca footer'da ve menü "Help"te — yani öne çıkarılmamış. Greenleaf'te testi **görünür** kılmak bizim farkımız olur.

---

## 3. Ürün kartı anatomisi (Gözlem: ana sayfa sekme vitrini)

Sıra: **[durum etiketi: "Selling Fast", "Back in Stock"]** → görsel → **marka çizgisi** ("Peach & Lily" / "Peach Slices" — alt marka!) → **ürün adı** → **tek satır kısaltılmış açıklama** ("Unwrap the gift of glowing Glass Skin this holi…") → **fiyat** ("Sale price $59 · Regular price $125") → **Add to bag**; çok varyantlıda **"Select Size"** (1 mask / 4 masks / 7 masks).

**Yorum:** "Marka çizgisi" satırı (alt marka) Greenleaf'in alt markaları (Carich, Easylove, iLife, Kardli, Nilrich, Sealuxe, Yibelle) için birebir uygulanabilir: kartta alt marka adı küçük yazı.

---

## 4. Ürün detay sayfası yapısı (Gözlem: L-Glutathione Glow On Brightening Toner)

1. Galeri: **7 görsellik** carousel + küçük resim şeridi ("Load image 1 in gallery view…"), **Zoom** ve tam ekran (`modal`).
2. Üstte alt marka ("Peach Slices") → başlık → **tagline** ("Flip the switch on dullness.") → fiyat $17.99.
3. Kısa açıklama (aktif oranı "5,000 ppm* L-glutathione…", dipnot "*ppm indicates parts per million") + **"Learn More / See Less"** katlama.
4. **Add to bag** (+ abonelik seçeneği: "10% Off Every Subscription Order").
5. **Rozet satırı (4 rozet):** *Clean · Cruelty-Free · Clinically Effective · Derm Approved*.
6. **Ingredients bölümü (`image-columns`):** önce özet cümle, sonra **numaralı (01, 02, 03) vurgulu içerikler**: ad + 1–2 cümle ("L-Glutathione — … visibly reduces the look of discoloration, dark spots…"; "Licorice Root Extract — helps calm sensitized, reddened skin…"). Tam liste **"all-ingredients" modalında** (HTML'de `all-ingredients-modal`, `accordion-content-ingredient`).
7. **Yorumlar** (Yotpo): "Overall rating 4.78/5 from 23 reviews", **"AI Generated Review Summary"** (konu etiketleri: feels, skin, looks, smells…), "Review highlights", tek tek yorum (başlık, metin, ad, puan).
8. Ürün önerileri (`product-recommendations`, JS ile yükleniyor; statik HTML'de boş).

**Yorum:** "Numaralı 3 lider içerik + modalda tam liste" kalıbı, ürün başına 3–4 içerik vurgusunu **sözlük sayfasına bağlamak için ideal kanca** (bkz. bölüm 7). "AI review summary" Greenleaf'te yorum yokken gereksiz; sonra düşünülebilir.

**TİTCK uyarıları:** "Derm Approved", "Clinically Effective", "visibly tackles discoloration", "Acne OTC" koleksiyonu (`/collections/acne-otc` = ilaç sınıfı), "Scar Remedy Silicone Gel", "zombie cell damage" → Türkiye'de ya belgeli olmalı ya kullanılmamalı. **ALMA:** OTC/tedavi/ilaç dili.

---

## 5. Listeleme / filtre UX

**Alınamadı** (429). Ana sayfa kartları ve menü yapısından yalnızca şu çıkarılabildi (Gözlem): ihtiyaç koleksiyonları (`/collections/acne`, `/dark-spots`, `/dullness`, `/fine-lines-wrinkles`, `/irritation`…), kategori koleksiyonları, kit koleksiyonları (`/kits-bundles`, `/holiday-kits`), `glass-skin-collection` (konsept koleksiyon). Filtre ve sıralama düzeni **doğrulanmadı**.

---

## 6. Cilt testi / ürün eşleştirme akışı — "Skincare Quiz"

**Kaynak:** https://www.peachandlily.com/pages/skincare-quiz — HTML/CSS ve motor paketi. **Soru/cevap metinleri doğrudan görülmedi.**

### Giriş noktaları (Gözlem)
- Header "Help" altında ve footer "HELP → Skincare Quiz" (iki yerde). Ana sayfa gövdesinde bölüm **yok**.
- Sayfa başlığı: "Personalized Skincare Quiz | Skincare Diagnostic Tool"; meta: "Take our quiz to get **expert-selected Korean products** tailored to your skin."

### Motor (Gözlem)
- **Tangent.ai** Shopify uygulaması (`tangent_skincare_quiz` bölümü; `a.tangent.ai/quiz-inline/2.0.74`). Cevaplar `service.tangent.ai/shopify/responses`'a gönderilir.
- Motor paketinde **MediaPipe yüz-işaret modeli ve `upload-selfie` ucu** var → platform **selfie ile cilt analizi** destekliyor. P&L'in bunu **açıp açmadığı doğrulanmadı** (tema CSS'inde selfie ile ilgili sınıf yok).

### Adım sayısı ve sıra (Gözlem — sayfanın kendi script yorumu)
> `// Screen order: welcome → questions 1–20 → email`
- **1 karşılama + 20 soru + 1 e-posta ekranı = 22 ekran.** Soru kâğıdı çok uzun (aşırı).
- **E-posta ekranı en sonda (sonuçtan hemen önce)** → e-posta kapısı **var**, konumu: son ekran. Atlanabilir olup olmadığı doğrulanmadı.
- Ekran sayısı `quiz_initialized` / `quiz_progress` olaylarından hesaplanıp ilerleme çubuğu **(mevcut+1)/toplam** yüzdesiyle dolduruluyor.

### Arayüz (Gözlem — sayfaya gömülü CSS)
- **Bölünmüş ekran:** masaüstünde sol **%40 görsel** (715 px yükseklik, `object-fit: cover`) + sağ **%60 içerik** (zemin `#f2f2f2`). **Her ekranda görsel değişiyor** (`Quiz_welcome.jpg`, `Quiz_Ques_1…20.jpg`, `Quiz_email.jpg`; hepsi önceden yükleniyor "src swaps are instant").
- **İlerleme çubuğu:** 5 px yüksek, yuvarlak kapsül, iz rengi `#f0e9e7`, dolgu **`#fd6562` (mercan)**, `width` geçişi **0.2 sn ease-in-out**; karşılama ekranında gizli, sorulara geçince görünür (`is-visible`).
- **Seçili cevap:** `1px solid rgb(253,101,98)` kenarlık + beyaz zemin.
- **"Pro tip" kutuları:** zemin `#F8AAA8`, başlık "Syncher L" serif 14 px kalın; metin "Untitled Sans" 12 px (soru arası mini eğitim ipuçları).
- **Geri butonu** (`.tangent_backbtn_custom`), birincil/ikincil buton `letter-spacing: 0.84px`; etiket fontu 10 px (küçük!).
- **Mobil (≤749 px):** görsel **altta** (`order:2`, en çok 280 px), içerik üstte (`order:1`); form boşlukları küçülüyor.
- Soru tipleri CSS sınıflarından: **onay kutusu (çoklu seçim)** (`checkbox_input_box`), seçenek kartları (`options_container`), yardım metni (`helpText`). Slider/seçici **görülmedi**.

### Sonuç sayfası
**Doğrulanmadı.** Motorun `product-recommendation.html` şablonu var; sonuçta ürün önerisi sunulduğu meta açıklamadan ("expert-selected Korean products") çıkarılıyor.

**Yorum:** Test **mağaza temasına tam yerleşik** (header sticky, sepet çekmecesi çalışıyor), ama **20 soru** terk riskini yükseltir. İlerleme çubuğu + görselin sürekli değişmesi + "Pro tip" fikirleri değerli; soru sayısı değil.

---

## 7. İçerik sözlüğü / eğitici içerik

- **A–Z içerik sözlüğü bulunamadı.** Brief'te belirtilen "ingredient glossary" doğrudan doğrulanamadı: `/blogs/ingredient-glossary` 404; ana sayfa ve blog HTML'inde `glossary` geçmiyor. (İkincil: bir arama sonucu özetinde ürün sayfalarının "AHAs için sözlüğe bakın" dediği belirtildi — **doğrulanmadı**, kanıt olarak kullanılmadı.)
- **Gerçekte var olan eğitici katmanlar (Gözlem):**
  - **PDP içerik vurguları** (numaralı 01/02/03 + modalda tam liste) — bölüm 4.
  - **Blog (`/blogs/news`)**: "What are zombie cells", "SPF vs PA: understanding Korean sunscreen ratings", "How to choose the right sunscreen for your skin type", "How to layer SPF into your morning routine", "What causes uneven skin texture", "Why your skin breaks out more in summer heat", "Skin barrier deep dive", "Korean skincare regimen recommendations by skin type" — **cilt tipine / konuya göre rehber makale** formatı.
  - **"Ask an Esthetician"** (üst çubukta; uzmana soru).
  - Ana sayfada "featured blog articles" bölümü.

**Yorum:** Eğitim burada **PDP + blog** ile; ayrı sözlük yok. Greenleaf'in sözlük fikri P&L'de de **rakipte olmayan** alan.

---

## 8. Mikro etkileşimler & animasyonlar

| Etkileşim | Tetikleyici | His/süre | Amaç | Etiket |
|---|---|---|---|---|
| Test ilerleme çubuğu | her cevap | genişlik **0.2 sn ease-in-out** | Anlık ilerleme geri bildirimi | → hareket-tasarimcisi |
| Test yan görseli değişimi | her ekran | **anında** (önceden yüklü; "src swaps are instant") | Her soruya görsel tazelik; yükleme beklemesi yok | → hareket-tasarimcisi |
| Sekmeli vitrin | sekme tıklaması | `aria-selected` renk değişimi (`hover:text-t-brand-primary`) | Koleksiyon geçişi | → hareket-tasarimcisi |
| Galeri swiper + zoom | kaydırma/tıklama | swiper geçişi, modal zoom | Ürün inceleme | → hareket-tasarimcisi |
| "Learn More / See Less" | tıklama | yükseklik katlama | Uzun açıklamayı gizle | → hareket-tasarimcisi |
| Seçili test cevabı vurgusu | seçim | kenarlık + zemin anında | Seçimi netleştir | → hareket-tasarimcisi |
| Sticky header | kaydırma | sabit | Menü ve sepet hep erişilebilir | → hareket-tasarimcisi |

Süreler yalnızca CSS'te açıkça görülenlerdir; diğerleri "his" olarak ölçülmedi.

---

## 9. Mobil davranış (Gözlem)

- Tema ve test için ortak kırılma: **`max-width: 749px`** (Shopify standardı).
- Test: görsel ve içerik **dikey yığılır**, görsel altta (≤280 px yüksek), içerik üstte; geri butonu `top:-2rem` yerine statik hizalama.
- Header `sticky top-0 z-50`; sepet **sağ çekmece** (`anchor='right'`); hızlı satın alma `quick-shop` modalı; ülke/para birimi seçici tam ekran modal.
- Sekme çubuğu yatay kaydırılır (`overflow-auto scrollbar-none`).
- Mobil sticky "Add to bag" **doğrulanmadı**.

---

## 10. Tipografi / renk karakteri (Gözlem)

- Fontlar: **Garnett** (başlık/ana), **Untitled Sans** (gövde/test etiketi), **Schnyder L** (serif, "pro tip" başlıkları/vurgular).
- Renkler: **`#ff5c9e`** (marka pembesi, 10 kullanım), `#fcfaf7` (krem), `#fafafa`, `#c6c3c4`, `#666666`; test: **`#fd6562`** (mercan), `#F8AAA8` (açık somon), `#f2f2f2`, `#f0e9e7`.
- Karakter: **şeftali-pembe/mercan + krem**, serif vurgu — samimi, K-beauty; "bilimsel/steril" değil.

**Yorum:** Pembe/şeftali palet Greenleaf'in yeşil-mavi paletiyle çakışır → renk alınmaz; **soru/ilerleme etkileşim kalıbı alınır, renk Greenleaf'e çevrilir**.

---

## 11. Greenleaf için çıkarım

| Etiket | Madde | Gerekçe |
|---|---|---|
| **ALIN** | **İlerleme çubuğu** (kapsül, ince, 0.2 sn dolma) + soru başına **yan görsel / önceden yüklü** | Beklemesiz, akıcı; Greenleaf'te yeşil→lime gradyan dolgu, belki 6 yapraklı fırıldak adım göstergesi (Yorum) → ui + hareket |
| **ALIN** | Test sayfası **mağaza temasında gömülü** (header/sepet çalışır), ayrı site değil | Sonuçtan doğrudan sepete geçiş; Greenleaf'te sepet çekmecesi var |
| **ALIN** | PDP'de **numaralı 3 lider içerik + "tüm içerikler" modalı** | Bölüm 7'deki sözlüğe kanca |
| **UYARLA** | Test uzunluğu: 20 soru **ALMA**, **5–7 soru** + e-posta ekranı **sonda ve atlanabilir** | 37 ürün; terk riski |
| **UYARLA** | **"Pro tip" ara kutuları** (soru arası mini ipucu) | Eğitici katman; Greenleaf'te sağlık iddiasız ("Cilt bakımı ipucu"); somon yerine lime tonu |
| **UYARLA** | Marka çizgisi satırı kartta (alt marka) | Greenleaf alt markaları: Carich, Easylove, iLife, Kardli, Nilrich, Sealuxe, Yibelle |
| **UYARLA** | Sekmeli vitrin (marka sekmeleri) | "Alt marka sekmeleri: Yibelle / Sealuxe / …" geniş katalog için |
| **UYARLA** | Blog'da **cilt tipine/ihtiyaca göre rehber** makaleleri + ana sayfada "featured blog" bölümü | MEMORY §7 "haber/içerik" bölümü |
| **UYARLA** | Header'da yardımcı çubuk ("Bir uzmana sor") | WhatsApp yok kuralı → form/e-posta tabanlı "Danışmana sor" ya da SSS |
| **ALMA** | Pembe/mercan renk, serif (Schnyder) | Marka kimliği |
| **ALMA** | "Derm Approved", "Clinically Effective", OTC/Scar Remedy dili | TİTCK; belgesiz iddia |
| **ALMA** | Hero bantlarının metninin görselin içine gömülmesi | Erişilebilirlik + SEO + dil değiştirme (TR) |
| **ALMA** | Selfie analiz (motorda var) | KVKK (biyometrik/yüz verisi) ve Faz 0 kapsamı dışı; ileride ayrı değerlendirilir |
