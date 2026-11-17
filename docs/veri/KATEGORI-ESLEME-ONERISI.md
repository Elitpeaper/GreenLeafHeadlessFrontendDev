# Kategori Eşleme (kaynak -> tüketici, K-050)

> Üretici: `scripts/data/05-validate.mjs` (kaynak: `scripts/data/category-map.mjs`). Ağaç K-050 ile ONAYLI; kaynak düğüm eşlemesi veri hattının önerisidir, değişiklik yalnız `category-map.mjs` içinde yapılır.

## Tüketici taksonomisi (2 seviye)

| Ad | Slug | Ürün | TR |
|---|---|---|---|
| **Cilt Bakımı** | `cilt-bakimi` | 253 | 9 |
|   ↳ Yüz Temizleyiciler | `cilt-bakimi/yuz-temizleyiciler` | 38 | 3 |
|   ↳ Tonik ve Losyonlar | `cilt-bakimi/tonik-ve-losyonlar` | 28 | 0 |
|   ↳ Serumlar ve Yüz Yağları | `cilt-bakimi/serumlar` | 41 | 1 |
|   ↳ Nemlendiriciler ve Kremler | `cilt-bakimi/nemlendiriciler` | 66 | 4 |
|   ↳ Yüz Maskeleri | `cilt-bakimi/yuz-maskeleri` | 22 | 1 |
|   ↳ Göz Çevresi Bakımı | `cilt-bakimi/goz-cevresi` | 19 | 0 |
|   ↳ Dudak Bakımı | `cilt-bakimi/dudak-bakimi` | 10 | 0 |
|   ↳ Güneş Koruma | `cilt-bakimi/gunes-koruma` | 8 | 0 |
|   ↳ Erkek Cilt Bakımı | `cilt-bakimi/erkek-cilt-bakimi` | 8 | 0 |
| **Makyaj** | `makyaj` | 81 | 2 |
|   ↳ Yüz Makyajı | `makyaj/yuz-makyaji` | 25 | 1 |
|   ↳ Göz Makyajı | `makyaj/goz-makyaji` | 16 | 1 |
|   ↳ Kaş | `makyaj/kas` | 14 | 0 |
|   ↳ Dudak Makyajı | `makyaj/dudak-makyaji` | 17 | 0 |
|   ↳ Makyaj Aksesuarları | `makyaj/makyaj-aksesuarlari` | 8 | 0 |
| **Saç Bakımı** | `sac-bakimi` | 96 | 5 |
|   ↳ Şampuanlar | `sac-bakimi/sampuanlar` | 51 | 2 |
|   ↳ Saç Kremleri | `sac-bakimi/sac-kremleri` | 13 | 1 |
|   ↳ Saç Maskesi ve Bakım Yağları | `sac-bakimi/sac-maskesi-ve-yaglari` | 13 | 1 |
|   ↳ Saç Boyaları | `sac-bakimi/sac-boyalari` | 12 | 0 |
|   ↳ Şekillendiriciler | `sac-bakimi/sekillendiriciler` | 4 | 1 |
| **Vücut Bakımı** | `vucut-bakimi` | 141 | 10 |
|   ↳ Duş Jelleri | `vucut-bakimi/dus-jelleri` | 34 | 2 |
|   ↳ Sıvı Sabunlar | `vucut-bakimi/sivi-sabunlar` | 26 | 2 |
|   ↳ Katı Sabunlar | `vucut-bakimi/kati-sabunlar` | 8 | 1 |
|   ↳ Vücut Kremi ve Losyonları | `vucut-bakimi/vucut-kremleri` | 26 | 3 |
|   ↳ El Bakımı | `vucut-bakimi/el-bakimi` | 8 | 2 |
|   ↳ Ayak Bakımı | `vucut-bakimi/ayak-bakimi` | 3 | 0 |
|   ↳ Tıraş ve Tüy Alma | `vucut-bakimi/tiras-ve-tuy-alma` | 9 | 0 |
|   ↳ Deodorantlar ve Parfümler | `vucut-bakimi/deodorant-parfum` | 14 | 0 |
|   ↳ Banyo Aksesuarları | `vucut-bakimi/banyo-aksesuarlari` | 11 | 0 |
| **Ağız ve Diş Bakımı** | `agiz-ve-dis-bakimi` | 74 | 4 |
|   ↳ Diş Macunları | `agiz-ve-dis-bakimi/dis-macunlari` | 40 | 2 |
|   ↳ Diş Fırçaları | `agiz-ve-dis-bakimi/dis-fircalari` | 18 | 2 |
|   ↳ Diş İpi ve Ağız Bakımı | `agiz-ve-dis-bakimi/dis-ipi-ve-agiz-bakimi` | 15 | 0 |
| **Setler** | `setler` | 11 | 4 |
|   ↳ Başlangıç Setleri | `setler/baslangic-setleri` | 3 | 3 |
|   ↳ Bakım Setleri | `setler/bakim-setleri` | 8 | 1 |
| **Ev ve Temizlik** | `ev-ve-temizlik` | 216 | 8 |
|   ↳ Çamaşır Deterjanları | `ev-ve-temizlik/camasir-deterjanlari` | 79 | 3 |
|   ↳ Yumuşatıcı ve Çamaşır Yardımcıları | `ev-ve-temizlik/camasir-yardimcilari` | 1 | 1 |
|   ↳ Bulaşık Deterjanları | `ev-ve-temizlik/bulasik` | 14 | 1 |
|   ↳ Mutfak ve Yüzey Temizleyiciler | `ev-ve-temizlik/mutfak-temizleyiciler` | 42 | 3 |
|   ↳ Kireç ve Gider Açıcılar | `ev-ve-temizlik/kirec-ve-gider` | 0 | 0 |
|   ↳ Oda Kokuları | `ev-ve-temizlik/oda-kokulari` | 13 | 0 |
|   ↳ Temizlik Bezleri ve Aksesuarları | `ev-ve-temizlik/temizlik-aksesuarlari` | 40 | 0 |
|   ↳ Haşere Kovucular | `ev-ve-temizlik/hasere-kovucular` | 22 | 0 |
| **Anne ve Çocuk** | `anne-ve-cocuk` | 104 | 3 |
|   ↳ Bebek Bezleri | `anne-ve-cocuk/bebek-bezi` | 16 | 0 |
|   ↳ Çocuk Ağız Bakımı | `anne-ve-cocuk/cocuk-agiz-bakimi` | 24 | 1 |
|   ↳ Çocuk Banyo ve Cilt Bakımı | `anne-ve-cocuk/cocuk-banyo-cilt` | 30 | 2 |
|   ↳ Bebek Mendilleri | `anne-ve-cocuk/bebek-mendil` | 9 | 0 |
|   ↳ Beslenme ve Bakım Gereçleri | `anne-ve-cocuk/beslenme-gerecleri` | 7 | 0 |
|   ↳ Çocuk Giyim | `anne-ve-cocuk/cocuk-giyim` | 18 | 0 |
| **Hijyen ve Kâğıt Ürünleri** | `hijyen-ve-kagit` | 103 | 3 |
|   ↳ Kadın Hijyeni | `hijyen-ve-kagit/kadin-hijyeni` | 59 | 1 |
|   ↳ Kâğıt ve Islak Mendiller | `hijyen-ve-kagit/kagit-mendil` | 27 | 2 |
|   ↳ Tuvalet Kâğıdı | `hijyen-ve-kagit/tuvalet-kagidi` | 9 | 0 |
|   ↳ Pamuk ve Kulak Çubuğu | `hijyen-ve-kagit/pamuk` | 4 | 0 |
| **Sağlık ve Takviye** | `saglik-ve-takviye` | 106 | 1 |
|   ↳ Gıda Takviyeleri | `saglik-ve-takviye/gida-takviyeleri` | 60 | 1 |
|   ↳ Vitaminler | `saglik-ve-takviye/vitaminler` | 14 | 0 |
|   ↳ Masaj Ürünleri | `saglik-ve-takviye/masaj` | 8 | 0 |
|   ↳ Bant ve Yamalar | `saglik-ve-takviye/bant-ve-yamalar` | 14 | 0 |
|   ↳ Diğer Sağlık Ürünleri | `saglik-ve-takviye/diger-saglik-urunleri` | 0 | 0 |
| **Mutfak ve Gıda** | `mutfak-ve-gida` | 81 | 0 |
|   ↳ Mutfak Gereçleri | `mutfak-ve-gida/mutfak-gerecleri` | 48 | 0 |
|   ↳ Çay ve İçecekler | `mutfak-ve-gida/cay-ve-icecek` | 16 | 0 |
|   ↳ Gıda | `mutfak-ve-gida/gida` | 17 | 0 |
| **Giyim ve Aksesuar** | `giyim-ve-aksesuar` | 420 | 2 |
|   ↳ Kadın İç Giyim ve Çorap | `giyim-ve-aksesuar/kadin-giyim` | 71 | 0 |
|   ↳ Erkek İç Giyim ve Çorap | `giyim-ve-aksesuar/erkek-giyim` | 73 | 0 |
|   ↳ Havlular | `giyim-ve-aksesuar/havlular` | 31 | 0 |
|   ↳ Terlikler | `giyim-ve-aksesuar/terlikler` | 110 | 0 |
|   ↳ Ayakkabı Bakımı | `giyim-ve-aksesuar/ayakkabi-bakimi` | 8 | 0 |
|   ↳ Gözlükler | `giyim-ve-aksesuar/gozlukler` | 45 | 2 |
|   ↳ Çanta, Valiz ve Şemsiye | `giyim-ve-aksesuar/valiz-ve-semsiye` | 24 | 0 |
|   ↳ Saç Fırçası ve Taraklar | `giyim-ve-aksesuar/tarak-ve-fircalar` | 12 | 0 |
|   ↳ Araç ve Kırtasiye | `giyim-ve-aksesuar/arac-ve-kirtasiye` | 7 | 0 |

