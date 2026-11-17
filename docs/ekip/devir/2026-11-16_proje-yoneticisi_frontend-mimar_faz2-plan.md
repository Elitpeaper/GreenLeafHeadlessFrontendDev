---
kimden: proje-yoneticisi
kime: frontend-mimar
tarih: 2026-11-16
durum: AÇIK
ilgili: K-062, K-064…K-069, K-085 (ONAYLI); K-086…K-099 (ÖNERİ); docs/plan/*; devir 2026-11-16_veri-muhendisi_frontend-mimar_sema-v2.md
---

## Ne yaptım
Planı Kapı 1 kararlarına göre güncelledim. Ödeme sayfaları kalktı; bulucu, PV sayfası, görselli mega menü, tema ve hover renk geçişi eklendi. Veri alan adlarını veri-muhendisi şema v2 ile hizaladım (`pv`, `pvSource`, `palette`, `themeHint`, `priceSource`, `publishReady`).

## Senden istediğim
1. **Rotalar** (`SAYFA-HARITASI.md`): `/odeme*` yok, `/sepet` ve `/odeme*` → `/` + drawer açık; yeni: `/pv-nedir` (seo-uzmani `/pv` derse tersine), `/cilt-tipine-gore`, `/cilt-tipine-gore/[tip]` (5 statik), `/yasal/e-posta-acik-riza`; `/cilt-testi` → `/cilt-tipine-gore`.
2. **Bulucu eşleştirme** saf fonksiyon + birim testleri (`CILT-TESTI.md` §2, §4; `tip=hassas` kuralı dahil; KK-7-04 a–f). Durum yalnız adres parametrelerinde.
3. **E-posta servis adaptörü:** servis bağımsız arayüz; `emailCapture.enabled=false` iken form DOM'da yok, ağ isteği 0 (KK-7-08); açıkken yük CILT-TESTI §7'deki alanlarla sınırlı.
4. **Pasif ödeme düğmesi** davranışı (K-088, KK-6-06…09).
5. **Tema + palet mimarisi:** ui K-072 aksan katmanı; `themeHint` ipucu, açılış yapılandırmayla (`themes.enabled`, koleksiyon `theme`); bilinmeyen anahtar → ana tema (KK-11-02); hover RecolorZone (`@property` renk değişkenleri; yalnız Z1–Z3; klavye odağı; reduced-motion/`prefers-contrast: more`/dokunmatikte kapalı).
6. **Yapılandırma şeması** (yer tutucularla): `announcement`, `hero[]` (+ `products[]`), `homeTabs[]`, `homePremium.collectionKey`, `megaFeatured`, `megaMenu.campaigns`, `emailCapture`, `businessPlan` (PV sayfası iş fırsatı bölümü verisi), ana sayfa A/B varyant bayrakları (önizlemede değiştirilebilir).
7. **Mega menü görsellerinin tembel yüklenmesi** (panel açılmadan istek 0; KK-1-06) ve performans bütçesi (K-097, KK-0-18).
8. PV biçimlendirici ("PV 0,5"), `pv: null` → öğe yok (K-098); fiyat biçimi K-059.

## Bilmen gerekenler
- Yakındaların tümü `publishReady: false`: canlıda gizli; geliştirme/önizleme ortamında örnek gösterimi için bayrak düşün.
- `price-implausible` (LGD012) satışa açılmaz (S-025).
- Hero packshot'ları fiyatsız (yalnız PV) — tek istisna.
- Kazanç içeriği yalnız `/pv-nedir#is-firsati`; `businessPlan` yoksa bölüm render edilmez (K-099).

## Kabul kriteri
`KABUL-KRITERLERI.md` §0.4–0.5, §6, §7, §11, §12 testlerini mümkün kılan iskelet; bulucu birim testleri yeşil; tip hatası yok; `docs/teknik/TEKNIK-TASARIM.md` bu kararlarla güncellenmiş.

## İlerleme (frontend-mimar, 2026-11-16) — durum AÇIK kalıyor (kısmi)
Yapıldı: 1 rotalar (SAYFA-HARITASI; `/pv-nedir`, `/cilt-tipine-gore` + 5 `[tip]`, `/yasal/[slug]` 4 sayfa, yönlendirmeler next.config'te 307), 4 pasif ödeme düğmesi (`useCheckout`, K-088), 5 tema + palet + RecolorZone altyapısı (`ThemeScope`, `useAccentZone`, `@property`), 6 yapılandırma şeması (`src/config/storefront.ts`: announcement, home.heroCodes/tabs/premiumCollection/variant, megaFeatured, megaCampaign, emailCapture, businessPlan, collections+theme), 8 PV/fiyat biçimi (`formatPvLabel`, K-059 `formatPrice` + testler).
Bekliyor: 2 bulucu eşleştirme saf fonksiyonu + KK-7-04 testleri, 3 e-posta servis adaptörü, 7 mega menü tembel görsel yükleme yardımcısı (bileşen tarafı frontend-gelistirici) + megaFeatured yedek zinciri. Sıradaki frontend-mimar turunda.
