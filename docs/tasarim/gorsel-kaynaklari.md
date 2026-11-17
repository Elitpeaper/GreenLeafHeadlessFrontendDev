# Görsel kaynakları ve lisans kaydı (K-102)

> Sahibi: ui-tasarimci · v2 · 2026-11-17 (v1 2026-11-16) · Dayanak: K-102 (AI görsel yok), brandbook fotoğraf yönü (`brandbook-analizi.md`), `tasarim-kurallari.md` §8.2–8.3
> Kural: Bu tabloda olmayan atmosfer/stok görseli siteye girmez. Ürün görselleri (resmî packshot) burada değil, veri hattında (`public/products/`, veri-muhendisi) izlenir.

## Lisans
Tüm dosyalar **Unsplash License** altındadır: https://unsplash.com/license — ticari ve ticari olmayan kullanım serbest, izin ve atıf zorunlu değil (atıf nezaketen önerilir). Yasak olan: fotoğrafları değiştirmeden satmak ve Unsplash'e rakip bir servis kurmak. Her fotoğrafın sayfasında 2026-11-16 tarihinde "Free to use under the Unsplash License" ibaresi kontrol edildi. **Unsplash+ lisanslı fotoğraf yoktur.**

İndirme: `images.unsplash.com` CDN'inden fotoğraf dosyası (Unsplash'in izin verdiği doğrudan dosya erişimi); giriş gerektiren hiçbir yer kullanılmadı. Dönüştürme: sharp → webp (hero ≤ 2400 px, diğerleri ≤ 1200 px; q 60–76), hero için ek 1080×1350 (4:5) mobil kırpım (dikkat-odaklı otomatik kırpım). Bulanık yer tutucu: 32 px webp, `data/content/stock-images.json` → `blurDataURL`.

Seçim ölçütleri: güneşli/ters ışıklı canlı yeşil, mavi gökyüzü aksanı (brandbook s.2, s.8); tanınabilir yüz yok, tanınabilir marka logosu/yazı yok, sonbahar-kahve ve moody tonlar yok (premium-gold slotları hariç, K-065).

## Dosya tablosu
Konum: `public/images/stock/`. Tarih = Unsplash yayın tarihi (UTC) · kontrol tarihi tümü için 2026-11-16.

