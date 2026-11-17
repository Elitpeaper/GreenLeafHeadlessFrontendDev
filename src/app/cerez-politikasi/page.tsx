import { permanentRedirect } from "next/navigation";

/** Legacy K-046 address -> store-shell page (TASARIM-INCELEME-1 C-4). See /kvkk. */
export default function LegacyCookiePage() {
  permanentRedirect("/yasal/cerez-politikasi");
}
