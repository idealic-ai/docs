import { getSitemap } from './data/sitemap';

export async function data() {
  const sitemap = await getSitemap();
  return {
    sitemap,
  };
}
