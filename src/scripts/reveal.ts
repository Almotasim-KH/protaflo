// Scroll-in fade/stagger for body content ([data-reveal], [data-reveal-item]).
// Kept in one module and imported — never copy-pasted per page.
import { gsap, ScrollTrigger, prefersReduced, onLoaderComplete } from './gsap-core';

function show(el: Element): void {
  gsap.set(el, { visibility: 'visible' });
}

export function initReveal(): void {
  const singles = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  const groups = gsap.utils.toArray<HTMLElement>('[data-reveal-stagger]');
  const looseItems = gsap.utils.toArray<HTMLElement>(
    '[data-reveal-item]:not([data-reveal-stagger] [data-reveal-item])'
  );

  if (prefersReduced()) {
    [...singles, ...groups.flatMap((g) => [...g.querySelectorAll('[data-reveal-item]')]), ...looseItems].forEach(
      show
    );
    return;
  }

  const animateIn = (el: HTMLElement, delay = 0): void => {
    show(el);
    gsap.from(el, {
      y: 22,
      autoAlpha: 0,
      duration: 1,
      ease: 'power4.out',
      delay,
    });
  };

  singles.forEach((el) => {
    // hero-region reveals wait for the loader; the rest trigger on scroll
    if (el.dataset.reveal === 'loader' || el.closest('[data-hero]')) {
      onLoaderComplete(() => animateIn(el, Number(el.dataset.revealDelay ?? 0.3)));
      return;
    }
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => animateIn(el),
    });
  });

  groups.forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>('[data-reveal-item]');
    ScrollTrigger.create({
      trigger: group,
      start: 'top 82%',
      once: true,
      onEnter: () => {
        items.forEach(show);
        gsap.from(items, { y: 24, autoAlpha: 0, duration: 0.9, ease: 'power4.out', stagger: 0.08 });
      },
    });
  });
}