| Dosya | Slot | Kaynak (fotoğraf sayfası) | Fotoğrafçı | Lisans | Yayın | Alt metin |
|---|---|---|---|---|---|---|
| `hero-canopy-blue-sky.webp` (+ `-mobile`) | `home.hero.1` | https://unsplash.com/photos/fUNmwjAeaE4 | john july (@johnjuly) | [Unsplash License](https://unsplash.com/license) | 2026-05-30 | Mavi gökyüzüne karşı güneşle aydınlanan taze yeşil yapraklar |
| `hero-bright-leaves-sky.webp` (+ `-mobile`) | `home.hero.2` | https://unsplash.com/photos/yTyuEVR8kMc | Daniel Cosmo (@kuzminklk) | [Unsplash License](https://unsplash.com/license) | 2026-05-30 | Berrak mavi gökyüzü önünde parlak yeşil yapraklı dallar |
| `hero-sunburst-leaves.webp` (+ `-mobile`) | `home.hero.3` | https://unsplash.com/photos/9jqwp4Uxufc | Ben sen (@photomatters_ben) | [Unsplash License](https://unsplash.com/license) | 2025-12-08 | Yeşil yaprakların arasından süzülen güneş ışığı ve mavi gökyüzü |
| `story-tree-trunk-canopy.webp` | `brand.story.1` | https://unsplash.com/photos/5Pu59T8Qs0A | engin akyurt (@enginakyurt) | [Unsplash License](https://unsplash.com/license) | 2026-07-06 | Aşağıdan bakışla gövdesi ve canlı yeşil yaprak tacıyla bir ağaç |
| `story-sun-through-branches.webp` | `brand.story.2` | https://unsplash.com/photos/ZIlP3SGjd8U | D. Jameson RAGE (@rage_devil_jameson) | [Unsplash License](https://unsplash.com/license) | 2017-03-16 | Yemyeşil dalların arasından parlayan güneş |
| `membership-hands-fern.webp` | `membership.scene` | https://unsplash.com/photos/x8ZStukS2PM | Noah Buscher (@noahbuscher) | [Unsplash License](https://unsplash.com/license) | 2018-11-19 | Avuç içinde tutulan küçük eğrelti yaprakları |
| `pv-dewdrop-leaf.webp` | `pv.scene` | https://unsplash.com/photos/c1q7RqJ_EP4 | John Thomas (@capturelight) | [Unsplash License](https://unsplash.com/license) | 2018-04-08 | Açık yeşil bir yaprağın üzerinde tek bir su damlası |
| `skin-leaf-water-drops.webp` | `skinFinder.hero` | https://unsplash.com/photos/79RmvVLaZUw | Rohit Morwani (@r0x4n20) | [Unsplash License](https://unsplash.com/license) | 2021-10-25 | Güneşte parlayan yaprak üzerindeki su damlaları |
| `skin-texture-dewy-leaf.webp` | `skinFinder.texture.dewy` | https://unsplash.com/photos/G86MS2ZsiJA | dan carlson (@dan_carl5on) | [Unsplash License](https://unsplash.com/license) | 2015-11-04 | Yaprak yüzeyinde irili ufaklı su damlaları |
| `skin-texture-aloe.webp` | `skinFinder.texture.aloe`, `category.cilt-bakimi` | https://unsplash.com/photos/4dtAkW1IEjA | Polina Grishma (@polina_grishma) | [Unsplash License](https://unsplash.com/license) | 2023-12-12 | Beyaz zemin önünde taze aloe vera yaprakları |
| `premium-gold-backlit-leaf.webp` | `premium.gold.1` | https://unsplash.com/photos/MuPZxlYH4Vk | Rohit Morwani (@r0x4n20) | [Unsplash License](https://unsplash.com/license) | 2020-08-01 | Altın tonlu güneş ışığında parlayan yaprak |
| `premium-gold-sun-bokeh.webp` | `premium.gold.2` | https://unsplash.com/photos/sSzRPHL7g9g | Erika Fletcher (@joyshotsphotography) | [Unsplash License](https://unsplash.com/license) | 2019-05-25 | Yaprakların arasından sızan altın rengi güneş ışığı ve bokeh |
| `cat-makyaj.webp` | `category.makyaj` | https://unsplash.com/photos/weS5yN6P3vE | Edz Norton (@edznorton) | [Unsplash License](https://unsplash.com/license) | 2021-05-30 | Beyaz zemin üzerinde dizili makyaj fırçaları |
| `cat-sac-bakimi.webp` | `category.sac-bakimi` | https://unsplash.com/photos/YCk6jsp8ZLQ | Nataliya Melnychuk (@natinati) | [Unsplash License](https://unsplash.com/license) | 2021-04-06 | Okaliptüs dalı ve ahşap tarak |
| `cat-vucut-bakimi.webp` | `category.vucut-bakimi` | https://unsplash.com/photos/i75xzmj7Vb0 | Sincerely Media (@sincerelymedia) | [Unsplash License](https://unsplash.com/license) | 2020-12-03 | Beyaz zemin üzerinde üst üste dizilmiş beyaz kalıp sabunlar |
| `cat-agiz-ve-dis-bakimi.webp` | `category.agiz-ve-dis-bakimi` | https://unsplash.com/photos/VCC5Vc0X2F8 | Harold Hisona (@harold_angus) | [Unsplash License](https://unsplash.com/license) | 2026-04-29 | Cam kavanozda bambu diş fırçaları ve okaliptüs yaprakları |
| `cat-setler.webp` | `category.setler` | https://unsplash.com/photos/KpWid3vV2nY | Raelle Cameron (@raegocreative) | [Unsplash License](https://unsplash.com/license) | 2022-11-11 | Beyaz kutu üzerinde yeşil kurdele |
| `cat-ev-ve-temizlik.webp` | `category.ev-ve-temizlik` | https://unsplash.com/photos/AJlCQ68ibrY | Charlie Charoenwattana (@charlie1224) | [Unsplash License](https://unsplash.com/license) | 2025-04-25 | Güneşli bir bahçede ipte kuruyan çamaşırlar |
| `cat-anne-ve-cocuk.webp` | `category.anne-ve-cocuk` | https://unsplash.com/photos/Cbe9I1QDxJo | Uby Yanes (@ubyyanes) | [Unsplash License](https://unsplash.com/license) | 2019-10-02 | Askıda duran desenli bebek tulumları |
| `cat-hijyen-ve-kagit.webp` | `category.hijyen-ve-kagit` | https://unsplash.com/photos/kSdi_gqbGGs | Ranurte (@ranurte) | [Unsplash License](https://unsplash.com/license) | 2021-03-22 | Açık zemin önünde beyaz pamuk kozalı dal |
| `cat-saglik-ve-takviye.webp` | `category.saglik-ve-takviye` | https://unsplash.com/photos/9T5FvfnmH_k | Laårk Boshoff (@laarkstudio) | [Unsplash License](https://unsplash.com/license) | 2021-07-28 | Yeşil zemin önünde cam fincanda bitki çayı ve nane yaprakları |
| `cat-mutfak-ve-gida.webp` | `category.mutfak-ve-gida` | https://unsplash.com/photos/wpoKpJqOsKE | Nadine Primeau (@nadineprimeau) | [Unsplash License](https://unsplash.com/license) | 2019-10-29 | Renkli taze sebzeler: domates, patlıcan, biber |
| `cat-giyim-ve-aksesuar.webp` | `category.giyim-ve-aksesuar` | https://unsplash.com/photos/c6D1r0ail8o | Ekaterina Grosheva (@kitkat93) | [Unsplash License](https://unsplash.com/license) | 2021-07-05 | Üst üste katlanmış yeşil ve mavi tonlarda tekstiller |
| `texture-fern-canopy.webp` | `footer.texture` | https://unsplash.com/photos/2x6PJfNWW7Y | Lode Lambert (@lowie) | [Unsplash License](https://unsplash.com/license) | 2018-05-11 | Yukarıdan bakışla yoğun yeşil eğrelti yaprakları |
| `texture-fern-macro.webp` | `emptyState.texture` | https://unsplash.com/photos/CkiWSExXjDU | John Salzarulo (@johnsalzarulo) | [Unsplash License](https://unsplash.com/license) | 2016-09-17 | Yakından eğrelti yaprağı dokusu |

