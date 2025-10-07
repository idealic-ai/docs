import { getSitemap } from '../data/sitemap';

export async function onBeforePrerenderStart() {
  const sitemap = await getSitemap();
  const urls = Object.keys(sitemap).map(doc => `/${doc}`);
  return urls;
}
