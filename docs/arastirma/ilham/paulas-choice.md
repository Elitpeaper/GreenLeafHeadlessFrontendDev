# Paula's Choice (paulaschoice.com) — Eğitici yön ilham analizi (içerik sözlüğü referansı)

> Hazırlayan: A4-ilham-bilimsel-egitici · Tarih: 15 Kasım 2026 · Faz 0, kod yok.
> **Gözlem** = sayfanın kendi gömülü JSON/CSS'inden; **Yorum** = bizim görüşümüz; **İkincil** = üçüncü taraf kaynak, doğrulanmadı.
> Önbellek: `.cache/arastirma/paulas-choice/` (home/dict/dict-entry/pdp/shop-ingredient/advice .html + çözülmüş `.json`, typekit.css).

---

## 1. Kaynaklar

| URL | Durum | Not |
|---|---|---|
| https://www.paulaschoice.com/ | 200 | Ana sayfa (Salesforce Commerce Cloud + React; **gövde istemcide render ediliyor**, statik HTML boş kabuk) |
| https://www.paulaschoice.com/ingredient-dictionary | 200 | Sözlük listesi — `<script id="appData-json">` içinde **base64 JSON** (çözüldü) |
| https://www.paulaschoice.com/ingredient-dictionary/ingredient-vitamin-b3.html | 200 | Sözlük girdi sayfası (JSON çözüldü) |
| https://www.paulaschoice.com/shop-ingredient/niacinamide | 200 | "Bu içerikli ürünler" listesi (ürün kartları istemcide) |
| https://www.paulaschoice.com/10pct-niacinamide-booster/798.html | 200 | Ürün detay (JSON çözüldü) |
| https://www.paulaschoice.com/expert-advice/skincare-advice/ingredient-spotlight/how-niacinamide-helps-skin.html | 200 | Uzman makalesi |
| /skin-care-products/serums-and-boosters, /skin-care-quiz | 404 | Tahmin edilen URL'ler yok |

**Sınırlamalar:** (1) Ana sayfa bölüm akışı ve listeleme kartları/filtre panelinin kendisi JS ile geldiği için **gözlenemedi**; ana menü (mega menü) de API'den geliyor. (2) Cilt testi statik olarak bulunamadı; yalnızca "My Routine" → `app:revieve` bağlantısı ve konfigürasyonu görüldü. Ortaklık kimlik değerleri (partner ID, API anahtarları) kayda alınmadı.

---

## 2. Ana sayfa bölüm akışı

**Doğrudan gözlenemedi** (React kabuğu; `page` verisi yalnızca başlık/açıklama). Yalnızca global yapı (Gözlem, `common`):
- Header: arama (masaüstü/mobil ayrı placeholder: "Search for skin care, articles & advice"; açılan panelde **TOP SEARCHES · BEST MATCHES · PRODUCT MATCHES · BEAUTYPEDIA (uzman makaleleri)**), hesap menüsü (Account Overview, Orders Status, Perks, Auto Replenishment, **My Routine**), sepet.
- Footer: **OUR COLLECTIONS** (Boosters, C+, Calm, Clear, Clinical, Defense, Exfoliant, Omega+ Complex, Pro-Collagen Peptide, Resist, Skin Balancing, Skin Perfecting, Skin Recovery, View All) · **WHO WE ARE** (About Us, Authorized Retailers, Careers, **Editorial Guidelines**, **Research & Education Team**) · CLIENT SERVICES (Private Consultation…) · PARTNERS.
- Global `ourPromise` bloğu (3 madde): **NON-IRRITATING** (parfümsüz, boyasız), **NO ANIMAL TESTING (Leaping Bunny)**, **100% money-back guarantee** — sitenin her yerinde yeniden kullanılıyor.

**Yorum:** Bölüm sırası bilinmiyor; ama **koleksiyonların ürün hatları** (Boosters, Clinical…) ve "Research & Education Team" bağlantısı sitenin kimliğini gösteriyor: *ürün satmadan önce bilgi/güven*.