Toplam: 26 slot · 25 kaynak fotoğraf → 25 dosya + 3 hero mobil kırpımı = 28 webp dosyası (~2,8 MB, sayfa başına yalnız ilgili slotlar yüklenir).

### Notlar ve sınırlar
- `cat-ev-ve-temizlik`: fotoğraf Yeni Zelanda'da çekilmiş (Unsplash konum etiketi bir turistik film setini gösteriyor); karede logo, yazı veya tanınabilir yapı yok. Konum adı sitede anılmaz.
- `membership-hands-fern`: yalnız eller var, yüz yok. Model izni gerekmez.
- `category.*` fotoğrafları: kategori sayfası başlık bandı ve mobil mega menü kök kapağı. Raf duvarı karoları v2 ile ayrı `shelf.*` slotlarını kullanır (K-270, kurallar §8.3 v1.4).
- **Resmî Greenleaf görselleri:** global.green-leaf.shop ana sayfası tarandı. Erişilebilen tasarım varlıkları 34–321 px ikon/rozetlerdir (fabrika, aile, formül, tasarruf ikonları; kategori ikonları). Fotoğraf olarak kullanılabilecek büyük görsel yok; slayt banner'ları Rusça metin içeriyor. Bu yüzden atmosfer slotlarında resmî görsel yok. Hikâye bölümünde resmî **fabrika fotoğrafı** tercih edilir (brief §hikâye). Panelden veya brandbook'tan yüksek çözünürlüklü bir fabrika/doğa fotoğrafı gelirse `brand.story.1` slotunun yerine geçer (bkz. ACIK-SORULAR önerisi, rapor).
- Pexels ve Pixabay bu oturumda otomatik erişimi engelledi (403). Bu kaynaklardan görsel alınmadı.


