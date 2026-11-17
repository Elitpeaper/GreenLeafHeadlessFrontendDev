# Brief: Ana sayfa v2 "Maksimalist" (K-233, K-234)

> ui-tasarimci · v2.1 · 2026-11-17 (v2.1: K-184 inceleme düzeltmeleri §2.2, §2.3 L6, §6, §13) · `briefler/ana-sayfa.md` v1'in **yerini alır** (v1 yalnız tarihçe olarak durur).
> Bağlayıcı kararlar: K-233, K-234, K-172, K-178, K-186…K-189, K-231, K-102, K-036/K-041, K-062, K-095, K-097. Öneriler: **K-235…K-242** (KARAR-KAYDI).
> Kurallar `tasarim-kurallari.md` **v1.3** (§15 maksimalist kapsam), token'lar `tokens.json` **v1.3.0** (yalnız ekleme).
> Hareket yalnız yer olarak işaretlenir (⟡). Zamanlama ve eğri hareket-tasarimcisi'ne aittir. Tüm hover değişimleri yaklaşık 0.25 s geçişlidir (K-231).
> Metinlerdeki tırnaklı başlıklar **çalışma metnidir**. Son hâli icerik-editoru verir (`home.*` anahtarları).

## 0. Konsept: "Büyüyen şerit"
Brandbook'un iki imzası sayfanın omurgasını oluşturur: **yeşil-lime-mavi çizgi bandı** ve **yaprak**. Maksimalizm bu ikisini **ölçekle** kurar, rastgele süs eklenmez:
- Çizgi bandı hero'nun altında 24 px'lik bir imzadan **288 px'lik tipografik bir şeride** büyür (§2).
- Yaprak, referans dilinin (K-185) kâğıt kesimi katmanlarıyla kolaja dönüşür: fotoğraf, kâğıt yaprak, packshot ve dev yazı üst üste biner.
- Tipografi dev boyuttadır (`ultra` 56→136, `colossal` 96→288 dekor). Renk blokları cesurdur: orman, lime, mavi, krem, kum ve toprak.

**Neden:** Rakip distribütör siteleri tek ölçekli şablonlardır (MEMORY §8). Ölçek kontrastı ve katman derinliği ilk bakışta "özel yapım" mesajı verir. Kaynak marka imzası olduğu için sonuç "muted botanical" ya da yabancı bir estetik olmaz (K-234: referans dili ve marka renkleri korunur).

**Değişmezler (maksimalizm bunlara dokunmaz):** fiyat, üye fiyatı rozeti ve PV her zaman açık yüzeyde ve beyaz kartta durur (K-036, K-062). Birincil düğme açık zeminde green-700, orman zeminde krem haptır. Odak halkası blue-700'dür. Gerçek metin fotoğraf veya kâğıt katman üstüne gelmez. AA kontrast her gerçek metinde hesaplanmıştır. Logo çizimi değişmez (yalnız K-233 hareketi). AI görseli kullanılmaz (K-102). Kazanç içeriği ana sayfada yer almaz (K-099).

## 1. Sıra ve zemin ritmi
| # | Bölüm | Zemin | Yükseklik (1440 / 390) |
|---|---|---|---|
| 0 | Header (değişmez) | beyaz | 104 / 64 |
| 1 | **Hero "Mühür"** (K-233 + K-172) | `forest-hero` + grain | `100svh − header` (en az 640 / 600) |
| 2 | **Dev şerit** | brand-green / lime / blue satırları | 288 / 168 |
| 3 | **Raf duvarı** (kategoriler) | cream-50 | ≈ 640 / ≈ 900 |
| 4 | **Vitrin 1** "Türkiye'de satışta" (Z3) | beyaz → `--accent-soft` | içerik |
| 5 | **Kapılar** (tanıtım bentosu, K-178) | `forest-radial` + emboss | ≈ 760 / içerik |
| 6 | **Vitrin 2** "Keşfet" (sekmeli, Z3) | cream-50 | içerik |
| 7 | **Marka duvarı** | brand-lime blok | ≈ 360 / ≈ 300 |
| 8 | Footer (değişmez, K-189) | `forest-deep` | — |

