import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { SITE_NAV_GROUPS, siteNavDefs } from "../config/site-nav.ts";
import { collections } from "../config/storefront.ts";

/**
 * K-266 / K-182: every internal href in the site navigation must hit a real route (no dead links), every in-page
 * anchor must exist in the source, every label key must exist in the ui-text dictionary.
 */
const root = path.resolve(import.meta.dirname, "../..");
const appDir = path.join(root, "src/app");
const read = (p: string) => fs.readFileSync(path.join(root, p), "utf8");

/** App-router page routes as segment arrays; route groups "(x)" removed. */
function routes(dir = appDir, segs: string[] = [], out: string[][] = []): string[][] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) routes(path.join(dir, e.name), /^\(.*\)$/.test(e.name) ? segs : [...segs, e.name], out);
    else if (e.name === "page.tsx") out.push(segs);
  }
  return out;
}
const ROUTES = routes();

function matchRoute(pathname: string): string[] | null {
  const parts = pathname.split("/").filter(Boolean);
  for (const r of ROUTES) {
    let ok = true;
    let i = 0;
    for (const s of r) {
      if (/^\[\[\.\.\..+\]\]$/.test(s)) { i = parts.length; break; }
      if (/^\[\.\.\..+\]$/.test(s)) { if (i >= parts.length) ok = false; i = parts.length; break; }
      if (i >= parts.length) { ok = false; break; }
      if (!/^\[.+\]$/.test(s) && s !== parts[i]) { ok = false; break; }
      i++;
    }
    if (ok && i === parts.length) return r;
  }
  return null;
}

const dict: Record<string, unknown> = {
  ...JSON.parse(read("src/lib/ui-text/pending.tr.json")),
  ...JSON.parse(read("data/content/ui.tr.json")),
};
const categories = (JSON.parse(read("data/categories.json")) as { consumer: { slug: string }[] }).consumer.map((c) => c.slug);
const legal = read("src/app/(magaza)/yasal/[slug]/page.tsx");
const skin = read("src/lib/catalog/skin.ts");

const hrefs: string[] = [];
const labels: string[] = [];
for (const d of siteNavDefs) {
  if (d.kind === "collections") continue;
  labels.push(d.labelKey);
  if (d.kind === "link") {
    hrefs.push(d.href);
    for (const c of d.children ?? []) (hrefs.push(c.href), labels.push(c.labelKey));
  } else if (d.href !== null) assert.match(d.href, /^https:\/\//, `external ${d.labelKey} must be absolute https`);
}

test("every internal siteNav href resolves to an existing route with a valid param", () => {
  for (const href of hrefs) {
    const [pathname, hash] = href.split("#") as [string, string | undefined];
    assert.ok(pathname.startsWith("/") && pathname.length > 0, `${href}: must be an absolute internal path`);
    const route = matchRoute(pathname);
    assert.ok(route, `${href}: no page.tsx route`);
    const parts = pathname.split("/").filter(Boolean);
    if (parts[0] === "koleksiyon") assert.ok(collections.some((c) => c.key === parts[1]), `${href}: unknown collection`);
    if (parts[0] === "kategori") assert.ok(categories.includes(parts.slice(1).join("/")), `${href}: unknown category`);
    if (parts[0] === "yasal") assert.ok(legal.includes(`"${parts[1]}"`), `${href}: not in LEGAL_SLUGS`);
    if (parts[0] === "cilt-tipine-gore" && parts[1]) assert.ok(skin.includes(`slug: "${parts[1]}"`), `${href}: unknown skin type`);
    if (hash) {
      const anchor = new RegExp(`id="${hash}"`);
      const found = walk(appDir).concat(walk(path.join(root, "src/components"))).some((f) => anchor.test(fs.readFileSync(f, "utf8")));
      assert.ok(found, `${href}: anchor #${hash} not found in src`);
    }
  }
});

test("siteNav has all four groups, unique hrefs and known label keys", () => {
  for (const g of SITE_NAV_GROUPS) assert.ok(siteNavDefs.some((d) => d.group === g), `group ${g} empty`);
  assert.equal(new Set(hrefs).size, hrefs.length, "duplicate href");
  for (const k of [...labels, ...SITE_NAV_GROUPS.map((g) => `siteNav.group.${g}`)]) assert.ok(typeof dict[k] === "string", `missing ui-text key ${k}`);
  assert.ok(hrefs.includes("/sss"), "K-269: /sss must be in the menu");
});

test("excluded internal tools are not in the menu", () => {
  for (const h of hrefs) assert.ok(!/^\/(arama|urun\/|yakinda|svg-kutuphanesi|hareket-lab)/.test(h), `${h} must not be listed`);
});

function walk(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.tsx?$/.test(e.name)) out.push(p);
  }
  return out;
}
