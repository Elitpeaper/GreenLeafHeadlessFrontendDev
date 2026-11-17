---
kimden: hareket-tasarimcisi
kime: frontend-gelistirici (B) · bilgi: frontend-gelistirici (A, C), ui-tasarimci
tarih: 2026-11-17
durum: AÇIK
ilgili: K-256, K-257, K-258…K-262 (ÖNERİ), docs/tasarim/hareket.md §26, docs/qa/ekran/motion-v4/
---

## Ne yaptım
Orkestratörün bu görev için verdiği izinle senin alanındaki iki dosyayı değiştirdim. `HomeHero.tsx` ve `src/app/(magaza)/page.tsx` **değişmedi**.

1. **`src/components/sections/home/HeroSwiper.tsx`**: dosyayı Swiper.js ile yeniden yazdım (K-256).
   - Elle yazılmış scroll-snap, fare sürükleme ve WAAPI saati silindi. Yerine Swiper core + `Autoplay`, `EffectFade` (crossFade) ve `A11y` geldi. Swiper `import("@/lib/motion/swiper")` ile tembel yükleniyor, yani ilk yükleme JS'ine girmiyor.
   - Dışa açık arayüz **aynı**: `HeroSwiper({ slides, names, labels })` ve `HeroSwiperLabels`. `HomeHero` hiç dokunulmadan çalışıyor.
   - İşaretleme değişti: `div.swiper > div.swiper-wrapper > div.swiper-slide`. Slaytlar hâlâ sunucuda render ediliyor. `swiper/react` kullanma: render sırasında saati okuyor ve `/` derlemesini kırıyor (`cacheComponents`).
   - Davranış: otomatik geçiş girişten sonra başlıyor ve 7 sn sürüyor. Fare hover'ında, odak içerideyken ve sekme gizliyken duruyor; durdur düğmesi korunuyor; azaltılmış harekette otomatik geçiş yok. Noktalar ve oklar senin tasarımınla aynı, artık `slideTo/slidePrev/slideNext` çağırıyorlar.
2. **`src/components/sections/home/HomeDoors.tsx`**: "Kapılar" bölümü K-257 yatay pin oldu.
   - Kök artık `<HorizontalPin as="section">` (`@/components/motion`). Kartlar `[data-hpin-viewport] > ul[data-hpin-track] > li` içinde; altta `[data-hpin-progress] > [data-hpin-bar]` var.
   - 12 sütunlu bento kalktı. Tüm paneller aynı yükseklikte; genişlikler: mobil `min(85vw, 24rem)`, masaüstü `clamp(22rem, 30vw, 28rem)`, PV paneli `clamp(26rem, 38vw, 34rem)`.
   - `Door`'daki `compact` varyantı kalktı (artık dar karo yok, gövde metni her panelde görünür). PV/bulucu kavşağındaki `LeafSkeletonSpecimen` kaldırıldı (bento konumuna bağlıydı).
   - Görünür alanın iç dolgusu `--hpin-pad` ile başlık sütununa hizalı. Bunu `motion.css` uyguluyor, sınıfı değiştirme.

## Senden istediğim
- `HomeDoors` içinde içerik ve kart görseli değişikliği serbest. Şunları koru: `HorizontalPin` kökü, `data-hpin-*` işaretleri, `li` üzerindeki panel boyut sınıfları ve `Door` kökündeki `h-full`. Panel yüksekliği CSS'ten geliyor (`motion.css › K-257`).
- Kart sanatında içerik sığmazsa paneli büyütme, bana not bırak. Panel yüksekliği 1366×768'de 428 px, 1440×900'de ≈ 530 px, şerit ve ızgarada 28rem.
- `HeroSwiper`'a yeni slayt eklemek için yalnız `HomeHero`'daki `slides` dizisine ekle; swiper tarafında iş yok.

## Bilmen gerekenler
- Sayfa kaydırmasını JS'ten yapacaksan yine `motionScrollTo()` (`@/lib/motion`) kullan; artık arkada Lenis var. Bir kutunun tekerini doğal bırakmak için `data-scroll-native` ekle.
- Kendi bileşeninde sayfayı kilitlemek için `document.documentElement.style.overflow = "hidden"` (sepet ve mobil menüdeki gibi) ya da modal `<dialog>` kullan. Lenis bunu kendisi algılayıp duruyor.
- Kanıt `docs/qa/ekran/motion-v4/` altında: `SERI-pin-1440.png`, `SERI-hero-swiper-1440.png`, `SERI-mobil-390.png`, `r01-doors-grid-reduced-1440.png`.

## Kabul kriteri
- `/` 1440: Kapılar header altında sabitleniyor, kaydırınca paneller yatay ilerliyor, çubuk doluyor, CLS 0.
- 390: kaydırılabilir şerit. Azaltılmış harekette: 3 sütunlu ızgara.
- Hero değişiklikten önceki gibi görünüyor; otomatik geçiş girişten sonra başlıyor.
