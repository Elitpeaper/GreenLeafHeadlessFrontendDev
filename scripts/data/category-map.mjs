// Consumer category taxonomy = K-050 (ONAYLI, docs/plan/BILGI-MIMARISI.md): 12 roots, 2 levels.
// The RU-path RULES below were written against an earlier 12-root draft ("legacy" slugs); migrate() translates every result to the K-050 slugs,
// so the rules stay readable and only the MIGRATE table is K-050-specific. Edit only here; the pipeline regenerates everything.

/** [slug, title_tr, [ [childSlug, childTitle_tr], ... ]] in menu order (K-050 order). (+) = child not listed in BILGI-MIMARISI (ÖNERİ, see DOGRULAMA-RAPORU). */
export const CONSUMER = [
  ['cilt-bakimi', 'Cilt Bakımı', [['yuz-temizleyiciler', 'Yüz Temizleyiciler'], ['tonik-ve-losyonlar', 'Tonik ve Losyonlar'], ['serumlar', 'Serumlar ve Yüz Yağları'], ['nemlendiriciler', 'Nemlendiriciler ve Kremler'], ['yuz-maskeleri', 'Yüz Maskeleri'], ['goz-cevresi', 'Göz Çevresi Bakımı'], ['dudak-bakimi', 'Dudak Bakımı'], ['gunes-koruma', 'Güneş Koruma'], ['erkek-cilt-bakimi', 'Erkek Cilt Bakımı']]],
  ['makyaj', 'Makyaj', [['yuz-makyaji', 'Yüz Makyajı'], ['goz-makyaji', 'Göz Makyajı'], ['kas', 'Kaş'], ['dudak-makyaji', 'Dudak Makyajı'], ['makyaj-aksesuarlari', 'Makyaj Aksesuarları']]],
  ['sac-bakimi', 'Saç Bakımı', [['sampuanlar', 'Şampuanlar'], ['sac-kremleri', 'Saç Kremleri'], ['sac-maskesi-ve-yaglari', 'Saç Maskesi ve Bakım Yağları'], ['sac-boyalari', 'Saç Boyaları'], ['sekillendiriciler', 'Şekillendiriciler']]],
  ['vucut-bakimi', 'Vücut Bakımı', [['dus-jelleri', 'Duş Jelleri'], ['sivi-sabunlar', 'Sıvı Sabunlar'], ['kati-sabunlar', 'Katı Sabunlar'], ['vucut-kremleri', 'Vücut Kremi ve Losyonları'], ['el-bakimi', 'El Bakımı'], ['ayak-bakimi', 'Ayak Bakımı'], ['tiras-ve-tuy-alma', 'Tıraş ve Tüy Alma'], ['deodorant-parfum', 'Deodorantlar ve Parfümler'], ['banyo-aksesuarlari', 'Banyo Aksesuarları']]],
  ['agiz-ve-dis-bakimi', 'Ağız ve Diş Bakımı', [['dis-macunlari', 'Diş Macunları'], ['dis-fircalari', 'Diş Fırçaları'], ['dis-ipi-ve-agiz-bakimi', 'Diş İpi ve Ağız Bakımı']]],
  ['setler', 'Setler', [['baslangic-setleri', 'Başlangıç Setleri'], ['bakim-setleri', 'Bakım Setleri']]],
  ['ev-ve-temizlik', 'Ev ve Temizlik', [['camasir-deterjanlari', 'Çamaşır Deterjanları'], ['camasir-yardimcilari', 'Yumuşatıcı ve Çamaşır Yardımcıları'], ['bulasik', 'Bulaşık Deterjanları'], ['mutfak-temizleyiciler', 'Mutfak ve Yüzey Temizleyiciler'], ['kirec-ve-gider', 'Kireç ve Gider Açıcılar'], ['oda-kokulari', 'Oda Kokuları'], ['temizlik-aksesuarlari', 'Temizlik Bezleri ve Aksesuarları'], ['hasere-kovucular', 'Haşere Kovucular']]],
  ['anne-ve-cocuk', 'Anne ve Çocuk', [['bebek-bezi', 'Bebek Bezleri'], ['cocuk-agiz-bakimi', 'Çocuk Ağız Bakımı'], ['cocuk-banyo-cilt', 'Çocuk Banyo ve Cilt Bakımı'], ['bebek-mendil', 'Bebek Mendilleri'], ['beslenme-gerecleri', 'Beslenme ve Bakım Gereçleri'], ['cocuk-giyim', 'Çocuk Giyim']]],
  ['hijyen-ve-kagit', 'Hijyen ve Kâğıt Ürünleri', [['kadin-hijyeni', 'Kadın Hijyeni'], ['kagit-mendil', 'Kâğıt ve Islak Mendiller'], ['tuvalet-kagidi', 'Tuvalet Kâğıdı'], ['pamuk', 'Pamuk ve Kulak Çubuğu']]],
  ['saglik-ve-takviye', 'Sağlık ve Takviye', [['gida-takviyeleri', 'Gıda Takviyeleri'], ['vitaminler', 'Vitaminler'], ['masaj', 'Masaj Ürünleri'], ['bant-ve-yamalar', 'Bant ve Yamalar'], ['diger-saglik-urunleri', 'Diğer Sağlık Ürünleri']]], // (+) bant-ve-yamalar, diger-saglik-urunleri: K-067 publishes what K-053 had excluded
  ['mutfak-ve-gida', 'Mutfak ve Gıda', [['mutfak-gerecleri', 'Mutfak Gereçleri'], ['cay-ve-icecek', 'Çay ve İçecekler'], ['gida', 'Gıda']]],
  ['giyim-ve-aksesuar', 'Giyim ve Aksesuar', [['kadin-giyim', 'Kadın İç Giyim ve Çorap'], ['erkek-giyim', 'Erkek İç Giyim ve Çorap'], ['havlular', 'Havlular'], ['terlikler', 'Terlikler'], ['ayakkabi-bakimi', 'Ayakkabı Bakımı'], ['gozlukler', 'Gözlükler'], ['valiz-ve-semsiye', 'Çanta, Valiz ve Şemsiye'], ['tarak-ve-fircalar', 'Saç Fırçası ve Taraklar'], ['arac-ve-kirtasiye', 'Araç ve Kırtasiye']]],
];

