import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Projects live as Markdown in src/content/projects/. Adding one needs no code.
// Image fields are optional: until a real asset is dropped in, components render
// a neutral placeholder tile (mirrors the design's image-slot). The moment an
// image path is set, astro:assets <Image/> takes over with responsive srcsets.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      role: z.string(),
      year: z.union([z.number(), z.string()]),
      category: z.enum(['developing', 'analysis']),
      // two short labels shown on the work card (e.g. Product, UX/UI)
      tags: z.array(z.string()).min(1),
      summary: z.string(),
      // ordering in the grid — lower first
      order: z.number().default(100),
      cover: image().optional(),

      // detail page
      // Two kinds of work only — a paid engagement or something I built for
      // myself. Free text here used to produce odd rail values ("Client:
      // Personal project"), so the label and both values now live in i18n.
      client: z.enum(['client', 'personal']),
      headline: z.string(),
      body: z.array(z.string()).min(1),
      // what the thing was actually built with, not the services sold
      stack: z.array(z.string()).min(1),
      gallery: z.array(image()).max(12).optional(),
      // A screen recording shown in place of the gallery on the detail page.
      // Lives in /public (astro:assets is images-only); width/height are the
      // file's real pixels so the tile can reserve its ratio.
      video: z
        .object({ src: z.string(), width: z.number(), height: z.number() })
        .optional(),
      // live site, shown in the detail rail next to the year when present
      link: z.string().url().optional(),

      // Arabic translation of the text fields, kept in the same file so a project
      // and its translation can never drift apart. Everything here is optional:
      // a missing field falls back to the English one (see src/i18n/project.ts),
      // so an untranslated project still renders on /ar/ rather than breaking it.
      // Images, category, order and year are shared — they don't translate.
      ar: z
        .object({
          title: z.string().optional(),
          role: z.string().optional(),
          tags: z.array(z.string()).optional(),
          summary: z.string().optional(),
          headline: z.string().optional(),
          body: z.array(z.string()).optional(),
          stack: z.array(z.string()).optional(),
        })
        .optional(),
    }),
});

export const collections = { projects };
