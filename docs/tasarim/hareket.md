# Hareket spesifikasyonu (motion) — v4

> hareket-tasarimcisi · v1 2026-11-16 · v2 2026-11-17 (K-170, K-171, K-179, K-183) · v3 2026-11-17 (K-231, K-232, K-233, K-234) · **v4 2026-11-17 (K-256, K-257: kütüphane geçişi)** · Dayanak: K-034, K-066, K-070, K-075, K-093, K-097 · Öneriler: K-155…K-159, K-190…K-194, K-250…K-255, **K-258…K-262**, S-057, S-060, S-061
>
> **v2 özeti:** §15 smooth scroll · §16 katmanlar ve görünür hover seti · §17 yükleme durumu · §18 interaktif SVG · §19 hidrasyon kuralı · §20 kanıt.
> **v3 özeti:** §21 K-231 yumuşak geçiş tabanı (hiçbir şey anlık açılıp kapanmaz) · §22 K-232 kütüphane kararı · §23 K-233 ana sayfa hero girişi · §24 K-234 kolaj ve derinlik · §25 kanıt.
> **v4 özeti:** §26 kütüphane geçişi: smooth scroll = Lenis, hero = Swiper.js, sabitlenen yatay "Kapılar" = GSAP ScrollTrigger; ölçümler ve kanıt. Çelişkide v4 > v3 > v2 > v1.
> Kod: `src/lib/motion/` (token, ID haritası, çalışma zamanı, yardımcılar) · `src/components/motion/` (MotionRoot, motion.css, sarmalayıcılar)
> Prototip: `/hareket-lab` (noindex; tüm noktalar gerçek veriyle) · Ekran kontrolü: `docs/qa/ekran/motion/`

## 1. İlke: hareket ne için var?
1. **Yönlendirir:** göz önce ürüne ve fiyata gider. Hero ve vitrinler hareketlidir, metin bölümleri sakindir.
2. **Geri bildirim verir:** sepete ekle, sayaç, sekme ve menü durumları her zaman bir hareketle onaylanır.
3. **Premium hissettirir:** kısa yol, yumuşak iniş, tek seferlik. Sallanma, zıplama, sürekli parıltı yoktur.

Kurallar (otomatik testle korunur, `motion-css.test.ts`):
- Yalnız `opacity`, `translate`, `scale`, `rotate`, `transform`, `stroke-dashoffset` (+ ayrık `display/overlay/visibility`) canlandırılır. Renk yalnız kayıtlı `--accent-*` değişkenleriyle geçer (hover-recolor). Layout tetikleyen özellik yoktur.
- Bireysel dönüşüm özellikleri (`translate/scale/rotate`) kullanılır. Böylece geliştiricinin kendi `transform`'u ezilmez. Kendi `translate/scale/rotate`'ünü konumlandırma için kullanan öğeye hareket bir sarmalayıcıda verilir.
- Gizli başlangıç durumları yalnız `html[data-motion="on"]` altında tanımlıdır. Bu öznitelik, ilk boyamadan önce açılış betiğiyle **yalnız** azaltılmış hareket istenmiyorsa konur. JS yoksa veya reduced-motion açıksa içerik son hâlinde görünür.
- **Logo ve 7 kümeli işaret hareket almaz** (ölçek dahil; H6 "logo ölçeği" uygulanmadı, K-157). **v3 istisnası (K-233):** yalnız ana sayfa hero girişinde logo, çizimine dokunulmadan sarmalayıcısıyla soldan dönerek gelir (§23).
- **v3 (K-231):** Renk, zemin, kenarlık, gölge, opaklık ve filtre de geçiş alır (yalnız boyama, layout yok). Hover girişi ve çıkışı hiçbir katmanda anlık değildir (§21).
- Pasif ödeme düğmesinde sallama yoktur. Yalnız açıklama satırı vurgulanır.

## 2. Token'lar
Kaynak: `src/lib/motion/tokens.ts` (JS) ↔ `motion.css :root --motion-*` (CSS). Eşitlik test edilir.

| Süre | ms | Kullanım |
|---|---|---|
| `xs` | 120 | basma geri bildirimi, ikon değişimi |
| `sm` | 200 | hover, odak, küçük durum değişimi, çapraz geçiş |
| `md` | 320 | panel, drawer, menü, sekme göstergesi |
| `lg` | 500 | bölüm/kart girişi |
| `xl` | 800 | şerit çizimi, PV sayacı, hero parçaları |

| Eğri | Değer | Kullanım |
|---|---|---|
| `out` | `cubic-bezier(0.22, 1, 0.36, 1)` | varsayılan giriş |
| `out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | uzun çizimler, hero görsel oturması |
| `in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | ambient, PV akışı, renk dönüşü |
| `in` | `cubic-bezier(0.55, 0, 1, 0.45)` | çıkışlar (drawer kapanışı, satır silme) |
| `standard` | `cubic-bezier(0.2, 0, 0, 1)` | durum değişimi, renk girişi |
| `spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | tek küçük taşma: sayaç, kalp, ✓ |

Mesafe: yükselme 24 px (küçük 8 px), kalkma 4 px, yüzme 8 px, paralaks ±24 px, mıknatıs ≤ 6 px. Kademe (stagger): 60 ms, en çok 8 öğe (sonrası aynı gecikme); kelime 35 ms; karo 40 ms.
`tokens.json › motion` (v0: 150/250/450/800) bu ölçeğe göre güncellenmelidir → ui-tasarimci'ye devir notu.

## 3. Ortak kalıplar
| Kalıp | Ne olur | Tetik |
|---|---|---|
| **Giriş (reveal)** | opacity 0→1 + 24 px yükselme, `lg/out` | görünür alana girince **bir kez** (IntersectionObserver, alt kenardan %12 içeride). Geri kaydırmada tekrar yok (KK-2-11) |
| **Kademe** | kapsayıcının çocukları (`stagger`) **veya** aynı ID'yi taşıyan kardeş öğeler (`M-7/M-9/M-14/M-18`) 60 ms arayla | ilk öğe girince tüm grup birlikte açılır (raylarda gecikme olmaz). Sıra `--i` stilinden ya da kardeş sırasından |
| **Ölçekli giriş** | opacity + `scale .96` + 16 px, 600 ms `out-expo` | bir kez |
| **Şerit çizimi** | 3 bant `scaleX 0→1` soldan, 70–90 ms kademeli | `band`: görünür olunca · `band-show`: her gösterimde · `band-first`: oturumda ilk sayfa |
| **Çizgi çizimi** | `stroke-dashoffset 1→0` (`pathLength=1`), 900 ms; dolgu parçası 400 ms sonra solar | görünür olunca |
| **Ambient** | yüzme (2 × 2,2 sn) / salınım (4,6 sn) sonra durur | görünür olunca bir kez |
| **Montaj animasyonu** | öğe DOM'a girince veya `display` açılınca (`fade-in`, `step`, `popover`, `pop`) | CSS, JS yok |
| **Panel** | `@starting-style` ile giriş, `transition-behavior: allow-discrete` ile çıkış | `[open]` / `hidden` değişimi |

Arıza güvenliği: Çalışma zamanı yüklenmezse gizli öğeler en geç 2,5 sn sonra görünür.

## 4. Nerede hareket YOK
- Fiyat, üye fiyatı rozeti, PV değeri rengi, birincil düğme dolgusu, odak halkası, durum renkleri (hata/başarı), "Türkiye'ye yakında" rozeti.
- Logo ve pinwheel işareti (döndürme/ölçek/renk yok); yükleme göstergesi olarak işaret kullanılmaz.
- Hero H1 opaklık almaz (yalnız transform; M-2). **v3: K-233 hero (M-24) başlığı opaklıkla belirir** (§23). LCP görseli hiçbir hero'da gizlenmez (yalnız ölçek oturması).
- Listeleme, ürün detay ve sepette hover-recolor yoktur (K-093). Kategori ızgarasında giriş yalnız ilk 8 kartta kademelidir.
- Form alanlarında, filtre çiplerinde, yasal sayfalarda dekoratif hareket yoktur.
- Video, otomatik oynayan karusel ve kaydırma kaçırma (scroll-jacking) yoktur. Header gizlenip yeniden belirmez, yalnız kompakt olur.

## 5. Ana sayfa noktaları (M-1…M-23)
"Reduced" sütunu `prefers-reduced-motion: reduce` içindir; tamamında içerik son hâlinde, işlev kaybı olmadan görünür.

| ID | Nokta | Süre / eğri | Tetik | Reduced | Not / işaretleme |
|---|---|---|---|---|---|
| M-1 | Header thin bandı çizimi | 900 ms `out-expo`, 90 ms kademe | oturumda ilk sayfa (`band-first`) | statik | bant kapsayıcısına `data-motion="M-1"` (H1 ile aynı) |
| M-2 | Hero girişi | toplam ≤ 1,1 sn: görsel `scale 1.06→1` 1100 · panel 28 px 700 · eyebrow 80/500 · **H1 yalnız transform** 120/700 · lead 280/500 · CTA 380/500 · güven 480/400 · packshot 300+i·90/600 · yaprak 200/700 | sayfa yüklenince (CSS, JS beklemez) | statik | kök `M-2`; parçalar `data-motion-part="media·panel·eyebrow·title·lead·cta·trust·packshot·leaf"`; packshot sırası `--motion-i` |
| M-3 | Packshot yüzmesi | 8 px, 2 × 2,2 sn `in-out`, gecikme 900 ms (+ `--motion-ambient-delay`) | görünür olunca bir kez | yok | konumlandırmayı dış öğede yap, `M-3` iç sarmalayıcıda (`<Float>`) |
| M-4 | Hero paralaksı | ±24 px, kaydırmaya bağlı (`animation-timeline: view()`), `scale 1.08` | kaydırma | yok | hedef: host içindeki `[data-motion-part=media]` ya da `img`. Desteklemeyen tarayıcıda statik |
| M-5 | Signature bant (hero altı) | 560 ms `out-expo`, 400 ms gecikme + 70 ms kademe | yüklenince (`band-show`) | statik | `<StripeGrow trigger="load" point="M-5">` |
| M-6 | LeafCluster salınımı | ±2°, 4,6 sn tek salınım, alt-orta eksen | görünür olunca bir kez | yok | `<LeafSway points={["M-6"]}>` ile sar |
| M-7 | Kategori karoları | giriş kalıbı, 60 ms kademe | grup bir kez | statik | her karoda `M-7` (+ `--i`) |
| M-8 | Hover halkası | opacity `sm` + scale `md` + rotate −60°→0 `lg` | hover (ince işaretçi) / `:focus-visible` | anlık görünür (dönüş yok) | parça `ring` + `media` (görsel 4 px kalkar) |
| M-9 | Vitrin 1 kartları | giriş, 60 ms kademe | grup bir kez | statik | her kart sarmalayıcısında `M-9` |
| M-10 | Ray kaydırma | tarayıcı `smooth` | ok düğmesi | `auto` | `railScroll(el, ±1)` (`@/lib/motion`) |
| M-11 | Hover-recolor | §9 | — | §9 | `RecolorZone kind="showcase"` |
| M-12 | Sepete ekle → "Eklendi" | etiket çıkışı/girişi `sm/md`, ✓ ikonu `spring` pop | `data-state="added"|"done"` | anlık | parça `swap > label/done` **veya** koşullu içerik (otomatik) |
| M-13 | Doku karoları yelpazesi | opacity + 24 px + `rotate 0→son açı`, 800 ms `out-expo`, 70 ms kademe | bir kez | statik | kapsayıcıda `M-13`; açıyı `rotate` özelliğiyle ver (Tailwind `rotate-*`); `transform` ile verilmişse yalnız yükselme olur |
| M-14 | Madde/kanıt girişleri | giriş, 60 ms kademe | grup bir kez | statik | her maddede `M-14` |
| M-15 | Alıntı kelime kelime | kelime başı 35 ms, `lg/out`, en çok 30 kelime | bir kez | statik | `<WordReveal text=…>` (ekran okuyucuya tek cümle). Düz metinde bütün paragraf girer |
| M-16 | İkon çizgi çizimi | 900 ms `in-out`; dolgu 400 ms sonra | bir kez | statik | `svg`'de `M-16`; çizgisi olan şekillere çalışma zamanı `pathLength=1` koyar |
| M-17 | Sekme göstergesi + içerik | gösterge FLIP `md/out`; panel `sm` solma + 8 px | `aria-selected` değişimi | anlık konum | `M-17` kapsayıcı, `[data-motion-part=indicator]` tablist içinde; hazır olana dek seçili sekme kendi dolgusunu taşır |
| M-18 | PV çiplerinin akışı | satırlar girer, 450 ms sonra çip kopyaları yay çizerek toplam kutusuna 700 ms `in-out` uçar, 140 ms aralık; kutu 1,06 pop | bölüm bir kez | yok (sayılar son hâlinde) | her satırda `M-18`; satır içinde `chip` parçası veya `pv-chip`; hedef `total` parçası yoksa bölümdeki son `M-19` |
| M-19 | Toplam sayımı | ≤ 800 ms, ease-out cubic, `tr-TR` biçimi, ondalık metinden | görünür olunca (M-18 bölümünde ilk inişte) | statik | `<NumberTicker>` veya düz metin (`data-value`/`data-count-to` isteğe bağlı) |
| M-20 | Üyelik paneli | ölçekli giriş 600 ms; içteki bant `band` | bir kez | statik | panelde `M-20`, alt kenarda `<StripeGrow trigger="view">` |
| M-21 | Rozet kalkması | 4 px `sm/out` + gölge katmanı opaklığı | hover / odak | yalnız gölge | `<HoverLift points={["M-21"]}>` |
| M-22 | Hikâye görseli paralaksı | M-4 ile aynı | kaydırma | yok | çerçevede `M-22`, içindeki `img` hareket eder |
| M-23 | Marka marquee | 48 sn/tur doğrusal, iki sıra ters yön | sürekli; hover/odakta, "Hareketi durdur" ile ve ekran dışındayken durur | sarmalı statik ızgara, kopya ve düğme gizli | `<Marquee rows=…>` |

## 6. Header (H1…H10)
| ID | Süre / eğri | Tetik | Reduced | İşaretleme |
|---|---|---|---|---|
| H1 | 900 ms `out-expo` | oturumda ilk sayfa | yok | thin bant kapsayıcısı `H1` |
| H2 | ızgara↔✕: opacity/scale `sm`, rotate ±45° `md` | `aria-expanded="true"` veya `details[open]` | anlık | düğmede `H2`, ikonlar `morph > grid, close` |
| H3 | odak halkası katmanı opacity `sm` + scale .98→1 `md` | `:focus-within` | anlık | arama sarmalayıcısında `H3`. **Genişlik canlandırılmaz** (layout) |
| H4 | sayaç `scale 1→1.32→1`, 420 ms | sayı **artınca** ve son 2 sn'de gerçek kullanıcı girdisi varsa | yok | rozette `H4`. Hidrasyon ve başka sekme senkronu pop yapmaz |
| H5 | H4 ile aynı | favori sayısı artınca | yok | `H5` |
| H6 | gölge katmanı opacity `md`; `sub` parçası varsa o satır `translate -100%` + opacity ile ana satırın altına kayar | kaydırma > 96 px aç, < 32 px kapa | anlık | yapışkan blokta `H6`. K-147 düzeninde (alt satır zaten yapışkan değil) yalnız gölge belirir. `sub` kullanılırsa zemin satırlarda olmalı. **Logo ölçeklenmez** |
| H7 | alt çizgi `scaleX 0→1`, 240 ms `out` | hover / odak; `aria-current="page"` kalıcı | anlık | bağlantıda ya da kapsayıcıda `H7` |
| H8 | yaprak glifi 16° dönüp 3 px kayar, 640 ms, döngü yok | hover / odak | yok | düğmede `H8`, glif `leaf` parçası |
| H9 | §9 (Z2) | — | §9 | `id="header-accent"` + `data-accent-zone="header"` |
| H10 | 8 px yukarı + solma `sm/in`, sonra kaldırma | kapatma | anlık | `await motionExit(el, "collapse")` sonra state |

## 7. Footer (F1…F6)
| ID | Süre / eğri | Tetik | Reduced | İşaretleme |
|---|---|---|---|---|
| F1 | şerit çizimi 800 ms | bir kez | statik | `<StripeGrow trigger="view" point="F1">` |
| F2 | 4,6 sn tek salınım | bir kez | yok | `<LeafSway points={["F2"]}>` |
| F3 | H7 ile aynı | hover / odak | anlık | `F3` |
| F4 | M-21 ile aynı | hover / odak | gölge | `F4` |
| F5 | içerik 8 px + solma 240 ms; ok 180° `sm` | `details[open]` | anlık | `details`'te `F5` veya `accordion`, ok `chevron` parçası. Yükseklik canlandırılmaz (kullanıcı girdisi → CLS dışı) |
| F6 | opacity `sm` + 12 px `md` | 1 ekran aşağıda görünür | anlık | düğmede `F6`; tıklama başa kaydırır ve odağı `#icerik`'e (veya `data-target`) taşır |

