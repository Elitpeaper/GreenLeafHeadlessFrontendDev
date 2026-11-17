# Wireframe — Kategori / Koleksiyon Listeleme

> Sahip: proje-yoneticisi · Faz 1 · 2026-11-16 · Öncelik P0
> Adresler: `/kategori/{kok}`, `/kategori/{kok}/{alt}`, `/koleksiyon/{anahtar}` (varyant). Arama sonuçları da bu şablonu kullanır (`arama.md`).
> Dayanak: K-029, K-030, K-036, K-038, K-048, K-050, K-052, K-062, K-065 · K-098, K-092 (ÖNERİ) · `BILGI-MIMARISI.md` §4–5.

## Değişiklik günlüğü
| Tarih | Değişiklik | Kaynak |
|---|---|---|
| 2026-11-16 | Kartta PV her üründe (yakında dahil, veri varsa); PV ipucunda "PV nedir?" bağlantısı | K-062, K-098 |
| 2026-11-16 | Temalı ürün kartı işareti; temalı koleksiyon varyantı `premium-tema.md`'ye bağlandı | K-065, K-092 |
| 2026-11-16 | Tanıtım kartı → "Cilt tipine göre" çip şeridi + bulucu bağlantısı; yakında kartta "Ürünü incele" düğmesi (ui-tasarimci K-076, K-081 ile hizalı) | K-069 |
| 2026-11-16 | Hover renk geçişi listeleme sayfalarında **yok** | K-093 |

**Sayfanın tek görevi:** Kullanıcının bu kategoride açacağı ürünü seçmesi.
**Birincil eylem:** Ürün kartına tıklamak (detaya). Kart üstündeki "Sepete ekle" ikincil kısayoldur.

**Bölüm sırası:** 1 Breadcrumb → 2 Kategori başlığı → 3 Alt kategori şeridi (yalnız kökte) → 4 Tanıtım kartı (koşullu) → 5 Araç çubuğu (hızlı çip, filtre, sıralama, sonuç sayısı) → 6 Filtre paneli → 7 Ürün ızgarası → 8 Daha fazla yükle → 9 Kategori alt metni (SEO) → Footer.

---

## 1. Breadcrumb
- **İçerik:** Ana sayfa › Kök › (Alt). Koleksiyonda: Ana sayfa › Koleksiyon adı.
- **Mobil:** Yalnız "‹ {üst seviye}" bağlantısı.
- **CTA:** Yok.

## 2. Kategori başlığı
- **Amaç:** Konum + kapsam bilgisi.
- **İçerik:** H1 kategori adı, ürün sayısı ("312 ürün · 18'i Türkiye'de satışta"), en çok 2 satırlık kısa tanıtım (varsa).
- **Veri:** `title`, `description` (kısa), `productCount`, `trCount`.
- **Durumlar:** `description` yoksa satır yok. `trCount = 0` → "Bu kategorideki ürünler Türkiye'ye yakında" bilgi notu.
- **Mobil:** Tanıtım 2 satırla kırpılır + "Devamı".
- **CTA:** Yok.

## 3. Alt kategori şeridi (yalnız kök sayfada)
- **İçerik:** Alt kategoriler; ikon/küçük görsel + ad + sayı. Alt sayfada gösterilmez (yerine filtre paneli kategori grubu kardeşleri listeler).
- **Veri:** `getCategories(kok).children`.
- **Mobil:** Yatay kaydırmalı çipler.
- **CTA:** Her öğe → `/kategori/{kok}/{alt}`.

## 4. Tanıtım kartı (koşullu)
- **Kural:** Cilt Bakımı, Makyaj ve Setler köklerinde ve alt sayfalarında araç çubuğunun üstünde **"Cilt tipine göre" çip şeridi** (Kuru · Yağlı · Karma · Normal · Hassas — ui-tasarimci `skin-finder.md` §0): çipe basmak listede `cilt-tipi` filtresini uygular (filtre panelindeki aynı grupla senkron); şeridin sonunda "Sana uygun rutini gör →" (`/cilt-tipine-gore`, seçili tip varsa `?tip=` ile). Setler'de: "Setler ne içerir?" açıklaması. Sağlık ve Takviye kökünde: sabit mevzuat notu kartı (icerik-editoru metni; K-095). Diğerlerinde yok.
- **Mobil:** Tek satır, kapatılabilir değil (küçük).

