import * as fs from 'node:fs';
import * as path from 'node:path';
import type { PageContextServer } from 'vike/types';
import { data as getCommonData } from '../../+data';
import { Sitemap } from '../../data/sitemap';
import { processMarkdown } from '../../utils/markdown';

interface PageData {
  content: string | null;
  currentChapter: string | null;
  sitemap: Sitemap;
  title: string;
  description: string;
}

export async function data(pageContext: PageContextServer): Promise<PageData> {
  const commonData = await getCommonData();
  const { document, chapterSlug } = (pageContext.routeParams as {
    document: string;
    chapterSlug: string;
  }) || { document: '', chapterSlug: '' };

  if (!chapterSlug) {
    return {
      ...commonData,
      content: null,
      currentChapter: null,
    };
  }

  try {
    const chapters = commonData.sitemap[document] || [];
    const chapter = chapters.find(c => c.slug.toLowerCase() === chapterSlug.toLowerCase());
    if (!chapter) {
      throw new Error(`Chapter ${chapterSlug} not found in ${document}`);
    }

    const COMPILED_DIR = path.resolve(process.cwd(), `./${document}`);

    // Read the chapter content
    const markdownContent = await fs.promises.readFile(
      path.join(COMPILED_DIR, chapter.path),
      'utf-8'
    );

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

    return {
      ...commonData,
      content: htmlContent,
      currentChapter: chapter.name,
      title,
      description,
    };
  } catch (error) {
    console.error(`Error loading chapter ${chapterSlug} from ${document}:`, error);
    throw error;
  }
}
