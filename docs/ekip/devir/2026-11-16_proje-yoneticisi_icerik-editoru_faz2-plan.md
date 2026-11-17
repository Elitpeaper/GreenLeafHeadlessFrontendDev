---
kimden: proje-yoneticisi
kime: icerik-editoru
tarih: 2026-11-16
durum: AÇIK
ilgili: K-062, K-067, K-068, K-069, K-085 (ONAYLI); K-086, K-088, K-090, K-095, K-098, K-099 (ÖNERİ); docs/plan/wireframe/{pv,uye-ol,sepet-drawer,cilt-tipine-gore,ana-sayfa,urun-detay}.md; docs/arastirma/pv-resmi-kaynak.md
---

## Ne yaptım
Plandaki tüm taslak mikro metinleri yeni kararlara göre güncelledim. Kullanıcı K-085 ile kazanç/iş fırsatı içeriğini onayladı (K-015 İPTAL); plan bu içeriği yalnız PV sayfasındaki ayrı bölüme koyuyor (K-099).

## Senden istediğim
1. **PV sayfası metinleri** (`pv.md`): hero, üç adım, §5 "PV üyelere ne sağlar" (`pv-resmi-kaynak.md`'deki 4 madde; TR'de teyit edilmeyeni çıkar), §6 iş fırsatı için yapılandırılmış `businessPlan` (12 ödül adı + 1 cümle, kâr marjı, kâr paylaşımı, liderlik seviyeleri + eşikler — **yalnız resmî pazarlama planındaki rakamlar**, atıf satırı, başta/sonda "Kazanç kişisel çalışmaya bağlıdır, garanti değildir" uyarısı), SSS. Pazarlama planı yalnız videoda (`marketing_greenleaf.mp4`) ise yazıya dökülmesi gerekebilir — Orkestratör'e bildir.
2. **PV ipucu** metni (K-060 taslağı) + yakında eki "Türkiye'de satışa çıktığında değişebilir."
3. **Sepet drawer**: pasif düğme açıklaması ("Online ödeme altyapımız hazırlanıyor…"), "Üye ol" düğme metni (ui önerisi "Üye ol, üye fiyatıyla al"), duyuru şeridi ("Online alışveriş çok yakında…").
4. **Bulucu**: 5 tip yardım metni, ihtiyaç görünen adları, "Neden önerdik" şablonu, uyarı notu, e-posta kartı metinleri (iki onay kutusu metni), sonuç e-postası içeriği; `/cilt-tipine-gore/{tip}` için 80–150 kelimelik tip açıklamaları.
5. **Yasal metin taslakları** (uzman kontrolüne gidecek): KVKK aydınlatmaya e-posta işleme bölümü; `/yasal/e-posta-acik-riza` (sonuç gönderimi açık rızası + ticari ileti onayı ayrı).
6. **Mevzuat hassas ürünler**: `bant-ve-yamalar`, `diger-saglik-urunleri` alt kategori adları ve PDP sabit uyarı notu; bu ürünlerde iddia denetimi.
7. **Üye ol**: SSS'ye "Greenleaf iş fırsatı nedir?" (tek cümle + bağlantı); "Üye fiyatı nedir?" cevabında %50 ifadesi yalnız kaynak atfıyla.
8. Yakında ürünlerin Türkçe başlıkları (`publishReady` için) — önizleme için en azından cilt bakımı + mega menü öne çıkanlarında kullanılacak örnekler önce.

## Bilmen gerekenler
- Kazanç içeriği ana sayfa, ürün, kategori, sepet, bulucu ve mega menüde **yok** (KK-12-05).
- Fiyat gösteriminde yüzde/üstü çizgi/tasarruf hâlâ yasak (K-036).
- Tıbbi/tedavi edici iddia yok (TİTCK).

## Kabul kriteri
Metinler `data/content/` (veya kendi alanında) yapılandırılmış hâlde; `KABUL-KRITERLERI.md` KK-0-05, KK-6-07, KK-7-07, KK-7-09, KK-8-02, KK-12-03, KK-12-05 metin taramalarından geçer; yasal taslaklar uzman kontrol listesine eklenmiş.
