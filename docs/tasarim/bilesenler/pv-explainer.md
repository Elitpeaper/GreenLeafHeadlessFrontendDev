# Bileşen — PV açıklama sayfası ve bölümü (`PvExplainer`)

> ui-tasarimci · v1 · 2026-11-16 · Dayanak: **K-062** (PV tüm ürünlerde görünür, ayrı sayfa veya bölüm, sitenin ana mesajlarından biri), K-015 (kazanç dili yok), K-060 (ipucu metni) · ÖNERİ K-080
> URL önerisi `/pv`; kesin URL'yi seo-uzmani belirler. Metinleri icerik-editoru yazar. Buradaki metinler yalnız yer tutucudur.

## 0. Tasarım problemi
PV kullanıcı için soyut bir sayıdır. Hedef, PV'yi **anlaşılır** (ne, nerede, nasıl toplanıyor) ve **çekici** (somut, görsel, oyunsu ama abartısız) kılmaktır. Bunu yaparken **kazanç, gelir, prim, ekip** dili kullanılmaz (K-015). PV'nin üyeye ne sağladığına dair cümleler yalnız resmî Greenleaf kaynağına dayanır (ACIK-SORULAR S-014 ve yeni soru S-026). Kaynak gelmezse "ne sağlar" bölümü gizli kalır, sayfa yine anlamlıdır.

## 1. Görsel kimlik: "PV çipi"
PV'nin sitedeki tek görsel imzası lime çiptir (lime-100 zemin + lime-700 metin, 5.57). Sayfa bu çipi büyütür: dev bir PV çipi, içinde `mega` boyutta rakam (lime-700, dekoratif) ve çevresinde LeafCluster bulunur. Kart, drawer ve sayfa aynı görsel dili konuşur; kullanıcı çipi gördüğü her yerde bu sayfayı hatırlar.

## 2. Sayfa (`/pv`) bölümleri
| # | Bölüm | Görsel | İçerik (yer tutucu) |
|---|---|---|---|
| 1 | **Hero** | Beyaz zemin. Sağda dev PV çipi illüstrasyonu (`mega` "12,5" + "PV"), arkasında lime/green LeafCluster. Altta signature bant | H1 "PV nedir?" · alt metin: "Her Greenleaf ürününün bir puan değeri var. Bu sayfada kısaca anlatıyoruz." · K-060 cümlesi vurgulu |
| 2 | **"Nerede görürsün?"** | 3 karo yan yana: (a) ürün kartı kırpımı, PV çipi halkayla işaretli · (b) ürün detayı fiyat bloğu · (c) sepet özeti "Toplam PV". Karolar `--accent-soft` zeminli ve gerçek bileşen görüntüleridir (ekran görüntüsü değil, canlı bileşen) | Her karoya 1 cümle |
| 3 | **"Nasıl toplanır?" — canlı örnek** | **Etkileşimli hesap şeridi:** gerçek veriden 3 TR ürünü mini kart olarak dizilir, her birinin altında adet adımlayıcı bulunur. Sağda "Toplam PV" büyük rakamla canlı güncellenir. Formül görünür: "PV × adet = toplam" | "Sepetindeki ürünlerin PV değerleri toplanır." Sepete ekleme **yoktur** (yalnız hesap; tek CTA kuralı) |
| 4 | **"Türkiye'ye yakında ürünlerde de PV var"** | Bir yakında kartı (rozetli, PV'li) | K-062'nin açıklaması: fiyat henüz yok, PV bilgisi var |
| 5 | **"PV üyelere ne sağlar?"** (koşullu) | 3 ikonlu madde, açık lime-50 zemin | Yalnız resmî kaynaktan doğrulanmış maddeler. **Kazanç, gelir ve ekip ifadeleri yasak.** Kaynak yoksa bölüm render edilmez |
| 6 | **SSS** | Akordeon (56 px başlıklar) | "PV para mı?" (hayır, puan değeri) · "Üye olmasam da PV görür müyüm?" · "PV'yi nerede takip ederim?" (Greenleaf üye paneli, dış bağlantı) |
| 7 | **Tek CTA** | Beyaz bant, ortalanmış | "Üye ol" → `/uye-ol` (birincil) |

## 3. Kompakt bölüm (ana sayfa ve footer)
- **Ana sayfa bandı** (brief §8, üyelik bölümüyle tek bölüm içinde): solda büyük PV çipi + 1 cümle, sağda 3 ürünün mini PV toplama animasyonu (çipler toplam kutusuna akar). Bağlantı "PV nedir? →". Yükseklik ≤ 360 px.
- **Footer şeridi** (`footer.md` [A]): PV çipi + 1 cümle + bağlantı.
- **PV popover** (kart ve drawer ⓘ): K-060 metni + "PV nedir? →" bağlantısı. En fazla 280 px genişlik.

## 4. Durumlar
Örnek ürün verisi yoksa §3 hesap şeridi statik bir örnek tabloya döner (gerçek bir ürün; uydurma rakam kullanılmaz) · §5 kaynaksız → gizli · reduced-motion açıkken toplam sayısı anlık değişir.

## 5. Mobil
Hero'da çip illüstrasyonu üstte (≤ 200 px), metin altta durur. §2 karoları yatay ray olur. §3'te ürünler alt alta dizilir, toplam kutusu alt kenarda yapışkan olur (bölüm içinde).

## 6. Erişilebilirlik
Dev rakam `aria-hidden` olur. Aynı bilgi metinde de bulunur. Canlı toplam `aria-live="polite"` ile duyurulur. Adımlayıcı düğmelerinin adı "{ürün} adedini artır" olur.

## 7. Hareket noktaları (→ hareket-tasarimcisi)
Hero çipinin girişi (ölçek + rakam sayımı, reduced'da statik) · §2 karolarındaki halka vurgusunun çizilmesi · §3 toplam sayısının geçişi ve çiplerin toplam kutusuna "akması" · ana sayfa bandında aynı akış (görünür alana girince bir kez).
