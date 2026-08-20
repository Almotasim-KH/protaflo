// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://almotasim-kh.com',
  output: 'static',
  // English keeps the bare paths it already had (no /en/ prefix, no redirects to
  // break existing links); Arabic lives under /ar/. Route files are explicit
  // rather than generated, so each locale can differ where it needs to.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', ar: 'ar' } } })],
  vite: {
    plugins: [tailwind()],
  },
});