---

## 3. Ürün kartı anatomisi

**Doğrudan gözlenemedi** (kartlar JS ile; `usePortraitImagesInProductTiles`, `useNewProductBadges` bayrakları var → dikey görsel + yeni rozet). Stil bayrağı dışında kanıt yok. Arama panelinde "PRODUCT MATCHES" mini kartları vardır (içerik doğrulanmadı).

---

## 4. Ürün detay sayfası yapısı (Gözlem: 10% Niacinamide Booster JSON + JSON-LD)

Veri alanlarından sayfa bölümleri:
1. Galeri (`productImages`, video, image viewer) + **breadcrumb**.
2. Başlık, **variants** (boy), puan (`rating`, `ratingCount`), `awards` (ör. 2018 Teen Vogue Acne Award bağlantılı).
3. **Skin Concerns / Skin Types çipleri** (`goodForSkinConcerns` 17 değer; `goodForSkinTypes`: Normal/Dry/Combination/Oily/All) — kart üstünde "bu ürün kime".
4. `whatIsIt` + `whenToApply` + `howToApply` (bölüm başlıkları: Benefits · When To Apply · How To Apply).
5. **Ingredient Spotlight** (`keyIngredientsData`, ~12 içerik): her biri **görsel (718×346) + ad + fonksiyon kategorisi etiketleri (Humectant, Antioxidant…) + 1–2 cümle açıklama + 3 madde keyPoints + sözlük puanı (Best/Good…)**.
6. **See All Ingredients** (`ingredientsData`): **tüm INCI listesindeki her içerik** için kategori + 1 cümle açıklama + puan; "See Fewer Ingredients".
7. `ourPromise` (cruelty-free, memnuniyet garantisi) + `brandPillars` ikonları.
8. `faq` (ör. "Should I use the 10% Niacinamide Booster, the CLINICAL 20% or both?"), **`research` (dergi atıfları: Journal of Cosmetic Dermatology, Jan 2021…)**.
9. **Yorumlar** (PowerReviews): puan dağılımı, "Show only X star reviews", sıralama, **filtreler: Pros / Cons / Best Uses / Describe Yourself / Skin Type / Age**, "Bottom Line", "Was this review helpful?", "Merchant Response".
10. `similarProductIds` (benzer ürün), `kitBanner`, "Buy Now Pay Later" placement, "Notify me" / "Auto Delivery" modal metinleri.

**Yorum:** PDP'nin farkı, **içeriklerin sözlük puanıyla sayfada görünmesi** ve atıf listesi; "bilimsel güven" = şeffaf içerik + kaynak.

**TİTCK uyarıları (Gözlem → risk):** İç anahtarlar (`rosacea`, `keratosisPilaris`, `acne`) ve koleksiyon adları (**Calm — Redness Relief, Clear for Acne, Skin Recovery, "Reactive"**), "Anti-Acne" fayda etiketi, "Bad" / "Worst" gibi karşılaştırmalı içerik puanları Türkiye'de kozmetik için tedavi/rakip karşılaştırma riski taşır → **ALMA** (aşağıda).

---

## 5. Listeleme / filtre UX

**Ürün listeleme: gözlenemedi** (JS). **Sözlük listeleme tam gözlendi** (bölüm 7). Ürün tarafında yalnızca şunlar kesin (Gözlem): `defaultToGridView` bayrağı, `compareUrl` (karşılaştırma özelliği), `showSkinTypeDescription` (liste başında cilt tipi açıklama metni), `frequentQuestions` (kategori sayfasında SSS), "shop-ingredient" sayfalarıyla **içerik → ürün** geçişi (`/shop-ingredient/niacinamide`).

---

## 6. Cilt testi / ürün eşleştirme akışı

