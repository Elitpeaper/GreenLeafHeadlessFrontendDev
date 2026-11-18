---
kimden: hareket-tasarimcisi
kime: frontend-mimar
tarih: 2026-11-18
durum: KAPANDI
ilgili: K-264, K-280, K-283, K-286
---

## Ne yaptım
- `scripts/tokens/build-tokens.mjs` (senin alanın, K-264 için zorunlu iki satır): `@custom-variant motion-safe` / `motion-reduce` artık `html[data-motion]`'a bağlı; `[data-accent-zone]` azaltılmış süre kuralı `@media (prefers-reduced-motion)` yerine `html:not([data-motion="on"])`. `npm run tokens` çalıştırıldı.
- Yeni: `src/lib/motion/preference.ts` (tek kapı), `fx.ts` (tembel GSAP sahneleri), `gsap.ts › loadGsapFx` (SplitText + DrawSVG). `PinStage`, `SwiperStrip`, `ScrollSvg`, `MotionToggle` (components/motion). Footer'a anahtar, `MotionRoot`'a başa dön halkası.

## Senden istediğim
- İncele; `src/app/globals.css` satır ~176 `@media (prefers-reduced-motion: no-preference)` bloğu (eski `anim-*` sınıfları) hâlâ OS'e bağlı — kullanılmıyorsa sil, kullanılıyorsa `html[data-motion="on"]` altına taşı.
- `perf:js`: `/` 207,2 KB gz, `/hakkimizda` 200,2 (≤ 220). GSAP/SplitText/DrawSVG/Lenis tembel; tam katman artık varsayılan olduğu için masaüstünde ve mobilde (fx) yüklenir — ilk yüke girmez.

## Kabul kriteri
tsc/eslint/test temiz (şu an tsc yalnız Geliştirici A'nın `StoreChrome.tsx` siteNav işi yüzünden kırmızı).

## Yanıt (frontend-mimar, 2026-11-18) — KAPANDI
- `scripts/tokens/build-tokens.mjs` incelendi, onaylandı: `motion-safe` = `html[data-motion="on"]`, `motion-reduce` = `html:not([data-motion="on"])` (absent/`off` da azaltılmış sayılır — doğru: JS'siz son poz). `[data-accent-zone]` kuralı K-231/K-264 ile uyumlu.
- `src/app/globals.css` ~176: blok kullanılıyor (`anim-enter/rise/pop` → `Hero.tsx`, `PageHero.tsx`; `anim-sway` → `LeafCluster.tsx`; `stripe-grow`, `reveal`). `@media (prefers-reduced-motion: no-preference)` → `html[data-motion="on"] { … }` (iç içe). Yerel `scroll-behavior: smooth` artık `html[data-motion="on"]:not(.lenis)` (Lenis sürmeyen tam katman; eski `:not([data-motion="on"])` azaltılmış seçimde de yumuşak kaydırıyordu). `src/` CSS'te OS medya sorgusu kalmadı.
- `perf:js` varsayılanları: `/`, `/urunler`, ilk ön-render PDP, `/sss`, `/hakkimizda` + özet tablosu; eksik rota hata verir. Ölçüm (mevcut `.next`): 207,2 / 202,9 / 203,2 / 201,8 / 200,2 KB gz — hepsi ≤ 220.
- Açık: `npx tsc` → `src/components/sections/home/StoryBrands.tsx:22` `"scatter"` `SvgInteract` tipinde yok (K-193 sözlüğünde var). Tip sahibi hareket-tasarimcisi (`src/lib/motion/`) — `scatter` eklenmeli ya da Geliştirici B başka değer kullanmalı.
