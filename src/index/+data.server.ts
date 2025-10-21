import type { PageContextServer } from 'vike/types';
import { getGlossary, getSitemap } from '../data/sitemap';
import { getUiStrings } from '../data/ui';
import { linkGlossaryTerms } from '../utils/glossary';
import { getMarkdownContent } from '../utils/i18n';
import { processMarkdown, replaceRelativeLinks } from '../utils/markdown';

const DYNAMIC_SECTIONS: Record<string, string> = {
  'Manifesto of Co-Liberation': 'manifesto',
  'Edict Of Autonomy': 'edict',
  'Requests for Comments': 'acts',
};

export async function data(pageContext: PageContextServer) {
  const { lang } = (pageContext.routeParams as { lang: string }) || { lang: 'en' };
  const glossary = await getGlossary(lang);
  const { markdownContent: introContent } = await getMarkdownContent('ui', 'intro.md', lang);
  const introContentWithGlossary = linkGlossaryTerms(introContent, glossary, lang);
  let finalHtml = await processMarkdown(introContentWithGlossary);

  for (const [title, docPath] of Object.entries(DYNAMIC_SECTIONS)) {
    const { markdownContent: indexContentRaw } = await getMarkdownContent(
      docPath,
      'index.md',
      lang
    );

    // Replace top-level heading with a second-level one
    const contentWithTweakedHeader = indexContentRaw.replace(/^#\s/m, '## ');
    const contentWithGlossary = linkGlossaryTerms(contentWithTweakedHeader, glossary, lang);
    const sectionHtml = await processMarkdown(contentWithGlossary);
    const fixedLinksContent = replaceRelativeLinks(sectionHtml, docPath, lang);

    finalHtml += `\n\n<hr />\n\n${fixedLinksContent.trim()}`;
  }

  const content = finalHtml;
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
    glossary,
  };
}
