// The catalogue run opens on its last two plates; this opens the rest.
//
// The markup ships expanded and is collapsed by CSS gated on `html.js`, so the
// server sends a complete list and only a browser that can reopen it ever hides
// anything. That means this module has one job — flip an attribute — and the
// no-JS path needs no code at all.
//
// The control sits ABOVE everything it opens, so the plates already on screen do
// not move when it is pressed and there is no scroll position to restore. What
// does have to happen is a ScrollTrigger refresh: four plates that measured zero
// while `display: none` need their real start/end, and plate.ts's own refresh
// listener re-measures the title sweeps in the same pass.
import { ScrollTrigger } from './gsap-core';

let ac: AbortController | null = null;

export function initWorkToggle(): void {
  ac?.abort();
  ac = new AbortController();

  const btn = document.querySelector<HTMLButtonElement>('[data-run-toggle]');
  const group = document.querySelector<HTMLElement>('[data-run-earlier]');
  if (!btn || !group) return;

  const more = btn.dataset.labelMore ?? '';
  const less = btn.dataset.labelLess ?? '';

  btn.addEventListener(
    'click',
    () => {
      const collapsed = group.hasAttribute('data-collapsed');
      if (collapsed) group.removeAttribute('data-collapsed');
      else group.setAttribute('data-collapsed', '');

      btn.setAttribute('aria-expanded', String(collapsed));
      btn.textContent = collapsed ? less : more;

      // The run's height just changed by four plates. Every trigger below it —
      // the plates themselves, the chapters that follow, the footer plate — is
      // measured against document position, so they all have to be re-read.
      ScrollTrigger.refresh();
    },
    { signal: ac.signal }
  );
}
