---
kimden: kalite-denetcisi
kime: frontend-gelistirici
tarih: 2026-11-18
durum: AÇIK
ilgili: K-288, KK-0-16, KK-0-19a; docs/qa/PERFORMANS-DENETIMI-1.md; src/components/blog/BlogHero.tsx, ArticleView.tsx; src/components/sections/home/HeroCollage.tsx, HeroSwiper.tsx; src/components/product/ProductCard.tsx
---

## Ne yaptım
Üretim derlemesinde performans ölçümü yaptım. Ayrıntılar `docs/qa/PERFORMANS-DENETIMI-1.md` içinde.

## Senden istediğim
1. **P-03 (Engelleyici):** `BlogHero.tsx:52` — LCP görselinin kapsayıcısındaki `data-motion="reveal-scale"` görseli 2,5 sn'ye kadar gizliyor. Mobil `/blog` LCP 4,16–4,37 sn (KK-0-19a). İlk ekrandaki görselden `data-motion`'ı kaldır. `ArticleView.tsx:85` aynı kalıpta (ölçülmedi, aynı risk).
2. **P-04 (Engelleyici):** `HeroCollage.tsx:126-141` `ArtDirected` — `<img>`'e `fetchPriority="high"` ekle ve iki kaynak için `ReactDOM.preload(..., { as: "image", imageSrcSet, imageSizes, media, fetchPriority: "high" })` çağır. Şu an HTML'de görsel preload'ı yok; mobil `/` LCP 2,65–2,69 sn.
3. **P-07:** `HeroSwiper.tsx` — hero görünmezken (IntersectionObserver) `autoplay.pause()`. İlerleme çubuğu (`:88`, `:195`) hareket-tasarimcisi'nin çözümüne göre CSS animasyonuna taşınacak.
4. **P-02 (DOM payı):** `ProductCard.tsx:111-114, 168` — kart başına 55 element var; dekor span'ları (glare, sweep, podyum blur, hover paneli) tek pseudo-element'e indirilsin veya ilk hover'da eklensin. Ana sayfadaki 1374 SVG düğümü (%33) hafifletilsin. Hedef ve strateji frontend-mimar'dan gelecek.
5. **P-13 (Öneri):** mega menü tetiğinde de `onPointerEnter` ile panel chunk'ını önden yükle (4×'te ilk açılış karesi 254 ms).

## Bilmen gerekenler
- Masaüstünde Playwright, tilt hareketi yüzünden karttaki "Sepete ekle" düğmesine normal tıklamayla tıklayamıyor ("kararlı değil"). Bu bir hata değil, bilgi notu.
- CLS her sayfada 0; bu değişikliklerde korunmalı.

## Kabul kriteri
- Mobil (4× CPU, yavaş 4G) `/` LCP ≤ 2,5 sn ve `/blog` LCP ≤ 2,5 sn (3 tekrarın en kötüsü).
- `/blog` LCP'si `?motion=off` ile ±100 ms içinde.
- CLS ≤ 0,1.
