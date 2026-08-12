// B. Text scramble — the hero word "vision" churns through glyphs and resolves
// left→right, three passes, then locks for good. Width is pinned first so the
// sentence never reflows while the glyphs change.
import { prefersReduced, onLoaderComplete } from './gsap-core';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%$&/\\@*<>0123456789';
// Churning Latin capitals inside an Arabic sentence reads as a rendering bug, so
// an Arabic target churns through Arabic letters instead. Picked per element from
// the resolved word, not from the page locale — the word is what has to match.
const GLYPHS_AR = 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي٠١٢٣٤٥٦٧٨٩';
const isArabic = (s: string): boolean => /[؀-ۿ]/.test(s);
const START_MS = 260; // letter 0 locks at 260ms into a pass
const STEP_MS = 110; //  each further letter locks 110ms later
const PASSES = 3;
const REST_MS = 900; // pause between passes

const randGlyph = (set: string): string => set[(Math.random() * set.length) | 0];

function runPass(el: HTMLElement, chars: string[], set: string, done: () => void): void {
  const start = performance.now();
  const total = START_MS + chars.length * STEP_MS;

  const frame = (now: number): void => {
    const elapsed = now - start;
    let out = '';
    for (let n = 0; n < chars.length; n++) {
      if (chars[n] === ' ') out += ' ';
      else if (elapsed >= START_MS + n * STEP_MS) out += chars[n];
      else out += randGlyph(set);
    }
    el.textContent = out;
    if (elapsed < total) requestAnimationFrame(frame);
    else {
      el.textContent = chars.join('');
      done();
    }
  };
  requestAnimationFrame(frame);
}

function scramble(el: HTMLElement): void {
  const final = el.dataset.scramble || el.textContent || '';
  const chars = final.split('');
  const set = isArabic(final) ? GLYPHS_AR : GLYPHS;
  let pass = 0;

  const next = (): void => {
    if (pass >= PASSES) {
      el.textContent = final; // locked for good
      return;
    }
    pass++;
    runPass(el, chars, set, () => window.setTimeout(next, REST_MS));
  };
  next();
}

export function initScramble(): void {
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-scramble]'));
  if (!els.length) return;

  if (prefersReduced()) {
    els.forEach((el) => (el.textContent = el.dataset.scramble || el.textContent || ''));
    return;
  }

  els.forEach((el) => {
    // pin the measured width so churning glyphs can't reflow the line
    const lock = (): void => {
      el.style.minWidth = `${el.getBoundingClientRect().width}px`;
    };
    if (document.fonts?.ready) document.fonts.ready.then(lock);
    else lock();

    onLoaderComplete(() => window.setTimeout(() => scramble(el), 320));
  });
}
