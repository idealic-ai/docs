import type { PageContextServer } from 'vike/types';
import { getSitemap } from '../data/sitemap';
import { getUiStrings } from '../data/ui';
import { getMarkdownContent } from '../utils/i18n';
import { processMarkdown, replaceRelativeLinks } from '../utils/markdown';

const DYNAMIC_SECTIONS: Record<string, string> = {
  'Manifesto of Co-Liberation': 'manifesto',
  'Edict Of Autonomy': 'edict',
  'Requests for Comments': 'acts',
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
  const sitemap = await getSitemap(lang);
  const uiStrings = await getUiStrings(lang);
  const title = uiStrings.mainpage.title;
  const description = uiStrings.mainpage.description;

  return {
    content,
    title,
    description,
    sitemap,
    ui: uiStrings,
  };
}
