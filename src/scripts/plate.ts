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
import { gsap, ScrollTrigger, prefersReduced } from './gsap-core';

// The run: each plate's label column rides the top of the screen for the length
// of that plate, and the outlined title fills while it does.
//
// Nothing is pinned. Every plate keeps its own place in the document, so plate
// two sits under plate one and arrives by being scrolled to, exactly as it
// would on a page with no script at all. What travels is the label column, and
// it travels by position:sticky, declared in global.css. A pin would have frozen
// the whole plate and made the next one climb the screen underneath it, which
// reads as the next project rising to meet you rather than as you reaching it.
//
// ONE trigger per plate and no scroll listener. Its progress is the label's own
// stick: 0 the moment the label reaches the top, 1 the moment the plate runs out
// from under it and the label lets go. That is the same window the reader sees,
// so the fill and the label's travel are the same fact and cannot disagree.
//
// The fill effect itself is untouched — the masked solid copy in global.css,
// driven by --plate-fill. Only the source of that number is here.

// Where the label comes to rest. Not the top of the viewport: the folio is fixed
// across the first 59px of it, and a label resting flush had its catalogue
// number sliced by the folio's own hairline. Must match --plate-stick in
// global.css, which is what actually holds the column there.
const STICK_TOP = 76;

function initTitleFill(mm: gsap.MatchMedia): void {
  const run = document.querySelector<HTMLElement>('[data-run]');
  if (!run) return;

  const plates = Array.from(run.querySelectorAll<HTMLElement>('.plate'));
  if (!plates.length) return;

  // Reduced motion builds nothing: --plate-fill is never written and the
  // stylesheet's own state holds, every title solid.
  if (prefersReduced()) return;

  const fill = (el: HTMLElement, v: number): void =>
    el.style.setProperty('--plate-fill', v.toFixed(3));

  // The sweep is measured across the title's widest LINE, not across its box.
  // A title that wraps takes the full width of the column it wraps in, so the
  // box is wider than any line in it and a mask spanning the box finishes early:
  // "Camp Operations Dashboard" wraps at 231px inside a 355px column and stood
  // solid for the last third of its plate. A Range over the link reports one
  // rect per line box, and the widest of those is the distance the edge actually
  // has to travel.
  const measure = (plate: HTMLElement): void => {
    const title = plate.querySelector<HTMLElement>('.plate-title');
    const link = title?.querySelector('a');
    if (!title || !link) return;
    const range = document.createRange();
    range.selectNodeContents(link);
    let widest = 0;
    for (const rect of range.getClientRects()) widest = Math.max(widest, rect.width);
    range.detach();
    if (widest) title.style.setProperty('--title-w', `${Math.ceil(widest)}px`);
  };

  // Two branches, one idea. A title is hollow until the reader reaches it and
  // solid once they have, and what differs by width is only which movement
  // states that: the desktop has a pinned label travelling against its own
  // plate, and a phone has the title's own approach up the screen. Same 860px
  // breakpoint the grid collapses at; gsap.matchMedia re-evaluates it on resize
  // and reverts on the way out.
  mm.add('(min-width: 861px)', () => {
    // Re-measured on every refresh, which is what ScrollTrigger fires on resize
    // and what the font loader's own refresh below routes through. Measuring
    // once at boot would bake in the fallback font's metrics.
    const remeasure = (): void => plates.forEach(measure);
    remeasure();
    ScrollTrigger.addEventListener('refresh', remeasure);
    // Poppins and IBM Plex Sans Arabic swap in after first paint and both are
    // wider than the system fallback, so the first measurement is wrong until
    // they land.
    void document.fonts.ready.then(() => ScrollTrigger.refresh());

    const runs = plates.map((plate) => {
      const label = plate.querySelector<HTMLElement>('.plate-label');
      let last = -1;
      return ScrollTrigger.create({
        trigger: plate,
        // The label starts sticking here.
        start: `top ${STICK_TOP}px`,
        // And stops when the plate's bottom catches the label's bottom, which is
        // the exact frame the column lets go. Measured in a function so a resize
        // or a font swap re-reads the height instead of holding a stale one.
        end: () => `bottom ${STICK_TOP + (label?.offsetHeight ?? 0)}px`,
        onUpdate: (self) => {
          // 0 as the label lands, 1 as it releases. Scrolling back runs the same
          // number down again, which is why unfilling needs no case of its own.
          const p = self.progress;
          if (Math.abs(p - last) < 0.002) return; // ~500 steps per plate
          last = p;
          fill(plate, p);
        },
        // The ends are clamped rather than left wherever the last frame landed:
        // a plate the reader has passed is finished, one not yet reached is
        // untouched.
        onLeave: () => fill(plate, 1),
        onLeaveBack: () => fill(plate, 0),
      });
    });

    return () => {
      ScrollTrigger.removeEventListener('refresh', remeasure);
      runs.forEach((t) => t.kill());
      plates.forEach((p) => {
        p.style.removeProperty('--plate-fill');
        p.querySelector<HTMLElement>('.plate-title')?.style.removeProperty('--title-w');
      });
    };
  });

  // The phone. The label does not stick here (one column, nothing to travel
  // against), so the run is the span between the title arriving from the bottom
  // of the screen and reaching the reading line. Leaving this branch out was
  // what made the work section the one place the phone looked like a different,
  // plainer site: six solid titles where the desktop fills each one by hand.
  mm.add('(max-width: 860px)', () => {
    const remeasure = (): void => plates.forEach(measure);
    remeasure();
    ScrollTrigger.addEventListener('refresh', remeasure);
    void document.fonts.ready.then(() => ScrollTrigger.refresh());

    const runs = plates.map((plate) => {
      // The title, not the plate: on a phone the plate is most of a screen tall
      // and its progress would still be filling long after the words had been
      // read past.
      const title = plate.querySelector<HTMLElement>('.plate-title') ?? plate;
      let last = -1;
      return ScrollTrigger.create({
        trigger: title,
        start: 'top 88%',
        end: 'top 42%',
        onUpdate: (self) => {
          const p = self.progress;
          if (Math.abs(p - last) < 0.004) return;
          last = p;
          fill(plate, p);
        },
        onLeave: () => fill(plate, 1),
        onLeaveBack: () => fill(plate, 0),
      });
    });

    return () => {
      ScrollTrigger.removeEventListener('refresh', remeasure);
      runs.forEach((t) => t.kill());
      plates.forEach((p) => {
        p.style.removeProperty('--plate-fill');
        p.querySelector<HTMLElement>('.plate-title')?.style.removeProperty('--title-w');
      });
    };
  });
}

export function initPlates(): () => void {
  const triggers: ScrollTrigger[] = [];
  // The plate runs live in a matchMedia context so the breakpoint reverts them
  // cleanly; everything else below is width-independent and stays plain.
  const mm = gsap.matchMedia();
  initTitleFill(mm);

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

  return () => {
    mm.revert();
    triggers.forEach((t) => t.kill());
  };
}
