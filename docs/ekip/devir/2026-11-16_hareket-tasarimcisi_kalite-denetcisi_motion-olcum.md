---
kimden: hareket-tasarimcisi
kime: kalite-denetcisi
tarih: 2026-11-16
durum: AÇIK
ilgili: K-034, K-097, K-159, KK-0-14, KK-0-15a, KK-0-16, KK-0-19a, KK-2-03, KK-2-11, KK-11-04…06, docs/tasarim/hareket.md §9 ve §12
---

## Ne yaptım
Hareket katmanını üretim derlemesinde headless Chrome 157 ile kontrol ettim. 24 ekran görüntüsü ve ölçümler `docs/qa/ekran/motion/` altında (`olcum.json`). Betik: `docs/qa/ekran/motion/_ekran-kontrol.mjs` (bağımlılıksız, CDP; kullanım: `node _ekran-kontrol.mjs http://127.0.0.1:<port> <klasör>`).
Sonuçlar: CLS 0 (masaüstü ve 390 px), konsol hatası 0. Renk 80 ms'de değişmiyor (niyet gecikmesi), sonra oturuyor. Karttan karta doğrudan geçiyor, bırakınca marka rengine dönüyor. Z1 → Z2 header bağlantısı çalışıyor. Dokunmatik, `prefers-contrast: more` ve reduced-motion'da renk değişmiyor. `?recolorReduced=instant` anlık değiştiriyor. Reduced-motion'da gizli öğe 0. Kompakt header ve başa dön düğmesi kaydırınca devreye giriyor.

## Senden istediğim
1. **Gerçek cihazda kare ölçümü (K-159 eşiği):** Vitrin hover-recolor sırasında DevTools Performance kaydı al (GPU açık, orta sınıf dizüstü + orta sınıf Android). Headless (GPU'suz) ölçümde p95 16,7–21 ms, en kötü 29 ms çıktı; boşta 4,4 ms. Gerçek cihazda p95 > 16,7 ms ise bana bildir: Z3 zemin tint'ini opaklık katmanına taşırım.
2. LCP karşılaştırması: `/` için `?motion=on` ve `?motion=off` (KK-0-19a, ±100 ms). MotionRoot kök layout'a bağlandıktan sonra (frontend-mimar notu).
3. Kabul listesine ekle: KK-0-15a için tek sürekli hareket marka marquee'si olmalı (durdur düğmesi + hover/odak/ekran dışı durma). Diğer ambient hareketler ≤ 5 sn'de durmalı.

## Bilmen gerekenler
- `/hareket-lab` tüm noktaları gerçek veriyle tek sayfada gösterir (noindex).
- Ekran 21, düzeltmeden önceki reduced-motion marquee'sidir (ikinci sıra taşıyordu). Düzeltilmiş sarma, statik HTML ile `21b-…png`'de doğrulandı. Bir sonraki tam derlemede yeniden çekilmeli.

## Kabul kriteri
Gerçek cihaz ölçümleri `docs/qa/` raporunda; K-159 eşiği için geçti/kaldı kararı verilmiş.