**Durum: Statik "quiz" sayfası yok; "My Routine" üçüncü taraf uygulama ile var.**
- Gözlem: hesap menüsünde **"My Routine" → `app:revieve`**; konfigürasyonda `revieveConfig` (Revieve eklentisi, `revieve-plugin-loader.js`); header ikon setinde `skinTypeQuiz` SVG anahtarı var. `/skin-care-quiz` 404.
- **İkincil** (arama sonuçları, doğrulanmadı): Revieve platformu **selfie + kısa anket** ile cilt analizi/rutin önerisi yapar; Paula's Choice **Tayvan** sürümü için bir "Skin Analyzer" duyurulmuş (egzfoliasyon ürünlerine odaklı, puan tabanlı). ABD sitesindeki "My Routine"in soruları, adım sayısı, e-posta kapısı ve sonuç sayfası **görülmedi**.
- **Ek eşleştirme aracı (Gözlem):** Sözlük girdi sayfasında **Ingredient Analyzer**: kullanıcı kendi ürününün içerik listesini yapıştırır veya **fotoğraf yükler** ("Use Photo"), "Tip: Ingredients are usually listed in order of ingredient concentration", "My product comes in a jar" onay kutusu, **Analyze / Reanalyze**, sonuçlar **Best→Worst / Worst→Best** sıralanabilir, "Edit Your Ingredient" modalı (yanlış okunan içeriği düzelt). Bu bir "test" değil, **içerik listesi çözümleyici**.

**Yorum:** Paula's, "kişiselleştirme"yi sorulu test yerine **içerik şeffaflığı aracı** ile çözüyor. Greenleaf için bu iki farklı fikir: (a) soru testi (Typology/Glow Recipe kalıbı), (b) PDP'de içerik açıklaması (burada).

---

## 7. İçerik sözlüğü / eğitici içerik — Paula's Choice **Ingredient Dictionary** (bu sitenin asıl değeri)

**Kaynaklar:** `/ingredient-dictionary` (liste), `/ingredient-dictionary/ingredient-vitamin-b3.html` (girdi). Tümü Gözlem (çözülmüş `appData`).

### 7.1 Liste sayfası
- Başlık "Skin Care Ingredient Dictionary"; meta: "benefits and safety of **thousands** of ingredients in the world's most well-researched database". **Toplam girdi: 26.029** (`paging.total`), sayfa başı **10**.
- **Arama:** "Search Ingredients", öneri listesi ("Suggested Ingredients"), "Based on your search", sonuç sayısı, "No results for…" + ipuçları ("Double-check spelling").
- **A–Z şeridi:** `1…9, A…Z` (36 öğe) ile ilk harfe göre süzme.
- **Filtreler (3 grup):** *Rating* (Best, Good, Average, Bad, Worst) · *Benefit* (**10**: Anti-Acne, Anti-Aging, Blackhead Reducing, Dark Spot Fading, Evens Skin Tone, Hydration, Oil Control, Pore Minimizer, Smooths Bumpy Skin, Soothing) · *Category* (**26**: Absorbent, Antibacterial, Antioxidant, Chelating Agent, Cleansing Agent, Coloring Agent, Emollient, Emulsifier, Exfoliant, Film-Forming Agent, Fragrance, Humectant, Irritant, Occlusive, Peptides, pH Adjuster, Plant Extracts, Polymer, Prebiotic/Probiotic, Preservative, Retinoids, Silicone, Solvent, Suspending Agent, Texture Enhancer, UV Filters).
- **Sıralama:** Best / Worst / Name (A–Z) / Name (Z–A).
- **Liste satırı:** ad + **1–2 cümle özet** + **puan rozeti** (Best/Good…); satır → girdi sayfası (`?fdid=ingredients` izleme).
- Üstte banner (masaüstü/mobil ayrı görsel) + **"How we rate ingredients"** bağlantısı → modal: *Ingredient Ratings* (**7 durum**: Best, Good, Average, Bad, Worst, Unknown, Not Rated) + **"About the Experts"** ("Our team of experts has analyzed ingredient research for decades…" → **Meet the Experts** sayfası).

