// Case-study fold on the project detail page. The open/close motion is pure CSS
// (a 0fr → 1fr grid row, see ProjectDetail.astro); this only flips the state and
// tells ScrollTrigger the page got taller, since every trigger below the intro
// was measured against the folded height.
import { ScrollTrigger } from './gsap-core';

export function initCaseStudy(): void {
  const toggle = document.querySelector<HTMLButtonElement>('[data-case-toggle]');
  const panel = document.querySelector<HTMLElement>('[data-case-panel]');
  if (!toggle || !panel) return;

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    panel.classList.toggle('is-open', !open);
  });

  // One refresh per open/close, fired when the row finishes growing rather than
  // on every animation frame.
  panel.addEventListener('transitionend', (e) => {
    if ((e as TransitionEvent).propertyName === 'grid-template-rows') ScrollTrigger.refresh();
  });
}
