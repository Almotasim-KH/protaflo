// Count-up for real figures.
//
// Every number this runs on comes out of a project file in src/content — the
// element carries the final text in its markup, so the page reads correctly with
// no JS and the counter only ever animates toward a value that was already true.
import { gsap, ScrollTrigger, prefersReduced } from './gsap-core';

export function initCount(): () => void {
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));
  if (!els.length || prefersReduced()) return () => {};

  const triggers: ScrollTrigger[] = [];
  els.forEach((el) => {
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target)) return;
    // The rendered text is the truth; the counter borrows the element for a
    // second and puts it back exactly as it found it.
    const final = el.textContent ?? '';
    // Only the digits are animated: "4th of 44" counts its 44 and keeps its
    // wording, so nothing has to be reassembled from parts.
    const digits = final.match(/[\d٠-٩]+(?=[^\d٠-٩]*$)/);
    if (!digits) return;
    const head = final.slice(0, digits.index);
    const tail = final.slice((digits.index ?? 0) + digits[0].length);
    const state = { v: 0 };
    triggers.push(
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () =>
          gsap.to(state, {
            v: target,
            duration: 1.1,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = `${head}${Math.round(state.v).toLocaleString(
                document.documentElement.lang || 'en'
              )}${tail}`;
            },
            onComplete: () => {
              el.textContent = final;
            },
          }),
      })
    );
  });

  return () => triggers.forEach((t) => t.kill());
}
