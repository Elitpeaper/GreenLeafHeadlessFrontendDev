# Referans çıkarımı: Pinterest görseli (K-185)

> Sahibi: ui-tasarimci · 2026-11-17 · Kaynak: `WhatsApp Image 2026-11-16 at 11.14.16.jpeg` (bu klasörde)
> Bağlı kararlar: K-185 (ana ilham, ONAYLI), K-102 (sitede AI görseli yok), K-184 (tasarım inceleme kapısı), K-036/K-041 (fiyat ve erişilebilir yeşil), K-170…K-183.
> Öneri kararları: **K-186…K-189**, açık soru **S-066**. Token karşılıkları `docs/tasarim/tokens.json` v1.2'de, kurallar `tasarim-kurallari.md` v1.2'de.

## 0. Sınır
Referans görsel **AI üretimidir**: metinleri anlamsız, yaprakları da sentetik. Bu yüzden görselin hiçbir parçası, kırpımı ya da izi siteye girmez (K-102, K-185). Ondan yalnız **dil** alınır: düzen, derinlik, karo ve panel anatomisi, doku, tipografi hiyerarşisi ve renk ilişkileri. Yapraklar ve dokular `src/components/illustrations/` altında sıfırdan çizildi (§9).

## 1. Görselde ne var (doğrulanmış okuma)
Orkestratör okuması doğru. Aşağıda eklemeler ve düzeltmeler var.

| Bölge | Gözlem |
|---|---|
| **Hero** | Sol yarıda düz bir orman/teal yeşili zemin var, gradyan üst soldan sağ alta koyulaşıyor. Krem/şeftali renginde kalın, yuvarlak geometrik bir başlık iki satır halinde, gövde metninin yaklaşık 3,5 katı boyda. Altında 5 satır açık krem gövde metni ve krem hap biçiminde bir CTA (koyu metinli, yumuşak gölgeli) duruyor. Sağ yarıda kâğıt kesimi katmanlar var: arkada çapraz kahverengi bir "kâğıt levha", üstten sarkan koyu yeşil oval yapraklar, ortada dikey duran ten rengi mızrak yaprak ve önde iri, damar ağı belirgin bir iskelet yaprak. Her katman alttakine yumuşak gölge düşürüyor. Sol alt köşede kahverengi bir kâğıt kıvrımı var. |
| **Keçe bandı** | Orta yeşil, keçe dokulu bir bölüm zemini var ve üzerinde çok silik, kabartma yaprak damarları görülüyor. |
| **Yaprak dilimli panel** | Koyu teal renkte, büyük radiuslu (≈ 36 px) bir panel 4 sütundan oluşuyor. Sütunları yay biçimli büyük yaprak siluetleri ayırıyor ve bunlar zeminden biraz açık tonda. Her sütunda ince beyaz çizgi ikon, ortalanmış başlık ve küçük gövde metni var. Panel yumuşak ama derin bir gölgeyle zeminden ayrılıyor. |
| **Karo ızgarası** | 3×2 düzende, ≈ 28 px radiuslu iri karolar var: açık yeşil, kahverengi, açık kahve ve ten rengi. Her karonun ortasında yuvarlak bir rozet (madalyon) ve altında ortalanmış başlık ile gövde metni yer alıyor. Rozetler sağ alta doğru **uzun, yönlü gölge** düşürüyor ("long shadow"). Karolardan biri fotoğraf (güneş huzmeli orman). Rozet olmayan iki ikon var: altın yaprak ve altıgen. |

**Ek tespitler:** (1) Işık hep **sol üstten** geliyor. Bütün gölgeler sağ alta düşüyor ve bu tutarlılık derinlik hissini taşıyor. (2) Renkler doygun ve kontrastlı, "muted botanical" değil. Zemin koyu, vurgular sıcak. (3) Görseldeki küçük gövde metinleri kahve ve yeşil üstünde düşük kontrastlı (tahminen 2–3:1). Bu kısım **alınmaz**. (4) Yeşil karodaki 8 yapraklı beyaz papatya rozeti Greenleaf'in 7 kümeli pinwheel işaretine fazla benziyor. Bu yüzden **çizilmez** (§9.3 kuralı).

