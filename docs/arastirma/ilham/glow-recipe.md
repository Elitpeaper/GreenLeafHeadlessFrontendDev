# Glow Recipe (glowrecipe.com) — Eğitici yön ilham analizi (ürün eşleştirme testi referansı)

> Hazırlayan: A4-ilham-bilimsel-egitici · Tarih: 15 Kasım 2026 · Faz 0, kod yok.
> **Gözlem** = HTML/CSS/gömülü kampanya JSON'undan doğrudan; **Yorum** = bizim görüşümüz; **Yeniden kurgu** = yapılandırmadan çıkarım (testi bizzat çalıştırmadık).
> Önbellek: `.cache/arastirma/glow-recipe/` (home.html, quiz.html, jebbit.html, jebbit.json, ingredients.html, concerns.html, routine101.html, *.css).

---

## 1. Kaynaklar

| URL | Durum | Not |
|---|---|---|
| https://www.glowrecipe.com/ | 200 | Ana sayfa (Shopify, `keen-slider`) |
| https://www.glowrecipe.com/pages/find-your-glow-recipe | 200 | Test sayfası — **Jebbit iframe** gömülü |
| https://glowrecipe.jebbit.com/npdwdsvs?L=Full+Page&deferred=true | 200 | Testin kendisi; sayfa içinde **tam kampanya yapılandırması** (`window.bootstrapModels`, ~400 KB JSON) → soru/dallanma/sonuç şablonları okundu |
| https://www.glowrecipe.com/pages/ingredients | 200 | İçerik sözlüğü ("Korean Skincare Ingredients") |
| https://www.glowrecipe.com/pages/skin-concerns | 200 | Cilt şikâyetleri rehberi |
| https://www.glowrecipe.com/pages/routine-101 | 200 | Rutin 101 |
| .../products/watermelon-glow-niacinamide-dew-drops, .../collections/serums, /bestsellers | **429** (Retry-After 60 sn) | Birkaç kez, aralıklı denendi (WebFetch dahil); **PDP ve listeleme sayfası alınamadı** |
| /pages/skin-quiz, /pages/find-your-routine | 404 | Doğru URL: `/pages/find-your-glow-recipe` |

**Sınırlamalar:** (1) **Ürün detay ve listeleme sayfaları doğrudan görülmedi** (hız sınırı); kart anatomisi ana sayfadaki ürün kartlarından, PDP/filtre bölümleri bu yüzden "doğrulanmadı". (2) Test **bizzat tıklanarak çalıştırılmadı**; akış kampanya JSON'undan yeniden kuruldu (soru metinleri, seçenekler, dallanma ve form alanları doğrudan okundu; görsel düzen ve animasyon yeniden kurgu). (3) Hiçbir görsel indirilmedi.

---

## 2. Ana sayfa bölüm akışı (Gözlem — Shopify `section` sırası)

1. **Duyuru çubuğu** (dönen): "Club Glow Members First Access · Cyber Week 25% off Sitewide · The Pink Roll Bag Is Back · Club Glow Rewards".
2. **Header**: GLOW 101 · CLUB GLOW REWARDS · arama (**Products | Articles** sekmeli) · mega menü: *Shop All / New / Best-Sellers* · **SHOP BY SKIN CONCERN** (Breakouts & Acne, Dark Spots, Dryness, Dullness, Fine Lines, Pores & Oil, Redness & Sensitivity) · **KOREAN SKINCARE ROUTINE** (adım adım: Cleanser, Toner & Mist, Toner Pads, Eye, Serum, Moisturizer, Sunscreen, Glow Hues, Lip, Body) · **KOREAN SKINCARE INGREDIENTS** (Acids, Ceramides, Hyaluronic Acid, Mucin, Niacinamide, Peptides, Retinol, Vitamin C) · **FRUIT** (Watermelon, Avocado, Banana, Blackberry, Cloudberry, Guava, Papaya, Plum, Prickly Pear, Strawberry) · Minis · Merch · Value Sets · **GUIDE ME**: *Skin Quiz, Glow 101, Korean Skincare Routine 101, Skin Concerns Guide, Serums Guide, Korean Skincare Ingredients*.
3. **Hero** (`new_hero`, kampanya).
4. **`custom_nav` — hızlı kısa yol şeridi:** *Best Sellers · New Arrivals · Korean Skincare Sets · Toner · Glow Hues · Serum · Skin Concerns · Routine 101* (içerik sayfaları ve koleksiyonlar tek şeritte).
5. **"Best Sellers + New Arrivals"** — keen-slider ürün şeridi ("Shop All Best Sellers").
6. Video bantlı bölüm **"Shop The Kit"** (2 video).
7. İkinci hero.
8. **"Korean Skincare Sets"** ürün şeridi ("Shop All Sets").
9. **"Glow Hues"** ürün şeridi (ton seçicili).
10. `hero_carousel` (kampanya karuseli).
11. **"Club Glow reward shop"** — puanla ürün alma karuseli (75/100/200/700 puan).
12. **Instagram akışı** (@GlowRecipe, "Follow Us").
13. **Sağdan "Today's Offers" paneli** (6 teklif; "Applied!" etiketleri, otomatik uygulanır).
14. Footer: ABOUT (Formulation Standards) · MY GLOW · **GLOW SERVICES → Skin Quiz, Glow 101** · SUPPORT · "Unlock Your Welcome Offer" (e-posta) · "Fruit-Forward. Clinically Effective. Glowing Skin." · Cruelty Free.

