# Wireframe — Ürün Detay (`/urun/{slug}`)

> Sahip: proje-yoneticisi · Faz 1 · 2026-11-16 · Öncelik P0
> Dayanak: K-023, K-024, K-030, K-036, K-039, K-044, K-045, K-048, K-052, K-058 · araştırma bulgu #17 (PDP sırası), #18 (mobil yapışkan CTA).
> İki durum tek şablon: **TR** (`availability=tr`) ve **Yakında** (`availability=yakinda`). Fark her bölümde belirtilmiştir. Üçüncü boyut: **temalı** (`theme` dolu) — her iki durumla birleşebilir (K-092).

## Değişiklik günlüğü
| Tarih | Değişiklik | Kaynak |
|---|---|---|
| 2026-11-16 | Yakında üründe PV görünür (ipuçlu, "değişebilir" notu); PV ipucundan `/pv-nedir` | K-062, K-098, K-086 |
| 2026-11-16 | "Ödeme yakında açılacak" bilgi satırı yeni metne çevrildi (ödeme sayfası yok) | K-068, K-088 |
| 2026-11-16 | Temalı ürün detayı varyantı | K-065, K-092 |
| 2026-11-16 | Cilt testi köprüsü → bulucu köprüsü | K-069 |
| 2026-11-16 | Bant/merhem ürünlerinde sabit uyarı notu | K-067, K-095 |

**Sayfanın tek görevi:** "Bu ürünü bu fiyata alır mıyım?" kararını verdirmek.
**Birincil CTA:** TR → "Sepete ekle". Yakında → "Benzer ürünleri gör".

**Bölüm sırası:** 1 Breadcrumb → 2 Üst blok (galeri + satın alma kutusu) → 3 Rozet satırı (sertifika) → 4 Öne çıkan faydalar → 5 Bilgi akordeonları (Açıklama · Kullanım · İçerik · Ürün bilgileri) → 6 Birlikte kullan / benzerleri → 7 Cilt testi köprüsü (koşullu) → 8 Değerlendirmeler (gizli) → 9 Mobil yapışkan çubuk.

---

## 1. Breadcrumb
Ana sayfa › Kök › Alt › (ürün adı yok — H1 zaten). Mobilde "‹ Alt kategori".

## 2. Üst blok
### 2a. Galeri
- **Veri:** `images[]` (`src, width, height, alt`). Bugün ürün başına **1 görsel** (ENVANTER §4) → tek görsel öncelikli düzen; ≥ 2 görselde küçük resim şeridi (masaüstü dikey, mobil nokta göstergeli kaydırma).
- **Kural:** Görsel 800 px'ten büyük gösterilmez (bulanıklık). Yakınlaştırma: tıklanınca tam ekran görüntüleyici yalnız ≥ 2 görselde veya kaynak ≥ 1200 px ise; aksi hâlde yok.
- **Yakında:** Görselin köşesinde "Türkiye'ye yakında" rozeti.
- **Durum:** Görsel yok → yayına girmez (K-024). Yüklenemezse yer tutucu.
- **Hareket:** Görsel geçişinde çapraz solma (≤ 200 ms).

### 2b. Satın alma kutusu (masaüstünde galeri sağında, kaydırırken yapışkan)
| Öğe | Alan | TR | Yakında |
|---|---|---|---|
| Marka | `brand.title` (→ `/arama?marka=`) | Var | Var |
| Ad (H1) | `title` | Var | Var |
| Hacim / adet | `volume`, `packCount` | "250 ml" / "30 adet" | Varsa |
| Kimin için | `skinType`, `concerns` | Çipler (cilt bakımı) | Varsa |
| Fiyat | `price` | "Fiyat ₺X" | — |
| Üye fiyatı | `memberPrice` | Yeşil rozet "Üye fiyatı ₺Y" (aynı satırda veya hemen altında, eşit okunurlukta) | — |
| PV | `pv` | "PV 0,5" + ipucu (`pv.md` §A1; "PV nedir? →" bağlantısı) | **"PV 0,5" + ipucu**, ek satır "Türkiye'de satışa çıktığında değişebilir." `pv` boşsa satır yok |
| Üyelik satırı | — | "Üyelere özel fiyattan almak için üye ol →" (`/uye-ol`, metin bağlantısı, ikincil) | — |
| Durum kutusu | — | — | "Bu ürün Türkiye'de henüz satışta değil. Satışa çıktığında bu sayfada fiyatıyla birlikte görünecek." |
| Miktar | — | − 1 + (1–10) | — |
| Birincil CTA | — | **"Sepete ekle"** (tam genişlik) | **"Benzer ürünleri gör"** → §6 rayına kaydırır |
| İkincil | — | Favori (ikon+metin) | Favori |
| Bilgi satırları | — | Kod: `code` · küçük not "Online alışveriş çok yakında; sepetini şimdiden hazırlayabilirsin." | Kod: `code` |

