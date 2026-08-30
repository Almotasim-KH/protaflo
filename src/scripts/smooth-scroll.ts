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
  // Touch runs the same interpolation, on its own numbers. Handing the phone raw
  // native scroll left it the one surface where the page had no weight at all:
  // the plate wipes and the band stamps still fire, but the travel between them
  // is 1:1 with the finger, which reads as a different site. syncTouch is what
  // lets Lenis own a touch drag instead of racing the OS's momentum; the shorter
  // duration keeps the settle from feeling like lag under a thumb.
  const coarse = window.matchMedia('(pointer: coarse)').matches;

  lenis?.destroy();

  lenis = new Lenis({
    // ~1.05s to settle on a wheel: heavy, still responsive. Higher = more float.
    // A thumb is a direct manipulation and wants a much shorter tail.
    duration: coarse ? 0.6 : 1.05,
    easing: (t: number) => 1 - Math.pow(1 - t, 4), // expo-ish out, no overshoot
    wheelMultiplier: 0.9, // slightly slower than native = more "mass"
    smoothWheel: true,
    syncTouch: coarse,
    // Near 1:1 with the finger while the finger is down — the interpolation is
    // for what happens after it lifts, not for making the drag itself lag.
    syncTouchLerp: 0.09,
    touchInertiaMultiplier: 22,
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
// the scroll wherever it is running; the body class is the fallback for
// reduced-motion, the one case where Lenis never starts.
export function lockScroll(locked: boolean): void {
  document.documentElement.classList.toggle('is-scroll-locked', locked);
  if (locked) lenis?.stop();
  else lenis?.start();
}
