/**
 * Modal layer for the shell drawers (cart, mobile nav, mobile search) — K-288 / P-02.
 *
 * Why not `dialog.showModal()`: Chrome makes the rest of the document inert synchronously, which forces a style
 * recalculation of EVERY element inside the click's frame (measured, Pixel 7 + 4× CPU: 108–226 ms on "/" with 4100
 * elements, 93–183 ms on /urunler). `inert` set by hand costs the same. `content-visibility: auto` on off-screen
 * sections did not help (it got worse). What is cheap (3–8 ms): a NON-modal `dialog.show()` promoted to the top layer
 * with `showPopover()` (needs `popover="manual"` on the <dialog>). That keeps `[open]`, `::backdrop` and the top layer,
 * so motion.css drawer transitions and the Lenis lock (html overflow + `open` attribute) work unchanged.
 *
 * Modal semantics are rebuilt here:
 * - `aria-modal="true"` (set by the component), Tab / Shift+Tab focus trap, focus pulled back if it escapes;
 * - Esc closes the top layer (unless an inner widget already handled the key: `defaultPrevented`);
 * - the background becomes `inert` — but one frame LATER (after the opening paint), so the unavoidable full-document
 *   style pass is not part of the interaction's INP. Closing restores it the same way; focus returns to the opener;
 * - html `overflow: hidden` while any layer is open (scroll lock; Lenis stops on it).
 * Browsers without the Popover API (iOS Safari 16) fall back to the native `showModal()`.
 */

interface Layer {
  dialog: HTMLDialogElement;
  opener: Element | null;
  restoreFocus: boolean;
  native: boolean;
  onClose: () => void;
}

const stack: Layer[] = [];
/** Elements WE made inert (never touches elements that were inert already). */
const inerted = new Set<HTMLElement>();
let scheduled = 0;
let afterReconcile: (() => void)[] = [];

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "LINK", "TEMPLATE", "NOSCRIPT", "NEXT-ROUTE-ANNOUNCER"]);
const TABBABLE =
  'a[href],area[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),summary,iframe,[contenteditable="true"],[tabindex]:not([tabindex="-1"])';

const top = () => stack[stack.length - 1];

function supportsPopover(d: HTMLDialogElement): boolean {
  return typeof d.showPopover === "function";
}

/** Siblings of every ancestor-or-self of `el` up to <body>: everything outside the layer. */
function background(el: Element): HTMLElement[] {
  const out: HTMLElement[] = [];
  for (let n: Element | null = el; n && n !== document.body && n.parentElement; n = n.parentElement) {
    for (const s of n.parentElement.children) {
      if (s === n || !(s instanceof HTMLElement) || SKIP_TAGS.has(s.tagName)) continue;
      if (s.hasAttribute("aria-live") || s.matches("[role=status],[role=alert]")) continue; // keep announcements audible
      out.push(s);
    }
  }
  return out;
}

/** Applies the inert set for the current top layer (runs after paint). */
function reconcile() {
  scheduled = 0;
  const t = top();
  const want = new Set(t && !t.native ? background(t.dialog) : []);
  for (const el of inerted) {
    if (!want.has(el)) {
      el.inert = false;
      inerted.delete(el);
    }
  }
  for (const el of want) {
    if (!inerted.has(el) && !el.inert) {
      el.inert = true;
      inerted.add(el);
    }
  }
  const run = afterReconcile;
  afterReconcile = [];
  run.forEach((f) => f());
}

/** After the next paint: rAF fires before paint, the task queued from it runs after. */
function schedule() {
  if (scheduled) return;
  scheduled = requestAnimationFrame(() => window.setTimeout(reconcile, 0));
}

function tabbables(root: HTMLElement): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>(TABBABLE)].filter(
    (el) => !el.closest("[inert],[hidden]") && (typeof el.checkVisibility !== "function" || el.checkVisibility()),
  );
}

