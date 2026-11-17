# Boşluk Analizi — UX ve Sayfalar

> Hazırlayan: C2-ux-sayfa-boslugu (Proje Yöneticisi'ne bağlı alt ajan) · Faz 0 (Keşif) · 2026-11-15
> Durum: TASLAK. Bu dosyadaki hiçbir öneri bağlayıcı değil. Bağlayıcı olan yalnızca `KARAR-KAYDI.md`'de `ONAYLI` olan kararlardır.

## 0. Giriş

**Kapsam.** Projenin bugünkü tanımında (MEMORY.md, K-001…K-011), Faz 2'de (tasarım) ya da Faz 3'te (kodlama) planlamaya geri dönmeyi zorunlu kılacak UX ve sayfa boşlukları, çelişkiler, gizli varsayımlar ve tanımsız durumlar. Renk ya da font seçmiyorum; yalnızca neye ihtiyaç olduğunu tarif ediyorum.

**Yöntem.** Önce her öncelikli sayfayı bölümlerine ayırdım. Sonra her bölüme şu soruları sordum: veri nereden geliyor, veri yoksa ne görünüyor, mobilde ne değişiyor, tek CTA ne, kullanıcı burada neye karar veriyor. Bulguları muhtemel veriyle karşılaştırdım. Bir konuda makul bir varsayılan kayda geçirilebiliyorsa soru açmadım; onu "karar önerisi" olarak yazdım.

**Okunan kaynaklar.** `CLAUDE.md`, `MEMORY.md`, `docs/ekip/EKIP.md`, `KARAR-KAYDI.md`, `ACIK-SORULAR.md`, `GOREV-PANOSU.md`, `.claude/agents/proje-yoneticisi.md` ve `ui-tasarimci.md`. Ham veriye salt okunur göz attım: üst klasördeki `greenleaf-katalog.html` (Ağustos kataloğu) ile `.cache/` altındaki açılmış `greenleaf-turkiye-urunler.xlsx`. `docs/arastirma/` ve `docs/veri/` henüz boş olduğu için onları beklemeden ilerledim.

**"Muhtemel veri" tespiti.** `docs/veri/ENVANTER.md` yazılınca doğrulanmalı.
- xlsx'te **38 ürün ve 3 başlangıç seti** var (type=2). Not: panelde toplam 5.634 kayıt var, "çoğu Türkiye'de aktif değil".
- xlsx'teki alanlar: ID, kod, barkod, TR ad, kategori (panelin Rusçadan çevrilmiş kategorisi), fiyat ₺, PV ve **tek** görsel URL'si.
- Panel kategorileri tüketiciye uygun değil: "Kuponlu Ürünler", "Genel Ürünler", "Diğer", "Başlangıç Setleri".
- Ağustos kataloğu ürünleri 9 tüketici kategorisine yeniden dağıtmış: Cilt Bakımı (~10), Saç Bakımı (3), Ağız Bakımı (5), El & Vücut (7), Ev & Temizlik (7), Bebek & Çocuk (2), Kağıt Ürünler (2), Sağlık (1), Setler (3).
- Katalog alanları: kod, barkod, kategori, fiyat, PV, hacim/gramaj, TR ad, TR açıklama, fayda maddeleri listesi, kullanım şekli (çoğu boş) ve tek görsel.
- Katalogda **olmayanlar:** INCI/içerik listesi, cilt tipi, sertifika, değerlendirme, stok, ikinci görsel, varyant (renk/beden), koleksiyon etiketi, "yeni" tarihi.
- Tekstil, ayakkabı ve mutfak ürünleri TR-aktif listede **görünmüyor**.

---

## A. Öncelikli sayfalar

### A.0 Sayfa–bölüm–veri haritası (özet)

Bu tablo aşağıdaki boşlukların dayanağıdır. "Var mı" sütunu muhtemel veriye göre doldurulmuştur.

| Sayfa | Bölüm | Gereken veri | Var mı (muhtemel) | Tek birincil CTA | Kullanıcı neye karar verir |
|---|---|---|---|---|---|
| Ana sayfa | Hero | Hero görseli/yaşam tarzı fotoğrafı, başlık, CTA hedefi | Hayır (yalnız ürün packshot'ı) | "Alışverişe başla" → listeleme | Bu site güvenilir ve güzel mi, kalmaya değer mi |
| | Marka mesajı / Neden Greenleaf | Marka hikâyesi metni, 3–4 kanıt maddesi | Hayır | — | Greenleaf'i tanıyor muyum |
| | İkonlu kategori şeridi | Kategori listesi, kategori ikonları | Liste var (9), ikon yok | Kategoriye git | Nereden başlayayım |
| | Vitrin blokları (öne çıkan / yeni / kampanya) | Koleksiyon anahtarları ve ürün atamaları | Hayır | Ürün kartı → detay | Hangi ürüne bakayım |
| | Sekmeli kategori vitrini | Kategori + ürün | Var | Ürün kartı | — |
| | Fabrika / marka hikâyesi | Fabrika görselleri, metin, sertifika belgeleri | Hayır | "Hikâyemiz" → hakkımızda | Güveniyor muyum |
| | Üyelik bölümü | Fiyat farkı örneği, sponsor linki | Fiyat var, link yok (S-002) | "Üye ol" | Üye olmaya değer mi |
| | Güven şeridi | Kargo, iade ve ödeme politikası | Hayır | — | Risk alıyor muyum |
| | Haberler / içerik | Blog yazıları | Hayır (blog "sonra") | — | — |
| | Markalar | Alt marka logoları | Kısmen (SVG zip doğrulanacak) | Markaya göre filtrele | — |
| Listeleme | Başlık + breadcrumb + açıklama | Kategori adı, kısa tanıtım metni | Ad var, metin yok | — | — |
| | Filtre / sıralama / arama | Kategori, marka, fiyat (stok ve rozet verisi yok) | Kısmen | — | Hangi ürünleri karşılaştırayım |
| | Ürün ızgarası | title, images[0], price, memberPrice, badges | badges yok | "Sepete ekle" mi "Detaya git" mi? (B-UX-12) | Hangi ürünü açayım |
| Ürün detay | Galeri | images[] | Tek görsel | — | Ürünü beğeniyor muyum |
| | Başlık, marka, hacim, fiyat, PV | title, brand, volume, price, memberPrice, pv | Var (brand normalize edilmeli) | "Sepete ekle" | Bu fiyata alır mıyım |
| | Faydalar / açıklama | description, benefits | Var (TR) | — | İşime yarar mı |
| | Kullanım şekli | usage | Çoğu boş | — | — |
| | İçerik / INCI | ingredients | Yok | — | Cildime uygun mu |
| | Sertifika rozetleri | certifications[] + belge | Yok | — | Güveniyor muyum |
| | Değerlendirmeler | reviews | Yok (backend yok) | — | — |
| | İlgili ürünler | Kategori/marka eşleşmesi ya da elle atama | Kural yok | Ürün kartı | — |
| | Üyelik çağrısı | memberPrice − price farkı | Hesaplanabilir | "Üye ol" (ikincil) | — |
| Sepet drawer | Satırlar, miktar, ara toplam, tasarruf | Sepet durumu ve fiyatlar | Var | "Ödemeye geç" | Devam mı, alışverişe dönmek mi |
| Ödeme adımları | İletişim/adres → kargo → ödeme (kapalı) | Kargo seçenekleri ve ücretleri | Yok | "Devam" / son adımda "Üye ol" | — |
| Üye ol | Fayda anlatımı, adımlar, SSS, yönlendirme | Sponsor linki, üyelik koşulları | Yok (S-002) | "Greenleaf'te üye ol" (dış link) | Üye olayım mı |

### A.1 Boşluklar

| ID | Boşluk | Neden önemli (çözülmezse ne kırılır) | Seçenekler | Öneri | Bloke ettiği faz | Soru gerekli mi? |
|---|---|---|---|---|---|---|
| B-UX-01 | **Ürün şeması ürün detay sayfasının bölümlerini taşımıyor.** §4 şemasında fayda maddeleri, kullanım şekli, içerik/INCI, cilt tipi/endişe, sertifikalar, koleksiyon üyeliği, "yeni" tarihi ve SEO alanları yok. Katalogda ise `benefits` (pr) ve `usage` (u) zaten var. | Detay sayfası tasarımı şemada olmayan bölümleri çizer. Kodlamada `lib/products.ts` sözleşmesi değişir, veri yeniden işlenir ve bileşenler yeniden yazılır. | (a) §4 şeması aynen kalsın, eksik bölümler tasarlanmasın. (b) Şema şimdi isteğe bağlı alanlarla genişletilsin; boş alan bölümü gizlesin. | (b). Şemaya isteğe bağlı şu alanlar eklensin: benefits[], usage, ingredients, skinTypes[], concerns[], certifications[], collections[], isNew/createdAt, seo. Her detay bölümü "alan boşsa gizlenir" kuralıyla tasarlansın. Veri mühendisine devir. | Faz 1 (şema), Faz 2 | Hayır |
| B-UX-02 | **Ana sayfanın görsel varlıkları yok.** Hero, yaşam tarzı ve fabrika fotoğrafı yok; elde yalnızca karışık arka planlı (png/jpg) tek ürün packshot'ları var. | "En büyük fark UI güzelliği" hedefi büyük ölçüde fotoğrafa dayanıyor. Görsel kaynağı belirsiz kalırsa Faz 2 ekranları yer tutucuyla onaylanır, gerçek görselle tasarım bozulur. | (a) Yalnız ürün packshot'ı ve tipografi/motif ağırlıklı hero. (b) Stok fotoğraf. (c) Yapay zekâ ile üretilmiş yaşam tarzı görselleri. (d) Greenleaf'in resmî kampanya görselleri (izin gerekir). | Kullanıcıya sorulsun (Soru 4). Varsayılan: (a) ve (d). Hero, packshot'lar tek tip arka plana getirilerek kurgulansın. | Faz 2 | **Evet** |
| B-UX-03 | **Vitrin bloklarını besleyecek koleksiyon verisi yok.** "Öne çıkan, yeni, kampanya" için koleksiyon anahtarı, atama ve sıra tanımlı değil (K-008). | Bloklar tasarlanır ama içi boş ya da keyfi kalır. "Tekrar yok" kuralı uygulanamaz. | (a) Kullanıcı elle seçsin. (b) Kural tabanlı seçim (ör. yeni = son eklenen, öne çıkan = en yüksek PV). (c) Ekip öneri listesi hazırlasın, kullanıcı onaylasın. | (c). Koleksiyonlar veri katmanında anahtar → ürün kodu listesi olarak tutulsun. Faz 1'de ilk liste önerilsin. Bir ürün ana sayfada yalnızca bir blokta görünsün. | Faz 1 | Hayır |
| B-UX-04 | **Vitrin sayısı ile katalog boyutu çelişiyor.** 4–5 blokta 4–8'er tekrarsız ürün göstermek, ~38 üründen 20–32'sini ana sayfaya koymak demek. | Ana sayfa kataloğun kopyasına döner, listeleme sayfasının anlamı kalmaz. Ölçek değişirse (B-UX-18) blok sayısı da değişir. | Blok sayısını ölçeğe göre sınırlamak; sekmeli kategori vitrini ile ürün vitrinlerinden birini seçmek. | Açılış ölçeğinde en fazla 2 ürün vitrini olsun (ör. "Öne çıkanlar" ve "Setler"). Sekmeli vitrin, ürün sayısı ~100'ü geçince eklenebilecek bir modül olarak tasarlansın. | Faz 1 | Hayır (Soru 1'e bağlı) |
| B-UX-05 | **"Haberler/içerik" bölümü ile blogun "sonra" olması çelişiyor.** §7 akışı ana sayfada bu bölümü istiyor, oysa blog sonraki sayfalar arasında. | Ya boş bir bölüm tasarlanır ya da ana sayfa akışı sonradan değişir. | (a) Bölüm şimdilik çıkarılsın, yeri ayrılsın. (b) 2–3 statik rehber yazısı yazılsın. | (a). Ana sayfa akışında "içerik" yuvası opsiyonel modül olsun. Blog gelince açılsın. | Faz 1 | Hayır |
| B-UX-06 | **Güven şeridi ile kanıt verisi uyuşmuyor.** Kargo süresi, iade politikası ve güvenli ödeme tanımlı değil, ödeme ise kapalı. | Kanıtsız vaat (ör. "ücretsiz kargo") yazılırsa yanıltıcı olur. Yazılmazsa şerit boş kalır. | (a) Yalnız doğrulanabilir maddeler: orijinal ürün, Türkçe destek, 14 gün cayma hakkı (yasal). (b) Politikalar netleşene kadar şerit gizlensin. | (a). Metinler içerik editörüne devredilsin. Kargo eşiği gibi rakamsal vaatler backend fazına kalsın. | Faz 2 | Hayır |
| B-UX-07 | **Fabrika/marka hikâyesi ve "Neden Greenleaf" içeriği yok.** Metin, görsel ve belge yok. | Premium/editoryal yön bu bölümlere dayanıyor. İçerik yoksa tasarım genel geçer kalır. | Resmî mağazadan (izin var) bilgi derlemek; kullanıcıdan istemek. | Pazar araştırmacısının G-001 çıktısından derlensin. Görseller resmî mağazadan alınsın (EKIP §4'te izin var). Çin merkezli kimlik doğru verilsin. | Faz 2 | Hayır |
| B-UX-08 | **Sertifika rozetleri ve tıklanabilir belgeler için belge yok** (§7 "kaçınılacaklar"). | Belgesiz rozet, eleştirilen rakip hatasının aynısıdır ve hukuki risk taşır. Rozet bölümü tasarlanıp sonra kaldırılırsa detay sayfası ve ana sayfa yeniden düzenlenir. | (a) Belge varsa göster. (b) Belge gelene kadar bölümü gizle. | Kullanıcıya sorulsun (Soru 7). Varsayılan: belge yoksa bölüm render edilmez. Tasarımda yuva olarak durur. | Faz 2 | **Evet** |
| B-UX-09 | **Değerlendirme alanı backend olmadan ne olacak?** §7 "ürün sayfasında değerlendirme alanı" diyor. | Sahte ya da örnek yorum yayımlamak yasak ve güven kırıcı. Yorum formu ise veri toplayamaz. | (a) Bu fazda hiç gösterme. (b) "Yakında" boş durumu. (c) Greenleaf'teki puanları çekmek (yok). | (a). Bileşen tasarlansın ama yayında gizli kalsın. Boş durum metni hazırda beklesin. | Faz 2 | Hayır |
| B-UX-10 | **İlgili ürünler kuralı yok.** | Detay sayfasında boş ya da alakasız öneri çıkar. Küçük katalogda aynı ürünler her yerde tekrar eder. | Aynı kategori; aynı marka; elle tamamlayıcı eşleme (şampuan → saç kremi). | Önce elle eşleme (veri alanı: related[]), yoksa aynı kategori, o da yoksa aynı marka. En fazla 4 ürün. | Faz 1 | Hayır |
| B-UX-11 | **Hacim ve kutu adedinin müşteriye gösterimi tanımsız.** "Kutu başına N adet" addan çıkarılacak (§6). Fiyatın adet mi kutu fiyatı mı olduğu belirsiz. | Kart ve sepet fiyatı yanlış anlaşılır (ör. 10'lu diş fırçası paketi). Toptancı dili sitede kalır. | boxQty'yi müşteriye gösterme; "N'li paket" olarak göster; yalnızca veride tut. | Fiyat tek perakende birim içindir. Birim çoklu paketse "N'li paket" adın altında gösterilsin. Koli adedi müşteri arayüzünde görünmesin. Veri mühendisi birim/fiyat ilişkisini doğrulasın. | Faz 1 | Hayır (veri doğrulaması) |
| B-UX-12 | **Ürün kartında birincil CTA tanımsız.** Kartta doğrudan "Sepete ekle" mi olacak, yoksa kart yalnız detaya mı götürecek? | Ürün kartı en çok tekrar eden bileşen. Karar sonradan değişirse ızgara, hover ve mobil yerleşimi hep değişir. | (a) Kartta "Sepete ekle" (hızlı). (b) Kart yalnız detaya gider. (c) Masaüstünde hover ile görünen hızlı ekleme, mobilde ikon. | Kartın tamamı detaya gitsin. Ayrıca tek ve görünür bir "Sepete ekle" düğmesi olsun (varyant olmadığı için güvenli). "Talebe ekle" benzeri ikinci düğme olmasın. | Faz 2 | Hayır |
| B-UX-13 | **Ödeme adımlarının sayısı ve alanları tanımsız.** | Akış "tamamen tıklanabilir" olmalı (K-005), ama adımlar yazılmadan tasarım tahmine dayanır. | 3 adım: İletişim+Adres → Kargo → Ödeme. Ya da tek sayfa. | 3 adım. 1) İletişim ve teslimat adresi (misafir). 2) Kargo seçimi (ücret "hesaplanacak"). 3) Ödeme: devre dışı (B-UX-30). Adım göstergesi, geri dönüş ve özet paneli olsun. TC kimlik no istenmesin. | Faz 1 | Hayır |
| B-UX-14 | **Ödeme formunda girilen kişisel verinin akıbeti belirsiz.** | Backend yok. Veri bir yere gönderilmez, ama kullanıcı bunu bilmeden ad ve adres girer. KVKK açısından sorun ve güven kaybı yaratır. | Saklama yok, oturum içi; localStorage'da tut; formu hiç gösterme. | Form doldurulabilsin ama yalnız sekme oturumunda tutulsun, hiçbir yere gönderilmesin. 1. adımın üstünde "Online ödeme yakında; bilgileriniz kaydedilmez" notu olsun. | Faz 1 | Hayır |
| B-UX-15 | **Üye ol sayfasının içeriği tanımsız.** Hangi faydalar, kaç adım, SSS, şartlar, giriş ücreti var mı? Greenleaf'te kayıt nasıl ilerliyor? | Sayfa yalnızca bir düğmeye indirgenir ya da yanlış vaat içerir. Gelir vaadi dili rakip hatasıdır (§7). | Fayda + adımlar + SSS + dış link; ya da yalnız CTA. | Fayda (indirimli alışveriş, fiyat örneği hesaplanarak) + 3 adımda kayıt + SSS + dış link olsun. Gelir/kazanç vaadi olmasın. Kayıt adımlarını pazar araştırmacısı Greenleaf'ten doğrulasın. Link yer tutucu olsun (S-002). | Faz 2 | Hayır |
| B-UX-16 | **Başlangıç setlerinin (3 kayıt, type=2) rolü belirsiz.** Müşteriye satılan bir ürün mü, üyelik paketi mi? | "Setler" kategorisi mi açılacak, yoksa setler üye ol sayfasında mı anlatılacak? Kartta PV/fiyat gösterimi ve sepete eklenebilirlik buna göre değişir. | (a) Normal ürün olarak Setler kategorisinde. (b) Yalnız üye ol sayfasında, satılmaz. (c) Her ikisi. | Kullanıcıya sorulsun (Soru 8). Varsayılan: (a). | Faz 1 | **Evet** |

