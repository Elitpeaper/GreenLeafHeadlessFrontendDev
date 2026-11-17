# global.green-leaf.shop Haritası (FAZ 0 — Keşif)

> Hazırlayan: B2-greenleaf-shop (Veri Mühendisi alt ajanı). Tarih: 15 Kasım 2026. Kapsam: envanter + analiz; site kodu ve nihai `products.json` YOK.
> Ham çıktılar: `.cache/greenleaf-shop/` (HTML önbelleği `html/`, `products-index.json`, `match-tr.json`, `categories-counts.json`, `sample-products.json`).

## 1. Özet

| Konu | Değer |
|---|---|
| Kategori düğümü (menüde) | 163 (13 ana + 66 ikinci + 84 üçüncü seviye); 3 düğüm boş (0 ürün) |
| Toplam benzersiz ürün | **1676** (tüm listelerin birleşimi; ürün id aralığı 53–6310, seyrek) |
| TR xlsx eşleşmesi | **34 / 41 kod ile** (38 ürün + 3 başlangıç seti); barkod ile 0 (site barkod göstermiyor) |
| Görsel | Ürün başına **1 görsel**; orijinal 500–800 px (PNG/JPG), `-800x800` cache sürümü orijinalden büyük değil |
| Fiyat | Yalnızca RUB (₽). TR xlsx ile oran ≈ **×2,99** (RUB/TRY) |
| Site yazılımı | OpenCart **4.x** (route'larda `cart.add`, `wishlist.add` gibi nokta ayracı) + özel "greenleaf" teması/eklentisi |

## 2. Site teknik profili

- **Dil/para:** Yalnızca Rusça (`lang="ru"`, URL'lerde `language=ru-ru`) ve yalnızca RUB. `common/language.save` ve `common/currency.save` JSON hata döndürüyor (POST gerekir); pratikte başka dil/para yok.
- **robots.txt:** `User-agent: *`; yalnızca sıralama/filtre parametreleri engelli: `?page=` (boş değer), `sort`, `order`, `limit`, `filter_name`, `filter_sub_category`, `filter_description`, `filter_group`. **`Sitemap:` satırı yok.** `?limit=100` robots.txt'te yasak; sahibinin verdiği izinle ve nazik hızla kullandık (§8 riskler).
- **Sitemap:** YOK. `/sitemap.xml` boş yanıt; `index.php?route=extension/feed/google_sitemap`, `.../extension/opencart/feed/google_sitemap`, `.../feed/google_sitemap` hepsi "sayfa bulunamadı" (404).
- **SEO URL şeması:** Karışık.
  - Kategori: çoğu `/<translit-slug>` (ör. `/uhod-za-licom`); 29 kategori SEO anahtar kelimesiz: `/?route=product/category&path=60_232` (path = ata_çocuk id zinciri).
  - Ürün: `/<slug>` (başlığın translit'i; kimi zaman sonda model kodu: `...-kla264`, `_n`, `-2` ekleri) veya SEO'suz `index.php?route=product/product&product_id=N` (listede 120 ürün). Slug kararsız (aynı ürün için `-2`, `_2_n` varyantları) → **kalıcı anahtar olarak `product_id` kullanılmalı**.
  - Liste bağlantılarına `?limit=100&page=N&path=..` eklenir; kanonik URL için bu parametreler atılmalı.
- **JSON uç noktası:** Yok. Sepet/istek (`checkout/cart.add`, `common/cart.info`) AJAX ama veri çekmeye uygun değil. Ürün sayfasında JSON-LD / schema.org yok.
- **Faydalı rota:** `index.php?route=product/search&search=<MODEL>` — OpenCart model alanıyla **tam eşleşme** buluyor (1 istekle kod → ürün). Eşleştirmede kullandık.
- **Liste sayfası kartı** (`<article class="gcp-card">`): ürün id (`input[name=product_id]`), URL, ad, fiyat (`gcp-price`), küçük görsel (`-250x250`). Model/kod, stok, PV kartta YOK. Sayfalama metni: `Показано с 1 по 16 из 210 (Страниц: 14)`; limit seçenekleri 16/25/50/75/100.
- **Ana menü:** `gl-catalog-section-<id>` sekmeleri (13 ana kategori) → grup başlıkları (2. seviye) → `<li>` (3. seviye). Ana kategori sayfaları alt kategori ürünlerini de içeriyor (ör. "Уход за домом" 202 ürün).

## 3. Kategori ağacı

Sayım: ilgili kategori sayfasındaki "из Z" değeri (alt kategoriler üst kategoriye dahil; bir ürün birden çok kategoride olabilir, bu yüzden ana kategori toplamı 1725 ≠ 1676 benzersiz). Menü ayrıştırıcısının son bölümde ürettiği 6 yinelenen düğüm ("Раздел каталога" vb.) çıkarıldı.

| Seviye | Kategori (RU) | URL | Ürün sayısı |
|---|---|---|---|
| 1 | Уход за домом | `/tovari-dlya-doma` | 202 |
| 2 | · Аксессуары для уборки | `?route=product/category&path=61_206` | 20 |
| 2 | · Дом | `/uhod-dlya-doma` | 41 |
| 3 | · · Ароматизаторы для дома | `/aromatizator-dlya-doma` | 13 |
| 3 | · · Пакеты, пленка, целлофан | `?route=product/category&path=61_62_209` | 11 |
| 3 | · · Средства для мытья полов | `/sredstvo-dlya-mytya-polov` | 6 |
| 3 | · · Средства для удаления накипи | `/sredstvo-dlya-udaleniya-nakipi` | 3 |
| 3 | · · Чистка труб | `/chistka-trub` | 5 |
| 2 | · Кухня | `/kuhnya` | 47 |
| 3 | · · Салфетки для уборки | `/salfetki-dlya-uborki` | 9 |
| 3 | · · Средство для мытья посуды | `/sredstvo-dlya-mytya-posudy` | 15 |
| 3 | · · Чистящее средство для кухни | `/chistyashchee-sredstvo-dlya-kukhni` | 12 |
| 2 | · Средства от насекомых | `?route=product/category&path=61_205` | 18 |
| 2 | · Стирка | `/stirka` | 78 |
| 3 | · · Для стиральной машины | `/dlya-stiralnoj-mashiny` | 3 |
| 3 | · · Жидкое средство для стирки | `/zhidkoe-sredstvo-dlya-stirki` | 33 |
| 3 | · · Кондиционер для белья | `/kondicioner-dlya-belya` | 6 |
| 3 | · · Листы для стирки разноцветного белья | `/stirka-raznocvetnogo-belya` | 7 |
| 3 | · · Мыло для стирки | `/mnogofunkcionalnaya-stirka` | 7 |
| 3 | · · Стиральный порошок | `?route=product/category&path=61_65_207` | 14 |
| 2 | · Туалет | `/tualet` | 6 |
| 1 | Уходовая косметика | `/uhodovaya-kosmetika` | 405 |
| 2 | · Волосы | `/volosi` | 94 |
| 3 | · · Для укладки | `?route=product/category&path=60_83_234` | 3 |
| 3 | · · Кондиционер-ополаскиватель | `/kondicioner` | 13 |
| 3 | · · Краска для волос | `/kraska-dlya-volos` | 12 |
| 3 | · · Лосьон | `/loson` | 5 |
| 3 | · · Маска | `/maska` | 4 |
| 3 | · · Масло | `/maslo` | 3 |
| 3 | · · Шампунь | `/shampun-kosmetika` | 51 |
| 2 | · Глаза | `/uhod-za-glazami` | 19 |
| 3 | · · Крема для глаз | `?route=product/category&path=60_80_208` | 9 |
| 3 | · · Маски согревающие | `/maski-sogrevayushchie` | 5 |
| 3 | · · Патчи для глаз | `/patchi-dlya-glaz` | 5 |
| 2 | · Защита от солнца | `?route=product/category&path=60_232` | 8 |
| 2 | · Лицо | `/uhod-za-licom` | 210 |
| 3 | · · Бальзам для губ | `/balzam-dlya-gub` | 10 |
| 3 | · · Косметические наборы | `?route=product/category&path=60_79_231` | 7 |
| 3 | · · Крема | `/krema` | 43 |
| 3 | · · Лосьон | `/loson-ukhodovyj` | 28 |
| 3 | · · Маска косметическая | `/maska-kosmeticheskaya` | 22 |
| 3 | · · Масло для лица | `/maslo-dlya-lica` | 3 |
| 3 | · · Основа под макияж | `/osnova-pod-makiyazh-lico` | 3 |
| 3 | · · Скраб для лица | `/skrab-dlya-lica` | 3 |
| 3 | · · Снятие макияжа | `/snyatie-makiyazha` | 5 |
| 3 | · · Средство для умывания | `/sredstvo-dlya-umyvaniya` | 29 |
| 3 | · · Сыворотка | `/syvorotka-lico` | 38 |
| 2 | · Ноги | `/nogi` | 4 |
| 3 | · · Спрей для ног | `/sprej-dlya-nog` | 1 |
| 2 | · Руки | `/uhod-za-rukami` | 8 |
| 3 | · · Крем для рук | `/krem-dlya-ruk` | 8 |
| 2 | · Тело | `/telo` | 28 |
| 3 | · · Гель | `/gel` | 5 |
| 3 | · · Крем для тела | `/krem-dlya-tela` | 18 |
| 3 | · · Скраб | `/skrab` | 1 |
| 3 | · · Спрей | `/sprej` | 1 |
| 3 | · · Депиляция | `?route=product/category&path=60_85_214` | 3 |
| 2 | · Парфюмерия | `/parfumeriya` | 13 |
| 1 | Гигиена | `/hygiene` | 288 |
| 2 | · Женская | `/zhenskaya` | 58 |
| 3 | · · Бритвы | `/britvy` | 2 |
| 3 | · · Прокладки | `/prokladki` | 54 |
| 3 | · · Растворы | `?route=product/category&path=66_71_212` | 5 |
| 2 | · Личная | `/lichnaya` | 85 |
| 3 | · · Бомбочки для ванны | `/bombochki-dlya-vanny` | 4 |
| 3 | · · Гели для душа | `/gel-dlya-dusha` | 34 |
| 3 | · · Дезодоранты | `?route=product/category&path=66_73_201` | 2 |
| 3 | · · Жидкое мыло | `/zhidkoe-mylo` | 26 |
| 3 | · · Инструменты | `/trimmer-kosmeticheskij` | 2 |
| 3 | · · Мочалки для душа | `/mochalki-dlya-dusha` | 7 |
| 3 | · · Твердое мыло | `/tverdoe-mylo` | 10 |
| 2 | · Полости рта | `/polosti-rta` | 96 |
| 3 | · · Зубные нити | `/zubnye-niti` | 7 |
| 3 | · · Зубные пасты | `/zubnye-pasty` | 41 |
| 3 | · · Зубные щетки | `/zubnye-schetki` | 24 |
| 3 | · · Ополаскиватели | `/opolaskivateli` | 4 |
| 3 | · · Спреи | `/sprei` | 3 |
| 3 | · · Дополнительный уход | `?route=product/category&path=66_74_213` | 1 |
| 2 | · Салфетки и бумага | `/salfetki-i-bumaga` | 49 |
| 3 | · · Ватные диски и палочки | `/vatnye-diski` | 4 |
| 3 | · · Влажные салфетки | `/vlazhnye-kosmeticheskie-salfetki` | 4 |
| 3 | · · Салфетки, полотенца, платочки | `/salfetki-platochki` | 22 |
| 3 | · · Туалетная бумага | `/tualetnaya-bumaga` | 10 |
| 1 | Макияж | `/makiyazh` | 86 |
| 2 | · Аксессуары для макияжа | `?route=product/category&path=67_227` | 9 |
| 2 | · Брови | `/brovi` | 15 |
| 3 | · · Окрашивание бровей | `/okrashivanie-brovej` | 8 |
| 3 | · · Уход за ресницами и бровями | `/ukhod-za-resnicami-i-brovyami` | 3 |
| 2 | · Глаза | `/glaza` | 17 |
| 3 | · · Подводка для глаз | `/podvodka-dlya-glaz` | 4 |
| 3 | · · Тени для глаз | `/teni-dlya-glaz` | 5 |
| 3 | · · Ресницы | `?route=product/category&path=67_77_215` | 7 |
| 2 | · Губы | `/guby` | 23 |
| 3 | · · Помада для губ | `/pomada-dlya-gub` | 16 |
| 2 | · Лицо | `/lica` | 31 |
| 3 | · · Консилер | `/konsiler` | 4 |
| 3 | · · Основа под макияж | `/osnova-pod-makiyazh` | 3 |
| 3 | · · Пудра | `/pudra` | 4 |
| 3 | · · Тональное средство | `/tonalnoe-sredstvo` | 13 |
| 1 | Аксессуары | `/aksessuary` | 124 |
| 2 | · Для автомобиля | `?route=product/category&path=70_235` | 5 |
| 2 | · Зонты | `?route=product/category&path=70_218` | 6 |
| 2 | · Очки с защитой | `/ochki-dlya-raboty-za-kompyuterom` | 31 |
| 2 | · Расчестка | `?route=product/category&path=70_203` | 12 |
| 2 | · Солнцезащитные очки | `/solncezashchitnye-ochki` | 26 |
| 2 | · Чемодан | `/chemodan` | 18 |
| 1 | Канцелярские товары | `/kantseliarskie-tovary` | 4 |
| 1 | Обувь и уход | `/obuv-i-ukhod` | 118 |
| 2 | · Женские тапочки | `/zhenskie-tapochki` | 55 |
| 2 | · Крем для обуви | `/krem-dlya-obuvi` | 5 |
| 2 | · Мужские тапочки | `/muzhskie-tapochki` | 44 |
| 2 | · Стельки | `/stelki` | 1 |
| 2 | · Шарики для обуви | `/shariki-dlya-obuvi` | 2 |
| 1 | Одежда и текстиль | `/tekstil-i-odezhda` | 190 |
| 2 | · Женская | `/dlia-vzroslykh` | 86 |
| 3 | · · Женские гольфы | `/zhenskie-golfy-vzroslie` | 3 |
| 3 | · · Женские носки | `/zhenskie-noski` | 24 |
| 3 | · · Женское нижнее белье | `?route=product/category&path=86_88_221` | 29 |
| 3 | · · Колготки | `/kolgotki` | 5 |
| 2 | · Мужская | `?route=product/category&path=86_229` | 57 |
| 3 | · · Галстуки | `?route=product/category&path=86_229_220` | 15 |
| 3 | · · Мужские гольфы | `/muzhskie-golfy-vzroslie` | 3 |
| 3 | · · Мужские носки | `/muzhskie-noski` | 19 |
| 3 | · · Мужские трусы | `/muzhskie-trusy` | 36 |
| 2 | · Полотенца | `?route=product/category&path=86_219` | 31 |
| 1 | Посуда | `/posuda` | 52 |
| 1 | Продукты и напитки | `/produkti-i-napitki` | 34 |
| 2 | · Напитки | `/chaj-v-paketikakh` | 16 |
| 2 | · Продукты | `?route=product/category&path=89_236` | 7 |
| 2 | · Сахар | `/sakhar` | 6 |
| 1 | Товары для детей | `/dlya-detey` | 92 |
| 2 | · Десткая посуда | `?route=product/category&path=69_228` | 7 |
| 2 | · Детские влажные салфетки | `/detskie-vlazhnye-salfetki-salfetki` | 9 |
| 2 | · Детские зубные пасты | `/detskie-zubnye-pasty` | 16 |
| 2 | · Детские зубные щетки | `/detskie-zubnye-shchetki` | 9 |
| 2 | · Зубная паста | `/zubnaya-pasta` | 10 |
| 2 | · Зубная щетка | `/zubnaya-shchetka` | 6 |
| 2 | · Крем | `/krem-gel` | 6 |
| 2 | · Молочко для тела | `/molochko-dlya-tela` | 2 |
| 2 | · Пена для ванны | `/pena-dlya-vanny` | 1 |
| 2 | · Подгузники | `/podguzniki` | 16 |
| 2 | · Предметы ухода | `?route=product/category&path=69_230` | 2 |
| 2 | · Салфетки | `/salfetki` | 4 |
| 2 | · Стирка | `?route=product/category&path=69_217` | 3 |
| 2 | · Шампунь, Гель | `/shampun` | 11 |
| 2 | · Детская одежда | `/dlia-detei` | 22 |
| 1 | Товары для здоровья | `/zdorovie` | 117 |
| 2 | · БАДы | `/bad` | 60 |
| 2 | · Витамины | `/vitaminy` | 15 |
| 2 | · Лечебные пластыри | `/plastyr` | 14 |
| 2 | · Массажное средство | `/massazhnoe-sredstvo` | 3 |
| 2 | · Омолаживающий гель | `?route=product/category&path=59_200` | 1 |
| 2 | · Средства от укусов насекомых | `?route=product/category&path=59_204` | 4 |
| 2 | · Мази, спреи и др. | `?route=product/category&path=59_216` | 5 |
| 1 | Товары для мужчин | `/dlya-muzhchin` | 13 |
| 2 | · Гигиена | `/muzhskaya` | 2 |
| 3 | · · Бритвы | `/britvy-muzhskie` | 2 |
| 2 | · Для бритья | `/britvennyj-stanok` | 2 |
| 2 | · Для здоровья | `?route=product/category&path=68_199` | 1 |
| 2 | · Уход | `/uhodovaya-kosmetika-dlya-muzhchin` | 9 |
| 3 | · · Крем | `/krem` | 0 |
| 3 | · · Лосьон | `/loson-muzhskoi` | 0 |
| 3 | · · Сыворотка | `/syvorotka` | 0 |

Not: "Товары для мужчин > Уход" altındaki Крем / Лосьон / Сыворотка boş (0). Kategori ikonları `image/catalog/greenleaf/menu-icons/gl-137-<id>.svg` (kategori başına SVG).

## 4. Ürün listesini çıkarma yöntemi (öneri)

| Yöntem | Sonuç |
|---|---|
| Sitemap | Yok |
| `product_id` aralığı taraması | Elendi: aralık 53–6310 ama yalnızca 1676 id dolu; test edilen 8 boş id 404. ~4580 gereksiz istek. |
| **Ana kategori sayfaları `?limit=100&page=N`** | **Önerilen.** 13 ana kategori ≈ 25 istek, 1663 benzersiz ürün. 13 ürün yalnızca alt kategorilerde → alt kategori sayfaları da taranmalı (bizde 163 düğüm = 177 istek, 1676 ürün). |
| Ürün sayfası | Yalnızca **model kodu**, PV, stok, açıklama için gerekli (listede yok). 1676 sayfa × ~1,7 sn ≈ 48 dk; ya da yalnızca ihtiyaç olan ürünler için `search=<KOD>`. |

Gerçek boru hattı önerisi: (1) ana menüyü çek → kategori ağacı; (2) tüm düğümleri `limit=100` ile tara → id/ad/fiyat/küçük görsel + kategori eşlemesi; (3) hedef (TR aktif) ürünler için `search=<KOD>` + ürün sayfası → model, PV, stok, açıklama; (4) isteğe bağlı: gece tek seferlik tüm 1676 ürün sayfası (~1 saat). Bu keşifte ürün sayfası örneklemi: **66 sayfa** (41 eşleştirme araması + ek adaylar + 25 çeşitli örnek).

`products-index.json` (1676 kayıt): `id, url (kanonik), name, priceRub, thumb, categories[], boxQty, brandGuess, model (yalnızca ziyaret edilen 65 üründe), pointsPV100, stock`.

## 5. Ürün sayfası alan haritası

| Alan | Nerede | Örnek | Kalite |
|---|---|---|---|
| id | `input[name=product_id]` / URL | 1232 | Kararlı, güvenilir |
| Ad | `<h1>`, liste `<h3>` | `CARICH Мыло с эфирными маслами Бинчотан ручной работы, 100г` | İyi; marka büyük/küçük harf tutarsız; 8 üründe bozuk `?????` (karakter kaybı, ör. id 2259); 99 ad tekrarı |
| Model/kod | `<li>Модель KAC868</li>` ve "Характеристики" sekmesi (tek satır) | `CBB017` | Çok iyi; `/A` ek varyantları (`KAC644/A`, `DAB086/A`); `YP0802021`, `YP2410006-3` gibi farklı biçimler |
| Barkod/EAN | **Yok** | — | Siteden barkod alınamaz |
| Fiyat | `price-new` | `290.00₽` (listede `1 100.00₽`, binlik boşluk) | Yalnızca RUB. Eski/indirimli fiyat (`price-old`) 66 sayfada hiç yok; "%50 partner indirimi" fiyata yansımıyor |
| PV (puan) | "Цена в бонусных баллах: 20" | 20 → PV 0,2 (×100) | TR xlsx ile tutarlı (PV×100); 3/66 üründe yok |
| Görsel | `data-gl-gallery-main` / `a.gl-p-photo` | `/image/cache/catalog/product/<ad>-800x800.png` | 1 adet/ürün (§6) |
| Açıklama | `#tab-description` | `<h2>Описание товара</h2><p>…</p><h3>Преимущества</h3><ul>…` (`Способ применения`, `Кому подходит`) | Rusça HTML (h2/h3/p/ul), uzun; ham saklanmalı (`content_ru`). Listede kırpılmış kısa metin (`..`) var |
| Özellik tablosu | `#tab-specification` | yalnızca `Модель` | Pratikte boş — kullanılmaz |
| Marka/üretici | **Yok** (ayrı alan yok) | — | Addan türetilir: ilk kelime (CARICH, iLiFE, SEALUXE, KARDLI, NILRICH, GREENLEAF, YIBEILE, PINK POINT, OKFAD…). 1676'dan 1172'sinde tespit; 504'ü markasız (ev gereçleri, çorap vb.) |
| Stok | `greenleaf-stock` | `Доступность В наличии` (20/66) / `Доступность Через 14 Дней` (46/66) | İki durum |
| Koli adedi | Ad öneki | `(Кол-во в коробке 20 шт) …`, `(В коробке 5шт)`, `(Корбока 20 шт)`, slug'da `-korobka-` | 23 ürün adında geçiyor; 16'sında sayı ayrıştırıldı (regex gevşetilmeli) |
| Hacim/gramaj | Ad sonu | `100г`, `450 мл`, `1 кг`, `30 г*3` | Serbest metin; regex ile çıkarılabilir |
| Breadcrumb | `ol.gl-c-crumbs` | `Гигиена > Личная > Твердое мыло > <ürün>` | Güvenilir birincil kategori yolu |
| İlgili ürünler | Sayfada ilgili blok (`500x500` görsel) | — | Veri değeri düşük |
| Yorumlar | `Отзывы (0)` | 0 | 66 sayfada hepsi 0 |

### Örnek kayıt (id 1232, ayrıştırılmış)
```json
{
  "id": 1232, "model": "CBB017",
  "title": "CARICH Мыло с эфирными маслами Бинчотан ручной работы, 100г",
  "priceRub": 290, "pointsPV100": 20, "priceOld": null,
  "stock": "Доступность Через 14 Дней", "brandGuess": "CARICH", "boxQty": null,
  "crumbs": ["Гигиена", "Личная", "Твердое мыло"],
  "images": ["https://global.green-leaf.shop/image/cache/catalog/product/3649-carich-myilo-s-efirnyimi-maslami-binchotan-ruchnoy-rabotyi-100g-800x800.png"],
  "spec": [["Модель", "CBB017"]], "reviews": 0,
  "descHtml": "<h2>Описание товара</h2><p>Представляем вам CARICH Мыло с эфирными маслами Бинчотан…</p>…"
}
```

## 6. Görsel bulguları

3 görsel (orijinal URL'ler) indirildi, boyutlar dosya başlık baytlarından okundu:

| Ürün | Dosya | Biçim | Boyut | Bayt |
|---|---|---|---|---|
| 5454 | `/image/catalog/product/2501091801zdqTQunqd5.jpg` | JPEG | **800×800** | 184 241 |
| 529 | `/image/catalog/product/476_ilife-…-500-ml.png` | PNG | **600×599** | 102 781 |
| 1115 | `/image/catalog/product/1115-kardli-…-korobke-.png` | PNG | **502×500** | 252 653 |

- Kalıp: sayfadaki `image/cache/catalog/product/<ad>-800x800.<uzantı>` → orijinal `image/catalog/product/<ad>.<uzantı>` (`cache/` ve `-800x800` atılır); orijinal URL'ler 200 döndü. JPEG'de cache ile orijinal bayt bayt aynı (orijinal zaten 800). PNG'lerde 800×800 cache, orijinalden **büyütülmüş** (daha büyük dosya, ek ayrıntı yok).
- Rastgele boyut (`-2000x2000`) isteği **404** → cache yalnızca sayfada kullanılan boyutlar için var; "daha büyük orijinal" hilesi işe yaramıyor, orijinaller ≤ 800 px.
- Liste küçük görseli `-250x250`, ilgili ürünler `-500x500`.
- Sonuç: Hero/büyük kart için yetersiz (800 px tavan, çoğu 500–600). Ürün başına 1 görsel; galeri yok. **Daha iyi kaynak adayı: TR xlsx'teki `greenleaf-global.com/data/files/goods/...` görselleri** (bu keşifte indirilmedi; boyutları ayrıca ölçülmeli).

## 7. TR xlsx eşleştirmesi

Kaynak: `greenleaf-turkiye-urunler.xlsx` — "Ürünler (38)" + "Başlangıç Setleri (3)" = 41 kayıt. Yöntem: kod normalizasyonu (trim, büyük harf, boşluk/-/_/. silme, `/A` ek ve baştaki sıfır atma), sitede `search=<KOD>` (model tam eşleşmesi), ürün sayfasında model doğrulaması. Barkod sitede olmadığından barkod eşleşmesi mümkün değil. Tam sonuç: `.cache/greenleaf-shop/match-tr.json`.

**Sonuç: 34/41 = %83 kod eşleşmesi (Ürünler sayfasında 34/38 = %89). Barkod: 0 (siteden doğrulanamaz).**

- Fiyat doğrulaması: 33/34 üründe RUB/TRY oranı 2,97–3,01 (≈ ×2,99); PV tutarlı (site puanı = PV×100). Aykırı: **CEA069** (750 ₽, oran 3,99; PV yok) → site verisi şüpheli.
- Ad çelişkisi: bazı eşleşmelerde TR adı ile RU adı farklı marka/ürün gösteriyor (ör. CCC001: TR "CARICH Diş Fırçası (Çiftli)" ↔ RU "OKFAD Зубная щетка … 2 шт"; CBF015: TR "Shea Yağı El Kremi" ↔ RU "Крем для рук, 50 г"). Kod ana anahtar, ad yalnızca ipucu.

### Eşleşenler
| TR kodu | TR adı | Site id | Site modeli | RUB | RUB/TRY | Not |
|---|---|---|---|---|---|---|
| CBB017 | CARICH el yapımı kömürlü esansiyel yağ sabunu | 1232 | CBB017 | 290 | 2.99 |  |
| CCC001 | CARICH Diş Fırçası (Çiftli) | 112 | CCC001 | 250 | 2.98 | marka farkı? |
| CCC029 | CARICH Diş Fırçası | 429 | CCC029 | 710 | 2.98 |  |
| EAA022 | YIBEIL çocuk diş macunu (80g) | 5842 | EAA022 | 310 | 3.01 |  |
| CAA038 | CARICH Zencefil Hacim Şampuanı | 1560 | CAA038 | 880 | 2.97 |  |
| DAA062 | iLiFE doğal deniz yosunu diş macunu | 985 | DAA062 | 430 | 2.97 |  |
| CEA069 | CARICH Bambu Cep Mendili | 1003 | CEA069 | 750 | 3.99 | fiyat aykırı (x3.99), PV yok |
| ASF066 | iLiFE Bakteriyostatik Çamaşır Sabunu | 5525 | ASF066 | 220 | 2.97 |  |
| ASA017 | iLiFE Çamaşır Deterjanı | 1623 | ASA017 | 660 | 2.99 |  |
| ASF054 | iLiFE Çamaşır Deterjanı (2KG) | 994 | ASF054 | 1300 | 2.98 |  |
| ASF053 | iLiFE çamaşır deterjanı (1KG) | 995 | ASF053 | 660 | 2.99 |  |
| ASB046 | iLiFE SOD ipek losyonu | 997 | ASB046 | 430 | 2.97 |  |
| ASA086 | iLiFE Bambu Özlü Bulaşık Sıvısı | 5558 | ASA086 | 860 | 2.99 |  |
| ASF055 | iLiFE deterjan | 992 | ASF055 | 550 | 2.99 |  |
| LGI019 | Greenleaf 1,25kg Zencefilli Deterjan | 2233 | LGI019 | 740 | 2.98 |  |
| SBC053 | SEALUXE Aloe Nemlendirici Maske | 1054 | SBC053 | 1210 | 2.97 |  |
| EBB018 | YIBEILE çocuk yulaf özlü vücut sütü | 1180 | EBB018 | 940 | 2.99 |  |
| FPA151 | pinkpoint inci nude ton-up krem | 5441 | FPA151 | 1300 | 2.98 |  |
| SBJ064 | SEALUXE Aydınlatıcı Temizleme Jeli | 1050 | SBJ064 | 800 | 2.99 |  |
| CBA052 | CARICH Aroma Duş Jeli | 1188 | CBA052 | 630 | 2.99 |  |
| CAA039 | çiçek kokulu şampuan | 2066 | CAA039 | 1030 | 2.99 |  |
| DAA108 | iLiFE Aloe Vera Köpüren El Yıkama | 983 | DAA108 | 720 | 2.99 |  |
| CCA016 | CARICH soğuk alg alüminyum içermeyen diş macunu | 1186 | CCA016 | 550 | 2.97 |  |
| CBF014 | CARICH Aloe Nemlendirici El Kremi | 1171 | CBF014 | 220 | 2.97 |  |
| ASB047 | iLiFE Papatya Köpüren El Yıkama | 996 | ASB047 | 720 | 2.99 |  |
| CBF015 | CARICH Shea Yağı Nemlendirici El Kremi | 1170 | CBF015 | 220 | 2.97 |  |
| SAA069 | SEALUXE Yeşil Çay Nemlendirici Peeling | 1698 | SAA069 | 390 | 3 |  |
| ASB045 | iLiFE Aloe Vera Jeli | 998 | ASB045 | 390 | 2.98 |  |
| CBE034 | CARICH vitamin E Emülsiyonu | 988 | CBE034 | 510 | 3 |  |
| ASB044 | iLiFE Nemlendirici Aloe Vera Jeli | 999 | ASB044 | 770 | 2.97 |  |
| YBA045 | YIBEILE Çocuk 2&apos;si 1 Arada Yıkama & Şampuan | 5310 | YBA045 | 860 | 2.99 |  |
| DAB087 | iLiFE Pembe Aloe Vera Jeli | 982 | DAB087 | 770 | 2.97 |  |
| CAB040 | CARICH Zencefil Hacim Saç Kremi | 1555 | CAB040 | 880 | 2.97 |  |
| DAA109 | iLiFE Canlandırıcı Nemlendirici Duş Jeli | 1165 | DAA109 | 660 | 3 |  |

### Eşleşmeyenler (tam liste)

| TR kodu | TR adı | Sayfa | Not |
|---|---|---|---|
| KLA128 | CARICH Bambu Yüz Mendili | Ürünler | Sitede bu model yok |
| DAC056 | iLiFE Mutfak Yağ Temizleyici | Ürünler | Sitede bu model yok |
| DAB089 | Cilt bakım gliserini | Ürünler | Sitede bu model yok |
| NWA052 | Nilrich 20 çeşit vitamin ve mineralli yumuşak çiğnenebilir şekerler | Ürünler | Sitede bu model yok |
| T006 | SEALUXE bifida maya cilt bakım koleksiyonu | Başlangıç Setleri | Başlangıç seti; RU sitede karşılığı yok |
| T001 | CARICH el yapımı kömürlü esansiyel yağ sabunu | Başlangıç Setleri | Başlangıç seti; RU sitede karşılığı yok |
| T003 | SEALUXE hydra genesis cilt bakım seti | Başlangıç Setleri | Başlangıç seti; RU sitede karşılığı yok |

Eşleşmeyen 4 üründe ad ipucuyla en yakın adaylar (hepsi **farklı model kodlu**, bu yüzden eşleştirilmedi): KLA128 (Bambu Yüz Mendili) ↔ CEA080 / CEA069 / CBC007 (farklı ürünler); DAC056 (Mutfak Yağ Temizleyici) ↔ DAC019 (id 529, olası ama kod farklı); DAB089 (Cilt bakım gliserini) ↔ DAB086 (id 864 "Витамин B … с глицерином", 300 ₽ ≈ 99×3, olası); NWA052 (Nilrich vitaminli yumuşak şeker) ↔ NWA030 (id 5851 "Мармелад … 20 видов витаминов", 1380 ₽, PV 200 vs TR PV 10 → tutarsız). TR id 6183 ve 6156 yeni eklenmiş kayıtlar; RU sitede henüz olmayabilir. 3 başlangıç seti (T001/T003/T006) Türkiye'ye özgü; RU sitede karşılığı yok.

## 8. Riskler

- **Hız sınırı / anti-bot:** 1,2–2 sn gecikme ve tarayıcı UA ile ~300 istekte engel, CAPTCHA veya 429 görülmedi. Tam ürün sayfası taramasında (1676) hız yine düşük tutulmalı.
- **robots.txt:** `limit` ve `page=` (boş) parametreleri yasak. Sahibinin izniyle kullanıldı; üretim taramasında izin yazılı kalmalı, alternatif 16'lı sayfalama (~105 sayfa).
- **Rusça içerik:** Ad ve açıklama yalnızca Rusça; çeviri/yerelleştirme `icerik-editoru` işi. TR xlsx'te Türkçe adlar var (38 ürün).
- **Fiyat RUB vs TRY:** Doğrudan kullanılamaz. Oran ≈ ×3 ama sabit değil; TR fiyat kaynağı TR xlsx/panel olmalı.
- **Veri kalitesi:** 8 bozuk `?????` ad, 99 tekrar eden ad, `/A` varyant kodları, kararsız slug'lar, tekil fiyat anomalisi (CEA069).
- **Kapsam farkı:** Site 1676 ürün; Türkiye aktif 38 + 3 set → bu site yalnızca zenginleştirme (Rusça içerik, kategori, yedek görsel) için.
- **Görsel çözünürlüğü:** ≤ 800 px, ürün başına 1 adet.
- **Kırılganlık:** Özel tema sınıfları (`gcp-card`, `gl-c-crumbs`) değişirse ayrıştırıcı bozulur; HTML önbelleği korunmalı.

## 9. Kullanılan scriptler (`.cache/scripts/`)
`shop-lib.mjs` (önbellekli nazik fetch), `shop-home.mjs`, `shop-tree.mjs` (menü → ağaç), `shop-crawl-cats.mjs` (163 düğüm × limit=100), `shop-parse-product.mjs` (ürün ayrıştırıcı), `shop-xlsx.mjs` (xlsx → JSON), `shop-match-search.mjs` (kod → arama + doğrulama), `shop-cand.mjs`, `shop-sample.mjs`, `shop-stats.mjs`, `shop-gapcheck.mjs` (id boşluk testi), `shop-imgdim.mjs` (PNG/JPEG boyut), `shop-build.mjs` (products-index + match-tr), `shop-probe1.mjs`, `shop-probe2.mjs`.
Toplam: 299 önbellekli HTML yanıtı, 9 HEAD, 3 görsel, robots/sitemap/dil-para uç nokta denemeleri.

## 10. Açık sorular ve önerilerim

1. **Ana kaynak hangisi?** Öneri: Türkiye ürünleri için panel API / TR xlsx (barkod, TRY fiyat, TR ad); bu site yalnızca Rusça `description`/`content`, kategori ağacı ve yedek görsel için.
2. **Tüm 1676 ürün mü, yalnızca TR 38+3 mü?** Öneri: yalnızca TR aktif ürünler `products.json`'a girsin (karar kullanıcıda).
3. **Kategori ağacı:** Site ağacı (13/66/84 düğüm) 37 ürünlük katalog için aşırı geniş; öneri: TR ürünlerinin kullandığı ~10 kategoriyle sade ağaç + çevrilmiş adlar.
4. **Eşleşmeyen 4 ürün** (KLA128, DAC056, DAB089, NWA052): site karşılığı yok/belirsiz; Rusça içerik panel API'den (`content`) alınmalı. DAB089/NWA052 olası karşılıkları kullanıcıdan onaylanmalı.
5. **Görsel kalitesi:** `greenleaf-global.com/data/files/goods/...` görsellerinin boyutunu ölçmek (sonraki iş); ≤ 800 px site görselleri yalnızca yedek.
6. **Fiyat kuralı:** Taslak "liste = güncel × 2" ile RU sitedeki ×3 oranı birbirini doğrulamıyor; RU fiyatı referans alınmamalı.
7. **robots.txt `limit`/`page` yasağı:** Üretimde yazılı izin notu veya 16'lı sayfalama.
