---
kimden: hareket-tasarimcisi
kime: frontend-mimar
tarih: 2026-11-16
durum: KAPANDI
ilgili: K-155…K-159, docs/tasarim/hareket.md, src/lib/motion/, src/components/motion/, src/app/hareket-lab/
---

## Ne yaptım
Hareket katmanı hazır: `src/lib/motion/` (token, ID haritası, zamanlayıcı, çalışma zamanı, yardımcılar) ve `src/components/motion/` (`MotionRoot`, `motion.css`, sarmalayıcılar, `RecolorZone`). Kütüphane yok (K-155). Senin `useAccentZone` hook'una dokunmadım. Global çalışma zamanı aynı `applyAccent/clearAccent/recolorSubset` fonksiyonlarını kullanıyor. Test: `npm test` 45/45 (yeni: `recolor-scheduler.test.ts`, `motion-css.test.ts`). Lint ve tsc temiz, build geçiyor.

## Senden istediğim
1. **Kök layout'a tek satır:** `src/app/layout.tsx` içinde `<body>`'nin ilk çocuğu olarak `<MotionRoot />` (`import { MotionRoot } from "@/components/motion"`). İnline açılış betiği ilk boyamadan önce `html[data-motion]` koyar. `<html suppressHydrationWarning>` zaten var. Bu yapılmadan sayfalardaki `data-motion` işaretleri çalışmaz. Şu an yalnız `/hareket-lab` kendi `MotionRoot`'unu taşıyor.
2. **v0 hareketlerini emekliye ayır** (`src/app/globals.css`): `.anim-enter/-rise/-pop/-sway/-float/-ping`, `.stripe-grow`, `.reveal`, `.reveal-stripe` ve `@keyframes` blokları. `anim-sway`, `anim-float` ve `anim-ping` sonsuz döngülüdür (WCAG 2.2.2, K-158). `.reveal` scroll-driven olduğu için geri kaydırmada tekrar eder (KK-2-11). `card-lift` kalabilir veya `data-motion="lift"` ile değiştirilir. Kullanıcı bileşenlerdeki sınıflar temizlenince (frontend-gelistirici notu) silinebilir.
3. **`/hareket-lab` rotası** (`src/app/hareket-lab/`, noindex, bağlantısız): Faz 2 izole prototipi olarak ben ekledim. Kapı 2'de kullanıcı hareketi burada da görür. Kapı 3 öncesi kaldırılmasını veya önizleme bayrağı arkasına alınmasını öneriyorum, karar sende.
4. (İsteğe bağlı, S-057 cevabına bağlı) Sayfa geçişi için `experimental.viewTransition` şimdilik açılmasın.

## Bilmen gerekenler
- `motion.css` bir istemci bileşeninden (`MotionRuntime.tsx`) import ediliyor. Derlemede ayrı bir CSS parçası olarak çıkıyor (≈ 3,9 KB gz). Turbopack'in tailwind yükleyicisi `@starting-style`, `animation-timeline`, `allow-discrete` kurallarını koruyor (doğrulandı).
- Hook kullanan bölgeler çalışma zamanıyla çakışır. Hook kalacaksa o öğede `data-accent-zone="manual"` olmalı. Önerim: `<RecolorZone>` (sunucu bileşeni, hook yok).
- `tokens.css`'teki `[data-accent-zone]` geçiş kuralı aynen kullanılıyor. Çalışma zamanı bölge türüne göre `--recolor-duration/--recolor-ease`'i satır içi yazıyor. Derleyicide değişiklik gerekmiyor.
- Dikkat: Paralel `next build` çalışmaları `.next`'i değiştirince açık `next start` 500 dönüyor. Ekran kontrolünü bu yüzden geçici bir kopyada derledim.

## Kabul kriteri
Ana sayfa `/`'de `document.documentElement` üzerinde `data-motion="on"` ve `data-motion-runtime` var. `?motion=off` ile ikisinden ilki yok. Konsol hatası yok.

## Yanıt — frontend-mimar (2026-11-17)
1. `<MotionRoot />` kök layout'ta mevcut (`src/app/layout.tsx:43`).
2. v0 sınıfları hâlâ kullanımda: `globals.css:214-224`, `LeafCluster.tsx:30`, `sections/Hero.tsx:34,74`, `sections/home/HomeSlides.tsx:274`, `sections/parts.tsx:116`. Sahibi frontend-gelistirici; devir notu bırakıldı (`2026-11-17_frontend-mimar_frontend-gelistirici_inceleme-1.md`).
3. `/hareket-lab` canlı derlemede 404 (next.config `beforeFiles` rewrite), yalnız `NEXT_PUBLIC_PREVIEW_ALL=1` ile açık; `X-Robots-Tag: noindex`. Gerçek sunucuda doğrulandı.
4. `experimental.viewTransition` açılmadı.
- K-232: kütüphane gerekirse `package.json` için devir notu + TEKNIK-TASARIM §1'e gerekçe yeterli.
- Bilgi: `motion-css.test.ts` şu an kırmızı ("M-24 (hero-intro) has no selector"); `ids.ts` yeni kimliği içeriyor, `motion.css` henüz içermiyor (senin devam eden işin).
