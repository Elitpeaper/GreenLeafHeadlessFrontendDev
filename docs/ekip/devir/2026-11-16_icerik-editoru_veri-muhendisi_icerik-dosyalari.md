---
kimden: icerik-editoru
kime: veri-muhendisi
tarih: 2026-11-16
durum: KAPANDI
ilgili: data/content/products.tr.json, data/content/products.tr.yakinda.json, data/content/ui.tr.json, K-024, K-039, K-105, S-047..S-049
---

## Ne yaptım
- `data/content/products.tr.json`: 51 TR ürün (41 publishReady + 10 başlıksız). Anahtar = ürün kodu (kodsuz kayıt: `tr-3857`). Alanlar: `title_tr, shortDescription_tr, description_tr, features_tr[3], usage_tr, ingredients_highlight[], notices[], titleChanged, needsReview[]`. İddia denetimi uygulandı (UYUM-RAPORU R-01…R-08).
- `data/content/products.tr.yakinda.json`: yakında ürünler için `{code, title_tr, shortDescription_tr, review?}`; anahtar = `to-translate.json` id'si. Şu an ~159 kayıt (tüm SEALUXE S[AB]* cilt bakımı + 1 gıda). Dosya devam ettirilebilir (`_meta.progress`, `_meta.nextUp`).
- `data/content/ui.tr.json`: tüm arayüz mikro metni (düz anahtar → metin; `pv.faq`, `membership.faq`, `pv.business.plan` yapılandırılmış).

## Senden istediğim
1. `products.tr.json` değerlerini EL katmanı olarak bindir (K-105: `title_tr` bu dosyadaki değer katalog adının üzerine geçer — yaklaşık 26 üründe `titleChanged: true` (10'u önceden başlıksız olanlar); slug'lar yayın öncesi yeniden üretilmeli, kilit yok: K-110).
2. `needsReview` içeriğini `needsReview` bayraklarına taşıma veya `docs/veri/DOGRULAMA-RAPORU` uyarısına ekleme (iddia sözcüğü çıkarılan kayıtlar).
3. `notices` alanını (`cosmetic` | `supplement` | `regulated`) şemaya al (ürün detayında sabit uyarı notu; metin `ui.tr.json` → `product.notice.*`). Şema değişikliği gerekiyorsa frontend-mimar'la.
4. Yakında kayıtlarında `review` alanı olan ürünleri `publishReady=false` bırak veya editör kapısına koy (R-08).
5. Kalan ~1480 yakında ürün için `to-translate.json` sırasını koru; ben CARICH/iLiFE cilt-saç-vücut kodlarından devam ederim. İstersen yakında ürünler için kök kategori sütunu ekle (kategori bilgisi to-translate'te yok; ben koddan tahmin etmek zorundayım).

## Bilmen gerekenler
- Bu çalışmada komut çalıştırma aracım yoktu (yalnız dosya okuma/yazma/arama); bu yüzden toplu işlemler elle yapıldı. Otomasyon gerekirse (ör. `products.tr.json` → `products.json` birleştirme doğrulaması) senin hattında yapılmalı.
- Fiyat/PV metne yazılmadı. `usage_tr` kaynakta yoksa boş.
- Çatışmalar S-047: CCC001 (marka OKFAD mı CARICH mı), CCC029 (10'lu), ASF053/054, XNA038, SAA069. Başlıklar nötr bırakıldı.

## Kabul kriteri
`products.tr.json` birleştirilince 51 TR ürünün Türkçe başlığı ve metni dolu (boş alanlar bilinçli); yakında dosyası şemaya uygun okunuyor.

## Veri mühendisi yanıtı (2026-11-16) — KAPANDI
- EL katmanı `scripts/data/04-merge.mjs` içinde bindirildi (slug'lardan önce; EL başlığı katalog adını ezer, K-105). TR: title/shortDescription/description/features/usage + yeni `notices`, `ingredientsHighlight`, `contentReview` (editör needsReview, " | " ile birleşik), `regulated`. Yakında: title_tr, shortDescription_tr, `contentReview`(=review), `regulated` (review "regulated" ile başlıyorsa; 153 ürün).
- `nonProduct` kayıtlar (KAT053/A, MKT001, W0001-03) products.json'dan çıkarıldı.
- Madde 4 (R-08 kapısı): `publishReady` yalnız mekanik kural (K-024 ilk üç koşul). `regulated`/`contentReview` olanlar için insan kapısı frontend/yayın tarafında `regulated` bayrağına bakılarak uygulanmalı (pipeline bunları gizlemiyor; karar önerisi K-140).
- Madde 5: kök kategori sütunu gerekmiyor — pipeline kategori bilgisini zaten RU kaynaktan alıyor (`consumerCategory`).
- Yakında kayıtlarında 1635/1635 Türkçe başlık var (EL tamam). TR'de başlıksız kalan yok; görselsiz 5 TR ürün (S-050).
