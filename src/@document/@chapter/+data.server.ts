import type { PageContextServer } from 'vike/types';
import { data as getCommonData } from '../../+data';
import { Chapter, Sitemap, getSitemap } from '../../data/sitemap';
import { UIStrings, getUiStrings } from '../../data/ui';
import { getMarkdownContent } from '../../utils/i18n';
import { processMarkdown, replaceRelativeLinks } from '../../utils/markdown';

interface PageData {
  content: string | null;
  currentChapter: string | null;
  sitemap: Sitemap;
  title: string;
  description: string;
  nextChapter: Chapter | null;
  prevChapter: Chapter | null;
  ui: UIStrings;
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

  if (!chapterSlug) {
    return {
      ...commonData,
      sitemap,
      content: null,
      currentChapter: null,
      nextChapter: null,
      prevChapter: null,
      ui: uiStrings,
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
    const fixedLinksContent = replaceRelativeLinks(markdownContent, document, lang);
    const htmlContent = await processMarkdown(fixedLinksContent);

    const title = `${chapter.name} | ${document.charAt(0).toUpperCase() + document.slice(1)}`;
    const description =
      markdownContent
        .split('\n')
        .filter(line => line.trim() && !line.trim().startsWith('#'))
        .slice(0, 2)
        .join(' ')
        .replace(/[*_`[\]()]/g, '')
        .substring(0, 160) + '...';

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
    };
  } catch (error) {
    console.error(`Error loading chapter ${chapterSlug} from ${document}:`, error);
    throw error;
  }
}