### 7.2 Girdi sayfası (Vitamin B3)
Sıra: **Ad + puan (Best)** → "Vitamin B3 Description" (5 paragraf) → **"[Ad] at a Glance" / key points** (5 madde: "Famous for visibly reducing enlarged pores…", "Boosts skin's barrier strength…", "Stable in the presence of light") → **Benefits** çipleri (Anti-Aging/Longevity… her biri sözlükte süzülmüş listeye gider) → **Functions/Categories** (Antioxidant…) → **See Also / Related** (ör. Niacinamide, nicotinamide) → "**Deep Dive**" uzun metin → **Products with [name]** (`/shop-ingredient`) → **Related Articles** (uzman makaleleri, ör. "5 Super Anti-Aging Antioxidants Your Skin Needs") → **[Ad] References** (**15 dergi atfı**, "International Journal of Dermatology, Feb 2021, pp. 166-173…") → yazar(lar) + `dateModified` (güncelleme tarihi) → "Back to Ingredient Dictionary".

### 7.3 Ürüne bağlama (Gözlem)
- PDP → **Ingredient Spotlight** (3–12 lider içerik) + **tüm içerik listesi** (her içeriğe puan/açıklama) → içerik adı sözlük girdisine bağlanır (`?fdid=ingredients`).
- Sözlük girdisi → **Products with [name]** (`/shop-ingredient/<ad>`) → içerikli ürünlerin listesi. **Çift yönlü köprü: ürün ↔ içerik.**
- Üst menü arama kutusu sözlükte de arar (`searchIngredients: /ingredient-dictionary?q={0}`).

### 7.4 Greenleaf için sözlük tasarım çıktısı (Yorum)
Greenleaf'in 37 ürünü için başlangıç **~25–40 içerik girdisi** yeterli (ürünlerin INCI'sinden en sık geçenler). Girdi şablonu önerisi: *Ad (TR + INCI) · Kozmetikte kullanım amacı (kategori çipi: nemlendirici, koruyucu, yumuşatıcı, parfüm…) · Kısa özet (1 cümle) · Ayrıntı (kısa, iddiasız) · Bu içeriği taşıyan ürünler (otomatik, veriden) · Kaynak/atıf (opsiyonel)*. **Puanlama (Best/Worst) kullanılmamalı.**

---

## 8. Mikro etkileşimler & animasyonlar

JS kabuğu nedeniyle CSS/animasyon **doğrudan ölçülemedi**; yalnızca davranış kanıtları:

| Etkileşim | Tetikleyici | His | Amaç | Etiket |
|---|---|---|---|---|
| Sözlük araması (öneri listesi) | yazarken | anlık açılır öneri (süre ölçülmedi) | Yazım hatasını tolere eden hızlı bulma | → hareket-tasarimcisi |
| Filtre/sıralama çipleri | tıklama | liste güncellenir | A–Z/puan/fayda süzme | → hareket-tasarimcisi |
| "How we rate ingredients" modal | link | modal aç-kapa | Metodoloji şeffaflığı | → hareket-tasarimcisi |
| PDP "See all ingredients / See fewer" | tıklama | liste genişler | Uzun listeyi gizle | → hareket-tasarimcisi |
| Ingredient Analyzer "Analyze" | buton | sonuç listesi + yeniden sıralama | Etkileşimli içerik çözümleme | → hareket-tasarimcisi |
| `toastTimeInSeconds`, `signUpModalDelayInSeconds` | zamanlayıcı | bildirim/kayıt modalı gecikmesi | Sepet/kayıt geri bildirimi | → hareket-tasarimcisi |

---

## 9. Mobil davranış

