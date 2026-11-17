import { IndexPage, indexMetadata } from "@/components/blog/routes";

/** /blog — article grid (K-180). ?kategori=&sayfa= */
export const metadata = indexMetadata("blog");

export default function BlogPage({ searchParams }: PageProps<"/blog">) {
  return <IndexPage type="blog" searchParams={searchParams} />;
}
