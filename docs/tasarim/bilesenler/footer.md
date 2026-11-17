# Bileşen — Footer (`SiteFooter`)

> ui-tasarimci · v1 · 2026-11-16 · Dayanak: BILGI-MIMARISI §3.5, K-045, K-047, K-062, K-070 · ÖNERİ K-078 (açık footer)

## 1. Yön
**Açık footer:** `surface-muted` (#F6F8F4) zemin, ink metin (11.57). Altta signature çizgi bandı bulunur. Gerekçe: brandbook beyaz zemin ilkesine uyar, koyu panel sayfada bir kez kullanılır (üyelik), rakiplerin koyu orman footer'ından ayrışır. Premium-gold sayfalarında da footer **değişmez**; tema yalnız içerik alanına uygulanır.

## 2. Anatomi
```
──── 1px line ───────────────────────────────────────────────────────────
[A] Üst şerit (beyaz kart, radius xl, sayfa içinde, footer'ın üst kenarına taşar −48px):
    Sol: "PV nedir?" mini açıklama (PV çipi + 1 cümle + bağlantı)  │  Sağ: "Cildine uygun ürünü bul" bağlantısı
[B] 5 sütun (masaüstü):
    Marka sütunu        │ Alışveriş   │ Keşfet        │ Kurumsal          │ Yasal
    logo (beyaz kartta) │ 12 kök      │ Cilt testi    │ Hakkımızda/iletş. │ KVKK aydınlatma
    1 cümle marka notu  │             │ TR'de satışta │ Sertifikalar      │ Çerez politikası
    sertifika mini      │             │ Setler        │ Üye ol            │ Kullanım koşulları
    rozetleri (PDF)     │             │ Favoriler     │ PV nedir?         │
                        │             │               │                   │
[C] Satıcı bandı: "[SATICI_ADI] — Bağımsız Greenleaf Distribütörü" · e-posta · telefon (K-047 yapılandırma)
    "Greenleaf, Suzhou merkezli bir Çin firmasıdır." (icerik-editoru) · © yıl
[D] Signature çizgi bandı (tam genişlik, 10/6/8 + 4 boşluk)
```
- Logo yalnız beyaz zeminde gösterilir (§9.3). Bu nedenle marka sütununda logo beyaz, radius lg bir kartın içinde durur.
- Sağ alt köşede LeafCluster filigranı bulunur (%12 opaklık, kırpılmış, dekoratif, `aria-hidden`).
- [A] şeridi isteğe bağlıdır. Ana sayfada PV bandı zaten varsa ana sayfada gizlenir (tekrar yok).

## 3. Tipografi ve boşluk
Sütun başlıkları semantik olarak `h2`, görsel olarak sm 600 ink'tir. Bağlantılar sm 400 ink, satır aralığı 2.0 (40+ için geniş tıklama). Hedef yüksekliği ≥ 44 px (dikey padding). Üst boşluk `section`, sütunlar arası `grid-gap`.

## 4. Mobil
Marka sütunu ve [A] şeridi üstte yer alır. Dört bağlantı sütunu **akordeon** olur (başlık düğmesi `aria-expanded`, 56 px). Yasal bağlantılar akordeonsuz, düz liste olarak altta durur (yasal görünürlük). Satıcı bandı ve çizgi bandı en alttadır.

## 5. Durumlar
Satıcı bilgisi boşsa yer tutucu yerine satır gizlenir (yayın kontrol listesinde zorunlu alan). Sertifika PDF'i olmayan rozet görünmez (K-058).

## 6. Erişilebilirlik
`footer` + `nav aria-label="Alt gezinme"`. Dış bağlantılarda sr-only "(yeni sekmede açılır)". Sertifika rozeti erişilebilir adı "ISO 22716 belgesi (PDF, yeni sekmede açılır)" olur.

## 7. Mikro animasyon noktaları (→ hareket-tasarimcisi)
| # | Nokta |
|---|---|
| F1 | Footer görünür alana girerken signature bandın soldan çizilmesi (bir kez) |
| F2 | LeafCluster filigranının çok yavaş salınımı (ambient; reduced'da yok) |
| F3 | Bağlantı hover'ında alt çizginin uzaması |
| F4 | Sertifika rozetinde hover/odakta hafif kalkma |
| F5 | Mobil akordeon açılışı (yükseklik + ok dönüşü) |
| F6 | "Başa dön" düğmesi (sağ alt, yalnız uzun sayfalarda, 1. ekran sonrası belirir) |