## 2. Palet: referans → marka eşlemesi
Kural: koyu zeminler brand green'den (#4EAE36) türetilen bir orman skalasıdır. Bu skala mevcut `forest-900` (#0F3B22, premium temanın çapası, ton ≈ 146°) ile aynı aileye çekildi, böylece tek bir orman ailesi oluştu. Krem, kum ve toprak ikincil nötrlerdir. Brand green, lime ve mavi yalnız vurgu ve dekor olarak kullanılır. Oranlar WCAG 2.x formülüyle hesaplanmıştır.

| Referans rengi (yaklaşık) | Token | HEX | Rol | Kontrol |
|---|---|---|---|---|
| Hero teal açık köşe ≈ #2E7A5E | `forest-600` | #226E45 | Hero gradyanı açık durağı | beyaz 6.21 · cream-100 5.38 · cream-200 4.73 (yalnız büyük başlık) |
| Hero/panel teal ≈ #1E5A48 | `forest-700` | #1A5A3A | Panel zemini, bölüm zemini | beyaz 8.18 · cream-100 7.09 · cream-200 6.24 · lime-200 5.76 |
| Koyu teal ≈ #1A4A3E | `forest-800` | #14482F | Gradyan koyu durağı, footer | cream-100 9.12 · cream-200 8.02 · sand-300 6.32 |
| En koyu | `forest-900` / `950` (mevcut) | #0F3B22 / #0A2A18 | Derin zemin | cream-200 9.59 / 11.80 · brand-lime 5.28 (metin dışı) |
| Yaprak yeşili | `forest-500` | #2E8A55 | **Yalnız dekor** (yaprak dolgusu) | beyaz 4.30, metin zemini olamaz |
| Başlık kremi ≈ #F2D9B5 | `cream-200` | #EFDFC3 | Orman zeminde display başlık | yukarıdaki satırlar |
| Açık krem | `cream-100` / `cream-50` | #F6EEDF / #FBF7EF | Orman/toprakta gövde metni · sıcak açık yüzey | ink 10.73 / 11.58 · ink-muted 5.46 / 5.90 · green-700 4.64 / 5.00 |
| CTA şeftali ≈ #E9C9A0 | `sand-300` | #E2C49E | Krem hap CTA alt durağı, ten karo | forest-900 metin 7.56 · ink 7.44 · earth-900 8.41 |
| Ten karo ≈ #D2AC80 | `sand-400` | #CFA77A | Ten karo koyu durağı | earth-900 6.30 · forest-900 5.67 · ink 5.57 |
| Kahve levha ≈ #8B5A3C | `earth-600` | #875A39 | Kahve karo açık durağı | beyaz 5.91 · cream-100 5.13 |
| Koyu kahve ≈ #6E4429 | `earth-700` | #6F462B | Kahve karo koyu durağı, açık zeminde toprak metni | beyaz 8.12 · cream-100 7.04 · cream-50 üstünde metin 7.60 |
| En koyu kahve | `earth-800` / `900` | #573521 / #3F2618 | Derin karo / ten karo üstünde metin | beyaz 10.84 · earth-900 sand-300 üstünde 8.41 |
| (dekor) | `earth-500` | #9C6B45 | Kâğıt levha, yaprak sapı | beyaz 4.56, metin zemini olamaz |
| Açık yeşil karo ≈ #6E9A4E | `green-700→800` gradyanı (mevcut) | #2F7A22→#245F1A | Yeşil karo | beyaz 5.35+ · cream-100 4.64+ |

**Brand renklerinin yeri:** brand-green, lime ve mavi orman zeminde rozet içi, yaprak, imza çizgi bandı ve aktif gösterge olarak kullanılır (brand-lime/forest-900 5.28, brand-blue/forest-900 4.62, brand-green/forest-800 3.72; metin dışı 3:1 eşiğini geçer). Orman zeminde **metin rengi olarak kullanılmazlar**.
**Değişmezler korunur:** üye fiyatı rozeti green-700 + beyaz (5.35), birincil düğme green-700, odak halkası blue-700, fiyat metni ink ve **fiyat her zaman açık yüzeyde** durur.