- **Gözlem:** Arama için ayrı **mobil placeholder** ("Search for skin care, articles & advice"); sözlük banner'ı için **ayrı mobil görsel**; `defaultToGridView`; service worker + offline sayfası (`enableServiceWorker`, `/offline`).
- Kırılma noktaları ve sticky sepet butonu: **doğrulanmadı** (CSS istemci paketinde).

---

## 10. Tipografi / renk karakteri (Gözlem: Typekit + veri)

- Fontlar (Adobe Typekit `wfi8npk`): **area-normal** (+ light), **area-extended** (+ light) — geniş, geometrik grotesk; **ivypresto-text** (serif, başlık vurgusu).
- Renkler (JSON içinde en sık): `#1c1c1b` / `#1c1c1c` (neredeyse siyah), `#333133`, `#172f55` (lacivert), `#2ea76d` (yeşil), `#bababa`, `#8b8b8b`.
- Karakter: **beyaz zemin + siyah tipografi + lacivert/yeşil küçük vurgu** — klinik/editoryal, düşük süslü. Güven = metin yoğunluğu.

**Yorum:** `#2ea76d` yeşili Greenleaf `#4EAE36`'dan daha serin; ama "siyah metin + beyaz zemin + tek vurgu rengi" disiplini Greenleaf'e uyar.

---

## 11. Greenleaf için çıkarım

| Etiket | Madde | Gerekçe |
|---|---|---|
| **ALIN** | **Çift yönlü köprü:** PDP içerik çipi → sözlük girdisi → "Bu içeriği taşıyan ürünler" | Rakiplerde olmayan fikir; SEO için uzun kuyruk ("niasinamid nedir") + sepet yolu |
| **ALIN** | Sözlük arama + A–Z şeridi + kategori çipi filtresi | 30–40 girdilik küçük sözlükte bile hızlı gezinme |
| **ALIN** | Girdi şablonu: *Özet cümle → "Bir bakışta" maddeleri → Detay → İlgili ürünler → Kaynak → Güncelleme tarihi* | Güven (tarih + kaynak); format hazır |
| **UYARLA** | **Fonksiyon kategorileri** (nemlendirici, koruyucu, yumuşatıcı, parfüm…) filtre olarak | "Fayda" filtreleri (Anti-Acne, Anti-Aging) **ALMA**; yerine kozmetik fonksiyon etiketleri (tedavi dili yok) |
| **UYARLA** | PDP'de **"Öne çıkan içerikler" (3–4) + "Tüm içerikler" katlanır liste** (her içerik için 1 cümle) | Peach & Lily kalıbıyla birleşir; Rusça içerikten çevrilen metinler tek tek TİTCK süzgecinden geçmeli |
| **UYARLA** | "Ingredient Analyzer" fikri → "**Ürün içeriğini oku**" (INCI satırı tıklanır, sözlüğe gider) | Tam çözümleyici yerine her INCI kelimesini sözlük bağlantısı yapmak (frontend'de ucuz) |
| **UYARLA** | `ourPromise` kutusu (3 satırlık sabit güven bloğu, her PDP'de) | Greenleaf'te yalnızca **belgelenebilir** maddeler (ör. test/sertifika); varsayım yok |
| **UYARLA** | "Research & Education Team / Editorial Guidelines" sayfası | Greenleaf'te "İçerik ilkelerimiz" kısa sayfası (kaynaklar, güncelleme, iddia politikası) |
| **ALMA** | İçerik **puanlama** (Best/Good/Average/Bad/Worst) ve "Irritant" gibi hükümler | Rakip/üretici içerik karşılaştırması ve olumsuz hüküm → hukuki ve markaya aykırı risk |
| **ALMA** | "Anti-Acne", "Rosacea/Reactive", "Skin Recovery", "Calm Redness" adları | TİTCK tıbbi iddia |
| **ALMA** | 26 bin girdilik kapsam | Hedef: ~30–40 gerçekten kullanılan içerik; kalite > hacim |
| **ALMA** | Revieve/selfie analizi | Yüz verisi KVKK; Faz 0 dışı |
