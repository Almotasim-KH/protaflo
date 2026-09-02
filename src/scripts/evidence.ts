// The KPI plate's arrival.
//
// The cards are laid out as an overlapping stack (see `.evidence-stack` in
// global.css) and start invisible, so something has to land them. They arrive
// one after another rather than together: six cards fading in as a block reads
// as a page loading, and one card at a time reads as a set being laid down.
import { ScrollTrigger, prefersReduced } from './gsap-core';

export function initEvidence(): () => void {
  const plate = document.querySelector<HTMLElement>('[data-evidence]');
  if (!plate) return () => {};

  const cards = Array.from(plate.querySelectorAll<HTMLElement>('.evidence-item'));
  if (!cards.length) return () => {};

  const trigger = ScrollTrigger.create({
    trigger: plate,
    start: 'top 68%',
    once: true,
    onEnter: () => {
      // Reduced motion still gets the cards, just all at once: the stagger is
      // the motion, and there is nothing to read in it that the cards do not
      // already say.
      const step = prefersReduced() ? 0 : 90;
      cards.forEach((card, i) => window.setTimeout(() => card.classList.add('is-landed'), i * step));
    },
  });

  return () => trigger.kill();
}
