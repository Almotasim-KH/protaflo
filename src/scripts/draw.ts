// Marks that draw themselves.
//
// The method chapter's marks are hand-drawn strokes, so they arrive being drawn
// rather than appearing finished. Each path's real length is measured and written
// back as --len; the CSS animates stroke-dashoffset from that length to zero.
// Measuring is the whole point: a guessed dasharray either clips the tail or
// leaves the stroke sitting there half visible before it starts.
import { ScrollTrigger, prefersReduced } from './gsap-core';

export function initDraw(): () => void {
  const groups = Array.from(document.querySelectorAll<HTMLElement>('[data-draw]'));
  if (!groups.length) return () => {};

  if (prefersReduced()) {
    groups.forEach((g) => g.classList.add('is-drawn'));
    return () => {};
  }

  groups.forEach((g) => {
    g.querySelectorAll('path').forEach((p) => {
      const len = p.getTotalLength();
      p.style.setProperty('--len', String(Math.ceil(len)));
    });
  });

  const triggers: ScrollTrigger[] = [];
  // One trigger per list rather than one per mark: the five marks are a single
  // group and should run as one pass down the column.
  const lists = new Set(groups.map((g) => g.closest('[data-draw-group]') ?? g));
  lists.forEach((list) => {
    const marks = Array.from(list.querySelectorAll<HTMLElement>('[data-draw]'));
    triggers.push(
      ScrollTrigger.create({
        trigger: list,
        start: 'top 78%',
        once: true,
        onEnter: () =>
          marks.forEach((m, i) => {
            m.style.setProperty('--draw-delay', `${i * 0.14}s`);
            m.classList.add('is-drawn');
          }),
      })
    );
  });

  return () => triggers.forEach((t) => t.kill());
}
