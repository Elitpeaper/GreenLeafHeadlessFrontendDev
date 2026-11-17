import { permanentRedirect } from "next/navigation";

/**
 * Legacy K-046 address. The store-shell page is /yasal/kvkk-aydinlatma-metni (TASARIM-INCELEME-1 C-4).
 * next.config redirects (frontend-mimar) win before this runs; this is the safety net so the old chrome never renders.
 */
export default function LegacyKvkkPage() {
  permanentRedirect("/yasal/kvkk-aydinlatma-metni");
}
