// Module 1 — Preloader.
// Dark full-screen panel: gray name with a white fill wiping L→R, a progress bar
// pinned flush to the bottom edge, then the whole panel swipes up to reveal the
// hero. Runs on every page load / reload. prefers-reduced-motion skips straight
// to the page.
import { gsap, prefersReduced, fireLoaderComplete } from './gsap-core';

export function initPreloader(): void {
  const pl = document.querySelector<HTMLElement>('[data-preloader]');
  if (!pl) {
    fireLoaderComplete();
    return;
  }

  const finish = (): void => {
    pl.classList.add('is-done');
    fireLoaderComplete();
  };

  // Reduced motion → no animation, reveal now.
  if (prefersReduced()) {
    pl.remove();
    fireLoaderComplete();
    return;
  }

  const fill = pl.querySelector<HTMLElement>('[data-fill]');
  const tagFill = pl.querySelector<HTMLElement>('[data-tag-fill]');
  const bar = pl.querySelector<HTMLElement>('[data-bar]');

  const tl = gsap.timeline({
    defaults: { ease: 'power4.out' },
    onComplete: () => {
      pl.classList.add('is-done');
    },
  });

  // Both fills run with the reading direction, so they mirror on the Arabic pages.
  const rtl = document.documentElement.dir === 'rtl';
  if (bar)
    tl.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: rtl ? 'right center' : 'left center',
        duration: 0.9,
        ease: 'power2.inOut',
      },
      0
    );
  if (fill)
    tl.fromTo(
      fill,
      // Every component carries a unit and the same unit: an inset() that mixes
      // bare 0 with 0% does not interpolate — the RTL pair snapped from hidden to
      // shown in one frame instead of wiping.
      { clipPath: rtl ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'power2.out' },
      0.15
    );

  // Tagline wipes a beat behind the name so the two read as one sweep down the
  // panel rather than two things firing at once.
  if (tagFill)
    tl.fromTo(
      tagFill,
      { clipPath: rtl ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'power2.out' },
      0.4
    );

  // Panel swipes up 780ms, then fire completion so the headline reveal can chain.
  tl.to(pl, {
    yPercent: -100,
    duration: 0.78,
    ease: 'power4.inOut',
    onStart: fireLoaderComplete,
  }, '+=0.15');

  tl.add(finish);
}
