/**
 * K-180 blog/news data facade (server-only by convention: body_html is large; never import from "use client").
 * The ONLY module that reads data/content/blog.json (TEKNIK-TASARIM §8: @data/* only under src/lib).
 * Moved from src/components/blog/source.ts (Developer C); that path re-exports this module until imports switch.
 * Backend/CMS migration: keep these signatures, swap the import below for a fetch + "use cache".
 */
import raw from "@data/content/blog.json";

export type PostType = "haber" | "blog";

export interface PostCover {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Post {
  slug: string;
  type: PostType;
  title: string;
  excerpt: string;
  /** ISO yyyy-mm-dd */
  date: string;
  category: string;
  categorySlug: string;
  cover: PostCover | null;
  body_html: string;
  sourceUrl: string | null;
  readingMinutes: number;
}

export interface PostCategory {
  slug: string;
  title: string;
  count: number;
}

export interface PostPage {
  items: Post[];
  page: number;
  pageCount: number;
  total: number;
}

const TR_MAP: Record<string, string> = { ç: "c", ğ: "g", ı: "i", İ: "i", ö: "o", ş: "s", ü: "u", â: "a", î: "i", û: "u" };

export function slugify(s: string): string {
  return s
    .replace(/[çğıİöşüâîû]/gi, (c) => TR_MAP[c] ?? TR_MAP[c.toLowerCase()] ?? c)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Light hardening of trusted pipeline HTML: drop scripts/styles/iframes, inline handlers and javascript: URLs. */
function sanitize(html: string): string {
  return html
    .replace(/<(script|style|iframe|object|embed)[\s\S]*?<\/\1>/gi, "")
    .replace(/<(script|style|iframe|object|embed)[^>]*\/?>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/(href|src)\s*=\s*("|')\s*javascript:[^"']*\2/gi, "");
}

/**
 * K-024 (no Russian text anywhere): these source covers have Russian text baked into the image, so they fall back to
 * the branded artwork until the data owner supplies a clean crop. Remove a slug once its cover.webp is replaced.
 */
const COVERS_WITH_RU_TEXT = new Set(["klorsuz-ve-nazik-ev-temizligi", "sicak-ev-kuru-hava-cilt-bakimi"]);

type RawPost = Omit<Post, "categorySlug" | "cover" | "sourceUrl"> & { cover: PostCover | null; sourceUrl?: string | null };

const POSTS: Post[] = (raw as unknown as RawPost[])
  .filter((p) => p && p.slug && p.title && (p.type === "haber" || p.type === "blog"))
  .map((p) => ({
    ...p,
    categorySlug: slugify(p.category || "genel"),
    cover: p.cover && p.cover.src && !COVERS_WITH_RU_TEXT.has(p.slug) ? p.cover : null,
    sourceUrl: p.sourceUrl ?? null,
    readingMinutes: Math.max(1, Math.round(p.readingMinutes || 1)),
    body_html: sanitize(p.body_html ?? ""),
  }))
  .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, "tr"));

export const POSTS_PAGE_SIZE = 6;

export const basePath = (type: PostType) => (type === "haber" ? "/haberler" : "/blog");
export const postHref = (p: Pick<Post, "type" | "slug">) => `${basePath(p.type)}/${p.slug}`;

export async function getPostCategories(type: PostType): Promise<PostCategory[]> {
  const map = new Map<string, PostCategory>();
  for (const p of POSTS) {
    if (p.type !== type) continue;
    const c = map.get(p.categorySlug) ?? { slug: p.categorySlug, title: p.category, count: 0 };
    c.count++;
    map.set(p.categorySlug, c);
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.title.localeCompare(b.title, "tr"));
}

export async function countPosts(type: PostType): Promise<number> {
  return POSTS.filter((p) => p.type === type).length;
}

export async function getPosts(type: PostType, opts: { category?: string | null; page?: number; pageSize?: number } = {}): Promise<PostPage> {
  const pageSize = opts.pageSize ?? POSTS_PAGE_SIZE;
  const all = POSTS.filter((p) => p.type === type && (!opts.category || p.categorySlug === opts.category));
  const pageCount = Math.max(1, Math.ceil(all.length / pageSize));
  const page = Math.min(Math.max(1, Math.floor(opts.page ?? 1)), pageCount);
  return { items: all.slice((page - 1) * pageSize, page * pageSize), page, pageCount, total: all.length };
}

export async function getPost(type: PostType, slug: string): Promise<Post | null> {
  return POSTS.find((p) => p.type === type && p.slug === slug) ?? null;
}

export async function getPostSlugs(type: PostType): Promise<string[]> {
  return POSTS.filter((p) => p.type === type).map((p) => p.slug);
}

/** Same category first, then same type by recency, then the other type. */
export async function getRelatedPosts(post: Post, limit = 3): Promise<Post[]> {
  const others = POSTS.filter((p) => p.slug !== post.slug);
  const rank = (p: Post) => (p.type === post.type ? 0 : 2) + (p.categorySlug === post.categorySlug ? 0 : 1);
  return others
    .map((p, i) => ({ p, r: rank(p), i }))
    .sort((a, b) => a.r - b.r || a.i - b.i)
    .slice(0, limit)
    .map((x) => x.p);
}

const DATE_FMT = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
export const formatPostDate = (iso: string) => DATE_FMT.format(new Date(`${iso}T00:00:00Z`));
