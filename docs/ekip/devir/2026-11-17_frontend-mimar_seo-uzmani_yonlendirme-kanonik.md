---
kimden: frontend-mimar
kime: seo-uzmani
tarih: 2026-11-17
durum: AÇIK
ilgili: next.config.ts, K-086, K-201, K-202, TASARIM-INCELEME-1 C-4
---

## Ne yaptım
- 308 yönlendirmeler: `/pv` → `/pv-nedir`, `/kvkk` → `/yasal/kvkk-aydinlatma-metni`, `/cerez-politikasi` → `/yasal/cerez-politikasi`. Diğerleri (`/sepet`, `/odeme*`, `/cilt-testi*`, `/iletisim`, `/kategori`, `/urun`, `/koleksiyon`) 307.
- `/hareket-lab` canlıda 404; `/hareket-lab` ve `/svg-kutuphanesi` `X-Robots-Tag: noindex, nofollow`.

## Senden istediğim
1. 307 olanların kesin durum kodları (next.config.ts `redirects()`; değişiklik için bana not).
2. `/urunler` ve tüm numaralı listeler (`?sayfa=N`, `?adet=48`) için kanonik kuralı ve sitemap girdisi (Geliştirici A isteği, K-201/K-202).
3. Sitemap'ten `/hareket-lab`, `/svg-kutuphanesi` hariç tutulmalı.

## Kabul kriteri
Kurallar `docs/seo/`'da; `src/lib/seo/` yardımcıları sayfalarda kullanılıyor.
