// Generates the share cards referenced by og:image.
//
// The site declared twitter:card="summary_large_image" with no image, so every
// link shared to LinkedIn or WhatsApp rendered as an empty card. One card per
// locale, drawn in the hero's own colours (#1c1c1c ground, #e8f544 accent) so a
// shared link looks like the site it opens.
//
// Run: node lab/og.mjs   →   public/og.png, public/og-ar.png
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

const GROUND = '#1c1c1c';
const ACCENT = '#e8f544';
const MUTED = '#a8a8a2';

// Segoe UI is the one family present on the build machine that carries both a
// Latin and a full Arabic cut, so both cards set from the same stack and the two
// locales stay visually identical apart from the script.
const FACE = 'Segoe UI Semibold, Segoe UI, Arial, sans-serif';
const FACE_BOLD = 'Segoe UI Bold, Segoe UI, Arial, sans-serif';

/**
 * @param {object} o
 * @param {string} o.name      display name, set largest
 * @param {string} o.role      discipline line under the name
 * @param {string} o.tag       the claim, set in the accent
 * @param {'ltr'|'rtl'} o.dir
 */
function card({ name, role, tag, dir }) {
  const rtl = dir === 'rtl';
  // One margin, mirrored. Text anchors to the start edge of its own direction.
  //
  // `text-anchor` alone positions correctly; adding an SVG `direction="rtl"` on
  // top of it makes this renderer ignore the anchor and run the string off the
  // right edge. The shaper already orders Arabic right-to-left on its own, so
  // the attribute is not needed — do not add it back.
  const x = rtl ? 1200 - 90 : 90;
  const anchor = rtl ? 'end' : 'start';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${GROUND}"/>

  <!-- Accent pool behind the type, echoing the hero's glow under the portrait. -->
  <defs>
    <radialGradient id="pool" cx="${rtl ? '78%' : '22%'}" cy="34%" r="62%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.13"/>
      <stop offset="55%" stop-color="${ACCENT}" stop-opacity="0.03"/>
      <stop offset="100%" stop-color="${GROUND}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#pool)"/>

  <!-- The accent bar that opens every headline on the site. -->
  <rect x="${rtl ? 1200 - 90 - 96 : 90}" y="150" width="96" height="10" fill="${ACCENT}"/>

  <text x="${x}" y="268" text-anchor="${anchor}"
        font-family="${FACE_BOLD}" font-weight="700" font-size="78" fill="#ffffff">${name}</text>

  <text x="${x}" y="336" text-anchor="${anchor}"
        font-family="${FACE}" font-size="38" fill="${MUTED}">${role}</text>

  <text x="${x}" y="434" text-anchor="${anchor}"
        font-family="${FACE}" font-weight="600" font-size="34" fill="${ACCENT}">${tag}</text>

  <line x1="90" y1="512" x2="1110" y2="512" stroke="#3a3a38" stroke-width="1"/>
  <text x="${x}" y="562" text-anchor="${anchor}" direction="ltr"
        font-family="${FACE}" font-size="28" fill="${MUTED}">almotasim-kh.com</text>
</svg>`;
}

const cards = [
  {
    file: 'og.png',
    svg: card({
      name: 'Almotasim Khairullah',
      role: 'Web Developer &#38; Data Analyst · Yanbu',
      tag: 'I build the interface and the model behind it.',
      dir: 'ltr',
    }),
  },
  {
    file: 'og-ar.png',
    svg: card({
      name: 'المعتصم خير الله',
      role: 'مطوّر ويب ومحلل بيانات · ينبع',
      tag: 'أبني الواجهة والنموذج الذي خلفها.',
      dir: 'rtl',
    }),
  },
];

for (const { file, svg } of cards) {
  const out = join(OUT, file);
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
  console.log('wrote', out);
}