- KDV: "Fiyatlara KDV dahildir" küçük not (K-013).
- Üstü çizgi, yüzde, tasarruf yok.
- **Hareket:** "Sepete ekle" → düğme "Eklendi ✓" (1,2 sn) + drawer açılır + sayaç pop. Miktar değişiminde sayı kısa dikey kayma.
- **Mobil:** Galeri tam genişlik üstte; satın alma kutusu altta; CTA ayrıca §9 yapışkan çubukta.

## 3. Rozet satırı (sertifika)
- **Amaç:** Kanıtlı güven (MEMORY §7).
- **İçerik:** ISO 22716 · GMP · Helal rozetleri; altında "Üretici belgeleri" küçük etiketi. Rozet tıklanınca PDF yeni sekmede.
- **Veri kuralı (K-058):** Ürünün `certifications[]` alanı doluysa yalnız onlar ("Bu ürün için" dili); boşsa **üretici düzeyindeki** belgeler "Üretici sertifikaları" başlığıyla (ürün bazlı iddia gibi okunmaz). Helal rozeti yalnız ürün `certifications` içinde `helal` varsa gösterilir (genelleme yapılmaz).
- **Durum:** Belge yoksa satır yok.
- **CTA:** "Sertifikalar hakkında" → `/sertifikalar` (metin bağlantısı).

