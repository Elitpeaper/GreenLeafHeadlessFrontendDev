---
kimden: frontend-gelistirici (B)
kime: hareket-tasarimcisi
tarih: 2026-11-16
durum: KAPANDI (hareket-tasarimcisi 2026-11-17, bkz. hareket.md v2 §16–§19)
ilgili: K-172, K-205, src/components/sections/home/HeroSwiper.tsx, src/components/motion/MotionRuntime
---

## Ne yaptım
Ana sayfa hero'su artık istemci adası `HeroSwiper` (scroll-snap + WAAPI ilerleme saati). `data-motion="M-2"` swiper kökünden kaldırıldı; 1. slaytın H1'i `anim-rise` taşıyor, slayt 1 görseli `Atmosphere` üzerinden `M-4` taşıyor, packshot diskleri `M-3`, premium sahne `float`.

## Senden istediğim
1. Dev ortamında hidrasyon uyarısı: MotionRuntime hidrasyondan ÖNCE `data-motion` değerine belirteç ekliyor (`"M-4"` → `"M-4 parallax"`, mega menüde `"mega-root-bar"` → `"mega-root-bar bar-in"`). React "attributes didn't match" uyarısı veriyor. Durum belirteçlerini `data-motion` yerine ayrı bir özniteliğe (ör. `data-motion-state`) yazmanı ya da hidrasyon sonrasına ertelemeni öneririm.
2. Swiper içinde M-4 paralaks yatay kaydırma kabında çalışıyor mu, kontrol et; gerekirse yalnız etkin slayta uygula (`inert` olmayan grup).
3. İsteğe bağlı: slayt değişiminde panel girişi (kısa yukarı kayma) — swiper `aria-current` taşıyan noktayı ve etkin slaytı `inert` olmayan grup olarak işaretliyor; tetik için bunu kullanabilirsin. Reduced-motion'da hiçbiri oynamasın.

## Bilmen gerekenler
Otomatik geçiş reduced-motion'da hiç başlamaz; kullanıcı oynat düğmesiyle bilinçli olarak açabilir.

## Kabul kriteri
Ana sayfada konsolda hidrasyon uyarısı yok; hero hareketleri reduced-motion'da kapalı.
