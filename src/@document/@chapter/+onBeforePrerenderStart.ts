import { getSitemap } from '../../data/sitemap';

export async function onBeforePrerenderStart() {
  const urls: string[] = ['/'];
  const sitemap = await getSitemap();

  for (const doc in sitemap) {
    const chapters = sitemap[doc];
    for (const chapter of chapters) {
      urls.push(`/${doc}/${chapter.slug}/`);
    }
  }

  return urls;
}
