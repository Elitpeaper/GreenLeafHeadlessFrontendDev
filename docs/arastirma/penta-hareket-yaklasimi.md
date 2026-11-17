# Penta Yazılım — hareket/CSS yaklaşımı (K-265)

Tarih: 2026-11-17. Yöntem: curl ile HTML/JS/CSS (önbellek `.cache/arastirma/penta/`). Ekran görüntüsü alınamadı (tarayıcı aracı yok); yerine kod kanıtı. **Gözlem** = kaynaktan okunan, **Yorum** = çıkarım.

## 1. Ajans ve portföy
- Site: https://www.pentayazilim.com (doğrulandı; Laravel + Vite, `build/assets/app-*.js`; footer "©2026"). Referanslar: https://www.pentayazilim.com/referanslar/ (sitemap'te ~462 URL, 15 sayfalık liste).
- **2026 yapımı listesi çıkarılamadı:** referans kartlarında yıl yok; sitemap `lastmod` (2026-05-19) toplu güncelleme tarihi, proje tarihi değil. Tek 2026 işareti: Ravena'nın footer'ında "©2026 Penta Yazılım". Öneri: kullanıcıdan 2026 yapımlarının adını al.
- Liste (ilk sayfa, 32): Sahibinden Sürdürülebilirlik, TCDD Teknik, EAE Aydınlatma, Oyak Savunma, B&C Marine, Emre Arolat, DAF Kilit, SOCRadar, 1000 Yatırımlar, Öztreyler, CTech, Beşiktaş Group, Koç Ü., İAB TR, Asır Group, Chapter Zero, Sarmakina, Seed Real Estate, Gersan, iKasa, KOP, Friterm, Sütiş, Dearsan, Ece Boya, Doğa Holding, Nakkaş Holding, Miray Medikal, Çevko, Coliseum, BinBin, Net Components. Sitemap'te ayrıca zeops, tela, steelin, remax vb. var.

