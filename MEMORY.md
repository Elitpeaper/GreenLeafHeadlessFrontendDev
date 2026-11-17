# Greenleaf Türkiye E-Ticaret Sitesi — Proje Hafızası

> Plan sohbetinden Claude Code'a aktarım notu. Son güncelleme: 15 Kasım 2026.
> Bu dosya projenin bağlamıdır. Kod yazmadan önce oku. Belirsiz bir nokta varsa varsayım yapma, sor.

## 1. Proje özeti
- Greenleaf ürünlerini satan bir distribütör için e-ticaret sitesi.
- Greenleaf **Çin merkezli** bir firma (Suzhou Greenleaf). En güçlü pazarı Rusya/BDT. "Rus markası" diye yazma.
- Ana firmayla Türkiye'deki sorun çözüldü, ürünler gelmeye başladı. Türkiye açılışı: **16 Kasım 2026**.
- Site iki işe yarayacak:
  1. Distribütörün kendi satış ve üye kazanma sitesi
  2. Diğer Greenleaf satıcılarına gösterilecek **portföy/vitrin** ("bu kişiye bu siteyi yaptım")
- Diğer satıcılar için çoklu satıcı (white-label) sistemi **YOK**. Tek site.
- **WhatsApp ile satış YOK.**
- Sitenin en büyük farkı ve müşteri kazanma yolu: **ön yüzün (UI) güzelliği.**

## 2. Kapsam ve aşamalar
- **Şimdiki aşama: sadece headless frontend.** Backend ve diğer işler sonra planlanacak.
- Deploy: **Vercel**.
- Backend yokken ödeme adımı devre dışı kalacak ("Online ödeme çok yakında" gibi kibar bir durum). Akışın tamamı tasarlanmış ve tıklanabilir olmalı.
- Üye kaydı: Ayrı bir sayfa veya bölümden, butonla Greenleaf ana sitesine yönlendirme. Link, distribütörün **kişisel referans/sponsor linki** olmalı ki kayıtlar onun ekibine yazılsın. (Link henüz alınmadı.)
- Yeni ürünler için HTML/PDF katalog da ileride güncellenecek. Site ve katalog **aynı ürün verisinden** beslenmeli.

### Sayfalar
Öncelikli:
1. Ana sayfa
2. Kategori / ürün listeleme (filtre + arama)
3. Ürün detay
4. Sepet (drawer) + ödeme adımları (son adım devre dışı)
5. Üye ol

Sonra: Giriş/kayıt, hesabım, hakkımızda/iletişim, blog/cilt bakımı rehberi, "cildine uygun ürünü bul" testi, yasal sayfalar.

## 3. Kararlar
- **Ürün odağı henüz kararlaştırılmadı.** Ana sayfadaki "öne çıkanlar / yeni ürünler / kampanya" gibi bölümler sabit ürünlerle değil, **veriden beslenen esnek vitrin blokları** olarak yapılacak. Backend gelince hangi koleksiyonun öne çıkacağı oradan seçilecek.
- **Görsel yön:** Üç yönden de alınacak (doğal/yeşil, premium/editoryal, sade/bilimsel). Kullanıcının detaylı notları var, **henüz paylaşılmadı.** Tasarım kararlarını bu notlar gelmeden kesinleştirme.
- **Çalışma tarzı:** Aşama aşama ilerlenecek. Önce araştırma ve referans siteler, sonra tasarım. Tek seferde dev bir tasarım promptu yazılmayacak (token israfı). Kullanıcı sonucu görmeden ajan ekibini çalıştırmak istemiyor.

## 4. Teknik iskelet (öneri)
- Next.js (App Router) + Tailwind, Vercel.
- **Veri katmanını ayır:** UI ürünleri doğrudan değil `lib/products.ts` (`getProducts()`, `getProduct(slug)`, `getCategories()`, `getCollection(key)`) üzerinden alır. Şimdilik JSON'dan okur, backend gelince yalnızca bu dosya değişir.
- JSON şeması gerçek bir e-ticaret API'sine benzemeli: id, slug, code, title, brand (alt marka), category, images[], description, content, volume/gramaj, boxQty, price (liste), memberPrice (üye), pv, stock, badges[].
- Sepet: Zustand + localStorage.
- **Design tokens** tek dosyada (renk, font, boşluk, radius). Design drift'i önlemek için `tasarim-kurallari.md` dosyası CLAUDE.md içinden `@-import` ile yüklenir.
- Backend adayları (sonra karar verilecek): Medusa.js veya Shopify Storefront API. Belirleyici kriter: iyzico/PayTR entegrasyonunun kolaylığı.

