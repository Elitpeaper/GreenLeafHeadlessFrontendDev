# Performans ve animasyon akıcılığı denetimi — 1

- **Denetçi:** kalite-denetcisi · **Tarih:** 2026-11-18 · **Görev:** K-288 (yalnız ölçüm + teşhis; düzeltmeyi sahipleri yapar)
- **Ölçülen sürüm:** `.next` üretim derlemesi (BUILD_ID 2026-11-18 06:57, kaynakta daha yeni dosya yok), `next start -p 3100`
- **İlgili kriterler:** KK-0-16 (LCP ≤ 2,5 sn, CLS ≤ 0,1, INP ≤ 200 ms), KK-0-19a (LCP öğesi animasyonla gecikmez), K-034, K-097/K-263 (bütçe), K-264 (tam hareket varsayılan)

## Özet

Masaüstünde güçlü makinede (1× CPU) site akıcı: tüm senaryolarda kare p95 ≤ 12 ms, INP ≤ 72 ms, CLS 0. **Orta veya zayıf donanımda (4× CPU) ve mobilde site kasıyor.** Bunun tek ve en büyük nedeni **P-01**: her sayfada, kullanıcı hiçbir şey yapmazken bile saniyede yaklaşık 7,5 kez çalışan sonsuz bir `ScrollTrigger.refresh()` döngüsü. Ana sayfa boştayken ana iş parçacığının %80–87'si bununla meşgul.

Kriter sonuçları:

| Kriter | Sonuç |
|---|---|
| KK-0-16 LCP ≤ 2,5 sn (mobil) | **KALDI**: `/` 2,65–2,69 sn (P-04), `/blog` 4,16–4,37 sn (P-03). Diğer sayfalar geçti |
| KK-0-16 CLS ≤ 0,1 | GEÇTİ: tüm sayfalarda 0–0,001 |
| KK-0-16 INP ≤ 200 ms (mobil) | **KALDI**: menü ve sepet açıp kapama 170–570 ms (P-02) |
| KK-0-19a LCP öğesi animasyonla gecikmez | **KALDI**: `/blog` (P-03) |
| İlk yük JS ≤ 220 KB gz (K-263) | GEÇTİ: 202–209 KB (`npm run perf:js`) |

| # | Önem | Başlık | Sahibi |
|---|---|---|---|
| P-01 | Engelleyici | Sonsuz `ScrollTrigger.refresh()` döngüsü (MutationObserver → fx.scan → refresh → GSAP DOM ekler → …) | hareket-tasarimcisi |
| P-02 | Engelleyici | Mobilde menü ve sepet açıp kapamada INP 170–570 ms (`showModal` tüm belgede stil hesaplatıyor + DOM boyutu) | frontend-mimar (+ frontend-gelistirici) |
| P-03 | Engelleyici | `/blog` LCP görseli `reveal-scale` ile gizleniyor; mobil LCP 4,2 sn | frontend-gelistirici (+ hareket-tasarimcisi) |
| P-04 | Engelleyici | Ana sayfa mobil LCP 2,66 sn: hero `<picture>` görseli için preload ve fetchpriority yok | frontend-gelistirici |
| P-05 | Önemli | fx.ts `headerMo` her `style` yazımında `getComputedStyle` çağırıyor: kart tilt sırasında zorunlu stil hesaplama | hareket-tasarimcisi |
| P-06 | Önemli | Akıllı header'ın scroll işleyicisi her olayda layout okuyor | hareket-tasarimcisi |
| P-07 | Önemli | Hero ilerleme çubuğu her kare yazılıyor ve K-231 taban geçişiyle çakışıyor (190 transitioncancel/sn); autoplay ekran dışında da çalışıyor | hareket-tasarimcisi (+ frontend-gelistirici) |
| P-08 | Önemli | Ana sayfada mobil TBT 309–456 ms; HTML/RSC yükü büyük (kabuk tek başına ~378 KB ham RSC) | frontend-mimar |
| P-09 | Önemli | SVG `near`/parallax: her pointermove karesinde `getComputedStyle` ile üst öğeler taranıyor | hareket-tasarimcisi |
| P-10 | Küçük | Lenis tiki GSAP yazımlarından sonra çalışıyor; her karede `scrollTo` zorunlu stil hesaplatıyor | hareket-tasarimcisi |
| P-11 | Küçük | Boşta sürekli çalışan döngüler (intro `setInterval`, Swiper rAF) | hareket-tasarimcisi |
| P-12 | Küçük | Pin sahnesinde dev kontur başlığın `stroke-dashoffset` scrub'ı her karede yeniden boyanıyor | hareket-tasarimcisi |
| P-13 | Öneri | Mega menü ilk açılışında 4×'te tek kare 254 ms (tembel chunk + mount) | frontend-gelistirici |

