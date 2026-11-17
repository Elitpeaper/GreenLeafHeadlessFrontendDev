// Filmstrips from the proof screenshots. Usage: node _seri.mjs (inside this folder; needs sharp from the project)
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
await strip("SERI-pin-1440.png", ["d10-pin-000.png", "d11-pin-025.png", "d12-pin-050.png", "d13-pin-075.png", "d14-pin-100.png", "d15-pin-after.png"], 260);
await strip("SERI-hero-swiper-1440.png", ["d01-hero-1440.png", "d02-hero-slide2-1440.png"], 360);
await strip("SERI-mobil-390.png", ["m01-hero-390.png", "m02-doors-strip-390.png", "m03-doors-strip-end-390.png"], 600);
