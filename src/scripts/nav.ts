// Module 5 — Nav.
// Floating centered white pill. Once past the hero it hides while the reader is
// scrolling DOWN, and comes back the moment they scroll up or simply stop. Inside
// the hero it never hides.
import { prefersReduced } from './gsap-core';

const IDLE_MS = 220; // scroll quiet for this long = "stopped" → bring the nav back
const DELTA = 4; // ignore sub-pixel / momentum jitter

export function initNav(): void {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!nav) return;
  if (prefersReduced()) return; // nav stays put, no hide

  const hero = document.querySelector<HTMLElement>('[data-hero]');
  // Re-read per scroll rather than caching: the hero's height changes on resize,
  // and on inner pages there is no hero at all (fall back to a short fold).
  const threshold = (): number => (hero ? hero.offsetHeight * 0.9 : 120);

  let last = window.scrollY;
  let ticking = false;
  let idle: number | undefined;

  const show = (): void => nav.classList.remove('is-hidden');

  const update = (): void => {
    const y = window.scrollY;
    const moved = y - last;

    if (y <= threshold()) {
      show(); // still in the hero — always visible
    } else if (moved > DELTA) {
      nav.classList.add('is-hidden'); // scrolling down past the hero
    } else if (moved < -DELTA) {
      show(); // scrolling up
    }

    last = y;
    ticking = false;

    window.clearTimeout(idle);
    idle = window.setTimeout(show, IDLE_MS);
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
}