/** legacy parent -> { legacy child -> [K-050 parent, K-050 child] }; "_" = parent only. */
const M = (p, c) => [p, c];
const MIGRATE = {
  'cilt-bakimi': { _: M('cilt-bakimi', null), 'yuz-kremleri': M('cilt-bakimi', 'nemlendiriciler'), serumlar: M('cilt-bakimi', 'serumlar'), temizleme: M('cilt-bakimi', 'yuz-temizleyiciler'), maskeler: M('cilt-bakimi', 'yuz-maskeleri'), 'tonik-losyon': M('cilt-bakimi', 'tonik-ve-losyonlar'), 'goz-cevresi': M('cilt-bakimi', 'goz-cevresi'), 'gunes-korumasi': M('cilt-bakimi', 'gunes-koruma'), 'dudak-bakimi': M('cilt-bakimi', 'dudak-bakimi'), 'yuz-yaglari': M('cilt-bakimi', 'serumlar'), 'bakim-setleri': M('setler', 'bakim-setleri') },
  'sac-bakimi': { _: M('sac-bakimi', null), sampuan: M('sac-bakimi', 'sampuanlar'), 'sac-kremi': M('sac-bakimi', 'sac-kremleri'), 'sac-maskesi-yagi': M('sac-bakimi', 'sac-maskesi-ve-yaglari'), 'sac-boyasi': M('sac-bakimi', 'sac-boyalari'), sekillendirme: M('sac-bakimi', 'sekillendiriciler') },
  makyaj: { _: M('makyaj', null), 'yuz-makyaji': M('makyaj', 'yuz-makyaji'), 'goz-makyaji': M('makyaj', 'goz-makyaji'), 'dudak-makyaji': M('makyaj', 'dudak-makyaji'), 'kas-kirpik': M('makyaj', 'kas'), 'makyaj-aksesuarlari': M('makyaj', 'makyaj-aksesuarlari') },
  'agiz-bakimi': { _: M('agiz-ve-dis-bakimi', null), 'dis-macunlari': M('agiz-ve-dis-bakimi', 'dis-macunlari'), 'dis-fircalari': M('agiz-ve-dis-bakimi', 'dis-fircalari'), 'dis-ipi': M('agiz-ve-dis-bakimi', 'dis-ipi-ve-agiz-bakimi'), 'gargara-sprey': M('agiz-ve-dis-bakimi', 'dis-ipi-ve-agiz-bakimi') },
  'el-vucut': { _: M('vucut-bakimi', null), 'el-bakimi': M('vucut-bakimi', 'el-bakimi'), 'vucut-bakimi': M('vucut-bakimi', 'vucut-kremleri'), 'ayak-bakimi': M('vucut-bakimi', 'ayak-bakimi'), 'dus-jeli': M('vucut-bakimi', 'dus-jelleri'), 'sivi-sabun': M('vucut-bakimi', 'sivi-sabunlar'), 'kati-sabun': M('vucut-bakimi', 'kati-sabunlar'), banyo: M('vucut-bakimi', 'banyo-aksesuarlari'), 'dus-aksesuarlari': M('vucut-bakimi', 'banyo-aksesuarlari'), 'kadin-hijyeni': M('hijyen-ve-kagit', 'kadin-hijyeni'), 'tiras-tuy-alma': M('vucut-bakimi', 'tiras-ve-tuy-alma'), 'parfum-deodorant': M('vucut-bakimi', 'deodorant-parfum') },
  'kagit-urunler': { _: M('hijyen-ve-kagit', null), 'tuvalet-kagidi': M('hijyen-ve-kagit', 'tuvalet-kagidi'), 'mendil-havlu': M('hijyen-ve-kagit', 'kagit-mendil'), 'islak-mendil': M('hijyen-ve-kagit', 'kagit-mendil'), 'pamuk-disk': M('hijyen-ve-kagit', 'pamuk') },
  'ev-temizlik': { _: M('ev-ve-temizlik', null), camasir: M('ev-ve-temizlik', 'camasir-deterjanlari'), bulasik: M('ev-ve-temizlik', 'bulasik'), 'mutfak-temizligi': M('ev-ve-temizlik', 'mutfak-temizleyiciler'), 'zemin-yuzey': M('ev-ve-temizlik', 'mutfak-temizleyiciler'), 'temizlik-aksesuarlari': M('ev-ve-temizlik', 'temizlik-aksesuarlari'), 'poset-film': M('ev-ve-temizlik', 'temizlik-aksesuarlari'), 'ev-kokulari': M('ev-ve-temizlik', 'oda-kokulari'), 'bocek-kontrolu': M('ev-ve-temizlik', 'hasere-kovucular') },
  'bebek-cocuk': { _: M('anne-ve-cocuk', null), 'bebek-bezi': M('anne-ve-cocuk', 'bebek-bezi'), 'bebek-bakimi': M('anne-ve-cocuk', 'cocuk-banyo-cilt'), 'cocuk-agiz-bakimi': M('anne-ve-cocuk', 'cocuk-agiz-bakimi'), 'bebek-islak-mendil': M('anne-ve-cocuk', 'bebek-mendil'), 'cocuk-giyim': M('anne-ve-cocuk', 'cocuk-giyim'), 'cocuk-sofra': M('anne-ve-cocuk', 'beslenme-gerecleri') },
  saglik: { _: M('saglik-ve-takviye', null), takviyeler: M('saglik-ve-takviye', 'gida-takviyeleri'), vitaminler: M('saglik-ve-takviye', 'vitaminler'), 'masaj-merhem': M('saglik-ve-takviye', 'masaj'), 'bant-pansuman': M('saglik-ve-takviye', 'bant-ve-yamalar'), 'bocek-isirigi': M('ev-ve-temizlik', 'hasere-kovucular') },
  erkek: { _: M('cilt-bakimi', 'erkek-cilt-bakimi'), 'erkek-bakimi': M('cilt-bakimi', 'erkek-cilt-bakimi'), tiras: M('vucut-bakimi', 'tiras-ve-tuy-alma'), 'erkek-saglik': M('saglik-ve-takviye', 'diger-saglik-urunleri') },
  'giyim-tekstil': { _: M('giyim-ve-aksesuar', null), 'kadin-giyim': M('giyim-ve-aksesuar', 'kadin-giyim'), 'erkek-giyim': M('giyim-ve-aksesuar', 'erkek-giyim'), havlu: M('giyim-ve-aksesuar', 'havlular') },
  'ayakkabi-aksesuar': { _: M('giyim-ve-aksesuar', null), terlik: M('giyim-ve-aksesuar', 'terlikler'), 'ayakkabi-bakimi': M('giyim-ve-aksesuar', 'ayakkabi-bakimi'), gozluk: M('giyim-ve-aksesuar', 'gozlukler'), 'semsiye-bavul': M('giyim-ve-aksesuar', 'valiz-ve-semsiye'), tarak: M('giyim-ve-aksesuar', 'tarak-ve-fircalar'), 'oto-aksesuar': M('giyim-ve-aksesuar', 'arac-ve-kirtasiye'), kirtasiye: M('giyim-ve-aksesuar', 'arac-ve-kirtasiye') },
  'mutfak-gida': { _: M('mutfak-ve-gida', null), 'sofra-mutfak': M('mutfak-ve-gida', 'mutfak-gerecleri'), icecek: M('mutfak-ve-gida', 'cay-ve-icecek'), gida: M('mutfak-ve-gida', 'gida') },
  setler: { _: M('setler', null), 'baslangic-setleri': M('setler', 'baslangic-setleri') },
};
/** legacy (parent, child) -> K-050 {parent, child}. Throws on an unknown legacy slug so nothing is silently dropped. */
export function migrate(parent, child) {
  const t = MIGRATE[parent]; if (!t) throw new Error('migrate: unknown legacy parent ' + parent);
  const r = child ? t[child] : t._; if (!r) throw new Error('migrate: unknown legacy child ' + parent + '/' + child);
  return { parent: r[0], child: r[1] };
}