## 8. Bileşenler
| Bileşen | Hareket | İşaretleme |
|---|---|---|
| Ürün kartı | hover: kart 4 px kalkar, görsel `scale 1.04` 600 ms, üst bant `scaleX .4→1` + solma; kalp pop (`spring`); iskelet parıltısı (yalnız yükleme sırasında) | kökte `card` veya `data-product-card`; `card-media`, `card-band`; kalp `pop`/`fav-pop`; iskelet `skeleton` |
| Mega menü | panel `opacity sm` + 8 px `md`, kapanış 160 ms `in`; kök değişimi `fade-in` 200 ms; karolar yalnız ilk açılışta 40 ms kademe; karo görseli hover'da 1.05; kök çubuğu gösterge (M-17 mantığı); alt bant `band-show`; mobil çekmece `drawer-left`, seviye 2 `slide-panel` (`data-motion-dir="back"` geri) | panelde `megamenu` (`hidden` ile aç/kapa veya `details`), `tile` + `media` parçaları |
| Sepet drawer | giriş 320 ms `out`, çıkış 240 ms `in`; karartma 200 ms; üst bant `band-show`; eklenen satır `flash` (1,4 sn mavi zemin vurgusu); adet/toplam `tick` (220 ms 0,3 em yükselme); satır kaldırma `motionExit(el,"collapse")`; pasif ödeme düğmesine basınca açıklama vurgusu `nudge-note` (sallama yok); boş durum `reveal` | `<dialog data-motion="drawer">` |
| Filtre paneli (mobil) | alttan 320 ms, çıkış 240 ms | `<dialog data-motion="filter-sheet">` |
| Cilt bulucu | soru geçişi `step` 32 px + solma `md` (geri: `data-motion-dir="back"`); ilerleme `progress > bar` (`--progress`); ✓ `pop` (montajda); sonuç çapraz geçişi `fade-in` 200 ms; profil kartı `reveal-scale`; rutin adımları `stagger`; doku ambient'i `sway` | — |
| PV sayfası | hero çipi `reveal-scale` + `M-19`; halka vurgusu `draw`; akış M-18 | — |
| Premium tema | varak çizgileri ve `CornerFlourish` `draw`; tek parıltı `glint` (300 ms gecikme, 1,2 sn, bir kez); packshot `premium-packshot` (sınırlı yüzme); premium kart hover çerçeve parıltısı `glint-hover` | — |
| PDP | galeri `fade-in`; yapışkan satın alma çubuğu `slide-panel` + `data-state` (kendi geçişi korunur); SSS `accordion` | — |

## 9. Hover-recolor zamanlaması (K-066, K-075, K-093)
Çalışma zamanı her `[data-accent-zone]`'u global olay delegasyonuyla yönetir. Bileşende kod veya hook gerekmez (`<RecolorZone>` sunucu bileşenidir).

| Değer | Süre | Neden |
|---|---|---|
| Niyet gecikmesi (ilk kart) | **120 ms** | rayın üstünden geçen fare bölgeyi boyamaz |
| Karttan karta geçiş | **60 ms**, doğrudan yeni palete (varsayılana dönmeden) | akıcılık; WCAG 2.3.1 yanıp sönme yok |
| Bırakma gecikmesi | **200 ms** | kartlar arası boşlukta ve kısa çıkışlarda titreme yok |
| Z1 menü + Z2 header | giriş 320 / dönüş 420 ms; **aynı anda** aynı süre ve eğriyle | menü hızlı bir UI yüzeyi |
| Z3 vitrinler (+ önizleme: hero, sahne) | giriş 480 / dönüş 640 ms | büyük tint alanı, sakin |
| Eğri | giriş `standard`, dönüş `in-out` | — |

Kurallar:
- Aynı kartın alt öğelerinde zamanlayıcı yeniden başlamaz. En son girilen kart kazanır. Aktif palete dönüş bekleyen değişimi iptal eder. Bunlar birim testtedir (`recolor-scheduler.test.ts`).
- Kartlar arası boşluk rengi değiştirmez. Paletsiz kart (`data-accent-trigger` ile işaretli) 200 ms sonra marka temasına döndürür (premium-tema §B5).
- Klavye `:focus-visible` gecikmesiz tetikler, odak bölgeden çıkınca 200 ms sonra döner. Dokunmatik (`pointerType: touch`) asla tetiklemez. `prefers-contrast: more` ve `forced-colors` altında kapalıdır.
- Reduced-motion: **v3 (K-231): yumuşak geçiş**, tam katmanla aynı bölge süreleri (renk hareket değildir). v2'deki "anlık" ve v1'deki "devre dışı" geçersiz.
- K-093: **v2 varsayılan açık** — vitrin hover'ı header bandını ve header ışımasını da boyar; `?recolorHeader=0` kapatır.
- "Nefes": bölgedeki `[data-motion-part="breathe"]` (köşe LeafCluster) her yeni palette 640 ms `scale 1→1.04→1` yapar.
- Bölge bir gezinmeyle DOM'dan kalkarsa (menüden ürüne tıklama), bağlı header otomatik olarak marka temasına döner.
- Hook kullanan bölge (`useAccentZone`) varsa `data-accent-zone="manual"` yazılmalıdır, aksi hâlde iki sistem aynı değişkenleri yazar (devir notu).

**Kontrast test planı (`--accent-text` ≥ 4.5):**
1. Birim: `palette.test.ts` 4 örnek palette varsayılan↔palet ve palet↔palet geçişlerini t = 0/.25/.5/.75/1'de sRGB **ve** Oklab ara değerlerinde ölçer (frontend-mimar; geçiyor). Karttan karta doğrudan geçiş de kapsanır.
2. Veri: yayın öncesi `resolvePalette` 4.6 hedefini karşılamayan paleti `null` yapar → o kart hiç tetiklemez.
3. Tarayıcı: `docs/qa/ekran/motion/_ekran-kontrol.mjs` geçiş öncesi, 80 ms'de (niyet gecikmesi içinde değişmemeli), oturmuş, karttan karta ve bırakma sonrası `--accent-soft` değerlerini kaydeder (`olcum.json`).
4. Elle (kalite-denetcisi): Chrome DevTools › Rendering › "Emulate CSS prefers-reduced-motion / prefers-contrast", Sensors › touch; her biri için renk değişmediğini doğrula.

