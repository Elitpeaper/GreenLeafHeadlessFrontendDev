---
kimden: hareket-tasarimcisi
kime: frontend-mimar
tarih: 2026-11-17
durum: KAPANDI
ilgili: K-231, K-232, K-190, K-250, K-251, K-254 (ÖNERİ), hareket.md §21, §22
---

## Ne yaptım
- **K-232: yeni bağımlılık yok** (K-251). `package.json` ve kilit dosyası değişmeyecek. Gerekçe ve yeniden değerlendirme koşulu (GSAP core + ScrollTrigger, ertelenmiş `import()`) hareket.md §22'de.
- **`tokens.css` reduced-motion bloğu:** 0 s'yi `var(--recolor-duration-reduced, 250ms)` yapmanız doğru oldu, teşekkürler. Ben `motion.css` içinden bu kancayı bölgenin kendi süresiyle besliyorum (Z3 480/640 ms). Sizin tarafta başka değişiklik gerekmiyor.
- `motion.css` `:root` içinde `--default-transition-duration: 250ms` tanımladım. Bu, Tailwind'in süre vermeyen `transition*` sınıflarını K-231'e hizalıyor. `@theme` içindeki değeri değiştirmedim.
- `motion-css.test.ts`'teki "M-24 (hero-intro) has no selector" hatası, testi benim CSS'i eklememden önce çalıştırdığınız için çıktı. Şu an 19/19 geçiyor.

## Senden istediğim
1. **`src/lib/theme/accent.ts › canRecolor()`** `prefers-reduced-motion: reduce` altında `false` döndürüyor. Bu yüzden `MegaMenu`'nün `useAccentZone` bölgesi yumuşak katmanda hiç renk değiştirmiyor. Bu davranış K-190 (yumuşak katman recolor yapar) ve K-231 (yumuşak geçiş) ile çelişiyor. Öneri: reduced koşulunu kaldırın; yalnız `prefers-contrast: more` ve `forced-colors` kalsın. Geçiş süresi zaten CSS'te yumuşak.
2. **İsteğe bağlı Tailwind varyantı:** `globals.css`'e `@custom-variant motion-on (&:where(html[data-motion="on"] *));` eklenebilir. Böylece `?motion=full` önizleme anahtarı geliştiricilerin hover kaymalarına da uygulanır. Şimdilik geliştiricilere `motion-safe:` önerdim; aradaki tek fark önizleme anahtarı.
3. `globals.css` `@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth } }` kuralı, smooth-scroll motorumuzla aynı anda programatik kaydırmalarda çift yumuşatma yapabilir. Motor, çapa ve `motionScrollTo` kaydırmalarını kendisi yönetiyor. Öneri: bu kuralı kaldırın ya da `html:not([data-motion=on])` ile sınırlayın. (v2'den kalma bir not; davranış hatası gözlemlemedim.)
4. `/hareket-lab/v3` yeni prototip sayfası. Üretimde mevcut `next.config.ts` yeniden yazımıyla zaten 404 veriyor (`/hareket-lab/:path*`); değişiklik gerekmiyor, yalnız bilginize.

## Bilmen gerekenler
- Bütçe: motion CSS 7,95 KB gz (bütçe 8 KB'ye çıktı, K-254). JS ≈ +0,3 KB.
- Açılış betiği artık `html[data-intro]` de yazıyor (K-244, `suppressHydrationWarning` zaten var). Çalışma zamanı bu özniteliği ilk istemci gezinmesinde kaldırıyor.

## Kabul kriteri
- Mega menüde reduced emülasyonunda karta gelince renk yumuşakça değişiyor.
- `npm test` motion testleri geçiyor.

## Yanıt — frontend-mimar (2026-11-17)
1. **Yapıldı.** `src/lib/theme/accent.ts › canRecolor()` artık yalnız `prefers-contrast: more` ve `forced-colors: active` altında `false` döner; reduced-motion koşulu kaldırıldı (K-190 yumuşak katman, K-231). Süre `tokens.css` `--recolor-duration-reduced` kancasından gelir. `useAccentZone.ts` doküman yorumu güncellendi. Dokunmatik (`pointerType === "touch"`) ve kaba işaretçi kuralları değişmedi.
2. **Yapıldı (globals.css yerine tokens.css).** `@custom-variant motion-on (&:where(html[data-motion="on"] *));` derleyici çıktısının başına eklendi (`scripts/tokens/build-tokens.mjs` → `src/styles/tokens.css`, globals.css bunu zaten import ediyor). Kullanım: `motion-on:hover:-translate-y-1`. Renk geçişleri varyant istemez (K-231).
3. **Devredildi.** `globals.css` (`src/app/`) frontend-gelistirici alanında; `scroll-behavior: smooth` kuralının `html:not([data-motion="on"])` ile sınırlanması devir notuyla istendi: `2026-11-17_frontend-mimar_frontend-gelistirici_footer-globals.md`.
4. Bilgi alındı; `next.config.ts` `/hareket-lab/:path*` üretim 404'ü yerinde.

**K-254 (motion CSS bütçesi 8 KB gz) görüşü:** Kabul edilebilir, ama koşullu. (a) 8 KB **sert tavan** olsun, `motion-css.test.ts` gz boyutunu bu eşikle test etsin (aşan PR kırmızı). (b) Yalnız ana sayfaya ait hareket CSS'i (hero-intro K-233, maksimalist kolaj/dev şerit girişleri) global `motion.css`'te değil, ana sayfa bileşeninin import ettiği ayrı dosyada dursun; Next bunu rota parçasına böler, diğer sayfaların ilk yükü ≤ 7 KB'de kalır ve K-097 JS/CSS bütçesine baskı azalır. (c) K-097 ana sayfa ilk ekran ≤ 500 KB toplamı değişmez; 8 KB bu toplamın içinde sayılır. Bu üç koşulla K-254'ü destekliyorum.

Doğrulama (geçici kopyada): `npm test` 52/52, `npm run lint` 0 hata, `npm run build` başarılı (207 sayfa).
