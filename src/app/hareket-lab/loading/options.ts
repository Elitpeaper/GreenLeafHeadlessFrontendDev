/** K-287 loading options: one source for the lab pages (the plan doc mirrors these numbers). */
export const OPTION_IDS = ["a", "b", "c", "d"] as const;
export type OptionId = (typeof OPTION_IDS)[number];

export interface LoadingOption {
  id: OptionId;
  title: string;
  summary: string;
  when: string;
  /** Splash: shortest visible time (entry finishes) and hard cap (CSS failsafe), ms. */
  minMs: number;
  capMs: number;
  exitMs: number;
  /** Transition indicator appears only if navigation is slower than this (K-192). */
  transitionDelayMs: number;
  gsap: string;
}

export const OPTIONS: Record<OptionId, LoadingOption> = {
  a: {
    id: "a",
    title: "A · Resmî işaret — maskeyle çizilme",
    summary:
      "Krem zeminde resmî Greenleaf işareti saat yönünde bir maskeyle ortaya çıkar, ince bir halka çizilir, işaret −140°'den yerine oturur. Çizim değişmez, yalnız sarmalayıcı döner. Geçişte küçük hapta işaret çizilip silinir (döngü, dönme yok).",
    when: "İlk açılış (oturumda bir kez) + sayfa geçişi (hap)",
    minMs: 720,
    capMs: 1000,
    exitMs: 320,
    transitionDelayMs: 150,
    gsap: "Yok — saf CSS (@property ile açı maskesi).",
  },
  b: {
    id: "b",
    title: "B · Yedi yaprak açılması",
    summary:
      "Beyaz zeminde yedi yaprak (yeşil, lime, mavi) sırayla merkezden açılır, bütün 1/7 tur dönerek oturur, ayrılırken yapraklar dışa savrulur. Logo yeniden çizilmez: tek tek basit yapraklar yalnız 7 kümeli ritmi hatırlatır.",
    when: "İlk açılış + sayfa geçişi (hap)",
    minMs: 900,
    capMs: 1200,
    exitMs: 320,
    transitionDelayMs: 150,
    gsap: "Yok — saf CSS.",
  },
  c: {
    id: "c",
    title: "C · İmza şeridi dolması",
    summary:
      "Brandbook'un üç renkli çizgi bandı: açılışta ekranı yeşil/lime/mavi üç bant kaplar, ışık dolar, bantlar sırayla sağa kayarak sayfayı açar. Sayfa geçişinde ekranın en üstünde ince üç satırlı şerit dolar.",
    when: "Önerilen: yalnız sayfa geçişi (ince şerit). Açılış perdesi isteğe bağlı",
    minMs: 500,
    capMs: 800,
    exitMs: 520,
    transitionDelayMs: 150,
    gsap: "Yok — saf CSS.",
  },
  d: {
    id: "d",
    title: "D · Orman perdesi ve kâğıt yapraklar",
    summary:
      "Orman yeşili perde, dört kâğıt kesimi yaprak farklı yönlerden süzülüp oturur, altta imza şeridi uzar; ayrılırken perde kavisli alt kenarıyla yukarı kalkar, yapraklar daha hızlı uçar (derinlik). Sayfa geçişinde perde alttan gelir, yeni sayfa hazır olunca kalkar.",
    when: "İlk açılış + sayfa geçişi (tam perde, yalnız masaüstü önerilir)",
    minMs: 1000,
    capMs: 1400,
    exitMs: 720,
    transitionDelayMs: 0,
    gsap: "Açılış saf CSS; sayfa geçişi GSAP zaman çizelgesi (tembel import, zaten yüklü olduğu masaüstünde).",
  },
};
