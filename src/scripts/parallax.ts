// Parallax depth (Module 6).
// The design floated accent SVGs using ScrollSmoother's data-speed. ScrollSmoother
// is not used here (it transforms the content and breaks position:sticky), so each
// [data-speed] element is translated on scrub by a per-element factor.
//
// speed > 1 drifts up (reads closer), < 1 lags down (reads further away).
// Travel = (speed - 1) * RANGE px across the element's full scroll pass; RANGE is
// deliberately large so the depth separation is visible, not homeopathic.
// Override per element with data-parallax-range.
//
// Hero deco shapes are auto-enrolled (no markup attr) on their own upward rise —
// see initParallax. They only get `y` here — hero-intro's perpetual drift owns
// xPercent/yPercent/rotation, so the two systems compose in one transform instead
// of fighting.
import { gsap, prefersReduced } from './gsap-core';

const RANGE = 320;

// `start` defaults to 'top bottom' (element enters from below → travels through
// centred rest position → exits), which is why the tween is a fromTo around 0.
// Elements already on screen at scroll 0 (the hero) must pass data-parallax-start
// ="top top" instead, or they'd render pre-displaced on first paint; those get a
// one-way tween that begins at rest.
function apply(el: HTMLElement, speed: number, range: number): void {
  const shift = (speed - 1) * range;
  const section = el.closest('section') ?? el;
  const start = el.dataset.parallaxStart;
  const scrollTrigger = {
    trigger: section,
    start: start || 'top bottom',
    end: 'bottom top',
    scrub: true,
    invalidateOnRefresh: true,
  };
  if (start) {
    gsap.fromTo(el, { y: 0 }, { y: shift * 1.6, ease: 'none', scrollTrigger });
    return;
  }
  gsap.fromTo(el, { y: -shift }, { y: shift, ease: 'none', scrollTrigger });
}

export function initParallax(): void {
  if (prefersReduced()) return;

  gsap.utils.toArray<HTMLElement>('[data-speed]').forEach((el) => {
    const speed = parseFloat(el.dataset.speed ?? '1');
    const range = parseFloat(el.dataset.parallaxRange ?? String(RANGE));
    apply(el, speed, range);
  });

  // Deco shapes all rise as the hero scrolls away — one direction, never a mix, so
  // the hero reads as a single layer lifting off. Depth comes from how FAR each one
  // travels: big shapes read near and overtake the scroll, small ones barely move.
  // Travel completes exactly when the hero's bottom clears the viewport top.
  gsap.utils.toArray<HTMLElement>('[data-shape]').forEach((el) => {
    const w = el.getBoundingClientRect().width || 20;
    const rise = gsap.utils.clamp(70, 210, 55 + w * 1.9);
    gsap.fromTo(
      el,
      { y: 0 },
      {
        y: -rise,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('section') ?? el,
          start: 'top top', // hero is on screen at scroll 0 — must begin at rest
          end: 'bottom top',
          scrub: 0.6, // lag behind the scrub position → smooths the rise
          invalidateOnRefresh: true,
        },
      },
    );
  });
}