## 5. Araç çubuğu
- **İçerik:** (a) Hızlı çip "Yalnız Türkiye'de satışta (N)" — basılı/basısız durumları; (b) "Filtrele" düğmesi (seçili filtre sayısıyla); (c) Sıralama seçici (Önerilen · Fiyat artan · Fiyat azalan · Yeni gelenler); (d) "N ürün" sayısı; (e) seçili filtre çipleri + "Tümünü temizle".
- **Veri/durum:** Tüm seçimler adres parametresi: `bulunabilirlik=tr|yakinda`, `marka=a,b`, `fiyat=min-max`, `cilt-tipi=…`, `ihtiyac=…`, `kategori=…`, `sirala=onerilen|fiyat-artan|fiyat-azalan|yeni`.
- **Mobil:** "Filtrele" ve "Sırala" yapışkan alt-üst çubukta (kaydırmada header altında sabit). Hızlı çip çubuğun hemen altında.
- **Hareket:** Çip seçiminde ızgara yumuşak yenilenir (kaydırma konumu ızgara başına alınır, zıplama yok).
- **CTA:** Yok (araç).

## 6. Filtre paneli
- **Masaüstü:** Solda sabit sütun (≥ 1024 px), gruplar açılır-kapanır, ilk 2 grup açık. Grup sırası: Kategori · Bulunabilirlik · Marka · Fiyat · Cilt tipi · İhtiyaç (son ikisi yalnız kuralına uyan kategorilerde — `BILGI-MIMARISI.md` §4).
- **Mobil:** Alttan açılan panel (yükseklik ≤ %90), başlık + kapat, gruplar akordeon, altta yapışkan "N ürünü göster" ve "Temizle". Panel içi seçimler "göster"e basılınca uygulanır.
- **Seçenek satırı:** ad + (sonuç sayısı); 0 sonuç verecek seçenek pasif.
- **Fiyat:** İki sayı alanı + (isteğe bağlı) kaydırıcı; yalnız "Fiyat" üzerinden; altında "Fiyat filtresi yalnız Türkiye'de satıştaki ürünleri kapsar".
- **Erişilebilirlik:** Her grup `fieldset` + `legend` mantığında; mobil panel odak tuzağı + Esc.

## 7. Ürün ızgarası
- **Düzen:** Masaüstü 4 sütun (filtre paneli varken 3), tablet 3, mobil 2. Sabit oranlı görsel alanı (kare) → CLS 0.
- **Sıralama "Önerilen":** `availability=tr` önce → `collections` öne çıkanlar → `order` → `title`.
- **Bölücü (yalnız Önerilen sıralama ve karışık sonuçta):** TR ürünleri bitip yakında ürünleri başlarken tam genişlik ince ayraç: "Türkiye'ye yakında — bu ürünler henüz satışta değil".

### Kart (sitenin tek ürün kartı)
| Öğe | Alan | TR ürünü | Yakında ürünü |
|---|---|---|---|
| Görsel | `images[0]` (`alt`) | Var | Var, rozet görselin üst köşesinde |
| Rozet | `availability`, `badges` | "Yeni" vb. (en çok 1) | "Türkiye'ye yakında" (öncelikli, tek rozet) |
| Favori | — | Kalp ikonu, görsel köşesi | Var |
| Marka | `brand.title` | Ayrı satır, küçük | Var |
| Ad | `title` | En çok 2 satır, taşan "…" | Var |
| Hacim | `volume` | "250 ml" (varsa) | Varsa |
| Kimin için | `skinType`/`concerns` (ilk 1–2) | Yalnız cilt bakımı/makyajda, tek satır | Varsa |
| Fiyat | `price` | "Fiyat ₺X" (etiketli) | **Yok** |
| Üye fiyatı | `memberPrice` | Yeşil rozet "Üye fiyatı ₺Y" | **Yok** |
| PV | `pv` | "PV 0,5" + ipucu (ⓘ) — `pv.md` §A1 | **"PV 0,5" + ipucu**; ipucunda ek satır "Türkiye'de satışa çıktığında değişebilir." `pv` boşsa öğe yok |
| Tema işareti | `theme` | Temalı üründe ince köşe süslemesi/çerçeve + görsel arkası tema yüzeyi (kart yüksekliği değişmez) — `premium-tema.md` §A3 | Aynı |
| Eylem | — | "Sepete ekle" düğmesi | "Ürünü incele" ikincil düğmesi (detaya gider; ui-tasarimci K-076) — sepete ekleme yok |

