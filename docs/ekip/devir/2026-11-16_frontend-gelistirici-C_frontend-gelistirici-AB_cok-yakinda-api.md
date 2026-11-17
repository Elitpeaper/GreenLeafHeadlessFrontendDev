---
kimden: frontend-gelistirici (Geliştirici C)
kime: frontend-gelistirici (Geliştirici A), frontend-gelistirici (Geliştirici B)
tarih: 2026-11-16
durum: AÇIK
ilgili: K-181, K-182; src/components/coming-soon/*
---

## Ne yaptım
"Çok yakında" kiti hazır ve API sabit (kırmayacağım). Tek import: `@/components/coming-soon`.

- `<ComingSoonBadge size?="sm|md" tone?="default|onDark" label? className? />` — küçük pill "Çok yakında" (blue-50/blue-800, 7.6:1; yuvarlak pill, ürün rozeti "Türkiye'ye yakında" ile karışmaz). Sunucu + istemci güvenli.
- `<ComingSoonLink href external? soon? hideLabelWhenSoon? className soonClassName? badge?>` — `<a>/<Link>` yerine geçer. href gerçekse normal bağlantı; boş, `#`, `javascript:`, çıplak `mailto:`/`tel:` veya site.ts yer tutucusuysa (example.com, MEMBERSHIP_URL, alanadi., +90 500 000…, "Ad Soyad") bağlantı **çizmez**: etiket düz metin + rozet. `soon` ile zorla.
- `isPlaceholderHref(href)` ve `siteReady.{sellerName,email,phone,sponsorLink,domain}` — koşullu render için. site.ts gerçek değerlerle dolunca kendiliğinden "hazır" olur.
- `<ComingSoonPage title body? eyebrow? illustration?="document|shield|cookie|mail|certificate|news|signpost|search|sprout" cta? secondary? as?="h1|h2" layout?="page|inline">` — tam sayfa/blok hazır değil durumu (illüstrasyon + rozet + başlık + tek satır + "Alışverişe devam et" CTA). Rota layout'unun içinde render edilir.
- `<ComingSoonIllustration kind className />` — ui-tasarimci kütüphanesine (`src/components/illustrations`, Empty*) yönlendirir; yalnız `sprout` benim çizimim.
- Metinler `src/lib/ui-text/pending.tr.json` → `comingSoon.*`.

## Senden istediğim
Kendi dosyalarınızda yer tutucu bağlantı/iç notları bu kitle değiştirin (raporumda tam dosya:satır listesi var):
- `src/components/shell/Footer.tsx` satıcı bandı: `mailto:${site.email}`, `tel:${site.phone.e164}` → `ComingSoonLink`; `site.sellerName` yalnız `siteReady.sellerName` iken.
- `src/app/(magaza)/hakkimizda/page.tsx:34,39,45` aynı.
- `src/app/(magaza)/uye-ol/page.tsx:15,27,103` `MISSING` yerine `siteReady.sponsorLink`, eksikse `ComingSoonBadge`.
- `src/components/sections/Hero.tsx:51`, `src/components/sections/Membership.tsx:74` (`/yakinda`) `ButtonLink href={site.sponsorLink}` → `siteReady.sponsorLink` koşulu + rozet.
- `src/app/(magaza)/sertifikalar/page.tsx` boş durumu → `<ComingSoonPage as="h2" layout="inline" illustration="document" …/>` önerilir.
- Header/footer'a `/haberler` ve `/blog` bağlantıları (sayfalar hazır).

## Bilmen gerekenler
- Hazır olmayan sayfaya bağlantı verirken `href="#"` kesinlikle yok (K-182); `ComingSoonLink soon` kullanın.
- `/yasal/*` artık 7 slug: kvkk-aydinlatma-metni, cerez-politikasi, kullanim-kosullari, e-posta-acik-riza, mesafeli-satis-sozlesmesi, on-bilgilendirme-formu, iade-ve-cayma — hepsi ComingSoonPage (noindex).

## Kabul kriteri
Derlenen sitede `#`, boş, `javascript:` veya site.ts yer tutucusuna giden tek bir href kalmaz; hazır olmayan her öğede "Çok yakında" rozeti görünür.
