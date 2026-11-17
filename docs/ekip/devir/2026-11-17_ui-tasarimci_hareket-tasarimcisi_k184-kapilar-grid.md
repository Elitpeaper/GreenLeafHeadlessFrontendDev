---
kimden: ui-tasarimci
kime: hareket-tasarimcisi
tarih: 2026-11-17
durum: KAPANDI
ilgili: K-184, K-260, K-158, S-060 · src/components/motion/motion.css:1864–1880 · src/app/globals.css:214–225 · briefler/ana-sayfa-maximalist.md §6 (v2.1)
---

## Ne yaptım
K-184 incelemesi (`docs/qa/TASARIM-INCELEME-3.md`). Pin (tam katman) ve 390 şeridi doğru çalışıyor. Bu makinede headless Chrome varsayılan olarak `data-motion="reduced"` alıyor, bu yüzden kullanıcı da büyük olasılıkla ilk açılışta pin kapalı düzeni görecek.

## Senden istediğim
1. **Y-2 (gösterim öncesi):** `motion.css:1864` `html:not([data-motion="on"]) [data-hpin-track]` 3 sütunlu ızgarası 5 kapıyı 3 + 2 diziyor ve sağ altta 1/3 genişlikte boş orman alanı bırakıyor (`home-def-1440-tam.png`, y ≈ 3600–4300). ≥ 1024 için brief §6 bento tablosunu uygula: 12 sütun × 2 satır. PV 1–5 × 2 satır, Cilt tipi 6–9 / 1, Premium 10–12 × 2 satır, Üye ol 6–7 / 2, Haberler 8–9 / 2. Kapı sayısı 4 ise eşit doldur. 768–1023: 2 sütun, PV tam genişlik. Kapı sırasını DOM'dan okuyorsan `:nth-child` yerine `HomeDoors.tsx`'teki `data-door` anahtarı (gerekirse frontend-gelistirici-B ekler) daha güvenli.
2. **O-6:** `globals.css:214–225` `.anim-sway` (14 s `infinite alternate`) ve `.anim-float` (`infinite`) hâlâ tanımlı. `LeafCluster` bunları Footer, ListingView, CartDrawer ve Membership'te kullanıyor. K-158 kaldırılmalarını öngörüyordu. motion.css bunları zaten geçersiz kılıyorsa yalnız teyit et, kılmıyorsa ≤ 5 sn'de dur ya da kaldır.

## Bilmen gerekenler
`svg-davranislari` notun KAPANDI. `tokens.json › motion.duration.{fast,base,slow,slower,ambient}` DEPRECATED takma adları **silinmedi**, çünkü hâlâ kullanılıyorlar: `globals.css:116,125,201,206,210,217`, `urunler/page.tsx:39,44`, `kategori/[kok]/[[...alt]]/page.tsx:53,64`. Kullanımlar xs…xl'e taşınınca silerim.

## Kabul kriteri
Azaltılmış harekette 1440 Kapılar'da boş hücre yok. Footer/drawer'da 5 sn'yi aşan sonsuz animasyon yok.

## Kapanış (hareket-tasarimcisi, 2026-11-17)
- Y-2: `motion.css › K-257` pin kapalı ≥ 1024 bento (§6 hücre haritası, konum + sayıyla, `data-door` gerekmedi); 768–1023 2 sütun, PV tam genişlik. Tek sapma: orta 4 iz `2fr` (eşit izlerde Üye ol/Haberler ≈ 210 px kalıp metni kırpıyordu). Kanıt `docs/qa/ekran/k184-kapilar/`.
- O-6: `globals.css` `.anim-float`/`.anim-ping` silindi, `.anim-sway` tek 4,2 sn salınım; gizli gezinme göstergesi döngüsü durduruldu. 5,5 sn sonra sonsuz animasyon 0.
- DEPRECATED: `globals.css` artık takma ad kullanmıyor. Kalan kullanıcılar → `2026-11-17_hareket-tasarimcisi_frontend-gelistirici_k184-takma-adlar.md`. Sana dönüş: `2026-11-17_hareket-tasarimcisi_ui-tasarimci_k184-kapilar.md`.
