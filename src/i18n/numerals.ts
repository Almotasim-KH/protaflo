// Which digits a locale writes numbers with.
//
// Its own module because both sides of the site need it and they cannot share
// anything larger: ui.ts carries the whole copy tree and must never be pulled
// into a client bundle, while the counters and the gallery counter compose
// numbers in the browser and have to agree with the copy around them.
//
// Not `Intl.NumberFormat`. Chrome resolves a bare `ar` to the `latn` numbering
// system, so `new Intl.NumberFormat('ar').format(10)` returns "10" — measured,
// not assumed. Getting Arabic-Indic out of Intl means pinning a region or a
// `-u-nu-arab` extension, which is a second thing to keep in sync with this
// site's actual decision. The map below IS the decision.
export const numerals: Record<string, string> = {
  en: '0123456789',
  ar: '٠١٢٣٤٥٦٧٨٩',
};

/**
 * Rewrite the ASCII digits in a value into the locale's own numerals. Non-digit
 * characters are returned untouched, so "2023 - 2025", "~300" and "1 / 10" keep
 * their shape. An unknown locale is left alone rather than guessed at.
 */
export function num(value: string | number, lang: string): string {
  const digits = numerals[lang];
  if (!digits) return String(value);
  return String(value).replace(/[0-9]/g, (d) => digits[Number(d)]);
}
