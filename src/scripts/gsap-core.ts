// Single source of GSAP + plugins. Registered once. No ScrollSmoother — native
// scroll only (ScrollSmoother transforms the content and breaks position:sticky).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const EASE = 'cubic-bezier(0.16,1,0.3,1)';
export const EASE_GSAP = 'power4.out';

export const prefersReduced = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export { gsap, ScrollTrigger, SplitText };

// ---- Latched one-shot for loader completion ----
// Late subscribers still fire, so the once-per-session preloader can't be missed.
declare global {
  interface Window {
    __loaderDone?: boolean;
  }
}

export function onLoaderComplete(play: () => void): void {
  if (window.__loaderDone) {
    play();
    return;
  }
  window.addEventListener('loader:complete', play, { once: true });
}

export function fireLoaderComplete(): void {
  if (window.__loaderDone) return;
  window.__loaderDone = true;
  window.dispatchEvent(new Event('loader:complete'));
}
