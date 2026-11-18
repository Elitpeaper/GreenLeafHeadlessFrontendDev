# Haber / Blog envanteri (K-180, K-289)

Kaynak: global.green-leaf.shop (resmî mağaza; kullanım izni var). Yalnızca iki bölüm var: `/articles?section=company_news` (Şirket haberleri, 23 yazı) ve `/articles?section=eco` (ЭКО газета, 12 yazı); toplam **35** içerik, sayfalama yok. Başka haber/makale bölümü ana sayfa menüsünde yok (`/business` ayrı iş-planı sayfasıdır, pv-resmi-kaynak kapsamında).
Tarih aralığı: 2026-07-31 → 2026-10-23. Script: `scripts/data/blog-01-fetch.mjs` + `blog-02-extract.mjs` (önbellek `.cache/blog/`) → `scripts/data/news-01-raw.mjs` (ham katman + görseller). Robots.txt'e uyuldu, istekler arası 1,2 sn.

## Çıktılar
- `data/content/news.raw.json`: `{items[]}`; alanlar: `id, kind (haber|blog), section, date (ISO), title_ru, content_ru (ham HTML), text_ru, cover {src,width,height,sourceUrl}|null, inlineImages[], sourceUrl, cluster, suggestedUsage, usageNote, translated:false`. Rusça ham, çevrilmedi.
- `public/images/news/*.webp` (40 dosya, 3,2 MB, ≤ 1200 px): 27 kapak + 13 gövde içi görsel. Resmî Greenleaf görselleri; `stock-images` ile ayrı.
- Yayındaki Türkçe katman: `data/content/blog.json` (12 uyarlama, `blog-03/04` scriptleri) mevcut şemada kalır; bu ham katman onu geçersiz kılmaz.

## Sınıflandırma (öneri)
- `haber` = Şirket haberleri (23): etkinlik, yıl dönümü, duyuru. `blog` = ЭКО газета (12): kalıcı, rehber niteliği.
- Mevcut `blog.json` zaten 12 uyarlama içeriyor (kalan 23 kaynak: aşağıdaki küme/öneri).

| suggestedUsage | Adet | Anlamı |
|---|---|---|
| publish | 16 | Türkçe uyarlama adayı (7 haber, 9 blog) |
| merge | 8 | Aynı etkinliğin yinelenen duyuruları; `cluster` ile tek haberde birleştir |
| business | 4 | Ortak/gelir içeriği; haber akışına değil `/pv-nedir#is-firsati` bağlamına (K-085/K-099) |
| skip | 7 | Rus mağazasına özgü, doğrulanamayan genel iddia veya AB'ye özgü, düşük ilgi |

Eksikler: 8 içeriğin kapak görseli yok (çoğu ЭКО yazısı; `cover: null`, arayüz marka yer tutucusu göstermeli). Kategori/etiket alanı kaynakta yok (yalnız bölüm); `category_ru` bölüm adıdır, Türkçe kategori editörde atanır (mevcut blog.json: Cilt Bakımı, Ev ve Temizlik, Bilinçli Tüketim vb.).

## Risk notları
- Metinlerde kişi adları (yönetici adları), Rusya/BDT'ye özgü ayrıntılar ve bölgesel etkinlik takvimleri var; "Rus markası" ifadesi çıkarılmalı (CLAUDE.md §5).
- Tarihler 2026 görünüyor ve kaynakta öyle; doğrulama gerekmedi.

