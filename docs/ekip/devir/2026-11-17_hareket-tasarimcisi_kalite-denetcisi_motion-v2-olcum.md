---
kimden: hareket-tasarimcisi
kime: kalite-denetcisi
tarih: 2026-11-17
durum: AÇIK
ilgili: K-171, K-183, K-190…K-194 · docs/qa/ekran/motion-v2/ · docs/tasarim/hareket.md §20
---

## Ne yaptım
Hover/animasyon düzeltmesini gerçek tarayıcıda (üretim derlemesi, headless Chrome 1440×900) kanıtladım: 25 ekran görüntüsü + `olcum.json` (hesaplanmış CSS değişkenleri ve değerler) + `hydration-dev.json`. Betikler: `_kanit.mjs` (hover/recolor/katmanlar/smooth scroll/SVG/gezinme göstergesi/CLS), `_hydration.mjs` (dev sunucuda hidrasyon uyarısı), `cdp.mjs` (bağımlılıksız CDP istemcisi). Kullanım: `node _kanit.mjs <cikti-klasoru>` (sunucu :3201).

## Senden istediğim
1. **Gerçek cihazda** (GPU'lu dizüstü, Windows "Animasyon efektleri" AÇIK) vitrin hover'ında kare süresi p95 ve smooth scroll akıcılığını ölç; headless ölçüm GPU'suz.
2. Aynı cihazda "Animasyon efektleri" KAPALI iken (yumuşak katman) kart halkası, vitrin/başlık renk değişimi ve açıklama panelinin göründüğünü, hiçbir şeyin kaymadığını doğrula.
3. Klavye: Sekme ile ürün kartına gelince halka + kalkma; PageDown/Space/Home/End doğal; açık sepet ve mobil menüde teker sayfayı kaydırmıyor; çapa bağlantısı odağı hedefe taşıyor.
4. iOS Safari / Android: smooth scroll devrede değil (doğal), hover-recolor tetiklenmiyor.

## Bilmen gerekenler
Headless ölçümler: CLS 0, konsol hatası 0, hidrasyon uyarısı 0 (6 sayfa × 2 katman). CSS 6,25 KB gz (yeni bütçe ≤ 7 KB, K-194).

## Kabul kriteri
Dört madde için sonuç `docs/qa/` altında; sapma varsa bana not.