## v2 eki — K-270 fotoğraf yoğunluğu (2026-11-17)
50 yeni fotoğraf, hepsi **Unsplash License** (Unsplash+ yok). Seçim yöntemi: Unsplash arama sayfaları `license=free` filtresiyle tarandı (dikey pin fotoğrafları için ek `orientation=portrait`), adaylar küçük önizlemeyle temas sayfasında gözle elendi (yazı/logo, tanınabilir yüz, moody/sonbahar ton), seçilenlerin **her birinin fotoğraf sayfasında** 2026-11-17 tarihinde "Free to use under the Unsplash License" ibaresi doğrulandı. Dosyalar `images.unsplash.com/photo-…` (Unsplash+ olmayan CDN yolu) üzerinden indirildi.
Dönüştürme: sharp → webp, en uzun kenar sınırı slot türüne göre (§8.2 tasarim-kurallari v1.4), `listing.*` ve `collection.default` 5:2 bant kırpımı (2400×960; arama bandı 2000×800), 32 px webp bulanık yer tutucu manifestte. Toplam ≈ 3,5 MB / 50 dosya; sayfa başına yalnız kendi slotları yüklenir.
Pexels bu partide kullanılmadı (önceki oturumda otomatik erişim 403 vermişti); tüm yeni kaynaklar Unsplash.

Elenen ve neden (tekrar aranmasın): ahşap tarak (oyma marka yazısı + logo), "whitening cream" kavanozlu set (ürün yazısı + iddia çağrışımı), lark/Bamboo Toothbrush/Fabalish/Spruce/Betere marka yazılı kareler, pil yığını fotoğrafları (Duracell vb. logolar), çöp kutuları ("COMPOST/WASTE" yazıları), yüzü seçilen aile fotoğrafları, laboratuvar çalışanı (yüz + tıbbi çağrışım).

