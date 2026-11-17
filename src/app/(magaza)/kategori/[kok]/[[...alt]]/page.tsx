import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CategoryIllustration } from "@/components/illustrations/category-icons";
import { Breadcrumb } from "@/components/listing/Breadcrumb";
import { ListingHero } from "@/components/listing/ListingHero";
import { ListingView } from "@/components/listing/ListingView";
import { categoryPhoto } from "@/components/listing/stock";
import { ListingSkeleton } from "@/components/listing/ListingSkeleton";
import { Info, Leaf } from "@/components/ui/lucide";
import type { RawSearchParams } from "@/lib/catalog/query-params";
import { getCategory, getCategoryTree, type CategoryNode } from "@/lib/products";
import { t } from "@/lib/ui-text";

type Params = Promise<{ kok: string; alt?: string[] }>;

/** Roots with the "Cilt tipine göre" strip + skin filter (kategori.md §4). */
const SKIN_ROOTS = new Set(["cilt-bakimi", "makyaj", "setler"]);

/** /kategori/{kok} and /kategori/{kok}/{alt} (K-050, K-051). Deeper paths 404. */
export async function generateStaticParams() {
  const tree = await getCategoryTree();
  return tree.flatMap((r) => [
    { kok: r.root, alt: [] as string[] },
    ...r.children.flatMap((c) => (c.child ? [{ kok: r.root, alt: [c.child] }] : [])),
  ]);
}

async function resolve(params: Params) {
  const { kok, alt = [] } = await params;
  if (alt.length > 1) return null;
  const node = await getCategory(kok, alt[0] ?? null);
  if (!node) return null;
  const root = node.child ? await getCategory(kok) : node;
  return root ? { node, root } : null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const r = await resolve(params);
  return r ? { title: r.node.title } : {};
}

function SubcategoryStrip({ root }: { root: CategoryNode }) {
  return (
    <nav aria-label={t("listing.subcategories")} className="-mx-gutter mt-6 overflow-x-auto px-gutter [scrollbar-width:none] max-md:[mask-image:linear-gradient(to_right,black_calc(100%-3rem),transparent)] md:mx-0 md:overflow-visible md:px-0">
      <ul className="flex gap-3 pb-1 md:flex-wrap">
        {root.children.map((c) => (
          <li key={c.path} className="shrink-0">
            <Link
              href={c.href}
              className="group/sub flex min-h-14 items-center gap-3 rounded-pill bg-surface py-1.5 pl-1.5 pr-5 ring-1 ring-line transition-[box-shadow,background-color] duration-250 hover:shadow-tile hover:ring-green-700"
            >
              <span className="relative size-11 overflow-hidden rounded-full bg-accent-soft">
                {c.image ? (
                  <span className="absolute inset-[12%]">
                    <Image src={c.image} alt="" fill sizes="44px" className="object-contain mix-blend-multiply" />
                  </span>
                ) : (
                  <Leaf size={20} className="absolute inset-0 m-auto text-accent-decor" />
                )}
              </span>
              <span className="text-sm font-medium text-ink transition-colors duration-250 group-hover/sub:text-green-800">{c.title}</span>
              <span className="text-xs tabular-nums text-ink-muted">{c.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Category listing (wireframe/kategori.md). Static header; filters/sort/results are request-time (Suspense). */
export default async function CategoryPage({ params, searchParams }: { params: Params; searchParams: Promise<RawSearchParams> }) {
  const r = await resolve(params);
  if (!r) notFound();
  const { node, root } = r;
  const photo = categoryPhoto(node.root);
  const isRoot = node.child === null;
  const crumbs = isRoot ? [{ href: node.href, label: node.title }] : [{ href: root.href, label: root.title }, { href: node.href, label: node.title }];
  const categoryLinks = root.children.map((c) => ({ href: c.href, title: c.title, count: c.count, current: c.path === node.path }));

  return (
    <div className="mx-auto max-w-page px-gutter pb-8 pt-4 sm:pt-6">
      <Breadcrumb items={crumbs} />

      <ListingHero
        className="mt-3"
        title={node.title}
        photo={photo}
        icon={<CategoryIllustration slug={node.root} className="size-10" />}
        lead={t("listing.countWithTr", { count: node.count, tr: node.trCount })}
      >
        {node.description && <p className="mt-3 line-clamp-2 max-w-prose text-base text-cream-100">{node.description}</p>}
        {node.trCount === 0 && (
          <p className="mt-4 inline-flex items-center gap-2 rounded-md bg-blue-100 px-3 py-2 text-sm text-blue-800">
            <Info size={18} />
            {t("listing.noTrNote")}
          </p>
        )}
      </ListingHero>

      {isRoot && node.children.length > 0 && <SubcategoryStrip root={node} />}

      <Suspense fallback={<ListingSkeleton />}>
        <ListingView
          basePath={node.href}
          baseQuery={{ category: node.path }}
          searchParams={searchParams}
          categoryLinks={categoryLinks}
          showSkin={SKIN_ROOTS.has(node.root)}
        />
      </Suspense>
    </div>
  );
}