---

## B. Sonraki sayfalar

| ID | Boşluk | Neden önemli | Seçenekler | Öneri | Bloke ettiği faz | Soru gerekli mi? |
|---|---|---|---|---|---|---|
| B-UX-17 | **Bu fazda hangi "sonraki" sayfaların tasarlanıp kodlanacağı tanımsız.** | Header ve footer bu sayfalara link verir. Kapsam belirsiz kalırsa Faz 3'te ölü link ya da kapsam kayması olur. | Her sayfa için: tasarla+kodla / yalnız tasarla / yer ayır / kapsam dışı. | **Tasarla+kodla:** 404, hata sayfası, hakkımızda+iletişim (tek sayfa), yasal sayfa şablonu (metin yer tutucusu, uzman onayı bekler). **Yer ayır (menüde yok):** blog, cilt testi. **Kapsam dışı:** giriş/kayıt, hesabım (backend gerekiyor; header davranışı için B-UX-55). | Faz 1 | Hayır |
| B-UX-18 | (D/F/E'nin kökü) **Katalog ölçeği belirsiz.** MEMORY "çok geniş katalog, mega menü şart" diyor (§6, §7). Muhtemel TR-aktif veri ise ~38 ürün + 3 set ve 9 kategori; bazı kategorilerde 1–2 ürün var. | Gezinme derinliği, mega menü, filtre boyutları, arama mimarisi, sayfalama ve vitrin sayısı tamamen buna bağlı. 40 ürüne mega menü tasarlamak cila israfıdır; yüzlerce ürüne sade şerit ise yetersiz kalır. | (a) Yalnız TR-aktif (~40). (b) TR-aktif + "yakında" ürünler. (c) Geniş global katalog. | Kullanıcıya sorulsun (Soru 1). Varsayılan: (a). Bilgi mimarisi 150 ürüne kadar ölçeklenecek biçimde tasarlansın; mega menü "yeterli ürün olunca açılan" bir varyant olarak beklesin. | Faz 1 | **Evet** |
| B-UX-19 | **"Cildine uygun ürünü bul" testinin eşleme mantığı ve ürün etiketleri yok.** Ölçekte yalnız ~10 cilt bakım ürünü var. | Test rakiplerden ayrışan iki fikirden biri (§9). Ama soru → etiket → ürün eşlemesi tanımlanmadan tasarlanamaz. Az üründe her sonuç aynı 2–3 ürünü gösterir. | (a) Şimdi: kural tabanlı statik test (backend gerekmez). (b) Ürün sayısı artınca. (c) Hiç. | (b). Ama etiket alanları (skinTypes[], concerns[]) şemaya şimdi eklensin (B-UX-01), içerik editörü 10 ürünü şimdi etiketlesin. Böylece test sonradan veri değişikliği gerektirmez. | Faz 1 (şema) | Hayır |
| B-UX-20 | **Blog/rehber için kim yazacak, kaç yazı, hangi kategori yapısı?** Tanımsız. | SEO için ana sayfadaki içerik modülü ve URL yapısı bunu bekliyor. | Şimdi 0 / 3 / 10 yazı. | Bu fazda 0 yazı. URL yapısı SEO uzmanıyla şimdi ayrılsın, kart bileşeni tasarlansın. | Faz 1 | Hayır |
| B-UX-21 | **Hakkımızda/iletişim için distribütörün kimlik ve iletişim bilgileri yok.** Mesafeli satış ileride satıcı kimliği istiyor. | Footer, iletişim ve yasal sayfalar ile site kimliği (B-UX-70) bu bilgiye bağlı. WhatsApp yasak; hangi kanal açık? | E-posta / telefon / form (backend yok) / yalnız sosyal medya. | Kimlik sorusu Soru 3'te. İletişim kanalı varsayılanı: e-posta ve telefon metin olarak (mailto/tel). Form yok, WhatsApp yok. | Faz 2 | Hayır (Soru 3 kapsar) |
| B-UX-22 | **Yasal sayfalar ile çerez onayının bu fazdaki durumu belirsiz.** MEMORY "frontend aşamasında gerekmez" diyor, ancak site Vercel'de herkese açık olacak. | Analitik ya da üçüncü taraf font/çerez varsa çerez onayı gerekir. Banner sonradan eklenirse mobil alt alanı (yapışkan CTA) ile çakışır. | Analitik yok ve banner yok; analitik var ve banner var. | Bu fazda çerez kullanan analitik olmasın, banner olmasın. Fontlar kendi sunucumuzdan yüklensin. Banner'ın konumu ise şimdiden tasarlansın, yapışkan CTA ile çakışmasın. | Faz 2 | Hayır |

---

## C. Tanımsız durumlar

| ID | Boşluk | Neden önemli | Seçenekler | Öneri | Bloke ettiği faz | Soru gerekli mi? |
|---|---|---|---|---|---|---|
| B-UX-23 | **Boş sepet** (drawer ve ödeme adımına doğrudan URL ile girme). | Drawer'ın en sık görülen ilk hâli bu. Tasarlanmazsa geliştirici kendisi uydurur. | Basit metin; metin + öne çıkan 3 ürün + kategori kısayolu. | Metin + 3 öne çıkan ürün + "Alışverişe başla". Ödeme URL'sine boş sepetle gelen kullanıcı sepete/ana sayfaya yönlensin. | Faz 2 | Hayır |
| B-UX-24 | **Sonuçsuz arama.** | Küçük katalogda sık yaşanır (ör. "şampuan" yerine "sampuan", olmayan ürün türü). | Öneri yok; yakın eşleşme + kategoriler + popüler ürünler. | "Şunu mu demek istediniz" + kategori şeridi + öne çıkanlar. Normalizasyon için B-UX-38'e bakın. | Faz 2 | Hayır |
| B-UX-25 | **Boş veya tek ürünlü kategori** (Sağlık: 1, Bebek & Çocuk: 2, Kağıt: 2). | Izgara tek kartla bozuk görünür. Filtre paneli anlamsızlaşır. | Kategorileri birleştir; az ürün düzeni tasarla; boş kategoriyi menüden gizle. | Ürünü 0 olan kategori menüde gösterilmesin. 1–3 ürünlü kategorilerde filtre paneli gizlensin, kartlar büyük düzende gösterilsin. Kategori birleştirmesi Faz 1'de bilgi mimarisinde değerlendirilsin. | Faz 1–2 | Hayır |
| B-UX-26 | **Görseli olmayan ürün; tek görselli ürün** (muhtemelen tüm ürünler tek görselli). | Galeri, küçük resim şeridi ve zoom çok görselli varsayımla tasarlanırsa ürünlerin neredeyse tamamında bozuk görünür. | Galeri tek görselde gizlensin; tek görsel + büyütme; markalı yer tutucu. | Detay sayfası **tek görsel öncelikli** tasarlansın, galeri 2+ görselde açılsın. Görselsiz ürün için markalı yer tutucu (pinwheel/logo) tasarlansın. Görselsiz ürün yayına alınsın mı: hayır (B-UX-31). | Faz 2 | Hayır |
| B-UX-27 | **Ürün görsellerinin arka planları ve oranları karışık** (png/jpg, farklı kırpım). | Kart ızgarasında dağınıklık premium hissi doğrudan öldürür. Bu, rakiplerdeki hatanın aynısıdır. | Ham kullan; tek tip arka plana normalize et; kartta sabit oranlı zemin. | Görseller tek oran ve tek tip zemine normalize edilsin (veri mühendisine devir). Arka plan tonu S-001'e bağlı (bkz. J). | Faz 2 | Hayır |
| B-UX-28 | **Stokta yok / stok bilinmiyor.** Panel alanlarında stok yok. | "Sepete ekle" davranışı, rozet ve filtre buna bağlı. | Stok bilinmiyorsa satılabilir say; stok gösterme. | Stok bilinmiyorsa satılabilir sayılsın, stok bilgisi gösterilmesin. "Tükendi" durumu (düğme pasif, kart soluk değil, etiketli) tasarlansın ama veri gelene kadar tetiklenmesin. | Faz 2 | Hayır |
| B-UX-29 | **Çok uzun ürün adı** (ör. "Nilrich 20 çeşit vitamin ve mineralli yumuşak çiğnenebilir şekerler"). Adlarda tutarsız büyük/küçük harf de var (YIBEILE, iLiFE, pinkpoint). | Kart yükseklikleri kayar. Marka adları dağınık görünür; rakiplerde eleştirilen "dağınık ad" sorunu bizde de tekrar eder. | Kartta 2 satır kırpma; marka satırı ayrı, adda marka yok. | Kartta marka ayrı satırda, ad en fazla 2 satır. Detayda ad tam gösterilsin. Marka adlarının yazımı tek listeden normalize edilsin (B-UX-50). Tasarım ekranları en uzun gerçek adla test edilsin. | Faz 2 | Hayır |
| B-UX-30 | **Devre dışı ödeme adımının tam davranışı ve mesajı.** | K-005 yalnızca "kibar bir durum" diyor. Düğme mi pasif, adım mı kilitli, sonrasında kullanıcı ne yapacak, sepet korunacak mı — belirsiz. Bu, demo senaryosunun doruk noktası. | (a) Ödeme seçenekleri görünür, "Siparişi tamamla" pasif ve açıklamalı. (b) Adımın tamamı tek mesaj kartı. (c) Ödeme formu görünür ama kilitli. | (a). Kart/taksit seçenekleri görsel olarak görünsün ama seçilemesin. "Siparişi tamamla" pasif olsun; yanında "Online ödeme çok yakında" açıklaması bulunsun. İkincil yol: "Üye olarak indirimli alışverişe hazırlan". Sepet korunsun. E-posta toplanmasın (backend yok), WhatsApp önerilmesin. | Faz 1 | Hayır |
| B-UX-31 | **Açıklaması olmayan, Rusça kalmış ya da fiyatsız ürün.** | Rusça metin sitede görünürse marka hatası olur. Fiyatsız kart, fiyat bileşenini bozar. | Yayına alma; "fiyat yakında"; açıklama bölümünü gizle. | Yayına alma kuralı: TR ad + fiyat + en az 1 görsel zorunlu, yoksa ürün yayınlanmaz. TR açıklama yoksa açıklama bölümü gizlensin. Rusça metin hiçbir koşulda gösterilmesin. Kural veri mühendisi ve içerik editörüne devredilsin. | Faz 1 | Hayır |
| B-UX-32 | **Varyantlı ürün** (renk/beden). MEMORY tekstil ve ayakkabıyı sayıyor; TR verisinde muhtemelen yok, şemada varyant alanı yok. | Varyant sonradan gelirse ürün kartı CTA'sı, sepet satırı, detay sayfası ve sepet anahtarı değişir. Bu da en pahalı geri dönüş olur. | Şimdi varyant desteği; yok say; şemada yer ayır. | Bu fazda varyant UI'ı yok. Şemada ve sepet anahtarında varyanta yer ayrılsın (frontend mimara devir). Tekstil/ayakkabı TR'ye gelirse DEĞİŞİKLİK TALEBİ açılsın. | Faz 1 | Hayır (Soru 1 ile netleşir) |
| B-UX-33 | **Yükleniyor/iskelet durumları.** | Statik JSON ile sayfa çoğu zaman anında açılır, ancak istemci tarafı filtre/arama ve görseller geç yüklenir. İskeletler tasarlanmazsa CLS ve "ucuz" his oluşur. | İskelet / spinner / bulanık görsel ön izleme. | Kart, detay ve drawer için iskelet tasarlansın. Görsellerde sabit oranlı yer tutucu kullanılsın. Spinner yalnızca düğme içinde olsun. | Faz 2 | Hayır |
| B-UX-34 | **404 ve genel hata sayfası; silinmiş ürün URL'si.** | Vitrin olarak gösterilen sitede kırık sayfa ciddi itibar kaybıdır. | Jenerik; markalı + arama + kategoriler. | Markalı 404: arama + kategori şeridi + öne çıkanlar. Kaldırılmış ürün de 404'e düşsün (yönlendirme kuralı SEO uzmanında). | Faz 2 | Hayır |
| B-UX-35 | **Sepet miktar sınırları.** | Sınır yoksa 999 adet girilebilir; sınır varsa mesajı tanımlanmalı. | Sınır yok; satır başına 1–10; stoğa bağlı. | Satır başına 1–10 olsun, 10'da artırma düğmesi pasifleşsin ve kısa bir açıklama gösterilsin. Miktar 0'a düşünce satır silinmeden önce onay istensin ya da "geri al" sunulsun. | Faz 2 | Hayır |
| B-UX-36 | **localStorage'daki sepette artık var olmayan veya fiyatı değişmiş ürün.** | Sepette hayalet ürün ya da eski fiyat görünür, toplam yanlış hesaplanır. | Sessizce kaldır; uyarıyla kaldır; fiyatı güncelle ve bildir. | Sepet yalnızca ürün kodu ve miktarı saklasın; fiyat ve ad her açılışta veriden okunsun. Bulunamayan ürün satırdan kaldırılsın ve tek seferlik "Bazı ürünler artık mevcut değil" bildirimi gösterilsin. | Faz 1 (mimari) | Hayır |
| B-UX-37 | **Sepete ekleme geri bildirimi.** Drawer otomatik açılsın mı, yoksa toast/rozet animasyonu mu? | Akışın en sık mikro etkileşimi ve demo anı. Sonradan değişirse hareket spesifikasyonu da değişir. | Drawer otomatik açılır; toast + sayaç animasyonu; mobilde farklı. | Masaüstü ve mobilde ilk eklemede drawer açılsın, sonraki eklemelerde sayaç animasyonu + kısa toast. Hareket tasarımcısına devir. | Faz 2 | Hayır |

---

## D. Gezinme derinliği

| ID | Boşluk | Neden önemli | Seçenekler | Öneri | Bloke ettiği faz | Soru gerekli mi? |
|---|---|---|---|---|---|---|
| B-UX-38a | **Mega menü mü, ikonlu şerit mi, ikisi birden mi?** §7 ikisini birden "şart" sayıyor, ama ölçek ~40 ürün (B-UX-18). | Header tasarımı bütün sayfaları etkiler. Ölçek yanlış varsayılırsa header baştan tasarlanır. | (a) Mega menü + şerit. (b) Basit açılır kategori paneli + şerit. (c) Yalnız şerit. | Soru 1 cevaplanana kadar (b). Masaüstünde "Kategoriler" açılır paneli (ikon + ad + ürün sayısı) ve ana sayfa/listelemede ikonlu şerit. Mega menü ölçek büyürse açılacak varyant olarak dokümante edilsin. | Faz 2 | Hayır (Soru 1 kapsar) |
| B-UX-39 | **Kategori ağacı kaç seviye?** Hangi taksonomi kullanılacak: panelin Rusça-çeviri kategorileri ("Kuponlu Ürünler", "Genel Ürünler", "Diğer") mi, kataloğun 9 tüketici kategorisi mi? | URL yapısı, breadcrumb, filtre ve menü buna bağlı. Panel kategorileri tüketiciye anlamsız. | Panel taksonomisi; katalog taksonomisi; yeni taksonomi. | Tek seviye, kataloğun 9 tüketici kategorisi temel alınsın. Panel kategorisi yalnızca eşleme kaynağı olarak veride tutulsun. Alt kategori alanı şemada isteğe bağlı olsun. Kesin liste Faz 1'de SEO uzmanıyla belirlensin. | Faz 1 | Hayır |
| B-UX-40 | **Alt marka sayfaları.** Ayrı marka sayfaları mı olacak, yoksa yalnız filtre mi? Bazı markaların (Kardli, Easylove?) TR'de hiç ürünü olmayabilir. | Marka şeridi 0 ürünlü markaya link verirse boş sayfa çıkar. Ayrı marka sayfası, içeriği olmayan yeni bir şablon demek. | Marka sayfası; marka filtresi; ikisi. | Bu fazda ayrı marka sayfası olmasın. Marka logosu marka filtresi uygulanmış listelemeye gitsin. Şeritte yalnız ürünü olan markalar gösterilsin. | Faz 1 | Hayır |
| B-UX-41 | **Koleksiyon sayfaları.** "Tümünü gör" vitrinden nereye gidiyor? | Vitrin bloklarındaki "Tümünü gör" linkinin hedefi olmalı. | Koleksiyon listeleme sayfası; filtreli kategori. | Koleksiyon, listeleme şablonunun bir varyantı olsun (aynı bileşen, başlık + açıklama farklı). | Faz 1 | Hayır |
| B-UX-42 | **Breadcrumb ve mobil gezinme karşılığı.** | Mobilde menü, kategori ve arama aynı alanı paylaşır. Tanımsız kalırsa header mobilde dağılır. | Hamburger drawer; alt gezinme çubuğu; ikisi. | Breadcrumb olsun (Ana sayfa › Kategori › Ürün; mobilde tek seviye geri linki). Mobil menü soldan açılan drawer olsun; içinde kategoriler ikonlu, "Üye ol" vurgulu, yasal/iletişim altta. Alt gezinme için B-UX-50'ye bakın. | Faz 2 | Hayır |

---

## E. Arama davranışı

| ID | Boşluk | Neden önemli | Seçenekler | Öneri | Bloke ettiği faz | Soru gerekli mi? |
|---|---|---|---|---|---|---|
| B-UX-38 | **Arama mimarisi.** Anlık mı, overlay mı, sonuç sayfası mı? İstemci tarafı mı? | Header bileşeni ile veri katmanının arama sözleşmesini belirler. | (a) Anlık overlay + sonuç sayfası. (b) Yalnız sonuç sayfası. (c) Harici arama servisi. | (a), istemci tarafında. Katalog ~150 ürüne kadar sorunsuz; daha büyüğü için B-UX-18. Overlay en fazla 6 ürün + eşleşen kategoriler + "Tüm sonuçlar (N)" göstersin. Sonuç sayfası listeleme şablonunu kullansın ve URL'de sorgu taşısın. | Faz 1–2 | Hayır |
| B-UX-43 | **Türkçe karakter normalizasyonu ve yazım hatası toleransı.** | "sampuan", "dis macunu", "ILIFE/iLiFE/İlife" eşleşmezse küçük katalogda sonuçsuz arama artar. ı/İ büyük-küçük harf dönüşümü klasik bir hatadır. | Yalnız tam eşleşme; normalizasyon; normalizasyon + bulanık eşleşme. | Normalizasyon (ı/i/İ/I, ş/s, ğ/g, ö/o, ü/u, ç/c eşdeğer; büyük/küçük harf duyarsız) + hafif bulanık eşleşme. Kabul kriterine örnek sorgular olarak yazılsın. | Faz 1 | Hayır |
| B-UX-44 | **Ürün kodu ve barkodla arama.** Distribütörler ve üyeler kodla arar (ör. "ASB046"). | Portföy izleyicisi (distribütör) bunu dener. | Var / yok. | Kod ve barkod aranabilir olsun; kod eşleşmesi en üstte çıksın. Kod, detay sayfasında küçük puntoyla görünsün. | Faz 1 | Hayır |
| B-UX-45 | **Arama önerileri / son aramalar / popüler aramalar.** | Boş overlay'de ne gösterileceği belirsiz. | Boş; popüler kategoriler; son aramalar (localStorage). | Boş overlay'de kategori kısayolları + son 5 arama (yerel) gösterilsin. | Faz 2 | Hayır |

---

## F. Filtre, sıralama, sayfalama

| ID | Boşluk | Neden önemli | Seçenekler | Öneri | Bloke ettiği faz | Soru gerekli mi? |
|---|---|---|---|---|---|---|
| B-UX-46 | **Muhtemel veriyle hangi filtre boyutları kullanılabilir?** Elde olan: kategori, marka, fiyat. Elde olmayan: stok, rozet, cilt tipi, içerik. | Veri olmayan filtre tasarlanırsa boş görünür ya da yalan söyler. 2–10 ürünlük kategoride 5 filtre gereksiz karmaşa yaratır. | Tam filtre paneli; yalnız mevcut boyutlar; ürün sayısına göre görünürlük. | Bu fazda kategori, marka ve fiyat aralığı. Cilt tipi/endişe filtresi veri gelince açılsın (B-UX-19). 12'den az sonuçta filtre paneli yerine yalnız sıralama + marka çipleri gösterilsin. | Faz 1 | Hayır |
| B-UX-47 | **Sıralama seçenekleri.** | "Popüler" ve "çok satan" için veri yok. | Önerilen, fiyat artan/azalan, yeni, A–Z, PV. | "Önerilen" (koleksiyon sırası), fiyat artan/azalan, yeni. PV'ye göre sıralama müşteri arayüzünde olmasın. | Faz 1 | Hayır |
| B-UX-48 | **Sayfalama / sonsuz kaydırma / "daha fazla yükle".** | Ölçeğe bağlı. Sonsuz kaydırma footer'a ulaşmayı ve geri dönüşte konum korumayı bozar. | Üç seçenek. | 24'lük gruplarla "Daha fazla yükle" + "N / M ürün" göstergesi; geri dönüşte konum korunsun. Açılış ölçeğinde çoğu kategoride hiç görünmez. | Faz 2 | Hayır |
| B-UX-49 | **Filtrelerin URL'ye yansıması ve mobil filtre ekranı.** | URL'ye yansımazsa paylaşılabilirlik, geri tuşu ve SEO bozulur. Mobil filtre ekranı tasarlanmazsa geliştirici masaüstü panelini sıkıştırır. | URL parametresi / durum; mobilde tam ekran sayfa / alt sayfa (bottom sheet). | Filtre ve sıralama URL'de olsun (indekslenme kuralı SEO uzmanında). Mobilde alttan açılan tam yükseklik panel olsun: "N ürünü göster" düğmesi + seçili filtre çipleri + "Temizle". | Faz 2 | Hayır |

---

## G. Mobile özgü davranış

| ID | Boşluk | Neden önemli | Seçenekler | Öneri | Bloke ettiği faz | Soru gerekli mi? |
|---|---|---|---|---|---|---|
| B-UX-50 | **Alt gezinme çubuğu olacak mı?** | Tüm mobil ekranların alt alanını, yapışkan "Sepete ekle"yi ve çerez banner'ını etkiler. | Var (Ana sayfa / Kategoriler / Ara / Sepet / Üye ol); yok. | Yok. Az sayıda üst hedef var, alt alan detay sayfasındaki yapışkan "Sepete ekle" ve drawer için ayrılsın. Header'da arama ikonu + sepet sayacı + menü bulunsun. | Faz 2 | Hayır |
| B-UX-51 | **Detay sayfasında yapışkan "Sepete ekle".** | Mobil dönüşümün ana anı. Fiyat/üye fiyatı ile birlikte gösterilip gösterilmeyeceği belirsiz. | Her zaman; ana CTA ekrandan çıkınca; yok. | Ana CTA görünümden çıkınca alttan açılsın: küçük görsel + fiyat (liste/üye) + düğme. iOS güvenli alanına uyulsun. | Faz 2 | Hayır |
| B-UX-52 | **Header'ın kaydırmada küçülmesi ve gizlenmesi.** | Hareket bütçesi ve CLS ile ilgili. Mega/açılır menü ile etkileşir. | Sabit; küçülen; aşağı kayınca gizlenip yukarı kayınca gösterilen. | Masaüstünde küçülen yapışkan header. Mobilde aşağı kaydırınca gizlenen, yukarı kaydırınca görünen header. Hareket tasarımcısına devir. | Faz 2 | Hayır |
| B-UX-53 | **Galeri kaydırma, drawer'lar, dokunma hedefleri.** | Çoğu ürünün tek görselli olması galeri etkileşimini azaltır (B-UX-26). Drawer'ların üst üste açılma kuralı (menü + sepet) tanımsız. | — | Galeride yatay kaydırma + nokta gösterge (2+ görselde). Aynı anda yalnız bir drawer açık olabilsin. Dokunma hedefi en az 44×44 px. Kart üzerindeki sepete ekle ikonu da bu boyutta olsun. | Faz 2 | Hayır |

---

## H. Header ve footer bileşenleri

| ID | Boşluk | Neden önemli | Seçenekler | Öneri | Bloke ettiği faz | Soru gerekli mi? |
|---|---|---|---|---|---|---|
| B-UX-54 | **Favori ve karşılaştırma sayaçları.** §7'deki "alınacaklar" listesinde var, kapsamda tanımsız. | Header ikonu, kart ikonu, favoriler sayfası ve karşılaştırma tablosu demek; 4 ek bileşen. Sonradan eklenirse kart düzeni değişir. | Favori (yerel) + karşılaştırma; yalnız favori; hiçbiri. | Yalnız favori, localStorage'da. Kartta kalp ikonu ve header'da sayaç bulunsun; basit "Favorilerim" sayfası yapılsın. Karşılaştırma ~40 heterojen ürünlük katalogda (diş fırçası ile deterjanı karşılaştırmak) değer üretmez, kapsam dışı kalsın. | Faz 1 | Hayır |
| B-UX-55 | **Hesap ikonu backend yokken neye gidiyor?** | Header'daki ikon ölü kalamaz. Giriş/kayıt ise kapsam dışı (B-UX-17). | Gizle; Greenleaf üye girişine dış link; "yakında". | İkon küçük bir panel açsın: "Üye ol" (sponsor linki) + "Üye girişi — Greenleaf" (dış link, yeni sekme). Hesabım sayfası yapılmasın. | Faz 2 | Hayır |
| B-UX-56 | **Dil seçici.** §7 rakip header'ında var; site yalnız Türkçe. | Boş ya da tek seçenekli dil seçici amatör görünür. | Yok; TR/EN. | Dil seçici olmasın. | Faz 2 | Hayır |
| B-UX-57 | **"Üye ol" ile "Partner ol" terminolojisi; header CTA'sının vurgusu.** Rakip "Partner ol" diyor, MEMORY "üye". | Ana alışveriş CTA'sı ile yarışan ikinci bir vurgulu düğme "tek net CTA" ilkesini zayıflatabilir. | Header'da vurgulu düğme; metin link; yalnız menüde. | Terim "Üye ol" olsun (içerik editörü doğrulasın). Header'da ikincil stilde düğme (dolu değil) olsun; mobilde menü drawer'ında vurgulu satır. | Faz 2 | Hayır |
| B-UX-58 | **Footer içeriği.** Bülten kaydı (backend yok), sosyal medya hesapları, yasal linkler, distribütör kimliği, ödeme logoları (ödeme kapalı). | Bülten formu veri toplayamaz. Ödeme logoları yanıltıcı olur. | — | Bülten formu olmasın. Ödeme logoları ödeme açılana kadar gösterilmesin. Sosyal hesaplar varsa eklensin. Distribütör kimliği Soru 3'e bağlı. | Faz 2 | Hayır |

---

## I. Fiyat gösterimi

| ID | Boşluk | Neden önemli | Seçenekler | Öneri | Bloke ettiği faz | Soru gerekli mi? |
|---|---|---|---|---|---|---|
| B-UX-59 | **Çift fiyatın anlamı ve sepette tahsil edilen fiyat.** §6'da "liste = güncel × 2". Paneldeki fiyat (ör. 145 ₺) üye fiyatı mı? Üye olmayan müşteri sepette hangi fiyatı öder? Üye fiyatından alışveriş nasıl yapılır (bu sitede üye girişi yok)? | Kart, detay, sepet ve özetteki her fiyat bileşeni buna bağlı. Üye fiyatı bu sitede hiç tahsil edilemiyorsa yeşil rozet "erişilemez fiyat" olur. Kart yalnızca ×2 fiyatı satıyorsa da algı "pahalı" olur. | (a) Müşteri liste fiyatını öder, üye fiyatı Greenleaf'te üye olunca geçerlidir. (b) Sitede de üye fiyatı uygulanır (üye doğrulaması gerekir, backend). (c) Herkes üye fiyatını öder (liste fiyatı yalnızca referans). | Kullanıcıya sorulsun (Soru 2). Varsayılan: (a). Sepet toplamı liste fiyatıyla hesaplansın; altında "Üye olsaydınız X ₺ tasarruf ederdiniz → Üye ol" satırı bulunsun. | Faz 1 | **Evet** |
| B-UX-60 | **Liste fiyatı gösteriminin hukuki çerçevesi.** Liste fiyatı üstü çizili "indirim" gibi sunulursa, indirim duyurusu kurallarına (önceki fiyat ilişkisi) takılabilir. Hukuki tavsiye değildir. | Kartın görsel dili belirlenir: üstü çizili fiyat + "%50" etiketi mi, yoksa iki eşit meşru fiyat ("Fiyat" / "Üye fiyatı") mı? Sonradan değişirse tüm fiyat bileşenleri değişir. | Üstü çizili + yüzde etiketi; iki ayrı etiketli fiyat. | İki ayrı ve etiketli fiyat olsun: "Fiyat" (siyah) ve "Üye fiyatı" (yeşil rozet). Üstü çizgi ve "%50 indirim" etiketi kullanılmasın. Kampanya bloğu gerçek bir kampanya verisi olmadan açılmasın. Uzman kontrolü için not düşülsün. | Faz 2 | Hayır |
| B-UX-61 | **"Üye olsaydın şu kadar tasarruf" mesajının yerleri ve sıklığı.** | Her yerde gösterilirse üyelik baskısı ana sayfayı ele geçirir; §7 bunu açıkça istemiyor. | Kart / detay / drawer / ödeme özeti / üye ol sayfası. | Kartta yalnız iki fiyat olsun, mesaj olmasın. Detayda tek satır mesaj + "Nasıl üye olunur" linki. Drawer'da toplam tasarruf satırı. Ödemenin son adımında ikincil CTA. Ana sayfada yalnız üyelik bölümünde. | Faz 2 | Hayır |
| B-UX-62 | **PV gösterimi.** PV müşteri için anlamsız, distribütör (portföy izleyicisi) içinse anlamlı. | Kartta yer kaplar, kafa karıştırır. Hiç gösterilmezse de distribütöre yönelik vitrin değeri azalır. | Kart + detay + sepet; yalnız detay; hiç. | Kartta olmasın. Detayda kod ve hacmin yanında küçük "PV" bilgisi + açıklama ipucu olsun. Drawer'da toplam PV küçük puntoyla gösterilsin. | Faz 2 | Hayır |
| B-UX-63 | **Fiyat biçimi.** Kuruş, binlik ayırıcı, ₺ konumu ("1.250,00 ₺" mi "₺1.250" mi), KDV ibaresi, kargo satırı. | Tutarsızlık premium hissi bozar. KDV ve kargo satırı özet bileşenini belirler. | — | "1.250 ₺" (kuruş 0 ise gösterilmesin, varsa ",50"). Detayda "KDV dahil" notu olsun. Özette kargo "Sonraki adımda hesaplanır" olarak gösterilsin. İçerik editörü doğrulasın. | Faz 2 | Hayır |

---

## J. Görsel yön bağımlılıkları (özet; ayrıntı §J-1 ve §J-2'de)

| ID | Boşluk | Neden önemli | Seçenekler | Öneri | Bloke ettiği faz | Soru gerekli mi? |
|---|---|---|---|---|---|---|
| B-UX-64 | **S-001 gelmeden Faz 2 başlarsa yeniden tasarım riski.** | Üç yönün karışım oranı, ekranların büyük kısmını belirliyor. | Bekle; bloke olmayan işlerle ilerle. | §J-2'deki işler S-001 beklenmeden yürütülsün. §J-1'deki kararlar notlar gelene kadar dondurulsun. | Faz 2 | Hayır (S-001 zaten açık) |
| B-UX-65 | **Brandbook renkleri beyaz metinle erişilebilir kontrastı sağlamıyor.** Hesapla: beyaz üzerinde `#4EAE36` ≈ 2,8:1, `#30A8D7` ≈ 2,7:1, lime daha düşük. WCAG AA normal metin için 4,5:1, büyük metin için 3:1 ister. | "Yeşil rozette üye fiyatı" (K-007) ve yeşil düğmelerdeki beyaz metin AA'yı geçemez. CLAUDE.md kuralı "renkler brandbook'tan" diyor; koyu ton türevi kural ihlali sayılabilir. | (a) Metin ve rozet için aynı tonun koyulaştırılmış türevi. (b) Yeşil yalnız zemin/dekorda, metin koyu. (c) Erişilebilirliği gevşetmek. | Kullanıcıya sorulsun (Soru 5). Varsayılan: (a) + (b). Brandbook tonları yüzey, motif ve büyük grafiklerde aynen kalsın. | Faz 2 | **Evet** |

### J-1. Görsel yön notlarına (S-001) bağlı bloke kararlar

S-001'deki notlar gelmeden bu kararlar **kesinleştirilmemeli**. Her birinde neyin karar verileceği yazılı.

1. **Üç yönün karışım oranı ve sayfa bazında ağırlığı.** Doğal/yeşil, premium/editoryal ve sade/bilimsel. Ör. ana sayfa editoryal ağırlıklı, detay sayfası bilimsel ağırlıklı olabilir.
2. **Fotoğraf stili.** Packshot zemini (beyaz, renkli, dokulu), gölge ve yansıma; yaşam tarzı fotoğrafı kullanılıp kullanılmayacağı ve tonu (B-UX-02 ile birlikte).
3. **Hero yaklaşımı.** Tam genişlik fotoğraf, ürün kompozisyonu, tipografi ağırlıklı ya da karusel; hero'da kaç mesaj olacağı.
4. **Tipografi hiyerarşisi.** Poppins tek aile mi; Futura başlıkta mı, yoksa hiç mi kullanılacak (lisans durumu da bunu etkiler); editoryal yön için serif bir eşlik fontu isteniyor mu (brandbook ile çatışabilir).
5. **Pinwheel motifinin yoğunluğu.** Yalnız logo, bölüm ayırıcı, arka plan deseni ya da yükleme animasyonu.
6. **Yeşil/mavi çizgi bantlarının kullanımı.** Header/footer kenarı, bölüm geçişi, kart detayı ya da hiç.
7. **Renk oranları.** Beyaz zemin oranı; lime ve mavinin rolü (vurgu mu, kategori kodlaması mı).
8. **Köşe yarıçapı, yoğunluk (ferah ya da sıkı), gölge dili.**
9. **İkon stili.** Çizgi ya da dolu, kalınlık; kategori ikonlarının illüstratif mi piktogram mı olacağı (B-UX-38a'daki şerit buna bağlı).
10. **Koyu mod.** İstenip istenmediği. Varsayılan "yok"; ancak notlarda bir işaret varsa token yapısı değişir.
11. **Ürün kartı estetiği.** Çerçeveli ya da çerçevesiz, zemin rengi, fiyat rozetinin şekli.
12. **Hareketin karakteri.** Organik/yumuşak mı, keskin/bilimsel mi (yoğunluğu L bölümünde).
13. **Editoryal bileşenlerin varlığı.** Büyük alıntı, çok sütunlu hikâye, tam sayfa görsel blokları.

### J-2. Notlar gelmeden ilerleyebilecekler

1. Sayfa haritası, bölüm akışları ve bölüm bölüm wireframe tarifleri (yapısal, stilsiz).
2. Veri şeması genişletmesi (B-UX-01), yayına alma kuralları (B-UX-31), kategori taksonomisi (B-UX-39), koleksiyon mekanizması (B-UX-03).
3. Tüm tanımsız durumların davranış tarifi (C bölümü) ve mikro metinler.
4. Bileşen envanteri ve her bileşenin durum listesi (anatomi, renksiz).
5. Token **yapısı ve adlandırması** (değerleri hariç). Ayrıca brandbook renklerinin kontrast tablosu.
6. Görsel normalizasyon boru hattının teknik kısmı (oran, boyut, format). Zemin rengi hariç.
7. Erişilebilirlik ve performans hedefleri (M bölümü), demo senaryosu (L bölümü).
8. Claude Design devir sözleşmesi (K bölümü) ve boş tuvalin düzenlenmesi.
9. Arama/filtre davranışı, fiyat gösterimi kuralları (I bölümü). Rozetin görsel biçimi hariç.

---

## K. Claude Design → HTML export → `design/` → kod iş akışı

| ID | Boşluk | Neden önemli | Seçenekler | Öneri | Bloke ettiği faz | Soru gerekli mi? |
|---|---|---|---|---|---|---|
| B-UX-66 | **Export'un otoritesi.** "Piksel piksel aktarım" (§12) ile "token'lar tek dosyada" (§4) çelişiyor. Export'taki 17 px boşluk ile token ölçeğindeki 16 px'ten hangisi geçerli? | Bu çözülmezse her sayfada tasarım sapması tartışması çıkar. Kalite denetçisi neye göre ölçeceğini bilemez. | (a) Export piksel otoritesi. (b) Token/bileşen spesifikasyonu otorite, export görsel referans. (c) Karma: düzen ve kompozisyon export'tan, sayısal değerler token'dan. | Kullanıcıya sorulsun (Soru 6). Varsayılan: (c). | Faz 2–3 | **Evet** |
| B-UX-67 | **Mobil ekranlar ayrıca tasarlanacak mı; hangi kırılım noktaları?** | Export tek genişlikte statik HTML'dir. Mobil tasarlanmazsa geliştirici mobili uydurur; kullanıcı da mobili ilk kez Vercel önizlemesinde görüp itiraz eder. | Yalnız masaüstü; masaüstü + mobil; 3 kırılım. | Öncelikli 5 sayfa + ödeme adımları için masaüstü (1440) ve mobil (390) ekranları ayrı tasarlansın. Tablet (768) tasarlanmasın, kurallarla türetilsin. Bu da Soru 6 kapsamında onaylansın. | Faz 2 | Hayır (Soru 6 ile birlikte) |
| B-UX-68 | **Hangi sayfalar tam tasarlanacak, hangileri bileşenlerden türetilecek?** | Claude Design'da her ekran zaman ve token maliyeti demek (§3: "dev prompt yok"). | — | Tam tasarım: ana sayfa, listeleme, ürün detay, sepet drawer, ödeme 3 adım, üye ol. Türetilecek: koleksiyon, arama sonuçları, favoriler, 404, hakkımızda/iletişim, yasal şablon. | Faz 2 | Hayır |
| B-UX-69 | **Export'un ifade edemedikleri.** Hover/focus/disabled durumları, animasyon, açılır menü ve drawer, boş/hata durumları, değişken içerik uzunluğu. | Bunlar export'ta görünmezse Faz 3'te "tasarımda yoktu" boşluğu doğar. | Ayrı durum ekranları; durum tablosu dokümanı; ikisi. | Kritik durumlar (drawer açık, boş sepet, filtre paneli açık, pasif ödeme adımı, sonuçsuz arama) ayrı ekran olarak tasarlansın. Geri kalanı bileşen spesifikasyonlarındaki durum tablolarında yer alsın. Hareket ayrıca `hareket.md`'de tanımlansın. | Faz 2 | Hayır |
| B-UX-70a | **Sürümleme, adlandırma ve onay adımı.** | Hangi export'un onaylı olduğu bilinmezse eski sürüm kodlanır. | — | Klasör adı `design/<sayfa>/<kırılım>/v<N>` biçiminde olsun. Kullanıcı onayı KARAR-KAYDI'na "TS-<sayfa>-vN ONAYLI" olarak işlensin. Onaysız export kodlanmasın. Boş tuval ("Site Önizleme") ana dosya olarak yeniden adlandırılıp kullanılsın. | Faz 2 | Hayır |

---

## L. "Portföy vitrini" amacının etkisi

| ID | Boşluk | Neden önemli | Seçenekler | Öneri | Bloke ettiği faz | Soru gerekli mi? |
|---|---|---|---|---|---|---|
| B-UX-71 | **Hangi sayfalar "gösteriş" sayfası?** Cila bütçesi nereye harcanacak? | Her yere eşit cila zaman/maliyeti patlatır. Hiçbir yere cila ise portföy amacını boşa çıkarır. | — | Gösteriş: ana sayfa (hero, şerit, vitrin geçişleri), ürün detay (galeri, sepete ekleme anı), sepet drawer. İşlevsel-sade: listeleme, ödeme, yasal sayfalar. | Faz 2 | Hayır |
| B-UX-72 | **Animasyon bütçesi ile Core Web Vitals çatışması; prefers-reduced-motion.** | Ağır hero animasyonu LCP'yi bozar. Hareket kısıtlı kullanıcılar için alternatif tanımsız. | — | LCP öğesi (hero görseli/başlığı) animasyonla gecikmesin. Giriş animasyonları yalnızca transform/opacity ile yapılsın, ağır animasyon kütüphanesi ana sayfa ilk yüklemesine girmesin. prefers-reduced-motion'da tüm hareket kapansın ya da anlık geçişe dönsün. Faz 2'de hareket envanteri tanımlansın: her animasyon için tetik, süre ve azaltılmış hareket karşılığı (hareket tasarımcısı). | Faz 2 | Hayır |
| B-UX-73 | **Demo senaryosu.** Distribütöre gösterirken izlenecek yol tanımsız. | Portföy değeri en çok bu 2 dakikalık yolda görülür. Tasarım ve QA önceliği bu yola göre verilmeli. | — | Ana sayfa hero → kategori şeridi → listeleme + filtre → ürün detay → sepete ekle (drawer) → ödeme 1–2 → devre dışı 3. adımın zarif mesajı → üye ol. Hem masaüstünde hem mobilde kusursuz olsun. Kabul kriterlerine "demo yolu" olarak eklensin. | Faz 1 | Hayır |
| B-UX-74 | **Vitrin sitesinde "tasarlayan" imzası/kredisi.** | Footer düzenini etkiler. Müşteri sitesinde reklam izlenimi verebilir. | Kredi yok; küçük footer kredisi. | Kredi olmasın. Portföy anlatımı demo üzerinden yapılsın. | Faz 2 | Hayır |

---

## M. Erişilebilirlik ve performans hedefleri

| ID | Boşluk | Neden önemli | Seçenekler | Öneri | Bloke ettiği faz | Soru gerekli mi? |
|---|---|---|---|---|---|---|
| B-UX-75 | **WCAG düzeyi tanımsız.** | Kabul kriterleri ölçülemez. Kontrast konusu (B-UX-65) karara bağlanamaz. | AA / AAA / tanımsız. | WCAG 2.2 AA. Klavyeyle tam akış (drawer odak tuzağı, Esc ile kapanma), görünür odak, form hata mesajları, ekran okuyucu için fiyat etiketleri ("Üye fiyatı 145 ₺"). | Faz 1 | Hayır |
| B-UX-76 | **Performans bütçesi tanımsız.** | Portföy amacı ve SEO için ölçülebilir hedef gerekli. | — | Mobilde 75. yüzdelikte LCP ≤ 2,5 sn, CLS ≤ 0,1, INP ≤ 200 ms. Lighthouse mobilde Performans ≥ 90 ve Erişilebilirlik ≥ 95. Ana sayfa ilk yükleme görsel ağırlığı bütçesini SEO uzmanı belirlesin. | Faz 1 | Hayır |
| B-UX-77 | **Desteklenen tarayıcılar ve cihazlar.** | QA matrisi ve tasarımın en dar genişliği buna bağlı. | — | Chrome, Edge, Firefox ve Safari'nin son 2 sürümü; iOS Safari 16+; Android Chrome. En dar genişlik 360 px (320 px'te kırılmasın). | Faz 1 | Hayır |

---

## N. Diğer çelişkiler

| ID | Boşluk | Neden önemli | Seçenekler | Öneri | Bloke ettiği faz | Soru gerekli mi? |
|---|---|---|---|---|---|---|
| B-UX-70 | **Site kimliği.** Çalışma adı "Greenleaf Türkiye", ancak site bir distribütöre ait (resmî Greenleaf değil; white-label de yok). | Header, footer, sayfa başlıkları, hakkımızda, yasal satıcı bilgisi ve SEO başlığı buna bağlı. Resmî site izlenimi marka/hukuk riski taşır. Portföy anlatımı da bunu etkiler. | (a) "Greenleaf Türkiye". (b) Greenleaf logosu + "Bağımsız Greenleaf Distribütörü" ibaresi + distribütör adı. (c) Distribütörün kendi markası. | Kullanıcıya sorulsun (Soru 3). Varsayılan: (b). | Faz 1 | **Evet** |
| B-UX-78 | **Açılış tarihi ile proje fazı çelişiyor.** MEMORY "Türkiye açılışı 16 Kasım 2026" diyor (yarın); proje ise Faz 0'da. Sitenin hedef yayın tarihi tanımlı değil. | Cila kapsamı (L) ve sonraki sayfa kapsamı (B-UX-17) süreye göre ayarlanmalı. | — | Açılış tarihi Greenleaf'in Türkiye açılışıdır, site tarihi değildir. Site için hedef tarih proje yöneticisinin ana listesinde ele alınsın (UX dışı; buraya yalnızca atıf). | Faz 1 | Hayır (PM ana listesine) |
| B-UX-79 | **Ürün metinlerinde tedavi edici iddia riski.** Katalogda bulunan örnek: "Güneş yanığı, böcek ısırığı ve küçük kesiklerdeki tahrişi gidermek için idealdir". | Bu metinler doğrudan detay sayfasına akarsa TİTCK kuralı (CLAUDE.md §6) ihlal edilir. | — | Ağustos katalog metinleri yayından önce içerik editörünün denetiminden geçsin (devir). Denetlenmemiş metin "yayına alma" kuralında engelleyici olsun. | Faz 1 | Hayır |
| B-UX-80 | **Marka listesi ile veri uyuşmuyor.** MEMORY "Yibelle" diyor, veride "YIBEIL/YIBEILE" var. "pinkpoint" listede yok. Kardli ve Easylove'un TR ürünü görünmüyor. | Marka filtresi, marka şeridi ve kart marka satırı tutarsız olur. | — | Tek bir kanonik marka listesi oluşturulsun (yazım, logo, ürün sayısı); veri mühendisi ve içerik editörü birlikte hazırlasın. 0 ürünlü marka görünmesin. | Faz 1 | Hayır |
| B-UX-81 | **Sepet sayfası ayrıca var mı?** MEMORY yalnız "sepet (drawer)" diyor. | Drawer'dan "Ödemeye geç" ile ödeme 1. adıma mı, yoksa ayrı bir sepet sayfasına mı gidileceği belirsiz. Mobilde drawer içinde uzun sepet düzenlemek zor. | Yalnız drawer; drawer + sepet sayfası. | Ayrı sepet sayfası olmasın. Ödeme adımlarının sağında (mobilde üstte açılır) düzenlenebilir sipariş özeti bulunsun. | Faz 1 | Hayır |
| B-UX-82 | **Ana sayfa bölüm akışı (§7) ile "alışveriş önde" ilkesi.** §7 akışında ürünler 4. bölümde başlıyor (hero → marka mesajı → neden Greenleaf → vitrinler). | Alışveriş niyetli kullanıcı iki bilgi bölümünden sonra ürünle karşılaşır. §7'deki "alışveriş önde" kaçınılacaklar maddesiyle çelişiyor. | §7 sırası; ürün odaklı sıra. | Hero → ikonlu kategori şeridi → 1. ürün vitrini → marka mesajı/neden Greenleaf (birleşik) → 2. vitrin → üyelik → hikâye/güven → markalar → footer. Faz 1 wireframe'inde kesinleşsin. | Faz 1 | Hayır |

---

## Tasarım devri (handoff) gereksinimleri

Claude Design ekranlarının Faz 3'e eksiksiz geçebilmesi için gerekenler:

1. **Ekran listesi ve kırılımlar.** B-UX-68'deki tam tasarım sayfaları 1440 ve 390 genişlikte hazırlanmalı. Tablet kurallarla türetilir.
2. **Zorunlu durum ekranları.** Sepet drawer (dolu/boş), mobil menü açık, kategori açılır paneli açık, mobil filtre paneli açık, arama overlay (sonuçlu/sonuçsuz), ödeme 1–2–3 (3. adım devre dışı), tek görselli ve görselsiz ürün detayı, 404.
3. **Gerçek veriyle tasarım.** Lorem ve sahte ürün kullanılmamalı. Her ekranda katalogdan en uzun ad, en kısa ad, en yüksek ve en düşük fiyat ile tek görselli ürün yer almalı. Böylece kırpma ve hizalama sorunları tasarımda görünür.
4. **Otorite kuralı** (Soru 6). Sayısal değerler (renk, boşluk, radius, tipografi ölçeği) için tek kaynak `docs/tasarim/tokens.json`. Export düzen ve kompozisyon için referanstır. Tasarımda token dışı bir değer görülürse ya token'a eklenir ya da tasarım düzeltilir; kod "export'ta öyleydi" gerekçesiyle sapmaz.
5. **Bileşen eşlemesi.** Her ekrandaki her parçanın bir bileşen spesifikasyonu karşılığı olmalı (ürün kartı, fiyat bloğu, rozet, düğme, çip, drawer, adım göstergesi, şerit öğesi). Adlandırma tasarımda ve dokümanda aynı olmalı. İngilizce bileşen adı ile Türkçe açıklama birlikte verilmeli.
6. **Durum tabloları.** Her etkileşimli bileşen için varsayılan, hover, odak, basılı, pasif, yükleniyor, hata ve boş durumları yazılı olmalı (export bunları göstermez).
7. **Hareket notları.** Ekranlarda hareket olan yerler işaretlenmeli; tanımı `docs/tasarim/hareket.md`'de yapılmalı (tetik, süre, eğri, azaltılmış hareket karşılığı). Export'ta hareket aranmaz.
8. **Varlık listesi.** Kullanılan her görsel, ikon ve motif için kaynak, lisans ve hedef boyut belirtilmeli. Kategori ikon seti ve pinwheel/bant motifleri SVG olarak teslim edilmeli.
9. **Sürüm ve onay.** `design/<sayfa>/<kırılım>/v<N>` yapısı kullanılmalı. Kullanıcı onayı KARAR-KAYDI'na işlenmeli; Kapı 2'den sonra değişiklik, değişiklik talebi olarak açılmalı.
10. **Kabul.** Kalite denetçisi export ile önizlemeyi aynı genişlikte yan yana karşılaştırmalı. Tolerans, token kuralına uyum olarak ölçülür, piksel farkı olarak değil (Soru 6 cevabına göre güncellenir).

---

## Kullanıcıya sorulması önerilenler (etki sırasına göre)

S-001…S-004 zaten açık; tekrar sorulmadı.

| # | Soru (tek satırda cevaplanabilir) | Öneri | İlgili boşluk |
|---|---|---|---|
| 1 | Sitede yalnız Türkiye'de satılabilen ~40 ürün mü olacak, yoksa daha geniş bir katalog mu (yaklaşık kaç ürün)? | Yalnız TR-aktif ürünler. Menü sade olsun, mega menü ürün sayısı ~100'ü geçince eklensin. | B-UX-18, 04, 32, 38a, 46 |
| 2 | Panel fiyatı (ör. 145 ₺) üye fiyatı, iki katı (290 ₺) liste fiyatı mı; üye olmayan müşteri sitede liste fiyatını mı öder? | Evet. Sepet liste fiyatıyla toplar, altında "Üye olsaydınız X ₺ tasarruf" ve "Üye ol" yönlendirmesi olur. | B-UX-59, 60, 61 |
| 3 | Site hangi kimlikle yayınlanacak: "Greenleaf Türkiye" mi, distribütör adı + "Bağımsız Greenleaf Distribütörü" ibaresi mi (iletişimde ad, e-posta, telefon görünecek mi)? | Distribütör adı + "Bağımsız Greenleaf Distribütörü" ibaresi; iletişimde e-posta ve telefon. | B-UX-70, 21, 58 |
| 4 | Ürün fotoğrafları dışında yapay zekâ ile üretilmiş ya da stok yaşam tarzı fotoğrafı kullanabilir miyiz, yoksa yalnız resmî Greenleaf görselleri mi? | Resmî görseller + temizlenmiş packshot'lar. Hero için gerekirse yapay zekâ görseli kullanılsın, ürün görünümünü değiştirmemek kaydıyla. | B-UX-02 |
| 5 | Erişilebilirlik için yeşilin bir koyu tonunu yalnız metin, düğme ve fiyat rozetinde kullanabilir miyiz (brandbook tonları zeminde ve motiflerde aynen kalır)? | Evet. Aksi hâlde beyaz yazılı yeşil rozet okunabilirlik standardını geçemez. | B-UX-65 |
| 6 | Claude Design ekranları kodda piksel otoritesi mi olsun, yoksa düzen tasarımdan, ölçüler ortak token dosyasından mı alınsın; mobil ekranlar da ayrıca tasarlansın mı? | Düzen tasarımdan, ölçüler token'dan; 5 öncelikli sayfa için masaüstü ve mobil ayrı tasarlansın. | B-UX-66, 67 |
| 7 | ISO/GMP/Helal gibi sertifikaların gösterilebilir belgeleri (PDF/görsel) elinizde mi? | Yoksa sertifika rozeti bölümü yayında gizli kalsın; belge gelince açılsın. | B-UX-08 |
| 8 | Başlangıç setleri (3 set) müşteriye normal ürün gibi mi satılacak, yoksa yalnızca üyelik paketi olarak mı anlatılacak? | Normal ürün olarak "Setler" kategorisinde. | B-UX-16 |

## Soru sormadan varsayılan olarak önerilen kararlar

Bunlar KARAR-KAYDI'na `ÖNERİ` olarak işlenmeye adaydır. Kullanıcı itiraz etmezse Faz 1'de bu varsayılanlarla ilerlenir.

1. Ürün şeması isteğe bağlı alanlarla genişletilir (benefits, usage, ingredients, skinTypes, concerns, certifications, collections, related, isNew, seo); boş alan bölümü gizler (B-UX-01).
2. Yayına alma kuralı: TR ad + fiyat + en az 1 görsel. Rusça metin hiçbir zaman gösterilmez. Metinler TİTCK denetiminden geçer (B-UX-31, 79).
3. Koleksiyonlar veri katmanında anahtar → ürün listesi olarak tutulur. Ekip önerir, kullanıcı onaylar. Bir ürün ana sayfada tek blokta görünür (B-UX-03, 04).
4. Ana sayfa sırası alışveriş önde: hero → kategori şeridi → vitrin → marka mesajı → vitrin → üyelik → hikâye/güven → markalar. Haber bölümü şimdilik yok (B-UX-05, 82).
5. Taksonomi: tek seviyeli 9 tüketici kategorisi; ayrı marka sayfası yok, marka = filtre; koleksiyon = listeleme varyantı (B-UX-39, 40, 41).
6. Gezinme: masaüstünde açılır kategori paneli + ikonlu şerit; mobilde soldan drawer; alt gezinme çubuğu yok (B-UX-38a, 42, 50).
7. Arama: istemci tarafında anlık overlay + sonuç sayfası; Türkçe karakter normalizasyonu, hafif yazım hatası toleransı, kod/barkod araması (B-UX-38, 43, 44, 45).
8. Filtreler: kategori, marka, fiyat; URL'ye yansır; mobilde alttan tam panel; sıralamada PV yok; 24'lük "Daha fazla yükle" (B-UX-46…49).
9. Ürün kartı: kartın tamamı detaya gider ve tek bir "Sepete ekle" düğmesi taşır; iki fiyat etiketlidir, üstü çizgi ve yüzde etiketi yoktur; PV kartta yoktur (B-UX-12, 60, 62).
10. Tek görsel öncelikli detay sayfası; galeri 2+ görselde açılır; markalı görsel yer tutucusu (B-UX-26).
11. Stok bilinmiyorsa satılabilir sayılır; "Tükendi" durumu tasarlanır ama tetiklenmez. Varyant UI'ı yok, şemada yeri ayrılır (B-UX-28, 32).
12. Sepet: yalnız drawer, ayrı sayfa yok; satır başına 1–10 adet; sepet kod + miktar saklar, fiyatı veriden okur; artık var olmayan ürün bildirimle düşer; ilk eklemede drawer açılır (B-UX-35, 36, 37, 81).
13. Ödeme: 3 adım; misafir; girilen bilgiler hiçbir yere gönderilmez ve bu açıkça yazılır; 3. adımda ödeme seçenekleri görünür ama pasiftir, "Online ödeme çok yakında" mesajı ve ikincil "Üye ol" yolu bulunur; kargo "hesaplanacak" görünür (B-UX-13, 14, 30, 63).
14. Header: favori (yerel) var, karşılaştırma yok; hesap ikonu "Üye ol / Greenleaf üye girişi" panelini açar; dil seçici yok; "Üye ol" ikincil stilde (B-UX-54…57).
15. Footer: bülten formu yok, ödeme logoları yok, tasarımcı kredisi yok (B-UX-58, 74).
16. Bu fazda yapılacak sonraki sayfalar: 404/hata, hakkımızda+iletişim, yasal sayfa şablonu, favoriler. Blog ve cilt testi için yer ayrılır, ama etiket alanları şimdiden doldurulur. Giriş/hesabım kapsam dışıdır. Değerlendirme alanı gizli kalır (B-UX-09, 17, 19, 20).
17. Çerez kullanan analitik yok, dolayısıyla banner yok; fontlar kendi sunucumuzdan yüklenir (B-UX-22).
18. Hedefler: WCAG 2.2 AA; mobilde LCP ≤ 2,5 sn, CLS ≤ 0,1, INP ≤ 200 ms; son 2 tarayıcı sürümü + iOS 16+; en dar genişlik 360 px (B-UX-75…77).
19. Portföy: gösteriş sayfaları ana sayfa, ürün detay ve drawer; reduced-motion zorunlu; demo yolu kabul kriterine yazılır (B-UX-71…73).
20. Devir: tam tasarlanacak sayfa seti, zorunlu durum ekranları, gerçek veriyle tasarım, `design/<sayfa>/<kırılım>/v<N>` sürümleme, KARAR-KAYDI'na onay kaydı (B-UX-68…70a).