## 2. Ravena — bulundu
- Referans sayfası: https://www.pentayazilim.com/referanslar/ravena/ · Site: **https://ravena.com.tr/** (duvar kağıdı markası; footer Penta imzalı).
- Pin sahnesi: ana sayfada `<section class="collections">` ("Koleksiyonlar": Yazmin / Kahkashan / Spectrum). `pin-spacer` çalışma zamanında GSAP tarafından eklenir (statik HTML'de yok); kaynak: ana sayfa inline `<script>` (satır ~2118–2215) + `assets/css/main.css` (`#index .collections …`).

## 3. Kütüphane yığını (kanıt)
| Site | Kütüphaneler |
|---|---|
| ravena.com.tr | **GSAP 3.9.1 + ScrollTrigger 3.9.1 + SplitText + DrawSVGPlugin**, **SmoothScroll.js** (Lenis değil), Swiper bundle, jQuery, VanillaTilt, ScrollReveal, Fancybox. Font Montserrat. `assets/plugin/gsap/*.min.js` |
| gersan.com.tr (WP tema bundle) | GSAP + ScrollTrigger 3.13.0 + ScrollSmoother (pakette), **Lenis (varsayılan ayar)**, Swiper |
| nakkasholding.com.tr | GSAP + ScrollTrigger 3.15.0 + SplitText, DrawSVG, ScrollTo, CustomEase, **Lenis `{duration:1.7}`**, Swiper, Fancybox, flatpickr |
| pentayazilim.com | Vite paketi, `vendor-*.js`; GSAP/Lenis izi bulunmadı (ayrı yığın) |

Yorum: Penta'nın güncel WP temaları = GSAP + ScrollTrigger + Lenis + Swiper (K-256 ile birebir örtüşür). Ravena eski nesil (jQuery + SmoothScroll.js).

## 4. Smooth scroll ayarları
- Ravena (`assets/js/main.js`): `SmoothScroll({animationTime:1000, stepSize:100, accelerationDelta:100, accelerationMax:2})`; Safari'de kapalı.
- Nakkaş: `new Lenis({duration:1.7}); sc.on('scroll', ScrollTrigger.update); rAF ile sc.raf`. (ticker bağlantısı da var: `gsap.ticker.add`.)
- Gersan: `if(!isMobile){ const n=new Lenis; n.on('scroll',ScrollTrigger.update); gsap.ticker.add(t=>n.raf(t*1e3)); gsap.ticker.lagSmoothing(0) }` — **yalnız masaüstü**, standart Lenis kurulumu.
- Önerimiz (Orkestratör'ün K-258'iyle uyumlu): Lenis `duration` 1.2–1.7 aralığı Penta'ya yakın; mobilde kapalı.

## 5. Ravena pin sahnesi — yeniden üretim tarifi
**Konsept:** 100vh koyu sahne; dikey kaydırma sabitlenir; 3 koleksiyonun metni değişir, solda işaretçi çubuğu aşağı kayar, sağda 3 görsel alttan yukarı perde gibi açılarak üst üste biner. Yatay kayma yok, dikey scrub.

**DOM iskeleti (sadeleştirilmiş)**
```
section.collections            (height:100vh; position:relative; z-index:100)
  .background                  (koyu #292929 + texture.jpg %15 opak; sonradan height ile dolar)
  .container                   (max 1440, px 30, height 100%)
    .wrapper                   (grid; columns: 50px | 15fr | 40fr; gap 60px; align center)
      .bar                     (svg.marker ▶ + svg.points: çizgi 0/1/2 + ince cetvel)
      .content > .contexts     (position:relative; padding 150px 0)
        .item ×3               (position:absolute; opacity 0; translateY(30px); transition .45s ease)
          .headline, a.title(2.5rem bold), .expo, .button-wrapper
      .images > .list          (position:relative; height calc(100% - 120px))
        .item ×3               (position:absolute; inset 0; height:0 [ilki 100%]; overflow:hidden)
          .image > img (cover) + a.video (fancybox)
    .side-text > svg > text    ("KOLEKSIYONLAR", 5rem, fill none, stroke beyaz %50, dasharray 290)
```
Kritik CSS: `.item.active{opacity:1;transform:none;transition-delay:.3s}`; `.marker{transition:.3s ease all}`; `.line.active{fill:#fff}`; görseller `height:0 → 100%` (üst üste, `overflow:hidden` kırpar → alttan açılma/perde etkisi). JS ile `.image` boyutu `.list` boyutuna sabitlenir (kırpılan görsel büzülmesin).

**ScrollTrigger parametreleri (birebir)**
```js
// Ana pin zaman çizelgesi
col_tl = gsap.timeline({ scrollTrigger: {
  trigger: '#index .collections',
  start: 'center center',
  end: 'bottom+=2000 center',   // ≈ 2000 px ek kaydırma
  scrub: 2,                     // 2 sn yumuşatma
  pin: true,
  pinSpacing: 'margin',
  snap: [0, 0.6, 1],            // 3 duraklı mıknatıs
  onUpdate: self => collection_change((self.progress*100).toFixed(0))
}});
items.forEach((item,i)=> col_tl.to(item,{height:'100%'}, i==1 ? 0.25 : i)); // 1. görsel zaten açık; 2. görsel t=0.25, 3. t=2
// Yan yazı: konturu çizme
gsap.to('.side-text svg text',{ scrollTrigger:{trigger:'.collections',start:'center bottom',end:'bottom+=500 bottom',scrub:true}, strokeDashoffset:0 });
// Arka plan yüksekliği dolar
gsap.to('.collections .background',{ scrollTrigger:{trigger:'.collections',start:'top bottom',end:'bottom bottom',scrub:true}, height:'100%' });
```
**Durum makinesi (`collection_change`)**: ilerleme % → aktif indeks: 0–20 → 0; 20–85 → 1; 85–100 → 2. Aktif indekse göre: `.contexts .item` üzerinde `active` sınıfı, `.points .line--i` `active`, marker `top = çizginin offset farkı`. Not: eşikler tam 20/85/100 değerlerinde boşluk bırakıyor (kenar durumu hatası); biz `<`/`>=` ile yazmalıyız.

**Zaman çizelgesi (progress 0→1)**
1. 0: görsel 1 açık, metin 1 aktif (snap 0).
2. 0.25–1.25 civarı: görsel 2 `height 0→100%` (alttan perde); %20 sonrası metin 2 (0.45 sn fade+yükselme, 0.3 sn gecikme), çubuk işaretçisi 2. çizgiye (0.3 sn).
3. 2'ye doğru: görsel 3 açılır; %85 sonrası metin 3.
4. Snap noktaları 0 / 0.6 / 1; sonunda pin çözülür, sayfa devam eder.
Yorum: zaman çizelgesi birimleri (0.25, 1, 2) toplam süreyi 3 birim yapıyor; 0.6 snap'i ikinci slaydı durdurur.

**Responsive / reduced-motion**: Sahne yalnız `width > 900` için JS'te kurulur; ≤900 px `.collections{display:none}` ve yerine `.collections-mobile` Swiper (speed 1000, slidesPerView 1 → 1.5 → 2 → 3, ok düğmeleri). `prefers-reduced-motion` Ravena'da **yok** (Safari'de yalnız yan yazı animasyonu kapatılıyor). Gersan/Nakkaş temalarında `isReduced`, `isMobile` global bayrakları var.

**Bizim uygulama (Next.js + GSAP + Lenis) eşlemesi**
- `useGSAP`/`useLayoutEffect` içinde `gsap.matchMedia()`: `(min-width:901px) and (prefers-reduced-motion:no-preference)` → pin sahnesi; aksi halde Swiper/dikey yığın.
- Lenis: `lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t=>lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0)`.
- Pin: `scrub: 2` (Ravena) — hızlı yanıt için 1; `pinType: 'transform'` Lenis ile daha güvenli (K-260 ile aynı).
- Metin değişimi: `onUpdate` yerine `snap` + `onSnapComplete` ya da `ScrollTrigger.create` ile eşik `progress`; sınıf geçişi CSS'te (0.45 sn / 0.3 sn gecikme).
- Greenleaf için uyarlama: koleksiyon yerine Setler/premium seriler; görsel perdesi = ürün/atmosfer görseli.

## 6. Giriş / scroll reveal desenleri (Ravena `main.js`)
- **SplitText**: `triggered_split_text(selector, 'lines|words|chars', duration, stagger)`: parçalar `y:90, opacity:0` → `y:0, opacity:1`; `scrollTrigger:{start:'top-=50% bottom'}` (öğe görünüm alanının 1,5 katı altından bile erken tetiklenir). Satır sınıfı `split-line` (maske için `overflow:hidden` ile eşleşir).
- **Logo reveal**: gsap timeline, çizgi `scaleX:1; x:'50%'` + başlık/alt yazı zıt yönlü `y:-120% / 250%`, stagger 0.2, süre 0.5.
- **Header "akıllı menü"**: aşağı kaydırınca `hidden is-fixed`, yukarı kaydırınca geri gelir (>50 px sonrası), sticky öğelerin `top`'u header yüksekliğine uyarlanır.
- **Scroll-top**: SVG halka `strokeDashoffset` scrub (tüm sayfa ilerlemesi); >yarım ekran sonra görünür.
- **Breadcrumb parallax**: arka plan `scale:1.1`, `scrub:true`, `start:'top top' end:'bottom top'`.
- **Yan dev yazı**: SVG kontur çizme (`stroke-dashoffset` scrub), yalnız masaüstü, Safari'de kapalı.

## 7. Hover / imleç
- **VanillaTilt** menü koleksiyon kartlarında `max:15, speed:1000, glare:true, max-glare:.75, scale:1.1, easing:cubic-bezier(.10,.98,.52,.99)`; koleksiyon kartlarında `max:7.5, speed:1500, scale:1.05` (yalnız >900 px).
- Video düğmesi: ikon `translateX(3px) scale(1.25)`, `.3s ease`; arkasında `blur(30px)` beyaz hale %50.
- Özel imleç Ravena'da **yorum satırına alınmış** (`.cursor` x 0.3 sn, `.cursor-follow` x 0.6 sn; hover'da küçük nokta 0, halka 1.5×) — yani tasarlanıp kapatılmış. Nakkaş'ta swiper slayt değişiminde SVG halka `stroke-dasharray` 240→440 (1 sn / 5 sn) ile dolan imleç göstergesi var; magnetic button izine rastlanmadı.
- Genel geçiş süresi: `.3s ease` (düğme/bağlantı/form), kart metin geçişleri `.45s`.

## 8. CSS yaklaşımı (Ravena `main.css`)
- Montserrat variable, `font-display:swap` + `size-adjust/ascent-override` (CLS önleme); `body{font-size:16px;line-height:1}`; sıfırlama sonrası her şey sınıf bazlı.
- Kapsayıcı: `.container{max-width:1440px;padding:0 30px}`; modifikasyon sınıfları `--narrow/--narrower`; `grid` + `columns--N` yardımcıları; `grid-gap:30px/60px`.
- Birimler: sabit px + rem (`2.5rem`, `5rem`); **clamp/fluid yok**; kırılımlar 481/601/769/901/1025/1201/1441.
- Değişkenler: yalnız `--header-height:100px`; renkler sabit hex (#4f1562 mor, #292929, #6a6a6a, #f2f2f1).
- Easing: `ease`; özel eğri yalnız `cubic-bezier(.10,.98,.52,.99)` (tilt). Scroll bar: 5 px, mor.
- Kod hijyeni uyarısı (almamalıyız): `-webkit-user-select:none` (body), `outline:unset !important`, bozuk dekleral (`height:height:calc(...)`), jQuery bağımlılığı, `getBBox` ile elle boyutlama.

## 9. Greenleaf için çıkarım (seçenekler, karar ui/hareket'te)
| Desen | Öneri |
|---|---|
| Dikey scrub'lı pin + perde görsel + metin değişimi | **Alalım ama uyarlayalım** (K-257/K-260 ile birleşik: yatay yerine dikey seçenek; mobil/reduced'de statik) |
| SplitText satır/kelime reveal (`y:90`, stagger) | Alalım (başlıklarda; SplitText artık GSAP ücretsiz paketinde) |
| Yan dev kontur yazı çizimi | Alalım (K-234 colossal tipografiyle uyumlu) |
| Header gizle/göster | Alalım |
| VanillaTilt kartlar | Almayalım (mobil/erişilebilirlik, GSAP ile hafif tilt yeterli) |
| Scroll-top halka ilerleme | Alalım (küçük, SVG dashoffset) |
| Özel imleç | Almayalım (Penta bile kapatmış) |
| jQuery, SmoothScroll.js, ScrollReveal | Almayalım (K-256: Lenis/GSAP) |

## 10. Açık noktalar
- 2026 proje listesi çıkarılamadı (yıl bilgisi yok) — kullanıcıdan teyit.
- Canlı görsel/video kanıtı yok (tarayıcı aracı yok); pin davranışı koddan çıkarıldı. Gerekirse ekran görüntüsü için Orkestratör gerçek tarayıcıda https://ravena.com.tr/ ana sayfayı gezmeli.
- Ravena SmoothScroll.js kullandığından "birebir hissi" için Lenis `duration≈1.2–1.7`, `lerp` varsayılan; farkı görsel olarak denemek gerekir.
