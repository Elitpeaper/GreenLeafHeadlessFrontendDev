---
kimden: frontend-mimar
kime: frontend-gelistirici
tarih: 2026-11-17
durum: AÇIK
ilgili: K-266, K-268, K-269 · docs/tasarim/bilesenler/header-arama-kategori.md §2.1, §4
---

## Ne yaptım
`siteNav` tek kaynağı ve kategori kapsamlı arama veri/API katmanı hazır. Header bileşenlerine dokunmadım.

## Kullanım
**Tüm sayfalar menüsü (Keşfet paneli, mobil çekmece, footer):**
```ts
import { getSiteNav, type SiteNavGroup } from "@/lib/site-nav"; // yalnız server component
const nav: SiteNavGroup[] = await getSiteNav(); // 4 grup, panel sırası; JSON — client'a prop olarak geçir
// item: { id, label, href: string | null, soon, external, count?: "favorites", children?: {id,label,href}[] }
```
- `soon: true` → satırda `ComingSoonBadge`, bağlantı yine gerçek sayfaya gider. `href === null` (yalnız dış bağlantı, ör. üye girişi) → pasif satır + "Çok yakında", link değil.
- `external` → yeni sekme, `rel="noopener noreferrer"`, ↗ ikonu. `count: "favorites"` → sayaç istemcide (favori deposundan).
- `children` → cilt tipi çip dizisi (Cilt tipine göre satırının altında).
- Etiketler sunucuda çözülür; client'ta `useT()` gerekmez. Yeni sayfa → yalnız `src/config/site-nav.ts`'e satır; `npm test` rotanın gerçekten var olduğunu doğrular.
- `src/lib/site-nav.ts` ve `src/config/site-nav.ts`'i "use client" dosyasından import etme (katalog okur).

**Kapsamlı anlık arama:**
`GET /api/arama?q=krem&limit=8&kok=cilt-bakimi` → gövde değişmedi (`SearchHit[]`). Yeni yanıt başlıkları: `X-Search-Total` (kapsamdaki toplam, "Cilt Bakımı'nda 12 sonuç" için), `X-Search-Scope` (çözülen kök; geçersiz/boş `kok` yok sayıldıysa `""`). Kapsam 0 sonuç verirse "Tüm ürünlerde ara" = aynı isteği `kok`suz at / `/arama?q=…`'ya git.
- Kapsam listesi: `getCategoryTree()` kökleri (ürünsüz kök zaten yok) — `{ root, title, count }`.
- Gönderim: `/arama?q=…&kok={root}` ("Tüm ürünler"de `kok` yok). Sonuç sayfası çipi ve 0 sonuç durumu hazır (`src/app/(magaza)/arama/page.tsx`).
- Sunucu tarafı: `searchProductsScoped(q, limit, kok)` → `{ hits, total, scope }`, `getSearchScope(root)`.
- Yeni metin anahtarları (`pending.tr.json`): `search.scope.all`, `search.scope.chip` (`{kategori}`), `search.scope.searchAll` — `search.` öneki client sözlüğünde, `useT()` ile kullanılabilir.

## Senin alanında yaptığım küçük değişiklikler (bilgi)
- `src/components/listing/url.ts`: `ListingState`/`pickState` artık `scope` taşır (filtre/sıralama/sayfa bağlantıları `kok`u korur).
- `src/components/listing/ListingView.tsx`: "Filtreleri temizle" `kok` kapsamını korur.
- `src/app/(magaza)/arama/page.tsx`: kapsam çipi + kapsamda 0 sonuçta "Tüm ürünlerde ara".

## Kabul kriteri
Keşfet paneli, mobil çekmece ve footer listeyi yalnız `getSiteNav()`'den okur; kodda ikinci bir sayfa listesi yok.
