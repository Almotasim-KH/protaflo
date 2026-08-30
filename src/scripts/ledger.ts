// The evidence band.
//
// The one interaction that exists only on this site: every verified figure the
// reader passes stamps itself into a band at the foot of the window, with the
// project it came from. It counts what they have walked past, and at the
// evidence plate it hands the whole record over to the plate and drops away.
//
// The honesty constraint is structural, not editorial: a line can only be
// stamped if a release point in the page carries its id, and the release points
// sit on the sections that state the figure. No figure in the content, no line
// in the rail.
//
// The rail is aria-hidden. It duplicates content that the evidence plate
// presents in full and in reading order, and announcing six live stamps mid-read
// would be noise, not information.
import { ScrollTrigger, prefersReduced } from './gsap-core';

export function initLedger(): () => void {
  const rail = document.querySelector<HTMLElement>('[data-ledger]');
  if (!rail) return () => {};

  const lines = new Map<string, HTMLElement>();
  rail.querySelectorAll<HTMLElement>('[data-ledger-line]').forEach((el) => {
    const id = el.dataset.ledgerLine;
    if (!id) return;
    lines.set(id, el);
  });
  const countEl = rail.querySelector<HTMLElement>('[data-ledger-count]');
  const total = lines.size;
  // Arrival order, not list order. The band shows the figure the reader just
  // met, and that is not the order the figures are written down in: Camp
  // Operations sits above Revenue Analysis on the page, so its figure is stamped
  // first. Tracking the sequence is what makes "newest" mean newest.
  const seq: string[] = [];

  const render = (): void => {
    if (countEl) {
      const tpl = countEl.dataset.ledgerCount ?? '{n} / {total}';
      countEl.textContent = tpl.replace('{n}', String(seq.length)).replace('{total}', String(total));
    }
    const newestId = seq[seq.length - 1];
    seq.forEach((id) => {
      const el = lines.get(id);
      if (!el) return;
      // Everything but the newest steps back, so the band always holds one figure
      // rather than six competing for a single row.
      el.classList.toggle('is-past', id !== newestId);
    });
  };

  const stamp = (id: string): void => {
    const el = lines.get(id);
    if (!el || seq.includes(id)) return;
    seq.push(id);
    el.classList.add('is-stamped');
    rail.classList.add('is-on');
    render();
  };

  const triggers: ScrollTrigger[] = [];

  // Release points. One element per figure-bearing section; the ids it releases
  // are listed in data-stamp, space separated.
  document.querySelectorAll<HTMLElement>('[data-stamp]').forEach((el) => {
    const ids = (el.dataset.stamp ?? '').split(/\s+/).filter(Boolean);
    if (!ids.length) return;
    triggers.push(
      ScrollTrigger.create({
        trigger: el,
        start: 'top 72%',
        once: true,
        // Staggered so a section releasing three figures reads as three separate
        // stamps rather than one block arriving.
        onEnter: () => ids.forEach((id, i) => window.setTimeout(() => stamp(id), i * 260)),
      })
    );
  });

  // The handoff. When the evidence plate arrives the rail lets go: it fades out
  // and the plate's cells land one after another, from the side the rail sat on.
  const plate = document.querySelector<HTMLElement>('[data-evidence]');
  if (plate) {
    const cells = Array.from(plate.querySelectorAll<HTMLElement>('.evidence-item'));
    const land = (): void => {
      rail.classList.add('is-handoff');
      rail.classList.remove('is-on');
      const step = prefersReduced() ? 0 : 90;
      cells.forEach((cell, i) => window.setTimeout(() => cell.classList.add('is-landed'), i * step));
    };
    triggers.push(
      ScrollTrigger.create({
        trigger: plate,
        start: 'top 68%',
        once: true,
        onEnter: land,
      })
    );
    // Scrolling back above the plate hands the rail its lines again, so the page
    // is not permanently missing its margin after one pass.
    triggers.push(
      ScrollTrigger.create({
        trigger: plate,
        start: 'top bottom',
        onLeaveBack: () => {
          rail.classList.remove('is-handoff');
          if (seq.length) rail.classList.add('is-on');
        },
      })
    );
  }

  return () => triggers.forEach((t) => t.kill());
}