/** TR catalog category (Katalog) -> K-050 consumer parent slug. */
export const TR_CATALOG_TO_PARENT = {
  'Cilt Bakımı': 'cilt-bakimi', 'Saç Bakımı': 'sac-bakimi', 'Ağız Bakımı': 'agiz-ve-dis-bakimi', 'El & Vücut': 'vucut-bakimi', 'Ev & Temizlik': 'ev-ve-temizlik',
  'Bebek & Çocuk': 'anne-ve-cocuk', 'Kağıt Ürünler': 'hijyen-ve-kagit', 'Sağlık': 'saglik-ve-takviye', 'Setler': 'setler',
};
/** Per-code overrides (K-050 slugs) for TR records without a usable source mapping; highest priority (SEMA §2). */
export const TR_CODE_OVERRIDES = {
  DAC056: ['ev-ve-temizlik', 'mutfak-temizleyiciler'], T001: ['setler', 'baslangic-setleri'], T003: ['setler', 'baslangic-setleri'], T006: ['setler', 'baslangic-setleri'], SBE042: ['setler', 'bakim-setleri'],
  // placement of the TR products as listed in BILGI-MIMARISI §2 (TR örnek columns)
  ASB044: ['vucut-bakimi', 'vucut-kremleri'], ASB045: ['vucut-bakimi', 'vucut-kremleri'], DAB087: ['vucut-bakimi', 'vucut-kremleri'],
  CBE034: ['cilt-bakimi', 'serumlar'], DAB089: ['cilt-bakimi', 'nemlendiriciler'], FPA151: ['cilt-bakimi', 'nemlendiriciler'],
  ASF066: ['ev-ve-temizlik', 'camasir-yardimcilari'], EAA022: ['anne-ve-cocuk', 'cocuk-agiz-bakimi'], KLA128: ['hijyen-ve-kagit', 'kagit-mendil'],
  NWA052: ['saglik-ve-takviye', 'gida-takviyeleri'],
};

