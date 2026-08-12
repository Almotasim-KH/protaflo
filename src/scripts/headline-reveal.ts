// Section-title reveal — the same bar-wipe as the hero headline, but triggered on
// scroll instead of the loader. The animation itself is pure CSS (global.css);
// here we just add `.play` when each [data-headline] enters the viewport.
// (The hero H1 is [data-hero-title], driven separately by hero-intro.ts.)
import { ScrollTrigger, prefersReduced } from './gsap-core';

const play = (el: HTMLElement): void => el.classList.add('play');

export function initHeadlineReveal(): void {
  const heads = Array.from(document.querySelectorAll<HTMLElement>('[data-headline]'));
  if (!heads.length) return;

  if (prefersReduced()) {
    heads.forEach(play); // reduced-motion CSS collapses the animation to instant
    return;
  }

  heads.forEach((el) => {
    ScrollTrigger.create({ trigger: el, start: 'top 82%', once: true, onEnter: () => play(el) });
  });
}
