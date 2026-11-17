# Wireframe — Sepet Drawer (global)

> Sahip: proje-yoneticisi · 2026-11-16 · Öncelik P0
> Dayanak: K-031 (drawer), K-036 (iki etiketli fiyat), K-059 (toplamlar), K-062 (PV), K-068 (ödeme sayfası yok; pasif düğme + "Yakında" — ONAYLI), K-088 (ÖNERİ) · Akış: `AKISLAR.md` A1.
> Bu dosya `sepet-odeme.md`'nin yerini alır; ödeme adımları (eski §B) K-068 ile kapsamdan çıktı.

## Değişiklik günlüğü
| Tarih | Değişiklik | Kaynak |
|---|---|---|
| 2026-11-16 | Kapsam yalnız sepet drawer; "Ödemeye geç" pasif + "Yakında" rozeti; drawer'daki tek etkin birincil eylem "Üye ol"; satırlarda ve toplamda PV | K-068, K-088, K-062 |

**Tek görevi:** Sepeti bir "alışveriş listesi" olarak gözden geçirtmek, online ödemenin yakında açılacağını dürüstçe söylemek ve üye fiyatıyla almak isteyeni üyeliğe yönlendirmek.
**Tek etkin birincil eylem:** "Üye ol" → `/uye-ol`. "Ödemeye geç" görünür ama pasiftir.
**Kaçınılacaklar karşılığı (MEMORY §7):** açıklamasız yan yana iki düğme yok — pasif düğmenin nedeni hemen altında yazılı; tasarruf/yüzde yok.

---

## A0. Açılma / kapanma
- Tetikleyiciler: header sepet ikonu, "Sepete ekle" sonrası otomatik, `/sepet` ve `/odeme*` adresleri (ana sayfa + drawer açık).
- Masaüstü sağdan (~420 px), mobil sağdan tam genişlik. Arka plan karartılır; odak drawer başlığına taşınır ve hapsedilir; Esc / kapat / arka plan kapatır; odak açan öğeye döner. Başlık "Sepetim (N ürün)".
- **Hareket niyeti:** sağdan kayma (~300 ms) + arka plan solma; eklenen satır kısa vurgu; reduced-motion'da yalnız solma.

## A1. Bildirim alanı (koşullu, en üst, `aria-live="polite"`)
- "1 ürün artık satışta olmadığı için sepetten çıkarıldı." · "Sepetin bu cihazda kaydedilemiyor." · "Bu üründen en fazla 10 adet eklenebilir."

## A2. Satır listesi
| Öğe | Alan | Not |
|---|---|---|
| Görsel | `images[0]` | Küçük; tıklanınca ürün detayı |
| Marka + ad | `brand`, `title` | Ad 2 satır |
| Hacim | `volume` | Varsa |
| Birim fiyatlar | `price`, `memberPrice` | "Fiyat ₺X · Üye fiyatı ₺Y" (küçük, iki etiketli) |
| PV | `pv` | "PV 0,5" (birim; ipucu yalnız toplamda — kalabalık olmasın) |
| Miktar | — | − / sayı / + (1–10); 1'de "−" yerine "Kaldır" ikonu |
| Satır toplamı | `price × adet` | "₺…" |
| Kaldır | — | Geri alma bildirimi 5 sn ("Ürün kaldırıldı · Geri al") |

- Son eklenen üstte. Miktar değişimi anında; toplamlar canlı (`aria-live`).
- Temalı ürün satırında tema işareti **yok** (sade liste).

## A3. Özet (drawer altında yapışkan)
1. **Toplam** (Fiyat üzerinden): "₺X"
2. **Üye fiyatıyla toplam:** rozet "₺Y"
3. **Toplam PV:** "PV 2,4" + ipucu (ⓘ → `/pv-nedir`)
4. Not: "Fiyatlara KDV dahildir." (Kargo satırı yok — ödeme sayfası olmadığından anılmaz.)
5. **Pasif ödeme düğmesi:** "Ödemeye geç" + "Yakında" rozeti (düğmenin içinde veya üst köşesinde, metin olarak).
   - Görsel olarak pasif (düşük vurgu) ama okunur kontrastta (metin ≥ 4,5:1 — pasif düğmeler WCAG muafiyetinde olsa da 40+ kitle için okunur kalır).
   - `aria-disabled="true"`, klavyeyle odaklanabilir; erişilebilir adı "Ödemeye geç, yakında" ; açıklaması aşağıdaki satıra bağlı.
   - Tıklama/Enter: hiçbir sayfa açılmaz, hata gösterilmez; açıklama satırı kısa bir vurgu yapar (reduced-motion'da yok) + olay `checkout_disabled_click`.
6. **Açıklama satırı (her zaman görünür, düğmenin hemen altında):** taslak "Online ödeme altyapımız hazırlanıyor. Şimdi üye olarak bu ürünleri üye fiyatıyla alabilirsin." (icerik-editoru son hâli)
7. **Etkin birincil düğme: "Üye ol"** → `/uye-ol` (olay `membership_entry_click {source: 'cart'}`).
8. İkincil: "Alışverişe devam et" (metin, drawer'ı kapatır).

- **Düzen sırası gerekçesi:** pasif düğme yukarıda (kullanıcı ödeme düğmesini arar, bulur, nedenini okur), hemen altında açıklama ve etkin "Üye ol". İki düğmenin görsel ağırlığı ayrışır: etkin olan belirgin, pasif olan sönük.
- **Yasak:** "₺Z tasarruf", yüzde, üstü çizgi, sahte geri sayım, "sipariş ver" vaadi.

## A4. Boş sepet
- "Sepetin boş" + kısa metin + **tek CTA** "Türkiye'de satışta olanları gör" (`/koleksiyon/turkiyede-satista`) + (varsa) son görüntülenen 3 TR ürünü küçük kart. Pasif ödeme düğmesi ve "Üye ol" boş sepette **gösterilmez**.

## A5. Mobil
- Tam ekran; özet alt yapışkan (yüksekliği ekranın ≤ %45'i; satırlar kayar); iOS güvenli alan.
- Küçük ekranda özet sırası korunur; "Toplam" ve "Üye fiyatıyla toplam" tek satırda yan yana sığmazsa alt alta.

## Ortak durumlar
| Durum | Davranış |
|---|---|
| Sepet başka sekmede değişti | Drawer odağa gelince yeniden okunur |
| Ürün yayından kalktı / yakında'ya düştü | Satır düşer + bildirim |
| Veri yüklenemedi | Satırlar ad/fiyatsız gösterilmez; "Sepet şu an yüklenemedi · Tekrar dene"; depo silinmez |
| JavaScript yok | Sepet ikonu `/sepet` → ana sayfa; "Sepet için JavaScript gerekir" notu (kabul edilen risk) |

## Analitik
`cart_open` (tetikleyici), `add_to_cart`, `remove_from_cart`, `checkout_disabled_click` (satır sayısı, toplam — kimliksiz), `membership_entry_click {source: 'cart'}`.

## Kabul kriterleri
`KABUL-KRITERLERI.md` §6.
