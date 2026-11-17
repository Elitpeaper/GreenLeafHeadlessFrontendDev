# Ana sayfa v2 (maksimalist) metinleri

Kaynak brief: `docs/tasarim/briefler/ana-sayfa-maximalist.md`. Metinler `data/content/ui.tr.json` içinde `home.v2.*` altında. Anahtarlar düz noktalı biçimdedir (`t("home.v2.shelves.title")`). Dizi/nesne değerler `tRaw` ile okunur: `home.v2.hero.slides` (5 nesne), `home.v2.stripe.lines` (3 dize). `{ad}`, `{count}`, `{n}`, `{total}` yer tutucudur.

## Hero (K-233, K-243)
| Anahtar | Not |
|---|---|
| `hero.slides[i].eyebrow/titleLines/title/body/cta` | `titleLines` satır satır H1 (en çok 3 satır, satır başı ≤ 10 karakter: Doğadan / gelen / bakım. · Hepsi / tek / yerde. · Altın / dokunuş. · Her ürün / bir PV / taşır. · Cildine / uygun / olanı bul.). `title` birleşik düz metin (aria, SEO, h1 metni). Slayt 1 tek `h1`, diğerleri `h2`. |
| `hero.decor` | "DOĞA" dekor, `aria-hidden`. |
| `hero.secondary` | "Üye ol" ikincil bağlantı (`/uye-ol`). |
| `hero.region`, `hero.controls.*` | Slayt bölgesi ve kontrol etiketleri (önceki/sonraki/durdur/başlat/`goTo`/`status`). |

Gerekçe: Slayt 1 mevcut marka vaadini ("Doğadan ilham alan bakım") kısaltır; kısa, ritimli cümleler dev tipografide okunur. Slayt 2 K-038 geniş katalog; 3 K-101 gold set (içerik/altın oranı iddiası yok, "24K" gibi ifade kullanılmadı); 4 K-060 PV cümlesi birebir (kazanç dili yok, K-099); 5 K-089 bulucu ("uygun" ifadesi kozmetik, tedavi değil).

## Dev şerit
`stripe.lines`: "DOĞADAN İLHAM" (13), "TÜRKİYE'DE SATIŞTA" (18), "ÜYEYE ÖZEL FİYAT" (16): hepsi ≤ 22. `stripe.srOnly` tek cümle. `stripe.link` "Hikâyemiz" (`/hakkimizda`). "Üyeye özel fiyat" K-036 ile uyumlu: yüzde, "yarı fiyat", tasarruf yok.

## Bölümler
- Raf duvarı: `shelves.eyebrow/title/cta/count_*/tileLabel` ("Raflar", "Tüm ürünler").
- Vitrin 1: `showcase1.*` (`cta` sayılı, `ctaPlain` sayısız).
- Kapılar: `gates.eyebrow/title` ("Daha fazlası"), `gates.{pv,finder,premium,member,news}.{title,body,cta}`, `gates.soon` ("Çok yakında" rozeti, K-182: haberler hazır değilse bağlantısız + rozet). Üye ol karosunda yalnız indirimli alışveriş dili; kazanç içeriği yok (K-099).
- Vitrin 2: `showcase2.*` ("Keşfet").
- Marka duvarı: `brands.*` (`pause/play` K-158 hareketi durdur; `linkLabel` ekran okuyucu).

## Alt metinleri
Fotoğraf alt metinleri `stock-images.json`'da (hero.1/2, premium.gold.1, pv.scene, skinFinder.*). Packshot alt = ürün adı. Logo işareti, dekor kelime, dev şerit satırları, SVG sahneler, dev sayılar: `aria-hidden`, alt yok.

## Kurallar kontrolü
Tıbbi iddia yok; kazanç/PV-ödül dili yok; WhatsApp yok; sahte aciliyet yok; iç not ("taslak", "önizleme") yok (K-181); Greenleaf "Çin merkezli" ifadesi bu sayfada kullanılmadı (hakkımızda'da). Eski `home.*` (v1) anahtarları diğer sayfalar için yerinde bırakıldı.
