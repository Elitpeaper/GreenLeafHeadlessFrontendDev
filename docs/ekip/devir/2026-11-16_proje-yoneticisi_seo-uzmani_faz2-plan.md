---
kimden: proje-yoneticisi
kime: seo-uzmani
tarih: 2026-11-16
durum: AÇIK
ilgili: K-051 (ONAYLI), K-087, K-086, K-089, K-099 (ÖNERİ); docs/plan/SAYFA-HARITASI.md
---

## Ne yaptım
Sayfa haritasını güncelledim: ödeme sayfaları kalktı; PV sayfası, cilt tipine göre bulucu (+ 5 ön seçimli tip sayfası) ve e-posta açık rıza yasal sayfası eklendi; temalı içerik için yeni URL ailesi açılmadı.

## Senden istediğim
1. **PV sayfası adresi:** `/pv-nedir` (plan) mı `/pv` (ui-tasarimci) mı — birini seç, diğeri 301.
2. **Bulucu indeksleme:** `/cilt-tipine-gore` ve `/cilt-tipine-gore/{tip}` indeksli; `ihtiyac/hassas/rutin/gorunum` parametreli hâller noindex + kanonik — onayla veya düzelt.
3. **Yönlendirmeler:** `/sepet`, `/odeme`, `/odeme/*` → `/`; `/cilt-testi` → `/cilt-tipine-gore`; `/pv` ↔ `/pv-nedir`.
4. **Yapılandırılmış veri:** PV sayfası SSS (FAQ uygun mu), yakında ürünlerde Offer yok (K-022), temalı koleksiyon sayfaları `CollectionPage`; `#is-firsati` bölümü için SEO açısından risk/öneri (kazanç içeriği arama snippet'inde nasıl görünür).
5. Mega menü bağlantılarının sunucuda render edilmesi (plan böyle) — tarama açısından teyit.

## Bilmen gerekenler
- Yakındaların tümü şu an `publishReady: false` → sitemap'e girmez.
- Ödeme açık değil; satın alınabilir işaretleme yok.

## Kabul kriteri
`docs/seo/` altında URL ve indeksleme kararı yazılı; KK-5-07, KK-12-04 ve SAYFA-HARITASI "İndeks" sütunu senin kararınla tutarlı (çelişki varsa PM'e not).