### v2 dosya tablosu — 1. parti (33)
| Dosya | Slot | Kaynak (fotoğraf sayfası) | Fotoğrafçı | Lisans | Yayın | Boyut | Alt metin |
|---|---|---|---|---|---|---|---|
| `shelf-cilt-bakimi.webp` | `shelf.cilt-bakimi` | https://unsplash.com/photos/Y89Qfa_H7-o | Maria Kovalets (@marylooo) | [Unsplash License](https://unsplash.com/license) | 2025-01-17 | 1200×800 · 53 KB | Beyaz masada nane yapraklarıyla açık bir krem kavanozu |
| `shelf-makyaj.webp` | `shelf.makyaj` | https://unsplash.com/photos/BuPHrr4rbR0 | Denisa Rama (@denirama) | [Unsplash License](https://unsplash.com/license) | 2025-09-16 | 740×1200 · 52 KB | Mercan rengi pudra üzerinde makyaj fırçası |
| `shelf-sac-bakimi.webp` | `shelf.sac-bakimi` | https://unsplash.com/photos/ArQIWcmOlA8 | Tim Mossholder (@timmossholder) | [Unsplash License](https://unsplash.com/license) | 2017-06-14 | 1200×801 · 72 KB | Güneşli yeşil yaprakların arasında arkası dönük, dalgalı uzun saçlı bir kadın |
| `shelf-vucut-bakimi.webp` | `shelf.vucut-bakimi` | https://unsplash.com/photos/BB3dR-N5Npg | Sven Mieke (@sxoxm) | [Unsplash License](https://unsplash.com/license) | 2019-11-22 | 1200×801 · 62 KB | Pencere önünde katlanmış yeşil havlu ve küçük saksı bitkileri |
| `shelf-agiz-ve-dis-bakimi.webp` | `shelf.agiz-ve-dis-bakimi` | https://unsplash.com/photos/MdtrAEY5-Bg | Superkitina (@superkitina) | [Unsplash License](https://unsplash.com/license) | 2019-03-27 | 800×1200 · 13 KB | Cam kavanozda iki bambu diş fırçası |
| `shelf-setler.webp` | `shelf.setler` | https://unsplash.com/photos/JhgpT1aS9_4 | 光术 山影 (@mrtiger) | [Unsplash License](https://unsplash.com/license) | 2026-06-11 | 800×1200 · 38 KB | Yeşil kurdele ve taze yapraklarla süslenmiş beyaz hediye kutusu |
| `shelf-ev-ve-temizlik.webp` | `shelf.ev-ve-temizlik` | https://unsplash.com/photos/zjasO1yZ6hQ | Daeva miles (@daevamiles) | [Unsplash License](https://unsplash.com/license) | 2020-09-13 | 1200×800 · 30 KB | Masmavi gökyüzü önünde ipte kuruyan çamaşırlar |
| `shelf-anne-ve-cocuk.webp` | `shelf.anne-ve-cocuk` | https://unsplash.com/photos/vOX4XxHo3WI | Ana Curcan (@annaacurcan) | [Unsplash License](https://unsplash.com/license) | 2026-07-01 | 800×1200 · 18 KB | Yetişkin ellerinin arasında minik bebek ayakları |
| `shelf-hijyen-ve-kagit.webp` | `shelf.hijyen-ve-kagit` | https://unsplash.com/photos/qPNgpYUCW0c | Mads Leif Hansen (@mads_leif_hansen) | [Unsplash License](https://unsplash.com/license) | 2025-10-17 | 1200×800 · 65 KB | Üst üste katlanmış temiz beyaz havlular |
| `shelf-saglik-ve-takviye.webp` | `shelf.saglik-ve-takviye` | https://unsplash.com/photos/F2sqk8zB9lI | Jessie Maxwell (@jessiemaxwellphotography) | [Unsplash License](https://unsplash.com/license) | 2025-11-12 | 1200×800 · 80 KB | Güneşli bahçede yeşil bitki çayıyla dolu cam demlik |
| `shelf-mutfak-ve-gida.webp` | `shelf.mutfak-ve-gida` | https://unsplash.com/photos/05kUNZEpzz0 | Ahmet Yüksek (@ahmetyuksek) | [Unsplash License](https://unsplash.com/license) | 2026-10-01 | 1200×800 · 38 KB | Güneşli mutfak penceresinin önünde meyve kâsesi ve maydanoz |
| `shelf-giyim-ve-aksesuar.webp` | `shelf.giyim-ve-aksesuar` | https://unsplash.com/photos/t5d71miCBfk | rajesh kavinpally (@rajeshkavinpally) | [Unsplash License](https://unsplash.com/license) | 2026-09-22 | 1200×800 · 62 KB | Rulo yapılmış beyaz, yeşil ve sarı havlular |
| `page-pv-leaf-sky.webp` | `page.pv.hero` | https://unsplash.com/photos/nEQZ3HvdEcQ | Adi Purba (@adi05) | [Unsplash License](https://unsplash.com/license) | 2020-04-17 | 1600×1600 · 51 KB | Mavi gökyüzüne ve güneşe uzanan tek bir taze yeşil yaprak |
| `page-uye-ol-mesh-bag.webp` | `page.uyeOl.hero` | https://unsplash.com/photos/i5tesTFPBjw | Markus Spiske (@markusspiske) | [Unsplash License](https://unsplash.com/license) | 2020-02-27 | 1066×1600 · 52 KB | Taze pırasa dolu yeşil file alışveriş çantasını tutan el |
| `page-sertifikalar-cuttings.webp` | `page.sertifikalar.hero` | https://unsplash.com/photos/3ebISKls4gE | Siwawut Phoophinyo (@phoophinyo) | [Unsplash License](https://unsplash.com/license) | 2026-10-10 | 1600×1066 · 42 KB | Ahşap standda suda köklenen bitki çelikleriyle cam fanuslar |
| `page-hakkimizda-hand-grass.webp` | `page.hakkimizda.hero` | https://unsplash.com/photos/cbpbQ1LjAws | Jacobo Unzaga (@jarlock55) | [Unsplash License](https://unsplash.com/license) | 2026-09-21 | 1600×1066 · 60 KB | Güneşli bir çayırda otlara dokunan el |
| `page-sss-forest-path.webp` | `page.sss.hero` | https://unsplash.com/photos/g41ZkoO75rE | ActionVance (@actionvance) | [Unsplash License](https://unsplash.com/license) | 2020-08-12 | 1600×1280 · 247 KB | Güneş ışığı süzülen yeşil ağaçların arasından geçen patika |
| `page-blog-notebook.webp` | `page.blog.hero` | https://unsplash.com/photos/S2frPlgkA5M | Kelly Sikkema (@kellysikkema) | [Unsplash License](https://unsplash.com/license) | 2025-03-31 | 1600×1060 · 53 KB | Ahşap masada boş defter, kalem, kahve ve küçük bir sukulent |
| `page-haberler-morning.webp` | `page.haberler.hero` | https://unsplash.com/photos/5pM6fWttKSw | Barney Goodman (@bgoodpic) | [Unsplash License](https://unsplash.com/license) | 2026-07-17 | 1061×1600 · 119 KB | Sabah güneşinin yeşil bahçeye açılan mutfağı aydınlatması |
| `page-favoriler-daisies.webp` | `page.favoriler.hero` | https://unsplash.com/photos/n080J2KkrQE | Lily Li (@lillilstar) | [Unsplash License](https://unsplash.com/license) | 2020-03-09 | 1600×1064 · 118 KB | Cam serada güneşe uzanan beyaz papatyalar |
| `about-sunlit-window.webp` | `about.home` | https://unsplash.com/photos/ohh8ROaQSJg | Adeolu Eletu (@adeolueletu) | [Unsplash License](https://unsplash.com/license) | 2016-06-10 | 1200×822 · 46 KB | Güneşli pencere önünde yeşil saksı bitkisi |
| `about-child-daisies.webp` | `about.family` | https://unsplash.com/photos/4hfYwiswd5w | Renata Kurtveliieva-Berezhna (@renberrry) | [Unsplash License](https://unsplash.com/license) | 2026-07-13 | 800×1200 · 43 KB | Yeşil çimenlerde papatyalara dokunan bir çocuk eli |
| `door-pv-seedlings.webp` | `door.pv` | https://unsplash.com/photos/Aw_AUfPccIQ | Elly M (@ellyendeavours) | [Unsplash License](https://unsplash.com/license) | 2026-01-14 | 1200×800 · 93 KB | Güneşli pencere pervazında saksılarda büyüyen fideler |
| `door-membership-monstera.webp` | `door.membership` | https://unsplash.com/photos/XYRfEHZlxwg | Sandie Clarke (@honeypoppet) | [Unsplash License](https://unsplash.com/license) | 2022-04-21 | 800×1200 · 139 KB | Pencere önünde ışıkla dolan iri yapraklı bitkiler |
| `door-news-plant.webp` | `door.news` | https://unsplash.com/photos/8QrGKmTc9_U | Behnam Norouzi (@behy_studio) | [Unsplash License](https://unsplash.com/license) | 2021-12-30 | 800×1200 · 33 KB | Beyaz duvar önünde parlak yapraklı genç bir bitki |
| `listing-all-greenhouse.webp` | `listing.all` | https://unsplash.com/photos/V2oDo7DHDbI | Filip Živaljić (@johnfdillinger) | [Unsplash License](https://unsplash.com/license) | 2026-06-09 | 2400×960 · 208 KB | Güneşli bir serada bitkilerle çevrili yol |
| `listing-search-forest.webp` | `listing.search` | https://unsplash.com/photos/eohdpP_XFJw | Howard Walsh (@hswalsh) | [Unsplash License](https://unsplash.com/license) | 2026-03-18 | 2000×800 · 224 KB | Güneş beneklerinin düştüğü ormanda kıvrılan toprak yol |
| `collection-mint-macro.webp` | `collection.default` | https://unsplash.com/photos/kWmF1DCeY68 | Melody Zimmerman (@prairiepilgrim) | [Unsplash License](https://unsplash.com/license) | 2020-07-08 | 2400×960 · 51 KB | Canlı yeşil nane yapraklarına yakından bakış |
| `promo-cream-mint.webp` | `promo.mega` | https://unsplash.com/photos/S2-yZoWSRW0 | Maria Kovalets (@marylooo) | [Unsplash License](https://unsplash.com/license) | 2025-01-17 | 800×1200 · 37 KB | Beyaz zeminde mavi krem kavanozu ve taze nane yaprakları |
| `blog-cevre-etiketi.webp` | `blog.cover.cevre-etiketi-yaniltmasi-nasil-anlasilir` | https://unsplash.com/photos/Zaiuy5dKeCk | Shelley Pauls (@shelleypauls) | [Unsplash License](https://unsplash.com/license) | 2020-06-08 | 1200×981 · 174 KB | Pazar tezgâhında taze karnabahar, brokoli, turp ve taze soğan |
| `blog-atik-ayirma.webp` | `blog.cover.atik-ayirma-ve-geri-donusum-rehberi` | https://unsplash.com/photos/dwgizUdeQZ4 | Yulia Khlebnikova (@khlebnikovayulia) | [Unsplash License](https://unsplash.com/license) | 2019-09-08 | 1200×900 · 23 KB | Beyaz zeminde yeniden kullanılan cam kavanozlar |
| `blog-pil-ayirma.webp` | `blog.cover.pil-ayirma-ve-geri-donusum` | https://unsplash.com/photos/vrbZVyX2k4I | Markus Spiske (@markusspiske) | [Unsplash License](https://unsplash.com/license) | 2016-06-23 | 1200×800 · 35 KB | Fide viyolünün bölmelerinde filizlenen genç bitkiler |
| `blog-cevre-dostu-ev.webp` | `blog.cover.cevre-dostu-ev-icin-basit-adimlar` | https://unsplash.com/photos/kwYi4zJUktM | Lisa Anna (@lisaanna195) | [Unsplash License](https://unsplash.com/license) | 2024-07-29 | 800×1200 · 31 KB | Banyo tezgâhında yeşil bitki ve katlanmış havlular |

