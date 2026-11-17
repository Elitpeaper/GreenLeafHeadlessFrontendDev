/**
 * Search primitives (K-028): Turkish character folding, tokenising, light typo tolerance.
 * Pure and dependency-free — safe for server and client. The catalog index lives in src/lib/catalog.
 */

/** "Şampuan İPEK Yüz" -> "sampuan ipek yuz". ı/i, ş/s, ğ/g, ö/o, ü/u, ç/c are equivalent. */
export function foldTurkish(input: string): string {
  return input
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i") // dotless i; ş ğ ö ü ç â î û lose their marks in the NFD step below
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export const tokenize = (input: string): string[] => foldTurkish(input).split(" ").filter(Boolean);

/** Damerau-free Levenshtein with early exit when distance exceeds `max`. */
export function editDistance(a: string, b: string, max = 2): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      const v = Math.min(prev[j]! + 1, cur[j - 1]! + 1, prev[j - 1]! + (a[i - 1] === b[j - 1] ? 0 : 1));
      cur.push(v);
      if (v < rowMin) rowMin = v;
    }
    if (rowMin > max) return max + 1;
    prev = cur;
  }
  return prev[b.length]!;
}

export interface SearchDoc {
  /** Folded tokens of name, brand, category titles. */
  tokens: string[];
  /** Folded, space-free exact keys: product code, barcode. */
  keys: string[];
}

/**
 * Scores a query against a doc. 0 = no match. Every query token must match some doc token
 * (exact > prefix > substring > 1 typo for tokens of length >= 5).
 */
export function scoreDoc(queryTokens: string[], doc: SearchDoc): number {
  if (queryTokens.length === 0) return 0;
  const joined = queryTokens.join("");
  if (doc.keys.some((k) => k === joined)) return 1000;
  let score = 0;
  for (const q of queryTokens) {
    let best = 0;
    for (const t of doc.tokens) {
      if (t === q) best = Math.max(best, 10);
      else if (t.startsWith(q)) best = Math.max(best, 7);
      else if (q.length >= 3 && t.includes(q)) best = Math.max(best, 4);
      else if (q.length >= 5 && editDistance(q, t.slice(0, q.length + 1), 1) <= 1) best = Math.max(best, 2);
    }
    if (best === 0 && q.length >= 3 && doc.keys.some((k) => k.startsWith(q))) best = 8;
    if (best === 0) return 0;
    score += best;
  }
  return score;
}
