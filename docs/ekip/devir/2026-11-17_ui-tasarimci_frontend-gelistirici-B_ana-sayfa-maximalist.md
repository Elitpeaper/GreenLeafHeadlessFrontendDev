---
kimden: ui-tasarimci
kime: frontend-gelistirici-B
tarih: 2026-11-17
durum: AÇIK
ilgili: K-233, K-234, K-235…K-242 (ÖNERİ), S-067, docs/tasarim/briefler/ana-sayfa-maximalist.md, tasarim-kurallari.md §15, tokens.json v1.3.0
---

## Ne yaptım
Ana sayfa v2 için uygulanabilir bir brief yazdım: maksimalist yaklaşım, 8 bölüm, 390 ve 1440 düzenleri, kolaj katmanları, renk ve hover haritası. v1 brief (`ana-sayfa.md`) geçersiz olarak işaretlendi. Token'lara yeni anahtarlar ekledim, hiçbirini silmedim: `fontSize.ultra/colossal`, `typeStroke`, `stripe.variants.giant`, `shadow.sticker`, `colorBlock`, `collage`, `heroIntro`.

## Senden istediğim
`src/app/(magaza)/page.tsx` ve `src/components/sections/home/*` dosyalarını brief §1–§8'e göre yeniden kur. §9'daki tablo neyin korunup neyin düşeceğini gösteriyor. HeroSwiper mekaniği korunacak. Logo işareti ve zemin kalıcı katman olacak, slaytlar yalnız metin bloğu ile kolajı döndürecek (§2.1). Önizleme varyantları: `?hero=static` ve `?heroLogo=lockup`.

## Bilmen gerekenler
- Yeni stok görsel ya da SVG gerekmiyor (brief §11).
- `ultra` ve `colossal` için frontend-mimar'ın token builder'a eklemesi gerekiyor. Eklenene kadar `clamp` değerlerini tokens.json'dan aynen kullan.
- Gerçek metin fotoğraf, packshot ya da kâğıt katman üstünde durmayacak. Dekor tipografi `aria-hidden` olacak.
- Ürün kartı K-200 v2 olarak değişmeden kalıyor. Kart beyaz kalacak, fiyat + üye fiyatı + PV eksiksiz görünecek.
- Hareket kısmını hareket-tasarimcisi yapacak (ayrı not). Sen yalnız `data-motion` ve `data-svg-interact` işaretlerini koy.
- Metinler çalışma metni. Son hâlleri icerik-editoru'ndan gelecek (`home.*`).

## Kabul kriteri
Brief §13'teki 7 madde 360 / 390 / 768 / 1440 genişliklerinde ekran görüntüsüyle sağlanmalı. Önizleme kullanıcıya açılmadan önce ui-tasarimci incelemesinden geçecek (K-184).
