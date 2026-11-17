# Bileşen — Sepet drawer (`CartDrawer`)

> ui-tasarimci · v1 · 2026-11-16 · Dayanak: K-031, K-036, K-059, K-062, **K-068 (ödeme sayfası yok; pasif düğme + "Yakında")** · ÖNERİ K-079
> Davranış ayrıntıları `wireframe/sepet-odeme.md` A bölümündedir. B bölümü (ödeme adımları) K-068 ile iptal edildi.

## 1. Kabuk
- Masaüstünde sağdan açılır, genişlik `container.drawer` (28rem), tam yükseklik, gölge `overlay`. Üst kenarda thin çizgi bandı bulunur. Arka plan %40 ink karartma alır. Mobilde tam ekran açılır, alt güvenli alan payı bırakılır.
- Başlık satırı (64 px): "Sepetim" (2xl 600) + "(3 ürün)" ink-muted + Kapat (48 px).
- Gövde kayar. Özet alanı altta yapışkandır, üst kenarında 1 px line ve `shadow` ters yön (yukarı) bulunur.

## 2. Satır (`CartLine`)
```
┌──────┐ CARICH                                  [🗑]
│ 72px │ Nemlendirici yüz kremi, hassas ciltler… (2 satır)
│ img  │ 50 ml
└──────┘ Fiyat ₺1.299,90 · [Üye fiyatı ₺649,95] · PV 12,5
         [ − ] 2 [ + ]                       ₺2.599,80
```
- Görsel 72 px kare, `--accent-soft` zemin (ürün paleti varsa onun soft'u).
- Birim fiyatlar sm boyuttadır, rozet küçük boyda gösterilir (green-700/beyaz, xs 600). PV çipi xs'tir.
- Miktar adımlayıcı: 44 px düğmeler, sayı tabular. 1'de "−" yerine çöp ikonu gelir (wireframe kuralı). 10'da "+" `aria-disabled` olur ve ipucu "En fazla 10 adet" gösterilir.
- Satır toplamı lg 600 ink, sağa hizalıdır (Fiyat üzerinden).
- Kaldırma sonrası satırın yerinde 5 sn'lik bilgi satırı görünür: "Ürün kaldırıldı · Geri al".

## 3. Özet (yapışkan alt alan)
```
Toplam                                   ₺3.899,70
Üye fiyatıyla toplam               [ ₺1.949,85 ]   ← yeşil rozet (invariant)
Toplam PV                                 (PV 37,5 ⓘ)
Fiyatlara KDV dahildir. Kargo ücreti ödeme açıldığında hesaplanacak.   (xs ink-muted)

┌──────────────────────────────────────────────┐
│ 🔒  Ödemeye geç                 [ Yakında ]  │   ← pasif düğme (aria-disabled)
└──────────────────────────────────────────────┘
ⓘ Online ödeme altyapımız hazırlanıyor. Şimdilik sepetin bu cihazda saklanır;
  üye fiyatıyla almak için Greenleaf'e üye olabilirsin.          (sm ink-muted, aria-describedby)

┌──────────────────────────────────────────────┐
│        Üye ol, üye fiyatıyla al  →           │   ← etkin ikincil (çerçeveli green-700)
└──────────────────────────────────────────────┘
              Alışverişe devam et                  ← metin bağlantısı
```
Tasarruf ifadesi, yüzde ve üstü çizgi yoktur (K-036).

### 3.1 Pasif ödeme düğmesi (K-068)
| Özellik | Değer | Neden |
|---|---|---|
| Öğe | `<button aria-disabled="true" aria-describedby="checkout-note">` (HTML `disabled` **değil**) | Klavye ve ekran okuyucu düğmeye ulaşır ve neden pasif olduğunu duyar |
| Zemin / çerçeve | `surface-muted` + 1.5 px kesikli `line-strong` (3.14) | "Kırık" griden ayrışır, "henüz değil" hissi verir |
| Metin | "Ödemeye geç", base 600, **ink-muted 5.90** (okunur kalır) | 40+ okunabilirlik; disabled muafiyetine yaslanılmaz |
| İkon | kilit (Lucide `lock`), ink-muted | Durumu renk dışında da anlatır |
| Rozet | "Yakında": blue-100 zemin + blue-800 metin (7.14), xs 600, pill, sağda | K-068 |
| Yükseklik | 56 px (`control-lg`) | Gerçek düğme ölçüsü, düzen ödeme açılınca değişmez |
| Etkileşim | Tıklama/Enter: hiçbir yere gitmez. Açıklama satırı vurgulanır (ⓘ ikonu ve metin kısa süre `--accent-soft` zemine geçer) ve sr için `aria-live` ile tekrar okunur | Geri bildirim var, hata hissi yok (sallama yok) |
| Hover | İmleç `not-allowed` değil, `default` | Cezalandırıcı değil |

Açıklama metninin son hâlini icerik-editoru verir (taslak yukarıda).

### 3.2 Etkin ikincil eylem
"Üye ol, üye fiyatıyla al" `/uye-ol` bağlantısıdır: çerçeveli (1.5 px green-700, metin green-700 5.35), 56 px, tam genişlik. Drawer'daki tek etkin düğmedir. **Not (kullanıcı önizlemede görecek):** alternatif olarak bu düğme dolu (birincil) yapılıp pasif ödeme düğmesinin altına alınabilir. Öneri: çerçeveli, çünkü K-068 ödeme düğmesinin standart yerinde görünmesini istiyor ve iki dolu düğme hiyerarşiyi bozar.

## 4. Boş sepet
LeafCluster illüstrasyonu (küçük, `--accent-decor`) + "Sepetin boş" (2xl) + 1 cümle + **tek birincil CTA** "Türkiye'de satışta olanları gör" + (varsa) son görüntülenen 3 TR ürünü mini kartı (fiyat + üye fiyatı + PV).

## 5. Bildirim alanı
En üstte, `aria-live="polite"`. Bilgi bildirimleri blue-50 zemin + ink, hata bildirimleri danger-50 + danger kullanır. Metinler wireframe A1'deki gibidir.

## 6. Durumlar
Kapalı · açılıyor · dolu · boş · satır güncelleniyor (toplamlar canlı) · satır kaldırıldı (geri al) · ürün artık yok (bildirim) · depolama yok (bildirim) · pasif düğmeye basıldı (açıklama vurgusu).

## 7. Erişilebilirlik
`role="dialog" aria-modal="true" aria-labelledby` · odak hapsi, açılışta başlığa odak, kapanışta tetikleyiciye dönüş · Esc ile kapanır · toplam değişimleri sr-only canlı bölgeyle duyurulur ("Toplam 3.899,70 TL, üye fiyatıyla 1.949,85 TL") · miktar düğmelerinin adı "{ad} adedini azalt/artır".

## 8. Hareket noktaları (→ hareket-tasarimcisi)
Drawer kayması ve karartma · eklenen satırın kısa vurgusu · miktar değişiminde sayı geçişi · toplamların sayı geçişi (reduced'da anlık) · satır kaldırma çökmesi ve geri al · pasif düğmeye basıldığında açıklama vurgusu · boş durum illüstrasyonu girişi · üst thin bandın çizilmesi.
