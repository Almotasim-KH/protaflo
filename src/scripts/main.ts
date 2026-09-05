// Single motion entry. Every module lives in src/scripts/ and is imported here —
// never copy-pasted per page. Re-runs on each ClientRouter navigation.
import { gsap, ScrollTrigger } from './gsap-core';
import { initPreloader } from './preloader';
import { initHeadlineReveal } from './headline-reveal';
import { initHeroIntro } from './hero-intro';
import { initReveal } from './reveal';
import { initChapters } from './chapters';
import { initEvidence } from './evidence';
import { initCount } from './count';
import { initDraw } from './draw';
import { initPlates } from './plate';
import { initWorkToggle } from './work-toggle';
import { initParallax } from './parallax';
import { initScramble } from './scramble';
import { initTileDissolve } from './tileDissolve';
import { initGalleryIntro } from './gallery-intro';
import { initLightbox } from './lightbox';
import { initFooterGlow } from './footer-glow';
import { initFooterTint } from './footer-tint';
import { initSmoothScroll } from './smooth-scroll';
import { initPageTransition } from './page-transition';

// Disposer for the current tile-dissolve panels + triggers; called before each
// ClientRouter swap so overlays don't stack across navigations.
let disposeTiles: (() => void) | null = null;
// Lenis disposer — the ticker hook + listeners must go before a swap too.
let disposeScroll: (() => void) | null = null;
// Footer glow scroll listeners — detached before a swap like the rest.
let disposeFooter: (() => void) | null = null;
// Footer colour-spotlight pointer listeners — same lifecycle as the glow.
let disposeTint: (() => void) | null = null;
// The chaptered layer: folio, KPI plate, counters, self-drawing marks and the
// plate wipes. All four attach ScrollTriggers and the folio also holds a scroll
// listener, so each hands back its own disposer for the swap.
let disposeChapters: (() => void) | null = null;
let disposeEvidence: (() => void) | null = null;
let disposeCount: (() => void) | null = null;
let disposeDraw: (() => void) | null = null;
let disposePlates: (() => void) | null = null;

function boot(): void {
  // Smooth scroll first: it owns the ticker + feeds ScrollTrigger.update, so every
  // trigger created below is measured against the interpolated scroll position.
  disposeScroll?.();
  disposeScroll = initSmoothScroll();

  // order matters: preloader arms the latched loader:complete the reveals wait on
  initPreloader();
  initHeadlineReveal();
  initHeroIntro();
  initReveal();
  initScramble();
  initParallax();
  disposeChapters?.();
  disposeChapters = initChapters();
  disposeEvidence?.();
  disposeEvidence = initEvidence();
  disposeCount?.();
  disposeCount = initCount();
  disposeDraw?.();
  disposeDraw = initDraw();
  disposePlates?.();
  disposePlates = initPlates();
  // After initPlates: the collapsed plates already have their triggers built,
  // and opening the run refreshes them rather than creating any.
  initWorkToggle();
  disposeTiles?.();
  disposeTiles = initTileDissolve();
  // after initPageTransition: the gallery intro reads the arrival flag it sets
  initPageTransition();
  initGalleryIntro();
  initLightbox();
  disposeFooter?.();
  disposeFooter = initFooterGlow();
  disposeTint?.();
  disposeTint = initFooterTint();
  ScrollTrigger.refresh();
}

// Fresh full loads and ClientRouter swaps both route through astro:page-load.
document.addEventListener('astro:page-load', boot);

// Clean up ScrollTriggers before a client-side swap so they don't leak/duplicate.
document.addEventListener('astro:before-swap', () => {
  disposeTiles?.(); // remove tile panels + their triggers before the DOM swaps
  disposeTiles = null;
  disposeScroll?.(); // detach Lenis from the GSAP ticker before the DOM swaps
  disposeScroll = null;
  disposeFooter?.();
  disposeFooter = null;
  disposeTint?.();
  disposeTint = null;
  disposeChapters?.();
  disposeChapters = null;
  disposeEvidence?.();
  disposeEvidence = null;
  disposeCount?.();
  disposeCount = null;
  disposeDraw?.();
  disposeDraw = null;
  disposePlates?.();
  disposePlates = null;
  ScrollTrigger.getAll().forEach((t) => t.kill());
  gsap.killTweensOf('[data-shape]'); // stop the perpetual hero drift before the DOM swaps
});
