// Both locale routes (/work/<slug>/ and /ar/work/<slug>/) emit the same set of
// slugs — ProjectDetail reads the locale off the URL — so the path list is built
// once here rather than copied into each [slug].astro.
//
// Call it from a plain `export async function getStaticPaths()` in the page. The
// `(async () => ...) satisfies GetStaticPaths` arrow form the pages used before
// builds an empty path list once the body is a call into another module, and the
// route then renders with undefined props.
import { getCollection } from 'astro:content';
import { projectSlug } from '../i18n/slug';

export async function projectPaths() {
  const projects = await getCollection('projects');
  return projects.map((project) => ({
    params: { slug: projectSlug(project.id) },
    props: { project },
  }));
}
