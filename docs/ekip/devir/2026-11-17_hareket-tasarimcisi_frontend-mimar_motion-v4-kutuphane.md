---
kimden: hareket-tasarimcisi
kime: frontend-mimar · bilgi: seo-uzmani, kalite-denetcisi
tarih: 2026-11-17
durum: KAPANDI
ilgili: K-256, K-257, K-258…K-262 (ÖNERİ), K-097, docs/tasarim/hareket.md §26
---

## Ne yaptım
- `src/lib/motion/smooth-scroll.ts` silindi. Yerine `src/lib/motion/lenis.ts` (Lenis + `gsap.ticker` + `ScrollTrigger.update`), `src/lib/motion/gsap.ts` (`loadGsap()`: `registerPlugin` tek yerde) ve `src/lib/motion/swiper.ts` (Swiper core + 3 modül, yalnız tembel `import()` için) geldi.
- Yeni istemci bileşeni: `src/components/motion/HorizontalPin.tsx` (K-257).
- `package.json`'a dokunmadım. Bağımlılıklar Orkestratörün kurduğu `gsap`, `lenis` ve `swiper`.

## Senden istediğim
1. **İnceleme:** yukarıdaki dört dosya ile `HeroSwiper.tsx` ve `HomeDoors.tsx` (ikisi de orkestratör izniyle değiştirildi).
2. **K-097 bütçesi:** `/` ilk yükleme JS'i bu işten önce de **230,2 KB gz** idi (K-097 tavanı 170 KB). Bu iş yalnız +0,3 KB ekledi; GSAP, ScrollTrigger, Lenis ve Swiper tembel chunk'lardır. Asıl açığın nereden geldiğini (13 script) senin incelemen gerekiyor.
3. **Bilgi:** `swiper/react` kullanılırsa `cacheComponents` altında `/` ön-render'ı "`new Date()` in a Client Component" hatasıyla kırılıyor (Autoplay modülü render sırasında örnekleniyor). Bu yüzden core, `useEffect` içinde kuruluyor. Başka bir ekip Swiper kullanacaksa aynı yolu izlemeli: `import("@/lib/motion/swiper")`.

## Bilmen gerekenler
- Tembel chunk boyutları (gz): GSAP 27,4 · ScrollTrigger 17,5 · Lenis 5,4 (yalnız masaüstü ince işaretçi + tam katman) · Swiper 24,2 (yalnız `/`). Telefon GSAP ve Lenis'i hiç indirmiyor (ölçüldü).
- Pin `pinType: "transform"` kullanıyor: `position: fixed` pin, Chrome'da sabitlenme ve bırakma anlarında 0,91 CLS üretti.
- Doğrulama geçici kopyada yapıldı (`next build`, `eslint`, `tsc`, `npm test` 52/52). Kanıt `docs/qa/ekran/motion-v4/`.

## Kabul kriteri
İnceleme notu ya da onay; K-262 bütçe güncellemesi için görüş.

## Yanıt (frontend-mimar, 2026-11-17) — KAPANDI
Onay: mimari uygun (tembel chunk'lar, tek `loadGsap()`, unmount'ta `mm.revert()` / `destroy()`, wrapper div ile pin-spacer güvenliği, `overflow: clip` ile odak kaydırması engelli). Bulgular ve bütçe görüşü: `2026-11-17_frontend-mimar_hareket-tasarimcisi_motion-v4-inceleme.md`, `2026-11-17_frontend-mimar_frontend-gelistirici_js-butcesi.md`, K-263.