**Yorum:** Test bağlantısı **menüde "Guide me" altında ve footer'da**; ana sayfa gövdesinde ayrı bölüm yok → bizim fırsatımız: testi öne çıkarmak. "Guide me" grubu (Quiz + rehberler) **tek mantıklı eğitim menüsü** — Greenleaf için kalıp.

---

## 3. Ürün kartı anatomisi (Gözlem: ana sayfa `featured_products_alt` kartları)

Sıra: **görsel** (iki görsel: normal + `hover-img` — üzerine gelince ikinci görsel) → sağ üstte **rozet** ("Limited Edition", "Holiday", "New", "New Shades") → **ürün adı** → **"For: Dryness, Fine Lines and Wrinkles"** (ihtiyaç satırı, `benefits-line`) → **seçili seçenek metni** ("2-Piece Kit", "6-piece Kit", "Default Title") → **tam genişlikte "ADD TO BAG" butonu, fiyat butonun sağında içinde** ("$ 38"; setlerde "$ 202 → $ 110") → stok yoksa **"Notify me when available"**, tükendiyse "Sold out".
- Ton seçilen ürünlerde kartta **"Choose Shade:"** adlı renk çipleri (6 ton adı: "First move (nude pink)"…).
- **"One time purchase / Subscribe & save up to 15%"** seçeneği kartta.

**Yorum:** "**For: …**" satırı (ihtiyaç etiketi) ve fiyatın butonun içinde olması **tek net CTA** kuralıyla uyumlu (MEMORY §7: "Sepete ekle ve Talebe ekle yan yana" sorunu çözümü). Greenleaf'te: buton içinde **üye fiyatı**, kartta liste fiyatı ayrı satır.

---

## 4. Ürün detay sayfası yapısı

**Doğrulanmadı** (429). Doğrudan kanıt olarak yalnızca şunlar var (Gözlem): yorumlar **Okendo** widget'ıyla (`okendo-reviews.js` ana sayfada yüklü), favoriler **Swym**, sohbet **Kustomer**, abonelik ("Subscribe & Save 15%"). Kart verisinden: **"For: ..." ihtiyaç etiketleri**, ton/boy seçicileri, set içerikleri ("12-Piece Kit"). Diğer PDP bölümleri (galeri, içerik listesi, "How to use", benzer ürünler) için **veri yok**; yeniden denemek ayrı bir oturum gerektirir.

---

## 5. Listeleme / filtre UX

**Doğrulanmadı** (429). Menüden (Gözlem): ihtiyaç koleksiyonları (`/collections/breakouts-acne`, `/dryness`, `/dullness-uneven-tone`, `/fine-lines-wrinkles`, `/hyperpigmentation-dark-spots`…), **içerik koleksiyonları** (`/collections/acids`, `/ceramides`, `/hyaluronic-acid`, `/niacinamide`…), **meyve koleksiyonları** (`/watermelon`, `/guava`…), adım koleksiyonları (`/cleansers`, `/eye-care`), `/kits`. Yani **aynı ürün 4 farklı eksende bulunuyor** (ihtiyaç / içerik / meyve / rutin adımı). Filtre paneli bilinmiyor.

---

## 6. Cilt testi / ürün eşleştirme akışı — **"Skin Quiz" (Find your Glow Recipe)**

