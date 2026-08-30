// Scroll harness.
//
// A scroll page has no single state: every position is a different frame, and
// the failures live between the two you happened to look at. This walks the page
// top to bottom at a fixed step, screenshots every position, reports positions
// where nothing changed between two frames (dead scroll), and composes the whole
// run into one contact sheet so the result can actually be looked at.
//
// Usage: node lab/shoot.mjs [--url ...] [--out lab/shots] [--width 1440]
//        [--height 900] [--reduced] [--step 0.5]
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";
import sharp from "sharp";

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith("--")
    ? process.argv[i + 1]
    : fallback;
};
const flag = (name) => process.argv.includes(`--${name}`);

const URL = arg("url", "http://localhost:4321/");
const OUT = arg("out", "lab/shots");
const W = Number(arg("width", 1440));
const H = Number(arg("height", 900));
const STEP = Number(arg("step", 0.5));
const REDUCED = flag("reduced");

const CHROME = [
  process.env.SCROLLCRAFT_CHROME,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
].find((p) => p && fs.existsSync(p));
if (!CHROME) {
  console.error("No Chrome found. Set SCROLLCRAFT_CHROME.");
  process.exit(1);
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage({
  viewport: { width: W, height: H },
  reducedMotion: REDUCED ? "reduce" : "no-preference",
});

const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));
page.on("requestfailed", (r) => errors.push(`${r.failure()?.errorText} ${r.url()}`));

await page.goto(URL, { waitUntil: "domcontentloaded" });
await page.evaluate(() => document.fonts.ready);
// The preloader owns the first second and a half of the page's life; every hero
// reveal is latched behind it, so shooting before it clears photographs a black
// panel and calls it a hero.
await page.waitForTimeout(2600);

const { height, vh } = await page.evaluate(() => ({
  height: document.body.scrollHeight,
  vh: innerHeight,
}));
const maxScroll = Math.max(0, height - vh);
console.log(`page: ${(height / vh).toFixed(1)} viewport-heights at ${W}x${H}`);

const shots = [];
for (let y = 0, i = 0; y <= maxScroll + 1; y += vh * STEP, i++) {
  const at = Math.min(y, maxScroll);
  // Lenis interpolates, so a jump has to be given time to arrive before the
  // frame is worth keeping.
  await page.evaluate((t) => window.scrollTo({ top: t, behavior: "auto" }), at);
  // Long enough for the bar-wipe headline reveals to finish: they run 1.25s, and
  // a frame captured inside that window photographs a heading half covered by its
  // own wipe and reads as a clipping bug.
  await page.waitForTimeout(1500);
  const file = path.join(OUT, `${String(i).padStart(2, "0")}-${Math.round(at)}.png`);
  await page.screenshot({ path: file });
  shots.push({ file, at });
}

await browser.close();

// Dead scroll: two consecutive frames that are effectively the same picture.
// Compared on a downscaled greyscale raw buffer, which is enough to catch a
// stalled section and cheap enough to run over the whole page.
const raws = [];
for (const s of shots) {
  raws.push(await sharp(s.file).greyscale().resize(160, 100, { fit: "fill" }).raw().toBuffer());
}
const dead = [];
for (let i = 1; i < raws.length; i++) {
  let diff = 0;
  for (let p = 0; p < raws[i].length; p++) diff += Math.abs(raws[i][p] - raws[i - 1][p]);
  const mean = diff / raws[i].length;
  if (mean < 1.2) dead.push({ from: shots[i - 1].at, to: shots[i].at, mean: mean.toFixed(2) });
}

// Contact sheet, six across.
const cols = 6;
const tw = 300;
const th = Math.round((H / W) * tw);
const rows = Math.ceil(shots.length / cols);
const tiles = await Promise.all(
  shots.map(async (s, i) => ({
    input: await sharp(s.file).resize(tw, th, { fit: "fill" }).png().toBuffer(),
    left: (i % cols) * tw,
    top: Math.floor(i / cols) * th,
  }))
);
await sharp({
  create: {
    width: cols * tw,
    height: rows * th,
    channels: 3,
    background: { r: 24, g: 24, b: 24 },
  },
})
  .composite(tiles)
  .png()
  .toFile(path.join(OUT, "sheet.png"));

console.log(`${shots.length} frames -> ${path.join(OUT, "sheet.png")}`);
console.log(dead.length ? `dead scroll: ${dead.map((d) => `${d.from}-${d.to}px (${d.mean})`).join(", ")}` : "no dead scroll detected");
if (errors.length) console.log(`console/network errors:\n  ${errors.join("\n  ")}`);
else console.log("no console or network errors");
