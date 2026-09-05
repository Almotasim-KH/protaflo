// Chapter three's phone fold.
//
// The record ships open, so a reader without this bundle — or on a wide screen —
// sees every row. Below the phone breakpoint this closes it down to the two most
// recent rows and hands the rest to a toggle. The height itself is animated by
// CSS (a 0fr/1fr grid track); this module only owns the state, the labels, the
// a11y flags, and telling ScrollTrigger the page just got taller or shorter.
import { ScrollTrigger, prefersReduced } from './gsap-core';

const PHONE = '(max-width: 760px)';

export function initExperience(): () => void {
  const more = document.querySelector<HTMLElement>('[data-exp-more]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-exp-toggle]');
  const label = document.querySelector<HTMLElement>('[data-exp-label]');
  if (!more || !toggle || !label) return () => {};

  // The two labels are authored in the markup: the open one is printed, the shut
  // one rides on the button so the copy stays in i18n rather than in here.
  const openLabel = label.textContent ?? '';
  const shutLabel = toggle.dataset.expShut ?? openLabel;

  const mq = window.matchMedia(PHONE);
  let open = true;

  function setState(next: boolean, animate: boolean): void {
    open = next;
    if (!animate) more!.style.transition = 'none';
    more!.toggleAttribute('data-collapsed', !next);
    // Collapsed rows are clipped to nothing, so they leave the tab order and the
    // a11y tree with them.
    more!.toggleAttribute('inert', !next);
    more!.setAttribute('aria-hidden', String(!next));
    toggle!.setAttribute('aria-expanded', String(next));
    label!.textContent = next ? openLabel : shutLabel;
    if (!animate) {
      void more!.offsetHeight; // flush the no-transition state before restoring it
      more!.style.transition = '';
      ScrollTrigger.refresh();
    }
  }

  function release(): void {
    more!.removeAttribute('data-collapsed');
    more!.removeAttribute('inert');
    more!.removeAttribute('aria-hidden');
    toggle!.setAttribute('aria-expanded', 'true');
    label!.textContent = openLabel;
    open = true;
  }

  function applyWidth(): void {
    if (mq.matches) {
      toggle!.hidden = false;
      setState(false, false);
    } else {
      // Wide again: the fold has no meaning here, so every row goes back on view.
      toggle!.hidden = true;
      release();
      ScrollTrigger.refresh();
    }
  }

  const onClick = (): void => setState(!open, !prefersReduced());
  // The page is taller or shorter than it was; every trigger below chapter three
  // has to be re-measured once the fold has finished moving.
  const onEnd = (e: TransitionEvent): void => {
    if (e.target === more && e.propertyName === 'grid-template-rows') ScrollTrigger.refresh();
  };

  toggle.addEventListener('click', onClick);
  more.addEventListener('transitionend', onEnd);
  mq.addEventListener('change', applyWidth);
  applyWidth();

  return () => {
    toggle.removeEventListener('click', onClick);
    more.removeEventListener('transitionend', onEnd);
    mq.removeEventListener('change', applyWidth);
  };
}
