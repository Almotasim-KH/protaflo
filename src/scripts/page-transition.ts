// Module 4 — Page transition into a project.
// Click a project card → a cream band covers the screen carrying the project's
// name under a yellow highlighter stroke (~700ms cover). On arrival at the detail
// page the band slides off (~780ms reveal). Returning to the index has NO
// transition (only [data-project-link] arms it). Reduced-motion navigates plainly.
import { prefersReduced } from './gsap-core';

const WIPE_KEY = 'hl-wipe';
const NAME_KEY = 'hl-name';
const EASE = 'cubic-bezier(0.16,1,0.3,1)';

// Read live rather than cached: the band is built on both the index and the
// detail page, and the two can be in different languages within one session.
const rtl = (): boolean => document.documentElement.dir === 'rtl';

function bandMarkup(name: string): HTMLElement {
  const band = document.createElement('div');
  band.setAttribute('data-wipe', '');
  band.style.cssText =
    'position:fixed;inset:0;z-index:999;background:var(--color-canvas,#F7F3EA);' +
    'pointer-events:none;display:flex;align-items:center;justify-content:center';
  if (name) {
    band.innerHTML =
      '<div style="font-family:inherit;font-size:clamp(38px,5vw,72px);font-weight:700;' +
      'letter-spacing:-0.02em;color:var(--color-ink,#0E0E0E);position:relative;padding:0 12px">' +
      '<span style="position:absolute;inset:12% -4px;background:var(--color-accent,#E8F544);' +
      'transform:skew(-6deg) rotate(-1deg)"></span>' +
      '<span style="position:relative">' +
      name +
      '</span></div>';
  }
  return band;
}

// Phase A — arriving at a page that was navigated to from a card click.
function playArrival(): void {
  let armed = false;
  let name = '';
  try {
    armed = sessionStorage.getItem(WIPE_KEY) === '1';
    sessionStorage.removeItem(WIPE_KEY);
    name = sessionStorage.getItem(NAME_KEY) ?? '';
    sessionStorage.removeItem(NAME_KEY);
  } catch {
    /* ignore */
  }
  const drop = (): void => document.documentElement.removeAttribute('data-arriving');
  // Let the gallery intro know whether a band is about to sweep over it, so its
  // welcome waits instead of playing underneath the cover.
  window.__wipeArrival = armed && !prefersReduced();
  if (!armed || prefersReduced()) {
    drop();
    return;
  }

  const band = bandMarkup(name);
  document.body.appendChild(band);
  const reveal = band.animate(
    // The band clears in the reading direction; on RTL pages that is the mirror.
    rtl()
      ? [{ clipPath: 'inset(0 0 0 0)' }, { clipPath: 'inset(0 100% 0 0)' }]
      : [{ clipPath: 'inset(0 0 0 0)' }, { clipPath: 'inset(0 0 0 100%)' }],
    { duration: 780, delay: 140, easing: EASE, fill: 'forwards' }
  );
  // hand off from the first-paint cover to the band without a bare frame
  reveal.ready.then(drop).catch(drop);
  reveal.finished.then(() => band.remove()).catch(() => band.remove());
  window.setTimeout(() => {
    band.remove();
    drop();
  }, 1300);
}

// Phase B — leaving the index via a project card.
function armDepartures(): void {
  const links = document.querySelectorAll<HTMLAnchorElement>('[data-project-link]');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const name = link.dataset.projectName ?? '';
      try {
        sessionStorage.setItem(WIPE_KEY, '1');
        sessionStorage.setItem(NAME_KEY, name);
      } catch {
        /* ignore */
      }
      if (prefersReduced()) return; // plain navigation

      e.preventDefault();
      const band = bandMarkup(name);
      document.body.appendChild(band);
      const cover = band.animate(
        rtl()
          ? [{ clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0)' }]
          : [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }],
        { duration: 700, easing: EASE, fill: 'forwards' }
      );
      cover.finished
        .then(() => {
          window.location.href = href;
        })
        .catch(() => {
          window.location.href = href;
        });
    });
  });
}

export function initPageTransition(): void {
  playArrival();
  armDepartures();
}