**Kaynak:** https://www.glowrecipe.com/pages/find-your-glow-recipe → iframe https://glowrecipe.jebbit.com/npdwdsvs. Kampanya: *"Skin Match quiz_SupportCopy"*, tür **product-finder** ("Moments V2"), yayın tarihi **12 Eylül 2024**. **Soru/seçenek/dallanma doğrudan okundu (Gözlem)**, ekran görünümü **yeniden kurgu**.

### Giriş noktaları (Gözlem)
Menü → Guide Me → **Skin Quiz**; footer → GLOW SERVICES → **Skin Quiz**. Ana sayfa gövdesinde yok. Sayfa: pembe zemin (`--bg-color: #fdedf7`), siyah başlık, iframe içinde test (min 600 px, 50 em yükseklik). Test **ayrı üçüncü taraf iframe**; sepete ekleme `postMessage` ile ana sayfanın `cart/add.js`'ine gönderiliyor (**test içinden doğrudan sepete ekleme**), yönlendirme (`redirect`) mesajı da var.

### Yapı (Gözlem)
- **7 soru ekranı + 1 e-posta kapısı + sonuç** (ekranlar "tam ekran" yerleşim, `layout: full-screen`). Soru adlarındaki numaralama (2, Age, 3, 5, 6, 7, 9, 10) bazı soruların kaldırıldığını gösteriyor (kampanya düzenlenmiş).
- **İlerleme çubuğu:** `style: continuous`, `label_type: numerical` (sürekli çubuk + sayısal etiket); geri butonu (`action: back`) var; her ekranda gizlenmiyor.
- İçerik sırası **rastgele** (`randomize_content: true` — cevap seçeneklerinin sırası karışabilir).

### Sorular ve tipler (Gözlem — kampanya JSON'u)
| # | Soru | Tip | Seçenekler |
|---|---|---|---|
| 1 | **How has your skin been feeling lately?** | tek seçim (düğme) | Balanced & Normal · Oilier Than Usual · Dry All Over · Oily in Some Places, Normal or Dry in Others |
| 2 | **What is your age?** | tek seçim | Under 24 · 24+ |
| 3 | **What is your primary skin concern?** | **görsel seçim kartı** (`image-button-text-below`, 8 adet) | Dullness · Dryness · Pores & Oil Control · Breakouts & Acne · Dark spots & Hyperpigmentation · Redness, Sensitivity & Irritation · Fine Lines & Wrinkles · No specific concerns! |
| 4 | **Tell us about where you live:** | tek seçim | City · Suburbs · Country (amacı belirtilmemiş; muhtemelen kirlilik) |
| 5 | **Let us know which of these best describes you:** (Pregnancy status) | tek seçim + bilgi bağlantısı | Pregnant · Nursing · Not Pregnant or Nursing · **"Click here to learn why we ask!"** → bilgi ekranı |
| 6 | **How extensive is your makeup routine?** | tek seçim | No makeup for me · Pretty minimal · Full face, always! |
| 7 | **How many steps do you want in your skincare routine?** | tek seçim | Short & simple · All the steps, please! (alternatif metin: "Keep it short & simple! I'm looking for only a few key products" / "I'm extra! Hook me up with an in-depth skin-care routine") |
| 8 | **E-posta kapısı** (Lead Capture) | form | bkz. altta |

**Soru tipleri özeti:** tek seçim düğmesi (6), **görsel seçim kartı (1)**, bilgi ekranı (1), form (1). **Çoklu seçim ve slider yok.**

### "Why we ask" bilgi ekranı (Gözlem)
Hamilelik sorusunda: "Just like how you avoid certain foods while pregnant or nursing, there are skincare ingredients that can wait, too. It's best to be extra cautious, so **consult your doctor** for advice on which ingredients will work for you! — Click the back button in the upper left to continue!" (Şeffaflık + hekime yönlendirme.)

### E-posta kapısı (Gözlem)
- Ekran başlığı: "**sign up for email & texts — 10% off your curated routine!**"
- Alanlar: **E-posta**, **Telefon numarası** (zorunlu işaretli), "**Subscribe me to Glow Recipe emails & sms**" (**önceden işaretli**), "terms & conditions"ı okudum (zorunlu), **Submit**.
- **"Just show me my results"** atla bağlantısı var → kapı **atlanabilir** (ama alan işaretleri "required" olduğundan atla linki açıkça ayrı).
- **Konum: sorulardan sonra, sonuçtan önce.**