Ritim kuralı karşılanır: iki orman bölümü yan yana gelmez (1 ile 5 arasında açık bölümler, 8'den önce lime var).

## 2. Hero "Mühür" (K-233)

### 2.1 Öneri: kalıcı sahne + dönen kolaj (K-172 ile K-233 birlikte)
K-172 (çok slaytlı swiper) ONAYLI ve K-233 onu iptal etmiyor. Bu yüzden **ikisi tek sahnede birleşir**:
- **Kalıcı katman (slayt değildir):** orman zemini, grain, dev dekor kelime, **logo işareti** ve slayt kontrolleri. Bunlar slayt değişince yerinde kalır, logo yalnız bir kez girer.
- **Dönen katman (5 slayt):** sol metin bloğu (eyebrow, başlık, gövde, CTA) ve sağ kolaj. Slayt 1'in başlığı sayfanın tek `h1`'idir. Diğer slaytlar `h2` olur ve çapraz geçişle gelir (opacity girişi yalnız slayt 1'e özeldir).
- **Otomatik geçiş** giriş koreografisi bittikten **sonra** başlar ve slayt 1'de en az 7 sn bekler. Mevcut saat kuralları korunur (K-205: hover, odak, durdur düğmesi, ekran dışı, sekme gizli).
- **Alternatif** (`?hero=static`, önizleme için): swiper olmadan tek, statik "Mühür" hero. Slayt 2–5'in konuları zaten Kapılar bentosunda (§6) bulunur. Kullanıcı Kapı 2'de seçer (S-067).

### 2.2 Logo (K-233)
- **Dosya:** resmî `public/brand/greenleaf-mark.svg`. Kendi beyaz diski olduğu için orman zeminde de "beyaz zemin üstünde logo" kuralı (§9.3) korunur. Dosya yeniden çizilmez, renklendirilmez, kırpılmaz. Tam yatay kilit header'da zaten görünür. Hero'da wordmark'ı ayırmak dosyayı değiştirmek anlamına geleceği için yapılmaz.
- **Neden işaret:** "dönerek soldan gelme" hareketi yuvarlak işarette fiziksel olarak tutarlıdır (yuvarlanma). 913 × 184 oranındaki yatay kilidin dönmesi pervane gibi görünür ve okunmaz.
- **Yer:** metin sütununun sol üstü, eyebrow'un üstü (v2.1, K-184: eyebrow'un işaretin sağında ve dikey ortada durması da kabul — uygulanan hâl). Sol kenarı H1'in sol kenarıyla hizalıdır. Boyut **136 px** (1440) / **88 px** (390). Altında 24 / 16 px boşluk bırakılır. Gölge `shadow.badge` (sol üst ışık). Bağlantı değildir (`aria-hidden`; erişilebilir ad header logosundadır).
- **Son poz:** 0° dikey ve tam opak, resmî çizimle birebir aynı. Döngüye girmez, hover'da dönmez.
- **Varyant** (`?heroLogo=lockup`): tam yatay kilit beyaz hap plakada (yükseklik 72, iç boşluk 20/32). Dönme yerine yalnız −8° → 0° eğilerek soldan kayar. Öneri: işaret.

### 2.3 Düzen 1440 × 900 (hero ≈ 796 px; `container.wide`, 12 sütun, gutter 32)
Katmanlar arkadan öne:
| z | Katman | Yer | Ayrıntı |
|---|---|---|---|
| L0 | Zemin | tam | `gradient.forest-hero` + `TextureGrain` 0.12 |
| L1 | Dev dekor kelime | alt kenara taşan, sola yaslı | "DOĞA" `colossal` 288 px, yalnız kontur (`typeStroke.outline-on-forest`), `aria-hidden`, metin arkasında değil, kolajın arkasında |
| L2 | Fotoğraf çerçevesi | sütun 8–12, üst 64 | stok foto `home.hero.1`, 520 × 640, `radius.panel`, sol alt köşe `2xl`, **−3°**, `shadow.long` |
| L3 | Kâğıt yapraklar | çerçevenin sol ve alt kenarından taşan | `SceneHeroLeaves` (≈ 46 %'ü görünür, `slice`) ya da 2 `PaperLeaf` (lance sand + oval deep) |
| L4 | Packshot çıkartmaları | çerçevenin önü, 3 adet | resmî packshot, cream-50 podyum diski (Ø 168 / 140 / 120), **+4° / −2° / +6°**, `shadow.sticker`. Her birinde beyaz plaka üstünde PV çipi. Fiyat yok (v1 hero istisnası sürer, K-062) |
| L5 | Metin bloğu | sütun 1–7 | logo işareti → eyebrow `xs` lime-200 + inline bant → **H1 `ultra`** (136 px, Jost 700, 0.9, −0.045em, cream-200, en çok 3 satır, satır başına ≤ 10 karakter) → gövde `lg` cream-100 (≤ 34ch, 2 satır) → krem hap CTA 56 px + ikincil bağlantı "Üye ol" (cream-100, alt çizgili) |
| L6 | Kontroller | sol alt, şeridin 24 px üstü | noktalar + ilerleme + durdur (mevcut HeroSwiper). Oklar sağ altta, 48 px krem daire. **v2.1 (K-184):** ≥ 1024'te kontrol hapı + oklar kolajın alt kenarında sağda birlikte durabilir (uygulanan hâl kabul edildi: krem hap fotoğraf üstünde ama metin taşımaz) |

- Hero'nun altında **ayrı imza bant yoktur**. Altındaki Dev şerit (§3) bandın kendisidir ve "bir ekranda tek bant" kuralı korunur.
- Çalışma başlığı: "Doğadan / gelen / bakım." Bitişte nokta bulunur ve bu nokta lime-200 renkte bir `span` olur (noktalama işaretidir, `aria-hidden` değildir). brand-lime kullanılmaz: forest-600 köşesinde 2.60 kalır.
- H1 kolaja **taşmaz**. Sütun 7 ile 8 arasında en az 32 px boşluk kalır. Taşma yalnız L1 dekor kelimeyle olur.

### 2.4 Düzen 390 × 844 (hero ≈ 780 px)
- Üst ≈ %62'de (≈ 490 px) metin bulunur: işaret 88 (sol) → eyebrow → H1 `ultra` 56 px, 3 satır → gövde `base` 2 satır → CTA tam genişlik 52.
- Alt ≈ %38'de (≈ 290 px) kolaj bulunur: çerçeve sağa taşar (genişlik 78 %, 4:5 `home.hero.1` mobil kırpımı, −3°), 2 packshot çıkartması (Ø 112 / 96) ve 1 kâğıt yaprak bulunur. Dekor kelime "DOĞA" 96 px olur ve kolajın arkasında yer alır.
- Kontroller kolajın üstünde değil, kolajla CTA arasında, sola yaslı durur.

### 2.5 Slaytlar (yalnız dönen katman değişir)
| # | Kolaj | Renk bloğu (L1.5, kolaj arkası) | CTA |
|---|---|---|---|
| 1 | `home.hero.1` + 3 TR packshot | yok | Türkiye'de satıştakileri gör |
| 2 | `home.hero.2` + 3 TR packshot (tekrarsız) | sand-300 yaprak lekesi | Tümünü gör |
| 3 | Premium: `ThemeScope premium-gold`, `ScenePremiumFrame` + gold set packshot + `premium.gold.1` | forest-950 + altın varak çizgi | `gold-button` |
| 4 | PV: `BadgePv` Ø 240 + 3 packshot (PV çipleri) + `pv.scene` | brand-lime daire Ø 520 | PV nedir? |
| 5 | Cilt tipi: `skinFinder.hero` + `BadgeDrop` + 5 doku çipi | brand-blue daire Ø 520 | Cilt tipime göre bul |

Metin her slaytta orman zeminde kalır. Lime ve mavi bloklar yalnız kolajın arkasında olur, metne değmez. v1'deki açık zeminli PV/bulucu slaytları kaldırıldı (cream-200 başlık açık zeminde okunmaz).

### 2.6 Giriş (K-233; ⟡ yalnız yer)
- ⟡ H-1 işaret soldan ekran dışından dönerek yerine gelir → ⟡ H-2 H1 CSS `animation` ile opacity 0→1 → ⟡ H-3 eyebrow, gövde ve CTA kademeli → ⟡ H-4 kolaj katmanları derinlik sırasıyla oturur → ⟡ H-5 Dev şerit satırları soldan dolar.
- **Bütçe önerisi:** H-1 ≤ 900 ms. H-2, işaret oturmadan 200 ms önce başlar ve 600 ms sürer. Toplam ≤ 1,6 sn. JS'e bağlı olmaz (saf CSS). `animation-fill-mode: both` olur, JS yoksa son poz görünür.
- **LCP:** H1 LCP adayıdır. Opacity 0 iken sayılmaz, bu yüzden LCP ≈ fade başlangıcı olur. Hedef: mobil 4G'de LCP ≤ 2,5 sn kalır. Ölçümde aşılırsa önce H-1 600 ms'ye kısaltılır, H-2 300 ms'de başlar. Hero fotoğrafı `priority` kalır.
- **Azaltılmış hareket (K-231):** dönme ve kayma yoktur. İşaret ve H1 yalnız yumuşak opaklıkla gelir.
- **Tekrar:** öneri, girişin sayfanın tam yüklenmesinde oynaması ve oturum içi istemci gezinmesiyle ana sayfaya dönüşte oynamamasıdır (S-067 b).

## 3. Dev şerit (yeni)
- Üç tam genişlik satır imza bant oranlarını (10/6/8) ×12 büyütür: **120 / 72 / 96 px** (390'da ×7: 70 / 42 / 56). Satırlar arasında 0 boşluk vardır (bant malzemesi: bitişik üç renk; ince 4 px boşluk orman ince çizgiyle gösterilir).
- Zeminler brand-green, brand-lime ve brand-blue'dur. Metin **forest-950**'dir: green 5.48 · lime 6.49 · blue 5.68 (hepsi AA normal metin eşiğini de geçer).
- İçerik büyük harfli tek satırlık tekrarlardır, `·` ile ayrılır. Boyut satır yüksekliğinin ≈ %72'sidir (86 / 52 / 70 px; mobil 50 / 30 / 40). Çalışma metni: "DOĞADAN İLHAM ·" / "TÜRKİYE'DE SATIŞTA ·" / "ÜYEYE ÖZEL FİYAT ·".
- Erişilebilirlik: görsel satırlar `aria-hidden` olur. Altında sr-only tek cümle bulunur. Mavi satırın sağ ucunda gerçek bağlantı "Hikâyemiz →" yer alır (forest-950, alt çizgili, 44 px hedef) ve `/hakkimizda`'ya gider.
- ⟡ S-1 satırlar kaydırmaya bağlı olarak zıt yönlerde kayar (otomatik oynama yoktur; WCAG 2.2.2 kapsamı dışıdır). Azaltılmış harekette durağandır.
- **Neden:** imza bant brandbook'tadır. Büyütüldüğünde hem maksimalist dev tipografi hem de "gerçek Greenleaf" olur. Gradyan ya da eğim yoktur (§9.1).

## 4. Raf duvarı (kategoriler)
- **1440:** başlık satırında solda eyebrow + H2 `display` "Raflar", sağda "Tüm ürünler →" (`/urunler`). Altında 6 sütunluk bento vardır, satır yüksekliği 168, aralık 16:
  `Cilt Bakımı` 2×2 · `Makyaj` 2×1 · `Saç Bakımı` 2×1 · `Setler` 2×1 · diğer 8 kök 1×1 (toplam 18 hücre). Boş kökler gizlenir (K-026). O zaman bento yeniden akar ve büyük hücreler korunur.
- **Karo:** `radius.tile`, `shadow.tile` yerine açık zemin gölgesi `card`. Zeminler sırayla şöyledir: tile-cream, lime-100, blue-50, green-50, sand-300 (yalnız 2×1), beyaz. İçinde kategori ikonu (`CategoryIllustration`) bulunur: 2×2'de 160, 2×1'de 96, 1×1'de 72. Ad `2xl` ink (2×2'de `3xl`), ürün sayısı `sm` ink-muted (5.50+). sand-300 karoda ink-muted 3.79 kaldığı için orada ink kullanılır (7.44). 2×2 karoda arka planda sayı `colossal` kontur dekor olur (`aria-hidden`).
- **390:** 3 sütun. Cilt Bakımı 3×1 (yükseklik 160), ardından 9 tek karo (yükseklik 120, ikon 48, ad `sm` 500 2 satır), son satırda Setler 2×1 + 1 tek karo.
- Hover/odak: karo `--accent-soft`'a, ikon `bloom`'a geçer (K-196) ve karo 4 px kalkar. Fotoğraf yoktur (K-161).
- Doku: `PatternLeafScatter` %6. Ekranda tek desen kuralı geçerlidir.

## 5. Vitrin 1 "Türkiye'de satışta" (RecolorZone Z3)
- **Başlık kolajı:** solda dev sayı = `primary.total` (`colossal`, kontur, green-700 %22 alfa, `aria-hidden`). Önünde eyebrow + H2 `display` "Türkiye'de satışta" ink yer alır. Sağda "Tümünü gör (N) →". Sağ kenardan `LeafHeartSpecimen` (green) %40 taşar.
- **Izgara:** 1440'ta 4 × 2 ürün kartı (K-200 v2 aynen). 390'da ray, 1,25 kart görünür (mevcut). Kart **beyaz** kalır, fiyat, üye fiyatı ve PV eksiksizdir.
- Zemin beyazdır. Hover-recolor zemini `--accent-soft`'a alır, header bandı da eşlik eder (K-191). Kolaj sayısının konturu `--accent-decor`'u izler.
- Tekrarsız ve yalnız görselli ürünler (K-008, K-153), `regulated` yok (K-095).

## 6. Kapılar (tanıtım bentosu, K-178)
- **Zemin:** `forest-radial` + `PatternLeafVeinEmboss` 0.6. Başlık: H2 `display` cream-200 "Daha fazlası", eyebrow lime-200.
- **1440, 12 sütun × 2 satır (satır 320, aralık 20):**
| Karo | Hücre | Zemin | Kolaj | Metin |
|---|---|---|---|---|
| PV | sütun 1–5, satır 1–2 | `tile-sand` | "PV" `colossal` earth-900 (dekor, karonun üst yarısı) + `BadgePv` 120 + 2 packshot çıkartması (beyaz plakada PV çipi) | başlık `3xl` earth-900 (6.30) |
| Cilt tipi | 6–9, satır 1 | `tile-green` | `skinFinder.texture.dewy` yuvarlak çerçeve Ø 200 (−4°) + `BadgeDrop` | cream-100 / beyaz |
| Premium | 10–12, satır 1–2 | `premium-gold` (forest-950 + altın çizgi) | `ScenePremiumFrame` + gold set packshot | cream-200, bağlantı altın hap |
| Üye ol | 6–7, satır 2 | `tile-earth-deep` | `SceneMembership` | beyaz (8.12) |
| Haberler | 8–9, satır 2 | `tile-cream` | `SceneBlog` | ink |
- **390:** tek sütun, sıra PV (yükseklik 360) → Cilt tipi → Premium → Üye ol → Haberler (her biri ≥ 240).
- **Pin kapalı masaüstü (K-260 azaltılmış hareket veya pin koşulu yok, ≥ 1024) — v2.1, K-184:** ızgarada **boş hücre kalmaz**. Yukarıdaki 12 sütun × 2 satır bento tablosu aynen kullanılır. Bir kapı eksikse (ör. premium yok) kalanlar 12 sütunu eşit doldurur. 3 + 2 dizilimli 3 sütunlu ızgara yasak (sağ altta 1/3 genişlikte boş alan bırakıyor). 768–1023: 2 sütun, PV ilk satırda tam genişlik.
- **Neden kritik:** Windows'ta "Animasyon efektleri" kapalı olan makinelerde (S-060) site varsayılan olarak bu düzeni gösterir; kullanıcının ilk göreceği Kapılar hâli büyük olasılıkla budur.
- **Katman:** bir `LeafSkeletonSpecimen` (sand) PV ile Cilt tipi karolarının kesişimine iğnelenir (`pointer-events: none`, metin alanına değmez, z karoların üstünde). Karolar 0°'dir. Yalnız fotoğraf ve packshot çıkartmaları ±4° döner (metin dönmez).
- Her karo tek `<a>`'dır. Fiyat yoktur. "Çok yakında" durumları K-182'ye göredir (haberler hazır değilse bağlantısız + rozet).
- Hover: karo kalkar (`shadow.tile-hover`), rozet `spin` olur, sahne SVG'si kendi etkileşimini (`bloom`/`draw`) oynatır, ok 3 px kayar.
- v1'deki /hakkimizda fotoğraf karosu düşürüldü. Hakkımızda bağlantısı Dev şeritte (§3) yer alır.
- **v2.2 (2026-11-17):** (a) Pin kapalı ≥ 1024 bentoda orta 4 iz `2fr` (PV 441, Cilt tipi 638, Premium 257, Üye ol / Haberler 309 px @1440; satırlar `minmax(20rem, auto)`) — hareket-tasarimcisi K-184 Y-2 sapması **onaylandı** (metin taşmasını önler). (b) **K-270/K-271:** karo "Sahne" sütunundaki SVG sahneler (`SceneMembership`, `SceneBlog`, FinderArt/PremiumArt kâğıt katmanları, `LeafSkeletonSpecimen` iğnesi) yerini fotoğrafa bırakır: pin modunda `door.*.tall`, bento/şerit modunda aynı fotoğrafın 4:5 / 1:1 kırpımı; metin alt scrim (forest-950 ≥ %70) üstünde. Ayrıntı: `fotograf-ve-svg-yerlesim.md` §1.1, §2. Hover'da sahne SVG etkileşimi yerine foto yakınlaşma (1.06). (c) K-267: Dev şerit (§3) kalktı; "Hikâyemiz →" metin bağlantısı Kapılar bölümünün altına taşınır.

## 7. Vitrin 2 "Keşfet" (sekmeli, Z3)
- Zemin cream-50 + `TextureGrain` 0.06. H2 `display` "Keşfet". Sekmeler büyük haplar olur (56 px, `lg` 600, solda 24 px kategori ikonu). Seçili sekme `--accent` dolgu alır.
- Izgara 1440'ta 4 × 2, 390'da 2 sütun 4 kart + "Tümünü gör". Kartlar beyaz kalır, Vitrin 1 ile tekrar etmez.
- Başlığın sağında, sekmeye göre değişen dev kategori ikonu (`CategoryIllustration` 200, `aria-hidden`) bulunur. Sekme değişince ⟡ V-1 ikon çapraz geçiş + `bloom` oynar.

## 8. Marka duvarı
- Zemin **brand-lime** düz blok. Başlık H2 `3xl` forest-950 "Markalar" (6.49).
- Mevcut Marquee 2 satır kalır, ancak öğeler büyür: `3xl` Jost 600, büyük harf, forest-950 metin, hap çerçeve forest-950 %30. Hover/odakta cream-50 dolgu (forest-900 metin 11.78). Bağlantılar `/arama?marka=…` (mevcut). Durdur düğmesi ve azaltılmış harekette sarmalı ızgara korunur (K-158).
- Altında footer'ın orman levhası (K-189) üst köşe `radius.panel` ile lime üstüne biner, "kâğıt üstüne kâğıt" görünümü oluşur.

## 9. Korunanlar / düşenler
| Korunur | Düşer / değişir |
|---|---|
| Header, footer (K-189), mega menü | Hero'daki v1 açık zeminli slayt kartları (beyaz metin paneli `rounded-xl shadow-lift`) → orman zeminde doğrudan krem tipografi |
| `HeroSwiper` mekaniği (scroll-snap, saat, kontroller, `inert`, yalnız slayt 1 `priority`) | Slaytların açık PV/bulucu zeminleri (`lime-50`, `blue-50` gradyanları) → orman + lime/mavi kolaj blokları |
| Slayt 1'in H1'i, 5 slayt konusu | Hero altındaki signature bant → Dev şerit |
| `CategoryStrip` verisi (`getCategoryTree`, SVG ikonlar, K-209) | Yatay disk şeridi → Raf duvarı bentosu |
| `Showcase` + ProductCard v2, `TabbedShowcase` veri ve sekme mantığı | Vitrin başlık düzeni → başlık kolajı (dev sayı, specimen) |
| `HomeTeasers` 5 kapı ve hedefleri, K-182 davranışı | Bento ölçüleri ve zeminleri → §6 tablosu; /hakkimizda fotoğraf karosu yok |
| `Brands` Marquee + bağlantılar | Beyaz zemin ve ink-muted haplar → lime blok, forest-950 |
| `AccentZone` (Z3), `Atmosphere`/stok foto manifesti | `Manifesto.tsx`, `PvScene.tsx` ana sayfada **kullanılmaz** (K-207 sonrası zaten değil; dosyalar diğer sayfalarda kalabilir) |
| — | v1 brief'in duyuru şeridi, PV+üyelik bölümü, hikâye/sertifika satırı (K-178/K-207 ile zaten taşınmıştı) |

## 10. Hover ve etkileşimli SVG haritası (K-179, K-196)
| Yer | Öğe | `data-svg-interact` / davranış |
|---|---|---|
| Hero kolaj | `SceneHeroLeaves`, `PaperLeaf` | `parallax` (imleç, yalnız ince işaretçi) |
| Hero packshot | çıkartma | hover'da 4 px kalkma + dönüşün 0°'ye yaklaşması |
| Raf duvarı | kategori ikonu | `bloom` (karo hover/odak) |
| Vitrin başlık | `LeafHeartSpecimen` | `sway` |
| Kapılar | `IconBadge` · `ScenePv` · `SceneMembership` · `ScenePremiumFrame` · `SceneBlog` | `spin` · `bloom` · `bloom` · `draw` · `bloom` |
| Vitrin 2 | dev kategori ikonu | `bloom` (sekme değişimi) |
| Dev şerit, dev sayılar, "DOĞA" | tipografi | hover yok (yalnız kaydırma) |
Kurallar: dokunmatik ve azaltılmış harekette çizimler statik ve eksiksizdir. Renk ve opaklık geçişleri her katmanda yumuşaktır (K-231). Sürekli hareket ekranda en çok 2 tanedir: hero ilerleme saati + (ayrı ekranda) marka marquee'si (K-097).

## 11. Görsel ve varlık listesi (K-102: hepsi kayıtlı, AI yok)
- Stok: `home.hero.1/2` (+ mobil kırpım), `premium.gold.1`, `pv.scene`, `skinFinder.hero`, `skinFinder.texture.dewy`. Yeni dosya **gerekmez**.
- Packshot: `home.heroCodes` + Vitrin 1 havuzu (görselli, `regulated` değil).
- SVG: `SceneHeroLeaves`, `PaperLeaf`, `Leaf*Specimen`, `TextureGrain`, `PatternLeafVeinEmboss`, `PatternLeafScatter`, `IconBadge`/`BadgePv`/`BadgeDrop`, `Scene*`, `CategoryIllustration`. Yeni çizim **gerekmez**.
- Marka: `greenleaf-mark.svg` (hero), `greenleaf-logo.svg` (header).

## 12. Performans ve erişilebilirlik bütçesi
- İlk ekran ≤ 500 KB (K-097): hero foto (mobil ≤ 120 KB webp) + 3 packshot (≤ 40 KB) + SVG (gzip ≤ 6 KB). "DOĞA" ve dev şerit metindir, görsel değildir.
- CLS ≤ 0,1: hero yüksekliği `svh` ile sabittir. Çıktılar sabit boyutlu kutulardadır. Font `size-adjust` yedeği vardır (dev metinde kayma büyür).
- Dev dekor metin (`colossal`, dev sayı, "DOĞA") `aria-hidden` olur. Anlam taşıyan her şey gerçek metinde ayrıca bulunur. Okuma sırası: logo (gizli) → H1 → gövde → CTA → kontroller.
- Odak sırası görsel sırayla aynıdır. Döndürülmüş öğeler odak halkasını kesmez (halka `outline`'dır, dönüş yalnız görsel alt öğededir).

## 13. Kabul (görsel)
1. 1440 × 900 ve 390 × 844 ilk ekranda: logo işareti (son poz 0°), H1, CTA ve en az 1 packshot görünür. 1440'ta altta Dev şeridin üst satırı görünür; 390'da hero zaten `100svh − header` olduğundan şerit ilk ekranda zorunlu değildir (v2.1 düzeltmesi, K-184).
2. Giriş: işaret soldan dönerek gelir, H1 opaklıkla belirir. Azaltılmış harekette yalnız opaklık vardır. JS kapalıyken her şey görünür.
3. Gerçek metnin hiçbiri fotoğraf, packshot veya kâğıt katman üstünde değildir. Tüm gerçek metin ≥ 4.5:1 (büyük ≥ 3:1) oranındadır, oranlar bu brief ve §2.7'dedir.
4. Her ürün kartı beyazdır ve Fiyat + Üye fiyatı + PV içerir. Hero ve Kapılar'daki packshot'larda yalnız PV bulunur.
5. Ekranda tek bant (Dev şerit, hero bandı yok) · bir ekranda en çok 1 doku + 1 desen · ardışık orman bölümü yok.
6. 360–1440 arası taşma yoktur. `ultra` H1 360'ta 3 satırı aşmaz (aşarsa metin kısalır, boyut küçülmez).
7. LCP ≤ 2,5 sn (mobil, H1), CLS ≤ 0,1. Kapı 2 öncesi ui-tasarimci incelemesi (K-184).
