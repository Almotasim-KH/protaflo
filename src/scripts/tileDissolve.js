// Scroll tile-dissolve — as the hero scrolls past, its dark field disintegrates
// into the cream page below. Cream tiles fade in bottom-up (opacity only, scrubbed
// to scroll position); the fade windows overlap across many tiles at once, so the
// advancing front reads soft and ragged instead of as clean stripes.
//
// Renamed from pixel-dissolve.ts to match the requested spec: it drives every
// [data-pixelated-scroll-transition] element and returns a disposer. Imports GSAP
// from ./gsap-core so ScrollTrigger is registered exactly once (never here).
import { gsap, prefersReduced } from './gsap-core';
import { setScrollWeight } from './smooth-scroll';

function responsiveCols(el) {
  const w = window.innerWidth;
  if (w < 640) return parseInt(el.dataset.columnsMobile ?? '6', 10);
  if (w < 1024) return parseInt(el.dataset.columnsTablet ?? '10', 10);
  return parseInt(el.dataset.columns ?? '16', 10);
}

// Rows are responsive for the same reason columns are, and leaving them fixed
// was the bug: a phone kept the desktop's 8 rows while its columns dropped to
// 6, so the hero came apart in 66x125 slabs and a lone straggler read as a grey
// rectangle sitting on the page rather than as a dissolving edge. The front has
// to be finer than the eye can count, at every width.
function responsiveRows(el) {
  const w = window.innerWidth;
  if (w < 640) return parseInt(el.dataset.rowsMobile ?? el.dataset.rows ?? '8', 10);
  if (w < 1024) return parseInt(el.dataset.rowsTablet ?? el.dataset.rows ?? '8', 10);
  return parseInt(el.dataset.rows ?? '8', 10);
}

export function initTileDissolve() {
  const built = [];

  document.querySelectorAll('[data-pixelated-scroll-transition]').forEach((el) => {
    const cols = responsiveCols(el);
    const rows = responsiveRows(el);

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
        // Ends late on purpose: the last tiles land just before the hero clears,
        // so the dissolve is never still running over the section beneath it.
        end: el.dataset.scrollEnd || 'bottom 10%',
        // A NUMBER — the playhead eases behind the scrollbar. Raised with the
        // scroll weight below: the front should trail the wheel far enough to
        // read as mass, not far enough to feel disconnected from it.
        scrub: 1.4,
        invalidateOnRefresh: true,
        // The scroll itself gets heavy for exactly the span of the dissolve —
        // a wheel notch travels less and the tail takes longer to settle, so
        // pulling the hero apart costs something. onToggle fires on both edges
        // and in both directions, which is what makes scrolling back up feel
        // the same as scrolling down. See setScrollWeight in smooth-scroll.ts.
        onToggle: (self) => setScrollWeight(self.isActive),
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
  return () => {
    // Killing a trigger does not fire its onToggle, so a swap made mid-dissolve
    // would strand the whole site at dissolve weight. Hand it back explicitly.
    setScrollWeight(false);
    built.forEach((o) => {
      o.tl?.scrollTrigger?.kill();
      o.tl?.kill();
      o.panel.remove();
    });
  };
}
