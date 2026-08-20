// Lenis smooth scroll — gives the page weight/inertia instead of the OS's 1:1
// wheel jump. Lenis animates window.scrollY itself (no content transform), so
// position:sticky, anchors and ScrollTrigger keep working.
//
// Wiring rules that matter:
//   • Lenis is driven off GSAP's ticker (not its own rAF) so scroll interpolation
//     and every scrub tween land in the SAME frame — otherwise parallax jitters.
//   • lagSmoothing(0): GSAP's default lag smoothing fakes a time jump after a
//     stalled frame, which desyncs the scrub.
//   • ScrollTrigger.update on every Lenis frame, since scroll position now moves
//     on frames where the browser fires no native scroll event.
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReduced } from './gsap-core';

let lenis: Lenis | null = null;

export function initSmoothScroll(): (() => void) | null {
  // Reduced motion: native scroll, no interpolation.
  if (prefersReduced()) return null;
  // Touch keeps native momentum — Lenis on touch feels laggy and fights the OS.
  if (window.matchMedia('(pointer: coarse)').matches) return null;

  lenis?.destroy();

  lenis = new Lenis({
    // ~1.05s to settle: heavy, still responsive. Higher = more float.
    duration: 1.05,
    easing: (t: number) => 1 - Math.pow(1 - t, 4), // expo-ish out, no overshoot
    wheelMultiplier: 0.9, // slightly slower than native = more "mass"
    smoothWheel: true,
    syncTouch: false,
  });

  const onScroll = (): void => ScrollTrigger.update();
  lenis.on('scroll', onScroll);

  const tick = (time: number): void => lenis?.raf(time * 1000); // GSAP ticker is seconds
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  // In-page anchors (#work, #about …) must route through Lenis or they teleport.
  const onClick = (e: MouseEvent): void => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    const id = a?.getAttribute('href');
    if (!a || !id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    lenis?.scrollTo(target as HTMLElement, { offset: 0 });
  };
  document.addEventListener('click', onClick);

  return () => {
    document.removeEventListener('click', onClick);
    gsap.ticker.remove(tick);
    gsap.ticker.lagSmoothing(500, 33); // restore GSAP default
    lenis?.destroy();
    lenis = null;
  };
}

// Freeze the page behind a full-screen overlay (the gallery lightbox). Lenis owns
// the scroll on pointer devices; the body class covers touch and reduced-motion,
// where Lenis never starts.
export function lockScroll(locked: boolean): void {
  document.documentElement.classList.toggle('is-scroll-locked', locked);
  if (locked) lenis?.stop();
  else lenis?.start();
}
