// Work plates: the media wipes open from its bottom edge as the plate arrives.
//
// A wipe rather than a fade because the beat is a plate being uncovered, and
// because it runs the full width of its column, which is what keeps it reading
// as a transition instead of a fidget. clip-path sits on the media wrapper, not
// on the image, so nothing about the image's own box is involved.
//
// The record rail rides along here too: chapter three's year column marks
// whichever year the reader is level with, so the dates behave like a rail being
// walked past rather than a static table.
import { ScrollTrigger, prefersReduced } from './gsap-core';

export function initPlates(): () => void {
  const triggers: ScrollTrigger[] = [];

  const medias = Array.from(document.querySelectorAll<HTMLElement>('.plate-media'));
  if (prefersReduced()) {
    medias.forEach((m) => m.classList.add('is-open'));
  } else {
    medias.forEach((m) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: m,
          start: 'top 84%',
          once: true,
          onEnter: () => m.classList.add('is-open'),
        })
      );
    });
  }

  // Year rail. Each row owns the year cell with the same index; the cell lights
  // while its row is the one crossing the middle of the screen.
  const rail = document.querySelector<HTMLElement>('[data-record-years]');
  const rows = Array.from(document.querySelectorAll<HTMLElement>('[data-record-row]'));
  if (rail && rows.length) {
    const cells = Array.from(rail.querySelectorAll<HTMLElement>('span'));
    const mark = (i: number): void => cells.forEach((c, j) => c.classList.toggle('is-here', i === j));
    rows.forEach((row, i) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: row,
          start: 'top 62%',
          end: 'bottom 62%',
          onEnter: () => mark(i),
          onEnterBack: () => mark(i),
        })
      );
    });
  }

  return () => triggers.forEach((t) => t.kill());
}
