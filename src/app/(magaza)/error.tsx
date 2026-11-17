"use client";

import Link from "next/link";

/** Error boundary for store pages (SAYFA-HARITASI §2.5). Header/footer stay (layout is outside the boundary). */
export default function StoreError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-page px-gutter py-section-tight">
      <h1 className="text-4xl">Bir şeyler ters gitti</h1>
      <div className="mt-6 flex gap-4">
        <button type="button" onClick={reset} className="rounded-pill bg-green-700 px-5 py-2 text-white">
          Tekrar dene
        </button>
        <Link href="/" className="px-5 py-2 underline">
          Ana sayfa
        </Link>
      </div>
    </div>
  );
}