## 3. Tipografi
Referans başlığı kalın, yuvarlak ve geometrik bir sans (Futura/Poppins ailesi hissi). Jost bunu zaten karşılıyor, **yeni font gerekmiyor**.
| Rol | Referans | Bizde |
|---|---|---|
| Hero başlığı | Krem, kalın, 2 satır, sıkı satır aralığı | `display` 44→92, **Jost 600–700**, `-0.03em`, renk `cream-200`, en çok 2–3 satır, `text-wrap: balance` |
| Panel/karo başlığı | Ortalanmış, kalın, kısa | `xl` 20 / `2xl` 22→28, 600, cream-100 (koyu karo) veya earth-900 (ten karo); ortalı |
| Gövde | Küçük, açık krem | `base` 16 / `sm` 14 (yalnız karo özeti, en çok 3 satır), cream-100 · referanstaki düşük kontrast **alınmaz** |
| CTA | Orta ağırlık, koyu, hap içinde | `base` 16, 600, forest-900 |
| Eyebrow | (referansta yok) | Mevcut kural: `xs` büyük harf + inline çizgi bandı. Orman zeminde renk `lime-200` (forest-800 üstünde 7.40) |

## 4. Radius, gölge, doku
- **Radius:** karo `tile` 28 px (yeni) · panel `panel` 36 px (yeni) · büyük panel `xl` 32 (mevcut) · CTA ve rozet `pill`/daire. Kare köşe kullanılmaz.
- **Gölge (yumuşak, uzun, sağ alta, orman tonlu; gri veya siyah değil):** `shadow-tile` (karo), `shadow-tile-hover`, `shadow-long` (yönlü: 24/32 px kaydırma, 56 px bulanıklık), `shadow-badge` (rozet: üst iç ışık + sağ alt düşüş), `shadow-cta-cream`, `shadow-card-on-forest`. SVG içindeki katman gölgesi `PaperShadow` filtresiyle verilir (dx 6, dy 10, blur 8, forest-950 %35).
- **Doku:** (1) `TextureGrain`: keçe/kâğıt grenidir. Orman zeminde %10–16, kremde %5–8 kullanılır, statiktir. (2) `PatternLeafVeinEmboss`: kabartma yaprak damarıdır ve yalnız orman/toprak zeminde kullanılır. Bir ekranda **en çok 1 doku + 1 desen** bulunur. Doku metin kontrastını ±0,2'den fazla değiştirmez. Dokular metin panelinin içine değil, bölüm zeminine konur.