- **Kart yerleşim kuralı:** TR ve yakında kartlar aynı ızgarada **aynı yükseklikte** durur; yakında kartta fiyat bloğunun yeri rozet/durum + PV ile dolar (ızgarada zıplama yok). Görsel düzen: `docs/tasarim/bilesenler/product-card.md`.

- Kartın tamamı detaya gider; "Sepete ekle" ve favori ayrı tıklama alanıdır (tıklama yayılmaz). Tıklama alanları ≥ 44×44 px.
- Fiyat biçimi (K-059 ÖNERİ): Türkçe sayı biçimi, sembol önde: **"₺1.299,90"**; kuruş 00 ise "₺1.300". Sitenin her yerinde tek biçimlendirici.
- Üstü çizgi, yüzde, "tasarruf" yok (K-036).
- **Hareket:** Masaüstünde üzerine gelince görsel hafif yakınlaşır (≤ 1,04) ve gölge; dokunmatikte yok. Listeleme sayfalarında hover renk geçişi **yoktur** (yalnız ana sayfa ve mega menü bölgeleri — K-093). "Sepete ekle": düğme kısa "Eklendi ✓" hâline geçer (1,2 sn), drawer açılır.
- **Durumlar:** Görsel yüklenemezse marka zeminli yer tutucu + ürün adı. `stock=out_of_stock` (gelecekte) → "Tükendi", düğme pasif (K-025; şimdilik tetiklenmez).

## 8. Daha fazla yükle
- 24'lük parti; altta "312 ürünün 48'i gösteriliyor" + düğme. Bitince düğme kaybolur.
- Yükleniyor: düğmede gösterge, ızgara sonuna iskelet kartlar.
- Detaydan geri dönüşte konum ve yüklenen parti sayısı korunur.
- **CTA:** "Daha fazla ürün göster".

## 9. Kategori alt metni (SEO)
- Ürünlerin altında 80–150 kelimelik açıklama (icerik-editoru/seo-uzmani); yoksa bölüm yok. Rusça metin yok.

---

## Boş ve hata durumları
| Durum | Görünüm |
|---|---|
| Filtre sonucu 0 | İllüstrasyon yok, kısa metin "Bu seçimlerle ürün bulunamadı", seçili çipler, "Filtreleri temizle" (tek CTA), son filtre kaldırılırsa kaç ürün çıkacağı önerisi |
| Kategori adresi geçersiz | 404 şablonu |
| Kategori ürünsüz (yayında hiç ürün yok) | Menüde zaten gizli; doğrudan adresle gelinirse 404 |
| Veri yüklenemedi | Hata kutusu + "Tekrar dene"; filtre paneli pasif |

## Varyant: Koleksiyon (`/koleksiyon/{anahtar}`)
- Breadcrumb "Ana sayfa › {Koleksiyon}", başlık + kısa açıklama (yapılandırmadan), alt kategori şeridi yerine **kök kategori çipleri** (koleksiyon içinde filtre), aynı araç çubuğu ve ızgara.
- `turkiyede-satista` koleksiyonunda hızlı çip ve bulunabilirlik filtresi gösterilmez.
- Boş koleksiyon → 404 değil; menü/vitrin bağlantıları zaten gizli, doğrudan adrese gelen için "Bu koleksiyon şu an boş" + "Türkiye'de satışta olanları gör".
- **Temalı koleksiyon** (koleksiyon kaydında `theme` dolu): başlık alanı yerine tam genişlik temalı sahne, kartlarda tema işareti, filtreler yalnız ≥ 12 üründe. Tam tarif `premium-tema.md` §A5.

## Analitik
`plp_view` (kategori), `filter_apply` (grup adı), `sort_change`, `load_more`, `add_to_cart` (kaynak: kart), `quick_chip_tr`, `pv_tooltip_open` (kaynak: kart), `theme_collection_view` (temalı koleksiyonda).
