// Resolves a project entry for one locale. English is the source of truth; the
// `ar:` block in a project's frontmatter overrides it field by field, so a
// partly-translated project shows Arabic where it has it and English where it
// doesn't — never an empty heading.
import type { CollectionEntry } from 'astro:content';
import { defaultLang, type Lang } from './ui';

type ProjectData = CollectionEntry<'projects'>['data'];

export function localizeProject(data: ProjectData, lang: Lang): ProjectData {
  if (lang === defaultLang || !data.ar) return data;
  const tr = data.ar;
  return {
    ...data,
    title: tr.title ?? data.title,
    role: tr.role ?? data.role,
    tags: tr.tags ?? data.tags,
    summary: tr.summary ?? data.summary,
    headline: tr.headline ?? data.headline,
    body: tr.body ?? data.body,
    stack: tr.stack ?? data.stack,
  };
}