// Rules: exact RU path (" > " joined). Longest/most specific match wins; L2 and L1 act as fallbacks.
const R = (p, a, b = null) => [p, a, b];
export const RULES = [
  // ---- Уход за домом
  R('Уход за домом', 'ev-temizlik'),
  R('Уход за домом > Аксессуары для уборки', 'ev-temizlik', 'temizlik-aksesuarlari'),
  R('Уход за домом > Дом', 'ev-temizlik', 'zemin-yuzey'),
  R('Уход за домом > Дом > Ароматизаторы для дома', 'ev-temizlik', 'ev-kokulari'),
  R('Уход за домом > Дом > Пакеты, пленка, целлофан', 'ev-temizlik', 'poset-film'),
  R('Уход за домом > Кухня', 'ev-temizlik', 'mutfak-temizligi'),
  R('Уход за домом > Кухня > Средство для мытья посуды', 'ev-temizlik', 'bulasik'),
  R('Уход за домом > Кухня > Салфетки для уборки', 'ev-temizlik', 'temizlik-aksesuarlari'),
  R('Уход за домом > Средства от насекомых', 'ev-temizlik', 'bocek-kontrolu'),
  R('Уход за домом > Стирка', 'ev-temizlik', 'camasir'),
  R('Уход за домом > Туалет', 'ev-temizlik', 'zemin-yuzey'),
  // ---- Уходовая косметика
  R('Уходовая косметика', 'cilt-bakimi'),
  R('Уходовая косметика > Волосы', 'sac-bakimi'),
  R('Уходовая косметика > Волосы > Шампунь', 'sac-bakimi', 'sampuan'),
  R('Уходовая косметика > Волосы > Кондиционер-ополаскиватель', 'sac-bakimi', 'sac-kremi'),
  R('Уходовая косметика > Волосы > Маска', 'sac-bakimi', 'sac-maskesi-yagi'),
  R('Уходовая косметика > Волосы > Масло', 'sac-bakimi', 'sac-maskesi-yagi'),
  R('Уходовая косметика > Волосы > Краска для волос', 'sac-bakimi', 'sac-boyasi'),
  R('Уходовая косметика > Волосы > Лосьон', 'sac-bakimi', 'sac-maskesi-yagi'),
  R('Уходовая косметика > Волосы > Для укладки', 'sac-bakimi', 'sekillendirme'),
  R('Уходовая косметика > Глаза', 'cilt-bakimi', 'goz-cevresi'),
  R('Уходовая косметика > Защита от солнца', 'cilt-bakimi', 'gunes-korumasi'),
  R('Уходовая косметика > Лицо', 'cilt-bakimi', 'yuz-kremleri'),
  R('Уходовая косметика > Лицо > Бальзам для губ', 'cilt-bakimi', 'dudak-bakimi'),
  R('Уходовая косметика > Лицо > Косметические наборы', 'cilt-bakimi', 'bakim-setleri'),
  R('Уходовая косметика > Лицо > Крема', 'cilt-bakimi', 'yuz-kremleri'),
  R('Уходовая косметика > Лицо > Лосьон', 'cilt-bakimi', 'tonik-losyon'),
  R('Уходовая косметика > Лицо > Маска косметическая', 'cilt-bakimi', 'maskeler'),
  R('Уходовая косметика > Лицо > Масло для лица', 'cilt-bakimi', 'yuz-yaglari'),
  R('Уходовая косметика > Лицо > Основа под макияж', 'makyaj', 'yuz-makyaji'),
  R('Уходовая косметика > Лицо > Скраб для лица', 'cilt-bakimi', 'temizleme'),
  R('Уходовая косметика > Лицо > Снятие макияжа', 'cilt-bakimi', 'temizleme'),
  R('Уходовая косметика > Лицо > Средство для умывания', 'cilt-bakimi', 'temizleme'),
  R('Уходовая косметика > Лицо > Сыворотка', 'cilt-bakimi', 'serumlar'),
  R('Уходовая косметика > Ноги', 'el-vucut', 'ayak-bakimi'),
  R('Уходовая косметика > Руки', 'el-vucut', 'el-bakimi'),
  R('Уходовая косметика > Тело', 'el-vucut', 'vucut-bakimi'),
  R('Уходовая косметика > Тело > Депиляция', 'el-vucut', 'tiras-tuy-alma'),
  R('Уходовая косметика > Парфюмерия', 'el-vucut', 'parfum-deodorant'),
  // ---- Гигиена
  R('Гигиена', 'el-vucut'),
  R('Гигиена > Женская', 'el-vucut', 'kadin-hijyeni'),
  R('Гигиена > Женская > Бритвы', 'el-vucut', 'tiras-tuy-alma'),
  R('Гигиена > Личная', 'el-vucut'),
  R('Гигиена > Личная > Бомбочки для ванны', 'el-vucut', 'banyo'),
  R('Гигиена > Личная > Гели для душа', 'el-vucut', 'dus-jeli'),
  R('Гигиена > Личная > Дезодоранты', 'el-vucut', 'parfum-deodorant'),
  R('Гигиена > Личная > Жидкое мыло', 'el-vucut', 'sivi-sabun'),
  R('Гигиена > Личная > Инструменты', 'el-vucut', 'tiras-tuy-alma'),
  R('Гигиена > Личная > Мочалки для душа', 'el-vucut', 'dus-aksesuarlari'),
  R('Гигиена > Личная > Твердое мыло', 'el-vucut', 'kati-sabun'),
  R('Гигиена > Полости рта', 'agiz-bakimi'),
  R('Гигиена > Полости рта > Зубные нити', 'agiz-bakimi', 'dis-ipi'),
  R('Гигиена > Полости рта > Зубные пасты', 'agiz-bakimi', 'dis-macunlari'),
  R('Гигиена > Полости рта > Зубные щетки', 'agiz-bakimi', 'dis-fircalari'),
  R('Гигиена > Полости рта > Ополаскиватели', 'agiz-bakimi', 'gargara-sprey'),
  R('Гигиена > Полости рта > Спреи', 'agiz-bakimi', 'gargara-sprey'),
  R('Гигиена > Полости рта > Дополнительный уход', 'agiz-bakimi', 'gargara-sprey'),
  R('Гигиена > Салфетки и бумага', 'kagit-urunler'),
  R('Гигиена > Салфетки и бумага > Ватные диски и палочки', 'kagit-urunler', 'pamuk-disk'),
  R('Гигиена > Салфетки и бумага > Влажные салфетки', 'kagit-urunler', 'islak-mendil'),
  R('Гигиена > Салфетки и бумага > Салфетки, полотенца, платочки', 'kagit-urunler', 'mendil-havlu'),
  R('Гигиена > Салфетки и бумага > Туалетная бумага', 'kagit-urunler', 'tuvalet-kagidi'),
  // ---- Макияж
  R('Макияж', 'makyaj'),
  R('Макияж > Аксессуары для макияжа', 'makyaj', 'makyaj-aksesuarlari'),
  R('Макияж > Брови', 'makyaj', 'kas-kirpik'),
  R('Макияж > Глаза', 'makyaj', 'goz-makyaji'),
  R('Макияж > Глаза > Ресницы', 'makyaj', 'goz-makyaji'),
  R('Макияж > Губы', 'makyaj', 'dudak-makyaji'),
  R('Макияж > Лицо', 'makyaj', 'yuz-makyaji'),
  // ---- Аксессуары
  R('Аксессуары', 'ayakkabi-aksesuar'),
  R('Аксессуары > Для автомобиля', 'ayakkabi-aksesuar', 'oto-aksesuar'),
  R('Аксессуары > Зонты', 'ayakkabi-aksesuar', 'semsiye-bavul'),
  R('Аксессуары > Очки с защитой', 'ayakkabi-aksesuar', 'gozluk'),
  R('Аксессуары > Расчестка', 'ayakkabi-aksesuar', 'tarak'),
  R('Аксессуары > Солнцезащитные очки', 'ayakkabi-aksesuar', 'gozluk'),
  R('Аксессуары > Чемодан', 'ayakkabi-aksesuar', 'semsiye-bavul'),
  R('Канцелярские товары', 'ayakkabi-aksesuar', 'kirtasiye'),
  // ---- Обувь
  R('Обувь и уход', 'ayakkabi-aksesuar', 'terlik'),
  R('Обувь и уход > Крем для обуви', 'ayakkabi-aksesuar', 'ayakkabi-bakimi'),
  R('Обувь и уход > Стельки', 'ayakkabi-aksesuar', 'ayakkabi-bakimi'),
  R('Обувь и уход > Шарики для обуви', 'ayakkabi-aksesuar', 'ayakkabi-bakimi'),
  // ---- Одежда
  R('Одежда и текстиль', 'giyim-tekstil'),
  R('Одежда и текстиль > Женская', 'giyim-tekstil', 'kadin-giyim'),
  R('Одежда и текстиль > Мужская', 'giyim-tekstil', 'erkek-giyim'),
  R('Одежда и текстиль > Полотенца', 'giyim-tekstil', 'havlu'),
  // ---- Посуда / Продукты
  R('Посуда', 'mutfak-gida', 'sofra-mutfak'),
  R('Продукты и напитки', 'mutfak-gida', 'gida'),
  R('Продукты и напитки > Напитки', 'mutfak-gida', 'icecek'),
  R('Продукты и напитки > Продукты', 'mutfak-gida', 'gida'),
  R('Продукты и напитки > Сахар', 'mutfak-gida', 'gida'),
  // ---- Дети
  R('Товары для детей', 'bebek-cocuk', 'bebek-bakimi'),
  R('Товары для детей > Десткая посуда', 'bebek-cocuk', 'cocuk-sofra'),
  R('Товары для детей > Детские влажные салфетки', 'bebek-cocuk', 'bebek-islak-mendil'),
  R('Товары для детей > Салфетки', 'bebek-cocuk', 'bebek-islak-mendil'),
  R('Товары для детей > Детские зубные пасты', 'bebek-cocuk', 'cocuk-agiz-bakimi'),
  R('Товары для детей > Детские зубные щетки', 'bebek-cocuk', 'cocuk-agiz-bakimi'),
  R('Товары для детей > Зубная паста', 'bebek-cocuk', 'cocuk-agiz-bakimi'),
  R('Товары для детей > Зубная щетка', 'bebek-cocuk', 'cocuk-agiz-bakimi'),
  R('Товары для детей > Подгузники', 'bebek-cocuk', 'bebek-bezi'),
  R('Товары для детей > Детская одежда', 'bebek-cocuk', 'cocuk-giyim'),
  R('Товары для детей > Стирка', 'ev-temizlik', 'camasir'),
  // ---- Здоровье
  R('Товары для здоровья', 'saglik'),
  R('Товары для здоровья > БАДы', 'saglik', 'takviyeler'),
  R('Товары для здоровья > Витамины', 'saglik', 'vitaminler'),
  R('Товары для здоровья > Лечебные пластыри', 'saglik', 'bant-pansuman'),
  R('Товары для здоровья > Массажное средство', 'saglik', 'masaj-merhem'),
  R('Товары для здоровья > Омолаживающий гель', 'saglik', 'masaj-merhem'),
  R('Товары для здоровья > Мази, спреи и др.', 'saglik', 'masaj-merhem'),
  R('Товары для здоровья > Средства от укусов насекомых', 'saglik', 'bocek-isirigi'),
  // ---- Мужчины
  R('Товары для мужчин', 'erkek', 'erkek-bakimi'),
  R('Товары для мужчин > Гигиена', 'erkek', 'tiras'),
  R('Товары для мужчин > Для бритья', 'erkek', 'tiras'),
  R('Товары для мужчин > Для здоровья', 'erkek', 'erkek-saglik'),
  R('Товары для мужчин > Уход', 'erkek', 'erkek-bakimi'),
];


const byPath = new Map(RULES.map((r) => [r[0], r]));
/** Map one RU category path (array or " > " string) to {parent, child} (K-050 slugs); walks up to the nearest rule. */
export function mapPath(p) {
  const parts = Array.isArray(p) ? [...p] : String(p).split(' > ');
  for (let n = parts.length; n >= 1; n--) {
    const r = byPath.get(parts.slice(0, n).join(' > '));
    if (r) return migrate(r[1], r[2] ?? null);
  }
  return null;
}
/** Pick the primary consumer category for a product from its (possibly many) source category paths. */
export function primaryConsumer(paths) {
  let best = null;
  for (const p of paths) {
    const depth = p.split(' > ').length; const m = mapPath(p); if (!m) continue;
    const score = depth * 2 + (m.child ? 1 : 0);
    if (!best || score > best.score) best = { ...m, score, path: p };
  }
  return best;
}
export const CONSUMER_PARENT_TITLE = Object.fromEntries(CONSUMER.map((c) => [c[0], c[1]]));
export const CONSUMER_CHILD_TITLE = Object.fromEntries(CONSUMER.flatMap((c) => c[2].map((k) => [k[0], k[1]])));
