// Single source of GSAP + plugins. Registered once. No ScrollSmoother — native
// scroll only (ScrollSmoother transforms the content and breaks position:sticky).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Shared Web Animations easing — the page transition band uses it on both ends.
export const EASE = 'cubic-bezier(0.16,1,0.3,1)';

export const prefersReduced = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export { gsap, ScrollTrigger };

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