### Sonuç mantığı (Gözlem — `data_branches`)
Cevaplar 3 eksende **bir sonuç şablonuna** dallanıyor:
1. Rutin uzunluğu: *Short & simple* → **4 adımlı rutin**; *All the steps* → **6 adımlı rutin**.
2. Makyaj: yoğun/orta makyaj → **"double cleanse"** (çift temizleme) ürünü eklenir.
3. Şikâyet: *Pores & Oil Control* → **"pores only"** varyantı.
→ Toplam **8 sonuç şablonu** (4/6 adım × normal/double-cleanse × pores-only kombinasyonları).

### Sonuç sayfası yapısı (Gözlem — şablon alanları; görsel düzen yeniden kurgu)
- Üstte: "**Check your email for 10% off your curated routine!**" + **sonuç başlığı** (`outcome heading`).
- **Ürün listesi (4–8 ürün):** her satırda **ürün görseli, başlığı, kısa açıklaması, fiyatı, "Shop Now"** (ürün sayfasına yönlendirir) ve ürün varyant açılır listeleri (`shopify-variant-dropdowns` — boy/ton seçimi sonuç içinde).
- **"See More Products"** → `/collections/all`.
- Ürün verisi Shopify'dan canlı bağlanır (`{ product title / price / description / link }` yer tutucuları).

### Karşılaştırmalı değerlendirme
| Ölçüt | Glow Recipe |
|---|---|
| Soru sayısı | **7** + e-posta (kısa, ~1 dk hissi) |
| Soru tipleri | tek seçim, görsel seçim kartı, bilgi ekranı |
| E-posta kapısı | var (sonuçtan önce) ama **atlanabilir** |
| Sonuç | rutin (4/6 adım) + ürün kartları + "Shop Now" + test içinden sepete ekleme |

**Yorum:** Pazardaki en **ucuz ve uygulanabilir model**: 7 soru → 8 sabit sonuç şablonu → ürünler **kural tabanlı** (puanlama yok, `weight 0`). **37 ürünlü Greenleaf** için tam uygun: ürünlere `routineStep` + `concerns[]` + `skinFeel[]` etiketi → kural motoru frontend'de çalışır (backend yokken JSON üstünde).

**TİTCK / KVKK işaretleri:**
- **Hamilelik/emzirme sorusu** (sağlık durumu → KVKK özel nitelikli veri) → Greenleaf'te **sorulmamalı**; yerine sonuç sayfasında "Hamilelik/emzirmede kullanmadan önce uzmanınıza danışın" notu.
- Şikâyet etiketleri: "**Breakouts & Acne**", "**Redness, Sensitivity & Irritation**" → Türkçede "akne/kızarıklık-tahriş" tıbbi çağrışım; **"Gözenek ve yağ dengesi", "Matlık/ton eşitsizliği görünümü", "Kuru his"** gibi **görünüm/his** dili kullanılmalı. "Fine lines & wrinkles → çizgi görünümü".
- E-posta + telefon + "emails & sms" **ön işaretli** onay: KVKK/ETK açısından **açık rıza ön işaretli olamaz** → Greenleaf'te boş onay kutusu (Yorum; hukuki tavsiye değildir).
- "10% off your curated routine" = indirim vaadi; Greenleaf'te üyelik modeliyle çakışır ("üye fiyatı").

---

## 7. İçerik sözlüğü / eğitici içerik

### 7.1 "Korean Skincare Ingredients" (`/pages/ingredients`) — sözlük (Gözlem)
- Başlık: "**INGREDIENTS — Clinically Effective. Fruit-Powered. Glowing Skin.** We create gentle, yet effective formulas using the highest quality ingredients."
- **Kart yapısı (her içerik):** **Ad** (+ açılımı: "AHA (Alpha-Hydroxy Acids)") → **What It Is** (ör. "Chemical Exfoliant", "Fats (or lipids) naturally found in skin cells") → **Benefits** (1–2 cümle) → **Best For** (cilt tipi/ihtiyaç: "All skin types", "Oily, combination and acne prone skin types", "Redness, Sensitivity & Dryness") → **Shop Now** (içerikli koleksiyona gider: `/collections/acids`, `/ceramides`…).
- Örnek içerikler: AHA, BHA, Ceramide-5, CoQ10… (menüde sekiz içerik koleksiyonu: Acids, Ceramides, Hyaluronic Acid, Mucin, Niacinamide, Peptides, Retinol, Vitamin C).
- PDP'den sözlüğe bağlantı: **doğrulanmadı** (PDP görülmedi); ama menü ve kartlar **içerik koleksiyonlarına** bağlı → içerik → ürün köprüsü var.

