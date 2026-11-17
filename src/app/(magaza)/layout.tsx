import { StoreChrome } from "@/components/shell/StoreChrome";

/** Store route group: every page except the K-046 landing (/yakinda) and the legacy legal stubs. */
export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <StoreChrome>{children}</StoreChrome>;
}