---

## 1. Yöntem

- **Araç:** playwright-core 1.65 + sistemdeki Chrome (headless). CDP ile `Tracing` (devtools.timeline, timeline.frame, timeline.stack, v8.execute) ve sayfa içinde PerformanceObserver (LCP, layout-shift, longtask, event). Ölçüm betikleri geçici olarak scratchpad'de; projeye paket eklenmedi.
- **GPU:** donanım hızlandırmalı (ANGLE D3D11, RTX 4060 Laptop). 1× masaüstü sonuçları **güçlü bir makineyi** temsil eder. Orta seviye dizüstünü temsil etmek için masaüstü ölçümleri 4× CPU yavaşlatmayla da yapıldı.
- **Profiller:**
  - Masaüstü: 1440×900, ince işaretçi (Lenis, pin, tilt etkin), 1× ve 4× CPU
  - Mobil: Pixel 7 emülasyonu, 390×844, dokunmatik, 4× CPU, ağ 150 ms RTT / 1,6 Mbps (Lighthouse "yavaş 4G" değerleri)
- **Hareket katmanı:** varsayılan `data-motion="on"` (K-264). Karşılaştırma tabanı için `?motion=off` kullanıldı.
- **INP:** her etkileşim için Event Timing girdisinin en uzun süresi (giriş gecikmesi / işleme / sunum olarak ayrıştırıldı). Mobilde 2 tekrar yapıldı.
- **Kare akıcılığı:** senaryo boyunca sayfa içinde rAF zaman damgaları toplandı. Headless Chrome rAF'i 240 Hz'de sürdüğü için medyan 4,2 ms çıkıyor. Bu yüzden eşikler mutlak değerle verildi: ">16" = 17,5 ms'den uzun kare, ">33" = 34 ms'den uzun kare. Aynı trace'ten zorunlu stil/layout hesaplamaları (bir JS olayının içinde çalışan `UpdateLayoutTree`/`Layout`) yığın izleriyle toplandı. Küçültülmüş chunk konumları kaynak koda elle eşlendi.
- **Lighthouse skoru (KK-0-17) bu turda çalıştırılmadı.** Görev ham metrik ve teşhisti. Skor turu P-01…P-04 düzeltmelerinden sonra yapılmalı.

## 2. Yükleme metrikleri

### Masaüstü 1440, 1× CPU, ağ yavaşlatması yok

| Sayfa | FCP | LCP (öğe) | CLS | TBT | Uzun görev | DOM |
|---|---|---|---|---|---|---|
| `/` | 676 | 744 (hero görseli) | 0 | 4 | 2 (en uzun 54) | 4126 |
| `/urunler` | 324 | 352 | 0 | 0 | 0 | 2892 |
| `/kategori/cilt-bakimi` | 232 | 256 | 0 | 2 | 1 | 2486 |
| `/urun/carich-aromali-dus-jeli` | 120 | 120 (H1) | 0 | 0 | 0 | 1130 |
| `/sss` | 108 | 156 | 0 | 0 | 0 | 1112 |
| `/blog` | 220 | **992** (hero görseli, P-03) | 0 | 0 | 0 | 981 |

### Mobil 390, 4× CPU, yavaş 4G

`/`, `/blog` ve `/urunler` 3 kez, diğerleri 1 kez ölçüldü.

| Sayfa | FCP | LCP | CLS | TBT | En uzun görev | DCL |
|---|---|---|---|---|---|---|
| `/` | 1096–1408 | **2652–2692** ✗ | 0–0,001 | **309–456** | 198–245 | 2,9 sn |
| `/urunler` | 1088–1156 | 1208–1224 | 0–0,001 | 82–113 | 132–142 | 2,9 sn |
| `/kategori/cilt-bakimi` | 1088 | 1088 | 0 | 139 | 172 | 2,4 sn |
| `/urun/…` | 1128 | 1336 | 0 | 113 | 163 | 1,3 sn |
| `/sss` | 1092 | 1248 | 0 | 90 | 127 | 1,2 sn |
| `/blog` | 1092–1176 | **4160–4372** ✗ | 0 | 114–134 | 164–173 | 2,3 sn |

