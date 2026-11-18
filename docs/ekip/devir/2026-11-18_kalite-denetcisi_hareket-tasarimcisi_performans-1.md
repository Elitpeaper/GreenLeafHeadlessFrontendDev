---
kimden: kalite-denetcisi
kime: hareket-tasarimcisi
tarih: 2026-11-18
durum: KAPANDI
ilgili: K-288, K-264, K-231, K-259; docs/qa/PERFORMANS-DENETIMI-1.md; src/lib/motion/fx.ts, runtime.ts, lenis.ts, svg-interact.ts; src/components/motion/motion.css, PinStage.tsx
---

## Ne yaptım
Üretim derlemesinde (port 3100) masaüstü 1×/4× ve mobil 4× için performans trace'leri aldım. Ölçümler, kök nedenler ve dosya:satır referansları `docs/qa/PERFORMANS-DENETIMI-1.md` içinde.

## Senden istediğim
1. **P-01 (Engelleyici):** sonsuz `ScrollTrigger.refresh()` döngüsünü kır.
   - Zincir: `runtime.ts:725-731` (MutationObserver) → `fx.scan` → `fx.ts:136-140` (koşulsuz `refresh()`) → ScrollTrigger her refresh'te `body`'ye ölçüm div'i ekliyor ve pin-spacer'ı yeniden sarıyor → MutationObserver yeniden tetikleniyor.
   - Etkisi: boşta ~7,5 refresh/sn; ana sayfada 4× CPU'da ana iş parçacığı %87 meşgul.
   - İstenen: refresh yalnız yeni bir şey bağlandığında çalışsın; GSAP'in eklediği düğümler (`.pin-spacer`, `body`'nin doğrudan çocuğu olan ölçüm div'i, split-line) MutationObserver'da yok sayılsın.
2. **P-05:** `fx.ts:193-196` ve `:326` — `headerMo` `style` özniteliğini alt ağaç boyunca izlemesin; `headerLocked` içindeki `getComputedStyle` her stil yazımında çağrılmasın.
3. **P-06:** `fx.ts:181-191` — scroll işleyicisinde `offsetHeight` ve `getComputedStyle` okunmasın (header yüksekliği ResizeObserver ile önbelleğe alınsın, kilit durumu bayrakla tutulsun).
4. **P-07:** hero ilerleme çubuğu.
   - K-231 taban kuralındaki `[class*="rounded-pill"]` eşleşmesi (`motion.css:1601-1613`), her karede `scale` yazılan çubuğa 250 ms geçiş veriyor; sonuç 190 transitioncancel/sn.
   - Çubuğu CSS animasyonuna taşı veya geçişini kapat.
   - Taban listedeki `[class*=…]` seçicilerini gözden geçir: ölçüme göre tam stil hesaplamasının ~%18'i bu kurallardan.
5. **P-09:** `svgHostOf` (`svg-interact.ts:114-121`, çağrı `runtime.ts:496`) ve `fx.ts:275-291` — pointermove'da `getComputedStyle`, `getBoundingClientRect` ve `querySelectorAll` çağrıları önbelleğe alınsın.
6. **P-03 (CSS tarafı):** `motion.css:253-259/266/291` — `reveal-scale`/`reveal` fold üstündeki LCP öğesini gizlememeli (KK-0-19a).
7. **Küçükler:**
   - P-10: `lenis.ts:97-99` → `gsap.ticker.add(tick, false, true)`.
   - P-11: `runtime.ts:612-616` intro `setInterval`'ı intro bitince durdur.
   - P-12: pin kontur başlığının her karede yeniden boyanması (`PinStage.tsx:117-124`); P-01 düzeldikten sonra yeniden ölçülecek.

## Bilmen gerekenler
- 1× güçlü makinede (RTX 4060) tüm sahneler akıcı. Kasma 4× CPU'da ve mobilde ortaya çıkıyor; K-264 gereği bu cihazlar da tam hareketle açılıyor.
- `?motion=off` ile boşta yük %15–17'ye iniyor; bu ölçüm aracının kendi rAF'i dahil taban.
- P-07'de HeroSwiper bileşeni (`HeroSwiper.tsx:88, 195`) frontend-gelistirici'nin dosyası. Çubuk ve autoplay pause değişikliğini onunla koordine et (onun notunda da var).

## Kabul kriteri
- Boşta 5 sn'de refresh 0 ve DOM eklemesi 0.
- 4× masaüstünde ana sayfa boşta yük ≤ %25; ana sayfa kaydırma, pin, kart hover ve akıllı header senaryolarında ">16,7 ms" kare oranı < %5.
- Mobil 4×'te menü ve sepet INP'si ≤ 200 ms (P-02 ile birlikte).
- Kalite denetçisi aynı betiklerle yeniden ölçecek.

## Kapanış (hareket-tasarimcisi, 2026-11-18)
P-01, P-03 (CSS), P-05, P-06, P-07, P-09, P-10, P-11 uygulandı; ayrıntı ve önce/sonra tablosu `docs/tasarim/hareket.md` §28. Kabul: boşta refresh/DOM eklemesi 0, boşta yük 4×'te %20–21 (≤ %25). Hedefin üstünde kalanlar: kart hover >16 ms %63, ana sayfa kaydırma %18,7 (P-12 dokunulmadı; P-02 kart DOM'u ile birlikte yeniden ölçülmeli). Mobil INP ve akıllı header senaryosu ölçülmedi.
