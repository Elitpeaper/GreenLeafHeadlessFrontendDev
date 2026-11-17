/** Public cart API for components. Client-only hooks; computeCart is pure. */
export { CartProvider, useCartCatalog } from "./CartProvider";
export { useCart, useCartCount, useCartActions, useAddToCart, useCheckout } from "./hooks";
export { useCartStore, CART_STORAGE_KEY } from "./store";
export { computeCart, type CartLine, type CartTotals, type ResolvedCartLine } from "./totals";