## 5. Marka (resmî brandbook + panelden alınan logo SVG)
- Yeşil `#4EAE36`, lime `#86B726`, mavi `#30A8D7`
- Font: Poppins (brandbook'ta Futura da geçiyor)
- Beyaz zemin, yeşil + mavi çizgi bantları, altı yapraklı fırıldak (pinwheel) motifi
- Kullanıcı "muted botanical" tarzını reddetmişti. Tasarım **gerçek Greenleaf marka kimliğine sadık** olmalı.
- Logo değiştirilmeden kullanılmalı.

## 6. Ürün verisi
- Ağustosta yapılan katalog projesinde 37 Türkiye-aktif ürün temizlenmiş durumda (`index.html` + `images/` + `greenleaf-katalog.pdf`). Kullanıcının bilgisayarında/GitHub'ında. Site verisi için başlangıç noktası bu.
- Ürün adlarındaki "(Kutu başına N adet)" ifadesi **addan çıkarılmalı**, ayrı bir detay alanına taşınmalı.
- Çift fiyat yapısı: liste fiyatı = güncel fiyat × 2 (siyah), üye/indirimli fiyat yeşil rozet içinde.
- Greenleaf panel API'si (distribütör girişiyle): `greenleaf-global.com/api/v1/shop/goods`
  - Türkiye ürünleri: `visitor_group=1,10,13,27,28,34,38,41&with_price=try&instance=0&limit=10000`
  - `fields`: id, code, title, content, description, price, points, category, barcode, photo
  - `description` = kısa Rusça meta (hacim + koli adedi), `content` = uzun Rusça pazarlama metni
  - Kategoriler: `/api/v1/shop/goods/category`
  - Id ile çekerken 15'lik gruplar halinde iste
- Alt markalar: Carich, Easylove, iLife, Kardli, Nilrich, Sealuxe, Yibelle (ve diğerleri). Katalog çok geniş: kozmetik, hijyen, ev, bebek, sağlık, tekstil, ayakkabı, mutfak.

## 7. Referans site analizi: global.green-leaf.shop (resmî Rusça mağaza, OpenCart)
**Alınacaklar**
- İkonlu kategori şeridi + alt kategorili mega menü (geniş katalog için şart)
- Header: logo, kategori menüsü, arama, favori/karşılaştırma/sepet sayaçları, ayrı vurgulu "Partner ol" CTA
- Bölüm akışı: hero → marka mesajı → neden Greenleaf → ürün vitrinleri → sekmeli kategori vitrini → fabrika/marka hikâyesi → üyelik → güven şeridi → haberler/içerik → markalar → footer
- Haber/içerik bölümü (SEO için blog karşılığı)

**Kaçınılacaklar (bizim farkımız)**
- %50 partner indirimi reklam ediliyor ama fiyatlara yansımıyor → bizde kartta **liste fiyatı + üye fiyatı** net görünecek, "yarı fiyatına almak için üye ol" yönlendirmesi olacak
- "Sepete ekle" ve "Talebe ekle" butonları açıklamasız yan yana → **tek net CTA**
- Aynı ürünler birden fazla bölümde tekrar ediyor → vitrin blokları birbirini tekrarlamayacak
- Ürün adlarında koli bilgisi (toptancı dili) → temiz perakende adları
- Ana sayfanın büyük kısmı üye toplama/gelir vaadi → **alışveriş önde**, üyelik tek ve şık bir bölümde "indirimli alışveriş" avantajı olarak
- ISO/GMP/Helal iddiaları kanıtsız → görsel sertifika rozetleri + tıklanabilir belgeler, ürün sayfasında değerlendirme alanı

## 8. Diğer satıcı siteleri (rakip seviyesi)
Kazakistan, Özbekistan ve Rusya'daki distribütör siteleri: hazır şablon görünümü, dağınık ürün adları, kayıt paketleri ana sayfada, bazıları sadece tanıtım kataloğu. **Çıta düşük.** Premium bir UI ile fark kolayca ortaya çıkar.

## 9. İlham siteleri (yönlere göre)
- Doğal/yeşil: Tata Harper (yeşil-altın), True Botanicals, Farmacy
- Premium/editoryal: Tatcha, ILIA (ürün sayfasında sertifika rozetleri), Isla Beauty
- Sade/bilimsel: Typology (cilt analizi testi), Biossance
- Eğitici: Peach & Lily (içerik sözlüğü + cilt testi), Paula's Choice, Glow Recipe (ürün eşleştirme testi)
- Rakiplerde olmayan iki fikir: "cildine uygun ürünü bul" testi, içerik/sertifika rozetleri

## 10. Yasal (tam e-ticarete geçmeden önce, frontend aşamasında gerekmez)
ETBİS kaydı, mesafeli satış sözleşmesi + ön bilgilendirme formu, 14 gün cayma hakkı, KVKK aydınlatma + çerez onayı, e-arşiv/e-fatura. Kozmetikte TİTCK kaydı ve tedavi edici iddia içermeyen ürün metinleri. Ödeme altyapısı başvurusu için bu belgeler gerekecek. (Hukuki tavsiye değildir, uzmana kontrol ettirilmeli.)

## 11. Bekleyen girdiler (kullanıcıdan)
- [ ] Görsel yön ve detaylar için kullanıcının notları
- [ ] Katalog dosyaları (zip) + yeni gelen ürünlerin verisi
- [ ] Logo SVG + brandbook PDF
- [ ] Kişisel referans/sponsor linki
- [ ] Repo/deploy düzeni (GitHub → Vercel)

## 12. Çalışma notları
- Kullanıcının akışı: Claude Design'da tasarım → onaylanınca HTML export → `design/` klasörü → VS Code + Claude ile framework'e piksel piksel aktarım.
- Ajan ekibi planlanıyorsa önce şunlar netleşmeli: sayfa haritası, bölüm bölüm wireframe tarifi, ajan görev dağılımı (ortak token dosyası + veri katmanı kuralları), sayfa başına kabul kriterleri (mobil, fiyat gösterimi, CTA).
- Kullanıcı varsayım yapılmasını ve gereksiz soruları sevmiyor. Net öneri ver, gerçekten belirsizse kısa sor.
- Claude Design'da "Greenleaf Türkiye — Site Önizleme" adlı **boş** bir tuval var (yanlışlıkla oluşturuldu, içi boş).
