---
kimden: ui-tasarimci
kime: hareket-tasarimcisi
tarih: 2026-11-16
durum: KAPANDI (hareket-tasarimcisi 2026-11-17, bkz. hareket.md v2 §16–§19)
ilgili: K-179, K-175 · src/components/illustrations/** · /svg-kutuphanesi
---

## Ne yaptım
SVG kütüphanesi hazır; katalogda (`/svg-kutuphanesi`) 38 çizim hover davranışı bekliyor.

## Senden istediğim
Kök `[data-svg-interact]` üzerinden hover (ve `:focus-within`) davranışlarını uygula. Kancalar:

| interact | Kullanan | Hedef `data-svg-part` | Niyet (zamanlama sende) |
|---|---|---|---|
| `bloom` | kategori ikonları, ScenePv, SceneMembership, SceneBlog, EmptyShield/Certificate/Mail/Favorites, DividerLeafDiamond | ikon: `blob` büyür, `accent` yükselir/açılır; sahne: `sprout`/`leaves` açılır, `badge`/`rosette`/`letter` hafif pop | yapraklar tabandan açılır (pivot verildi) |
| `sway` | SceneFinderLeaves, EmptyCart, EmptyNotFound, DividerWave | `leaf` (her biri `--i`), `wave`, `wreath` | rüzgârda salınım, sıralı |
| `draw` | ScenePremiumFrame, DividerLeafVine, DividerStripeLeaf, EmptyDocument, EmptyNews | `frame`, `stem`, `stripe`, `lines`, `signature` (stroke), sonra `corners`/`leaf` | çizgi çizimi (M-16 benzeri), ardından yaprak |
| `spin` | EmptyCookie | `object` döner, `crumbs` dağılır | yavaş tek tur |
| `parallax` | SceneHeroBotanical, DividerWaveLayers, DividerDrops, EmptySearch, 4 desen | `sun` (yavaş döner), `branch-back`, `leaves-front`, `drops`, `sparkles`; `wave-back/mid/front`; `orbit`; `tile` | imleç konumuna göre katmanlar farklı derinlikte |

- Her grupta `style="--i:N; transform-box:fill-box; transform-origin:…"` var; pivotları ben verdim, değiştirmek gerekirse not bırak.
- Ortak gruplar: `backdrop`, `leaves`, `object`, `sparkles` (boş durumlar), `blob/tint→fill/line/accent` (ikonlar). İkonlarda `data-svg-part="fill"` grubu ikinci tondur.
- Kök ayrıca `data-svg="<ad>"` taşır (ör. `cat-makyaj`, `empty-cart`) — bileşene özel ince ayar için.

## Bilmen gerekenler
- Dokunmatikte ve `prefers-reduced-motion`'da çizim statik ve eksiksiz kalmalı (draw türünde çizgiler görünür başlamalı; gizleyip hover'da çizme).
- Kart/bağlantı içinde ikon: tetikleyici kapsayıcının hover/focus'u olsun (`a:hover [data-svg-interact]`), böylece kategori karosunun tamamı tetikler.
- Desenler yalnız çok hafif kayar; metnin altında dikkat dağıtmaz.

## Kabul kriteri
`/svg-kutuphanesi`'nde her kart hover'da beş davranıştan birini gösterir; reduced-motion açıkken hiçbir hareket yok, çizimler tam.

## Ek gözlem (gerçek tarayıcı, :3202)
`/svg-kutuphanesi` hydration uyarısı veriyor ("2 issues"). Fark satırları motion çalışma zamanının hydration'dan **önce** DOM'u değiştirdiğini gösteriyor: `data-motion="announcement"` → `"announcement fade-in"`, `header-stripe band-show`, `mobile-nav drawer-left`, ayrıca SVG köklerine `data-svg-ready=""` ekleniyor. Bu öznitelikleri hydration sonrası (useEffect / requestIdleCallback) yazman veya sunucuda da üretmen gerekiyor. Kütüphane bileşenleri sunucuda deterministik (useId dışında rastgele değer yok).
