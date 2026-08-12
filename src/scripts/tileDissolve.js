// Scroll tile-dissolve — as the hero scrolls past, its dark field disintegrates
// into the cream page below. Cream tiles fade in bottom-up (opacity only, scrubbed
// to scroll position); the fade windows overlap across many tiles at once, so the
// advancing front reads soft and ragged instead of as clean stripes.
//
// Renamed from pixel-dissolve.ts to match the requested spec: it drives every
// [data-pixelated-scroll-transition] element and returns a disposer. Imports GSAP
// from ./gsap-core so ScrollTrigger is registered exactly once (never here).
import { gsap, prefersReduced } from './gsap-core';

function responsiveCols(el) {
  const w = window.innerWidth;
  if (w < 640) return parseInt(el.dataset.columnsMobile ?? '6', 10);
  if (w < 1024) return parseInt(el.dataset.columnsTablet ?? '10', 10);
  return parseInt(el.dataset.columns ?? '16', 10);
}

export function initTileDissolve() {
  const built = [];

  document.querySelectorAll('[data-pixelated-scroll-transition]').forEach((el) => {
    const cols = responsiveCols(el);
    const rows = parseInt(el.dataset.rows ?? '8', 10);

    // Tiles live in an absolutely-positioned grid panel so the .pxt container keeps
    // its negative inset (seam killer #1); the cream box-shadow on each tile is #2.
    const panel = document.createElement('div');
    panel.style.cssText = 'position:absolute;inset:0;display:grid;pointer-events:none';
    panel.style.gridTemplateColumns = `repeat(${cols},1fr)`;
    panel.style.gridTemplateRows = `repeat(${rows},1fr)`;

    const scored = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const b = document.createElement('i');
        panel.appendChild(b);
        // bottom rows first (50), heavy random noise (300) so the front is ragged,
        // a gentle horizontal wobble (30). noise > row term → rows overlap.
        scored.push({ b, p: (rows - 1 - r) * 50 + Math.random() * 300 + Math.sin(c * 0.3) * 30 });
      }
    }
    el.appendChild(panel);

    // animate in ascending priority; stagger 'start' walks that sorted order
    const blocks = scored.sort((a, b) => a.p - b.p).map((o) => o.b);
    gsap.set(blocks, { autoAlpha: 0 });

    // Reduced motion: tiles built + hidden, no dissolve — hero stays whole.
    if (prefersReduced()) {
      built.push({ tl: null, panel });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el.closest('section'),
        start: el.dataset.scrollStart || 'bottom 60%',
        end: 'bottom 20%',
        scrub: 0.9, // a NUMBER — the playhead eases behind the scrollbar
        invalidateOnRefresh: true,
      },
    });
    tl.to(blocks, {
      autoAlpha: 1,
      duration: 0.22, // each tile fades over 0.22 — many mid-fade at once
      stagger: { amount: 1.5, from: 'start' },
      ease: 'none',
    });
    built.push({ tl, panel });
  });

  // Disposer: kill each timeline's ScrollTrigger and remove its panel so a
  // ClientRouter swap can't leak triggers or stack duplicate overlays.
  return () =>
    built.forEach((o) => {
      o.tl?.scrollTrigger?.kill();
      o.tl?.kill();
      o.panel.remove();
    });
}
