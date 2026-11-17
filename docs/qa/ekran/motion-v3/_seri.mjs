// Builds filmstrips (side-by-side frames) from the proof screenshots. Usage: node _seri.mjs (run inside this folder)
import sharp from "sharp";
import { existsSync } from "node:fs";

async function strip(name, files, height) {
  const frames = files.filter((f) => existsSync(f));
  const imgs = await Promise.all(frames.map((f) => sharp(f).resize({ height }).png().toBuffer({ resolveWithObject: true })));
  const gap = 8;
  const width = imgs.reduce((a, i) => a + i.info.width + gap, gap);
  const composite = [];
  let x = gap;
  for (const i of imgs) {
    composite.push({ input: i.data, left: x, top: gap });
    x += i.info.width + gap;
  }
  await sharp({ create: { width, height: height + gap * 2, channels: 3, background: "#ffffff" } }).composite(composite).png().toFile(name);
  console.log(name, frames.length, "frames");
}

for (const tier of ["full", "reduced"]) {
  await strip(
    `SERI-${tier}-chip-hover-cikisi.png`,
    [`${tier}-lab-chip-0-hover.png`, ...[0, 60, 125, 190, 250].map((t) => `${tier}-lab-chip-leave-${String(t).padStart(3, "0")}ms.png`), `${tier}-lab-chip-9-rest.png`],
    92,
  );
  await strip(`SERI-hero-${tier}.png`, [0, 150, 300, 450, 600, 800, 1200].map((t) => `hero-${tier}-${String(t).padStart(4, "0")}ms.png`), 300);
}
await strip("SERI-full-tile-hover-cikisi.png", ["full-lab-tile-0-hover.png", "full-lab-tile-leave-000ms.png", "full-lab-tile-leave-125ms.png", "full-lab-tile-leave-250ms.png", "full-lab-tile-9-rest.png"], 200);
await strip("SERI-recolor-vitrin.png", ["recolor-reduced-hover.png", "recolor-reduced-leave-400ms.png", "recolor-reduced-rest.png"], 300);
