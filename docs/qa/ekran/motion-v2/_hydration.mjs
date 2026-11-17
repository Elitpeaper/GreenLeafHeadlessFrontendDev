import { launch, sleep } from "./cdp.mjs";
const b = await launch({ out: process.argv[2], port: 9367 });
await b.viewport(1440, 900);
const res = {};
for (const media of ["reduce", "no-preference"]) {
  await b.media([{ name: "prefers-reduced-motion", value: media }]);
  for (const p of ["/", "/svg-kutuphanesi", "/kategori/cilt-bakimi", "/urun/ilife-sod-ipek-yuz-kremi", "/pv-nedir", "/arama?q=krem"]) {
    b.events.length = 0;
    await b.goto("http://localhost:3201" + p, 6000);
    await b.mouse(700, 450);
    await sleep(800);
    const msgs = b.events
      .filter((e) => (e.method === "Runtime.consoleAPICalled" && (e.params.type === "error" || e.params.type === "warning")) || e.method === "Runtime.exceptionThrown" || (e.method === "Log.entryAdded" && ["error", "warning"].includes(e.params.entry.level)))
      .map((e) => (e.params.args ? e.params.args.map((a) => a.value ?? a.description ?? "").join(" ") : e.params.entry?.text ?? JSON.stringify(e.params.exceptionDetails)).slice(0, 400));
    const ready = await b.evaluate("document.documentElement.hasAttribute('data-motion-ready')");
    res[media + " " + p] = { ready, hydrationMsgs: msgs.filter((m) => /hydrat|didn.t match|mismatch/i.test(m)), other: msgs.filter((m) => !/hydrat|didn.t match|mismatch/i.test(m)).slice(0, 3) };
  }
}
console.log(JSON.stringify(res, null, 1));
b.close(); process.exit(0);
