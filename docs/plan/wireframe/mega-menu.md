# Wireframe — Görselli Mega Menü ve Mobil Çekmece (global)

> Sahip: proje-yoneticisi · 2026-11-16 · Öncelik P0 (global bileşen, Kapı 2'de önizlemede onaylanır)
> Dayanak: K-064 (çok detaylı, görselli mega menü — ONAYLI), K-066 (hover renk geçişi), K-050 (12 kök, 2 seviye), K-091, K-093, K-095 (ÖNERİ) · `BILGI-MIMARISI.md` §3.2–3.3.
> Renk/font kararı yok; vitrinler koleksiyon anahtarıyla tarif edilir.

## Değişiklik günlüğü
| Tarih | Değişiklik | Kaynak |
|---|---|---|
| 2026-11-16 | İlk sürüm (K-057'nin yerini alır) | K-064, K-091 |
| 2026-11-16 | ui-tasarimci `bilesenler/mega-menu.md` (K-077) ile hizalandı: sağ sütun 1 öne çıkan + 1 tanıtım; en çok 8 görselli karo + metin listesi; görseller resmî packshot kompozisyonu (AI değil); mobil seviye 1 görselli satırlar; veri adları `megaFeatured`, `megaMenu.campaigns` | ui-tasarimci |

> Görsel düzen ve ölçüler: `docs/tasarim/bilesenler/mega-menu.md`. Bu belge davranış, veri ve durum kaynağıdır.

**Bileşenin tek görevi:** Geniş kataloğu (≈ 1700 ürün, 12 kök) tek bakışta "zengin ama düzenli" göstermek ve kullanıcıyı 2 tıklamada doğru alt kategoriye veya öne çıkan ürüne götürmek.
**Birincil eylem:** Alt kategori karosuna tıklamak. Öne çıkan kartlar ve tanıtım alanı ikincil.
**Kaçınılacaklar karşılığı (MEMORY §7):** resmî mağazadaki ikonlu mega menü alınır ama görselli ve sade hiyerarşili; "Partner ol" vurgusu menüde değil header'daki tek "Üye ol" düğmesinde; tanıtım alanında indirim/yüzde yok.

---

## A. Masaüstü (≥ 1024 px)

### A0. Tetikleyici
- Header'daki "Kategoriler" düğmesi (ikon + metin; açıkken ok döner — mikro animasyon).
- Açılış: tıklama, Enter/Space; ince işaretçili cihazda düğme üzerinde ~150 ms niyet gecikmeli hover. Kapanış: Esc, dışarı tıklama, odak dışarı çıkması, fare panelden ~300 ms uzak kalması (hover ile açıldıysa).
- `aria-expanded`, `aria-controls`; panel açılınca odak sol listedeki ilk köke.
- Panel header'ın hemen altında, tam genişlik; sayfa kararır (hafif). Yüksekliği içerikle değil sabit üst sınırla (≤ %80 görünür alan) belirlenir; taşarsa yalnız orta bölge kayar.

### A1. Bölge 1 — Kök listesi (sol, ~%20)
- **İçerik:** 12 kök (sıra `BILGI-MIMARISI.md` §2): ikon + ad + küçük "TR'de N" sayacı (N > 0 ise).
- **Etkileşim:** Üzerine gelme (niyet gecikmesi ~80 ms, çapraz fare hareketinde yanlış köke atlamayı önleyen "üçgen koridor" davranışı) veya ↑/↓ ile kök değişir; seçili kök belirgin (renk dışında da: kalın + gösterge çizgisi).
- **Veri:** `getCategories()` → `slug, title, icon, trCount, productCount, order`.
- **Boş:** Ürünsüz kök listede yok.

### A2. Bölge 2 — Alt kategori karoları (orta, ~%45)
- **İçerik:** Seçili kökün alt kategorileri: ürün sayısına göre ilk **en çok 8'i görselli karo** (görsel + ad + "N ürün"), kalanlar altında 2 sütunlu metin listesi (ad + sayı). Üstte kök başlığı + "Tüm {Kök} ürünleri (N) →". Yalnız yakında ürünü olan alt kategori sönük gösterilmez, sayının yanında "yakında" etiketi.
- **Görsel kaynağı (öncelik sırası):** (1) `category.image` — resmî packshot'lardan kategori kompozisyonu (ui-tasarimci K-077; AI üretimi kullanılmaz, ürün görünümü değiştirilmez), (2) alt kategorinin bir TR ürününün packshot'ı (otomatik), (3) duotone ikonlu karo.
- **Hareket:** Kök değişiminde karolar hafif çapraz solma (≤ 180 ms, kademesiz — hız algısı); karoda hover: görsel ≤ 1,04 yakınlaşma.
- **Veri:** `getCategories(kok).children[]` → `slug, title, image, productCount, trCount`.
- **Boş:** Görselsiz alt kategori ikonlu karo; tümü görselsizse liste görünümüne düşer (ad + sayı, 3 sütun).

### A3. Bölge 3 — Öne çıkan ürün/set kartı (sağ sütun üst)
- **İçerik:** Seçili köke ait **1** dikey ürün/set kartı (sağ sütunda tanıtım karosuyla birlikte en çok 2 karo): görsel, marka, ad (1 satır), TR'de "Fiyat ₺X · Üye fiyatı ₺Y" (iki etiketli, küçük) + PV; yakında ise rozet + PV. Kartta "Sepete ekle" **yok** (menü gezinme bağlamı; tek eylem detaya gitmek). Başlık: "Öne çıkanlar".
- **Veri:** `megaFeatured[kok]` = ürün kodu (yapılandırma; EL); boşsa otomatik: kökteki `collections: one-cikanlar` ∩ TR ilk ürün, o da yoksa kökün ilk TR ürünü; o da yoksa ilk yayına hazır yakında ürün (rozet + PV); hiçbiri yoksa bölge kapanır. Temalı (`theme` dolu) ürün/set varsa kart ince tema işareti taşır (K-092).
- **Kural:** Mevzuat hassas alt kategorilerin (`saglik-ve-takviye/bant-ve-yamalar`, `saglik-ve-takviye/diger-saglik-urunleri`) ürünleri bu bölgede ve tanıtım alanında gösterilmez (K-095).
- **Hover renk geçişi (K-093):** Karta gelince site vurgu değişkenleri ürün paletine döner (header bandı, menü panelinin üst çizgisi, aktif kök göstergesi). Menü kapanınca ana tema.

### A4. Bölge 4 — Tanıtım (kampanya) alanı (sağ alt)
- **İçerik:** Tek, görselli kart: görsel + kısa başlık (≤ 6 kelime) + tek bağlantı. İndirim, yüzde, geri sayım **yok** (kampanya = editoryal tanıtım).
- **Varsayılan eşleme (yapılandırmadan, kök bazlı):** Cilt Bakımı ve Makyaj → "Cildine uygun ürünleri bul" (`/cilt-tipine-gore`); Setler → temalı koleksiyon (varsa) ; diğer kökler → `promo.default` (ör. "PV nedir?" veya "Türkiye'de satışta olanlar").
- **Veri:** `megaMenu.campaigns[kok]` = `{image, alt, eyebrow, title, href, theme?}`; yoksa `megaMenu.campaigns.default`; o da yoksa bölge kapanır. Metin görselin üstüne yazılmaz.
- **Hover renk geçişi:** Promo bir temalı koleksiyonu gösteriyorsa ve `theme.palette` varsa K-093 bölgesidir.

### A5. Klavye ve erişilebilirlik
- Sol liste: ↑/↓ kök, → bölge 2'nin ilk karosuna, ← geri. Bölge 2'de ok tuşlarıyla ızgara gezintisi; Tab bölge 3 ve 4'e geçer. Esc kapatır, odak "Kategoriler" düğmesine döner.
- Görsellerin `alt` metni dekoratifse boş (ad zaten metin olarak var); promo görselinde anlamlı `alt`.
- Ekran okuyucu: panel `region` + başlık "Kategoriler"; kök değişimi duyurulmaz (fazla gürültü), bölge 2 başlığı odakla okunur.

### A6. Performans
- Panelin HTML'i sunucuda render edilir (SEO için bağlantılar DOM'da), **görseller panel ilk kez açılırken** (veya "Kategoriler" üzerinde hover niyetinde) yüklenir; ilk sayfa yüklemesine görsel ağırlığı eklemez.
- Karo görselleri ≤ 160 px görüntüleme boyutu, modern biçim, tek görsel ≤ 15 KB hedefi; promo görseli ≤ 60 KB.
- Kök değişimi ≤ 100 ms içinde görsel tepki (INP).

---

## B. Mobil çekmece (< 1024 px)

### B1. Seviye 1
- Üst: kapat + "Menü"; ardından vurgulu satır "Cildine uygun ürünleri bul".
- **Kök satırları:** 12 satır, her biri 48 px yuvarlak küçük görsel (kök kompozisyonu, yoksa duotone ikon) + ad + "N ürün" + ›. Satıra dokununca seviye 2.
- Hızlı bağlantılar (metin satırları): Türkiye'de satışta · Setler · PV nedir? · Favoriler · Sertifikalar · Hakkımızda ve iletişim.
- (Seviye 1'de tanıtım kartı yok; seviye 2'de kökün tanıtım karosu, varsa.)
- Altta yapışkan değil, akışta: tam genişlik "Üye ol" + "Greenleaf üye girişi" (dış, yeni sekme).

### B2. Seviye 2
- Sağdan kayan panel: "‹ Geri" + kök adı; geniş **kök kapak görseli**; "Tüm {Kök} (N)" satırı; alt kategoriler **küçük görselli satırlar** (görsel 48 px + ad + sayı); en altta o kökün **öne çıkan kartı** (Bölge 3, sepete ekle yok) ve varsa tanıtım karosu.
- Geri: panel sola kayar, odak seçilen kök karosuna döner.

### B3. Davranış
- Odak tuzağı, Esc, arka plana dokunma, kaydırma kilidi. Görseller çekmece açılınca tembel yüklenir.
- Hareket: çekmece soldan (~280 ms), seviye geçişleri yatay kayma (~220 ms); reduced-motion'da anlık.
- Hover renk geçişi **yok** (dokunmatik).

---

## Durumlar
| Durum | Görünüm |
|---|---|
| Kategori verisi yüklenemedi | Panelde yalnız kök adları (statik yedek listeden) + "Tüm ürünler" bağlantısı; görsel bölgeleri kapalı |
| Kökte TR ürünü yok | "TR'de N" sayacı yok; öne çıkanlar yakında ürünlerinden (rozet + PV) |
| Görsel yüklenemedi | Karo ikonlu nötr hâle düşer, düzen kaymaz (sabit oranlı alan) |
| Çok uzun alt kategori adı | 2 satır, taşan "…" |

## Analitik
`megamenu_open` (tetikleyici: tıklama/hover/klavye), `megamenu_subcategory_click`, `megamenu_featured_click`, `megamenu_promo_click`.

## Kabul kriterleri
`KABUL-KRITERLERI.md` §1 (KK-1-01…KK-1-12).
