import { NotFoundContent } from "@/components/coming-soon/NotFoundContent";
import { StoreChrome } from "@/components/shell/StoreChrome";

/** Global 404 for unmatched URLs outside the (magaza) layout: draws the store chrome itself. */
export default function NotFound() {
  return (
    <StoreChrome>
      <NotFoundContent />
    </StoreChrome>
  );
}
