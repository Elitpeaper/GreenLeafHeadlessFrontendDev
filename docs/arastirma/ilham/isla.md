# Isla Beauty (isla-beauty.com) — İlham Analizi

> Yön: **Premium / editoryal** (MEMORY §9). Hazırlayan: A3-ilham-dogal-premium, FAZ 0. Tarih: 15 Kasım 2026.
> **Gözlem** = HTML/CSS/JSON'dan; **Yorum** = görüşümüz. Ham önbellek: `.cache/arastirma/isla/`

## 0. Doğru site hangisi? (tanımlama)
- **Yöntem:** `WebSearch "Isla Beauty skincare official site"` → NYLON röportajı ve Thingtesting/Beauty Independent kayıtları markayı "**isla-beauty.com**" olarak gösteriyor (https://www.nylon.com/beauty/isla-beauty-on-transparency-and-launching-during-quarantine , https://thingtesting.com/brands/isla , https://www.beautyindependent.com/isla-beauty-wants-most-transparent-brand-beauty-industry/). Siteyi `curl` ile doğruladım: 200, başlık "Concentrated Skincare – Isla Beauty", ürünler The Elixir / Storm Serum / Whipped Dream / Snow Scrub / Day Melt / Lipid Layer (arama sonuçlarındaki ürün adlarıyla örtüşüyor).
- **Marka künyesi (arama özeti, ikincil):** 2020'de Tracy Dubb ve Charlie Denton tarafından kuruldu; "şeffaflık" odaklı (fiyatlandırma, ambalaj, formül kalitesi, üretim bütünlüğü); ağırlıkla DTC, Shopbop/Revolve'da da satılıyor.
- **Değerlendirilen alternatifler (elendi):**
  1. `islabeauty.com` → alan adı **satılık/park** (curl yönlendirmesi hugedomains.com'a gitti) — marka değil.
  2. **Isla & Me** (notonthehighstreet.com/islaandme) → çocuk/hediye mağazası, alakasız.
  3. Shopbop / Revolve "Isla Beauty" marka sayfaları → satıcı sayfası; marka sitesinin kendisi değil, tasarım kanıtı yok.
- **Kullanıcıya doğrulama notu:** MEMORY §9'da "Isla Beauty" yazıyor, adres belirtilmemiş. Biz **isla-beauty.com**'u (temiz/şeffaf formüllü, konsantre cilt bakımı markası) esas aldık. Kullanıcının kastettiği başka bir site ise belirtmesi gerekir.

## 1. Kaynaklar
| URL | Ne için | Not |
|---|---|---|
| https://isla-beauty.com/ | Ana sayfa HTML | 200; Shopify **Broadcast 3.0.0** teması, tema adı "Copy of Isla 2.0 – MDW Sale 2025" |
| https://isla-beauty.com/collections/all | Listeleme HTML | 200 |
| https://isla-beauty.com/products/storm-serum | Ürün detay HTML | 200 |
| https://isla-beauty.com/products.json?limit=30 | Ürün verisi (7 ürün) | 200 |
| `.../cdn/shop/t/33/assets/theme.dev.css`, `font-settings.css`, `keyframes.css`, `custom.css` | CSS | 200 |

**Kısıt:** Bu site 429 vermedi. Ana sayfa başlığında "**Homepage Teaser**" kalıntısı ve tema adında "MDW Sale 2025" var — yani canlı tema **yarı taslak/kampanya kopyası** olabilir (Yorum); gördüğümüz tasarım son hâl olmayabilir. Ürün sayfasında "$74", `products.json`'da "$78" (fiyat farkı — kampanya/önbellek, Gözlem). Tarayıcı render'ı yok; Isla'ya ait quiz yok.

## 2. Ana sayfa bölüm akışı (Gözlem)
1. Tarayıcı uyarısı ("limited support for your browser…") + duyuru: "**Free Shipping Above $50**"
2. Header: **Shop · Why Isla Works · About Us · Login · Cart** (yalnızca 3 bağlantı — küçük katalog)
3. **Hero (custom HTML):** "Concentrated skincare. Products that do more, so you need less." + 3 cümlelik manifesto ("Most skincare brands sell you more steps. We do the opposite. … clinically dosed actives… Fewer bottles. Stronger formulas.")
4. **Ürün şeridi:** 4 kart (The Elixir $58 · Storm Serum $78 · Lipid Layer Lip Balm $26 · The Daily Skin Defense Duo $110)
5. **"The bathroom shelf test — Do you need all of it?"**: görsel karşılaştırma **14 ürün** ("The typical shelf") vs **6 ürün** ("The Isla system": Cleanse / Hydrate / Defend / Repair / Exfoliate / Protect) + `Shop Now`
6. "AWARDS & More" (ödül/basın şeridi)
7. **"What concentrated skincare looks like on real skin"**: Before/After kartları (3 cilt tipi: Normal – doku/ışıltı, Akneye eğilimli – berraklık, Hassas – ton eşitliği; "After · 4 wks", "Real customers. Unretouched results.")
8. **"Dosed to do more."**: 6 ürün × "N dosed actives" listesi (Elixir 5, Storm 8, Whipped Dream 7, Snow Scrub 5, Day Melt 4, Lipid Layer 5; "34 properly dosed actives · 6 products · every dose published") + `See why Isla works`
9. Bülten ("Get 15% off your first order") + footer (Shop / Affiliate Program / Formulation Standards / About Us)
Kaynak: https://isla-beauty.com/
**Yorum:** Akış **bir tez** üzerinde: "az ürün, güçlü formül". Bölümler yaklaşık **hikâye → kanıt → rakam**. 9 bölüm; bizim geniş kataloğumuza doğrudan uygulanmaz ama **"tek bir fikir etrafında kısa sayfa"** disiplini örnek.

## 3. Ürün kartı anatomisi (Gözlem)
- **İsim → tek satır faydası** ("Daily Stress Defense Serum") → **fiyat (`$78.00`)** → **puan (`4.8`) — yalnızca sayı** → `Add to cart` → tıklayınca düğme metni **`Added to cart`** (geri bildirim durumu) · stokta yoksa **`Sold Out`** (Day Melt).
- Rozet yok; set kartı "Hydrate. Defend. Reset." şeklinde slogan alt başlığıyla.
- `data-reviews="false"` ayarı ile yorum sayısı gizli; sadece yıldız değeri.
Kaynak: https://isla-beauty.com/collections/all , https://isla-beauty.com/products.json?limit=30
**Yorum:** Kart **çok sade**; "Added to cart" durum değişimi küçük ama etkili.

## 4. Ürün detay sayfası yapısı (Gözlem — Storm Serum)
Üstteki standart Broadcast PDP (galeri, fiyat, sepete ekle) yanında sayfa gövdesi **uzun anlatı ("long-form")** olarak özel HTML bölümlerle kurulmuş:
1. **Clinical proof — "12 weeks of visible recovery. Unretouched skin."** + büyük rakamlar: **+63%** stronger skin barrier (28 gün), **−27%** crow's feet derinliği, **97%** daha ışıltılı/eşit ton (tüketici algısı)
2. **Redness & visible irritation — Before / After 4 weeks** (Before / After etiketli görsel çifti)
3. **What you're seeing** (fotoğrafın ne gösterdiğini açıklayan metin; "Photos unretouched. Individual results may vary.")
4. **The mechanism — "Most serums spike. Storm sustains."** (ChronoPower® 24 saat sürekli salım; "What most serums do" vs "What Storm Serum does" iki sütun karşılaştırması)
5. **Formula architecture — "One dropper. Seventeen actives. Three jobs."**: 01 Defend / 02 Recover / 03 Correct (her biri 3 alt madde, ör. "ChronoPower® 3.8%")
6. **The product — "One serum. Multiple jobs."**: 5 fayda ikonlu liste; fiyat **$74** · "25 ml · 0.84 fl oz" · **"Add Storm Serum — $74"** (butonda fiyat) · kullanım cümlesi
7. **FAQ** akordeonu: How to Use · "Can I use this instead of multiple serums?" · "Who is Storm Serum best for?" · **"Is Storm Serum Clean? — meets every global regulatory standard definition of clean; 94% natural ingredients; safe for pregnancy & breastfeeding"** · **Full Ingredients List** (tam INCI)
- **Sertifika rozeti yok** (Gözlem): "clean" iddiası yalnız FAQ metninde; logo/rozet satırı ve üçüncü taraf belgesi görülmedi. Yorum bölümü HTML'de görülmedi (`data-reviews="false"`).
Kaynak: https://isla-beauty.com/products/storm-serum
**Yorum:** Bu yapı **"kanıt anlatısı" PDP'sinin** iyi örneği: rakam → nasıl çalışır → neden farklı → ne var içinde → SSS. Ama **sertifika/rozet açığı**: Greenleaf'te bu boşluğu **tıklanabilir belge rozetleriyle** doldurmak fark yaratır. Klinik rakamlar TİTCK/tedavi edici iddia riski taşır (MEMORY §10).

## 5. Listeleme / filtre UX (Gözlem — /collections/all)
- Yalnızca 6 ürünlük düz ızgara; `data-section-type="collection"`, `collection-grid`, `collection-hero`; **`data-sort="false"`** → sıralama kapalı; filtre **yok**.
- Katalog küçük olduğu için filtre ihtiyacı yok; navigasyon ürün sayısıyla orantılı (3 bağlantı).
Kaynak: https://isla-beauty.com/collections/all
**Yorum:** Greenleaf için **referans değeri düşük**; sadece "küçük koleksiyonda filtreyi gizle" ilkesi (örn. 6'dan az sonuçta filtreyi sadeleştir).

## 6. Cilt testi / ürün eşleştirme akışı
- **Yok.** Ana sayfa/header/footer HTML'inde quiz bağlantısı veya bileşeni bulunmadı (`quiz|finder` araması boş). Eşleştirme yerine **"The bathroom shelf test"** (14 vs 6 ürün görsel karşılaştırması) ve **"Pair With"** (sepet çekmecesinde tamamlayıcı ürün) var.
Kaynak: https://isla-beauty.com/ , https://isla-beauty.com/products/storm-serum

## 7. Mikro etkileşimler & animasyonlar (→ hareket-tasarimcisi)
Gözlem kaynağı: `keyframes.css` (tamamı 6 satır), `theme.dev.css`, `custom.css`. Canlı izlenmedi.
| Etkileşim | Tetikleyici | His/süre | Amaç |
|---|---|---|---|
| `@keyframes fadeIn` (0→1 opaklık) / `fadeOut` | giriş/çıkış | CSS'te süre yok; kullanıma bağlı | Basit yumuşak giriş |
| **`slideUp`**: `translateY(100%)` + opaklık .01 → yerine (`slideUpX` yatay ortalı sürümü) | çekmece/modal/bildirim açılışı | tipik 300–400 ms (aşağıdaki geçişlerle uyumlu) | Alttan kayarak açılma (sepet/bildirim) |
| **`blink`**: `scale(0)` → normal | rozet/nokta belirişi | kısa | Sepet sayacı/rozet "pop" |
| **`blurIn`**: `filter:blur(.1rem)` → yok | görsel yüklenince | kısa | Görsel netleşme (lazy-load) |
| Genel geçişler `transition: box-shadow .3s ease` (12×), `opacity .3s` (10×), `transform .3s` (9×), `all .4s` (7×) | hover | **300–400 ms** | Yumuşak, biraz yavaş |
| `Add to cart` → `Added to cart` metin/durum değişimi | tıklama | anlık | Eylemin onayı |
→ hareket-tasarimcisi: **sepet sayacı "blink/pop"**, **görsel blurIn → net**, **slideUp bildirim/çekmece**, **"Eklendi" durum değişimi**. Hepsi **çok hafif**; bizim için kolay.

## 8. Mobil davranış (Gözlem)
- **Desktop-first CSS:** `max-width:749px` **228 kural** vs `min-width:750px` 44 kural; ek `max-width:989px` (28) → masaüstü ağırlıklı yazılmış, mobil geçersiz kılma yaklaşımı.
- Broadcast temasının standart mobil menü çekmecesi; PDP'de `sticky` (CSS'te 3 referans, `sticky-enabled` bayrağı).
- Sepet çekmecesi tam ekran panel; "Pair With" tamamlayıcı önerisi.
- Üstte tarayıcı desteği uyarı bandı.
Kaynak: `https://isla-beauty.com/cdn/shop/t/33/assets/theme.dev.css`

## 9. Tipografi / renk karakteri (Gözlem)
- Gövde: **Söhne Buch**; başlık/nav: **Söhne Kräftig** (Klim; `--font-stack-body/heading/nav`); eski/yedek: Source Sans Pro, Merriweather Sans; vurgu **EB Garamond italic 600** (Google Fonts).
- **Renkler:** `#ffffff` (zemin) · `#3a3a3a` (metin) · `#8a8580` (sıcak gri) · `#e4263d` / `#e32844` (**kırmızı birincil**, `---color-primary`) · `#f8f6f3`, `#fefcf8` (krem) · `#F9DBCF` (blush) · duyuru bandı `#fff980` (sarı) · hata `#721c24`/`#f8d7da`.
- Köşe: `border-radius:50%` (20×) ve `0` (14×) — yuvarlak ikon + keskin kart.
**Yorum:** Beyaz + sıcak gri + **kırmızı vurgu** — Isla bu listede **en temiz/minimal**; bej/krem ikincil. "Muted botanical" **değil**, ama **doğa/yeşil çağrışımı da yok**; kırmızı birincil renk Greenleaf'e uymaz.

## 10. Greenleaf için çıkarım
| Etiket | Madde | Neden |
|---|---|---|
| **ALIN** | **"Bathroom shelf test"** görsel karşılaştırması (14 şişe vs 6 şişe) | Basit, etkileyici "tek sayfa fikri"; Greenleaf'te "dağınık rutin vs Greenleaf seti" olarak uyarlanabilir |
| **ALIN** | Kartta **"Added to cart"** durum değişimi + sepet sayacı pop | Hafif mikro etkileşim (§7) |
| **ALIN** | PDP kanıt anlatısı sırası: rakam → mekanizma → formül mimarisi → SSS | Uzun içerik için iskelet (belgeli veriyle) |
| **UYARLA** | "Dosed to do more" — her üründe **etkin madde sayısı/oranı yayını** ("every dose published") | Şeffaflık fikri; Greenleaf'te yalnız güvenilir formül verisi alınabilirse |
| **UYARLA** | Before/After + "Real customers. Unretouched" ibaresi | Biçim alınır; görseller yalnız gerçek ve izinli olmalı |
| **UYARLA** | Butonda fiyat ("Add Storm Serum — $74") | Tek net CTA; ₺ ve üye fiyatı ile |
| **UYARLA** | Söhne tipi grotesk + ince İtalik serif vurgu | Poppins zorunlu; vurgu fontu opsiyonel |
| **ALMA** | Kırmızı birincil renk, sarı duyuru bandı | Marka dışı |
| **ALMA** | Sertifikasız "clean" iddiası (yalnız FAQ'da) | Bizim açıklanan sorun; rozet + belge eklenmeli |
| **ALMA** | Desktop-first CSS | Biz mobile-first kuruyoruz |
| **ALMA** | "Homepage Teaser" / yarım kalmış tema izleri | Referans olarak güvenilir kısım yalnız yukarıdaki sade ilkeler |
