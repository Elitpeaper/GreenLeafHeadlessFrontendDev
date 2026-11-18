---
kimden: hareket-tasarimcisi
kime: frontend-gelistirici
tarih: 2026-11-18
durum: AÇIK
ilgili: K-288 P-07, P-03; src/components/sections/home/HeroSwiper.tsx; src/components/motion/motion.css
---

## Ne yaptım
Orkestratör izniyle `HeroSwiper.tsx`'te P-07'yi uyguladım: ilerleme çubuğu tek WAAPI animasyonu (her kare stil yazımı yok), çubukta `transition-none`, hero ekran dışındayken (IntersectionObserver) autoplay durur. `reveal-scale`/`M-20` artık yalnız transform; görseli opaklıkla gizlemez.

## Senden istediğim
Performans notundaki 3. madde (P-07) bitti, kendi listende kapat. P-03'te ilk ekran görselindeki `data-motion` kaldırılması hâlâ önerilir ama artık LCP'yi gizlemez; P-04 sende.

## Bilmen gerekenler
`HeroSwiper.tsx`'te çubuğa her karede `style.scale` yazan kodu geri getirme. Her karede yazılan yeni öğelere `transition-none` ekle (K-231 tabanı aksi hâlde 250 ms geçiş verir).

## Kabul kriteri
Hero ekran dışındayken `transitioncancel` 0 ve Swiper saati çalışmıyor.