HTML aktarımı (gzip / ham): `/` 156 KB / 1,40 MB · `/urunler` 160 KB / 1,55 MB · kategori 158 KB / 1,53 MB · PDP 66 KB / 515 KB · `/sss` 71 KB / 505 KB · `/blog` 129 KB / 906 KB.

### INP: etkileşim başına süre (ms; gecikme / işleme / sunum)

| Profil · sayfa | Menü aç | Menü kapat | Sepet aç | Sepet kapat | Kartta "Sepete ekle" | Sepet kapat (dolu) | Kartı aç |
|---|---|---|---|---|---|---|---|
| Mobil `/` (1. tekrar) | 240 (15/3/222) | 224 (2/186/35) | 24 | 296 (5/243/47) | **432** (55/5/372) | **568** (9/448/111) | 40 |
| Mobil `/` (2. tekrar) | 296 | **408** (8/338/62) | 32 | 208 | 344 | 416 | 40 |
| Mobil `/urunler` | 240–264 | 224–248 | 16 | 168–176 | 176–184 | 176–184 | 72–80 |
| Masaüstü `/` | Mega aç 56–64 | 32–48 | 16 | 72 | — | 16 | 24 |
| Masaüstü `/urunler` | Mega aç 48–56 | 24 | ≤ 16 | 72 | — | 16 | — |

Masaüstünde kartın "Sepete ekle" düğmesine Playwright normal tıklamayla tıklayamadı. Tilt animasyonu öğeyi sürekli hareket ettirdiği için "kararlı değil" hatası veriyor. Bu bir site hatası değil; zorla tıklamayla ayrıca trace alındı.

## 3. Animasyon akıcılığı

Kare değerleri ms cinsinden; ">16" ve ">33" ilgili eşiği aşan karelerin oranı.

| Senaryo | Masaüstü 1×: p95 / >16 / >33 | Masaüstü 4×: p95 / p99 / >16 / >33 | Mobil 4×: p95 / >16 |
|---|---|---|---|
| Hero Swiper "sonraki" ×2 | 8,1 / %0,6 / %0,2 | **70,9** / 104 / **%9,3** / %6,4 | — |
| Ana sayfa Lenis kaydırma (8400 px) | 12,0 / %1,0 / %0,3 | **104** / 121 / **%37,4** / %13,3 | 29,2 / %9,7 |
| Kapılar pin sahnesi (scrub) | 8,3 / %0,5 / %0 | **91,8** / 104 / **%22,5** / %9,3 | (pin yok, şerit) 16,6 / %4 |
| Vitrin hover renk geçişi (8 kart) | 4,4 / %0,3 / %0 | 21,1 / 83 / %5,5 / %4,5 | — |
| SVG near/parallax | 8,4 / %0 / %0 | **83,4** / 100 / **%30,2** / %11,7 | — |
| Kart tilt + hover, 20 kart (`/urunler`) | 8,5 / %0,4 / %0,4 | **70,7** / 83 / **%62,7** / %36,6 | — |
| Mega menü + Keşfet aç, kökler arası gezinme | 4,3 / %0,1 / %0 | 4,4 / 20,8 / %1,2 (en uzun kare **254**) | — |
| Akıllı header (aşağı + yukarı, `/urunler`) | 8,3 / %0 / %0 | **41,8** / 66,8 / **%43** / %10,3 | 8,4 / %0,8 |
| `/blog` kaydırma (SplitText) | 4,4 / %0,3 / %0 | 16,5 / 21 / %2,2 / %0 | 8,4 / %1,6 |
| `/sss` kaydırma (SplitText) | 4,3 / %0 / %0 | 17 / 37,5 / %4,9 / %1 | 8,5 / %1,6 |

