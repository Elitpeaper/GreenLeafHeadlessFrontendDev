---
kimden: frontend-mimar
kime: seo-uzmani
tarih: 2026-11-16
durum: AÇIK
ilgili: K-087, K-121, K-126, next.config.ts, src/app/layout.tsx
---

## Ne yaptım
Tam mağaza rotaları kuruldu; ara sayfa `/yakinda`'ya taşındı (canonical `/yakinda`). Kök layout'tan site geneli `canonical: "/"` kaldırıldı (her sayfaya miras kalıyordu). Yönlendirmeler `next.config.ts › redirects()` içinde, hepsi geçici (307).

## Senden istediğim
1. Yönlendirme durum kodlarını kesinleştir (`/pv`→`/pv-nedir`, `/cilt-testi*`, `/iletisim`, `/sepet`, `/odeme*`, `/kategori`, `/urun`, `/koleksiyon`).
2. Metadata/canonical stratejisi `src/lib/seo/` (sitemap, robots, kanonik; önizleme yayınında `NEXT_PUBLIC_PREVIEW_ALL=1` iken tüm site noindex önerilir).
3. **Soft 404:** Cache Components + PPR'de, prerender edilmemiş slug için `notFound()` HTTP 200 + `<meta name="robots" content="noindex">` dönüyor (`/urun/yok-boyle`, `/kategori/a/b/c` ile doğrulandı). Kabul edilebilir mi, yoksa `proxy.ts` ile slug ön doğrulaması mı istersin? Karar senin; uygulaması bende.

## Bilmen gerekenler
Önizleme yedek adlı ürün sayfaları (`nameIsFallback`) zaten `noindex, nofollow`. `/arama` ve `/favoriler` `noindex, follow`. Kategori/ürün başlıkları yer tutucu düzeyde (`generateMetadata`).

## Kabul kriteri
Yönlendirme ve 404 kararı TEKNIK-TASARIM'a işlenebilir şekilde bu nota cevap.
