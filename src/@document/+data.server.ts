import type { PageContextServer } from 'vike/types';
import { data as getCommonData } from '../+data';
import { getGlossary, getSitemap } from '../data/sitemap';
import { getUiStrings } from '../data/ui';
import { linkGlossaryTerms } from '../utils/glossary';
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
  const glossary = await getGlossary(lang);

  try {
    const { markdownContent } = await getMarkdownContent(document, 'index.md', lang);
    const contentWithGlossary = linkGlossaryTerms(markdownContent, glossary, lang);
    const htmlContentPreLinks = await processMarkdown(contentWithGlossary);
    const htmlContent = replaceRelativeLinks(htmlContentPreLinks, document, lang);
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
      glossary,
    };
  } catch (error) {
    console.error(`Error loading index for ${document}:`, error);
    throw error;
  }
}