### 7.2 "Skin Concerns Guide" (`/pages/skin-concerns`) — şikâyet rehberi (Gözlem)
Her şikâyet için sabit 5 blok: **Why They Happen · Mythbusters (mit + "False!" + doğru) · How To Treat · Best Ingredients for … · Shop Now.** 7 şikâyet (Breakouts & Acne, Dryness, Fine Lines & Wrinkles, Pores & Oil Control, Dullness & Uneven Tone, Dark Spots, Redness & Sensitivity).

### 7.3 "Routine 101" (`/pages/routine-101`) (Gözlem)
Sıra-adım rehberi: Cleanser → Toner → Eye Cream → Serum → Moisturizer → AM SPF → PM Masks ("Just starting out? Start with cleanser, moisturizer & SPF!"); her adım: **#N: ad · Shop [adım] · açıklama · "Glow Tip" kutusu · Less/More açılır**.

**TİTCK uyarıları (Gözlem → risk):** Sözlük: "…relieving skin of discomfort and **preventing redness**", "BHA… **decongests clogged pores**"; Concerns Guide: "**How To Treat** — breakouts and acne are caused by clogged pores, bacteria…", "popping a pimple can spread bacteria" → tedavi/sebep-sonuç tıbbi dil → Greenleaf'te **ALMA**. Yerine: "Bakım önerisi", "Görünümü destekleyen içerikler".

**Yorum:** "**What It Is / Benefits / Best For / Shop Now**" kartı, sözlüğün **en kısa ve en uygulanabilir şablonu** — Paula's'ın 26 bin girdilik kalıbına göre Greenleaf'in başlangıcı için çok daha uygun. **"Mythbusters"** formatı eğitici ve paylaşılabilir; ama içerik tıbbi olmamalı (ör. "Yağlı ciltte nemlendirici atlanır mı?").

---

## 8. Mikro etkileşimler & animasyonlar (Gözlem: base.css, featured_products.css)

| Etkileşim | Tetikleyici | His/süre | Amaç | Etiket |
|---|---|---|---|---|
| Kart görseli **hover'da ikinci görsel** (`hover-img`) | fare üstüne gelme | yumuşak geçiş (`transition: all 0.3–0.5s ease-out`) | Ürünü başka açıdan göster | → hareket-tasarimcisi |
| Buton dolgu süpürmesi `buttonFromLeftToRight` | hover | **0.5 sn ease-in-out forwards** (soldan sağa) | CTA'ya canlılık | → hareket-tasarimcisi |
| Genel geçişler | hover/odak | `all 0.2s linear` ve `0.2s ease-out` (en yaygın, 30 kural) | Hızlı, hafif geri bildirim | → hareket-tasarimcisi |
| Test ilerleme çubuğu | her cevap | sürekli (continuous) çubuk + sayısal etiket | İlerleme | → hareket-tasarimcisi |
| Test içi "Add to cart" | buton | iframe → `postMessage` → sepet sayacı güncellenir | Test içinden sepete ekleme | → hareket-tasarimcisi |
| Keen-slider şeritleri | kaydırma/ok | yatay sürükle-bırak | Ürün keşfi | → hareket-tasarimcisi |
| Offers panel (sağdan) | tıklama | panel kayar, "Applied!" onay etiketi | Teklifleri sayfadan ayrı göster | → hareket-tasarimcisi |
| Header açılır menü | hover/tıklama | `openTransformTop`/`closeTransformTop` (`--animation-speed-fast`) | Mega menü | → hareket-tasarimcisi |
| `spin .7s linear infinite` | yükleme | 0.7 sn sonsuz | Yükleniyor göstergesi | → hareket-tasarimcisi |

---

## 9. Mobil davranış (Gözlem: CSS)

