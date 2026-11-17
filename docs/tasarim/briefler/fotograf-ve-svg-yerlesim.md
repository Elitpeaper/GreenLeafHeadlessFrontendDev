# Fotoğraf ve SVG yerleşim haritası — v1 (K-270, K-271)

> Sahibi: ui-tasarimci · 2026-11-17 · Dayanak: K-270 (fotoğraf yoğunluğu), K-271 (SVG yalnız boş alanda, kullanıcı hareketine bağlı), K-102 (yalnız lisanslı stok), K-267 (Dev şerit kalktı), K-257/K-265 (kapılar pin sahnesi).
> Kurallar: `tasarim-kurallari.md` v1.4 §8.2–8.3, §9.5. Kaynak ve lisans: `gorsel-kaynaklari.md`. Tüketim: yalnız `getStockImage(slot)` (`src/lib/images.ts`) — slot adları aşağıdaki gibidir; manifest `data/content/stock-images.json` (76 slot).

## 0. Üç kural
1. **Görsel alan = fotoğraf.** Bir alan "görsel" ise (karo zemini, hero görsel sütunu, kapak, bant) fotoğraf alır. İkon yalnız işaret (≤ 48 px, menü satırı, sekme, rozet) olarak kalır.
2. **Metin fotoğrafa basılırsa scrim:** `forest-950 / ≥ %70` alttan gradyan (worst case 5.85:1), yoksa metin düz plakada. Fiyat, üye rozeti, PV asla fotoğraf üstünde değil.
3. **SVG fotoğrafın yerine geçmez.** SVG yalnız boş alanda, imleç/kaydırmaya bağlı (§3). Boş durum, "çok yakında", 404 ve yasal "yakında" ekranları SVG illüstrasyonla kalır (K-181).

Tüm `<Image>` kullanımları: `placeholder="blur"` (manifest `blurDataURL`), `sizes` gerçek kolon genişliği, hero dışında `loading="lazy"`; dekoratifse `alt=""`, anlamlıysa manifest `alt`.

## 1. Fotoğraf yerleşimi (slot → yer)

### 1.1 Ana sayfa
| Alan | Bugün (dosya) | Yeni | Oran / kırpım | Not |
|---|---|---|---|---|
| Hero slaytları 1–5 | `HomeHero.tsx` (foto + slayt 5 sonunda `SceneHeroLeaves` yedeği) | değişmez: `home.hero.1/2/3`, `premium.gold.1`, `pv.scene`, `skinFinder.hero` | mevcut | `SceneHeroLeaves` yedeği kaldırılır; slot boşsa slayt render edilmez |
| Dev şerit | `HomeHero`/ana sayfa | **kaldırılır** (K-267) | — | Hikâyemiz bağlantısı Kapılar sonrası metin bağlantısına taşınır |
| Raf duvarı karoları (12) | `Shelves.tsx:92` `CategoryIllustration` | `shelf.<kök>` (12 slot, aynı anahtarlar) | karo dolu `object-cover`; xl 1:1, wide 2:1, one 1:1 | Ad + ürün sayısı alttan scrim üstünde (beyaz, `text-lg/2xl` semibold). İkon köşede 40 px cream-50 daire içinde, `aria-hidden`. Hover: foto 1.06 yakınlaşma + scrim %70→%78 (hareket-tasarimcisi) |
| Raf duvarı zemin deseni | `Shelves.tsx:52` `PatternLeafScatter` | kalır ama yalnız karo ızgarası **dışındaki** boş kenarlarda (§3) | — | Karolar foto olduğu için desen karo arkasında görünmez |
| Vitrin 2 sekme büyük ikonu | `TabbedShowcase.tsx:56` `bigIcon` (size-48) | `shelf.<sekme anahtarı>` | 4:5 yan panel, `rounded-tile` | Sekme düğmesindeki küçük ikon (`:55`) kalır |
| Kapılar — yatay pin paneli (5) | `HomeDoors.tsx:91,98,214` SVG sahneler + PvArt/FinderArt/PremiumArt | **dikey pin fotoğrafları:** `door.pv.tall`, `door.finder.tall`, `door.premium.tall`, `door.membership.tall`, `door.news.tall` | panel tam dolu, 2:3 dikey (1333–1600 × 2000) | Metin bloğu panel altında scrim üstünde. PV panelinde packshot'lar foto üstünde cream plakada **yalnız PV** çipiyle kalabilir; premium panelde `ScenePremiumFrame` foto üstünde ince altın çerçeve olarak kalabilir (≤ %60). Mobil/şerit modunda aynı fotoğraflar 4:5 kırpılır |
| Kapılar — kare yedekler | — | `door.pv`, `door.membership`, `door.news` (+ mevcut `skinFinder.texture.dewy`, `premium.gold.2`) | 4:3 / 3:4 | Pin dışı küçük karo kullanımı için (ör. /uye-ol, footer üstü tanıtım) |
| Marka duvarı | brand-lime blok | değişmez (marka adları metin) | — | |

