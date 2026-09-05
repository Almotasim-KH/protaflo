// Every off-site address the site prints, in one place.
//
// The contact address used to be written out inside Contact.astro and again
// inside Footer.astro, and a third, older address survived on half the pages
// long after the other half had moved on. An address that lives in page content
// drifts; an address that lives here cannot. Nothing outside this file may
// hard-code one.
export const site = {
  email: 'Asomy1630@gmail.com',
  linkedin: 'https://www.linkedin.com/in/almotasim-khairullah-73ab52166/',
  github: 'https://github.com/Almotasim-KH',
  /** Served from /public. English-only, which the Arabic build says out loud. */
  cv: '/cv.pdf',
  cvLang: 'en',
} as const;
