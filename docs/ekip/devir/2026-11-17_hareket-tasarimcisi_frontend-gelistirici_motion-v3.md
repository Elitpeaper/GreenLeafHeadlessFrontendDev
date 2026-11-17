---
kimden: hareket-tasarimcisi
kime: frontend-gelistirici (A, B, C)
tarih: 2026-11-17
durum: AÇIK
ilgili: K-231, K-233, K-234, K-243, K-244, K-250…K-253 (ÖNERİ), docs/tasarim/hareket.md §21–§25, docs/tasarim/briefler/ana-sayfa-maximalist.md
---

## Ne yaptım
- **K-231 tabanı:** `motion.css` artık hover, odak ya da durumla değişen her öğeye 250 ms geçiş veriyor (`@layer base`, sıfır ağırlık). Renk, zemin, gölge ve opaklık doğrusal; kayma ve ölçek ease-out. Bu geçiş yumuşak (reduced) katmanda da, JS kapalıyken de çalışıyor. Sizin `transition-*` sınıfınız her zaman önce gelir. Süre vermediğiniz Tailwind `transition*` sınıfları 250 ms oldu. **Sizden sınıf eklemeniz gerekmiyor.**
- **v2 hatası düzeldi:** hap düğmelerin basma kuralı (`rounded-pill`), footer bağlantıları ve `shadow-tile` karolar sizin renk/gölge geçişinizi siliyordu; hover rengi anlık değişiyordu. Artık yumuşak.
- **K-233 hero girişi:** `<HeroIntro>`, `<IntroLogo>` ve `whenHeroIntroDone()` hazır. Canlı örnek önizleme derlemesinde `/hareket-lab/v3` adresinde.
- **K-234:** `<Collage>`, `<Drift>` (`data-drift-axis="x"` yatay) hazır.

## Senden istediğim

### B — ana sayfa hero (K-233, K-243, K-244)
```tsx
import { HeroIntro, IntroLogo } from "@/components/motion";
import { whenHeroIntroDone } from "@/lib/motion";

<HeroIntro as="section" className="relative h-svh ...">           {/* kalıcı sahne: zemin + logo */}
  <IntroLogo className="w-[88px] lg:w-[136px]">
    <Image src="/brand/greenleaf-mark.svg" alt="" width={136} height={136} priority unoptimized />
  </IntroLogo>
  {/* slayt 1 metni */}
  <p data-motion-part="eyebrow">…</p>
  <h1 data-motion-part="title">…</h1>
  <p data-motion-part="lead">…</p>
  <div data-motion-part="cta">…</div>
  {/* sağ kolaj: arkadan öne */}
  <div data-motion-part="layer" style={{ "--i": 0, "--from-x": "-60px", "--from-r": "-20deg" }}>…</div>
  <div data-motion-part="media">…hero fotoğrafı (asla gizlenmez)…</div>
</HeroIntro>
```
- Logo görseline sınıf, filtre ya da `transform` vermeyin. Hareket eden yalnız `IntroLogo` sarmalayıcısıdır. Logo kendi kendine ekran dışından, 1,5 tur yuvarlanarak gelir.
- `HeroIntro` swiper kökünü değil, **kalıcı sahneyi** sarar. Giriş yalnız 1. slaytın metin ve kolajında oynar; slayt geçişleri swiper'ın kendisinindir.
- **Otomatik geçiş (K-243):** saat `HeroSwiper` içinde şöyle başlatılır:
  ```ts
  useEffect(() => { let live = true; whenHeroIntroDone(rootRef.current).then(() => live && start()); return () => { live = false; }; }, []);
  ```
  Ardından 1. slayt tam aralığını (≥ 7 sn) bekler. Giriş oynamıyorsa (istemci dönüşü, azaltılmış hareket) hemen çözülür.
- **Tekrar yok (K-244):** ayrıca bir şey yapmanız gerekmez. `html[data-intro]` ilk istemci gezinmesinde kalkar.
- Eski `M-2` işaretlerini (`data-motion="M-2"`) yeni hero'da kullanmayın; H1'e `anim-*` sınıfı vermeyin.

### B — maximalist ana sayfa (brief §3, §10)
- **H-5 dev şerit:** satır zeminlerini metinden ayrı bir mutlak katmana koyun (`<div aria-hidden data-motion="band">` + 3 çocuk). Metin `scaleX` almaz.
- **S-1:** her metin satırını `<Drift data-drift-axis="x" drift="-120px">` ile sarın; satırlara sırayla `+`/`−` değer verin. Kapsayıcı `overflow-hidden` olmalı; metin, kaymayı kaldıracak kadar tekrar içermeli.
- **V-1:** dev ikon sarmalayıcısına `key={sekme}` ve `data-motion="fade-in"` verin.
- **Kolaj bölümleri:** `<Collage>` + parça başına `--i`, `--from-x/-y/-r`. Parçanın son eğimi kendi `rotate-*` sınıfıdır.
- **§10 SVG haritası:** davranışların hepsi mevcut `data-svg-interact` değerleriyle karşılanıyor (hareket.md §24 tablosu).

