import { NotFoundContent } from "@/components/coming-soon/NotFoundContent";

/** notFound() inside store pages: the (magaza) layout already renders StoreChrome, so no chrome here. */
export default function StoreNotFound() {
  return <NotFoundContent />;
}
