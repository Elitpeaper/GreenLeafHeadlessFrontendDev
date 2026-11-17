# Bileşen — Header arama + kategori birleşimi ve tüm sayfalar menüsü (K-268, K-266, K-269)

> ui-tasarimci · v1 · 2026-11-17 · `header.md` v1'in §2 madde 2–3, §3 ve §5'ini günceller (geri kalanı geçerli). Dayanak: K-268 (kategoriler arama çubuğuyla birleşir), K-266 (planlanan ve var olan tüm sayfalar menüden erişilir; footer tek başına yetmez), K-269 (`/sss` menüde), K-064/K-077 (görselli mega menü korunur), K-147 (alt satır yapışkan değil), K-264 (hareket tam açık varsayılan).

## 1. Karar özeti
- **Tek "arama kapsülü"** (pill, 48 px): `[ ▦ Kategoriler ] [ Tümü ▾ | arama girişi | Ara ]`. Sol kapak **mega menü tetiği** (gezinme), ortadaki segment **arama kapsamı seçici** (filtre). İkisi görsel olarak tek gövdedir, işlev olarak ayrıdır: biri bir yere **gider**, diğeri aramayı **daraltır**. Neden: tek düğmeye iki iş yüklemek (hem gezinme hem kapsam) belirsiz tıklama sonucu üretir; Amazon/Hepsiburada/Trendyol kullanıcıları "arama içi kategori seçici + ayrı kategori menüsü" kalıbını tanıyor (dönüşüm, öğrenme maliyeti sıfır). Mega menü korunur (K-064), ama artık aramaya **bağlıdır**: kapsülün parçası olarak açılır, bulunduğun kök kategori kapsamı varsayılan yapar.
- **"Keşfet" menüsü** (K-266): alt gezinme satırının sağında ve kompakt hâlde ana satırda bir **sayfalar paneli**; SAYFA-HARITASI'ndaki her kullanıcıya açık sayfa burada. Mobil çekmecede aynı liste.
- Önizleme alternatifi (Kapı 2'de kullanıcı seçer, varsayılan A): **B** = kapsülde yalnız kapsam seçici; mega menü tetiği alt gezinme satırının ilk öğesi "▦ Tüm kategoriler" olur (kompakt hâlde ana satırın solunda ikon düğme). `?headerSearch=b`.

## 2. Masaüstü (≥ 1024 px) — kapsül anatomisi
| # | Parça | Ölçü | Görünüm | Davranış |
|---|---|---|---|---|
| 1 | **Kategoriler kapağı** | 48 px yükseklik; ≥ 1280: ikon + "Kategoriler" (≈ 140 px); 1024–1279: yalnız ikon 48 px (`aria-label="Kategoriler"`) | green-700 zemin, beyaz metin/ikon (5.35), kapsülün sol yuvarlak ucu; açıkken green-800 + ikon ✕ | Mega menü panelini açar (mevcut niyet gecikmeleri, Esc, dış tıklama, K-091). `aria-expanded`, `aria-controls` |
| 2 | **Kapsam seçici** | 48 px; etiket en çok 120 px, taşarsa `…` | surface zemin, ink metin, sağda chevron; segmentler arası 1 px `line-strong` ayraç | Açılır liste (popover, 280 px): "Tüm ürünler" + ürünü olan kök kategoriler (ikon 20 px + ad + ürün sayısı ink-muted). Seçim girişe odak verir. `button[aria-haspopup=listbox]` + `role=listbox`, ↑/↓/Home/End/Enter/Esc, tip-ileri arama (ilk harf) |
| 3 | **Arama girişi** | esnek, en az 240 px | yer tutucu kapsama göre: "Ürün, marka veya ürün kodu ara" / "Cilt Bakımı'nda ara" | Mevcut combobox (anlık panel, `/` kısayolu) aynen; panel isteği kapsamı taşır |
| 4 | **Ara düğmesi** | 48 × 48, sağ uç | büyüteç ikon; hover green-50 | Gönderim |
Kapsül toplam: en az 440, en çok 640 px. Kapsülün çerçevesi `line-strong`; odak herhangi bir parçadaysa kapsül çerçevesi green-700 + gölge `card` (focus-within), parça içi odak halkası blue-700 (K-072 değişmez).

### 2.1 Kapsam kuralları
- Varsayılan "Tüm ürünler". `/kategori/{kok}` ve altındaki sayfalarda varsayılan o kök; sayfadan çıkınca "Tüm ürünler"e döner (oturum boyunca saklanmaz — beklenmedik daraltılmış sonuç riski).
- Anlık panel başlığı kapsamı söyler: "Cilt Bakımı'nda 12 sonuç" + panel altında **"Tüm ürünlerde ara →"** bağlantısı (kapsam sıfır sonuç verdiğinde panelin en üstünde).
- Gönderim: `/arama?q=…&kok={kok}` (kapsam "Tüm ürünler" ise `kok` yok). Sonuç sayfasında kapsam bir **kaldırılabilir çip** ("Kategori: Cilt Bakımı ✕") olarak görünür.
- Veri: kapsam listesi menü verisinden (`MenuRoot[]`); ürünü olmayan kök listede yok (K-026).

### 2.2 Mega menü bağlantısı
- Panel kapsülün **altına** hizalı açılır (tam genişlik panel korunur; üçgen koridor K-091 korunur).
- Panelde kök satırının sağında, hover/odakta görünen küçük metin bağlantısı yok — gezinme ile kapsam karışmasın. Tek köprü: panel alt şeridinde "Bu kategoride ara" düğmesi → kapsamı etkin köke ayarlar, paneli kapatır, girişe odak verir.
- Panel alt şeridinin sağında **"Tüm sayfalar →"** bağlantısı Keşfet panelini açar (K-266'nın masaüstü ikinci yolu).

### 2.3 Ana satır yeni sırası
Logo · **kapsül** · ikon grubu (Hesap, Favoriler, Sepet) · "Üye ol". Ayrı "Kategoriler" düğmesi kaldırılır (kapsülün kapağı oldu). Kompakt hâlde (alt satır kaydırılınca) ikon grubunun soluna **"Keşfet"** ikon düğmesi (Lucide `compass`, 48 px, `aria-label="Tüm sayfalar"`) eklenir; alt satır görünürken bu düğme gizlidir (tekrar yok).

## 3. Alt gezinme satırı (≥ 1024 px, yapışkan değil — K-147)
Sol: Tüm ürünler · Türkiye'de satışta · Setler · Cilt tipine göre (yaprak ikonu) · Blog · Haberler.
Sağ: **PV nedir?** (PV çipi, lime-700) · SSS · **Keşfet ▾** (Keşfet panelini açar).
"Sertifikalar" buradan Keşfet paneline taşınır (yer açmak için; Keşfet'te ve footer'da kalır).

## 4. Keşfet paneli — tüm sayfalar (K-266)
Alt satırdaki "Keşfet ▾", kompakt hâldeki pusula düğmesi ve mega menü alt şeridindeki "Tüm sayfalar →" aynı paneli açar. 4 sütun, `container.wide`, beyaz zemin, üstte thin bant; sütun başlığı xs 600 tracked ink-muted, bağlantılar base 500 ink, 44 px satır. Panel sağında 280 px fotoğraf karosu (`nature.sunlit-branch`, scrim üstünde "Cilt tipine uygun ürünleri bul →").

| Alışveriş | Rehber | Greenleaf | Yardım ve yasal |
|---|---|---|---|
| Tüm ürünler `/urunler` | Cilt tipine göre `/cilt-tipine-gore` | Hakkımızda `/hakkimizda` | SSS `/sss` |
| Türkiye'de satışta `/koleksiyon/turkiyede-satista` | ↳ Kuru · Yağlı · Karma · Normal · Hassas `/cilt-tipine-gore/{tip}` (tek satırda çip dizisi) | İletişim `/hakkimizda#iletisim` | KVKK aydınlatma metni `/yasal/kvkk-aydinlatma-metni` |
| Premium koleksiyon `/koleksiyon/premium-gold` | PV nedir? `/pv-nedir` | Sertifikalar `/sertifikalar` | Çerez politikası `/yasal/cerez-politikasi` |
| Diğer koleksiyonlar (veriden, `storefront.ts` tanımlı ve boş olmayanlar) | Greenleaf iş fırsatı `/pv-nedir#is-firsati` | Üye ol `/uye-ol` | Kullanım koşulları `/yasal/kullanim-kosullari` |
| Setler `/kategori/setler` | Blog `/blog` | Greenleaf üye girişi (dış, yeni sekme, ↗ ikonu) | E-posta açık rıza metni `/yasal/e-posta-acik-riza` |
| Favoriler `/favoriler` (sayaçlı) | Haberler `/haberler` | | |

- **Hazır olmayan sayfa** (içerik yok, yasal metin bekliyor vb.): bağlantı yine **gerçek sayfaya** gider (o sayfa K-181 "Çok yakında" ekranını gösterir) ve satırda `ComingSoonBadge` bulunur. `#`, boş veya ölü bağlantı yok (K-182). Dış bağlantı yer tutucuysa satır pasif + "Çok yakında" (K-208 ile aynı).
- **Kapsam dışı** (menüye girmez): `/arama` (sonuç sayfası), `/urun/*`, 404/500, `/yakinda` ara sayfası, `/svg-kutuphanesi`, `/hareket-lab*` (iç araçlar, noindex). P2 sayfaları (ödeme, hesap, mesafeli satış) yapılmadıkça menüde yok — sayfası olmayan öğe K-182'yi ihlal eder.
- **Tek kaynak:** liste kod içinde iki kez yazılmaz; `src/config/` altında tek `siteNav` tanımı (grup, etiket anahtarı, href, `soon`, `external`) Keşfet paneli, mobil çekmece ve footer tarafından okunur. Böylece yeni sayfa tek yerde eklenince her menüde görünür (K-266'nın kalıcı güvencesi).
- Erişilebilirlik: tetik `button[aria-expanded][aria-controls]`, panel `nav aria-label="Tüm sayfalar"`, Esc kapatır ve odağı tetiğe döndürür, Tab sırası sütun sütun. Açıkken Lenis `stop()` (K-258, mega menüyle aynı).

## 5. Mobil (< 1024 px)
- Satır değişmez: hamburger · logo · arama ikonu · sepet. Arama ikonu tam ekran arama sayfası açar (`SearchBox variant="sheet"`); sayfanın üstünde girişin altında **yatay kaydırılabilir kapsam çip şeridi** ("Tümü" + kök çipleri, 36 px çip / 44 px dokunma alanı, seçili çip green-700 dolu + beyaz). Popover yerine çip: tek elle kullanım ve görünür seçenek.
- Çekmece (`MobileNav`) sırası: (1) arama kısayolu satırı ("Ürün ara" → arama sayfası) · (2) **Kategoriler** (mevcut kök → alt kayan panel, görselli) · (3) **Keşfet** — §4'teki 4 grup, katlanabilir başlıklar (ilk ikisi açık), aynı `siteNav` kaynağı · (4) "Üye ol" birincil düğme + "Greenleaf üye girişi". Footer'a gerek kalmadan her sayfa çekmeceden ≤ 2 dokunuşla erişilir.
- Kategori sayfasındayken arama sayfası açılırsa o kök çipi seçili gelir (§2.1 ile aynı kural).

## 6. Durumlar
Kapsül: varsayılan · kapsam seçili (etiket + yer tutucu değişir) · kapsam listesi açık · mega açık (kapak basılı) · anlık panel açık · yükleniyor (panelde iskelet) · sonuç yok (kapsamlıysa "Tüm ürünlerde ara" öne çıkar) · ağ hatası ("Arama şu an yanıt vermiyor, Enter ile sonuç sayfasına git"). Keşfet: kapalı · açık · "Çok yakında" satırı.

## 7. Hareket noktaları (→ hareket-tasarimcisi; yalnız işaret)
Kapsam seçici chevron dönüşü ve liste açılışı · kapsam değişince yer tutucunun yumuşak değişimi · Keşfet paneli açılışı (mega menüyle aynı dil) · kompakt hâlde pusula düğmesinin belirişi · mobil kapsam çiplerinin seçim geçişi. K-231: hepsi yumuşak geçişli.

## 8. Kabul ölçütleri
- SAYFA-HARITASI'ndaki (P0/P1) her kullanıcı sayfası + `/sss`, `/urunler`, `/blog`, `/haberler`, koleksiyonlar header/Keşfet/mobil çekmeceden erişilebilir; footer'ı gizleyince de erişim kaybolmaz.
- Kapsamlı arama: `/kategori/cilt-bakimi`'de "krem" yazınca panel yalnız Cilt Bakımı sonuçlarını, "Tüm ürünlerde ara" bağlantısını gösterir; Enter → `/arama?q=krem&kok=cilt-bakimi`, sonuçta kaldırılabilir kapsam çipi.
- Klavye: Tab sırası Logo → Kategoriler kapağı → Kapsam → Giriş → Ara → ikonlar → Üye ol; tüm popover'lar Esc ile kapanır, odak geri döner. 1024 px'te kapsül taşmaz (kapak ikon-only, kapsam etiketi kısaltılır).
