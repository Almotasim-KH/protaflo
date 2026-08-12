// Hero intro — three of the four hero motion systems that fire on loader complete
// (the fourth, the tile dissolve, is scroll-driven and lives in pixel-dissolve.ts).
//   A. bar-wipe headline — pure CSS, we just add `.play` when the loader lifts.
//   C. the 13 background shapes — pop in ONCE, no parallax, random back.out stagger.
//   D. the scribble over the portrait — redraws itself forever from 4 path sets.
import { gsap, prefersReduced, onLoaderComplete } from './gsap-core';

// ---- D. mind-scratch sets (viewBox 0 0 200 70) ----
// Sits directly over the head: one thought at a time, each hand-drawn from the
// work itself — trend line, spreadsheet, code, UI frame, bar chart. They cycle
// fast on purpose; the read is "thoughts racing", not "a logo animating".
type Stroke = { d: string; w: number };
const SCRIBBLE_SETS: Stroke[][] = [
  // data analysis — axis + rising line + arrowhead
  [
    { d: 'M62 14 L62 56 L138 56', w: 5 },
    { d: 'M70 48 C88 41 95 45 110 30 C118 22 126 27 133 19', w: 6 },
    { d: 'M124 18 L134 17 L134 27', w: 5 },
  ],
  // excel — grid
  [
    { d: 'M64 17 L136 17 L136 55 L64 55 Z', w: 5 },
    { d: 'M64 30 L136 30', w: 4 },
    { d: 'M88 17 L88 55', w: 4 },
    { d: 'M112 17 L112 55', w: 4 },
  ],
  // web dev — angle brackets + slash
  [
    { d: 'M84 22 L68 36 L84 50', w: 6 },
    { d: 'M110 17 L92 54', w: 6 },
    { d: 'M117 22 L133 36 L117 50', w: 6 },
  ],
  // UI/UX — artboard with a toolbar, two text runs and a button
  [
    { d: 'M62 16 L138 16 L138 56 L62 56 Z', w: 5 },
    { d: 'M62 27 L138 27', w: 4 },
    { d: 'M72 37 L98 37', w: 5 },
    { d: 'M72 46 L110 46', w: 4 },
    { d: 'M118 44 L131 44', w: 6 },
  ],
  // reporting — bar chart on a baseline
  [
    { d: 'M62 57 L138 57', w: 5 },
    { d: 'M74 57 L74 41', w: 7 },
    { d: 'M92 57 L92 27', w: 7 },
    { d: 'M110 57 L110 46', w: 7 },
    { d: 'M128 57 L128 20', w: 7 },
  ],
];

// one thought per cycle — fast enough to read as racing, slow enough to register
const CYCLE_MS = 620;

function initScribble(): void {
  const svg = document.querySelector<SVGSVGElement>('[data-scribble]');
  if (!svg) return;
  const reduced = prefersReduced();
  let idx = 0;

  const render = (): void => {
    const set = SCRIBBLE_SETS[idx % SCRIBBLE_SETS.length];
    svg.innerHTML = set
      .map(
        (p) =>
          `<path d="${p.d}" stroke="var(--color-accent)" stroke-width="${p.w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
      )
      .join('');
    const paths = svg.querySelectorAll<SVGPathElement>('path');
    paths.forEach((path, i) => {
      const len = path.getTotalLength();
      path.style.strokeDasharray = String(len);
      if (reduced) {
        path.style.strokeDashoffset = '0';
        return;
      }
      path.style.strokeDashoffset = String(len);
      // snap in, hold, then blink out just before the next thought lands
      path.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], {
        duration: 170,
        delay: i * 40,
        easing: 'ease-out',
        fill: 'forwards',
      });
      path.animate([{ opacity: 1, offset: 0.8 }, { opacity: 0, offset: 1 }], {
        duration: CYCLE_MS,
        fill: 'forwards',
      });
    });
    idx++;
  };

  render();
  if (reduced) return; // one static draw, no cycling
  window.setInterval(render, CYCLE_MS);
}

// Perpetual, barely-there drift. x and y run on different clocks so each shape
// traces a slow, organic wander instead of a straight bob; rotation adds sway.
// Uses xPercent/yPercent (self-relative) on purpose: parallax.ts scrubs x/y on the
// same shapes, and GSAP composes percent + px into one transform, so neither
// system overwrites the other.
function floatShapes(shapes: HTMLElement[]): void {
  const rand = gsap.utils.random;
  shapes.forEach((s) => {
    gsap.to(s, {
      yPercent: rand(-22, 22),
      rotation: rand(-5, 5),
      duration: rand(3.5, 6.5),
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: rand(0, 1.2),
    });
    gsap.to(s, {
      xPercent: rand(-18, 18),
      duration: rand(4, 7),
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: rand(0, 1),
    });
  });
}

export function initHeroIntro(): void {
  // D runs immediately (its own reduced-motion handling); A + C wait for the loader.
  initScribble();

  onLoaderComplete(() => {
    const shapes = gsap.utils.toArray<HTMLElement>('[data-shape]');
    // read each shape's authored inline opacity before we overwrite it
    shapes.forEach((s) => (s.dataset.op = getComputedStyle(s).opacity));

    if (prefersReduced()) {
      // no wipe, no pop — just reveal shapes at their authored opacity
      gsap.set(shapes, { autoAlpha: (_i: number, t: HTMLElement) => Number(t.dataset.op) });
      return;
    }

    // A. start the CSS bar-wipe in the same frame the loader panel lifts
    document.querySelector<HTMLElement>('[data-hero-title]')?.classList.add('play');

    // C. pop the shapes in once, scattered by a random stagger, then let them
    //    drift forever so the hero keeps a little life while the session runs.
    if (shapes.length) {
      gsap.set(shapes, { autoAlpha: 0, scale: 0.5, rotate: -14, transformOrigin: '50% 50%' });
      gsap.to(shapes, {
        autoAlpha: (_i: number, t: HTMLElement) => Number(t.dataset.op),
        scale: 1,
        rotate: 0,
        duration: 1.05,
        ease: 'back.out(1.7)',
        stagger: { amount: 1.1, from: 'random' },
        // never clearProps — it would wipe the authored inline left/top positioning
        onComplete: () => floatShapes(shapes),
      });
    }
  });
}
