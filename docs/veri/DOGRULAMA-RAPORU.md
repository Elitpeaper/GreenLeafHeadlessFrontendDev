# Veri Doğrulama Raporu

> Üretici: `scripts/data/05-validate.mjs` (otomatik, her çalıştırmada yeniden yazılır). Bu dosyayı elle düzenlemeyin.

**Durum:** Hata yok — data/*.json yazıldı · Uyarı: 12 · Tarama: TAMAM

## 1. Sayılar

| Metrik | Değer |
|---|---|
| Toplam ürün kaydı | 1686 |
| Satışta (availability=tr) | 51 |
| Yakında (availability=yakinda) | 1635 |
| Kaynak mağaza ürünü (index + SHOP_EXTRA_IDS) | 1677 |
| TR kaydı (panel ∪ xlsx) | 51 |
| TR kaydı mağaza eşleşmeli | 39 |
| TR kaydı mağazada bulunamayan | 12 (DAB089, DAC056, CBA034, T006, T003, LPA025/CDA025, SBE042, KLA128, , LGD012, NWA052, T001) |
| Marka (tanımlı) | 28 |
| Tüketici kategorisi (ana/alt) | 12 / 68 |
| Kaynak kategori düğümü | 164 |
| boxQty ayrıştırılan | 57 |
| to-translate.json kayıt | 0 |
| LIST_PRICE_MULTIPLIER | 2 |

### Tüketici ana kategorilerine göre

| Kategori | Ürün | Satışta (TR) |
|---|---|---|
| Cilt Bakımı | 253 | 9 |
| Makyaj | 81 | 2 |
| Saç Bakımı | 96 | 5 |
| Vücut Bakımı | 141 | 10 |
| Ağız ve Diş Bakımı | 74 | 4 |
| Setler | 11 | 4 |
| Ev ve Temizlik | 216 | 8 |
| Anne ve Çocuk | 104 | 3 |
| Hijyen ve Kâğıt Ürünleri | 103 | 3 |
| Sağlık ve Takviye | 106 | 1 |
| Mutfak ve Gıda | 81 | 0 |
| Giyim ve Aksesuar | 420 | 2 |

### Markalara göre

| Marka | Ürün | TR |
|---|---|---|
| Greenleaf | 426 | 3 |
| CARICH | 244 | 16 |
| SEALUXE | 228 | 7 |
| KARDLI | 196 | 0 |
| iLiFE | 193 | 16 |
| Nilrich | 76 | 1 |
| MARVISIA | 62 | 2 |
| YIBEILE | 50 | 3 |
| MAIWEIS | 46 | 0 |
| Pink Point | 29 | 1 |
| OKFAD | 22 | 0 |
| BLUE POINT | 16 | 1 |
| JIADELI | 10 | 0 |
| BERCLEAN | 10 | 0 |
| YUE ZHONGGUI | 10 | 0 |
| SUTING | 9 | 0 |
| YIJIAN | 8 | 0 |
| NEWITZ | 8 | 0 |
| MOREFUTURE | 7 | 0 |
| LIMANCY | 6 | 0 |
| KAILANDUO | 5 | 0 |
| ZHENGAI | 5 | 0 |
| MIAOROU | 5 | 0 |
| MOON FLORE | 4 | 0 |
| MARION | 4 | 0 |
| EASYLOVE | 3 | 0 |
| SUREFIRE | 3 | 0 |
| JINGHUXI | 1 | 1 |

## 2. Hatalar (yazımı engeller)

_Yok._

## 3. Uyarılar

- quiz tags: cilt-bakimi 253 (TR 9); without skinType 42 (TR 0), without routineStep 12 (TR 0); TR without skinType: -
- 3 TR products without PV: LGD012, LPA025/CDA025, SBE042
- 5 TR products without any image: tr-3857, LGD012, CBA034, LPA025/CDA025, SBE042
- content layer (EL): 1686 products with Turkish content; contentReview set on 552; regulated=true on 153 (editor gate before publishing, K-024/R-08)
- excluded nonProduct (catalog/marketing material): MKT001, W0001-03, KAT053/A
- 155 yakinda products without PV (shop page shows no bonus points) - K-062 cannot be met for them without a rule
- 1 products without model code
- 8 products with corrupted name ("???")
- 5 products without image
- 11 images derived from thumbnail URL (-250x250 -> -800x800)
- 3 RU short descriptions contain medical-claim words (icerik-editoru must neutralise during localisation)
- TRY/PV outliers: XNA038, CBA034, T003, T006, KLA128

## 4. Ayrıntılar

- **Görseli olmayan:** 5 → tr-3857, LGD012, CBA034, LPA025/CDA025, SBE042
- **Görsel küçük resimden türetilen (ürün sayfası çekilemeyen):** 11
- **Model kodu olmayan:** 1 → tr-3857
- **Ad bozuk ("???") olan:** 8 → gl-2271, gl-2266, gl-2265, gl-2264, gl-2260, gl-2259, gl-2251, gl-2243
- **Tekrar eden slug:** 0 · **tekrar eden id:** 0 · **tekrar eden barkod:** 0
- **Tekrar eden model kodu:** 0
- **Aynı Rusça başlığa sahip kayıt grubu:** 86 (farklı kod/varyant olabilir; sorun değil, bilgi amaçlı)
- **Koli ifadesi addan çıkarılamadı (boxQty yok ama addan "коробк" geçiyor):** 6 → gl-1053: SEALUXE Коробка для роскошного набора по уходу за кожей ; gl-916: GREENLEAF Средство от тараканов/приманка в коробочке (3 пластинки в коробке) 0.05% фипронил ; gl-2297: XUJI Лавандовый влагопоглотитель 230г х 3 коробки ; gl-219: SUTING Хлопковые дышащие гигиенические прокладки, 24 пачки в коробке ; gl-1699: Набор ножей в коробочке ; gl-1715: Коробка для салфеток Kalishi с круглой бамбуковой крышкой
- **Temiz addan "коробк" geçmeye devam eden:** 6
- **Kısa açıklaması boş (yakında):** 21
- **Eşleşmeyen / boş kaynak kategori düğümü:** eşlenmeyen 0, ürünsüz 3 → Товары для мужчин > Уход > Крем ; Товары для мужчин > Уход > Лосьон ; Товары для мужчин > Уход > Сыворотка
- **Tanınmayan Latin marka adayı (ilk kelime, markasız "greenleaf" altında):** HOME:6 GREEN:4 SHOUXIZI:3 MEOWEQLO:3 MEIWEISHI:3 MAIVIS:3 ZHENXI:2 PINK:2 POWDER:2 MALIAN:2 ZHANGHUA:2 HUAYUEQING:2 QIANSEWAN:2 BULE:2 AVANCER:2 BOCARE:2 MOREREAL:2 JIUYANG:2 BAONASI:2 XUEFUYUN:1 SONPHESKIN:1 LYMANCY:1 JELLYBEAN:1 JIEJIAREN:1 PREDAWN:1 YUIZKUE:1 SINOS:1 BAOZHONGBAO:1 LUYE:1 XUJI:1 MIAROU:1 JING:1 KADRLI:1 MEISHIDUO:1 AISHANSHI:1 XISIJIE:1 CASTERLY:1 JIADELISANG:1
- **Mağazadan ürün sayfası alınamayan (HTTP/robots):** 0

### needsReview bayrakları

| Bayrak | Adet |
|---|---|
| pv-missing | 158 |
| no-short-description | 21 |
| no-shop-match | 12 |
| no-catalog-text | 11 |
| image-derived-from-thumb | 11 |
| not-in-xlsx | 10 |
| name-conflict | 10 |
| name-corrupt | 8 |
| price-client-not-2x | 6 |
| no-image | 5 |
| category-from-shop | 5 |
| category-guess | 4 |
| panel-missing | 4 |
| price-client-not-above-member | 3 |
| no-code | 1 |
| price-implausible | 1 |

### TR kayıtları — eşleşme ve ad çatışması

| Kod | Mağaza id | Mağaza (RU) adı |
|---|---|---|
| ASF066 | 5525 | iLiFE Антибактериальное хозяйственное мыло |
| EAA022 | 5842 | YIBEILE Детская зубная паста со вкусом апельсина 80г |
| YBA045 | 5310 | YIBEILE Детский шампунь и гель для душа 2 в 1 |
| ASA017 | 1623 | iLiFE Многофункциональный гель для стирки (цветочный аромат) 1 кг |
| ASB044 | 999 | iLiFE Увлажняющий гель с алоэ вера, 180 г |
| XNA038 | 5932 | SEALUXE Клей-карандаш для подводки глаз, 60 мг, Цвет черного чая |
| DAB089 | - | - |
| CBB017 | 1232 | CARICH Мыло с эфирными маслами Бинчотан ручной работы, 100г |
| CBF014 | 1171 | CARICH Увлажняющий крем для рук с алоэ вера, 50 г |
| CBF015 | 1170 | CARICH Крем для рук, 50 г |
| DAC056 | - | - |
| ASF054 | 994 | iLiFE Многофункциональный стиральный порошок, 2кг |
| DAA062 | 985 | iLiFE Зубная паста на основе натуральных морских водорослей, 120 гр |
| DAA108 | 983 | iLiFE Жидкое мыло-пенка для рук с алоэ вера 500 мл |
| ASF053 | 995 | iLiFE Многофункциональный гель для стирки, 1000 мл |
| CBE034 | 988 | CARICH Молочко с витамином E |
| CBA034 | - | - |
| FPA151 | 5441 | PINK POINT Жемчужный крем для макияжа, 50 г |
| T006 | - | - |
| T003 | - | - |
| CBA052 | 1188 | CARICH Ароматизированный гель для душа, 500 мл |
| LGI019 | 2233 | Greenleaf 1,25 кг жидкость для мытья посуды с имбирем |
| LPA025/CDA025 | - | - |
| SCA016 | 819 | SEALUXE Крем-пудра естественного оттенка для безупречного макияжа |
| MAI223 | 713 | MARVISIA Y2001 Стильные солнцезащитные очки в металлической оправе пол |
| SBE042 | - | - |
| CAA038 | 1560 | CARICH Имбирный шампунь для придания объема волосам, 450 мл |
| CAB040 | 1555 | CARICH Имбирный бальзам-ополаскиватель для придания объема волосам, 45 |
| CEA069 | 1003 | CARICH Бамбуковые портативные салфетки 18шт/упаковка |
| SAA069 | 1698 | SEALUXE Увлажняющий очищающий бальзам с зеленым чаем, 100 г |
| ASA086 | 5558 | iLiFE Моющее средство с экстрактом бамбука |
| KLA128 | - | - |
| DAA109 | 1165 | iLiFE Гель для душа увлажняющий и освежающий, 500 мл |
| ASB045 | 998 | iLiFE Восстановливающий Гель Алоэ, 50 г |
| ASB047 | 996 | iLiFE Жидкое мыло-пенка для рук с ромашкой 500 мл |
| ASB046 | 997 | iLiFE Крем для лица с протеином и медом (SOD) |
| DAB087 | 982 | iLiFE Розовый гель алоэ вера |
| ASF055 | 992 | iLiFE Моющее средство для посуды, 1 л |
| CAA039 | 2066 | CARICH шампунь с цветочным ароматом 1 кг |
| LGZ042 | 932 | JINGHUXI Ночные гигиенические прокладки хорошо впитывающие и удерживаю |
|  | - | - |
| SBC053 | 1054 | SEALUXE Увлажняющая маска с алоэ, 25 мл |
| SBJ064 | 1050 | SEALUXE Очищающее желе улучшающее цвет лица, 120 г |
| MAH723 | 706 | MARVISIA RLS190501 Поляризационные солнцезащитные очки TR90 |
| CCA016 | 1186 | CARICH Зубная паста без фтора, 200 г |
| EBB018 | 1180 | YIBEILE Детское молочко для тела с овсяной эссенцией, 200г |
| LGD012 | - | - |
| CCC001 | 112 | OKFAD Зубная щетка с тонкими щетинками с древесным углем, 2 шт |
| CCC029 | 429 | CARICH Зубная щётка с удлинённой угольной щетиной, 10 шт/уп |
| NWA052 | - | - |
| T001 | - | - |

## 5. Kurallar (doğrulanan)

- Fiyat yalnız TR kayıtlarında; üye = panel `base`, liste = panel `client` (üye kademesinden büyükse) yoksa üye × LIST_PRICE_MULTIPLIER (K-036); RUB yalnız `_source.rubPrice` içinde.
- PV tüm ürünlerde (K-062): TR = panel/xlsx; yakında = mağaza bonus puanı / 100 (`pvSource`). Puanı olmayan yakında ürünlerde `pv` null.
- Yakında ürünlerde `price`, `memberPrice` = null (K-038). TR ürün görselleri `public/products/` altında webp (≤ 800 px); yakında görselleri uzak URL. Link canlılığı (HEAD) bu hatta toplu kontrol edilmez.

## 6. Panel dışa aktarımı (`kaynaklar/panel/goods.json`)

| Metrik | Değer |
|---|---|
| Panel kaydı | 62 |
| Dışlanan (test / etkinlik bileti / tabansız `/A`) | 8 |
| `/A` kopyası tabana birleştirilen | 7 |
| Panelden ürün (birleşik) | 47 |
| TR kümesi (panel ∪ xlsx) | 51 |
| — yalnız panelde (yeni, xlsx'te yok) | 10 |
| — yalnız xlsx'te (panelde yok) | 4 |

**Dışlananlar:** 2 (test-record); 7 (test-record, /A); 6 (test-record, /A); 5 (test-record, /A); 6468 (event-ticket, KGZ4000); 6467 (event-ticket, KGZ3500); 6466 (event-ticket, KGZ3000); 6465 (event-ticket, KGZ2500)

**Panel–xlsx üye fiyatı farkı:** yok (ortak 37 kodun hepsinde aynı) · **Panel–xlsx PV farkı:** yok

### Fiyat kademesi tutarsızlıkları (`client` ≠ 2 × `base`)

| Kod | Üye (base) | Müşteri (client) | Durum | Kullanılan liste |
|---|---|---|---|---|
| XNA038 | 1400 | 1400 | client ≤ base → liste = üye × 2 kullanıldı | 2800 |
| CBA034 | 61.46 | 123.3 | client > base ama 2× değil → panel client kademesi kullanıldı | 123.3 |
| T006 | 20250 | 20250 | client ≤ base → liste = üye × 2 kullanıldı | 40500 |
| T003 | 20250 | 20250 | client ≤ base → liste = üye × 2 kullanıldı | 40500 |
| LPA025/CDA025 | 377.36 | 755.1 | client > base ama 2× değil → panel client kademesi kullanıldı | 755.1 |
| SCA016 | 1143.64 | 2286.9 | client > base ama 2× değil → panel client kademesi kullanıldı | 2286.9 |
| MAI223 | 2185.71 | 4371.3 | client > base ama 2× değil → panel client kademesi kullanıldı | 4371.3 |
| panel-3857 | 88.07 | 176.4 | client > base ama 2× değil → panel client kademesi kullanıldı | 176.4 |
| MAH723 | 1478.57 | 2957.4 | client > base ama 2× değil → panel client kademesi kullanıldı | 2957.4 |

### PV doğrulaması (K-062)

- Panel PV × 100 = mağaza bonus puanı: **36/36** eşleşen TR üründe tam eşit (0 fark; mağaza sayfasında puan yok: CEA069). Yani "yakında" ürünlerde `PV = mağaza puanı / 100` kuralı geçerli.
- Yakında ürünler: 1635 · PV türetilen: 1480 · **PV bulunamayan (mağaza sayfasında puan satırı yok): 155** (`pv-missing`).
- TR ürünlerde PV yok: LGD012, LPA025/CDA025, SBE042

## 7. Görsel, palet ve tema

| Metrik | Değer |
|---|---|
| TR ürün, yerel webp görseli olan | 46 / 51 |
| TR ürün, hiç görseli olmayan | tr-3857, LGD012, CBA034, LPA025/CDA025, SBE042 |
| Palet hesaplanan ürün | 1681 / 1686 |
| themeHint = gold | 4 |
| themeHint = premium | 0 |
| … kaynağı anahtar sözcük | 4 |
| … kaynağı palet (yalnız set) | 0 |
| Altın tonlu palet, anahtar sözcüksüz (uygulanmadı) | 81 |
| publishReady = true | 1681 (TR: 46, yakında: 1635) |

**gold / premium işaretli ürünler:** LGH014 (gold, keyword); CBA040 (gold, keyword); CBA041 (gold, keyword); LGL003 (gold, keyword)

## 8. Kategori eşleme notu (K-050)

- 12 kök / 68 alt kategori. BILGI-MIMARISI'nda olmayan, **veri hattının eklediği** alt kategoriler (ÖNERİ): `saglik-ve-takviye/bant-ve-yamalar`, `saglik-ve-takviye/diger-saglik-urunleri` (K-067: RU "Лечебные пластыри", "Мази, спреи", erkek "Для здоровья" artık yayınlanıyor).
- Alt kategorisi boş (yalnız kök) kalan ürün: 78 (hepsi RU kaynakta yalnız kök düğümde duruyor; ağaçta kök sayfasında görünür).
- Ürünsüz alt kategori (menüde gizlenir): ev-ve-temizlik/kirec-ve-gider, saglik-ve-takviye/diger-saglik-urunleri
- TR ürünlerinde `category-guess` (ad tabanlı tahmin, gözden geçirilmeli): tr-3857, LGD012, CBA034, LPA025/CDA025
