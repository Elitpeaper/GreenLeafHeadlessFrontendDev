---
kimden: hareket-tasarimcisi
kime: frontend-gelistirici
tarih: 2026-11-17
durum: KAPANDI
ilgili: K-170, K-171, K-179, K-183, K-190…K-194 · docs/tasarim/hareket.md §15–§19 · src/components/motion/motion.css
---

## Ne yaptım
- Tüm kanca adların (kancalar notu + kart v2 + swiper notu) çalışma zamanına ve CSS'e bağlandı. Bileşen dosyalarına dokunulmadı.
- Hidrasyon uyarıları giderildi: `data-motion` değerine artık hiçbir şey eklenmiyor; öğe düzeyi yazımlar React sahiplendikten sonra. Dev'de 6 sayfa × 2 katman: 0 uyarı.
- Kart v2: ışıma/halka yalnız `[data-card-tile]` içinde (`::after`, z 3, rozet ve düğmelerin altında). Senin `group-hover/card:shadow-lift` ve `card-reveal` geçişlerin kalabilir, çakışma yok.
- Rota `loading.tsx` dosyaları kaldırıldı (ilk boyamada tam ekran yükleyici + CLS 0,112). Yerine gezinme göstergesi `MotionRoot` içinde.
- Smooth scroll (K-183) çalışıyor; JS'den kaydırma için `motionScrollTo(y | element)` (`@/lib/motion`).

## Senden istediğim
1. **`loading.tsx` ekleme** (kök, `(magaza)` veya segment): PPR kabuğunda yükleyiciyi ilk boyamaya taşıyor. Gerekirse sayfa içi `<Suspense fallback={<ListingLoading />}>` kullan (`@/components/motion`).
2. `/svg-kutuphanesi` kart `<li>`'sine `data-svg-host=""` ekle: kartın tamamı SVG'yi tetiklesin (şu an SVG'nin kendisi tetikliyor).
3. Mobil menü 1. seviye paneline, 2. seviyeden geri dönüldüğünde `data-motion-dir="back"` ver: panel soldan girsin (şu an sağdan giriyor).
4. HeroSwiper: `M-4` paralaksı yatay scroll-snap kabının içinde CSS `view()` zaman çizelgesini o kaba bağlıyor ve **etkisiz** (statik, hata yok). Hero'da paralaks isteniyorsa `M-4`'ü swiper'ın dışındaki çerçeveye taşı. Slayt girişi (isteğe bağlı): etkin slayt paneline `data-motion="step"` ver; slayt `hidden`/`inert` değişiminde CSS ile oynar, reduced'da oynamaz.
5. Kendi kaydırma alanın olursa (ör. yeni panel) ve tekerin hep doğal kalmasını istersen `data-scroll-native` ekle. `overflow-y-auto` kutular zaten otomatik algılanıyor.
6. Kart v2'de `motion-safe:transition-*` sınıflarını kaldırmana gerek yok: bu bilgisayarda (Windows animasyonları kapalı) `motion-safe` geçişleri çalışmıyor ama durum yine anlık görünüyor; tam katmanda süreler token'larla uyumlu.

## Bilmen gerekenler
- Katmanlar: `html[data-motion="on"|"reduced"]`. Sunumda tam hareket: `?motion=full` (S-060).
- Otomatik giriş: `<main>` içindeki işaretsiz ürün kartları ve `h2`'ler ilk ekranın altındaysa bir kez girer. Bir yerde istemezsen `data-no-reveal`.
- Hap düğmeler (`rounded-pill`) basışta 0.96, `bg-green-700` haplar hover'da 2 px kalkar (genel kural, `:where()` ile düşük öncelikli; sınıfların kazanır).

## Kabul kriteri
Ana sayfa, kategori, PDP, `/svg-kutuphanesi` dev konsolunda hidrasyon uyarısı 0; `loading.tsx` yok; madde 2–4 uygulandı.
