---
kimden: frontend-mimar
kime: frontend-gelistirici
tarih: 2026-11-17
durum: KAPANDI
ilgili: K-046, K-190, K-231, K-183, TASARIM-INCELEME-1 C-4
---

## Ne yaptım
- `tokens.css` v1.3.0 eklemeleri üretildi (Developer B için, aşağıda).
- `canRecolor()` reduced-motion altında artık recolor yapıyor (yalnız yüksek kontrast / forced-colors kapalı).
- Sıralama: görselsizler TR grubunun sonuna (A-2) — tek `imageLast` karşılaştırıcısı.

## Senden istediğim
1. `src/components/layout/SiteFooter.tsx:57` — `href="/kvkk"` → `href="/yasal/kvkk-aydinlatma-metni"` (308 sekmesi kalkar). Hedef sayfa "Çok yakında" ise K-182 gereği rozetli göster.
2. `src/components/layout/LegalPlaceholder.tsx` — kullanılmıyor (yalnız kendisi referans veriyor), silinebilir.
3. `src/app/globals.css:194-197` — `scroll-behavior: smooth` kuralını `html:not([data-motion="on"])` ile sınırla (smooth-scroll motoru çapa/`motionScrollTo` kaydırmalarını kendisi yönetiyor; çift yumuşatma riski — hareket-tasarimcisi notu, motion-v3 §3).

## Bilmen gerekenler — tokens v1.3.0 (Developer B)
- Yazı: `text-ultra` (56→136, hero H1), `text-colossal` (96→288, yalnız `aria-hidden` dekor).
- `text-stroke-outline-on-forest | -on-light | -on-sand` — dolgu şeffaf + kontur; yalnız dekor tipografi.
- `color-block-green | -lime | -blue | -lime-hover-plate` — zemin + doğrulanmış metin rengi (forest-950) birlikte; yalnız ana sayfa (K-236).
- `shadow-sticker`.
- Dev şerit: `--stripe-giant-band-1..3` (mobil 70/42/56, md+ 120/72/96 otomatik), `--stripe-giant-gap`; diğer varyantlar `--stripe-{signature,thin,inline}-band-N`, `--stripe-inline-width`. Örnek: `h-(--stripe-giant-band-1)`.
- Kolaj: `z-(--z-collage-photo)` vb. (`ground, decor-type, color-block, photo, paper, sticker, text, controls`), `--collage-rotate-photo`, `--collage-rotate-sticker-1..3`, `--collage-rotate-max`, `--collage-gap-to-text`.
- Hero intro (boyut/zaman bütçesi; keyframe'ler hareket-tasarimcisi'nde): `--hero-intro-logo-size` (88 → md+ 136), `--hero-intro-logo-max-duration`, `--hero-intro-headline-duration`, `--hero-intro-headline-lead`, `--hero-intro-total`.
- Yeni varyant: `motion-on:` (tam hareket katmanı + `?motion=full`). Konum/ölçek hover'ları için `motion-safe:` yerine bunu kullan; renk geçişleri varyantsız kalır (K-231).
- Satır içi forest gradyanları yerine `bg-gradient-forest-hero` / `bg-gradient-forest-deep` / `surface-showcase`.

## Kabul kriteri
- `/yakinda` footer'ında KVKK bağlantısı yönlendirmesiz hedefe gider; `LegalPlaceholder` repoda yok.
- `npm run build` ve `npm run lint` geçer.
