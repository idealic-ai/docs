import type { PageContextServer } from 'vike/types';
import { getSitemap } from '../data/sitemap';
import { getUiStrings } from '../data/ui';
import { getMarkdownContent } from '../utils/i18n';
import { processMarkdown, replaceRelativeLinks } from '../utils/markdown';

const DYNAMIC_SECTIONS: Record<string, string> = {
  'The Co-Liberation Manifesto': 'manifesto',
  'Edict Of Autonomy': 'edict',
  'Requests for Comments': 'rfc',
};

export async function data(pageContext: PageContextServer) {
  const { lang } = (pageContext.routeParams as { lang: string }) || { lang: 'en' };
  const { markdownContent: introContent } = await getMarkdownContent('ui', 'intro.md', lang);
  let finalContent = introContent;

  for (const [title, docPath] of Object.entries(DYNAMIC_SECTIONS)) {
    const { markdownContent: indexContentRaw } = await getMarkdownContent(
      docPath,
      'index.md',
      lang
    );

    // Replace top-level heading with a second-level one
    const contentWithTweakedHeader = indexContentRaw.replace(/^#\s/m, '## ');
    const fixedLinksContent = replaceRelativeLinks(contentWithTweakedHeader, docPath, lang);

    finalContent += `\n\n---\n\n${fixedLinksContent.trim().replace(/\n---\n/g, '\n')}`;
  }

  const content = await processMarkdown(finalContent.trim());
  const title = 'Index';
  const description = 'Index of all documents';
  const sitemap = await getSitemap(lang);
  const uiStrings = await getUiStrings(lang);

  return {
    content,
    title,
    description,
    sitemap,
    ui: uiStrings,
  };
}
