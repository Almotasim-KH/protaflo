// Work-grid filters. Real <button>s, keyboard-reachable, aria-pressed reflects
// state. Filtering fades cards out/in and hides non-matches from a11y tree.
import { gsap, prefersReduced } from './gsap-core';

export function initFilters(): void {
  const root = document.querySelector<HTMLElement>('[data-filters]');
  const grid = document.querySelector<HTMLElement>('[data-work-grid]');
  if (!root || !grid) return;

  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-cat]'));

  const apply = (value: string): void => {
    buttons.forEach((b) => {
      const on = b.dataset.filter === value;
      b.setAttribute('aria-pressed', String(on));
      b.classList.toggle('is-on', on);
    });

    cards.forEach((card) => {
      const match = card.dataset.cat === value;
      if (match) {
        card.hidden = false;
        card.removeAttribute('aria-hidden');
        if (!prefersReduced()) {
          gsap.fromTo(
            card,
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out' }
          );
        }
      } else {
        card.hidden = true;
        card.setAttribute('aria-hidden', 'true');
      }
    });
  };

  // A detail page's back link arrives as /?work=<category>#work so the grid
  // reopens on the discipline the visitor was browsing. Unknown or absent value
  // falls back to the default pill.
  const wanted = new URLSearchParams(window.location.search).get('work');
  const fromUrl = wanted ? buttons.find((b) => b.dataset.filter === wanted) : undefined;
  const initial = fromUrl ?? buttons.find((b) => b.classList.contains('is-on')) ?? buttons[0];
  if (!initial) return;

  // Drop the param once it's been consumed — it's a hand-off, not page state,
  // and leaving it in makes a shared or reloaded URL look filter-locked.
  if (wanted) {
    const url = new URL(window.location.href);
    url.searchParams.delete('work');
    history.replaceState(history.state, '', `${url.pathname}${url.search}${url.hash}`);
  }

  buttons.forEach((b) =>
    b.addEventListener('click', () => apply(b.dataset.filter ?? initial.dataset.filter ?? ''))
  );

  // No "all" pill exists, so the markup ships every card and JS narrows to the
  // default on boot — non-JS visitors still get the full grid.
  apply(initial.dataset.filter ?? '');
}
