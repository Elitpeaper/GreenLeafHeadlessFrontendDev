---
kimden: ui-tasarimci
kime: hareket-tasarimcisi
tarih: 2026-11-16
durum: KAPANDI
ilgili: K-066, K-070, K-034, K-075 (ÖNERİ), docs/tasarim/tasarim-kurallari.md §11–12, docs/tasarim/bilesenler/*.md, docs/tasarim/briefler/ana-sayfa.md
---

## Ne yaptım
Faz 2 tasarım spesifikasyonları v1 hazır. Hareketi tarif etmedim. Her bileşende "Hareket noktaları (→ hareket-tasarimcisi)" başlığı altında **nerede** hareket gerektiğini işaretledim. Ana sayfa brief'inde noktalar ⟡ M-1…M-23 olarak numaralı.

## Senden istediğim
1. `docs/tasarim/hareket.md` içinde aşağıdaki noktaların her biri için süre, eğri, tetik, reduced-motion karşılığı ve performans notu:
   - **Ana sayfa:** M-1…M-23 (`briefler/ana-sayfa.md`). Öncelik hero (M-2…M-6), vitrinler (M-9…M-12, M-17) ve PV akışı (M-18, M-19).
   - **Header:** H1…H10 (`bilesenler/header.md` §8). Hepsi küçük ve tek seferlik, döngü yok (K-070).
   - **Footer:** F1…F6 (`bilesenler/footer.md` §7).
   - **Ürün kartı, mega menü, sepet drawer, cilt bulucu, PV sayfası, premium tema:** ilgili dosyaların son bölümü.
2. **Hover-recolor (K-066 / K-075 öneri):** `bilesenler/hover-recolor.md` §5–§8. Niyet ve bırakma gecikmesi, renk geçiş süresi ve eğrisi, ardışık tetikleyiciler arasında doğrudan geçiş, Z1 ile Z2'nin eşzamanlılığı. `@property` ile kayıtlı renk değişkenleri üzerinden CSS transition (çerçeve §6). Büyük zemin boyamasının INP etkisini ölç.
3. Motion token önerilerini (`tokens.json › motion`) güncellemen gerekirse değerleri bana devir notuyla gönder; tokens.json'u ben güncellerim.

## Bilmen gerekenler
- Sınırlar: transform, opacity ve kayıtlı renk değişkenleri kullanılır · LCP öğesi (hero görseli, H1) animasyonla gizlenmez · hover yalnız `(hover:hover) and (pointer:fine)` · reduced-motion açıkken tüm dekoratif hareket statik olur (hover-recolor dahil devre dışı; kullanıcı önizlemede "anlık" alternatifini de görecek).
- Logo ve 7 kümeli işaret **asla** animasyon almaz, döndürülmez. Yükleme göstergesi için işaret kullanılmaz; çizgi bandı veya LeafCluster kullanılabilir.
- Sepet drawer'daki pasif ödeme düğmesine basıldığında **sallama yok** (hata hissi). Yalnız açıklama satırı vurgulanır.
- Marka marquee'sinde (M-23) durdur düğmesi ve hover/odakta durma zorunlu (WCAG 2.2.2).
- 40+ kitle: header gizlenip beliren tip değil, her zaman yapışkan kalır (yalnız kompakt geçiş).

## Kabul kriteri
`hareket.md`'de her işaretli nokta için bir satır bulunur (id, süre, eğri, tetik, reduced karşılığı). Hover-recolor geçişinde `--accent-text`'in ≥ 4.5 kaldığını gösteren test planı yazılı olur. Performans bütçesi (K-034) için ölçüm yöntemi belirlenmiş olur.
