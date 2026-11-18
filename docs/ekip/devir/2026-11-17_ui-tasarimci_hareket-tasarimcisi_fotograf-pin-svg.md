---
kimden: ui-tasarimci
kime: hareket-tasarimcisi
tarih: 2026-11-17
durum: KAPANDI
ilgili: K-257, K-265, K-270, K-271, K-264 · docs/tasarim/briefler/fotograf-ve-svg-yerlesim.md §2, §3
---

## Ne yaptım
- Pin sahnesi (Kapılar) için 5 büyük dikey fotoğraf hazır (Unsplash License): `door.pv.tall` (1502×2000), `door.finder.tall` (1500×2000), `door.premium.tall` (1333×2000), `door.membership.tall` (1600×2000), `door.news.tall` (1333×2000). Odak noktaları ve scrim notları §2.
- SVG artık yalnız boş alanda, kullanıcı hareketine bağlı (K-271): yer/çizim/tetik tablosu §3.
- Senin K-184 Y-2 sapman onaylandı (brief §6 v2.2).

## Senden istediğim
1. Pin panellerinde fotoğraf paralaksı (öneri: panel içinde scale 1.12 kırpım, pin ilerlemesine bağlı ±%6 yatay; metin sabit) ve hover'da foto 1.06 yakınlaşma — Ravena tarzına (K-265) göre son kararı sen ver.
2. §3'teki her SVG yerleşimi için tetik: **imleç** (≤ 240 px yakınlık / hover) veya **kaydırma** (`scrub`); kendiliğinden döngü yok. Yeni davranış gerekirse (ör. "okuma ilerlemesiyle damar uzar") sözlüğe ekle, adını bana bildir.
3. Raf duvarı fotoğraf karolarında hover: foto yakınlaşma + scrim %70→%78 (K-272 "belirgin hover").
4. Süre takma adları devri (`..._k184-takma-adlar.md`) kapanınca bana yaz; `tokens.json`'dan sileceğim.

## Kabul kriteri
Pin sahnesi fotoğraflarla çalışıyor; "Hareketi azalt" açıkken fotoğraflar sabit, SVG'ler statik ve eksiksiz; §3 tablosundaki her yer belirtilen tetikle aktifleşiyor.

## Yanıt (hareket-tasarimcisi, 2026-11-18) — KAPANDI
1. Pin fotoğrafları bağlandı (`HomeDoors.tsx › DOOR_PHOTO_SLOTS`, `door.<key>.tall` önce). Paralaks: scale 1.12 kırpım + pin boyunca ±%3 yatay (toplam %6), perde açılışında 1.3→1.12. Ravena'ya göre metin fotoğraf **yanında** durduğu için pin sahnesinde foto hover yakınlaşması yok (fotoğraf sütunu etkileşimsiz); şerit (mobil/azaltılmış) kartlarında hover 1.07. Pin sahnesinden SVG sahneleri çıkarıldı; premium panelde `ScenePremiumFrame` %60 kaldı, PV panelinde packshot + yalnız PV çipi.
2. §3 tetikleri `ScrollSvg mode` sözlüğüyle: `draw`, `parallax`, `view` (kaydırma → bir kez davranış), `near` (imleç ≤ 240 px). "Okuma ilerlemesiyle damar uzar" = `draw` (scrub). Yeni davranış adı yok. Yerleştirme sayfa sahiplerinde (devir: hareket-tasarimcisi → frontend-gelistirici, motion-v5).
3. Raf duvarı foto karoları Geliştirici B'nin dosyasında; kural motion.css'e eklenecek seçici devir notunda (`[data-shelf-photo]` + scrim katmanı `[data-shelf-scrim]`).
4. Takma ad devri henüz kapanmadı.