function onKeyDown(e: KeyboardEvent) {
  const t = top();
  if (!t || t.native) return;
  if (e.key === "Escape") {
    if (e.defaultPrevented) return;
    e.preventDefault();
    closeLayer(t.dialog);
    return;
  }
  if (e.key !== "Tab") return;
  const items = tabbables(t.dialog);
  const active = document.activeElement;
  if (!items.length) {
    e.preventDefault();
    t.dialog.focus();
    return;
  }
  const first = items[0]!;
  const last = items[items.length - 1]!;
  const inside = active instanceof Node && t.dialog.contains(active);
  if (e.shiftKey && (!inside || active === first || active === t.dialog)) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && (!inside || active === last)) {
    e.preventDefault();
    first.focus();
  }
}

function onFocusIn(e: FocusEvent) {
  const t = top();
  if (!t || t.native) return;
  const target = e.target;
  if (target instanceof Node && t.dialog.contains(target)) return;
  (tabbables(t.dialog)[0] ?? t.dialog).focus();
}

function listen(on: boolean) {
  const fn = on ? document.addEventListener.bind(document) : document.removeEventListener.bind(document);
  fn("keydown", onKeyDown);
  fn("focusin", onFocusIn);
}

/** Inerted ancestor-or-self of `el`, if any. */
function inertedAncestor(el: Element): HTMLElement | null {
  for (let n: Element | null = el; n; n = n.parentElement) if (n instanceof HTMLElement && inerted.has(n)) return n;
  return null;
}

/** Up to this many elements, un-inerting synchronously (to focus inside) is cheaper than waiting a frame. */
const SYNC_RESTORE_MAX = 400;

function restore(el: Element | null) {
  if (!(el instanceof HTMLElement) || !el.isConnected) return;
  const blocker = inertedAncestor(el);
  if (!blocker) {
    el.focus({ preventScroll: true });
    return;
  }
  if (blocker.getElementsByTagName("*").length <= SYNC_RESTORE_MAX) {
    blocker.inert = false;
    inerted.delete(blocker);
    el.focus({ preventScroll: true });
  } else {
    afterReconcile.push(() => el.focus({ preventScroll: true }));
  }
}

export interface OpenLayerOptions {
  /** Element focused on open; default: the dialog itself (give it tabIndex={-1}). */
  initialFocus?: HTMLElement | null;
  /** Return focus to the element that was focused before opening (default true). */
  restoreFocus?: boolean;
  /** Called once after the layer closed (Esc, closeLayer, dialog.close()). */
  onClose?: () => void;
}

/** Opens `dialog` as a modal layer. The <dialog> must carry popover="manual" and aria-modal="true". */
export function openLayer(dialog: HTMLDialogElement, opts: OpenLayerOptions = {}): void {
  if (dialog.open || stack.some((l) => l.dialog === dialog)) return;
  const native = !supportsPopover(dialog);
  const layer: Layer = {
    dialog,
    opener: document.activeElement,
    restoreFocus: opts.restoreFocus ?? true,
    native,
    onClose: opts.onClose ?? (() => {}),
  };
  // A dialog inside a subtree WE inerted for a previous layer (mobile nav -> search sheet): free its path now.
  const blocker = inertedAncestor(dialog);
  if (blocker) {
    blocker.inert = false;
    inerted.delete(blocker);
  }
  if (!stack.length) listen(true);
  stack.push(layer);
  if (native) dialog.showModal();
  else {
    dialog.show();
    dialog.showPopover();
  }
  document.documentElement.style.overflow = "hidden";
  dialog.addEventListener("close", () => finish(layer), { once: true });
  (opts.initialFocus ?? dialog).focus({ preventScroll: true });
  schedule();
}

/** Closes the layer (same as the dialog's own close button). Safe to call on a closed dialog. */
export function closeLayer(dialog: HTMLDialogElement | null | undefined): void {
  if (!dialog) return;
  const layer = stack.find((l) => l.dialog === dialog);
  if (layer) finish(layer);
  if (dialog.open) dialog.close();
}

function finish(layer: Layer) {
  const i = stack.indexOf(layer);
  if (i < 0) return;
  stack.splice(i, 1);
  const d = layer.dialog;
  if (!layer.native && d.matches(":popover-open")) d.hidePopover();
  if (d.open) d.close();
  if (!stack.length) {
    listen(false);
    document.documentElement.style.overflow = "";
  }
  schedule();
  if (layer.restoreFocus) restore(layer.opener);
  layer.onClose();
}

/** True while any modal layer is open (tests / other modules). */
export function hasOpenLayer(): boolean {
  return stack.length > 0;
}
