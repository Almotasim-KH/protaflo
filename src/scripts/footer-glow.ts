// Footer scene reveal. The band is fixed to the viewport bottom and slides up
// as the end of the page comes into range: a sliver of treeline while there is
// more than a band-height of scroll left, fully landed at the very bottom.
// The module only writes `--reveal` (0–1); the component decides what that
// means visually.
//
// Deliberately not a ScrollTrigger — the measurement is one subtraction against
// document height, it has to stay correct while Lenis interpolates, and a
// transform-only write per scroll event is cheaper than a trigger.
import { prefersReduced } from './gsap-core';

export function initFooterGlow(): (() => void) | null {
  const band = document.querySelector<HTMLElement>('[data-footer-band]');
  if (!band) return null;

  // Reduced motion: the CSS pins it to full height, so don't bind anything.
  if (prefersReduced()) return null;

  const min = Number(band.dataset.minReveal ?? 0.045);

  const measure = (): void => {
    // offsetHeight ignores the transform, so the band can measure itself.
    const h = band.offsetHeight || 1;
    // Scroll left before the end of the page: the glow starts rising once that
    // is within its own height, and is full when it hits zero.
    const left = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
    const t = Math.max(0, Math.min(1, (h - left) / h));
    band.style.setProperty('--reveal', String(min + (1 - min) * t));
  };

  measure();
  window.addEventListener('scroll', measure, { passive: true });
  window.addEventListener('resize', measure, { passive: true });

  return () => {
    window.removeEventListener('scroll', measure);
    window.removeEventListener('resize', measure);
  };
}
