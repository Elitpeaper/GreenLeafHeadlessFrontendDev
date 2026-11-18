import { NotFoundContent } from "@/components/coming-soon/NotFoundContent";

/**
 * Root 404: only reached by notFound() outside the (magaza) group (unmatched URLs go to (magaza)/[...yok]).
 * Deliberately WITHOUT StoreChrome: Next ships this file with every page of the app, so the chrome here would be
 * serialized twice per page (K-288 / P-08).
 */
export default function NotFound() {
  return (
    <main id="icerik" tabIndex={-1} className="outline-none">
      <NotFoundContent />
    </main>
  );
}