### v2 dosya tablosu — 2. parti (17; dikey pin fotoğrafları önce)
| Dosya | Slot | Kaynak (fotoğraf sayfası) | Fotoğrafçı | Lisans | Yayın | Boyut | Alt metin |
|---|---|---|---|---|---|---|---|
| `door-tall-pv-leaf.webp` | `door.pv.tall` | https://unsplash.com/photos/Wl2tERl6yn4 | Javi o (@javio) | [Unsplash License](https://unsplash.com/license) | 2026-06-09 | 1502×2000 · 125 KB | Mavi gökyüzüne karşı güneşle parlayan iri yeşil yaprak |
| `door-tall-finder-aloe.webp` | `door.finder.tall` | https://unsplash.com/photos/30G9sQF2iJg | Rayan Gazi (@raiyan012) | [Unsplash License](https://unsplash.com/license) | 2026-10-21 | 1500×2000 · 116 KB | Aloe vera yaprakları ve yağ damlalarının yanında kâsede krem doku |
| `door-tall-premium-golden.webp` | `door.premium.tall` | https://unsplash.com/photos/swcI-6zGq-A | CS J0ke (@j0ke) | [Unsplash License](https://unsplash.com/license) | 2026-06-26 | 1333×2000 · 63 KB | Altın rengi güneşle arkadan aydınlanan yeşil yapraklı dal |
| `door-tall-membership-hands.webp` | `door.membership.tall` | https://unsplash.com/photos/ebxj2hUU-bk | feey (@feeypflanzen) | [Unsplash License](https://unsplash.com/license) | 2022-08-05 | 1600×2000 · 85 KB | Üç elin birbirine uzattığı küçük saksı bitkileri |
| `door-tall-news-window.webp` | `door.news.tall` | https://unsplash.com/photos/u1QfqxhsrXQ | Aimee Giles (@aim52) | [Unsplash License](https://unsplash.com/license) | 2022-09-01 | 1333×2000 · 35 KB | Güneşli pencerenin önünde ahşap masada buharı tüten kupa |
| `nature-maple-sun.webp` | `nature.maple-sun` | https://unsplash.com/photos/8HqLraUgnSU | Philipp Deus (@deuspix) | [Unsplash License](https://unsplash.com/license) | 2026-09-24 | 1200×1600 · 108 KB | Yeşil akçaağaç yaprakları arasından süzülen güneş |
| `nature-sunbeam-leaf.webp` | `nature.sunbeam-leaf` | https://unsplash.com/photos/WzkA3Nmkd_g | Emanuel Haas (@dermanuskript) | [Unsplash License](https://unsplash.com/license) | 2026-05-30 | 1067×1600 · 32 KB | Güneş huzmesinde dokusu belirginleşen yeşil yaprak |
| `nature-sunlit-branch.webp` | `nature.sunlit-branch` | https://unsplash.com/photos/7LmfXTmxxGs | Emilipothèse (@emilipothese) | [Unsplash License](https://unsplash.com/license) | 2025-09-24 | 1066×1600 · 80 KB | Güneşle aydınlanan canlı yeşil yapraklı dal |
| `nature-bright-sky.webp` | `nature.bright-sky` | https://unsplash.com/photos/GUMkbLlNOBw | Milin John (@milinjohn) | [Unsplash License](https://unsplash.com/license) | 2026-08-14 | 1067×1600 · 94 KB | Parlak gökyüzü önünde yeşil yapraklı dallar |
| `about-growth-hands.webp` | `about.growth` | https://unsplash.com/photos/UGOXyNkIwGY | Madara (@madara_p) | [Unsplash License](https://unsplash.com/license) | 2024-02-05 | 1067×1600 · 55 KB | Avuçlarda toprakla tutulan genç bir fidan |
| `finder-serum-blue.webp` | `finder.serum` | https://unsplash.com/photos/jnnSoT7jhBU | Ksenia Pixelesse (@pixelesse) | [Unsplash License](https://unsplash.com/license) | 2026-05-24 | 1063×1600 · 39 KB | Islak yüzeyde gün ışığında mavi damlalıklı şişe |
| `lifestyle-bathroom-plants.webp` | `lifestyle.bathroom` | https://unsplash.com/photos/U7PitHRnTNU | Phil Hearing (@philhearing) | [Unsplash License](https://unsplash.com/license) | 2019-03-11 | 1067×1600 · 46 KB | Saksı bitkileriyle aydınlık beyaz banyo |
| `lifestyle-window-plant.webp` | `lifestyle.window-plant` | https://unsplash.com/photos/C0gWgWT04n4 | Brina Blum (@brina_blum) | [Unsplash License](https://unsplash.com/license) | 2016-11-21 | 1600×1066 · 46 KB | Fayanslı pencere pervazında yeşil bitki ve cam şişe |
| `lifestyle-lemon-cleaning.webp` | `lifestyle.cleaning` | https://unsplash.com/photos/n5qirFAe6rQ | Precious Plastic Melbourne (@preciousplasticmelbourne) | [Unsplash License](https://unsplash.com/license) | 2020-03-11 | 1600×1200 · 44 KB | Mutfak tezgâhında limonlar ve sarı sıvılı sprey şişe |
| `texture-cream-swatch.webp` | `texture.cream` | https://unsplash.com/photos/kD9qprR6HBI | Kelsey Curtis (@kelseycurtis) | [Unsplash License](https://unsplash.com/license) | 2020-04-03 | 1128×1200 · 17 KB | Açık bej zeminde beyaz krem sürüntüsü |
| `texture-water-green.webp` | `texture.water-green` | https://unsplash.com/photos/Lo8pE-e3AiU | Alma Snortum-Phelps (@almairene) | [Unsplash License](https://unsplash.com/license) | 2020-09-05 | 1600×996 · 31 KB | Yeşil ve mavi tonlarda dalgalanan su yüzeyi |
| `texture-water-blue.webp` | `texture.water-blue` | https://unsplash.com/photos/kKpTHqM2K-c | Jackson Hendry (@actionjackson801) | [Unsplash License](https://unsplash.com/license) | 2017-11-20 | 1600×1068 · 44 KB | Durgun mavi suda yayılan halkalar |

