---
kimden: proje-yoneticisi
kime: hareket-tasarimcisi
tarih: 2026-11-16
durum: KAPANDI
ilgili: K-066, K-070 (ONAYLI); K-093, K-097 (ÖNERİ); docs/plan/wireframe/ana-sayfa.md, premium-tema.md §B, mega-menu.md, sepet-drawer.md, cilt-tipine-gore.md; docs/tasarim/bilesenler/hover-recolor.md, briefler/ana-sayfa.md
---

## Ne yaptım
Her ana sayfa bölümüne "Hareket niyeti" yazdım; sayfa hareket ilkelerini ve bütçeyi (K-097) koydum; hover renk geçişi kurallarını ui-tasarimci'nin Z1–Z3 tanımıyla birleştirdim.

## Senden istediğim
1. **Motion spesifikasyonu** (`docs/tasarim/hareket.md`): süre/eğri ölçeği; hero giriş koreografisi (≤ 1,2 sn, H1 yalnız transform); bölüm girişleri (bir kez, geri kaydırmada tekrarlanmaz); header/footer mikro animasyonları (sayaç pop, Kategoriler oku, kompakt geçiş, footer bandı çizimi).
2. **Hover renk geçişi zamanlaması:** niyet gecikmesi, geçiş süresi, bırakma gecikmesi, karttan karta doğrudan geçiş, Z1–Z2 eşzamanlılığı; büyük zemin alanında boyama maliyeti ölçümü (INP ≤ 200 ms).
3. **WCAG 2.2.2 çözümü:** ekranda ≤ 2 sürekli hareket; 5 sn'yi aşan ambient (hero packshot yüzmesi, yaprak salınımı, marquee) için görünür "Hareketi durdur" kontrolü **veya** ≤ 5 sn'de durma — birini seç ve gerekçelendir.
4. Kütüphane kararı (frontend-mimar ile): saf CSS / WAAPI yeterli mi; kütüphane gerekiyorsa ≤ 25 KB sıkıştırılmış ve ilk yüklemeyi bloklamaz.
5. Sepet drawer, mega menü (panel, kök değişimi, mobil seviye geçişi), bulucu (sonuç güncellemesi çapraz solma ≤ 200 ms, rutin seviyesi değişiminde yükseklik), PV sayacı (≤ 800 ms, bir kez) hareketleri.

## Bilmen gerekenler
- `prefers-reduced-motion`: tüm dekoratif hareket, parallax, sayaç, süsleme çizimi ve hover renk geçişi **kapalı**; içerik ilk hâlinde tam görünür.
- Dokunmatikte hover tabanlı hiçbir efekt yok; klavye odağı hover renk geçişini tetikler.
- Logo hiçbir koşulda animasyon almaz. Temalı (altın) sayfada tek ışık süpürmesi, sürekli değil.
- A/B varyantları (PV bandı / premium sahne) önizlemede ikisi de çalışmalı.

## Kabul kriteri
`KABUL-KRITERLERI.md` KK-0-14, KK-0-15a, KK-0-16, KK-0-18, KK-0-19a, KK-2-03, KK-2-11, KK-11-04…KK-11-06 geçer; 390 px ve 1440 px'te demo yolu (AKISLAR A8) reduced-motion açık/kapalı kesintisiz.
