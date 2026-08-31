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
let coarsePointer = false;

// Scroll weight. The page has one resting feel and one heavy feel, and the hero's
// tile dissolve switches to the heavy one while it is running (see tileDissolve.js):
// the squares are eating the hero, and the wheel should feel like it is dragging
// something apart rather than skating past it.
//
// Applied by writing Lenis' live option objects rather than by restarting it —
// a restart mid-scroll drops the in-flight interpolation and reads as a stutter.
// Two objects, not one, and this is the part that is easy to get wrong:
//
//   • `lenis.options.duration` is read every frame by the scroll animation, so
//     writing it there works.
//   • `wheelMultiplier` / `touchMultiplier` are NOT read from `lenis.options`.
//     Lenis hands a copy to its internal VirtualScroll at construction, and the
//     wheel handler reads that copy. Writing only `lenis.options.wheelMultiplier`
//     sets a value nothing ever looks at — measured: the page still moved 0.9× per
//     notch with the option reading 0.55. `virtualScroll` is not in Lenis' public
//     types, hence the cast below.
//
// A wheel notch moves less AND the tail takes longer to settle. Only doing the
// first makes the page feel unresponsive; only the second makes it feel floaty.
const REST = { wheel: 0.9, wheelDur: 1.05, touch: 1, touchDur: 0.6 };
const HEAVY = { wheel: 0.55, wheelDur: 1.5, touch: 0.7, touchDur: 0.85 };

const lerp = (a: number, b: number, k: number): number => a + (b - a) * k;

// k: 0 = resting, 1 = fully heavy. Ramped rather than switched, so entering and
// leaving the dissolve is a change in feel and not a bump.
const weight = { k: 0 };

// The input-scaling half of the options, on Lenis' internal VirtualScroll.
type VirtualScrollHost = {
  virtualScroll?: { options: { wheelMultiplier: number; touchMultiplier: number } };
};

function applyWeight(): void {
  if (!lenis) return;
  const wheel = lerp(REST.wheel, HEAVY.wheel, weight.k);
  // A thumb drag is near 1:1 by design (syncTouchLerp), so touch is weighted
  // more gently than the wheel — a heavy finger reads as a stuck screen.
  const touch = lerp(REST.touch, HEAVY.touch, weight.k);

  lenis.options.duration = coarsePointer
    ? lerp(REST.touchDur, HEAVY.touchDur, weight.k)
    : lerp(REST.wheelDur, HEAVY.wheelDur, weight.k);
  // Kept in sync so anything reading the public options sees the truth, even
  // though the wheel handler itself reads the VirtualScroll copy below.
  lenis.options.wheelMultiplier = wheel;
  lenis.options.touchMultiplier = touch;

  const vs = (lenis as unknown as VirtualScrollHost).virtualScroll;
  if (!vs) return; // internal shape changed — page keeps working, just unweighted
  vs.options.wheelMultiplier = wheel;
  vs.options.touchMultiplier = touch;
}

export function setScrollWeight(heavy: boolean): void {
  if (!lenis) return; // reduced motion: Lenis never started, nothing to weight
  gsap.to(weight, {
    k: heavy ? 1 : 0,
    duration: 0.4,
    ease: 'power2.out',
    overwrite: true,
    onUpdate: applyWeight,
  });
}

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
  coarsePointer = coarse;

  lenis?.destroy();
  // A fresh Lenis rests at normal weight, so the ramp has to reset with it —
  // otherwise a page swap mid-dissolve leaves the whole site heavy.
  weight.k = 0;

  lenis = new Lenis({
    // ~1.05s to settle on a wheel: heavy, still responsive. Higher = more float.
    // A thumb is a direct manipulation and wants a much shorter tail.
    // Both this and wheelMultiplier are re-written live by setScrollWeight.
    duration: coarse ? REST.touchDur : REST.wheelDur,
    easing: (t: number) => 1 - Math.pow(1 - t, 4), // expo-ish out, no overshoot
    wheelMultiplier: REST.wheel, // slightly slower than native = more "mass"
    smoothWheel: true,
    syncTouch: coarse,
    // Near 1:1 with the finger while the finger is down — the interpolation is
    // for what happens after it lifts, not for making the drag itself lag.
    syncTouchLerp: 0.09,
    // Was touchInertiaMultiplier, which is not a Lenis 1.3 option — it type-checked
    // as excess and was dropped on the floor, so touch had no weight control at
    // all. touchMultiplier is the real one, and setScrollWeight rides it.
    touchMultiplier: REST.touch,
  });

  // Dev-only handle. Scroll feel cannot be read off the DOM, so the only way to
  // check what the weight ramp is actually doing is to read Lenis' own numbers
  // from the console — which is how the wheelMultiplier split above was found.
  if (import.meta.env.DEV) (window as unknown as Record<string, unknown>).__lenis = lenis;

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
