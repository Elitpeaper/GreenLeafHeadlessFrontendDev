# Bilgi Mimarisi

> Sahip: proje-yoneticisi · Son güncelleme 2026-11-16 · Durum: Kapı 1 geçti (K-050 ONAYLI; gezinme K-064/K-091 ile güncellendi)

## Değişiklik günlüğü
| Tarih | Değişiklik | Kaynak |
|---|---|---|
| 2026-11-16 | İlke 6: tıbbi bant/merhem alt kümeleri artık yayında; `bant-ve-yamalar` + `diger-saglik-urunleri` alt kategorileri (veri-muhendisi v2 slug'ları) | K-067, K-095 (K-053 İPTAL) |
| 2026-11-16 | §3.2 mega menü görselli yapıya geçti (ayrıntı `wireframe/mega-menu.md`); §3.3 mobil çekmece görselli | K-064, K-091 (K-057 İPTAL) |
| 2026-11-16 | Header/footer bağlantıları: "Cilt testi" → "Cildine uygun ürünleri bul", "PV nedir" eklendi | K-069, K-086 |
| 2026-11-16 | Kategori verisine görsel ve öne çıkanlar alanları; koleksiyona `theme` | K-091, K-092 |
| 2026-11-16 | Header ve mega menü hover renk geçişi bölgeleri | K-066, K-093 |
> Dayanak: K-038 (geniş katalog, mega menü), `docs/veri/green-leaf-shop-haritasi.md` §3 (163 düğüm / 1676 ürün), ENVANTER (TR 38 + 3 set), K-026 (bu belge ile **2 seviyeye** güncellenir → K-050).
> Sayılar RU mağaza sayımıdır (bir ürün birden çok RU kategorisinde olabilir); nihai sayı veri hattında hesaplanır.

## 1. İlkeler

1. **Tüketici dili, 2 seviye.** Kök kategori → alt kategori. RU'daki 3. seviye ya alt kategoriye birleşir ya da filtre (ör. "ürün tipi") olur. Panel/RU kategorisi yalnız eşleme kaynağıdır (`sourceCategory`).
2. **Her ürünün tek birincil yeri vardır** (kök + alt). Breadcrumb, kanonik URL ve mega menü sayısı bunu kullanır. İkincil görünürlük koleksiyonlarla sağlanır (ör. bir çocuk diş macunu yalnız "Anne ve Çocuk"ta durur; "Ağız ve Diş Bakımı"nda koleksiyon bağlantısıyla anılır).
3. **Boş düğüm görünmez.** Yayında 0 ürünü olan kök/alt kategori menüde, şeritte ve filtrede gizlenir. 3'ten az ürünü olan RU alt düğümleri aşağıdaki tabloda bir kardeşe birleştirildi.
4. **Marka = filtre** (ayrı marka sayfası yok; K-026 korunur).
5. **Bulunabilirlik her listede görünür bir boyuttur:** `availability` = `tr` (Türkiye'de satışta) / `yakinda` (Türkiye'ye yakında). Listeler varsayılan olarak `tr` ürünleri önce gösterir (K-052).
6. **Mevzuat hassas alt kümeler** (K-067, K-095 — K-053 İPTAL): RU "Лечебные пластыри", "Мази, спреи и др." ve erkek "Для здоровья" **yayınlanır**; "Sağlık ve Takviye › Bantlar ve Yamalar" (`bant-ve-yamalar`) ve "Diğer Sağlık Ürünleri" (`diger-saglik-urunleri`) alt kategorilerine eşlenir (slug'lar veri-muhendisi şema v2 ile aynı). Bu belgede ikisine birlikte **"mevzuat hassas alt kategoriler"** denir. "БАДы" ve "Витамины" de yayında. Hepsinde iddia denetimi zorunlu, ürün sayfasında sabit uyarı notu; bu alt kategori ana sayfa vitrinlerinde, mega menü öne çıkanlarında ve tanıtım alanında **öne çıkarılmaz** (menüde normal alt kategori olarak durur).

## 2. Kategori ağacı (12 kök)

Sütunlar: Türkçe ad · slug · RU kaynak düğüm(ler)i · yaklaşık ürün sayısı (RU) · bugün TR'de satışta olan örnek kodlar.

### 2.1 Cilt Bakımı — `cilt-bakimi` (≈ 250)
| Alt kategori | slug | RU kaynak | ≈ | TR örnek |
|---|---|---|---|---|
| Yüz Temizleyiciler | `yuz-temizleyiciler` | Лицо › Средство для умывания, Снятие макияжа, Скраб для лица | 37 | SBJ064 |
| Tonik ve Losyonlar | `tonik-ve-losyonlar` | Лицо › Лосьон | 28 | ASB046 |
| Serumlar ve Yüz Yağları | `serumlar` | Лицо › Сыворотка, Масло для лица | 41 | CBE034 |
| Nemlendiriciler ve Kremler | `nemlendiriciler` | Лицо › Крема; Лицо › Основа под макияж | 46 | FPA151, DAB089 (needsReview) |
| Yüz Maskeleri | `yuz-maskeleri` | Лицо › Маска косметическая | 22 | SBC053, SAA069 |
| Göz Çevresi Bakımı | `goz-cevresi` | Глаза (kremler, patch, ısıtıcı maske) | 19 | — |
| Dudak Bakımı | `dudak-bakimi` | Лицо › Бальзам для губ | 10 | — |
| Güneş Koruma | `gunes-koruma` | Защита от солнца | 8 | — |
| Erkek Cilt Bakımı | `erkek-cilt-bakimi` | Товары для мужчин › Уход | 9 | — |

### 2.2 Makyaj — `makyaj` (≈ 86)
| Alt kategori | slug | RU kaynak | ≈ |
|---|---|---|---|
| Yüz Makyajı | `yuz-makyaji` | Лицо (Консилер, Основа, Пудра, Тональное) | 31 |
| Göz Makyajı | `goz-makyaji` | Глаза (Подводка, Тени, Ресницы) | 17 |
| Kaş | `kas` | Брови | 15 |
| Dudak Makyajı | `dudak-makyaji` | Губы | 23 |
| Makyaj Aksesuarları | `makyaj-aksesuarlari` | Аксессуары для макияжа | 9 |

### 2.3 Saç Bakımı — `sac-bakimi` (≈ 94)
| Alt kategori | slug | RU kaynak | ≈ | TR örnek |
|---|---|---|---|---|
| Şampuanlar | `sampuanlar` | Волосы › Шампунь | 51 | CAA038, CAA039 |
| Saç Kremleri | `sac-kremleri` | Волосы › Кондиционер | 13 | CAB040 |
| Saç Maskesi ve Bakım Yağları | `sac-maskesi-ve-yaglari` | Волосы › Маска, Масло, Лосьон | 12 | — |
| Saç Boyaları | `sac-boyalari` | Волосы › Краска для волос | 12 | — |
| Şekillendiriciler | `sekillendiriciler` | Волосы › Для укладки | 3 | — |

### 2.4 Vücut Bakımı — `vucut-bakimi` (≈ 150)
| Alt kategori | slug | RU kaynak | ≈ | TR örnek |
|---|---|---|---|---|
| Duş Jelleri | `dus-jelleri` | Личная › Гели для душа; Тело › Гель | 39 | CBA052, DAA109 |
| Sıvı Sabunlar | `sivi-sabunlar` | Личная › Жидкое мыло | 26 | DAA108, ASB047 |
| Katı Sabunlar | `kati-sabunlar` | Личная › Твердое мыло | 10 | CBB017 |
| Vücut Kremi ve Losyonları | `vucut-kremleri` | Тело › Крем для тела, Спрей, Скраб | 20 | ASB044, ASB045, DAB087 |
| El Bakımı | `el-bakimi` | Руки | 8 | CBF014, CBF015 |
| Ayak Bakımı | `ayak-bakimi` | Ноги | 4 | — |
| Tıraş ve Tüy Alma | `tiras-ve-tuy-alma` | Депиляция; Женская › Бритвы; Мужчины › Бритвы, Для бритья | 9 | — |
| Deodorantlar ve Parfümler | `deodorant-parfum` | Дезодоранты; Парфюмерия | 15 | — |
| Banyo Aksesuarları | `banyo-aksesuarlari` | Бомбочки, Мочалки, Инструменты | 13 | — |

### 2.5 Ağız ve Diş Bakımı — `agiz-ve-dis-bakimi` (≈ 96)
| Alt kategori | slug | RU kaynak | ≈ | TR örnek |
|---|---|---|---|---|
| Diş Macunları | `dis-macunlari` | Зубные пасты | 41 | DAA062, CCA016 |
| Diş Fırçaları | `dis-fircalari` | Зубные щетки | 24 | CCC001, CCC029 |
| Diş İpi ve Ağız Bakımı | `dis-ipi-ve-agiz-bakimi` | Зубные нити, Ополаскиватели, Спреи, Дополнительный уход | 15 | — |

### 2.6 Hijyen ve Kâğıt Ürünleri — `hijyen-ve-kagit` (≈ 110)
| Alt kategori | slug | RU kaynak | ≈ | TR örnek |
|---|---|---|---|---|
| Kadın Hijyeni | `kadin-hijyeni` | Женская › Прокладки, Растворы | 59 | — |
| Kâğıt Mendil ve Havlular | `kagit-mendil` | Салфетки, полотенца, платочки | 22 | CEA069, KLA128 |
| Islak Mendiller | `islak-mendil` | Влажные салфетки | 4 → `kagit-mendil` ile birleşir | — |
| Tuvalet Kâğıdı | `tuvalet-kagidi` | Туалетная бумага | 10 | — |
| Pamuk ve Kulak Çubuğu | `pamuk` | Ватные диски и палочки | 4 | — |

Not: "Islak Mendiller" ürünleri `kagit-mendil` altına birleşir; alt kategori adı "Kâğıt ve Islak Mendiller" olur.

### 2.7 Ev ve Temizlik — `ev-ve-temizlik` (≈ 200)
| Alt kategori | slug | RU kaynak | ≈ | TR örnek |
|---|---|---|---|---|
| Çamaşır Deterjanları | `camasir-deterjanlari` | Стирка › Жидкое средство, Стиральный порошок | 47 | ASA017, ASF053, ASF054, ASF055, LGI019 |
| Yumuşatıcı ve Çamaşır Yardımcıları | `camasir-yardimcilari` | Кондиционер, Листы, Для стиральной машины, Мыло для стирки | 23 | ASF066 |
| Bulaşık Deterjanları | `bulasik` | Средство для мытья посуды | 15 | ASA086 |
| Mutfak ve Yüzey Temizleyiciler | `mutfak-temizleyiciler` | Чистящее средство для кухни; Средства для мытья полов; Туалет | 24 | DAC056 |
| Kireç ve Gider Açıcılar | `kirec-ve-gider` | Удаление накипи, Чистка труб | 8 | — |
| Oda Kokuları | `oda-kokulari` | Ароматизаторы для дома | 13 | — |
| Temizlik Bezleri ve Aksesuarları | `temizlik-aksesuarlari` | Аксессуары для уборки; Салфетки для уборки; Пакеты, пленка | 40 | — |
| Haşere Kovucular | `hasere-kovucular` | Средства от насекомых; Средства от укусов насекомых | 22 | — |

### 2.8 Anne ve Çocuk — `anne-ve-cocuk` (≈ 92)
| Alt kategori | slug | RU kaynak | ≈ | TR örnek |
|---|---|---|---|---|
| Bebek Bezleri | `bebek-bezi` | Подгузники | 16 | — |
| Çocuk Ağız Bakımı | `cocuk-agiz-bakimi` | Детские зубные пасты/щетки; Зубная паста; Зубная щетка | 41 | EAA022 |
| Çocuk Banyo ve Cilt Bakımı | `cocuk-banyo-cilt` | Шампунь, Гель; Крем; Молочко; Пена для ванны | 20 | YBA045, EBB018 |
| Bebek Mendilleri | `bebek-mendil` | Детские влажные салфетки; Салфетки | 13 | — |
| Beslenme ve Bakım Gereçleri | `beslenme-gerecleri` | Детская посуда; Предметы ухода; Стирка (çocuk) | 12 | — |
| Çocuk Giyim | `cocuk-giyim` | Детская одежда | 22 | — |

### 2.9 Sağlık ve Takviye — `saglik-ve-takviye` (≈ 100)
| Alt kategori | slug | RU kaynak | ≈ | TR örnek |
|---|---|---|---|---|
| Gıda Takviyeleri | `gida-takviyeleri` | БАДы | 60 | NWA052 (needsReview) |
| Vitaminler | `vitaminler` | Витамины | 15 | — |
| Bantlar ve Yamalar | `bant-ve-yamalar` | Лечебные пластыри | ≈ 12 | — |
| Diğer Sağlık Ürünleri | `diger-saglik-urunleri` | Мази, спреи и др.; Товары для мужчин › Для здоровья | ≈ 8 | — |
| Masaj Ürünleri | `masaj` | Массажное средство; Омолаживающий гель | 4 | — |

Not: alt kategori adı icerik-editoru'nün onayına tabidir; "tedavi", "ağrı kesici", "iyileştirici" gibi kelimeler ad, açıklama ve filtre etiketlerinde kullanılmaz (K-095).

### 2.10 Mutfak ve Gıda — `mutfak-ve-gida` (≈ 86)
| Alt kategori | slug | RU kaynak | ≈ |
|---|---|---|---|
| Mutfak Gereçleri | `mutfak-gerecleri` | Посуда | 52 |
| Çay ve İçecekler | `cay-ve-icecek` | Напитки | 16 |
| Gıda | `gida` | Продукты; Сахар | 13 |

### 2.11 Giyim ve Aksesuar — `giyim-ve-aksesuar` (≈ 430)
| Alt kategori | slug | RU kaynak | ≈ |
|---|---|---|---|
| Kadın İç Giyim ve Çorap | `kadin-giyim` | Женская (çorap, iç çamaşırı, külotlu çorap) | 86 |
| Erkek İç Giyim ve Çorap | `erkek-giyim` | Мужская (çorap, iç çamaşırı, kravat) | 57 |
| Havlular | `havlular` | Полотенца | 31 |
| Terlikler | `terlikler` | Женские / Мужские тапочки | 99 |
| Ayakkabı Bakımı | `ayakkabi-bakimi` | Крем для обуви, Стельки, Шарики | 8 |
| Gözlükler | `gozlukler` | Очки с защитой; Солнцезащитные очки | 57 |
| Çanta, Valiz ve Şemsiye | `valiz-ve-semsiye` | Чемодан; Зонты | 24 |
| Saç Fırçası ve Taraklar | `tarak-ve-fircalar` | Расчестка | 12 |
| Araç ve Kırtasiye | `arac-ve-kirtasiye` | Для автомобиля; Канцелярские товары | 9 |

### 2.12 Setler — `setler` (≈ 10)
| Alt kategori | slug | Kaynak | TR örnek |
|---|---|---|---|
| Başlangıç Setleri | `baslangic-setleri` | TR xlsx "Başlangıç Setleri" | T001, T003, T006 |
| Bakım Setleri | `bakim-setleri` | RU Лицо › Косметические наборы | — |

**Kök sırası (menü, şerit, footer):** Cilt Bakımı · Makyaj · Saç Bakımı · Vücut Bakımı · Ağız ve Diş Bakımı · Setler · Ev ve Temizlik · Anne ve Çocuk · Hijyen ve Kâğıt · Sağlık ve Takviye · Mutfak ve Gıda · Giyim ve Aksesuar.
Gerekçe: TR'de satıştaki ürünlerin yoğun olduğu ve kozmetik kimliği taşıyan kökler önde; Setler, satışta olan ve üyeliğe köprü kuran ürünler olduğu için üst yarıda.

**Eşleme kuralı (veri hattı için):** Ürünün RU breadcrumb'ındaki en derin düğüm yukarıdaki tablodan aranır; bulunamazsa bir üst düğüm. Hiç eşleşmeyen ürün yayına girmez ve doğrulama raporuna düşer. TR ürünlerinde koda göre ezme tablosu (`category-overrides`) önceliklidir (SEMA §2).

## 3. Global gezinme

### 3.1 Masaüstü header (≥ 1024 px)
Soldan sağa: Logo (ana sayfa) · **"Kategoriler"** düğmesi (mega menüyü açar) · üst bağlantılar: "Cildine uygun ürünleri bul" (`/cilt-tipine-gore`), "Setler" (`/kategori/setler`), "PV nedir?" (`/pv-nedir`), "Türkiye'de satışta" (`/koleksiyon/turkiyede-satista`) · arama kutusu · ikonlar: hesap (K-017 paneli), favoriler (sayaçlı), sepet (sayaçlı) · birincil düğme **"Üye ol"** (`/uye-ol`).
Kaydırınca kompakt hâl: yükseklik azalır, üst bağlantılar gizlenir; Kategoriler, arama, ikonlar ve "Üye ol" kalır.
- **Mikro animasyonlar (K-070):** sepet/favori sayaç pop'u, ikonlarda hover belirtisi, "Kategoriler" düğmesi ok dönüşü, kompakt hâle geçişte yumuşak yükseklik (transform ile; CLS üretmez), üst marka bandında (4 px) çok yavaş, dikkat dağıtmayan ışık geçişi (isteğe bağlı; hareket-tasarimcisi karar verir). Hepsi reduced-motion'da kapalı.
- **Hover renk geçişi bölgesi (K-093):** header'ın üst marka bandı ve açık "Kategoriler" düğmesinin zemini (ui-tasarimci Z2) mega menüde bir ürün/set üzerine gelindiğinde ürün paletine döner; ana sayfa vitrin hover'ında da değişmesi önizleme seçeneğidir (`wireframe/premium-tema.md` §B2). "Üye ol" düğmesi, logo ve metin rengi değişmez.

### 3.2 Mega menü (K-064, K-091) — tam tarif `wireframe/mega-menu.md`
- **Açılış:** tıklama veya klavye; ince işaretçili cihazlarda ~150 ms niyet gecikmeli hover. Esc / dışarı tıklama / odak çıkışı kapatır.
- **4 bölge:** (1) sol: 12 kök (küçük görsel + ad + "N ürün · N'i Türkiye'de"); (2) orta: seçili kökün alt kategorileri — en çok 8 **görselli karo** + kalanlar metin listesi; (3) sağ üst: **1 öne çıkan ürün/set kartı** (fiyat + üye fiyatı + PV; düğmesiz); (4) sağ alt: **tanıtım (kampanya) karosu** (ör. temalı koleksiyon, bulucu, PV nedir; indirim/geri sayım yok). Ayrıntı `wireframe/mega-menu.md` + `docs/tasarim/bilesenler/mega-menu.md`.
- **Hover renk geçişi:** öne çıkan kart ve tanıtım karosu K-093 / ui K-075 Z1 bölgesidir (header bandı Z2 bağlı).
- **Veri:** `getCategories()` → kök/alt, `productCount`, `trCount`, `icon`, `image`; `megaFeatured[kok]` (ürün kodu, yapılandırma); `megaMenu.campaigns[kok]` (yapılandırma).
- **Boş durum:** Ürünsüz kök yok; alt kategori görseli yoksa ikonlu nötr karo; öne çıkan yoksa bölge 3 kapanır ve bölge 2 genişler; promo yoksa bölge 4 kapanır.

### 3.3 Mobil menü (< 1024 px)
- Header: hamburger (sol) · logo (orta) · arama ikonu · sepet ikonu (sağ).
- **Çekmece (soldan, tam yükseklik, genişlik ≤ %88):**
  1. Üstte "Cildine uygun ürünleri bul" vurgulu satırı.
  2. "Kategoriler": 12 kök **görselli satır** (48 px yuvarlak görsel + ad + sayı + ›). Köke dokununca 2. seviye panel sağdan kayar: "‹ Geri" + kök adı, kök kapak görseli, "Tüm {Kök} (N)", alt kategoriler küçük görselli satırlar, en altta öne çıkan kart + tanıtım karosu (varsa).
  3. Hızlı bağlantılar: Türkiye'de satışta · Setler · PV nedir? · Favoriler · Sertifikalar · Hakkımızda ve iletişim.
  4. Altta tam genişlik **"Üye ol"** + "Greenleaf üye girişi" (dış, yeni sekme).
- Görseller çekmece açılınca yüklenir (önceden değil). Odak tuzağı, Esc, kaydırma kilidi. Alt gezinme çubuğu yok. Hover renk geçişi mobilde yok.

### 3.4 İkonlu kategori şeridi (ana sayfa + kategori kök sayfaları)
Ana sayfada 12 kök (yatay kaydırmalı, scroll-snap). Kök kategori sayfasında aynı şerit o kökün alt kategorilerini gösterir.

### 3.5 Footer
Sütunlar: (1) Alışveriş — 12 kök; (2) Keşfet — Cildine uygun ürünleri bul, Türkiye'de satışta, Setler, (varsa) temalı koleksiyon, Favoriler; (3) Kurumsal — Hakkımızda ve iletişim, Sertifikalar, PV nedir?, Üye ol; (4) Yasal — KVKK aydınlatma metni, Çerez politikası, Kullanım koşulları, (e-posta adımı açıksa) E-posta açık rıza metni. Mikro animasyonlar: bağlantı altı çizgisi hover, çizgi bandının görünür alana girince soldan uzaması (bir kez), "yukarı çık" düğmesi (reduced-motion'da anlık). Alt bant: satıcı ibaresi "[SATICI_ADI] — Bağımsız Greenleaf Distribütörü" + e-posta + telefon (yapılandırmadan, K-047), "Greenleaf, Suzhou merkezli bir Çin firmasıdır" türünde kısa marka notu (icerik-editoru metni), telif satırı.

### 3.6 Breadcrumb
Ana sayfa › Kök › Alt kategori › Ürün. Mobilde yalnız bir üst seviye ("‹ Alt kategori") görünür.

## 4. Filtre ve sıralama

| Filtre | Değerler | Kaynak alan | Görünürlük kuralı | Seçim |
|---|---|---|---|---|
| Kategori | Kök sayfasında alt kategoriler; arama/koleksiyonda kökler | `category` | Her listede | Çoklu |
| Bulunabilirlik | "Türkiye'de satışta" · "Türkiye'ye yakında" | `availability` | Sonuçta iki değer de varsa | Tekli (hızlı çip olarak da sunulur) |
| Marka | Alt markalar (CARICH, iLiFE, SEALUXE…) | `brand` | Sonuçta ≥ 2 marka varsa | Çoklu, aranabilir liste (≥ 8 değerde) |
| Fiyat aralığı | Alt–üst ₺ (üye fiyatı değil, "Fiyat" üzerinden) | `price` | Sonuçta ≥ 2 fiyatlı ürün varsa | Aralık; **etkinken yakında ürünler dışarıda kalır** ve bu, filtre altında bir satırla söylenir |
| Cilt tipi | Kuru, Yağlı, Karma, Normal, Hassas | `skinType[]` | Yalnız Cilt Bakımı, Makyaj, Setler ve aramada; sonuçta etiketli ≥ 1 ürün varsa | Çoklu |
| İhtiyaç | `CILT-TESTI.md` §3.2 sözlüğü | `concerns[]` | Cilt tipi ile aynı | Çoklu |

- Seçimler adres çubuğuna yansır (K-029); filtreli adresler indekslenmez (seo-uzmani).
- Her seçenekte sonuç sayısı; 0 sonuç verecek seçenek pasif görünür.
- Seçili filtreler ızgara üstünde kaldırılabilir çipler + "Tümünü temizle".
- Mobil: "Filtrele (n)" ve "Sırala" düğmeleri yapışkan çubukta; filtre alttan açılan panelde, panel altında "N ürünü göster".
- **Sıralama:** Önerilen (varsayılan: önce `tr`, sonra koleksiyon sırası/`order`, sonra ad) · Fiyat artan · Fiyat azalan (fiyatsız yakında ürünler her iki fiyat sıralamasında sonda) · Yeni gelenler. PV'ye göre sıralama yok.
- Sayfalama: 24'lük "Daha fazla yükle" (K-029) + "N ürünün 24'ü gösteriliyor".

## 5. Koleksiyonlar (listeleme şablonunun varyantı)

| Anahtar | URL | İçerik kuralı |
|---|---|---|
| `turkiyede-satista` | `/koleksiyon/turkiyede-satista` | Otomatik: `availability = tr` |
| `yeni` | `/koleksiyon/yeni` | `badges` içinde `new` (EL); boşsa sayfa 404 değil, koleksiyon gizlenir |
| `one-cikanlar` | `/koleksiyon/one-cikanlar` | `collections` içinde (EL) |
| `yakinda` | `/koleksiyon/turkiyeye-yakinda` | Otomatik: `availability = yakinda`; vitrinde yalnız `collections: yakinda-vitrin` olanlar |
| *(temalı)* `{premium-anahtar}` | `/koleksiyon/{premium-anahtar}` | EL; koleksiyon kaydında `theme` dolu (K-092). Anahtar ve üyeleri S-029 cevabıyla belirlenir |

Ana sayfa vitrinleri ve mega menü öne çıkanları koleksiyon anahtarıyla tanımlanır, ürün adıyla değil (K-008). İki ana sayfa vitrini aynı ürünü göstermez (çakışan ürün sonraki vitrinden düşer). Mega menü öne çıkanları bu kurala tabi değildir (ayrı bağlam).

**Koleksiyon kaydı alanları:** `key, title, description, members (kural veya kod listesi), order, theme (isteğe bağlı), heroImage (isteğe bağlı, temalı koleksiyonda zorunlu)`.

## 6. Arama bilgi mimarisi (özet; ayrıntı `wireframe/arama.md`)
Aranan alanlar: Türkçe ad, marka, kategori adı, kod, barkod, ihtiyaç/cilt tipi etiketlerinin Türkçe karşılıkları. Sonuçlar: `tr` önce. Panelde en fazla 6 ürün + en fazla 3 kategori önerisi.
