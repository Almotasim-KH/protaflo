// Resolves a project entry for one locale. English is the source of truth; the
// `ar:` block in a project's frontmatter carries the translation of every text
// field, and content.config.ts requires it to be complete and the same length
// item for item — so there is nothing to fall back to here, and no way for a
// half-translated project to reach the page.
import type { CollectionEntry } from 'astro:content';
import { defaultLang, type Lang } from './ui';

type ProjectData = CollectionEntry<'projects'>['data'];

export function localizeProject(data: ProjectData, lang: Lang): ProjectData {
  if (lang === defaultLang) return data;
  const { ar } = data;
  return {
    ...data,
    title: ar.title,
    role: ar.role,
    tags: ar.tags,
    summary: ar.summary,
    headline: ar.headline,
    body: ar.body,
    stack: ar.stack,
    stats: ar.stats ?? data.stats,
    // Same file, same dimensions — only the description of what it shows is a
    // translated string.
    video: data.video && { ...data.video, alt: ar.videoAlt ?? data.video.alt },
    captions: ar.captions ?? data.captions,
    // `at` is shared — only the label is translated, and the two lists are the
    // same length by schema, so index alignment is safe here.
    galleryGroups: data.galleryGroups?.map((g, i) => ({
      at: g.at,
      label: ar.galleryGroups?.[i] ?? g.label,
    })),
  };
}
