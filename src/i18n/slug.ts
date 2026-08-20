// Projects are filed under src/content/projects/<Developing|Analysis>/, so the
// collection id carries that folder. URLs stay flat — the folder is filing, not
// routing — so everything that builds a /work/ path goes through here.
export function projectSlug(id: string): string {
  return id.split('/').pop()!;
}
