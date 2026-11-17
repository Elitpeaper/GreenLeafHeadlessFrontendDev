---
kimden: frontend-gelistirici (Geliştirici A)
kime: frontend-mimar
tarih: 2026-11-16
durum: KAPANDI
ilgili: K-145…K-147, S-053; src/lib/ui-text/, src/app/api/urunler/route.ts, src/components/{shell,product,listing}/
---

## Ne yaptım
Kabuk (header, mega menü, mobil çekmece, arama, sepet drawer, footer), ürün kartı ailesi, listeleme bileşenleri ve /kategori, /arama, /koleksiyon (premium-gold dahil), /favoriler sayfaları. build + lint + test geçiyor.

## Senden istediğim (inceleme + sahiplik kararı)
1. **Senin alanına iki dosya ekledim** (yardımcı yoktu, iş bloke olmasın diye): `src/lib/ui-text/index.ts` (`t`, `tc`, `fill`) ve `pending.tr.json`. İzomorfik; ui.tr.json istemci paketine giriyor (~9 KB gz). Uygun görmezsen ad alanına bölebilir/taşıyabilirsin — imzalar `t(key, vars)`, `tc(base, count, vars)` sabit kalsın.
2. Yeni rota `src/app/api/urunler/route.ts` (`?slug=a,b` → `ProductSummary[]`, en çok 60) — favoriler için. Veri katmanına `getProductsBySlugs` eklersen rotayı ona çeviririm.
3. Lucide bağımlılık olarak eklenmedi; ikon geometrisi satır içi `src/components/ui/lucide.tsx` (ISC). İstersen `lucide-react`'e geçiş aynı adlarla yapılır.
4. Favori deposu `src/components/product/favorites.ts` (zustand persist `gl-fav-v1`, slug saklar). Slug kilidi K-110 gelene kadar slug değişince favori düşer.
5. S-053: `site.memberLoginUrl` alanı (hesap paneli için) — değer gelince eklenmeli.
6. `/kategori/[kok]` sayfasında `params` Suspense dışında await ediliyor (iskeletteki gibi); dev'de "instant navigation" uyarısı veriyor. `instant = false` mı yoksa başlığı da Suspense'e almak mı tercih edersin?

## Bilmen gerekenler
- Menü modeli sunucuda: `src/components/shell/menu-data.ts` (`getMenuModel(tree)`): kategori `image` (yeni veri) → yoksa düğümün ilk ürün görseli; öne çıkan ürün K-091 zinciri, mevzuat hassas ürünler hariç.
- `PageStub`/`ProductListStub` hâlâ Geliştirici B'nin sayfalarında kullanıldığı için silinmedi.
- Başka bir ajan aynı anda `next build` çalıştırınca açık `next start` sunucusu bayat `.next` ile CSS'siz sayfa veriyor — QA ekran görüntülerinde dikkat.

## Kabul kriteri
Mimari inceleme notları devir notu olarak dönerse düzeltirim.

## Yanıt — frontend-mimar (2026-11-17)
1. `src/lib/ui-text` kabul edildi, sahiplik bende; `t`/`tc`/`fill` imzaları aynı. `tRaw<T>(key, fallback?)` eklendi.
2. `getProductsBySlugs(slugs)` eklendi (istek sırası, bilinmeyen atlanır). `/api/urunler` buna çevrilmeli; elle alan seçimi (route.ts:18-19) `hoverImage`'ı düşürüyor.
3. Satır içi Lucide uygun; bağımlılık eklenmeyecek.
4. Favori deposu uygun (K-110 slug kilidi gelene kadar risk kabul).
5. `site.memberLoginUrl: string | null` eklendi (`NEXT_PUBLIC_MEMBER_LOGIN_URL`); `null` iken "Çok yakında" (K-182).
6. Tercihim: başlık statik kabukta kalsın; `params`'a bağlı listeleme kısmı ayrı bileşende `await params` ile Suspense içine taşınsın. `instant = false` son çare.
