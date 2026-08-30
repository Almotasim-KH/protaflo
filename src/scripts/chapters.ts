// The folio — the running head of a printed feature.
//
// Three jobs, all driven off the sections themselves so the markup stays the
// single source of truth:
//   1. report which chapter the reader is currently inside,
//   2. flip the folio's ink when the ground under it changes (the page hard-cuts
//      between the cream canvas and the dark plate, and one ink cannot serve both),
//   3. draw the page-progress hairline along the very top edge.
//
// Every section that wants a folio entry carries data-chapter-num / data-chapter-title,
// and every section declares its ground with data-ground="light" | "dark".
import { gsap, ScrollTrigger, prefersReduced } from './gsap-core';

const INK_LIGHT = '#0e0e0e';
const INK_DARK = '#f4f1ea';
const GROUND_LIGHT = '#f7f3ea';
const GROUND_DARK = '#141312';

export function initChapters(): () => void {
  const folio = document.querySelector<HTMLElement>('[data-folio]');
  const here = document.querySelector<HTMLElement>('[data-folio-here]');
  const num = document.querySelector<HTMLElement>('[data-folio-num]');
  const title = document.querySelector<HTMLElement>('[data-folio-title]');
  const rule = document.querySelector<HTMLElement>('[data-folio-rule]');
  const ledger = document.querySelector<HTMLElement>('[data-ledger]');
  if (!folio) return () => {};

  // Ground detection samples the section sitting behind each fixed element, at
  // that element's own height. One probe is not enough: the folio rides the top
  // margin and the ledger sits at the bottom of the same viewport, so on any
  // frame that straddles a chapter cut the two are over different colours. A
  // single reading paints one of them in the other one's ink, which on this page
  // means a rail rendered dark on the dark plate.
  const grounds = Array.from(document.querySelectorAll<HTMLElement>('[data-ground]'));

  const darkAt = (y: number): boolean => {
    let dark = false;
    for (const el of grounds) {
      const r = el.getBoundingClientRect();
      if (r.top <= y && r.bottom > y) dark = el.dataset.ground === 'dark';
    }
    return dark;
  };

  const readGround = (): void => {
    const dark = darkAt(22);
    folio.style.setProperty('--folio-ink', dark ? INK_DARK : INK_LIGHT);
    folio.style.setProperty('--folio-ground', dark ? GROUND_DARK : GROUND_LIGHT);
    // Sampled just above the rail's own baseline, where its lowest line sits.
    ledger?.classList.toggle('on-dark', darkAt(window.innerHeight - 30));
    // The rule only appears once the reader has left the title plate, so the
    // first screen stays a title page rather than a page with chrome on it.
    folio.classList.toggle('is-ruled', window.scrollY > window.innerHeight * 0.6);
  };

  // Chapter readout. `once: false` on purpose — scrolling back up has to walk
  // the numbers back down, or the folio lies about where the reader is.
  const marks = Array.from(document.querySelectorAll<HTMLElement>('[data-chapter-num]'));
  const setHere = (el: HTMLElement | null): void => {
    if (!here || !num || !title) return;
    if (!el) {
      here.classList.remove('is-on');
      return;
    }
    num.textContent = el.dataset.chapterNum ?? '';
    title.textContent = el.dataset.chapterTitle ?? '';
    here.classList.add('is-on');
  };

  const triggers: ScrollTrigger[] = [];
  marks.forEach((el, i) => {
    triggers.push(
      ScrollTrigger.create({
        trigger: el,
        start: 'top 12%',
        end: 'bottom 12%',
        onEnter: () => setHere(el),
        onEnterBack: () => setHere(el),
        // Leaving the first chapter upward puts the reader back on the title
        // plate, where the folio carries no position.
        onLeaveBack: () => setHere(i === 0 ? null : marks[i - 1]),
      })
    );
  });

  // Progress hairline. Scaled, never width-animated.
  if (rule && !prefersReduced()) {
    gsap.set(rule, { scaleX: 0 });
    triggers.push(
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => gsap.set(rule, { scaleX: self.progress }),
      })
    );
  } else if (rule) {
    rule.style.display = 'none';
  }

  readGround();
  window.addEventListener('scroll', readGround, { passive: true });
  window.addEventListener('resize', readGround);

  return () => {
    window.removeEventListener('scroll', readGround);
    window.removeEventListener('resize', readGround);
    triggers.forEach((t) => t.kill());
  };
}