## 4. Öne çıkan faydalar
- **İçerik:** 3–5 madde, ikonla. Kozmetik dil, iddia denetimli.
- **Veri:** `features[]` (TR, EL). Yakında üründe çoğunlukla yok.
- **Durum:** Boşsa bölüm yok (yakında üründe kısa açıklama §5'te kalır).
- **Mobil:** Tek sütun liste.

## 5. Bilgi akordeonları
| Akordeon | Alan | Varsayılan | Boşsa |
|---|---|---|---|
| Açıklama | `content` (TR uzun) yoksa `description` | Açık | Yakında: `description` (kısa, K-039); o da yoksa ürün yayına girmez |
| Kullanım | `usage` | Kapalı | Gizli |
| İçerik (bileşenler) | `ingredients` (gelecek alan) | Kapalı | Gizli |
| Ürün bilgileri | `code`, `barcode`, `volume`, `brand`, kategori, (setlerde) `setItems` listesi — set içeriği ürün bağlantılı | Kapalı | Barkod yoksa satır yok |

- Akordeon başlıkları düğme; `aria-expanded`; açılış yüksekliği yumuşak (≤ 250 ms, azaltılmışta anlık).
- Setlerde "Set içeriği" ayrı akordeon olarak en üstte ve açık.
- **Mevzuat notu:** Sağlık ve Takviye ürünlerinde Açıklama altında sabit not: "Gıda takviyesi ilaç değildir; hastalıkların önlenmesi veya tedavi edilmesi amacıyla kullanılmaz." (icerik-editoru/uzman metni). Mevzuat hassas alt kategorilerde (`bant-ve-yamalar`, `diger-saglik-urunleri`) ayrı sabit not (taslak: "Bu ürün ilaç değildir. Sağlık sorunlarınız için bir sağlık uzmanına danışın.") hem satın alma kutusunun altında hem Açıklama'da (K-095; nihai metin icerik-editoru + uzman). Bu ürünlerde "Öne çıkan faydalar" maddeleri yalnız kullanım hissi/biçimi anlatır.

## 6. Ray — "Birlikte kullan" (TR) / "Türkiye'de satışta benzerleri" (Yakında)
- **TR ürünü:** Başlık "Birlikte kullan" (cilt bakımında rutin adımı farklı ürünler) veya "Benzer ürünler"; kural K-030: elle eşleme (`related[]`) → aynı alt kategori → aynı marka; **TR ürünleri önce**; en çok 4 (masaüstü tek satır).
- **Yakında ürünü:** Başlık "Türkiye'de satışta benzerleri"; yalnız `availability=tr`; aynı alt → aynı kök; en çok 8 (ray). Boşsa başlık "Bu kategoride Türkiye'de satışta olan ürün henüz yok" + "Türkiye'de satışta olanları gör" bağlantısı.
- Kart: standart kart.
- **CTA:** Kartlar.

## 7. Bulucu köprüsü (yalnız Cilt Bakımı kökü)
- Ürünün `skinType` etiketi varsa tek satır: "{Kuru, Karma} ciltler için konumlandırılmış. Cildine uygun diğer ürünleri bul →" → `/cilt-tipine-gore?tip={ilk etiket}`; etiket yoksa "Cildine uygun ürünleri bul →" → `/cilt-tipine-gore`.

## 7b. Temalı ürün (koşullu, `theme` dolu)
- Üst blok zemini, galeri arkası, başlık vurgusu, faydalar ikonları ve (setlerde) "Set içeriği" çerçevesi temaya göre giydirilir; satın alma kutusunun düzeni, fiyat/PV/CTA sırası ve metinleri değişmez. Mobil yapışkan çubuk temasızdır. Ayrıntı `premium-tema.md` §A3–A6.
- Temalı ürün bir temalı koleksiyonun üyesiyse breadcrumb altında küçük bağlantı: "{Koleksiyon} koleksiyonundan →".
- **Hareket niyeti:** sayfa açılışında tema süslemelerinin bir kez çizilerek belirmesi (≤ 800 ms); LCP görseli beklemez.

## 8. Değerlendirmeler (gizli)
- Alan tasarımda var, yayında render edilmez (K-018). Uydurma puan/yorum hiçbir koşulda yok. Yapılandırma bayrağı `reviews.enabled=false`.

## 9. Mobil yapışkan çubuk (< 1024 px)
- Satın alma kutusundaki birincil CTA ekrandan çıkınca alttan belirir; tekrar görününce gizlenir.
- **TR:** Küçük görsel + "Üye fiyatı ₺Y · Fiyat ₺X" (iki etiketli, kısa) + "Sepete ekle".
- **Yakında:** "Türkiye'ye yakında" + PV (yer varsa) + "Benzerlerini gör".
- iOS güvenli alan boşluğu; içerik çubuğun altında kalmaz (sayfa altına eşit boşluk).
- **Hareket:** Alttan kayarak giriş (≤ 200 ms), azaltılmışta anlık.

---

## Sayfa düzeyi
- **SEO:** Başlık "{title} | {brand} | {SATICI_ADI}"; açıklama `description`'dan. Yapılandırılmış veri seo-uzmani'nde; yakında üründe ve ödeme kapalıyken satın alınabilir işareti yok (K-022).
- **Performans:** LCP = ürün görseli (öncelikli). Ray ve akordeon içerikleri sunucuda render edilir (akordeon kapalıyken de metin DOM'da, SEO için).
- **Durumlar:** Slug bulunamazsa 404 (ürün kategorisi tahmin edilebiliyorsa 404'te o kategoriden 4 ürün). Yayından kalkmış ürün → 404 (backend fazında 410/yönlendirme seo-uzmani).
- **Analitik:** `pdp_view` (availability, theme), `add_to_cart` (kaynak: pdp / sticky), `similar_click`, `membership_line_click`, `certificate_pdf_open`, `finder_bridge_click`, `pv_tooltip_open` (kaynak: pdp).
- **Hover renk geçişi:** Bu sayfada yok (K-093).