### A, B, C — K-231 aykırılıkları (sahiplerin dosyaları; ben dokunmadım)
1. **Reduced'da anlık sıçrayanlar** (`motion-safe:transition-*` reduced'da geçişi siliyor):
   - `src/components/shell/AddToCartButton.tsx:65` — `motion-safe:transition-[grid-template-columns,opacity]`. Reduced'da etiket genişliği ve opaklığı anlık değişiyor; `grid-template-columns` ayrıca layout özelliği. Öneri: `transition-opacity` her katmanda kalsın, genişlik açılması `motion-safe:` altında kalsın ya da etiket `opacity` + `translate` ile gösterilsin.
   - `src/components/product/ProductCard.tsx:297` — `group-hover/mini:scale-105` koşulsuz, geçiş ise `motion-safe:`. Öneri: ölçeği `motion-safe:group-hover/mini:scale-105` yapın, `motion-safe:transition-[scale]` sınıfını kaldırın (taban geçiş zaten var).
2. **Reduced'da hareket edenler** (hover kayma, ölçek ya da basma `motion-safe:` olmadan yazılmış; yumuşak katmanda "konum/ölçek hareketi kaldırılır" kuralına aykırı). Her birine `motion-safe:` öneki ekleyin, örneğin `motion-safe:group-hover:-translate-y-1`:
   - `sections/home/CategoryStrip.tsx:48, 49`
   - `sections/home/HomeTeasers.tsx:58, 71, 89, 100, 113, 129`
   - `sections/home/HomeSlides.tsx:215`
   - `sections/home/HeroSwiper.tsx:170` (`active:scale-95` dahil)
   - `product/TeaserCard.tsx:22`
   - `sections/Hero.tsx:57`
   - `sections/PageHero.tsx:76`
   - `sections/parts.tsx:134`
   - `ui/ButtonLink.tsx:9` (`active:scale-[0.98]`), `ui/ButtonLink.tsx:46`
   - `blog/BlogHero.tsx:41`
   - `coming-soon/ComingSoonPage.tsx:63`
   - `finder/FinderApp.tsx:225`

   (`Footer.tsx:51, 93` ve `ForestPanel.tsx:15` zaten doğru. Akordeon oklarının 180° dönüşü bir durum göstergesi olduğu için kalabilir.)
3. **Layout özelliği canlandıranlar:** `sections/home/HeroSwiper.tsx:238` — `transition-[width,background-color]` (nokta genişliği). Öneri: sabit genişlikli nokta + `scale-x` ya da iç çubukta `scaleX`. Aynı sorun `AddToCartButton.tsx:65` (`grid-template-columns`) için de geçerli.
4. Bundan sonra `transition: none`, `duration-0`, `transition-none` ya da `motion-safe:transition-*` kullanmayın. Hover'da renk değiştiren öğeye yalnız `transition-transform` vermeyin; `transition-[color,background-color,translate]` gibi tam liste yazın ya da hiç yazmayın (taban halleder).

## Bilmen gerekenler
- Odak halkası (`outline`) bilerek anında görünür (WCAG 2.4.7).
- `motionExit()` reduced'da artık 250 ms solma yapıyor (eskiden anında kaldırıyordu). Çağrı biçimi aynı.
- Kanıtlar `docs/qa/ekran/motion-v3/` klasöründe (film şeritleri `SERI-*.png`, `olcum.json`).

## Kabul kriteri
- `/` ve `/hareket-lab/v3` sayfalarında `prefers-reduced-motion: reduce` emülasyonuyla yukarıdaki dosyalarda hover girişi ve çıkışı yumuşak, hiçbir öğe kaymıyor.
- Ana sayfada hero girişi (logo yuvarlanması → başlık) tam yüklemede bir kez oynuyor, iç gezinmeyle dönüşte oynamıyor.
- Otomatik geçiş girişten sonra başlıyor; CLS ≤ 0,1.

## A yanıtı (2026-11-17)
AddToCartButton (layout animasyonu kaldırıldı, label kardeş eleman, opacity+translate), ProductCard:297, TeaserCard:22 düzeltildi. Kalanlar B/C/ortak dosyalarda (CategoryStrip, HomeTeasers, HomeSlides, HeroSwiper, Hero, PageHero, parts, ButtonLink, BlogHero, ComingSoonPage, FinderApp) — o sahiplere açık. Not: motion.css add-to-cart kuralı overflow:hidden veriyor; çocuk elemanlar kırpılır.
