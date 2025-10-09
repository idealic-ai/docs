import * as fs from 'node:fs';
import * as path from 'node:path';
import type { PageContextServer } from 'vike/types';
import { data as getCommonData } from '../../+data';
import { Chapter, Sitemap } from '../../data/sitemap';
import { processMarkdown } from '../../utils/markdown';

interface PageData {
  content: string | null;
  currentChapter: string | null;
  sitemap: Sitemap;
  title: string;
  description: string;
  nextChapter: Chapter | null;
  prevChapter: Chapter | null;
}

export async function data(pageContext: PageContextServer): Promise<PageData> {
  const commonData = await getCommonData();
  const { document, chapterSlug, lang } = (pageContext.routeParams as {
    document: string;
    chapterSlug: string;
    lang: string;
  }) || { document: '', chapterSlug: '', lang: 'en' };

  if (!chapterSlug) {
    return {
      ...commonData,
      content: null,
      currentChapter: null,
      nextChapter: null,
      prevChapter: null,
    };
  }

  try {
    const chapters = commonData.sitemap[document] || [];
    const chapterIndex = chapters.findIndex(
      c => c.slug.toLowerCase() === chapterSlug.toLowerCase()
    );
    const chapter = chapters[chapterIndex];

    if (!chapter) {
      throw new Error(`Chapter ${chapterSlug} not found in ${document}`);
    }

    let markdownContent: string;
    let isTranslated = true;

    const translatedPath = path
      .resolve(process.cwd(), './translations', lang, document, chapter.path)
      .replace('/translations/en', '');

    try {
      markdownContent = await fs.promises.readFile(translatedPath, 'utf-8');
    } catch (e) {
      isTranslated = false;
      const originalPath = path.resolve(process.cwd(), `./${document}`, chapter.path);
      markdownContent = await fs.promises.readFile(originalPath, 'utf-8');
    }

    if (!isTranslated) {
      const warning = `> [!WARNING]
> This document has not yet been translated into ${
        lang === 'ru' ? 'Russian' : 'the selected language'
      }. You are reading the original English version.`;
      markdownContent = `${warning}\n\n${markdownContent}`;
    }

    // Convert markdown to HTML
    const htmlContent = await processMarkdown(markdownContent);

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
      content: htmlContent,
      currentChapter: chapter.name,
      title,
      description,
      nextChapter: nextChapter ? nextChapter : null,
      prevChapter: prevChapter ? prevChapter : null,
    };
  } catch (error) {
    console.error(`Error loading chapter ${chapterSlug} from ${document}:`, error);
    throw error;
  }
}