## Kaynak düğüm eşlemesi

| Kaynak yolu (RU) | Ürün | Tüketici kategorisi |
|---|---|---|
| Уход за домом | 202 | ev-ve-temizlik |
| Уход за домом > Аксессуары для уборки | 20 | ev-ve-temizlik/temizlik-aksesuarlari |
| Уход за домом > Дом | 41 | ev-ve-temizlik/mutfak-temizleyiciler |
| Уход за домом > Дом > Ароматизаторы для дома | 13 | ev-ve-temizlik/oda-kokulari |
| Уход за домом > Дом > Пакеты, пленка, целлофан | 11 | ev-ve-temizlik/temizlik-aksesuarlari |
| Уход за домом > Дом > Средства для мытья полов | 6 | ev-ve-temizlik/mutfak-temizleyiciler |
| Уход за домом > Дом > Средства для удаления накипи | 3 | ev-ve-temizlik/mutfak-temizleyiciler |
| Уход за домом > Дом > Чистка труб | 5 | ev-ve-temizlik/mutfak-temizleyiciler |
| Уход за домом > Кухня | 47 | ev-ve-temizlik/mutfak-temizleyiciler |
| Уход за домом > Кухня > Салфетки для уборки | 9 | ev-ve-temizlik/temizlik-aksesuarlari |
| Уход за домом > Кухня > Средство для мытья посуды | 15 | ev-ve-temizlik/bulasik |
| Уход за домом > Кухня > Чистящее средство для кухни | 12 | ev-ve-temizlik/mutfak-temizleyiciler |
| Уход за домом > Средства от насекомых | 18 | ev-ve-temizlik/hasere-kovucular |
| Уход за домом > Стирка | 78 | ev-ve-temizlik/camasir-deterjanlari |
| Уход за домом > Стирка > Для стиральной машины | 3 | ev-ve-temizlik/camasir-deterjanlari |
| Уход за домом > Стирка > Жидкое средство для стирки | 33 | ev-ve-temizlik/camasir-deterjanlari |
| Уход за домом > Стирка > Кондиционер для белья | 6 | ev-ve-temizlik/camasir-deterjanlari |
| Уход за домом > Стирка > Листы для стирки разноцветного белья | 7 | ev-ve-temizlik/camasir-deterjanlari |
| Уход за домом > Стирка > Мыло для стирки | 7 | ev-ve-temizlik/camasir-deterjanlari |
| Уход за домом > Стирка > Стиральный порошок | 14 | ev-ve-temizlik/camasir-deterjanlari |
| Уход за домом > Туалет | 6 | ev-ve-temizlik/mutfak-temizleyiciler |
| Уходовая косметика | 405 | cilt-bakimi |
| Уходовая косметика > Волосы | 94 | sac-bakimi |
| Уходовая косметика > Волосы > Для укладки | 3 | sac-bakimi/sekillendiriciler |
| Уходовая косметика > Волосы > Кондиционер-ополаскиватель | 13 | sac-bakimi/sac-kremleri |
| Уходовая косметика > Волосы > Краска для волос | 12 | sac-bakimi/sac-boyalari |
| Уходовая косметика > Волосы > Лосьон | 5 | sac-bakimi/sac-maskesi-ve-yaglari |
| Уходовая косметика > Волосы > Маска | 4 | sac-bakimi/sac-maskesi-ve-yaglari |
| Уходовая косметика > Волосы > Масло | 3 | sac-bakimi/sac-maskesi-ve-yaglari |
| Уходовая косметика > Волосы > Шампунь | 51 | sac-bakimi/sampuanlar |
| Уходовая косметика > Глаза | 19 | cilt-bakimi/goz-cevresi |
| Уходовая косметика > Глаза > Крема для глаз | 9 | cilt-bakimi/goz-cevresi |
| Уходовая косметика > Глаза > Маски согревающие | 5 | cilt-bakimi/goz-cevresi |
| Уходовая косметика > Глаза > Патчи для глаз | 5 | cilt-bakimi/goz-cevresi |
| Уходовая косметика > Защита от солнца | 8 | cilt-bakimi/gunes-koruma |
| Уходовая косметика > Лицо | 210 | cilt-bakimi/nemlendiriciler |
| Уходовая косметика > Лицо > Бальзам для губ | 10 | cilt-bakimi/dudak-bakimi |
| Уходовая косметика > Лицо > Косметические наборы | 7 | setler/bakim-setleri |
| Уходовая косметика > Лицо > Крема | 43 | cilt-bakimi/nemlendiriciler |
| Уходовая косметика > Лицо > Лосьон | 28 | cilt-bakimi/tonik-ve-losyonlar |
| Уходовая косметика > Лицо > Маска косметическая | 22 | cilt-bakimi/yuz-maskeleri |
| Уходовая косметика > Лицо > Масло для лица | 3 | cilt-bakimi/serumlar |
| Уходовая косметика > Лицо > Основа под макияж | 3 | makyaj/yuz-makyaji |
| Уходовая косметика > Лицо > Скраб для лица | 3 | cilt-bakimi/yuz-temizleyiciler |
| Уходовая косметика > Лицо > Снятие макияжа | 5 | cilt-bakimi/yuz-temizleyiciler |
| Уходовая косметика > Лицо > Средство для умывания | 29 | cilt-bakimi/yuz-temizleyiciler |
| Уходовая косметика > Лицо > Сыворотка | 38 | cilt-bakimi/serumlar |
| Уходовая косметика > Ноги | 4 | vucut-bakimi/ayak-bakimi |
| Уходовая косметика > Ноги > Спрей для ног | 1 | vucut-bakimi/ayak-bakimi |
| Уходовая косметика > Руки | 8 | vucut-bakimi/el-bakimi |
| Уходовая косметика > Руки > Крем для рук | 8 | vucut-bakimi/el-bakimi |
| Уходовая косметика > Тело | 28 | vucut-bakimi/vucut-kremleri |
| Уходовая косметика > Тело > Гель | 5 | vucut-bakimi/vucut-kremleri |
| Уходовая косметика > Тело > Крем для тела | 18 | vucut-bakimi/vucut-kremleri |
| Уходовая косметика > Тело > Скраб | 1 | vucut-bakimi/vucut-kremleri |
| Уходовая косметика > Тело > Спрей | 1 | vucut-bakimi/vucut-kremleri |
| Уходовая косметика > Тело > Депиляция | 3 | vucut-bakimi/tiras-ve-tuy-alma |
| Уходовая косметика > Парфюмерия | 13 | vucut-bakimi/deodorant-parfum |
| Гигиена | 288 | vucut-bakimi |
| Гигиена > Женская | 58 | hijyen-ve-kagit/kadin-hijyeni |
| Гигиена > Женская > Бритвы | 2 | vucut-bakimi/tiras-ve-tuy-alma |
| Гигиена > Женская > Прокладки | 54 | hijyen-ve-kagit/kadin-hijyeni |
| Гигиена > Женская > Растворы | 5 | hijyen-ve-kagit/kadin-hijyeni |
| Гигиена > Личная | 85 | vucut-bakimi |
| Гигиена > Личная > Бомбочки для ванны | 4 | vucut-bakimi/banyo-aksesuarlari |
| Гигиена > Личная > Гели для душа | 34 | vucut-bakimi/dus-jelleri |
| Гигиена > Личная > Дезодоранты | 2 | vucut-bakimi/deodorant-parfum |
| Гигиена > Личная > Жидкое мыло | 26 | vucut-bakimi/sivi-sabunlar |
| Гигиена > Личная > Инструменты | 2 | vucut-bakimi/tiras-ve-tuy-alma |
| Гигиена > Личная > Мочалки для душа | 7 | vucut-bakimi/banyo-aksesuarlari |
| Гигиена > Личная > Твердое мыло | 10 | vucut-bakimi/kati-sabunlar |
| Гигиена > Полости рта | 96 | agiz-ve-dis-bakimi |
| Гигиена > Полости рта > Зубные нити | 7 | agiz-ve-dis-bakimi/dis-ipi-ve-agiz-bakimi |
| Гигиена > Полости рта > Зубные пасты | 41 | agiz-ve-dis-bakimi/dis-macunlari |
| Гигиена > Полости рта > Зубные щетки | 24 | agiz-ve-dis-bakimi/dis-fircalari |
| Гигиена > Полости рта > Ополаскиватели | 4 | agiz-ve-dis-bakimi/dis-ipi-ve-agiz-bakimi |
| Гигиена > Полости рта > Спреи | 3 | agiz-ve-dis-bakimi/dis-ipi-ve-agiz-bakimi |
| Гигиена > Полости рта > Дополнительный уход | 1 | agiz-ve-dis-bakimi/dis-ipi-ve-agiz-bakimi |
| Гигиена > Салфетки и бумага | 49 | hijyen-ve-kagit |
| Гигиена > Салфетки и бумага > Ватные диски и палочки | 4 | hijyen-ve-kagit/pamuk |
| Гигиена > Салфетки и бумага > Влажные салфетки | 4 | hijyen-ve-kagit/kagit-mendil |
| Гигиена > Салфетки и бумага > Салфетки, полотенца, платочки | 22 | hijyen-ve-kagit/kagit-mendil |
| Гигиена > Салфетки и бумага > Туалетная бумага | 10 | hijyen-ve-kagit/tuvalet-kagidi |
| Макияж | 86 | makyaj |
| Макияж > Аксессуары для макияжа | 9 | makyaj/makyaj-aksesuarlari |
| Макияж > Брови | 15 | makyaj/kas |
| Макияж > Брови > Окрашивание бровей | 8 | makyaj/kas |
| Макияж > Брови > Уход за ресницами и бровями | 3 | makyaj/kas |
| Макияж > Глаза | 17 | makyaj/goz-makyaji |
| Макияж > Глаза > Подводка для глаз | 4 | makyaj/goz-makyaji |
| Макияж > Глаза > Тени для глаз | 5 | makyaj/goz-makyaji |
| Макияж > Глаза > Ресницы | 7 | makyaj/goz-makyaji |
| Макияж > Губы | 23 | makyaj/dudak-makyaji |
| Макияж > Губы > Помада для губ | 16 | makyaj/dudak-makyaji |
| Макияж > Лицо | 31 | makyaj/yuz-makyaji |
| Макияж > Лицо > Консилер | 4 | makyaj/yuz-makyaji |
| Макияж > Лицо > Основа под макияж | 3 | makyaj/yuz-makyaji |
| Макияж > Лицо > Пудра | 4 | makyaj/yuz-makyaji |
| Макияж > Лицо > Тональное средство | 13 | makyaj/yuz-makyaji |
| Аксессуары | 124 | giyim-ve-aksesuar |
| Аксессуары > Для автомобиля | 5 | giyim-ve-aksesuar/arac-ve-kirtasiye |
| Аксессуары > Зонты | 6 | giyim-ve-aksesuar/valiz-ve-semsiye |
| Аксессуары > Очки с защитой | 31 | giyim-ve-aksesuar/gozlukler |
| Аксессуары > Расчестка | 12 | giyim-ve-aksesuar/tarak-ve-fircalar |
| Аксессуары > Солнцезащитные очки | 26 | giyim-ve-aksesuar/gozlukler |
| Аксессуары > Чемодан | 18 | giyim-ve-aksesuar/valiz-ve-semsiye |
| Канцелярские товары | 4 | giyim-ve-aksesuar/arac-ve-kirtasiye |
| Обувь и уход | 118 | giyim-ve-aksesuar/terlikler |
| Обувь и уход > Женские тапочки | 55 | giyim-ve-aksesuar/terlikler |
| Обувь и уход > Крем для обуви | 5 | giyim-ve-aksesuar/ayakkabi-bakimi |
| Обувь и уход > Мужские тапочки | 44 | giyim-ve-aksesuar/terlikler |
| Обувь и уход > Стельки | 1 | giyim-ve-aksesuar/ayakkabi-bakimi |
| Обувь и уход > Шарики для обуви | 2 | giyim-ve-aksesuar/ayakkabi-bakimi |
| Одежда и текстиль | 190 | giyim-ve-aksesuar |
| Одежда и текстиль > Женская | 86 | giyim-ve-aksesuar/kadin-giyim |
| Одежда и текстиль > Женская > Женские гольфы | 3 | giyim-ve-aksesuar/kadin-giyim |
| Одежда и текстиль > Женская > Женские носки | 24 | giyim-ve-aksesuar/kadin-giyim |
| Одежда и текстиль > Женская > Женское нижнее белье | 29 | giyim-ve-aksesuar/kadin-giyim |
| Одежда и текстиль > Женская > Колготки | 5 | giyim-ve-aksesuar/kadin-giyim |
| Одежда и текстиль > Мужская | 57 | giyim-ve-aksesuar/erkek-giyim |
| Одежда и текстиль > Мужская > Галстуки | 15 | giyim-ve-aksesuar/erkek-giyim |
| Одежда и текстиль > Мужская > Мужские гольфы | 3 | giyim-ve-aksesuar/erkek-giyim |
| Одежда и текстиль > Мужская > Мужские носки | 19 | giyim-ve-aksesuar/erkek-giyim |
| Одежда и текстиль > Мужская > Мужские трусы | 36 | giyim-ve-aksesuar/erkek-giyim |
| Одежда и текстиль > Полотенца | 31 | giyim-ve-aksesuar/havlular |
| Посуда | 52 | mutfak-ve-gida/mutfak-gerecleri |
| Продукты и напитки | 34 | mutfak-ve-gida/gida |
| Продукты и напитки > Напитки | 16 | mutfak-ve-gida/cay-ve-icecek |
| Продукты и напитки > Продукты | 7 | mutfak-ve-gida/gida |
| Продукты и напитки > Сахар | 6 | mutfak-ve-gida/gida |
| Товары для детей | 92 | anne-ve-cocuk/cocuk-banyo-cilt |
| Товары для детей > Десткая посуда | 7 | anne-ve-cocuk/beslenme-gerecleri |
| Товары для детей > Детские влажные салфетки | 9 | anne-ve-cocuk/bebek-mendil |
| Товары для детей > Детские зубные пасты | 16 | anne-ve-cocuk/cocuk-agiz-bakimi |
| Товары для детей > Детские зубные щетки | 9 | anne-ve-cocuk/cocuk-agiz-bakimi |
| Товары для детей > Зубная паста | 10 | anne-ve-cocuk/cocuk-agiz-bakimi |
| Товары для детей > Зубная щетка | 6 | anne-ve-cocuk/cocuk-agiz-bakimi |
| Товары для детей > Крем | 6 | anne-ve-cocuk/cocuk-banyo-cilt |
| Товары для детей > Молочко для тела | 2 | anne-ve-cocuk/cocuk-banyo-cilt |
| Товары для детей > Пена для ванны | 1 | anne-ve-cocuk/cocuk-banyo-cilt |
| Товары для детей > Подгузники | 16 | anne-ve-cocuk/bebek-bezi |
| Товары для детей > Предметы ухода | 2 | anne-ve-cocuk/cocuk-banyo-cilt |
| Товары для детей > Салфетки | 4 | anne-ve-cocuk/bebek-mendil |
| Товары для детей > Стирка | 3 | ev-ve-temizlik/camasir-deterjanlari |
| Товары для детей > Шампунь, Гель | 11 | anne-ve-cocuk/cocuk-banyo-cilt |
| Товары для детей > Детская одежда | 22 | anne-ve-cocuk/cocuk-giyim |
| Товары для здоровья | 117 | saglik-ve-takviye |
| Товары для здоровья > БАДы | 60 | saglik-ve-takviye/gida-takviyeleri |
| Товары для здоровья > Витамины | 15 | saglik-ve-takviye/vitaminler |
| Товары для здоровья > Лечебные пластыри | 14 | saglik-ve-takviye/bant-ve-yamalar |
| Товары для здоровья > Массажное средство | 3 | saglik-ve-takviye/masaj |
| Товары для здоровья > Омолаживающий гель | 1 | saglik-ve-takviye/masaj |
| Товары для здоровья > Средства от укусов насекомых | 4 | ev-ve-temizlik/hasere-kovucular |
| Товары для здоровья > Мази, спреи и др. | 5 | saglik-ve-takviye/masaj |
| Товары для мужчин | 13 | cilt-bakimi/erkek-cilt-bakimi |
| Товары для мужчин > Гигиена | 2 | vucut-bakimi/tiras-ve-tuy-alma |
| Товары для мужчин > Гигиена > Бритвы | 2 | vucut-bakimi/tiras-ve-tuy-alma |
| Товары для мужчин > Для бритья | 2 | vucut-bakimi/tiras-ve-tuy-alma |
| Товары для мужчин > Для здоровья | 1 | saglik-ve-takviye/diger-saglik-urunleri |
| Товары для мужчин > Уход | 9 | cilt-bakimi/erkek-cilt-bakimi |
| Товары для мужчин > Уход > Крем | 0 | cilt-bakimi/erkek-cilt-bakimi |
| Товары для мужчин > Уход > Лосьон | 0 | cilt-bakimi/erkek-cilt-bakimi |
| Товары для мужчин > Уход > Сыворотка | 0 | cilt-bakimi/erkek-cilt-bakimi |
| Товары для мужчин > Уход > Натуральные решения для лучшей жизни | 2 | cilt-bakimi/erkek-cilt-bakimi |

## Notlar

- Bir ürün birden çok kaynak kategoride olabilir; birincil kategori en derin eşleşen yoldur.
- TR kayıtlarında ana kategori Ağustos kataloğundan, alt kategori mağaza eşleşmesinden gelir (ana kategoriler çelişirse alt kategori boş kalır).
- Ağaç = K-050 (ONAYLI, `docs/plan/BILGI-MIMARISI.md`): 12 kök, 2 seviye. Eski "Erkek" kökü yoktur: erkek bakım → Cilt Bakımı/Erkek Cilt Bakımı, tıraş → Vücut Bakımı/Tıraş ve Tüy Alma, erkek sağlık → Sağlık ve Takviye/Diğer Sağlık Ürünleri.