import type { PageContextServer } from 'vike/types';
import { data as getCommonData } from '../../+data';
import { Chapter, Glossary, Sitemap, getGlossary, getSitemap } from '../../data/sitemap';
import { UIStrings, getUiStrings } from '../../data/ui';
import { linkGlossaryTerms } from '../../utils/glossary';
import { getMarkdownContent } from '../../utils/i18n';
import { processMarkdown, replaceRelativeLinks } from '../../utils/markdown';

interface PageData {
  content: string | null;
  currentChapter: string | null;
  rawUrl: string | null;
  sitemap: Sitemap;
  title: string;
  description: string;
  nextChapter: Chapter | null;
  prevChapter: Chapter | null;
  ui: UIStrings;
  glossary: Glossary;
}

export async function data(pageContext: PageContextServer): Promise<PageData> {
  const commonData = await getCommonData();
  const { document, chapterSlug, lang } = (pageContext.routeParams as {
    document: string;
    chapterSlug: string;
    lang: string;
  }) || { document: '', chapterSlug: '', lang: 'en' };
  const sitemap = await getSitemap(lang);
  const uiStrings = await getUiStrings(lang);
  const glossary = await getGlossary(lang);

  if (!chapterSlug) {
    return {
      ...commonData,
      sitemap,
      content: null,
      currentChapter: null,
      nextChapter: null,
      prevChapter: null,
      ui: uiStrings,
      glossary,
    };
  }

  try {
    const chapters = sitemap[document] || [];
    const chapterIndex = chapters.findIndex(
      c => c.path.toLowerCase() === chapterSlug.toLowerCase()
    );

    const chapter = chapters[chapterIndex];
    if (!chapter) {
      throw new Error(`Chapter ${chapterSlug} not found in ${document}`);
    }

    const { markdownContent } = await getMarkdownContent(document, chapter.path, lang);

    // Convert markdown to HTML
    const contentWithGlossary = linkGlossaryTerms(markdownContent, glossary, lang);
    const htmlContentPreLinks = await processMarkdown(contentWithGlossary);
    const htmlContent = replaceRelativeLinks(htmlContentPreLinks, document, lang);

    const title = `${chapter.name} - ${uiStrings[document as keyof UIStrings].long}`;
    const description =
      (
        await processMarkdown(
          markdownContent
            .split('\n')
            .filter(line => line.trim() && !line.trim().startsWith('#'))
            .slice(0, 2)
            .join(' ')
        )
      )
        .replace(/<[^>]*>/g, '')
        .substring(0, 240) + '...';

    const nextChapter = chapterIndex < chapters.length - 1 ? chapters[chapterIndex + 1] : null;
    const prevChapter = chapterIndex > 0 ? chapters[chapterIndex - 1] : null;

    return {
      ...commonData,
      sitemap,
      content: htmlContent,
      currentChapter: chapter.name,
      title,
      description,
      nextChapter: nextChapter ? nextChapter : null,
      prevChapter: prevChapter ? prevChapter : null,
      ui: uiStrings,
      glossary,
    };
  } catch (error) {
    console.error(`Error loading chapter ${chapterSlug} from ${document}:`, error);
    throw error;
  }
}