## Tam liste
| id | tür | tarih | öneri | küme | kapak | gövde görseli | Rusça başlık |
|---|---|---|---|---|---|---|---|
| upakovka-i-menshe-plastika-3 | blog | 2026-10-23 | skip | ambalaj | yok | 0 | Упаковка и меньше пластика: как биоразлагаемые альтернативы  |
| ekomarkirovka-bez-grinvoshinga | blog | 2026-10-16 | publish | - | yok | 0 | Экомаркировка без гринвошинга: как выбрать безопасные средст |
| biznes-greenleaf-tovary-ezhednevnogo-sprosa | haber | 2026-10-09 | business | - | var | 0 | Бизнес с Greenleaf на товарах ежедневного спроса |
| osoznannoe-potreblenie-avtomobilnaya-otrasl | blog | 2026-10-09 | skip | - | yok | 0 | Осознанное потребление в автомобильной отрасли: новые правил |
| chistota-bez-zapakha-khlorki | blog | 2026-10-01 | publish | - | var | 0 | Чистота без запаха хлорки: бережная уборка с заботой о семье |
| ukhod-za-kozhei-v-otopitelnyi-sezon | blog | 2026-10-01 | publish | - | var | 0 | Батареи греют — а как чувствует себя ваша кожа? |
| 3-letie-greenleaf-kyrgyzstan | haber | 2026-09-22 | publish | kirgizistan-tacikistan | var | 0 | Торжественное празднование 3-летия Greenleaf в Кыргызстане |
| greenleaf-2-years-tajikistan | haber | 2026-09-22 | publish | kirgizistan-tacikistan | var | 0 | Празднование 2-летия компании Greenleaf в Таджикистане |
| sortrirovka-i-pererabotka | blog | 2026-09-22 | publish | - | yok | 0 | Сортировка и переработка: как правильно утилизировать отходы |
| greenleaf-4-letie-kazahstan | haber | 2026-09-17 | publish | - | var | 0 | Greenleaf отпраздновал 4-летие в Казахстане |
| sortirovka-i-pererabotka-batarey | blog | 2026-09-15 | publish | - | yok | 0 | Сортировка и переработка батарей: что нужно знать |
| ekologichnyy-dom-2 | blog | 2026-09-11 | publish | ev-ekolojik | yok | 0 | Экологичный дом: как создать гармоничное пространство для жи |
| novye-vozmozhnosti-dlya-ustoychivogo-razvitiya-green-leaf | haber | 2026-09-08 | skip | - | var | 1 | Новые возможности для устойчивого развития: Green Leaf запус |
| osoznannoe-potreblenie-kruzhkovaya-ekonomika | blog | 2026-09-04 | skip | - | yok | 0 | Осознанное потребление: взгляд молодежи на круговую экономик |
| novye-dostizheniya-green-leaf | haber | 2026-09-03 | skip | - | var | 0 | Новые достижения Green Leaf: устойчивое развитие и инновации |
| greenleaf-7-years-anniversary-moscow | haber | 2026-09-02 | publish | 7-yil-konferansi | var | 0 | Конференция и гала-ужин Greenleaf в Москве: 7 лет успеха |
| greenleaf-7-letie-v-rossii | haber | 2026-08-31 | publish | 7-yil-konferansi | var | 0 | Greenleaf отмечает 7-летие в России: масштабная конференция  |
| meropriyatiya-greenleaf | haber | 2026-08-28 | merge | etkinlik-takvimi | var | 1 | Предстоящие мероприятия Greenleaf: Конференции и церемонии о |
| grafik-meropriyatiy-greenleaf-2026-3 | haber | 2026-08-26 | merge | etkinlik-takvimi | var | 0 | График предстоящих мероприятий Greenleaf в 2026 году |
| konferentsiya-greenleaf-7-let-v-rossii | haber | 2026-08-26 | publish | 7-yil-konferansi | var | 1 | Конференция «7 лет Greenleaf в России»: Вечер в стиле Велико |
| ekologichnyy-dom | blog | 2026-08-25 | publish | ev-ekolojik | yok | 0 | Экологичный дом: как создать комфортное пространство для жиз |
| semiletie-greenleaf-v-rossii | haber | 2026-08-24 | merge | 7-yil-konferansi | var | 1 | Семилетие Greenleaf в России: Фотографии с конференции |
| zapisi-konferentsii-greenleaf-7-let-v-rossii | haber | 2026-08-24 | merge | 7-yil-konferansi | var | 1 | Запись трансляции конференции Greenleaf: 7 лет в России |
| upakovka-i-menshe-plastika-2 | blog | 2026-08-18 | publish | ambalaj | var | 0 | Упаковка и меньше пластика: как новые правила ЕС изменят рын |
| glavnoe-sobytie-goda-uzhe-sovsem-skoro-22-avgusta-2026-goda-priglashaem-vas | haber | 2026-08-14 | merge | 7-yil-konferansi | var | 1 | ✨ Главное событие года уже совсем скоро! ✨  22 августа 2026  |
| global-green-leaf-ecological-products | haber | 2026-08-13 | skip | - | var | 1 | Новые возможности для экологически чистых товаров на Global  |
| grafik-meropriyatiy-greenleaf-2026-2 | haber | 2026-08-13 | merge | etkinlik-takvimi | var | 0 | График мероприятий Greenleaf на 2026 год |
| novye-vozmozhnosti-dlya-biznesa-s-green-leaf | haber | 2026-08-10 | business | - | var | 1 | Новые возможности для бизнеса с Green Leaf |
| 7-let-greenleaf-v-rossii | haber | 2026-08-07 | publish | 7-yil-konferansi | var | 1 | Грандиозное празднование 7 лет Greenleaf в России |
| novye-vozmozhnosti-dlya-pokupateley | haber | 2026-08-07 | skip | - | var | 1 | Новые возможности для покупателей на global.green-leaf.shop |
| grafik-meropriyatiy-greenleaf-2026 | haber | 2026-08-06 | merge | etkinlik-takvimi | var | 0 | График мероприятий Greenleaf на 2026 год |
| avtopromoushen-greenleaf | haber | 2026-08-04 | business | - | var | 1 | Запуск нового Автопромоушена Greenleaf |
| osoznannoe-potreblenie-i-eu-ecolabel | blog | 2026-08-03 | publish | ecolabel | var | 0 | Осознанное потребление: как выбрать экологически ответственн |
| puteshestvujte-s-greenleaf-promoushen-2026-2027 | haber | 2026-08-03 | business | - | var | 1 | Путешествуйте с Greenleaf: Новый международный промоушен |
| 7-let-greenleaf-rossiya | haber | 2026-07-31 | merge | 7-yil-konferansi | var | 1 | Празднование 7 лет Greenleaf в России: не пропустите! |
