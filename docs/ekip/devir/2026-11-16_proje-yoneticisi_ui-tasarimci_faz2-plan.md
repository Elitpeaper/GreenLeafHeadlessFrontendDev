---
kimden: proje-yoneticisi
kime: ui-tasarimci
tarih: 2026-11-16
durum: AÇIK
ilgili: K-062…K-071, K-085 (ONAYLI); K-086…K-099 (ÖNERİ); docs/plan/wireframe/{ana-sayfa,mega-menu,pv,premium-tema,sepet-drawer,cilt-tipine-gore,kategori,urun-detay}.md; docs/tasarim/bilesenler/*
---

## Ne yaptım
Planı Kapı 1 kararlarına göre güncelledim ve senin K-072…K-084 bileşen belgelerinle hizaladım: mega menü (1 öne çıkan + 1 tanıtım, ≤ 8 görselli karo, packshot kompozisyonu), hover Z1–Z3 (klavye odağı dahil, yüksek kontrastta kapalı), yakında kartta "Ürünü incele", iki ayrı onay kutusu, fiyat rozeti temada değişmez, bant/yama slug'ları. Kalan farklar aşağıda.

## Senden istediğim
1. **Bulucu ekranları:** `skin-finder.md`'yi 4 soruluk testten tek sayfa bulucuya uyarla (`wireframe/cilt-tipine-gore.md`, K-089): sol yapışkan seçim paneli (5 tip kartı + hassas anahtarı + ≤ 3 ihtiyaç çipi), sağda canlı sonuç; Rutin/Tüm uygun ürünler sekmesi; rutin seviyesi segmentli seçici. Doku karoları ve bant dili korunur. Adres `/cilt-tipine-gore`.
2. **E-posta servis yokken:** formu hiç gösterme; yerine "Sonucunu sakla · Bağlantıyı kopyala" kartı (K-090; senin §3'teki "gönderimde yakında" durumu kaldırılır).
3. **Ana sayfa A/B varyantları** (`ana-sayfa.md` başı): PV yerleşimi (A ayrı bant / B senin üyelik girişi sahnen) ve premium sunumu (A ayrı premium sahne / B Vitrin 2 Setler sekmesi). Önizlemede ikisini de kur; kullanıcı Kapı 2'de seçer. Brief §5 "Cilt testi bandı"nı bulucu bandına çevir (5 tip çipi doğrudan bantta, `?tip=`).
4. **Hover ek seçenekleri** (K-093): vitrin hover'ında header bandının da değişmesi; hero packshot'larının bölge olması — önizlemede aç/kapa varyantı.
5. **PV sayfası** (`wireframe/pv.md`): kullanıcı K-085 ile kazanç içeriğini onayladı (K-015 İPTAL). `pv-explainer.md`'ye §5 "PV üyelere ne sağlar" + §6 "Greenleaf iş fırsatı" (`#is-firsati`: 12 ödül, kâr marjı, kâr paylaşımı, liderlik basamakları; başta ve sonda "garanti değildir" uyarı kutusu, atıf satırı) ekle. Ana sayfada ve diğer sayfalarda kazanç içeriği yok (K-099).
6. **Temalı koleksiyon sayfası** düzeni (`premium-tema.md` §A5) ve temalı PDP (§A3) — en az 1 örnek önizlemede.
7. `tasarim-kurallari.md` §9 "altın/metalik yok" maddesini "yalnız ana tema" diye daralt (K-065), henüz yapılmadıysa.

## Bilmen gerekenler
- Hero packshot'ları fiyatsız, yalnız PV — KK-0-01'in tek istisnası olarak plana işlendi.
- Ekranda en çok 2 sürekli hareket; 5 sn'yi aşan ambient için durdurma yolu (K-097). Marka marquee'si durdurulabilir olduğu sürece izinli.
- Mevzuat hassas alt kategoriler (`bant-ve-yamalar`, `diger-saglik-urunleri`) öne çıkan/tanıtım/vitrinde kullanılmaz; PDP'de sabit uyarı notu yeri gerekir.
- Yakında ürünlerin tamamı şu an `publishReady: false` (Türkçe başlık yok) — önizlemede gerçek yakında kartı için birkaç örnek gerekirse icerik-editoru'nden iste.

## Kabul kriteri
Bileşen belgeleri `KABUL-KRITERLERI.md` §1, §2, §6, §7, §11, §12 ile çelişmez; A/B ve hover seçenekleri önizlemede `?varyant=` gibi bir yolla değiştirilebilir; her tema/palet için kontrast tablosu `docs/tasarim/` altında (KK-11-03).
