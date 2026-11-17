# ILIA Beauty (iliabeauty.com) — İlham Analizi

> Yön: **Premium / editoryal** (MEMORY §9: "ürün sayfasında sertifika rozetleri"). Hazırlayan: A3-ilham-dogal-premium, FAZ 0. Tarih: 15 Kasım 2026.
> **Gözlem** = HTML/CSS/JSON'dan; **Yorum** = görüşümüz. Ham önbellek: `.cache/arastirma/ilia/`
> Not: ILIA ağırlıklı **makyaj** (ten rengi/ton eşleştirme) markası; cilt bakımı alt kategori. Bu yüzden testi "ton bulucu"; Greenleaf'e aktarım **ilkesel** olmalı.

## 1. Kaynaklar
| URL | Ne için | Not |
|---|---|---|
| https://iliabeauty.com/ | Ana sayfa HTML | 200, Shopify (Tailwind `tw-` + Alpine.js + Swiper) |
| https://iliabeauty.com/collections/complexion | Listeleme HTML | 200 (`/collections/all-skincare` ve `/collections/all` ilk denemede 404/429) |
| https://iliabeauty.com/products/super-serum-skin-tint-spf-40-tinted-moisturizer | Ürün detay HTML (2,4 MB) | 200 (ilk denemede 429, sonra yavaş tekrar) |
| https://iliabeauty.com/pages/find-my-shade | Ton bulucu sayfası | 200 ama quiz Octane AI widget'ı, soruları JS'te |
| https://iliabeauty.com/products.json?limit=3 / `page=2` | Ürün verisi/etiketler | 200 |
| `https://iliabeauty.com/cdn/shop/t/535/assets/app.css` | CSS (300 KB) | 200 |
| Web arama: Barrel "ILIA shade finder quiz" (https://www.barrelny.com/dtc-patterns-articles/find-your-perfect-shade-with-ilia-beautys-shade-finder-quiz), ILIA destek sayfası (https://support.iliabeauty.com/en-US/articles/find-my-shade-406079) | Quiz akışı (ikincil) | Sadece arama özeti okundu; sayfaların kendisi çekilmedi |

**Kısıt:** Quiz soruları ve sonuç sayfası canlı görülemedi (üçüncü taraf JS). Quiz ile ilgili ayrıntı "Gözlem (HTML iskeleti)" ve "ikincil kaynak" olarak ayrıldı. 429 sınırı için yavaş tekrar yapıldı.

## 2. Ana sayfa bölüm akışı (Gözlem — bölüm ID sırası)
1. **Mesaj bandı:** "FREE MINI EYE STYLUS W/ $75+ AND MORE" (tıklayınca **promosyon çekmecesi**: "4 Exclusive Offers" — her biri başlık + alt cümle)
2. Header: Makeup/Complexion/Eye/Lip + Cheek/Skincare/Gifts + Sets/Tools — **mega menü her kategori için "Favorites" (ürün adları, NEW! etiketli) + "Collections" listesi**; **Find My Shade**, Rewards; sağda ülke/para (USD, EUR… ), Sign In
3. **hero_campaign:** "NEW LIMITED EDITION SETS — Holidays In Bloom — Seasonal edits of makeup—wrapped in custom artwork inspired by our California roots. SHOP THE COLLECTION"
4. **tabbed_product_grid — "Curated Favorites":** sekmeler Gift Sets · Bestsellers · New Arrivals · Complexion · Eye · Lip + Cheek · Skincare · Tools · Shop All; kartlarda "Select Shade" / "Add to Bag"
5. **category_slider — "Clean Makeup + Skincare Essentials":** Bestsellers / Complexion / Lip + Cheek / Skincare / Eye / Sets (görsel kaydırıcı)
6. **custom_liquid — "In Safe Hands":** "Every ILIA formula is safe for sensitive skin, lips, or eyes." + **3 kart**: Become a VIP ("Enjoy redeemable points, early access, personalized recs") · **Find My Shade** ("Take a short quiz to discover your perfect formulas + shades") · Keep 'Em Coming (abonelik %10 + ücretsiz kargo)
7. **cornerstone:** "Makeup That Makes Your Skin Better™" — "We believe clean beauty is thoughtful beauty…" + Learn More
8. **feature_driver** (ürün/özellik anlatısı)
9. **commitments — "We've planted over 1 million trees so far":** Growth Mindset (%1 ağaçlandırma) · No Time to Waste (PACT ambalaj) · **Don't Be Cruel (Leaping Bunny sertifikalı)**
10. **review_slider:** gerçek alıntı + ilgili ürün linki ("My skin looks + feels the healthiest it has ever been." → Shop Skin Tint)
11. **press_slider** (basın)
12. Bülten ("15% off your first order") + footer
Kaynak: https://iliabeauty.com/
**Yorum:** Ana sayfa **12 bölümlük, çok sıkı sıralı**; her bölüm ayrı "bileşen" (hero, tabbed grid, slider…) — **component library** düşünen bizim ekip için temiz örnek. Üyelik (VIP) + Quiz + Abonelik **üç eşit kartta** tek bir "In Safe Hands" bölümünde: MEMORY §7'deki "üyelik tek ve şık bölümde" hedefine çok yakın.

## 3. Ürün kartı anatomisi (Gözlem)
- Görsel (hover'da ikinci görsel) → rozet **"NEW"** → ürün adı → **tek satır işlev** ("Makeup + skincare + mineral SPF.") → **Shade/varyant göstergesi** ("Shade: Dominica ST14" + 30 ton listesi, her biri "ad + ton derinliği + alt ton") → **"Select Shade"** (çok varyantta) veya **"Add to Bag"** → fiyat (`$48`).
- Setlerde: "Customize" butonu (set içinde ton seçimi) + fiyat (`$68`).
- Veri: `compare_at_price` kitlerde (örn. 25/36); etiketler `best-sellers`, `new`, `holiday-bundle`, `promo-ineligible` (**kampanya dışı** işareti), `final sale`, `LoopRtns_bundles`.
Kaynak: https://iliabeauty.com/collections/complexion , https://iliabeauty.com/products.json?limit=3
**Yorum:** Kartta varyant ("ton") seçimi **kartın içinde** başlıyor; Greenleaf'te karşılığı hacim/renk (kozmetik için) olur; temel ders: "varyant çok ise kart 'Add' yerine 'Select …' diyor" (yanlış sepete ekleme önlenir).

## 4. Ürün detay sayfası yapısı (Gözlem — Super Serum Skin Tint SPF 40)
1. **Yapışkan alt-menü (`product_sticky_subnav`) + alt satın alma çubuğu (`product-buy-bar`)** — sayfa bölümlerine anchor
2. Başlık · **`$48 USD`** · **4.5 ★ — 16,159 Reviews** (Okendo) · "Pinch to zoom" galeri (8-13 görsel)
3. **Shade seçici:** seçili ton ("Skye ST.5 — Extra light with Neutral Undertones") + **filtre sekmeleri All / Light / Medium / Deep**; 30 ton ("Rendezvous ST1 — Extra Light with Cool Undertones"…); **"Match my current shade"** + **"ILIA Shade Guide — Compare shades across products"**; ayrıca "Not sure? **Send a selfie** for a personalized recommendation"
4. **Size** ("1 fl oz / 30 ml")
5. **Satın alma seçenekleri:** One-time **$48.00** vs **Subscribe and Save $43.20** ("Save 10% + Free Shipping", "Ships every: 3 months (most common)" — **çekmece** ile 1-5 ay)
6. **"Bundle + Save"** (tamamlayıcı set: "Select shades - $145.35") ; **"Add to Bag"**
7. Abonelik açıklaması: Exclusive Savings (-%10 "forever") · Free Shipping · Never Run Out; **ILIA VIP Rewards:** "Earn Points with every order + 500 points for every third order" ; "Earn [N] points with this purchase. **Join ILIA VIP** / Sign In"
8. Güven satırı: "Free shipping on orders over $50+" · "Free + easy returns"
9. **Rozet/iddia satırı:** *safe for sensitive skin · dermatologist-tested · vegan + cruelty-free*; **"100% of those with sensitive skin said it doesn't make skin react**"** (klinik, dipnotlu) ; "Every bottle supports reforestation… 1% for the Planet"
10. Sekmeler: Description · **Ingredients** (Active: Zinc Oxide 12.0%; "formulated without Gluten") · **Awards** (yıl + ödül + yayın listesi: Parade, Oprah Daily, InStyle, Glamour…)
11. Ek bölümler (bölüm ID'leri): `callout_banner`, `media_banner_split_2025` ×5 (görsel+metin bantları), **`dynamic_shade_match_table`** (diğer ürünlerle ton eşleştirme), **`product_routine`**, `hero_campaign`, `tipbox`, `accordion_group`, `content_disclosure` (daha fazla göster)
Kaynak: https://iliabeauty.com/products/super-serum-skin-tint-spf-40-tinted-moisturizer
**Yorum:** MEMORY §9'daki "ILIA — ürün sayfasında sertifika rozetleri" notu doğrulandı: rozet satırı küçük, **üç kısa ifade** + altında **gerçek yüzde** (kimin, ne dediği). Sertifika logosu çok yok; asıl **Leaping Bunny** ana sayfada "commitments" bölümünde. Greenleaf'te rozet **tıklanabilir belge** olmalı (ILIA'da tıklama davranışı görülmedi).

## 5. Listeleme / filtre UX (Gözlem — /collections/complexion)
- Üst: breadcrumb "Home › Complexion", başlık + slogan ("Makeup that makes your skin better"), kart ızgarası; **sol/üst filtre alanları HTML'de bulunamadı** (`filter.p/v` parametresi yok) → bu koleksiyonda **klasik facet filtre görünmedi** (Yorum: ya JS ile ekleniyor ya da kategori dar olduğu için yok).
- Kartlar bölümler hâlinde: önce yeni/öne çıkan ürün ("Super Serum Skin Tint SPF 40") + hemen sonra "The Skin Tint + Blur Complexion Duo" set kartı; **karışık ürün/set sırası**.
- Menü zaten **alt koleksiyon bağlantılarıyla** filtreleme görevi görüyor (Foundation / Concealer / Bronzer + Highlighter / Powder / All Complexion).
Kaynak: https://iliabeauty.com/collections/complexion
**Yorum:** Filtre yerine **iyi kurgulanmış kategori ağacı + mega menü** işini görüyor — Greenleaf (geniş katalog) için ILIA modeli **yetmez**; Tatcha/Farmacy/Tata gibi etiket-eksenli filtre gerekir.

## 6. Cilt testi / ürün eşleştirme akışı — **Find My Shade**
- **Var:** Menüde "Find My Shade" (`/pages/find-my-shade`; ayrıca `/pages/foundation-shade-finder`), ana sayfada 6.-bölüm kartı, mesaj bandında "GET SHADE MATCHED TO ENTER" (çekiliş ile bağlantılı).
- **Sağlayıcı (Gözlem):** Sayfa kaynağında `oct-quiz`, `octane-quiz`, `octaneai.com` → **Octane AI** quiz eklentisi. Sonuçta ürün blokları üç şablonla basılıyor: `_quiz-hero` (yatay büyük), `_quiz-card`, `_quiz-swatch-card`; **"Shade Match Guarantee" ızgarası** (garanti mesajı) ve `octaneQuizAddToCartHandler` (sonuçtan doğrudan sepete); "Restart Quiz" ve "Want an Expert Opinion?" (insan danışman yönlendirmesi).
- **Soru tipleri (ikincil kaynak, doğrulanmamış):** ton/derinlik (light→very deep) ve alt ton (cool / neutral / warm / olive) seçimi; **selfie yükleme** alternatifi (ILIA ekibi elle önerir) — Barrel Research ve ILIA destek özetleri; kesin güncel soru listesi görülmedi.
- **Güven unsuru:** "Returns and exchanges are always free" (ton tutmazsa iade) — PDP'de de tekrar ediliyor.
Kaynak: https://iliabeauty.com/pages/find-my-shade , https://www.barrelny.com/dtc-patterns-articles/find-your-perfect-shade-with-ilia-beautys-shade-finder-quiz , https://support.iliabeauty.com/en-US/articles/find-my-shade-406079
**Yorum:** Sonuçtan **doğrudan sepete** + **"garanti"** kombinasyonu, test dönüşümünü yükselten güvenli yapı; Greenleaf'te yalnız "ürün hakkında soru sor" yönlendirmesi yeterli (WhatsApp ile satış YOK — MEMORY §1; danışman yönlendirmesi başka kanal olmalı).

## 7. Mikro etkileşimler & animasyonlar (→ hareket-tasarimcisi)
Gözlem kaynağı: ana sayfa gömülü Alpine/Swiper betikleri (kod okundu, canlı izlenmedi).
| Etkileşim | Tetikleyici | His/süre | Amaç |
|---|---|---|---|
| Swiper kart şeritleri: `speed:400` ms, **`autoplay.delay:3000`**, `disableOnInteraction:true`, **`pauseOnMouseEnter:true`**, `waitForTransition:true` | görünür olunca otomatik | 400 ms geçiş / 3 sn bekleme | Hafif otomatik gezinme, kullanıcı müdahalesinde durur |
| **IntersectionObserver ile autoplay**: yalnızca **%70–90** görünürken başlar, görünmezken durur | scroll | — | Pil/odak dostu |
| `x-intersect.once.margin.300px` ile **kaydırıcıyı gecikmeli başlatma** | yaklaşınca (300 px önce) | — | Performans (lazy init) |
| **Crossfade** (`effect:'fade'`, `crossFade:true`) — "commitments" üç-madde slider'ı | zamanlayıcı/pagination | 400 ms | Metin/görsel yumuşak geçiş |
| `slidesPerView:1.15` (mobil, **yan kart kenar ipucu**) → 2.25 (≥768) → 3 (≥1024, `allowTouchMove:false`) | sürükleme | — | "Kaydırılabilir" ipucu |
| Çekmece açma gecikmeleri: z-index sıfırlama `600 ms`, yönlendirme gecikmesi `400 ms` | tıklama | 400–600 ms | Çekmece kapanış animasyonu bitsin |
| Tailwind genel: `transition-timing-function:cubic-bezier(.4,0,.2,1)` (37×), süre `150/200/300 ms` | hover | 150 ms hızlı | Standart |
| Kart tamamı tıklanabilir: `handleClick` ilk bağlantıyı tetikler; içteki linkler `stopPropagation` | tıklama | anlık | Büyük dokunma hedefi |
| PDP satın alma çubuğu (`product-buy-bar`) + **abonelik sıklık çekmecesi** (`select-drawer-open` sınıfı) | scroll/tıklama | — | Yapışkan CTA, tercih seçimi |
→ hareket-tasarimcisi: **görünürlükte başlayan/duran autoplay (IO %70-90)**, **yan kart ipucu (1.15)**, **400 ms crossfade**, **tamamı tıklanabilir kart + iç link ayrımı**, **sıklık seçim çekmecesi**.

## 8. Mobil davranış (Gözlem)
- Breakpoint'ler: `lg` = **1024** (74 kural), `768` (23), `990` (1) ve `@media not all and (min-width:768px)` (2) → **mobile-first Tailwind**.
- Ayrı **`navigation-drawer`** (mobil menü çekmecesi) + **`cart-drawer-2025`** + **`stock-notification-modal`** (stokta yok bildirimi) + **`predictive-search`** (yazdıkça arama, `fetch(.../search/suggest)`).
- PDP: **sabit alt satın alma çubuğu** `product-buy-bar` (görsel + CTA + düzenle `__edit`); alt-menü alt-başlıkları masaüstünde (`lg:tw-block`), mobilde gizli.
- Slider'lar mobilde kaydırmalı ve kenar ipucu verir; masaüstünde `allowTouchMove:false` (ok/otomatik).
- `position:sticky` 3, `position:fixed` 1 kuralı CSS'te.
Kaynak: `https://iliabeauty.com/cdn/shop/t/535/assets/app.css`, ana sayfa/PDP HTML

## 9. Tipografi / renk karakteri (Gözlem)
- Gövde: **Post Grotesk** (Book / Book Italic / Bold; 99 kullanım); başlık: **Cambon** (Light / Regular / Demi / Italic; serif).
- **Renkler (sıklık):** `#271f1f` (koyu kahve-siyah metin, 77) · `#5e5047` (kahve) · `#ffffff` · `#010101` (düğme/accent) · `#bba293` (taupe) · `#a2605b` (toz gül, promosyon vurgusu) · `#FBF9F7` (abonelik bölümü zemini) · Tailwind grileri `#e5e7eb`, `#9ca3af`…
- Köşe: `0` (8×), `.375rem`, `.5rem` — **keskin / hafif yuvarlak**.
**Yorum:** Palet **kahverengi-taupe-toz gül = toprak tonlu / "muted"**; Tatcha kadar nötr değil, sıcak. **Doğrudan palet alınmamalı.** Almaya değer: **serif display (Cambon) + grotesk gövde** çiftinin **kontrastı** ve geniş boşluk.

## 10. Greenleaf için çıkarım
| Etiket | Madde | Neden |
|---|---|---|
| **ALIN** | **"In Safe Hands" 3'lü kart**: üyelik (VIP) + test + abonelik/avantaj tek bölümde | MEMORY §7 "üyelik tek şık bölüm"; kartlar gürültüsüz |
| **ALIN** | Ürün sayfasında **kısa rozet satırı + gerçek yüzde** ("100% of those with sensitive skin…") | Kanıtlı iddia biçimi; Greenleaf'te yalnız belgeli veriyle |
| **ALIN** | **Yapışkan alt satın alma çubuğu + sekme alt-menüsü** (PDP) | Uzun PDP'de gezinti + mobil CTA |
| **ALIN** | IO ile **autoplay (görünürken)**, 400 ms geçiş, mobil **yan kart ipucu 1.15** | Hareket kalitesi; ayrıntılar §7 |
| **ALIN** | "Select [varyant]" vs "Add to Bag" ayrımı (varyantlı kartlarda) | Hatalı sepete ekleme önler |
| **UYARLA** | **Find My Shade → "Find My Product"** (Octane tarzı: sonuçtan sepete + garanti) | Üçüncü parti SaaS yerine kendi 3 adımlı testimiz; "garanti" ancak gerçek iade politikası varsa |
| **UYARLA** | Mega menüde **"Favorites" + "Collections"** iki sütunu | Geniş katalog için iyi; Greenleaf ikonlu şeritle birleşmeli |
| **UYARLA** | Promosyon çekmecesi ("4 Exclusive Offers") | Üye kampanyaları için; yalnız gerçek kampanyada |
| **UYARLA** | Serif display + grotesk gövde kontrastı | Poppins zorunlu; serif opsiyonu marka onayına bağlı |
| **UYARLA** | Abonelik "Ships every… (most common)" tercihi | "Düzenli sipariş" üyelik özelliği olursa |
| **ALMA** | Kahve/taupe/toz gül paleti | Muted/earthy yön (§9) |
| **ALMA** | Octane AI gibi üçüncü parti quiz/selfie | Maliyet + KVKK; backend aşaması |
| **ALMA** | 30 tonluk shade listesi mantığı | Greenleaf'in ürün tipine uymaz |
