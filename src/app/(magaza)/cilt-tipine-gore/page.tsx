import type { Metadata } from "next";
import { FinderPage } from "@/components/finder/FinderPage";
import { t } from "@/components/sections/copy";

export const metadata: Metadata = { title: t("finder.title"), description: t("finder.intro") };

/** /cilt-tipine-gore (K-089). Selections live in the URL (?tip=&hassas=&ihtiyac=&rutin=&gorunum=). */
export default function SkinFinderPage({ searchParams }: PageProps<"/cilt-tipine-gore">) {
  return <FinderPage searchParams={searchParams} />;
}
