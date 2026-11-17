# Ürün kartı ilhamı (K-174)

> frontend-gelistirici (Geliştirici A) · 2026-11-16 · Yalnız bağlantı ve desen notu; görsel kopyalanmadı.
> Yöntem: siteler komut satırından açıldı (HTML yapısı ve sınıf adları incelendi). Bir kısmı bot korumasıyla 403/429 döndü; bu siteler için desen notu herkese açık mağaza deneyimine dayanır ve "doğrulanamadı" diye işaretlendi.

## Kaynaklar
| Kaynak | Bağlantı | Erişim |
|---|---|---|
| Typology | https://www.typology.com/ | açıldı (200) |
| Paula's Choice listeleme | https://www.paulaschoice.com/skin-care-products | açıldı (200) |
| Biossance | https://www.biossance.com/ | açıldı (200) |
| Glossier | https://www.glossier.com/ | açıldı (200), koleksiyon sayfası 429 |
| Tatcha | https://www.tatcha.com/ | açıldı (200) |
| Aesop | https://www.aesop.com/ | 403, doğrulanamadı |
| Sephora | https://www.sephora.com/ | 403, doğrulanamadı |
| Pinterest arama: "ecommerce product card ui" | https://www.pinterest.com/search/pins/?q=ecommerce%20product%20card%20ui | sayfa açıldı, içerik JS ile yükleniyor |
| Pinterest arama: "beauty product card" | https://www.pinterest.com/search/pins/?q=beauty%20product%20card | aynı |
| Dribbble arama | https://dribbble.com/search/beauty-product-card | 202 (bot kontrolü) |
| Behance arama | https://www.behance.net/search/projects/beauty%20ecommerce%20product%20card | 403 |

## Desenler (uyguladıklarımız)
1. **Çerçevesiz kart, görsel karosu ön planda** (Aesop, Glossier, Tatcha). Kutu, kenarlık ve gölge kartın tamamında değil, yalnız görsel karosunda. Metin beyaz zeminde nefes alıyor. → Kartımızdan dış çerçeve ve kart gölgesi kaldırıldı. Gölge yalnız hover'da görsel karosunda.
2. **Dikey (4:5) görsel alanı + yumuşak tint zemin** (Glossier, Typology, Tatcha). Ürün renginden gelen açık bir zemin ve ortada beyaz ışık hâlesi. → `--accent-soft` zemin (ürün paleti K-066) + beyaz radyal hâle + ürünün altında hafif "podyum" gölgesi.
3. **Hover'da fiyat satırının yerinde "Sepete ekle"** (Typology: bilgi satırı `group-hover:invisible`, aynı yükseklikte düğme beliriyor; sabit yükseklik sayesinde kart zıplamıyor). → Bizde eylem hiç gizlenmiyor (tasarim-kurallari): görselin sağ altında her zaman görünen yuvarlak "sepet +" düğmesi var, hover'da etiketle genişleyerek "Sepete ekle" hapına dönüşüyor.
4. **Hover'da detay açılması** (Sephora "Quick look", Paula's Choice): kısa açıklama veya hacim, görselin altında yarı saydam beyaz bir panelde beliriyor. → Kısa açıklama (yoksa hacim) panelde. Dokunmatikte yok.
5. **Marka "eyebrow" satırı** (Sephora, Glossier): ad üstünde küçük, büyük harf, aralıklı marka adı. → Marka satırı + ürün paletinden renkli küçük nokta.
6. **Zarif, az sayıda rozet** (Glossier, Biossance "New"/"Best seller"): görselin sol üstünde yarı saydam beyaz zeminde küçük hap. → Rozetler hap biçiminde, en çok bir tane.
7. **Sabit satır yüksekliği** (tüm referanslar): ad 2 satıra sabit, meta 1 satır, fiyat bloğu alta yaslı. Böylece ızgarada tüm kartlar aynı hizada. → `min-h-[2lh]` ad, 1 satır meta, `mt-auto` fiyat bloğu.
8. **Favori kalbi görsel karosunun içinde, sağ üstte, sade daire** (Sephora, Glossier). → Halka kaldırıldı, yarı saydam beyaz daire.

## Bilinçli olarak almadıklarımız
- Üstü çizili fiyat, yüzde indirim, "tasarruf" (K-036).
- Yıldız puanı ve yorum sayısı (K-018: uydurma yorum yok).
- Görselin üstüne doğrudan, zeminsiz yazı.
