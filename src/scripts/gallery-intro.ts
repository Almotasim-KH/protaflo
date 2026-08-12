// Module 6 — Gallery arrival on a project page.
// The shots are the point of a case-study page, so they introduce themselves:
// whatever is in view on arrival lifts in as one staggered set (after the
// transition band has cleared, so nothing animates underneath it), and anything
// below the fold waits for the scroll. Each tile rises and un-clips from the
// bottom while its image settles out of a slight zoom — the frame arrives first,
// the picture lands into it.
import { gsap, ScrollTrigger, prefersReduced } from './gsap-core';

declare global {
  interface Window {
    // set by page-transition.ts when this page was opened from a project card
    __wipeArrival?: boolean;
  }
}

// The band finishes its reveal ~920ms in; start just as it clears the tiles.
const ARRIVAL_DELAY = 0.85;
const COLD_DELAY = 0.25;

function show(el: Element): void {
  gsap.set(el, { visibility: 'visible' });
}

// Generous margin: a tile straddling the fold still counts as "in view", so it
// joins the welcome set instead of popping in a scroll-pixel later.
function inView(el: HTMLElement): boolean {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight * 0.94 && r.bottom > 0;
}

function animateIn(el: HTMLElement, delay: number): void {
  show(el);
  const img = el.querySelector('img');
  const tl = gsap.timeline({ delay });

  tl.from(el, {
    yPercent: 7,
    autoAlpha: 0,
    clipPath: 'inset(12% 0% 100% 0%)',
    duration: 1.15,
    ease: 'power4.out',
    clearProps: 'clipPath,transform',
  });

  // Image outlives the tile tween by a beat so the settle reads as the picture
  // coming to rest, not as one block moving.
  if (img) {
    tl.from(
      img,
      { scale: 1.14, duration: 1.5, ease: 'power3.out', clearProps: 'transform' },
      0
    );
  }
}

export function initGalleryIntro(): void {
  const items = gsap.utils.toArray<HTMLElement>('[data-gallery-item]');
  if (!items.length) return;

  if (prefersReduced()) {
    items.forEach(show);
    return;
  }

  const base = window.__wipeArrival ? ARRIVAL_DELAY : COLD_DELAY;
  let welcomed = 0;

  items.forEach((el) => {
    if (inView(el)) {
      // masonry columns fill top-to-bottom per column, so stagger by DOM order —
      // it reads as a wave across the pair regardless of tile heights
      animateIn(el, base + welcomed * 0.11);
      welcomed += 1;
      return;
    }
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => animateIn(el, 0),
    });
  });
}
