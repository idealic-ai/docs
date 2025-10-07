import { getSitemap } from './data/sitemap';

export async function data() {
  const sitemap = await getSitemap();
  return {
    sitemap,
    title: 'AI System Docs',
    description: 'Documentation for a self-evolving operating system architecture.',
  };
}
