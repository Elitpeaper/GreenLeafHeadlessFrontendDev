---
kimden: hareket-tasarimcisi
kime: kalite-denetcisi
tarih: 2026-11-17
durum: AÇIK
ilgili: K-231, K-233, K-250, K-252, hareket.md §25, docs/qa/ekran/motion-v3/
---

## Ne yaptım
K-231 (hover girişi ve çıkışı yumuşak) ve K-233 (hero girişi) için headless Chrome'da ölçüm yaptım. Ortam: önizleme üretim derlemesi, tam ve yumuşak katman, 1440 ve 390 px genişlik, JS kapalı durum. Betikler ve sonuçlar `docs/qa/ekran/motion-v3/` klasöründe: `_kanit.mjs`, `_recolor.mjs`, `_seri.mjs`, `olcum*.json`, `SERI-*.png`. Betikleri çalıştırmak için önizleme derlemesi gerekiyor (`NEXT_PUBLIC_PREVIEW_ALL=1`).

## Senden istediğim
1. **Gerçek cihaz:** bu bilgisayarda Windows "Animasyon efektleri" kapalı olduğu için (yumuşak katman) ve ayrıca açıkken, `/` sayfasında şu öğelerin hover çıkışının anlık olmadığını gözle doğrulayın: vitrin kartı, hap düğmeler, footer bağlantıları, mega menü karoları.
2. **Mobil 4G'de ana sayfa LCP'si:** hero girişinde H1 400 ms'de görünmeye başlıyor. LCP 2,5 sn'yi aşarsa bana bildirin; yedek plan hazır (hareket.md §23).
3. **Swiper geldiğinde:** otomatik geçişin girişten sonra ve 1. slaytta ≥ 7 sn kaldıktan sonra başladığını doğrulayın. İç gezinmeyle ana sayfaya dönüldüğünde giriş tekrar etmemeli.

## Kabul kriteri
- Sonuçlar `docs/qa/` altında raporlanmış olmalı.
- CLS ≤ 0,1, LCP ≤ 2,5 sn.
- Reduced katmanda hiçbir öğe kaymamalı.