## 5. İkonografi
- **Rozet (madalyon):** `IconBadge` (`glyph` × `tone`). Daire gradyanlı olur, sol üstte ince bir ışık yayı ve sağ altta uzun bir gölge taşır. Glif ince çizgidir (96 ızgarada 3 birim ≈ 56 px'te 1.75 px), Lucide diliyle uyumludur. Tonlar şunlardır: forest, green, earth, ink, sand, cream, accent (son ton hover-recolor ve premium temayı izler). Her tonda glif/zemin oranı ≥ 3:1'dir. Rozet dekoratiftir (`aria-hidden`), anlamı karo başlığı taşır.
- **Panel ikonları:** referanstaki ince beyaz çizgi ikonlar için Lucide 1.75 px kullanılır, renk cream-100, boyut 32–40 px.
- **Kategori ikonları:** mevcut 12'li duotone set aynen kalır (K-195, K-209). Orman zeminde krem diskin içine konur (§7.3).

## 6. Hero katman tarifi (ana sayfa slaytları ve sayfa hero'ları)
Arkadan öne doğru:
1. **Zemin:** `gradient.forest-hero` (135°, forest-600 → 700 → 800).
2. **Doku:** `TextureGrain` %12 (soft-light). İsteğe bağlı olarak sol altta %50 güçte `PatternLeafVeinEmboss`; grain ile aynı anda yalnız biri güçlü olur.
3. **Görsel yarısı (sağ, masaüstünde %50–55):** iki seçenek var.
   - **(a) Kâğıt kesimi:** `SceneHeroLeaves` (levha → arka yapraklar → orta yapraklar → ön iskelet yaprak; `parallax`).
   - **(b) Fotoğraf:** lisanslı stok fotoğraf (K-160) **yaprak kesimli çerçevede** (`radius-panel`, tek köşe `2xl`) ve `shadow-long` ile kullanılır. Çerçevenin kenarına önden 1–2 `PaperLeaf`/specimen taşar; bu, kâğıt katman hissini fotoğrafa bağlar. Resmî ürün packshot'u en üst katmanda ayrı öğe olarak durur ve beyaz/krem bir "podyum" diskinin üzerine oturur.
4. **Metin yarısı (sol):** eyebrow (lime-200 + inline bant) → H1 `display` cream-200 → 1–2 satır cream-100 gövde → **krem hap CTA** (`gradient.cta-cream`, forest-900 metin 7.56, `shadow-cta-cream`, yükseklik 52) + isteğe bağlı ikincil metin bağlantısı (cream-100, alt çizgili).
5. **Alt kenar:** imza çizgi bandı (yeşil/lime/mavi, düz). Ekranda tek bant kuralı geçerlidir.

**Metin hiçbir zaman fotoğraf ya da kâğıt katman üzerinde durmaz** (§4.6). Mobilde (< 768) görsel yarısı metnin **üstüne** gelir ve 4:3 kırpılır. Kâğıt katman sahnesi `slice` ile sağa yaslanır, metin altta düz zeminde kalır.
**Slaytlara dağılım (K-205'teki 5 slayt):** 1 marka/doğa = (a) kâğıt kesimi (LCP metin olur, görsel hafif kalır) · 2 TR'de satışta = (b) fotoğraf + 3 packshot · 3 premium gold = premium-gold teması (forest-950 + altın varak süsler, `ScenePremiumFrame`; krem hap yerine `gold-button`) · 4 PV = (a) varyantı + `BadgePv` büyük rozet · 5 cilt tipi = (b) fotoğraf + `BadgeDrop`.

## 7. Bileşen anatomileri
### 7.1 Yaprak dilimli panel (`PanelLeafSegments`)
- Kapsayıcı `rounded-panel` + `shadow-long` + overflow gizli. Zemin bileşenin kendisidir (forest-700→800, isteğe bağlı earth). Sütun sayısı = içerik ızgarası (2–5).
- Sütun içeriği ortalanır: Lucide ikon 40 (cream-100) → başlık `xl` 600 cream-100 → gövde `sm`/`base` cream-100 (7.09+), en çok 3 satır. Sütun iç boşluğu 32/24 px.
- Mobilde sütunlar alt alta dizilir. Panel `segments={1…2}` ile yeniden çizilmez; panel tek sütun olur ve yaprak dilimleri dikey yaylar gibi okunur. Kabul edilebilir, gerekirse mobilde `segments=2`.
- **Kullanım:** `/uye-ol` "3 adımda üyelik", `/pv-nedir` "PV nasıl işler", `/hakkimizda` "Neden Greenleaf". Ana sayfada **yok** (K-178 yalınlık).

### 7.2 Karo (tanıtım karosu)
- `rounded-tile`, `shadow-tile` (hover/odakta `shadow-tile-hover` + `translateY(-4px)` → hareket-tasarimcisi), iç boşluk 32/24. Zemin `gradient.tile-*` + `TextureGrain` %6.
- Anatomi: üstte ortalı `IconBadge` 72 px (mobil 56) → başlık `2xl` 600 → özet `base` 1–2 satır → bağlantı "Keşfet →" (karonun tamamı tek `<a>`, iç içe bağlantı yok).
- Ton → metin: green/earth/earth-deep → cream-100/beyaz · sand → earth-900 · cream → ink.
- **Fotoğraf karosu:** stok fotoğraf karoyu doldurur, metin altta **cream-50 plakada** (radius md, `shadow-long`) durur, fotoğraf üstünde değil.
- **Fiyat karoda yer almaz.** Fiyat gerekirse yalnız `tile-cream` (açık) karoda bulunur.

### 7.3 Kategori şeridi
Her kategori 88 px (mobil 72) **cream-50 disk** (`shadow-badge`) içinde mevcut duotone ikonla gösterilir, altında `sm` 500 ink etiket bulunur. Şerit cream-50 ya da beyaz zeminde durur. Hover: disk `--accent-soft`'a döner ve ikon `bloom` olur. Orman zemine taşınmaz (hero'dan hemen sonra açık bir nefes alanı gerekir).

### 7.4 Ürün kartı
Ticaret yüzeyidir ve **her zaman beyazdır** (K-200 v2 korunur). Referanstan alınanlar: medya karosu radius'u `tile` (28) olur, karo zemini `--accent-soft` kalır ve hover'da `shadow-tile` (orman tonlu uzun gölge) kullanılır. Vitrin bölümleri açık zeminde (beyaz / cream-50) kalır. Kart orman zemine konursa (ör. mega menü tanıtım alanı) gövde beyaz plaka + `shadow-card-on-forest` alır. Fiyat, rozet ve PV değişmez.

### 7.5 Ana sayfa ritmi (K-206 sırası korunur)
Hero (orman) → kategori şeridi (cream-50) → Vitrin 1 (beyaz) → Vitrin 2 (cream-50) → **tanıtım karoları bandı** (orman `forest-radial` + `PatternLeafVeinEmboss`; 3×2 ızgara: PV `tile-earth` + ink rozet · Cilt tipi `tile-green` + cream rozet · Premium gold `tile-sand` + set rozeti · Üye ol `tile-earth-deep` + üyelik rozeti · Haberler `tile-cream` + kitap rozeti · Hikâye **fotoğraf karosu** → /hakkimizda) → markalar (beyaz) → footer (orman). Mobilde karolar tek sütun, tablette 2 sütun olur.

### 7.6 Footer (K-078'i değiştirir → K-189)
Zemin `gradient.forest-deep` + `TextureGrain` %12 olur. Üst köşeler `rounded-t-panel`'dır, sayfadan "kâğıt levha" gibi çıkar. Metin cream-100 (9.12+), başlıklar cream-200. **Logo yalnız beyaz zeminde** kuralı için logo beyaz yuvarlak plakada kalır. "Çok yakında" rozetleri blue-100/blue-800 olarak değişmeden kalır (açık hap). En altta imza çizgi bandı bulunur.

### 7.7 Sayfa başlıkları
- `/pv-nedir`, `/uye-ol`, `/cilt-tipine-gore`, `/blog`, `/haberler`, `/hakkimizda`: §6 hero tarifinin kısa sürümü kullanılır (yükseklik 360–440 masaüstü). Görsel yarısında ilgili sahne (`ScenePv`, `SceneMembership`, `SceneFinderLeaves`, `SceneBlog`) + bir `PaperLeaf` katmanı ve büyük rozet yer alır.
- Kategori / `/urunler` / arama: kısa orman başlık bandı (160–220 px) + kategori rozeti, ızgara beyaz zeminde → **S-066**.
- PDP: ticaret yüzeyidir, başlık bandı yoktur. "İlgili ürünler" cream-50 zeminde olur.
- **Çok yakında sayfaları (K-181):** cream-50 sayfada ortalı bir `rounded-panel` orman paneli + boş durum illüstrasyonu (`text-cream-100`, çizgi rengi krem) + başlık cream-200 + tek eylem (krem hap) + "Çok yakında" rozeti.

### 7.8 Header ve mega menü
Header **beyaz kalır** (logo kuralı). Kompakt hâlde gölge `shadow-long`'un hafif sürümüdür (mevcut `overlay` korunur). Mega menü tanıtım karosu `tile-earth` ya da orman zemin + rozet olur. Öne çıkan ürün kartı beyaz plakada kalır.

## 8. Hareket noktaları (→ hareket-tasarimcisi; tarif yok, yalnız yer)
Hero katmanları için `parallax` derinliği (levha < arka < orta < ön) · rozet `spin`/eğilme (karo hover'ında) · panel dilimlerinin sırayla `draw` girişi · karo kaldırma + gölge uzaması · krem CTA basma · kategori diski `bloom`. Grain ve emboss **hareket etmez**.

## 9. Kütüphaneye eklenenler (v1.2)
`botanical.tsx`: `PaperLeaf` (oval / lance / heart / skeleton × forest / deep / green / sand / earth), `PaperShadow`, `SceneHeroLeaves`, `Leaf*Specimen` (4) · `textures.tsx`: `TextureGrain`, `PanelLeafSegments` · `patterns.tsx`: `PatternLeafVeinEmboss` · `badges.tsx`: `IconBadge` + 9 hazır ayar. Katalog: `/svg-kutuphanesi` → "Referans dili" grubu. Boyut: rozet ≈ 1,4 kB, specimen ≈ 2,7 kB, panel ≈ 2,5 kB, emboss ≈ 4,1 kB, **SceneHeroLeaves ≈ 8,7 kB ham** (6 kB kuralının tek istisnası: tek LCP dışı sahne, gzip ≈ 2 kB; §9.5'te not edildi).

## 10. Alınmayanlar
Referanstaki düşük kontrastlı küçük metin · papatya/çiçek rozeti (pinwheel benzerliği) · altın yaprak ikonu (ana temada altın yok; premium hariç) · AI fotoğraf ve sentetik yaprak dokusu · kahverengi sayfa zemini (toprak yalnız karo ve levha olarak kullanılır) · tüm sayfanın koyu olması (ticaret yüzeyleri açık kalır).