- Breakpoint'ler: **600 px** (en yoğun: 9+ kural) ve **900 px**; ek **901–1050 px** ara aralık.
- Kart görsel boyutu: `sizes="(max-width: 900px) 42vw, 280px"` → mobilde **2 sütun (görsel %42vw)**; buton metni `small--hide`: mobilde **"ADD TO BAG" yerine yalnızca "Add"** (kısaltma).
- Test iframe'i: başlık boyutu mobilde `1em` (masaüstü `2em`), padding 0; iframe `min-height: 600px`.
- Sticky header (`position: sticky; top:0; z-index:100`).
- Sağ "Today's Offers" paneli mobilde alttan/yandan çekmece.

---

## 10. Tipografi / renk karakteri (Gözlem)

- Fontlar: **Josefin Sans** (başlıklar + gövde ana; Google Fonts 400/700), **Playfair Display** (serif vurgu), **DM Sans** (yedek), özel **Alstoria** (logo/başlık).
- Renkler: `#272727` (metin, en sık) / `#000000`, `#ffffff`, **`#fdedf7` / `#fcf5fa`** (açık pembe zemin), **`#c22f57`** (ahududu pembesi vurgu), `#efa3a7`, `#ffcf2a` (yıldız sarısı), `#676986`/`#272d45` (gri-lacivert yan metin).
- Karakter: **pembe + siyah + beyaz, geometrik ince sans başlıklar**, meyve fotoğraflı; canlı ve genç — "bilimsel" değil "neşeli K-beauty".

**Yorum:** Pembe palet Greenleaf'in yeşil-mavi paletiyle uyuşmaz; **etkileşim kalıbı ve içerik şablonu alınır, görsel dil alınmaz**.

---

## 11. Greenleaf için çıkarım

| Etiket | Madde | Gerekçe |
|---|---|---|
| **ALIN** | **Kısa test (5–7 soru) + kural tabanlı sonuç şablonları** (rutin uzunluğu × ihtiyaç) | 37 ürün için uygulanabilir; backend gerekmez (JSON etiketleri) |
| **ALIN** | **Görsel seçim kartı** ile asıl soru ("Birincil ihtiyacın?") | Testin tek "görsel an"ı; Greenleaf ikon/fotoğraf kartı (pinwheel çiçek motifi ile) |
| **ALIN** | Sonuç sayfasından **doğrudan sepete ekleme** + "Tümünü gör" | Dönüşüm; Greenleaf'te sepet çekmecesi açılır |
| **ALIN** | Sözlük kartı: **Nedir / Faydası / Kimler için / Ürünlere git** | En kısa sözlük şablonu; içerik → ürün köprüsü |
| **UYARLA** | "**Guide me**" menü grubu (Test + Rehberler tek yerde) | Greenleaf menüsünde "Keşfet" / "Rehber" |
| **UYARLA** | **"Why we ask"** açıklaması (Typology'nin "Why this question?" ile birleşik) | Gizlilik/güven; hamilelik gibi hassas soru **kaldırıldığı** için gerek azalır ama yaş/ortam sorularında kalır |
| **UYARLA** | **E-posta kapısı**: Greenleaf'te **sonuçtan sonra**, "sonuçları e-postana gönder" olarak, boş onay kutusu | Önce değer göster (kapıdan önce sonuç); KVKK açık rıza |
| **UYARLA** | **Ürün kartında "For: …" ihtiyaç satırı** | Test sonucu ile kart etiketi aynı veriden; "Cilt ihtiyacı: Nem, Aydınlık görünüm" |
| **UYARLA** | **Çoklu eksenli koleksiyonlar** (ihtiyaç / içerik / alt marka / rutin adımı) | Veri etiketi bir kez; dört gezinme yolu |
| **UYARLA** | Mythbusters formatı (mit/doğru) | Tıbbi olmayan mitlerle ("pahalı = iyi mi?") eğitici paylaşım |
| **ALMA** | Hamilelik/emzirme sorusu | KVKK özel nitelikli veri; TİTCK |
| **ALMA** | "How To Treat", "preventing redness", "decongests clogged pores" kalıbı | Tedavi/etki iddiası |
| **ALMA** | Önceden işaretli e-posta+SMS onayı, e-posta + telefon zorunluluğu | KVKK/ETK |
| **ALMA** | Pembe palet, meyve temalı görsel dil, rewards/"Club Glow" puanı | Marka kimliği; MLM üyelik modeliyle çakışır |
| **ALMA** | Rastgele seçenek sırası (`randomize_content`) | Küçük soru setinde gereksiz; tutarlılık için sabit sıra |
