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
      // Three kinds of work — a paid engagement, something built for myself, or
      // a competition entry. Free text here used to produce odd rail values
      // ("Client: Personal project"), so the label and every value live in i18n
      // (detail.clientValue); adding a kind means adding it in both places.
      client: z.enum(['client', 'personal', 'internal', 'challenge']),
      headline: z.string(),
      body: z.array(z.string()).min(1),
      // what the thing was actually built with, not the services sold
      stack: z.array(z.string()).min(1),
      // Optional 3-number stat bar shown at the top of the detail page —
      // real, project-specific metrics (time saved, sources merged, etc.),
      // never invented placeholders.
      stats: z.array(z.object({ value: z.string(), label: z.string() })).max(3).optional(),
      gallery: z.array(image()).max(12).optional(),
      // A screen recording shown in place of the gallery on the detail page.
      // Lives in /public (astro:assets is images-only); width/height are the
      // file's real pixels so the tile can reserve its ratio.
      video: z
        .object({ src: z.string(), width: z.number(), height: z.number() })
        .optional(),
      // live site, shown in the detail rail next to the year when present
      link: z.string().url().optional(),
      // Where the thing actually stands. Only the key lives here; both labels
      // live in i18n (detail.statusValue), same as `client`. Left off when the
      // work has no meaningful ship state (a report, a competition entry).
      status: z.enum(['live', 'built', 'wip']).optional(),

      // Arabic translation of the text fields, kept in the same file so a project
      // and its translation can never drift apart. Every field is required and
      // the block itself is required: a missing translation fails the build with
      // the file and field named, rather than quietly rendering English inside
      // the Arabic page. Where the Arabic really is the Latin string — tool names
      // in `stack`, mostly — write it out again; that keeps it a decision.
      // Images, category, order and year are shared — they don't translate.
      ar: z.object({
        title: z.string(),
        role: z.string(),
        tags: z.array(z.string()).min(1),
        summary: z.string(),
        headline: z.string(),
        body: z.array(z.string()).min(1),
        stack: z.array(z.string()).min(1),
        stats: z.array(z.object({ value: z.string(), label: z.string() })).max(3).optional(),
      }),
    })
      // The list fields are rendered item for item in both locales, so an extra
      // English paragraph with no Arabic twin is the same drift as a missing
      // field — just harder to spot. Fail the build on it.
      .superRefine((data, ctx) => {
        for (const field of ['tags', 'body', 'stack'] as const) {
          if (data.ar[field].length !== data[field].length) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ['ar', field],
              message: `ar.${field} has ${data.ar[field].length} entries but ${field} has ${data[field].length} — the two languages must line up item for item.`,
            });
          }
        }
        // Either both locales carry the stat bar, or neither does — a stat
        // bar that only exists in one language would silently disappear
        // when the reader switches locale.
        const enStats = data.stats?.length ?? 0;
        const arStats = data.ar.stats?.length ?? 0;
        if (enStats !== arStats) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['ar', 'stats'],
            message: `ar.stats has ${arStats} entries but stats has ${enStats} — the two languages must line up item for item.`,
          });
        }
      }),
});

export const collections = { projects };
