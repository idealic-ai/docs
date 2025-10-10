import type { PageContextServer } from 'vike/types';
import { data as getCommonData } from '../+data';
import { getSitemap } from '../data/sitemap';
import { getUiStrings } from '../data/ui';
import { getMarkdownContent } from '../utils/i18n';
import { processMarkdown, replaceRelativeLinks } from '../utils/markdown';

export async function data(pageContext: PageContextServer) {
  const commonData = await getCommonData();
  const { document, lang } = (pageContext.routeParams as { document: string; lang: string }) || {
    document: '',
    lang: 'en',
  };
  const sitemap = await getSitemap(lang);
  const uiStrings = await getUiStrings(lang);

  try {
    const { markdownContent } = await getMarkdownContent(document, 'index.md', lang);
    const fixedLinksContent = replaceRelativeLinks(markdownContent, document, lang);
    const htmlContent = await processMarkdown(fixedLinksContent);
    const description =
      markdownContent
        .split('\n')
        .filter(line => line.trim() && !line.trim().startsWith('#'))
        .slice(0, 2)
        .join(' ')
        .replace(/[*_`[\]()]/g, '')
        .replace('\s*---*\s*', '')
        .substring(0, 160) + '...';

    return {
      ...commonData,
      sitemap,
      content: htmlContent,
      title: `${document.charAt(0).toUpperCase() + document.slice(1)}`,
      description,
      ui: uiStrings,
    };
  } catch (error) {
    console.error(`Error loading index for ${document}:`, error);
    throw error;
  }
}
