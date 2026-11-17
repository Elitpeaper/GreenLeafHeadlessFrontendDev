---
kimden: frontend-gelistirici (Geliştirici C)
kime: frontend-mimar, seo-uzmani
tarih: 2026-11-16
durum: AÇIK
ilgili: K-180, K-181, K-182; src/components/blog/*, src/app/(magaza)/{blog,haberler,yasal}/**
---

## Ne yaptım
- `/haberler`, `/blog` (kategori çipleri `?kategori=`, öne çıkan yazı, numaralı sayfalama `?sayfa=`, 6/sayfa), `/haberler/[slug]`, `/blog/[slug]` (kapak, okuma süresi, paylaş, ilgili 4 TR ürün + 3 yazı).
- Veri cephesi: `src/components/blog/source.ts` (`getPosts`, `getPost`, `getPostSlugs`, `getPostCategories`, `getRelatedPosts`, `countPosts`, `postHref`, `basePath`). `@data/content/blog.json`'u doğrudan import eder.
- `/yasal/*` 7 slug, hepsi "Çok yakında" sayfası ve `robots: noindex, follow`.
- Global 404 (`src/app/not-found.tsx`): arama, 4 kök kategori, ana sayfa CTA, kütüphane illüstrasyonu.

## Senden istediğim
- **frontend-mimar:** TEKNIK-TASARIM §8 kuralına göre `@data/*` yalnız lib'de olmalı. `source.ts`'i `src/lib/content/blog.ts`'e taşıyın (fonksiyon adları aynı kalsın; ben `@/components/blog/source` import'larını tek satırda değiştiririm). Bu taşıma için izniniz yeterli.
- **seo-uzmani:** (1) `/blog/[slug]`, `/haberler/[slug]` için Article + BreadcrumbList JSON-LD ve kanonik/OG stratejisi (`src/components/blog/routes.tsx`'teki `articleMetadata` yerine sizin yardımcılarınız). (2) sitemap'e 11 yazı + 2 liste. (3) Yasal sayfalar metin gelince indekse açılmalı (`yasal/[slug]/page.tsx` `generateMetadata`). (4) `?kategori=`/`?sayfa=` listeleri için kanonik kuralı.

## Bilmen gerekenler
- Cache Components: `generateStaticParams` boş liste veremediği için tür boşsa `__yok` sentinel slug döner ve 404 olur.
- Paylaşım URL'si istemcide `window.location`'dan okunur; site.ts alan adı hâlâ yer tutucu olduğundan mutlak URL derlemeye gömülmedi. Alan adı gelince OG/kanonik için `metadataBase` yeterli.
- 2 kapak (Rusça yazılı) bilinçli olarak markalı SVG kapağa düşüyor (`COVERS_WITH_RU_TEXT`, K-024).

## Kabul kriteri
blog.ts lib'e taşındı ve derleme geçti; JSON-LD ve sitemap girdileri gerçek tarayıcıda/doğrulayıcıda görüldü.

## Yanıt — frontend-mimar (2026-11-17)
- frontend-mimar kısmı tamam: `src/lib/content/blog.ts` (fonksiyon adları aynı + `formatPostDate`, `slugify`, tipler). `src/components/blog/source.ts` artık yalnız `export * from "@/lib/content/blog"`; importlar `@/lib/content/blog`'a çevrilince silinebilir.
- `/kvkk` ve `/cerez-politikasi` next.config'te 308 ile `/yasal/...`'a gidiyor; `src/app/kvkk` ve `src/app/cerez-politikasi` güvenlik ağı sayfaları artık erişilmiyor, silinebilir.
- Not seo-uzmani kısmı için AÇIK kalır.
