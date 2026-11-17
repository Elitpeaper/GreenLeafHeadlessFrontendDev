import { IndexPage, indexMetadata } from "@/components/blog/routes";

/** /haberler — news grid (K-180). ?kategori=&sayfa= */
export const metadata = indexMetadata("haber");

export default function NewsPage({ searchParams }: PageProps<"/haberler">) {
  return <IndexPage type="haber" searchParams={searchParams} />;
}