**Boşta ana iş parçacığı yükü** (5 sn hiçbir etkileşim yok; ölçüm aracının kendi rAF'i dahil):

| Profil | `/` | `/urunler` | `/sss` |
|---|---|---|---|
| Masaüstü 1× | %37 | %17 | %14 |
| Masaüstü 4× | **%87** (26 uzun görev) | %29 | %27 |
| Mobil 4× | **%80** | %29 | %30 |
| Masaüstü 4×, `?motion=off` (taban) | %17 | %15 | %15 |

SplitText girişleri, mega menünün kendi açılışı, vitrin renk geçişi ve 1×'teki kart tilt'i kendi başına pahalı değil. Gözlenen kasmanın büyük kısmı P-01'in arka plandaki yükü ile P-05 ve P-06'daki zorunlu stil hesaplamalarından geliyor. 4× sonuçları P-01 düzeltildikten sonra yeniden ölçülmeli.

---

## 4. Bulgular

### P-01 · Engelleyici · Sonsuz `ScrollTrigger.refresh()` döngüsü (tüm sayfalar)

**Ölçüm**
- Boşta 5 saniyede 37–40 kez `ScrollTrigger.refresh()` çalışıyor (~7,5/sn). Bu `/`, `/urunler` ve `/sss`'te, masaüstü ve mobilde aynı. Trace'te en çok zaman alan JS her senaryoda `FunctionCall 2-_thx4bynqr1.js:1:2837`; bu, fx.ts:42'deki zamanlayıcı geri çağrısı.
- Tek bir refresh'in maliyeti: ana sayfada 4×'te ~68 ms (uzun görev), 1×'te ~14 ms. `/urunler` ve `/sss`'te 4×'te ~10 ms.
- Ana sayfa boştayken 10 saniyede 148 `DIV > DIV.pin-spacer`, 148 `DIV.pin-spacer > DIV.relative.isolate` ve 74 `BODY > DIV` eklemesi oluyor. Sayfa hareketsizken DOM sürekli değişiyor.
- Boşta 5 saniyede 951 `transitioncancel` olayı oluyor (P-07 ile birlikte) ve sürekli scroll olayları geliyor (fx `onScroll` 5 sn'de 875 kez çalıştı).
- Sonuç: 4×'te ana sayfa boştayken %87 meşgul. Kaydırma, pin, SVG ve kart hover senaryolarındaki %22–63'lük kare kaybının ana bileşeni bu.

**Kök neden: geri besleme döngüsü**
1. `src/lib/motion/runtime.ts:725-731`: belge MutationObserver'ı eklenen **her** element için `scan()`, `autoReveal()` ve `fx?.scan(n)` çağırıyor.
2. `src/lib/motion/fx.ts:354-359` → `scanFx()` (`fx.ts:136-140`), yeni bir şey bağlanıp bağlanmadığına bakmadan `refresh()` çağırıyor. Bu da 120 ms sonra `ScrollTrigger.refresh()` demek (`fx.ts:40-43`).
3. `ScrollTrigger.refresh()` kendisi DOM'a ekleme yapıyor:
   - viewport yüksekliğini ölçmek için `body`'ye 100vh'lik bir `div` ekleyip çıkarıyor (gsap `tD`, chunk `04s0sdy-i_vwo.js:1:15082`);
   - pin varsa (`src/components/motion/PinStage.tsx:81-104`) pin öğesini pin-spacer'a yeniden sarıyor.
4. Bu eklemeler 1. adımı yeniden tetikliyor, döngü sonsuza kadar sürüyor. Pin olmayan sayfalarda ölçüm `div`'i tek başına döngüyü sürdürmeye yetiyor.
5. Ek maliyet: aynı zincirde `markHeadings` (`fx.ts:50-62`) ve `autoReveal` (`runtime.ts:404-425`) her eklemede `getBoundingClientRect` çağırıyor.

**Önerilen düzeltme** (hareket-tasarimcisi)
- `fx.scan` yalnız gerçekten yeni bir `h2`/`[data-split]`, `[data-listing-hero]`/`[data-page-hero]` veya `[data-scroll-svg]` bağladığında refresh istemeli. `scanInto` bir bool döndürmeli, refresh buna bağlanmalı.
- runtime MutationObserver'ı GSAP'in kendi düğümlerini yok saymalı: `.pin-spacer` ve içindekiler, `body`'nin doğrudan çocuğu olan stilsiz ölçüm `div`'i, `.split-line`/`.split-line-mask`. Daha sağlam bir yol: yalnız `main`, `header` ve dialog köklerini izlemek; `body`'nin doğrudan çocuklarını filtrelemek.
- Gerekirse refresh'i `ScrollTrigger.refresh(true)` ile boşta çalıştırmak ya da yalnız `ScrollTrigger.sort()` kullanmak.

**Kabul ölçütü**
- Boşta 5 sn'de refresh sayısı 0 ve DOM eklemesi 0.
- 4× masaüstü ana sayfa boşta yükü ≤ %25.
- 4×'te ana sayfa kaydırmada ">16" oranı < %5.

**Yeniden üretme:** `/` sayfasını aç, DevTools Performance ile 5 sn boşta kaydet. Yaklaşık her 130 ms'de bir "Timer Fired → ScrollTrigger refresh" ve Elements panelinde yanıp sönen `pin-spacer` görülür.

### P-02 · Engelleyici · Mobil menü ve sepet INP'si 170–570 ms (KK-0-16)

**Ölçüm:** bkz. §2 INP tablosu. En kötü değerler mobil `/`'de "dolu sepeti kapat" 416–568 ms ve "kartta sepete ekle" 344–432 ms. `/urunler`'de 168–264 ms. Etkileşim trace'lerinde tek bir tam belge stil hesaplaması 3238–3763 element ve 4×'te 210–410 ms sürüyor.

**İzole ölçüm** (mobil, 4×, `?motion=off` ile aynı sonuç):

| Sayfa | DOM | `dialog.showModal()` | `close()` | `html.style.overflow` |
|---|---|---|---|---|
| `/` | 4122 | **192 ms** | 168 ms | 1–3 ms |
| `/urunler` | 2887 | **222 ms** | 97 ms | ~1 ms |
| `/sss` | 1107 | 40 ms | 25 ms | ~1 ms |

**Kök neden**
1. Chrome'da `showModal()` belgenin geri kalanını inert yapar ve **tüm belgede** stil hesaplaması tetikler. Maliyet DOM boyutuyla doğru orantılı. Çağrıldığı yerler: mobil menü açma onClick'i (chunk `0p17cvjtxj7qs.js:1:20621`, MobileNav düğmesi: `showModal()` + `overflow="hidden"`) ve CartDrawerPanel'in `useEffect`'i (chunk `44o_dd155jnk4.js:1:1616`). `overflow` değişikliği maliyetsiz; sorun DOM büyüklüğü × inert hesaplaması.
2. DOM büyük:
   - ana sayfa 4126 element (main 3270, footer 440; SVG düğümü 1374 = %33);
   - `/urunler` 2892 element (24 kart × 55 = 1320; footer 457);
   - kart başına glare, sweep, podyum blur ve hover açıklama paneli span'ları her kartta baştan render ediliyor (`src/components/product/ProductCard.tsx:111-114, 168`).
3. P-01 ve P-05 aynı etkileşim penceresinde ek zorunlu stil hesaplaması ekliyor: açılan panel DOM'u → fx.scan → headerLocked → `getComputedStyle`.

**Önerilen düzeltme**
- frontend-mimar:
  - ana sayfa ve listeleme için DOM bütçesi (öneri: ilk ekran sayfası ≤ 1500 element);
  - footer ve ekran dışı bölümlere `content-visibility: auto` + `contain-intrinsic-size` (inert hesaplamasının bu alt ağaçları atladığı ölçülerek doğrulanmalı);
  - drawer ve menü için modal stratejisinin yeniden değerlendirilmesi (ör. popover + odak tuzağı + yalnız `main` üzerinde `inert`; o da ölçülmeli).
- frontend-gelistirici: kart dekor span'larını tek pseudo-element'e indirmek veya ilk hover'da eklemek; dekoratif SVG'leri hafifletmek.
- P-01 ve P-05 düzeltmeleri.

**Kabul ölçütü:** mobil 4×'te `/` ve `/urunler`'de menü ve sepet açıp kapama, sepete ekleme ≤ 200 ms (2 tekrarın en kötüsü).

### P-03 · Engelleyici · `/blog` LCP görseli animasyonla gizleniyor (KK-0-19a, mobil LCP 4,2 sn)

**Ölçüm:** mobil LCP 4160–4372 ms; FCP 1092 ms, DCL 2,3 sn. Masaüstünde 1×'te bile FCP 220 → LCP 992 ms. LCP öğesi `page-blog-notebook.webp`. Görsel preload ediliyor ve 14 KB, yani sorun ağ değil.

**Kök neden:** `src/components/blog/BlogHero.tsx:52` görselin kapsayıcısında `data-motion="reveal-scale"` var. `src/components/motion/motion.css:253-259`, runtime gelene kadar `gl-fs` ile 2,5 sn opacity 0 uyguluyor; `:266` runtime gelince animasyonu duraklatıyor; `:291` görünür olunca 600 ms giriş oynatıyor. LCP, runtime'ın `data-motion-in` eklemesine ve animasyonun bitmesine bağlanmış. Runtime'ın "fold üstü asla gizlenmez" kuralı (`runtime.ts:404-412`) yalnız `autoReveal` için geçerli; elle yazılmış `data-motion`'ı kapsamıyor.

**Aynı kalıbın riskli olduğu yerler (ölçülmedi):** `src/components/blog/ArticleView.tsx:85` (blog yazısı üst görseli), `src/components/coming-soon/ComingSoonPage.tsx:49`, `src/components/coming-soon/NotFoundContent.tsx:97`.

**Önerilen düzeltme**
- frontend-gelistirici: ilk ekrandaki görsel kapsayıcılarından `data-motion` kaldırılmalı.
- hareket-tasarimcisi: CSS'te ön-runtime gizleme fold üstü için hiç uygulanmamalı. Bunun yerine görünürlüğü JS ile ekleyen tersine bir model, ya da `reveal-scale` için opacity yerine yalnız `scale` kullanılması düşünülebilir.

**Kabul ölçütü:** `/blog` mobil LCP ≤ 2,5 sn ve `?motion=off` ile farkı ≤ 100 ms (KK-0-19a).

### P-04 · Engelleyici · Ana sayfa mobil LCP 2,65–2,69 sn (KK-0-16)

**Ölçüm:** LCP öğesi mobil hero görseli (`hero-canopy-blue-sky-mobile.webp`, 828w avif 56 KB). FCP 1,1 sn, LCP 2,66 sn. HTML'de görsel preload'ı 0. Hedefi ~160 ms aşıyor.

**Kök neden:** `src/components/sections/home/HeroCollage.tsx:126-141` (`ArtDirected`) `getImageProps` ile bir `<picture>` üretiyor. `priority` geçirilse de `getImageProps` preload üretmiyor ve oluşan `<img>`'de `fetchpriority` yok. Gelen HTML'deki etiket: `<img alt="" decoding="async" … sizes="80vw" src="…w=3840…">`. Görsel ancak HTML ayrıştırıldıktan ve layout'tan sonra düşük öncelikle isteniyor. Büyük HTML (156 KB gz) bunu ayrıca geciktiriyor (P-08).

**Önerilen düzeltme** (frontend-gelistirici)
- `<img fetchPriority="high">` eklenmeli.
- Her iki kaynak için `ReactDOM.preload(src, { as: "image", imageSrcSet, imageSizes, media, fetchPriority: "high" })` çağrılmalı: mobil `(max-width: 639px)`, masaüstü `(min-width: 640px)`.

**Kabul ölçütü:** mobil `/` LCP ≤ 2,5 sn, 3 tekrarın en kötüsü.

### P-05 · Önemli · `headerMo`, `style` yazımlarında zorunlu stil hesaplaması tetikliyor

**Ölçüm:** `/urunler`'de header gizliyken 20 kart üzerinde hover: 4×'te 80 zorunlu stil hesaplaması, toplam 746 ms (chunk `2-_thx4bynqr1.js:1:3128` = `headerLocked`). 4×'te kart hover'da ">16" oranı %62,7, p95 70,7 ms. Mobil ana sayfa kaydırmasında 152 zorunlu hesaplama, 347 ms.

**Kök neden:** `src/lib/motion/fx.ts:193-196` ve `:326`. MutationObserver `body` alt ağacında `style` özniteliğini izliyor. Header gizliyken (`hidden === true`) her stil yazımı (GSAP tilt `quickTo`, `--glare-x/y`, Swiper ilerleme çubuğu, pin transform'ları) `headerLocked()` çağırıyor (`fx.ts:164-173`). O da `:focus-within`, `querySelector` ve `getComputedStyle(html/body).overflowY` ile kirli stili zorla hesaplatıyor.

**Önerilen düzeltme**
- `attributeFilter`'dan `style` çıkarılmalı. Scroll kilidi için yalnız `html` ve `body` alt ağaçsız (`subtree: false`) izlenmeli.
- Kontrol tek rAF'e toplanmalı.
- `overflow` okumak yerine kilit durumu açan bileşenden bir bayrakla alınmalı (ör. `html[data-scroll-lock]`).

### P-06 · Önemli · Akıllı header scroll işleyicisi her olayda layout okuyor

**Ölçüm:** `/urunler`'de aşağı ve yukarı kaydırma, 4×: ">16" oranı %43, p95 41,8 ms. Zorunlu hesaplama 1,2 sn / 2,3 sn senaryo. Scroll olay dağıtımı 1031 ms.

**Kök neden:** `src/lib/motion/fx.ts:181-191`. Her scroll olayında `h.offsetHeight` (`:188`) ve `headerLocked()` (`getComputedStyle` ×2, `:focus-within`, `querySelector`) çalışıyor. Lenis her karede scroll olayı ürettiği için bu her kare oluyor. GSAP ScrollTrigger'ın scroll okuması (chunk `04s0sdy-i_vwo.js:1:1420`, `tx`) aynı karede kirli stile denk geliyor.

**Önerilen düzeltme:** header yüksekliğini `ResizeObserver` ile önbelleğe almak; kilit durumunu olay veya bayrakla tutmak (P-05); scroll'da yalnız `scrollY` okumak. İsteğe bağlı: header gizle/göster kararını `ScrollTrigger.create({ onUpdate: self => self.direction })` ile vermek.

### P-07 · Önemli · Hero ilerleme çubuğu: her karede yazım + K-231 taban geçişi + ekran dışında autoplay

**Ölçüm:** ana sayfada 1600 px aşağıdayken (hero görünmüyor) boşta 5 sn'de 951 `transitioncancel` olayı, hepsi `SPAN.absolute.inset-0.origin-left :scale`. React kök dinleyicisine dağıtım 4× mobilde ~140 ms/5 sn. Çubuk görsel olarak 250 ms geriden geliyor.

**Kök neden**
- `src/components/sections/home/HeroSwiper.tsx:88`: `autoplayTimeLeft` her rAF'te `scale` yazıyor.
- `HeroSwiper.tsx:195`: çubuğun sınıfında `rounded-pill` var. Bu yüzden `motion.css` K-231 taban kuralına giriyor (`@layer base`, `:where(… [class*="rounded-pill"] …)` satır 1601-1613) ve `transition: scale 250ms` alıyor. Her karede yeni bir geçiş başlıyor, öncekini iptal ediyor.
- Swiper autoplay'i hero ekran dışındayken de sürüyor. K-205'teki "ekran dışında durur" davranışı Swiper.js geçişinde (K-259) kaybolmuş; kodda IntersectionObserver yok.

**Önerilen düzeltme**
- Çubuğa `transition: none`. Daha iyisi: ilerlemeyi `animation-duration: 7s` olan bir CSS animasyonuna bırakıp Swiper'ın pause/resume olaylarında `animation-play-state`'i değiştirmek.
- Hero görünmezken `autoplay.pause()` (IntersectionObserver).
- hareket-tasarimcisi K-231 taban listesindeki `[class*=…]` alt dize seçicilerini gözden geçirmeli. Ölçüme göre tam stil hesaplamasının ~%18'i bu 9 kuraldan geliyor (ana sayfada 45 → 37 ms) ve bu tür istenmeyen eşleşmelere yol açıyor.

### P-08 · Önemli · Ana sayfa mobil TBT 309–456 ms; HTML/RSC yükü büyük

**Ölçüm:**
- Mobil `/`: TBT 309–456 ms, en uzun görev 198–245 ms, DCL 2,9 sn. `/urunler`: TBT 82–113 ms, DCL 2,9 sn.
- Ham HTML: `/` 1,40 MB, `/urunler` 1,55 MB. Ürün kartı olmayan `/sss` bile 505 KB; bunun 391 KB'ı satır içi RSC script'i.

**Kök neden**
- Kabuk (header + menü) RSC yükü sayfa başına ~378 KB ham. İçinde 116 ürünün fiyat, üye fiyatı ve PV'si, 272 görsel alanı, 51 `blurDataURL` ve 156 kategori sayacı var. Mega menü ve mobil menü verisi istemci bileşenine prop olarak geçiyor.
- Ana sayfa 4126 element, 205 satır içi SVG.

**Önerilen düzeltme** (frontend-mimar)
- Menü panel verisini (öne çıkan ürünler, görseller) panel açılınca veya hover niyetiyle ayrı bir istekle almak. K-263'teki "menüler tembel" kararını veri tarafına da uygulamak.
- Kabuktan `blurDataURL`'leri çıkarmak.
- Ana sayfa bölüm SVG'lerini hafifletmek.

### P-09 · Önemli · SVG `near`/parallax: her karede üst öğe taraması

**Ölçüm:** 1×'te 168 zorunlu stil hesaplaması (chunk `0-ekll-17p-4i.js:1:8260`). 4×'te SVG near senaryosunda ">16" oranı %30, p95 83 ms (P-01 dahil).

**Kök neden**
- `src/lib/motion/runtime.ts:496` → `svgHostOf()` (`src/lib/motion/svg-interact.ts:114-121`). Her parallax karesinde `getComputedStyle(n).pointerEvents` ile üst öğeleri yürüyor.
- Ek olarak `fx.ts:275-291`: her `pointermove`'da her `near` host'u için `getBoundingClientRect` ve `querySelectorAll`.

**Önerilen düzeltme:** host'u `initSvg`'de bir kez hesaplayıp saklamak (`svgHosts` haritası zaten var). `near` dikdörtgenlerini scroll ve resize'da önbelleğe almak, `pointermove`'da yalnız aritmetik yapmak. `querySelectorAll` sonuçlarını önbelleğe almak.

### P-10 · Küçük · Lenis tik sırası

**Ölçüm:** 1×'te ana sayfa kaydırmasında `Lenis.setScroll` içinde 1237 zorunlu stil hesaplaması, toplam ~150 ms (4×'te ~600 ms).

**Kök neden:** `src/lib/motion/lenis.ts:97-99`: `gsap.ticker.add(tick)` GSAP tween'leri stil yazdıktan sonra çalışıyor, ardından `scrollTo` kirli stili zorla hesaplatıyor.

**Önerilen düzeltme:** `gsap.ticker.add(tick, false, true)` (öncelikli tik), sonra yeniden ölçüm.

### P-11 · Küçük · Boşta sürekli çalışan döngüler

- `src/lib/motion/runtime.ts:612-616`: `introWatch` `setInterval(250)` yalnız sayfadan çıkınca duruyor; ana sayfada kalındıkça sonsuza dek çalışıyor. Öneri: `whenHeroIntroDone` sonrasında durdurmak.
- Hero Swiper autoplay rAF'i ekran dışında çalışıyor (P-07).
- ScrollTrigger'ın iç rAF döngüsü ve GSAP ticker kütüphane davranışı; dokunulmasına gerek yok.

### P-12 · Küçük · Pin sahnesi kontur başlığı

1×'te sahne akıcı (p95 8,3 ms, ">16" %0,5). Ancak `src/components/motion/PinStage.tsx:117-124` dev SVG metnin `stroke-dashoffset`'ini scrub ile her karede değiştiriyor ve bu her karede yeniden boyama demek (pin senaryosunda 1×'te Paint 492 ms / 5,5 sn). P-01 sonrasında 4×'te yeniden ölçülmeli. Gerekirse kontur çizimi bir `clip-path`/mask transform'una çevrilebilir ya da metin rasterlaştırılabilir.

### P-13 · Öneri · Mega menü ilk açılış

4×'te ilk açılışta tek kare 254 ms (tembel chunk + panel mount). Mobil menü düğmesinde `onPointerEnter` ile önden yükleme var; aynısı mega menü tetiğine de uygulanırsa ilk açılış takılması azalır. Sonraki açılışlar akıcı (p99 20,8 ms).

## 5. Sorunsuz bulunanlar

- CLS tüm sayfa ve profillerde 0–0,001. Pin `pinType: transform` ve hero girişi kayma üretmiyor.
- İlk yük JS bütçesi (K-263, ≤ 220 KB gz) geçti: 202–209 KB.
- Masaüstü 1×'te tüm hareket senaryoları akıcı. Masaüstü INP ≤ 72 ms.
- `motion.css` keyframe'leri yalnız `translate`/`rotate`/`scale`/`opacity` kullanıyor (bileşimci dostu). Tek istisna `stroke-dashoffset` çizimleri. Sürekli animasyon yalnız marquee ve yükleyicide var.
- GSAP ile sürülen öğelerde (kart karosu, pin görselleri, mıknatıslı CTA, scroll SVG) CSS `transform` geçişiyle çakışma yok. Karo yalnız `box-shadow` geçişi alıyor.
- SplitText girişleri `/blog` ve `/sss`'te 1×'te sorunsuz.

## 6. Devir notları

- `docs/ekip/devir/2026-11-18_kalite-denetcisi_hareket-tasarimcisi_performans-1.md`: P-01, P-05, P-06, P-07, P-09, P-10, P-11, P-12 (+ P-03 CSS kuralı)
- `docs/ekip/devir/2026-11-18_kalite-denetcisi_frontend-gelistirici_performans-1.md`: P-03, P-04, P-07 (HeroSwiper), P-02 (kart DOM), P-13
- `docs/ekip/devir/2026-11-18_kalite-denetcisi_frontend-mimar_performans-1.md`: P-02 (modal stratejisi, DOM bütçesi), P-08

**Yeniden denetim sırası:** önce P-01 (diğer 4× ölçümlerinin çoğunu değiştirir), sonra P-03 ve P-04, ardından P-02 ve P-05…P-07. Ölçüm betikleri aynı profillerle yeniden çalıştırılacak.
