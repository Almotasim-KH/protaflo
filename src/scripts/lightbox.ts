// Full-screen viewer for the project gallery. Click any shot and it fills the
// page; arrows (buttons, keyboard, swipe) step through the rest of that
// project's shots and wrap at both ends.
//
// The overlay markup lives in ProjectDetail.astro — this module only wires it to
// the tiles, since the tiles are the source of truth for order, source and alt.
import { prefersReduced } from './gsap-core';
import { lockScroll } from './smooth-scroll';

// Document-level listeners must not survive a ClientRouter swap — each boot
// aborts the previous page's set.
let ac: AbortController | null = null;

// The gallery <img> is responsive (astro:assets srcset); on a full-page canvas we
// always want the biggest candidate rather than whatever the tile-sized `sizes`
// hint resolved to.
function largestSrc(img: HTMLImageElement): string {
  const best = (img.srcset || '')
    .split(',')
    .map((part) => {
      const [url, w] = part.trim().split(/\s+/);
      return { url, w: parseInt(w ?? '0', 10) || 0 };
    })
    .filter((c) => c.url)
    .sort((a, b) => b.w - a.w)[0];
  return best?.url ?? img.currentSrc ?? img.src;
}

export function initLightbox(): void {
  ac?.abort();
  ac = new AbortController();
  const signal = ac.signal;

  const root = document.querySelector<HTMLElement>('[data-lightbox]');
  if (!root) return;

  const shots = Array.from(document.querySelectorAll<HTMLImageElement>('[data-zoom] img'));
  if (!shots.length) return;

  const view = root.querySelector<HTMLImageElement>('[data-lightbox-img]')!;
  const count = root.querySelector<HTMLElement>('[data-lightbox-count]');
  const nav = root.querySelectorAll<HTMLButtonElement>('[data-lightbox-step]');
  // A single shot needs no stepping — hide the arrows and the counter.
  const many = shots.length > 1;
  if (!many) {
    nav.forEach((b) => (b.hidden = true));
    if (count) count.hidden = true;
  }

  let index = 0;
  let opener: HTMLElement | null = null;

  function render(): void {
    const img = shots[index];
    view.src = largestSrc(img);
    view.alt = img.alt;
    if (count) count.textContent = `${index + 1} / ${shots.length}`;
  }

  function step(delta: number): void {
    // wrap: past the last shot lands on the first, and vice versa
    index = (index + delta + shots.length) % shots.length;
    render();
  }

  function open(i: number, from: HTMLElement): void {
    index = i;
    opener = from;
    render();
    root!.hidden = false;
    // Two frames of "open": hidden=false paints the node, the class runs the fade.
    requestAnimationFrame(() => root!.classList.add('is-open'));
    lockScroll(true);
    root!.querySelector<HTMLButtonElement>('[data-lightbox-close]')?.focus();
  }

  function close(): void {
    root!.classList.remove('is-open');
    lockScroll(false);
    const done = (): void => {
      root!.hidden = true;
      view.removeAttribute('src');
    };
    if (prefersReduced()) done();
    else setTimeout(done, 220); // matches the overlay's fade-out
    // Send focus back to the tile the reader came from.
    opener?.focus();
    opener = null;
  }

  shots.forEach((img, i) => {
    const tile = img.closest<HTMLElement>('[data-zoom]');
    if (!tile) return;
    tile.addEventListener('click', () => open(i, tile), { signal });
    tile.addEventListener(
      'keydown',
      (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(i, tile);
        }
      },
      { signal },
    );
  });

  nav.forEach((btn) =>
    btn.addEventListener('click', () => step(Number(btn.dataset.lightboxStep)), { signal }),
  );
  root
    .querySelector<HTMLButtonElement>('[data-lightbox-close]')
    ?.addEventListener('click', close, { signal });
  // Clicking the backdrop (anything that isn't a control or the picture) closes.
  root.addEventListener(
    'click',
    (e) => {
      if (e.target === root || (e.target as HTMLElement).dataset.lightboxBackdrop !== undefined) {
        close();
      }
    },
    { signal },
  );

  // Tab has to stay inside the overlay while it is open. Without this the third
  // Tab walks out of the viewer and into the page behind it, which is still
  // scrolled to wherever the reader was and is visually covered — so focus goes
  // somewhere the reader cannot see and Escape no longer reads as the way out.
  function trapTab(e: KeyboardEvent): void {
    const stops = Array.from(root!.querySelectorAll<HTMLElement>('button:not([hidden])')).filter(
      (el) => el.offsetParent !== null,
    );
    if (!stops.length) return;
    const first = stops[0];
    const last = stops[stops.length - 1];
    const active = document.activeElement as HTMLElement | null;
    if (e.shiftKey && (active === first || !root!.contains(active))) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && (active === last || !root!.contains(active))) {
      e.preventDefault();
      first.focus();
    }
  }

  document.addEventListener(
    'keydown',
    (e) => {
      if (root.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'Tab') trapTab(e);
      else if (many && e.key === 'ArrowRight') step(1);
      else if (many && e.key === 'ArrowLeft') step(-1);
    },
    { signal },
  );

  // Touch: horizontal swipe steps, matching the arrow directions.
  let startX = 0;
  root.addEventListener('touchstart', (e) => (startX = e.changedTouches[0].clientX), {
    passive: true,
    signal,
  });
  root.addEventListener(
    'touchend',
    (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (many && Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    },
    { passive: true, signal },
  );
}
