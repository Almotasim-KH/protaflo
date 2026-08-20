// Footer plate colour spotlight. The Yanbu plate is a 1-bit dither with no
// colour of its own, so the colour lives in a gradient painted *under* it —
// the plate multiplies, its paper drops out, and whatever sits beneath shows
// through the ink. This module only moves a masked window over that gradient:
// hover the band and the scene comes up in colour around the pointer, the rest
// staying black and white.
//
// The pointer is followed with a lerp rather than written straight through, so
// the colour trails the cursor by a frame or two instead of snapping — the same
// easing the rest of the site's cursor work uses.
import { prefersReduced } from './gsap-core';

// Slow on purpose. A tight follow reads as a torch strapped to the cursor; at
// this rate the warmth drifts after the pointer and settles a beat late, which
// is what makes it feel like it is coming from behind the plate rather than
// being drawn on top of it.
const EASE_FOLLOW = 0.055;

export function initFooterTint(): (() => void) | null {
  const band = document.querySelector<HTMLElement>('[data-footer-band]');
  const tint = band?.querySelector<HTMLElement>('[data-footer-tint]');
  if (!band || !tint) return null;

  // Hover is the whole interaction — a touch pointer never gets it, and binding
  // pointermove there would only fire mid-scroll and flash colour at random.
  if (window.matchMedia('(hover: none)').matches) return null;

  const reduced = prefersReduced();

  let targetX = 0;
  let targetY = 0;
  let x = 0;
  let y = 0;
  let raf = 0;
  let inside = false;

  const write = (): void => {
    tint.style.setProperty('--mx', `${x}px`);
    tint.style.setProperty('--my', `${y}px`);
  };

  const tick = (): void => {
    x += (targetX - x) * EASE_FOLLOW;
    y += (targetY - y) * EASE_FOLLOW;
    write();
    // Park the loop once the spotlight has caught up and the pointer has left;
    // while it is inside, keep running so the next move is already in flight.
    const settled = Math.abs(targetX - x) < 0.5 && Math.abs(targetY - y) < 0.5;
    raf = inside || !settled ? requestAnimationFrame(tick) : 0;
  };

  const move = (e: PointerEvent): void => {
    const r = band.getBoundingClientRect();
    targetX = e.clientX - r.left;
    targetY = e.clientY - r.top;
    if (reduced) {
      // No trailing for readers who asked for stillness: the window is placed
      // where the pointer is, and that is the only movement they get.
      x = targetX;
      y = targetY;
      write();
      return;
    }
    if (!raf) raf = requestAnimationFrame(tick);
  };

  const enter = (e: PointerEvent): void => {
    inside = true;
    // Seed the spotlight at the entry point so it fades up in place instead of
    // flying in from wherever the last visit left it.
    const r = band.getBoundingClientRect();
    x = targetX = e.clientX - r.left;
    y = targetY = e.clientY - r.top;
    write();
    band.dataset.tintOn = '1';
    if (!reduced && !raf) raf = requestAnimationFrame(tick);
  };

  const leave = (): void => {
    inside = false;
    delete band.dataset.tintOn;
  };

  band.addEventListener('pointerenter', enter);
  band.addEventListener('pointermove', move, { passive: true });
  band.addEventListener('pointerleave', leave);

  return () => {
    band.removeEventListener('pointerenter', enter);
    band.removeEventListener('pointermove', move);
    band.removeEventListener('pointerleave', leave);
    if (raf) cancelAnimationFrame(raf);
    delete band.dataset.tintOn;
  };
}