## 10. WCAG 2.2.2 kararı (K-158)
**Seçim: ambient hareketler ≤ 5 sn'de kendiliğinden durur; tek sürekli hareket olan marquee görünür "Hareketi durdur" düğmesi taşır.**
Gerekçe: 40+ kitle için her bölüme durdurma düğmesi koymak görsel gürültü yaratır. Kısa, tek seferlik ambient hareket hem kuralı karşılar hem de premium sakinliği korur. Ekranda aynı anda sürekli hareket sayısı en fazla 2'dir: marquee'nin iki sırası. Marquee ekran dışındayken durur. İskelet parıltısı yalnız yükleme sürer.
Ölçüler: yüzme 2 × 2,2 sn = 4,4 sn · salınım 4,6 sn (testte ≤ 5000 ms).
**Giderildi (2026-11-17, K-184 O-6):** `.anim-float` ve `.anim-ping` silindi (kullanan yoktu); `.anim-sway` tek salınım (4,2 sn, başlangıç ve bitiş 0°, eski negatif `--d` fazları 0–0,6 sn kademeye çevrilir, küme 4,8 sn'de durur). Gezinme göstergesindeki `BrandLoader` döngüsü yalnız gezinme beklerken oynar. Ölçüm: `/` ve `/urunler` tam katmanda 5,5 sn sonra çalışan sonsuz animasyon **0** (`docs/qa/ekran/k184-kapilar/_sonuc.txt`). Tarihçe: `globals.css` v0'daki `.anim-float`, `.anim-sway`, `.anim-ping` sonsuz döngülüydü. `LeafCluster` her yaprakta `anim-sway` kullanır. `HomeHero`, `anim-float`/`anim-pop`/`anim-rise` kullanır. Bunlar kaldırılmalıdır (devir notları). `data-motion` kuralı aynı öğede v0 sınıfını ezer ama yalnız çalışma zamanı devreye girdikten sonra.

## 11. Kütüphane kararı (K-155; v3 yeniden değerlendirmesi §22)
**Kütüphane yok.** CSS (keyframes, transition, `@starting-style`, scroll-driven animations) + WAAPI + ~200 satır çalışma zamanı.
- Motion/Framer Motion (~18–35 KB gz) ve GSAP (~25 KB+) hiçbir noktada gerekmedi. FLIP gösterge, PV akışı ve sayaç WAAPI ile birkaç satırdır.
- Sunucu bileşenleri istemciye çevrilmez. Tek istemci adası `MotionRuntime` (null render eder).
- Ölçülen boyutlar (üretim derlemesi): motion CSS **≈ 3,9 KB gz** (ayrı parça); çalışma zamanı ve bağımlılıkları küçültülmeden **≈ 7,2 KB gz**, küçültülmüş tahmini ≈ 4,5–5 KB gz. Bütçe: JS ≤ 8 KB, CSS ≤ 6 KB (`tokens.ts › BUDGET`). **v2:** CSS 6,25 KB gz ölçüldü, JS (çalışma zamanı + smooth scroll + SVG) ortak parçada ≈ 9 KB gz tahmini → bütçe JS ≤ 10 KB, CSS ≤ 7 KB (K-194). Smooth scroll için Lenis yerine kendi motorumuz (§15).
- Sayfa geçişi (View Transitions): bu sürümde **yok**. App Router'da `experimental.viewTransition` gerekir (frontend-mimar konfigürasyonu). Ucuz ama Kapı 2 önizlemesinden sonra değerlendirilmeli (S-057).

## 12. Performans bütçesi ve ölçüm yöntemi
| Ölçüt | Hedef | Yöntem |
|---|---|---|
| CLS | 0 (≤ 0,1 kabul) | `PerformanceObserver('layout-shift')` (kontrol betiği); hareketin tamamı transform/opacity, akış hayaletleri `position:absolute` |
| LCP | animasyonsuz sürümle ±100 ms | DevTools Performance: `?motion=off` ile karşılaştır (H1 ve hero görseli hiç gizlenmez) |
| INP | ≤ 200 ms | `pointerover` işleyicisi yalnız zamanlayıcı kurar; renk geçişi CSS'te. Event Timing'de 104 ms üstü olay yok |
| Kare süresi | p95 ≤ 16,7 ms (orta sınıf dizüstü) | rAF örnekleyici (`window.__frames`), geçiş sırasında |
| JS / CSS | ≤ 8 / ≤ 6 KB gz | derleme çıktısında gzip |
| Sürekli hareket | ≤ 2 | §10 |

**Ölçüm sonuçları (2026-11-16, üretim derlemesi, headless Chrome 157, GPU'suz):** CLS masaüstü 0, mobil 0; konsol hatası 0. Recolor sırasında kare süresi p50 4,3 ms, **p95 16,7–21 ms**, en kötü 29 ms; boşta p95 4,4 ms. Bu, geçiş boyunca birkaç karenin bütçeyi aştığını gösterir. Neden: büyük tint alanının yeniden boyanması ve kayıtlı değişkenin alt ağaçta her karede yeniden hesaplanması. Headless yazılım rasterı gerçek GPU'dan yavaştır. **Kalite-denetcisi gerçek cihazda ölçmelidir.** p95 > 16,7 kalırsa çözüm hazır: Z3 zemin tint'i, opaklıkla çapraz geçen iki katmana taşınır (yalnız compositor). Bu durumda değişken geçişi yalnız eyebrow, bant ve yaprakta kalır (K-159).

## 13. Geliştirici sözleşmesi (özet)
1. Kök layout'ta bir kez: `<body><MotionRoot />…` (frontend-mimar, devir notu).
2. Noktayı işaretle: `data-motion="M-9"` (yazım koruması için `{...motion("M-9")}`) + gerekiyorsa `data-motion-part="…"`. Sıra için `style={{"--i": n}}` isteğe bağlıdır.
3. Kendi `translate/scale/rotate`'ünü kullanan öğede hareketi sarmalayıcıya ver.
4. Hover-recolor: `<RecolorZone kind="showcase|menu|header" link={[…]}>` + tetikleyicide `accentTriggerProps(p.accent)`; paletsiz kartta `data-accent-trigger=""`.
5. JS gereken üç yer: `railScroll`, `motionExit`, `scrollBehavior` (`@/lib/motion`).
6. Tanınan takma adlar (sayfalarda zaten kullanılıyor): `fav-pop`, `filter-sheet`, `premium-packshot`, `M-18-chip`, `card-media`, `card-band`, `popover`. Tanınmayan değer sessizce yok sayılır (`pv-chip`, `load-more`, `M-13-tile`).

## 14. Önizleme anahtarları
`?motion=off|on|full` (oturumda kalır; `full` = işletim sistemi azaltılmış hareket istese de tam hareket, yalnız demo; `off` = hiçbir şey kaymaz/girmez ama renk/opaklık geçişleri K-231 gereği yine yumuşak) · `?recolorHeader=0|1` (v2 varsayılan 1) · `/hareket-lab` tüm noktaları, **`/hareket-lab/v3` K-231/K-233/K-234 örneklerini** (yalnız önizleme derlemesi), `/svg-kutuphanesi` SVG davranışlarını gösterir.

---

## 15. Smooth scroll (K-183, K-194) — v4: yerini §26.1 aldı (Lenis); aşağıdaki tablo geçmiş kayıttır
**Seçim: bağımlılıksız kendi motorumuz** — `src/lib/motion/smooth-scroll.ts` (~1,5 KB gz). Lenis (~4 KB gz) değerlendirildi; reddedilme nedeni: paket/kilit dosyası değişikliği (frontend-mimar alanı, paralel derlemeleri bozma riski), ihtiyacımız yalnız dikey pencere kaydırması, ve motorun hareket çalışma zamanıyla **aynı rAF döngüsünde** koşması (Lenis kendi döngüsünü kurar). Gerekirse Lenis'e geçiş tek dosyalık değişikliktir (API: `scrollTo`, `stop`, `enabled`).

| Davranış | Değer |
|---|---|
| Teker | atalet `lerp 0.12` / 60 Hz kare (kare hızından bağımsız), teker çarpanı 1 |
| Programatik (`motionScrollTo`, çapa, başa dön) | süre `clamp(420 + mesafe × 0,22, 500, 1200)` ms, `easeOutExpo` |
| Çapa bağlantıları | aynı sayfa `#id`: yumuşak kayar, `scroll-margin-top` ya da yapışkan header yüksekliği + 16 px bırakır, adres `#id` olur, hedef odak alır (odaklanamıyorsa geçici `tabindex=-1`) |
| Doğal kalır | dokunmatik (teker olayı yok), yumuşak/kapalı katman, `Ctrl`+teker (yakınlaştırma), `Shift`/yatay teker, klavye (ilk tuşta süzülme durur), kaydırma çubuğu sürükleme, sayfada bul, yönlendirici konum geri yükleme (yabancı kaydırma algılanır, durur) |
| Kilit | `html`/`body` `overflow: hidden` veya açık modal `<dialog>` (sepet, mobil menü, arama) → hiç müdahale yok |
| İç kaydırma | hedefin üstünde o yönde hâlâ kayabilen kutu (mega menü listeleri, drawer, arama paneli, `overscroll-behavior: contain`), `[data-scroll-native]`, `dialog`, `[role=dialog/listbox]`, `select`, `textarea` → doğal |
| Yapışkan header, IO girişleri, CSS scroll-driven paralaks | etkilenmez: pencere gerçekten kaydırılır, olaylar doğal akar |

Geliştirici: JS'den kaydırma gerekiyorsa `motionScrollTo(y | element)` (`@/lib/motion`). Bir kutunun tekerini her zaman doğal bırakmak için `data-scroll-native`.

## 16. Katmanlar ve görünür hover seti (K-171, K-190, K-191)
**Kök neden (gerçek tarayıcıda ölçüldü):** Bu bilgisayarda Windows "Animasyon efektleri" kapalı (`SPI_GETCLIENTAREAANIMATION = false`) → Chrome/Edge `prefers-reduced-motion: reduce` bildirir → v1 açılış betiği `data-motion` koymuyordu → **tüm** hareket ve hover renk geçişi kapalıydı. Ek nedenler: (1) v1 incelemesi sırasında `MotionRoot` kökte bağlı değildi, (2) frontend-gelistirici'nin 20 kanca adı (`cart-drawer`, `mega-panel`, `header-stripe`…) çalışma zamanına bağlı değildi, (3) vitrin tint'i çok açık palet tonlarında fark edilmiyordu.

| Katman | Koşul | Ne olur |
|---|---|---|
| **tam** `html[data-motion=on]` | azaltılmış hareket istenmiyor veya `?motion=full` | her şey (§5–§8 + aşağıdaki set + smooth scroll + SVG) |
| **yumuşak** `html[data-motion=reduced]` | işletim sistemi azaltılmış hareket istiyor | hiçbir şey kaymaz/büyümez/dönmez/döngüye girmez; görünür kalanlar: kart halkası/ışıması ve bant (opaklık), açıklama paneli, vitrin + header renk geçişi (**v3: yumuşak**, §21), alt çizgiler (opaklıkla), SVG `glow` parçası, yükleyici opaklık nabzı, paneller/çekmeceler yerinde solarak açılır |
| **kapalı** | `?motion=off` | statik |

Görünür hover seti (tam katman; ince işaretçi + `:focus-visible`):

| Öğe | Hareket |
|---|---|
| Ürün kartı (v2, `[data-product-card]`) | kart 6 px kalkar (320 ms out) · `card-media` 1.08 + −1,5° (700 ms) · **yalnız görsel karosunda** (`[data-card-tile]::after`) kart paletinde 2 px iç halka + alttan ışıma (opaklık 320 ms) · `card-band` · `card-reveal` paneli (kart bileşeninin kendi geçişi) |
| Birincil hap düğme (`rounded-pill` + `bg-green-700`) | 2 px kalkma; tüm hap düğmelerde basışta 0.96 (120 ms); filtre çipleri kalkmaz |
| `shine` (`cta-member`, `add-to-cart`) | hover/odakta tek ışık süpürmesi 760 ms; sepete eklenince ✓ ikonu yay ile belirir |
| Sondaki ok/ikon (bağlantı/düğme içinde son SVG) | 3 px sağa |
| Header | ikonlar 2 px yükselip 1.1 (yay); `subnav-link` alt çizgisi 260 ms kayar; `header-stripe` her yüklemede çizilir; sayaç (`count-pop`) değişince pop (hidrasyonda değil) |
| Footer | bağlantılar 3 px sağa; şerit görünür olunca çizilir |
| Vitrin (`[data-accent-zone=showcase]`) | zemin paleti + **radyal palet ışıması** (`::before`, opaklık) + **üstte 5 px üç renkli şerit çizilir** (`::after`, 600 ms) + bağlı header: bant renkleri + soldan palet ışıması. Giriş 480 / dönüş 640 ms (yumuşakta anlık) |
| Mega menü karoları (`tile-zoom`) | görsel 1.07 |

Kanca → ilkel eşlemesi (`ids.ts › MOTION_ALIASES`, CSS'te `:is()` listeleri): `header-stripe`, `mega-stripe` → band-show · `footer-stripe` → band · `cta-member` → shine · `add-to-cart` → press · `count-pop` → pop-live · `search-field` → focus-ring · `search-panel`, `search-sheet`, `announcement`, `mega-scrim`, `mega-tiles` → fade-in · `mega-panel` → megamenu · `mega-root-bar` → bar-in · `tile-zoom` → zoom · `mobile-nav` → drawer-left · `mobile-nav-level` → slide-panel · `cart-drawer` → drawer · `cart-line` → flash · `checkout-note` (+ `data-flash`) → flash-on.

**Otomatik giriş:** `<main>` içinde işaretsiz ürün kartları ve `h2` başlıklar, **ilk ekranın altındaysa** bir kez girer (kartlarda sütun başına 60 ms). İlk ekrandaki içerik asla gizlenmez. Kapatmak için öğe/kapsayıcıya `data-no-reveal`.

## 17. Yükleme durumu (K-170, K-192)
- **Rota `loading.tsx` yok.** Denendi ve ölçüldü: kök ve `(magaza)` sınırları PPR kabuğunda tam ekran/60vh yükleyiciyi ilk boyamada gösterip içerik gelince footer'ı itiyordu (CLS 0,112; LCP gecikir). Kaldırılınca CLS 0.
- **Gezinme göstergesi:** aynı kökenli bağlantı tıklamasından 150 ms sonra adres değişmemişse `html[data-nav-pending]` → üstte üç renkli şerit (yalnız bekleme süresince döngü) + header altında beyaz hap içinde "yaprak üçlüsü" (`BrandLoader`: yeşil/lime/mavi üç yaprak tek gövde noktasından sırayla açılır, üçlü 120°'lik adımlarla döner; logo veya 7 kümeli işaret çizilmez). Adres değişince, `popstate`'te veya 10 sn sonra kalkar. Önceden getirilmiş (hızlı) geçişlerde hiç görünmez. Yumuşak katmanda yalnız opaklık nabzı.
- **Açılış splash'ı yok** (LCP'yi geciktirir; K-034).
- Suspense yedekleri için hazır: `BrandLoader`, `PageLoading`, `ListingLoading`, `ProductLoading` (`@/components/motion`), iskelet parıltısı `data-motion="skeleton"`.

## 18. İnteraktif SVG (K-179, K-193)
Sözleşme kaynağı: `src/lib/motion/svg-interact.ts` (davranış/parça sözlüğü, `svgInteract()`, `svgPart()`), sarmalayıcı `<SvgInteract mode=… host>`. Çizimler: `src/components/illustrations/**` (ui-tasarimci), katalog `/svg-kutuphanesi`.

| Davranış | Parçalar → hareket |
|---|---|
| `bloom` | `blob`/`tint` 1.12 · `accent` −3 px, −6°, 1.06 · `sprout`/`leaves`/`petal` 1.08 + merkezden dışa 6° · `leaf` 10° · `badge`/`rosette`/`letter`/`center`/`object`/`diamond`/`card`/`token(s)` 1.1 + 2 px · `card-back` yelpaze |
| `sway` | `leaf`/`leaves`/`wreath`/`stem` sönümlü tek salınım (−8°/+6°/−2,5°, 1,5 sn, `--i`×70 ms) · `wave` yatay kayma |
| `draw` | `stroke`/`frame`/`stem`/`lines`/`signature` içindeki çizgili şekiller yeniden çizilir (1 sn); `stripe` pivotundan büyür; `leaf`/`corners`/`pen` 500 ms sonra pop. **Çizgiler önceden gizlenmez** |
| `spin` | `object`/`rotor` tek tur (1,6 sn) · `crumbs`/`sparkles` dışa kayar |
| `parallax` | tüm parçalar imleci derinlikle izler (±14×10 px × derinlik; rAF, 300 ms yumuşatma): `branch-back`/`wave-back`/`backdrop` 0.3 · `wave-mid`/`drops`/`orbit`/`sun` 0.6 · `leaves-front`/`wave-front`/`sparkles`/`leaf` 1 · `tile` 0.35 (desenler hafif); `sun` ayrıca 25° döner |
| `scatter` | `leaf` merkezden dışa 10 px + 12° |
| her biri | isteğe bağlı `glow` parçası opaklıkla belirir (yumuşak katmanda da) |

Tetik: SVG'nin en yakın `[data-svg-host]`, bağlantı, düğme, ürün kartı, `label` veya `summary` kapsayıcısı; yoksa (ve SVG `pointer-events: none` ise) olay alan en yakın üst öğe. Fare/kalem hover'ı veya klavye `:focus-visible`; dokunmatik asla. Pivotlar çizimdeki satır içi `transform-origin`'dan gelir; yön değişkenleri (`--svg-dx/-dy/-side`) çalışma zamanında hidrasyondan sonra hesaplanır.

## 19. Hidrasyon kuralı
Açılış betiği yalnız `<html>` özniteliği yazar (`suppressHydrationWarning`). Öğe düzeyi her yazım (`data-motion-in`, `pathLength`, satır içi değişkenler, otomatik giriş) **React öğeyi sahiplendikten sonra** yapılır: pencere `load` + boşta geri çağrı, ardından öğe başına fiber denetimi (henüz hidrasyon olmamış sınır 250 ms aralıkla yeniden denenir, 10 sn sonra koşulsuz). Kanca adları özniteliğe eklenmez; eşleme CSS'te yapılır. Dev sunucuda 6 sayfa × 2 katman: hidrasyon uyarısı 0.

## 20. Kanıt (gerçek tarayıcı, üretim derlemesi, headless Chrome, 1440×900)
`docs/qa/ekran/motion-v2/` — betikler `_kanit.mjs`, `_hydration.mjs`, `cdp.mjs`; ölçümler `olcum.json`, `hydration-dev.json`.

| Senaryo | Sonuç |
|---|---|
| A — bu bilgisayar (OS azaltılmış hareket) | `data-motion=reduced`; hover'da vitrin `--accent-soft` #F1F8EE → #FCEDEE (anlık), ışıma 1, şerit 1, header bandı + ışıması boyandı, kart halkası 1, panel 1; kayma/yakınlaşma yok; bırakınca tümü döner |
| B — animasyonlar açık | 160 ms'de kart −5,8 px, görsel 1.06, halka 0.97 (renk henüz değişmedi: niyet gecikmesi 120 ms); oturunca −6 px, 1.08, −1,5°, palet + ışıma + şerit + header |
| C — `?motion=full` | B ile aynı |
| Düğme | `cta-member` hover: −2 px, ışık süpürmesi çalışıyor |
| Smooth scroll | tek teker (400 px): ~30 karede süzülme; PageDown doğal (787 px); açık sepette teker sayfayı kaydırmaz; çapa yumuşak + `#hash` + odak |
| SVG | bloom/sway/draw/spin/parallax beşi de `/svg-kutuphanesi`'de hover'da (değerler `olcum.json › svg`) |
| Gezinme göstergesi | yavaş ağda `/kategori/cilt-bakimi` tıklamasında göründü, adres değişince kalktı |
| CLS | 0 · konsol hatası 0 · hidrasyon uyarısı 0 |

### 18a. Referans dili çizimleri (ui-tasarimci 2026-11-17)
| Çizim | Hareket |
|---|---|
| `SceneHeroLeaves` (`parallax`) | derinlik `slab` 0.15 < `leaves-back` 0.35 < `leaves-mid` 0.65 < `leaf-front` 1; imleç paralaksı. Katmanların ayrı ayrı girişi **yok**: çalışma zamanı hidrasyondan sonra başladığı için ilk ekrandaki katmanı gizleyip yeniden göstermek yanıp sönme yaratır (LCP alanı) |
| `Leaf*Specimen` (`sway`) | `leaf` tabandan sönümlü tek salınım (§18) |
| `PanelLeafSegments` (`draw`) | `segment` parçaları hover'da `--i` sırasıyla 70 ms arayla pop |
| `IconBadge` (`spin`) | `disc` −8° + 1.04, `glyph` 14° + 1.08 (yaylı) |
| Karo (`shadow-tile`) | hover/odakta 4 px yükselir; gölgenin `shadow-tile-hover`'a geçişi karonun kendi sınıfında |
| Krem hap CTA | basışta 0.96 (tüm hap düğmeler, §16) |
| Hareket almaz | `TextureGrain`, `PatternLeafVeinEmboss`, logo |
Işık sol üstten: yükselme her zaman yukarı, gölge yalnız sağ alta büyür.

---

## 21. Yumuşak geçiş tabanı (K-231, K-250)
**Kural:** Hover, odak veya durumla değişen her öğenin bir `transition`'ı vardır. Giriş de çıkış da yumuşaktır. Bu kural her katmanda geçerlidir: tam, yumuşak (reduced), `?motion=off` ve JS'siz.

| Token | Değer | Neden |
|---|---|---|
| `--motion-hover` (`TRANSITION.duration`) | **250 ms** | K-231'in "≈0.25 s" değeri |
| Boyama eğrisi (`--motion-ease-hover`) | **linear** | Kullanıcının verdiği örnek bu. Renk ve opaklık çapraz geçişinde doğrusal eğri eşit okunur. Giriş ve çıkış birbirinin tam aynası olur; ease-out kullanılsaydı çıkışın sonu "kesilmiş" görünürdü. |
| Hareket eğrisi (`TRANSITION.moveEase`) | `--motion-ease-out` | Doğrusal bir kayma aniden başlar ve aniden durur. K-231'in yasakladığı "anlık" his tam olarak budur. Konum, ölçek ve dönüş bu yüzden yavaşlayarak oturur. |
| `--motion-t-paint` | color, background-color, border-color, text-decoration-color, fill, stroke, box-shadow, opacity, filter, backdrop-filter | Yalnız boyama ve kompozit. Layout özelliği listede yoktur (CLS 0). |
| `--motion-t-move` | translate, scale, rotate, transform | — |
| `--default-transition-duration` | 250 ms | Tailwind'in süre vermeyen `transition*` sınıfları 150 ms yerine 250 ms çalışır. |

**Uygulama (`motion.css` › "v3"):**
1. **Taban, `@layer base` + `:where()` (sıfır ağırlık):** taban kural şu öğelere `transition: var(--motion-t-paint), var(--motion-t-move)` verir: `a`, `button`, `summary`, `label`, form alanları, düğme/sekme/menü rolleri, `[data-product-card]`, `[data-card-tile]`, `[data-motion]`, `[data-motion-part]`, `[data-svg-interact]`, `[data-svg-part]`, `[data-accent]`, `[data-accent-trigger]`, ayrıca sınıfında `hover:`, `focus`, `active:`, `aria-`, `data-[`, `open:`, `checked:`, `peer-`, `rounded-pill|tile|card`, `shadow-tile|card` ya da `chip` geçen her öğe ve bunların `before:`/`after:` sözde öğeleri. Bileşenin kendi `transition-*` sınıfı her zaman kazanır.
2. **Hareket katmanının kendi kuralları:** `motion.css` katmansızdır ve Tailwind sınıflarını ezer. Bu yüzden hover kurallarındaki her `transition` kısaltmasının başına `var(--motion-t-paint)` eklendi. **v2 hatası:** hap düğmelerdeki basma kuralı bileşenin `transition-colors`'unu siliyordu ve tam katmanda zemin rengi anlık değişiyordu (ButtonLink, header CTA, footer bağlantıları, `shadow-tile` karolar). Hata giderildi; kanıt §25.
3. **Yumuşak ve kapalı katman (`html:not([data-motion=on])`):** durum parçaları son geometrisinde kalır (kayma, ölçek, dönüş yok). Yalnız opaklık ve renkle değişir:
   - Kart bandı, alt çizgiler (H7/F3), vitrin üst şeridi ölçekle çizilmez, solarak belirir.
   - Halka (M-8), ızgara↔✕ (H2), arama halkası (H3), "Eklendi" (M-12), gölge katmanları, kompakt header (H6), başa dön (F6) ve kart ışıması çapraz geçişle değişir. `visibility` için `allow-discrete` kullanılır.
   - Mega menü, sepet, mobil menü ve filtre paneli yerinde solarak açılıp kapanır (`@starting-style` + `allow-discrete`).
   - Montaj animasyonları (fade-in, step, sekme paneli, akordeon, popover, pop, sayaç) yalnız `gl-fade` 250 ms olur.
   - Hover-recolor yumuşak katmanda da tam katmanın bölge sürelerini kullanır (Z3 480/640 ms). `motion.css`, `--recolor-duration-reduced` kancasını beslemek için `tokens.css`'teki reduced-motion bloğunu kullanır.
   - `motionExit()` yumuşak katmanda 250 ms doğrusal solma yapar; v2'de öğe anında kalkıyordu.
4. **Bilinçli istisna:** odak halkasının (`outline`) kendisi geçiş almaz. Klavye kullanıcısı göstergeyi anında görmelidir (WCAG 2.4.7). Hover değildir, K-231'in kapsamı dışındadır.
5. **Testler (`motion-css.test.ts`):** `transition: none` ve `transition-duration: 0` yasak. Taban katman var ve token'lar `tokens.ts` ile aynı. Yumuşak ve kapalı katmandaki hiçbir kural `translate/scale/rotate/transform` değerini `none` dışında bir değere ayarlamaz ve `gl-fade` dışında animasyon oynatmaz. Geçiş listelerinde yalnız compositor ve boyama özellikleri bulunur.

**Bileşen sahipleri için kural (devir notları):** hover'da `translate/scale/rotate` kullanan sınıflar `motion-safe:` önekiyle yazılır. Böylece yumuşak katmanda öğe kaymaz; taban geçiş yine de rengi yumuşatır. `motion-safe:transition-*` ise **yasaktır**: reduced'da geçişi siler ve hover anlık olur.

## 22. Kütüphane kararı v3 (K-232, K-251) — v4: K-256 ile iptal, bkz. §26
**Karar: yeni bağımlılık yok.** K-233, K-234 ve smooth scroll mevcut CSS + WAAPI + kendi çalışma zamanımızla karşılanıyor. `package.json` değişmez.

| İhtiyaç | Kütüphanesiz çözüm | Kütüphane maliyeti (gz, yaklaşık) |
|---|---|---|
| K-233 logo dönerek giriş + başlık solması | 2 `@keyframes`, yalnız CSS. Hidrasyonu beklemez, LCP'den önce JS çalışmaz | GSAP core ≈ 27 KB. JS'e bağlı bir giriş hidrasyona kadar gecikir ya da yanıp söner |
| K-234 kolaj girişleri | `collage` ilkeli (IO, bir kez, parça başına `--from-x/-y/-r`, `--i`) | GSAP timeline ≈ 27 KB |
| K-234 kaydırmaya bağlı derinlik | `drift` ilkeli: CSS scroll-driven (`view()`), compositor'da, ana iş parçacığı boşta | ScrollTrigger ≈ +15 KB, ana iş parçacığında scroll ölçümü |
| Smooth scroll (K-183) | `smooth-scroll.ts` (≈ 1,5 KB, ortak rAF) | Lenis ≈ 4 KB |
| **Toplam ek JS** | **≈ +0,3 KB** (`collage`, `motionExit` solması, giriş kapısı, `whenHeroIntroDone`) | GSAP + ScrollTrigger ≈ 42 KB: tek başına K-097'nin animasyon kütüphanesi tavanını (≤ 25 KB) aşar |

**Ne zaman yeniden bakılır:** K-234 tasarımı **sabitlenen (pinned) ve kaydırmayla ilerleyen çok adımlı bir sahne** isterse (ör. yatay kayan hikâye, kaydırmaya bağlı sıralı kolaj zaman çizelgesi) CSS `view()` tek başına yetmez. O durumdaki önerim: **yalnız GSAP core + ScrollTrigger**, yalnız ana sayfada, `import()` ile ve ilk etkileşimden sonra yüklenir; ilk yükleme bütçesine girmez. Bunun için K-097'ye ana sayfa istisnası (≈ 42 KB, ertelenmiş) ve frontend-mimar onayı gerekir (devir notu). GSAP'ın standart lisansı 2025'ten beri eklentiler dahil ücretsizdir; yine de lisans metni eklemeden önce kontrol edilmelidir. Motion (Framer) seçilmez: React adası ister, sunucu bileşenlerini istemciye çevirir.

**Tarayıcı notu:** CSS scroll-driven animasyonları Chrome/Edge 115+ ve Safari 26+ destekliyor. Firefox'ta (bayrak arkasında) `drift` statik kalır. Bu kabul edilebilir: içerik ve kolaj girişleri (IO) her yerde çalışır.

## 23. Ana sayfa hero girişi (K-233, M-24, K-252; ui bütçesi K-242; S-067 kararı)
Hero 100vh boyutundadır. Giriş tamamen CSS ile yapılır, hidrasyonu beklemez ve **yalnız tam sayfa yüklemesinde** oynar: açılış betiği `html[data-intro]` yazar, çalışma zamanı ilk istemci gezinmesinde (bağlantı, geri/ileri, `router.push`) bu özniteliği kaldırır. Böylece oturum içinde ana sayfaya dönüldüğünde giriş tekrar etmez ve içerik son pozunda görünür. İlkel `hero-intro` (point `M-24`) olarak tanımlıdır; bileşenleri `<HeroIntro>` ve `<IntroLogo>`, yardımcısı `whenHeroIntroDone()`'dur (`@/components/motion`, `@/lib/motion`).

| Nokta | Parça (`data-motion-part`) | Tam katman | Yumuşak katman | JS kapalı / `?motion=off` |
|---|---|---|---|---|
| H-1 | `logo` (sarmalayıcı) | `gl-logo-roll` **900 ms** `ease-out`. **Kaymadan yuvarlanma:** `translate: −1,5·π·çap → 0` (yüzde cinsinden: −471 %), `rotate: −540° → 0`. Opaklık ilk %10'da 0→1 | solma 320 ms linear | son poz |
| — | `media` (hero görseli) | `gl-settle` 1100 ms (`scale 1.06 → 1`), **asla gizlenmez** | statik | son poz |
| H-3 | `eyebrow` | solma 500 ms, 300 ms gecikme | solma 320 ms, 80 ms | son poz |
| H-2 | `title` (H1) | **opaklık 0→1, 600 ms `ease-out`, 400 ms gecikme** (`--intro-title-delay`) | solma 320 ms, 120 ms | son poz |
| H-3 | `lead` · `cta` | `gl-rise-sm` 500 ms; gecikme 560 · 680 ms | solma 320 ms; 200 · 240 ms | son poz |
| H-4 | `layer` (kolaj katmanları, `--i` arkadan öne) | `gl-collage` 800 ms `out-expo`, `300 + min(i,4)·90` ms; katman başına `--from-x/-y/-r` | solma 320 ms, 200 ms | son poz |

- **Yuvarlanma tutarlılığı (devir isteği):** öteleme, logonun kendi genişliğinin yüzdesi olarak yazılır. Çap = genişlik olduğundan dönüş miktarı kat edilen yolla her boyutta birebir eşleşir: masaüstünde 136 px'te 641 px, mobilde 88 px'te 415 px yol alınır. Her iki başlangıç da ekran dışındadır. Ölçüm: her karede `öteleme/(π·çap)·360 = rotate` (−217,3° / −217,3°; −20,9° / −20,85°). Tur sayısı `turns` prop'u ile değiştirilir (`--intro-roll`).
- **"Ardından" ve bütçe (ui K-242):** logo ≤ 900 ms. `ease-out` eğrisinde logo 400 ms'de yolun %87'sini ve dönüşün son ~70°'sini geride bırakmış olur, 600 ms'de ≤ 4° kalır. Başlık 400 ms'de başlar: logo görsel olarak oturmadan ≈ 200 ms önce. En geç biten parça katmanlardır (1460 ms ≤ 1,6 sn). LCP için başlığın 700 ms'de başlaması yerine bu değer seçildi.
- **Logo çizimi değişmez:** yalnız sarmalayıcı `span` hareket eder. Filtre, renk, kırpma ve ölçek yoktur; döngü ve hover dönüşü yoktur. Yatay kilit için `<IntroLogo variant="lockup">` kullanılır (−46vw'den −14° eğik kayma, pervane etkisi yok).
- **LCP:** opaklığı 0 olan başlık LCP adayı sayılmaz. Başlık LCP öğesi olursa LCP ≈ FCP + 400 ms olur. Hero görseli büyüktür ve hiç gizlenmez; ölçümde LCP = IMG = FCP (136 ms), CLS 0 çıktı. Mobilde 4G LCP 2,5 sn'yi aşarsa yedek plan (`heroIntro.lcpFallback`) şudur: `--intro-title-delay: 300ms` ve logo 600 ms (`[data-motion-part=logo]{animation-duration:600ms}`).
- **K-238 / S-067 a (aynı sahnede swiper):** zemin ve logo kalıcıdır; dönen yalnız metin bloğu ve sağdaki kolajdır. `HeroIntro` kökü **sabit sahneyi** sarar, slaytlar içinde kalır. Bu yüzden giriş yalnız 1. slaytın metin ve kolajında oynar, slayt geçişleri swiper'ındır. **Otomatik geçiş:** `await whenHeroIntroDone(root)` tamamlandıktan sonra saat başlar ve 1. slayt tam aralığını (≥ 7 sn) bekler. Giriş oynamıyorsa (istemci dönüşü, kapalı hareket) hemen çözülür; güvenlik sınırı 1760 ms'dir.
- Sürekli hareket sayısı: hero ilerleme saati 1 + marquee ayrı ekranda (§10 ve K-097 korunur).

## 24. Maximalist hareket: kolaj, derinlik, dev şerit (K-234, K-253)
| Nokta / ilkel | Davranış | Reduced / desteklenmeyen |
|---|---|---|
| `collage` (`<Collage>`) | Görünür alana girince **bir kez** oynar: her parça `--from-x/-y` (varsayılan 0 / 56 px) ofsetinden, `--from-r` (−8°) dönüşle ve `scale .88`'den kendi son eğimine (`rotate-*`) oturur. Süre 900 ms `out-expo`, kademe `--i`·80 ms (en çok 10). Parçalar `data-motion-part="piece"` ile ya da doğrudan çocuklar olarak verilir | statik, içerik tam |
| `drift` (`<Drift depth>`) | Bölüm görünür alandan geçerken ±`--drift` (48 px) × `--depth` dikey kayma yapar (CSS `view()`) | statik |
| **H-5** Dev şerit dolumu | Üç satırın **zemin katmanı** (metinden ayrı, mutlak konumlu, `aria-hidden`) `data-motion="band"` kapsayıcısında `scaleX 0→1` ile soldan dolar: 800 ms `out-expo`, satır başına 90 ms. Metin satırları `reveal` ile 200 ms sonra gelir. Metin hiçbir zaman `scaleX` almaz (harfler ezilmez) | zemin ve metin hazır |
| **S-1** Dev şerit zıt kayma | Her metin satırının sarmalayıcısı `<Drift data-drift-axis="x" drift="-120px">`; satırlar sırayla `+`/`−` `drift` alır. Kaydırmaya bağlıdır, otomatik oynama yoktur (WCAG 2.2.2 dışı). Satır genişliği, kaymayı kaldıracak kadar tekrar içermelidir (taşma `overflow-hidden` kapsayıcıda) | statik |
| **V-1** Vitrin 2 dev ikonu | İkon sarmalayıcısı `key={sekme}` ile yeniden bağlanır ve `data-motion="fade-in"` alır (200 ms, yumuşakta 250 ms solma). İçindeki çizim `data-svg-interact="bloom"` taşır; sekme değişiminde ek dönüş olmaz | solma |
| §10 SVG haritası | Hero kolajı `parallax` (imleç, ince işaretçi) · hero packshot çıkartması: `lift` (4 px) + kendi `rotate`'inin yarısına yaklaşma (`hover:rotate-[…]`, `motion-safe:`) · Raf duvarı ikonu `bloom` (karo `data-svg-host`) · Vitrin başlık `LeafHeartSpecimen` `sway` · Kapılar: `IconBadge` `spin`, `ScenePv`/`SceneMembership`/`SceneBlog` `bloom`, `ScenePremiumFrame` `draw` · dev tipografi hover almaz. Davranışların hepsi §18'de tanımlıdır, yeni kod gerekmez | statik ve eksiksiz |

Kurallar: bir ekranda `depth ≥ 1` olan en fazla 2 drift katmanı bulunur (dev şerit satırları tek grup sayılır). Drift sarmalayıcıya verilir, çünkü `translate`'in sahibi odur. Metin, fiyat ve CTA dikey drift almaz; yalnız dekor metni (dev şerit) yatay drift alabilir. Kolaj parçası ürün kartıysa kartın kendi hover'ı (§16) korunur.

## 25. Kanıt v3 (gerçek tarayıcı, önizleme üretim derlemesi, headless Chrome, 1440×900 + 390×844)
`docs/qa/ekran/motion-v3/` — betikler `_kanit.mjs` (rAF örnekleyici + gerçek fare), `_recolor.mjs`, `_seri.mjs` (film şeritleri). Ölçümler `olcum.json` ve `olcum-recolor.json` dosyalarında.

| Senaryo | Sonuç |
|---|---|
| K-231 hover girişi ve **çıkışı**, tam katman (düğme, çip, bağlantı, karo gölgesi, opaklık) | 5/5 öğe giriş ve çıkışta ≈ 252–255 ms içinde 55–59 ara kareyle geçiyor; anlık sıçrama yok |
| K-231, yumuşak katman (`prefers-reduced-motion: reduce`) | 5/5 öğede giriş ve çıkış 59 ara kareyle, 255 ms civarında |
| Film şeritleri | `SERI-full-chip-hover-cikisi.png`, `SERI-reduced-chip-hover-cikisi.png` (hover → 0/60/125/190/250 ms → dinlenme), `SERI-full-tile-hover-cikisi.png` |
| Sitedeki hap düğmeler (`/`) | `transition-property` içinde renk, zemin, gölge, scale ve translate var, hepsi 250 ms (v2 hatası giderildi) |
| Vitrin hover-recolor çıkışı (`/`), yumuşak katman ve tam katman | `--accent-soft` #FCEDEE → #F1F8EE 10 ara değerle ~380 ms'de; ışıma 97 ara karede söner (`SERI-recolor-vitrin.png`) |
| K-233 hero, tam katman (`SERI-hero-full.png`) | Kareler t = 0/150/300/450/600/800/1200 ms: logo −471 %/−540° → −190 %/−217° → −63 %/−72° → −18 %/−21° → −4 %/−4,5° → yerinde; başlık 0 → 0 → 0 → 0,34 → 0,87 → 0,99 → 1; katman 0 → 0,73 (450 ms) → 1; görsel her karede opaklık 1. LCP = IMG (136 ms = FCP), CLS 0 |
| Mobil 390 px (`hero-mobile-0300ms.png`, `hero-mobile-final.png`) | Logo 88 px; 300 ms'de −63 % / −72°: aynı tur sayısı, daha kısa yol |
| K-233, yumuşak katman (`SERI-hero-reduced.png`) | Dönüş ve kayma yok; logo 0 → 1 (450 ms), başlık 1 (450 ms); CLS 0 |
| S-067 b | Tam yüklemede `data-intro` var → istemci gezinmesiyle `/hareket-lab`'a gidilince kalkıyor → geri dönüşte logo animasyonu 0 adet, başlık opaklığı 1 |
| JS kapalı (`hero-js-kapali.png`) | `data-motion` yok; logo opaklığı 1, `rotate: none`, başlık 1: her şey son pozunda |
| Birim testleri | `motion-css.test.ts` + `recolor-scheduler.test.ts`: 19/19 (M-24 seçicisi dahil) |
| Derleme | Geçici kopyada `next build` (normal ve `NEXT_PUBLIC_PREVIEW_ALL=1`) başarılı; `eslint` (motion + lab) ve `tsc --noEmit` temiz |
| Boyut | motion CSS **7,95 KB gz** (v2: 6,25; bütçe 8 KB, K-254); JS ≈ +0,3 KB (giriş kapısı, `whenHeroIntroDone`) |

---

## 26. Kütüphane geçişi (K-256, K-257; v4)
**Amaç (K-256):** hazır kütüphane varsa elle yazılmaz. Kendi smooth-scroll motorumuz ve elle yazılmış swiper silindi. Yerlerine Lenis, Swiper.js ve GSAP + ScrollTrigger geldi. Üçü de **tembel yüklenir**, ilk boyamada yoktur. `/` ilk yükleme JS'i neredeyse değişmedi (§26.5).

| İhtiyaç | v3 (silinen) | v4 |
|---|---|---|
| Smooth scroll (K-183) | `smooth-scroll.ts` (239 satır) | **Lenis** 1.3, `gsap.ticker` ile sürülür, `lenis.on("scroll", ScrollTrigger.update)` (`src/lib/motion/lenis.ts`) |
| Hero swiper (K-172, K-243) | scroll-snap + fare sürükleme + WAAPI saati (299 satır) | **Swiper.js** core + `Autoplay`, `EffectFade`, `A11y` (`HeroSwiper.tsx`; Swiper `src/lib/motion/swiper.ts` üzerinden tembel) |
| Sabitlenen yatay sahne (K-257) | yoktu | **GSAP ScrollTrigger** `pin` + `scrub` (`<HorizontalPin>`) |
| GSAP yükleyici | — | `src/lib/motion/gsap.ts › loadGsap()`: `gsap` + `ScrollTrigger` tek yerde, `registerPlugin` bir kez |

### 26.1 Lenis (smooth scroll)
- **Yalnız** `html[data-motion=on]` + ince işaretçi (`(hover: hover) and (pointer: fine)`). Dokunmatikte, yumuşak katmanda ve `?motion=off`'ta Lenis hiç yüklenmez. Koşullar canlı izlenir; katman değişince Lenis kurulur ya da kaldırılır. `respectReducedMotion: false`, çünkü karar bizim katmanlarımızda (`?motion=full` demo zorlaması).
- Ayar: `lerp 0.12` (v3 motoruyla aynı his), `allowNestedScroll` (mega menü listeleri, drawer ve arama paneli doğal kayar), `prevent`: `[data-scroll-native]`, `dialog`, `[role=dialog]`, `[role=listbox]`, `select`, `textarea`; `stopInertiaOnNavigate`.
- **Kilit → `lenis.stop()`:** `html`/`body` `overflow: hidden|clip` (sepet, mobil menü), açık modal `<dialog>`, açık mega menü (`#header-accent [data-state=open]`). Bunlar MutationObserver ile izlenir; kilit kalkınca `start()`. `lenis.css` içe aktarılmadı: Lenis durunca `overflow: clip` koyar, bu da kaydırma çubuğunu kaldırıp sayfayı kaydırırdı. Gerekli iki kural `motion.css`'te.
- **Çapa bağlantıları:** aynı sayfadaki `#id` bağlantısı Lenis ile kayar, adres `#id` olur, hedef odak alır (gerekirse geçici `tabindex=-1`). Ofset `scroll-margin-top`, yoksa yapışkan header + 16 px. Lenis'in kendi `anchors` seçeneği kullanılmadı: varsayılan gezinmeyi engellemiyor (önce anlık sıçrama oluyor) ve odağı taşımıyor.
- **API değişmedi:** `motionScrollTo(y | element, onDone)` (`@/lib/motion`) Lenis varsa onu, yoksa doğal kaydırmayı kullanır. Örneğe `getLenis()` (`@/lib/motion/lenis`) ile erişilir. Yapışkan header, IO girişleri ve CSS scroll-driven `drift` etkilenmez, çünkü pencere gerçekten kayar.

### 26.2 Hero (Swiper.js)
- Fade (`crossFade`): zemin ve logo (K-243) hiç kımıldamaz, yalnız slayt içeriği (metin + kolaj) çapraz solar. Geçiş tam katmanda 600 ms, yumuşak katmanda 250 ms (opaklık, K-231).
- **Otomatik geçiş:** Swiper Autoplay, 7 sn. `init` anında durdurulur ve `whenHeroIntroDone()` çözülünce başlar; böylece 1. slayt girişten sonra tam 7 sn kalır. Fare hover'ında (`pauseOnMouseEnter`), klavye odağı bölgenin içindeyken ve sekme gizlenince (Swiper) durur. Görünür durdur/oynat düğmesi vardır (WCAG 2.2.2). Yumuşak katmanda ve `?motion=off`'ta hiç başlamaz. Etkin nokta kalan süreyi gösterir (`autoplayTimeLeft`).
- Erişilebilirlik: bölge `aria-roledescription="carousel"`; slaytlar `group` + `slide` + "n / N: ad" etiketi taşır; etkin olmayan slaytlar `inert`. A11y modülü otomatik geçiş sırasında `aria-live=off`, durunca `polite` yazar. ←/→ yalnız odak bölgedeyken çalışır. Keyboard modülü kullanılmadı, çünkü hero görünürken sayfanın her yerinde ok tuşlarını yakalıyordu.
- **LCP:** slaytlar sunucuda render edilir; yalnız 1. slaytta `priority` görsel ve H1 vardır. Swiper ilk yükleme JS'inde değildir: `import("@/lib/motion/swiper")` ile hidrasyondan sonra gelir. O ana kadar 1. slayt zaten görünür, kayma olmaz. `swiper/react` **kullanılmaz**: örneği render sırasında kurup saati okuyor ve `cacheComponents` ile `/`'nin statik ön-render'ını kırıyor (derleme hatası, denendi). CSS olarak yalnız `swiper/css`, `effect-fade` ve `a11y` alınır.

### 26.3 Kapılar: sabitlenen yatay kaydırma (K-257)
`<HorizontalPin as="section">` (`@/components/motion`) ve işaretler: `[data-hpin-viewport]` › `[data-hpin-track]` › `li`, `[data-hpin-progress]` › `[data-hpin-bar]`. Düzen CSS'te (`motion.css › K-257`), davranış GSAP'te.

| Koşul | Ne olur |
|---|---|
| ≥ 1024 px + ince işaretçi + tam katman | Bölüm yapışkan header'ın altında sabitlenir (`start: top <header>px`). Dikey kaydırma panelleri yatay taşır (`scrub: true`, `ease: none`), alttaki çubuk ilerlemeyi gösterir. Kaydırma mesafesi = iz genişliği − görünür genişlik; son panel iç kenarda biter. Yükseklik ilk boyamadan itibaren CSS ile ayrılır (`100svh − header`); pin yalnız alta pin-spacer ekler |
| < 1024 px (768–1023 yalnız tam katmanda) | Doğal kaydırılabilir şerit (scroll-snap, 28rem paneller, sağda bir sonraki panelin ucu görünür) |
| ≥ 1024 px, yumuşak katman / kapalı | **Boşluksuz bento** (brief §6 v2.1, K-184 Y-2): 12 iz × 2 satır (satır ≥ 20rem, büyür, kırpmaz). PV 1–5 / 1–2, Cilt tipi 6–9 / 1, Premium 10–12 / 1–2, Üye ol 6–7 / 2, Haberler 8–9 / 2. Orta 4 iz `2fr` ağırlıklı (eşit izlerde 2. satır kapıları 1440'ta ≈ 210 px kalıyor, başlık/gövde kırpılıyordu; şimdi ≈ 309 px). Hücre konum + sayıyla seçilir (`:has(> :nth-child(5))`); 5'ten az kapıda tek satır eşit sütunlar. Pin yok |
| 768–1023 px, yumuşak katman / kapalı | 2 sütun ızgara, ilk kapı (PV) tam genişlik, tek kalan son kapı tam genişlik |
| ≥ 1024 px dokunmatik (yatay tablet) | Aynı tam yükseklikte paneller, doğal yatay şerit, pin yok |

- **Pin türü `transform`** (`pinType: "transform"`): `position: fixed` ile yapılan pin, Chrome'da sabitlenme ve bırakma anlarında **0,91'lik layout shift** üretiyordu. Bu değer tekerle gerçek kaydırmada ölçüldü; kaynak bölümün kendisiydi. Transform layout shift sayılmaz ve Lenis ile aynı tikte güncellendiği için titreme olmaz. Ölçüm: tekerle bölümün baştan sona geçişinde CLS **0**.
- **Klavye:** izdeki bir bağlantı odak alınca sayfa, o panelin ortalandığı kaydırma noktasına atlar (`focusin`). Görünür alan `overflow: clip` olduğu için tarayıcı izi kendisi kaydırmaz. Son bağlantıya odaklanıldığında panel 976–1408 px aralığında, yani tamamen görünür (1440 genişlik).
- **Sticky header ile çakışma yok:** pinin başlangıcı ve bölüm yüksekliği header'ın ölçülen yüksekliğinden gelir (`--hpin-top`, her `refresh`'te yeniden ölçülür).
- Panellerdeki `collage` girişleri (IO), panel görünür alana kaydığında oynar; yatay hareket de onları tetikler.
- GSAP + ScrollTrigger yalnız pin olabilecek cihazda (≥ 1024 px + ince işaretçi) indirilir. Telefon bunları hiç indirmez (ölçüldü).
- **Bilinen sınır:** transform pin yalnız Lenis kaydırmayı sürerken titremesizdir; yerel (eşzamansız) kaydırmada transform bir kare geride kalır. Koşullar (ince işaretçi + tam katman) Lenis ile aynı olduğu için kabul edildi; Lenis chunk'ı GSAP'ten sonra gelirse ilk saniyelerde kısa bir titreme görülebilir.
- **Katman koşulu tek kaynak:** pin JS'i yalnız `html[data-motion="on"]`'a bakar (CSS ile aynı); katman değişimi `data-motion` gözlemcisiyle, genişlik/işaretçi medya sorgusuyla canlı izlenir. GSAP chunk'ı yüklenemezse CSS şeridi/ızgarası kalır, sonraki tetikte yeniden denenir.

### 26.4 Bilinçli olarak GSAP'e taşınmayanlar
| Parça | Neden kaldı |
|---|---|
| K-233 hero girişi (CSS keyframes) | Hidrasyonu beklemez. GSAP'e bağlansa giriş tembel chunk'ı bekler ve LCP adayı olan başlık gecikir |
| IO tabanlı `reveal`/`collage`/`stagger` (çalışma zamanı) | Gizli başlangıç durumu CSS'te; JS yokken ve ilk ekranda hiçbir şey gizlenmez. GSAP'e taşımak gizleme kontrolünü tembel bir chunk'a bağlar (içeriğin gizli kalması ve yanıp sönme riski). IO bloğu ~30 satır, kazanç yok |
| `drift` (CSS scroll-driven `view()`) | Sıfır JS, compositor'da çalışır. Firefox'ta statik kalıyor; bu kabul edildi (§22 tarayıcı notu) |
| Sayaç / PV akışı (WAAPI) | Tek sayfaya özgü ve küçük. GSAP'e taşınsa GSAP her sayfada ilk etkileşimde yüklenmek zorunda kalırdı |

### 26.5 Ölçüm (üretim derlemesi, `next build`, geçici kopya, gzip -9)
| | Önce (v3) | Sonra (v4) | Fark |
|---|---|---|---|
| `/` ilk yükleme JS'i (önceden render edilen HTML'deki script'ler) | 13 dosya, **230,2 KB gz** (748,0 KB ham) | 13 dosya, **230,5 KB gz** (748,8 KB ham) | **+0,3 KB gz** |
| `/` CSS | 32,2 KB gz | 33,7 KB gz | +1,5 (Swiper CSS ≈ 1,2 + K-257 ve Lenis kuralları) |
| motion CSS (küçültülmüş) | 7,92 KB gz | 8,12 KB gz | bütçe 8 → 8,5 KB (`BUDGET.cssGz`, K-254'ü günceller) |
| Tembel: GSAP core | — | 27,4 KB gz | yalnız masaüstü, tam katman |
| Tembel: ScrollTrigger | — | 17,5 KB gz | yalnız masaüstü, tam katman |
| Tembel: Lenis | — | 5,4 KB gz | yalnız masaüstü, tam katman |
| Tembel: Swiper core + 3 modül | — | 24,2 KB gz | yalnız `/`, hidrasyondan sonra |
| Silinen kendi kodumuz | `smooth-scroll.ts` 239 satır + elle yazılmış swiper mantığı ≈ 170 satır | | |

Not: `swiper/react` statik olarak içe aktarıldığında ilk yükleme +23,7 KB gz çıkıyordu ve derleme kırılıyordu. Bu yüzden tembel yüklenen core kullanılıyor. `/` ilk yükleme JS'i v3'te de K-097'nin 170 KB tavanının üstündeydi (230 KB); bu fark bu işten gelmiyor (frontend-mimar'a not edildi).

### 26.6 Kanıt (gerçek tarayıcı, headless Chrome, üretim derlemesi)
`docs/qa/ekran/motion-v4/`: betikler `_kanit.mjs` ve `_seri.mjs`, ölçümler `olcum.json`.

| Senaryo | Sonuç |
|---|---|
| Hero, 1440, tam katman | Swiper girişten sonra kuruluyor; otomatik geçiş giriş bitince başlıyor. Hover'da `paused`, fare çıkınca devam ediyor. İlk geçiş fare çıktıktan ~6,6 sn sonra (hover süresi kadar uzadı, kalan süre korunuyor). Etkin olmayan slaytlar `inert` (`d01`, `d02`, `SERI-hero-swiper-1440.png`) |
| Lenis, teker | Tek 400 px'lik teker: 25 örnekte 28 → 400 px süzülme |
| Kilit | `html` overflow hidden → `lenis-stopped`, kalkınca devam. Mega menü açıkken `lenis-stopped`; teker sayfayı 0 px kaydırıyor (`d03`) |
| Çapa | `#icerik`: 8 karede yumuşak kayma, `location.hash` güncel, odak `icerik`'te |
| Pin, 1440×900 | header 81 px; pin 3499 → 4475 (976 px). %0/25/50/75/100'de bölümün üstü 81 px, iz x 0/−244/−488/−732/−976, çubuk 0/0,25/0,5/0,75/1 (`SERI-pin-1440.png`) |
| Pin, 1366×768 | panel yüksekliği 428 px, içerik sığıyor (`d20`) |
| Yumuşak katman, 1440 | Lenis yok, otomatik geçiş yok, pin yok, 3 sütunlu ızgara (`r00`, `r01`) |
| Mobil 390, dokunmatik | Lenis yok, pin yok, şerit sonuna kadar kayıyor (1366/1366). GSAP ve Lenis chunk'ları **indirilmedi** (`SERI-mobil-390.png`) |
| CLS | Masaüstü 0 (test betiğinin eklediği çapa bağlantısı hariç), yumuşak katman 0, mobil 0. Konsol hatası 0 |
| Derleme | `next build` başarılı; `eslint` 0 hata (yalnız `scripts/data`'da önceden var olan 6 uyarı); `tsc --noEmit` temiz; `npm test` 52/52 |

### 26.7 Sağlamlık ve bütçe düzeltmeleri (frontend-mimar incelemesi, K-263)
- `loadGsap()` başarısız yüklemeyi önbellekte tutmaz; Lenis kurulumu yükleme hatasında kilitlenmez (`creating` her durumda sıfırlanır), sayfa yerel kaydırmada kalır ve sonraki tetikte yeniden dener.
- Lenis kapanınca `gsap.ticker.lagSmoothing(500, 33)` (GSAP varsayılanı) geri yüklenir.
- Sayfa kilitliyken (drawer, dialog, açık mega menü) çapa tıklaması Lenis'e alınmaz, tarayıcıya bırakılır.
- **Hareket çalışma zamanı tembel chunk:** `MotionRuntime` yalnız yükleyicidir; `runtime.ts` (gözlemciler, recolor, SVG etkileşimi, mıknatıs/paralaks, Lenis başlatıcı) `load` + boşta `import()` ile gelir (9,2 KB gz). Çalışma zamanı zaten öğelere ancak bu noktadan sonra dokunuyordu (hidrasyon kuralı), görsel davranış değişmez; reveal CSS'i `data-motion-runtime` ile bağlı olduğundan chunk gelmezse sayfa statik ve tam görünür kalır. Tam yükleme adresi ilk chunk'ta yakalanır, chunk gelmeden yapılan istemci gezinmesi de hero girişini iptal eder (K-244).
- Ölçüm (`npm run perf:js`): `/` 230,5 → **224,5 KB gz**, `/hakkimizda` 227,1 → **219,1 KB gz**. Mağaza kabuğunun ilk yüklemesinde kalan hareket kodu yalnız yükleyici (< 1 KB); `/`'de Lenis yardımcıları + pin ana sayfa chunk'ında (5,4 KB gz, HeroSwiper ile birlikte). Kalan aşım frontend-gelistirici'nin `js-butcesi` notundaki kabuk işinde (`ui.tr.json`, tembel paneller).

## 27. Hareket v5 — tam hareket varsayılanı, Penta/Ravena yaklaşımı (K-264, K-265, K-271, K-272)

### 27.1 Tek kapı: `html[data-motion]` (K-264)
- İşletim sisteminin azaltılmış hareket ayarı artık katmanı **belirlemez**. Boot betiği varsayılan `data-motion="on"` yazar.
- Kaynak sırası: `?motion=off|reduced|on|full` önizleme anahtarı (sessionStorage `gl-motion-preview`, `?motion=auto` siler) → ziyaretçinin seçimi (localStorage `gl-motion` = `reduced`/`on`) → `on`.
- Footer'da görünür **"Hareketi azalt"** anahtarı (`MotionToggle`, `role="switch"`): seçimi saklar ve katmanı canlı değiştirir; CSS, runtime, Lenis, GSAP sahneleri ve Swiper hızları `html[data-motion]` değişimini izler.
- Bileşenler `matchMedia("(prefers-reduced-motion)")` okumaz: `src/lib/motion/preference.ts` (`motionTier`, `onMotionTier`, `setMotionChoice`). Tailwind `motion-safe:` / `motion-reduce:` varyantları token üreticisinde `html[data-motion]`'a bağlandı (`scripts/tokens/build-tokens.mjs`).
- "Azaltılmış" katman K-231 kurallarını korur: konum/ölçek hareketi yok, renk/opaklık 250 ms yumuşak.

### 27.2 Lenis (Penta/Nakkaş)
- Tüm ince işaretçili cihazlarda, her genişlikte, tam katmanda: `new Lenis({ duration: 1.5 })` (Nakkaş 1.7; varsayılan expo-out), `gsap.ticker` + `lagSmoothing(0)` + `ScrollTrigger.update`. Kilit kuralları (drawer, mobil menü, modal, açık mega menü) aynen.

### 27.3 Ravena pin sahnesi — Kapılar (K-265, K-257)
- `PinStage` (istemci adası) + `HomeDoors`: > 900 px + ince işaretçi + tam katman. 100svh orman sahne; ızgara `52px | 15fr | 24fr`.
- ScrollTrigger: `start: top top`, `end: +=0.85·vh·(n−1)`, `pin`, **`pinType: "transform"`**, `scrub: 2`, `snap: 1/(n−1)` (0,25–0,7 sn, gecikme 0,12), aktif indeks = `round(progress·(n−1))` (Ravena'nın 20/85 eşik boşluğu yok).
- Sol çubuk: n çentik + işaretçi (aktif çentiğe 0,3 sn kayar). Orta: metin blokları üst üste; aktif `[data-active]` → opaklık + 30 px yükselme, 0,45 sn, 0,3 sn gecikme (Ravena birebir). Sağ: `door.<key>.tall` fotoğrafları (ui-tasarimci) üst üste; her sonraki fotoğraf **alttan perde** gibi açılır — dış katman `yPercent 100→0`, iç katman `−100→0` (yalnız transform; Ravena `height` yerine). Fotoğraflar `scale 1.12` kırpımda pin boyunca ±%3 yatay paralaks (toplam %6); yeni açılan 1.3→1.12, öncekinin 1.12→1.2.
- Dev kontur kelime (`home.v2.gates.side`) `stroke-dashoffset` scrub ile çizilir; zemin katmanı `scaleY .35→1` dolar.
- Pin sırasında akıllı header gizli (`html[data-pin-hold]`). Klavye: bir kapının bağlantısı odak alınca sayfa o kapının durağına atlar; etkin olmayan metinler odaklanabilir (yalnız `pointer-events: none`).
- Sahne yalnız pin kurulunca görünür (`[data-stage-ready]`); aksi hâlde (mobil, tablet, "Hareketi azalt", JS yok) aynı kapılar **Swiper şeridi** (`SwiperStrip`: 1.12 → 1.5 → 2 → 3 slayt, hız 1000 / azaltılmışta 300, oklar, klavye, A11y; Swiper gelmeden yerel scroll-snap şerit). Ölçülen CLS 0.
- Ravena'dan sapma: metin fotoğraf üstünde değil yanında (Ravena düzeni), bu yüzden fotoğraf scrim'i yalnız hafif alt gölge; brief §2'deki "metin alt %35 scrim" şerit kartlarında da gereksiz (metin fotoğrafın altında, düz zeminde).

### 27.4 Penta desenleri (site geneli, `src/lib/motion/fx.ts`, tembel GSAP + SplitText + DrawSVG)
| Desen | Değerler |
|---|---|
| SplitText başlık | `main h2` + `[data-split]`, yalnız ilk ekranın altında; satır maskesi, `y 90→0`, opaklık, 1 sn `power3.out`, kademe 0,12; tetik `top 88%`, bir kez; bitince `revert()` (React metni geri alır). GSAP gelene kadar `[data-split-wait]` gizler, 4 sn emniyet |
| Akıllı header | **K-292 ile kaldırıldı** (header satırı hiç gizlenmez; P-05/P-06 kapsamında kaydırma işleyicisi ve `style` gözlemcisi silindi, §28). Eski tarif: aşağı > 4 px gizle (0,45 sn `power2.in`), yukarı göster (0,5 sn `power3.out`), ilk `header + 50 px` içinde hep görünür; odak içerde, açık menü/drawer/dialog veya kilitli sayfada hep görünür. Yapıdan bağımsız: hedef `[data-smart-header]` (yoksa `#header-accent`), durum `html[data-header-hidden]` |
| Başa dön halkası | `MotionRoot` içinde, ≥ 1024 px; yarım ekrandan sonra görünür; halka DrawSVG ile sayfa ilerlemesi (scrub 0,4); tıklama Lenis ile kayar, odağı `#icerik`'e taşır |
| Başlık bandı paralaksı | `[data-listing-hero]`, `[data-page-hero]`: fotoğraf `scale 1→1.1`, sahne SVG `y 0→60`, `top top → bottom top`, scrub |
| Kart tilt + parıltı | VanillaTilt değerleri: max 7,5°, 1000 ms, perspektif 1000 (GSAP `quickTo`, expo.out); görsel karosunda imleci izleyen parıltı + hover başına bir ışık süpürmesi + derin gölge |
| Mıknatıs CTA | `[data-magnetic]`, büyük hap CTA'lar, header "Üye ol": x ≤ 10 / y ≤ 8 px, 0,6 sn; bırakınca `elastic.out(1, .4)` |
| Kaydırma SVG (K-271) | `ScrollSvg mode="draw parallax view near"`: draw = DrawSVG scrub; parallax = y ±60 scrub + imlece eğilme; view = görünüme girince çizimin kendi davranışı bir kez; near = imleç ≤ 240 px iken davranış (+ paralaks değişkenleri) |

### 27.5 Hover seti (K-272, `.3s ease` tabanı)
- **Kart sepet düğmesi:** yuvarlak çanta düğmesinin arkasındaki kırpma penceresinden "Sepete ekle" hapı sola kayarak açılır (520 ms out-expo, yalnız transform) — hover, klavye odağı ve "Eklendi" durumunda; kart kabı ≥ 150 px. **Yakında kartları:** aynı yuvarlak → "Ürünü incele" hapı (beyaz, green-800; dekoratif, tıklama kart bağlantısına geçer; sepete ekleme yok, K-038), ok −45° döner.
- Bağlantı alt çizgisi soldan çizilir (`[data-link-draw]`, footer bağlantıları), kategori karosu ikonu 1.12 / −6°, mega menü satırları 4 px kayar + kök ikon diski 1.14 / −8°, header ikonları 3 px sıçrar + 1.15, kapı kartı fotoğrafı 1.07.

### 27.6 Kaldırılanlar
`HorizontalPin.tsx` + K-257 yatay pin CSS'i, `GiantBand.tsx` + S-1 yatay drift CSS'i (K-267), runtime'daki OS reduced-motion dinleyicisi, HeroSwiper/Rail'deki `matchMedia` kapıları.

### 27.7 Kanıt (`docs/qa/ekran/motion-v5/`, `_kanit.mjs`: playwright-core + kurulu Chrome, `reducedMotion: "reduce"`, 1440×900, dev sunucusu)
| Sayfa | Katman | Lenis | CLS | Not |
|---|---|---|---|---|
| `/` | on | etkin (tekerlek 600 px → 12 karede 240…598, süzülme) | 0 | pin 0/25/50/75/100 → aktif 0…4, sahne üstü 0, header gizli; kart hover: tilt matrix3d, hap açık; header aşağıda gizli / yukarıda görünür; halka dolu |
| `/urunler` | on | etkin | 0 | TR kartı "Sepete ekle" hapı, yakında kartı "Ürünü incele" hapı açılıyor |
| PDP | on | etkin | 0 | ilgili ürün kartında tilt + hap |
| `/sss` | on | etkin | 0 | 8 başlık bekliyor → kaydırınca SplitText ile giriyor (kare serisi 61–64) |
Bütçe: `npm run perf:js` `/` 207,2 KB gz, `/hakkimizda` 200,2 (≤ 220). Tembel: GSAP + ScrollTrigger + SplitText + DrawSVG + Lenis (+ Swiper `/`). motion CSS 8,88 KB gz küçültülmüş (bütçe 9,5).

## 28. Performans düzeltmeleri 1 (K-288, `docs/qa/PERFORMANS-DENETIMI-1.md`)
Kurallar (yeni kod da uyar):
- **ScrollTrigger.refresh yalnız yeni tetik bağlanınca** (`fx.scan` → `scanInto` bool döner). Runtime MutationObserver'ı GSAP'in kendi düğümlerini yok sayar: `.pin-spacer` + yeniden sarılan pin öğesi, `body`'ye eklenen sınıfsız/boş ölçüm `div`'i, `[data-split-wired]` içindeki SplitText satırları (P-01).
- Akıllı header kodu tamamen kaldırıldı (K-292): kaydırma işleyicisi ve `body` alt ağacında `style` gözlemcisi yok (P-05, P-06).
- `pointermove` rAF'e toplanır; dikdörtgenler kaydırma/yeniden boyut "nesli" başına bir kez okunur, svg listeleri ve SVG host'u önbellekte; önce okuma, sonra yazma; mıknatıs dinlenme merkezinden ölçülür (P-09).
- Lenis tiki öncelikli: `gsap.ticker.add(tick, false, true)` (P-10). Intro izleme `setInterval` yerine History API sarmalı, `data-intro` kalkınca söner (P-11).
- Hero ilerleme çubuğu: tek doğrusal WAAPI animasyonu (`scale`), Swiper zaman bilgisi yalnız duraklat/sürdür ve kayma > 120 ms ise yeniden konumlama; çubukta `transition-none`; hero ekran dışındayken autoplay durur (P-07).
- K-231 taban listesinde şekil/gölge sınıfları tam sınıf eşleşmesiyle (`[class~=]`); her karede yazılan parçalar `transition-none` almalı.
- `reveal-scale` / `M-20` artık **yalnız transform** (`gl-scale-up`: ölçek .96 + 16 px), opaklık 0 başlangıcı ve runtime öncesi gizleme yok: LCP öğesini geciktiremez (P-03, KK-0-19a).

Ölçüm (üretim derlemesi kopyası, kalite-denetcisi betikleri, 4× CPU masaüstü 1440×900; önce → sonra):
| Senaryo | Önce | Sonra |
|---|---|---|
| Boşta DOM eklemesi `/` (10 sn) | 518 (pin-spacer ×148, body div ×74) | 0 |
| Boşta yük `/` · `/urunler` · `/sss` | %83 · %30 · %29 | %20 · %21 · %21 (`?motion=off` tabanı %15–20) |
| Mobil 4× boşta `/` | %75 | %21 |
| Hero görünmezken `transitioncancel` (5 sn) | 959 | 0 |
| Hero "sonraki" p95 / >16 ms | 71,2 / %9,1 | 12,6 / %2,9 |
| Ana sayfa Lenis kaydırma | 95,9 / %34,9 | 25,2 / %18,7 |
| Pin scrub | 87,7 / %22,1 | 20,8 / %6,7 |
| Vitrin renk geçişi | 16,6 / %4,5 | 8,4 / %0,3 |
| SVG near/parallax | 91,7 / %41,9 | 24,8 / %8,4 |
| 20 kart hover (`/urunler`) | 62,7 / %68,4 | 58,3 / %63,2 |
Açık kalan: kart hover (tilt + parıltı boyaması, P-02 kart DOM'u ile birlikte) ve ana sayfa kaydırması (%18,7; P-12 kontur başlık boyaması + pin) hedef < %5'in üstünde. Mobil INP ve akıllı header senaryosu bu turda ölçülmedi (ölçüm kullanıcı kararıyla durduruldu).

### 28.1 Tur 2 — kart hover yalnız bileşimci + P-12
- **Tilt:** `quickTo` artık DOM'a değil düz bir nesneye yazar; tek `gsap.ticker` geri çağrısı kart başına karede **tek** `transform` yazar (değer değişmediyse yazmaz), oturunca satır içi transform'u siler. Karoda transform geçişi yok (K-231 tabanı ezildi; yoksa her yazım 250 ms geçiş başlatıp iptal ederdi).
- **Parıltı:** 2× boyutlu, sabit radial-gradient'li katman; imleç konumu `translate` ile (karonun alt ağacına değişken yazımı ve gradient yeniden boyaması yok).
- **Derinlik gölgesi:** karonun altında önceden boyanmış `[data-card-shadow]` katmanı, yalnız `opacity` (box-shadow geçişi yok). Ayrıntı panelindeki `backdrop-blur` kaldırıldı (`bg-surface/95`). `will-change: transform` yalnız hover'da.
- **P-12:** kontur başlığın `stroke-dashoffset`'i ~1/90 adımlarla `snap`lenir; SVG pin hazırken kendi katmanında.
- Runtime kaydırma adımı `scrollY`'yi rAF'te değil kaydırma olayında okur (GSAP yazımlarından sonra zorunlu stil hesaplaması kalktı).

| 4× masaüstü (p95 / >16 ms) | Tur 1 sonrası | Tur 2 sonrası (2 tekrar) |
|---|---|---|
| 20 kart hover | 58,3 / %63,2 | 45,9 / %40–42,5 |
| Ana sayfa kaydırma | 25,2 / %18,7 | 25,1 / %16,5–22,1 (zorunlu hesaplama 1026 → ~595 ms) |
| Pin scrub | 20,8 / %6,7 | 20,9 / %8,7 (tek ölçüm, fark gürültü içinde) |
Kalan kart maliyeti: hover durum değişiminde `:has()`/`group-hover` stil hesaplaması (kart başına 76–192 öğe) ve isabet testi; kart DOM'u (P-02) küçülmeden < %5 beklenmez.
