import { getSitemap } from '../data/sitemap';

export const LANGUAGES = ['en', 'ru'] as const;
const DOC_FOLDERS = ['manifesto', 'edict', 'rfc', 'blueprint'];

export async function onBeforePrerenderStart() {
  const sitemap = await getSitemap();

  const urls: string[] = ['/'];
  LANGUAGES.forEach(lang => {
    if (lang !== 'en') {
      urls.push(`/${lang}`);
    }
    for (const docType of DOC_FOLDERS) {
      if (sitemap[docType]) {
        sitemap[docType].forEach(chapter => {
          const langPrefix = `/${lang}`;
          urls.push(`${langPrefix}${chapter.url}`);
        });
      }
    }
  });

  return urls;
}