Toplam (v1 + v2): 76 slot · 78 webp dosyası.

## Mood referansları (yalnız ilham — indirilmez, barındırılmaz)
Bu bağlantılardaki görsellerin telif hakkı sahiplerine aittir. Yalnız yön tartışması için listelenir (K-102).
- Pinterest araması: sunlit leaves backlight blue sky — https://www.pinterest.com/search/pins/?q=sunlit%20leaves%20backlight%20blue%20sky
- Pinterest araması: heart shaped tree canopy — https://www.pinterest.com/search/pins/?q=heart%20shaped%20tree%20canopy
- Pinterest araması: lensball grass sunlight — https://www.pinterest.com/search/pins/?q=lensball%20grass%20sunlight
- Pinterest araması: fresh green skincare editorial — https://www.pinterest.com/search/pins/?q=fresh%20green%20skincare%20editorial
- Pinterest araması: gold botanical luxury packaging — https://www.pinterest.com/search/pins/?q=gold%20botanical%20luxury%20packaging (yalnız premium-gold tema)
- Tata Harper (doğal/yeşil; yeşil-altın denge) — https://www.tataharperskincare.com
- Tatcha (premium/editoryal ritim) — https://www.tatcha.com
- ILIA (sertifika rozetleri, ferah ürün sayfası) — https://iliabeauty.com
- Typology (sade/bilimsel, cilt testi) — https://www.typology.com
- Resmî Greenleaf mağaza (marka rengi ve ikon dili) — https://global.green-leaf.shop

Eksik kalan brandbook motifi: "kalp biçimli yaprak tacı" ve "çimen üstünde cam küre" için brandbook yönüne uyan (güneşli, yeşil, bej olmayan) lisanslı fotoğraf bulunamadı. Bulunan cam küre fotoğrafları gün batımı/bej tonluydu ve elendi.
