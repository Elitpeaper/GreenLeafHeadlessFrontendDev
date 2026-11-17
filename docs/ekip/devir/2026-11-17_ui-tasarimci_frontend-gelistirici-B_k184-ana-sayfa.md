---
kimden: ui-tasarimci
kime: frontend-gelistirici-B
tarih: 2026-11-17
durum: KAPANDI
ilgili: K-184, K-176, K-234, K-241 · docs/qa/TASARIM-INCELEME-3.md · docs/qa/ekran/k184-ana-sayfa/
---

## Ne yaptım
Maksimalist ana sayfayı 360/390/768/1440'ta (reduced + `?motion=full`) inceledim. Taşma, boş bağlantı ve iç not yok. Fiyat üçlüsü 32/32 kartta tam. Brief v2.1 olarak güncellendi (§2.2, §2.3 L6, §6, §13).

## Senden istediğim (önem sırasıyla)
1. **Y-1 (gösterim öncesi):** `src/components/sections/home/Showcase.tsx:61`. Mobil raydaki `ul`'ye `scroll-px-gutter` (scroll-padding-inline = gutter) ekle. Şu an ilk kart x = 0'a yapışıyor (`x-390-vitrin1-title.png`).
2. **O-1:** `Shelves.tsx:94`. 1×1 karoda `line-clamp-2` "Hijyen ve Kâğıt Ürünleri"yi kesiyor. `line-clamp-3` yap (ya da veride kısa ad varsa onu kullan). `Shelves.tsx:97`: ≥ 1024'te 1×1 karolarda da ürün sayısı görünsün (brief §4).
3. **O-2:** hero 768–1023. Sağ yarı boş, kolaj ve kontroller ilk ekranın dışında kalıyor. md'de metin + kolaj yan yana (7/5) ya da kolajı küçültüp kontrolleri ilk ekrana al (`home-def-768-hero.png`).
4. **O-3:** `Showcase.tsx:39`. "Tümünü gör (N) →" container'ın sağ kenarına yaslansın. Specimen yaprak bağlantının arkasında/üstünde kalabilir (`pointer-events: none`).
5. **O-5:** `/` sunucu render'ında React "unique key" uyarısı var (dev rozeti "1 Issue"). Kaynak büyük olasılıkla `HomeHero.tsx` slayt düğümleri ya da `HeroCollage.tsx` dizileri.
6. **D-1:** `GiantBand.tsx:53`. "Hikâyemiz →" plakasının soluna 48 px `brand-blue → transparent` geçiş ekle. Dev yazı şu an sert kenarla kesiliyor.

## Bilmen gerekenler
- Kapılar'ın pin kapalı masaüstü ızgarası (Y-2) `motion.css`'te, hareket-tasarimcisi'ne ayrı not bıraktım. Bento düzeni için `HomeDoors.tsx`'te hücre sınıfları gerekirse onunla koordine et (brief §6 v2.1).
- Renk, tipografi ve kolaj kurallarına uyum iyi. Bu maddeler dışında ana sayfada değişiklik isteğim yok.

## Kabul kriteri
390 ve 360'ta ilk kart başlıkla aynı sol kenarda. Raflar'da "…" yok. Konsolda key uyarısı yok. 768 ilk ekranda boş yarım alan yok.
