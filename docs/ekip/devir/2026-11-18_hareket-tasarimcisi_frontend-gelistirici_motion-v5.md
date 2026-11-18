---
kimden: hareket-tasarimcisi
kime: frontend-gelistirici (A, B, C)
tarih: 2026-11-18
durum: KAPANDI
ilgili: K-264, K-265, K-271, K-272, K-280…K-285 · docs/tasarim/hareket.md §27
---

## Ne yaptım
- Site artık OS ayarından bağımsız tam hareketle açılır; footer'a "Hareketi azalt" anahtarı (`MotionToggle`) eklendi (Footer.tsx, Orkestratör izniyle).
- Kapılar = Ravena pin sahnesi (`HomeDoors.tsx` + `PinStage` + `SwiperStrip`), ürün kartı tilt/parıltı + yuvarlak → hap düğme (ProductCard.tsx, AddToCartButton.tsx), footer bağlantılarına `data-link-draw`.
- Site geneli GSAP sahneleri `src/lib/motion/fx.ts` (runtime başlatır; sayfalarda kod gerekmez).

## Senden istediğim
1. **Geliştirici A (header):** sticky header kökü değişirse ona `data-smart-header` koy (akıllı gizleme onu hedefler; yoksa `#header-accent`). Gizlilik durumu `html[data-header-hidden]` — header yapısına başka dokunma gerekmiyor. Sticky yan panellerin `top` değeri header gizlenince boşluk bırakır; istersen `html[data-header-hidden] .lg\:top-28` için `top` ayarı.
2. **Geliştirici A/B/C:** `PageHero` kökü için `data-page-hero=""` ekle (başlık bandı fotoğraf paralaksı 1→1.1). `ListingHero` zaten `data-listing-hero` taşıyor.
3. **K-271 boş alan SVG'leri** (brief `fotograf-ve-svg-yerlesim.md` §3), sarmalayıcı `import { ScrollSvg } from "@/components/motion"`:
   - Ana sayfa Raf duvarı başlık sağı: `<ScrollSvg mode="near" className="pointer-events-none hidden xl:block w-60"><SceneHeroBotanical interact="sway" /></ScrollSvg>`
   - Vitrin 1 → Kapılar geçişi: `<ScrollSvg mode="draw"><DividerLeafVine /></ScrollSvg>`
   - Vitrin 2 gutter (≥ 1440): `<ScrollSvg mode="parallax">…PatternLeafLines…</ScrollSvg>`
   - Marka duvarı altı: `<ScrollSvg mode="near"><SceneMembership interact="scatter" /></ScrollSvg>`
   - `/blog`, `/haberler` liste sonu: `mode="view"` + `SceneBlog`; makale gutter (≥ 1280): `mode="draw"` + dikey `DividerLeafVine`
   - `/sss` sağ sütun (≥ 1024, sticky): `mode="near view"` + `SceneFinderLeaves`
   Hepsi `aria-hidden` (bileşen koyar), `pointer-events-none`, < 1024 px'te `hidden lg:block`.
4. **Geliştirici B (raf duvarı foto karoları):** `<Image data-shelf-photo …>` ve scrim katmanına `data-shelf-scrim` (renk forest-950 /78, dinlenmede opaklık .9 → hover 1). Hover yakınlaşma 1.06 CSS'te hazır.
5. Bileşenlerde `matchMedia("(prefers-reduced-motion…)")` kullanma; `import { motionTier, onMotionTier } from "@/lib/motion/preference"`. `motion-safe:` sınıfları artık site katmanını izler.

## Bilmen gerekenler
- Yeni metin anahtarları `pending.tr.json`'da: `motion.toggle.label/hint`, `motion.backTop`, `home.v2.gates.prev/next/counter/side`.
- `HorizontalPin` ve `GiantBand` silindi.
- `npx tsc` şu an `StoreChrome.tsx` (`siteNav` prop'u, header işi) yüzünden hata veriyor — benim değişikliğim değil.

## Kabul kriteri
`docs/qa/ekran/motion-v5/_kanit.mjs` (reducedMotion "reduce") tüm sayfalarda `tier: on`, Lenis etkin, CLS 0; §3 yerlerinde SVG imleç/kaydırmayla aktif.

## Geliştirici B kapanış (2026-11-18)
K-271 SVG yerleşimleri, data-page-hero, data-shelf-photo/scrim tamam; kanıt docs/qa/ekran/svg-v5/. fx.ts:102 regex düzeltildi (`/\s+/`): "near view" çok kipli ana bilgisayarlar çalışmıyordu. `scatter` SvgInteract tipine eklendi.
