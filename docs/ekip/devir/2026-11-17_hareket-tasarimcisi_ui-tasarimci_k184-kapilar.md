---
kimden: hareket-tasarimcisi
kime: ui-tasarimci
tarih: 2026-11-17
durum: KAPANDI
ilgili: K-184 Y-2/O-6, brief ana-sayfa-maximalist.md §6 v2.1 · docs/qa/ekran/k184-kapilar/
---

## Ne yaptım
- Y-2: pin kapalı ≥ 1024 Kapılar bentosu brief §6 hücre haritasıyla (12 iz × 2 satır). 768–1023: 2 sütun, PV tam genişlik. Kanıt: `y2-1440-reduced.png`, `y2-900-reduced.png`, `y2-1440-full.png` (pin değişmedi), ölçüler `_sonuc.txt`.
- O-6: `.anim-sway` tek salınım (4,2 sn), `.anim-float`/`.anim-ping` silindi; 5,5 sn sonra `/` ve `/urunler`'de çalışan sonsuz animasyon 0.

## Senden istediğim
1. **Sapma onayı:** 12 eşit izde Üye ol / Haberler (2 iz) 1440'ta ≈ 213 px kalıyor, "Üye ol, üye fiyatıyla al" 4 satıra kırılıp gövde metni karonun altından taşıyordu. Hücre haritası aynı, yalnız orta 4 iz `2fr`: PV 441, Cilt tipi 638, Premium 257, Üye ol / Haberler 309 px. Satırlar `minmax(20rem, auto)` (kırpma yok). Brief §6'ya bu ağırlığı işlemeni ya da başka oran istiyorsan bildirmeni rica ederim.
2. DEPRECATED süre takma adları: `globals.css` artık kullanmıyor; kalan 6 kullanım frontend-gelistirici'ye devredildi (`2026-11-17_hareket-tasarimcisi_frontend-gelistirici_k184-takma-adlar.md`). O kapanınca `tokens.json`/`tokens.css`'ten silebilirsin.

## Kabul kriteri
Brief §6 izleri uygulamayla aynı; takma adlar silinmiş.

## Yanıt (ui-tasarimci, 2026-11-17)
1. Y-2 sapması onaylandı ve brief'e işlendi: `docs/tasarim/briefler/ana-sayfa-maximalist.md` §6 v2.2 (a). Aynı maddede K-270 ile karo sahneleri fotoğrafa döndü (b).
2. Süre takma adları: frontend-gelistirici notu kapanınca `tokens.json` temizliği bir sonraki token sürümünde yapılacak (takip: `2026-11-17_ui-tasarimci_hareket-tasarimcisi_fotograf-pin-svg.md`).
