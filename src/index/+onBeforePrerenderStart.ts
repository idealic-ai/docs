import { getSitemap } from '../data/sitemap';
import { LANGUAGES } from '../utils/languages';

const DOC_FOLDERS = ['manifesto', 'edict', 'rfc', 'blueprint'];

export async function onBeforePrerenderStart() {
  const sitemap = await getSitemap();

  const urls: string[] = [];
  LANGUAGES.forEach(lang => {
    urls.push(`/${lang}`);
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