### 1.2 Tanıtım sayfaları (PageHero görsel sütunu)
`PageHero` görsel sütunu (`PageHero.tsx:66` `HeroArt` = `SceneHeroLeaves` + madalyon) → **fotoğraf**: yaprak kesimli çerçeve (`radius` lg, tek köşe 2xl — §6), `object-cover`, mobilde 16:9 üstte, masaüstü sütun dolu. Madalyon/PV sikkesi gerekiyorsa fotoğrafın **köşesinde** cream plakada küçük öğe olarak kalır.

| Sayfa | Bugün | Hero slotu | Gövde içi ek fotoğraf |
|---|---|---|---|
| `/pv-nedir` | `pv-nedir/page.tsx:46` `HeroArt` | `page.pv.hero` | "Nerede görürsün" yanında `nature.sunlit-branch`; iş fırsatı bölüm girişinde `nature.bright-sky` (bant 16:5) |
| `/uye-ol` | `uye-ol/page.tsx:32` `HeroArt` | `page.uyeOl.hero` | fayda satırı yanında `door.membership.tall` (4:5); son koyu panel arkasında `membership.scene` (mevcut) |
| `/cilt-tipine-gore` | `FinderPage.tsx:44` `SceneFinderLeaves` | `skinFinder.hero` (mevcut) | sonuç başlığı yanında `finder.serum`; tip çipleri bandında doku `texture.cream` (%8 değil, foto şerit 16:3) |
| `/hakkimizda` | `hakkimizda/page.tsx:36` `HeroArt` (+ `brand.story.1` gövdede) | `page.hakkimizda.hero` | hikâye: `brand.story.1`, `brand.story.2`; "Ailemiz/evimiz için" bloğu: `about.family`, `about.home`, `about.growth` (3'lü foto şerit) |
| `/sertifikalar` | `sertifikalar/page.tsx:23` `HeroArt` | `page.sertifikalar.hero` | — |
| `/sss` (yeni, K-269) | yok | `page.sss.hero` | — (soru listesi düz zeminde; kenar boşluğunda SVG §3) |
| `/favoriler` | başlık yok/boş durum SVG | `page.favoriler.hero` (kısa bant 16:4) | boş durum SVG kalır |
| `/blog` | `BlogHero.tsx:46` `SceneBlog` | `page.blog.hero` | — |
| `/haberler` | `BlogIndex`/`ComingSoonPage` | `page.haberler.hero` | — |

### 1.3 Liste sayfaları (K-230 orman başlık bandı)
`ListingHero.tsx:63` `SceneHeroBotanical` → fotoğraf bandı: foto tam genişlik `object-cover`, üstte orman scrim (soldan `forest-900 %88 → %55`), başlık/lead/kırıntı beyaz-cream. Yükseklik 160–220 px.

| Sayfa | Slot |
|---|---|
| `/kategori/{kok}` (+ alt) | `category.<kök>` (mevcut 12; `cilt-bakimi` → `skin-texture-aloe`) |
| `/urunler` | `listing.all` |
| `/arama` (sonuç + boş) | `listing.search` |
| `/koleksiyon/{anahtar}` | `collection.default`; `premium-gold` → `premium.gold.1` (tema) |
| `/cilt-tipine-gore/{tip}` | `skinFinder.texture.dewy` |

`/urunler` kategori kısayol şeridindeki ikonlar (`urunler/page.tsx:42`) ve `kategori/...page.tsx:92` başlık ikonu: işaret olarak kalır (küçük).

### 1.4 Blog / haber kapakları
`PostCover.tsx` kâğıt kesimi yedeği yalnız gerçekten kapaksız **yeni** yazılar için kalır. Mevcut 4 kapaksız yazı fotoğraf alır:

| Yazı slug | Slot |
|---|---|
| `cevre-etiketi-yaniltmasi-nasil-anlasilir` | `blog.cover.cevre-etiketi-yaniltmasi-nasil-anlasilir` |
| `atik-ayirma-ve-geri-donusum-rehberi` | `blog.cover.atik-ayirma-ve-geri-donusum-rehberi` |
| `pil-ayirma-ve-geri-donusum` | `blog.cover.pil-ayirma-ve-geri-donusum` |
| `cevre-dostu-ev-icin-basit-adimlar` | `blog.cover.cevre-dostu-ev-icin-basit-adimlar` |

Öncelik: `post.cover` (veri) > `blog.cover.<slug>` (stok) > kâğıt kesimi yedeği.

### 1.5 Kabuk
| Alan | Bugün | Yeni |
|---|---|---|
| Mega menü tanıtım karosu | `PromoTile.tsx:53` `PatternLeafVeinEmboss` | `promo.mega` foto + scrim (gold varyantı `premium.gold.2`) |
| Mega menü mobil kök kapağı | `category.<kök>` | değişmez |
| Footer | `footer.texture` | değişmez |
| Sepet drawer boş durumu | SVG | SVG kalır (boş durum) |

### 1.6 Yaşam/doku havuzu (serbest kullanım, tekrar etmeden)
`nature.maple-sun`, `nature.sunbeam-leaf`, `nature.sunlit-branch`, `nature.bright-sky`, `lifestyle.bathroom`, `lifestyle.window-plant`, `lifestyle.cleaning`, `texture.cream`, `texture.water-green`, `texture.water-blue`. Önerilen: `/sss` grup başlıkları arası bant (`texture.water-blue`), PDP "Kullanım" bölümü yanında kategoriye göre `lifestyle.bathroom` (vücut/hijyen) / `lifestyle.cleaning` (ev) / `texture.cream` (cilt) — PDP'de ürün görselinden **ayrı** sütunda, ürünle karışmayacak şekilde; 404 sayfasında değil.
**Tekrar kuralı:** aynı slot bir sayfada bir kez; aynı fotoğraf ana sayfada iki bölümde görünmez.

## 2. Pin sahnesi (hareket-tasarimcisi için, K-257/K-265)
| Panel | Slot | Boyut | Odak noktası |
|---|---|---|---|
| PV | `door.pv.tall` | 1502×2000 | yaprak orta-alt; metin alt %35 scrim |
| Cilt tipi | `door.finder.tall` | 1500×2000 | kâse üst-sol; aloe alt — metin için alt scrim %75 |
| Premium | `door.premium.tall` | 1333×2000 | dal sağ-orta; zemin koyu, metin doğrudan (scrim yine zorunlu) |
| Üye ol | `door.membership.tall` | 1600×2000 | üç el merkez; açık zemin → scrim %75 |
| Haberler | `door.news.tall` | 1333×2000 | kupa orta; pencere üst |
Önerilen derinlik: fotoğraf panel içinde `scale 1.12` ile kırpılır, pin ilerlemesine bağlı ±6% yatay paralaks (fotoğraf, metin değil). Azaltılmış hareket anahtarında (K-264) paralaks yok, fotoğraf sabit.

## 3. SVG yerleşimi — yalnız boş alan, hareketle aktif (K-271)
Tetik sözlüğü: **imleç** = bölüm `pointermove` yakınlık (≤ 240 px) ya da hover; **kaydırma** = bölüm görünür alandayken kaydırma ilerlemesi (ScrollTrigger `scrub`). Kendiliğinden döngü yok; dokunmatikte kaydırma tetiği çalışır, imleç tetiği çalışmaz; "Hareketi azalt" açıkken statik ve eksiksiz.
Yoğunluk: ekranda en çok 1 büyük SVG + 1 desen; SVG asla metin, fiyat, karo veya fotoğrafın üstüne binmez (z-index arkada, `pointer-events: none`, `aria-hidden`). < 1024 px'te boş kenar yoksa SVG render edilmez (CSS `hidden lg:block`).

| Sayfa · yer | Boş alan | Çizim (`src/components/illustrations/`) | Tetik → davranış |
|---|---|---|---|
| Ana sayfa · Raf duvarı başlığının sağı | başlık satırındaki boşluk (≥ 1280 px) | `SceneHeroBotanical` (küçük, 240 px) | imleç → `sway` (yapraklar imlece doğru eğilir) |
| Ana sayfa · Vitrin 1 ile Kapılar arası | bölüm geçiş boşluğu | `DividerLeafVine` | kaydırma → `draw` (damar çizgisi kaydırmayla çizilir) |
| Ana sayfa · Vitrin 2 sağ/sol gutter | `max-w-page` dışındaki kenar (≥ 1440 px) | `PatternLeafLines` dikey şerit | kaydırma → `parallax` (y ±40 px) |
| Ana sayfa · Marka duvarı altı | footer öncesi boşluk | `SceneMembership` (dekor yaprakları) | imleç → `scatter` |
| `/blog`, `/haberler` · liste sonu | son satır kartlarından sonra kalan boşluk / sayfalama yanı | `SceneBlog` | kaydırma → `bloom` (son satıra gelince açılır) |
| `/blog/[slug]`, `/haberler/[slug]` · makale yan gutter | 65ch makale sütununun sağı (≥ 1280 px) | `DividerLeafVine` (dikey) + `PatternSeedDots` | kaydırma → `draw` (okuma ilerlemesiyle yaprak damarı uzar) |
| `/sss` · soru listesi sağ sütun | akordeon sütununun sağı (≥ 1024 px, sticky) | `SceneFinderLeaves` | imleç → `sway`; açık akordeon değişince `bloom` (bir kez) |
| `/pv-nedir`, `/uye-ol`, `/hakkimizda` · bölüm başlıkları arası | bölümler arası `section` boşluğu | `DividerWave` / `DividerLeafDiamond` (`dividers.tsx`) | kaydırma → `draw` |
| `/cilt-tipine-gore` · seçim yapılmadan sonuç alanı | sonuç boşken | `SceneFinderLeaves` (boş durum) | imleç → `sway` |
| Liste sayfaları · sonuç yok / filtre boş | boş durum | `empty-states.tsx` | imleç → `bloom` |
| 404, "çok yakında", yasal yakında | sayfa gövdesi | `ComingSoonIllustration` | imleç → `parallax` |
| Kapılar pin sahnesi | **yok** — paneller fotoğraf | — | SVG sahneleri (`SceneMembership`, `SceneBlog`) buradan çıkar |
| PageHero görsel sütunu | **yok** — fotoğraf | — | `HeroArt`/`SceneHeroLeaves` buradan çıkar |

## 4. Kabul ölçütleri (kalite-denetcisi)
- Yukarıdaki §1 tablolarındaki her alan fotoğraf gösteriyor; `SceneHeroLeaves`, `SceneBlog`, `SceneMembership`, `SceneFinderLeaves`, `SceneHeroBotanical` yalnız §3'te listelenen yerlerde.
- Fotoğraf üstü her metin bölgesinde ölçülen kontrast ≥ 4.5:1.
- Her sayfada stok görsel aktarımı: ilk ekran ≤ 500 KB (K-097); `/` için Kapılar dikey fotoğrafları `loading="lazy"`.
- Kayıtsız görsel yok: `public/images/stock/` içindeki her dosya `gorsel-kaynaklari.md`'de.
